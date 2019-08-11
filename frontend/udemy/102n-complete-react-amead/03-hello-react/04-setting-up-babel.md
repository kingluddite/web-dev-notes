# Setting up Babel
* Babel does nothing by default
* To get it to work we have to add:
    - presets
    - configs

## What is a Babel preset?
* A group of plugins

![babel presets](https://i.imgur.com/RJCSMWT.png)

* Uncheck `react` preset and we get an error
* So we will need to install the `React` preset locally to get `babel` to transpile

### [learn about presets](http://babeljs.io/docs/plugins/)
* We will use 2 presets
1. `react`
2. `env`

#### 1. react preset
* If you click the **react preset** you will see all the plugins it uses
* It would take time to individually install all those plugins
* It is faster and easier to just install a **preset** that _comes bundled with all of those plugins_

#### 2. `env`
* This gives us access to `es2015`, `es2016`, and `es2017` presets
* This gives us access to new JavaScript stuff like:
    - const
    - let
    - arrow functions
    - rest and spread operators

### Install stuff we need
* We will install 3 things

1. Babel
2. env preset
3. react preset

#### 1. Global install babel-cli
`$ npm i -g babel-cli` (we already did this)

* After installing we'll have access to a new command called **babel**

## Check if babel was successfully installed
`$ babel --help`

* A bunch of info should appear in Terminal

## Create `package.json` with npm
* We already have our `package.json` created so we don't need to do this
* I include it here so you remember to do this for future projects

`$ npm init -y`

## Install our project dependencies

### Install our 2 presets
`$ npm i babel-preset-react babel-preset-env`

### What is babel-preset-env?
* http://babeljs.io/env
* Instead of continuing yearly presets, the team recommends using `babel-preset-env`
* By default, it has the same behavior as previous presets to compile ES2015+ to ES5

### Difference between global npm and local npm installs
* Global are places in a location all projects can access `~/node_modules`
* Non global get installed in our project's `node_modules` and placed in the `package.json` as a **dependency** or a **dev-dependency**
    - When you install dependencies, those dependencies have other dependencies and so on... and so on... and so on...
        + This means when you install one dependency it can create the installation of dozens of other dependent packages
        + `node_modules` is a generated folder
    - `package-lock.json `also was added
        + **note** Remove `yarn.lock` (_could cause problems so let's just remove it since we aren't using yarn_)
        + We won't manually change `package-lock.json`
            * Open it to examine it
            * You never directly change it as it will change automatically as we update the dependencies
            * It helps keep our dependencies in sync on all machines we use it on

## `src` folder
* This will hold all our custom `React` code
* `$ mkdir src`
* `$ touch src/app.js`
* This is the file `src/app.js` that will have our `JSX` and we will use `babel` to transpile the ES5 JavaScript into `public/app.js` using this command:

`src/app.js`

```
console.log('app.js is loading');

// JSX - JavaScript XML
const template = <p>I am JSX. Nice to meet you</p>;
const appRoot = document.getElementById('root');
ReactDOM.render(template, appRoot);
```

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react`

### Input
* `src/app.js` points to our source `React` code (using `JSX`)

### Output
* `--out-file` points to the generated ES5 code location
* `--presets=env,react` points to the **presets** we're using
* After running the code look into `public/scripts/app.js` and you'll see the ES5 code that was generated

#### --watch
* We want to constantly watch for our `JSX` changes and then it will automatically update our ES5 generated code on each **save**

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

* Make a change to `src/app.js` to see if it in fact, does change

`src/app.js`

```
console.log('App.js is running');

// JSX - JavaScript XML
const template = <p>Does this really change?</p>;
const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

* The browser should update with `Does this really change?`
* View `pubic/scripts/app.js` and see that it did change on the save

`public/scripts/app.js`

```js
'use strict';

console.log('App.js is running');

// JSX - JavaScript XML
var template = React.createElement(
  'p',
  null,
  'Does this really change?'
);
var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

* If your public `app.js` looks similar to above, you now know that `babel` is transpiling `JSX` into ES5 JavaScript and the browser understands it

## Two iTerm tabs are better than one
* We'll run the **babel watch** in one tab watching for changes to our `JSX`

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

* And in the other tab we'll run our server using:

`$ live-server public`

* Make a change to your `JSX` or your HTML and watch how the web app updates
* Now our workflow has improved nicely

## Delete node_modules
* This is not required and just here to show you that at anytime you can delete `node_modules`
* And if you want to bring pack all your project dependencies, just type `$ npm install` or `$ npm i`

## Delete `node_modules`
* Let's see what happens without `node_modules`

`$ rm -rf node_modules`

* Running the following:

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

* Will cause an error because we no longer have `babel` or the **presets**

`$ npm i`

* This will read our `package.json` file and install all our dependencies
    - Run this again:

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

* And it works again!




