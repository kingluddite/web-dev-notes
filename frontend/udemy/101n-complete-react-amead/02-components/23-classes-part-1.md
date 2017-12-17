## ES6 Classes part 1
`$  babel src/playground/es6-classes-1.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

## Why classes
* Create 1 blueprint (class) of skyscraper
* Then use that blueplrint to create 100 more skyscrapers
* Each building will have same features
* But some will have unique features
    - address of building

## Car class
### Unique Properties
* make
* model
* vin

Above are unique to each car

### Universal Properties Methods
* getDescription
    - All car instances have access to this method

## Let's build a Person class
* Use Capital letter for class name
    - No ----> person
    - Yes ----> Person
* When making a new instance of a class we use the `new` keyword this tells JavaScript we want to make a new instance

```js
class Person {}

const me = new Person();
console.log(me);
```

* View in browser and you'll see `Person {}`

## Passing data
```js
class Person {}

const me = new Person('John');
console.log(me);
```

* We passed data (string) but don't see it?
* How can we see it?
    - We need to define the constructor function inside the class
    - The constructor function gets called the moment we create a new instance
        + And it gets called with all of the arguments that get passed in

## Are constructor functions required?
* No
    - But if we don't use it we lose access to the values to the arguments that we are trying to pass into it

### Invalide syntax inside class definition
```js
class Person {
    constructor: function() {

    }
} 
```

* You HAVE to use the ES6 method definition syntax

```js
class Person {
  constructor() {
    console.log('from the Person class');
  }
}

const me = new Person('John');
console.log(me);
```

* Will output `> from the Person class`

## Pass in the arguments
```js
class Person {
  constructor(name) {
    console.log('from the Person class');
  }
}

const me = new Person('John');
console.log(me);
```

## Customer the Person class
* Not as the class as a whole but the individual instance of the Person
* We so this using `this`
* Inside the class `this` refers to the class instance

## Name gets set!
```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

const me = new Person('John');
console.log(me);
```

* Now we see Person instance but now with a `name` of **John**

## Create multiple instances
```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

const me = new Person('John');
console.log(me);

const jane = new Person('Jane');
console.log(jane);
```

* Will output `Person {name: 'John'}` and `Person {name: 'Jane'}jj`

## What if no name is passed to constructor?
```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

const me = new Person('John');
console.log(me);

const other = new Person();
console.log(other);
```

* We get a name and then `Person {name: undefined}`

## Set up better defaults
* In ES5 no real way to create funtion

```js
class Person {
  constructor(name = 'Anonymous') {
    this.name = name;
  }
}

const me = new Person('John');
console.log(me);

const other = new Person();
console.log(other);
```

![output with anony](https://i.imgur.com/jETwVh1.png)

# Methods
* Set up methods that enable us to reuse code on every instance of a person
* `constructor` runs without calling it, the act of creating an instance call the constructor automatically
* But now we will add methods that will only run if we call them
* In objects you separate items with `commas` but not in classes, if you add commas in classes you will get an error
    - Just separate them with spaces

```js
class Person {
  constructor(name = 'Anonymous') {
    this.name = name;
  }

  getGreeting() {
    return 'Hi!';
  }
}

const me = new Person('John');
console.log(me.getGreeting());
const other = new Person();
console.log(other.getGreeting());
```

* That will output `Hi!` twice

```js
getGreeting() {
  return 'Hi, I am ' + this.name;
}
```

* Will return `Hi, I am John` and `Hi, I am Anonymous`

## ES6 Template strings are better
```js
getGreeting() {
  // return 'Hi, I am ' + this.name;
  return `Hi, I am ${this.name}`;
}
```

## Challenge
* Set up constructor to take name and age
* default age to 0 (zero)
* add `getDescription()` method

### Solution
```js
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }

  getGreeting() {
    // return 'Hi, I am ' + this.name;
    return `Hi, I am ${this.name} and I am ${this.age} years old`;
  }

  getDescription() {
    return `I am ${this.age} years old.`;
  }
}

const me = new Person('John', 40);
console.log(me.getGreeting());
console.log(me.getDescription());
const other = new Person();
console.log(other.getGreeting());
console.log(other.getDescription());
```

