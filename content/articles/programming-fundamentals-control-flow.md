---
title: 'Programming Fundamentals - Control Flow'
date: '2026-05-16'
description: 'Master the structures that decide what your program does next — if/else, loops, switch, and the flow-control statements that shape every algorithm.'
tags: ['Programming Fundamentals', 'Control Flow', 'Loops', 'Conditionals', 'Beginners']
published: true
---

# Programming Fundamentals - Control Flow

A program without control flow runs every line top-to-bottom, exactly once. That is rarely what you want.

**Control flow** is the set of language constructs that decide *which* statements run, *how many times*, and in *what order*. Three families cover the vast majority of cases:

1. **Conditionals** — choose between branches (`if`, `else`, `switch`)
2. **Loops** — repeat work (`for`, `while`, `do/while`)
3. **Flow-altering statements** — `break`, `continue`, `return`, `throw`

---

## Conditional Statements

### `if` / `else if` / `else`

The most common branching construct.

```python
def grade_for(score: int) -> str:
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"
```

Branches are evaluated **top-to-bottom** and only the **first matching branch** runs. Order matters — if you wrote `score >= 60` first, every passing student would get a `D`.

### Truthy and Falsy Values

Most languages let any value be used as a condition by coercing it to boolean:

| Language | Falsy Values |
|---|---|
| Python | `False`, `0`, `0.0`, `""`, `[]`, `{}`, `None` |
| JavaScript | `false`, `0`, `""`, `null`, `undefined`, `NaN` |
| Java/C# | Only `false` — others are compile errors |

```javascript
if (user.name) {       // true if name is any non-empty string
  greet(user.name);
}

if (items.length) {    // true if there are any items
  render(items);
}
```

This is concise but easy to misuse — `0` and `""` are falsy in JS, which can hide bugs:

```javascript
const count = getCount();
if (count) { ... }     // skips the block when count === 0 (maybe a bug!)
if (count != null) { ... }  // safer — only skips null/undefined
```

### The Ternary Operator

A compact `if/else` that *returns a value*:

```typescript
const status = age >= 18 ? "adult" : "minor";
```

Use it for simple value selection. Don't nest ternaries — once you reach two levels, write `if/else` instead.

```typescript
// Hard to read — don't do this
const x = a ? b ? c : d : e ? f : g;
```

### `switch` / `case`

A multi-way branch optimized for matching a single value against many constants.

```javascript
function dayName(day) {
  switch (day) {
    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
    default: return "Invalid day";
  }
}
```

**Fall-through** — in C-family languages, cases run into each other unless you `break`:

```javascript
switch (status) {
  case "pending":
  case "processing":     // intentional fall-through
    return "in-flight";
  case "completed":
    return "done";
  default:
    return "unknown";
}
```

Forgetting `break` is a classic source of bugs. Some languages (Rust, modern Swift, Kotlin) eliminated fall-through entirely.

### Pattern Matching

Modern languages extend `switch` to match shapes, not just values:

```rust
match shape {
    Shape::Circle { radius } => 3.14 * radius * radius,
    Shape::Rectangle { width, height } => width * height,
    Shape::Triangle { base, height } => 0.5 * base * height,
}
```

```python
# Python 3.10+
match point:
    case (0, 0):
        print("Origin")
    case (x, 0):
        print(f"On x-axis at {x}")
    case (0, y):
        print(f"On y-axis at {y}")
    case (x, y):
        print(f"At ({x}, {y})")
```

---

## Loops

### `for` Loop — Classic C-Style

Three parts: initialization, condition, update.

```java
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
// prints 0..9
```

Use when you need explicit control over the index — counting down, stepping by 2, etc.

### `for-each` / `for...of` — Iterate a Collection

Cleaner when you only care about the elements:

```python
for item in [10, 20, 30]:
    print(item)

# With index, when you do need it:
for i, item in enumerate(["a", "b", "c"]):
    print(i, item)
```

```javascript
for (const item of items) {
  console.log(item);
}

// With index:
items.forEach((item, i) => console.log(i, item));
```

### `for...in` — Iterate Keys (JS) or Indices

```javascript
const obj = { name: "Alice", age: 30 };
for (const key in obj) {
  console.log(key, obj[key]);
}
```

**Warning**: in JavaScript, `for...in` iterates *property names* (strings), not values, and includes inherited properties. For arrays, prefer `for...of`.

### `while` Loop

Repeat while a condition is true. Use when the number of iterations isn't known up front.

```python
import random

# Roll dice until we get a 6
rolls = 0
while True:
    rolls += 1
    if random.randint(1, 6) == 6:
        break
print(f"Took {rolls} rolls")
```

### `do...while` Loop

Same as `while`, but the body always runs **at least once** — the condition is checked at the end.

```javascript
let input;
do {
  input = prompt("Enter a number > 0:");
} while (input <= 0);
```

Python has no `do...while`; idiomatic Python uses `while True` with `break`.

### Range-Based Loops

Iterate a numeric range cleanly:

```python
for i in range(5):           # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 10, 2):    # 2, 4, 6, 8
    print(i)

for i in range(10, 0, -1):   # 10, 9, ..., 1
    print(i)
```

```rust
for i in 0..5 { ... }       // 0..4
for i in 0..=5 { ... }      // 0..5
for i in (0..10).step_by(2) { ... }
```

---

## Loop Control Statements

### `break` — Exit the Loop

```python
for num in nums:
    if num == target:
        print("Found!")
        break  # stop searching
```

### `continue` — Skip to Next Iteration

```python
for num in nums:
    if num < 0:
        continue  # skip negatives
    process(num)
```

### Labeled `break` / `continue` (Java, Kotlin, Go)

Exit multiple nested loops at once:

```java
outer:
for (int i = 0; i < grid.length; i++) {
    for (int j = 0; j < grid[i].length; j++) {
        if (grid[i][j] == target) {
            System.out.println("Found at " + i + "," + j);
            break outer;  // exits BOTH loops
        }
    }
}
```

Python and JavaScript don't have labeled breaks — use a flag or extract a function.

### `return` Inside a Loop

The cleanest way to "exit early" if you're inside a function:

```python
def find_first_even(nums):
    for n in nums:
        if n % 2 == 0:
            return n
    return None
```

---

## Common Loop Patterns

### Accumulator

Build up a single value from a collection:

```python
total = 0
for n in nums:
    total += n
```

### Filter

Keep only matching items:

```python
positives = []
for n in nums:
    if n > 0:
        positives.append(n)

# Pythonic:
positives = [n for n in nums if n > 0]
```

### Transform (Map)

Apply a function to each item:

```javascript
const doubled = nums.map(n => n * 2);
```

### Reduce

Collapse a collection to one value:

```javascript
const sum = nums.reduce((acc, n) => acc + n, 0);
```

### Search

Find the first match:

```python
def find(items, predicate):
    for item in items:
        if predicate(item):
            return item
    return None
```

### Nested Loop

Walk a 2D structure or all pairs:

```python
for row in grid:
    for cell in row:
        print(cell, end=" ")
    print()
```

Nested loops are usually **O(n²)** — be aware of the cost on large inputs.

---

## Early Returns and Guard Clauses

Deeply nested `if` statements are hard to read. **Guard clauses** flatten them by handling edge cases first and returning early:

```javascript
// Deeply nested — hard to follow
function processOrder(order) {
  if (order) {
    if (order.items.length > 0) {
      if (order.user.isActive) {
        // actual logic
      }
    }
  }
}

// Flat with guard clauses — easier
function processOrder(order) {
  if (!order) return;
  if (order.items.length === 0) return;
  if (!order.user.isActive) return;

  // actual logic
}
```

Each `return` removes a level of nesting and makes preconditions explicit.

---

## Conditional Expressions in Functional Style

Many languages let conditions return values:

```javascript
// Switch expression (TypeScript / modern JS)
const label = (() => {
  switch (status) {
    case "ok": return "Success";
    case "err": return "Failure";
    default: return "Unknown";
  }
})();
```

```rust
let label = match status {
    "ok"  => "Success",
    "err" => "Failure",
    _     => "Unknown",
};
```

```kotlin
val label = when (status) {
    "ok" -> "Success"
    "err" -> "Failure"
    else -> "Unknown"
}
```

This style eliminates an entire class of "I forgot to assign in one branch" bugs.

---

## Loop Performance & Pitfalls

### Avoid Recomputing Inside the Condition

```javascript
// Bad — items.length() called n times
for (let i = 0; i < items.length; i++) { ... }

// Better — computed once
const n = items.length;
for (let i = 0; i < n; i++) { ... }
```

(Modern JS engines often optimize this away, but the principle generalizes to expensive calls.)

### Don't Mutate a Collection While Iterating

```python
nums = [1, 2, 3, 4]
for n in nums:
    if n % 2 == 0:
        nums.remove(n)   # BUG — modifies while iterating
```

Iterate a copy, or build a new list:

```python
nums = [n for n in nums if n % 2 != 0]
```

### Infinite Loops

The classic foot-gun:

```javascript
let i = 0;
while (i < 10) {
  console.log(i);
  // forgot i++
}
```

Always make sure the loop *converges* — the condition must eventually become false.

---

## Real-World Example: A Retry Loop

A production retry pattern combines almost everything: loops, conditionals, early returns, break:

```typescript
async function fetchWithRetry<T>(
  url: string,
  maxAttempts: number = 3,
  delayMs: number = 1000,
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(url);

      if (res.ok) {
        return await res.json();   // success — early return
      }

      if (res.status >= 400 && res.status < 500) {
        throw new Error(`Client error ${res.status}`);  // don't retry 4xx
      }

      // server error — fall through to retry
      lastError = new Error(`Server error ${res.status}`);
    } catch (err) {
      lastError = err as Error;
    }

    if (attempt < maxAttempts) {
      await new Promise(r => setTimeout(r, delayMs * attempt));   // backoff
    }
  }

  throw lastError ?? new Error("Unknown fetch error");
}
```

This 25-line function shows the *vocabulary* of control flow being used as a *toolkit*: a counted loop, multiple exit conditions, branching on response status, and an exponential backoff between iterations.

---

## Summary

- **Conditionals** let your program choose a path: `if/else`, `switch`, ternary, pattern matching.
- **Loops** let it repeat work: `for`, `while`, `do/while`, for-each.
- **Flow-altering statements** — `break`, `continue`, `return`, `throw` — let you change the path mid-execution.
- Prefer **early returns** and **guard clauses** over deep nesting.
- Be careful with **truthy/falsy** coercion, fall-through `switch`, mutating collections inside loops, and infinite loops.

Control flow is the skeleton of every program. Master it, and the muscles ([Functions](/articles/programming-fundamentals-functions-recursion), [Classes](/articles/programming-fundamentals-oop)) attach naturally.
