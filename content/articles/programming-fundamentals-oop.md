---
title: 'Programming Fundamentals - Object-Oriented Programming (OOP)'
date: '2026-05-16'
description: 'A deep dive into OOP — classes and objects, the four pillars (encapsulation, inheritance, polymorphism, abstraction), composition vs. inheritance, and how to design clean object-oriented systems.'
tags: ['Programming Fundamentals', 'OOP', 'Object-Oriented', 'Classes', 'Design', 'Beginners']
published: true
---

# Programming Fundamentals - Object-Oriented Programming (OOP)

**Object-Oriented Programming** is a way of organizing code by bundling **data** and the **behavior** that operates on that data into self-contained units called **objects**.

A program written in OOP isn't a list of procedures — it's a collection of objects that send messages (call methods) on each other. Languages like Java, C#, Python, Ruby, and modern JavaScript all support OOP, and the mental model maps cleanly to real-world systems: a `User` has an `email`, can `login()`; an `Order` has `items`, can `calculateTotal()`.

---

## Classes and Objects

A **class** is a blueprint. An **object** (or **instance**) is a concrete thing made from that blueprint.

```python
class User:
    def __init__(self, name, email):   # constructor
        self.name = name               # instance attribute
        self.email = email

    def greet(self):                   # instance method
        return f"Hello, {self.name}"

alice = User("Alice", "alice@example.com")    # an object
bob   = User("Bob",   "bob@example.com")      # another object

print(alice.greet())   # "Hello, Alice"
print(bob.greet())     # "Hello, Bob"
```

| Concept | Meaning |
|---|---|
| **Class** | The blueprint — describes structure and behavior |
| **Object / Instance** | A concrete value built from the class |
| **Attribute / Field / Property** | Data stored on an object |
| **Method** | A function attached to a class |
| **Constructor** | Special method that initializes a new object |

The same idea in TypeScript:

```typescript
class User {
  constructor(public name: string, public email: string) {}

  greet(): string {
    return `Hello, ${this.name}`;
  }
}

const alice = new User("Alice", "alice@example.com");
console.log(alice.greet());
```

---

## The Four Pillars of OOP

### 1. Encapsulation

**Encapsulation** means bundling data with the methods that operate on it, and *hiding* the internal details from outside code.

```python
class BankAccount:
    def __init__(self, owner):
        self.owner = owner
        self.__balance = 0       # double underscore → name-mangled (private-ish)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount

    def withdraw(self, amount):
        if amount > self.__balance:
            raise ValueError("Insufficient funds")
        self.__balance -= amount

    @property
    def balance(self):           # read-only access
        return self.__balance

acc = BankAccount("Alice")
acc.deposit(100)
print(acc.balance)               # 100
# acc.__balance = -1000          # blocked
```

Encapsulation enforces **invariants** — guarantees the rest of your code can rely on. Here, `__balance` can never be negative because every modification goes through validating methods.

#### Access Modifiers

| Modifier | Java | Python | Meaning |
|---|---|---|---|
| public | `public` | (default) | Accessible everywhere |
| protected | `protected` | `_name` (convention) | Subclasses + same package |
| private | `private` | `__name` (name-mangled) | Only inside the class |

Python uses convention (`_` = "internal," `__` = name-mangled) rather than strict enforcement. JavaScript got real private fields with `#`:

```javascript
class Counter {
  #count = 0;                    // truly private

  increment() { this.#count++; }
  get value() { return this.#count; }
}
```

### 2. Inheritance

**Inheritance** lets a class derive from another, reusing its attributes and methods while adding or overriding behavior.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):              # Dog inherits from Animal
    def speak(self):            # override
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

for pet in [Dog("Rex"), Cat("Luna")]:
    print(f"{pet.name} says {pet.speak()}")
```

`Dog` and `Cat` get `__init__` and `self.name` for free, and provide their own `speak()`.

#### Calling the Parent

```python
class Employee(User):
    def __init__(self, name, email, salary):
        super().__init__(name, email)   # call parent constructor
        self.salary = salary
```

#### Multiple Inheritance

Some languages (Python, C++) allow inheriting from multiple classes; others (Java, C#) don't but allow implementing multiple interfaces.

```python
class Serializable: ...
class Loggable: ...

class User(Serializable, Loggable):
    ...
```

Multiple inheritance is powerful but prone to the **diamond problem** — ambiguity when two parents define the same method. Most modern designs prefer **composition** or **mixins/interfaces** instead.

### 3. Polymorphism

**Polymorphism** means "many forms" — different objects can respond to the *same* method call in *different* ways.

```python
animals = [Dog("Rex"), Cat("Luna"), Cow("Bessie")]
for a in animals:
    print(a.speak())     # each calls its own version
```

The caller doesn't need to know the concrete type — it just calls `.speak()`. This is what makes OOP code extensible: add `class Sheep(Animal)` later, and the loop just works.

#### Static Polymorphism — Method Overloading

Some languages let you define multiple methods with the same name but different parameters:

```java
class Calculator {
    int add(int a, int b)         { return a + b; }
    double add(double a, double b) { return a + b; }
    int add(int a, int b, int c)   { return a + b + c; }
}
```

Python and JavaScript handle this with default/variable arguments instead.

#### Dynamic Polymorphism — Method Overriding

Subclasses replace the parent's method, and the right version is chosen at runtime:

```typescript
class Shape {
  area(): number { return 0; }
}

class Circle extends Shape {
  constructor(private radius: number) { super(); }
  area(): number { return Math.PI * this.radius ** 2; }
}

class Square extends Shape {
  constructor(private side: number) { super(); }
  area(): number { return this.side ** 2; }
}

const shapes: Shape[] = [new Circle(5), new Square(4)];
shapes.forEach(s => console.log(s.area()));
```

### 4. Abstraction

**Abstraction** means exposing only what callers need to know, hiding the *how*. Encapsulation hides *data*; abstraction hides *complexity*.

In OOP, abstraction is often expressed with **abstract classes** or **interfaces**:

```python
from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    @abstractmethod
    def charge(self, amount: float) -> bool:
        pass

class StripeProcessor(PaymentProcessor):
    def charge(self, amount):
        # Stripe-specific HTTP call
        return True

class PayPalProcessor(PaymentProcessor):
    def charge(self, amount):
        # PayPal-specific SDK call
        return True

def checkout(processor: PaymentProcessor, amount: float):
    if processor.charge(amount):
        print("Payment successful")
```

`checkout()` doesn't know or care which processor it gets — it just calls `charge()`. You can add `BraintreeProcessor` later without touching `checkout()`.

---

## Composition vs. Inheritance

A famous OOP guideline: **"Favor composition over inheritance."**

**Inheritance** says: "is-a." A `Dog` is an `Animal`.
**Composition** says: "has-a." A `Car` has an `Engine`.

```python
# Inheritance — Car is an Engine? No.
class Car(Engine):   # bad design
    ...

# Composition — Car has an Engine
class Car:
    def __init__(self):
        self.engine = Engine()    # owns an Engine

    def start(self):
        self.engine.ignite()
```

### Why Composition Often Wins

- **Inheritance** creates tight coupling: changing the parent can break every subclass.
- **Composition** is more flexible: swap out the inner component without changing the outer class.
- **Inheritance hierarchies** get deep and brittle; **composed objects** stay flat and modular.

```python
class EmailNotifier:
    def send(self, msg): ...

class SMSNotifier:
    def send(self, msg): ...

class User:
    def __init__(self, name, notifier):
        self.name = name
        self.notifier = notifier            # composed in

    def notify(self, msg):
        self.notifier.send(msg)

# Swap behavior without subclassing
alice = User("Alice", EmailNotifier())
bob   = User("Bob", SMSNotifier())
```

This is **dependency injection** — supply collaborators from outside instead of hard-coding them.

---

## Class Methods vs. Static Methods vs. Instance Methods

```python
class Circle:
    PI = 3.14159          # class attribute (shared)

    def __init__(self, radius):
        self.radius = radius

    def area(self):                      # instance method
        return Circle.PI * self.radius ** 2

    @classmethod
    def unit_circle(cls):                # class method — alternate constructor
        return cls(1)

    @staticmethod
    def is_valid_radius(r):              # static method — utility
        return r > 0

Circle.is_valid_radius(5)   # True
c = Circle.unit_circle()    # Circle with radius=1
c.area()                    # 3.14159
```

| Kind | Receives | Use for |
|---|---|---|
| Instance method | `self` | Operates on a specific object |
| Class method | `cls` | Operates on the class itself (factories) |
| Static method | (nothing) | Utility tied to the class but not its state |

---

## SOLID Principles in OOP

Five principles for writing maintainable OO code:

| Letter | Principle | One-line summary |
|---|---|---|
| **S** | Single Responsibility | A class should have one reason to change |
| **O** | Open/Closed | Open for extension, closed for modification |
| **L** | Liskov Substitution | Subtypes must work anywhere their base works |
| **I** | Interface Segregation | Many small interfaces beat one big one |
| **D** | Dependency Inversion | Depend on abstractions, not concretions |

### Single Responsibility — Bad Example

```python
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def save_to_db(self): ...        # persistence concern
    def send_welcome_email(self): ...# notification concern
    def render_profile(self): ...    # UI concern
```

A change to the DB schema, the email template, or the UI all force changes to `User`. Split into `User`, `UserRepository`, `EmailService`, `ProfileRenderer`.

### Liskov Substitution — Bad Example

```python
class Bird:
    def fly(self): ...

class Penguin(Bird):
    def fly(self):
        raise Exception("Can't fly!")    # violates LSP
```

If you have `for b in birds: b.fly()`, the penguin crashes the program. Better: model `Bird` and `FlyingBird` as separate types, or use composition.

---

## Real-World Mini-Example: a Shopping Cart

```typescript
interface PricedItem {
  name: string;
  unitPrice: number;
  quantity: number;
}

class Cart {
  private items: PricedItem[] = [];     // encapsulation

  add(item: PricedItem): void {
    if (item.quantity <= 0) throw new Error("Quantity must be positive");
    this.items.push(item);
  }

  remove(name: string): void {
    this.items = this.items.filter(i => i.name !== name);
  }

  get subtotal(): number {
    return this.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  }
}

abstract class DiscountStrategy {            // abstraction
  abstract apply(subtotal: number): number;
}

class PercentDiscount extends DiscountStrategy {     // inheritance
  constructor(private percent: number) { super(); }
  apply(subtotal: number): number {
    return subtotal * (1 - this.percent / 100);
  }
}

class FixedDiscount extends DiscountStrategy {
  constructor(private amount: number) { super(); }
  apply(subtotal: number): number {
    return Math.max(0, subtotal - this.amount);
  }
}

class Checkout {
  constructor(private cart: Cart, private discount: DiscountStrategy) {}

  total(): number {
    return this.discount.apply(this.cart.subtotal);  // polymorphism
  }
}

const cart = new Cart();
cart.add({ name: "Book", unitPrice: 20, quantity: 2 });
cart.add({ name: "Pen", unitPrice: 5, quantity: 3 });

const checkout1 = new Checkout(cart, new PercentDiscount(10));
console.log(checkout1.total());   // 49.5

const checkout2 = new Checkout(cart, new FixedDiscount(5));
console.log(checkout2.total());   // 50
```

This 40-line example shows:
- **Encapsulation**: `items` is private; only validated `add`/`remove` can touch it
- **Inheritance + polymorphism**: `PercentDiscount` and `FixedDiscount` both extend `DiscountStrategy`
- **Composition + dependency injection**: `Checkout` is given a `Cart` and a strategy — swap either without changing `Checkout`

---

## When OOP Helps (and When It Doesn't)

OOP shines when:
- You have many *things* with state and behavior that evolves together (users, orders, sessions).
- The same operation should behave differently for different types (polymorphism).
- You want to enforce invariants and hide complexity (encapsulation).

OOP is often overkill when:
- The problem is data transformation pipelines (favor functional style — see [Functional Programming](/articles/programming-fundamentals-functional-programming)).
- The "object" has no state — it's just a function in disguise.
- You're forcing a class for code that would be a few free functions in a module.

Modern codebases usually mix paradigms: pure functions for transformations, classes for entities with identity and state.

---

## Summary

- **Class** = blueprint; **object** = instance.
- The four pillars: **encapsulation**, **inheritance**, **polymorphism**, **abstraction**.
- Prefer **composition over inheritance** — it stays flexible.
- Follow **SOLID** for maintainable designs.
- OOP isn't the only way — use it where it actually models the problem.

Next: a different paradigm that emphasizes pure functions and immutability — [Functional Programming](/articles/programming-fundamentals-functional-programming).
