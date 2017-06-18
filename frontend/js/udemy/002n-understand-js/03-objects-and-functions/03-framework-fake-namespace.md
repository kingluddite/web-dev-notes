# Framework Aside: Faking Namespaces
## What is a Namespace?
* A container for variables and functions
* Typically to keep variables and functions with the same name separate

## Problem
* JavaScript does NOT have namespaces
* But in JavaScript because of the nature of objects, we don't need namespaces, we can fake it

```
var greet = 'Yo!';
var greet = 'Ello!';

console.log(greet);
```

* When you log you will see `Ello!`

### What happens
* In the creation phase, `greet` is set to undefined
* Then synchronously the lines of code will be run in order
* So greet ends up being `Ello!`

### But what if both these variables were created in two different JavaScript files?
* This would be a problem
* Both are setting values on Global object
* Both would override each other
* Namespaces would help with this
* Each would have its own container

### Solution
* Create an object that will be the `container` for all our properties and methods
* These objects will just act as containers and have not other significance or purpose

```js
var italian = {};
var english = {};

italian.greet = 'Yo!';
english.greet = 'Ello!';

console.log(italian);
```

## Different levels of containing objects
```
var italian = {};
var english = {};

italian.greetings.greet = 'Yo!';
english.greet = 'Ello!';

console.log(italian);
```

* Error - Cannot set property 'greet' of undefined

### WTF? - Why didn't that work?
Remember the `.` is an operator and it is `left associative`

It first looks for a greetings property on `italian` and when it doesn't find it, it is `undefined` and trying pass `undefined` to the next `dot` operator and it can't because it is `undefined` and that isn't an object... so it throws the error

#### To make it work
```
var italian = {};
var english = {};

italian.greetings = {};
italian.greetings.greet = 'Yo!';
english.greet = 'Ello!';

console.log(italian);
```

![nested objects](https://i.imgur.com/b4RWMxk.png)

### Or an alternative way
```
var italian = {
  greetings: {
    basic: 'Yo!'
  }
};
var english = {};

english.greet = 'Ello!';

console.log(italian);
```

* This works because we are created it all at one time
* No chance for generating `undefined` so we don't get an error

### We have contained our:
* Properties
* Methods
* Other Objects

Inside a container object
