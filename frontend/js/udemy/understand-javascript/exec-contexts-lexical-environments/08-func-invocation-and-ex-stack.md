# Function Invocation and The Execution Stack
## This is very important to know and fits into so much of the big world of JavaScript and how it works

## Invocation
Running a function (_aka `calling` a function_)

* In JavaScript, by using parenthesis `()`

```
function b() {}
function a() {
    b();
}
a();
```

* We have function b that does nothing
* We have function a that invokes (calls) function b
* We invoke function a

## Code analysis
* Let's walk through this code line-by-line

1. We run our code
2. The compiler will start up and it knows it needs to create a global execution context
3. Immediately a Global Execution Context is created and the code is executed
    * Global variable `this` is created
    * Global `Window` object is created
    * It will set up a memory space for these two items in the `Creation Phase` of the execution context
        + So b() and a() will be in memory
        + Then the code is executed line-by-line
        + It won't invoke those functions until it gets to `a()`... this is what happens

### A new Execution Context is created when `a()` runs
* And this is placed on the `Execution Stack`
* What is the Execution Stack?
    - One Execution Context stacked on top of another Execution Context
    - Whichever Execution context is on top is the one that is currently running

So whenever you invoke a function, a new Execution Context is created and put on top of the Execution Stack
    * The Execution Stack is created (just like our Global Execution Context)
    * It will have it's own variables and functions
    * It will go through Create Phase
    * And then it will execute line-by-line the code within the function

But if I have another function invocation, it will stop and create another Execution context and run that code and that gets placed on top of the stack

## Takeaway
This is how function invocation happens in JavaScript

1. Every function creates a new Execution Context
2. Which runs the Create Phase
3. And then executes the code line-by-line within the function

![Execution Context Stack chart](https://i.imgur.com/vpiujKf.png)

* When `b()` finishes, because it is at the top of the stack, it will get popped off the stack then `a()` Execution Context and then back down to Global Execution Context
* **note** The order lexically doesn't matter nor does the rest of the code that is surrounding those function calls

```
function a() {
    b();
    var c;
}
function b() {
    var d;
}
a();
var d;
```

* The reordering doesn't matter
* All the functions are in memory during the initial Global Execution Context
* But what happens with all the variable declarations
    - `a()` invokes function `a()`
        + That is what is next put on top of the Execution Stack (The Execution Context for the function `a()`)
        + That becomes the currently running code (that means `var d` isn't run yet because JavaScript is synchronous - one line at a time)
            * The next thing is it goes line-by-line inside `a()` and it gets to `b()` so it will invoke the `b()` function and that Execution Context gets created and put the top of the Stack
                - `b()` gets invoked and that Execution Context gets run and put to the top of the Stack and then it will run the line `var d;` inside of `b()`
                - only then will it go back to function `a()` because the Execution Context of `b()` is finished and it gets **"popped off"** the top of the Stack so now the Execution Context of `a()` is at the top of the Stack and it runs the `var c` line and then `b()` get popped off the Stack and we're back at the Global Execution Context and we finish running `var d;`
