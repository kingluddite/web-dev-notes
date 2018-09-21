# Jest Explained
* Jest writes assertions to see if our code works

## Jest Website
* [jest link](https://jestjs.io/)

## What is Jest
* Jest is a Test Runner
* Made by Facebook
* Runs testing super fast
* Runs a ton of test in parallel
* Has taken over the JavaScript testing world (Used to be dominated by Mocha and Chai)
    - Mocha and Chai are missing many features and ease of use that Jest has

## How to run
* In our app we have a script that `$ npm test` that runs jest  `$ jest --watchAll`
    * This makes jest go off and run any test files `.test.js` and it will run the tests inside that file

### Let's run two tests
* Two tests in one file are run

```js
test('Fake Test', () => {
  expect(true).toBeTruthy();
});

test('Fake Two', () => {
  expect(true).toBeTruthy();
});
```

### Fail one test
```
test('Fake Test', () => {
  expect(true).toBeTruthy();
});

test('Fake Two', () => {
  expect(false).toBeTruthy();
});
```

* The 2nd test fails
    - It failed because it expeced `true` and received `false`
* Notice our terminal is watching and we don't have to keep re-running it

## To assert or not to assert... that is the reason
* We will assert things about our code
* We assert things are true about our code
* Any time that is not as it should be, jest will throw an error
* Jest runs the test
* It gives us the ability to write our assertions (so it is an assertion library)
    - So it is a test runner and an assertion library

### Mocking
* It `mocks` and fakes function
    - Mocks are fake data, or a fake function (something you may not have access to but it is fake)
    - You use fake info for faster tests that are made into smaller chunks when you are testing larger things
    - Maybe you use mocks if you don't want to have to go off and use an API call

### Snapshop Testing
* It takes a snapshot of our code results
* For a react component it could be the actual DOM output and it could check to see if that output is automatically equal to we have output
* There are pros and cons of when you should use it
* You can also run manual testing and you should not just rely on snapshot testing

### Flexibility in testing
* If you want you can:
    - Only run failed tests
    - Only run tests related to changed files
    - Only filter by a filename regex pattern
    - Only filter by a test name regex pattern
    - Quit tests any time with `q`
    - Press `Enter` to trigger a test run

### Jest Docs (API)
* [jest api](https://jestjs.io/docs/en/api)
    - Look at all the methods

## Next - Basic JavaScript testing
