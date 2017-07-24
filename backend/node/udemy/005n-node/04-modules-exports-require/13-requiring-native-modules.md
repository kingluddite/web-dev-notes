# Requiring Native (Core) Modules

`node/lib/module.js`

```
 If the module is native: call `NativeModule.require()` with the
//    filename and return the result.
```

## What are native modules?
* Stuff that exists inside the `lib` folder
    - That is the JavaScript core
    - The code that comes along for the ride with NodeJS

## How can we learn what these core Native modules do?
* Visit the NodeJs website [Node site](https://nodejs.org/en/)
        - And visit the API documentation
        - This is the [V8 documentation](https://nodejs.org/dist/latest-v8.x/docs/api/)
        - Some are global like `Console`
        - Other aren't global like `Utilities`
        - You should read this to become familiar with it

## How do we grab code that is not global from node?
* Using `require()`

`app.js`

```js
const util = require('util');
```

* Now I have an object that contains all the stuff inside the `node/lib/utils.js` file
* I could just use ES6 template strings or I could use the util file methods to use replace codes in a string like this:

```js
const util = require('util');

const name = 'John';
const greeting = util.format('Hello, %s', name);
util.log(greeting);
```

* `$ node app.js`
    - Will return `Hello, John`
* `util.log()` does the same thing as console but it adds a timestamp

## What if I name my module the same name as the core js file?
* Like what if I named my file `util.js`, would that lead to a conflict?
    - Well, if it is a custom module you specify the location
        + `./some-path/util`
        + If you don't specify a path, node will look for a native module
* It's OK to name it the same but it is **NOT RECOMMENDED** as it may cause unnecessary confusion
