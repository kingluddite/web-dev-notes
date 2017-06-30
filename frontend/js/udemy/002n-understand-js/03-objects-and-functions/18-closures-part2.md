# More On Closures
* array literal syntax `var arr = [];`

```js
function buildFunctions() {
  var arr = [];

  for (var i = 0; i < 3; i++) {

    arr.push(
      function() {
        console.log(i);
      }
    )

  }

  return arr;

}

var fs = buildFunctions();

fs[0]();
fs[1]();
fs[2]();
```

* What do you expect to happen?
    - Many people expect 1,2,3
    - But the answer is 3,3,3

## Analysis
* When it runs we have the Global Execution Context
    - And it contains
        + buildFunction()
        + And the variable fs

![Execution Context](https://i.imgur.com/NxVvFoV.png)

## We hit the line that executes buildFunctions()

![build functions](https://i.imgur.com/lqLQrzR.png)

* The `buildfunctions()` executes (_aka is invoked_)
    - We get the Execution Context
        + It has two variables
            * i - which is created on the for loop
            * arr - which we declare at beginning of function
            * But what are the values of those 2 variables?
            * By the time we hit the return statement 

![hit the return statement](https://i.imgur.com/oxLsXkE.png)

* Here's the part that confuses people

![push into array](https://i.imgur.com/J8yPZWu.png)

* We are pushing the function into the array inside the for loop
* But the console.log(i) is not being executed
    - We understand function expressions
        + We are just creating a new function object and we are putting that line of code into its code property but it isn't actually running
        + We haven't invoked the function
* We then push two more functions into the array
* Once i is no longer less than 3, the for loop stops and we return arr;
    - `i`s last value after leaving the for loop is now a `3`
    - When we return `arr`, what is in memory in that Execution Context is `i` = `3` and `arr` holds three functions `[f0, f1, f2]` 
* Then we go back to the Global Execution Context
    - The buildFunction() Execution Context is popped off the stack
    - But we learned before that the variables are still in memory

![still in memory](https://i.imgur.com/o0cX0Xt.png)

* Then we hit the first function call

![first function call](https://i.imgur.com/ipGLaNU.png)

* We take the first element in the array (it is a function) and we execute it
    - The code in the `code` property is `console.log(i)`

* Then the Execution Context is created for `fs[0]()`

![stack fs[0]](https://i.imgur.com/cdK0Bsp.png)

* There is no variable `i` inside of the fs[0] Execution Context
    - So it looks outside (goes up the scope chain) to get to its outer reference
    - What is inside the memory that used to be inside the buildFunctions() Execution Context? `i = 3`
        + So it says `console.log(3)`

* We then move to the next function on the Global Context and run `fs[1]`
    - That creates an Execution Context but that Execution Context has the same outer variable reference because it was created in the same place as the first function
        + It was sitting in the same spot in the same build function, because of where it sits in the code, aka it's lexical position is to the same spot in memory as the first one
        + So it will see the same outervariables where `i = 3` and so it runs `console.log(i)` 

* And the same thing happens for `fs[2]` 
* This is like if you ask 3 children how old their father is, they won't tell you how old he was when they were born, they will tell you how old he is now
* It will only be able to tell you what's in memory right now, not at the time that we created the function, only right now when we're actually executing the function
    - As soon as you realize that console.log() isn't executed right there where it is sitting but executed when we invoke these functions
    - The value of `i` is what it is at the moment I execute the function

## free variables
Variables that are outside a function but that you have access to

### What if we did want it to execute 0, 1, 2?
ES6 has a `let` variable

```js
function buildFunctions2() {
  var arr = [];

  for (var i = 0; i < 3; i++) {
    let j = i;
    arr.push(
      function() {
        console.log(j);
      }
    )

  }

  return arr;

}

var fs2 = buildFunctions2();

fs2[0]();
fs2[1]();
fs2[2]();
```

* the `let` variable is scoped to the block
* inside these curly braces

![curly braces let](https://i.imgur.com/B7CjqH7.png)

* So every time the for loop runs `let j = i` will be a new variable in memory
    - so when `console.log(j)` is called it will be pointing to a different spot each time within that memory

## Could we do it the ES5 way? 
* In order to preserve the value of `i` for this function

```js
function() {
  console.log(i);
}
```

* We would need a separate Execution Context for each of the functions that I'm pushing into the array
* I need a current scope that holds the current value of `i` as the loop iterates
    - The only way to get an Execution Context is to execute a function
    - How can I execute a function on the fly?
    - IIFE

```js
for (var i = 0; i < 3; i++) {
  arr.push(
    (function(j) {
      return function() {
        console.log(j);
      }
    }(i))
  )

}
```

* As it goes through the for loop, each iteration will create it's own Execution Context and `j` will be sore in each of those `3` Execution Contexts
* We know that, thanks to closures, all those `j` will be hanging out
* When we execute fs[0], it goes one outer to where `j` is and that will give you values of 0,1, and 2
* This is how we can use `closures` to help us get the values we need
* This is a fundamental concept of Advanced JavaScript programming
* Function closures can be useful in other ways

