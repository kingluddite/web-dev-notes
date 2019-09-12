# Setting up jest
* created by facebook
* works great with react
* best for react apps

## Other test frameworks
* jasmine/mocha
    - node
* karma
    - angular

## Install jest
* [jest website](https://facebook.github.io/jest/)
* `$ yarn add jest`
* Add to `package.json`
    - Now we can type `$ yarn run test`

```
// // MORE CODE
  "heroku-postbuild": "yarn run build:prod",
  "test": "jest"
},
"lint-staged": {
// // MORE CODE
```

## Run jest
`$ yarn run test`

* The test script name has a special meaning in yarn
    - test and start both have aliases
        + so `$ yarn test` is the very exact same as `$ yarn run test`
        + so we can just type `$ yarn test`
* `$ yarn test`
    - We see a notice that no tests were found

## the `src/tests` folder
* All our test cases go inside this folder
* `$ touch add.test.js`
    - Very import to have `*.test.js` extension
    - Jest scrapes your codebase and looks for files with `*.test.js` extension

### global variables available to jest
* **test**(NAME(required), CODE TO RUN FOR TEST CASE(required))
    - enables us to set up a new test case

`src/tests/add.test.js`

```js
const add = (a, b) => a + b;

test('should add two numbers', () => {
  const result = add(3, 4);
});
```

`$ yarn test`

![jest output](https://i.imgur.com/xC2hX4X.png)

* We passed 1 test
* Why did it pass?
    - Because we didn't throw any errors from this function

### Create real test case
* By asserting something about it's value

```js
const add = (a, b) => a + b;

test('should add two numbers', () => {
  const result = add(3, 4);

  if (result !== 7) {
    throw new Error(`You added 4 and 3. The result was ${result}. Expect 7`);
  }
});
```

`$ yarn test`

* It will output we passed again
* But if we make an error:

![we get this error](https://i.imgur.com/nQxamDy.png)

* We just created an assertion
* If it was what we expected... we did nothing
* If is wasn't we through an error
* Keeping track of all the assertions is a pain
* Jest gives us access to an assertion library

## A basic assertion
* If two values are the same

### expect
```js
const add = (a, b) => a + b + 1;

test('should add two numbers', () => {
  const result = add(3, 4);

  expect(result).toBe(7);
});
```

* It fails and lets us know
* Change it so that it passes and test

## More on Jest docs
* Globals
    - [link to Globals](https://facebook.github.io/jest/docs/en/api.html)
    - test()
        + [link to test()](https://facebook.github.io/jest/docs/en/api.html#testname-fn-timeout)
* Expect
    - [link to Expect](https://facebook.github.io/jest/docs/en/expect.html)

## Run Jest in watch mode
`package.json`

```
// // MORE CODE
  "heroku-postbuild": "yarn run build:prod",
  "test": "jest --watch"
},
// // MORE CODE
```

* Now all changes when made will be tested and watched for future changes

## Watch out!
* We don't want to always watch when we test (like when we deploy)
* So we will just type `$ yarn test --watch` in terminal and not in `package.json`

`$ yarn test --watch`

## Challenge
```js
const add = (a, b) => a + b;
const generateGreeting = name => `Hello ${name}!`;

test('should add two numbers', () => {
  const result = add(3, 4);

  expect(result).toBe(7);
});

test('should generate greeting from name', () => {
  const result = generateGreeting('John');
  expect(result).toBe('Hello John!');
});
```

* `$ yarn test --watch`
* Tests should pass

## Test if no name is passed and we have a default value 'Anonymous'

```js
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;

test('should generate greeting for no name', () => {
  const result = generateGreeting();
  expect(result).toBe('Hello Anonymous!');
});

