# All about Babel + npm scripts
Babel and Polyfilling will get 99% of ES6 working cross browser

## What is Babel?
A JavaScript compiler. Put ES6 in and get ES5 out

Started as just for ES6 but now it is future JavaScript and React stuff too

[babeljs.io](http://babeljs.io/)

Click `Try it Out` and take the below code and paste it on the left:

```js
function logPet(petName, petType = 'dog') {
      console.log(`${petName} is a ${petType}`);
}
logPet('peaches');
```

And you will see this on the right which is ES5 JavaScript that all browsers can understand

```js
'use strict';

function logPet(petName) {
      var petType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dog';

      console.log(petName + ' is a ' + petType);
}
logPet('peaches');
```

**note** You only need, Babel, or systemJS or Webpack 2 if you are using modules

## Not using ES6 Modules?
If you're not, this is how you work with babel

Create a `babel` folder and `cd` into it

Create `package.json` with `$ npm init -y`

### [Babel has plugins](http://babeljs.io/docs/plugins/)
Every possible JavaScript feature has a plugin

If you look you will see a list of ES2015 stuff

![ES2015 JavaScript](https://i.imgur.com/Jnn0SnZ.png)

### Presets
But that would be a lot of plugins to list. To save you time, you can use `presets`

#### What is a preset?
A collection of plugins

The preset we will use is `babel-preset-es2015`

`$ npm i babel-cli babel-preset-es2015 -D`

## babel-cli
Since we did not install it globally we can not run it via the command line but we can run it via the npm script

`package.json`

Update the `scripts` part with:

```json
"scripts": {
    "babel": "babel app.js --watch --out-file app-compiled.js"
  },
```

**notes**

* We will be able to run with `$ npm run babel`
* We will be watching our `app.js` file
* Out transpiled code will be output into a file called `app-compiled.js`

Create `app.js` with `$ touch app.js`

```js
const age = 100;
const people = ['Edith', 'Archie'];

const fullNames = people.map(name => `${name} Bunker`);
```

Copy and paste into the babel website to see how it is transpiled

Output from babel website

```js
'use strict';

var age = 100;
var people = ['Edith', 'Archie'];

var fullNames = people.map(function (name) {
  return name + ' Bunker';
});
```

How can we get npm to run this babel code for us?

`$ npm run babel`

All it does is copy our code into the new file. Why? Babel by default is just a file mover. You need to tell it what rules it needs to follow when transpiling

## Add a `.babelrc` file
We could have told it to run our preset on the command line but a better way is to create a config file called `.babelrc` in the root of your project. It is very similar to an `.eslintrc` file where it will check that file for your specific settings

.files are hidden and some people don't like to use it and instead they put their .babelrc file inside their `package.json`

```json
{
  "name": "babel",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "babel": "babel app.js --watch --out-file app-compiled.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.23.0",
    "babel-preset-es2015": "^6.22.0"
  },
  "babel": {
    "presets": ["es2015"]
  }
}
```

We just add a comma and append our `.babelrc` settings to our `package.json`

**note** You can add multiple presets if you want

```json
"babel": {
    "presets": ["es2015", "react"]
 }
```

There are [other options](http://babeljs.io/docs/usage/babelrc/) you have for your `.babelrc` file

## Run again
`$ npm run babel`

And you should see that the code is successfully transpiled to ES2015

And if you add new ES6 code to `app.js` like:

```js
for (const person of people) {
    console.log(person);
}
```

And it will do all the hard word to transpile that to ES2015

## Adding a plugin
### Experimental `object-rest-spread`
Currently `rest` and `spread` only works for arrays but there is a [current experiment](http://babeljs.io/docs/plugins/transform-object-rest-spread/) in JavaScript where it will work with Objects too.

## Add a plugin
Follow the install instructions

`npm install --save-dev babel-plugin-transform-object-rest-spread -D`

### Update `package.json`
With our new plugin

```json
{
  "name": "babel",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "babel": "babel app.js --watch --out-file app-compiled.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.23.0",
    "babel-plugin-transform-object-rest-spread": "^6.23.0",
    "babel-preset-es2015": "^6.22.0"
  },
  "babel": {
    "presets": [
      "es2015"
    ],
    "plugins": ["transform-object-rest-spread"]
  }
}
```

Add this to `app.js`

`let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };`

And it will now transpile experimental JavaScript


