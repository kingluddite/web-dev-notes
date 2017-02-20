# Classes

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Inheritance Review</title>
</head>
<body>
<script>
function Dog(name, breed) {
  this.name = name;
  this.breed = breed;
}
Dog.prototype.bark = function () {
  console.log(`Bark Bark! My name is ${this.name}`);
}

const peaches = new Dog('Peaches', 'Jack Russell');
const lucky = new Dog('Lucky', 'Terrier');

Dog.prototype.bark = function () {
  console.log(`Barky Barky! I like cats. My name is ${this.name} and my breed is ${this.breed}`);
}

Dog.prototype.sleep = function() {
  console.log(`ZZZZZZZ`);
}
</script>
</body>
</html>
```

Let's convert this into an ES6 class

## Two ways to make a class
1. Class Declaration

```js
class Dog {

}
```

2. Class Expression

```js
const Dog = class {

}
```

Similar to how you can declare a function

```js
function addNumbers() {

}
```

or set a function to an expression

```js
const addNumber = function() {
    
}
```

### Class Declaration

We turn this:

```js
function Dog(name, breed) {
  this.name = name;
  this.breed = breed;
}

Dog.prototype.bark = function () {
  console.log(`Barky Barky! I like cats. My name is ${this.name} and my breed is ${this.breed}`);
};

Dog.prototype.sleep = function() {
  console.log(`ZZZZZZZ`);
};
```

Into this:

```js
class Dog {
  constructor() {
    
  }
}
```

All methods inside a class will be written like the constructor syntax (exactly the same as the object shorthand for methods in ES6)

```js
class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
}
```

All the stuff inside the constructor is what will be created with the instance

**important** Whenever you have methods inside a class do not separate them with commas (It will break if you add them)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Inheritance Review</title>
</head>
<body>
<script>
class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
  bark() {
    console.log(`Bark Bark! My name is ${this.name}`);
  }
  sleep() {
    console.log(`ZZZZZZZ`);
  }
}

const peaches = new Dog('Peaches', 'Jack Russell');
const lucky = new Dog('Lucky', 'Terrier');
</script>
</body>
</html>
```

`peaches.bark()` will output `Bark Bark! My name is Peaches` and `lucky.sleep()` will output `ZZZZZZ`

## Static Method
Array.from() and Array.of() 

Array.from() will create something out of a NodeList or an argument

Array.of() only lives on top of Array

Array.of(1,2,3,4) - creates an Array but that Array is not a method of every single array

What?

In the console if I type `const names = ['tom', 'mike']`

I can not use `names.of()` because it only lives on Array directly and not inherited by all arrays

```js
class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
  bark() {
    console.log(`Bark Bark! My name is ${this.name}`);
  }
  sleep() {
    console.log(`ZZZZZZZ`);
  }
  static info() {
    console.log('Dogs are better than cats!');
  }
}
```

Now you can't use `Dog.bark()` but you can use `Dog.info()` and you will get `Dogs are better than cats!`

I also can use `peaches.bark()` but I can not use `peaches.info()` because peaches is an instance of Dog. You can only use `.info()` if you call it on Dog directly

## Getters and Setters
You can use getters and setters in classes just like you would on Objects

### getter
```js
class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
  bark() {
    console.log(`Bark Bark! My name is ${this.name}`);
  }
  sleep() {
    console.log(`ZZZZZZZ`);
  }
  static info() {
    console.log('Dogs are better than cats!');
  }
  // here is a getter
  get description() {
    return `${this.name} is a ${this.breed} type of dog`;
  }
}
```

Type `peaches.description` and you'll get `"Peaches is a Jack Russell type of dog"`

**note** getters are not method it is like a property that gets computed when you call on it

### setters
```js
class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
  bark() {
    console.log(`Bark Bark! My name is ${this.name}`);
  }
  sleep() {
    console.log(`ZZZZZZZ`);
  }
  static info() {
    console.log('Dogs are better than cats!');
  }
  get description() {
    return `${this.name} is a ${this.breed} type of dog`;
  }
  // here is the setter
  set nicknames(value) {
    this.nick = value.trim();
  }
}
```

**note** - we have to use `nick` because we can't also use `nicknames` as it was already used

type `peaches.nicknames = '     peachyweechie     '` and it will return what we typed but we need to add a getter

```js
set nicknames(value) {
  this.nick = value.trim();
}
get nicknames() {
  return this.nick.toUpperCase();
}
```

Now type `peaches.nicknames = '     peachyweechie     '` and then `peaches.nicknames` and you will get `"peachyweechie"` without the spaces
