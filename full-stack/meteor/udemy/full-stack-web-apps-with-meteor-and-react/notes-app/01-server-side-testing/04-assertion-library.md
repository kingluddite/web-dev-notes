# Using the Assertion Library
* When our code gets more complex we will have to figure out a way to improve how we test

If we are trying to compare objects

`{} === {}` - We are comparing if two objects are equal

But we can't  compare the properties inside objects

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
An `Assertion` library can help us do this

* An Assertion library is not magical, it just is a collection of functions that throw errors
* It will enable us to clean up our test and add much more assertions with much less code

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
* Lots more!

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
* It is just added locally for development, it is stuff that will only be necessary when someone is working on the project on their local machine

### Import Expect
`users.test.js`

```
import expect from 'expect';
```

* We call `expect()` with the value we want to check

So instead of this:

```
it('should add two numbers', function() {
    const res = add(11, 9);
    if (res !== 20) {
      throw new Error('Sum was not equal to expected value');
    }
  });
```

We can use this:

```
it('should add two numbers', function() {
    const res = add(11, 9);
    expect(res).toBe(20);
  });
```

* Our code is shorter
* If we break our code by modifying this line: `expect(res).toBe(20);`

The Error is more helpful with the actual numbers

![error with numbers](https://i.imgur.com/3J3McTW.png)

### Update our code using assertions

```
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
