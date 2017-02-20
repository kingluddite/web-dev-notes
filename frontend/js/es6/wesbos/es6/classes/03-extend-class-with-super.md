# Extending Classes and using `super()`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Extending Classes</title>
</head>
<body>
<script>
class Animal {
  constructor(name) {
    this.name = name;
    this.thirst = 100;
    this.belly = [];
  }
  drink() {
    this.thirst -= 10;
    return this.thirst;
  }
  eat(food) {
    this.belly.push(food);
    return this.belly;
  }
}
</script>
</body>
</html>
```

How do we make a new animal off of that class?

```js
const donkey = new Animal('Donnie');
console.log(donkey); Animal {name: "Donnie", thirst: 100, belly: Array[0]}
```

And to test it out:

```
> donkey.eat('grass')
> donkey.eat('carrots')
> donkey.drink()
> donkey.drink()
> donkey.drink()
```

* As the donkey `eats` it gets added to the `belly` array
* As the donkey `drinks` it losing 10 from the `thirst` property every drink

## What if we add an Animal that has a different action
Like cat. Cat's meow. How can I add that (or extend) on Animal?

What if we did this (traditional way to extend a class)

```js
class Animal {
  constructor(name) {
    this.name = name;
    this.thirst = 100;
    this.belly = [];
  }
  drink() {
    this.thirst -= 10;
    return this.thirst;
  }
  eat(food) {
    this.belly.push(food);
    return this.belly;
  }
}

class Cat extends Animal {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
}

const donkey = new Animal('Donnie');
const missy = new Cat('Missy', 'Wild Cat');
console.log(missy);
```

We will get `ReferenceError: this is not defined`

### Why is `this` not defined?
Shouldn't `this` be bound because it is inside a method.

### `super()` to the rescue
The problem is that when you create a Cat it is in turn extending an Animal so we first need to create an Animal before we create a Cat and we do that with `super()`

```js
class Cat extends Animal {
  constructor(name, breed) {
    super(); // think of this as Animal();
    this.name = name;
    this.breed = breed;
  }
}
```

We will still get an error because `Animal(name)` has a name argument so when we call `super()` we must pass it an argument too like `super(name)`

```js
class Cat extends Animal {
  constructor(name, breed) {
    super();
    // this.name = name; - we don't need this line anymore
    this.breed = breed;
  }
}
```

* Since this.name is set in `Animal`, we don't need to set it again in `Cat` but since `this.breed` is not defined in `Animal` we need to define it in `Cat`

Type `Cat` in console and you'll get:

`Cat {name: "Missy", thirst: 100, belly: Array[0], breed: "Wild Cat"}`

### Examining the Cat class
You will see that Cat extends the Animal class through the `_proto_` 

![Cat extends Animals](https://i.imgur.com/Qo8HMRC.png)

## Add a `meow()` method

```js
class Cat extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  meow() {
    console.log('Meow meow. I\m a cat');
  }
}
```

And if you try `missy.eat('purina cat chow')` it gets added to the `belly` array and if you type `missy.drink()` it gets deducted from the `thirst` property and if yo type `missy.meow()` you will get `Meow meow. Im a cat`

If you went back to the orinal `mamma` class, those change would filter on down to Cat and missy.

Change `Animal's` `this.thirst = 90;` to see how it cascades `Cat` and `missy`

Rule of thumb is try not to go deeper than 3 extends

We can also extend native Classes like `Array`. That is what we will cover next
