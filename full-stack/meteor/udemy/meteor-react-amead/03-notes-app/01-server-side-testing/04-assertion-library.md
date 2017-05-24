# Using the Assertion Library
* Our code gets will get more complex
* We need to improve how we test

## Example
* If we are trying to compare objects
  - How do we know if two objects are equal?

`{} === {}`

* That works but what about comparing properties inside objects?
* We can't compare them

```
{ name : 'Drew'}
```

compared to the value in this object

```
{
    name: 'Drew',
    age: 36
}
```

## Assertion Library
* An `Assertion` library can help us do this
* An `Assertion` library is not magical
* It just is a collection of functions that throw errors
* It will enable us to clean up our test
* We can add much more **assertions** with much less code

### [expect js](https://github.com/mjackson/expect)
* Popular assertion Library
* Many believe it is the best and has the cleanest, easy to use, API
* Includes all the features you will want

#### Other Popular Assertion Libraries
* [Chai](http://chaijs.com/)
* [Should.js](https://shouldjs.github.io/)

#### [Expect Js Documentation](https://github.com/mjackson/expect)
* `toExist()`
* `toBe()`
* `toNotBe()`
* Lots more! Read the Documentation

### Install Expect JS
`$ npm i expect -D`

### `package.json` and Dev Dependencies
```
// more code
"devDependencies": {
    "babel-eslint": "^7.2.3",
    "eslint": "^3.19.0",
    "eslint-plugin-react": "^6.10.3",
    "expect": "^1.20.2"
  },
// more code
```

* **note** everything in **devDependencies** will not be installed on Heroku
* It is just added locally for development
* It is stuff that will only be necessary when someone is working on the project on their local machine

### Import Expect
`users.test.js`

```
import expect from 'expect';
```

* We call `expect()` with the value we want to check

So instead of this:

```
/* eslint-env mocha */
it('should add two numbers', function() {
    const res = add(11, 9);
    if (res !== 20) {
      throw new Error('Sum was not equal to expected value');
    }
  });
```

We can use this:

```
/* eslint-env mocha */
import expect from 'expect';


const add = (a, b) => {
  if(typeof b !== 'number') {
    return a + a;
  }

  return a + b;
}

const square = a => a * a;

describe('add', function() {
  it('should add two numbers', function() {
      const res = add(11, 9);
      expect(res).toBe(20);
    });

// more code
```

* Our code is shorter
* If we break our code by modifying this line: `expect(res).toBe(20);`

The Error is more helpful with the actual numbers

![error with numbers](https://i.imgur.com/3J3McTW.png)

### Update our code using assertions

```
/* eslint-env mocha */
import expect from 'expect';

const add = (a, b) => {
  if(typeof b !== 'number') {
    return a + a;
  }

  return a + b;
}

const square = (a) => a * a;

describe('add', function() {
  it('should add two numbers', function() {
    const res = add(11, 9);
    expect(res).toBe(20);
  });

  it('should double a single number', function() {
    const res = add(11);
    expect(res).toBe(22);
  });
});

describe('square', function() {
  it('should square a number', function() {
    const res = square(10);
    expect(res).toBe(100);
  });
});
```
