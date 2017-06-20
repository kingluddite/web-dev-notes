# Objects, Functions and `this`
* What happens when the code of a function is invoked and the function is run?

## Reminder
* When a function is `invoked` a new Execution Context is created (_Creation Phase_)
* Do not confuse you with the Object
    - The Object sitting in memory that is a function
        + Has properties and methods
        + Has a name property
        + Has a code property where the code lives
        + But when that code is invoked and an execution context is created and put on the execution stack and that determines how that code is run/executed
* Think of the Execution Context as focusing on the `code` portion of that function object
    - What happens when I run that code in that code property?

## Review
* An Execution Context is created
    - Each Execution Context has this **Variable Environment**
        + Where the variables created inside that function live
    - It has a reference to its **Outer Environment** (aka Outer Lexical Environment - where it sits physically in the code)
        + Which tells it how to look down the **scope chain**
            * example
                - It asks for a variable and it's not there inside the Variable Environment, it will go out, and out further, and all the way to the Global Environment looking for that variable (or that function)
    - We also know that everytime a JavaScript Execution Context is created, every time a function is run, it gives us (we don't have to create it or declare it) this variable called `this`
        + `this` will be pointing at a different object (aka a different thing) depending on HOW the function is `invoked`
        + `this` causes lots of confusion in the JavaScript world especially when developers don't understand what's really going on under the JavaScript Engine hood
        + `this` is changed depending on how the function is called
            * the JavaScript Engine decides that `this` should point to something different
        + The `this` keyword is a particular object or another depending on where the function is how it is called

## Code Examples
`console.log(this);`

Output --> `Window`

* `this` is immediately available
    - Even at the global Execution Context level
    - `this` is now pointing to the Global `Window` object

```
function a() {
  console.log(this);
}

a();
```

* Invoking `a` with `a()` means
    - "run that `code` property" which contains all the lines of code inside the function
    - The first thing it does is create the Execution Context
    - In the process it creates `this`

What will the keyword `this` be inside the Execution Context that's created by invoking `a()`?

* It is also the `Window` object

### Takeaway
* When you create a function the `this` keyword is still going to point to the Global Object, if you decide to use `this` and you are simply invoking the function

### What about `this` and Function Expressions?
```
function a() {
  console.log(this);
}

var b = function() {
  console.log(this);
}

a();
b();
```

* When `b` is invoked `b()` the `this` keyword is pointing again to the Global Object

### Takeaway
Whenever I create a function that is simply a function expression or function statement creating a function, than `this` will point to the Global Object

* That is true even though there are three Execution Contexts in this code:

```js
function a() {
  console.log(this);
}

var b = function() {
  console.log(this);
}

a();
b();
```

`Window {stop: function, open: function, alert: function, confirm: function, prompt: function…}`

* The Global Context
* The Execution Context created when `a` is invoked
* The Execution Context created when `b` is invoked
* And in each of those three cases, they each get their own `this` keyword
* But in all three the `this` keyword points to the same **address** (aka the same location) in your computer's memory
* They are all pointing at the Global Object

### We can do strange things now
```
function a() {
  console.log(this);
  this.newVariable = 'yo';
}

var b = function() {
  console.log(this);
}

a();
console.log(newVariable);
b();
```

* Because `this` in `a` points to the Global Object we can add a property to it and it will attach that property to the Global object and we can log out that variable value from the Global Object 
* We don't need to use the `.` operator
* It just assumes I'm asking for a variable on the Global Object
* This would seem strange to people
    - They might think that the `this` in the `a` function is pointing to the `a` function but it is instead pointing to the Global object

## When do you use `this` inside a function?
* We'll get to that later

## What about the object method?
* We can create a method inside an object literal
* Now that we understand function expressions we can do this
* note
    - If the value is a Primitive, it is called a **property**
    - If the value is a Function, it is called a **method**

```js
var c = {
  name: 'The c object',
  log: function() {
    console.log(this);
  }
}

c.log();
```

* Now we invoke a function that was created inside the object literal which is attached to `log`
* This is `log` method of the object `c`

### What will the value of `this` be in this case?

`Object {name: "The c object", log: function}`

* Every time a function is invoked a new Execution Context is created and the JavaScript Engine decides what that keyword `this` should be pointing to
* In the previous cases `this` pointed to the Global object but in this case `this` is inside a method on an object

## Takeaway
In the case where a function is actually a method attached to an object the `this` keyword becomes the object that that method is sitting inside of (in this case `c`)

### We can change a property on the object using `this`
```
var c = {
  name: 'The c object',
  log: function() {
    this.name = 'Updated c object';
    console.log(this);
  }
}

c.log();
```

Output ---> `Object {name: "Updated c object", log: function}`

* We just changed a **property** on the parent object
* The object that holds the function
* That is useful
    - We can mutate the objects that contains me if I'm a method of that object by using the `this` keyword

### Let's talk about an issue in JavaScript
* Many people feel this is a bug in JavaScript
* Many people feel it is wrong

```js
var c = {
  name: 'The c object',
  log: function() {
    this.name = 'Updated c object';
    console.log(this);

    var setname = function(newname) {
      this.name = newname;
    }
    setname('updated again! the c object');
    console.log(this);
  }
}
```

* When you run it you will see that the function inside the function doesn't output `updated again! the c object`
    - The reason is even though the function inside the object `this` points to the `c` object, the nested function, points to the `Window` object
        + If you open the Global Window object and scroll to the bottom you will see this:

![console log nested function in object](https://i.imgur.com/wTRgHaL.png)

* A lot of people think this is wrong but that is the way JavaScript works in this case and we can't do anything about it

## How can we prevent the `this` keyword from causing an unintended error because of this unexpected behavior with nested functions inside of objects?

### A common pattern to save the day
* Now that we understand pass by reference
    - We set a variable `self` (some people call it `that`)

```
var c = {
  name: 'The c object',
  log: function() {
    var self = this;
    
    this.name = 'Updated c object';
    console.log(this);

    var setname = function(newname) {
      this.name = newname;
    }
    setname('updated again! the c object');
    console.log(this);
  }
}

c.log();
```

* So `self` will be pointing to the same spot in memory as the `this` keyword
* And currently `this` is pointing to the `c` object
* Then we just use `self` everywhere we normally would use `this`

```
var c = {
  name: 'The c object',
  log: function() {
    var self = this;
    
    self.name = 'Updated c object';
    console.log(self);

    var setname = function(newname) {
      self.name = newname;
    }
    setname('updated again! the c object');
    console.log(self);
  }
}

c.log();
```

* Now we don't have to think about, "am I pointing to the right object?"
* `self` is still pointing to the same location in memory as `this` so when I mutate it, it will mutate `c`

```
var setname = function(newname) {
      self.name = newname;
    }
```

* When we get to this part of the code the JavaScript Engine will see `self` and not see it defined in that function
    - It will go to the outer environment and see it was defined there as `this`

### View the output
And now we see what we wanted to see before

![using self for this](https://i.imgur.com/JJfxPYh.png)

### ES6 note
* The `let` keyword is meant to clear some of these problems up
