# Setting up Babel
## Terminal: [cmder](https://cmder.net/)

## Create a project folder

`New project folder`

`$ take graphql-basics`

* Babel is a JavaScript compiler, takes modern code and compiles it into older JavaScript code so all browsers can understand it
    - Babel will let us use the ES6 import export syntax from node
    - https://babeljs.io/
    - try it out
        + left side `const myFunction = () => {}`
        + will output this on the right side:

```
"use strict";

var myFunction = function myFunction() {};
```

## VS code keyboard shortcuts
* Toggle Terminal
    - Show all Commands: shift + cmd + p
    - Search for `toggle terminal` you will see shortcut to toggle terminal
        + carrot + backtick `

## Set up babel for your project
`$ npm init -y` (creates package.json)

`$ npm i babel-cli babel-preset-env`

* babel-cli
    - allows us to run a command to compile babel
* babel-preset-env
    - tells babel exactly what it should change

## Create `.babelrc`
* Place it in the root of your project

`$ touch .babelrc`

`.babelrc`

```
{
    "presets": [
        "env"
    ]
}
```

* That's it! Now babel is configured
* Just a JSON file where we configure how babel works
* We provide an array of all the presets we want to use

## Before we can run any code
* We need to create

1. A `src` directory

`$ mkdir src`

2. And some sort of entry point for our application

`$ touch src/index.js`

## Test to make sure the file runs successfully
1. Write a log to show us that it is working

`index.js`

```
console.log('hello from GraphQL');
```

2. Add script to `package.json` that allows us to run things through babel

`package.json`

```
{
  "name": "graphql-basics",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "babel-node src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-env": "^1.7.0"
  }
}
```

* This is the script we added:

```
// MORE CODE

"scripts": {
  "start": "babel-node src/index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},

// MORE CODE
```

* `babel-node` is something we will use for local development purposes only
* We will talk later about how we will run our projects later

## Run our project
`$ npm run start`

* You will see `hello from GraphQL`

### What just happened?
1. We run `$ npm run start` command
2. babel grabs the file we specified
3. It passes it through the babel compiler using the configuration we provided in `.babelrc`
4. The the output file is what actually runs

* **note** The output is not saved anywhere to our hard drive. It is just executed by the command itself

## Next - babel is used but it's not really being used
* We'll change that when we start using the ES6 import/export syntax
