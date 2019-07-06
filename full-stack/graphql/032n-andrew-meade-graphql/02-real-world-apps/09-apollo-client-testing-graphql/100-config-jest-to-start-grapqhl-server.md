# Configuring jest to start the GraphQL Server
* We just learned how to use the "apollo-boost" library to fire off GraphQL operations from JavaScript in the browser
    - This is awesome!
        + It allows us to fetch data (like users and posts) and render those to the screen for users to see
        + We will use the same technique in our test cases
        + But instead of fetching data and rendering data we would fetch data and make assertions about that data
            * Examples
                - Expecting a certain amount of posts to come back
                - Expecting a user to have a specific name
                - (All using our `expect` assertions)

## Let's focus back on our graphql-prisma project and our jest test suite
* For our test suite to be able to communicate with the GraphQL app, the app needs to be up and running when the test suite starts
* There are a couple of approaches to doing this
* But we have a server up and running already, what's the problem?
    - Remember we started the server using the dev script and this is using the dev environment
        + We don't want to use the dev environment here
        + We want to use the test environment

## We have 2 options
1. We could create another script very similar to our dev script

`package.json`

```
// MORE CODE

  "scripts": {
   // MORE CODE

    "dev": "env-cmd -f ./config/dev.env nodemon src/index.js --ext js,graphql --exec babel-node",

    // MORE CODE
  },

// MORE CODE
```

2. Or we can use jest configuration options to tell jest to start up the server before the test suite runs and to tell jest to shut down the server when the test suit finishes (we'll take this step)
    * Benefit of this approach
        - With still just a single command to do everything
        - That is what we want it should be as easy to test otherwise we'll never do it

## Configuring Jest
* [configuring jest docs](https://jestjs.io/docs/en/configuration)
* Many config options!
* We will define jest in package.json

`package.json`

```
{
  "name": "my-project",
  "jest": {
    "verbose": true
  }
}
```
* We could also define a separate config file 

`jest.config.js`

```
// jest.config.js
module.exports = {
  verbose: true,
};
```

* We could also define a JSON file

```
{
  "bail": 1,
  "verbose": true
}
```

* Since we are only setting up 2 properties it will be easiest to set up jest inside `package.json`
    - We will set up 2 properties inside our jest object
        + `globalSetup`
            * Will allow us to start the server
            * Takes a string
            * The string needs to be the path to a custom file
            * This option allows the use of a custom global setup module which exports an async function that is triggered once before all test suites           
        + `globalTeardown`
            * Will allow us to shut down the server
            * Takes a string
            * The string needs to be the path to a custom file
            * This option allows the use of a custom global teardown module which exports an async function that is triggered once after all test suites

## Create new folders/files
```
* tests/
    - jest/
        * globalTeardown.js
        * globalSetup.js
```

`package.json`

```
// MORE CODE

  "jest": {
    "globalSetup": "./tests/jest/globalSetup.js",
    "globalTeardown": "./tests/jest/globalTeardown.js"
  },
  "author": "",

// MORE CODE
```

* We need to provide the path to each file from `package.json`
* Now that this is in place jest will try to use those files when the test suite starts `"./jest/globalSetup.js"` and when the test suite finishes `"./jest/globalTeardown.js"`

## test/globalSetup.js
* The goal inside this file is to start up our server
* The problem is the server is not currently easy to import into this file and then start up
    - The problem is because the server is defined and start all in the same file `src/index.js`

### src/index.js
* This file is doing lots of work
    - It is defining the server
    - It is starting up
    - This means if I wanted to create a server somewhere else for our test files I'd have to rewrite all the setup code in `src/index.js`
        + That is not an ideal solution
        + A better solution would be to create a separate file
        + We will create a separate file called `src/server.js`

### src/server.js
* This will define the server and export it
* Then we can import it and use the start() method anywhere we want
    - We'll do it once in `index.js`
    - We'll also do it once in `globalSetup.js`

`server.js`

```
import { GraphQLServer, PubSub } from 'graphql-yoga';
import { fragmentReplacements, resolvers } from './resolvers/index';
import db from './db';
import prisma from './prisma';

const pubsub = new PubSub();

// define our server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request,
    };
  },
  fragmentReplacements,
});

export { server as default };

```

* Now we'll import the server

`src/index.js`

```
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import server from './server.js'; // add this line

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log('This graphql-yoga server is running');
});
```

* Our code will work as it did before
* We refactored our code slightly making it possible to start the server up from our test suite

## Shut down all Terminals

## Reboot everything
* We'll run the `dev` script to make sure we didn't break anything

`$ npm run dev` (root of project)

* If it works we know our refactor didn't break anything

## Try to get our server up and running inside `globalSetup.js`
* **note** globalSetup.js and globalTeardown.js are not processed through babel like our test scripts are
    - Not sure why jest set it up like this
    - But just **note** that inside these files we only have access to the standard `Node.js` syntax for requiring and exporting
    - Each of these files will export a single function
    - Both functions will be async functions

`globalSetup.js`

```
// setup the server
module.exports = async () => {
  // 
}
```

`globalTeardown.js`

```
// teardown the server
module.exports = async () => {
  //
};
```

* The code in both of these functions that's the code that will run when the setup starts and when the process is complete

## How do we actually use our server file?
* **note** There is a catch

### The PROBLEM
* We are loading in a file `server.js` which uses features that `Node.js` typically doesn't support
    - Because all of our code has been running through babel so far

#### The SOLUTION
* There is a small babel tool to make this problem real easy to work around
* Shut down Terminal to install it

`$ npm i babel-register -D`

`globalSetup.js`

```
require('babel-register');
require('@babel/polyfill/noConflict');

// setup the server
module.exports = async () => {
  //
};

```

* Now we can focus on loading in the server
* Because we load in `babel-register` we will be able to require `server.js` without any issues
    - **note** If we did not use `babel-register` it would not know what to do with syntax like `import` (which Node.js currently does not support)

`globalSetup.js`

```
require('babel-register');
require('@babel/polyfill/noConflict');
const server = require('../../src/server').default;

module.exports = async () => {
  //
};
```

* Why are we grabbing the `default` property?

`const server = require('../../src/server').default;`

* We have to grab default due to a difference between the due
    - In `globalSetup.js` we are using `require` and `module.exports` and in `server.js` we are using `import/export` and this is a compatibility concern (using `.default`) when we use we're still going to be able to access the server like we need to

`globalSetup.js`

```
require('babel-register');
require('@babel/polyfill/noConflict');
const server = require('../../src/server').default;

module.exports = async () => {
  //
};
```

## Breaking Code Update!
* In order to work with Babel 7.4.0 and above this are the correct imports:

`globalSetup.js`

```
require('@babel/register');
require('core-js');
require('regenerator-runtime/runtime');

const server = require('../../src/server').default;

module.exports = async () => {
  //
};

```

* And start the server!

```
require('@babel/register');
require('core-js');
require('regenerator-runtime/runtime');

const server = require('../../src/server').default;

module.exports = async () => {
  await server.start({ port: 4000 });
};

```

* **note** Port 4000 is the default but we define just to be explicit
* Now we can get the server up and running when the test suite starts
    - Before we run it, we also want to tear down the server when the test suite is done

## How do we access what we need?
* We need access from what comes back from this start method

`globalSetup.js`

```
// MORE CODE
module.exports = async () => {
  await server.start({ port: 4000 });
};
```

* And we want to do this:

```
// MORE CODE
module.exports = async () => {
  const instance = await server.start({ port: 4000 });
  instance.close();
};
```

* There is a `close()` method
* That's what we have to call but we need to call it inside `globalTeardown.js`

## Solution
* We'll assign `instance` to a global variable (we'll call it `http`)

`globalSetup.js`

```
// MORE CODE
module.exports = async () => {
  global.httpServer = await server.start({ port: 4000 });
};
```

* Now we'll have access to `global.httpServer` in our other file as well

`globalTeardown.js`

```
// teardown the server
module.exports = async () => {
  await global.httpServer.close();
};

```

* Now we have a system for starting up the server and tearing down the server which allows us to run our entire test suite from a single command

## We now need to update our `test` script
* test, right now is not loading in the test environment (which we do want it to)
    - Since we are loading in things like `server.js` which is going to try and start things up and connect to Prisma
    - All we need to do is load in the `test.env` file similar to how we load in the `dev.env` file up above

`"test": "jest --watch",`

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "node dist/index.js",
    "heroku-postbuild": "babel src --out-dir dist --copy-files",
    "dev": "env-cmd -f ./config/dev.env nodemon src/index.js --ext js,graphql --exec babel-node",
    "test": "env-cmd ./config/test.env jest --watch",
    "get-schema": "graphql get-schema -p prisma --dotenv config/dev.env"
  },

// MORE CODE
```

* Now we are ready to take this for a test spin

## Uninstall
`$ npm uninstall babel-register`

## Install
`$ npm install @babel/core @babel/register --save-dev`

## Run test
`$ npm run test`

## Get this error
* "TypeError: Cannot read property 'bindings' of null"
* Install extra dev dependencies:

`$ npm i babel-jest @babel/core @babel/preset-env --save-dev`

* And then edit the `.babelrc`:

```
{
    "presets": ["@babel/preset-env"],
    "plugins": ["transform-object-rest-spread"]
}
```

* If you get strange wrong babel version errors, uninstall `node_modules` and `package-lock.json`
* Full fix is in troubleshoot file

`$ npm run test`

* 5 passing tests

## Try this
* If we didn't have things set up properly we might get an error

`globalSetup.js`

```
require('@babel/register');
require('core-js');
require('regenerator-runtime/runtime');

// const server = require('../../src/server').default;

module.exports = async () => {
  global.httpServer = await server.start();
};
```

## Need to restart to test again!
* Nothing happens
* **remember** We have to shut down jest and restart it for our configuration files to be reloaded

`ctrl` + `c`

`$ npm run test`

* And now you will see the error
* Fix the error

## Recap
* Our jest test suite will start up and shut down our server
* This means we are ready to load in ApolloBoost into our test files and fire off some GraphQL operations from our test cases

## Install this module
`$ npm i -S regenerator-runtime`

* Gets rid of an error
