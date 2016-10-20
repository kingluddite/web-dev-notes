# OOP JavaScript

[video](https://www.youtube.com/watch?v=O8wwnhdkPE4)

write a class and make copies of it (instantiation)
* you are make a bunch of instances of one thing

## Inheritance patterns
1. classical
2. prototypal

several patterns for instantiation and Inheritance

the classes concept exists in JavaScript
* looks a little different in older JS
* ES6 now has `class` keyword

**note** classes begin with a capital letter
Why?
Because it is a constructor, it is not an actual running module

it is the master module (blueprint) that will create (instantiate) all of our other modules (instances)


## instantiation

this would be our class:

```js
var Person = function() {

}
```

create instances of the Person class with:

```js
var john = new Person();
```

## this

```js
var Person = function(name) {
  // this refers to the object
}

var john = new Person('john');
var bobby = new Person('bobby');
```
this refers to either john or bobby

```js
var Person = function(name) {
  // this refers to the object
  this.name = name;
};

var john = new Person('john');
var bobby = new Person('bobby');

console.log(john.name);
console.log(bobby.name);
```
outputs `john` and `bobby`

when you create a constructor it creates a prototype for you

When you create an object this gets created automatically:

`Person.prototype = {};`
and empty object stored inside the prototype property of the constuctor

## add a method using prototype

```js
var Person = function(name) {
  // this refers to the object
  this.name = name;
};

Person.prototype.sayName = function() {
  console.log('hi my name is ' + this.name);
};

var john = new Person('john');
var bobby = new Person('bobby');

console.log(john.name);
console.log(bobby.name);

john.sayName();
bobby.sayName();
```

outputs 'hi my name is john'
and 'hi my name is bobby'

```js
var Person = function(name) {
  // this refers to the object
  this.name = name;
};

Person.prototype.sayName = function() {
  console.log('hi my name is ' + this.name);
};

Person.prototype.shoutName = function() {
  console.log('hi my name is ' + this.name + '!');
};

var john = new Person('john');
var bobby = new Person('bobby');

console.log(john.name);
console.log(bobby.name);

john.sayName(); 'hi my name is john'
bobby.shoutName(); 'hi my name is bobby!'
```
## Inheritance

we have a Person class
we want to create a Friend class that has some functionality a Person doesn't have

## cool `inherits` function node uses
[link to it](https://github.com/nodejs/node-v0.x-archive/blob/master/lib/util.js#L634-L644)

```js
exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};
```

```js
// pass it 2 args (child, parent)
// this allows our child to inherit all the functionality from our parent
function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

var Person = function(name) {
  // this refers to the object
  this.name = name;
};

Person.prototype.sayName = function() {
  console.log('hi my name is ' + this.name);
};

Person.prototype.shoutName = function() {
  console.log('hi my name is ' + this.name + '!');
};

var john = new Person('john');
var bobby = new Person('bobby');

console.log(john.name);
console.log(bobby.name);

john.sayName(); 'hi my name is john'
bobby.shoutName(); 'hi my name is bobby!'

var Friend = function() {

}

inherits(Friend, Person);
```

```js
/ pass it 2 args (child, parent)
// this allows our child to inherit all the functionality from our parent
function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

var Person = function(name) {
  // this refers to the object
  this.name = name;
};

Person.prototype.sayName = function() {
  console.log('hi my name is ' + this.name);
};

Person.prototype.shoutName = function() {
  console.log('hi my name is ' + this.name + '!');
};

var john = new Person('john');
var bobby = new Person('bobby');

console.log(john.name);
console.log(bobby.name);

john.sayName(); 'hi my name is john'
bobby.shoutName(); 'hi my name is bobby!'

var Friend = function(name) {
  Person.call(this, name);
}

inherits(Friend, Person);

var julia = new Friend('julia');
julia.sayName();
```

```js
var Friend = function(name) {
  // Person.call(this, name);
  // or a clear way would be
  Friend.super_(this, name);
}
```

for sayName looks in child for sayName()
if not there looks to parent for sayName()

## Prototypal Pattern vs Classical OOP in JS

### Prototypal Inheritance

![example of prototypal in console](https://i.imgur.com/6ZiYQgE.png)

```js
var human = {
  species: 'human',
  // ADD THIS
  create: function(name) {
    var instance = Object.create(this);
    instance.name = name;
    return instance;
  },
  saySpecies: function() {
    console.log(this.species);
  },
  sayName: function() {
    console.log(this.name);
  }
};

// the following will make a new Object
// that inherits all of the properties of human
var musician = Object.create(human);
musician.playInstrument = function() {
  console.log('plays...' + this.instrument);
};

var will = Object.create(musician);
will.name = 'Will';
will.instrument = 'drums';
```

even better way

```js
var human = {
  species: 'human',
  create: function(name) {
    var instance = Object.create(this);
    instance.name = name;
    return instance;
  },
  saySpecies: function() {
    console.log(this.species);
  },
  sayName: function() {
    console.log(this.name);
  }
};

var phil = human.create('Phil');

// // the following will make a new Object
// // that inherits all of the properties of human
// var musician = Object.create(human);
// musician.playInstrument = function() {
//   console.log('plays...' + this.instrument);
// };
//
// var will = Object.create(musician);
// will.name = 'Will';
// will.instrument = 'drums';
```

console

```js
> Object.keys({a:1, b:2})
< ["a", "b"]
```

![example](https://i.imgur.com/ZIlxpLp.png)


