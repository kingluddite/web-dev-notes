# Closures in JavaScript
Closures closely relate to functions and function scope

## Here is an example of a closure

`functions/closures.js`

```
const myFunction = () => {
  const message = 'This is my message';
  const printMessage = () => {
    console.log(message);
  };
  printMessage();
};

myFunction();
```

1. We write a function
2. Inside the function we define a variable with a message
3. We store a function that prints that message
4. We call that function
5. We call `myFunction()` to run the function which prints the message to the console

## Test it
`$ node closures.js`

* You will see `This is my message` in client console

## That was a closure
* But it was a bit too straightforward to see where closures become useful

### Making closures useful
* We'll use the same function as before
* But inside instead of calling the `printMessage` function we'll return it
* Then we'll store the call to `myFunction` inside a variable

```
const myFunction = () => {
  const message = 'This is my message';
  const printMessage = () => {
    console.log(message);
  };
  return printMessage;
};

const myPrintMessage = myFunction();
myPrintMessage();
```

* We get the same output

## What we just may not seem impressive but it is very special
* Other programming languages use closures too

### First thing worth noting
* We don't call `printMessage` until after `myFunction` has returned
* And we know this is true because we use the returned value from myFunction to access `printMessage`
    - There is no way we could have called printMessage until myFunction has completed
    - What is interesting is that though we call `myPrintMessage()` at the bottom of our code (after `myFunction` is done executing) `printMessage` still works
    - This function below still has access to the `message` variable from the parent function

![message variable](https://i.imgur.com/JuFIkYP.png)

* This is an example of a closure

### Closure defined
* A closure is the combination of a function with the lexical scope in which it was defined
* In our case when `printMessage` was defined it has access to `message` so it's ALWAYS going to have access to message (even if myFunction completes)

## Big Deal?
* But it is a really big deal
* We've used closures before to allow us to do things we didn't think were possible

`requests.js`

```
const getPuzzle = (wordCount, cb) => {
  const request = new XMLHttpRequest();
  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      cb(undefined, data.puzzle);
    } else if (e.target.readyState === 4) {
      cb('An error has taken place', undefined);
    }
  });

  request.open('GET', `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
  request.send();
};

const getCountry = (countryCode, cb) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      const country = data.find(country => country.alpha2Code === countryCode);
      cb(undefined, country);
    } else if (e.target.readyState === 4) {
      cb('An error has taken place', undefined);
    }
  });

  xhr.open('GET', 'http://restcountries.eu/rest/v2/all/');
  xhr.send();
};
```

## Both are using closures
* We have a function `getPuzzle` and a function `getCountry`
* Both of these functions use `addEventListener` to set up a callback function that gets fired later when the HTTP request completes
    - It may take 50ms (~)
    - This is much longer that it will take `getPuzzle` to finish

![callback function](https://i.imgur.com/m9RLoFC.png)

1. `getPuzzle` and `getCountry` complete
2. Then at some point in the future our callback functions fire

* It is because of closures that this inner function (see screenshot above) has access to callback
* Because we have a closure our function has access to the lexical scope in which it was defined (in this case it had access to `callback`)
* **note** It also had access to `wordCount` but just didnt' use it but we did use `wordCount` outside of the inner function (but it could have used it had it wanted to)

## IMPORT: On using closures
* Using closures and actually having support for them is essential for patterns like the callback pattern to actually work
* Without it, we wouldn't be able to do the stuff we already did

## Let's look at other examples of useful closures
* Let's use a closure to create a way to have a private variable in JavaScript

### What is a "private variable"?
* A variable that is only accessible or modifiable via a very specific set of rules

`closures.js`

```
const createCounter = () => {
  let count = 0;

  return {
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    get() {
      return count;
    },
  };
};

const counter = createCounter();
counter.increment();
counter.decrement();
counter.decrement();
console.log(counter.get()); // -1
```

* The cool thing about using closures in this way is that I can not modify `count` (other than via my two methods)

## I could try this:
`counter.count = 0`

* This is trying to add a variable onto the object but at no point do we have access to the `count` variable even though the variable exists because of closures

## Run the code
* You will see we get the exact same result

## Benefit of using closures this way
* Using a closure in this way, we are able to create a variable or a set of variables that are only modifiable via the interface we provide
* You can't just do anything you want with them and to alter stuff you have to use the methods we provide to actually manipulate the data
* This could be a very useful thing to do in your app (depending on what you are building)

`closures.js`

```
// MORE CODE
// Adder
const createAdder = a => {
  return b => {
    return a + b;
  };
};
const add10 = createAdder(10);
console.log(add10(-2)); // 8
console.log(add10(20)); // 30
const add100 = createAdder(100)
console.log(add100(-90)); // 10
```

* **note** The above pattern is using a `closure` to execute the code but it is also using another pattern called `currying`

## What is currying?
* Currying refers to the process of transforming a single function that takes a lot of arguments to multiple functions that take a subset of those arguments

### The uncurried function of what we wrote above
```
const add = (a, b) => a + b
```

* Vs the curried version (where we broke it up into multiple functions that each take a subset of those arguments)
    - And this is useful when we want to generate functions with some sort of base value

```
const createAdder = a => {
  return b => {
    return a + b;
  };
};
```

## Challenge - Tipper
1. Create a function `createTipper` that allows you to generate another function where our first function takes in the base tip percent (.15 for 15% tip)
2. And the inner function will take in the `amount`
    * Set it up to return a function that takes in the bill amount
3. Call createTipper to generate a few functions for different percentages
    * Generate different bases
        - 15%
        - 20%
        - 25%
4. Use the generated functions to calculate tips and print them
    * tipFifteen
    * tipTwenty
    * tipTwentyFive

## Solution
```
// Tipper
const createTipper = baseTip => {
  return amount => {
    return (amount * baseTip) / 100;
  };
};

const tipFifteen = createTipper(15);
console.log(tipFifteen(100)); // 15
const tipTwenty = createTipper(20);
console.log(tipTwenty(100)); // 20
const tipTwentyFive = createTipper(25);
console.log(tipTwentyFive(100)); // 25
```

## Still don't understand closures?
* [I never understood JavaScript closures](https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8)
* [What is Execution Context & Stack in JavaScript?](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/)
* [Identifier Resolution and Closures in the JavaScript Scope Chain](http://davidshariff.com/blog/javascript-scope-chain-and-closures/)
* [The Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)
* [The Revealing Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript)
* [Dynamic Scoping](https://en.wikipedia.org/wiki/Scope_(computer_science)#Dynamic_scoping)
* [JavaScript Inheritance Patterns](http://davidshariff.com/blog/javascript-inheritance-patterns/)

 
