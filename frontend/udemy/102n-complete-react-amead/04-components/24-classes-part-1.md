## ES6 Classes part 1
`$  babel src/playground/es6-classes-1.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

## Why classes?
* The goal is to reuse code

## Blueprint
* Create a blueprint (class) of skyscraper
* Then use that blueprint to create 100 more skyscrapers
  - Each skyscraper will have same features
  - But some skyscrapers will have unique features
      + i.e. address of building will be different for each

## Car class
* Unique Properties of Car
  - make
  - model
  - vin
* **note** Above are unique to each car

### Car universal properties
* getDescription
    - All car instances have access to this method
    - ie. used Honda Accord Make Model with VIN # XXX
    - This is a method that we'll have access to on all instances of our car

## Let's build a Person class
* Use Capital letter for class name (ie Person)
* When making a new instance of a class we use the `new` keyword this tells JavaScript we want to make a new instance
  - `class` is a reserved word in JavaScript

```
class Person {}
const me = new Person();
console.log(me);
```

* View in browser and you'll see an instance of `Person {}`
  - And we see `{}` which is an empty object
  - We will put things specific to the person instance inside this object
  - Currently the Person instance has no unique attributes but we'll set them up now

## Passing data
```js
class Person {}

const me = new Person('John');
console.log(me);
```

* We passed data (a string `John`) but don't see it?
  - We don't see anything because we're not doing anything with the data

## How can we see it?

### The constructor function
* We need to define the **constructor function** inside the class

#### What is a constructor function?
* The constructor function gets called the moment we create a new instance
    - And it gets called with all of the arguments that get passed in

## Are constructor functions required?
* No
    - But if we don't use it we lose access to the values to the arguments that we are trying to pass into it

### We can't use this syntax inside class definition
* This is how you might think we would define a function
* This is an invalid syntax inside a class definition
* You MUST USE the ES6 method definition syntax (we looked at when exploring arrow functions)

```
class Person {
    constructor: function() {

    }
} 
```

* **note** You must spell `constructor` correctly!
* **IMPORTANT** You HAVE to use the ES6 method definition syntax

```
class Person {
  constructor() {
    console.log('from the Person class');
  }
}

const me = new Person('John');
console.log(me);
```

* Will output `> from the Person class` in the console
  - This happens because when we

1. Create the new instance before we ever log it out
2. We have this function run
3. The function prints `From the Person class`
4. Then down below `console.log(me)` will output `Person` to the client console

## Pass in the arguments
* We will pass in an argument and accept that argument in the constructor
* **note** We could also pass in multiple arguments

```
// MORE CODE

class Person {
  constructor(name) {
    // ?
  }
}

const me = new Person('John');

// MORE CODE
```

## What do we want to do with Name?
* Currently, we are doing nothing with it and there is no data inside of our constructor
* We don't want to customize the Person class as a whole but the individual instance of the Person
  - To do that inside of our class methods we use `this`
    + `this` refers to the class **instance**

```
class Person {
  constructor(name) {
    this.name = name;
  }
}
const me = new Person('John Doe');
console.log(me);
```

* Now we look at the client console and we'll see the Person object with a name property with a "John Doe" value

![class instance attribute](https://i.imgur.com/ecsWQ8x.png)

## Create as many instances of Person as we like
```
class Person {
  constructor(name) {
    this.name = name;
  }
}
const manny = new Person('Manny');
const moe = new Person('Moe');
const jack = new Person('Jack');
console.log(manny);
console.log(moe);
console.log(jack);
```

* Will show you this in the client console

![multiple instances of class](https://i.imgur.com/jbUlYX0.png)

## Customer the Person class
* Not as the class as a whole but the individual instance of the Person
* We so this using `this`
* Inside the class `this` refers to the class instance

## What if you forget to include a constructor argument
* `constructor` arguments are not required
* If you leave off the argument you will get `undefined` if you try to reference it

![undefined no argument passed to class](https://i.imgur.com/xDju5yw.png)

```
// MORE CODE

class Person {
  constructor(name) {
    this.name = name;
  }
}
const manny = new Person();
// MORE CODE
```

## We can set up better defaults
* In the past we didn't have a real way to create function defaults

### The logical || operator workaround
* There were no defaults but to create the effect of defaults you used this syntax

```
// MORE CODE

class Person {
  constructor(name) {
    this.name = name || 'No Name';
  }
}
const manny = new Person();
console.log(manny); // Person { name: "No Name"}
```

## ES6 is better!
* We have access to ES6 classes (we just saw this)
* We also have access to defaults
  - These defaults can be used in:
    + methods
    + classes
    + arrow functions
    + ES5 functions
    + ...basically anywhere that you define an arguments list

## How to set up defaults the ES6 way
```
// MORE CODE

class Person {
  constructor(name = 'No Name', age = 21, collegeGrad = false) {
    // no values use defaults
    this.name = name;
    this.age = age;
    this.collegeGrad = collegeGrad;
  }
}
const manny = new Person();
const moe = new Person('Moe', 22, true);
const jack = new Person('Jack');
console.log(manny); // Person {name: "No Name", age: 21, collegeGrad: false}
console.log(moe); // Person {name: "Moe", age: 22, collegeGrad: true}
console.log(jack); // Person {name: "Jack", age: 21, collegeGrad: false}

// MORE CODE
```

* **note** You can use defaults wherever you like in the arguments and they are not required
  - Below I just use one default

```
// MORE CODE

class Person {
  constructor(name, age = 21, collegeGrad) {
    // no values use defaults
    this.name = name;
    this.age = age;
    this.collegeGrad = collegeGrad;
  }
}
// MORE CODE
```

## What about the things each Person shares?
* Now we'll set up methods to be able to reuse code across every instance of a Person
* Unlike `constructor` which has a specific name and implicitly called when we make a new instance
  - We will define a method inside our class
    + We can name it whatever we want
    + And the function will only run if we explicitly call it

### No commas!
* This is important with ES6 class, you don't separate methods with commas
  - This is bad!

```
class Person {
  constructor(name, age = 21, collegeGrad) {
    // no values use defaults
    this.name = name;
    this.age = age;
    this.collegeGrad = collegeGrad;
  },

  getGreeting() {

  }
}
```

* This is good (no comma separating methods!)

```
class Person {
  constructor(name, age = 21, collegeGrad) {
    // no values use defaults
    this.name = name;
    this.age = age;
    this.collegeGrad = collegeGrad;
  }

  getGreeting() {

  }
}
```

* In our function body let's just return a static string 'Hello World!'

```
class Person {
  constructor(name, age = 21, collegeGrad) {
    // no values use defaults
    this.name = name;
    this.age = age;
    this.collegeGrad = collegeGrad;
  }

  getGreeting() {
    return 'Hello World!';
  }
}
const manny = new Person();

console.log(manny.getGreeting());
```

* **note** The methods are available to us via the individual instances of our class
* Let's call 2 methods

```
class Person {
  constructor(name, age = 21, collegeGrad) {
    // no values use defaults
    this.name = name;
    this.age = age;
    this.collegeGrad = collegeGrad;
  }

  getGreeting() {
    return 'Hello World!';
  }
}
const manny = new Person('John Way');
const moe = new Person();

console.log(manny.getGreeting()); // Hello World!
console.log(moe.getGreeting()); // Hello World!
```

## We can greet individual users with:
* This is better than the static greeting we used above as it is dynamic

```
class Person {
  constructor(name, age = 21, collegeGrad) {
    // no values use defaults
    this.name = name;
    this.age = age;
    this.collegeGrad = collegeGrad;
  }

  getGreeting() {
    return `Hello ${this.name}`;
  }
}
const manny = new Person('John Doe');
const moe = new Person('Jane Doe');

console.log(manny.getGreeting()); // Hello John Doe
console.log(moe.getGreeting()); // Hello Jane Doe
```

* Now all of our instances have access to the `getGreeting()` method

## Template strings will save you time
```
// MORE CODE

  getGreeting() {
    // this is old way with concatenating strings
    // return 'Hi. I am ' + this.name + '!';
    // new 'template strings' way
    return `Hello ${this.name}`;
  }
// MORE CODE
```

* With template strings we have the ability to interpolate values (aka inject) right inside the string

## Challenge
* Set up constructor to take name and age
* default age to 0 (zero)
* add `getDescription()` method - "John Doe is 90 year(s) old."
* Create 2 instances with different names and one with no age argument provided

### Solution
```
class Person {
  constructor(name, age = 0) {
    this.name = name;
    this.age = age;
  }

  getDescription() {
    return `${this.name} is ${this.age} year(s) old`;
  }
}

const mike = new Person('Mike Martini');
mike.getDescription();
```

* That will not render anything to the UI or console
* To log it to the console:

```
class Person {
  constructor(name, age = 0) {
    this.name = name;
    this.age = age;
  }

  getDescription() {
    return `${this.name} is ${this.age} year(s) old`;
  }
}

const mike = new Person('Mike Martini', 44);
console.log(mike.getDescription());
```

## Here is the solution
```
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }

  getDescription() {
    return `${this.name} is ${this.age} year(s) old`;
  }
}

const mike = new Person('Mike Martini', 44);
const michelle = new Person();
console.log(mike.getDescription()); // Mike Martini is 44 year(s) old
console.log(michelle.getDescription()); // Anonymous is 0 year(s) old
```
