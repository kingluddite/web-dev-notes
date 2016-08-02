# Mocha and Chai

Chai is an expectation library
We wrote our test code in our production code

## The Professional Way to write test code
Put your code in a file that is separate from your app code
* This makes unit testing much different than logging to the console
* Tests describe expected behaviors
* Unit Tests focus on the concrete output of functions without worrying how the function does it

## Battleship Test
* Game to build
* Run automatically any time we make a change

### Add npm to your project
```
$ npm init -y
```

## Mocha

### Install [Mocha](https://mochajs.org/) and Chai

```
$ npm install --save-dev mocha chai
```

touch /main-test.js

`$ mocha main-test.js`

If you get this error

![mocha error](https://i.imgur.com/rYR5HMt.png)

Install mocha globally

`$ npm install --global mocha`

Then run

`$ mocha main-test.js`

Output:   `0 passing (2ms)`

We have no code yet but we passed all our test (there were none to pass)

**Question:** Do we have to run Mocha for each file indivually? Because if we have 100 files, this mocha thing can be pretty tedius.

## General Structure of Test Files
* We want them to be easy to run and write
* Because we installed mocha with npm we can have npm run all of our tests automatically

Name your test directory `test` (spell this exactly `test`)
* has to be located at the same level of our project as package.json

## All tests in one directory benefits
* Easy to import code from other files
* Easy to organize our tests
* Easy to find a test file after seeing its output in the console

If you have mocha installed, when you create your package.json file it will add a cool line:

Delete package.json and recreate it.

**package.json**

```json
{
  "name": "battleship-engine",
  "version": "1.0.0",
  "description": "",
  "main": "main_test.js",
  "dependencies": {},
  "devDependencies": {
    "chai": "^3.5.0",
    "mocha": "^3.0.0"
  },
  "scripts": {
    "test": "mocha"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Because mocha was instead this object was added to package.json

```json
"scripts": {
    "test": "mocha"
  }
```

* you can also manually change the above fragment of code by hand

## Review

* It’s important that the test directory is specifically named `test` (not "tests" or "Test"), and it has to be located at the same level of your project as the **package.json** file
* With your test directory in place, you simply run `$ npm test`, and Mocha _will automatically run every test in the test directory_

```
$ mkdir `test`
$ mv main-test.js test
$ npm test
# or you can just run
$ mocha
```

If you name the folder something other than `test` you will get an error like this (in this example I renamed `test` as `tests`). It is a common developer mistake

![wrong named test folder](https://i.imgur.com/p4N4997.png)

## Test Suite
A block of unit tests that are all closely related because they test the same function or they test similar parts of a code base

* introduce a Test suite in mocha with describe()
    - takes 2 args
        + string
            * describes what the suite will cover
            * common to do a simple sanity check in beginning to make sure it 
            * is working
        + another function
            * just an anonymous function that acts as a wrapper for all our individual unit tests that we will include with the suite
* spec - each individual unit test in a test suite is sometimes referred to as a `spec`
* it() - a function in mocha that makes it easy to add specs
    - first arg
        + behavior spec is responsible for
    - second arg
        + function
            * should contain all of our expectations
* we require chai so we can write expectations inside mocha
* `expect(true).to.be.ok;`
    - chai method to see if value is **truthy**
        + any value besides `undefined`, NaN, false, empty string, 0 (zero)
            * aka - any value that would satisfy an if condition

```js
var expect = require( 'chai' ).expect;

// Test suite
describe( 'Mocha', function() {
  // Test spec (unit test)
  it( 'should run our tests using npm', function() {
    expect( true ).to.be.ok;
  } );
} );
```

`$ npm test`

![Output](https://i.imgur.com/Zk6GVNg.png)

What is a sanity check?
A trivial function or test that proves we set things up correctly
