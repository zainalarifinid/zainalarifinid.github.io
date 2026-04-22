---
title: "Big O Notation: Analyzing Time and Space Complexity"
date: "2026-04-23"
description: "Master Big O notation — understand how to analyze algorithm efficiency, compare time and space complexities, and reason about performance at scale."
tags: ["Algorithms", "Big O", "Computer Science", "Beginners"]
published: true
---

# Big O Notation: Analyzing Time and Space Complexity

Before you can choose the right algorithm or data structure, you need a language to describe and compare their efficiency. That language is **Big O notation** — a mathematical framework for expressing how an algorithm's resource usage grows as input size increases.

---

## What Is Big O Notation?

Big O describes the **upper bound** of an algorithm's growth rate, focusing on the **dominant term** and ignoring constants. It answers: "As n grows very large, how does the number of operations scale?"

| Notation   | Name         | Example                              |
|------------|--------------|--------------------------------------|
| O(1)       | Constant     | Array access, hash table lookup      |
| O(log n)   | Logarithmic  | Binary search, balanced BST ops      |
| O(n)       | Linear       | Linear scan, single loop             |
| O(n log n) | Linearithmic | Merge sort, heap sort                |
| O(n²)      | Quadratic    | Bubble sort, nested loops            |
| O(n³)      | Cubic        | 3-nested loops, some matrix ops      |
| O(2ⁿ)      | Exponential  | Recursive Fibonacci, subset enumeration |
| O(n!)      | Factorial    | Permutation generation, TSP brute force |

---

## Growth Rate Comparison

As n grows, the difference becomes enormous:

```
n = 10:      O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)
             1       3          10       33           100     1024     3628800

n = 100:     1       7          100      664          10000   1.27×10³⁰   ...
n = 1000:    1       10         1000     9966         10⁶     10³⁰¹  ...
```

At n=100, O(2ⁿ) already produces more operations than atoms in the observable universe.

---

## Formal Definition

Big O is defined mathematically as:

$f(n) = O(g(n))$ means there exist constants $c > 0$ and $n_0$ such that:

$$f(n) \leq c \cdot g(n) \text{ for all } n \geq n_0$$

In plain terms: $f$ grows **no faster** than $g$ for large enough $n$.

### Related Notations

| Notation   | Meaning                        | Common Name  |
|------------|--------------------------------|--------------|
| O(g)       | Upper bound — grows at most as fast | "Big O"  |
| Ω(g)       | Lower bound — grows at least as fast | "Big Omega" |
| Θ(g)       | Tight bound — grows at exactly the same rate | "Big Theta" |

When people say "this algorithm is O(n log n)", they usually mean Θ(n log n) — both upper and lower bounds match.

---

## Time Complexity Analysis

### O(1) — Constant Time

The number of operations does not change with input size.

```python
def get_first(arr):
    return arr[0]  # Always 1 operation, regardless of array size

def is_even(n):
    return n % 2 == 0

def hash_lookup(d, key):
    return d.get(key)  # O(1) average for hash tables
```

### O(log n) — Logarithmic Time

The input is halved (or reduced by a constant factor) at each step.

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:          # Each iteration halves the search space
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# n=1000 → ~10 comparisons
# n=1000000 → ~20 comparisons
# n=1000000000 → ~30 comparisons
```

### O(n) — Linear Time

A single pass through the input.

```python
def find_max(arr):
    max_val = arr[0]
    for x in arr:      # n iterations
        if x > max_val:
            max_val = x
    return max_val

def two_sum_linear(nums, target):
    seen = {}
    for i, num in enumerate(nums):   # n iterations
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
```

### O(n log n) — Linearithmic Time

Divide and conquer or sorting-based algorithms.

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])    # T(n/2)
    right = merge_sort(arr[mid:])   # T(n/2)
    return merge(left, right)       # O(n)
# Recurrence: T(n) = 2T(n/2) + O(n) → O(n log n)
```

### O(n²) — Quadratic Time

Nested loops, each iterating n times.

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):           # n iterations
        for j in range(n - i - 1):   # n iterations
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

def find_all_pairs(arr):
    pairs = []
    for i in range(len(arr)):       # n iterations
        for j in range(i + 1, len(arr)):  # up to n iterations
            pairs.append((arr[i], arr[j]))
    # Total: n(n-1)/2 = O(n²) pairs
```

### O(2ⁿ) — Exponential Time

Recursive algorithms that branch in two at each step.

```python
def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)  # 2 branches, depth n → 2^n calls

def all_subsets(arr):
    if not arr:
        return [[]]
    first = arr[0]
    rest_subsets = all_subsets(arr[1:])
    return rest_subsets + [[first] + s for s in rest_subsets]  # 2^n subsets
```

### O(n!) — Factorial Time

Generating all permutations.

```python
def permutations(arr):
    if len(arr) <= 1:
        return [arr]
    result = []
    for i, elem in enumerate(arr):
        rest = permutations(arr[:i] + arr[i+1:])
        result.extend([elem] + p for p in rest)
    return result
# n=10: 3,628,800 permutations
# n=15: 1,307,674,368,000 permutations
```

---

## Rules for Simplifying Big O

### Rule 1: Drop Constants

```python
# O(2n) → O(n)
def two_passes(arr):
    for x in arr: pass   # O(n)
    for x in arr: pass   # O(n)
    # Total: 2n = O(n)

# O(100) → O(1)
def constant_work():
    for i in range(100): pass  # O(1) — fixed iterations, not input-dependent
```

### Rule 2: Drop Non-Dominant Terms

```python
# O(n² + n) → O(n²)
def mixed(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):   # O(n²)
            pass
    for x in arr:                   # O(n) — dominated, dropped
        pass
```

### Rule 3: Different Inputs — Different Variables

```python
# NOT O(n²) — it's O(a × b)
def process_two(arr_a, arr_b):
    for a in arr_a:          # len(arr_a) iterations
        for b in arr_b:      # len(arr_b) iterations
            pass
```

### Rule 4: Sequential Steps Add, Nested Steps Multiply

```python
def example(arr):
    # Step 1: O(n) — sequential
    for x in arr:
        pass
    # Step 2: O(n²) — sequential
    for i in arr:
        for j in arr:
            pass
    # Total: O(n + n²) = O(n²)

def example2(arr):
    for i in arr:
        for j in arr:   # O(n) nested INSIDE O(n) = O(n × n) = O(n²)
            pass
```

---

## Space Complexity

Space complexity measures **how much extra memory** an algorithm uses relative to input size.

### O(1) — Constant Space

```python
def find_max(arr):
    max_val = arr[0]   # Only 1 extra variable
    for x in arr:
        max_val = max(max_val, x)
    return max_val
```

### O(n) — Linear Space

```python
def copy_array(arr):
    return arr[:]   # Creates a new array of size n

def two_sum(nums, target):
    seen = {}    # Hash map grows to size n
    for num in nums:
        if target - num in seen:
            return True
        seen[num] = True
    return False
```

### O(log n) — Logarithmic Space (Recursion Stack)

```python
def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)
# Recursion depth = log n → O(log n) stack space
```

### O(n) — Linear Space (Recursion Stack)

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)   # n recursive calls on stack
```

---

## Best, Average, and Worst Case

Big O is typically used for worst-case analysis, but the three cases matter:

| Algorithm    | Best Case  | Average Case | Worst Case |
|--------------|------------|--------------|------------|
| Linear Search| O(1)       | O(n)         | O(n)       |
| Binary Search| O(1)       | O(log n)     | O(log n)   |
| Bubble Sort  | O(n)       | O(n²)        | O(n²)      |
| Quick Sort   | O(n log n) | O(n log n)   | O(n²)      |
| Hash Lookup  | O(1)       | O(1)         | O(n)*      |

*Hash table worst case is O(n) due to collision chaining, but very rare with good hash functions.

---

## Amortized Analysis

Some operations are expensive occasionally but cheap on average. Amortized analysis averages cost over a sequence of operations.

**Example — Dynamic Array (Python list)**:

```python
lst = []
for i in range(n):
    lst.append(i)   # Usually O(1), but O(n) when resizing

# Resizing doubles capacity: cost per resize = current size
# But resizes happen at 1, 2, 4, 8, 16... → total extra work = n
# Amortized per append: O(1)
```

---

## Practical Performance Targets

Use these rules of thumb in interviews and real-world systems:

| n                 | Acceptable complexity |
|-------------------|-----------------------|
| ≤ 10              | O(n!), O(2ⁿ) fine     |
| ≤ 20              | O(2ⁿ) possible        |
| ≤ 100             | O(n³) or O(n²) fine   |
| ≤ 1,000           | O(n²) fine            |
| ≤ 10,000          | O(n²) borderline      |
| ≤ 100,000         | O(n log n) required   |
| ≤ 1,000,000       | O(n) or O(n log n)    |
| > 10,000,000      | O(n) or O(log n)      |

---

## Common Algorithm Complexities at a Glance

### Sorting

| Algorithm    | Best       | Average    | Worst      | Space    |
|--------------|------------|------------|------------|----------|
| Bubble Sort  | O(n)       | O(n²)      | O(n²)      | O(1)     |
| Selection    | O(n²)      | O(n²)      | O(n²)      | O(1)     |
| Insertion    | O(n)       | O(n²)      | O(n²)      | O(1)     |
| Merge Sort   | O(n log n) | O(n log n) | O(n log n) | O(n)     |
| Quick Sort   | O(n log n) | O(n log n) | O(n²)      | O(log n) |
| Heap Sort    | O(n log n) | O(n log n) | O(n log n) | O(1)     |
| Tim Sort     | O(n)       | O(n log n) | O(n log n) | O(n)     |

### Data Structures

| Structure       | Access  | Search  | Insert  | Delete  |
|-----------------|---------|---------|---------|---------|
| Array           | O(1)    | O(n)    | O(n)    | O(n)    |
| Linked List     | O(n)    | O(n)    | O(1)*   | O(1)*   |
| Hash Table      | N/A     | O(1)*   | O(1)*   | O(1)*   |
| BST (balanced)  | N/A     | O(log n)| O(log n)| O(log n)|
| Heap            | O(1)**  | O(n)    | O(log n)| O(log n)|

*Average case. ** Only for min/max.

---

## Analyzing Recursive Algorithms: The Master Theorem

For recurrences of the form $T(n) = a \cdot T(n/b) + f(n)$:

$$T(n) = a \cdot T\left(\frac{n}{b}\right) + O(n^d)$$

| Condition              | Result       | Example                     |
|------------------------|--------------|-----------------------------|
| $a < b^d$              | O(n^d)       | Binary search: 1 < 2¹ → O(n⁰) = O(1) ... actually O(log n) |
| $a = b^d$              | O(n^d log n) | Merge sort: 2 = 2¹ → O(n log n) |
| $a > b^d$              | O(n^{log_b a}) | — |

**Merge Sort**: $T(n) = 2T(n/2) + O(n)$ → a=2, b=2, d=1 → a=b^d → O(n log n)

---

## Tips for Big O in Interviews

1. **Always state your complexity** — both time and space.
2. **Justify it briefly**: "We iterate through each element once — O(n)."
3. **Identify the input variables**: Is it `n` elements? `V` vertices + `E` edges? `m×n` grid?
4. **Recognize patterns**:
   - Single loop → O(n)
   - Nested loop → O(n²)
   - Halving → O(log n)
   - Loop + halving → O(n log n)
   - Recursion tree with branching factor b, depth d → O(b^d)
5. **Consider average vs. worst case**: Hash table is O(1) average, O(n) worst.
6. **Space includes the call stack**: Recursive algorithms use O(depth) stack space.

---

## Summary

- **Big O** describes the upper bound on how resource usage scales with input size.
- **Drop constants and non-dominant terms**: O(3n² + 5n + 100) = O(n²).
- **Time complexity** counts the number of operations; **space complexity** counts extra memory.
- **Worst case** is the standard for comparison, but amortized and average cases matter in practice.
- **The Master Theorem** solves divide-and-conquer recurrences systematically.
- Use the practical n-size table to quickly judge if your solution is fast enough.
