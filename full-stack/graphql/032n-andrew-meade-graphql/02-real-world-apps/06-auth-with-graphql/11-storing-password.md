# Storing Password
1. Take in password
2. Validate password
3. Hash password
4. Generate auth token

* When all is said and done we are going to generate and "send back" an auth token that can be used to perform tasks that usually require authentication

## Step 1: Take in password
`schema.graphql`

```
// MORE CODE

type Mutation {
  createUser(data: CreateUserInput!): User!

// MORE CODE
```

* The data comes from `CreateUserInput`

`schema.graphql`

```
// MORE CODE

input CreateUserInput {
  name: String!
  email: String!
}

// MORE CODE
```

* Currently it is not accepting a password
* So we will add that field on and make it non-nullible

`schema.graphql`

```
// MORE CODE

input CreateUserInput {
  name: String!
  email: String!
  password: String!
}

// MORE CODE
```

* No whenever someone tries to run our `createUser` Mutation they will have to provide a password
* Step 1 is done!

## Step 2: Validate that password
* We will just validate the password length
* We will say the password length has to be at least 8 charaters long

```
// MORE CODE

  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) {
       throw new Error('Password length must be at least 8 characters');
    }

    return prisma.mutation.createUser({ data: args.data }, info);
  },

// MORE CODE
```

* That completes Step 2

## Step 3: Hashing password
* Terrible idea to store plain text passwords in Database
* We will use bcrypt algorithm
* This is a npm module called `bcryptjs`
    - [bcryptjs documentation](https://www.npmjs.com/package/bcryptjs)

### Uninstall uuid
* Since we are no longer using it we can uninstall it and remove the

`import uuidv4 from uuid/v4` from the top of Mutation.js

`$ npm uninstall uuid`

### Install bcryptjs
`$ npm i bcryptjs`

## What is a hash?
* Take a string (our password "password123") and hash it into a long series of characters and that is what we will store in the Database
* Hashing algorithms are "one way" which means you can take a plain text password and "hash it" but we can not take the hashed version and get the plain text version back (and that is a good thing)

## How can we verify a password?
* We'll talk about that when we "log in" Mutation operation when a user attempts to log in with their existing email and password

### bcryptjs syntax
`bcryptjs.hash(PASSWORD, SALT)`

#### What is a salt?
* Just a random series of characters that are hashed along with the string you are hashing
* If we didn't use a salt and hashed our password twice
    - password123 --hash----> ajsd;flsdjfklasdjfas
    - password123 --hash----> ajsd;flsdjfklasdjfas
* We get the same identical hash twice - this is not good, this is less secure because anytime we see this value we can know it is the same password
* In order to create "truly random passwords" even if we have the same input we use a salt
* Many less secure algorithms do not have salts built it
* You can't use bcryptjs without a salt - this is a good thing because it make is way more secure

## bcrypt.hash() returns a Promise
* That Promise resolves with the hash value (which is nothing more than a string)
* We will `await` that Promise and store that hashed value in a variable

`Mutation.js`

```
import bcryptjs from 'bcryptjs';

// MORE CODE

  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) {
       throw new Error('Password length must be at least 8 characters');
    }
    
    const password = await bcryptjs.hash(args.data.password, 10);

// MORE CODE
```

* Now we need to store our hashed password in the Database
* But now we are passing `args.data` into our Database and that is a problem because that is where our plain text password is stored
    - We will take our existing data object and use the JavaScript "spread operator" to spread out all of the properties on args.data but we will set our password field to have a value of the hashed/salted password from above

```
// MORE CODE

    return prisma.mutation.createUser(
      {
        data: {
          ...args.data,
          password: hashedSaltedPassword,
        },
      },
      info
    );

// MORE CODE
```

* This `password` will override the plaintext password with our hashedSaltedPassword and store that in the Database which is a far more secure technique

## Try and create a new user in localhost:4000 (to interact with our Node API)
* GraphQL Playground
    - We need to add the `password` field as it is now required

```
mutation {
  createUser(data:{
    name:"Mike",
    email:"mike@mike.com"
    password: "password123"
  }) {
    id
    name
    email
    password
  }
}
```

* The result

```
{
  "data": {
    "createUser": {
      "id": "cjxh37gdx0kr40759if76q2rc",
      "name": "Mike",
      "email": "mike@mike.com",
      "password": "$2a$10$zBZP9SC6.xnuKJ1cd5rkRO3cNxkLvvGkzFZfuYjInnSo7t2z6ARiK"
    }
  }
}
```

* **note** See the hashed and salted password

### Check your Database
* You see the hashed and salted password has been stored in your user table

![hashed salted password](https://i.imgur.com/M0lQXW3.png)

## GraphQL Playground basic validation
* Nice thing about GraphQL is it automatically performs some base level validation for you
* `!` marks fields as required
* Type definitions make sure we are getting the correct type
    - This would not work because GraphQL expects a String

```
mutation {
  createUser(data:{
    name:"Mike",
    email:"mike@mike.com",
    password: true
  }) {
    id
    name
    email
    password
  }
}
```

* Show the error that passwords must be at least 8 characters
    - This is basic validation we added in Mutation.js

```
mutation {
  createUser(data:{
    name:"Mike",
    email:"mike@mike.com",
    password: "123"
  }) {
    id
    name
    email
    password
  }
}
```

* That will give an error "Password length must be at least 8 characters"

## Next
* How to generate and manage our authentication tokens
