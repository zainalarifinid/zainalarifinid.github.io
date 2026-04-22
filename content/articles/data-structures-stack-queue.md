---
title: 'Data Structures - Stack & Queue'
date: '2026-04-22'
description: 'A deep dive into Stack and Queue — two essential abstract data types with opposite ordering rules. Learn LIFO vs FIFO, implementations, time complexity, and real-world use cases.'
tags: ['Data Structures', 'Computer Science', 'Algorithms', 'Beginners']
published: true
---

# Data Structures - Stack & Queue

**Stack** and **Queue** are two of the most widely used abstract data types in programming. They differ in one key way: the **order** in which elements are removed.

- **Stack** → Last In, First Out (**LIFO**)
- **Queue** → First In, First Out (**FIFO**)

---

## Stack

A **Stack** is like a pile of plates — you can only add or remove from the **top**.

```
Push →  [ 30 ]  ← Top
        [ 20 ]
        [ 10 ]  ← Bottom
```

### Core Operations

| Operation | Description | Time |
|---|---|---|
| `push(item)` | Add item to the top | O(1) |
| `pop()` | Remove and return top item | O(1) |
| `peek()` | View top item without removing | O(1) |
| `is_empty()` | Check if stack is empty | O(1) |
| `size()` | Number of items | O(1) |

### Implementation with a List

```python
class Stack:
    def __init__(self):
        self._data = []

    def push(self, item):
        self._data.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Pop from empty stack")
        return self._data.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("Peek from empty stack")
        return self._data[-1]

    def is_empty(self):
        return len(self._data) == 0

    def size(self):
        return len(self._data)
```

### Implementation with a Linked List

```python
class Stack:
    def __init__(self):
        self.head = None
        self._size = 0

    def push(self, value):
        node = Node(value)
        node.next = self.head
        self.head = node
        self._size += 1

    def pop(self):
        if not self.head:
            raise IndexError("Pop from empty stack")
        value = self.head.value
        self.head = self.head.next
        self._size -= 1
        return value

    def peek(self):
        if not self.head:
            raise IndexError("Peek from empty stack")
        return self.head.value
```

---

## Classic Stack Problems

### 1. Valid Parentheses
Check if brackets are properly balanced.

```python
def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack

# is_valid("({[]})") → True
# is_valid("([)]")   → False
```

### 2. Evaluate Reverse Polish Notation

```python
def eval_rpn(tokens):
    stack = []
    ops = {
        '+': lambda a, b: a + b,
        '-': lambda a, b: a - b,
        '*': lambda a, b: a * b,
        '/': lambda a, b: int(a / b),
    }
    for token in tokens:
        if token in ops:
            b, a = stack.pop(), stack.pop()
            stack.append(ops[token](a, b))
        else:
            stack.append(int(token))
    return stack[0]

# eval_rpn(["2","1","+","3","*"]) → 9
```

### 3. Min Stack
A stack that retrieves the minimum element in O(1):

```python
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)
        min_val = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(min_val)

    def pop(self):
        self.stack.pop()
        self.min_stack.pop()

    def get_min(self):
        return self.min_stack[-1]
```

---

## Queue

A **Queue** is like a line at a ticket counter — you join at the back and leave from the front.

```
Enqueue →  [ 10 | 20 | 30 ]  → Dequeue
            Back          Front
```

### Core Operations

| Operation | Description | Time |
|---|---|---|
| `enqueue(item)` | Add item to the back | O(1) |
| `dequeue()` | Remove and return front item | O(1) |
| `peek()` | View front item without removing | O(1) |
| `is_empty()` | Check if queue is empty | O(1) |
| `size()` | Number of items | O(1) |

### Implementation with `collections.deque`

Using Python's `deque` (double-ended queue) gives O(1) for both ends:

```python
from collections import deque

class Queue:
    def __init__(self):
        self._data = deque()

    def enqueue(self, item):
        self._data.append(item)       # add to right (back)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Dequeue from empty queue")
        return self._data.popleft()   # remove from left (front)

    def peek(self):
        if self.is_empty():
            raise IndexError("Peek from empty queue")
        return self._data[0]

    def is_empty(self):
        return len(self._data) == 0

    def size(self):
        return len(self._data)
```

### Why Not Use a Regular List for Queue?

```python
# DON'T: list.pop(0) is O(n) — shifts all elements
queue = []
queue.append(10)
queue.pop(0)  # ❌ O(n)

# DO: use deque — popleft is O(1)
from collections import deque
queue = deque()
queue.append(10)
queue.popleft()  # ✅ O(1)
```

---

## Variants

### Double-Ended Queue (Deque)
Allows insertion and deletion from **both ends**:

```python
from collections import deque
dq = deque([1, 2, 3])
dq.appendleft(0)   # → deque([0, 1, 2, 3])
dq.append(4)       # → deque([0, 1, 2, 3, 4])
dq.popleft()       # → 0
dq.pop()           # → 4
```

### Priority Queue
Elements are dequeued in order of **priority**, not insertion order:

```python
import heapq

pq = []
heapq.heappush(pq, (2, "medium priority"))
heapq.heappush(pq, (1, "high priority"))
heapq.heappush(pq, (3, "low priority"))

print(heapq.heappop(pq))  # → (1, 'high priority')
```

### Circular Queue
Fixed-size queue that wraps around — used in ring buffers and OS scheduling:

```python
class CircularQueue:
    def __init__(self, capacity):
        self.capacity = capacity
        self.queue = [None] * capacity
        self.front = self.rear = -1
        self.size = 0

    def enqueue(self, item):
        if self.size == self.capacity:
            raise OverflowError("Queue is full")
        self.rear = (self.rear + 1) % self.capacity
        self.queue[self.rear] = item
        if self.front == -1:
            self.front = 0
        self.size += 1

    def dequeue(self):
        if self.size == 0:
            raise IndexError("Queue is empty")
        value = self.queue[self.front]
        self.front = (self.front + 1) % self.capacity
        self.size -= 1
        return value
```

---

## Classic Queue Problems

### 1. BFS Level-Order Traversal

```python
from collections import deque

def level_order(root):
    if not root:
        return []
    result, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result
```

### 2. Sliding Window Maximum

```python
from collections import deque

def max_sliding_window(nums, k):
    dq = deque()  # stores indices
    result = []
    for i, num in enumerate(nums):
        # Remove indices out of window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        # Remove smaller elements
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result
```

---

## Real-World Use Cases

| Structure | Real-World Use Case |
|---|---|
| Stack | Browser back/forward history, undo/redo, call stack, expression parsing |
| Queue | Task queues (job schedulers), BFS traversal, print spooling, message brokers (Kafka, RabbitMQ) |
| Priority Queue | Dijkstra's algorithm, OS process scheduling, hospital triage |
| Deque | Sliding window problems, palindrome checking |

---

## Stack vs Queue

| | Stack | Queue |
|---|---|---|
| Order | LIFO | FIFO |
| Add element | Push to top | Enqueue to back |
| Remove element | Pop from top | Dequeue from front |
| Use case | DFS, backtracking, parsing | BFS, scheduling, buffering |

---

## Summary

Stack and Queue are elegant, minimal structures with O(1) core operations. They are the backbone of algorithms like DFS (stack) and BFS (queue), and real-world systems from undo history to message queues.

Master these two and you'll handle a huge portion of algorithm interview problems with ease.
