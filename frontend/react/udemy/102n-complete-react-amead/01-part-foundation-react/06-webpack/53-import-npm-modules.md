# Import npm modules
* Loading code we did not write
* 3rd party code

## 3 steps
1. install
2. import
3. use

## install 3rd party npm module - validator
* Load this into our app
* [link to validator](https://www.npmjs.com/package/validator)
* Shut down webpack first
* We use `yarn` instead of `npm` so the syntax in the terminal changes slightly

`$ yarn add validator` or `$ npm i validator`

### Do we use `default` or `named` exports?
* The documentation should tell you

### ES6 or not to ES6
* You will get code examples in the 3rd party documentation
* It may offer no ES6 like:

```
var validator = require('validator');
 
validator.isEmail('foo@bar.com'); //=> true
```

## require vs import
* `require` is used in Node while `import` can be used in both (you need some special configuration to use it in Node at the moment)
* They both provide the same functionality though which is to import modules

### But you should use the ES6 format
```
import validator from 'validator';
```

* You can also just import a subset of the library

```
import isEmail from 'validator/lib/isEmail';
```

### No relative path for importing 3rd party modules
* Why are we not starting the path with a relative `./something`?
* The name points to a place inside `node_modules` and when webpack sees no relative path, it knows to look in the same named folder inside `node_modules`

`app.js`

`import validator from 'validator';`

## Read the docs
* You will see all you can do with this package
* We will use `isEmail`

## isEmail
* We will be using this
* Checks string and returns `true` if email and `false` if not

### Let's try it out
* Let's check if the string `test` is an email
* Our expectation is that the result is `false` since `test` is obviously not an email


`app.js`

```
import validator from 'validator';
// import subtract, { square, add } from './utils.js';
import isSenior, { isAdult, canDrink } from './person';

console.log(validator.isEmail('test'));
console.log('app.js is running');

// MORE CODE
```

* Will output `false`
* Change to a **valid email** and it will return `true`

```
import validator from 'validator';
// import subtract, { square, add } from './utils.js';
import isSenior, { isAdult, canDrink } from './person';

console.log(validator.isEmail('test@gmail.com'));
console.log('app.js is running');

// MORE CODE
```

## Observe how bundle.js changed
* The output in webpack will show you the **bundle.js** grew in size
    - Webpack hides 65 hidden modules that are needed for the 3rd party modules to work
    - It hides them because if it showed them all the terminal window would be useless as it would be stuffed with thousands of lines of verbose output
    - If you comment out the import of validator, webpack won't load it and our app gets smaller
      + This is a great benefit of Webpack! It only uses what we use

## Install React and ReactDOM
`$ yarn add react react-dom` or `$ npm i react react-dom`

* react-dom will enable us to render our components to the browser
* Using this will help us replace the `script` tags pointing to react and react-dom earlier

### Run webpack
`$ npm run build`

* **note** Our file size has not increased because although we installed the modules we have not imported them

### We need to research what format our modules will use
* Here will see that sometimes the docs are not as helpful as we would like
* Best way to know for sure is to google examples and see how the files were imported

### Search for it on npm
* [react-dom documenatation](https://www.npmjs.com/package/react-dom)
    - Here npm only shows you how to require it using node
    - But it doesn't have ES6 import syntax
    - Do we import named or default export?

## Reactjs documentation is better in this case
* [This documentation](https://reactjs.org/docs/react-dom.html) is better and shows ES6 imports

`import ReactDOM from 'react-dom'` 

* And here is [react documentation](https://reactjs.org/docs/react-api.html)

`import React from 'react'`

* Both are using a default exports

## Install -> Import > Use

`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
// import validator from 'validator';

const template = <p>testing react and react dom</p>;

ReactDOM.render(template, document.getElementById('app'));
```

* **note** Make sure the JSX is not a string or you won't get an error and the string will just be rendered to the page

## Houston we have a problem
* We did not transpile our ES6 code to ES5 since we no longer are using `babel-cli`
* So we get this error:

```
ERROR in ./src/app.js 4:17
Module parse failed: Unexpected token (4:17)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| import ReactDOM from 'react-dom';
|
> const template = <p>Hello from React</p>;
```

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
* We just used React to do what it does behind the scenes but babel was doing this before and it was saving us lots of time
* How can we get babel back or how can we get JSX support inside Webpack?

## Next - Set up JSX support in Webpack
