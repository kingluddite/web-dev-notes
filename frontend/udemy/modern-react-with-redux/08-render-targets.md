# Render Targets
This is a class `App`

This is an instance of the `App` class ------> `<App />`

## General Rule of Thumb
Whenever we are asked to use a Component, just wrap it in JSX tags and you will be good to go

**note** This is JSX `<App />`

## Why do we still have an error?
Look at our comments in `index.js`

Did we do this?
```
// Create a new Component. This Component should produce some HTML
```

Yes we did that with this code:

```
const App = function () {
  return <div>Hello</div>;
}
```

Our other comment says to do this:
`// Take this Component's generated HTML and put it on the page (inside the DOM)`

That's the step we are missing. We need to put our generated HTML on the page inside the DOM

ReactDOM takes a second argument, and this will say 'render some HTML (that is what the first argument does with `<App />`) and stick in into a target element. Inside our `index.html` we have `<div class="container"></div>` and that is our render target for our application. We can access it using `document.querySelector('.container')`

Most React apps you'll see will have a container class of `container` or `main` or `render-target` or it might even be an **id** attribute instead of **class**

This target will be the **root node** of the entire application

`ReactDOM.render(<App />, document.querySelector('.container'));`

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

Change this:

```
const App = function () {
  return <div>Hello</div>;
}
```

to this:

```
const App = () => {
  return <div>Hello</div>;
}
```

* We add a **fat arrow function**
* Nearly identical to what we had before
* Still a function but it is just a different way of declaring a function using new ES6 syntax
* One notable difference between using the **fat arrow** syntax and the keyword `function` syntax is the value of **this** is slightly different

## The fat arrow
Get used to seeing it as you will see it used all over in React

* In React we sometimes need to create several Components inside of a function so it really helps to have a more terse/compact syntax when defining a function

