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

* Delete `src` and create `src` and `index.js` inside of it

Now are page is blank but we have all the boilerplate code that is ready to take any code we write, bundle it up and server it on our local server

## What is React?
React is a JavaScript library that is used to produce HTML that is shown to the user in a browser. So when we write React code we are writing individual Components or **views** 

Components are snippets of code that produce HTML. So when you think Components or View, think something that produces HTML

When we write React we write multiple React Components and we nest these Components together in different fashions to make complex applications relatively simple

A Components is a collection of JavaScript functions that produce HTML

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
Nothing there yet

## Why do we need JSX
Paste your code in the [left of this page](https://babeljs.io/repl/#) and you'll see this output on the write:

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

But as our JSX gets more complex like this:

```
const App = function () {
  return <ol>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ol>;
}
```

Gives you this output:

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

So we need JSX to keep things simple. We just write our HTML and babel will take care of writing the complicated JavaScript code in the background


