# The Node Event Emitter Part 2
* [NodeJS event documentation](https://nodejs.org/api/events.html)
* [Node Github](https://github.com/nodejs/node)

`lib/events.js`

`module.exports = EventEmitter;`

* Node code uses its own modual structure when it comes to the JavaScript side of Node
* We'll skip a lot of Emitter code because it has a lot of extra features
* We have an `emit` method

`EventEmitter.prototype.emit = function emit(type) {`

* Which takes a type which is really just a property on this hidden _events object

`events = this._events;`


* handler.call(self) - another way to invoke a function
* If there are more than one, it will use a for loop to loop across the array

`listeners[i].apply(self, args);`

* apply() is another way of invoking a function
* So it is just running functions that is sitting in an array on a property

## .on()
`EventEmitter.prototype.on = EventEmitter.prototype.addListener;`

* It is shorthand for just addListener
* And the addListener function

`EventEmitter.prototype.addListener = function addListener(type, listener) {`

* takes a type and a listener
  - The listern being a function

### Let's use nodes emitter
* delete our `emitter.js`
* I just point to the internal Node Emitter and now it should just work

```js
var Emitter = require('events');

var emtr = new Emitter();

emtr.on('greet', function() {
  console.log('Somewhere, someone said hello.');
});

emtr.on('greet', function() {
  console.log('A greeting occurred!');
});

console.log('Hello');
emtr.emit('greet');
```

* Run the code
* `$ node app.js`

```
Hello
Somewhere, someone said hello.
A greeting occurred!
```

* And it works and we just used the internal Node Event Emitter
* This is a really clean way to respond to things that are happening in my app
* I say manually when the event happens
* And then all the listeners I set up will run

## There is one problem with this trick of the event emitter
* It relies on **magic strings**

## Magic String
* A string that has some special meaning in our code
* This is bad because it makes it easy for a type to cause a bug, and hard for tools to help us find it
* We can make mistakes and our tools like our editor or linter won't be able to help us because it is just a string, it is not a variable so any tool we're using can't alert us with "I don't recognize that variable"
* relying on strings to be the basis of your code can be problematic

### Ways to deal with magic strings
* You don't have to do this but on large apps it is a nice pattern to use

`config.js`

```js
module.exports = {
  events: {
    GREET: 'greet'
  }
};
```

`app.js`

```js
var Emitter = require('events');
var eventConfig = require('./config').events;

var emtr = new Emitter();

emtr.on(eventConfig.GREET, function() {
  console.log('Somewhere, someone said hello.');
});

emtr.on(eventConfig.GREET, function() {
  console.log('A greeting occurred!');
});

console.log('Hello');
emtr.emit(eventConfig.GREET);
```

* It will still work the same way
* But I helped reduced the errors from humans
* And my editors can not help me more

## There are many modules in node
Built in core JavaScript modules that are built on top of the Event Emitter
Understanding how the Event Emitter works not only lets us use it in our apps but also understand many other modules .on and .emit
