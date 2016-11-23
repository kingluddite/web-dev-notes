# Arrow syntax

change function declaration to a function expression
arrow is concise
fixes scope issues

## function declaration 

```js
function sayName() {
  const message = "My name is " + name;
  console.log(message);
}
```

## function expression
```js
var sayName = function() {
  const message = "My name is " + name;
  console.log(message);
}
```

### use const

```js
var sayName = function() {
  const message = "My name is " + name;
  console.log(message);
}
```
* `const` prevents us from reassigning what's inside the sayName variable

### arrow function 

```js
// arrow function 
const sayName = () => {
  const message = "My name is " + name;
  console.log(message);
}
```

## single argument

```js
function square(x) {
  return x * x;
}

const square = (x) => {
  return square(x) * x;
}
```

## multiple arguments

```js
// mutliple args
function mutliply(x, y) {
  return x * y;
}

const multiply = (x, y) => {
  return x * y;
}
```

## single argument more concise 
* can't move parenthesees on no or multiple arguments 
* if you are only using one line of code you don't need the return keyword, it will always return the value of the statement without the use of the return keyword
* you can remove the curly braces when you only have a single line of code

```js
const square = x => {
  return x * x;
}
```

```js
const square = x => x * x;
```

### Summary

```js
// function declaration

function divide1(a,b) {
  return a / b;
}

// Function expression

const divide2 = function(a, b) {
  return a / b;
}

// Arrow Function expression

const divide3 = (a, b) => {
  return a / b;
}

// Arrow Function Expression - concise

const divide4 = (a, b) => a / b;
```








