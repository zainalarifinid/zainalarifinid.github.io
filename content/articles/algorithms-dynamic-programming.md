---
title: "Dynamic Programming: Memoization, Tabulation, and Classic Problems"
date: "2026-04-23"
description: "Understand dynamic programming from first principles — overlapping subproblems, optimal substructure, top-down memoization, bottom-up tabulation, and 10 classic DP problems."
tags: ["Algorithms", "Dynamic Programming", "Computer Science", "Beginners"]
published: true
---

# Dynamic Programming: Memoization, Tabulation, and Classic Problems

Dynamic Programming (DP) is one of the most powerful algorithmic techniques — and also one of the most feared. It transforms exponential brute-force solutions into polynomial-time ones by storing and reusing intermediate results.

---

## What Is Dynamic Programming?

DP applies when a problem has two key properties:

1. **Overlapping Subproblems**: The same subproblem is solved multiple times.
2. **Optimal Substructure**: The optimal solution to a problem can be built from optimal solutions to its subproblems.

Think of it as "smart recursion" — instead of recomputing the same results, you save them.

### Plain Recursion vs. DP

```python
# Plain recursion — exponential O(2^n) time
def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

# Call tree for fib(5):
# fib(5) calls fib(4) and fib(3)
# fib(4) calls fib(3) and fib(2)   ← fib(3) computed TWICE
# ...grows exponentially
```

---

## Approach 1: Top-Down (Memoization)

Write the recursive solution, then add a cache to store results of already-solved subproblems.

```python
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

# Using functools.lru_cache (Python idiom)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(50))  # Output: 12586269025 — instant
```

**When to use**: When you want to write the recursion naturally and cache lazily. Good when not all subproblems need to be solved.

---

## Approach 2: Bottom-Up (Tabulation)

Build a table from the smallest subproblems up to the answer. No recursion — pure iteration.

```python
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

# Space-optimized (only need last 2 values)
def fib_optimized(n):
    if n <= 1:
        return n
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    return prev1

print(fib_optimized(50))  # Output: 12586269025
```

**When to use**: When all subproblems will be needed, and you want to avoid recursion overhead.

---

## Approach 3: Space Optimization

Many DP problems only need the last row/column of the table. Reduce space by keeping only what's necessary.

---

## Classic DP Problems

### 1. Climbing Stairs

**Problem**: You can climb 1 or 2 steps at a time. How many ways to reach step n?

```python
def climb_stairs(n):
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

print(climb_stairs(5))  # Output: 8
# Ways: 1+1+1+1+1, 1+1+1+2, 1+1+2+1, 1+2+1+1, 2+1+1+1, 1+2+2, 2+1+2, 2+2+1
```

**Insight**: Same recurrence as Fibonacci. dp[i] = dp[i-1] + dp[i-2].

---

### 2. House Robber

**Problem**: Rob houses in a row — you can't rob two adjacent houses. Maximize total.

```python
def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]

    prev2, prev1 = 0, 0
    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2, prev1 = prev1, curr

    return prev1

print(rob([2, 7, 9, 3, 1]))  # Output: 12 (rob houses 0, 2, 4: 2+9+1=12)
```

**Recurrence**: `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`

---

### 3. 0/1 Knapsack

**Problem**: Given n items with weights and values, fill a knapsack of capacity W to maximize value. Each item can be taken once.

```python
def knapsack(weights, values, capacity):
    n = len(weights)
    # dp[i][w] = max value using first i items with capacity w
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Option 1: Skip item i
            dp[i][w] = dp[i - 1][w]
            # Option 2: Take item i (if it fits)
            if weights[i - 1] <= w:
                dp[i][w] = max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1])

    return dp[n][capacity]

weights = [2, 3, 4, 5]
values  = [3, 4, 5, 6]
capacity = 5
print(knapsack(weights, values, capacity))  # Output: 7
```

**Complexity**: O(n × W) time, O(n × W) space. Can be space-optimized to O(W).

---

### 4. Coin Change

**Problem**: Given coin denominations and a target amount, find the minimum number of coins to make the amount.

```python
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # Base case: 0 coins needed for amount 0

    for amt in range(1, amount + 1):
        for coin in coins:
            if coin <= amt:
                dp[amt] = min(dp[amt], dp[amt - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1

print(coin_change([1, 5, 11], 15))  # Output: 3 (11 + 3×1 = ... actually 5+5+5=3)
print(coin_change([2], 3))           # Output: -1
```

**Recurrence**: `dp[amt] = min(dp[amt - coin] + 1)` for all valid coins.

---

### 5. Longest Common Subsequence (LCS)

**Problem**: Find the length of the longest subsequence common to two strings.

```python
def lcs(text1, text2):
    m, n = len(text1), len(text2)
    # dp[i][j] = LCS of text1[:i] and text2[:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1   # Characters match
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])  # Take the best without one

    return dp[m][n]

print(lcs("abcde", "ace"))   # Output: 3 (a, c, e)
print(lcs("abc", "abc"))     # Output: 3
print(lcs("abc", "def"))     # Output: 0
```

---

### 6. Longest Increasing Subsequence (LIS)

**Problem**: Find the length of the longest strictly increasing subsequence.

```python
def length_of_lis(nums):
    if not nums:
        return 0

    dp = [1] * len(nums)  # Each element is a subsequence of length 1

    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)

print(length_of_lis([10, 9, 2, 5, 3, 7, 101, 18]))  # Output: 4 (2,3,7,101 or 2,5,7,101)
```

**O(n log n) version using binary search** (patience sorting):

```python
import bisect

def length_of_lis_fast(nums):
    tails = []  # tails[i] = smallest tail of IS with length i+1
    for num in nums:
        pos = bisect.bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num
    return len(tails)

print(length_of_lis_fast([10, 9, 2, 5, 3, 7, 101, 18]))  # Output: 4
```

---

### 7. Edit Distance (Levenshtein Distance)

**Problem**: Find minimum operations (insert, delete, replace) to convert one string to another.

```python
def min_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases: empty string transformations
    for i in range(m + 1):
        dp[i][0] = i  # Delete all characters from word1
    for j in range(n + 1):
        dp[0][j] = j  # Insert all characters of word2

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]         # No operation needed
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],       # Delete from word1
                    dp[i][j - 1],       # Insert into word1
                    dp[i - 1][j - 1]    # Replace
                )

    return dp[m][n]

print(min_distance("horse", "ros"))    # Output: 3
print(min_distance("intention", "execution"))  # Output: 5
```

---

### 8. Maximum Subarray (Kadane's Algorithm)

**Problem**: Find the contiguous subarray with the largest sum.

```python
def max_subarray(nums):
    max_sum = nums[0]
    current_sum = nums[0]

    for num in nums[1:]:
        current_sum = max(num, current_sum + num)  # Start fresh or extend
        max_sum = max(max_sum, current_sum)

    return max_sum

print(max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))  # Output: 6 (subarray [4,-1,2,1])
```

**Recurrence**: `dp[i] = max(nums[i], dp[i-1] + nums[i])`

---

### 9. Unique Paths

**Problem**: Count unique paths in an m×n grid from top-left to bottom-right (only right and down moves).

```python
def unique_paths(m, n):
    dp = [[1] * n for _ in range(m)]  # First row/col always = 1

    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]

    return dp[m - 1][n - 1]

print(unique_paths(3, 7))  # Output: 28
```

---

### 10. Partition Equal Subset Sum

**Problem**: Can you partition an array into two subsets with equal sum?

```python
def can_partition(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False  # Odd total can't be split equally

    target = total // 2
    dp = {0}  # Set of achievable sums

    for num in nums:
        dp = {s + num for s in dp} | dp

    return target in dp

print(can_partition([1, 5, 11, 5]))  # Output: True  ([1,5,5] and [11])
print(can_partition([1, 2, 3, 5]))   # Output: False
```

---

## DP Problem-Solving Framework

When you see a new DP problem, follow this process:

```
1. Identify the "state": What information uniquely defines a subproblem?
   → Usually indices into the input (i, j, k)

2. Define dp[state]: What does this value represent?
   → "Maximum/minimum/number of ways to..."

3. Write the recurrence:
   → How does dp[state] relate to smaller states?

4. Identify base cases:
   → What are the simplest subproblems you can answer directly?

5. Determine evaluation order:
   → Bottom-up: Fill the table in order of increasing state
   → Top-down: Let recursion + memo handle it automatically

6. Optimize space if needed:
   → Do you only need the last row? Use rolling array.
```

---

## Time and Space Complexity Patterns

| Problem Type          | Typical Complexity           |
|-----------------------|------------------------------|
| 1D DP (Fibonacci-like) | O(n) time, O(1)–O(n) space  |
| 2D DP (LCS, Edit)     | O(n × m) time, O(n × m) space |
| Knapsack              | O(n × W) time, O(W) space   |
| Interval DP           | O(n³) time, O(n²) space     |

---

## Summary

- **DP = recursion + memoization**, or equivalently, **bottom-up table-filling**
- The two key properties are **overlapping subproblems** and **optimal substructure**
- **Top-down (memoization)**: Write the recursion naturally, add `@lru_cache` or a dict
- **Bottom-up (tabulation)**: Fill a table iteratively from base cases up
- **Space optimization**: When only recent rows/states are needed, keep just those
- DP problems share common patterns: 1D sequences, 2D strings, subset sums, interval splits, and grid paths
