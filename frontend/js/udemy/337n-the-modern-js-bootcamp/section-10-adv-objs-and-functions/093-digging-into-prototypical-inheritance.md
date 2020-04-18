# Digging into Prototypical Inheritance
## Stuff we already have in place
* Person Constructor
    - Prototype Property
        + getBio
        + setName

## Create multiple instances
* Person Instance 1
    - firstName: John
    - lastName: Doe
    - age: 22
* Person Instance 2
    - firstName: Jane
    - lastName: Doe
    - age: 32

![visual diagram of prototypal Inheritance](https://i.imgur.com/qWgKREP.png)

## What we don't know is:
* How the Person instances get linked to the Prototypal property

### The [[Prototype]] property
* This is how the instances have access to the prototype property
* This property is for internal use only, you won't see it if you try to access it on the object
* This is what creates the relationship between your intance and the methods you are trying to access on the constructor

![prototype property](https://i.imgur.com/N3AlsJL.png)

* Person Instance
    - firstName: John
    - lastName: Doe
    - age: 33
    - [[Prototype]]

```
const me = new Person('John', 'Doe', 33);
// me.[[prototype]] = Person.prototype

console.log(me.firstName)

const bio = me.getBio()
console.log(bio);

console.log(me.testing)
```

* When we try to access `me.getBio()` we first look at the person instance, if there is no getBio method, then it will look if there is a prototype and go up the prototype chain to see if it get find getBio, it does so it uses it
* Weth `me.testing` it will do the same thing, not find it in the Person instance and then goes up the protypal chain and not find it, and then return `undefined` 

## Back to our person.js code
* **note** If you make changes to our prototype code, those changes will be reflected in the invoked code even after the instances is created

```
const Person = function(firstName, lastName, age, likes = []) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.likes = likes;
};

Person.prototype.getBio = function() {
  let bio = `${this.firstName} is ${this.age}.`;

  this.likes.forEach(function(like) {
    bio += ` ${this.firstName} likes ${like}.`;
  });
  return bio;
};

Person.prototype.setName = function(fullName) {
  const names = fullName.split(' ');
  this.firstName = names[0];
  this.lastName = names[1];
};

const john = new Person('John', 'Doe', 30, ['Teaching', 'Soccer']);
const jane = new Person('Jane', 'Doe', 25);

// We add this chunk of code
Person.prototype.getBio = function() {
  return 'Testing Testing';
};

john.setName('Gary Coleman');
console.log(john.getBio());
console.log(jane.getBio());
```

* You will see this in the terminal

```
Testing Testing
Testing Testing
```

* You see this update even after the person instance was created

## Here JavaScript works differently here then other languages
* In C++ or Java, you do have things copied over as the instance is created
* But this is not the case with JavaScript, JavaScript links to the prototype, and any change made to the prototype will be reflected in every single instance

### Remove the code we just added
* We don't need it and just used it as an example

```
const Person = function(firstName, lastName, age, likes = []) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.likes = likes;
};

Person.prototype.getBio = function() {
  let bio = `${this.firstName} is ${this.age}.`;

  this.likes.forEach(function(like) {
    bio += ` ${this.firstName} likes ${like}.`;
  });
  return bio;
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

## Property shadowing
* Where if a property instance exists on the instance it is going to be used even if it also exists on the prototype

```
const Person = function(firstName, lastName, age, likes = []) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.likes = likes;
};

Person.prototype.getBio = function() {
  let bio = `${this.firstName} is ${this.age}.`;

  this.likes.forEach(function(like) {
    bio += ` ${this.firstName} likes ${like}.`;
  });
  return bio;
};

Person.prototype.setName = function(fullName) {
  const names = fullName.split(' ');
  this.firstName = names[0];
  this.lastName = names[1];
};

const john = new Person('John', 'Doe', 30, ['Teaching', 'Soccer']);
const jane = new Person('Jane', 'Doe', 25);

// add this function
john.getBio = function() {
  return 'This is fake!';
};

john.setName('Gary Coleman');
console.log(john.getBio()); // This is fake!
console.log(jane.getBio());
```

* We first check the instance for `getBio`
    - Does getBio exist on this instance? Yes
        + Use it and no need to go further up the prototypal chain
* Jane is a separate instance of Person
    - Does it have getBio on the instance, no, so it goes up the prototypal chain, finds it and uses getBio

## These 2 pieces of information about prototypal inheritance is rare
* But good to know

## 'John'.toLowerCase()
* How are we able to use dot notation a method on a string when typically this behavior is reserved for objects?
    - The reason is almost everything is an object in JavaScript

## Next - We'll dive into `john'.toLowerCase()` to see how code like that actually works 
