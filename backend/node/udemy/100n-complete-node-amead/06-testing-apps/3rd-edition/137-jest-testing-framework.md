# Jest Testing Framework

## Main testing software
* [Jest](https://jestjs.io/)
* [Mocha](https://mochajs.org/)

## We'll use jest
### Install jest as a dev dependency
* We only need this for development

`$ npm i jest -D`


## TODOs
* Not sure exactly what the following means:
* Research `git config pull.rebase false`

```
warning: Pulling without specifying how to reconcile divergent branches is
discouraged. You can squelch this message by running one of the following
commands sometime before your next pull:

  git config pull.rebase false  # merge (the default strategy)
  git config pull.rebase true   # rebase
  git config pull.ff only       # fast-forward only
```

* We will set up a single new script
    - That script will start up jest
    - jest is a `zero configuration testing framework`
        + That means by default it has everything we need to get started by default
        + But there options we can use to change it if we need to

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "NODE_ENV=production node server",
    "dev": "nodemon server",
    "test": "jest" // ADD!
  },

// MORE CODE
```

* (because we installed in our project - like nodemon) Now we can access jest from within our scripts in `package.json`

## Run jest
`$ npm test`

### Houston we have a problem!

```
No tests found, exiting with code 1
Run with `--passWithNoTests` to exit with code 0
In /Users/philiphowley/Documents/dev/projects/sftpw.com
  27 files checked.
  testMatch: **/__tests__/**/*.[jt]s?(x), **/?(*.)+(spec|test).[tj]s?(x) - 0 matches
  testPathIgnorePatterns: /node_modules/ - 27 matches
  testRegex:  - 0 matches
Pattern:  - 0 matches
npm ERR! Test failed.  See above for more details.
```

* We get an error because it searched all of our files in our project directory and found and test files (in 27 files checked)

## Create our first file for our first test
* We will create a new folder for all of our test cases called `tests`
* Create a folder in the root of our app called `tests`
    - Doesn't have to be called `tests` but it is a good name because it makes it obvious where your tests are

### Create first test file
`tests/math.test.js`

* Jest knows this is a test file because of the name
* `.js` - our tests will be written in JavaScript
* the `.test` extension makes sure that `jest` knows this file contains the test cases that we want to run

#### Now run the test one more time
`$ npm test`

## Troubleshoot
* Getting this error:

```
Cannot find module 'babel-preset-env' from '/Users/philiphowley/Documents/dev/projects/sftpw.com'
    - Did you mean "@babel/env"?

```

* **tip** solution: Worked for me, had to change ['env'] to ['@babel/preset-env'] in `.bablerc` when upgrading from babel 6.x to 7.x
* I removed this code from my `package.json`

```
  "babel": {
    "presets": [
      "env"
    ]
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 9"
  ],
```

## Now our test fails (but for a different reason)
```
Test suite failed to run

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        8.229 s
Ran all test suites.
npm ERR! Test failed.  See above for more details.
```

* The reason it failed is we have a test file but no tests

## Create your first test case
* Just call your `test()` function
* `test()` is not brought in with `require` - why?
    - jest provides the `test()` function as a global in your test suite files
    - jest provides other globals too (to be discussed later)

### test() parameters
* Jest has 2 parameters

1. string - the name for your test case
    * example: 'user should not be able to sign up with a password shorter than n characters'
2. function - contains the code you want to run to verify that the feature is working as expected

### Our first test
`tests/math.test.js`

```
test('Hello world!', () => {

})
```

* Run test again

`$ npm test`

* Now our test passes

```
Hello world! (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.059 s, estimated 6 s
Ran all test suites.
```

## Why does it pass?
* Jest runs the function throws an error than Jest deems that test case a failure
* If the function does not throw an error than Jest deems that test case a success

### Let's force an error to fail a test
```
test('Hello world!', () => {
  throw new Error('Failure!');
})
```

* Run jest with `$ npm test`
* And we get an error looking like:

![jest error](https://i.imgur.com/p0bNNRp.png)

## Run two tests in our test suite
* One success and one fail

```
test('Hello world', () => {

});
test('This should fail', () => {
  throw new Error('Failure!');
})
```

![1 pass 1 fail in a test suite](https://i.imgur.com/I6CGT85.png)

* We can use a test to add up two number
* We could also use this test to log into our Express API with invalid credentials making sure that we don't get an auth token back

## Why do we want to write tests for our key projects?
* Saves time
* Creates reliable software
* Gives flexibility to developers
    - Refactoring
    - Collaborating
    - Profiling
* Peace of mind

### Without testing with something like Jest
* If I needed to make sure my app was completely functional
    - I would have to use Postman
    - I'd have to fire off a bunch of different requests
    - Changing things to make sure I got the correct errors when bad data was provided
    - It would be a slow process
    - There would be a lot of room for human error
        + I could see the results and not realize they are incorrect
* But with a code based test case we can rerun our entire test suite by typing `$ npm test` and waiting a few seconds
    - That is powerful and enables us to create better software over time
