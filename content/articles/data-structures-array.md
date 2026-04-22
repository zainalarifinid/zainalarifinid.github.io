---
title: 'Data Structures - Array'
date: '2026-04-22'
description: 'A deep dive into Arrays — one of the most fundamental data structures in programming. Learn how they work, their time complexity, common operations, and practical use cases.'
tags: ['Data Structures', 'Computer Science', 'Algorithms', 'Beginners']
published: true
---

# Data Structures - Array

An **Array** is the most fundamental data structure in computer science. It stores a collection of elements in a **contiguous block of memory**, where each element is accessible by a numeric **index**.

Understanding arrays deeply is the gateway to understanding almost every other data structure.

---

## How an Array Works in Memory

When you declare an array, the system allocates a consecutive chunk of memory. Each element occupies the same amount of space (determined by its type), and the index maps directly to a memory address:

```
Index:    0      1      2      3      4
Value:  [ 10 ][ 20 ][ 30 ][ 40 ][ 50 ]
Memory: 1000   1004   1008   1012   1016  (4 bytes per integer)
```

Accessing `arr[2]` is calculated as:
```
address = base_address + (index × element_size)
address = 1000 + (2 × 4) = 1008
```

This is why random access is **O(1)** — it's just arithmetic.

---

## Types of Arrays

### 1. Static Array
Fixed size, declared at compile time. Cannot grow or shrink.

```c
int numbers[5] = {10, 20, 30, 40, 50};
```

### 2. Dynamic Array
Resizable at runtime. Internally, when the array is full, a new larger block is allocated and elements are copied over. Examples: `ArrayList` in Java, `list` in Python, `Vec` in Rust.

```python
# Python list is a dynamic array
numbers = [10, 20, 30]
numbers.append(40)  # grows automatically
```

### 3. Multi-Dimensional Array
Arrays of arrays, used for matrices, grids, images.

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(matrix[1][2])  # → 6
```

---

## Common Operations & Time Complexity

**Big O notation** describes how an operation's cost grows as the input size (`n`) increases. It measures the *worst-case* upper bound — how slow can it get?

| Notation | Name | What it means |
|---|---|---|
| O(1) | Constant | Always takes the same time, no matter how large the array |
| O(log n) | Logarithmic | Halves the problem each step — fast even on large inputs |
| O(n) | Linear | Visits each element once — doubles when array doubles |
| O(n log n) | Linearithmic | Typical of efficient sorting algorithms |
| O(n²) | Quadratic | Nested loops over the array — slows down fast |

For example, accessing `arr[5]` is **O(1)** because the CPU computes the memory address directly. Searching an unsorted array is **O(n)** because in the worst case every element must be checked.

| Operation | Time Complexity | Notes |
|---|---|---|
| Access by index | O(1) | Direct memory calculation |
| Search (unsorted) | O(n) | Must scan each element |
| Search (sorted) | O(log n) | Binary search possible |
| Insert at end | O(1) amortized | O(n) if resizing needed |
| Insert at position | O(n) | Shifts elements right |
| Delete at position | O(n) | Shifts elements left |
| Delete at end | O(1) | |

---

## Core Operations with Code Examples

### Traversal
```python
arr = [10, 20, 30, 40, 50]

# Forward
for item in arr:
    print(item)

# With index
for i, item in enumerate(arr):
    print(f"arr[{i}] = {item}")
```

### Insertion
```python
arr = [1, 2, 4, 5]

# Insert at end — O(1)
arr.append(6)

# Insert at specific position — O(n)
arr.insert(2, 3)  # → [1, 2, 3, 4, 5, 6]
```

### Deletion
```python
arr = [1, 2, 3, 4, 5]

# Remove by value — O(n)
arr.remove(3)  # → [1, 2, 4, 5]

# Remove by index — O(n)
del arr[1]  # → [1, 4, 5]

# Remove last — O(1)
arr.pop()  # → [1, 4]
```

### Searching
```python
# Linear search — O(n)
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

# Binary search (requires sorted array) — O(log n)
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

### Sorting
```python
arr = [64, 34, 25, 12, 22, 11, 90]

# Built-in — O(n log n), Timsort
arr.sort()

# Manual: Bubble Sort — O(n²), for learning only
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
```

---

## Classic Array Problems

### 1. Two Sum
Given an array, find two indices whose values sum to a target.

```python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# two_sum([2, 7, 11, 15], 9) → [0, 1]
```

### 2. Maximum Subarray (Kadane's Algorithm)
Find the contiguous subarray with the largest sum.

```python
def max_subarray(nums):
    max_sum = current_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum

# max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) → 6
```

### 3. Rotate Array
Rotate an array to the right by k steps.

```python
def rotate(nums, k):
    n = len(nums)
    k = k % n
    nums[:] = nums[-k:] + nums[:-k]

# rotate([1,2,3,4,5,6,7], 3) → [5,6,7,1,2,3,4]
```

### 4. Find Duplicates
```python
def find_duplicates(nums):
    seen = set()
    duplicates = []
    for num in nums:
        if num in seen:
            duplicates.append(num)
        seen.add(num)
    return duplicates
```

---

## Space Complexity

- A 1D array of `n` elements: **O(n)**
- A 2D array of `n × m` elements: **O(n × m)**

Dynamic arrays may over-allocate memory (typically 2× capacity) to make `append` amortized O(1).

---

## When to Use an Array

**Use arrays when:**
- You need fast random access by index
- The size is known or relatively stable
- You need cache-friendly memory layout (sequential access is fast)
- You're implementing other data structures (stacks, queues, heaps)

**Avoid arrays when:**
- You frequently insert/delete in the middle (use a Linked List)
- The size varies drastically and unpredictably
- You need key-based lookup (use a Hash Table)

---

## Arrays in JavaScript/TypeScript

```typescript
const arr: number[] = [1, 2, 3, 4, 5];

// Spread
const copy = [...arr];

// Destructuring
const [first, second, ...rest] = arr;

// Common higher-order functions
const doubled = arr.map(x => x * 2);
const evens = arr.filter(x => x % 2 === 0);
const sum = arr.reduce((acc, x) => acc + x, 0);

// Slice vs Splice
const sliced = arr.slice(1, 3);     // non-mutating → [2, 3]
arr.splice(1, 2);                    // mutating, removes 2 elements from index 1
```

---

## Production Examples

These are real-world patterns where arrays appear in production code — not toy examples, but the actual shape of logic you'd find in a codebase.

### 1. Pagination — Slicing a Result Set

When an API returns a paginated list, you slice an array based on `page` and `pageSize`.

| Operation | Complexity | Notes |
|---|---|---|
| `slice(start, end)` | O(pageSize) | Copies only the page window, not the whole array |
| `items.length` | O(1) | Array length is stored as a property |
| Overall | O(pageSize) | Independent of total `n` |

```typescript
// api/products.ts
interface Product {
  id: string;
  name: string;
  price: number;
}

function paginateResults<T>(items: T[], page: number, pageSize: number): {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
} {
  const total = items.length;                  // O(1)
  const totalPages = Math.ceil(total / pageSize); // O(1)
  const start = (page - 1) * pageSize;         // O(1)
  const data = items.slice(start, start + pageSize); // O(pageSize)

  return { data, total, totalPages, currentPage: page };
}

// Usage
const products: Product[] = fetchAllProducts(); // assume this returns Product[]
const result = paginateResults(products, 2, 10);
// Returns page 2 with 10 items, total count, and page metadata
```

---

### 2. Feature Flag List — Checking Permissions

A common pattern in multi-tenant apps: store a user's enabled features as a string array and check membership.

| Operation | Complexity | Notes |
|---|---|---|
| `hasFeature` | O(f) | Linear scan through `enabledFeatures` (length f) |
| `hasAllFeatures` | O(f × k) | k = features to check, each does O(f) scan |
| `hasAnyFeature` | O(f × k) worst | Stops early on first match |
| **Tip** | O(1) lookup | Convert `enabledFeatures` to a `Set` if called frequently |

```typescript
// auth/permissions.ts
type Feature = 'analytics' | 'export' | 'api_access' | 'admin_panel';

interface User {
  id: string;
  enabledFeatures: Feature[];
}

function hasFeature(user: User, feature: Feature): boolean {
  return user.enabledFeatures.includes(feature); // O(f)
}

function hasAllFeatures(user: User, features: Feature[]): boolean {
  return features.every(f => user.enabledFeatures.includes(f)); // O(f × k)
}

function hasAnyFeature(user: User, features: Feature[]): boolean {
  return features.some(f => user.enabledFeatures.includes(f)); // O(f × k) worst
}

// O(1) lookup alternative — use a Set for hot paths
function buildFeatureSet(user: User): Set<Feature> {
  return new Set(user.enabledFeatures); // O(f) to build, O(1) per lookup
}

// Usage
const user: User = {
  id: 'u_123',
  enabledFeatures: ['analytics', 'export'],
};

console.log(hasFeature(user, 'analytics'));              // true
console.log(hasAllFeatures(user, ['analytics', 'api_access'])); // false
```

---

### 3. Rolling Average — Metrics / Monitoring Dashboard

Monitoring systems keep a fixed-size window of recent measurements and compute a rolling average.

| Operation | Complexity | Notes |
|---|---|---|
| `add(value)` | O(1) amortized | `push` is O(1); `shift` is O(w) where w = window size |
| `average` (getter) | O(1) | Sum is maintained incrementally — no recomputation |
| `current` (getter) | O(w) | Copies the window array |
| Space | O(w) | Only the fixed window is stored, not all history |

> **Note:** `Array.shift()` is O(w) because it shifts all remaining elements left. For high-frequency data, replace the array with a circular buffer using a fixed array + index pointer to get true O(1) eviction.

```typescript
// monitoring/rollingAverage.ts
class RollingAverage {
  private window: number[];
  private size: number;
  private sum: number = 0;

  constructor(windowSize: number) {
    this.size = windowSize;
    this.window = [];
  }

  add(value: number): void {
    if (this.window.length === this.size) {
      this.sum -= this.window.shift()!; // O(w) — evict oldest
    }
    this.window.push(value);           // O(1) amortized
    this.sum += value;                 // O(1) — no full recompute
  }

  get average(): number {
    if (this.window.length === 0) return 0;
    return this.sum / this.window.length; // O(1)
  }

  get current(): number[] {
    return [...this.window]; // O(w)
  }
}

// Usage: track last 5 response times (ms)
const responseTimeMonitor = new RollingAverage(5);
[120, 135, 98, 210, 105, 88, 145].forEach(ms => {
  responseTimeMonitor.add(ms);
  console.log(`Avg response: ${responseTimeMonitor.average.toFixed(1)}ms`);
});
```

---

### 4. Batch Processing — Chunking API Requests

When calling an external API with rate limits, split a large array into fixed-size chunks and process them in batches.

| Operation | Complexity | Notes |
|---|---|---|
| `chunk(arr, size)` | O(n) time, O(n) space | Iterates once; each `slice` copies `size` elements |
| `sendEmailsInBatches` | O(n) work + I/O | n/batchSize sequential rounds, each with batchSize parallel calls |
| Space | O(n) | All chunks together hold the full array |

```typescript
// utils/batch.ts
function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {  // O(n/size) iterations
    chunks.push(arr.slice(i, i + size));          // O(size) per slice → O(n) total
  }
  return chunks; // O(n) total time, O(n) space
}

async function sendEmailsInBatches(
  userIds: string[],
  batchSize: number = 50
): Promise<void> {
  const batches = chunk(userIds, batchSize); // O(n)

  for (const batch of batches) {             // n/batchSize rounds
    await Promise.all(batch.map(id => sendEmail(id))); // batchSize parallel calls
    await delay(1000); // Respect rate limits between batches
  }
}

// Usage: send to 500 users, 50 at a time
const allUserIds = fetchUserIds(); // string[] of 500 IDs
await sendEmailsInBatches(allUserIds, 50);
```

---

### 5. Undo / Redo — Editor or Form History

Text editors, spreadsheets, and form builders maintain an array of past states to support undo/redo.

| Operation | Complexity | Notes |
|---|---|---|
| `push(state)` | O(h) worst | `slice` to truncate future history copies up to h elements |
| `undo()` | O(1) | Just decrements the cursor and reads by index |
| `redo()` | O(1) | Just increments the cursor and reads by index |
| `current` (getter) | O(1) | Direct index access |
| Space | O(h) | h = number of history states stored |

> **Tip:** If states are large objects (e.g., full document snapshots), store **diffs/patches** instead of full copies to reduce space from O(h × stateSize) to O(h × diffSize).

```typescript
// state/historyManager.ts
class HistoryManager<T> {
  private history: T[];
  private cursor: number;

  constructor(initialState: T) {
    this.history = [initialState];
    this.cursor = 0;
  }

  push(state: T): void {
    // Discard any "future" states after current position — O(h) copy
    this.history = this.history.slice(0, this.cursor + 1);
    this.history.push(state); // O(1) amortized
    this.cursor++;
  }

  undo(): T | null {
    if (this.cursor === 0) return null;
    this.cursor--;                     // O(1)
    return this.history[this.cursor];  // O(1) index access
  }

  redo(): T | null {
    if (this.cursor === this.history.length - 1) return null;
    this.cursor++;                     // O(1)
    return this.history[this.cursor];  // O(1) index access
  }

  get current(): T {
    return this.history[this.cursor]; // O(1)
  }
}

// Usage: document editor
const editor = new HistoryManager('Hello');
editor.push('Hello World');
editor.push('Hello World!');
console.log(editor.undo());  // 'Hello World'
console.log(editor.undo());  // 'Hello'
console.log(editor.redo());  // 'Hello World'
```

---

### 6. Priority Queue for Task Scheduling

A sorted array backing a simple priority queue for scheduling jobs by priority level.

| Operation | Complexity | Notes |
|---|---|---|
| `enqueue(task)` | O(n log n) | `push` is O(1), but `sort` re-sorts the whole array |
| `dequeue()` | O(n) | `shift` removes from front, shifts all elements left |
| `processAll()` | O(n² log n) | n dequeues × O(n log n) per enqueue if mixed with inserts |
| Space | O(n) | Stores all pending tasks |
| **Tip** | O(log n) enqueue/dequeue | Use a binary **Heap** (min-heap) instead for high-throughput queues |

```typescript
// scheduler/taskQueue.ts
interface Task {
  id: string;
  priority: number; // Higher = more urgent
  payload: () => Promise<void>;
}

class PriorityTaskQueue {
  private tasks: Task[] = [];

  enqueue(task: Task): void {
    this.tasks.push(task);                          // O(1) amortized
    this.tasks.sort((a, b) => b.priority - a.priority); // O(n log n) — re-sort
  }

  dequeue(): Task | undefined {
    return this.tasks.shift(); // O(n) — shifts all remaining elements
  }

  async processAll(): Promise<void> {
    while (this.tasks.length > 0) {
      const task = this.dequeue()!; // O(n) per call
      await task.payload();
    }
  }

  get pending(): number {
    return this.tasks.length; // O(1)
  }
}

// Usage
const queue = new PriorityTaskQueue();
queue.enqueue({ id: 'email', priority: 1, payload: sendEmail });
queue.enqueue({ id: 'report', priority: 3, payload: generateReport });
queue.enqueue({ id: 'audit', priority: 2, payload: runAuditLog });

await queue.processAll(); // Processes: report → audit → email
```

---

### 7. CSV / Table Data — Spreadsheet-Like Operations

Backend services and data pipelines represent tabular data as arrays of objects and apply array operations to transform or filter rows.

| Operation | Complexity | Notes |
|---|---|---|
| `filter` | O(n) | Single pass; output size ≤ n |
| `reduce` (groupBy) | O(n) | Single pass with O(1) hash map insertions |
| `sort` | O(n log n) | V8 uses Timsort |
| `slice(0, 5)` | O(1) | Copies only 5 elements regardless of n |
| `map` | O(k) | k = result size after slice (5 here) |
| **Overall pipeline** | O(n log n) | Dominated by `sort` |
| Space | O(n) | `filter` and spread `[...thisYear]` each allocate up to n elements |

```typescript
// reports/salesReport.ts
interface SalesRecord {
  region: string;
  product: string;
  revenue: number;
  units: number;
  date: string;
}

function buildSalesReport(records: SalesRecord[]) {
  const currentYear = new Date().getFullYear().toString();

  const thisYear = records.filter(r => r.date.startsWith(currentYear)); // O(n)

  const byRegion = thisYear.reduce<Record<string, number>>((acc, r) => { // O(n)
    acc[r.region] = (acc[r.region] ?? 0) + r.revenue;
    return acc;
  }, {});

  const topProducts = [...thisYear]          // O(n) copy
    .sort((a, b) => b.revenue - a.revenue)   // O(n log n)
    .slice(0, 5)                             // O(1)
    .map(r => ({ product: r.product, revenue: r.revenue })); // O(5) = O(1)

  const totalRevenue = thisYear.reduce((sum, r) => sum + r.revenue, 0); // O(n)

  return { byRegion, topProducts, totalRevenue };
}
```

---

## Summary

| Property | Value |
|---|---|
| Memory layout | Contiguous |
| Access | O(1) by index |
| Insertion at end | O(1) amortized |
| Insertion in middle | O(n) |
| Deletion | O(n) |
| Search (unsorted) | O(n) |
| Search (sorted) | O(log n) |
| Space | O(n) |

Arrays are the building block of almost every other data structure. Master them first, and the rest will follow.
