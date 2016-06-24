# The `this` keyword

* `this` changes depending on where it is being used
* power but leads to lots of headaches 

The JavaScript interpreter assigns a value to `this` based on where it appears

## 4 ways that `this` takes a value
* in normal function calls
* within methods on objects
* within an object that has been constructed
* a function invoked with `.call`, `.apply`, or 


### `this` working in normal function call

In this example `this` will be under the `global` context
* if we were in a node app things would be quite different

```js
// view in browser
// `this` is global Window object
// normal function call
function helloWorld() {
    console.log('Hello world');
    console.log( this );
}

helloWorld();
```


### Different contexts of this

```js
// when this is called inside an Object, it will represent the Object itself, in this case, Portland
var Portland = {
  bridges: 12,
  airport: 1,
  soccerTeams: 22,
  logNumberOfBridges: function() {
    console.log( 'There are ' + this.bridges + ' bridges in Portland!');
  }
};

// we pull the function out of the Object
function logTeams() {
  console.log( this );
}

// we assign a property of Portland object and give it the value of our logTeams function
Portland.foo = logTeams;

Portland.logNumberOfBridges();

// we call the function using the new property and it will call the function logTeams and in this contect `this` will point to the Object Portland.
Portland.foo();

// We will get undefined when we try this
logTeams(); // because `this` has no context in relation to this.soccerTeams because it does not know about the Portland Object.
```

When you run this you'll see this in the console:

![this in console](https://i.imgur.com/mfcJjUQ.png)

* it shows you when this points to the Portland object and when it points to the global Window Object

## Within an Object that has been constructed

```js
// constructor function
var City = function( name, state) {
  this.name = name || 'Portland';
  this.state = state || 'Oregon';
};

var portland = new City(),
    seattle = new City( 'Seattle', 'Washington' );

console.log( portland );
console.log( seattle );
```

* this is very powerful
* **important**: the `this` here does not correspond to the Constructor function `City` (aka `the City prototype), rather it corresponds to the instance object itself, and that's how you're able to log different values for each instance

```js
// constructor function
var City = function( name, state) {
  this.name = name || 'Portland';
  this.state = state || 'Oregon';
  this.printMyCityAndState = function() {
    console.log( 'My city is ' + this.name + ', and my state is ' + this.state );
  };
};

var portland = new City(),
    seattle = new City( 'Seattle', 'Washington' ),
    salem = new City( 'Salem' ),
    vancouver = new City( 'Vancouver', 'Washington' );

console.log( portland );
console.log( seattle );
console.log( salem );
console.log( vancouver );

portland.printMyCityAndState();
seattle.printMyCityAndState();
salem.printMyCityAndState();
vancouver.printMyCityAndState();
```

Will output this in the console:

![output examples using this](https://i.imgur.com/dvUK1i9.png)
