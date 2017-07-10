# OOP with JavaScript
* Object Oriented Programming
* Learn how to write highly organized JavaScript

## What is Object-oriented programming?
### We'll answer by giving a code example
`/app/assets/scripts/App.js`

```js
console.log('Test');
```

## Point to JavaScript from HTML
```html
// more code

<script src="/assets/scripts/App.js"></script>
</body>
</html>
```

## Test
`cmd` + `opt` + `j` - opens inspector

* You should see `Test`
* If you do, our JavaScript is working

`App.js`

```js
console.log('Hello, my name is John Doe and my favorite color is blue');
console.log('Hello, my name is Jane Doe and my favorite color is green');
```

* The output should not be surprising
* But this `code` is **repetitive**
* The lines are identical except for the **name** and **color**
* Everything else is part of a pattern that we can define once and then recycle

```js
function person(name, color) {
  console.log('Hello, my name is ' + name + ' and my favorite color is ' + color + '.');
}

person('John Doe', 'blue');
person('Jane Doe', 'green');
```

## Using variables
```js
function person(name, color) {
  console.log('Hello, my name is ' + name + ' and my favorite color is ' + color + '.');
}

var johnName = 'John Doe';
var johnFavColor = 'blue';
var janeName = 'Jane Doe';
var janeFavColor = 'green';

person(johnName, johnFavColor);
person(janeName, janeFavColor);
```

## How do we add structure to our data? - Use Objects
```js
var john = {
  name: 'John Doe',
  favColor: 'red'
};

function person(name, color) {
  console.log('Hello, my name is ' + name + ' and my favorite color is ' + color + '.');
}

var johnName = 'John Doe';
var johnFavColor = 'red';
var janeName = 'Jane Doe';
var janeFavColor = 'green';

person(john.name, john.favColor);
person(janeName, janeFavColor);
```

### OK we are using Objects in OOP
But what's the big deal?

### We can also store functions in objects
```js
var john = {
  name: 'John Doe',
  favColor: 'red',
  greet: function(name, favColor) {
    console.log('Hello, my name is ' + this.name + ' and my favorite color is ' + this.favColor + '.');
  }
};

john.greet();
```

* One object can contain all the data and behavior (properties and methods) that it needs to operate
* OOP is where we stop thinking in terms of individual variables and functions
    - And begin thinking in terms of cohesive, self-sufficient objects

## What is an Object?
* An entity that has Data and behavior
  - Or think of it as an entity that has nouns and verbs

### Our Object
* `name` is a noun
* `favColor` is a noun
* `greet` is a verb

## method
* When we have a function that belongs to a function we call it a **method**

## Do we have to do the same thing for Jane Doe?
```js
var jane = {
  name: 'Jane Doe',
  favColor: 'green',
  greet: function(name, favColor) {
    console.log('Hello, my name is ' + this.name + ' and my favorite color is ' + this.favColor + '.');
  }
};

jane.greet();
```

## That is really repetitive
* What if we have 1000 people?
  - We would have to do this 1000 times

## There's got to be a better way!
* There is... and that better way is by creating a class

## Class
```js
function Person() {
  this.greet = function() {
    console.log("Yo!");
  }
}

var john = new Person();
john.greet(); // Yo!

var jane = new Person();
jane.greet(); // Yo!
```

* Begin classes with a Capital letter
    - Common naming convention is to spell constructors with a Capital letter
* `new` is a keyword in JavaScript that will create a new **instance** of the Person object type
  - (_We could also say we will create a new object using our Person blueprint_)

## What is `this` keyword
* Allows our Object to be flexible
* The value of `this` changes depending on 
  - **how**
  - **when**
  - and **where** it is called
* When we call this after called `john.greet()` `this` refers to **john**
* When we call this after called `jane.greet()` `this` refers to **jane**
* Within the **signature** of our constructor function we add parameters to receive incoming stuff like names and favorite color

```js
function Person(fullName, color) {
  this.name = fullName;
  this.favColor = color;
  this.greet = function() {
    console.log('Yo ' + this.name + '.' + ' Your favorite color is ' + this.favColor + '.');
  }
}

var john = new Person('John Doe', 'red');
john.greet();
console.log(john);

var jane = new Person('Jane Doe', 'green');
jane.greet();
```

## Now our code is Object Oriented
* JavaScript does not technically have classes like Java and C#
* ES6 introduces the `class` keyword to make JavaScript look like is uses classes but it is not a **true** JavaScript language
* It is a difference but I will refer to the blueprint code as a `class`
* It would be nice if we could put our `class` in its own file so we don't have it mudding up our other code
* We can't import files/libraries using native JavaScript but we can using a tool called **Webpack** 
