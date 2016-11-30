# Functions

Let us write, call and reuse blocks of code

## Two major parts of Functions

### Function Declaration
Sets the name and what the function will do

### Function Call
Tell the function to execute

#### Function Call vs Function Reference

This is a function call:
`callMe()`
This is a function reference:
`callMe` (we leave off the parenthesees)

## Types of Functions

* Anonymous Function
* Named Function
* Function Expression

### Anonymous Function
Does not have a name to be recalled. Is usually meant to execute immediately.

### Named Function
Assigned a name to be used when called.
* Although named functions are fine it is generally recommended to assign an anonymous function to a variable (aka function expression)

### Function Expression
Written as part of a larger JavaScript statement, like a variable assignment.

* A variable can actually be equal to a function
* We can all a function in the same way we did before (with the parenthesees)
    - However if we remove the parenthesees

### General Programming Rule

#### DRY - Don't Repeat Yourself

IMPORTANT: In JavaScript, Our function declaration **always** has to happen before our function call.

## Function Parameters

### Parameters
Values passed into a function

```js
function name( param1, param2, param3 ) {

    console.log( param1 );

}
```

* function parameters become variable names we can use inside our function
* you can have 1, many or no parameters

How do you pass a value into a function when you call it?

```js
name( 'value 1', 'value 2', 'value 3' );
```

* order parameters declared is important
* each parameter separated by a comma

![ES6/Babel in JsBin](https://i.imgur.com/1pPCgTZ.png)

[function examples link](http://jsbin.com/retena/edit?js,console)

## Returning Values from Functions

### Functions

Return `undefined` by default, possible to assign custom value using `return`

If we don't use the `return` keyword in a function that function will always return `undefined`

**IMPORTANT**
You can only return one value per function

### naming convention with WordPress

* `get_the_title()` - this would return us a value
* `the_title()` - this `displays` the title rather than returning it

why does WordPress name the above functions that way (with underscores)?
because it is PHP and PHP has a different style guide recommendation than JavaScript.

so with WordPress and JavaScript we'll use
getPostTitle() - to return some title
and
displayPostHeading() - will just display our post heading

### Functions Review

* Reusable blocks of code
* Accept parameters
* Always return a value
* Can return a custom value
* Different ways to write functions

[link review examples](http://jsbin.com/puquqe/edit?js,console)

## Methods
Function assigned as a property to an object

# keyword `this`

[link to examples](http://jsbin.com/mudeza/edit?js,console)

## Object Methods in JavaScript




