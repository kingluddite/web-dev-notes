# Render Targets
* This is a class `App`
* This is an instance of the `App` class ------> `<App />`

## General Rule of Thumb
* Whenever we are asked to use a Component, just wrap it in JSX tags and you will be good to go

**note** This is JSX `<App />`

## Why do we still have an error?
* Look at our comments in `index.js`
* Did we do this?

```js
// Create a new Component. This Component should produce some HTML
```

* Yes we did that with this code:

```
const App = function () {
  return <div>Hello</div>;
}
```

* Our other comment says to do this:
```
// Take this Component's generated HTML and put it on the page (inside the DOM)
```

### That's the step we are missing!
`index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/style/style.css">
    <link rel="stylesheet" href="https://cdn.rawgit.com/twbs/bootstrap/48938155eb24b4ccdde09426066869504c6dab3c/dist/css/bootstrap.min.css">
    <script src="https://maps.googleapis.com/maps/api/js"></script>
  </head>
  <body>
    <div class="container"></div>
  </body>
  <script src="/bundle.js"></script>
</html>
```

* We need to put our generated HTML on the page inside the DOM
* `ReactDOM` takes a second argument, and this will say 'render some HTML (that is what the first argument does with `<App />`) and stick in into a target element
* Inside our `index.html` we have `<div class="container"></div>` and that is our render target for our application
* We can access it using `document.querySelector('.container')`
* Most React apps you'll see will have a container class of `container` or `main` or `render-target` or it might even be an **id** attribute instead of **class**
* This `target` will be the **root node** of the entire application
    - As we create our hundreds of React Components they will all be children of this root node

`ReactDOM.render(<App />, document.querySelector('.container'));`

* **Caution** Don't forget the `.` in that class name `querySelector('.container')`

* **note** 
    - You may also see this a lot if an `id` was used instead of a `class`:

`ReactDOM.render(<App />, document.getElementById('container'));`

## Finally, it works!
`index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

// Create a new Component. This Component should produce some HTML
const App = function () {
  return <div>Hello</div>;
}
// Take this Component's generated HTML and put it on the page (inside the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
```

### View in browser
We now see `Hello` on the screen

## ES6 Syntax

`index.js`

* Change this:

```
const App = function () {
  return <div>Hello</div>;
}
```

* to this:

```
const App = () => {
  return <div>Hello</div>;
}
```

* We add a **fat arrow function**
* Nearly identical to what we had before
* Still a function but it is just a different way of declaring a function using new ES6 syntax
* One notable difference between using the **fat arrow** syntax and the keyword `function` syntax is the value of **this** is slightly different inside the function (more on that later!)

## The fat arrow
* Get used to seeing it as you will see it used all over in `React`
* In React we sometimes need to create several Components inside of a function so it really helps to have a more terse/compact syntax when defining a function

