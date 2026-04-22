---
title: "Greedy Algorithms: Locally Optimal, Globally Optimal"
date: "2026-04-23"
description: "Learn how greedy algorithms work, when they produce optimal solutions, and how to apply them to classic problems like activity selection, interval scheduling, and Huffman coding."
tags: ["Algorithms", "Greedy", "Computer Science", "Beginners"]
published: true
---

# Greedy Algorithms: Locally Optimal, Globally Optimal

A greedy algorithm makes the **locally optimal choice** at each step, hoping it leads to the **globally optimal solution**. When it works, it's fast and elegant. When it doesn't, it produces incorrect results — which is why understanding *when* to use greedy is just as important as *how* to implement it.

---

## The Core Idea

At each decision point, a greedy algorithm picks the best-looking option without reconsidering past choices. There's no backtracking, no looking ahead, no storing intermediate states.

**Contrast with Dynamic Programming**:
- DP: Explores all possible subproblems and picks the best result.
- Greedy: Commits to one choice at each step, never revisiting.

Greedy is faster (often O(n log n) or O(n)), but only correct for problems with two mathematical properties:

1. **Greedy Choice Property**: A locally optimal choice can always be part of a globally optimal solution.
2. **Optimal Substructure**: The optimal solution to a problem includes the optimal solution to its subproblems.

---

## Classic Problem 1: Activity Selection

**Problem**: Given n activities with start and end times, select the maximum number of non-overlapping activities.

**Greedy strategy**: Always pick the activity that **ends earliest** among remaining compatible activities.

```python
def activity_selection(activities):
    # Sort by end time
    activities.sort(key=lambda x: x[1])

    selected = [activities[0]]
    last_end = activities[0][1]

    for start, end in activities[1:]:
        if start >= last_end:   # No overlap with last selected
            selected.append((start, end))
            last_end = end

    return selected

activities = [(1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11), (8,12), (2,14)]
print(activity_selection(activities))
# Output: [(1, 4), (5, 7), (8, 11)]  — 3 activities
```

**Why "earliest end time" works**: By choosing the activity that ends soonest, you leave the maximum time remaining for other activities. Any other choice would leave less room.

---

## Classic Problem 2: Interval Scheduling Maximization

**Problem**: Same as activity selection — find the maximum number of non-conflicting intervals.

```python
def max_non_overlapping(intervals):
    intervals.sort(key=lambda x: x[1])  # Sort by end time
    count = 0
    last_end = float('-inf')

    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end

    return count

print(max_non_overlapping([[1,2],[2,3],[3,4],[1,3]]))
# Output: 3
```

---

## Classic Problem 3: Minimum Number of Platforms

**Problem**: Given arrival and departure times of trains, find the minimum number of platforms needed.

```python
def min_platforms(arrivals, departures):
    arrivals.sort()
    departures.sort()

    platforms = 1
    max_platforms = 1
    i = 1  # Pointer into arrivals
    j = 0  # Pointer into departures

    while i < len(arrivals) and j < len(departures):
        if arrivals[i] <= departures[j]:
            platforms += 1
            i += 1
        else:
            platforms -= 1
            j += 1
        max_platforms = max(max_platforms, platforms)

    return max_platforms

arrivals   = [900, 940, 950, 1100, 1500, 1800]
departures = [910, 1200, 1120, 1130, 1900, 2000]
print(min_platforms(arrivals, departures))  # Output: 3
```

---

## Classic Problem 4: Jump Game

**Problem**: Given an array where `nums[i]` is the max jump length from position i, determine if you can reach the last index.

```python
def can_jump(nums):
    max_reach = 0

    for i, jump in enumerate(nums):
        if i > max_reach:
            return False     # Can't reach this position
        max_reach = max(max_reach, i + jump)

    return True

print(can_jump([2, 3, 1, 1, 4]))  # Output: True
print(can_jump([3, 2, 1, 0, 4]))  # Output: False
```

**Greedy insight**: Track the furthest position reachable. If you ever find yourself at a position beyond that, you're stuck.

---

## Classic Problem 5: Jump Game II — Minimum Jumps

**Problem**: Find the minimum number of jumps to reach the last index.

```python
def jump(nums):
    jumps = 0
    current_end = 0   # Furthest reachable with current number of jumps
    farthest = 0      # Furthest reachable overall

    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == current_end:  # Must jump — boundary of current reach
            jumps += 1
            current_end = farthest

    return jumps

print(jump([2, 3, 1, 1, 4]))   # Output: 2
print(jump([2, 3, 0, 1, 4]))   # Output: 2
```

---

## Classic Problem 6: Fractional Knapsack

**Problem**: Items have weight and value. Capacity W. You can take fractions. Maximize value.

```python
def fractional_knapsack(items, capacity):
    # Sort by value-to-weight ratio descending
    items.sort(key=lambda x: x[1] / x[0], reverse=True)

    total_value = 0.0

    for weight, value in items:
        if capacity >= weight:
            total_value += value
            capacity -= weight
        else:
            # Take the fraction that fits
            fraction = capacity / weight
            total_value += value * fraction
            break

    return total_value

# (weight, value) pairs
items = [(10, 60), (20, 100), (30, 120)]
print(fractional_knapsack(items, 50))  # Output: 240.0
```

**Note**: This greedy approach is optimal for fractional knapsack, but NOT for 0/1 knapsack (where you can't split items). 0/1 knapsack requires DP.

---

## Classic Problem 7: Assign Cookies

**Problem**: Each child has a greed factor. Each cookie has a size. Assign cookies to maximize satisfied children.

```python
def find_content_children(greed, sizes):
    greed.sort()
    sizes.sort()

    child = cookie = 0
    while child < len(greed) and cookie < len(sizes):
        if sizes[cookie] >= greed[child]:
            child += 1   # This cookie satisfies this child
        cookie += 1      # Move to the next cookie regardless

    return child

print(find_content_children([1, 2, 3], [1, 1]))    # Output: 1
print(find_content_children([1, 2], [1, 2, 3]))    # Output: 2
```

---

## Classic Problem 8: Gas Station

**Problem**: Circular gas stations. Can you complete the circuit?

```python
def can_complete_circuit(gas, cost):
    total_tank = 0
    current_tank = 0
    start = 0

    for i in range(len(gas)):
        diff = gas[i] - cost[i]
        total_tank += diff
        current_tank += diff

        if current_tank < 0:
            start = i + 1       # Can't start from here or before
            current_tank = 0

    return start if total_tank >= 0 else -1

print(can_complete_circuit([1,2,3,4,5], [3,4,5,1,2]))  # Output: 3
```

---

## Classic Problem 9: Huffman Coding

Huffman coding assigns shorter bit sequences to more frequent characters, reducing data size.

```python
import heapq
from collections import Counter

def huffman_codes(text):
    freq = Counter(text)
    heap = [[weight, [char, ""]] for char, weight in freq.items()]
    heapq.heapify(heap)

    while len(heap) > 1:
        lo = heapq.heappop(heap)
        hi = heapq.heappop(heap)
        for pair in lo[1:]:
            pair[1] = '0' + pair[1]
        for pair in hi[1:]:
            pair[1] = '1' + pair[1]
        heapq.heappush(heap, [lo[0] + hi[0]] + lo[1:] + hi[1:])

    return sorted(heapq.heappop(heap)[1:], key=lambda p: len(p[1]))

codes = huffman_codes("aaabbbccdd")
for char, code in codes:
    print(f"  '{char}': {code}")
# Example output:
#   'a': 0
#   'b': 10
#   'c': 110
#   'd': 111
```

**Greedy insight**: Always merge the two least-frequent nodes first. Frequent characters end up near the root (shorter codes).

---

## Classic Problem 10: Minimum Spanning Tree (Kruskal's Algorithm)

**Problem**: Find the minimum-cost set of edges that connects all nodes in a graph.

```python
def kruskal(n, edges):
    # Union-Find
    parent = list(range(n))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]  # Path compression
            x = parent[x]
        return x

    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return False
        parent[px] = py
        return True

    edges.sort(key=lambda e: e[2])  # Sort by weight
    mst = []
    total_weight = 0

    for u, v, weight in edges:
        if union(u, v):
            mst.append((u, v, weight))
            total_weight += weight
            if len(mst) == n - 1:
                break

    return mst, total_weight

edges = [(0,1,1), (0,2,4), (1,2,2), (1,3,5), (2,3,3)]
mst, total = kruskal(4, edges)
print(mst)    # Output: [(0, 1, 1), (1, 2, 2), (2, 3, 3)]
print(total)  # Output: 6
```

---

## When Greedy Fails

Greedy doesn't always work. A classic counterexample:

**0/1 Knapsack** with items: (weight=10, value=60), (weight=20, value=100), (weight=30, value=120), capacity=50.

- Greedy by ratio: take item 1 (ratio 6), then item 2 (ratio 5) → total weight 30, value 160.
- But items 2+3 give value 220 with weight 50 — better!
- Greedy fails because items can't be split.

Another example: **Coin Change** with coins [1, 3, 4], amount = 6.
- Greedy picks 4, then 1+1 = 3 coins.
- Optimal: 3+3 = 2 coins.

For these problems, use **Dynamic Programming**.

---

## Greedy vs. DP Decision Guide

| Problem Characteristic                          | Use Greedy? |
|-------------------------------------------------|-------------|
| Can split/take fractions (fractional knapsack)  | ✅ Yes       |
| Can't take fractions (0/1 knapsack)             | ❌ Use DP    |
| Sorting by a single criterion solves it         | ✅ Yes       |
| Multiple conflicting constraints                | ❌ Use DP    |
| Exchange argument holds (swapping doesn't help) | ✅ Yes       |
| Overlapping subproblems exist                   | ❌ Use DP    |

---

## Complexity Summary

| Problem                  | Time Complexity | Space    |
|--------------------------|-----------------|----------|
| Activity Selection       | O(n log n)      | O(1)–O(n)|
| Jump Game                | O(n)            | O(1)     |
| Fractional Knapsack      | O(n log n)      | O(1)     |
| Huffman Coding           | O(n log n)      | O(n)     |
| Kruskal's MST            | O(E log E)      | O(V)     |
| Interval Scheduling      | O(n log n)      | O(1)     |

---

## Summary

- Greedy algorithms make **locally optimal** choices at each step and never backtrack.
- They work when the **greedy choice property** and **optimal substructure** hold.
- Proving correctness often requires an **exchange argument** — showing that any non-greedy choice can be replaced by the greedy one without reducing quality.
- When greedy fails (0/1 knapsack, coin change with arbitrary coins), reach for **Dynamic Programming**.
- Common greedy patterns: sort by ratio/end time/start time, two pointers, min-heap for next best.
