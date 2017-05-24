# Exploring Mocha

## Test file naming convention
* All test files have a special name `filename.test.js`

## Where should I save test files?
* Put test files along side their matching 'live' file inside the current directry where they reside
* These are the files that Meteor will automatically load and print the test results to the screen

## it()

### it() syntax
`it('which test you are talking about', function of test code itself)`

* When you want to define a new test case you use `it()`
    - `it()` is defined by Mocha
    - So you don't have to `import` or `require` it

#### it() says no to arrow functions
* Mocha recommends you avoid using arrow functions inside of `it()`

`imports/api/users.test.js`

```
/* eslint-env mocha */
it('should add two numbers', function() {

});
```

### Moca globals
Add `/* eslint-env mocha */` to the top of the file with mocha globals

### Run test
`$ npm test`

### Autoreload!
* You will usually only need to start it up once a day as it will automatically reload when you update the code

### visit localhost:3000
![test case](https://i.imgur.com/VD0OMIY.png)

* Runs on both **Client** and **Server** (_default behavior of tests inside mocha_)

### Client and Server side testing
* You can isolate on **Client** on **Server** if you want and we will in a bit

### Why is our empty test passing?
Our test is passing because our code inside our test file does not throw an error

### Test fail
```
/* eslint-env mocha */
it('should add two numbers', function() {

});

it('should fail', function() {
  throw new Error('It failed because I demand it!');  
});
```

* Different stack track because one is client and the other is server
![test fail](https://i.imgur.com/P1GTxIw.png)

### Let's test our test
```
/* eslint-env mocha */
const add = (a, b) => a + b;

it('should add two numbers', function() {
  const res = add(11, 9);

  if (res !== 20) {
    throw new Error('Sum was not equal to expected value');
  }
});
```

* It will pass because 9 + 11 will equal 20
* If we change our code `const add = (a, b) => a + b + 3;` that won't add up to 20 and we will get an error

## More Complex Test
```
/* eslint-env mocha */
const add = (a, b) => {
  if(typeof b !== 'number') {
    return a + a;
  }

  return a + b;
}

it('should add two numbers', function() {
  const res = add(11, 9);

  if (res !== 20) {
    throw new Error('Sum was not equal to expected value');
  }
});

it('should double a single number', function() {
  const res = add(11);

  if (res !== 22) {
    throw new Error('Number was not doubled');
  }
})
```

### Exercise
Create a test that checks to make sure you square a number

`const square = a => a * a;`

<details>
  <summary>Solution</summary>
```
/* eslint-env mocha */
const square = (a) => a * a;

it('should square a number', function() {
  const res = square(10);

  if (res !== 100) {
    throw new Error('Number was not squared');
  }
});
```

Result should pass

![passes!](https://i.imgur.com/aA1THNA.png)
</details>

## `describe()`
Allows you to groups tests

* We use `describe()` only for formatting purposes
* Call `describe('method your test is for', function for test)`

```
/* eslint-env mocha */
const add = (a, b) => {
  if(typeof b !== 'number') {
    return a + a;
  }

  return a + b;
}
describe('add', function() {
  it('should add two numbers', function() {
    const res = add(11, 9);

    if (res !== 20) {
      throw new Error('Sum was not equal to expected value');
    }
  });

  it('should double a single number', function() {
    const res = add(11);

    if (res !== 22) {
      throw new Error('Number was not doubled');
    }
  });
});
```

Now we have an `add` test group heading

![describe()](https://i.imgur.com/HPxmaEk.png)

## Exercise
Put square inside its own describe block and call it `square`

<details>
  <summary>Solution</summary>
```
/* eslint-env mocha */
describe('square', function() {
  it('should square a number', function() {
    const res = square(10);

    if (res !== 100) {
      throw new Error('Number was not squared');
    }
  });
});
```

We now have two groupings of tests

![tests pass](https://i.imgur.com/HfwjQAR.png)
</details>



