# Exports vs Module Exports
* When our code is run through Node it is wrapped inside a function expression

![code in node](https://i.imgur.com/Wm1bEDC.png)

* For that reason we have access to that `module` object
    - It is a parameter passed to the function
    - But there is also another parameter, the first one in the wrapper, called `exports`

## What is `exports`?
`fn(module.exports, require, module, filename, dirname)`

* The first value is `module.exports`
* So `exports` is a shorthand for `module.exports`
* It is two variables pointing to the same object in memory

## Why not use `exports` all the time?
* It's there as a shorthand
* That is true but there is a quirk when it comes to JavaScript and it deals with objects being passed by reference
    - **Remember** the `require()` function returns `module.exports` so it is really returning the property on the module object
    - And that is a separate variable from that `exports` variable the parameter that receives that value
    - So we have two variables pointing at the same memory space so in "pass by reference" they'll be the same thing
        + However `exports` does not work for all of the patterns that we've seen so far

### Seeing is Believing
* Let's test this out

`greet.js`

```js
exports = function () {
  console.log('Hello');
}

console.log(exports);
console.log(module.exports);
```

* **Remember** that `module.exports` is what is passed to `exports` so at that point they both point to the same memory location
* But I just changed what `exports` is from an empty object to a function
* So what will happen?

`app.js`

```js
const greet = require('./greet');
```

* Run our code

`$ node app.js`

![result of exports and module.exports](https://i.imgur.com/SWigxPg.png)

* The result shows that **exports** is a function but **module.exports** is still an empty object
* Because one changes, the other should change because they are both pointing to the same location in memory
    - And this would work in other programming languages
    - But this is a quirk in JavaScript

## What is really happening?
* Let's revisit what happens when we use pass by reference

![both pointing to same location](https://i.imgur.com/JboOH51.png)

* There is a quirk in JavaScript when it comes to setting a variable equal to a value
* In our example we set `exports` **=** to a value and in JavaScript when a variable is set equal to a value then it is a new spot in memory

![= new spot in memory in js](https://i.imgur.com/TxSJwDX.png)

* In other words, that reference is broken and for that reason `exports` and `module.exports` are two different things
    - And here is the problem
        + What is returned from `require()`
            * module.exports so since I just broke that reference `exports` won't be returned from `module.exports` because it now points to a separate spot in memory than `exports` but inside the NodeJS source code `require()` returns the module object's property called `exports`
                - module.exports

`app.js`

```js
const greet = require('./greet');
greet();
```

* Run with `$ node app.js`
* And I get an error:

![error](https://i.imgur.com/CLPBKl1.png)

* And the reason is the object I got back `module.exports` was an empty object and not the function

## Takeaway
* When it comes to exports, I can't override it, I can't use equals like:

```js
exports = function() {
    console.log('Hell');
};
```

### But I can change it
* Which means I can add a new property or method
* I can change or **mutate** it

## Mutate
* To change something
* For example, adding a method or property to an object means you've mutated the object

### Now we can make it work!
`greet2.js`

```js
exports.greet = function() {
  console.log('Hello');
};

console.log(exports);
console.log(module.exports);
```

`app.js`

```js
const greet = require('./greet');
const greet2 = require('./greet2');
```

* Now they both run `$ node app.js`
* And we get what we wanted:

![working now](https://i.imgur.com/6TqPMLr.png)

```
[Function: exports]
{}
{ greet: [Function] }
{ greet: [Function] }
```

* We see the first require broke because the objects are different
* But the second both maintain their same spot in memory and pass by reference is not broken
* Call the method

```js
const greet = require('./greet');
const greet2 = require('./greet2');
greet2.greet();
```

* And we get `Hello` after we run `$ node app.js`

## Takeaway
* I can use objects if I want but only if I mutate the object
* I can't replace the object with something else

## Recommendation
* Just use `module.exports`
* Forget `exports` exists so then you never have to think about which one you should use and under what circumstance
* It is good to know about this because you may see code out there that uses `exports` but it is great to not have to think about it or use it in your own code because you may forget about the JavaScript quirk and break your code
