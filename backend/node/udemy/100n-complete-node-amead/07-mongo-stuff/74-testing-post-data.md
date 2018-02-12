# Testing Post Data
## Install test modules
* expect (insertions)
* mocha (entire test suite)
* supertest (test our express routes)
* nodemon (allows us to create test script to watch the test suite)
    - We have nodemon install globally
    - It is a great idea to install it locally as well

`$ yarn add expect mocha nodemon supertest -D`

![dev dependencies listed](https://i.imgur.com/p9fAGGd.png)

**note** Like yarn, npm is now caching modules for quicker loadtimes

## Create our test directory
* We store all our tests inside this folder

`server/tests/server.test.js`

```js
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
```

* We don't need to require mocha and nodemon
* We'll need to load in `expect` and `supertest`
* We'll also need to load in our model and our express app (in server.js)
* Currently, server.js exports nothing... so let's fix this with:

```js
// more code
app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
```

### Set up our test scripts
* We do this inside `package.json`
* We'll have 2
    - `test` - will just run the tests
    - `test-watch` - will run the test script through nodemon
        + Anytime we save our app the tests will rerun
        + To test everything in a directory and a sub directory use the **glob pattern** `server/**/*`
        + And any file that end ins `.js` ----> `server/**/*.js`
        + `--exec` specify a custom command to run inside of single quotes

`package.json`

```json
{
  "name": "mongo-stuff-2",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha server/**/*.test.js",
    "test-watch": "nodemon --exec 'npm test'"
  },
  "keywords": [],
// more code
}
```

## Houston we have a problem
* Inside our server.test.js file we are assuming there is nothing already in our db
    - We do this because we expect the `todos` to be a length of **1**

```
// more code
Todo.find().then((todos) => {
  expect(todos.length).toBe(1);
// more code
```

* We are assuming the total count will be 1 after adding 1
* This assumption will not be correct
* If we ran the test now it would fair because we already have todos in the database

### Testing Lifecycle method
* `beforeEach`
    - Will enable us to run some code before every single test case
    - We'll use `beforeEach` to set up our DB in a way that's useful
        + For now, all we'll do is make sure the DB is empty

```
// more code
const {Todo} = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
// more code
```

* This function will run before every test case
* And it will only move onto the test case once we call done
    - That means we can do something asynchronous inside
    - We'll call Todo.remove()
    - Similar to mongoDB native method, we just pass in an empty object `{}`
        + This will wipe out all of our Todos
        + We return a Promise so we tack on `then()`
            * And in our callback we'll call done()
            * Now our DB will be empty before every request
            * Now our assumption is correct
                - We assume we start with 0 todos
                - And we do because we just used `beforeEach` to delete everything

`$ npm run test-watch`

* Make sure `$ mongod` is running

`server/tests/server.test.js`

```js
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });
});
```

* That will pass

### Troubleshoot
* If you get address not defined make sure you export **app** from `server.js`

### Test by breaking
```
// more code
        Todo.find().then((todos) => {
          expect(todos.length).toBe(1 + 2);
          expect(todos[0].text).toBe(text + 'yo');
          done();
        }).catch((e) => done(e));
      });
  });
});
```

* That will fail and say expect 3 and Received 1
    - Our DB value will always be 1 because we are always wiping it
* The error is because the two are not equal and our test says they must be
    - Must be `text` and not `textyo`

```
// more code
request(app)
  .post('/todos')
  .send({text})
  .expect(201)
// more code
```

* That will fail because we are expecting 201 and we get 200

## Second Test case (Challenge)
* Make sure a todo DOES NOT get created when we send bad data
* Send test an empty object `{}`
* Expect 400 is error of server status
* Check for errors
* Make sure length of todos is 0 (no document will be inserted )
    - **note** The beforeEach will run before each test case so it will run and our DB will be empty when we try the `should not create todo` test case
    - We won't make any assertions about the body
    - We won't be making any assertions about the todos array

`server.test.js`

```
// more code
it('should not create todo with invalid body data', (done) => {
  request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(0);
        done();
      }).catch((e) => done(e));
    });
});
// more code
```

## Git
* add and push with commit `$ git commit -m 'test POST /todos route'`

## Next
* New route
    + GET request to fetch all todos 
