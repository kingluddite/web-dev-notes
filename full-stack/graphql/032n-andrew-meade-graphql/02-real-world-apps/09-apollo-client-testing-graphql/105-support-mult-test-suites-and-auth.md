# Supporting Multiple Test Suites and Authentication
* Will refactor that will enable us to write tests for our operations that require authentication
* We will break out our test cases into multiple test suites (multiple test files)
    - This will help stay organized as our number of tests grow

## Move beforeEach() async code
* It can only be used in the `user.test.js` file
* We'll put it in it's own file and use it in any test files we need it in
* We'll keep `beforeEach()` and grab the async function inside it and move it into `tests/utils/seedDatabase.js`

`seedDatabase.js`

```
import bcryptjs from 'bcryptjs';
import prisma from '../../src/prisma';

const seedDatabase = async () => {
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
};

export { seedDatabase as default };
```

## Now we can import our seedDatabase into our test suite and use it
`user.test.js`

```
import 'cross-fetch/polyfill';
import ApolloBoost, { gql } from 'apollo-boost';
import bcryptjs from 'bcryptjs';
import prisma from '../src/prisma';
import seedDatabase from './utils/seedDatabase';

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
});

beforeEach(seedDatabase);

// MORE CODE
```

* Run test suite and it should work as before
* We can remove bcryptjs as an import as it is not being used
* Same functionality as before but it is now refactored to be reusable

## post.test.js
* Grab our post code and move it into `post.test.js`
* We need the cross-fetch/polyfill
* We'll be creating a client so we'll need to import ApolloBoost
* We'll also need the named export `gql` from the apollo-boost library
* We also need to import the seedDatabase and we'll set that as an argument for our beforeEach() function

`post.test.js`

```
import 'cross-fetch/polyfill';
import ApolloBoost, { gql } from 'apollo-boost';
import seedDatabase from './utils/seedDatabase';

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
});

beforeEach(seedDatabase);

test('Should expose published posts', async () => {
  const getPosts = gql`
    query {
      posts {
        id
        title
        body
        published
      }
    }
  `;

  const response = await client.query({
    query: getPosts,
  });

  expect(response.data.posts).toHaveLength(1);
  expect(response.data.posts[0].published).toBe(true);
});

```

## Note: Add a CLI argument
* We need to add one command line argument onto the Jest command (we are currently using `--watch`)

`package.json`

```
// MORE CODE

  "scripts": {
    // MORE CODE

    "test": "env-cmd -f ./config/test.env jest --watch",

    // MORE CODE
  },

// MORE CODE
```

* Looking at the [Jest CLI Options](https://jestjs.io/docs/en/cli)

### --runInBand
* Allows us to run tests in multiple test suits without trying to run them at the exact same time (this would be a huge problem since they are both interacting with that same Database)
* Alias: `-i` 
* Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging
* So all we have to do now that we have asynchronous tests in multiple suites is to add on

`package.json`

```
// MORE CODE

  "scripts": {
    // MORE CODE

    "test": "env-cmd -f ./config/test.env jest --watch --runInBand",

    // MORE CODE
  },

// MORE CODE
```

* **IMPORTANT** Whenever you change your CLI arguments you have to restart Jest
    - `ctrl` + `c`
    - `$ npm run test`

## Test again
* Should have 2 Test Suites passed and 6 Tests passed

## Authentication tokens
* How to send an authentication token along with our operations
    - Whether we are using:
        + client.query()
        + client.mutate()

### There is a catch
* We actually don't provide the header the JWT authentication token in the query or mutate call
    - Instead, it all needs to be configured when we set up the client
        + We can stick with one client for unauthenticated requests
        + And we'll create a separate client for when we want to authenticate with a specific JWT
        + This will take some new code

## We will break our the creation of our client into a new file
* Create a new file inside the `tests/utils/getClient.js`
    - This will get a brand new client
    - We won't mark this code as async as we won't be using any async code inside it
    - Inside the function we just will return a new instance of ApolloBoost

`tests/utils/getClient.js`

```
import ApolloBoost from 'apollo-boost';

const getClient = () =>
  new ApolloBoost({
    uri: 'http://localhost:4000',
  });

export { getClient as default };
```

`user.test.js`

```
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import prisma from '../src/prisma';
import seedDatabase from './utils/seedDatabase';
import getClient from './utils/getClient';

const client = getClient();
```

`post.test.js`

```
// MORE CODE
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import seedDatabase from './utils/seedDatabase';
import getClient from './utils/getClient';

const client = getClient();
```

## Now we'll accept an optional authentication token
* We will have to define this authentication token
* And we need the id of the user in order to generate it
    - So we'll generate the auth token inside seedDatabase.js
    - After we createUser we get the user id
        + We have to use that user id to generate the auth token
        + Then we'll export it from this file so we can pass it to our test cases that need authentication
            * for example:
                - If I want to fetch my user profile in a test case I'm going to need the JWT in order to authenticate as our seedDatabase user

## Next
* Pass auth token to our tests 
