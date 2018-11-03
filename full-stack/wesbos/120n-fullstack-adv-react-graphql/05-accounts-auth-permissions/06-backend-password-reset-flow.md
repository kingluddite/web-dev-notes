# Backend Password Reset Flow
## How will Password reset work?
* You have a sign in form
* You put in your email and password
* It will send you an email with a token that is good for one hour
* There will be a link in the email
* The token is in the link
* When you click on the link and supply the token then the server will be able to reset the user's password

## Houston we have a problem
* We have been using the regular User that has been imported from the generated graphql file

`backend/src/schema.graphql`

```
// MORE CODE

signup(email: String!, password: String!, name: String!): User!

// MORE CODE
```

`User!` comes from:

`backend/src/generated/prisma.graphql`

```
// MORE CODE

type User implements Node {
  id: ID!
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: [Permission!]!
}

// MORE CODE
```

* The problem with above is by default we have access to a bunch of fields we shouldn't give access to on the client
    - password: String!
    - resetToken: String
    - resetTokenExpiry: String
        + Especially the resetTokenExpiry because if this field is available to the client side
            * A bad person (aka hacker) could modify the query to also ask for the token to come back and then you could reset the password from the form and get the token and reset this person's password
            * This is a topic of **backend fields that should never be available on the frontend**
            * How do we do that?
                - We will redefine our User type in our Yoga so that we NEVER leave those sensative fields over to the client side

## Redefine User type for Yoga
* First just copy our user type from `prisma.graphql` and paste it at the bottom of `schema.graphql`

`schema.graphql`

```
type User implements Node {
  id: ID!
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: [Permission!]!
}
```

* Yoga doesn't use `implements Node` because we don't have that concept on the Yoga server
* Here is the updated User

`schema.graphql`

```
// MORE CODE

type User implements Node {
  id: ID!
  name: String!
  email: String!
  permissions: [Permission!]!
}
```

* We don't need to redefine `permission` because if we don't define what the permission `enum` is it is going to import it from what we have at the top of our file

`schema.graphl`

```
# import * from '/generated/prisma.graphql'

// MORE CODE
```

**important** Do not forget to do this part or it could be a big security issue for your app!

## requestReset Mutation
`schema.graphql`

```
// MORE CODE

type Mutation {

  // MORE CODE

  requestReset(email: String!): SuccessMessage
}

// MORE CODE
```

## Now we need to create our `requestReset` resolver
* First just copy the `signout` resolver, paste it below itself and name it `requestReset`

`Mutation.js`

```
// MORE CODE

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Live long and prosper!' };
  },

  requestReset(parent, args, ctx, info) {
   // lots of stuff to do here
  },
};

module.exports = Mutations;

// MORE CODE
```

## Create our tasks for this resolver
`Mutation.js`

```
// MORE CODE

requestReset(parent, args, ctx, info) {
  // 1. Check if this is a real user
  // 2. Set a reset token and expiry on that user
  // 3. TODO Email them that reset token
},

// MORE CODE
```

* #3 we will save for later

## Check if there is a user
* If not a user throw an error
* We return a Promise so we use async await

```
async requestReset(parent, args, ctx, info) {
  // 1. Check if this is a real user
  const user = await ctx.db.query.user({ where: {email: args.email} });
  if (!user) {
    throw new Error(`No such user found for email ${args.email}`);
  }
  // 2. Set a reset token and expiry on that user
  // 3. TODO Email them that reset token
},
```

## Set a reset token
* The token needs to be random and unique
* But it also needs to be cryptographically strong
    - You don't want a hacker to be able to figure how you are generating these tokens and just trying them
    - There is a built-in module to node called `crypto` that will help us with that
        + The function on `crypto` is called `randomBytes`

`Mutation.js`

```
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto'); // add this

// MORE CODE
```

### Convert callback-based functions into Promise-based functions
#### promisify
* We will also need to grab promisify because we can run `randomBytes` asynchronously but it is best to run all your asynchronously
* The way `randomBytes` works is via a callback function at the time of recording and we need to turn that into a Promise-based function

`Mutation.js`

```
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

// MORE CODE
```

* In node there is a `util` library that has this `promisify`
* And what `promisify` will do is it will take **callback based functions** and turn them into `Promise-based` functions

`const resetToken = randomBytes(20).toString('hex')`

* You call randomBytes and pass it the length of how long want it to be (that returns a **Buffer** and you turn the Buffer into `hex`) which will give us a string
    - But at the moment it is `sychronous` 
    - But we can alter that with

```
const resetToken = (await promisify(randomBytes(20)).toString('hex'));
```

* And now we call it asynchronously

```
async requestReset(parent, args, ctx, info) {
  // 1. Check if this is a real user
  const user = await ctx.db.query.user({ where: { email: args.email } });
  if (!user) {
    throw new Error(`No such user found for email ${args.email}`);
  }
  // 2. Set a reset token and expiry on that user
  const reset = (await promisify(randomBytes(20))).toString('hex');
  // 3. TODO Email them that reset token
},
```

### Expiring - How long will this token be good for?
* We will use 1 hour for our application

`const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now`

## Take variables we just made and save them to the User
* We will take `reset` and `resetTokenExpiry` and save them to the User

`Mutation.js`

```
// MORE CODE

async requestReset(parent, args, ctx, info) {
  // 1. Check if this is a real user
  const user = await ctx.db.query.user({ where: { email: args.email } });
  if (!user) {
    throw new Error(`No such user found for email ${args.email}`);
  }
  // 2. Set a reset token and expiry on that user
  const resetToken = (await promisify(randomBytes(20))).toString('hex');
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
  const res = ctx.db.mutation.updateUser({
    where: { email: args.email },
    data: { resetToken, resetTokenExpiry },
  });
  console.log(res);
  return { message: 'Thanks' };
  // 3. TODO Email them that reset token
},
 
// MORE CODE
```

## Test drive
* We add a log to see what our `req` looks like
* We also add a `message` we want to return
* We have no UI so let's user Playground

`http://localhost:4444`

### Houston we have a problem
* Our promisify syntax is incorrect
* Error in server is `The "original" argument must be of type Function. Received type object`

#### Let's make our code easier to read
* In node 
    - **crypto** has method called `randomBytes()`
    - **util** has a method called `promisify()`

`Mutation.js`

```
// MORE CODE

async requestReset(parent, args, ctx, info) {
  // 1. Check if this is a real user
  const user = await ctx.db.query.user({ where: { email: args.email } });
  if (!user) {
    throw new Error(`No such user found for email ${args.email}`);
  }
  // 2. Set a reset token and expiry on that user
  const randomBytes = util.promisify(crypto.randomBytes);
  const resetToken = (await randomBytes(20)).toString('hex');
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
  const res = ctx.db.mutation.updateUser({
    where: { email: args.email },
    data: { resetToken, resetTokenExpiry },
  });
  console.log(res);
  // 3. TODO Email them that reset token
},

// MORE CODE
```

### Test in Playground
```
mutation REQUEST_RESET_MUTATION {
  requestReset(email: "bob@bob.com") {
    message
  }
}
```

* Run it
    - You should see this output

```
{
  "data": {
    "requestReset": {
      "message": "Thanks!"
    }
  }
}
```

* Observer your server and you should see:

`Promise { <pending> }`

* This lets you know that you forgot to `await` your call to the db
* So change this:

`Mutation.js`

```
// MORE CODE

const res = ctx.db.mutation.updateUser({
  where: { email: args.email },
  data: { resetToken, resetTokenExpiry },
});

// MORE CODE
```

* To this:

```
// MORE CODE

const res = await ctx.db.mutation.updateUser({
  where: { email: args.email },
  data: { resetToken, resetTokenExpiry },
});

// MORE CODE
```

* Now try it again in Playground
    - Remember to refresh Playground
* Same `Thanks!` output
* But look at the server and you will see something like this:

![server output showing our new User with encrypted password, resetToken, and the reset token expiry](https://i.imgur.com/1lBvxvl.png)

* Server output showing our new User with encrypted password, resetToken, and the reset token expiry
* **note** `resetToken` is the `token` we want to work with

## Additional Resources
* [Understanding Node's promisify and callbackify](https://medium.com/trabe/understanding-nodes-promisify-and-callbackify-d2b04efde0e0)
* [node util promisify documentation](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original)
* [stack overlow secure random token in node](https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js/43866992)
