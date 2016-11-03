# npm Basics
Node Package Manager

## What is npm?
A package manager for JavaScript

* great way to install command line tools
* most commonly used to install packages for node.js
* include other people's code in your apps
* use preexisting open source code in your apps
* examples
    - install express
    - gulp
    - thousands of free open source packages

Old Way
* search internet for other people's code, manually downloading and including them

New Way (npm)
* npm allows you to install, update, and uninstall packages through a standardized way
* helps you keep track of the current versions of each package

## What are packages?
* bundle up and distribute of software
* npm packages are mainly JavaScript
    - may include other files too (depends on what package does)
        + images
        + html
        + coffeescript
        + typescript
        + css
* npm packages for Node.js projects are called `modules`
    - the terms `package` and `module` may be used interchangeably

## Examples of Node.js modules
* [Express](http://expressjs.com/)
* [Passport JS](http://passportjs.org/docs)
* [npm js](https://www.npmjs.com/)
    - browser front end plugins like jQuery
    - you won't just get the JavaScript for the plugin but also the css dependencies too
* npm can be used to install command line build tools like [Grunt](http://gruntjs.com/) and [Gulp](http://gulpjs.com/)
* npm can be used to install compiles and transpilers
     - tranpilers: convert the source code of one language into another
         + example: [coffeescript](http://coffeescript.org/)
         + [typescript](https://www.typescriptlang.org/)
* npm can install tools to compile Sass into Css
* npm can install tools for building hybrid or HTML5 mobile apps
    - [Cordova](https://cordova.apache.org/)
    - [PhoneGap](http://phonegap.com/)
    - [Ionic](http://ionicframework.com/)
* npm can be used to work with Robotics & IoT Platform [Johnny-Five](http://johnny-five.io/)
    - [espruino.com](http://www.espruino.com/)
    - [tessel](https://tessel.io/)

## What does npm stand for?
used to be node package manager but now it installs packages for things that are not node.js but most people still say node package manager

[Node Install Guide Mac](http://treehouse.github.io/installation-guides/mac/node-mac.html)

## How to Find and Choose Packages
[npm.org](//www.npmjs.com)
* popularity
* version number
* number of releases
* are tests passing
* when was it last updated
* look at github project themselves
    - what has more:
        + watches
        + stars
        + forks
* number of contributors
* google search

## How to install a package
Let's do this with bcrypt

Open the terminal

```
$ npm 
```

shows all possible commands you can use with npm

Do you want help on a command?

```
$ npm install -h
```

-h is the flag for help

```
$ npm install bcrypt
```

Where are packages installed?
Inside `node_modules`

Won't install it unless you have a package.json file

```
$ npm init
```

Then try the install again and you'll see that it works

Go into node_moduels/bcrypt/README and find the code for hashing a password

```js
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});
```

Create `app.js` in your root directory and paste the above code inside it

```js
var bcrypt = require( 'bcrypt' );
```

* why no path above?
    - because there is a package.json file inside the node_modules/bcrypt folder and that tells it which file to include
put this inside `app.js`

```js
/*jshint esversion: 6 */
var unsecurePlainTextPassword = 'password';
const saltRounds = 10;

var bcrypt = require( 'bcrypt' );
bcrypt.genSalt( saltRounds, function( err, salt ) {
  bcrypt.hash( unsecurePlainTextPassword, salt, function( err, hash ) {
    console.log( hash );
  } );
} );
```

* open console and read what you see

will output something like:
`$2a$10$OaLEHmYlDKaqv.RBOUJwh.YKjmxtiNlrML04NC4LOAv6xowvGYW76`

## What are `global` packages?
Something that is always available. An example would be the [http-server](https://www.npmjs.com/package/http-server) package. You would use it on multiple packages.

## How to install a package Globally?

```
$ npm install http-server -g
```

## How do I fix npm permissions?
[great video on how to do this](https://docs.npmjs.com/getting-started/fixing-npm-permissions)

## Manage Dependencies in the package.json file
* how to share your packages
* don't want to upload all your packages to github
* don't need git to keep track of those files
    - because you are not editing those files yourself
* keep your packages up to date (aka managing package dependency) 

## package.json
* put in root of your project
* npm uses this to handle all the dependencies for the project

## how to create package.json

```
$ npm init
```

It will ask you a series of question:

* what is the name of your project
    - if you type nothing it will name your project what your folder is named
* version #
* a description of your project
* entry point: (app.js is our only file)
* test command: no tests currently for our project
* git repository: don't have one yet
    - we can manually add it later on
* keywords: aid people to find your project
* author: can enter your name
* license: MIT (let's people know how they can use your code in their project)
    - MIT is common for open source projects (jQuery and Ruby on Rails are MIT)
* Is this ok? (yes): type yes

Once you type `yes` your `package.json` file is created

sample `package.json`

```js
{
  "name": "npm-practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

But if we want our packages to be added to this package.json, we need to make sure we add them like this:

```
$ npm install bcrypt --save
```

now look at our package.json

```js
{
  "name": "npm-practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^0.8.7"
  }
}
```

**note:** the "dependencies" key and its object with the "bcrypt" key and the version of bcrypt as the value of the key.

* if you get warnings to create  a repo or README, that won't break your site, it's just bugging us to fill that meta data in.

## How to add another package

```
$ npm install colors --save
```

dependencies will now look like this:

```js
"dependencies": {
    "bcrypt": "^0.8.7",
    "colors": "^1.1.2"
  }
```

update `app.js`

```js
/*jshint esversion: 6 */
var unsecurePlainTextPassword = 'password';
const saltRounds = 10;

var colors = require( 'colors' );
var bcrypt = require( 'bcrypt' );
bcrypt.genSalt( saltRounds, function( err, salt ) {
  bcrypt.hash( unsecurePlainTextPassword, salt, function( err, hash ) {
    console.log( hash.green );
  } );
} );
```

run `$ node app.js` and you'll now see a green hash

## .gitignore
A file that will help you ignore all files you are not directly editing

.gitignore

```
node_modules
```

delete node_modules

Now to reinstall all packages at one time

```
$ npm install
```

It will look at the package.json file and install all the packages inside the "dependencies" key.

## Dev dependencies
* are necessary for the app to run but are used as you work on your project
    - good example
        + test framework

## Why list this module as a development dependency is to reduce the amount of unneeded files in production

## Let's add Mocha test framework as a dev dependency

```
$ npm install mocha --save-dev
```

now package.json will have this:

```js
"devDependencies": {
    "mocha": "^2.5.3"
  }
```

to make mocha work change this in package.json

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

to this

```js
"scripts": {
    "test": "mocha"
  },
```

mocha requires a test folder

create a folder called `test` in the root of your project

run this command to test

```
$ npm test
```

and you will get output like this: `0 passing (2ms)` in the terminal

* no tests are passing because we have no tests

if you delete node_modules and run npm install again, you'll see that mocha is in the node_modules folder

why?
because by default npm believes that an environment is a development environment and not a production one

how can you set the environment?
in terminal (command line applications) you can include environment variables before the command you are executing

```
$ NODE_ENV=production npm install
```

this will only install the dependencies it needs to run

if you look now, mocha won't be installed
