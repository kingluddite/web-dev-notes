# Fun With NPM Task Runners

## Installation Instructions

### Clone the repo:

```
$ git clone https://github.com/kingluddite/dice-simulator-task-runner-practice.git
```

* Have node installed

### Run the `npm` installer

```
$ npm install
```

### Run mocha to test code

```
$ npm run test
```

### Run build script

* check if `dist` folder exists, if it does, remove it 
* create `dist` folder and inside it create `js` and `css` folders
* minify and concatenate all JavaScript files
* move html to `dist`
* move css to `dist/css`
* move js to `dist/js`

```
$ npm run build
```

# npm as a Task Runner

What is a task?
A task is something you'll wan't to do over and over again.

## Common Tasks
* Run Test Suite
* Compiling Sass/TypeScript/CoffeeScript
* Downloading files from an external source that your package needs
* Starting a Web Server
* Starting a Worker
    - goes through a queue of jobs, like sending out emails, or pushing notifications

## What about build tools like Grunt and Gulp?
Great for large projects, but you don't always need their power or want to bother with the time consuming setup process that they require. If your project grows, you can easily turn to Grunt and Gulp

## npm test
* called scripts

```js
{
  ...
    "scripts": {
    "<name>": "<command>"
        },
    }
    ...
}
```

### scripts examples

* echo out message to the terminal

```js
"scripts": {
    "hello-world": "echo \"hello world\""
        },
    }
```

* start up a web server

```js
"scripts": {
    "start-server": "node app.js --port=8080"
        },
    }
```

* use a command tool like `mv` to move files or `cp` to copy files

```js
"scripts": {
    "move-files": "mv source/* destination/"
        },
    }
```

## How do I run the script?

```
$ npm run <name>

# run test named `test`
$ npm run test

# or to compile files with at test named `compile`
$ npm run compile
```

## Types of Tasks
* Built-in
    - default
    - common to most projects
    - example
        + `test`
    - do no require `run` command
        + `$ npm run test` or just `$ npm test `
* Arbitrary
    - can name yourself
    - require `npm`'s run command
    - example
        + if you had a test named `compile` you would run it with `$ npm run compile`

## Our App Structure

![file/folder structure](https://i.imgur.com/snLmGPN.png)

`package.json`

```js
{
  "name": "dice-simulator-task-runner-practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "kingluddite",
  "license": "ISC",
  "devDependencies": {
    "mocha": "^2.5.3",
    "uglify-js": "^2.6.4"
  }
}
```

## examining test with a closer look

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

* this will output an error because we didn't set up a test
* computers return 0 with successful exit

* you are often encouraged to install test frameworks and build systems globally with the `-g` flag
    - but that can be overkill if you are working on different projects with different versions

## install dev dependencies

```
$ npm install
```

* when we run this it will install all dependent packages our project requires (gets that info from `package.json`)

## How do I run mocha after I installed it?

```
$ node_modules/.bin/mocha
```

![after running mocha](https://i.imgur.com/D5FN33A.png)

### that is a long command
How can we make it shorter?

By updating our test scripts with the `mocha` command

`package.json` fragment

```js
"scripts": {
    "test": "mocha"
  },
```

#### Now to run mocha

```
$ npm run mocha
```

Because test is a built in command, we can run it just by typing

```
$ npm test
```

## Using uglify with npm

We use uglify to combine and minify all our JavaScript files

`src/models/dice.js`

```js
!function(root){
  "use strict";

  function Dice(sides) {
    this.sides = sides;
  }

  Dice.prototype.roll = function () {
    var randomNumber = Math.floor(Math.random() * this.sides) + 1;
    return randomNumber;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dice;
  } else {
    root.Dice = Dice;
  }

}(this);
```

`src/frontend.js`

```js
function displayNumber( number ) {
  var placeholder = document.getElementById( "placeholder" );
  placeholder.innerHTML = number;
}

var dice = new Dice( 6 );
var button = document.getElementById( "button" );

button.onclick = function() {
  var result = dice.roll();
  displayNumber( result );
};
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dice Game</title>
</head>
<body>
  <p id="placeholder">

  </p>
  <button id="button">Roll Dice</button>
  <script src="app.js"></script>
</body>
</html>
```

### Using npm to uglify

Here is the very long command to uglify

```
$ node_modules/.bin/uglifyjs src/models/* src/frontend.js -m -c -o build/app.js
```


* we use this `src/models/*` to grab all the files in the models folder
* and `src/frontend.js` to grab the frontend.js file
* -m flag
    - mangles or reduces the name of some of the variables in the code
* -c flag
    - combines the code into a single file
* -o flag
    - the output flag is passes with the file name where we want it to be saved to which is `build/app.js`

So at the end of the day, we will have all of our JavaScript in one file which will load faster and be more efficient because we are only calling our server once instead of multiple times

### The command is too long, how can we simplify it?
We can create our own tasks

`package.json` fragment

```js
"scripts": {
    "test": "mocha",
    "uglify": "uglifyjs src/models/* src/frontend.js -m -c -o build/app.js"
  },
```

#### run uglify now with

```
$ npm run uglify
```

* we need to specify `run` because this is not a built-in task

And you should see something like this in your terminal:

![uglify after running in terminal](https://i.imgur.com/3v0GXrX.png)

#### View minified `dist/app.js`

If you look at it you'll see it has been concatenated and minified.

Now you can point your html file to it

## Copy the CSS and HTML into the `dist` folder

`package.json` fragment

```js
"scripts": {
    "test": "mocha",
    "uglify": "uglifyjs src/models/* src/frontend.js -m -c -o build/app.js",
    "copy-files": "cp src/*.html build/ & cp src/*.css build/"
  },
```

### run with

```
$ npm run copy-files
```

### what if I want to use a `dist` folder for production instead of `build`? (more common way of doing it these days)

Just change your `package.json` to this:

`package.json`

```js
{
  "name": "dice-simulator-task-runner-practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "test": "mocha",
    "uglify": "uglifyjs src/models/* src/frontend.js -m -c -o dist/app.js",
    "copy-files": "cp src/*.html dist/ & cp src/*.css dist/css"
  },
  "author": "kingluddite",
  "license": "ISC",
  "devDependencies": {
    "mocha": "^2.5.3",
    "uglify-js": "^2.6.4"
  }
}
```

## Using one command to run them all

`package.json` fragment

```js
"scripts": {
    "test": "mocha",
    "uglify": "uglifyjs src/models/* src/frontend.js -m -c -o dist/app.js",
    "copy-files": "cp src/*.html dist/ & cp src/*.css dist/css",
    "build": "npm run copy-files && npm run uglify"
  },
```

## remove all the contents of the `dist` folder
(so you can run it again from scratch)

```
$ rm -rf dist/*
```

* **note**: if you delete the `dist` folder you will get an error when you run build because it is expecting the `dist` folder to exist. Just make sure it's ther. If not use `mkdir` to create it and run `$ npm run build` again.

## run the build task

```
$ npm run build
```

* using `&&` (**AND** operator)means it will run the task on the left of the `&&` first and then the task on the right of the `&&`

## Make it more efficient

It breaks if we don't have a `dist` folder. I don't want to always create one so I could add this to my `script`

`package.json` fragment

```js
"scripts": {
    "test": "mocha",
    "create-dist": "mkdir dist",
    "uglify": "uglifyjs src/models/* src/frontend.js -m -c -o dist/app.js",
    "copy-files": "cp src/*.html dist/ & cp src/*.css dist/css",
    "build": "npm run create-dist && npm run copy-files && npm run uglify"
  },
```

This works but now, if the `dist` folder exists, I get an error because it won't overwrite and existing folder. I need to first check if it's there and if it is, remove it. This will do the trick

`package.json` fragment

```js
"scripts": {
    "test": "mocha",
    "remove-dist": "rm -rf dist",
    "create-dist": "mkdir dist && mkdir dist/css && mkdir dist/js",
    "uglify": "uglifyjs src/models/* src/frontend.js -m -c -o dist/js/app.js",
    "copy-files": "cp src/*.html dist/ & cp src/*.css dist/css/",
    "build": "npm run remove-dist && npm run create-dist && npm run copy-files && npm run uglify"
  },
```

And now you have it. One command runs all that code. Magical!

* also added the ability to create a `js` and `css` folder inside the `dist` folder so the production files could be set up with a practical and realistic folder structure

## npm help on scripts

[resource link](https://docs.npmjs.com/misc/scripts)

```
$ npm help scripts
```


## Bonus Test Script To try Mocha

```js
var assert = require( 'assert' );
var Dice = require( '../src/models/dice.js' );

describe( 'Dice', function() {
  describe( 'roll()', function() {
    it( 'shoud return a number over 0 and less than 7', function() {
      var dice = new Dice( 6 );
      assert( dice.roll() < 7 );
      assert( dice.roll() > 0 );
    } );
  } );
} );
```
