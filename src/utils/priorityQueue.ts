export class PriorityQueue<T> {
  private heap: T[];
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.heap = [];
    this.comparator = comparator;
  }

  enqueue(item: T): void {
    this.heap.push(item); // Add the item to the end of the heap
    this.heapifyUp(); // Restore heap property
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;

    const root = this.heap[0]; // Root is the highest priority element
    const end = this.heap.pop(); // Remove the last element

    if (this.heap.length > 0 && end !== undefined) {
      this.heap[0] = end; // Move the last element to the root
      this.heapifyDown(); // Restore heap property
    }

    return root;
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  // Peek at the element with the highest priority
  peek(): T | undefined {
    return this.heap[0];
  }

  // Check if an element exists in the queue
  contains(item: T): boolean {
    return this.heap.some((element) => this.comparator(element, item) === 0);
  }

  // Restore heap property going up from the last element
  private heapifyUp(): void {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);

      // If the current element is higher priority than its parent, swap them
      if (this.comparator(this.heap[idx], this.heap[parentIdx]) < 0) {
        [this.heap[idx], this.heap[parentIdx]] = [
          this.heap[parentIdx],
          this.heap[idx],
        ];
        idx = parentIdx;
      } else {
        break; // Heap property is satisfied
      }
    }
  }

  // Restore heap property going down from the root
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
        break; // Heap property is satisfied
      }
    }
  }
}
