# Objects

Object
* An object is a container for values in the form of `properties` and functionality in the form of `methods`

## Methods
* return values

```js
var h1 = document.getElementById( 'main-content' );
```

* some methods don't return values

```js
console.log( h1.innerHTML );
```

* properties can be accessed or assigned

```js
h1.innerHTML = 'Hello from JavaScript';
```
## Objects
* Provide functionality through methods. Methods may or may not return values
* Provides data storage in properties
* The name of the property is a `key`
* The contents of a property is know as a `value`

## JavaScript is everywhere
* found most commonly on browsers on the client side
* in node-js on the server side
* embedded devices (IOT - Internet Of Things)

## Object Categories
1. [Native Objects in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
   * no matter where you JavaScript is run, it will have these objects
       - Examples
           + Number
           + String
           + Array
           + Boolean
           + Object
2. [Host Objects in the Browser](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
    * Provided by the environment where the JavaScript is running
        - This is called the `Host Environment`
        - The Browser is the `Host Environment` for most wed developers
        - Browser has hundreds of different Host Objects
            + document
            + console
            + Element (i.e. HTML P IMG)
3. Your Own Objects
    * objects you create in your programming
        - can be anything you like
            + contacts in an address book
            + songs in a playlist
            + tasks in a todo list
            + characters in a game

# What do Objects do for us?
Allow us to model things we use in real life

## All real world objects share two important characteristics
1. State
    * refers to all values at a particular point in time
        - radio can be `on` or `off`
    * you can change the state of a property when you change their values either
        - directly
        - or through a method call
    * the state of an object is stored in its properties
2. Behavior
    * and its behavior is stored in its methods

## By creating an object in code it does two important things
1. allows you to hide the complexities of how things actually work from the developer using your object
2. great for organizing your code
    * known as `encapsulation`


## Real World Object Example

### Radio

#### What is its state?
On or Off

#### What station is it on?
94 WYSP

#### Methods
##### Turn power on or off
##### Change station

Objects can be used to create abstract Objects
HTML - no real world HTMl
But it has properties and methods, state and behavior
getElementByID? How does the browser do it? or use it? You don't know, you just know what to do by passing it a string by ID and then you get an HTML returned

so you don't know how when you change the dial, the radio station changes or the volume changes. That's all you need to know. The how it was done is not your concern.

# Object Literal
holds data about a particular thing at a given time
* object literal stores the state of a thing

## Example of Object Literal

```js
var person = {
    name: 'Lauren',
    soccerPlayer: true
}

person.name;
person.soccerPlayer;

// we could also do this to access values
person[ 'name' ];
person[ 'soccerPlayer' ];
```

Why are we storing keys as strings?
Because each key is actually a String.
* in JavaScript an Objects keys are **always** strings but the JavaScript interpreter is smart enough to interpret the strings without quote marks
    - as long as they are valid variable names, no syntax errors will be thrown

you can use keys that ARE NOT valid variable names like

```js
person["Yo whats up"]; 
```

* strings with special characters or spaces can only be used if wrapped in quote marks
    - BUT THIS IS A BAD PRACTICE

# Best Practice
Use dot syntax

## Adding a Method to an Object

**note**: function on object is called method

## Convert Named Method to Anonymous function Method

```js
var dice = {
  roll: function diceRoll() {
    var sides = 6;
    var randomNumber = Math.floor(Math.random() * sides) + 1;
    console.log(randomNumber);
  }
};

```

Convert to Anonymous Function (more common way you'll see it)

```js
var dice = {
  roll: function() {
    var sides = 6;
    var randomNumber = Math.floor(Math.random() * sides) + 1;
    console.log(randomNumber);
  }
};
```

## What is this?

It is the object that owns the method being called

## Returning Values

## Altering the state of our objects


**note**: if a function does not have a return statement then it always returns undefined. Just the way javaScript works.

# Constructor Functions

## Why use Constructor Functions?
* there are limitations to object literals
    - object literals are not always the best tool for the job
* object literals are great for one off objects or passing values to a function
* but if you want to create multiple objects of the same kind or type, you'll need to use constructor functions

## More About Constructor Functions
* Describe how an object should be created
* Create similar objects
* Each object created is known as an instance of that object type

## Constructor Function Syntax

```js
function Contact( name, email ) {
    // this = {};
    this.name = name;
    this.email = email;
this.sendEmail = function() { /* Do something */ };

    return this;
}

var contact = new Contact( 'King', 'kl@kl.com' );
var contact2 = new Contact( 'Bob', 'bob@hope.com' );
```

* creates a contact with name and email
* we create a new contact `instance`
    - an instance is a specific realization of a particular type or object
* each instance created is unique in terms of their own `state`
* instances are created by using the `new` keyword
    - this turns a regular function call into a constructor function
* `this` inside our function represents a new instance of our object
    - this = {};
* use dot notation to add new properties/methods to the object
* `return` is not required for a constructor function
* **BEST PRACTICE:** Capitalize contstructor functions
    - so that you know when to use the [`new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) keyword

example cleaned up

```js
function Contact( name, email ) {
    this.name = name;
    this.email = email;
    this.sendEmail = function() { /* Do something */ };
}

var contact = new Contact( 'King', 'kl@kl.com' );
var contact2 = new Contact( 'Bob', 'bob@hope.com' );
```

## Examples of Good cases for using a constructor function over an object literal

### Media Player
* playlist object
* song object

### To Do List App
* several task objects

### Adventure Game
* player object with scores and attacking monsters
* monster object
    - each monster object tracks their own health
* level object to map out dungeons

### Social App
* friend object
* favorite object

## Pros of Constructor functions
* help in organizing code
* prevent repetition, keeping your programming DRY

## Convert object literal into a Constructor Function (dice game)

# Methods with Prototypes

### Houston we have a problem!

Problem with Constructor function so far.
* every time we call the constructor function with new, we are running the constructor code again and again.

Example

```js
var dice6 = new DiceGame( 6 );
var dice10 = new DiceGame( 10 );

console.log( dice6.roll === dice10.roll ); // outputs false
```

Why false? Because each time, we are running the constructor function

Everytime we run our constructor function, the anonymous function in `this.roll` is run again and again and again and... you get the idea

Why is this bad? Your program is taking up more space in the computer's RAM (aka memory) than it has to.
* this can lead to your application slowing down
* or the entire browser slowing down

One Solution to this inefficiency problem (but not a good one)

pulling the method out of the constructor function works
but it is inefficient
we have a new function floating around, not connected to the DiceGame constructor function, imagine a larger app with dozens of objects and dozens of methods, it will be difficult tracking down which external function works with what method call

## [Prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)
JavaScript provides a way to organize our code with contructor functions and that is with a special property called `prototype`
* the prototype on a constructor function is an object like an object literal and it can be added to

### how does this work?
JavaScript is known as a prototypal programming language (meaning you can use prototypes as templates for objects of values and behavior to be shared between instances of objects)

#### Here's the big difference
In our example instead of the roll function being defined for every instance when we construct one, it is shared between all instances through the template or prototype

so after we make this change and add `DiceGame.prototype.roll` the JavaScript interpreter tries to call it on the object itself, if it's not there, it will check it's prototype, if the roll is there, it will call the method in the context of that instance

after adding prototype.roll, it still works but this time it's calling the method on the prototype and the console.log test for equality will now return `true`.
