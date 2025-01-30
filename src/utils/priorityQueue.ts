export class PriorityQueue<T> {
  private heap: T[];
  private comparator: (a: T, b: T) => number;
  private set: Set<T>; // Hash Set for O(1) lookups

  constructor(comparator: (a: T, b: T) => number) {
    this.heap = [];
    this.comparator = comparator;
    this.set = new Set();
  }

  enqueue(item: T): void {
    if (!this.set.has(item)) {
      // Prevent duplicate items
      this.heap.push(item);
      this.set.add(item); // Track item for O(1) lookups
      this.heapifyUp();
    }
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;

    const root = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length > 0 && end !== undefined) {
      this.heap[0] = end;
      this.heapifyDown();
    }

    this.set.delete(root); // Remove from lookup table
    return root;
  }

  contains(item: T): boolean {
    return this.set.has(item); // Now O(1)!
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  private heapifyUp(): void {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.comparator(this.heap[idx], this.heap[parentIdx]) < 0) {
        [this.heap[idx], this.heap[parentIdx]] = [
          this.heap[parentIdx],
          this.heap[idx],
        ];
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  private heapifyDown(): void {
    let idx = 0;
    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let smallest = idx;

      if (
        leftIdx < this.heap.length &&
        this.comparator(this.heap[leftIdx], this.heap[smallest]) < 0
      ) {
        smallest = leftIdx;
      }

      if (
        rightIdx < this.heap.length &&
        this.comparator(this.heap[rightIdx], this.heap[smallest]) < 0
      ) {
        smallest = rightIdx;
      }

      if (smallest !== idx) {
        [this.heap[idx], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[idx],
        ];
        idx = smallest;
      } else {
        break;
      }
    }
  }
}
