# Framework Aside: IIFE and Safe Code
* Why IIFEs are so useful

```js
// IIFE
(function(name) {
    var greeting = 'Hello';
    console.log(greeting + ' ' + name);
}('Bob')); // Hello Bob
```

### Execution Context
Here is the code we are running

```js
// IIFE
(function(name) {
    var greeting = 'Hello';
    console.log(greeting + ' ' + name);
}('Bob'));
```

* When code is first loaded we have our `Global Execution Context`
* And nothing is in it, we have no variables, no function statements to be hoisted (at first)

Then it hits this line this IIFE

```js
(function(name) {
    var greeting = 'Hello';
    console.log(greeting + ' ' + name);
}('Bob'));
```

* When it gets to `()` the function expression part, it now creates that function object in memory and its anonymous, no name, its just this object with some code inside it
* Then it sees the `('Bob')`
    - The parentheses that are invoking the function
    - Then a new Execution Context is created for that anonymous function that we just created on the fly
    - The the code is run line-by-line inside the function
    - Then the `var greeting = 'Hello'` get put inside the Execution Context variable environment of the Execution Context that was just created
        + Not into the Global Execution Context
        + Because we are executing a function we have our own Execution Context that is running
        + All variables created inside this Execution Context sit all by themselves, they are not touching the Global Execution Context
        + This is what makes this such a useful approach to writing your code

## Example
### What happens when we have two variables that collide?
`greet.js`

```js
var greeting = 'Hola';
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Objects and Functions</title>
</head>
<body>

 <script src="greet.js"></script>
 <script src="app.js"></script>
</body>
</html>
```

`app.js`

```js
// IIFE
(function(name) {
    var greeting = 'Hello';
    console.log(greeting + ' ' + name);
}('Bob'));
```

* Run the code
* No errors
* Before we hade a problem with collisions
* Now we don't

`app.js`

```js
// IIFE
(function(name) {
    var greeting = 'Hello';
    console.log(greeting + ' ' + name);
}('Bob'));

console.log(greeting);
```

* We run and get `Hola`

### How is this working?
As we stack the JavaScript files on top of each other this is what it will look like

```js
var greeting = 'Hola';
// IIFE
(function(name) {
    var greeting = 'Hello';
    console.log(greeting + ' ' + name);
}('Bob'));

console.log(greeting);
```

* The Global Execution Context is created and `greeting` with a value of `Hola` in a memory slot
* Then the IIFE is seen
* The function expression causes it to be created
* The parentheses cause it to be invoked
* Which creates its own Execution Context
* Then when we reach the execution of the var inside that Execution Context it is placed in memory in that Execution Context
* So both greeting variables exist but in separate Execution Contexts (separate areas of memory or addresses)

### Takeaway
* We are sure our code by wrapping it inside an IIFE does not interfere with or collide or crash into or be interfered by any other code that might be included in my application
* Our code is safe
* So in a large portion of libraries and frameworks, the first thing you'll see is a parentheses and function and at the very bottom, the end of it
    - Because it wraps all its code in an IIFE

## What if we want to put something into the Global Object?
* We can handle that by passing around parameters
* Remember - objects pass by reference
* So if we want access to our Global Object, we just pass it into our function

```js
// IIFE
(function(global, name) {
    var greeting = 'Hello';
    global.greeting = 'Hello';
    console.log(greeting + ' ' + name);
}(window, 'Bob'));

console.log(greeting);
```

* This will overwrite `Hola` with `Hello`
* Maybe you are creating an object in your function that you want to be available everywhere else in your code, so you can stick it on the Global Object but you are doing it intentionally
