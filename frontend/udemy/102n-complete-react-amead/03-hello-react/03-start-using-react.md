# Start using React
`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Indecision App</title>
</head>
<body>
  <script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
  <script src="/scripts/app.js"></script>
</body>
</html>
```

* Make sure it works in browser
* No path errors in console
* Test for both
    - React `> React`
    - ReactDOM `>  ReactDOM`
    - They are both available because of our script tags

## Test if React is running
`/public/scripts/app.js`

```js
console.log('App.js is running');
```

* Test in browser
* View console for log message

## JSX
* Stands for JavaScript XML
* Not part of core JavaScript language
* It is part of React library

`app.js`

```
console.log('App.js is running');

/* JSX - JavaScript XML */
const template = <p>This is JSX from app.js</p>;
const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

* Update our `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Indecision App</title>
</head>
<body>
  <div id="app"></div>
  <script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
  <script src="/scripts/app.js"></script>
</body>
</html>
```

* View in browser

## Houston we have a problem
* Chrome or any other browser doesn't know how to deal with JSX
* We need to convert our JSX into old JavaScript that all browsers understand
* Just like we transpile code from Sass to CSS
* We'll also use [Babel](https://babeljs.io) to transpile our JSX into JavaScript

## Babel
* Is a transpiler
* ES6 and ES7... so many new versions of JavaScript, I will just refer to all future JavaScript versions as **JavaScript Next**
* Babel transpiles JavaScript Next to old JavaScript
  - I call it "old JavaScript" but it is really JavaScript ES5 (2015)) - 99% browsers support ES5 JavaScript

### Try it out Babel page
* Using the babeljs.io demo, put our JSX code into the left side of try it out and see what gets transpiled on the right
* The browser understands the right

```js
'use strict';

console.log('App.js is running');

// JSX - JavaScript XML
var template = React.createElement(
  'p',
  null,
  'This is JSX from app.js'
);
var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

* The browser understands regular function calls
* We'll never write out React like it is on the right as it would take longer and be unbearably tedious
* React was meant to speed up our workflow so that is why we use JSX - It is SOOOO much easier to code

```js
var template = React.createElement(
  'p',
  null,
  'This is JSX from app.js'
);
```

## Separations of concerns?
* First hurdle to get over with JSX is yes we are making a mashup of JavaScript and HTML and all previous classes in web told us to separate them
* Forget those rules as JSX will grow on you and make development so much simpler
* But it does take some time for this format to grow on you
* Fight through it!

* 1st arg - element
* 3rd arg - content
* 2nd arg - attributes

```js
var template = React.createElement(
  'p',
  { id: 'someID' },
  'This is JSX from app.js'
);
```

* The attributes will be an object using `name/value` pairs

## Make our site work using real JavaScript
`app.js`

```js
'use strict';

console.log('App.js is running');

// JSX - JavaScript XML
var template = React.createElement(
  'p',
  { id: 'someID' },
  'This is JSX from app.js'
);
var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

* Now view: `http://127.0.0.1:8080/` and you'll see:

`This is JSX from app.js`

## Houston we have a problem
* Copy and pasting this into the web transpiler is not fun and super inefficient

## Next - Getting Babel to work locally
