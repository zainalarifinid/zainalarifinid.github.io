---
title: 'Data Structures - Tree & Graph'
date: '2026-04-22'
description: 'A deep dive into Trees and Graphs — hierarchical and relational data structures. Learn binary trees, BSTs, BFS, DFS, and how graphs model real-world problems.'
tags: ['Data Structures', 'Computer Science', 'Algorithms', 'Beginners']
published: true
---

# Data Structures - Tree & Graph

**Trees** and **Graphs** are non-linear data structures used to model hierarchical and relational data. They are the foundation of file systems, databases, networks, social connections, and countless algorithms.

---

# Part 1: Tree

A **Tree** is a hierarchical structure with a **root** node and **child** nodes forming a parent-child relationship. Every node (except the root) has exactly one parent.

```
          [1]          ← Root
         /   \
       [2]   [3]       ← Internal nodes
      /   \     \
    [4]   [5]   [6]    ← Leaf nodes
```

### Terminology

| Term | Definition |
|---|---|
| Root | Top node with no parent |
| Leaf | Node with no children |
| Height | Longest path from root to a leaf |
| Depth | Distance from root to a specific node |
| Subtree | A node and all its descendants |
| Degree | Number of children a node has |

---

## Binary Tree

A **Binary Tree** is a tree where every node has **at most 2 children** (left and right).

```python
class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None
```

### Types of Binary Trees

- **Full**: every node has 0 or 2 children
- **Complete**: all levels filled except possibly the last, filled left to right
- **Perfect**: all internal nodes have 2 children, all leaves at same level
- **Balanced**: height difference between left and right subtrees ≤ 1 (e.g. AVL Tree)

---

## Tree Traversals

There are four fundamental ways to visit every node:

### In-Order (Left → Root → Right)
Produces sorted output for BSTs.

```python
def inorder(root):
    if not root:
        return
    inorder(root.left)
    print(root.val)
    inorder(root.right)
```

### Pre-Order (Root → Left → Right)
Useful for copying/serializing a tree.

```python
def preorder(root):
    if not root:
        return
    print(root.val)
    preorder(root.left)
    preorder(root.right)
```

### Post-Order (Left → Right → Root)
Useful for deleting a tree or evaluating expression trees.

```python
def postorder(root):
    if not root:
        return
    postorder(root.left)
    postorder(root.right)
    print(root.val)
```

### Level-Order (BFS — left to right, level by level)

```python
from collections import deque

def level_order(root):
    if not root:
        return []
    result, queue = [], deque([root])
    while queue:
        node = queue.popleft()
        result.append(node.val)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return result
```

---

## Binary Search Tree (BST)

A **BST** is a binary tree where:
- Every node in the **left** subtree has a value **less than** the current node
- Every node in the **right** subtree has a value **greater than** the current node

```
        [8]
       /   \
     [3]   [10]
    /   \      \
  [1]   [6]   [14]
       /   \   /
     [4]  [7] [13]
```

### BST Operations

```python
class BST:
    def __init__(self):
        self.root = None

    def insert(self, val):
        self.root = self._insert(self.root, val)

    def _insert(self, node, val):
        if not node:
            return TreeNode(val)
        if val < node.val:
            node.left = self._insert(node.left, val)
        elif val > node.val:
            node.right = self._insert(node.right, val)
        return node

    def search(self, val):
        return self._search(self.root, val)

    def _search(self, node, val):
        if not node or node.val == val:
            return node
        if val < node.val:
            return self._search(node.left, val)
        return self._search(node.right, val)
```

### BST Time Complexity

| Operation | Balanced BST | Degenerate (sorted input) |
|---|---|---|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |

---

## Classic Tree Problems

### 1. Maximum Depth
```python
def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))
```

### 2. Check if Balanced
```python
def is_balanced(root):
    def height(node):
        if not node:
            return 0
        left = height(node.left)
        right = height(node.right)
        if left == -1 or right == -1 or abs(left - right) > 1:
            return -1
        return 1 + max(left, right)
    return height(root) != -1
```

### 3. Lowest Common Ancestor
```python
def lca(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lca(root.left, p, q)
    right = lca(root.right, p, q)
    if left and right:
        return root
    return left or right
```

### 4. Validate BST
```python
def is_valid_bst(root, min_val=float('-inf'), max_val=float('inf')):
    if not root:
        return True
    if not (min_val < root.val < max_val):
        return False
    return (is_valid_bst(root.left, min_val, root.val) and
            is_valid_bst(root.right, root.val, max_val))
```

---

# Part 2: Graph

A **Graph** is a set of **nodes (vertices)** connected by **edges**. Unlike trees, graphs can have cycles, disconnected components, and edges in any direction.

```
    (A)───(B)
     │  ╲   │
    (D)  (C)─(E)
```

### Types of Graphs

| Type | Description |
|---|---|
| Undirected | Edges have no direction (friendship) |
| Directed (Digraph) | Edges have direction (following on Twitter) |
| Weighted | Edges have costs/distances (road map) |
| Unweighted | All edges are equal |
| Cyclic | Contains at least one cycle |
| Acyclic | No cycles (DAG = Directed Acyclic Graph) |

---

## Graph Representation

### Adjacency List (most common)
```python
# Undirected graph
graph = {
    'A': ['B', 'D'],
    'B': ['A', 'C'],
    'C': ['B', 'E'],
    'D': ['A'],
    'E': ['C']
}
```

### Adjacency Matrix
```python
# 5 nodes: 0–4
#      0  1  2  3  4
matrix = [
    [0, 1, 0, 1, 0],  # 0
    [1, 0, 1, 0, 0],  # 1
    [0, 1, 0, 0, 1],  # 2
    [1, 0, 0, 0, 0],  # 3
    [0, 0, 1, 0, 0],  # 4
]
```

| | Adjacency List | Adjacency Matrix |
|---|---|---|
| Space | O(V + E) | O(V²) |
| Check edge (u,v) | O(degree) | O(1) |
| Get all neighbors | O(degree) | O(V) |
| Best for | Sparse graphs | Dense graphs |

---

## Graph Traversals

### BFS (Breadth-First Search)
Explore level by level. Used for **shortest path** in unweighted graphs.

```python
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order
```

### DFS (Depth-First Search)
Explore as deep as possible before backtracking. Used for **cycle detection**, **topological sort**, **connected components**.

```python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    result = [start]
    for neighbor in graph[start]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))
    return result
```

---

## Classic Graph Problems

### 1. Number of Connected Components
```python
def count_components(n, edges):
    graph = {i: [] for i in range(n)}
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    visited = set()
    count = 0
    for node in range(n):
        if node not in visited:
            dfs(graph, node, visited)
            count += 1
    return count
```

### 2. Detect Cycle in Directed Graph
```python
def has_cycle(graph):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {node: WHITE for node in graph}

    def dfs(node):
        color[node] = GRAY
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                return True  # back edge = cycle
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        color[node] = BLACK
        return False

    return any(dfs(n) for n in graph if color[n] == WHITE)
```

### 3. Shortest Path (BFS — unweighted)
```python
def shortest_path(graph, start, end):
    queue = deque([(start, [start])])
    visited = set([start])
    while queue:
        node, path = queue.popleft()
        if node == end:
            return path
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    return None
```

### 4. Topological Sort (DAG)
```python
from collections import deque

def topological_sort(graph):
    in_degree = {node: 0 for node in graph}
    for node in graph:
        for neighbor in graph[node]:
            in_degree[neighbor] += 1

    queue = deque([n for n in in_degree if in_degree[n] == 0])
    result = []
    while queue:
        node = queue.popleft()
        result.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    return result
```

---

## Real-World Use Cases

| Structure | Use Case |
|---|---|
| Binary Tree | File system hierarchy, expression parsing |
| BST | Database indexes, sorted data with fast search |
| Tree (general) | DOM (HTML), org charts, decision trees |
| Graph (undirected) | Social networks, road maps |
| Graph (directed) | Web page links, dependency resolution |
| DAG | Build systems (Make, Gradle), task scheduling |
| Weighted graph | GPS navigation (Dijkstra), network routing |

---

## Summary

| | Tree | Graph |
|---|---|---|
| Cycles | No | Possible |
| Root | Yes (one) | No |
| Parent | Exactly one per node (except root) | Any number |
| Traversal | DFS/BFS | DFS/BFS |
| Connectivity | Always connected | May be disconnected |

Trees and graphs are essential for modeling the real world. Every time you use Google Maps, browse a website, or run a build system — trees and graphs are working behind the scenes.
