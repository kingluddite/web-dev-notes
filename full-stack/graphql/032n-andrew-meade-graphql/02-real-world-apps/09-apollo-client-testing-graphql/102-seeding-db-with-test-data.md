# 102 Seeding Database with test data
* We will learn how to manipulate our test Database before our test cases run
* We saw we had a problem when testing the creation of a new user with createUser
    - You create a user
    - You can't test again because that user was created and that email was taken and we got the "email constraint" error

## Jest gives us life cycle tools
* API > API Reference > Globals
* [api docs](https://jestjs.io/docs/en/api)

### after and before methods
* afterAll(fn, timeout)
    - Will run a single time after all tests are done
* afterEach(fn, timeout)
    - Will run after each test case
* beforeAll(fn, timeout)
    - Will run before all tests are run
* beforeEach(fn, timeout)
    - Will run before each test case

#### beforeEach()
* We will use this to run before to clear all records so all tests start with the same test Database
* We call `beforeEach()` just like we would call test()
    - Just takes a single argument
        + Which is the function to run before each test case

##### function signature
* Will be the same for all 4 functions

```
beforeEach(async () => {

});

test('Should create a new user', async () => {
```

* We want to wipe the database inside beforeEach() so all tests will start with a clean database
    - Open docs in `localhost:4466` GraphQL Playground
        + deleteManyUsers()
            * Use to wipe all users
            * We could limit it to delete a subset of users (users who's name contains John)
            * We won't provide any arguments, we'll delete everyone
        + deleteManyPosts()
        + deleteManyComments()

## deleteManyUsers() with beforeEach()
`user.test.js`

```
// MORE CODE

beforeEach(async () => {
  await prisma.mutation.deleteManyUsers()
})

test('Should create a new user', async () => {

// MORE CODE
```

* Now that we have this in place this function will run before every single test case
* Run test suite again `$ npm run test` (root of project)
* It should be successful every time you run the test
    - Even though you are creating a user each time
    - You delete that user each time you run a new test

## login test
* Here we expect data to be in the database, otherwise our use won't be able to log in

### How can we "seed" data with dummy data?
* We'll need dummy data for:
    - logging in
    - for testing posts query

#### createUser
* With password we are bypassing node so node won't hash it so we need to hash it ourselves so we'll import and use the bcryptjs library
* We use `bcryptjs.hashSync()` to syncronously hash the password (that means we'll get the value back directly as opposed to getting a Promise back)

`user.test.js`

```
// MORE CODE
import bcryptjs from 'bcryptjs'; // add this line
import prisma from '../src/prisma.js';

// MORE CODE

beforeEach(async () => {
  await prisma.mutation.deleteManyUsers();
  await prisma.mutation.createUser({
    data: {
      name: 'John',
      email: 'john@acme.com',
      password: bcryptjs.hashSync('123Password!'),
    },
  });
});

// MORE CODE
```

* Now we have code that will correctly create a new user that our test cases can rely on

## Look inside pgAmin
`$ npm run test` (root)

* pgAdmin
    - We see our test user we created
    - We also see our createUser
    - Run the test again and see that each time both the Database is cleaned and a new user is added

## Challenge - Goal: Create 2 dummy posts for the test Database
1. Use the correct prisma mutation to create the two posts
    * The author to the test user
    * Have one post be published and the other post a draft
2. Before deleting all users, delete all posts
3. Test your work and verify that the 2 posts are showing up in the Database 

### Solution:
```
// MORE CODE

beforeEach(async () => {
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  const user = await prisma.mutation.createUser({
    data: {
      name: 'John',
      email: 'john@acme.com',
      password: bcryptjs.hashSync('123Password!'),
    },
  });
  await prisma.mutation.createPost({
    data: {
      title: 'Post 1 Test',
      body: 'This is our first test post',
      published: true,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  await prisma.mutation.createPost({
    data: {
      title: 'Post 2 Test',
      body: 'This is our second test post',
      published: false,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });
});

// MORE CODE
```

* Run the test and you should see 2 posts inside your posts table (use pgAdmin)
* We use `await prisma.mutation.deleteManyPosts();`
* One post is published, the other is a draft
* We need the user's id so we create a `user` variable
    - We could create a new author or connect to an existing author (I chose connect)
* See how the author id was correctly injected
    - Primary and foreign keys are working!

![posts inserted and deleted](https://i.imgur.com/I65OMR6.png)


