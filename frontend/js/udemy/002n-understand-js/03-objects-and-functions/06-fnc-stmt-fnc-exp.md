# Function Statements and Function Expressions
## What is an Expression?
A unit of code that results in a value

* a `Function Statement` - just do work
* a `Function Expression` or any expression in JavaScript, ends up creating a value
    - It doesn't have to save a variable

### Playing with the console
`app.js`

`var a;`

* Save it and open html page in browser pointing to `app.js`
* Open console
* With `a` sitting in memory we can write code in the console on the fly

`> a = 3`

* `=` is an operator
    - A function that takes the two values `a` and `3`, does some work and then returns a value
    - It will return 3, pass `a` on the left side and `3` on the other and it returns whatever is on the right side `3`
    - When we run the `> a = 3` we get a value back `3`
        + Because the `=` operator returns a value
* `> 1 + 2` is a valid expression
    - It returns `3` but we didn't set it `=` to anything in memory
    - So the expression evaluated (it ran) and it return a value but we didn't do anything with the value
* In both cases this is an expression because... it returned a value
    - That returned value can be:
        + A number, string, object...
        + But at the end of the day it still ends up being a value
* `> a = { greeting: 'hi' };`
    - Returns an object

`app.js`

```
var a;

if (a === 3) {
  
}
```

* Inside the **if statement** parenthesees `()` you put an **expression** because that results in a value
* But the **if statement** itself is just a statement
    - It is called an **if statement** because it doesn't return a value
    - We can't do this:

```
var a;

var b = if (a == 3) {

}
```

* The reason we can't do this is that no value is returned

`app.js`

```
var a;

if (a === 3) {
  
}
```

* The `if` is a statement and inside the `()` you have an expression
    - `(a === 3)` - returns a value (ultimately true or false)

### Take away
* A `statement` just does work
* An `expression` returns a value

## Function Statement and Function Expressions
In JavaScript we have both Function Statements and Function Expressions

### Showing the difference between the two
#### Function Statement
```
function greet() {
    console.log('hi');
}
```

* When it is run (aka evaluated), it doesn't result in a value
* The function is placed in memory but it is just a **statement**
* It doesn't return a value until the function is executed
* It does get hoisted during the global execution phase it is put into memory
    - So it is available ahead of time
    - We can call `greet()` before we declare it

`app.js`

```
greet(); // hi

function greet() {
  console.log('hi');
}
```

* It still is an object
* It's **name** is greet
* It's **code** property is equal to the code inside the `{}`

## Function Expression
`app.js`

```
var anonymousGreet = function() {
  console.log('hi');
}
```

* Does that look strange?
* We are creating an object `function() { console.log('hi'); }` 
* And setting it equal to a variable `anonymousGreet`
    - The variable is a spot in memory that it points to, will contain a function object

![function statement diagram](https://i.imgur.com/fm2bhi7.png)

* When I call it with `greet()` those `()` invoke the `code` part

## But what about the `Function Expression`?

![function expression diagram](https://i.imgur.com/JohBn2n.png)

```
var anonymousGreet = function() {
  console.log('hi');
}
```

* It puts the function object in memory
* It's not looking at the name because it knows the address in memory
* We still get a function object, the JavaScript Engine creates one
* But we didn't have a **name** property
    - Because we didn't put anything before the parenthesees
    - And we don't have to because we have a variable that already knows where that object lives
    - This is an anonymous function
        + Obviously an anonymous function is a function that doesn't have a **name** property
        + But that is OK because you can reference it by pointing to a variable that knows the address of where the object lives
        + We have the same **code** property `console.log('hi')`

## How do we invoke a function expression?
* We need to point to the object and tell it to run its code

`anonymousGreet();`

* The variable is already pointing to where the object lives
    - We just add the `parenthesees` **()** which invokes the **code**

`app.js`

```
var anonymousGreet = function() {
  console.log('hi');
}

anonymousGreet(); // hi
```

* The highlighted code below is an expression because it results in a value

![expression](https://i.imgur.com/Od5DjYO.png)

* We end up with a function object when the above code is evaluated/executed

## Hoisting with Function Expressions?
`app.js`

```
anonymousGreet();

var anonymousGreet = function() {
  console.log('hi');
}
```

* With Function Statements we could hoist and call a function before it is written becuase during the execution context being created and executed

```
greet(); // hi

function greet() {
  console.log('hi');
}
```

* The above function is **hoisted**
    - Meaning when the JavaScript Engine sees the word **function** written on a new line by itself, it says "Oh, you're creating a function here and I'll put it into memory"

But below it sees a variable `anonymousGreet`

```
anonymousGreet();

var anonymousGreet = function() {
  console.log('hi');
}
```

* It puts the variable into memory and it sets the variable to `undefined` BEFORE it starts executing the code
    - And then it begins to run the code
    - When it gets to `anonymousGreet`, it says, "Oh I see that in memory as `undefined`"
        + Because we haven't hit the line where it is set equal to anything yet
        + And then we try to invoke it with `anonymousGreet()` as if it were a function
            * And JavaScript throws an error and tells us that `anonymousGreet()` is not a function

## Takeaway
* Function Expressions aren't `hoisted`
* This is confusing to people
* But if we think about how JavaScript operates under the hood we can understand why it happens
* So our invokation must come after Function Expressions

```
var anonymousGreet = function() {
  console.log('hi');
}

anonymousGreet(); // hi
```

## Functions passing to Functions
```
function log(a) {
  console.log(a);
}

log(3);
```

* pass a number to a function, gets the number and outputs `3`
* We are creating 3 on the fly,
    - We didn't create a variable to hold it (we could)
    - We could do the same thing with a string

```
function log(a) {
  console.log(a);
}

log('Yo');
```

* We just create a string (aka String Literal) on the fly and pass it to a function

We can also pass an object

```
function log(a) {
  console.log(a);
}

log({
  greeting: 'hi'
});
```

* But remember, a function is an object
* So we can pass a function to a function!
* A `Function Expression` creates a function object on the fly
* This means we can do this

```js
function log(a) {
  console.log(a);
}

log(function() {
  console.log('hi');
});
```

* We just passed a function to a function
* Works similar to an object literal
    - We create a function on the fly
    - Put in some code that creates the object
    - Puts that code into that **code** property of that function object
* Run the function and you'll see:

![function passed to function](https://i.imgur.com/DUmT8as.png)

* See how it has the function?

## How can we now invoke this function?
```
function log(a) {
  console.log(a);
}

log(function() {
  console.log('hi');
});
```

* After we pass the function to a function, the `a` property is now pointing to a function
* To run it we just invoke it with 

```
function log(a) {
  a();
}

log(function() {
  console.log('hi');
});
```

* This is huge
* Look at it and absorb it
* This is functional programming
    - The concept of first class functions, where you can pass functions around, give functions to other funcitons, use them like you do variables introduces an entirely new class of programming called **functional programming**

### Review
```
greet();

function greet() {
  console.log('hi');
}


var anonymousGreet = function() {
  console.log('hi');
}

anonymousGreet();


function log(a) {
  a();
}

log(function() {
  console.log('hi');
});
```


