---
title: "Searching Algorithms: Binary Search, BFS, and DFS"
date: "2026-04-23"
description: "Master the three essential searching algorithms — Binary Search for sorted arrays, BFS for shortest paths, and DFS for exploring all possibilities."
tags: ["Algorithms", "Searching", "Computer Science", "Beginners"]
published: true
---

# Searching Algorithms: Binary Search, BFS, and DFS

Searching is at the heart of almost every application — finding a user in a database, navigating a map, or parsing a file system. Knowing the right search strategy for the right problem is one of the most important skills in software engineering.

---

## Overview

| Algorithm      | Data Structure  | Time (Best) | Time (Worst) | Space    | Use Case                         |
|----------------|-----------------|-------------|--------------|----------|----------------------------------|
| Binary Search  | Sorted array    | O(1)        | O(log n)     | O(1)     | Sorted arrays, answer spaces     |
| BFS            | Graph / Tree    | O(1)        | O(V + E)     | O(V)     | Shortest path (unweighted)       |
| DFS            | Graph / Tree    | O(1)        | O(V + E)     | O(V)     | All paths, topological sort, cycles |

---

## 1. Binary Search

### The Core Idea

Binary Search works on **sorted arrays** by repeatedly halving the search space. Instead of checking every element (linear search — O(n)), it eliminates half the remaining elements with each comparison.

**Prerequisite**: The array must be sorted.

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = left + (right - left) // 2  # Avoid integer overflow

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1   # Target is in the right half
        else:
            right = mid - 1  # Target is in the left half

    return -1  # Not found

# Example
arr = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search(arr, 7))   # Output: 3
print(binary_search(arr, 6))   # Output: -1
```

### Recursive Version

```python
def binary_search_recursive(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1

    if left > right:
        return -1

    mid = left + (right - left) // 2

    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)
```

### Visual Walkthrough

```
Array: [1, 3, 5, 7, 9, 11, 13, 15]
Target: 11

Step 1: left=0, right=7, mid=3 → arr[3]=7 < 11 → search right
Step 2: left=4, right=7, mid=5 → arr[5]=11 == 11 → FOUND at index 5

Only 2 comparisons instead of 6 for linear search!
```

### Binary Search on Answer Space

Binary Search isn't just for arrays — it applies to any **monotone** problem where the answer is in a sorted range.

```python
# Find the minimum number of days to ship all packages
# within capacity constraint
def ship_within_days(weights, days):
    def can_ship(capacity):
        current_load = 0
        trips = 1
        for w in weights:
            if current_load + w > capacity:
                trips += 1
                current_load = 0
            current_load += w
        return trips <= days

    left = max(weights)         # Minimum capacity = heaviest single package
    right = sum(weights)        # Maximum capacity = ship everything in one day

    while left < right:
        mid = (left + right) // 2
        if can_ship(mid):
            right = mid
        else:
            left = mid + 1

    return left

print(ship_within_days([1,2,3,4,5,6,7,8,9,10], 5))
# Output: 15
```

### Complexity

| Operation | Time     | Space |
|-----------|----------|-------|
| Search    | O(log n) | O(1)  |

---

## 2. Breadth-First Search (BFS)

### The Core Idea

BFS explores a graph **level by level** — it visits all neighbors of the current node before going deeper. It uses a **queue** (FIFO) to track which nodes to visit next.

**Key property**: BFS finds the **shortest path** in an unweighted graph.

```python
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order

# Example graph (adjacency list)
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print(bfs(graph, 'A'))
# Output: ['A', 'B', 'C', 'D', 'E', 'F']
```

### BFS for Shortest Path

```python
def bfs_shortest_path(graph, start, end):
    if start == end:
        return [start]

    visited = set([start])
    queue = deque([[start]])  # Queue of paths

    while queue:
        path = queue.popleft()
        node = path[-1]

        for neighbor in graph[node]:
            if neighbor not in visited:
                new_path = path + [neighbor]
                if neighbor == end:
                    return new_path
                visited.add(neighbor)
                queue.append(new_path)

    return None  # No path found

print(bfs_shortest_path(graph, 'A', 'F'))
# Output: ['A', 'C', 'F']
```

### BFS on a Grid (2D Matrix)

A common interview pattern — BFS from a source cell to find shortest distance.

```python
def bfs_grid(grid, start_row, start_col):
    rows, cols = len(grid), len(grid[0])
    directions = [(0,1), (0,-1), (1,0), (-1,0)]  # Right, Left, Down, Up

    visited = [[False] * cols for _ in range(rows)]
    queue = deque([(start_row, start_col, 0)])  # (row, col, distance)
    visited[start_row][start_col] = True
    result = []

    while queue:
        r, c, dist = queue.popleft()
        result.append((r, c, dist))

        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc] and grid[nr][nc] != '#':
                visited[nr][nc] = True
                queue.append((nr, nc, dist + 1))

    return result
```

### Complexity

| Operation | Time     | Space |
|-----------|----------|-------|
| BFS       | O(V + E) | O(V)  |

Where V = vertices, E = edges.

---

## 3. Depth-First Search (DFS)

### The Core Idea

DFS explores as **far as possible** along each branch before backtracking. It uses a **stack** (either explicit or the call stack via recursion).

**Key property**: DFS is better for exploring **all paths**, detecting **cycles**, and **topological sorting**.

### Recursive DFS

```python
def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()

    visited.add(node)
    order = [node]

    for neighbor in graph[node]:
        if neighbor not in visited:
            order.extend(dfs_recursive(graph, neighbor, visited))

    return order

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print(dfs_recursive(graph, 'A'))
# Output: ['A', 'B', 'D', 'E', 'F', 'C']
```

### Iterative DFS (Using Explicit Stack)

```python
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    order = []

    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            order.append(node)
            # Push neighbors (reversed to maintain left-to-right traversal order)
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)

    return order

print(dfs_iterative(graph, 'A'))
# Output: ['A', 'B', 'D', 'E', 'F', 'C']
```

### DFS for Cycle Detection (Directed Graph)

```python
def has_cycle(graph):
    WHITE, GRAY, BLACK = 0, 1, 2  # Unvisited, In-progress, Done
    color = {node: WHITE for node in graph}

    def dfs(node):
        color[node] = GRAY  # Mark as in-progress
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                return True  # Back edge — cycle detected
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        color[node] = BLACK  # Mark as done
        return False

    return any(dfs(node) for node in graph if color[node] == WHITE)

graph_with_cycle = {0: [1], 1: [2], 2: [0], 3: [4], 4: []}
print(has_cycle(graph_with_cycle))  # Output: True
```

### DFS on a Grid (Island Problems)

A classic pattern — count connected components in a grid.

```python
def num_islands(grid):
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0'  # Mark as visited
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c)
                count += 1

    return count

grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
]
print(num_islands(grid))  # Output: 3
```

### Complexity

| Operation | Time     | Space |
|-----------|----------|-------|
| DFS       | O(V + E) | O(V)  |

---

## BFS vs. DFS: Choosing the Right One

| Criteria                              | BFS                        | DFS                            |
|---------------------------------------|----------------------------|--------------------------------|
| Shortest path (unweighted)            | ✅ Yes                      | ❌ Not guaranteed               |
| Memory for wide/shallow graphs        | ❌ High (stores whole level) | ✅ Low                          |
| Memory for deep/narrow graphs         | ✅ Low                      | ❌ High (deep recursion stack)  |
| Finding all paths                     | Possible but slow           | ✅ Natural with backtracking    |
| Cycle detection                       | Possible                   | ✅ More intuitive (back edges)  |
| Topological sort                      | ❌                          | ✅ Yes (Kahn's also uses BFS)   |
| Maze/grid exploration                 | ✅ Shortest path             | ✅ Complete exploration         |

---

## Classic Problems

### 1. Binary Search — First and Last Position

```python
def search_range(nums, target):
    def find_bound(is_first):
        left, right = 0, len(nums) - 1
        result = -1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                result = mid
                if is_first:
                    right = mid - 1  # Continue searching left
                else:
                    left = mid + 1   # Continue searching right
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return result

    return [find_bound(True), find_bound(False)]

print(search_range([5,7,7,8,8,10], 8))
# Output: [3, 4]
```

### 2. BFS — Rotting Oranges

```python
from collections import deque

def oranges_rotting(grid):
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c, 0))
            elif grid[r][c] == 1:
                fresh += 1

    directions = [(0,1),(0,-1),(1,0),(-1,0)]
    minutes = 0

    while queue:
        r, c, time = queue.popleft()
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                grid[nr][nc] = 2
                fresh -= 1
                minutes = max(minutes, time + 1)
                queue.append((nr, nc, time + 1))

    return minutes if fresh == 0 else -1

print(oranges_rotting([[2,1,1],[1,1,0],[0,1,1]]))
# Output: 4
```

### 3. DFS — All Paths From Source to Target

```python
def all_paths_source_target(graph):
    target = len(graph) - 1
    result = []

    def dfs(node, path):
        if node == target:
            result.append(list(path))
            return
        for neighbor in graph[node]:
            path.append(neighbor)
            dfs(neighbor, path)
            path.pop()  # Backtrack

    dfs(0, [0])
    return result

print(all_paths_source_target([[1,2],[3],[3],[]]))
# Output: [[0, 1, 3], [0, 2, 3]]
```

---

## Summary

- **Binary Search**: O(log n) for sorted arrays — eliminate half the search space each step. Also applies to any monotone "answer space" problem.
- **BFS**: Level-by-level exploration using a queue. Guarantees shortest path in unweighted graphs. Higher memory for wide graphs.
- **DFS**: Deep-first exploration using a stack/recursion. Natural for all-paths, backtracking, cycle detection, and topological sort. Risk of stack overflow on very deep graphs.
