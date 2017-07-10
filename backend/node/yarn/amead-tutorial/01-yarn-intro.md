# Yarn
[yarn official website](https://yarnpkg.com/en/)

* Designed by Facebook
* To solve their scaling issues
* Built on 4 core principles
    - reliability
    - security
    - speed
    - usability

## NPM
Is the alternative

### Two sides to NPM
* `npmjs.org` (_library online to find packages_)
* command line tools
    - **yarn** is an alternative to these CLT (_command line tools_)
        + **yarn** is 100% compatitble with all of modules you are currently using that come from NPM
        + You don't need to change a single line of Application code
        + Takes about 20 seconds to make the switch
        + We will still work with `package.json`
        + We still output code to a `node_modules` folder
        + But behind the scenes it is heavily optimized

## Installing Yarn

### Using brew
`$ brew install yarn`

### First Yarn Project
Create your project folder

`$ yarn init -y`

`package.json`

```
{
  "name": "learn-yarn",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

`server.js`

```
const express = require('express');
const port = process.env.PORT || 3000;
let app = express();

app.get('/', (req, res) => {
  res.send('This is my yarn project.');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);  
});
```

## How do we add `npm` to our project?
`$ yarn add express`

* There is no save flag
* This shows how `yarn` has a better set of defaults
* `node_modules` gets installed (_it's way faster_)
* Our package `express` was added to `package.json` by default

## What is `yarn.lock`?
* Never alter it
* It should get **checked into version control** if your using `.git`
* Commit it as it changes
* `yarn.lock` was created to make sure you are using the exact same dependencies across envirnments
* `yarn.lock` specifies that exact version that was last used (_not a range_)

```
"dependencies": {
    "express": "^4.14.0"
}
```

`^` - specifies range
`0` - patch
`14` - minor

* Ranges can cause major problems
* You don't want to automatically have your versions change because you deployed to heroku for example
* Say you install 4.14.0 (_most recent version_)
    - You're developing with it
    - So when you deploy to heroku it will install your dependencies and let's say 4.15.0 is the new version and maybe it's not backwards compatible
* This will make it very hard to track down issues
* `yarn.lock` fights this and makes yarn deterministic, it uses the exact same version of modules across all environments

## Adding dev dependencies
`$ yarn add mocha --dev`

### Shortcut
`$ yarn add mocha -D`

```
{
  "name": "learn-yarn",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "express": "^4.15.2"
  },
  "devDependencies": {
    "mocha": "^3.3.0"
  }
}
```

## Remove a package
`$ yarn remove mochar`

### Set up git
So we can see how yarn lock changes over time

`$ git init`

`$ touch .gitignore`

* Add `node_modules` to `.gitignore`

`$ git add .`

`$ git commit -m 'Init commit'`

* Change **Express** to a previous version

## yarn upgrade
This will upgrade to the most recent version

`$ yarn upgrade express`

### Can also downgrade
`$ yarn upgrade express@3.0.0`

That will update `yarn.lock` with that version of express

`$ git diff`

* You'll see `package.json` is updated and the entire `yarn.lock` file got rewritten
* `yarn.lock` only changes when we add, remove or update a dependency

### yarn outdated
Will print out a report of all the current and most recent versions of each package

`$ yarn outdated`

### upgrade
`$ yarn upgrade express`

`$ yarn outdated` - Will be empty we have no outdated packages

### Cloning repos
`$ yarn install` (_we used to use `$ npm install`_)

## Why is yarn so fast?
* It has local caching
* When you install packages it doesn't just install it, it also adds it to our local cache
    - This means yarn also have an offline mode, if you are reinstalling a project's dependencies you don't need the internet because all of those are cached locally

## Clean our yarn cache
`$ yarn cache clean` 

Delete `node_modules`

`$ yarn install`

* It will take longer
* With lots of packages to install, yarn will save you time

## Scripts inside `package.json`
To use scripts:

`$ yarn run`

* If you run `$ yarn run` with no arguments it will list out all scripts you can run

`$ start` - will run node server

We could also run `$ yarn run start` - with the same effect

## Global modules
* `npm` supports it
* So does yarn

### install `nodemon`
* Command Line tool
* It allows you to run a script like `server` and then re-run it when the file changes
    - Very useful for local development

### Do you have nodemon installed?
Check with `$ nodemon`

* If you get `command not found` it is not installed
* If you do have it, uninstall it with `$ npm uninstall -g nodemon`

#### Install `nodemon` with `yarn`
`$ yarn global add nodemon`

* Now run **nodemone** from terminal with `$ nodemon`
* It crashes because we currently have no `index.js`
* `ctrl` + `c` - stops **nodemon**
* `$ nodemon server.js`
* Update line ``console.log(`The Server is up on port ${port}!`);``
* And nodemon will rerun and show new log message in terminal

## Upgrade global module
`$ yarn global upgrade nodemon`

* Upgrade to a specific version

`$ yarn global upgrade nodemon@1.0.0`

Remove global module

`$ yarn global remove nodemon`


