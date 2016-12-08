# [Babel](https://babeljs.io/), npm and other fun stuff

## What is babel?
A JavaScript compiler

* Put JavaScript in and get ES5 JavaScript out
* Started with just ES6 not it is all future js stuff
* A lot of react stuff is also in it
* Try out the site page of babel repl and you will see how it works
* You ONLY NEED BABEL if you are working with modules

Create a new project

`$ npm init -y`

Check out the new file

**tip** create an alias `ll` that does this `ls -la`

`babel-cli`

* Allows us to run babel via the command line

### We also need a preset
* babel has [plugins](https://babeljs.io/docs/plugins/)
    - Every possible feature that JavaScript has has a plugin, there is tons of stuff here and you don't need it all, you just need all of the ES6 stuff
    - Downloaded all of the ES6 stuff would take too much time
        + That is where presets come in handy
            * so we can just install `babel-preset-es2015`

`$ npm i babel-cli babel-preset-es2015 --save`

`package.json`

```json
{
  "name": "49-learning-babel",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-cli": "^6.18.0",
    "babel-preset-es2015": "^6.18.0"
  }
}
```

You won't be able to use the babel-cli on the command line unless you installed it globally

But we can run it via an npm script

### Update `scripts` in `package.json`

`package.json`

```json
// more code here
"scripts": {
  "babel": "babel app.js --watch --out-file app-compiled.js"
},
// more code here
```

`app.js`

```js
const age = 100;
const people = ['George', 'Martha'];

const fullNames = people.map( name => `${name} Washington` );
```

### Run babel
`$ npm run babel`

All that happens is our JavaScript file `app.js` has created and copied code to `app-compiled.js`. Nothing else happened.

The reason is we haven't told it which plugins or which collection of plugins to use.

We could do it in the "scripts" part of our `package.json` file or a better way would be to put it inside the `.babelrc` file.

### [.babelrc](https://babeljs.io/docs/usage/babelrc/)
* Very similar to an `.eslintrc` file
* babel will check this file for your settings
* **tip** Instead of losing the `.babelrc` file in the root of your site, because they are hidden, you can put it inside your `package.json` file

`package.json`

```js
{
  "name": "49-learning-babel",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "babel": "babel app.js --watch --out-file app-compiled.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-cli": "^6.18.0",
    "babel-preset-es2015": "^6.18.0"
  },
  "babel": {
    "presets": ["es2015"]
  }
}
```

### Run it
`$ npm run babel`

### Adding plugins
If you added this it would not work

`app.js`

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
```

### npm install the needed plugin

`$ npm install --save-dev babel-plugin-transform-object-rest-spread`

`package.json`

```json
"babel": {
    "presets": [
      "es2015"
    ],
    "plugins": [
      "transform-object-rest-spread"
    ]
  },
```

### Run it
`$ npm install babel`

Now the experimental JavaScript has been transpiled to ES2015
