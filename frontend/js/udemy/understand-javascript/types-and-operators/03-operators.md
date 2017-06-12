# Operators
* A special function that is syntactically (written) differently
* Generally, operators take two parameters and return one result

```
var a = 3 + 4;
console.log(a); // 7
```

## How did the JavaScript engine do that?
How did it know that my intent was to add `3` and `4`?

`+` is an **operator** (the addition operator)

* The `+` operator is actually a function
* Think of it like:

```
function +(a, b) {
    return // add two numbers
}
```

* And to call it we would have to call it like `+(3, 4)`
* But if we had to call math functions like that for every mathematical operation, it would suck

## [Infix notation](https://en.wikipedia.org/wiki/Infix_notation)
The function name, the operator sits between the two parameters `(3 + 4)`

* So instead of use `prefix notation` ----- **+(3, 4)**
* We use `infix notation` -------- **3 + 4**
* Note - `postfix notation` would look like **3 4+**
    - Old school accounting calculators work this way
* But JavaScript using **infix notation** because it is human readable
    - But it is essentially a function call
    - A function passing two values and the function returns (in the case of the `+` operator) theses two parameters added together

## There are other operators
### Minus (-)
`-` is the minus operator for subtracting numbers

```
var a = 4 - 3;
console.log(a); // 1
```

### >, <
* Here we are asking a question
* Is 4 greater than 3
* It accepts two number and returns a Boolean

```
var a = 4 > 3;
console.log(a); // true
```


