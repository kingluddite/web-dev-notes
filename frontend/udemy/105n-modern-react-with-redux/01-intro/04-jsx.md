# JSX
`index.html`

```html
<!DOCTYPE html>
<html>
  <head>
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

`src/index.js`

```
import React from 'react';
import { Component } from 'react';

export default class App extends Component {
  render() {
    return <div>Hello from JSX</div>;
  }
}
```

## Start from scratch
* Delete `src` folder
* Create `src` and `index.js` inside of it
* Refresh page
* Now are home page is blank but we have all the boilerplate code that is ready to take any code we write, bundle it up and server it on our local server
* No errors inside Chrome console

## What is React?
* `React` is a JavaScript library that is used to produce HTML that is shown to the user in a web browser
* So when we write React code we are writing individual Components or **views*

## What are Components in React?
* Components are snippets of code that produce HTML
* So when you think Components, think View or think something that produces HTML
* When we write `React` we write multiple **React Components** and we `nest` these Components together in different fashions to make complex applications relatively simple
* A Components is a collection of JavaScript functions that produce HTML

## Write a Component
`index.js`

```js
// Create a new Component. This Component should produce some HTML

// Take this Component's generated HTML and put it on the page (inside the DOM)
```

## JSX
```
// Create a new Component. This Component should produce some HTML
const App = function () {
  return <div>Hello</div>;
}
// Take this Component's generated HTML and put it on the page (inside the DOM)
```

## View in browser
* Nothing there yet

### "render"
* Place this components's HTML onto the page
* JSX gets turned into HTML which gets rendered to the page via the DOM

## Why do we need JSX?
* Why not just write JavaScript?
  - JSX makes coding easier
  - Below you will see what we would have to type out if we did not have JSX
* Paste your code in the [left of this page](https://babeljs.io/repl/#) and you'll see this output on the write:

### Did you know? What is repl?
* [source](https://stackoverflow.com/questions/13603021/what-is-a-repl-in-javascript)
* A **Read-Eval-Print Loop** (REPL) is an interactive interpreter to a programming language
* It originated with LISP systems, but many other languages (Python, Ruby, Haskell, Tcl, etc.) use REPL's to manage interactive sessions
* They allow for simple experimentation with a language by bypassing the compile stage of the "code -> compile -> execute" cycle

### There are 4 components to a REPL (named in LISP notation):
1. A read function, which reads input from the keyboard
2. An eval function, which evaluates code passed to it
3. A print function, which formats and displays results
4. A loop function, which runs the three previous commands until termination

```
"use strict";

var App = function App() {
  return React.createElement(
    "div",
    null,
    "Hello"
  );
};
```

* But as our JSX gets more complex like this:

```
const App = function () {
  return <ol>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ol>;
}
```

* Gives you this output:

```
"use strict";

var App = function App() {
  return React.createElement(
    "ol",
    null,
    React.createElement(
      "li",
      null,
      "1"
    ),
    React.createElement(
      "li",
      null,
      "2"
    ),
    React.createElement(
      "li",
      null,
      "3"
    )
  );
};
```

* So we need JSX to keep things simple
* We just write our HTML and `babel` will take care of writing the complicated JavaScript code in the background


