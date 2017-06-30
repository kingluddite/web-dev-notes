# JavaScript Aside
## Immediately Invoked Function Expressions
* This is a fundamental aspect on how modules work
* code that is protected
* code we write inside a module doesn't unintentionally impact any other code that we have written in our software
* We are essentially talking about **scope**

## Scope
Where in code you have access to particular variable or function

### Example
* We can have a function expression
    - anonymous function
    - It will create a function on the fly

```js
function() {
  
}
```

* The JavaScript Engine sees this and just sees it as a JavaScript statement
* It is just a basic function
* But we don't want a basic function because it won't give us the extra functionality that we need
* We need a function that is created and immediately available to us just like if I created a string or a number

* `'John'.` ---- and then I have access to the things I can do with a string
* `3.` --- and have access to the things I can do to numbers
* But I need a function and need to immediately be able to run it
    - I can do this by telling the JavaScript Engine that this is an expression

### Most common way
```js
(function () {

});
```

* Now the statement is transformed into an expression in the eyes of the JavaScript Engine
* It is no longer a function statement
* It is a function expression

### Now I want to invoke that function expression
```js
(function () {

}());
```

* Here we create a function and immediately invoke it
* This is an IIFE
    - Immediately Invoked Function Expression

```js
(function() {

  const firstName = 'John';
  console.log(firstName);

}());

const firstName = 'Jane';
console.log(firstName);
```

* They both run and output John and Jane respectively
* What if we move the global variable to the top

```js
const firstName = 'Jane';
(function() {
  const firstName = 'John';
  console.log(firstName);

}());

console.log(firstName);
```

* We get the same output because the IIFE is immediately invoked
* But the important thing is we have two variable named the same thing in two different scopes our IFFE is self contained and won't affect the other global variable
* Whatever variables you create within a function is protected within that function
    - It is only accessible within that function
    - It is **scoped** to that function
    - This is intentional
    - This is how JavaScript developers have been faking what a module should be
    - Just by wrapping our code inside IIFE we can insure it won't bleed out and collide with stuff outside of the IIFE
    - So if we had our IIFE in a separate file and I required or imported it, I would know that it would not collide with other code in other files

## Passing IIFE arguments
```js
const firstName = 'Jane';
(function (lastName) {
  const firstName = 'John';
  console.log(firstName + ' ' + lastName);

}('Doe'));

console.log(firstName);
```

`$ node app.js` ===> John Doe and Jane

## Next
How do modules in Node.js work
How can I use modules in Node.js to my full advantage
