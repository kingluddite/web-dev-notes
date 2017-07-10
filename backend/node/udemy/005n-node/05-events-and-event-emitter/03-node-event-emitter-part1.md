# The Node Event Emitter Part 1
* We will build our own Event Emitter
* That will work similarly to the real Node Event Emitter
* To understand how it works

`emitter.js`

* Will enable us to:
    1. Save an event as happened
    2. Respond to the event happening

```

```

* We could construct this several ways
    - Could use an ES6 class
    - Function Constructor (I will build it using this option)
    - Could use Object.create()
* We will use a function constructor and this will enable us to create multiple Emitters that I might want in my Application

## Event Listener
The code that responds to an event

`emitter.js`

```js
function Emitter() {
  this.events = {};
}

Emitter.prototype.on = function(type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
}
```

* In JavaScript case, the listener will be a function
* An event happens and this function will be invoked
* You can have many listeners listening for the same event
    - But all the listeners can be invoked
    - Not all at the same time in JavaScript's case
        + One at a time
* Think of `on` as `upon this event happening... do this`
    - Kind of reads like a sentence when you read the code 
* I want a property and I want it to be an array
    - We'll use a trick that says if the property exists, great, if not, we create a new array
* I will push functions into that array and it will look like this:

```js
{
  gotSomethingFromInternet: [function() {}, function() {}]
}
```

* That's all `on` is doing, pushing functions into the array
* We create a new property on the object, make sure that property is an array and then start adding functions into that array
* That is how I listen

## Now I want to say that something happened
* We'll use `emit`
    - `emit` is a common term
        + Just means "Something Happened"
        + I'm "emitting" and event
        + So that whoever's listening for it can respond

`emitter.js`

```js
function Emitter() {
  this.events = {};
}

Emitter.prototype.on = function(type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
}

Emmiter.prototype.emit = function(type) {
  if (this.events[type]) {
    this.events[type].forEach(function(listener) {
      listener();
    });
  }
}
```

* If I say `emit`
    - I check for file was saved
    - I check for file was saved on the object
    - if it's there it will be an array
        + I loop through to see if there is any functions
        + And if there are functions, I just invoke them
        + That's all I do

## I need to make this available
```js
function Emitter() {
  this.events = {};
}

Emitter.prototype.on = function(type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
}

Emmiter.prototype.emit = function(type) {
  if (this.events[type]) {
    this.events[type].forEach(function(listener) {
      listener();
    });
  }
}

module.exports = Emitter;
```

* So the function constructor will come back from the require function so I can create as many Emitters as I want

## Let's use our Emitter
* Keep your event names short and sweet because they are names of object keys

`app.js`

```js
var Emitter = require('./emitter');

var emtr = new Emitter();

// will run whenever the greet event is emitted
emtr.on('greet', function() {
  console.log('Somewhere, someone said hello.');
});

// we add it to the property which is an array
emtr.on('greet', function() {
  console.log('A greeting occurred!');
});

console.log('Hello');
emtr.emit('greet');
```

* I have two listeners that will respond whenever this event occurs
* I will manually do this
* `$ node app.js`
    - You will see those two functions ran because I emitted `greet`
* We could have a ton of code
* The Event Emitter prevents me from having to run a ton of if this happened do this, if this happened do this...
* Instead I can just listen for my own event
    - I've built my own event emitter
        + Which is really just an object full of arrays of functions
        + But it is a really clean, neat way to control the flow of my code
* The Event Emitter in Node.js follows the same idea

## Review
* Use VS
* Breakpoint line 1
* Step over until `var emtr = new Emitter();`
* Step over again and the object will be in `emtr.on`
* Step into .on()
* And now I'm looking for an event type

![event type](https://i.imgur.com/OgfRhAJ.png)

* type is the word "greet"

![greet type](https://i.imgur.com/G4U0Gz7.png)

* It is a property on the object called "greet"
* Step over to this line:

![next line](https://i.imgur.com/o3dIZFK.png)

* Then inside `this` > events > greet: Array []
    - It is an empty array

![greet array](https://i.imgur.com/tCV7hnL.png)

* Step over again and now I have a function inside the array

![function inside array](https://i.imgur.com/S6dNrnb.png)

* Step over and we'll be taken to the next `.on()`
* Step into that
* I'm giving it another listener
* Step over twice
* And now the greet property has two functions inside the array

![two functions](https://i.imgur.com/trTrwpk.png)

* Step over twice to manually emit the event
    - Saying `this happened`
* Step into it
* Now we're inside the emit

![inside emit](https://i.imgur.com/B04nj41.png)

* Step over
* Step over and it loops over that array calling the function each time

## Can be confusing
* We're taking an object of properties full of arrays of functions and calling it events, but it really isn't events but calling it events helps us think about how we want to use it
* It helps us think in terms of events and listeners and that's what Node.js does
