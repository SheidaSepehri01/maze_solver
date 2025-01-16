type Node = [number, number];
type Graph = number[][];

const getNeighbors = (
  [row, col]: Node,
  numRows: number,
  numCols: number
): Node[] => {
  const neighbors: Node[] = [];
  if (row > 0) neighbors.push([row - 1, col]);
  if (row < numRows - 1) neighbors.push([row + 1, col]);
  if (col > 0) neighbors.push([row, col - 1]);
  if (col < numCols - 1) neighbors.push([row, col + 1]);
  return neighbors;
};

export function dijkstra(
  graph: Graph,
  startNode: Node,
  goalNode: Node
): Node[] | null {
  const numRows = graph.length;
  const numCols = graph[0].length;

  const startKey = `${startNode[0]},${startNode[1]}`;
  const endKey = `${goalNode[0]},${goalNode[1]}`;

  let distances: Record<string, number> = {};
  let previous: Record<string, string | null> = {};
  let unVisited: Set<string> = new Set();

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const key = `${row},${col}`;

      distances[key] = key === startKey ? 0 : Infinity;

      previous[key] = null;
      unVisited.add(key);
    }
  }

  while (unVisited.size) {
    let closestNode: string | null = null;

    for (const node of unVisited) {
      if (!closestNode || distances[node] < distances[closestNode]) {
        closestNode = node;
      }
    }

    if (!closestNode || distances[closestNode] === Infinity) break;

    const [currentRow, currentCol] = closestNode.split(",").map(Number);
    const currentNeighbors = getNeighbors(
      [currentRow, currentCol],
      numRows,
      numCols
    );

    for (const [neighborRow, neighborCol] of currentNeighbors) {
      console.log("dis", graph);
      if (graph[neighborRow]?.[neighborCol] === 1) continue; // Skip walls
      const neighborKey = `${neighborRow},${neighborCol}`;
      const weight = 1; // Uniform weight for passable paths
      const newDistance = distances[closestNode] + weight;
      if (newDistance < distances[neighborKey]) {
        distances[neighborKey] = newDistance;
        previous[neighborKey] = closestNode;
      }
    }
    unVisited.delete(closestNode);
    if (closestNode === endKey) break;
  }

  let path: Node[] = [];
  let currentNode: string | null = endKey;

  if (Object.keys(previous).includes(startKey)) {
    while (currentNode) {
      const [row, col] = currentNode.split(",").map(Number);
      path.push([col, row]);
      currentNode = previous[currentNode];
    }
  }
  return path.length ? path.reverse() : null;
}
