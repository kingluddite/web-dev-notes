# Import npm modules
* Loading code we did not write
* 3rd party code

## 3 steps
1. install
2. import
3. use

## validator
* Load this into our app
* [link to validator](https://www.npmjs.com/package/validator)
* Shut down webpack first
* We use `yarn` instead of `npm` so the syntax in the terminal changes slightly

`$ yarn add validator`

* Do we use default or named exports?
* The documentation should tell you
* You should use the ES6 format
* No relative path for importing 3rd party modules, the name points to a place inside `node_modules` and when webpack sees no relative path, it knows to look in the same named folder inside `node_modules`

`app.js`

`import validator from 'validator';`

## isEmail
* We will be using this
* Checks string and returns true if email and false if not

`app.js`

* Delete all existing code and replace with:

```js
import validator from 'validator';

console.log(validator.isEmail('test'));
```

* Will output `false`
* Change to a valid email and it will return `true`
* The output in webpack will show you the bundle.js grew in size
    - Webpack hides 65 hidden modules that are needed for the 3rd party modules to work
    - It hides them because if it showed them all the terminal window would be useless as it would be stuffed with thousands of lines of verbose output
    - If you comment out the import of validator, webpack won't load it and our app gets smaller

## Install React and ReactDOM
`$ yarn add react react-dom`

### Search for it on npm
* [react-dom documenatation](https://www.npmjs.com/package/react-dom)
    - Here npm only shows you how to require it using node
    - But it doesn't have ES6 import syntax
    - Do we import named or default export?
    - [This documentation](https://reactjs.org/docs/react-dom.html) is better and shows ES6 imports

`import ReactDOM from 'react-dom'` 

* And here is [react documentation](https://reactjs.org/docs/react-api.html)

`import React from 'react'`

* Both are using a default exports

`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
// import validator from 'validator';

const template = <p>testing react and react dom</p>;

ReactDOM.render(template, document.getElementById('app'));
```

* We get an error
* Because we did not transpile our ES6 code to ES5 since we no longer are using babel-cli

## Temp fix
```
import React from 'react';
import ReactDOM from 'react-dom';
// import validator from 'validator';

// const template = <p>testing react and react dom</p>;
const template = React.createElement(
  'p',
  {},
  'testing if react and react dom work'
);

ReactDOM.render(template, document.getElementById('app'));
```

* And now it works

## Next - Set up JSX support in Webpack
