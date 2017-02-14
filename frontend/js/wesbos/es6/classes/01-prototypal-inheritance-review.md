# Prototypal Inheritance Review
**note**

* contructor functions are Capitalized (no: dog, yes: Dog)

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

const peaches = new Dog('Peaches', 'Jack Russell');
</script>
</body>
</html>
```

Open in browser and in console type: `peaches` and your output will be:

`Dog {name: "Peaches", breed: "Jack Russell"}`

## What is Prototypal Inheritance?
When you put a method on the original constructor it will be inherited by all instances of that constructor

Type this in the inspector

![array and methods](https://i.imgur.com/Ufhp3NS.png)

We have an array and then there are built-in methods to the array. Where did they come from?

Type `Array()` (the mother of all arrays) expand it and look inside the `_proto_` and you will see it has tons of methods.

So when you create an instance of an Array or a Dog, every instance of that constructor inherits all the methods the mamma Array or Dog has inside it

## Add a new method inside our constructor
```js
function Dog(name, breed) {
  this.name = name;
  this.breed = breed;
}
Dog.prototype.bark = function () {
  console.log(`Bark Bark! My name is ${this.name}`);
}

const peaches = new Dog('Peaches', 'Jack Russell');
```

Type `peaches.bark()` inside the console and you will get `Bark Bark! My name is Peaches`

## Create a new instance
`const lucky = new Dog('Lucky', 'Terrier');`

And `lucky.bark()` inside the console will generate `Bark Bark! My name is Lucky`

## Override methods
```js
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
```

Now when you type `peaches.bark()` you will get `Barky Barky! I like cats. My name is Peaches and my breed is Jack Russell`

Append one more method

```js
Dog.prototype.sleep = function() {
  console.log(`ZZZZZZZ`);
}
```

lucky.sleep() will give you `ZZZZZ`

If you type `peaches` you will see `Dog {name: "Peaches", breed: "Jack Russell"}` because those are tied to the instance but not our other methods we added not to the instance but to the prototype





