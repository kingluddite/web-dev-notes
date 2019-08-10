# Start using React

## Currently
* Everything in the browser is from `index.html`
* But we want to use React to render our application

## Starting with React
* We'll remove all content from `index.html` **body** element
  - Instead of typing the text here:

`index.html`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Indecision App</title>
  </head>
  <body>
  <!-- INSTEAD OF TYPING TEXT HERE -->
  </body>
</html>
```

* We will define a template over in client side JavaScript
  a. We'll define our template
  b. We'll render it inside the `<body>` of our `index.html`

## Install React
* We'll first do this using a CDN
* Using a CDN and script tag we can point to the React Library
* Later we'll use Webpack to load in:
    - React
    - React DOM
    - React Router
    - React Redux
+ All of the above require a ton of configurations
+ We'll skip that for now so we can get React working and see how it works
* We'll start this off by using the traditional script tags but we will improve upon this later

### React CDN
* [link to react](https://reactjs.org/docs/cdn-links.html)

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Indecision App</title>
</head>
<body>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
</body>
</html>
```

## Add in a script tag that points to some JavaScript we'll write

`index.js`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Indecision App</title>
</head>
<body>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script src="/scripts/app.js"></script>
</body>
</html>
```

* Create inside `public` the `scripts` folder and inside that create the `app.js` file
* We'll add a test console log

`public/scripts/app.js`

```
console.log('app.js is loading');
```

## Test it in browser
* Memorize this command on mac to open up the Chrome browser console

`⌘` + `⌥` + `i` (toggles open and close)

* Confirm that there are no path errors in console and you see `app.js is loading`

## Now we will use the console to search for React and ReactDOM
* These are both `global`

![You should check for React and ReactDOM](https://i.imgur.com/MCHGMvh.png)

```
> React
```

```
> ReactDOM
```

* They are both available because of our `script` tags pointing to the CDNs for React and ReactDOM

## JSX
* Stands for "JavaScript XML" and provided to us by React
* This is a cool new way to define our templates and to inject our data into those templates
* **Note** NOT part of core JavaScript language

### JSX similar to other template languages
* SCSS
* LESS

Both are just language extension for CSS
  * Both offer variable support which used to not be available in CSS

### Explore JSX syntax
`app.js`

* We will start using `var` but because we have eslint setup it will update it on save (if you have VScode setup properly) to autoupdate with proper ES6 code (so you will see the `var` turn into a `const`)
* Below is our first JSX expression with no dynamic values injected inside it yet

`app.js`

```
console.log('app.js is loading');

// JSX - JavaScript XML
const template = <p>I am JSX. Nice to meet you</p>;
```

## Now we will render our JSX template using ReactDOM
* Remember we saw this on the client in Chrome browser
* It has one method we'll be using `ReactDOM.render()`
  - This is where we will render our application

### ReactDOM.render()
* Takes 2 arguments

`ReactDOM(THE_JSX_YOU_WANT_TO_RENDER, THE_DOM_ELEMENT_WHERE_YOU_WANT_TO_RENDER_TEMPLATE`

* Where are we going to render our template?

## Create a new `<div id="root"></div>`
* In `public/index.html`

`index.html`

* **Important** To place our new `div` above our existing scripts so the DOM will load this `div` element before we load in our script custom js and React CDNs

```
// MORE CODE
<body>
    <div id="root"></div> <!-- ADD IT HERE -->
    <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
    ></script>
    <script src="scripts/app.js"></script>
  </body>
</html>
```

## Render it
`app.js`

```
console.log('app.js is loading');

// JSX - JavaScript XML
const template = <p>I am JSX. Nice to meet you</p>;

ReactDOM.render(template, document.getElementById('root'));
```

* But we can clean it up with:

`app.js`

```
console.log('app.js is loading');

// JSX - JavaScript XML
const template = <p>I am JSX. Nice to meet you</p>;
const appRoot = document.getElementById('root');
ReactDOM.render(template, appRoot);
```

* View in browser

## Houston we have a problem!
* Chrome or any other browser doesn't know how to deal with JSX
* We need to convert our JSX into old JavaScript that all browsers understand
* Just like we transpile code from `Sass` to CSS we'll also use [Babel](https://babeljs.io) to transpile our JSX into JavaScript

## Babel
* Is a transpiler
* ES6 and ES7... so many new versions of JavaScript, I will just refer to all future JavaScript versions as **JavaScript Next**
* Babel transpiles JavaScript Next to old JavaScript
  - I call it "old JavaScript" but it is really JavaScript ES5 (2015) - 99% browsers support ES5 JavaScript

### Try it out Babel page
1. Using the `babeljs.io` demo
2. Put our JSX code into the left side of "try it out"
3. And see what gets transpiled on the right side
* The browser understands the right side but not the left side

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
* We'll never write out `React` like it is on the right as it would take longer and be unbearably tedious
* `React` was meant to speed up our workflow so that is why we use JSX

```js
var template = React.createElement(
  'p',
  null,
  'This is JSX from app.js'
);
```

## Separations of concerns?
* First hurdle to get over with `JSX` is yes we are making a mashup of `JavaScript` and `HTML` and all previous classes in web told us to separate them
* Forget those rules as `JSX` will grow on you and make development easier

### React.createElement(arg1, arg2, arg3)
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
* We need a better, faster way
* That's what we'll do next

## Next - Getting Babel to work locally
