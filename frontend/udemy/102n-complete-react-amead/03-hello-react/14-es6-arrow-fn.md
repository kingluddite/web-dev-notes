# ES6 Arrow Function
* A new syntax for creating functions
* One of the greatest ES6 features
* How did we ever live without it?!

## Create new playground file
`$ touch src/playground/es6-arrow-function.js`

## Point babel to the new file
* Make sure to stop Terminal on `app.js` and point to this new file
* **tip** Up arrow in terminal will save you some typing

`$ babel src/playground/es6-arrow-function.js --out-file=public/scripts/app.js --presets=env,react --watch`

## Run Server

`$ live public server`

### Our first experiment - square a number

`src/playground/es6-arrow-function.js`

* We don't need to store our answer in a variable as we'll just be dumping it to the screen
  - So we can just use `console.log()`

```
const square = function(x) {
  return x * x;
};

console.log(square(8)); // 64
```

* View in Chrome and you'll see `64`

## Now let's do the exact same thing using an ES6 arrow function

```
const square = function(x) {
  return x * x;
};

const squareArrow = x => {
  return x * x;
};

console.log(square(8));
console.log(squareArrow(9));
```

* With E6 arrow functions
  - The function keyword goes away - we just start with the arguments list
  - This `=>` is the arrow operator

### Important things to keep in mind
* ES6 arrow functions are always anonymous
  - With ES5 functions you could turn an anonymous function into a named function

```
function square(x) {
  return x * x;
}
```

* After naming the ES5 function, I don't need to store it inside a variable and I can call that function using it's name `square(9)`
* **Important** Since you can't name arrow functions as they are always anonymous, you have to assign it to a variable and reference that variable later

## Arrow function expression syntax
* Enables us to create more concise functions under certain situations
* If it is an arrow function and it only returns a single expression no curly braces needed as it is an implicit return
* Eslint does this for us! (see above explanation)
* You will see that Eslint is refactoring our arrow function on the fly
  - If there is only one argument, there is no need for parentheses
  - If there is only one expression you can use an implicit return (removing the return word and surrounding curly braces)
  - We have this set up so on save Eslint will do this all for us!
* **note** Whether you use return and the function body with the arrow function or the shortcut without the function body and return word - the functions have identical functionality

## We won't always use expression sytax with arrow functions
* If you had to make other function calls
* If we have to wait on Promises
* We should break it into a full function with a function body

## So far we just talked about the syntax difference between ES5 functions and ES6 arrow functions
* Nothing very exciting yet
* Writing and Reading arrow functions will be harder at first but after 2 weeks you will wonder how you ever lived without them

## Challenge
* Use arrow functions
* Create an arrow function `getFirstName`
* Use the logic from how we grabbed the first name from the fullName and make it an arrow function
* Console log the variable the function is stored in
* Check the console to make sure it is working
* If I were to call `getFirstName('Mike Tyson')` I should see `Mike` in console

1. Create an arrow function using the verbose syntax
2. Create another arrow function using the expression syntax

## Challenge Answer
```
const user = {
  name: 'Jane Doe',
};

// ES6 arrow function verbose syntax
const getLastName = (name) => {
  return name.split(' ')[1];
}
// ES6 arrow function expression syntax
const getFirstName = name => name.split(' ')[0];

console.log(getFirstName(user.name)); // Jane
console.log(getLastName(user.name)); // Doe
```

* Remember, once you save our eslint will make save verbose as expression syntax automatically

## More About Arrow functions
* We just talked about syntax difference
* But there are other important differences between ES5 functions and ES6 functions

### Create a new playground file
`$ touch src/playground/es6-arrow-function-2.js`

* Point babel to this new file

`$ babel src/playground/es6-arrow-function-2.js --out-file=public/scripts/app.js --presets=env,react --watch`

## Run live server
`$ liver-server public`

## Two important things to keep in mind with arrow functions
1. `arguments` object is no longer bound with arrow functions
2. The `this` keyword is no longer bound with arrow functions

* To show the difference we'll use ES5 to show how `arguments` and `this` are bound and then show the difference with ES6 when `arguments` and `this` are no longer bound

```
const add = function(a, b) {
  return a + b;
};
console.log(add(55, 1)); // 56
```

* With ES5 functions we always had access to the `arguments` object

```
const add = function(a, b) {
  console.log(arguments);
  return a + b;
};
console.log(add(55, 1)); // 56
```

* But we also see we have access to the Arguments object

![arguments object](https://i.imgur.com/oMSVS3l.png)

* Look what happens when we passed a number we did not have as a parameter

```
const add = function(a, b) {
  console.log(arguments);
  return a + b;
};
console.log(add(55, 1, 2005));
```

* You would see **2005** in `arguments`

## But with arrow functions we no longer have access to `arguments`

```
const add = (a, b) => {
  console.log(arguments);
  return a + b;
};
console.log(add(55, 1, 2005));
```

## Houston we have a problem!
* That will generate an `arguments is not defined` error

![no access to arguments](https://i.imgur.com/bLFbvWj.png)

* **note** If you want to use `arguments` you need to use the ES5 function

## this
* Rename `.eslintrc` to `OFF.eslintrc` to temporally deactivate it
* ES5 functions bind `this`

```
const user = {
  name: 'John',
  cities: ['LA', 'Vegas', 'NYC'],
  printCoolPlace: function() {
    console.log(this.name);
    console.log(this.cities);
  }
};

user.printCoolPlace();
```

* **note** When we use a "regular" function (ES5), and we define it on an object property, the `this` keyword is bound to that

### Here is the output in the console
```
John
["LA", "Vegas", "NYC"]
```

## How do I get the data inside the `cities` property?
* I will have to loop over the array using the `forEach` array method

## Learning about forEach
* [Here is a great article about forEach](https://medium.com/@abustamam/for-loops-vs-foreach-in-javascript-7a977278a39e)
  - It talks about
    + for loops
    + forEach loops
    + for in loops
    + for of loops
    + using lodash

## Print out the name and array of cities using forEach

```
const user = {
  name: 'John',
  cities: ['LA', 'Vegas', 'NYC'],
  printCoolPlace: function() {
    console.log(this.name);
    console.log(this.cities);

    this.cities.forEach(function (city) {
      console.log(this.name + ' has lived in ' + city);
    })
  }

};

user.printCoolPlace();
```

* But we get an TypeErrorerror `name is not defined`
  - As we talked about above - when we add a function onto an object property the `this` value is bound to that object
  - But when you define an anonymous function there is no bound `this` value (it get sets to `undefined`)
    + We see below `this` is accessible

```
// MORE CODE

const user = {
  name: 'John',
  cities: ['LA', 'Vegas', 'NYC'],
  printCoolPlace: function() {
    console.log(this.name);
// MORE CODE
```

* But this is `undefined` inside the anonymous function below:

```
// MORE CODE

const user = {
  name: 'John',
  cities: ['LA', 'Vegas', 'NYC'],
  printCoolPlace: function() {
    // MORE CODE

    this.cities.forEach(function (city) {
      console.log(this.name + ' has lived in ' + city); // `this` undefined
    })
// MORE CODE
```

* There are workaround

## How do we solve this?
* Various work around to make sure you bind `this`

## Here is one such Popular workaround
```
const user = {
  name: 'John',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived: function() {
    const that = this; // we add this

    this.cities.forEach(function(city) {
      console.log(that.name + ' has lived in ' + city);
    });
  },
};
user.printPlacesLived();
```

* Now we get the answer we want because we store `this` in a variable

## ES6 to the rescue
* With ES6 arrow functions they no longer bind their own `this` value
    - Instead they just use the `this` value of the context they were created in
    - So this avoids having use the above workaround

```
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
* **note** But there are places where you don't want to use arrow functions

```
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
    - We get that because the following arrow function doesn't bind its own `this` value

```
printPlacesLived: () => {
  this.cities.forEach(city => {
    console.log(this.name + ' has lived in ' + city);
  });
},
```

* It is not longer equal to the object
    - It goes up to the parent scope (global scope in this case) and there `this` is **undefined**
    - So in this case we should use an ES5 function like below

```
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

* Rename from `OFF.eslintrc` to `.eslintrc`
* Save your file and you will see it refactored to:
  - This is using the `ES6 method definitions syntax`

```
const user = {
  name: 'John',
  cities: ['LA', 'Vegas', 'NYC'],
  printCoolPlace() {
    this.cities.forEach(city => {
      console.log(`${this.name} has lived in ${city}`);
    });
  },
};

user.printCoolPlace();
```

## ES6 method definitions syntax
* Let's us clean up methods inside objects
* It looks strange when you first see it

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

## Let's review this new ES6 method syntax
* Gives us access to ES5 functions (same as before)
* We have access to `arguments`
* We have access to our own `this` binding

## Summary
* In a lot of places we'll use arrow functions
* We'll use this new syntax when we're defining methods on objects
* **note** We will most likely never use the function keyword ever again
  - Is there anything wrong with it?
    + No, it just had some quirks
    + And it no longer serves as meaningful purpose as it did in the past

## map
* `map()` is most popular array method
* It is an array method like `forEach()` but work slightly differently
  - Instead of forEach on cities we'll use the map() method
  - map() like forEach gets called with a single function
    + It gets called one time for every item in the array (just like forEach)
    + We have access to that item via the first argument

### What is the difference?
* `forEach()` let's you do something with each item (like print it to the screen)
* `map()` let's you **transform** each item getting a new array back

```
// MORE CODE

const user = {
  name: 'John',
  cities: ['LA', 'Vegas', 'NYC'],
  printCoolPlace() {
    const cityMessages = this.cities.map(city => city);
    this.cities.forEach(city => {
      console.log(`${this.name} has lived in ${city}`);
    });
    return cityMessages;
  },
};

user.printCoolPlace();
```

* This uses the map method but it just returns the value that was passed into map and we are not taking advantage of the transformation ability of map

### How can I output the cities from map?
* We currently are not using the return value but we can but storing the value inside a variable 

```
const user = {
  name: 'John',
  cities: ['LA', 'Vegas', 'NYC'],
  printCoolPlace() {
    const cityMessages = this.cities.map(city => city);
    return cityMessages;
  },
};

console.log(user.printCoolPlace());
```

`["LA", "Vegas", "NYC"]`

* And that will return the cities

## But we can transform cities with map() by doing this!

```
const user = {
  name: 'John',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived() {
    const cityMessages = this.cities.map(city => {
      return city + '!';
    });
    return cityMessages;
  },
};
console.log(user.printPlacesLived());
```

`["LA!", "Vegas!", "NYC!"]`

* But we transform even more with this!

```
const user = {
  name: 'John',
  cities: ['LA', 'Vegas', 'NYC'],
  printCoolPlace() {
    const cityMessages = this.cities.map(
      city => `${this.name} has lived in ${city}`
    );
    return cityMessages;
  },
};

console.log(user.printCoolPlace());
```

`["John has lived in LA", "John has lived in Vegas", "John has lived in NYC"]`

* We will be using map() extensively for almost everything we use in React
  - It takes an array
  - It lets us provide a function that transforms each item
  - And we get back a NEW array with the transformed items 

* **VERY IMPORTANT** The `map()` array does not affect this array `this.cities.map(city)` (the cities array) so this.cities will stay identical to where we defined it inside our object property

## The long way to write this:
```
const user = {
  name: 'John',
  cities: ['LA', 'Vegas', 'NYC'],
  printCoolPlace() {
    const cityMessages = this.cities.map((city) => {
      return this.name + ' has lived in ' + city;
    });
    return cityMessages;
  }
};

console.log(user.printCoolPlace());
```

## Refactor
* Much easier to read and manage

```
const user = {
  name: 'John',
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived() {
    return this.cities.map(city => `${this.name} as lived in ${city}`);
  },
};
console.log(user.printPlacesLived());
```

* We don't need a variable, we can just return it directly (allows us to remove the `remove cityMessages`)
* We have an arrow function that just returns a single expressions so we can remove the return work and curly braces
* I can remove the parentheses as there is only one argument
* **note** Our eslint will refactor a lot for us but there are times were we need to manually refactor

## Challenge
* Make object had data and method
```
const multiplier = {
    // numbers - array of numbers
    // multiplyBy - single number
    // multiply - return a new array where the numbers have been multiplied
};

console.log(multiplier.multiply()); // [1, 2, 3] ---> [2, 4, 6]
```

## Solution
```
const multiplier = {
  numbers: [1, 2, 3],
  multiplyBy: 10,
  multiply() {
    return this.numbers.map(number => {
      return this.multiplyBy * number;
    });
  },
};

console.log(multiplier.multiply()); // [10, 20, 30]
```

### Refactored Solution
```
const multiplier = {
  numbers: [1, 2, 3],
  multiplyBy: 10,
  multiply() {
    return this.numbers.map(number => number * this.multiplyBy);
  },
};
console.log(multiplier.multiply()); // [10, 20, 30]
```

