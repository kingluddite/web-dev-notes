# ES6 Object Destructuring
* In playground folder create `destructuring.js`

`webpack.config.js`

* Don't forget to point webpack dev server to this sample file

```
const path = require('path');

module.exports = {
  entry: './src/playground/destructuring.js',
// MORE CODE
```

`src/playground/destructuring.js`

```
console.log('destructuring');
```

`$ yarn run dev-server`

* Will output `destructuring` in console

```
const person = {
  name: 'John',
  age: 46,
  location: {
    city: 'LA',
    temp: 70,
  },
};

console.log(`${person.name} is ${person.age}.`);
```

* outputs
    - `John is 46`

## Object Destructuring
* Let's us take an object and rip it apart
* We can **pull off** various properties and put them in their own variables
* So we don't have to use person.name or person.age we could just use `name` and `age`

### One option
```
const person = {
  name: 'John',
  age: 46,
  location: {
    city: 'LA',
    temp: 70,
  },
};

const name = person.name;
const age = person.age;

console.log(`${name} is ${age}.`);
```

* That doesn't scale well
* We have to do that one time for each name we are trying to **pull off**

## We can do this in one line!
* Using ES6 destructuring

```
const person = {
  name: 'John',
  age: 46,
  location: {
    city: 'LA',
    temp: 70,
  },
};

const { name, age } = person;

// const name = person.name;
// const age = person.age;

console.log(`${name} is ${age}.`);
```

* That one line creates 2 variables
* And it **pulls off** those values from the person object

## A more complex example of destructuring
```
console.log(`It's ${person.location.temp} in ${person.location.city}.`);
```

* Will output:

`It's 70 in LA.`

* We could add logic:

```
if (person.location.city && person.location.temp) {
  console.log(`It's ${person.location.temp} in ${person.location.city}.`);
}
```

* The problem above exposes a common problem
* I am trying to pull off the same complex data several times

## Destructure off a nested object
```
const { city, temp } = person.location;
if (city && temp) {
  console.log(`It's ${temp} in ${city}.`);
}
```

### Ability to rename variable you create
```
console.log(`${name} is ${age}.`);

const { city, temp: temperature } = person.location;
if (city && temperature) {
  console.log(`It's ${temperature} in ${city}.`);
}
```

* **note** You would get an error if you tried to access `temp`

```
console.log(`${name} is ${age}.`);

const { city, temp: temperature } = person.location;
if (city && temperature) {
  console.log(`It's ${temp} in ${city}.`);
}
```

## Setup default values
* What if you didn't have a name in your object?

```
const person = {
  age: 46,
  location: {
    city: 'LA',
    temp: 70,
  },
};

const { name, age } = person;

// const name = person.name;
// const age = person.age;

console.log(`${name} is ${age}.`);

const { city, temp: temperature } = person.location;
if (city && temperature) {
  console.log(`It's ${temperature} in ${city}.`);
}
```

* You would get `undefined is 46`

### You can establish defaults when using destructuring
```
const person = {
  age: 46,
  location: {
    city: 'LA',
    temp: 70,
  },
};

const { name = 'Anonymous', age } = person;

// const name = person.name;
// const age = person.age;

console.log(`${name} is ${age}.`);

const { city, temp: temperature } = person.location;
if (city && temperature) {
  console.log(`It's ${temperature} in ${city}.`);
}
```

* Will output `Anonymous is 46`
* But if we have a name in our object

```
const person = {
  name: 'Bob',
  age: 46,
  location: {
    city: 'LA',
    temp: 70,
  },
};

const { name = 'Anonymous', age } = person;

// const name = person.name;
// const age = person.age;

console.log(`${name} is ${age}.`);

const { city, temp: temperature } = person.location;
if (city && temperature) {
  console.log(`It's ${temperature} in ${city}.`);
}
```

* Will output `Bob is 46`

## Combine default name and rename
```
const person = {
  name: 'Bob',
  age: 46,
  location: {
    city: 'LA',
    temp: 70,
  },
};

const { name: firstName = 'Anonymous', age } = person;

// const name = person.name;
// const age = person.age;

console.log(`${firstName} is ${age}.`);

const { city, temp: temperature } = person.location;
if (city && temperature) {
  console.log(`It's ${temperature} in ${city}.`);
}
```

* Will output `Bob is 46.`

## Challenge
* Use destructuring to get `publisherName` to be a name if it exists and `Self-Published` if it doesn't

```
const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    name: 'Penquin',
  },
};

const { name: publisherName = 'Self-Published' } = book.publisher;
console.log(publisherName);
```

