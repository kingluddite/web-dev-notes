# Test Spies
* spies come build in with expect
* createSpy will return a function and we store that inside a variable
* [spy documenation](https://github.com/mjackson/expect)
    - Scroll to the bottom and look for lots of (spies)

`app.test.js`

```js
const expect = require('expect');

describe('App', () => {

  it('should call the spy correctly', () => {
    var spy = expect.createSpy();
    spy();
    expect(spy).toHaveBeenCalled();
  });

});
```

You will see this:

![spies called](https://i.imgur.com/Unp3Qcj.png)

```js
const expect = require('expect');

describe('App', () => {

  it('should call the spy correctly', () => {
    var spy = expect.createSpy();
    //spy();
    expect(spy).toHaveBeenCalled();
  });

});
```

* We comment out spy() and we get a failed test because the spy was never called

## assert spy was called with specific arguments
```js
const expect = require('expect');

describe('App', () => {

  it('should call the spy correctly', () => {
    var spy = expect.createSpy();
    spy('John', 25);
    expect(spy).toHaveBeenCalledWith('John', 25);
  });

});
```

* And we can fail a test if we don't call with proper arguments

```js
const expect = require('expect');

describe('App', () => {

  it('should call the spy correctly', () => {
    var spy = expect.createSpy();
    spy('John');
    expect(spy).toHaveBeenCalledWith('John', 22);
  });

});
```

## npm rewire
* We need a spy to simulate that function inside app.js
* Module enables us to swap out variables for our tests
* We will test that the function was called with the correct arguments

### Install rewire
`$ yarn add rewire -D`

* To use it you use `rewire` instead of `require`
* It does the same thing as require but it also adds two methods `__set__` and `__get__`

```js
const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {
  const db = {
    saveUser: expect.createSpy()
  }

  app.__set__('db', db);

  it('should call the spy correctly', () => {
    var spy = expect.createSpy();
    spy('John', 22);
    expect(spy).toHaveBeenCalledWith('John', 22);
  });
  
  it('should call saveUser with user object', () => {
    const email = 'joe@joe.com';
    const password = 'abc123';

    app.handleSignup(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({email, password});
  });
});
```

`$ npm run test-watch`
