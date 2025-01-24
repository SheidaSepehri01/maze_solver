import { PriorityQueue } from "typescript-collections";
import { Node } from "./utilTypes";
import { getNeighbors } from "./getNeighbors";

type Graph = Record<string, Node[]>;

export function astar(
  graph: Graph,
  startNode: Node,
  goalNode: Node
): Node[] | null {
  const openSet = new PriorityQueue<{ cost: number; node: Node }>(
    (a, b) => b.cost - a.cost
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
export function Astar(graph: number[][], startNode: Node, goalNode: Node) {
  const openSet: PriorityQueue<{
    cost: number;
    node: Node;
  }> = new PriorityQueue<{ cost: number; node: Node }>(
    (a, b) => b.cost - a.cost
  );
  const costMap: Record<string, number> = {};
  costMap[`${startNode[0]},${startNode[1]}`] = 0;
  const closedSet = new Map();
  openSet.enqueue({ cost: 0, node: startNode });
  const cameFrom: Record<string, Node | undefined> = {};

  const heuristic = (node: Node, goal: Node): number =>
    Math.abs(goal[0] - node[0]) + Math.abs(goal[1] - node[1]);
  const numRows: number = graph.length;
  const numCols: number = graph[0].length;

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue()!;
    const [currentCost, currentNode] = [current.cost, current.node];

    const currentKey = `${currentNode[0]},${currentNode[1]}`;
    if (currentKey === `${goalNode[0]},${goalNode[1]}`)
      return { path: rebuildPath(cameFrom, currentNode), visited: closedSet };
    if (closedSet.has(currentKey)) continue;
    closedSet.set(currentKey, current);

    const neighbors = getNeighbors(currentNode, numRows, numCols);

    if (currentNode[1] === goalNode[1] && currentNode[0] === goalNode[0]) {
      return { path: rebuildPath(cameFrom, currentNode), visited: closedSet };
    }
    for (const neighbor of neighbors) {
      const [row, col] = neighbor;
      const neighborKey = `${row},${col}`;
      if (graph[row][col] === 1) continue;
      if (neighbor === goalNode)
        return { path: rebuildPath(cameFrom, currentNode), visited: closedSet };
      if (closedSet.has(neighborKey)) continue;

      const newCost = currentCost + 1;
      if (!(neighborKey in costMap) || newCost < costMap[neighborKey]) {
        costMap[neighborKey] = newCost;
        const priority = newCost + heuristic(neighbor, goalNode);
        openSet.enqueue({ cost: priority, node: neighbor });
        cameFrom[neighborKey] = currentNode;
      }
    }
  }
}
function rebuildPath(
  cameFrom: Record<string, Node | undefined>,
  current: Node
): Node[] {
  const path: Node[] = [current];
  let currKey = `${current[0]},${current[1]}`;
  while (cameFrom[currKey]) {
    const prev = cameFrom[currKey]!;
    path.push(prev);
    currKey = `${prev[0]},${prev[1]}`;
  }

  return path.reverse();
}
