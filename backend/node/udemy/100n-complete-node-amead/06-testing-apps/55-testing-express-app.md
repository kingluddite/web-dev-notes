# Testing Express Apps
## Install express
`$ yarn add express`

* We install express as a dependency because we need it for production server

## Server
`$ mkdir server`

`$ touch server/server.js`

`server.js`

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('yo world!');
});

app.listen(3000);
```

* `package.json` shows the difference between **dependencies** and **dev-dependencies**

## Run server
`$ node server/server.js`

`yo world!` prints to the 

## Testing the Express app
* When can test when we make a HTTP GET request we get a `yo world` response back
* Traditionally testing HTTP apps has been difficult to test
    - You have to fire up a server
    - Then you would need code to make the request to the appropriate URL
    - Then you'd have to dig through the response, get what you want and making assertions about it:
        + headers
        + status code
        + body
        + etc...
        + It has been a real burden

### Make testing HTTP requests easy
#### Super Test library
* Created by Express developers
* Has built in support for express
* Makes testing HTTP request super simple
* [link to supertest](https://github.com/visionmedia/supertest)
* sample code

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'tobi' });
});

request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
```

## Install supertest
`$ yarn add supertest -D`

## Create server test folder
`$ touch server/server.test.js`

## Export our app
* We add this to the bottom so that we can use the app module in our test file

`server.js`

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('yo world!');
});

app.listen(3000);
module.exports.app = app; // added this line
```

`server.test.js`

```js
const request = require('supertest');

const app = require('./server').app;

it('should return yo world response', (done) => {
  request(app)
    .get('/')
    .expect('yo world!')
    .end(done);
});
```

* We write an assertion
* We use done because this is async code
* We say the output we expect (yo world!)
* We call `done` to let express know we are finished

## Run test-watch script
* Make sure nodemon and mocha are installed
  - `$ yarn add nodemon mocha -D`
* Run the test-watch script
  - `$ npm run test-watch`

## Test for 200 status code
```js
const request = require('supertest');

const app = require('./server').app;

it('should return yo world response', (done) => {
  request(app)
    .get('/')
    .expect(200) // add this line
    .expect('yo world!')
    .end(done);
});
```

## Make some changes to make request fail
```js
const request = require('supertest');

const app = require('./server').app;

it('should return yo world response', (done) => {
  request(app)
    .get('/')
    .expect(200) // add this line
    .expect('yo world!!!')
    .end(done);
});
```

* That causes an error because the expected rendered string is wrong

`server.js`

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(404).send('yo world!');
});

app.listen(3000);
module.exports.app = app;
```

* Now we get an error because we are expecting 404 error status but we get a 200 status

`server.js`

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found.'
  });
});

app.listen(3000);
module.exports.app = app;
```

`server.js`

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found.',
    name: 'Todo App v1.0'
  });
});

app.listen(3000);
module.exports.app = app;
```

## Use supertest with expect
`server.test.js`

```js
const request = require('supertest');
const expect = require('expect');

const app = require('./server').app;

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
```

`server.js`

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found.',
    name: 'Todo App v1.0'
  });
});

app.listen(3000);
module.exports.app = app;
```

* Now all tests pass
`server.test.js`

```js
const request = require('supertest');

const app = require('./server').app;

it('should return yo world response', (done) => {
  request(app)
    .get('/')
    .expect(404)
    .expect({
      error: 'Page not found.'
    })
    .end(done);
});
```

## Challenge
* Create a route and run test to test it
* Two side to this challenge
  - This actual setup in `server.js`
  - And the test
### specs
*  Create new route `/users`
*  GET request
*  Will return an array of objects where each object is a user
  -  Give users a name and age property
  -  Create 3 users for this example
* Write a test that asserts it works as expected 
  -  Write the test inside `server.test.js`
  -  Assert a status code of `200`
  -  Make an assertion that inside of that array that your user object exists and use `toInclude` to assert that
    +  There can be other users but you just want to test that your user exists (you created 3 users, one is you and the other 2 are your friends)
      *  An object in that array with the first name equal to whatever you set and the age equal to your age
      *  Run the test and see if it passes

### Solution
`server.js`

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found.',
    name: 'Todo App v1.0'
  });
});

app.get('/users', (req, res) => {
  res.send([
    {
      name: 'Manny',
      age: 21
    },
    {
      name: 'Moe',
      age: 22
    },
    {
      name: 'Jack',
      age: 23
    }
  ]);
})

app.listen(3000);
module.exports.app = app;
```

`server.test.js`

```js
const request = require('supertest');
const expect = require('expect');

const app = require('./server').app;

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
```

