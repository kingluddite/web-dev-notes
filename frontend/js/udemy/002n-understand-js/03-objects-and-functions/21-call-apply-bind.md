# call(), apply(), bind()
* Cause problems for people new to JavaScript development

## Review
![diagram](https://i.imgur.com/AsTygS9.png)

* In our Execution Context we have our:
    - Variable Environment
    - Outer Environment
    - `this`
        + Can point to the Global Object
        + Can point to the object that contains the function if the function is a method attached to the object

## Wouldn't it be nice to be able to control what the `this` character ends up being when the Execution Context is created
* JavaScript has a way to do just that!
    - And that is where `call()`, `apply()` and `bind()` come in to play

## A Function
* A special type of object
    - It has a hidden optional `name` property
        + Which can be anonymous
    - It has a `code` property
        + This contains the code
        + That code is **"invocable"** ()
    - All functions in JavaScript also get access to some special functions (aka some special methods on their own)
        + **note** A function is just an object so it can have properties and methods
    - All functions have access to a `call()` method
    - All functions have access to an `apply()` method
    - All functions have access to a `bind()` method
* call(), apply() and bind() have to do with the `this` variable and the arguments you pass to the function as well

![call() apply() and bind()](https://i.imgur.com/ZwanjRd.png)

```js
const person = {
  firstName: 'John',
  lastName: 'Doe',
  getFullName: function() {

    const fullName = `${this.firstName} ${this.lastName}`;
    return fullName;

  }
};

const logName = function(lang1, lang2) {

  console.log(`Logged: ${this.getFullName()}`);

};

logName('en', 'es');
```

* Above will cause an error because `this` is pointing to the Global Object and there is no getFullName() function on the Global Object
* If you try to invoke undefined you will get an error
* We will control what the `this` keyword points to
    - logName().bind vs logName.bind()
        + We choose the second option
        + Because we are using the function as an object and calling a method on that object
        + All function objects have access to `bind()`
        + I can pass to `bind()` whatever object I want to be the `this` variable when the function runs
        + The `bind()` method returns a new function, it actually makes a copy of the `logName()` function and sets up this new function object (the copy) so that whenever its run (aka when its Execution Context is created) the JavaScript Engine sees that this was created with bind() which sets up some hidden things in the background so that when the JavaScript Engine decides what is the `this` variable? and it says it must be `person`
            * `logName.bind(person)`
* So if we call the new copy of the function object that we stored inside `logPersonName`

```js
const person = {
  firstName: 'John',
  lastName: 'Doe',
  getFullName: function() {

    const fullName = `${this.firstName} ${this.lastName}`;
    return fullName;

  }
};

const logName = function(lang1, lang2) {

  console.log(`Logged: ${this.getFullName()}`);

};

const logPersonName = logName.bind(person);

logPersonName();
```

* We run it
* We get `Logged: John Doe`
* We bind() `logName` to person so when we run the function and it gets to `this.getFullName()` then `this` will point to the `person` object and the method inside it `getFullName()`

### Alternative way to bind `this`
```js
const person = {
  firstName: 'John',
  lastName: 'Doe',
  getFullName: function() {

    const fullName = `${this.firstName} ${this.lastName}`;
    return fullName;

  }
};

const logName = function(lang1, lang2) {

  console.log(`Logged: ${this.getFullName()}`);

}.bind(person);

logName();
```

* We run it
* We also get `Logged: John Doe`

## call()
* We can invoke a function either way

```js
logName.call();
logName();
```

* Why would I use `.call()`
* Because it also lets me decide what the `this` variable will be
    - The first parameter is what `this` will point to
    - I can also pass it other parameters

`logName.call(person, 'en', 'es');`

* `bind()` creates a copy of the function
* `call()`
    - doesn't make a copy
    - just executes the function
    - decides what the value of `this` variable will be
    - and can pass other parameters that I would normally pass to the function

`logName.call(person, 'en', 'es');` 

```js
const person = {
  firstName: 'John',
  lastName: 'Doe',
  getFullName: function() {

    const fullName = `${this.firstName} ${this.lastName}`;
    return fullName;

  }
};

const logName = function(lang1, lang2) {

  console.log(`Logged: ${this.getFullName()}`);
  console.log(`Arguments: ${lang1} ${lang2}`);
  console.log('--------------------');
};

const logPersonName = logName.bind(person);

logPersonName('en');

logName.call(person, 'en', 'es');
```

![output](https://i.imgur.com/qa8aY6Z.png)

## apply()
* Does exact same thing as `call()` with one difference

`logName.apply(person, 'en', 'es');` - will generate an error

* It expects it to be passed an `array` of parameters

```js
logName.call(person, 'en', 'es');
logName.apply(person, ['en', 'es']);
```

* An array can be more useful
    - like with mathematical circumstances

## Alternative ways to use `call()` and `apply()`
```js
(function(lang1, lang2) {

  console.log(`Logged: ${this.getFullName()}`);
  console.log(`Arguments: ${lang1} ${lang2}`);
  console.log('--------------------');

}).apply(person, ['en', 'es']);

(function(lang1, lang2) {

  console.log(`Logged: ${this.getFullName()}`);
  console.log(`Arguments: ${lang1} ${lang2}`);
  console.log('--------------------');

}).call(person, 'en', 'es');
```

* Looks a little odd but
    - Just creating a function on the fly
    - Then invoking it using `.call` or `.apply` because all functions get access to the is object or method

## When would I ever use any of these in real life?

## function borrowing
* What if I have another object but that object doesn't have a getFullName() method

```js
const person = {
  firstName: 'John',
  lastName: 'Doe',
  getFullName: function() {

    const fullName = `${this.firstName} ${this.lastName}`;
    return fullName;

  }
};

// function borrowing
const person2 = {
  firstName: 'Jane',
  lastName: 'Doe'
};

console.log(person.getFullName.apply(person2));
```

* We just borrowed a function
    -  So this is very useful
    -  You can grab methods from other objects and use them as long as you have similar property names so that the function works

## Function Currying
```js
// function currying
function multiply(a, b) {
  return a * b;
}

const multiplyByTwo = multiply.bind(this, 2);
console.log(multiplyByTwo());
```

* `bind()` is not calling
* It makes a copy of the function
* We pass it the `this` keyword
* And we pass it another parameter
* Since bind() isn't executing the function, what does this do?
* Since I'm not executing it, what does giving it parameters do?
    - Giving it parameters sets the permanent values of these parameters `a,b` when the copy is made
    - so in this example the first parameter will always be a `2` in this copy of the function
        + The variable `a` will always be a `2` so what we just did is this

```
function multiplyByTwo(b) {
  const a = 2;
  return a * b;
}
```

* I just permanently set a equal to `2`
* Than if I call

```js
// function currying
function multiply(a, b) {
  return a * b;
}

// function multiplyByTwo(b) {
//   const a = 2;
//   return a * b;
// }

const multiplyByTwo = multiply.bind(this, 2);
console.log(multiplyByTwo(4));
```

* By passing `4` it will be passed into the `b` parameter because we defined the permanent value of `a` as `2` so 2 X 4 = 8 and that is what is returned in the log statement
* By doing this:

```js
const multiplyByTwo = multiply.bind(this, 2, 4);
console.log(multiplyByTwo());
```

Then in our bind() we are saying these are permanently the values for my parameters and so when I call the function, I don't pass any arguments and yet I still get 8 returned

```js
const multiplyByTwo = multiply.bind(this, 2, 4);
console.log(multiplyByTwo(4));
```

* Even if you pass a parameter it will be ignored and the two binded parameters will be used instead

```js
// function currying
function multiply(a, b) {
  return a * b;
}

const multiplyByTwo = multiply.bind(this, 2);
console.log(multiplyByTwo(4));

const multiplyByThree = multiply.bind(this, 3);
console.log(multiplyByTwo(4));
```

* I take a function and make a new function from it with some default parameters
    - That is called `currying`

## Function Currying
* Creating a copy of a function but with some preset parameters
    - Very useful in mathematical situations
