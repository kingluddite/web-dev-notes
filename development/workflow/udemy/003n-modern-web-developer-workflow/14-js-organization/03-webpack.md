# Webpack
## Install Webpack globally
* We will remove this but for now let's use it globally

`$ npm i webpack -g`

## Create the webpack config file
* It is placed in the root of your project
* It is named `webpack.config.js`
* This is the config file for webpack
* It needs to be named this
* We'll create a `object` that tells webpack what to do

`webpack.config.js`

```js
const path = require('path');

module.exports = {
  entry: './app/assets/js/App.js',
  output: {
    path: path.join(__dirname, './app/temp/js'),
    filename: 'App.js'
  }
}
```

* `entry` - Points to were our entry point is
* `output` 
    - `path` - Where will `webpack` put our finished files
    - `filename` - What do we want the output file to be named

## Run `webpack`
`$ webpack`

* When we run this, webpack will automatically know to look for `webpack.config.js` and then it will read our settings
* After running you will see the bundled file created inside `/app/temp/js/App.js`

## Update `index.html` to include `App.js`

```html
  <script src="/temp/js/App.js"></script>
</body>
</html>
```

* Run gulp watch

`$ gulp watch`

* Check console
* We get an **error** `Person is not a constructor`

### Troubleshooting
* If you are having issues make sure you have created `app/assets/js/modules/Person.js` and inside this file is should look like this:

`Person.js`

```js
function Person(fullName, color) {
  this.name = fullName;
  this.favColor = color;
  this.greet = function() {
    console.log(
      'Yo ' + this.name + '.' + ' Your favorite color is ' + this.favColor + '.'
    );
  };
}
```

* Then make sure this is inside `app/assets/js/App.js`

`App.js`

```js
var Person = require('./modules/Person');

var john = new Person('John Doe', 'red');
john.greet();
console.log(john);

var jane = new Person('Jane Doe', 'green');
jane.greet();
```

* And make sure you have this at the bottom of `index.html`

```html
<!-- more code -->
<script src="assets/js/global.js"></script>
<script src="assets/js/home.js"></script>
<!-- <script src="/assets/js/App.js"></script> -->
<script src="/temp/js/App.js"></script>
</body>

</html>
```

* Stop gulp with `cntrl` + `c`
* Run webpack with `$ webpack`
* Run gulp watch with `$ gulp watch`

Then you should see this error

![Person constructor error](https://i.imgur.com/QRnMpj2.png)

## We have to export `Person.js`
* `module.exports`
* We need to spell out exactly what this file should export or return when another file tries to require it

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

* Run webpack

`$ webpack`

* Refresh browser
* Now we see our `Person` object the console

![Person in console with webpack](https://i.imgur.com/HUKNFNE.png)

## Let's analyze what `module.exports` is doing under the hood
* We can demystify it
* Understand how it works

```js
function Person(fullName, color) {
  this.name = fullName;
  this.favColor = color;
  this.greet = function() {
    console.log('Yo ' + this.name + '.' + ' Your favorite color is ' + this.favColor + '.');
  }
}

console.log('Hello from Person.js');

module.exports = Person;
```

* Comment out some code

`App.js`

```js
var Person = require('./modules/Person');

// var john = new Person('John Doe', 'red');
// john.greet();
// console.log(john);

// var jane = new Person('Jane Doe', 'green');
// jane.greet();
```

## Run webpack
* `$ webpack`

## Immediate code execution
* Refresh browser
* Check console
* You will see `Hello from Person.js`

## Lesson Learned: What we can glean from this
* When you require a file, the code from that imported file is immediately executed
* Otherwise we wouldn't see the log statement in the console

## We want to do more than immediately execute required code
* But we want to do more then immediately run the `Person` modular code
* We want to also export and expose certain parts of that `Person` file
* And make those parts accessible or callable from witin our main `App.js`

## What is being stored inside the Person variable that we set to be the `require` call?
`App.js`

```js
var Person = require('./modules/Person');

console.log(Person);
```

## Run webpack again 
`$ webpack`

* Refresh browser
* You will see we log out an empty object

![empty object](https://i.imgur.com/72NRyEY.png)

* We have an empty object

## How can we add something to that object?
* How can we make our Person variable contain something that we can use?

`Person.js`

```js
function Person(fullName, color) {
  this.name = fullName;
  this.favColor = color;
  this.greet = function() {
    console.log('Yo ' + this.name + '.' + ' Your favorite color is ' + this.favColor + '.');
  }
}

console.log('Hello from Person.js');

exports.sampleProperty = "I am a test property. I come in Peace.";
exports.sampleFunction = function() {
  console.log('I am a function that does nothing but log');
}
// module.exports = Person;
```

## Run `webpack` to bundle up our files again
`$ webpack`

* Refresh the browser
* You will see we have now populated our `Person` object with a **property** and **method**

![Person object populated](https://i.imgur.com/dx3qIMJ.png)

* Now inside `App.js` we can use that object to do something
    - We will log out the property
    - We will run our method

`App.js`

```js
var Person = require('./modules/Person');

console.log(Person.sampleProperty);
Person.sampleFunction();
```

## Run webpack
`$ webpack`

* Refresh browser and you will see:

```
Hello from Person.js
I am a test property. I come in Peace.
I am a function that does nothing but log
```

* We now know how export (_aka expose_) different `properties` and `methods` from a module file
* We don't need to export multiple things
    - We just need to export the one **constructor function**
* We don't want the exports object to contain this constructor function
    - We want the exports object to be the constructor function

## The `exports` module's parent is `module`
* `module.exports`
* `module.exports = Person` (_our constructor function_)

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

`App.js`

```js
var Person = require('./modules/Person');

var john = new Person('John Doe', 'red');
john.greet();
console.log(john);

var jane = new Person('Jane Doe', 'green');
jane.greet();
```

## Run webpack 
`$ webpack`

* Refresh browser
* You will see the console filled with:

![console](https://i.imgur.com/ZfPmvas.png)

## Congrats!
* You just created your first module
* And you used that module from within another file

## Why is Webpack amazing?
* We can use it to require in module files that we create
* We can also use `webpack` to require in and bundle 3rd party packages from **npm**

## Proof of concept
### We will add jQuery with Webpack
* We'll test that it is working (_proof of concept_) by removing all `h2` elements from our `index.html`

## Install jQuery with npm:
`$ npm i jquery -S`

### Or install with yarn:

`$ yarn add jquery`

* **note** jQuery is a **dependency** not a **dev dependency**

![jQuery dependency](https://i.imgur.com/w32FRgY.png)

## Test if jQuery is working

`App.js`

```js
var $ = require('jquery');
var Person = require('./modules/Person');

var john = new Person('John Doe', 'red');
john.greet();
console.log(john);

var jane = new Person('Jane Doe', 'green');
jane.greet();

$('h2').remove();
```

* That first line is all we need to do to start using jQuery
* We remove all `h2` elements from our page

`$ webpack`

`$ gulp watch`

## Next
* Running Webpack everytime to re-bundle our JavaScript is a pain
* Next we will automate it to automatically watch and bundle our JavaScript files
