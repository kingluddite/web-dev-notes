# Functions

* a function lets you store a block of code that you can use over and over again

JavaScript known as a functional programming language.

Coach tells scout "Find me players"

Start by _declaring_ function
* coaches instructions on how to find players

## function ingredients
* function
* function name
* () - paranthesees
* {} - curly braces ---- aka `braces`
    - braces form a `code block`

gets turned into this

```js
function myFunction() {
    
}
```

* name a function following the same rules as variables

## Function name rules
* can only be made up of letters, numbers, the `_`, and `$` character
    - `abcd`
    - `1233`
    - `_someFunction`
    - `$myFunction`
* they can't start with a number
    - `9someFunction`
* they can't include any spaces or other punctuation
    - `my function`
    - `my!function`

**tip** when you see parenthesees following a name, you know you're dealing with a function

* `myFunction()`
* there is no semi-colon `;` after final brace
* call the function is how you run the code inside the function's code block
    - `findMePlayers()`

```js
var randomNumber = Math.floor( Math.random() * 6 ) + 1;
```

## Prebuilt functions
* Math.floor() and Math.random() are functions
    - built into the JavaScript language
    - alert() is also a function

## Custom functions
* common for programmers to place functions at the top of a file
* code in function is not run immediately, it is just memorized by the browser
    - just like scout memorizing coaches instructions
* remember to indent your code

`js/app.js`

```js
function randomAlert() {

  var randomNumber = Math.floor( Math.random() * 6 ) + 1;
  alert( randomNumber );

}
```

* it is never called but it is read by the browser and put into the browser's memory
    - open console and type `randomAlert()` and the alert will be called

## Calling Function
* functions are like cell phones, they never work until you call them


```js
function randomAlert() {

  var randomNumber = Math.floor( Math.random() * 6 ) + 1;
  alert( randomNumber );

}

randomAlert();
randomAlert();
randomAlert();
randomAlert(); // called function 4 times
```

## Function Expression

`anonymous function`

```js
var randomAlert = function() {

    var randomNumber = Math.floor( Math.random() * 6 ) + 1;
    alert( randomNumber );

};
```

* since it has no name, it is called and `anonymous` function
* name comes from a variable
    - we store a function inside a variable
* we end the brace with a semi-colon `;
    - why?
        + because we are assigning a function to a variable and we end variables with a semi-colon `;`
        + you call the anonymous function by calling the variable name with parenthasees after it
            * `randomAlert()`


## Functions change the flow of a program

* program starts at top and works it way down, line by line
    - functions change this flow
    - conditional statements change the flow based on outcome but still ran top to bottom
    - functions break that `top to bottom` flow
* as you write more code you will write lots of functions, functions that call and move to other parts of the code that call other functions.
    - whenever you call a functiona and run that function, you return to the place in code that called that function
    - **tip**: this is one reason why it's good to put all your functions at the top of your script

## Getting information from a function
The scout runs off to find new players by following the coaches instructions. When he returns to the coach, he can bring additional information

Functions too, can return information aks `returning a value`

### How do you return values from a functon
* by using the `return` keyword

```js
function goFindGreatSoccerPlayers() {
    return "Found All Star Soccer Player!";
}
```

So if we call the above code

alert( goFindGreatSoccerPlayers() );

The text `Found All Star Soccer Player!` will appear in the alert box
* you can also return this value to the console
    - console.log( goFindGreatSoccerPlayers() )
* or save it in a variable
    - var newPlayer = goFindGreatSoccerPlayers();

### Other return uses
* for form validation, you could have a function that checks if a form field is empty and returns `true` if it is and `false` if it's not.

### can a function have more than 1 return statement inside it?
Yes

* just like a conditional statement you only follow 1 path

```js
function isEmailEmpty() {
  var field = document.getElementById( 'email' );
  if ( field.value === '' ) {
    return true;
  } else {
    return false;
  }
}

var fieldTest = isEmailEmpty();
if ( fieldTest === true ) {
  alert( 'Please provide your email address' );
}
```

**Notes**:
* a `return` statement causes the JavaScript interpreter to exit the function immediately
    - the `return` should be the last thing in a function

```js
function noAlert() {
    return 5;
    alert( 'You will never see this' );
}

noAlert();
alert( 'You will see this' );
```

## A function can only return 1 values
* a string, a number, a boolean value, or the contents of a variable
    - you can NOT return multiple things at once

You can't do this:

```js
function myFunction() {
  return 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri';
}
var days = myFunction();
```

**tip**: `return` exits a function and sends a value back to the spot in the program where the function was called

## Giving Information to Functions
* we just saw we could get information from a function
    - we can also SEND information to a function

My get great player instructions to my scout are to general, what if I could send him additional info

```js
function goGetGreatPlayer(forward) {

} 
```

* JavaScript functions can also accept info and is called an `argument`
    - the `arguments` is stored in a `variable` called a `parameter`
        + you can use this `parameter` inside the function
            * `parameter` works just like a `variable`
                - follows same naming rules as variable
                - the phrase `passing an argument` to a function is used to say this
                - makes our functions way more flexible, we can pass different values and get different results

```js
function getRandomNumber( upper ) {
  var randomNumber = Math.floor( Math.random() * upper ) + 1;
  return randomNumber;
}

getRandomNumber(6);
```

**note**: above won't do much as we can't see any output. But if we log to console, we'll see our answer

console.log( getRandomNumber(6) );

* when ever we called the console.log function we were passing it an argument

## Functions can accept multiple arguments

```js
// part 5 - passing multiple arguments
function findGreatPlayers( sport, position, age ) {
  console.log( "You need a " + sport + "player. Who plays the " + position + ". and is around " + age " years old." );
}

findGreatPlayers( 'soccer', 'goalie', 33 );
```

### Testing in console
Once your browser loads function in browser, you can test out function in the console

### Passing to many arguments
* It can get unruly
    - a better way would be to pass arrays or objects as arguments

## Code Challenge
Create a new function named max which accepts two numbers as arguments (you can name the arguments, whatever you would like). The function should return the larger of the two numbers. **HINT**: You'll need to use a conditional statement to test the 2 parameters to see which is the larger of the two.

Beneath the max function you just created, call it with two numbers and display the results in an alert dialog. Pass the result of the function to the alert method.

```js
function max( arg1, arg2 ) {
  if ( arg1 > arg2 ) {
    return arg1;
  } else {
   return arg2; 
  }
}

alert( max( 20, 30 ) );
```

## Variable Scope
* you can have multiple functions
* you can use multiple libraries that could use the same variable name as you use in your script

What does JavaScript do when it encounters two different variables with the same name?

* fortunately, JavaScript provides separate scopes for each function
    - each function acts like it's on individual universe and the variables created in one universe do not interact with the variables created in another universe (or another function)

### Example of variable scope

```js
function greeting() {
    var person = 'Pele';
    alert( person );
}
var person = 'David';
greeting(); // calls function and alerts Pele
alert(person); // alerts 'David'
greeting(); // calls function and alerts Pele
```

* above shows how variables inside a function and outside a function have different scopes

#### Local scope
Scope inside a function

#### Global scope
Scope outside a function
* this is a bigger universe because all functions can access the global scope
    - a function can change the value of a variable from the global scope
    - don't pollute the global scope (if possible)

Example

```js
function greeting() {
    person = 'Pele';
    alert( person );
}
var person = 'David';
greeting(); // calls function and alerts Pele
alert(person); // alerts 'David'
greeting(); // calls function and alerts Pele
```

* we removed `var` from inside the function and now person inside the greeting function is a global variable and our David value is gone forever

**tip** Do NOT access global variables from within your functions
    * makes debugging harder because you can't find them as easily
    * makes your function dependent on global variables in other parts of the script (harder to use a function in another script if that function is dependent on global variables)

# Best Practice
Always use the `var` keyword from inside a function

* you can use the same name for a variable inside functions that you have in other functions or globally because if you are using the `var` keyword, the scope will prevent that variable name from colliding with the same variable name in another universe (function)
* When you declare a variable within a function, that variable is only accessible within that function.

## Challenge
Use random function to pass lower and upper arguments and console out the result

```js
function getRandomNumber( lower, upper ) {
  // we can do this because all the code on the right evaluates to a single
     // number
  return randomNumber = Math.floor( Math.random() * (upper - lower + 1)) + lower;
}
console.log( getRandomNumber(1, 10) );
console.log( getRandomNumber(2, 8) );
console.log( getRandomNumber(20, 100) );
```

### Problem
What if we pass a string and not a number? We will get `NaN`
This breaks our code and we need to figure out a solution


#### isNaN( 'eleven' ); // false
* a function to determine if value is NOT a number
    - if it is not a number, it returns `true`
    - if it is a number, it returns `false`

We need to write a conditional statement that checks to see if either of the arguments is not a number and if so, alert the user they must pass two numbers

## Solution

```js
function getRandomNumber( lower, upper ) {
  // we can do this because all the code on the right evaluates to a single
     // number
  if ( isNaN( lower ) || isNaN( upper ) ) {
    throw new Error( 'You must use numbers only' );
  } else {
    return randomNumber = Math.floor( Math.random() * (upper - lower + 1)) + lower;
  }
}
console.log( getRandomNumber('nine', 10) );
console.log( getRandomNumber(2, 8) );
```

* notice how we use conditional OR operator `||` and then throw an error
    - this error will halt the program when it runs and the second call of function will not run and we will see this in our console

![console error](https://i.imgur.com/V6gTAHP.png)


