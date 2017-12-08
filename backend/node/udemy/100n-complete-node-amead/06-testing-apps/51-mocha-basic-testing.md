# Mocha and basic testing
* If you have a function that is supposed to add two numbers together you should be able to test that
* Test if you are correctly fetching a user from the database

## Basics of setting up testing inside nodejs project

`$ mkdir node-tests`

`$ npm init -y`

`$ mkdir utils` and `$ touch utils/utils.js`

`utils.js`

```js
module.exports.add = (a, b) => a + b;
```

## Mocha setup
* [link to mocha](http://mochajs.org/)
* Bottom of page has useful table of contents

### Install mocha
`$ npm i mocha --save-dev` or `$ npm i mocha -D`

or

`$ yarn add mocha -D`

* We save this as a dev-dependency
* We don't need this package in production

### Create a test file
`$ touch utils.test.js`

* We don't store our code in our actual file
* We keep it separate which helps us organize our tests
* Using the `.test.js` extension we tell our app that this will store our test cases
* Mocha will look and scan our app and run any file with the `.test.js` extension

### Create a test case
* A test case is a function that runs some code and if things go well, the test will be considered to have passed
* If things do not go well the test is considered to have failed

#### it
* create a new test case using `it`
* `it` is a function provided by mocha
* We don't have to include or require `it`
* `it` lets us define a **new** test case
* `it()` takes 2 arguments
    - `it(string description of what the test is doing`, )
    - should read like a sentence
    - `it('should add two numbers')`
        + This is called BDD (behavior driven development)
        + These are the principles that mocha was built upon
    - add a function as a second argument
```js
const utils = require('./utils');

it(should add two numbers, () => {
    const res = utils.add(33, 11);
});
```

## Run the test script
`$ npm test`

* This outputs an error
* This is because we told it to output this in `package.json`
* We will now point our test script to mocha like this:

`package.js`

```json
// more code
"scripts": {
    "test": "mocha **/*.test.js"
},
// more code
```

### Run the test
`$ npm test`

* You should see you pass the one test

![pass test](https://i.imgur.com/PkarTFK.png)

## Houston we have a problem!
* Our current test will always pass
* We don't make any assertions

### How do we make a test fail?
* We throw an error

`utils.test.js`

```js
const utils = require('./utils');

it('should add two numbers', () => {
  const res = utils.add(33, 11);
  throw Error('Value not correct');
});
```

* Test with `$ npm test`
* You will now see you fail the test

![test failed](https://i.imgur.com/jqyevus.png)

## Houston we have a problem
* Now our test will always fail
* We need to create a condition that if it fails then we thrown an error

```js
const utils = require('./utils');

it('should add two numbers', () => {
  const res = utils.add(33, 11);

  if (res !== 44) {
    throw Error('Value not correct');
  }
});
```

* Run the test `$ npm test` and you'll get a passing test result
* Change the above res line to: `const res = utils.add(33,1)`

Run the test `$ npm test` and you'll get an error

## Improve feedback
* By adding a template string

```js
const utils = require('./utils');

it('should add two numbers', () => {
  const res = utils.add(33, 1);

  if (res !== 44) {
    throw Error(`Expected 44, but got ${res}.`);
  }
});
```

* Now when you fail you know what you are expecting and what you actually got
* I we changed the code in `utils.js`

`module.exports.add = (a, b) => a + b + 1;`

* And put our `utils.test.js` back to:

```js
const utils = require('./utils');

it('should add two numbers', () => {
  const res = utils.add(33, 1);

  if (res !== 44) {
    throw Error(`Expected 44, but got ${res}.`);
  }
});
```

## Challenge
* Create a new test on a function that squares a function that returns the result


