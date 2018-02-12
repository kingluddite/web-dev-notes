## Seeding Test DB with Users
* We'll need an x-auth token inside a supertest
* Need to put x-auth in db

## Create separate file for creating seed data
* And define function that gets passed to our `beforeEach` method

### Run test suite
`$ npm test`

* To make sure all current tests are passing

`server/tests/seed/seed.js`

* Cut this out of `server.test.js` and paste into `seed.js`

`seed.js`

```js
const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo',
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 123,
  },
];
```

### Complete `seed.js`
```js
const { ObjectID } = require('mongodb');
const { Todo } = require('./../../models/todo');

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo',
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 123,
  },
];

const populateTodos = done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
};

module.exports = { todos, populateTodos };
```

* We import ObjectID and the Todo model using destructuring
* We make sure to export the two methods

## Next import our seed.js into our test file
`server.test.js`

```js
const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { todos, populateTodos } = require('./seed/seed');

beforeEach(populateTodos);
// MORE CODE
```

* No functionality changed
* Just organized our code better and isolated are seed file

## Test to make sure test suite works as it did before
`$ npm test`

## Add seed data for user's collection
* Load in User model

`seed.js`

```js
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: 'luke@starwars.com',
    password: 'jediknight',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString(),
      },
    ],
  },
  {
    _id: userTwoId,
    email: 'leia@starwars.com',
    password: 'princess',
  },
];

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo',
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 123,
  },
];

const populateTodos = done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
};

module.exports = {todos, populateTodos};
```

* We have our users created
* Time to populate the db
* We'll make a function similar to `populateTodos` but with one IMPORTANT caveat
    - insertMany will not run on our middleware
    - This means our plain text password will get stored in the db
    - This will create problems when we test the password because our tests will be checking that our passwords will be properly hashed

## How to we insert users and hash the password?
* We will tweak how we create users
* We have two Promises and we need to wait for them both to succeed
    - We shoud use Promise.all
        + Promise.all takes an array of Promises

`Promise.all([userOne, userTwo]).then(() => {
})` - the then() will not get called until all the Promises inside that array are called

```js
const populateUsers = done => {
  // remove all Users from the db
  User.remove({}).then(() => {
    // returns Promise
    const userOne = new User(users[0]).save();
    // returns Promise
    const userTwo = new User(users[1]).save();

    Promise.all([userOne, userTwo]).then(() => {});
  });
};
```

* But we will return that last Promise so we'll alter the code to look like this:

```js
const populateUsers = done => {
  // remove all Users from the db
  User.remove({})
    .then(() => {
      // returns Promise
      const userOne = new User(users[0]).save();
      // returns Promise
      const userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};
```

## Test it
* Drop the test db to start our tests with fresh data
* Save the files
* Add a second beforeEach() method inside `server.test.js`
* We need to export `populateUsers()` and `users`

`seed.js`

```js
module.exports = { todos, populateTodos, users, populateUsers };
```

### Import them to our test file
`server.test.js`

```js
const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed'); // update this line

beforeEach(populateUsers); // add this line
beforeEach(populateTodos);

// MORE CODE
```

* Rerun test suite

![test db populated with seed data](https://i.imgur.com/J5IGQyZ.png)

* Our tests pass
* Look inside Robomongo at the users collection of TodoAppTest
    - 1st user is 2nd record of our seed data
        + password is hashed
        + nothing in tokens array
    - 2nd user is 1st record of our seed data
        + id
        + email
        + hashed pwd
        + And token array
        + We will use this token to run those test that require authentication

## Write test cases for seed data
