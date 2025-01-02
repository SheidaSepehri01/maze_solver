import { PriorityQueue } from "typescript-collections"; // For priority queue functionality

type Node = [number, number];
type Graph = Record<string, Node[]>; // Adjacency list: key as "x,y" and value as neighbors

/**
 * A* algorithm to find the shortest path in a graph.
 * @param graph - The maze graph represented as an adjacency list.
 * @param startNode - The starting node in the maze.
 * @param goalNode - The goal node to reach.
 * @returns The shortest path as an array of nodes or null if no path exists.
 */
export function astar(
  graph: Graph,
  startNode: Node,
  goalNode: Node
): Node[] | null {
  const openSet = new PriorityQueue<{ cost: number; node: Node }>(
    (a, b) => a.cost - b.cost
  );
  openSet.enqueue({ cost: 0, node: startNode });

  const cameFrom: Record<string, Node | undefined> = {};
  const costSoFar: Record<string, number> = {};
  costSoFar[`${startNode[0]},${startNode[1]}`] = 0;

  // Heuristic function: Manhattan distance
  const heuristic = (node: Node, goal: Node): number =>
    Math.abs(node[0] - goal[0]) + Math.abs(node[1] - goal[1]);

  // Rebuilds the path from goal to start
  const rebuildPath = (current: Node): Node[] => {
    const path: Node[] = [current];
    let currKey = `${current[0]},${current[1]}`;
    while (currKey in cameFrom) {
      const prev = cameFrom[currKey];
      if (!prev) break;
      path.push(prev);
      currKey = `${prev[0]},${prev[1]}`;
    }
    return path.reverse();
  };

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue()!;
    const [currCost, currNode] = [current.cost, current.node];

    if (currNode[0] === goalNode[0] && currNode[1] === goalNode[1]) {
      return rebuildPath(currNode);
    }

    const currKey = `${currNode[0]},${currNode[1]}`;
    for (const neighbor of graph[currKey] || []) {
      const neighborKey = `${neighbor[0]},${neighbor[1]}`;
      const newCost = costSoFar[currKey] + 1;
      if (!(neighborKey in costSoFar) || newCost < costSoFar[neighborKey]) {
        costSoFar[neighborKey] = newCost;
        const priority = newCost + heuristic(neighbor, goalNode);
        openSet.enqueue({ cost: priority, node: neighbor });
        cameFrom[neighborKey] = currNode;
      }
    }
  }

  return null; // No path found
}
