# First-class functions and Function Expressions
## First-Class functions
* Everything you can do with other types you can do with functions
* You can use functions like strings, numbers, etc (i.e. pass them around, set variables equal to them, put them in arrays, and more)
* Lots of Programming languages do not have this feature
* It makes JavaScript very powerful
* Functions in JavaScript are first class, you can use them just like any other type, you can even assign them to variables and put them in arrays
* It also allows us to write **Function Expressions

## Expression
* A block of code that results in a value
    - Like setting a variable to a value
* Function expressions are possible in JavaScript because functions are first-class

## Invoke
* Run the function
* We can also say `call` the function

## Function Statement
`app.js`

```js
// function statement
function greet() {
    console.log('hi');
}
greet(); // hi
```

## Let's now give a function another function as an argument
```js
// function statement
function greet() {
    console.log('hi');
}
greet(); // hi

// functions are first-class
function logGreeting(fn) {
    fn();
}
logGreeting(greet); // hi
```

* We can pass a function to a function as an argument because functions are first class
* functions in JavaScript are objects, a special kind of object 
* We are not add the parentheses after `greet` that would actually run that function, we are just passing our greet function to the logGreeting function

## Function Expression
* 'Hello' is an expression, we just made a string
* expressions return a value
* `3` is an expression, we just made a number

```js
// function expression
var greetMe = function() {
    console.log('Hello there');
}
```

* We wrote the function on the fly
* We have a variable `greetMe`
    - That has been assigned a function
        + Which is a special type of object
    - The variable has this function as its value
    - So we can then invoke `aka call it`

```js
// function expression
var greetMe = function() {
    console.log('Hello there');
}
greetMe(); // Hello there
```

* We didn't give the function a name
    - So it is knows as an `anonymous function`
    - Our variable points to it
    - So the JavaScript Engine knows to run that function when we add the parentheses after the variable
    - Functions are first class so we can pass it to another function

```js
// function statement
function greet() {
    console.log('hi');
}
greet();

// functions are first-class
function logGreeting(fn) {
    fn();
}
logGreeting(greet);

// function expression
var greetMe = function() {
    console.log('Hello there');
}
greetMe();

// it's first-class
logGreeting(greetMe); // Hello there
```

### Let's step through the code
* Add a breakpoint at line #2 `function greet() {`

![add line break](https://i.imgur.com/eSlr38L.png)

* Click debug
* Hit start

![debug mode](https://i.imgur.com/dKsVZQb.png)

Our first greet() is called and we are `console.log('hi')`

![log hi](https://i.imgur.com/dyHTLmr.png)

* Step over

![step over](https://i.imgur.com/bmf0GjB.png)

* Step over
* And it goes to logGreeting()

![logGreeting](https://i.imgur.com/r1PLYfm.png)

* We step into the function

![step in](https://i.imgur.com/YhuLgDV.png)

* If you hover over the `fn` argument you will see a popup telling you that `fn` is set to the `greet()` function
    - The sidebar also tells you this

![greet() function arg](https://i.imgur.com/yrWKEiy.png)

* Step over
* It will run the console

![console.log](https://i.imgur.com/nySlHJl.png)

* Click Step over 3 times and you will be at the function expression

![func expression](https://i.imgur.com/GSSveJz.png)

* Step over
* Now greetMe is that function expression

![greetMe as function expression](https://i.imgur.com/s1pX2s0.png)

* greetMe is now a function so we can invoke it
* Step over
* We pass greetMe function to logGreeting(greetMe)

![pass greetMe](https://i.imgur.com/VRa377P.png)

* Step into
* Now `fn` will be that anonymous function 
* Now we invoke it (click Step over button twice)
* Check debug and you'll see `Hello there` twice because we invoked it twice
* Hit stop

![stop](https://i.imgur.com/3eLoFgs.png)

* That stops the code from running
* And it stops debugger

## Here is a pattern you will see a lot
You can pass a function as an argument like this

```js
// use a function expression on the fly
logGreeting(function() {
    console.log('Yo Tony!');
});
```

* Why set this function equal to a variable if you are only going to use it once
* It is very convenient

`$ node app.js`

* You will see `Yo Tony!`
