# ES6 Arrow Function

`$ babel src/playground/es6-arrow-function.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live public server`

`src/playground/es6-arrow-function.js`

```js
const square = function(x) {
  return x * x;
};

console.log(square(8)); // 64
```

* View in Chrome and you'll see `64`

## Now let's do the exact same thing using an ES6 arrow function

```js
const square = function(x) {
  return x * x;
};

const squareArrow = x => {
  return x * x;
};

console.log(square(8));
console.log(squareArrow(9));
```

* ES6 arrow functions are always anonymous
* ES5 functions you could turn an anonymous function into a named function

```js
function square(x) {
  return x * x;
}
```

## Arrow function expression syntax
* Enables us to create more concise functions under certain situations
* If it is an arrow function and it only returns a single expression no curly braces needed as it is an implicit return

## Challenge

```js
const getFirstName = fullName => {
  return fullName.split(' ')[0];
};

console.log(getFirstName('Jane Wayne'));

const getLastName = fullName => fullName.split(' ')[1];

console.log(getLastName('Jane Wayne'));
```

## New file
`src/playground/es6-arrow-function-2.js`

`$ babel src/playground/es6-arrow-function-2.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live public server`

### `arguments` object
* No longer bound with arrow functions

### `this` keyword
* No longer bound with

```js
const add = function(a, b) {
  return a + b;
};
console.log(add(55, 1)); // 56
```

* We had access to the `arguments` object

```js
const add = function(a, b) {
  console.log(arguments);
  return a + b;
};
console.log(add(55, 1));
```

* And if we passed a number we did not have as a parameter

```js
const add = function(a, b) {
  console.log(arguments);
  return a + b;
};
console.log(add(55, 1, 2005));
```

* You would see 2005 in `arguments`
* But with arrow functions we no longer have access to `arguments`

```js
const add = (a, b) => {
  console.log(arguments);
  return a + b;
};
console.log(add(55, 1, 2005));
```

* That will generate an `arguments is not defined` error
* If you want to use arguments you need to use the ES5 function

## this
```js
const user = {
  name: 'John',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived: function() {
    console.log(this.name);
    console.log(this.cities);
  },
};
user.printPlacesLived();
```

* That will print out the name and array of cities

```js
const user = {
  name: 'John',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived: function() {
    console.log(this.name);
    console.log(this.cities);

    this.cities.forEach(function(city) {
      console.log(this.name + ' has lived in ' + city);
    });
  },
};
user.printPlacesLived();
```

* But we get an error `name is not defined`
* When we add a function onto an object property the `this` value is bound to that object
* When you define an anonymous function there is not bound `this` value (it get sets to equal `undefined`)
* In one place `this` is accessible in another it is not
* There are workaround

## Popular workaround
```js
const user = {
  name: 'John',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived: function() {
    const that = this;
    this.cities.forEach(function(city) {
      console.log(that.name + ' has lived in ' + city);
    });
  },
};
user.printPlacesLived();
```

* Now we get the answer we want because we store `this` in a variable
* With ES6 arrow functions they no longer bind their own `this` value
    - Instead they just use the `this` value of the context they were created in
    - So this avoids having use the above workaround

```js
const user = {
  name: 'John',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived: function() {
    this.cities.forEach(city => {
      console.log(this.name + ' has lived in ' + city);
    });
  },
};
user.printPlacesLived();
```

* Now it works because in ES6 arrow functions `this` is bound to the parent
* But there are places where you don't want to use arrow functions

```js
const user = {
  name: 'John',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived: () => {
    this.cities.forEach(city => {
      console.log(this.name + ' has lived in ' + city);
    });
  },
};
user.printPlacesLived();
```

* No we get `cities of undefined`
* If you click on the error `app.js` you'll see this:

![error](https://i.imgur.com/oz7cEIM.png)

`undefined.cities.forEach(...)`

* `this` was undefined
    - We get that because this arrow function

```js
printPlacesLived: () => {
  this.cities.forEach(city => {
    console.log(this.name + ' has lived in ' + city);
  });
},
```

* Doesn't bind its own `this` value
* It is not longer equal to the object
    - It goes up to the parent scope (global scope in this case) and there `this` is **undefined**
    - So if we do want to use this we would need to switch over to an ES5 function

```js
const user = {
  name: 'John',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived: function() {
    this.cities.forEach(city => {
      console.log(this.name + ' has lived in ' + city);
    });
  },
};
user.printPlacesLived();
```

## ES6 method definitions syntax
* Let's us clean up methods inside objects

```js
const user = {
  name: 'John',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived() {
    this.cities.forEach(city => {
      console.log(this.name + ' has lived in ' + city);
    });
  },
};
user.printPlacesLived();
```

* This new syntax
* Gives us access to ES5 functions 
* We have access to arguments
* We have access to our own `this` binding

## Summary
* We'll use this new syntax when we define methods on objects
* We will most likely never use the function keyword ever again

## map
* Most popular array method
* It is an array method like `forEach()` but work slightly differently
* `forEach()` let's you do something with each item
* `map()` let's you transform each item getting a new array back

```js
const user = {
  name: 'John',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived() {
    const cityMessages = this.cities.map(city => {
      return city;
    });
    return cityMessages;
    // this.cities.forEach(city => {
    //   console.log(this.name + ' has lived in ' + city);
    // });
  },
};
console.log(user.printPlacesLived());
```

`["Philadelphia", "New York", "Dublin"]`

* And that will return the cities
* But we can transform cities with:

```js
const user = {
  name: 'John',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived() {
    const cityMessages = this.cities.map(city => {
      return city + '!';
    });
    return cityMessages;
    // this.cities.forEach(city => {
    //   console.log(this.name + ' has lived in ' + city);
    // });
  },
};
console.log(user.printPlacesLived());
```

`["Philadelphia!", "New York!", "Dublin!"]`

* But we can do this and this is powerful

```js
const user = {
  name: 'John',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived() {
    const cityMessages = this.cities.map(city => {
      return `${this.name} as lived in ${city}`;
    });
    return cityMessages;
    // this.cities.forEach(city => {
    //   console.log(this.name + ' has lived in ' + city);
    // });
  },
};
console.log(user.printPlacesLived());
```

` ["John as lived in Philadelphia", "John as lived in New York", "John as lived in Dublin"]`

* The `map()` array does not affect this array `this.cities.map(city)`

## Refactor
* Much easier to read and manage

```js
const user = {
  name: 'John',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived() {
    return this.cities.map(city => `${this.name} as lived in ${city}`);
  },
};
console.log(user.printPlacesLived());
```

## Challenge
* Make object had data and method
```
const multiplier = {
    // numbers = array of numbers
    // multiplyBy - single number
    // multiploy - return a new array where the numbers have been multiplied
};

console.log(multiplier.multiply()); // [1, 2, 3] ---> [2, 4, 6]
```

## Solution
```js
const multiplier = {
  numbers: [10, 20, 30],
  multiplyBy: 5,
  multiply() {
    return this.numbers.map(number => {
      return this.multiplyBy * number;
    });
  },
};

console.log(multiplier.multiply());
```

### Refactored Solution
```js
const multiplier = {
  numbers: [10, 20, 30],
  multiplyBy: 5,
  multiply() {
    return this.numbers.map(number => this.multiplyBy * number);
  },
};

console.log(multiplier.multiply());
```

`[50, 100, 150]`

