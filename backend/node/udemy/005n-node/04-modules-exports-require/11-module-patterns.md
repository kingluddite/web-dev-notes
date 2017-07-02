# Module Patterns
`greet1.js`

```js
module.exports = function() {
  console.log('Hello world');
};
```

* exports is an emtpy object and we are overwriting it
* We are replacing the empty object we got with a single function

`app.js`

```js
const greet = require('./greet1');
greet();
```

* Since greet is pointing to a function that require returned I can simply invoke it

`$ node app.js` ----> Hello World

### Let's try something different
`greet2.js`

```js
module.exports.greet = function() {
  console.log('Hello Again');
};
```

* Now I've added a method to the **exports** object
`app.js`

```js
const greet2 = require('./greet2');

greet2.greet();
```

* We can do this the much more common way with

```js
const greet2 = require('./greet2').greet;
greet2();
```

* When you see `.greet` we are reaching down into that exports object and grabbing the `greet` method

## Pattern 3 - replace `exports` with my own custom object
* I will do this using a function constructor
    - ES6 does this with `class` keyword

`greet3.js`

```js
function Greetr() {
  this.greeting = 'Three Hellos is a charm!';
  this.greet = function() {
    console.log(this.greeting);
  }
}

module.exports = new Greetr();
```

* We replace them exports object with a brand new object

`greet3.js`

```js
const greet3 = require('./greet3');
greet3.greet(); // Three Hellos is a charm!
```

## This can lead to confusion when using modules in NodeJS
What if I did this and required the exact same file?

```js
const greet3 = require('./greet3');
greet3.greet();

const greet3b = require('./greet3');
```

* What will greet3b contain?
    - A different object or the same object
    - To test that do this:

```js
const greet3 = require('./greet3');
greet3.greet();
greet3.greeting = 'Changed hello world';

const greet3b = require('./greet3');
greet3b.greet();
```

* Because greet3 changed and object pass value by reference (they both point to the same object in memory), when you change one object, you change the other object
* But there is more to it
* Set a breakpoint on greet3

![breakpoint](https://i.imgur.com/lybFzLT.png)

* Then we want to get the object back the first time we call greet3()
* Then step into the second time we call require
* Step over to get to `return mod.require(path)`
* Step into that
* Step over to get to Module._load and step into that
* Step over to get to `cachedModule`
* Here node looks for a cached module with a particular filename

![cached filename](https://i.imgur.com/rpRpC1K.png)

* require caches the results of the require function for any particular file name
    - So whatever I have hanging on in module.exports, I will have in cache here and that will be returned instead
    - Now we come back up (click step over until back in app.js)
    - Because it is an object and we pass by reference our greet3b().greet() will be pointing the spot in memory created when we called require here `const greet3 = require('./greet3')`
        + Node cached the results here
        + The next time it called require, using the same file name, Node said, "Oh I already know what came back in module exports and I'll just give you that" and it ends up being in the same location in memory as the other require function
        + So even though greet3.js creates a new instance of Greetr(), that code is only ever written once
        + I may use require multiple different times across my node application calling the same module in different locations but it will only ever called only once
            * That makes node extremely efficient
            * It also enables me to create a single object that can be referenced and used in different ways across my Application

## What if I didn't want the same file to come back from require all the time
`greet4.js`

```js
function Greetr() {
  this.greeting = 'Three Hellos is a charm!';
  this.greet = function() {
    console.log(this.greeting);
  }
}

module.exports = Greetr;
```

* Here I pass exports the function Constructor itself
* So instead of creating the new object I'll give back to my module the ability to create the new object

`app.js`

```js
const Greet4 = require('./greet4');
const grtr = new Greet4();
grtr.greet();
```

* greet4 is now a constructor function
* I make clear that it is a constructor function by spelling it was a capital `G`
* Here I am creating the object myself
* And I can keep creating new greeters and they will not be the same object because I'm not calling the require function any more I am just using the function constructor that came back from it

## One more pattern - The Revealing Modular Pattern
Exposing only the properties and methods you want via a returned object

* This is an extremely popular pattern in JavaScript
* A very common and clean way to structure and protect code within modules

`greet5.js`

```js
const greeting = 'Go go gadget';

function greet() {
  console.log(greeting);
}

module.exports = {
  greet
};
```

* Here I expose only the function I want a person to be able to use
* The others remain hidden/private

`app.js`

```js
const greet5 = require('./greet5').greet;
greet5();
```

* Notice there is no way to change the greeting property or access it because it wasn't on the object when it was returned
