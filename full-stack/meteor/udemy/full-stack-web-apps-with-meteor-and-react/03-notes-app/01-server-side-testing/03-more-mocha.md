# Exploring Mocha
* All test files have a special name `filename.test.js`
* Put test files along side their matching 'live' file inside the current directry where they reside
* These are the files that Meteor will automatically load and print the test results to the screen

## it('which test you are talking about', function of test code itself)
* When you want to define a new test case you use `it()`
    - `it()` is defined by Mocha so you don't have to import or require it
* Mocha recommends you avoid using arrow functions inside of `it()`

`imports/api/users.test.js`

```
it('should add two numbers', function() {

});
```

### Run test
`$ npm test`

* You will usually only need to start it up once a day as it will automatically reload when you update the code

### visit localhost:3000
![test case](https://i.imgur.com/VD0OMIY.png)

* Runs on both client and server (_default behavior of tests inside mocha_)
* You can isolate on client on server if you want and we will in a bit
* Our test is passing because our code inside our test file does not throw an error

### Test fail
```
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
const square = (a) => a * a;

it('should square a number', function() {
  const res = square(10);

  if (res !== 100) {
    throw new Error('Number was not squared');
  }
});
![passes!](https://i.imgur.com/aA1THNA.png)
```
</details>

## How to Group your tests with `describe()`
* For formatting only
* Call `describe('method your test is for', function for test)`

```
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

## Exercise
Put square inside it's on describe block and call it `square`

<details>
  <summary>Solution</summary>
```
describe('square', function() {
  it('should square a number', function() {
    const res = square(10);

    if (res !== 100) {
      throw new Error('Number was not squared');
    }
  });
});
```
</details>



