---
title: 'Programming Fundamentals - Functional Programming'
date: '2026-05-16'
description: 'A practical introduction to functional programming — pure functions, immutability, higher-order functions, map/filter/reduce, currying, composition, and how to think functionally in any language.'
tags: ['Programming Fundamentals', 'Functional Programming', 'Immutability', 'Pure Functions', 'Beginners']
published: true
---

# Programming Fundamentals - Functional Programming

**Functional Programming (FP)** is a style of programming where you build software by **composing pure functions** that transform immutable data — instead of mutating state with statements and side effects.

You don't need a "pure FP" language like Haskell to write functional code. Python, JavaScript, TypeScript, Java, Kotlin, Swift, Go — every modern language supports the patterns. And used well, FP makes code easier to test, reason about, and parallelize.

---

## The Core Ideas

Three concepts do most of the work:

1. **Pure functions** — same input → same output, no side effects
2. **Immutability** — values aren't changed in place; new values are created
3. **Higher-order functions** — functions that take or return other functions

Everything else (map/filter/reduce, currying, composition, monads) builds on these.

---

## Pure Functions

A function is **pure** if:

1. The same input always produces the same output.
2. It causes no observable side effects (no I/O, no mutation of external state).

### Pure

```python
def add(a, b):
    return a + b           # depends only on a, b; changes nothing
```

### Impure — depends on external state

```python
TAX = 0.1
def total_with_tax(price):
    return price * (1 + TAX)    # output depends on global TAX

# Change TAX, and the function returns different results for the same input.
```

### Impure — has side effects

```python
def add_to_cart(cart, item):
    cart.append(item)        # mutates `cart` — caller can see the change
    print(f"Added {item}")   # I/O side effect
```

### Why Pure Functions Matter

| Property | Impact |
|---|---|
| **Predictable** | Same input → same output. Easy to reason about. |
| **Testable** | No mocks, no setup. Pass inputs, assert outputs. |
| **Cacheable** | Memoize freely — results never go stale. |
| **Parallelizable** | No shared state → safe to run concurrently. |
| **Composable** | Plug them together without surprises. |

Pure functions don't eliminate side effects — your program needs to interact with the world. But pushing pure logic to the *core* and side effects to the *edges* (database, network, UI) is one of the most powerful refactoring strategies you can apply.

---

## Immutability

**Immutable data** doesn't change after it's created. Instead of mutating, you produce a new value.

### Mutable (typical imperative style)

```python
nums = [1, 2, 3]
nums.append(4)           # mutates `nums`
nums[0] = 99             # mutates `nums`
```

### Immutable (functional style)

```python
nums = (1, 2, 3)         # tuple — can't be modified
new_nums = nums + (4,)   # creates a NEW tuple

# Or with lists:
nums = [1, 2, 3]
new_nums = [*nums, 4]    # new list; nums unchanged
```

```javascript
const user = { name: "Alice", age: 30 };

// Mutable update
user.age = 31;

// Immutable update — creates a new object
const updated = { ...user, age: 31 };
```

### Why Immutability Matters

- **No spooky action at a distance**: if a function gets a value, nothing else can change it under your feet.
- **Time travel**: keep old states around for undo/redo, debugging, audit logs.
- **Concurrency**: immutable data is automatically thread-safe — no locks needed.
- **Easier diffing**: React/Vue/Redux rely on reference equality to skip re-renders.

### Persistent Data Structures

Naively copying a huge object on every change is wasteful. Libraries like **Immutable.js**, **Immer**, and **Clojure's persistent collections** use structural sharing: a new "copy" only allocates the *changed* parts and reuses the rest.

```javascript
// With Immer — looks mutable, behaves immutable
import { produce } from "immer";

const state = { users: [{ id: 1, name: "Alice" }] };

const newState = produce(state, draft => {
  draft.users[0].name = "Bob";  // looks like mutation
});
// state is unchanged; newState is a new object with the update applied
```

---

## Higher-Order Functions

A **higher-order function** takes a function as an argument, or returns one.

```javascript
// Takes a function
[1, 2, 3].map(x => x * 2);              // [2, 4, 6]

// Returns a function
function multiplyBy(factor) {
  return n => n * factor;
}
const double = multiplyBy(2);
double(10);                              // 20
```

Higher-order functions let you **parameterize behavior** — instead of writing 10 nearly-identical loops, you pass in the part that varies.

---

## The Functional Trinity: map, filter, reduce

These three higher-order functions cover most data-transformation needs.

### `map` — transform each element

```python
nums = [1, 2, 3, 4]
doubled = list(map(lambda x: x * 2, nums))      # [2, 4, 6, 8]

# Pythonic
doubled = [x * 2 for x in nums]
```

```javascript
const doubled = [1, 2, 3, 4].map(x => x * 2);
```

### `filter` — keep elements matching a predicate

```python
evens = [x for x in nums if x % 2 == 0]         # [2, 4]
```

```javascript
const evens = nums.filter(x => x % 2 === 0);
```

### `reduce` — collapse a collection to a single value

```python
from functools import reduce
total = reduce(lambda acc, x: acc + x, nums, 0)  # 10
```

```javascript
const total = nums.reduce((acc, x) => acc + x, 0);  // 10
```

### Chaining

The killer combo — pipelines that read top-to-bottom:

```javascript
const orders = [
  { id: 1, total: 100, status: "paid" },
  { id: 2, total: 50,  status: "cancelled" },
  { id: 3, total: 200, status: "paid" },
  { id: 4, total: 75,  status: "paid" },
];

const revenue = orders
  .filter(o => o.status === "paid")             // [1, 3, 4]
  .map(o => o.total)                            // [100, 200, 75]
  .reduce((sum, t) => sum + t, 0);              // 375
```

Compare with the imperative equivalent:

```javascript
let revenue = 0;
for (const o of orders) {
  if (o.status === "paid") {
    revenue += o.total;
  }
}
```

Both work. The functional version reads as a *description of what we want*; the imperative version is a *recipe for how to get it*.

---

## Function Composition

If `f(x)` and `g(x)` are functions, **composition** is `g(f(x))` — the output of one becomes the input of the next.

```javascript
const trim    = s => s.trim();
const lower   = s => s.toLowerCase();
const slugify = s => s.replace(/\s+/g, "-");

// Manual composition
const toSlug = s => slugify(lower(trim(s)));

toSlug("  Hello World  ");   // "hello-world"

// As a generic compose helper
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

const toSlug2 = compose(slugify, lower, trim);
toSlug2("  Hello World  ");  // "hello-world"
```

This is the FP equivalent of "Lego bricks" — small functions snap together.

---

## Currying and Partial Application

**Currying**: transforming a function of N arguments into a chain of N single-argument functions.

```javascript
// Normal
function add(a, b) { return a + b; }
add(2, 3);            // 5

// Curried
const addCurried = a => b => a + b;
addCurried(2)(3);     // 5

// Useful — partially apply
const add10 = addCurried(10);
add10(5);             // 15
add10(20);            // 30
```

**Partial application** is similar — fix some arguments now, supply the rest later.

```python
from functools import partial

def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
cube   = partial(power, exp=3)

square(5)   # 25
cube(3)     # 27
```

Both let you build specialized functions from general ones — without writing new functions by hand.

---

## Avoiding Loops (When It Helps)

Many imperative loops have a more declarative functional counterpart:

```javascript
// Sum
const sum = nums.reduce((a, b) => a + b, 0);

// Max
const max = nums.reduce((a, b) => (a > b ? a : b));

// Group by
const grouped = users.reduce((acc, u) => {
  (acc[u.role] ??= []).push(u);
  return acc;
}, {});

// Unique
const unique = [...new Set(nums)];

// Flatten one level
const flat = nested.flat();

// flatMap — map + flatten
const tags = posts.flatMap(p => p.tags);
```

That said: don't *force* functional style when a simple loop is clearer. The goal is readability, not purity for its own sake.

---

## Recursion as Iteration

Pure FP languages use recursion instead of loops (loops require mutable counters). Most modern languages let you choose.

```python
# Iterative
def factorial(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Recursive (functional)
def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)
```

See [Functions and Recursion](/articles/programming-fundamentals-functions-recursion) for the trade-offs (stack depth, tail calls).

---

## Lazy Evaluation

A pure expression's value doesn't change — so you can defer computing it until you actually need it. This is called **lazy evaluation**.

### Python Generators

```python
def naturals():
    n = 1
    while True:
        yield n
        n += 1

# Doesn't run forever — only computes what's pulled
from itertools import islice
first_5 = list(islice(naturals(), 5))    # [1, 2, 3, 4, 5]
```

```python
# Process a 10GB file without loading it all into memory
def process(path):
    with open(path) as f:
        evens = (line for line in f if int(line) % 2 == 0)  # lazy
        return sum(int(line) for line in evens)
```

### JavaScript Iterators

```javascript
function* take(iter, n) {
  for (const x of iter) {
    if (n-- <= 0) return;
    yield x;
  }
}
```

Lazy evaluation is what makes infinite streams and huge pipelines feasible.

---

## Side Effects: Where Do They Live?

Real programs have to do *something* — read input, write to a database, send a request. FP doesn't pretend otherwise; it isolates side effects into a small, clearly marked region:

```
┌─────────────────────────────┐
│       Side-Effecting Edge   │  ← HTTP handlers, DB writes, file I/O
│  ┌───────────────────────┐  │
│  │      Pure Core         │  │  ← business logic, transformations
│  │  - parse              │  │     all pure functions
│  │  - validate           │  │
│  │  - calculate          │  │
│  │  - format             │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

**Functional Core, Imperative Shell**: keep the core pure and easy to test; let the shell deal with the world.

```typescript
// Pure core — easy to test with simple input/output
function calculateInvoice(items: Item[], taxRate: number): Invoice { ... }

// Imperative shell — does the I/O
async function handleCheckout(req: Request) {
  const items = await db.getItems(req.userId);     // side effect
  const invoice = calculateInvoice(items, 0.08);   // pure
  await emailer.send(req.userEmail, invoice);      // side effect
  await db.saveInvoice(invoice);                   // side effect
}
```

You can unit-test `calculateInvoice` in milliseconds, with no mocks.

---

## FP vs. OOP

| | OOP | FP |
|---|---|---|
| Primary unit | Objects with state + methods | Functions over immutable data |
| Change | Mutate the object | Return new values |
| Reuse | Inheritance / composition | Function composition |
| Polymorphism | Method dispatch on object type | Higher-order functions, generics |
| Best for | Modeling stateful entities | Data transformation pipelines |

These aren't mutually exclusive. Modern codebases mix paradigms: classes for domain entities (see [Object-Oriented Programming](/articles/programming-fundamentals-oop)), pure functions for transformations, with immutability as a default discipline.

---

## A Realistic FP-Style Example

Compute the top 3 customers by total spend in the last 30 days, with their order count:

```typescript
interface Order {
  customerId: string;
  amount: number;
  createdAt: Date;
}

const recent = (days: number) => (o: Order): boolean =>
  Date.now() - o.createdAt.getTime() < days * 86400_000;

const sumBy = <T>(xs: T[], get: (x: T) => number): number =>
  xs.reduce((s, x) => s + get(x), 0);

function topCustomers(orders: Order[]) {
  const grouped = orders
    .filter(recent(30))                             // pure
    .reduce<Record<string, Order[]>>((acc, o) => {  // group by customer
      (acc[o.customerId] ??= []).push(o);
      return acc;
    }, {});

  return Object.entries(grouped)
    .map(([customerId, orders]) => ({
      customerId,
      orderCount: orders.length,
      totalSpend: sumBy(orders, o => o.amount),
    }))
    .sort((a, b) => b.totalSpend - a.totalSpend)
    .slice(0, 3);
}
```

Every function used is pure. Every step transforms data instead of mutating it. You can call `topCustomers(orders)` a thousand times with the same input and always get the same output — perfect for testing, caching, and parallelizing.

---

## Summary

- **Pure functions** depend only on their inputs and produce no side effects.
- **Immutable data** prevents bugs from unintended mutation and enables safe concurrency.
- **Higher-order functions** (`map`, `filter`, `reduce`, `compose`) let you build pipelines instead of loops.
- **Currying** and **partial application** make functions composable.
- **Lazy evaluation** handles infinite or huge streams gracefully.
- Keep a **pure core**, push side effects to the **shell**.
- FP and OOP are tools, not religions — mix them based on the problem.

Next: handling the messy reality of things that can go wrong — [Error Handling](/articles/programming-fundamentals-error-handling).
