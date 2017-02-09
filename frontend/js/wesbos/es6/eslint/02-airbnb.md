# Airbnb ESLint Settings
Helps you to write JavaScript that is consistent across all of your projects

## [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
Tells you things like:

* When to use `const`, `let`
* How to write your `if` statements
* When to use semicolons

The `.eslintrc` file is the enforcement of all of this style guide

### Most developers are doing this
They adopt the airbnb style of coding and then they extend it to add rules they individually use on their current project

## Installing the airbnb style guide
* Go to [the airbnb style guide]([Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* On the Github repo page click on `packages` folder
* Click on `eslint-config-airbnb` folder
* That has the instructions on how to install it

In your working project folder create your `.eslintrc`

`.eslintrc`

```js
{
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": "airbnb",
  "rules": {
    "no-console": 0
    }
}
```

Test it against this file

`bad-code.js`

```js
var weather = new Promise((resolve) => {
  setTimeout(() => {
    resolve({ temp: 29, conditions: 'Sunny with Clouds' });
  }, 2000);
});

const tweets = new Promise((resolve) => {
  setTimeout(() => {
    resolve(['I like cake', 'BBQ is good too!']);
  }, 500);
});

Promise
  .all([weather, tweets])
  .then(responses => {
    const [weatherInfo, tweetInfo] = responses;
    console.log(weatherInfo, tweetInfo);
  });

const postsPromise = fetch('http://wesbos.com/wp-json/wp/v2/posts');
const streetCarsPromise = fetch('http://data.ratp.fr/api/datasets/1.0/search/?q=paris');

Promise
  .all([postsPromise, streetCarsPromise])
  .then(responses => {
    return Promise.all(responses.map(res => res.json()));
  })
  .then(responses => {
    console.log(responses);
  });
```

### Should get an error
`Cannot find module 'eslint-config-airbnb`

Why do we get this error? Because we haven't installed it yet

#### Global or Local Install
You can install it locally to your project but since it is recommended you use it on every single project, you should install it globally

### Install airbnb eslint
You should have eslint installed globally already

Check with `$ eslint --version`

Don't have it install with `$ npm i -g eslint`

```
$ (
  export PKG=eslint-config-airbnb;
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install -g "$PKG@latest"
)
```

These are all peer dependencies for eslint. Event if you are not using React, you still need them

### Try eslint again now
`$ eslint bad-code.js`

You should get all kinds of errors:

If you get spacing errors, eslint will fix them automatically

#### Fix that
eslint will fix automatically errors it can with:

`$ eslint bad-code.js 

And it fixes most errors

When all errors are fixed, it doesn't congratulate you. It silently does nothing. But you can pat yourself on the back for a job well done.

## Local `.eslintc` file
So we can create a different `.eslintrc` file for every project

## Gloabl `.eslintrc` file
If you don't have a local eslint config file, it will be the default rules

Lots of people like this so they don't have to create an eslint file for every project especially if you are using the same config settings

Global lives in your home directory
Home directory? That is `~` (aka tilde)
That is the folder with your username on your computer

(on windows it would be c:/Users/YOURUSERNAME)

## Create your global .eslintrc file
`$ touch ~/.eslintrc`

If you already have one, you can open up in your editor

`$ atom ~/.eslintrc`

Inside `.eslintrc`

```json
{
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "jquery": true
    },
    "rules": {
      "no-unused-vars": [1,{ "argsIgnorePatter": "res|next|^err" }],
      "arrow-body-style": [2, "as-needed"],
      "no-param-reassign": [2, { "props": false }],
      "no-console": 0,
      "import": 0,
      "func-name": 0,
      "space-before-function-paren": 0,
      "comma-dangle": 0,
      "max-len": 0,
      "no-underscore-dangle": 0,
      "consistent-return": 0,
      "react/prefer-es6-class": 0,
      "radix": 0
      },
}
```

Append this code to `bad-code.js`

```js
const johnDoe = {
  age: 100,
  superCool: true
}
```

Run eslint again `$ eslint bad-code.js`

![errors from eslint](https://i.imgur.com/Z6e45Ns.png)

Let's change no unused vars to a warning

In our .eslintrc

```json
{
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": "airbnb",
  "rules": {
    "no-console": 0,
    "no-unused-vars": 1
    }
}
```

Run again and you will see what a warning looks like

Turn off comma dangle, if it bugs you

```
"no-unused-vars": [1,{ "argsIgnorePatter": "res|next|^err" }],
```

The above rule has an array with a error but there is a option if you are working with node to allow unused vars if you use res,next or anything that starts with err

## Suggestion
Start with airbnb and just start writing code. Over time you will develop a style you like and you can add rules to fit that style.

So if you want to start with just airbnb on every project use this:

`.eslintrc`

```json
{
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": "airbnb",
  "rules": {
    "no-console": 0,
    "no-unused-vars": 1
    }
}
```
