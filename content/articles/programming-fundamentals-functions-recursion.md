---
title: 'Programming Fundamentals - Functions and Recursion'
date: '2026-05-16'
description: 'A practical guide to functions — parameters, return values, scope, closures, higher-order functions — and to recursion: how it works, when to use it, and how to avoid blowing the stack.'
tags: ['Programming Fundamentals', 'Functions', 'Recursion', 'Closures', 'Beginners']
published: true
---

# Programming Fundamentals - Functions and Recursion

A **function** is a reusable, named block of code that performs a specific task. Functions are the primary unit of abstraction in almost every programming language — they let you name an operation, hide its implementation, and call it from many places.

**Recursion** is a special technique where a function calls itself to solve a problem by breaking it into smaller versions of the same problem.

---

## Why Functions?

Three reasons:

1. **Reuse** — write the logic once, call it many times.
2. **Abstraction** — give a name to a complex operation; callers don't need to know how it works.
3. **Testability** — small, focused functions are easy to test in isolation.

```python
# Without a function — logic is duplicated
total_a = price_a * 1.1 + 5
total_b = price_b * 1.1 + 5
total_c = price_c * 1.1 + 5

# With a function — defined once, named clearly
def total_with_tax_and_shipping(price: float) -> float:
    return price * 1.1 + 5

total_a = total_with_tax_and_shipping(price_a)
total_b = total_with_tax_and_shipping(price_b)
```

---

## Anatomy of a Function

```typescript
function add(a: number, b: number): number {
  return a + b;
}
//       ^name  ^parameters     ^return type   ^body
```

| Part | Purpose |
|---|---|
| **Name** | How you call it |
| **Parameters** | Inputs (also called "formal parameters") |
| **Return type** | Shape of the output (in typed languages) |
| **Body** | The logic |
| **Return value** | What the function evaluates to |

When you *call* a function, the values you pass in are the **arguments**:

```typescript
const result = add(3, 5);  // 3 and 5 are arguments
```

---

## Parameters and Arguments

### Positional Arguments

The default — order matters.

```python
def greet(greeting, name):
    return f"{greeting}, {name}!"

greet("Hello", "Alice")  # "Hello, Alice!"
```

### Keyword (Named) Arguments

Pass by name — order doesn't matter, intent is clearer:

```python
greet(name="Alice", greeting="Hello")
```

### Default Parameter Values

Make parameters optional:

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Alice")              # "Hello, Alice!"
greet("Alice", "Welcome")   # "Welcome, Alice!"
```

```javascript
function fetchWithTimeout(url, timeout = 5000) { ... }
```

### Variable-Length Arguments (Variadic)

Accept any number of arguments:

```python
def sum_all(*nums):
    return sum(nums)

sum_all(1, 2, 3, 4)  # 10
```

```javascript
function sumAll(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}

sumAll(1, 2, 3, 4);  // 10
```

### Pass-by-Value vs. Pass-by-Reference

This is one of the most confused topics in programming.

**Pass-by-value**: the function gets a *copy* of the argument. Changing it inside the function doesn't affect the caller.

**Pass-by-reference**: the function gets a *reference* to the same data. Changes are visible to the caller.

Most modern languages (Python, JS, Java, Ruby) use a hybrid called **"pass-by-object-reference"** or **"call-by-sharing"**:

- **Primitives** (numbers, booleans, strings in JS) behave like pass-by-value.
- **Objects/arrays** are passed as references — the function can mutate them.

```python
def add_one(x):
    x += 1           # rebinds local name — caller unaffected

def append_one(lst):
    lst.append(1)    # mutates the shared list — caller sees the change

n = 5
add_one(n)
print(n)             # still 5

items = [10, 20]
append_one(items)
print(items)         # [10, 20, 1]
```

---

## Return Values

A function returns a single value (or none). To "return multiple values," languages typically return a tuple, object, or array:

```python
def divmod(a, b):
    return a // b, a % b      # returns a tuple

quotient, remainder = divmod(10, 3)
```

```typescript
function parseUser(input: string): { name: string; age: number } {
  return { name: "Alice", age: 30 };
}

const { name, age } = parseUser("...");
```

A function that doesn't return anything explicitly returns `None`/`undefined`/`void`:

```python
def log_message(msg):
    print(msg)
    # implicit `return None`
```

---

## Scope and Closures

### Local Scope

Variables defined inside a function are local to it:

```python
def outer():
    x = 10        # local to outer()
    return x

print(x)          # NameError — x doesn't exist out here
```

### Closures

A **closure** is a function that "remembers" variables from the scope where it was defined, even after that scope has returned:

```javascript
function makeCounter() {
  let count = 0;                   // captured by the inner function
  return function () {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
counter();   // 1
counter();   // 2
counter();   // 3
```

Each call to `makeCounter()` creates a *new* `count`, encapsulated inside the returned function. Closures are the foundation of many patterns: private state, callbacks, currying, partial application.

```python
def make_multiplier(factor):
    def multiply(n):
        return n * factor    # captures `factor`
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)
double(5)   # 10
triple(5)   # 15
```

---

## Higher-Order Functions

A **higher-order function** is one that either:

- Takes another function as an argument, OR
- Returns a function as its result.

Closures and higher-order functions together unlock the *functional* style.

### Functions as Arguments

```javascript
const nums = [1, 2, 3, 4];

nums.map(n => n * 2);         // [2, 4, 6, 8]
nums.filter(n => n % 2 === 0); // [2, 4]
nums.reduce((sum, n) => sum + n, 0); // 10
```

### Functions as Return Values

```javascript
function withLogging(fn) {
  return function (...args) {
    console.log("Calling with", args);
    const result = fn(...args);
    console.log("Returned", result);
    return result;
  };
}

const loggedAdd = withLogging((a, b) => a + b);
loggedAdd(2, 3);
// Logs:
//   Calling with [2, 3]
//   Returned 5
```

This is the foundation of decorators, middleware, and dependency injection.

---

## Pure Functions vs. Side Effects

A **pure function**:

1. Returns the same output for the same inputs.
2. Has no observable side effects (no mutation of external state, no I/O).

```python
# Pure
def add(a, b):
    return a + b

# Impure — depends on global state
total = 0
def add_to_total(n):
    global total
    total += n      # mutates external state
    return total

# Impure — does I/O
def greet(name):
    print(f"Hello, {name}")   # side effect
```

Pure functions are easier to test, parallelize, and reason about. Real programs need side effects somewhere — but isolating them into a thin layer keeps the rest of the code pure and testable. See [Functional Programming](/articles/programming-fundamentals-functional-programming) for more.

---

## Recursion

A **recursive function** calls itself. Every recursive function has two parts:

1. **Base case** — the simplest input, where the function returns directly without recursing.
2. **Recursive case** — does some work, then calls itself on a smaller version of the problem.

### Classic Example: Factorial

`n! = n × (n-1) × (n-2) × ... × 1`

```python
def factorial(n):
    if n <= 1:           # base case
        return 1
    return n * factorial(n - 1)   # recursive case
```

How `factorial(4)` unfolds:

```
factorial(4)
  → 4 * factorial(3)
    → 3 * factorial(2)
      → 2 * factorial(1)
        → 1                  ← base case
      → 2 * 1 = 2
    → 3 * 2 = 6
  → 4 * 6 = 24
```

### Fibonacci

```python
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
```

This is **elegant but slow** — it recomputes the same subproblems exponentially many times. `fib(50)` would take minutes. Fix it with memoization:

```python
from functools import lru_cache

@lru_cache
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
```

Now it's O(n) — each subproblem is computed once.

### Traversing Recursive Data

Recursion shines when the data itself is recursive: trees, nested folders, JSON, linked lists.

```python
def tree_sum(node):
    if node is None:
        return 0
    return node.value + tree_sum(node.left) + tree_sum(node.right)
```

```javascript
// Flatten a nested array
function flatten(arr) {
  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) {
      return acc.concat(flatten(item));   // recurse
    }
    return acc.concat(item);
  }, []);
}

flatten([1, [2, [3, [4]]], 5]);   // [1, 2, 3, 4, 5]
```

### When Recursion Goes Wrong

#### 1. Missing Base Case → Stack Overflow

```python
def bad(n):
    return bad(n - 1)   # never stops → RecursionError
```

#### 2. Recursion Too Deep

Each recursive call uses stack memory. Most languages limit recursion depth (Python ~1000, JS ~10,000–100,000).

```python
import sys
sys.getrecursionlimit()   # 1000 by default
```

For deep problems, convert to iteration or use an explicit stack:

```python
# Recursive — risks stack overflow
def factorial(n):
    if n <= 1: return 1
    return n * factorial(n - 1)

# Iterative — no stack risk
def factorial(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result
```

#### 3. Exponential Blowup

Naive recursion on overlapping subproblems (like `fib`) explodes. Use **memoization** or **dynamic programming** to cache results.

### Tail Recursion

A **tail call** is when the recursive call is the *very last* thing the function does — no extra work after it returns:

```python
# Not tail-recursive: must multiply by n AFTER the call returns
def factorial(n):
    if n <= 1: return 1
    return n * factorial(n - 1)

# Tail-recursive: accumulate as you go
def factorial(n, acc=1):
    if n <= 1: return acc
    return factorial(n - 1, acc * n)
```

Some languages (Scheme, Scala, Elixir) optimize tail calls into loops, eliminating stack growth. Python and JS *don't* — so tail recursion isn't a speedup there, but it's still a useful pattern.

### Recursion vs. Iteration

| | Recursion | Iteration |
|---|---|---|
| Naturalness | Wins for tree/graph traversal, divide-and-conquer | Wins for counting, accumulators |
| Memory | Uses O(depth) stack space | Usually O(1) |
| Speed | Function-call overhead | Usually faster |
| Readability | Wins when problem is recursive | Wins when problem is iterative |

A rule of thumb: **if the data is recursive (tree, nested structure), use recursion. Otherwise, prefer iteration.**

---

## Function Design Principles

### 1. Do One Thing

A function should have a single, clear purpose. If you can't describe it in one sentence without "and," split it.

```python
# Bad — does too much
def process_user(data):
    user = parse(data)
    save_to_db(user)
    send_welcome_email(user)
    log_signup(user)
    return user

# Better — orchestrator + small pieces
def process_user(data):
    user = parse(data)
    save_to_db(user)
    send_welcome_email(user)
    log_signup(user)
    return user
# (Each helper is its own function — easy to test individually.)
```

### 2. Keep It Short

If a function spans more than one screen, it's usually doing too much. Most well-written functions are 5–30 lines.

### 3. Prefer Pure When Possible

Side effects should live at the edges (I/O, database, network). The core logic should be pure functions you can test without mocks.

### 4. Few Parameters

If you're passing 6+ arguments, group them:

```typescript
// Too many params
function createUser(name, email, age, role, country, language, plan) { ... }

// Better
interface CreateUserInput {
  name: string;
  email: string;
  age: number;
  role: string;
  country: string;
  language: string;
  plan: string;
}
function createUser(input: CreateUserInput) { ... }
```

### 5. Name Functions as Verbs

A function does something; its name should reflect that:

- ✅ `calculateTotal`, `parseDate`, `sendEmail`, `isValid`
- ❌ `data`, `userStuff`, `handler1`

---

## Summary

- A **function** is a named, reusable block of code with parameters, a body, and a return value.
- **Closures** capture variables from their surrounding scope — the basis of many patterns.
- **Higher-order functions** take or return other functions.
- **Pure functions** make code easier to test and reason about.
- **Recursion** solves problems by calling itself on smaller inputs — always needs a base case.
- Use recursion for recursive data, iteration for everything else.
- Watch for stack overflow, missing base cases, and exponential blowup.

Next: how to bundle functions and data together with [Object-Oriented Programming](/articles/programming-fundamentals-oop).
