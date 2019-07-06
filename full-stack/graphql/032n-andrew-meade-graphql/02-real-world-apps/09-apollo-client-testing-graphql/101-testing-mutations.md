# Testing Mutations
* You now know how to use ApolloBoost to execute operations on the GraphQL app
* You also have the server up and running when jest executes

## First Test case on our GraphQL app
### createUser mutation
* We will be testing the sign up functionality in our app
* **delete** all your test cases in `user.test.js`
* We will start with an empty file

## Install modules we will need
* apollo-boost
* graphql
* cross-fetch
    - We need this because we are trying to use apollo-boost in Node.js
    - This is a "fetch API polyfill"

`$ npm i apollo-boost graphql cross-fetch`

## What is Fetch API
* [fetch API docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* This is a standardized API across browsers but it hasn't made its way to Node.js yet
    - ApolloBoost plus many other tools rely on it so that is why we are using the library `cross-fetch` to make sure we have support for fetch in Node.js
* If you view the support chart on the docs page you will see it has decent support

`tests/user.test.js`

```
import 'cross-fetch/polyfill';
import ApolloBoost, { gql } from 'apollo-boost';

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
});

```

### Write our first test case "Should create a new user"
* We'll mark our function as async so we can take advantage of async/await inside our test function

`user.test.js`

```
import 'cross-fetch/polyfill';
import ApolloBoost, { gql } from 'apollo-boost';

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
});

test('Should create a new user', async () => {
  //
});

```

* Using `await` will make our code more condensed

## Open the test Database in pgAdmin
* You will see the user has not been entered yet
* View all rows of the test Database (default$test)
    - It is empty
* Now run the test with `$ npm run test`
* **important** When writing GraphQL you (even when inside the tagged template string) you must use double quotes

### Wrong way that will generate error!
```
// MORE CODE

test('Should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: 'Earth'
          email: 'earth@quake.com'
          password: '123password'
        }
      ) {
        token
        user {
          name
        }
      }
    }
  `;

// MORE CODE
```

* Correct way with double quotes

```
// MORE CODE

test('Should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Earth"
          email: "earth@quake.com"
          password: "123password"
        }
      ) {
        token
        user {
          name
        }
      }
    }
  `;

// MORE CODE
```

## Here is the code that you can test and generate a user in the test Database
`user.test.js`

```
import 'cross-fetch/polyfill';
import ApolloBoost, { gql } from 'apollo-boost';

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
});

test('Should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Earth"
          email: "earth@quake.com"
          password: "123password"
        }
      ) {
        token
        user {
          name
        }
      }
    }
  `;

  const response = await client.mutate({
    mutation: createUser,
  });
});

```

Look in the test Database

![test user inserted](https://i.imgur.com/QFAfsZy.png)

## Compare how condensed async/await is versus the way we did it with our test query

```
import ApolloBoost, { gql } from 'apollo-boost';

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
});

const getUsers = gql`
  query {
    users {
      id
      name
    }
  }
`;

client
  .query({
    query: getUsers,
  })
  .then(response => {
    console.log(response.data);
  });

```

* So instead of this:

```
// MORE CODE

client
  .query({
    query: getUsers,
  })
  .then(response => {
    console.log(response.data);
  });
// MORE CODE
```

* We are using async/await with this:

```
// MORE CODE

  const response = await client.mutate({
    mutation: createUser,
  });

// MORE CODE
```

* Earlier we used `client.query()` to fire off our Query operations
* Here we use `client.mutate()` to fire off our Mutation operations
    - We call `client.mutate({})` and pass in an options object
    - There is a single property we have to define
        + For our queries it was `query`
        + For our mutations it is `mutation` and we set it to the mutation we want to use
        + With that in place we get the response back
        + Before we used `.then()` to wait for the Promise (see above) but in our code here we have access to **async/await** so I can just get the response by `await`ing the Promise that `mutate()` returns
    - **note** `mutate()` and `query()` both return a Promise and both of those Promises will end up resolving with a `response` when the operation is complete
* We ran the test and saw no errors - which means the test was a success

## Houston we have a problem
* What if we run this test again? Do we get another successful test?
    - No because the user is already in the Database and that means the user email will already be registered and this will cause an error
    - Run the test again with `w` and `a` key
    - We get this error "GraphQL error: A unique constraint would be violated on User. Details: Field name = email"
    - We'll address this problem later
    - For now we'll manually delete the user from the test Database (yes this is not very efficient!)

## Adding a single assertion
* Load in Prisma and use the `exists` functionality from Prisma to check if there is a user with the `id` we got back

## Challenge - Goal: Use Prisma to check if the user was created
1. Import `src/prisma.js` like we've done many times before
2. Use the `exists` methods on `prisma-binding` to find the user by id
3. Assert that the user does exist
4. Test your work

`user.test.js`

```
import 'cross-fetch/polyfill';
import ApolloBoost, { gql } from 'apollo-boost';
import prisma from '../src/prisma.js';

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
});

test('Should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Earth"
          email: "earth@quake.com"
          password: "123password"
        }
      ) {
        token
        user {
          name
          id
        }
      }
    }
  `;

  const response = await client.mutate({
    mutation: createUser,
  });

  const isUser = await prisma.exists.User({
    id: response.data.createUser.user.id,
  });

  expect(isUser).toBe(true);
});

```

* Delete user if you run test to try again (we'll improve on this soon)
* Logging out the response shows you what you need to target
* Make sure you await

`$ npm run test`

* Should see one test passes!
* Our first test case that makes assertions about how our GraphQL app works
    - If the createUser mutation would ever break in the future our automatic test suite would be able to catch that and prevent bugs from getting into production and messing up with real users

## Next - Jest lifecycle methods
* This will clean our out Database before our test cases run
