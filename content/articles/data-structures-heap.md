---
title: 'Data Structures - Heap'
date: '2026-04-22'
description: 'A deep dive into Heaps — the tree-based structure powering priority queues. Learn min-heap, max-heap, heapify, time complexity, and classic applications like heap sort and Dijkstra.'
tags: ['Data Structures', 'Computer Science', 'Algorithms', 'Beginners']
published: true
---

# Data Structures - Heap

A **Heap** is a specialized tree-based data structure that satisfies the **heap property**:

- **Min-Heap**: every parent node is **less than or equal to** its children → the root is always the **minimum**
- **Max-Heap**: every parent node is **greater than or equal to** its children → the root is always the **maximum**

Heaps are the most efficient implementation of a **Priority Queue** — a structure where the highest-priority element is always served first.

---

## Visual Structure

### Min-Heap Example
```
         [1]
        /    \
      [3]    [2]
     /   \   /
   [7]  [4] [5]
```

Every parent ≤ its children. The minimum is always at the root.

### Max-Heap Example
```
         [9]
        /    \
      [7]    [8]
     /   \   /
   [3]  [4] [5]
```

---

## Array Representation

A heap is always stored as a **complete binary tree**, which maps perfectly to an array without needing pointers:

```
Index:  0    1    2    3    4    5
Array: [1,   3,   2,   7,   4,   5]
```

For a node at index `i`:
- **Left child** → `2*i + 1`
- **Right child** → `2*i + 2`
- **Parent** → `(i - 1) // 2`

```python
# For the array [1, 3, 2, 7, 4, 5]:
# Node at index 1 (value=3):
#   left child  → index 3 (value=7)
#   right child → index 4 (value=4)
#   parent      → index 0 (value=1)
```

---

## Core Operations & Time Complexity

| Operation | Time | Notes |
|---|---|---|
| Peek min/max | O(1) | Root element |
| Insert | O(log n) | Bubble up |
| Extract min/max | O(log n) | Bubble down (heapify) |
| Build heap from array | O(n) | Not O(n log n) |
| Heap Sort | O(n log n) | In-place |
| Search arbitrary | O(n) | No ordering guarantee beyond parent < child |

---

## Building a Min-Heap from Scratch

```python
class MinHeap:
    def __init__(self):
        self.heap = []

    def _parent(self, i):    return (i - 1) // 2
    def _left(self, i):      return 2 * i + 1
    def _right(self, i):     return 2 * i + 2

    def peek(self):
        if not self.heap:
            raise IndexError("Heap is empty")
        return self.heap[0]

    def push(self, value):
        self.heap.append(value)
        self._bubble_up(len(self.heap) - 1)

    def _bubble_up(self, i):
        while i > 0:
            parent = self._parent(i)
            if self.heap[i] < self.heap[parent]:
                self.heap[i], self.heap[parent] = self.heap[parent], self.heap[i]
                i = parent
            else:
                break

    def pop(self):
        if not self.heap:
            raise IndexError("Heap is empty")
        # Swap root with last, remove last, then heapify down
        self.heap[0], self.heap[-1] = self.heap[-1], self.heap[0]
        min_val = self.heap.pop()
        self._bubble_down(0)
        return min_val

    def _bubble_down(self, i):
        n = len(self.heap)
        while True:
            smallest = i
            left, right = self._left(i), self._right(i)
            if left < n and self.heap[left] < self.heap[smallest]:
                smallest = left
            if right < n and self.heap[right] < self.heap[smallest]:
                smallest = right
            if smallest != i:
                self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
                i = smallest
            else:
                break

    def size(self):
        return len(self.heap)
```

### Usage
```python
h = MinHeap()
h.push(5)
h.push(1)
h.push(3)
h.push(2)

print(h.peek())   # → 1
print(h.pop())    # → 1
print(h.pop())    # → 2
```

---

## Python's `heapq` Module

Python's standard library provides a **min-heap** implementation:

```python
import heapq

# Build from a list — O(n)
nums = [5, 1, 3, 2, 4]
heapq.heapify(nums)
print(nums)  # → [1, 2, 3, 5, 4]  (heap-ordered)

# Push — O(log n)
heapq.heappush(nums, 0)

# Pop min — O(log n)
print(heapq.heappop(nums))  # → 0

# Peek min — O(1)
print(nums[0])  # → 1

# Push then pop (more efficient than separate push + pop)
heapq.heappushpop(nums, 6)
```

### Max-Heap Trick
Python only has min-heap. To simulate a max-heap, **negate the values**:

```python
import heapq

max_heap = []
for val in [5, 1, 3, 2, 4]:
    heapq.heappush(max_heap, -val)  # negate

print(-heapq.heappop(max_heap))  # → 5 (largest)
```

---

## Classic Heap Problems

### 1. Kth Largest Element
```python
import heapq

def find_kth_largest(nums, k):
    # Maintain a min-heap of size k
    heap = nums[:k]
    heapq.heapify(heap)  # O(k)
    for num in nums[k:]:
        if num > heap[0]:
            heapq.heapreplace(heap, num)  # O(log k)
    return heap[0]

# find_kth_largest([3,2,1,5,6,4], 2) → 5
```

### 2. Top K Frequent Elements
```python
from collections import Counter
import heapq

def top_k_frequent(nums, k):
    count = Counter(nums)
    return heapq.nlargest(k, count.keys(), key=count.get)

# top_k_frequent([1,1,1,2,2,3], 2) → [1, 2]
```

### 3. Merge K Sorted Lists
```python
import heapq

def merge_k_sorted(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))

    result = []
    while heap:
        val, list_idx, elem_idx = heapq.heappop(heap)
        result.append(val)
        next_idx = elem_idx + 1
        if next_idx < len(lists[list_idx]):
            heapq.heappush(heap, (lists[list_idx][next_idx], list_idx, next_idx))
    return result

# merge_k_sorted([[1,4,7],[2,5,8],[3,6,9]]) → [1,2,3,4,5,6,7,8,9]
```

### 4. Median of a Data Stream
Use two heaps: a max-heap for the lower half, a min-heap for the upper half:

```python
import heapq

class MedianFinder:
    def __init__(self):
        self.low = []   # max-heap (negated)
        self.high = []  # min-heap

    def add_num(self, num):
        heapq.heappush(self.low, -num)
        # Balance: ensure low's max ≤ high's min
        if self.high and -self.low[0] > self.high[0]:
            heapq.heappush(self.high, -heapq.heappop(self.low))
        # Balance sizes
        if len(self.low) > len(self.high) + 1:
            heapq.heappush(self.high, -heapq.heappop(self.low))
        elif len(self.high) > len(self.low):
            heapq.heappush(self.low, -heapq.heappop(self.high))

    def find_median(self):
        if len(self.low) > len(self.high):
            return -self.low[0]
        return (-self.low[0] + self.high[0]) / 2
```

---

## Heap Sort

Heap Sort uses a max-heap to sort in-place in **O(n log n)**:

```python
def heap_sort(arr):
    n = len(arr)

    # Build max-heap — O(n)
    for i in range(n // 2 - 1, -1, -1):
        _heapify_down(arr, n, i)

    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]       # move max to end
        _heapify_down(arr, i, 0)              # restore heap

def _heapify_down(arr, n, i):
    largest = i
    left, right = 2 * i + 1, 2 * i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        _heapify_down(arr, n, largest)

# heap_sort([64, 34, 25, 12, 22, 11, 90])
# → [11, 12, 22, 25, 34, 64, 90]
```

---

## Priority Queue (Real-World Usage)

```python
import heapq

# Task scheduling: (priority, task_name)
tasks = []
heapq.heappush(tasks, (3, "low priority task"))
heapq.heappush(tasks, (1, "urgent task"))
heapq.heappush(tasks, (2, "normal task"))

while tasks:
    priority, task = heapq.heappop(tasks)
    print(f"Processing: {task} (priority {priority})")

# Output:
# Processing: urgent task (priority 1)
# Processing: normal task (priority 2)
# Processing: low priority task (priority 3)
```

---

## Real-World Use Cases

| Use Case | How Heap Is Used |
|---|---|
| OS process scheduling | Priority queue for CPU job scheduling |
| Dijkstra's algorithm | Min-heap to always expand lowest-cost node |
| A* pathfinding | Priority queue for estimated cost |
| Huffman encoding | Build encoding tree from frequency min-heap |
| Event simulation | Process next event by earliest timestamp |
| Top-K recommendations | Maintain K best items efficiently |

---

## Summary

| Property | Min-Heap | Max-Heap |
|---|---|---|
| Root | Minimum element | Maximum element |
| Peek | O(1) | O(1) |
| Push | O(log n) | O(log n) |
| Pop | O(log n) | O(log n) |
| Build from array | O(n) | O(n) |
| Space | O(n) | O(n) |

The heap is a beautifully efficient structure — simple array storage, O(1) peek, and O(log n) push/pop. Whenever you need to repeatedly find the minimum or maximum from a changing dataset, a heap is your best tool.
