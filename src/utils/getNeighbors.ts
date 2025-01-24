import { Node } from "./utilTypes";

export const getNeighbors = (
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
