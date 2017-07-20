# Init, Nodemon, and `package.json`

## Create `package.json`

`$ npm init`

* You will be asked a series of questions
1. What is your name?
        - Can't be any name
        - Must be URL friendly
        - No spaces
        - `nodejs-test-app`
2. What version
        - Hit enter to accept version `1.0.0`
3. Description
        - NodeJS Test App
4. Entry Point
        - You may have multiple JavaScript files but what is the JavaScript file that Node will run as the entry point of your Application
        - Hit enter to keep it as the `app.js` default
        - That is also what we've been using thus far
+ Hit Enter for all the other choices
        - They were if you planned on giving this package to the NPM registry for others to use
+ Type `yes` to accept all the changes
+ You can type `no` to abort and run `$ npm init` to start again

## package.json
* All our info we added via our choices above creates `package.json`
* "scripts" section of `package.json`
    - This is for command line commands

```js
// more code
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
// more code
```

* To run above command `$ npm test`
        - That will return `no test specified`
* I can make different scripts to run different commands

## Installing and using packages from the npm registry

### Let's install `moment`
`$ npm install moment --save`

* The program `npm` will go to the npm registry
* Download the files that involve moment
    - That means I'll have a module
    - Because all the npm packages are structured as node modules
    - I'll have the module available to me in my app that I can go out and use the `require()` method to make that module available to my Application
    - `--save` will save a reference to this package inside `package.json`

## Two things happen instantly
1. A new folder is created in my app called `node_modules`
    * People use npm not just for node projects
    * NPM is a great way for people doing anything with JavaScript in their Application

```
// more code 
"dependencies": {
    "moment": "^2.18.1",
    "node": "^0.0.0"
},
// more code 
```

### The Version Number
`^2.18.1`

#### What does the carret `^` mean?
* When we go to update when a new version comes out, the carret means it's OK to automatically update me to anything within this major release (`2` of the `1.18.1` semantic version number)
    - But if it changes to a `3` don't update
    - Any minor or patch semantic verion number changes are ok
    - If you change to a tilde like `~2.18.1`
        + That means **"Only give me patches changes"**
            * Don't even give me minor updates

## Sharing npm packages used in your Application
* Create a .gitignore and put `node_modules` inside it
* Create a git repo `$ git init`
    - Add, commit and push changes to your Github repo
* As long as you used `--save` and `--save-dev` when you installed all your npm modules, they will all be listed inside your `pacakge.json`
* Now you only have to run `$ npm install` after cloning the repo to download all the npm modules you are using in your project

## How do I use my downloaded modules from npm?
* Node's `require()` method has built-in features

`var moment = require('./')`

* Node will look for the file inside your current Application folder structure
* If you just give it a name

`var moment = require('moment')`

* It will just look for something in the node core
    - If it is not there it will look other places
    - And one of the places it will look is in the `node_modules` folder in your app
        + If there is one, it will look for that package inside `node_modules`

### Take our moment module out for a test drive
`app.js`

```js
const moment = require('moment');
console.log(moment().format());
```

* Run it

`$ node app.js`

* The output will something like this in the terminal: 

![terminal moment output](https://i.imgur.com/960xK67.png)

* Use moment to show the current day, hour and am or pm

```js
const moment = require('moment');
console.log(moment().format("ddd, hA"));
```

* Output will be: `Wed, 11PM`

### npm Global Installation
* We will install a node package globally
* You may run across permission issues on Mac
* If that happens to you, try this link directly from npm's website:

[https://docs.npmjs.com/getting-started/fixing-npm-permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions)
