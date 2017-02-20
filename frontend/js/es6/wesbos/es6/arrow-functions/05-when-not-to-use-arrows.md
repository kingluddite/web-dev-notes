# When and when not to use arrow functions

Starting code

`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>When Not to use arrow functions</title>
</head>

<body>
  <style>
    button {
      font-size: 100px;
    }

    .on {
      background: #ffc600;
    }
  </style>
  <button id="pushy">Push Me</button>

  <script>
    // When you really need `this`
    const button = document.querySelector('#pushy');
    button.addEventListener('click', () => {
      this.classList.toggle('on');
    });
  </script>
</body>

</html>
```

View in browser and view inspector and you'll find an error `TypeError: Cannot read property 'toggle' of undefined`

Why undefined? Use `console.log()` to debug and you will see `Window` because the arrow function does not bind to the function object it inherits from it's parent (which is window). 

```js
const button = document.querySelector('#pushy');
button.addEventListener('click', () => {
  console.log(this);
  this.classList.toggle('on');
});
```

You need to use a normal function here

```js
const button = document.querySelector('#pushy');
button.addEventListener('click', function() {
  console.log(this);
  this.classList.toggle('on');
});
```

And now this binds to the button element that was clicked and the function turns the button background yellow when it is clicked

## When you need a method to bind to an Object

```js
// When you need a method to bind to an object
const person = {
  points: 23,
  score: () => {
    this.points++;
  }
}
```

In inspector type `person` and you see the Object returned with points set to the original value of `23`

If you call `person.score();` you'll get `undefined` instead of `23 + 1` (24) Why?

Use `console.log(this)` to debug

```js
const person = {
  points: 23,
  score: () => {
    console.log(this);
    this.points++;
  }
}
```

`person.score()` will return `Window` but if you change it to a normal function

```js
const person = {
  points: 23,
  score: () => {
    console.log(this);
    this.points++;
  }
}
```

And you type `person.score();` twice you will see the second time, the value of `points` increases to `24`

## ES6 improvement
When you have a method on an Object you can just type:

```js
// When you need a method to bind to an object
const person = {
  points: 23,
  score() { // new ES6 way of writing method inside an object
    console.log(this);
    this.points++;
  }
}
```

**note** Above is equivalent to a regular typed out function (and not an arrow function)

## When you need to add a prototype method

```js
// When you need to add a prototype method
class Car {
  constructor(make, color) {
    this.make = make;
    this.color = color;
  }
}

const beemer = new Car('bmw', 'blue');
const subi = new Car('Subaru', 'white');

Car.prototype.summarize = () => {
  return `This car is ${this.make} in the color ${this.color}`;
};
```

When you type `beemer` and `subi` the correct values are returned but when you try to use `beemer.summarize()` or `subi.summaryize()` the dynamic variables defined inside the prototype return `undefined`

```js
Car.prototype.summarize = () => {
  console.log(this);
  return `This car is ${this.make} in the color ${this.color}`;
};
```

Type `beemer.summarize()` and you will see the `Window` is the result of the `console.log(this)`. Once again you have to use the normal typed function in the prototype

```js
Car.prototype.summarize = function() {
  console.log(this);
  return `This car is ${this.make} in the color ${this.color}`;
};
```

And that will give you the proper output

![proper prototype output with this](https://i.imgur.com/Fc5XtUC.png)

## When you need arguments object
* Does not have to do specifically with `this`

```js
// When you need arguments object
const orderChildren = () => {
  const children = Array.from(arguments);
  return children.map((child, i) => {
    return `${child} was child #${i + 1}`;
  })
  console.log(arguments);
}
```

We don't have access to the arguments Object when you use an arrow function

If you run the function and pass it no or many arguments

In console type `orderChildren('manny','mo','jack');` and you will get an error:

`Reference Error: arguments is not defined`

But if you use a regular function

```js
// When you need arguments object
const orderChildren = function() {
  const children = Array.from(arguments);
  return children.map((child, i) => {
    return `${child} was child #${i + 1}`;
  })
  console.log(arguments);
}
```

If you type `orderChildren('manny','mo','jack');` in inspector you will see:

![orderChildren output](https://i.imgur.com/55G7dP0.png)

If you don't need `this` with any of the above examples, feel free to use the arrow function
