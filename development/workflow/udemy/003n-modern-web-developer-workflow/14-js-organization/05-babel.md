# Babel - Tomorrow's JavaScript Today!
* We will write modern JavaScript and have excellent browser support

## What is Babel?
* W3C - [World Wide Web Consortium](https://www.w3.org/)
* They set the standards for HTML and CSS
    - It is up to each manufacturer to follow those standards
        + Google Chrome
        + Microsoft Explorer/Edge
        + Mozilla Firefox
        + Apple Safari
* W3C also sets standard for DOM - Document Object Model
    - DOM is browsers programmatic model of the page that we can manipulate with JavaScript to add behaviors to our web pages
* But the W3C does NOT set a standard for JavaScript
    - [ECMA International](https://www.ecma-international.org/default.htm) sets the standard for JavaScript

![exhibits](https://i.imgur.com/dVN9jl1.png)

### Exhibit A
`document.getElementById('sampleElement');`

## Javascripty and Browserish
* DOM based
* Web browser's API
* This code is technically written in JavaScript it doesn't look very 'javascripty'
* It feels 'browserish' because all we are doing is interacting the browser's API with the DOM
    - DOM based
    - Web browser's API
* So we can say that this code is based on the W3C DOM standard because the W3C sets the DOM standard

### Exhibit B
```js
for (var i = 0; i < 10; i++) {
    // do stuff
}
```

* A `for loop` to do stuff `10` times
* The `for loop` has nothing specific to do with the browser
* This has to do with the native features and syntax of the JavaScript programming language
* JavaScript is based on the ECMAScript standard
* Smart people work on ECMAScript and its the standard for JavaScript that all web browsers are encouraged to follow and support

## ECMAScript through the years... lot of versions
### ECMAScript 5 (5th edition) - has been around since 2009
* This means web browsers have had plenty of time to adopt and support ES5 (_ECMAScript 5_)
* When we build a website we can safely assume that virtually all of our visitors have full browser support for ES5
* But ECMAScript recently released version 6 ECMAScript 6
(_aka `ECMAScript 2015`_)

### ES6
* ES6 adds lots of new syntax and features
    - classes
    - for/of loops
    - lots more
* But ES6 hasn't been around for a long time so not all web browsers have much support for it yet
    - This is bad

### What should we do?
![options](https://i.imgur.com/7X8V57m.png)

* The answer is we can have the best of both worlds thanks to `Babel`

## What is Babel?
* It is a tool we install on our computer
* We write ES6 code
* Behind the scenes Babel will automatically convert the ES6 code into ES5 code
    - We then server up that converted ES5 code to the browser

### And Everyone wins!

## Install and setup Babel
`$ npm i babel-core babel-loader babel-preset-es2015 -D`

* We need to install 3 packages for Babel
* `babel-loader` will help us integrate Babel with Webpack
* `babel-preset-es2015`

`webpack.config.js`

```js
const path = require('path');

module.exports = {
  entry: './app/assets/js/App.js',
  output: {
    path: path.join(__dirname, './app/temp/js'),
    filename: 'App.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
}
```

* Anytime you make changes to `webpack.config.js` you should restart `$ gulp watch`

## Write ES6 flavored JavaScript 
* Open `Person.js`
* "blueprint for Person objects" as a **class**
    - But JavaScript doesn't have **classes**
    - We refer to the constructor function as a class because the concept of a class is super popular throughout the programming world
        + C++, PHP, Java, C#, Python... All have classes
* JavaScript is different
    - JavaScript doesn't use **Classical Inheritance**
        + Instead JavaScript uses **Prototypal Inheritance**
    - ES6 didn't change this - JavaScript still uses prototypes
    - But ES6 has added some `syntactical sugar` to the language where we can almost trick ourselves into thinking that JavaScript does have classes

* So this code:

`Person.js`

```js
function Person(fullName, color) {
  this.name = fullName;
  this.favColor = color;
  this.greet = function() {
    console.log('Yo ' + this.name + '.' + ' Your favorite color is ' + this.favColor + '.');
  }
}

module.exports = Person;
```

To this:

```js
class Person {
  constructor(fullName, color) {
    this.name = fullName;
    this.favColor = color;

  }

  greet() {
    console.log('Greetings, my name is ' + this.name + '.' + ' My favorite color is ' + this.favColor + '.');
  }
}

module.exports = Person;
```

* `constructor()` - reserved word in JavaScript
    - JavaScript knows to immediately run this code as soon as the object is created
    - We include any parameters inside the constructor's parentheses

## Save your changes
* Check out console and our code is working as it did before
* Benefit of class in JavaScript
    - Makes Inheritance super simple

## Inheritance
* John is an adult and has to pay taxes
* Jane is a child and does not
* How do we add a method to one without affect both?
* `extends` is used to inherit all of the Parent's class's properties and methods

`App.js`

```js
var $ = require('jquery');
var Person = require('./modules/Person');

class Adult extends Person {
  payTaxes() {
    console.log(this.name + ' now owes $0 in taxes');
  }
}

console.log('Webpack Automation test#3');

var john = new Adult('John Doe', 'red');
john.greet();
john.payTaxes();

var jane = new Person('Jane Doe', 'blue');
jane.greet();

$('h2').remove();
```

* Output

```
Webpack Automation test#3
Greetings, my name is John Doe. My favorite color is red.
John Doe now owes $0 in taxes
Greetings, my name is Jane Doe. My favorite color is blue.
```

# ES6 Import/Export Modules
* `require` is not part of the JavaScript language
    - `require` is part of `Node.js`
    - We used `require` because before ES6 there was no native way to import modules
    - But we are now using Babel and we can use ES6

`App.js`

```js
var $ = require('jquery');
// var Person = require('./modules/Person');
import Person from './modules/Person';
// more code
```

## ES6 way of exporting a module
`Person.js`

```js
// more code
// module.exports = Person;
export default Person;
```

* Change Jane's favorite color to `purple` and watch that it still works

## We just did a bunch of hypothetical stuff
* Let's get back to our project
* And write some practical JavaScript
