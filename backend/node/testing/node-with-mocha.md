# Node.js with Mocha
* Mocha will be our test runner which is responsible for encapsulating our tests in:
    - test suites: (`describe-block`)
    - test cases (`it-block`)
* test runners like `Mocha` offer an API to run all tests from a command line interface

## @babel/register
* Install an additional Babel package for your `Node.js` app
    - This makes our tests understand Babel enabled JavaScript code

`$ npm i @babel/register -D`

## Install mocha
`$ npm i mocha -D`

## Add test script
* This script will use Mocha to `package.json`
* This configuration tells Mocha which files should be identified as test files via a file name pattern matching mechanism
    - Since we used `**` in between, Mocha will run recursively through the `server/` folder to find all files in your application
    - All files with the ending `spec.js` are identified as test files
    - It's up to you to choose a different name matching (e.g. `test.js`) for your test files

```
// MORE CODE

  "scripts": {
    // MORE CODE

    "test": "mocha --require @babel/register 'server/**/**spec.js'"
  },

// MORE CODE
```

## Node.js with Chai
* `Chai` will be our assertion library to run equality checks (or other test related scenarios)
* It enables you to compare expected results against actual results (e.g. expect X to be true)

### Install Chai
`$ npm i chai -D`

## Define first test
* Define our first test suite and test case in a `server/tests/spec.js`

`server/tests/spec.js`

```
// MORE CODE

describe('test suite', () => {
  it('test case', () => {
   //
  });
});

// MORE CODE
```

* Nothing related to Chai yet
* The `describe-blocks` and `it-blocks` are provided from our test runner Mocha
* **Note** You can have multiple test cases in a test suite and a test file can contain multiple test suites as well
    - Often one test suite tests one function's different outcomes with multiple test cases
    - When we run our test runner, all test cases will be checked for their assertion(s)

```
import { expect } from 'chai';

describe('true or false', () => {
  it('true is true', () => {
    expect(true).to.eql(true);
  });

  it('false is false', () => {
    expect(false).to.eql(false);
  });
});
```

`$ npm run test`

* You should get 2 passing tests
* These test cases don't test any specific logic from our application, but only demonstrate how an equality check is performed with booleans
* **note** You can run both tests from the command line with `$ npm test`, because we have defined this command as an npm script in our `package.json` file

## Let's add some business logic into our tests
* Our previous test was standalone without any external dependencies of business logic from our application
* Let's create a fake method to test it
    - This function sums up two integers in a `server/tests/sum.js` file which we will test

