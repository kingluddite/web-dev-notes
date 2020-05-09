# Setting up jest
* We will setup the Jest test framework
* Created by facebook
* Works great with react
* Best for react apps

## Other test frameworks
* jasmine/mocha
    - node
* karma
    - angular

## Install jest
* We will install jest and write our first test cases
* [jest website](https://facebook.github.io/jest/)

`$ npm i jest -D`
`$ yarn add jest -D`

## Now we want to use Jest
* We won't be importing this into our project
  - Think of Jest more like live-server or Webpack where we will be using Jest from the command line
  - We didn't install it globally as we know that is a BAD PRACTICE!

## We will run Jest from package.json using a script
* Let's create another script inside our package.json

`package.json`

```
  "scripts": {
    "build": "webpack",
    "fix-styles": "prettier-stylelint --write 'src/**/*.{css,scss}' ",
    "dev-server": "webpack-dev-server --open",
    "test": "jest"
  },

```

* We'll play around with the above `jest` command but for now we have enough to get it running
* We can run Jest even without test files or test cases

## Run jest

`$ npm run test`
`$ yarn run test`

### yarn stuff
* The test script name has a special meaning in yarn
    - `test` and `start` both have aliases
        + So `$ yarn test` is the very exact same as `$ yarn run test`
        + So we can just type `$ yarn test`
* `$ yarn test`
    - We see a notice that no tests were found

## I'll run with npm and `$ npm run test`
* We get errors that "no tests found"

![no tests found error](https://i.imgur.com/KaWsXpK.png)

* You can also run this shorthand

`$ npm test`

* Jest is kind of giving you an error because it looked throughout your entire app using some file pattern detection for any test file and found none

## the `src/tests` folder
`$ mkdir src/tests`

* We need to create a folder to hold all of our tests
* All our `test cases` go inside this folder

### Create our first test file
`$ touch add.test.js`

* Very import to have `*.test.js` extension
* **note:** When Jest scrapes your codebase it looks for files with `*.test.js` extension
  - Without that `.test.js` no test will run

### Run a test with this new test file
`$ npm test`

* We get an error "Test suite failed to run" and "Your test suite must contain at least one test"

![here is the test error](https://i.imgur.com/9z9uNGZ.png)

## Let's write our first test
`src/tests/add.test.js`

```
const add = (a, b) => a + b;
```

### global variables available to jest
* When we do have one of these test files that Jest runs Jest gives us access to a couple of global variables and these allow us to construct our test cases

#### test()
* Allows us to set up a new test case
  - With this new test case we'll get rid of our previous error

##### test() has 2 required arguments
1. A Name (it is always string) 
2. The code to run for the test case (it is always an arrow function)

`src/tests/add.test.js`

```
const add = (a, b) => a + b;

test('should add two numbers', () => {
  // this is where we write test cases for our code
  const result = add(3, 4);
});
```

* We have our function and below we have our test of that function
* We pass in the arguments our function expects and we test it

### Now let's run this test case
`$ npm test`

![jest output now passing test case](https://i.imgur.com/xC2hX4X.png)

* Output shows us how long it took for out test to pass
* And how many Test Suites and Tests passed

### Why did this test case pass?
* Because we didn't throw any errors from this function
* We just called result but we haven't looked at the value

### Let's create real test case by ASSERTING something about its value
* We will check if it equals what we expect, if not we'll throw an error
* We expect our function to return `7` if the numbers `3` and `4` are passed as arguments. If the result is not `7` then we'll return an error

```
const add = (a, b) => a + b;

test('should add two numbers', () => {
  const result = add(3, 4);

  if (result !== 7) {
    throw new Error(`You added 4 and 3. The result was ${result}. Expect 7`);
  }
});
```

`$ npm test`

* It will output we passed again

## But if we changes things up like this:
```
const add = (a, b) => a + b + 1;

test('should add two numbers', () => {
  const result = add(3, 4);

  if (result !== 7) {
    throw new Error(`You added 4 and 3. The result was ${result}. Expect 7`);
  }
});
```

* Now we get an error

![first error](https://i.imgur.com/7Vncwn0.png)

* It also shows us which test failed
* You added 4 and 3. The result was 8. Expect 7
* This is pretty good information about why this test failed and it also gives us great insight on how to possible fix it to remove the error and bring our code back to a working state
* We just essentially created our first `assertion`

### We just created an assertion
* We asserted something about a given value in our program
* If it was what we expected we did NOTHING
* If it wasn't we threw an ERROR
* We are going to make a ton of assertions so keeping track of this boilerplate code we become tedious and problematic
  - Jest will help us write better test code because it gives us access to an "Assertion Library"
  - Jest gives us access to this function and we can use this function to make assertions about values in our program
  - Take a moment to dig through the Jest docs to see if you can find where this lives

## Our first basic Jest assertion
* Let's check if two values are the same
* We will use another global function provided by Jest called `expect`j

### expect
* How expect works
  - We pass the value in that we want to make and assertion about
  - Then we access one of the many (there are a lot) methods that Jest gives us
  - Let's use one of the popular methods `toBe()` in the following example

#### Our setup
* We assign our `result` variable to the value returned by a call to our add function and pass it 3 and 4 as arguments
* We then use `expect` and `toBe()` to ascertain that the answer is expected to be `7`

```
const add = (a, b) => a + b + 1;

test('should add two numbers', () => {
  const result = add(3, 4);

  expect(result).toBe(7);
});
```

* It fails and lets us know where it fails

![expect and toBe fail](https://i.imgur.com/E6ca0Z3.png)

* Change it so that it passes and test

```
const add = (a, b) => a + b;

test('should add two numbers', () => {
  const result = add(3, 4);
  expect(result).toBe(7);
});

```

* Run again

`$ npm test`

* And the test passes

## That is the basics of Jest
* Pretty simple, right?
* But our test cases will get more complex
* We'll be testing components and other stuff in our app

## Now let's take a deep dive in the [Jest docs](https://jestjs.io/docs/en/getting-started)

### Where does the test() function live?
* Under `Globals`
  - This shows you all the global methods that Jest provides to you
  - It will also only provide this to you in your test files
  - That is why naming your test files is so important `something.test.js`
* [link to Globals](https://jestjs.io/docs/en/api#methods)

#### test()
* [link to test()](https://jestjs.io/docs/en/api#testname-fn-timeout)

#### Where is expect()?
* Has it's own page of docs because there is so much to it
* We have access to approx 35 assertions through `expect()`
* [link to Expect](https://jestjs.io/docs/en/expect)

## Run Jest in watch mode
* Re-running our test case over and over again is annoying so let's set up watch so we run once and it watches as we make changes to our tests
* `watch` mode is similar to webpack watch as it watches all our changes to our files or things those files imports change, jest will run the test suite and then we can see the test results update and now we can just keep writing code without stopping and starting all the time

`package.json`

```
// // MORE CODE
  "heroku-postbuild": "yarn run build:prod",
  "test": "jest --watch"
},
// // MORE CODE
```

* Now all changes when made will be tested and watched for future changes

## We could add this to package.json but we won't
* We don't want to always watch when we test (like when we commit or deploy)
* So we will just type `$ npm test --watch` or `$ yarn test --watch` in terminal and not in `package.json`

`$ npm test --watch`

`$ yarn test --watch`

## Houston we have a problem
* It just completes and brings us back to the command line (not what we wanted)
* What is the problem?
  - The `--watch` argument is being associated with the `npm` command not with the `jest` command that is the **script**
  - To pass the argument from the command line down to the script we will need to add something into the command line
    + `$ npm test -- ` (the 2 dashs `--` says everything before is associated with `npm` and everything after is associated with the **script**)
    + `$ npm test -- --watch`
* So let's type that in the command line

`$ npm test -- --watch`

* Now as Jest starts up it stays up and we'll be able to see any changes to our program reflected in the background

## Try it out
```
const add = (a, b) => a + b;

test('should add two numbers', () => {
  const result = add(3, 4);
  expect(result).toBe(8);
});
```

* We changed `.toBe(7)` to `.toBe(8)` and now we have an error
* Switch it back to `.toBe(7)` and it passes again
## Challenge
* Store a reference to a function that takes in a name "Joe" and outputs `Hello Joe!`

```
const generateGreeting = (name) => `Hello ${name}!`;
```

### Now you want to write a test for that function
```
const generateGreeting = name => `Hello ${name}!`;

test('should return a personal greeting', () => {
  const result = generateGreeting('Joe');
  expect(result).toBe('Hello Joe!');
});
```

* You should see 2 tests passed

![2 tests pass](https://i.imgur.com/syxNm85.png)

## Also test if no name is passed that a default value is in the greeting
* We can easily add on to our existing tests

```
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;

test('should return a personal greeting', () => {
  const result = generateGreeting('Joe');
  expect(result).toBe('Hello Joe!');
});

test('should return an anonymous greeting if no name passed', () => {
  const result = generateGreeting();
  expect(result).toBe('Hello Anonymous!');
});
```

* We could run these tests before we deploy to say "only deploy if all our test cases pass"

## Recap
* We installed Jest
  - Jest is a test framework
* We created our first test file
* We need to name our test files with `something.test.js`
* We explored Jest's `test()` function to set up a new test case
* And the `expect()` function to make assertions

## Next - Test code in our expensify app
