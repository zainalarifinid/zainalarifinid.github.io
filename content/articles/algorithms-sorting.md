---
title: "Sorting Algorithms: Bubble, Merge, Quick, and Heap Sort"
date: "2026-04-23"
description: "A deep dive into the four essential sorting algorithms every software engineer must know — with implementations, complexity analysis, and when to use each."
tags: ["Algorithms", "Sorting", "Computer Science", "Beginners"]
published: true
---

# Sorting Algorithms: Bubble, Merge, Quick, and Heap Sort

Sorting is one of the most fundamental operations in computer science. From organizing search results to preprocessing data for binary search, a solid understanding of sorting algorithms — and their trade-offs — is essential for every software engineer.

---

## Why Sorting Matters

Before you can search efficiently, you usually need sorted data. Sorting also appears indirectly in many algorithms: merge sort is the foundation of external sorting, quicksort is used in most standard library `sort()` implementations, and heapsort is the basis of priority queues.

---

## 1. Bubble Sort

### How It Works

Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. After each full pass, the largest unsorted element "bubbles" to its correct position at the end.

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break  # Already sorted — early exit
    return arr

# Example
print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))
# Output: [11, 12, 22, 25, 34, 64, 90]
```

### Complexity

| Case      | Time        | Space |
|-----------|-------------|-------|
| Best      | O(n)        | O(1)  |
| Average   | O(n²)       | O(1)  |
| Worst     | O(n²)       | O(1)  |

- **Stable**: Yes (equal elements maintain original order)
- **In-place**: Yes

### When to Use

Bubble Sort is almost never used in production. It's taught because it's easy to understand — the concept of "comparing neighbors and swapping" maps directly to intuition. The early-exit optimization makes it O(n) on already-sorted arrays, but otherwise it's too slow for anything non-trivial.

---

## 2. Merge Sort

### How It Works

Merge Sort uses the **divide and conquer** strategy:
1. Divide the array into two halves.
2. Recursively sort each half.
3. Merge the two sorted halves into one sorted array.

The key insight is that merging two sorted arrays is O(n), and the depth of recursion is O(log n).

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Example
print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
# Output: [3, 9, 10, 27, 38, 43, 82]
```

### Visual Walkthrough

```
[38, 27, 43, 3, 9, 82, 10]
        /              \
[38, 27, 43]       [3, 9, 82, 10]
   /      \           /       \
[38]  [27, 43]     [3, 9]   [82, 10]
        / \          / \      /   \
      [27] [43]    [3] [9] [82]  [10]

Merge up:
[27, 43] → merge → [27, 43]
[38] + [27, 43] → [27, 38, 43]
[3, 9], [10, 82] → merge up → [3, 9, 10, 82]
[27, 38, 43] + [3, 9, 10, 82] → [3, 9, 10, 27, 38, 43, 82]
```

### Complexity

| Case      | Time       | Space  |
|-----------|------------|--------|
| Best      | O(n log n) | O(n)   |
| Average   | O(n log n) | O(n)   |
| Worst     | O(n log n) | O(n)   |

- **Stable**: Yes
- **In-place**: No (requires O(n) auxiliary space)

### When to Use

- When **stable sorting** is required (e.g., sorting objects by multiple keys)
- When sorting **linked lists** (no random access needed, O(1) space possible)
- **External sorting** (datasets too large to fit in memory)
- When guaranteed O(n log n) worst case matters more than memory

---

## 3. Quick Sort

### How It Works

Quick Sort is also divide and conquer, but it partitions in-place:
1. Choose a **pivot** element.
2. **Partition**: rearrange so elements less than pivot are on the left, greater on the right.
3. Recursively sort both sides.

The choice of pivot is critical — a bad pivot (e.g., always choosing the smallest element) leads to O(n²).

```python
def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]  # Choose last element as pivot
    i = low - 1        # Index of smaller element

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example
arr = [10, 7, 8, 9, 1, 5]
print(quick_sort(arr))
# Output: [1, 5, 7, 8, 9, 10]
```

### Pivot Strategies

```python
import random

def quick_sort_random(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        # Randomized pivot to avoid worst-case O(n²)
        rand_idx = random.randint(low, high)
        arr[rand_idx], arr[high] = arr[high], arr[rand_idx]
        pivot_index = partition(arr, low, high)
        quick_sort_random(arr, low, pivot_index - 1)
        quick_sort_random(arr, pivot_index + 1, high)
    return arr
```

### Complexity

| Case      | Time       | Space     |
|-----------|------------|-----------|
| Best      | O(n log n) | O(log n)  |
| Average   | O(n log n) | O(log n)  |
| Worst     | O(n²)      | O(n)      |

- **Stable**: No (standard partition swaps non-adjacent elements)
- **In-place**: Yes (O(log n) stack space)

### When to Use

- General-purpose in-memory sorting — most language standard libraries use quicksort or introsort (quicksort + heapsort fallback)
- When average-case performance matters more than worst case
- With random pivot or median-of-three, worst case is extremely rare in practice

---

## 4. Heap Sort

### How It Works

Heap Sort uses the **max-heap** data structure:
1. Build a max-heap from the input array — O(n)
2. Repeatedly extract the maximum (root) and place it at the end — O(n log n)

```python
def heap_sort(arr):
    n = len(arr)

    # Step 1: Build a max-heap
    # Start from the last non-leaf node and heapify down
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # Step 2: Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # Move current root to end
        heapify(arr, i, 0)               # Re-heapify the reduced heap

    return arr

def heapify(arr, n, i):
    largest = i       # Assume root is largest
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left

    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)  # Recursively heapify the affected subtree

# Example
arr = [12, 11, 13, 5, 6, 7]
print(heap_sort(arr))
# Output: [5, 6, 7, 11, 12, 13]
```

### Step-by-Step Example

```
Input: [12, 11, 13, 5, 6, 7]

Build max-heap:
[13, 11, 12, 5, 6, 7]

Extract max (13), heapify:
[12, 11, 7, 5, 6, | 13]

Extract max (12), heapify:
[11, 6, 7, 5, | 12, 13]

...continue until:
[5, 6, 7, 11, 12, 13]
```

### Complexity

| Case      | Time       | Space |
|-----------|------------|-------|
| Best      | O(n log n) | O(1)  |
| Average   | O(n log n) | O(1)  |
| Worst     | O(n log n) | O(1)  |

- **Stable**: No
- **In-place**: Yes (O(1) extra space)

### When to Use

- When you need **guaranteed O(n log n)** with **O(1) space**
- Embedded systems or memory-constrained environments
- As a fallback in introsort (used by C++ STL `std::sort`)

---

## Comparison Table

| Algorithm   | Best       | Average    | Worst      | Space    | Stable |
|-------------|------------|------------|------------|----------|--------|
| Bubble Sort | O(n)       | O(n²)      | O(n²)      | O(1)     | Yes    |
| Merge Sort  | O(n log n) | O(n log n) | O(n log n) | O(n)     | Yes    |
| Quick Sort  | O(n log n) | O(n log n) | O(n²)      | O(log n) | No     |
| Heap Sort   | O(n log n) | O(n log n) | O(n log n) | O(1)     | No     |

---

## Classic Problems

### 1. Sort Colors (Dutch National Flag)
Sort an array of 0s, 1s, and 2s in-place without counting.

```python
def sort_colors(nums):
    low, mid, high = 0, 0, len(nums) - 1

    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1

    return nums

print(sort_colors([2, 0, 2, 1, 1, 0]))
# Output: [0, 0, 1, 1, 2, 2]
```

### 2. Merge Intervals
Given a list of intervals, merge overlapping ones.

```python
def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])

    return merged

print(merge_intervals([[1,3],[2,6],[8,10],[15,18]]))
# Output: [[1, 6], [8, 10], [15, 18]]
```

### 3. K-th Largest Element
Find the k-th largest element using a partial quicksort (QuickSelect).

```python
def find_kth_largest(nums, k):
    def quick_select(arr, low, high, k_index):
        pivot_index = partition(arr, low, high)
        if pivot_index == k_index:
            return arr[pivot_index]
        elif pivot_index < k_index:
            return quick_select(arr, pivot_index + 1, high, k_index)
        else:
            return quick_select(arr, low, pivot_index - 1, k_index)

    target = len(nums) - k  # k-th largest = (n-k)-th smallest
    return quick_select(nums, 0, len(nums) - 1, target)

print(find_kth_largest([3, 2, 1, 5, 6, 4], 2))
# Output: 5
```

### 4. Count Inversions (Modified Merge Sort)
Count pairs (i, j) where i < j but arr[i] > arr[j].

```python
def count_inversions(arr):
    if len(arr) <= 1:
        return arr, 0

    mid = len(arr) // 2
    left, left_inv = count_inversions(arr[:mid])
    right, right_inv = count_inversions(arr[mid:])

    merged = []
    inversions = left_inv + right_inv
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            inversions += len(left) - i  # All remaining left elements form inversions
            j += 1

    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged, inversions

_, inv = count_inversions([2, 4, 1, 3, 5])
print(inv)  # Output: 3
```

---

## Real-World Use Cases

| Algorithm   | Real-World Use                                               |
|-------------|--------------------------------------------------------------|
| Merge Sort  | External sort (database query results), stable multi-key sort |
| Quick Sort  | Standard library `sort()` in most languages, database indexes |
| Heap Sort   | Embedded systems, introsort fallback in C++ STL               |
| Bubble Sort | Teaching only — visualizing the swap concept                  |

---

## Summary

- **Bubble Sort**: Simple, O(n²) — only useful for teaching
- **Merge Sort**: Stable, O(n log n) always, needs O(n) space — great for external/linked-list sorting
- **Quick Sort**: Fast in practice, O(n log n) average, O(n²) worst — the go-to for in-memory sorting
- **Heap Sort**: O(n log n) always, O(1) space — best when memory is critical
- For most practical use cases, use your language's built-in `sort()` — it's already optimized (Python uses Timsort, a hybrid of merge + insertion sort)
