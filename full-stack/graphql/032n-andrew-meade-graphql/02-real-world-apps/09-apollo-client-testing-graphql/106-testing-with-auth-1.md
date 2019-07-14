# Testing with Authentication (Part 1)
* Create a test case that can test an operation that requires authentication
* We will create in `seedDatabase.js` a JWT for our test user and export it
* In any test suite that requires authentication we will import that JWT and in the individual test case we will pass it to getClient() to get a "fresh client"
    - That means `getClient()` will need to accept a token

## seedDatabase.js
* We will create and object `userOne`
    - On this object we will put all of the stuff associated with userOne on userOne
        + the input (obj)
            * name
            * email
            * password
        + what we passed to prisma
        + the output
        + what prisma gives us
        + the jwt (we'll generate this soon)

```
const userOne = {

}
```

### the input
`seedDatabase.js`

```
// MORE CODE

const userOne = {
  input: {
      name: 'John',
      email: 'john@acme.com',
      password: bcryptjs.hashSync('123Password!'),
  }
}
const seedDatabase = async () => {
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  const user = await prisma.mutation.createUser({
    data: userOne.input
    ,
  });
  await prisma.mutation.createPost({

// MORE CODE
```

## the output
* We could call it `output`/`user`/`data` we'll call it `user`
    - It will get its value later but we'll set the default values as `undefined`
        + We could leave it empty but it is more explicit to set it to `undefined` so that someone scanning the code can determine that `user` will get a value later

`seedDatabase.js`

```
// MORE CODE

const userOne = {
  input: {
    name: 'John',
    email: 'john@acme.com',
    password: bcryptjs.hashSync('123Password!'),
  },
  user: undefined
};

// MORE CODE
```

* Now we need to set `userOne.user` to the data that prisma gives us back
    - So change this:

```
// MORE CODE

const userOne = {
  input: {
    name: 'John',
    email: 'john@acme.com',
    password: bcryptjs.hashSync('123Password!'),
  },
  user: undefined,
};

const seedDatabase = async () => {
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  const user = await prisma.mutation.createUser({
    data: userOne.input,
  });

// MORE CODE
```

* To this

```
// MORE CODE

const userOne = {
  input: {
    name: 'John',
    email: 'john@acme.com',
    password: bcryptjs.hashSync('123Password!'),
  },
  user: undefined,
};

const seedDatabase = async () => {
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  // UPDATING THE NEXT LINE
  userOne.data = await prisma.mutation.createUser({
    data: userOne.input,
  });

// MORE CODE
```

## Refactor
* We were using the `user` variable already in this file and now we need to update it to follow our new structure

```
// MORE CODE

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

// MORE CODE
```

* And update it to from using `user.id` to `userOne.user.id`

```
// MORE CODE

  await prisma.mutation.createPost({
    data: {
      title: 'Post 1 Test',
      body: 'This is our first test post',
      published: true,
      author: {
        connect: {
          id: userOne.user.id, // UPDATE THIS LINE
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
          id: userOne.user.id, // UPDATE THIS LINE
        },
      },
    },
  });

// MORE CODE
```

## Add jwt property to userOne
* We don't know the value yet (we'll create it soon)
* So we'll add a `jwt` property with `undefined` as the value

`seedDatabase.js`

```
// MORE CODE

const userOne = {
  input: {
    name: 'John',
    email: 'john@acme.com',
    password: bcryptjs.hashSync('123Password!'),
  },
  user: undefined,
  jwt: undefined
};

// MORE CODE
```

### Why is jwt undefined?
* We don't know the value yet and won't until we get the user's `id`
* And we don't get the user's `id` until the following code finished executing:

`seedDatabase.js`

```
// MORE CODE

  const user = await prisma.mutation.createUser({
    data: userOne.input,
  });

// MORE CODE
```

## Generate a token
1. Import `jwt` from the `jsonwebtoken` library

```
userOne.jwt = value
// we give it a value using `jwt.sign()` which is how we signed tokens before
// syntax ---> jwt.sign({PAYLOAD}, 'SECRET')
// the PAYLOAD we set it to { userId: user.id}
//   but now it will be: { userId: userOne.user.id }
// For the SECRET we'll continue using our environment variable
```

`seedDatabase.js`

```
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma';

const userOne = {
  input: {
    name: 'John',
    email: 'john@acme.com',
    password: bcryptjs.hashSync('123Password!'),
  },
  user: undefined,
  jwt: undefined
};
const seedDatabase = async () => {
  // Delete test data
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();

  // Create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });
  console.log(userOne); // just to see how the jwt gets created
  // Add the following line
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

// MORE CODE
```

## Export userOne
* We'll export userOne from `seedDatabase.js` and use it (and it's jwt) in our individual test suites

`seedDatabase.js`

```
// MORE CODE
export { seedDatabase as default, userOne };
```

* Since we already have a default, we'll export `userOne` as a **named export**
    - **tip** Remember that it is a **named export** when importing it in other files

## Import userOne into `user.test.js`
`user.test.js`

```
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import prisma from '../src/prisma';
import seedDatabase, { userOne } from './utils/seedDatabase';
import getClient from './utils/getClient';

const client = getClient(userOne.jwt);

// MORE CODE
```

### Use userOne.jwt
* We'll create a new test

`user.test.js`

```
// MORE CODE
test('Should fetch user profile', () => {
  // 
})
```

* In this case we are going to have an authenticated client
* We want to make sure that when we're authenticated we get our user profile back

#### Oops! We need to make this an async function

```
// MORE CODE
test('Should fetch user profile', async () => {
  1. Set up our operation
  2. Firing off our operation
  3. Make assertions about the result 
})
```

* That's what we did before but we need to do something first

```
// MORE CODE
test('Should fetch user profile', async () => {
  1. GENERATE A NEW CLIENT!
    * We will call getClient() and pass it our jwt (getClient(userOne.jwt))
    * We'll need to update getClient() to accept a token argument
  2. Set up our operation
  3. Firing off our operation
  4. Make assertions about the result 
})
```

`user.test.js`

```
// MORE CODE
test('Should fetch user profile', async () => {
  const client = getClient(userOne.jwt);
})
```

* So in some instances we'll call getClient with a jwt
    - And in that case we want a client that is authenticated as a particular user
* But in other cases (like in the below code sample) we won't pass in a jwt and we don't want a user that is authenticated as a particular user

`user.test.js`

```
// MORE CODE

import getClient from './utils/getClient';

// change to let as we will be using client is our authentication tests
let client = getClient(); // NOTE! we are not passing an auth token (jwt) here

// MORE CODE
```

## Add support for `jwt` argument in getClient.js
`getClient.js`

```
import ApolloBoost from 'apollo-boost';

const getClient = (jwt) =>
  new ApolloBoost({
    uri: 'http://localhost:4000',
  });

export { getClient as default };
```

* But we also have to use the `jwt`
* We will use it by setting up another property on our options Object
* **Note** there is a `request` property that we can set on this options Object (but it is actually a function so we'll use the ES6 method definition to define `request`)
    - This function gets called with every single outgoing request and it gets called with the operation itself
        + And we can use the operation argument to manipulate the operation (in this case we will manipulate it and add on a single authorization header)
        + We ONLY want to add on a header if a token was provided
            * We'll use an if statement to handle that
                * If we pass the condition we'll use a `setContext()` method on `operation` and that is how we set headers

`getClient.js`

```
import ApolloBoost from 'apollo-boost';

const getClient = jwt =>
  new ApolloBoost({
    uri: 'http://localhost:4000',
    request(operation) {
      if (jwt) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
      }
    },
  });

export { getClient as default };
```

* Summary:
    - If a jwt token was provided
    - We generate a new instance of ApolloBoost
    - And for every single request if there is a token
    - We set up an authorization header
* Now we can use this code in our test suites to write test cases that use authentication

## user.test.js tests authentication
```
// MORE CODE
test('Should fetch user profile', async () => {
  const client = getClient(userOne.jwt);

  // fire off an operation - me Query (requires authentication)
  const getProfile = gql`
    query {
      me {
        id
        name
        email
      }
    }
  `;
  await client.query({ query: getProfile });
});
```

## Review of what we just did
1. We are setting up a new client that requires authentication

`const client = getClient(userOne.jwt);`

2. We are setting up the operation we are trying to perform:

```
const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;
```

3. We are firing off the operation

`await client.query({ query: getProfile });`

* If, the token is getting used, we should pass test
* If we are not authenticated we should fail the test as you can not access a user's profile without being authenticated

### Let's see the test case fail
* If we comment out the client, the jwt doesn't get passed, the test case will fail

`user.test.js`

```
// MORE CODE
test('Should fetch user profile', async () => {
  // client = getClient(userOne.jwt);

  // fire off an operation - me Query (requires authentication)
  const getProfile = gql`
    query {
      me {
        id
        name
        email
      }
    }
  `;
  await client.query({ query: getProfile });
});
```

* The test will fail as it will use the default `getClient()` that does not require authentication

`user.test.js`

```
// MORE CODE
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import prisma from '../src/prisma';
import seedDatabase, { userOne } from './utils/seedDatabase';
import getClient from './utils/getClient';

const client = getClient();

beforeEach(seedDatabase);
```

![failed authentication test](https://i.imgur.com/cmYxMrW.png)

* Comment that line in our test back in

```
// MORE CODE

test('Should fetch user profile', async () => {
  client = getClient(userOne.jwt);

// MORE CODE
```

* We can now test all of the other operations that require authentication
* We could also add some assertions to this test case actually looking at the profile object that came back

## Testing other operations
* Make sure the `id` equals `userOne.id`
* Check the name matches and email

`user.test.js`

```
// MORE CODE
test('Should fetch user profile', async () => {
  client = getClient(userOne.jwt);

  // fire off an operation - me Query (requires authentication)
  const getProfile = gql`
    query {
      me {
        id
        name
        email
      }
    }
  `;
  const { data } = await client.query({ query: getProfile });

  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.name).toBe(userOne.user.name);
  expect(data.me.email).toBe(userOne.user.email);
});
```

* If I'm authenticated as this user `userOne`, the profile I get back should indeed contain my `id` (as opposed to containing the `id` of another user)
* **note** We already know that the operation will succeed
    - The "new" part we are testing is whether or not our assertions work as expected
* **note** We can destructure `data` right off of `response` (we did this above)
    - This is what it would look like not destructured

```
// MORE CODE

const response = await client.query({ query: getProfile });

  expect(response.data.me.id).toBe(userOne.user.id);
  expect(response.data.me.name).toBe(userOne.user.name);
  expect(response.data.me.email).toBe(userOne.user.email);
});
```

## Challenge - Goal: Write a test case for the myPosts query
1. Create the test case and an authenticated client
2. Fire off a `myPosts` operation getting scalar fields for posts
3. Assert that two posts were fetched
4. Test your work!

### Tip * Save time and filter by a test name patter
* So if you just want to run one test that has "my posts" in the name type `w` + `t` and beside **pattern** type `my posts`
    - And only that test will run!

### Challenge Solutions
`post.test.js`

```
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import seedDatabase, { userOne } from './utils/seedDatabase'; // update here!
import getClient from './utils/getClient';

let client = getClient(); // make sure it is let

beforeEach(seedDatabase);

// MORE CODE

test('Should fetch all my posts', async () => {
  client = getClient(userOne.jwt);

  const getPosts = gql`
    query {
      myPosts {
        id
        title
        body
        published
      }
    }
  `;

  const { data } = await client.query({
    query: getPosts,
  });

  expect(data.myPosts.length).toBe(2);
});
```

* The test should pass
* We destructure `data` since it will be the only property we ever use from `response`

## Result
* We have 2 Test Suites passing
* We have 7 passed tests

![7 passed tests](https://i.imgur.com/cwvcnQK.png)

## Summary
* We now know how to write test cases that fire off operations that require authentication

