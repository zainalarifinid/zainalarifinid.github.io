---
title: 'Programming Fundamentals - Error Handling'
date: '2026-05-16'
description: 'A practical guide to error handling — exceptions, try/catch/finally, defensive coding, error types, result-style returns, and how to design programs that fail safely and recover gracefully.'
tags: ['Programming Fundamentals', 'Error Handling', 'Exceptions', 'Defensive Coding', 'Beginners']
published: true
---

# Programming Fundamentals - Error Handling

Things go wrong. Networks drop. Disks fill up. Users type garbage into form fields. APIs you call return 500s. Files you expected to exist… don't.

**Error handling** is how your program responds when something unexpected happens. Done well, it's the difference between a graceful "We couldn't process that — please try again" and a server crash, a corrupted database, or a silent loss of user data.

---

## What Even Is an Error?

Three broad categories:

| Kind | Example | Recoverable? |
|---|---|---|
| **Syntax error** | Missing `)`, typo in keyword | Caught at compile/parse time |
| **Runtime error** | Divide by zero, null reference | Sometimes — depends on the case |
| **Logic error** | Wrong formula, off-by-one | Not by error handling — by testing |

This article focuses on **runtime errors** — the ones your error-handling code actually deals with.

Within runtime errors, there's an important distinction:

- **Expected errors** — invalid input, network timeouts, file not found. These are part of normal operation; handle them.
- **Programmer errors / bugs** — null where it shouldn't be, type mismatches, broken invariants. These should crash loudly so you can fix them, not be swallowed.

The right error-handling strategy depends on which kind you're dealing with.

---

## Exceptions: try / catch / finally

Most modern languages handle errors with **exceptions** — special objects that "unwind" the call stack until something catches them.

```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Math problem: {e}")
finally:
    print("This always runs")
```

```typescript
try {
  const data = JSON.parse(input);
  process(data);
} catch (err) {
  console.error("Failed to parse:", err);
} finally {
  cleanup();
}
```

| Block | When it runs |
|---|---|
| `try` | The risky code |
| `catch` / `except` | Only if `try` threw an exception |
| `finally` | Always — success or failure (cleanup, releasing resources) |

### Catching Specific Errors

Don't catch everything blindly. Match the specific exception type:

```python
try:
    user = load_user(user_id)
except UserNotFoundError:
    return 404
except DatabaseConnectionError:
    return 503        # service unavailable
except Exception as e:
    log.error("Unexpected", exc_info=e)
    raise             # re-raise — don't swallow bugs
```

Catching `Exception` (or `catch (err)` with no condition) is usually a bug magnet — you hide problems instead of fixing them.

### Raising / Throwing Errors

When your function detects something it can't handle, signal it:

```python
def withdraw(account, amount):
    if amount <= 0:
        raise ValueError("Amount must be positive")
    if amount > account.balance:
        raise InsufficientFundsError(f"Tried {amount}, have {account.balance}")
    account.balance -= amount
```

```typescript
function divide(a: number, b: number): number {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
```

### Custom Exception Types

Define your own for domain errors — they make `catch` blocks cleaner and carry useful context:

```python
class PaymentError(Exception):
    """Base class for all payment-related errors."""

class CardDeclinedError(PaymentError):
    def __init__(self, reason, transaction_id):
        super().__init__(f"Card declined: {reason}")
        self.reason = reason
        self.transaction_id = transaction_id

class FraudSuspectedError(PaymentError):
    pass

try:
    process_payment(card, amount)
except CardDeclinedError as e:
    notify_user_to_use_different_card(e.reason)
except FraudSuspectedError:
    lock_account()
    alert_security_team()
except PaymentError:
    log.warning("Generic payment failure — retrying")
```

A class hierarchy lets callers handle errors at the granularity that makes sense for them.

---

## The Error Object

Exceptions usually contain at least:

- A **message** — human-readable description
- A **type** — what kind of error
- A **stack trace** — where it was thrown

```javascript
try {
  somethingRisky();
} catch (err) {
  console.log(err.name);     // "TypeError"
  console.log(err.message);  // "Cannot read property 'x' of undefined"
  console.log(err.stack);    // full trace
}
```

When you re-throw, preserve the original error (the "cause"):

```javascript
try {
  await fetchUser(id);
} catch (err) {
  throw new Error(`Failed to load user ${id}`, { cause: err });
}
```

```python
try:
    fetch_user(id)
except Exception as e:
    raise UserLoadError(f"Failed to load user {id}") from e   # chain
```

Losing the original error is one of the most common debugging headaches in production.

---

## The Hidden Cost of Exceptions

Exceptions are convenient but have downsides:

1. **They're invisible in function signatures.** A function can throw anything and the caller has no warning.
2. **They unwind the stack** — performance cost, especially in hot loops.
3. **They can leak through layers** that don't know how to handle them.

These limits drove some languages and patterns toward an alternative…

---

## Result Types: Errors as Values

Instead of throwing, return a value that *is* either a success or an error. The caller has to handle both.

### Rust — the canonical example

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("Cannot divide by zero".to_string())
    } else {
        Ok(a / b)
    }
}

match divide(10.0, 2.0) {
    Ok(value)  => println!("Got {}", value),
    Err(msg)   => println!("Error: {}", msg),
}
```

The type system *forces* the caller to deal with both paths — you can't "forget" to handle the error.

### Go — multi-return values

```go
result, err := divide(10, 0)
if err != nil {
    log.Printf("error: %v", err)
    return
}
fmt.Println(result)
```

### TypeScript — discriminated unions

```typescript
type Result<T, E = Error> =
  | { ok: true;  value: T }
  | { ok: false; error: E };

function parseJSON(s: string): Result<unknown> {
  try {
    return { ok: true, value: JSON.parse(s) };
  } catch (e) {
    return { ok: false, error: e as Error };
  }
}

const r = parseJSON(input);
if (r.ok) {
  use(r.value);
} else {
  console.error(r.error);
}
```

**When to prefer Result over throwing**:

- The error is *expected* (parse failure, validation, "not found").
- You want callers to *see* in the type that this can fail.
- You're in a language/codebase that already uses this style.

**When exceptions still win**:

- Errors that are truly exceptional (out of memory, unrecoverable bugs).
- Deep call stacks where wrapping every layer in `Result` would be tedious.

---

## Defensive Coding

**Defensive coding** is writing code that anticipates problems and degrades gracefully. The classics:

### 1. Validate Input at Boundaries

Trust nothing that comes from outside your code — user input, API responses, file contents.

```python
def create_user(name: str, age: int):
    if not isinstance(name, str) or not name.strip():
        raise ValueError("name must be a non-empty string")
    if not isinstance(age, int) or age < 0 or age > 150:
        raise ValueError("age must be a reasonable integer")
    # ... safe to use here
```

But don't validate the same thing 20 times. Validate once at the **system boundary** (HTTP handler, CLI parser, file reader), then trust the validated data internally.

### 2. Fail Fast

When something's wrong, stop immediately — don't soldier on with bad state:

```python
# Bad — continues with None, blows up later in confusing place
def process(items):
    if not items:
        return None
    # ...

# Good — fails right where the problem is
def process(items):
    assert items, "items must not be empty"
    # ...
```

### 3. Be Conservative in What You Send, Liberal in What You Accept

(Postel's Law.) Tolerate slightly weird inputs, but always produce clean, well-formed outputs.

```python
def normalize_email(email):
    return email.strip().lower()    # accept "  Foo@Bar.COM "
```

### 4. Null / None Defense

Null reference errors are arguably the single most common bug in modern software.

```javascript
// Risky
const city = user.address.city;       // throws if address is undefined

// Defensive — optional chaining
const city = user?.address?.city ?? "Unknown";
```

```python
city = user.get("address", {}).get("city", "Unknown")
```

Better yet: don't use null where you can avoid it. Use `Option`/`Maybe` types (Rust, Kotlin, Swift, TypeScript's `T | undefined`) to make absence explicit.

### 5. Use Timeouts on Everything External

```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);

try {
  const res = await fetch(url, { signal: controller.signal });
  return await res.json();
} finally {
  clearTimeout(timeout);
}
```

A request without a timeout will eventually hang your service.

### 6. Don't Trust Free Resources

Always release what you acquire — file handles, connections, locks. Use language idioms designed for it:

```python
# Python — `with` guarantees close even on exception
with open("data.txt") as f:
    data = f.read()
```

```javascript
// JavaScript — explicit
const conn = await pool.acquire();
try {
  await conn.query("...");
} finally {
  conn.release();
}
```

```rust
// Rust — RAII: closed automatically when the value goes out of scope
let file = File::open("data.txt")?;
```

---

## Retry, Backoff, and Circuit Breakers

External calls fail. Sometimes retrying works. But naïve retries cause **retry storms** that overload the failing service.

### Exponential Backoff with Jitter

```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 5,
  baseDelayMs = 200,
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxAttempts) throw err;
      const delay = baseDelayMs * 2 ** (attempt - 1);
      const jitter = Math.random() * delay;
      await new Promise(r => setTimeout(r, delay + jitter));
    }
  }
  throw new Error("unreachable");
}
```

### When NOT to Retry

- 4xx errors (your request was wrong — retrying won't fix it).
- Non-idempotent operations (a "send money" call that already succeeded but you didn't see the response).
- After the user has given up.

### Circuit Breakers

If a downstream service is failing badly, stop calling it for a while — let it recover.

```
Closed:    Calls go through. Track failure rate.
   │ failures > threshold
   ▼
Open:      Skip the call, fail immediately. After cooldown, try one.
   │ probe succeeds
   ▼
Half-Open: Allow a few calls. If they work, close; if not, open again.
```

Libraries like Polly (.NET), Resilience4j (Java), and opossum (Node) implement this for you.

---

## Logging Errors

The wrong way:

```python
try:
    do_thing()
except Exception:
    pass     # silent — you will regret this
```

The right way:

```python
try:
    do_thing()
except Exception as e:
    log.exception("Failed to do_thing for user=%s", user_id)
    raise        # re-raise unless you actually handled it
```

A good error log includes:
- **What** happened (message + stack)
- **Context** (user ID, request ID, parameters)
- **What you did** (retried? failed-over? gave up?)

### Structured Logging

Plain-text logs are hard to search. Structured logs (JSON) let you filter and aggregate:

```javascript
log.error({
  event: "payment_failed",
  userId: user.id,
  amount: payment.amount,
  reason: err.code,
  err,
});
```

---

## Errors Across Boundaries

When errors leave your system (to an HTTP client, another service), translate them. The caller doesn't need your stack trace; they need to know what to do.

```typescript
// Internal
throw new UserNotFoundError(id);

// At the HTTP boundary
app.use((err, req, res, next) => {
  if (err instanceof UserNotFoundError) {
    return res.status(404).json({ error: "user_not_found" });
  }
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: "validation_failed", details: err.fields });
  }
  log.error(err);
  res.status(500).json({ error: "internal_error" });
});
```

Never leak internal error messages, stack traces, or database queries to end users — they're useless to users and useful to attackers.

---

## What NOT to Do

### Don't catch and ignore

```python
try:
    risky()
except Exception:
    pass        # 🚨 you've made future debugging impossible
```

### Don't catch what you can't handle

```python
try:
    parse(input)
except Exception as e:
    return None       # caller now has no idea what went wrong
```

If you can't *meaningfully* respond to the error, let it propagate.

### Don't use exceptions for normal control flow

```python
# Bad — exception used as a "found it!" signal
def find(items, target):
    try:
        for item in items:
            if item == target:
                raise StopIteration(item)
    except StopIteration as e:
        return e.value
```

Exceptions are *expensive* and obscure. Just `return` or `break`.

### Don't print and swallow

```javascript
catch (err) {
  console.log(err);   // user sees nothing; logs are noisy; bug hidden
}
```

Either handle the error meaningfully, or let it bubble up.

---

## A Realistic Example: a Payment Endpoint

```typescript
import { z } from "zod";

const PaymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.enum(["USD", "EUR", "GBP"]),
  cardToken: z.string().min(10),
});

app.post("/payments", async (req, res, next) => {
  // 1. Validate input at the boundary
  const parsed = PaymentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "validation_failed",
      details: parsed.error.flatten(),
    });
  }

  const requestId = req.headers["x-request-id"] ?? crypto.randomUUID();

  try {
    // 2. Pure business logic
    const payment = await withRetry(
      () => paymentGateway.charge(parsed.data),
      3,
      300,
    );

    log.info({ event: "payment_succeeded", requestId, paymentId: payment.id });
    return res.status(201).json({ id: payment.id });
  } catch (err) {
    // 3. Translate known errors to user-friendly responses
    if (err instanceof CardDeclinedError) {
      log.warn({ event: "card_declined", requestId, reason: err.reason });
      return res.status(402).json({ error: "card_declined", reason: err.reason });
    }
    if (err instanceof GatewayTimeoutError) {
      log.warn({ event: "gateway_timeout", requestId });
      return res.status(504).json({ error: "gateway_timeout" });
    }

    // 4. Unknown errors — log and 500
    log.error({ event: "payment_failed", requestId, err });
    return res.status(500).json({ error: "internal_error", requestId });
  }
});
```

This handler:
- **Validates** input at the boundary
- **Retries** transient failures with backoff
- **Translates** known errors into appropriate HTTP statuses
- **Logs** with context including a request ID for traceability
- **Hides** internal details from the response

---

## Summary

- Distinguish **expected errors** (handle them) from **bugs** (let them crash so you can fix them).
- Use **try/catch/finally** for exception-based languages; use **Result types** where the language and codebase favor them.
- Catch **specific** exceptions; never silently swallow errors.
- **Validate at boundaries**, fail fast, defend against null and timeouts.
- **Retry with backoff and jitter** — and know when not to retry.
- Log with **context** (request ID, user ID, structured fields), and **chain** errors to preserve causes.
- **Translate** errors at system boundaries — don't leak internals.
- Error handling is a design discipline, not a checklist. Code that fails gracefully is what separates prototypes from production.

That wraps up the [Programming Fundamentals](/articles/base-knowledge-software-engineer) series. The next step in the [Base Knowledge](/articles/base-knowledge-software-engineer) guide is mastering the [Operating System & Command Line](/articles/base-knowledge-software-engineer) — the environment all this code runs in.
