import { useEffect, useState } from "react";
import { Cell } from "./components/cell";
import { astar } from "../../utils/astar";
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
}) => {
  const [maze, setMaze] = useState<number[][]>();
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const placeCells = () => {
    let cells = Array.from({ length: 20 }, () =>
      Array.from({ length: 25 }, () => 0)
    );
    cells[0][0] = mazeCells.start;
    cells[cells.length - 1][cells[0].length - 1] = mazeCells.goal;
    return cells;
  };
  const handleSettingWalls = (row: number, col: number) => {
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
  };
  // const handleCheckPath = (x: number, y: number) => {
  //   if (!maze) return;
  //   const end = { x: maze[0].length - 1, y: maze.length - 1 };
  //   if (x === end.x && y === end.y) {
  //     return true;
  //   } else if (
  //     x < 0 ||
  //     y < 0 ||
  //     x >= maze[0].length ||
  //     y >= maze.length ||
  //     maze[y][x] !== 0
  //   ) {
  //     return false;
  //   }
  //   setMaze((prev) => {
  //     if (prev) {
  //       const n = prev.map((innerRow, rowIndex) =>
  //         rowIndex === y
  //           ? innerRow.map((cell, colIndex) =>
  //               colIndex === x ? (cell === 0 ? 4 : cell) : cell
  //             )
  //           : innerRow
  //       );
  //       return n;
  //     }
  //     return prev;
  //   });
  //   if (
  //     handleCheckPath(x + 1, y) || // Right
  //     handleCheckPath(x, y + 1) || // Down
  //     handleCheckPath(x - 1, y) || // Left
  //     handleCheckPath(x, y - 1) // Up
  //   ) {
  //     return true;
  //   }
  //   setMaze((prev) => {
  //     const nMaze = prev?.map((innerRow, rowIndex) =>
  //       rowIndex === y
  //         ? innerRow.map((cell, colIndex) => (colIndex === x ? 0 : cell))
  //         : innerRow
  //     );
  //     return nMaze ?? prev;
  //   });

  //   return handleCheckPath(x + 1, y);
  // };
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
      handleFindPathAStar();
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
          />
        ))
      )}
    </div>
  );
};
