import { useCallback, useEffect, useState } from "react";
import { Cell } from "./components/cell";
import { astar } from "../../utils/astar";
import { dijkstra } from "../../utils/dijkstra";
enum mazeCells {
  start = 2,
  goal = 3,
  wall = 1,
  visited = 4,
  passage = 0,
}
export const Board = (props: {
  draw: boolean;
  reset: boolean;
  handleReset: () => void;
  start: boolean;
  handleStart: (val: boolean) => void;
  algo: string;
}) => {
  const [maze, setMaze] = useState<number[][]>();
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const placeCells = useCallback(() => {
    let cells = Array.from({ length: 20 }, () =>
      Array.from({ length: 25 }, () => 0)
    );
    cells[0][0] = mazeCells.start;
    cells[cells.length - 1][cells[0].length - 1] = mazeCells.goal;
    return cells;
  }, []);
  const handleSettingWalls = useCallback(
    (row: number, col: number) => {
      setMaze((prev) => {
        if (prev) {
          const nMaze = prev.map((innerRow, rowIndex) =>
            rowIndex === row
              ? innerRow.map((cell, colIndex) =>
                  colIndex === col ? (cell === 1 ? 0 : 1) : cell
                )
              : innerRow
          );
          return nMaze;
        }
        return prev;
      });
    },
    [maze]
  );

  const handleFindPathAStar = () => {
    if (!maze) return;
    const graph: Record<string, [number, number][]> = {};
    const rows = maze.length;
    const cols = maze[0].length;
    const start: [number, number] = [0, 0];
    const goal: [number, number] = [cols - 1, rows - 1];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (maze[y][x] !== mazeCells.wall) {
          const key = `${x},${y}`;
          graph[key] = [];
          //neighbors
          const directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
          ];
          for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (
              nx >= 0 &&
              nx < cols &&
              ny >= 0 &&
              ny < rows &&
              maze[ny][nx] !== 1
            ) {
              graph[key].push([nx, ny]);
            }
          }
        }
      }
    }
    // Run A* algorithm
    const path = astar(graph, start, goal);
    if (path) {
      const nMaze = structuredClone(maze);
      path.forEach(([x, y]) => {
        if (nMaze[y][x] === 0) nMaze[y][x] = 4;
      });
      setMaze(nMaze);
    } else {
      alert("no path found");
    }
  };
  const handleFindPathDijkstra = () => {
    if (!maze) return;
    const start: [number, number] = [0, 0];
    const goal: [number, number] = [maze.length - 1, maze[0].length - 1];

    const path = dijkstra(maze, start, goal);
    if (path && path.length > 1) {
      const nMaze = structuredClone(maze);

      path.forEach(([x, y]) => {
        if (nMaze[y][x] === mazeCells.passage) nMaze[y][x] = mazeCells.visited;
      });
      setMaze(nMaze);
    } else {
      alert("No path found");
    }
  };
  useEffect(() => {
    setMaze(placeCells());
  }, []);
  useEffect(() => {
    if (props.reset) {
      setMaze(placeCells());
      props.handleReset();
    }
  }, [props.reset]);
  useEffect(() => {
    if (props.start) {
      if (props.algo === "astar") {
        handleFindPathAStar();
      } else {
        handleFindPathDijkstra();
      }

      props.handleStart(false);
    }
  }, [props.start]);
  return (
    <div
      className="board"
      onMouseDown={() => setIsDrawing(true)}
      onMouseUp={() => setIsDrawing(false)}
    >
      {maze?.map((row, rowindex) =>
        row.map((cell, celIndex) => (
          <Cell
            key={celIndex + "_" + rowindex}
            draw={props.draw && isDrawing}
            num={cell}
            handleSettingWalls={() => {
              handleSettingWalls(rowindex, celIndex);
            }}
            algo={props.algo}
          />
        ))
      )}
    </div>
  );
};
