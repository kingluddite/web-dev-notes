# JavaScript Aside
* Object.create
* Prototypes

## Event Emitter
* Is a fundamental building block of the NodeJS JavaScript side of the core

* Every object has a property that we can call
* Every object also has a prototype, which is another object, that it points to as its prototype
    - Which may have different properties
    - And we can still access those properties on that prototype directly

![object and prototype](https://i.imgur.com/PYIjioD.png)

## Prototype has its own prototype
![prototype chain](https://i.imgur.com/JMHNfSY.png)

* And the prototype has its own prototype
* And anywhere down the prototype chain we can access the properties and methods of anywhere along the prototype chain
* This is how JavaScript accomplishes the idea of inheritance

## Many different objects can point to the same object as its prototype
![many object point to same prototype](https://i.imgur.com/ljJakYe.png)

* Allowing it to also have access to the same properties and methods

![other object props and methods](https://i.imgur.com/4tRtjBx.png)

## There are multiple ways to set up the prototype chain
* function constructors
* classes (ES6)
    - class has keyword `extends` that sets up the prototype chain
* one more simple approach JavaScript has to do this

`app.js`

```js
const person = {
  firstName: '',
  lastName: '',
  greet: function() {
    return this.firstName + ' ' + this.lastName;
  }
}
```

* We have our object
* What if we want to use this object as the **base**
    - I want this to be the `prototype` of some other objects that I create
    - Instead of using a function constructor to construct the object I am just using an **Object literal**
* However you want to create the object, in the end, they are just an object
    - There are just different ways of creating them

```js
const person = {
  firstName: '',
  lastName: '',
  greet: function() {
    return this.firstName + ' ' + this.lastName;
  }
}

const john = Object.create(person); // add this line
```

* `john` will hold an empty object whose prototype is this `person` object
    - the `john` object will have access to all person's properties and methods

## Overwrite/block properties/methods
```js
const person = {
  firstName: '',
  lastName: '',
  greet: function() {
    return this.firstName + ' ' + this.lastName;
  }
}

const john = Object.create(person);
john.firstName = 'John'; // add this line
john.lastName = 'Doe'; // add this line
```

* Since we have firstName on john and lastName, we don't have to go further down the prototype chain
* But since greet() isn't on `john`, it will have to go down the prototype chain to find `green()` on the `person` object and find it there

```js
const person = {
  firstName: '',
  lastName: '',
  greet: function() {
    return this.firstName + ' ' + this.lastName;
  }
}

const john = Object.create(person);
john.firstName = 'John';
john.lastName = 'Doe';

const jane = Object.create(person);
jane.firstName = 'Jane';
jane.lastName = 'Doe';
```

* Here I create another object `jane` but it is created from the same `person` object
* Both of these objects will point to `person` as their prototype
    - So they will both share the `greet()` function

```js
console.log(john.greet());
console.log(jane.greet());
```

* Run `$ node app.js`
    - Will output

```
John Doe
Jane Doe
```

* Object.create() is a:
    - simple
    - fast
    - clean way
    - To set up inheritance (_aka the prototype chain aka objects being able to use properties and methods of other objects_)

## Let's look at this visually
![visual prototype chain](https://i.imgur.com/ZLxBJPj.png)

* This concept is fundamental in how the Event Emitter becomes a core piece upon which many other elements inside NodeJS core are constructed

