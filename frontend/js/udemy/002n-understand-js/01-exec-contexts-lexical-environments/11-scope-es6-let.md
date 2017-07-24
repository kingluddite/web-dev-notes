# Scope, ES6, and `let`
## We talked about
* Execution Context
* Execution Environments
* Variable Environments
* Lexical Environments
* All of the above define what is called `Scope`
    - Especially talking about the `Scope chain`
        + The outer reference that any running function has

## Scope
* Where a variable is availble in your code
    - And if it's truly the same variable, or a new copy
    - If you call the same function twice
        + They each get their own Execution Context
        + It looks like the same variable but it is two different variables in memory

## Thought For the day
With regards to JavaScript, those that learn how things work under the hood solve problems better

## ES6
* Also called EcmaScript 2015
* Introduced a new way to declare variables

### `let`
* Can be used instead of `var`
* `let` is not replacing `var`, `var` will still be around
* `let` allows the JavaScript engine to use **block scoping**

```
if (a > b) {
    let c = true;
}
```

* During Execution Phase where it is created, that variable is still placed into memory and set to `undefined`
* BUT you are NOT allowed to use it until the line of code is run during the Execution Phase that actually declares the variable
* In the above example, if you tried to use `c` before the `let c = true` you would get an error
    - It is still in memory but the JavaScript engine won't allow it
* `let` is declared inside a **block**
    - **blocks** are generally defined by **curly braces** `{ }`
        + examples
            * inside an `if` statement or `for` loop or something similar
    - When that variable is defined inside that block it is only available inside that block at that period of time for the running code
    - This is true even for `for` loops
        + If you have a `for` loop and you are running the same code over and over but you are using `let`, you will get a different variable in memory each iteration of the loop
        + This allows for block scoping which is common in other programming languages
        + You can use `let` and `var` in ES6
            * It is import to know how each work
