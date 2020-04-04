# Setting up the Prototype Object
* We have our constructor function in place which allows us to create our unique object

## Now we want to talk about what makes each instance the same
* This will be a set of methods that are shared amongst all instances of Person

`person.js`

```
const Person = function(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
};

const john = new Person('John', 'Doe', 30);
const jane = new Person('Jane', 'Doe', 25);

john.age = 36;
console.log(john);
console.log(jane);
```

## We are going to set up some "inheritance"
* If you are an instance of "Person" you are going to inherit certain behavior
* There are certain things related to all people and that is what we are going to be defining

### What kind of "inheritance" are we talking about?
#### Prototypal Inheritance
* We will access the prototype `object` in JavaScript and we use this by putting everything we want to share with this instances function
    - **note** We will use a regular function (not an arrow function) because inside these functions we'll also have access to this (and remember that this is not binded inside arrow functions)

#
```
const Person = function(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
};

Person.prototype.getBio = function() {
  return `${this.firstName} is ${this.age}`;
};

const john = new Person('John', 'Doe', 30);
const jane = new Person('Jane', 'Doe', 25);

console.log(john.getBio()); // John is 36
console.log(jane.getBio()); // Jane is 25
```

* By setting up a method on the prototype property of the constructor function we've successfully shared it with all instances so they can access it

## Note - not sharing just function
We could share a property like this:

```
// MORE CODE

Person.prototype.getBio = function() {
  return `${this.firstName} is ${this.age}`;
};
Person.prototype.location = 'Brazil'; // add this line

// MORE CODE
```

* While we can share properties you will almost never use this as they are static and mostly you will only use functions

## Set values with prototype
* We won't just read values but we can set values by taking in arguments
* We'll use the string method `split()`
* [split docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)

### split examples
* Test in client console

```
> '123456789'.split()
< ["123456789"]
> '123456789'.split('')
< (9) ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
> '123456789'.split('5')
< (2) ["1234", "6789"]
```

`person.js`

```
const Person = function(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
};

Person.prototype.getBio = function() {
  return `${this.firstName} is ${this.age}`;
};
Person.prototype.setName = function(fullName) {
  const names = fullName.split(' ');
  this.firstName = names[0];
  this.lastName = names[1];
};

const john = new Person('John', 'Doe', 30);
const jane = new Person('Jane', 'Doe', 25);

john.setName('Gary Coleman');
console.log(john.getBio()); // Gary is 30
console.log(jane.getBio());
```

* See that we overwrote the firstName but not the age

## Add a 4th argument to our constructor function
* This will be an array of `likes`
* We'll set the default value to be an empty array

```
const Person = function(firstName, lastName, age, likes = []) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
};

Person.prototype.getBio = function() {
  return `${this.firstName} is ${this.age}`;
};
Person.prototype.setName = function(fullName) {
  const names = fullName.split(' ');
  this.firstName = names[0];
  this.lastName = names[1];
};

const john = new Person('John', 'Doe', 30, ['Teaching', 'Soccer']);
const jane = new Person('Jane', 'Doe', 25);

john.setName('Gary Coleman');
console.log(john.getBio());
console.log(jane.getBio());
```

## Now we'll use an alternative version of getBio that takes those likes into account

`person.js`

```
// add a default value of an empty array for likes
const Person = function(firstName, lastName, age, likes = []) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.likes = likes; // don't forget to add this!
};

Person.prototype.getBio = function() {
  let bio = `${this.firstName} is ${this.age}.`;

  this.likes.forEach(like => {
    // could also be:
    // bio = bio + ` ${this.firstName} likes ${like}.`;
    bio += ` ${this.firstName} likes ${like}.`; // see when using this and not!
  });
  return bio; // must return it
};

Person.prototype.setName = function(fullName) {
  const names = fullName.split(' ');
  this.firstName = names[0];
  this.lastName = names[1];
};

const john = new Person('John', 'Doe', 30, ['Teaching', 'Soccer']);
const jane = new Person('Jane', 'Doe', 25);

john.setName('Gary Coleman');
console.log(john.getBio());
console.log(jane.getBio());
```

## Question - Why are we able to use the `this` inside of the function passed to forEach?
* Arrow function don't bind a `this` value so in our code:

```
// MORE CODE

Person.prototype.getBio = function() {
  let bio = `${this.firstName} is ${this.age}.`;

  this.likes.forEach(like => {
    // could also be:
    // bio = bio + ` ${this.firstName} likes ${like}.`;
    bio += ` ${this.firstName} likes ${like}.`; // see when using this and not!
  });
  return bio; // must return it
};
// MORE CODE
```

* The `this` inside of the arrow function isn't bound because arrow functions don't bind so the `this` uses whatever `this` value the parent has which will be the `this` value for the instance
    - `this.firstName` would be the instance firstName

## If you used a regular function instead of an arrow function the code would break

```
// MORE CODE

Person.prototype.getBio = function() {
  let bio = `${this.firstName} is ${this.age}.`;

  this.likes.forEach(function(like) {
    bio += ` ${this.firstName} likes ${like}.`;
  });
  return bio;
};

// MORE CODE
```

* You will get broken code:

`Gary is 30. undefined likes Teaching. undefined likes Soccer.`

* See that it is `undefined` because it doesn't know what `this` is referring to because we are inside a function and there is not `this` defined
