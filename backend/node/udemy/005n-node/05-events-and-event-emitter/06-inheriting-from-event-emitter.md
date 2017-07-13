# Inheriting From the Event Emitter
## `exports.inherits`
`node/lib/util.js`

`exports.inherits = function(ctor, superCtor) {` (line 957)

* Takes two constructors
    - `ctor` a function constructor upon which you want to add new methods and properties to be available to objects created with it
    - `superCtrol` - where the properties and methods you want to be added on to your objects
* We want to make the prototypes and properties on this constructor `superCtror` available along the prototype chain from objects created with this constructor `ctor`

## Stuff it does
* First it does a bit of error handling
    - It checks to make sure that each of those functions are function constructors
    - And they each have a proper prototype set up
`Object.setPrototypeOf(ctor.prototype, superCtor.prototype);`

* We do that first because if we do it later it will overrite other properties and methods

## Look at it visually
* I have a object with properties and methods that I want to have access to:

![obj with properties and methods](https://i.imgur.com/Q9XATQl.png)

* I have my own object
    - With it's own properties and methods
    - And this is the object I want to give access to these other properties and methods
    - It has `obj1.prop3` and I want to give it access to `obj2.prop1` and `obj2.prop2`

![other other object](https://i.imgur.com/Ss2BeRG.png)

* Node's inherit function does using function contructors and object.create() is it simply places a `prototype` object between the two

![proto inbetween](https://i.imgur.com/0C4vC9U.png)

* It creates a brand new prototype chain

![new prototype chain](https://i.imgur.com/FBik8tX.png)

* It takes the object that we have and says "your prototype that needs to have more features added to it will have its prototype be the thing that you are actually trying to add on"
    - Because of the way the prototype chain works I will then have access to those properties and methods a little ways further down the chain
    - To repeat, it just sets up that middleman object which gives me access down the chain to the other properties and methods that I want
    - So obj1 will now have access to the properties and methods on obj2
        + This is possible because of `object.create()` which creates an empty middle prototype object
    - This of this like a `plug` to plug and connect our two objects down the prototype chain

## Practical Example
* We we use this by inheriting using the Event Emitter

* We will go out and grab two core modules
    - EventEmitter
        + this is a function constructor
    - util
        + We need the `util` library

`app.js`

```js
const EventEmitter = require('events');
const util = require('util');
```

* Then we'll add our own function constuctor
* It will add a single property to any objects created from it

```js
const EventEmitter = require('events');
const util = require('util');

function Greetr() {
  this.greeting = 'Hello world';
}
```

* Then any objects created on Greeter will also have access to any objects created on the prototype property on the EventEmitter
    - Which means any new objects I create from Greetr will also get all the EventEmitter methods and properties

```js
const EventEmitter = require('events');
const util = require('util');

function Greetr() {
  this.greeting = 'Hello world';
}

util.inherits(Greetr, EventEmitter);
```

* And I can still add my own methods and properties at this point

```js
const EventEmitter = require('events');
const util = require('util');

function Greetr() {
  this.greeting = 'Hello world';
}

util.inherits(Greetr, EventEmitter);

Greetr.prototype.greet = function() {
  console.log(this.greeting);
}
```

* I can also tap into the EventEmitter methods and properties
* And my greet() method will log and emit
    - We have access to `emit` because it is coming from the fact that `Greetr` is also an `EventEmitter`

```js
Greetr.prototype.greet = function() {
  console.log(this.greeting);
  this.emit('greet');
}
```

* Now I create my new Greetr object

`const greeter1 = new Greetr();`

* And because greeter1 has access to both Greetr and EventEmitter we can use `.on()`

```js
const EventEmitter = require('events');
const util = require('util');

function Greetr() {
  this.greeting = 'Hello world';
}

util.inherits(Greetr, EventEmitter);

Greetr.prototype.greet = function() {
  console.log(this.greeting);
  this.emit('greet');
}

const greeter1 = new Greetr();

greeter1.on('greet', function() {
  console.log('Someone greeted!');
});

greeter1.greet();
```

* Will output with `$ node app.js`

```
Hello world
Someone greeted!
```

## Review of what just happened in steps
1. We call greet() but it won't be on the Greetr object
2. But it will be on the prototype - `Greetr.prototype.greet`
3. So it will log it - `console.log(this.greeting);`
4. And then emit it - `this.emit('greet');`
5. It won't find the emit method on Greetr (this prototype)
6. But it will find it a couple of steps down the prototype chain because we added the prototype property of EventEmitter
7. We do the same thing with `.on()`
    - It goes down the prototype chain and finds the `.on()` method that is sitting on the `.prototype` property of `EventEmitter`
8. The function I added with `.on()` ran after the event was emitted

## This is the important line
`util.inherits(Greetr, EventEmitter);`

* It gives my Greetr access to all of the events and methods on EventEmitter
    - Just as if I created the object using `new EventEmitter`

## How can I pass data to the event listeners?
* Want to give my function a parameter when the event is emitted
* The Node EventEmitter comes with that feature

```js
Greetr.prototype.greet = function(data) {
  console.log(`${this.greeting}: ${data}`);
  this.emit('greet', data);
}
```

* And I want to pass `data` to all my listeners and all the functions in the array that will be invoked, I just add it after the event name in the emit method, the list of parameters that I want to pass

```js
Greetr.prototype.greet = function(data) {
  console.log(`${this.greeting}: ${data}`);
  this.emit('greet', data);
}
```

* And the emit function will it rolls through all those functions in the array it will pass through our paramters to the function
* So in my listener, I just have to expect it like this:

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

* Will give this output when we run `$ node app.js`

```
Hello world: John
Someone greeted!: John
```

### Let's visualize as we review
* We have an object that is sitting on the prototype property of the EventEmitter function constructor

`EventEmitter.prototype`

* Any objects created from that EventEmitter function constructor will point at this object as their prototype
    - It has some methods on it
    - Some features that we want
        + on()
        + emit()
    - But we don't just want to create an EventEmitter
        + We want to create another object that does more than the Event Emitter does but also does what the EventEmitter does
* So we used `util.inherits`
    - Which lets us take another type of object that does other things you want `Greetr.prototype` and it's prototype property will have as it's prototype the EventEmitters prototype property `EventEmitter.prototype`
    - That sets up our prototype chain
    - So when we create a new greeter1 We get this:

![greeter1 and prototype chain](https://i.imgur.com/ZHrL16u.png)

* greeter1 points to the Greetr prototype object
* and Greetr.prototype points to the EventEmitter prototype object
    - And the Greetr had it's own `greet()` method
    - This sets up our whole Prototype Chain

![prototype chain](https://i.imgur.com/uktVFjD.png)

* This means I can call:
    - greeter1.on()
    - greeter1.emit()
    - greeter1.greet()
* All from my object at the top of the chain `greeter1`

## Important Concept takeaway
* We can create new objects that have a combination of one object and another object
* You will find this all over inside the NodeJS JavaScript core
* Very often the objects will be inheriting from the EventEmitter
* There are many EventEmitters inside NodeJS that you can listen for events, you can emit events but they are actually more than just the EventEmitter by themselves
* Many objects built into Node are a type of EventEmitter
    - They Emit events
    - And you can listen for them and run code when a particular event happens




