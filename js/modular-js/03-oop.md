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
}

var john = new Person('john');
var bobby = new Person('bobby');

console.log(john.name);
console.log(bobby.name);
```

