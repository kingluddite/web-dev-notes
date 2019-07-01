# Logging in Existing Users
* When someone logs in they will give their plain text password
    - How can we compare that plain text password to the hashed password?

1. With the login Mutation we will fetch the user just with email
2. Once we get the back we'll have access to the hashed password
3. Then we will be able to compare the 2 using `bcryptjs.compare()`

## bcryptjs.compare() syntax
```
// it returns a Promise
//  Promise resolves to true if there is a match
//   Promise resolves to false otherwise
bcryptjs.compare(password, hashedPassword)
```

## Test it out
`Mutation.js`

```
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const dummy = async () => {
  const email = 'phil@phil.com';
  const password = '123Password';

  const hashedPassword =
    '$2a$10$Z0onrGQ6SxxZkTeuoN8ZqOFgxKtqfXRadVy2TiFVV1/OpNlSbWrb2';

  const isMatch = await bcryptjs.compare(password, hashedPassword);
  console.log(isMatch);
};
dummy();

const Mutation = {

// MORE CODE
```

* That will return `true` in the Terminal
* Change the password or hashed password and it will be `false`
    - **Remember** this is still a "one way" hashed password
    - We are not un-hashing, we are running the hashed encryption on the plain text password and comparing the generated value with our hashed password

## Challenge
* Goal: Create a login Mutation

### Part I: Create the Mutation
1. Define the mutation in schema.graphql
    * It should accept email/password as arguments
    * It should return AuthPayload
2. Define the mutation resolver method in Mutation.js with 4 arguments

### Solution
`schema.graphql`

```
 // MORE CODE

type Mutation {
  createUser(data: CreateUserInput!): AuthPayload!
  deleteUser(id: ID!): User!
  updateUser(id: ID!, data: UpdateUserInput!): User!
  login(email: String!, password: String!): AuthPayload!

// MORE CODE
```

* We will define login like this:

```
// MORE CODE

type Mutation {

// MORE CODE

  login(data: LoginUserInput!): AuthPayload!

// MORE CODE

input LoginUserInput {
  email: String!
  password: String!
}

// MORE CODE
```

`Mutation.js`

```
// MORE CODE

  async login(parent, args, { prisma }, info) {},

// MORE CODE
```

## Part 2: Verify email and password
1. Query for the user by email (just need scalar fields)
    * If no user, throw an error
2. Verify hashed user password by the plain text password argument
    * If not a match, throw an error

## Part 3: Send back the user with a new token
1. Send back an object that matches us with AuthPayload
    - Generate a new JWT using the same secret used in createUser
2. Login with an existing user and get back user details and auth token

* I wanted to test Prisma API so I needed to generate an Authorization token in :4466

```
{
  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJkZWZhdWx0QGRlZmF1bHQiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTYxODY5MjM1LCJleHAiOjE1NjI0NzQwMzV9.sWRVosLux5CAwpJ9Z8-WVPD3KL_vLmgvfqjtdtf0-d4"
}
```

* I generated that using:

`$ cd prisma && prisma token`

* Then I tested in the Prisma GraphQL Playground:

```
query {
  user(where: { email: "phil@phil.com" }) {
    id
    name
    email
    password
  }
}
```

* I also used the documentation to make sure my query was correct

`Mutation.js`

```
// MORE CODE

  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email,
      },
    });
    const userPassword = args.data.password;
    const hashedPassword = user.password;

    if (!user) {
      throw new Error('Unable to login');
    }

    const isMatch = await bcryptjs.compare(userPassword, hashedPassword);

    if (!isMatch) {
      throw new Error('Unable to login');
    }

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'ihaveanewsecret'),
    };
  },

// MORE CODE
```

* **IMPORTANT** You must use the EXACT SAME SECRET TO LOG IN that you used to create that user!
* And here was my :4000 GraphQL Playground

```
mutation {
  login(data: {
    email: "phil@phil.com",
    password: "123Password"
  }) {
    user {
      id
      name
      email
      password
    }
    token
  }
}
```

* And here was the result

```
{
  "data": {
    "login": {
      "user": {
        "id": "cjxiflr5v000g0759c933657z",
        "name": "Phil",
        "email": "phil@phil.com",
        "password": "$2a$10$Z0onrGQ6SxxZkTeuoN8ZqOFgxKtqfXRadVy2TiFVV1/OpNlSbWrb2"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanhpZmxyNXYwMDBnMDc1OWM5MzM2NTd6IiwiaWF0IjoxNTYxODcwNjQ0fQ.ppp8hVNABx08-zlko9h4YB5i-UTexR_aZLoq2qHBxJw"
    }
  }
}
```

## Next
* Lock down some of our routes
    - Making sure you can only do things, like create a post, when you do indeed provide a valid auth token
* Remove the dummy function as we no longer need it

