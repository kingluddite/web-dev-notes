# JSX Fun

## Add syntax for JSX
* Add Syntax JSX syntax highlighting to VS Code `Babel ES6/ES7`
* After a successful install you should see `Javascript (Babel)` in the bottom of VS Code

![babel syntax](https://i.imgur.com/8brC5bK.png)

## Is your app running?
* Make sure two terminal tabs are open with babel running and live-server

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react`

`$ live-reload public`

## Alter our JSX to create a more complex expression

```
console.log('App.js is running');

// JSX - JavaScript XML
const template = <h1>Indecision App</h1><p>this is a test</p>
const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

### Houston we have a problem
* You will see we have an error in the browser
  - **note** Actually you won't see an error in your browser because you are using eslint and it is capturing the error and not transpiling the code with babel - If you were not using babel, you would see a sibling JSX error
  - eslint will tell you this error `SyntaxError: src/app.js: Adjacent JSX elements must be wrapped in an enclosing tag` and give you a line number which greatly helps with debugging code

#### Why?
* You have to have two sibling nodes

### Solution - One Parent
* We change the code to only have one parent and then the error goes away in eslint and then babel recompiles our JSX into JavaScript
* **wrapping parentheses** - Very useful to help your code look easier to read and more organized - prettier really speeds this process up because it autoindents our code!

```
console.log('App.js is running');

// JSX - JavaScript XML
const template = (
  <div>
    <h1>Indecision App</h1>
    <p>this is a test</p>
  </div>
);
const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

* We wrap the elements in one parent `div` and all is good!

## The wrapper div
* All our elements will be inside the single `wrapper` **<div></div>**

## Complex code
```
console.log('App.js is running');

// JSX - JavaScript XML
const template = (
  <div>
    <h1>Indecision App</h1>
    <p>this is a test</p>
    <ul>
      <li>one</li>
      <li>two</li>
      <li>three</li>
    </ul>
  </div>
);
const appRoot = document.getElementById('root');

ReactDOM.render(template, appRoot);
```

* If you view `scripts/app.js` you'll see how `babel` translates it all

`publice/scripts/app.js`

```
console.log('App.js is running');

// JSX - JavaScript XML
let template = React.createElement(
  'div',
  null,
  React.createElement('h1', null, 'Indecision App'),
  React.createElement('p', null, 'this is a test'),
  React.createElement(
    'ul',
    null,
    React.createElement('li', null, 'one'),
    React.createElement('li', null, 'two'),
    React.createElement('li', null, 'three')
  )
);
let appRoot = document.getElementById('root');

ReactDOM.render(template, appRoot);
```

* Now you see why just writing JSX saves us from writing out all that crazy JavaScript

## Challenge
* Create a `templateTwo` var JSX expression with:

```
A root div (root wrapper)
  h1 --> your name
  p ---> age
  p ---> location
render `templateTwo` instead of template
```

## Challenge Solution
```
const templateTwo = (
  <div>
    <h1>John Doe</h1>
    <p>Age: 21</p>
    <p>Location: LA</p>
  </div>
);

const appRoot = document.getElementById('root');
ReactDOM.render(templateTwo, appRoot);
```

## View in browser
* You should see your name, age and location rendered to the browser

## Tip - Install Path Intellisense
* Visual Studio Code plugin that autocompletes filenames
