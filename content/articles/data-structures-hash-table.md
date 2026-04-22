---
title: 'Data Structures - Hash Table'
date: '2026-04-22'
description: 'A deep dive into Hash Tables — how hashing works, collision resolution strategies, time complexity analysis, and practical implementations in Python and TypeScript.'
tags: ['Data Structures', 'Computer Science', 'Algorithms', 'Beginners']
published: true
---

# Data Structures - Hash Table

A **Hash Table** (also called a Hash Map or Dictionary) is a data structure that maps **keys to values** using a **hash function**. It is the most commonly used data structure for building fast lookups, caches, and frequency counters.

With a well-designed hash function, average-case access, insertion, and deletion are all **O(1)**.

---

## How It Works

```
Key → Hash Function → Index → Bucket → Value

"name" → hash("name") % 8 → 3 → bucket[3] → "Zainal"
```

Internally, a hash table is backed by an **array of buckets**. The hash function converts any key into an integer index, and the value is stored at that index.

```
Index:  0     1        2     3          4     5     6     7
      [   ] [   ] [   ] ["Zainal"] [   ] [   ] [   ] [   ]
```

### Simple Hash Function Example

```python
def simple_hash(key, size):
    total = 0
    for char in key:
        total += ord(char)
    return total % size

simple_hash("name", 8)  # → some index 0–7
```

Real hash functions (like Python's built-in) are far more sophisticated to distribute keys evenly and minimize collisions.

---

## Collisions

A **collision** occurs when two different keys hash to the **same index**. This is inevitable — the birthday paradox guarantees it. The two main strategies to handle collisions:

### 1. Separate Chaining
Each bucket holds a **linked list** (or array) of all key-value pairs that hashed to that index.

```
bucket[3] → [("name", "Zainal")] → [("game", "Chess")] → None
```

```python
class HashTable:
    def __init__(self, size=53):
        self.size = size
        self.table = [[] for _ in range(size)]

    def _hash(self, key):
        total = 0
        for i, char in enumerate(key[:100]):
            total = (total * 31 + ord(char)) % self.size
        return total

    def set(self, key, value):
        index = self._hash(key)
        bucket = self.table[index]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)  # update existing
                return
        bucket.append((key, value))        # insert new

    def get(self, key):
        index = self._hash(key)
        for k, v in self.table[index]:
            if k == key:
                return v
        return None

    def delete(self, key):
        index = self._hash(key)
        self.table[index] = [(k, v) for k, v in self.table[index] if k != key]
```

### 2. Open Addressing (Linear Probing)
If the target bucket is occupied, scan forward to find the next empty slot.

```
Insert "cat" → hashes to index 3 (occupied) → try 4 (occupied) → try 5 (empty) ✓
```

```python
class HashTableLP:
    def __init__(self, size=53):
        self.size = size
        self.keys = [None] * size
        self.values = [None] * size

    def _hash(self, key):
        return hash(key) % self.size

    def set(self, key, value):
        index = self._hash(key)
        while self.keys[index] is not None and self.keys[index] != key:
            index = (index + 1) % self.size  # linear probe
        self.keys[index] = key
        self.values[index] = value

    def get(self, key):
        index = self._hash(key)
        while self.keys[index] is not None:
            if self.keys[index] == key:
                return self.values[index]
            index = (index + 1) % self.size
        return None
```

---

## Time Complexity

| Operation | Average Case | Worst Case (all collide) |
|---|---|---|
| Insert | O(1) | O(n) |
| Lookup | O(1) | O(n) |
| Delete | O(1) | O(n) |
| Space | O(n) | O(n) |

Worst case O(n) is rare with a good hash function. Most implementations guarantee amortized O(1) by **resizing** the table when the **load factor** exceeds a threshold (typically 0.7).

```
Load Factor = number of entries / number of buckets
```

---

## Built-in Hash Maps

### Python `dict`
```python
# Create
person = {"name": "Zainal", "role": "Engineer", "city": "Bandung"}

# Access — O(1)
print(person["name"])         # → "Zainal"
print(person.get("age", 0))   # → 0 (default if missing)

# Insert / Update — O(1)
person["age"] = 30

# Delete — O(1)
del person["city"]

# Iterate
for key, value in person.items():
    print(f"{key}: {value}")

# Check existence — O(1)
if "name" in person:
    print("exists")
```

### JavaScript / TypeScript `Map` and Object
```typescript
// Object (string keys only, not ordered)
const person: Record<string, string> = {
    name: "Zainal",
    role: "Engineer"
};

// Map (any key type, insertion-ordered)
const map = new Map<string, number>();
map.set("a", 1);
map.set("b", 2);
map.get("a");        // → 1
map.has("b");        // → true
map.delete("b");
map.size;            // → 1

// Iterate
for (const [key, value] of map) {
    console.log(key, value);
}
```

---

## Classic Hash Table Problems

### 1. Two Sum
```python
def two_sum(nums, target):
    seen = {}  # value → index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i

# two_sum([2, 7, 11, 15], 9) → [0, 1]
```

### 2. Group Anagrams
```python
from collections import defaultdict

def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))  # sorted chars as key
        groups[key].append(s)
    return list(groups.values())

# group_anagrams(["eat","tea","tan","ate","nat","bat"])
# → [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

### 3. Longest Consecutive Sequence
```python
def longest_consecutive(nums):
    num_set = set(nums)
    longest = 0
    for num in num_set:
        if num - 1 not in num_set:  # start of a sequence
            current = num
            length = 1
            while current + 1 in num_set:
                current += 1
                length += 1
            longest = max(longest, length)
    return longest

# longest_consecutive([100,4,200,1,3,2]) → 4  (1,2,3,4)
```

### 4. Top K Frequent Elements
```python
from collections import Counter
import heapq

def top_k_frequent(nums, k):
    count = Counter(nums)
    return heapq.nlargest(k, count.keys(), key=count.get)

# top_k_frequent([1,1,1,2,2,3], 2) → [1, 2]
```

### 5. LRU Cache
A Least Recently Used cache using a hash map + doubly linked list:

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # evict LRU
```

---

## Hash Set

A **Hash Set** is a hash table where only keys matter (no associated values). Used for O(1) membership testing and deduplication.

```python
# Python set
seen = set()
seen.add("apple")
seen.add("banana")
"apple" in seen   # → True  (O(1))
seen.discard("apple")

# Remove duplicates from a list
unique = list(set([1, 2, 2, 3, 3, 3]))  # → [1, 2, 3]
```

---

## Real-World Use Cases

| Use Case | Why Hash Table |
|---|---|
| Database indexing | Fast key-based row lookup |
| Caching (Redis, Memcached) | O(1) get/set by key |
| URL shorteners | Map short code → long URL |
| Counting word frequency | Map word → count |
| Symbol tables in compilers | Map variable name → memory address |
| Deduplication | Set membership in O(1) |

---

## Summary

| Property | Value |
|---|---|
| Average access | O(1) |
| Average insert | O(1) |
| Average delete | O(1) |
| Worst case | O(n) |
| Space | O(n) |
| Key requirement | Must be hashable (immutable) |

Hash tables are arguably the single most useful data structure you'll reach for in day-to-day programming. Understanding how they work under the hood — hash functions, load factors, and collision resolution — will make you a sharper engineer.
