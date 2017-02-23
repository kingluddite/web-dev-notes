# Arrow functions `this`

`index.html` (started file)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Arrow Functions</title>
</head>

<body>

  <style>
    .wrap {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: sans-serif;
      font-weight: 100;
      color: white;
    }

    .box {
      background: black url(https://unsplash.it/1500/1500?image=560&blur=0.5) center fixed no-repeat;
      width: 50px;
      height: 50px;
      padding: 50px;
      transition: width 0.2s, height 0.6s;
      position: relative;
    }

    .box.opening {
      width: 500px;
      height: 500px;
    }

    .box h2 {
      position: absolute;
      width: 100%;
      font-size: 100px;
      transform: translateX(-200%);
      transition: all 0.5s;
      top: 0;
    }

    .box p {
      position: absolute;
      width: 100%;
      transform: translateX(200%);
      transition: all 0.5s;
      bottom: 0;
    }

    .box.open>* {
      transform: translateX(0%);
    }
  </style>

  <div class="wrap">
    <div class="box">
      <h2>Wes Bos</h2>
      <p class="social">@wesbos</p>
    </div>
  </div>

  <script>
  </script>

</body>

</html>
```

## Most important - `this` keyword does not get rebound in arrow functions

We will build a two stage animation. First add a class of `opening` (that grows the box) and then add a class of `open` to the box which animate in the words

## console.log() the box
```js
const box = document.querySelector('.box');
console.log(box);
```

## Add regular function call

```js
const box = document.querySelector('.box');
box.addEventListener('click', function() {
  console.log(this);
});
```

Open in browser. Click on box and you'll see `<div class="box">...</div>`

Why?
Good way to look at this.
Look at thing that got called (`addEventListener()`) and then you look at the thing to the left of it (`box`)

But if you swap that function out with an arrow function like this:

```js
const box = document.querySelector('.box');
box.addEventListener('click', () => {
  console.log(this);
});
```

Now click on the box in the browser and you will get `Window`. Why?

Because the value of `this` is not rebound inside an arrow function. It is just inherited from whatever the parent scope is (the parent scope of box is the `Window`)

If you just type `this` in the inspector you will see `Window` because `this` is not being bound to anything

## Lesson learned
You don't want to use the arrow functions everywhere just to save yourself from typing. You need to know the benefits and downsides to using the arrow function

So in our example we DO NOT want to use the arrow function syntax because we want the thing clicked (the `box`) to have an event added to it so we need to use function because it binds to `this`

## Add the `opening` class
```js
const box = document.querySelector('.box');
box.addEventListener('click', function() {
  this.classList.toggle('opening');
});
```

Now click on box and see the box grow. Click it again and it will shrink (`toggle()` will add and remove the `opening` class)

## After a short period of time, also toggle() the `open` class
So we'll use `setTimeout()`

```js
const box = document.querySelector('.box');
box.addEventListener('click', function() {
  this.classList.toggle('opening');
  setTimeout(function() {
    this.classList.toggle('open');
  });
});
```

But if you test, you will get an error that `toggle()` is undefined

Why the error? Time to debug
Since `toggle()` is undefined we will `console.log(classList)`

```js
const box = document.querySelector('.box');
box.addEventListener('click', function() {
  this.classList.toggle('opening');
  setTimeout(function() {
    console.log(this.classList); // add this line
    this.classList.toggle('open');
  });
});
```

That will tell you that `this.classList` is `undefined`. So why is there no classList on the box that was clicked?

Let's `console.log()` our `this` inside our `setTimeout()`

```js
const box = document.querySelector('.box');
box.addEventListener('click', function() {
  this.classList.toggle('opening');
  setTimeout(function() {
    console.log(this); // modify this line
    this.classList.toggle('open');
  });
});
```

We get `Window`. Why?
Because we entered a new function that has not been bound to anything. If it is not bound to anything, it will be bound to the Window. This is a huge pain in the ass.

The way JavaScript developers got around it was using something like:

```js
const box = document.querySelector('.box');
box.addEventListener('click', function() {
  var self = this; // add this line
  this.classList.toggle('opening');
  setTimeout(function() {
    console.log(this);
    self.classList.toggle('open'); // modify this line
  });
});
```

Test and you'll see that it works when you toggle click on the box

Another common naming convention was ` var that = this;`

## Good News
We don't need to do that anymore. We can just make it an arrow function. How is this possible? Because when you have an arrow function it does not change the value of `this`. It inherits the value of `this` from the parent and we don't have to worry about the scope changing

```js
const box = document.querySelector('.box');
box.addEventListener('click', function() {
  this.classList.toggle('opening');
  setTimeout(() => {
    console.log(this);
    this.classList.toggle('open');
  }, 500);
});
```

## Making the animation nicer
Nothing to do with arrow functions. Just for fun.

The problem is when we open it we what to toggle `opening` and `open` but when we close it down we want the opposite

```js
const box = document.querySelector('.box');
box.addEventListener('click', function() {
  let first = 'opening';
  let second = 'open';

  if(this.classList.contains(first)) {
    [first, second] = [second, first];
  }
  this.classList.toggle(first);
  setTimeout(() => {
    console.log(this);
    this.classList.toggle(second);
  }, 500);
});
```

If classList contains `opening` (first) then switch the order. We use `destructuring` to do the following

`[first, second] = [second, first]`

**hot tip** If you want to switch 2 variables with ES6 use the above code.

