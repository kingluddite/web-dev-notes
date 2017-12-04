# Organize with Describe
* `describe()` from mocha
* lets you group tests together
* currently all our tests are grouped together
* `describe(NAME, callback)`

`utils.test.js`

```js
const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => {
  
  describe('@add', () => {
    it('should add two numbers', () => {
      const res = utils.add(33, 11);

      expect(res).toBe(44).toBeA('number');
      // if (res !== 44) {
      //   throw Error(`Expected 44, but got ${res}.`);
      // }
    });
  })

  it('should async add two numbers', (done) => {
    utils.asyncAdd(4, 3, (sum) => {
      expect(sum).toBe(7);
      done();
    });
  });

  it('should square a number', () => {
    const res = utils.square(10);

    expect(res).toBe(100).toBeA('number');
    // if (res !== 100) {
    //   throw Error(`Expected 100, but instead got ${res}.`);
    // }
  });

  it('should async square a number', (done) => {
    utils.asyncSquare(10, (res) => {
      expect(res).toBe(100).toBeA('number');
      done();
    });
  });

});

it('should set firstName and lastName', () => {
  const user = {location: 'LA', age: 30};
  const res = utils.setName(user, 'John Doe');

  expect(res).toInclude({
    firstName: 'John',
    lastName: 'Doe'
  });  
});
```

# Challenge
* For `server.test.js`

```
// Server
    // GET /
        // some test case
    // GET /users
        // some test case
```

## Solution
`server.test.js`

```js
const request = require('supertest');
const expect = require('expect');

const app = require('./server').app;

describe('Server', () => {

  describe('@GET /', () => {
    it('should return yo world response', (done) => {
      request(app)
        .get('/')
        .expect(404)
        .expect((res) => {
          expect(res.body).toInclude({
            error: 'Page not found.'
          });
        })
        .end(done);
});

  });

  describe('@GET /users', () => {

    it('should return a user object', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude({
            name: 'Manny',
            age: 21
          });
        })
        .end(done);
    });
  });

});
```

* Output will look like this:

![passing tests with describe](https://i.imgur.com/M5aPBWC.png)



