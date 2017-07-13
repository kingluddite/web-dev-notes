# Inheriting from the Event Emitter Part 2
```js
const EventEmitter = require('events');
const util = require('util');

function Greetr() {
  this.greeting = 'Hello world';
}

util.inherits(Greetr, EventEmitter);

Greetr.prototype.greet = function(data) {
  console.log(`${this.greeting}: ${data}`);
  this.emit('greet', data);
}

const greeter1 = new Greetr();

greeter1.on('greet', function(data) {
  console.log(`Someone greeted!: ${data}`);
});

greeter1.greet('John');
```

* That is code we used in `06-inheriting-from-event-emitter.md` and it works great but we need to add some code to deal with one scenario now that we know how to work with `.call()` and `.apply()`
* Inside our function constructor we can add properties and methods directly onto the object being created as opposed to adding properties and methods directly on the prototype
    - The `this` keyword is the new object being created
        + Whenever I say `new` and then our function constructor `Greetr()`
        + So that is how I add properties and methods

```js
Greetr.prototype.greet = function(data) {
  console.log(`${this.greeting}: ${data}`);
  this.emit('greet', data);
}
```

## But what if EventEmitter (_or whatever else I'm inheriting from_) also adds properties and methods directly to the new object not necessarily the prototype
* Meaning a copy is made and put on every single object created like we're doing here:

```js
function Greetr() {
  this.greeting = 'Hello world';
}
```

* Currently, we are not including those on my new object
* And this is a problem because it is an incomplete form of inheritance

## Let's fix that
* Easy to do with just one line of code

```js
function Greetr() {
  EventEmitter.call(this); // add this line
  this.greeting = 'Hello world';
}
```

* What the heck did we just do?
    - EventEmitter is a function constructor
    - When it is invoked with the `new` keyword
        + The `this` variable points to an empty object and then it adds on properties and methods
    - But here we are overriding what the `this` keyword is
        + So I don't need to use the `new` keyword
        + So I just say run the constructor and pass the new object that has already been created, then inside the EventEmitter function constructor, I'll have a bunch of methods and properties added (_if there are any_)
            * And because `this` in EventEmitter.call(this) is an object it is passed by reference, then I can just keep adding on my own properties and methods to that new object
                - This is equivalent to what some other programming languages the `super` constructor (_Meaning the constructor that I'm inheriting from_)
                - But the basic idea in JavaScript is this:
                    + I'm using `.call()` (_I could also use `.apply()`_) in order to give it the new object that I'm working on so that it does its work of adding properties and methods to that new object (_So that the `this` keyword inside the EventEmitter will be the same `this` inside Greetr()_)
                    + Add all the properties and methods
                    + Add my properties and methods
                    + And then the prototype chain is still set up the same way
                    + So that the same properties and methods are available to all objects that are created from this function constructor `Greetr()`

## Takeaway
* This one line of code ensures that my object created from this function constructor `Greetr()` has everthing in object.created() from EventEmitter would have

## Practice
`app2.js`

```js
const util = require('util');

// function constructor that creates a person object
function Person() {
  // has two simple properties
  this.firstName = 'John';
  this.lastName = 'Doe';
}

// on the prototype we have a function called greet()
Person.prototype.greet = function() {
  console.log(`Hello ${this.firstName} {$this.lastName}`);
}

function Policeman() {
  this.badgeNumber = '1234';
}

util.inherits(Policeman, Person);
```

### What happens if I create a new person object
* There would be an empty object at first (which would be the `this` variable)
* Then that empty object would attach firstName and lastName properties
* And that would be it

### But then I could call `.greet()`
* Because it would be on the prototype of that object
    - Down the prototype chain

## Then I create a totally new function constructor `Policeman()`
* This object has its own special property (badgeNumber)

## But I also want Policeman to have everything that Person has
* So I use `util.inherits(Policeman, Person);`
    - And this just says that Policeman should inherit from Person

## Then I make a new Policeman
`const officer = new Policeman();`

## And then I can call the `greet()` function
`officer.greet();`

## What will happen when you run `$ node app2.js`
`Hello undefined undefined`

* The greet() function is available
* But firstName and lastName are not
    - Why were they undefined?
    - Because `util.inherits()` just connected the **prototypes**
    - It connected what's available to all objects from this function constructor

```js
Person.prototype.greet = function() {
  console.log(`Hello ${this.firstName} ${this.lastName}`);
}
```

* But this part:

```
this.firstName = 'John';
this.lastName = 'Doe';
```

* And this part:

```
this.badgeNumber = '1234';
```

* That attach properties and methods directly to the new object being created
* The problem was this:

```
this.firstName = 'John';
this.lastName = 'Doe';
```

* Was never run

* But this line was run

```
this.badgeNumber = '1234';
```

* But if I add this:

```js
function Policeman() {
  Person.call(this);
  this.badgeNumber = '1234';
}
```

* Now when I create a new `Policeman()`
    - This function is called:

```
function Policeman() {
  Person.call(this);
  this.badgeNumber = '1234';
}
```

* And because of the `new` operator the `this` keyword points to an empty object
    - And then I run `Person.call(this)` and give that empty object to Person and since I'm using `.call()` the `this` keyword will be the same object as the this keyword here:

![same this keyword](https://i.imgur.com/4gUvPgA.png)

## Debugger test in VS
* Switch to app2.js
* Step into first line
* Step over until you get to `Person.prototype.greet` line
* Step over
* Step over the inherit line
* Now we step into `new Polieman()` line
    - Now I have an empty object

![empty object this](https://i.imgur.com/KH931l1.png)

* The `this` keyword which is ready to have its properties and methods attached
* But before I attach the badgeNumber We step into `Person.call(this)`
    - Then it goes inside Person and says the `this` keyword should be what was passed in
    - Step over firstName and lastName
    - Then if you look at the object you'll see:

![first and last name on Policeman object](https://i.imgur.com/7wEe8O0.png)

* Set over and we are on `this.badgeNumber`
* And the `this` keyword already points to firstName and lastName with values and now we add `this.badgeNumber` to the `this` keyword object (the extra property I wanted for a Policeman object)

![now has badgeNumber too](https://i.imgur.com/ryyLb47.png)

* Step over one last time

### So now I want to look at `officer`
* Add a watch for the variable `officer`

And you will see:

![officer](https://i.imgur.com/wXhyiGO.png)

* Without the `.call()` I didn't have the `firstName` and `lastName`
* Because that function constructor was never run
* util.inherits() just connected the prototypes

## Now I want to dig into the officer prototype
* Add a new watch variable `officer.prototype` which would be:
    - `officer.__proto__`
    - But I need to go one level deeper to get to the Person prototype
    - `officer.__proto__.__proto__`
* And that has the greet() function on it

![proto * 2](https://i.imgur.com/VO0YZRJ.png)

* So Person.prototype is the prototype of the prototype of officer
* With `.call()` I make sure the object has everything
    - Not just what's down the prototype chain
    - But what's supposed to be directly on each new object
* And now since it has everything I need I can call `greet()` and it says `Hello John Doe` instead of `Hello undefined undefined`

## Takeaway
* You will see this pattern used a lot in NodeJS especially inside NodeJS source code
* ES6 adds another way to create objects

## Next
ES6 and creating objects
