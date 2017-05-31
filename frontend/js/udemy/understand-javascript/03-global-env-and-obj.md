# The Global Environment and the Global Object
* Whenever code is run in JavaScript it is run inside an **execution context**
* The execution context is a wrapper the JavaScript engine, the program that other people that's parsing, looking at and verifying and executing your code, it wraps the currently executing code in an **execution content**

## Our first program
* We will look at an execution context being created and run
    - We'll look at a few
    - There's more than one that run during a JavaScript program normally
    - The base execution context is your `Global` execution context

## Execution Context (Global)
* Has a couple special things that come along for the ride
* The base execution context, the Global execution context

### What do we mean by Global?
Something that is accessible everywhere and to everything in your code

### The Global execution context
Creates two things for you:

1. Global Object
    * Just a collection of name/value pairs
2. `this`
    * This is a special variable

The JavaScript engine creates these two things for you whenever your code is run because your code is wrapped inside an execution context

`index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Global execution Context</title>
</head>
<body>

<script src="app.js"></script>
</body>
</html>
```

`app.js`

```
// empty file
```

## Run it
* Yes there is no JavaScript
* But it ran the file
* And since it ran the file an **execution** context was created
    - we now have a `Global` object
    - and a special variable called `this`

`> this`

![this](https://i.imgur.com/vCyRUgo.png)

* We didn't create this
* The execution context was created by the JavaScript engine
* And it decided what the value of `this` should be
    - `this` is the **window**
    - The current window we are in
    - The browser window
    - Because we are running JavaScript in the browser

`> window`

* You also have available an object called **window**
* The same object that `this` is showing us
* The `window` object is the global object available inside browsers
    - If you are using `node.js`, if your running JavaScript on the server, the global object won't be `window`, there's a different global object but there is ALWAYS a global object when you're running JavaScript
    - If you are using a browser your global object is **window**
    - If you had a separate tab open that would be a separate global **window** object
        + Each tab has it's own execution context (it's own global execution context)

## Takeaway
* We have these two objects and we wrote no code
* This is the JavaScript engine doing stuff for us
* We have access to all the code inside the Global execution context, inside that **Lexical Environment** and there is a special variable that sits inside the execution context called **this**
* At the global level The Global Object (window) and `this` are equal

![global = this](https://i.imgur.com/s2L7kp9.png)

* `this` gets you the Global object
* `window` gets you the Global object

## When we say `Global` what do we really mean?
* "Not inside a function"
* Don't think deeper than that
* Code or variables that aren't inside a function is Global

`app.js`

```
var a = 'Hello';

function b() {

}
```

* Save and open console

`> window`

* Refresh browser
* Expand the window object and scroll down name/value pairs to see this:

![a and b()](https://i.imgur.com/vyKi3yl.png)

* You see our global variable `a` and `b()` global function
* In JavaScript when you create variables and functions that are not inside a function are attached to the Global object

## Access `a`
`> a` --> "Hello"

or

`> window.a` --> "Hello"

* When **lexically** they are not sitting inside a function - they are on the global object

## Outer Environment
* We also will talk about how we can link to the Outer Environment
* This means when you are running code inside a function **outer environment** is code that is running **outside** a function
* When running code at the Global level there is nothing **outside** the Global Environment

![execution context diagram](https://i.imgur.com/AdMlJNL.png)

