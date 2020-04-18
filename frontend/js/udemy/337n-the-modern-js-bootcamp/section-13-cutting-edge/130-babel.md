# babel
* Babel is a tool that we'll use to get ur app to work in all browser
* Babel will convert our JavaScript code and convert it to JavaScript that all browsers will understand
    - So if we use a fancy JavaScript feature that no browsers understand babel will convert it to a "dummy" feature that all browsers understand (and that "dummer" feature is what will actually run behind the scenes)
    - This tool technique gives us the benefit of writing cutting edge code but that will work in all pretty much any browser

## try babel out
* First let's see how babel works
* [docs](https://babeljs.io/)

### try it out
* [try it out link](https://babeljs.io/repl)
* We use this to see how it works remotely before using locally

```
console.log('yo')
```

* nothing changes on this (except the added semi-colon)

#### You type
```
const name = 'John';
console.log(name)
```

##### babel transforms to
```
"use strict";

var name = 'John';
console.log(name);
```

* Babel transforms `const` to `var`
* Babel adds `"use strict"` at top
* But if you try to reassign the name variable you will get an error and babel won't transform

### Let's see how babel transforms a `class`
```
const name = 'John';
console.log(name)

class Hangman {
  
}
```

* And the output

```
"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var name = 'John';
console.log(name);

var Hangman = function Hangman() {
  _classCallCheck(this, Hangman);
};
```

* The right code works on most browsers
* We don't have to understand or edit the code on the right
* We change our code and use what modern code we want it babel does the heavy lifting for us

## Let's add a method inside our class
```
const name = 'John';
console.log(name)

class Hangman {
  myMethod() {
  return 'yo' 
  }
}
```

* And the output

```
"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var name = 'John';
console.log(name);

var Hangman = /*#__PURE__*/function () {
  function Hangman() {
    _classCallCheck(this, Hangman);
  }

  _createClass(Hangman, [{
    key: "myMethod",
    value: function myMethod() {
      return 'yo';
    }
  }]);

  return Hangman;
}();
```

* We can see babel is really working hard for us

## Takeaway
* Babel takes code we write with the latest features and it compiles it down into more simple code that older browsers can understand

## Now we'll perform this transform babel process locally on our machine
* To do this we need to install babel as a command line tool

### Install the babel-cli
* cli - command line interface
* This is the version of babel that lets us run commands from the terminal

`$ npm install -g babel-cli`

## Test to make sure babel installed correctly
* After you run your install command above test that babel is installed by finding it's version (if you don't see a version number babel is not properly installed)

`$ babel --version`

## Test if babel is working
* Create a new directory called `babel-boilerplate`
* Open terminal inside that directory
* `$ touch input.js`
* Grab code we used on left from babeljs.io "try it out"

`input.js`

```
const name = 'John';
console.log(name)

class Hangman {
  myMethod() {
  return 'yo' 
  }
}
```

* Now we use the `babel` command (from the CLI we just installed `babel-cli`)
* We specify the input file `input.js`
* We use the `-o` flag (output)
* We specify the output file `output.js`

`babel input.js -o output.js`

* You will that `output.js` is created but nothing was changed other than semi-colons added
* By default babel does almost nothing
* We need to specified any of the babel plugins we want to use
* To get this work we have to install a `babel preset`

## babel preset
* This will give us the functionality we saw from inside babeljs in the browser
* It will insure babel converts those ES6 and ES7 into boring old JavaScript that older browsers can understand

### Installing the babel preset
* We won't install this module as a global npm module but instead we'll install it as a local npm module
    - local to our project (local to our babel-boilerplate directory)

### Now we need to set up our babel-boilerplate project to be able to install npm modules

`$ npm init`

* You want to make sure you run this command from the root of your project
* This command asks you a series of questions
* We'll just accept all the default values
* After we answer all questions a `package.json` will be generated in the root of our project folder

#### Questions npm asks
* package name: If we provide nothing it will use our folder name as the package name (do not use spaces in your package name)
    - Hit enter to accept your default value
* `version`: (1.0.0): Hit enter to accept the default value
* `description`: leave blank and press enter
* `entry point`: we won't use hit enter to accept `input.js` as default value
* `test command`: hit enter
* `git repository`: hit enter
* `keywords`: hit enter
* `author`: hit enter
* `license`: (ICS) hit enter to accept ICS as default value

##### Last question
* It shows you the `package.json` file it is about to create for you
* Type `yes` and it will be created

`package.json`

```
{
  "name": "babel-boilerplate",
  "version": "1.0.0",
  "description": "",
  "main": "input.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

## Now we'll install a package locally
* We can do this now because we have a `package.json`
* We want to install this locally (so don't provide the `-g` global flag)

`$ npm i babel-preset-env`

* This will install the `babel-preset-env` module
* You will see a `node_modules` folder is added (this is where this module and the dependencies it needs will be stored)
* We never need to change any of the code inside `node_modules`
    - This is all of the code necessary to get the `babel-preset-env` up and running

## dependencies
* Inside `package.json` you'll see a need `"dependencies"` section with our new module listed
    - We have the module name and the version of that dependency

```
{
  "name": "babel-boilerplate",
  "version": "1.0.0",
  "description": "",
  "main": "input.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-preset-env": "^1.7.0"
  }
}
```

* You will also see a new file `package-lock.json`
    - This is an auto-generated file that keeps track of the version of modules we're using and it makes sure we don't run into any conflicts later on
    - You should never change anything in `package-lock.json` 
* Over time we'll be making changes to `package.json`

### Current file structure
![current file structure](https://i.imgur.com/HwDS8sF.png)

## Now we'll rerun our babel command from early
* But this time we'll also tell it to use our babel preset

`$ babel input.js -o output.js --presets env`

* You just need to provide the one preset we want to use (you don't have to provide the `babel-preset` part of the module name **babel-preset-env** and we just use `env` (as see in the above terminal code)
* **note** We could have also run the "long hand" version (identical output)

`$ babel input.js --out-file output.js --presets env`

* Now you'll see that babel does in fact compile our advanced code into older JavaScript that is readable by most browsers

`output.js`

```
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var name = 'John';
console.log(name);

var Hangman = function () {
  function Hangman() {
    _classCallCheck(this, Hangman);
  }

  _createClass(Hangman, [{
    key: 'myMethod',
    value: function myMethod() {
      return 'yo';
    }
  }]);

  return Hangman;
}();
```

## What will we link to?
* Now that we have this new "babelified" code this is what we'll link our HTML to (and not our modern js code)
