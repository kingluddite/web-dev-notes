# JavaScript Aside
## ES6 Classes
* A new way to build objects
* It is a new syntactical way but doesn't change anything under the hood
    - That is why it is called "syntatic sugar"

## Syntactic Sugar
A feature that only changes how you type something, but nothing changes under the hood

* It's important to understand what is happening under the hood, so we don't make decisions based on flawed assumptions

## Prototypal Inheritance and Function Constructors
Here is our code we used from before

```js
function Person(firstName, lastName) {

  this.firstName = firstName;
  this.lastName = lastName;

}

Person.prototype.greet = function() {
  console.log(`Hello, ${this.firstName} ${this.lastName}`);
};

const john = new Person('John', 'Doe');
john.greet();
const jane = new Person('Jane', 'Doe');
jane.greet();

console.log(john.__proto__);
console.log(jane.__proto__);
console.log(john.__proto__ === jane.__proto__);
```

* We have a Person function constructor
    - That adds a first and last name
* Then we have add a greet() method onto the prototype down the prototype chain so that all objects created from Person, will have access to `greet()`
* We log out to show that john and jane point to the same prototype object Person
* We log out that they their prototypes are equal to each other

## Update this to use new ES6 classes
* It is a good practice to use `use strict` at the top of your JavaScript
* It helps you avoid silly mistakes

### Example
```js
a = 3;
```

* No error

But

```js
'use strict';

a = 3;
```

* We get an error
* This is how we fix the error

```js
'use strict';

const a = 3;
```

* With the version of Node that we are using we need to add `use strict`

```js
'use strict';

class Person {
  
}
```

* That in itself means it is a constructor
    - Essentially a "creator of objects"
* But it combines these couple of ideas we use in **function constructors** and other ways to create objects and wraps them in simpler syntax

### Adding arguments to Function Constructors
```js
function Person(firstName, lastName) {

  this.firstName = firstName;
  this.lastName = lastName;

}
```

### But how do we do the same thing in ES6 Classes?
```js
'use strict';

class Person {
  constructor() {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
```

* Whenever I use the word `new` the above `constructor` will be called

## How do I add methods to the prototype?
* So that they are available in one spot
* And available all the way down the prototype chain to all objects created from this class

```js
'use strict';

class Person {
  constructor() {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  greet() {
    console.log(`Hello, ${this.firstName} ${this.lastName}`);
  }
}
```

* Anything you add inside the constructor, works like a function constructor and it adds it to each object created
* And any other methods you put inside the class are automatically put on the **prototype**
    - An empty object that's created and placed on down the prototype chain and you can add methods onto the prototype simply by them just existing here within the class
* This is easier and cleaner to set up our event objects
* It works the exact same way
    - `$ node app.js` and you'll see the same output

![class es6](https://i.imgur.com/3xZVbwW.png)

* There is a strong caveat when using this syntax when coming from other languages like C++ or Java
    - You may think classes work the same as those other objects but you would be wrong
    - JavaScript doesn't have true classes
    - Classes are just syntactic sugar and by typing it this way you are separated a little bit from what is really going on
    - You don't even see the context of prototype in the syntax
    - New developers to JavaScript using ES6 classes might never understand the prototype chain and how it works in JavaScript
    - And they might try to bring other concepts and patterns into JavaScript and that just doesn't work
    - Prototypal inheritance is very different that classic class based programming languages 
