# Arrow Functions
Alternative way to define a function in JavaScript

## Convert to ES6 Arrow function
```js
const square = function(x) {
    return x * x;
  }

console.log(square(10));
```

* Functions can be anonymous and we can store it inside a variable
* We can also use named functions, and they will give us the same result
    - Arrow functions **do not** support the named function syntax
    - All Arrow functions are anonymous functions

```js
function square(x) {
    return x * x;
};
```

And Convert

```js
const square = (x) => {
    return x * x;
}
```

* Once you do the conversion, Meteor will take a little longer to re-run because now it is converting the ES6 code to older code behind the scenes

And Refactor

```js
const square = x => x * x ;
```

## Why use Arrow functions?
* They support a simplified syntax
* The **expression syntax** implicitly uses the `return` keyword behind the scenes which means we do not have to explicitly provide it
    - In the above example `x * x` is automatically returned

`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(function() {
  const user = {
    name: 'Billy',
    sayHi: function() {
      console.log(this.name);
    }
  };

  user.sayHi();
});
```

Will output `Billy` on the server Terminal

## Arrow functions do not bind the `this` keyword
The first difference between regular functions and arrow functions

### Convert to arrow function
```
const user = {
    name: 'Billy',
    sayHi: () => {
      console.log(this.name);
    }
  };

user.sayHi();
```

* `undefined` will be returned because we do not have access to `this`
* Because `Arrow functions` do not bind the `this` keyword

### Arrow function also don't bind to the `arguments` array
```
const user = {
    name: 'Billy',
    sayHi: () => {
      console.log(arguments);
    }
  };

user.sayHi(1, 2);
```

Will return and empty object but if you used a regular function like this:

```
const user = {
    name: 'Billy',
    sayHi: function(a, b) {
      console.log(arguments);
    }
  };

user.sayHi(1, 2);
```

It would return `{ '0': 1, '1': 2 }`

This means ES6 Arrow functions will be a poor use case for methods you define on an object

## Object Definition Syntax
But there is a shortcut inside ES6 and it is known as the Object definition syntax

We turn this:

```
const user = {
    name: 'Billy',
    sayHi: function() {
      console.log(arguments);
    }
};
```

Into this:

```
const user = {
    name: 'Billy',
    sayHi () {
      console.log(arguments);
    }
  };
```

* This will still use a regular function behind the scenes (_i.e. - a function that does have access to `this` and `arguments`_) but the cool thing is that it is a shorter syntax but everything should work as expected

## Takeaway
When you are creating methods on objects, DO NOT USE ARROW FUNCTIONS because it will just cause problems

### Why would I ever want Arrow functions not binding the `this` keyword?
It is actually a really useful thing

```
Meteor.startup(function() {
  const user = {
    name: 'Billy',
    sayHi () {
      setTimeout(function () {
        console.log(this.name);  
      }, 1000);
    }
  };

  user.sayHi(1, 2);
});
```

Will return `undefined`

The reason is ES5 functions bind the `this` keyword so inside our `setTimeout()` function we are binding `this` and we lose the original `this` keyword and that is why we are getting `undefined`

### "You can get with `this` or you can get with `that`"
[lyric from The Choice is Yours - Black Sheep](https://genius.com/Black-sheep-the-choice-is-yours-revisited-lyrics)

#### Common ES5 workaround to `this` issue

```
const user = {
    name: 'Billy',
    sayHi () {
      let that = this;
      setTimeout(function () {
        console.log(that.name);  
      }, 1000);
    }
  };

user.sayHi(1, 2);
```

And that will again give us `Billy`

It does work but what you are doing it essentially writing code to fix ES5 functions

## [ES6 is here to save the day!](https://www.youtube.com/watch?v=hiu1wfHSU1w)
But with ES6 we don't have to run into this function scope issue at all

```
const user = {
    name: 'Billy',
    sayHi () {
      setTimeout(() => {
        console.log(this.name);
      }, 1000);
    }
  };

user.sayHi(1, 2);
```

* Using an ES6 Arrow function gives us access to the `this` keyword
* Because Arrow functions don't bind do `this`
* But instead ES6 Arrow functions just use their parents `this` keyword and we get the desired `Billy` output

**Note** the parent's function is using ES5 function syntax and it is binding to `this` but it's child `setTimeout()` function is using an Arrow function which doesn't bind to `this`

## Takeaway for ES5 and ES6 functions
* Both have their place
* You don't want to just use one or just use the other
* It just depends on the context when deciding which to use

## Exercise
Comment all code inside `Meteor.startup(function() {});` in `server/main.js` and replace it with:

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(function() {

  const numbers = [1, 3, 5, 99];
  
});
```

* Create a new Array of numbers that will add 1 to each of the numbers inside of the `numbers` array
* Use the Arrays `.map()` function
    - Use the "statements syntax with the curly braces" to do this
    - store return value inside a new variable called `newNumbers`. Finally, `console.log(newNumbers)` so we should see `[ 2, 4, 6, 100 ]` as the output in the server Terminal.

## Bonus
* Complete this task with just 3 lines of JavaScript
* **hint:** Use "expression syntax"

### Statements syntax Arrow function
```
students.map((student) => {
  // return statement plus what you want to happen to each item in the array
})
```

### Express Syntax
```
students.map(student => what you want to happen to each item in the array
);
```
