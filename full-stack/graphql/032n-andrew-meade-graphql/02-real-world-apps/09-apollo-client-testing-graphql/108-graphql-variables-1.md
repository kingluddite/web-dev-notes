# GraphQL Variables (Part 1)
* Will give us a way to reuse and better define our GraphQL operations

`user.test.js`

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

// MORE CODE
```

* We define a `createUser` mutation

```
// MORE CODE

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
// MORE CODE
```

## Houston we have a problem!
* All of the data is hard coded inside of this operation
    - If I wanted to create a user with different values I would have to created this all over again
    - We need a way to make this modular and reusable
* We hard code again in the same file in the `Should not sign up with short password` test case

```
// MORE CODE

test('Should not sign up with short password', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: { name: "John", email: "john@acme.com", password: "123" }
      ) {
        token
      }
    }
  `;

  await expect(client.mutate({ mutation: createUser })).rejects.toThrow();
});

// MORE CODE
```

* Here is our operation with hard coded data values

```
// MORE CODE

  const createUser = gql`
    mutation {
      createUser(
        data: { name: "John", email: "john@acme.com", password: "123" }
      ) {
        token
      }
    }
  `;

// MORE CODE
```

* **suggestion** Might be better to name this test case "Should not signup user with invalid test case"

## The Problem
* Both are using the `createUser` mutation
    - It would be more efficient if there was a built in way to pass in the values we want to use

## The Solution
* There is one
* Let's practice in the GraphQL Playground
* Shut down our test suite and start up our dev server

`ctrl` + `c`

`$ npm run dev`

## Head to localhost:4000 and QUERY VARIABLES
* http://localhost:4000/
* If you get a ECONNREFUSED error did you start your docker container?

### Query Variables on GraphQL Playground
![query variables](https://i.imgur.com/jfqoVpF.png)

#### 3 steps to using GraphQL Variables properly
1. Define all variables that a given operation should support
    * This includes their name/type
    * That will happen here

```
mutation(DEFINE_ALL_VARIABLES_HERE) {
  createUser(data:{
    // MORE CODE
}
```

2. Then we pass values in for those variables
    * We do that inside the QUERY VARIABLES of GraphQL Playground
    * We'll learn how to pass in variables from our code soon!

![query variables](https://i.imgur.com/jfqoVpF.png)

3. Use it
    * And we'll use it here (where we currently have hard coded data):

![where to plug in our variables inside our operation data](https://i.imgur.com/oLSxHV4.png) 

## Let's try this out and use Query Variables in GraphQL Playground
* **note** All variables in GraphQL are prefixed with `$`

## 1. Define all variables that a given operation should support
* What will we be defining?

```
// MORE CODE

        data: {
          name: "Earth"
          email: "earth@quake.com"
          password: "123password"
        }

// MORE CODE
```

* name, email and password
* Create the variables
    - We name them using the `$` prefix
    - We establish the type for their data
    - We establish whether the value can be nullible or not

```
mutation($name: String!, $email: String!, $password: String!) {
  createUser(
    data: {
    name:"tom",
    email:"tome@noah.com",
    password: "123Password"
  }
// MORE CODE
```

* Replace the hard coded data with the variables

```
// MORE CODE

mutation($name: String!, $email: String!, $password: String!) {
  createUser(
    data: {
    name: $name,
    email: $email,
    password: $password
  }
// MORE CODE
```

* Add your hard coded name/value pairs inside an object
* **note** We must surround the names with double quotes and string values with double quotes
* **note** Make sure the last element does NOT have a comma or you will get an error
* **note** We do NOT use the `$` here (we only use `$` in our GraphQL code)

```
{
 "name": "Earth",
 "email": "earth@quake.com",
 "password": "123password",
}
```

![name value pairs in GraphQL Playground]

## Make this even more efficient
* Open `schema.graphql`
* This is our generated file
* All our types are defined here
    - If you look at `createUser` you will see:

`schema.graphql`

```
// MORE CODE

type Mutation {
  createUser(data: CreateUserInput!): User!

// MORE CODE
```

* We can use `CreateUserInput` in GraphQL Playground or our Test Cases
* This saves us form passing in 3 different variables and we can just pass in the one

### Here how we can use custom Types to speed up our productivity
```
mutation($data:CreateUserInput!) {
  createUser(
    data: $data
  ) {
    user {
      id
      email
      name
      password
    }
    token
  }
}
```

* And the `Query Variables`

```
{
  "data": {
     "name": "Earth",
         "email": "earth2@quake.com",
     "password": "123password"
  }
}
```

* Setting up variables on GraphQL Playground we don't see the real benefit
* But when we set up variables on a client (browser, mobile, or test suite) we can start to reuse operations that we originally had to redefine over and over again

## Let's define variables inside our test suite operations
`user.test.js`

```
// MORE CODE

const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

test('Should create a new user', async () => {
  const variables = {
    data: {
      name: 'Earth',
      email: 'earth@quake.com',
      password: '123password',
    },
  };

  const response = await client.mutate({
    mutation: createUser,
    variables,
  });

  const isUser = await prisma.exists.User({
    id: response.data.createUser.user.id,
  });

  expect(isUser).toBe(true);
});

// MORE CODE

test('Should not sign up with short password', async () => {
  const variables = {
    data: {
      name: 'John',
      email: 'john@acme.com',
      password: '123',
    },
  };

  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow();
});

// MORE CODE
```

## getUsers
* No dynamic values for this operations so we can pull it out and we don't have to use any variables but we can use this operation for other tests

## Test
* Shut down local dev server (`ctrl` + `c`)
* Start the testing server `$ npm run test`

## Refactor all operations
`user.test.js`

```
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import prisma from '../src/prisma';
import seedDatabase, { userOne } from './utils/seedDatabase';
import getClient from './utils/getClient';

let client = getClient();

beforeEach(seedDatabase);

const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const login = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
    }
  }
`;

const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

test('Should create a new user', async () => {
  const variables = {
    data: {
      name: 'Earth',
      email: 'earth@quake.com',
      password: '123password',
    },
  };

  const response = await client.mutate({
    mutation: createUser,
    variables,
  });

  const isUser = await prisma.exists.User({
    id: response.data.createUser.user.id,
  });

  expect(isUser).toBe(true);
});

test('Should expose public author profiles', async () => {
  const response = await client.query({
    query: getUsers,
  });

  expect(response.data.users).toHaveLength(1);
  expect(response.data.users[0].email).toBeNull();
  expect(response.data.users[0].name).toBe('John');
});

test('Should not login with bad credentials', async () => {
  const variables = {
    data: { email: 'bad@bad.com', password: 'badpassword' },
  };
  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow();
});

test('Should not sign up with short password', async () => {
  const variables = {
    data: {
      name: 'John',
      email: 'john@acme.com',
      password: '123',
    },
  };

  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow();
});

test('Should fetch user profile', async () => {
  client = getClient(userOne.jwt);

  // fire off an operation - me Query (requires authentication)
  const { data } = await client.query({ query: getProfile });

  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.name).toBe(userOne.user.name);
  expect(data.me.email).toBe(userOne.user.email);
});

```

## Put all operations inside their own separate file
* More refactoring

`user.test.js`

```
import 'cross-fetch/polyfill';
import prisma from '../src/prisma';
import seedDatabase, { userOne } from './utils/seedDatabase';
import getClient from './utils/getClient';
import { createUser, getUsers, login, getProfile } from './utils/operations';

let client = getClient();

beforeEach(seedDatabase);

test('Should create a new user', async () => {

// MORE CODE
```

`tests/utils/operations.js`

```
import { gql } from 'apollo-boost';

const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const login = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
    }
  }
`;

const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

export { createUser, getUsers, login, getProfile };
```

* Run test suite again `$ npm run test`
* Should have 10 passing tests
* But now all our operations are in one reusable file
