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

## We aren't working with sending the email yet
* So until we work with the email let's wire this slightly different
    - We will pause the `requestReset`, code up the actual reset portion of the requestReset and then we'll come back and work on sending email

## Open up prisma.io
* Find your user with a reset token
    - Have that handy and we'll now work on resetting it

![one resetToken in Prisma](https://i.imgur.com/yDegFdd.png)

## Now we need to code our `requestReset` schema
`backend/src/schema.graphql`

```
// MORE CODE

type Mutation {
  
  // MORE CODE

  requestReset(resetToken: String!, password: String!, confirmPassword: String!): User!
}

// MORE CODE
```

* We create `requestReset()`
    - It takes in:
        + The resetToken
        + A password and a confirmPassword
            * We want to doublecheck
            * We could also check if password is same on client side (either end is fine)
        + And we want to return a User which is required

## Jump into our Mutation resolver
`backend/src/resolvers/Mutation.js`

* Get ready, we have a lot of work to do!

```
// MORE CODE

  async requestReset(parent, args, ctx, info) {
    // 1. Check if the passwords match
    // 2. Check if its a legit reset token
    // 3. Check if token is expired
    // 4. Hash their new password
    // 5. Save the new password to the user and remove old resetToken fields
    // 6. Generate JWT
    // 7. Set the JWT cookie
    // 8. Return the new user
  }
};

module.exports = Mutations;
```

* All of the above has been done before
    - First see if you can do this yourself

### Check if passwords match
```
if (args.password !== args.confirmPassword) {
  throw new Error(`You're passwords don't match`);
}
```

### Check if it's a legit reset token
### Check if its expired
* We'll get the two for one special on this because we don't want to hit the server twice (make 2 server requests)

#### Houston we have a problem
* We want to query the user db like this:

```
const user = await ctx.db.query.user({ where: { args.resetToken } });
```

* But if we open our generated file with the graphql user query we are using:

`backend/src/generated/prisma.graphql`

```
// MORE CODE

user(where: UserWhereUniqueInput!): User

// MORE CODE
```

* And then if we look at `UserWhereUniqueInput` in `prisma.graqhql` we'll see this:

```
// MORE CODE

input UserWhereUniqueInput {
  id: ID
  email: String
}

// MORE CODE
```

* This means we can only use `user` if we have the `id` or the `email` and with requestReset we have neither
* So what do we do?

### Solution
* The reason `id` and `email` are unique is we marked those two unique in `datamodel.prisma`

`datamodel.prisma`

```
// MORE CODE

type User {
  id: ID! @unique
  name: String!
  email: String! @unique
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: [Permission]
}

// MORE CODE
```

* One solution is just add `@unique` to `resetToken` and we could totally do that and then it would regenerate our `prisma.graphql` and we could use `user` with `resetToken`

### But let's use a different solution
* We do it this way to illustrate how you can query based on fields that are not unique and you are just expecting the first item to come back
    - We can use the `users` method where it returns and array and we can destructure the first returned item into a variable called `user` and that gives us the ability to:

`prisma.graphql`

```
// MORE CODE

users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!

// MORE CODE
```

* No we are searching **where** `UserWhereInput`

```
// MORE CODE

input UserWhereInput {

// MORE CODE
```

* Just open this file and find `UserWhereInput` and observe how robust this GraphQL is (over 300 lines of queries),
* Very powerful!
* Far more flexible than only the two unique fields we were using before

### Building our query
```
// MORE CODE

const [user] = await ctx.db.query.users({
  where: {
    resetToken: args.resetToken,
    resetTokenExpiry_gte: Date.now() - 3600000,
  },
});

// MORE CODE
```

* Now this is pretty nifty
    - We use the `users()` method which returns an array
    - But we destructure the first user returned (our query will only have one result... what are the chances of two same resetTokens?)
    - And our `where` will first search for the `resetToken` the one we sent should match the one if the db
    - And we also check if it expired but using the `resetTokenExpiry_gte` which will find values greater than `now` plus an `hour` and if it is, the resetToken has expired

### Tell user if the token is bad

```
// MORE CODE

if (!user) {
  throw new Error('This token is either invalid or expired');
}

// MORE CODE
```

### Hash the password
* We did this before

```
// MORE CODE

const password = await bcrypt.hash(args.password, 10);

// MORE CODE
```

### Save the new password to the user and remove old resetToken fields
```
// MORE CODE

const updatedUser = await ctx.db.mutation.updateUser({
  where: { email: user.email },
  data: { password, resetToken: null, resetTokenExpiry: null },
});

// MORE CODE
```

### Generate the token
* We did this before
* Notice we are using the `updatedUser` and not `user`

```
// MORE CODE

const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);

// MORE CODE
```

### Set the token
* We did this before

```
// MORE CODE

setCookieWithToken(ctx, token);

// MORE CODE
```

### return the user
* We did this many times before
* Notice that we again are using `updatedUser` as that is the user with the updated **hashed** `password`

```
// MORE CODE

return updatedUser;

// MORE CODE
```

### Put it all together

`Mutation.js`

```
// MORE CODE

async requestReset(parent, args, ctx, info) {
  // 1. Check if the passwords match
  if (args.password !== args.confirmPassword) {
    throw new Error(`You're passwords don't match`);
  }
  // 2. Check if its a legit reset token
  // 3. Check if token is expired
  const [user] = await ctx.db.query.users({
    where: {
      resetToken: args.resetToken,
      resetTokenExpiry_gte: Date.now() - 3600000,
    },
  });
  if (!user) {
    throw new Error('This token is either invalid or expired');
  }
  // 4. Hash their new password
  const password = await bcrypt.hash(args.password, 10);
  // 5. Save the new password to the user and remove old resetToken fields
  const updatedUser = await ctx.db.mutation.updateUser({
    where: { email: user.email },
    data: { password, resetToken: null, resetTokenExpiry: null },
  });
  // 6. Generate JWT
  const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
  // 7. Set the JWT cookie
  setCookieWithToken(ctx, token);
  // 8. Return the new user
  return updatedUser;
},

// MORE CODE
```

* In order to test this you need to generated another resetToken
    - Remember that tokens expire after an hour
    - Login to prisma and copy the `resetToken`

### Test in Playground
`http://localhost:4444/`

```
mutation REQUEST_RESET_MUTATION {
  requestReset(resetToken: "22634ff370b5934c5248a22664eb13a98994e8a9", password: "1234", confirmPassword: "12345") {
    id
    name
  }
}
```

* Run
* You're output should generate an error that says

```
{
  "data": null,
  "errors": [
    {
      "message": "You're passwords don't match",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "requestReset"
      ]
    }
  ]
}
```

* Nice, our server side validation is working
* Now pass a valid new password
* But we will get this error `This token is either invalid or expired`

### We need to create a new resetToken
* Just run this again in Playground

```
mutation REQUEST_RESET_MUTATION {
  requestReset(email: "bob@bob.com") {
    message
  }
}
```

* Refresh Prisma to make sure you have the latest data
* Copy the `requestReset` and paste it into Playground and run again
* Try your new password (after logging out) to log that user in and it should work
* Try to run the reset password mutation again and it should not work and give you an error `This token is either invalid or expired`

### Backend for requestReset is complete

## Next - Build the UI for our requestReset in React

## Additional Resources
* [Understanding Node's promisify and callbackify](https://medium.com/trabe/understanding-nodes-promisify-and-callbackify-d2b04efde0e0)
* [node util promisify documentation](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original)
* [stack overlow secure random token in node](https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js/43866992)
