---
title: 'Data Structures - Linked List'
date: '2026-04-22'
description: 'A deep dive into Linked Lists — how nodes and pointers work, singly vs doubly linked lists, common operations with time complexity, and classic interview problems.'
tags: ['Data Structures', 'Computer Science', 'Algorithms', 'Beginners']
published: true
---

# Data Structures - Linked List

A **Linked List** is a linear data structure where elements (called **nodes**) are stored in non-contiguous memory locations. Each node holds a **value** and a **pointer** to the next node.

Unlike arrays, linked lists do not require a contiguous block of memory — nodes can be scattered anywhere in memory, connected only by pointers.

---

## Anatomy of a Node

```
┌─────────┬──────────┐
│  value  │  next ──────────→ (next node)
└─────────┴──────────┘
```

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None  # pointer to next node
```

---

## Types of Linked Lists

### 1. Singly Linked List
Each node points only to the **next** node. Traversal is one-directional.

```
head
 │
 ▼
[1] → [2] → [3] → [4] → None
```

### 2. Doubly Linked List
Each node has pointers to both **next** and **previous** nodes. Traversal is bidirectional.

```
None ← [1] ⇄ [2] ⇄ [3] ⇄ [4] → None
```

```python
class DoublyNode:
    def __init__(self, value):
        self.value = value
        self.next = None
        self.prev = None
```

### 3. Circular Linked List
The last node's `next` pointer points back to the **head** instead of `None`.

```
[1] → [2] → [3] → [4]
 ▲                   │
 └───────────────────┘
```

---

## Building a Singly Linked List

```python
class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, value):
        new_node = Node(value)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def prepend(self, value):
        new_node = Node(value)
        new_node.next = self.head
        self.head = new_node

    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(str(current.value))
            current = current.next
        print(" → ".join(elements) + " → None")
```

---

## Common Operations & Time Complexity

| Operation | Singly LL | Doubly LL | Array (comparison) |
|---|---|---|---|
| Access by index | O(n) | O(n) | O(1) |
| Search | O(n) | O(n) | O(n) |
| Insert at head | O(1) | O(1) | O(n) |
| Insert at tail | O(n) / O(1)* | O(1)* | O(1) amortized |
| Insert at position | O(n) | O(n) | O(n) |
| Delete at head | O(1) | O(1) | O(n) |
| Delete at tail | O(n) | O(1) | O(1) |
| Delete at position | O(n) | O(n) | O(n) |

*O(1) if you maintain a `tail` pointer.

---

## Core Operations with Code

### Insertion

```python
def insert_at(self, index, value):
    if index == 0:
        self.prepend(value)
        return
    new_node = Node(value)
    current = self.head
    for _ in range(index - 1):
        if not current:
            raise IndexError("Index out of bounds")
        current = current.next
    new_node.next = current.next
    current.next = new_node
```

### Deletion

```python
def delete(self, value):
    if not self.head:
        return

    # Delete head
    if self.head.value == value:
        self.head = self.head.next
        return

    current = self.head
    while current.next:
        if current.next.value == value:
            current.next = current.next.next  # bypass the node
            return
        current = current.next
```

### Reversal

Reversing a linked list is a classic problem. The key is to rewire `next` pointers as you traverse:

```python
def reverse(self):
    prev = None
    current = self.head
    while current:
        next_node = current.next   # save next
        current.next = prev        # reverse pointer
        prev = current             # advance prev
        current = next_node        # advance current
    self.head = prev
```

---

## Classic Linked List Problems

### 1. Detect a Cycle (Floyd's Algorithm)
Use two pointers — slow moves 1 step, fast moves 2 steps. If they meet, there's a cycle.

```python
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False
```

### 2. Find the Middle Node
```python
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # slow is at the middle
```

### 3. Merge Two Sorted Lists
```python
def merge_sorted(l1, l2):
    dummy = Node(0)
    current = dummy
    while l1 and l2:
        if l1.value <= l2.value:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    current.next = l1 or l2
    return dummy.next
```

### 4. Remove Nth Node from End
```python
def remove_nth_from_end(head, n):
    dummy = Node(0)
    dummy.next = head
    fast = slow = dummy
    for _ in range(n + 1):
        fast = fast.next
    while fast:
        slow = slow.next
        fast = fast.next
    slow.next = slow.next.next
    return dummy.next
```

---

## Array vs Linked List

| | Array | Linked List |
|---|---|---|
| Memory | Contiguous | Scattered |
| Access | O(1) random | O(n) sequential |
| Insert/Delete at head | O(n) | O(1) |
| Insert/Delete at tail | O(1) | O(n) / O(1) with tail |
| Cache performance | Excellent | Poor (pointer chasing) |
| Memory overhead | None | Extra pointer per node |

---

## When to Use a Linked List

**Use linked lists when:**
- You frequently insert or delete at the **beginning** of the collection
- You don't need random access by index
- You're implementing a **Queue**, **Stack**, **LRU Cache**, or **adjacency list**

**Avoid linked lists when:**
- You need fast index-based access
- Memory efficiency matters (each node carries pointer overhead)
- Cache performance is critical (arrays are faster due to locality)

---

## Summary

| Property | Singly LL | Doubly LL |
|---|---|---|
| Memory per node | value + 1 pointer | value + 2 pointers |
| Insert at head | O(1) | O(1) |
| Insert at tail | O(n) | O(1) with tail ptr |
| Delete at head | O(1) | O(1) |
| Delete at tail | O(n) | O(1) with tail ptr |
| Reverse traversal | Not possible | O(n) |

Linked lists teach you how pointers and memory references really work — a skill that pays off across trees, graphs, and system design.
