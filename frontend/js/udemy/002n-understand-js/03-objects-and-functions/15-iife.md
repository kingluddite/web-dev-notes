# Immediately Invoked Function Expressions (IIFE)s
(pronouned if-ee)

## How do IIFEs work?
## Why are they useful?

### Function Statement
* Where `function` is the first word

```js
// function statement
function greet(name) {
  console.log('Hello ' + name);
}
```

* When JavaScript sees above it puts it into memory
* But when it comes to this line it doesn't execute it
* You must invoke it with `greet()`

```js
// function reference
var greetFunc = function(name) {
  console.log('Hello ' + name);
};
```

* We set the variable equal to an anonymous function
* This is an **expression**
* Is IS NOT put into memory initially but rather during execution
* When the JavaScript Engine hits this line of code it creates this **function object** on the fly
* Then we invoke it by pointing it to a variable that's pointing to that memory location with `greetFunc()`

```js
// function statement
function greet(name) {
  console.log('Hello ' + name);
}
greet('Bob'); // Hello Bob

// using a function expression
var greetFunc = function(name) {
  console.log('Hello ' + name);
};
greetFunc('Bob'); // Hello Bob
```

* Highlighted text is kind of like a **function literal**

![function literal](https://i.imgur.com/kfxAN4V.png)

* We are creating a function on the fly
    - Similar to creating a string, number or boolean on the fly

## What is the special thing we can do with function (all functions) that make it a special kind of object?
* It has a **code** property
    - **Question** What can we do with that code property?
    - **Answer** We can invoke it

### Invoke the function at the point you create it
```js
// using an Immediately Invoked Function Expression
var greeting = function(name) {
  console.log('Hello' + name);
}();
```

* This part gives me a function object

![function object](https://i.imgur.com/2q64Z4z.png)

* To invoke a function we add parentheses `()`
* This **invokes** the function **immediately** `after` creating it
* This is an `Immediately Invoked Function Expression (IIFE)`

## What if an IIFE returns a value?
* First let's see what happens with out an IIFE

```js
// using an Immediately Invoked Function Expression
var greeting = function(name) {
  return 'Hello ' + name;
};
console.log(greeting);
```

* The log will show that greeting holds the function itself
* And then you could invoke it to get the proper value
* `greeting()`
    - `> Hello undefined`
* Invoke it with a parameter `greeting('John')`
    - `> Hello John`

But what if you invoke it like this:
    
```js
// using an Immediately Invoked Function Expression
var greeting = function(name) {
  return 'Hello ' + name;
}();
console.log(greeting);
```

* The function object will be created using the function expression
* Then it will be invoked
* And that value will be returned
* And that will be set equal to `greeting`
* When we run it we get `Hello undefined`

### How do you pass an IIFE a value?
* We need to pass it a value so how do you pass it a value?

```js
// using an Immediately Invoked Function Expression
var greeting = function(name) {
  return 'Hello ' + name;
}('John');
console.log(greeting);
```

* Note that **greeting** now holds the `string` and not the `function`
* If you now try to invoke it you will get this error:

```js
var greeting = function(name) {
  return 'Hello ' + name;
}('John');
console.log(greeting());
```

![error IFFE](https://i.imgur.com/dGRCsi8.png)

```js
// using an Immediately Invoked Function Expression
var greeting = function(name) {
  return 'Hello ' + name;
}('John');
console.log(greeting);

console.log(typeof greeting); // string
```

* `greeting` now contains a **string**

### Stand alone Immediately Invoked Function Expression (IFFE)
```js
3;
```

* This looks strange but is perfectly valid
* We put a semicolon to tell the JavaScript parser that this one line of code
* We don't get any errors when we run it
* We can run an expression and decide not to do anything with it
* We can also do this:

```js
"I am a string";
```

* Run and no errors
* It does nothing but it is valid

## Create an object literal
```js
{
    name: 'Bob'
};
```

* Run it
* No error
* Does nothing
* Just sits there
* Just a line of code

## Stand alone functions
If we copy and paste this function at the end

```js
function (name) {
  return 'Hello ' + name;
}
```

* We get an error
* `Uncaught SyntaxError: Unexpected token (`

## Why is that an error?
* Because the parser sees the word `function` and then expects it to be a **function statement**
* It wants this function to have a **name**
* This syntax is a problem
* If you just put `function(name)` this function isn't an expression, it is a function statement
* But we want the function to sit there just like we did with `3;` and `"I am a string";`

## How can we trick the syntax parser?
* Into understanding that I don't intend this to be a **function statement**?
* I need to make the word `function` not be the first thing the parser sees
    - There is a few ways to do this
    - But the `most accepted way` because it's the least amount of typing is to wrap your function in parentheses

```js
(function(name) {
    return 'Hello ' + name;
});
```

* You do this when you want a function expression instead of a normal function statement
* `()` inside JavaScript is an operator and you only use parentheses with expressions
    - `(3 + 4)*2` - It is the grouping operator
* You never put a statement inside parentheses
    - `(if (something));`
* It always must be an expression... something that returns a value
* So writing our function inside parentheses the JavaScript parser assumes it is an **expression**

## Great our function expression runs with no errors
* But it does nothing
* Let's make it do some work

```js
var firstname = 'Bob';
(function(name) {
    var greeting = 'Hello';
    console.log(greeting + ' ' + name);
}(firstname));
```

* Now we have a function expression
* It does some work
* We invoke it
* We pass it a value
* We are creating a function and running it all at the same time
* This is a classic example of an IIFE

## Takeaway
You will see this pattern IIFE in almost every major JavaScript framework and library out there today

### Slight controversy
* Invoke inside the parentheses

```js
var firstname = 'Bob';
(function(name) {
    var greeting = 'Inside IIFE: Hello';
    console.log(greeting + ' ' + name);
}(firstname));
```

* Or invoke it outside the parentheses
 
```js
var firstname = 'Bob';
(function(name) {
    var greeting = 'Inside IIFE: Hello';
    console.log(greeting + ' ' + name);
})(firstname);
```

* It doesn't matter
* Both work the same way
* Which one's the right way?
* There is no right way
* Which one makes more sense to you?
* Whatever you do, pick one and be consistent
