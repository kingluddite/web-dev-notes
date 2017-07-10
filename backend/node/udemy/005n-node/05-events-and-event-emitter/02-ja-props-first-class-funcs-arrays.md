# JavaScript Aside
* Object Properties
* First Class Functions
* Arrays

`app.js`

```js
// object properties and methods
var obj = {
  greet: 'Yo'
};

console.log(obj.greet);
```

* Run
* `$ node app.js`
    - Gives us `Yo`

## I can also use a different syntax with brackets and a string
`console.log(obj['greet']);`

* And that will also return `Yo`
    - `['greet']` is the name of the property
    - This lets me use dynamic values

## Also can set a variable equal to a string value
```js
var prop = 'greet';
console.log(obj[prop]);
```

* That will also return `Yo`
* I can use a string and store it inside a variable and then use that variable (inside brackets) to get that object properties value

## Functions and arrays
* arrays are just a collection of things

```js
// functions and arrays
var arr = [];

arr.push(function() {
  console.log('hello world 1');
});
arr.push(function() {
  console.log('hello world 2');
});
arr.push(function() {
  console.log('hello world 3');
});
```

* So I have 3 functions sitting in an array
    - Note that it is 3 functions and not the values that come back from those functions
    - I haven't invoked the function
    - Just the function itself is sitting in the array

## Use one of the ways to loop over an array
* This is built in
* Every array gets a `forEach()` method

```js
// functions and arrays
var arr = [];

arr.push(function() {
  console.log('hello world 1');
});
arr.push(function() {
  console.log('hello world 2');
});
arr.push(function() {
  console.log('hello world 3');
});

arr.forEach(function(item) {
  item();
});
```

* That will loop through each item in the array
    - Which are functions
* And invoke each one as we loop through them

## Takeaways
* I can use a variable that holds a string to dynamically grab a value off a property or method of an object
* I can put functions into arrays
    - And loop across that array
    - And invoke all the functions that are sitting inside that array

These takeaways are fundamental to understanding the **Event Emitter**

### Next - Building our Event Emitter 
