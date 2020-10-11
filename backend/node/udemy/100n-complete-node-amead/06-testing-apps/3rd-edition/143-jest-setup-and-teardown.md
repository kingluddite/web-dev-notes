# Jest setup and teardown
* We'll use Jest LCM (lifecycle methods) to run some code just before or after a test case
* This will permit us to set up code to clear the Database so our test cases can consistently execute as expected

## Jest Setup and Teardown
* [docs for jest setup and teardown](https://jestjs.io/docs/en/setup-teardown)

`tests/auth.test.js`

```
const request = require('supertest');
const app = require('../app');

beforeEach(() => {
  console.log('beforeEach');
})

afterEach(() => {
  console.log('afterEach');
})

test('Should signup a new user', async () => {
  await request(app).post('/api/v1/auth/register').send({
    "name": "Johnny Test",
    "email": "jane@example.com",
    "password": "123456",
    "role": "user"
  }).expect(201)
})
```

* You'll see the before runs before and the after after
* **note** We won't need to use afterEach but know it exists
* We also have access to:
    - `beforeAll()`
    - `afterAll()`
    - **note** both run just a single time before your test cases or after them
* **notee** `beforeEach()` is the write hook for us to use in this case because we want to make sure that every single test that runs, runs in the same environment with the same test data in the Database

## What do we want to do with our data?
* We just want to wipe all the users inside of the users collection so our tests can run consistently and correctly
    - This means we need access to that User model

`tests/auth.test.js`

```
const request = require('supertest');
const app = require('../app');
const User = require('../models/User'); // ADD!

// MORE CODE
```

* And here is our working test code

```
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

beforeEach(async () => {
  await User.deleteMany()
})

test('Should signup a new user', async () => {
  await request(app).post('/api/v1/auth/register').send({
    "name": "Johnny Test",
    "email": "jane@example.com",
    "password": "123456",
    "role": "user"
  }).expect(201)
})
```

# Houston we have a problem!
* Was getting this warning:

```
A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --runInBand --detectOpenHandles to find leaks.
```

* [source](https://stackoverflow.com/questions/64074713/try-running-with-runinband-detectopenhandles-to-find-leaks)
* The error stopped after briefly add this to package.json

```
    "test": "env-cmd -f ./config/test.env jest --runInBand --detectOpenHandles --watch"
```

* I ran `$ npm test` once and the error went away

* Then put back the old way:

`package.json`

```
// MORE CODE

    "test": "env-cmd -f ./config/test.env jest --watch"

// MORE CODE
```

* And the error was gone
* All our tests pass - good!
* Because all our tests start with an empty database - good!
    - We want to make sure that we have a consistent set of data for our tests to work with

## What about logging in?
* We'll need data (users) in the Database
* We'll need some very specific data in the Database that we can use when testing

`tests/auth.test.js`

```
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

const userOne = {
  name: 'George Washington',
  email: 'george@sftpw.com',
  password: '123456',
  role: 'user'
}

beforeEach(async () => {
  await User.deleteMany()
  const user = new User(userOne);
  await user.save(user);
})

test('Should signup a new user', async () => {
  await request(app).post('/api/v1/auth/register').send({
    "name": "Johnny Test",
    "email": "jane@example.com",
    "password": "123456",
    "role": "user"
  }).expect(201)
})
```

* We can make our code more compact using some refactoring

```
// MORE CODE

beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save();
});

// MORE CODE
```

* Works the same but it is still readable but less to type

## Login test
`tests/auth.test.js`

```
// MORE CODE

test('Should login existing user', async () => {
  await request(app).post('/api/v1/auth/login').send({
    "email": userOne.email,
    "password": userOne.hashed_password
  }).expect(200)
})
```

* A lot of our test cases will need a user to already exist
    - Things for logging in
    - Adding an avatar
    - Updating a profile
    - Creating a task
    - Lots more

## Try this:
```
Goal: Test login fail

1. Create "Should not login nonexistent user"
2. Send out the request with bad credentials
3. Expect the correct status response
4. Test your work
```
