# Adding Prisma into GraphQL Mutations
* With Mutations we want Node.js to serve as middleman
    - With Node.js we can make sure a user has the right permissions to

`Mutation.js`

* Converting using data from db.js array to Prisma Database

## Let's tackle createUser first
```
// MORE CODE

import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent, args, { db }, info) {
    const { data } = args;
    const emailTaken = db.users.some(user => user.email === data.email);

    // if email exists, throw error back to client
    if (emailTaken) {
      throw new Error('Email taken!');
    }

    // if email is not taken
    // create new user
    const user = {
      id: uuidv4(),
      // name: args.name,
      // email: args.email,
      // age: args.age,
      ...args.data,
    };

    // save the user (add to array)
    db.users.push(user);

    // return the user
    // so the client can get values off of user
    return user;
  },

// MORE CODE
```

* Now comment out our current code

```
import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent, args, { db }, info) {
  //   const { data } = args;
  //   const emailTaken = db.users.some(user => user.email === data.email);
  //
  //   // if email exists, throw error back to client
  //   if (emailTaken) {
  //     throw new Error('Email taken!');
  //   }
  //
  //   // if email is not taken
  //   // create new user
  //   const user = {
  //     id: uuidv4(),
  //     // name: args.name,
  //     // email: args.email,
  //     // age: args.age,
  //     ...args.data,
  //   };
  //
  //   // save the user (add to array)
  //   db.users.push(user);
  //
  //   // return the user
  //   // so the client can get values off of user
  //   return user;
  },
```

* First part of the conversion

```
import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent, args, { prisma }, info) {
       const emailTaken = prisma.exists.User({ email: args.data.email });

// MORE CODE
```

* But it is important to note what comes back from User is a Promise
    - So we will use async/await

```
import uuidv4 from 'uuid/v4';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });

// MORE CODE
```

* `emailTaken` will hold a Boolean value
    - If the user has an email email (exists) it will be true
    - If the user doesn't have a matching email (doesn't `exist`) it will be false

```
// MORE CODE
import uuidv4 from 'uuid/v4';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });

    // if email exists, throw error back to client
    if (emailTaken) {
      throw new Error('Email taken!');
    }

    // at this point our uniqueness is verfied
    // time to create the user
    const user = await prisma.mutation.createUser({ data: args.data });
```

* How can we visualize what is happening here? How are we getting the data?
    - The client makes a request to the `Node.js` API and it passes in the arguments necessary
    - We can see what arguments we are expecting by viewing `schema.graphql`

```
// MORE CODE

type Mutation {
  createUser(data: CreateUserInput!): User!
// MORE CODE
```

* And if we look at CreatUserInput inside `schema.graphql`

```
// MORE CODE

input CreateUserInput {
  name: String!
  email: String!
  age: Int
}
// MORE CODE
```

* We can remove `age` as we are not using it anymore
    - Also remove it from `UpdateUserInput`

```
// MORE CODE

input CreateUserInput {
  name: String!
  email: String!
}

input UpdateUserInput {
  name: String
  email: String
}

// MORE CODE
```

* Now we know that `args.data` will have a `name` and `email`
    - So it is perfectly fine to pass that on through to Prisma which expects a name and an email

## Make sure to also pass in `info`
* We will pass this in as the second argument
* This will make sure that whatever selection set was asked for ends up coming back

### Don't forget to return something
* We'll return the user

`Mutation.js`

```
// MORE CODE

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });

    // if email exists, throw error back to client
    if (emailTaken) {
      throw new Error('Email taken!');
    }

    // at this point our uniqueness is verfied
    // time to create the user
    const user = await prisma.mutation.createUser({ data: args.data });

    return user;
  },

// MORE CODE
```

* **note** We can return Promises from our resolver functions so the code we have here is identical to just returning the Promise directly
* There is no need to create a separate variable
* This will make our code more concise

```
import uuidv4 from 'uuid/v4';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });

    // if email exists, throw error back to client
    if (emailTaken) {
      throw new Error('Email taken!');
    }

    // at this point our uniqueness is verfied
    // time to create the user
    return prisma.mutation.createUser({ data: args.data }, info);
  },

// MORE CODE
```

* Don't forget the second argument `info`, - this makes sure that what ever selection set was asked for actually ends up coming back
    + So if I create a new user and just ask for their `id` that is the exact information we'll get back since we're passing `info` through

## Test it in :4000 GraphQL
* `Is your server running?`

`$ npm start`

```
mutation {
  createUser(data:{
    name:"Mike",
    email:"mike@mike.com"
  }) {
    id
    name
    email
  }
}
```

* Verify that it is in the Database
* View all rows

![view all the records in Postgres](https://i.imgur.com/weNxfSH.png)

* We just successfully used Node.js as a middleman between the Prisma API and our public API

## deleteUser, deleting posts and comments
* It was a lot more complicated before
* In this refactor it will get drastically simpler

## Challenge
* Goal: Wire up deleteUser to work with the Prisma Database

1. Refactor the deleteUser Mutations resolver to use prisma instead of the array data
    * Check that a user exists with that id, else throw an error
    * Delete and return the user
    * (Don't worry about removing posts or comments (that was configured with @relation))
2. Test your work by removing a user and verifying that the user was deleted from the Database

## Start
```
deleteUser(parent, args, { db }, info) {

  // const { id } = args;
  //
  // // check for a user
  // const userIndex = db.users.findIndex(user => user.id === id);
  //
  // // check if no user was found
  // if (userIndex === -1) {
  //   throw new Error('User not found');
  // }
  //
  // const deletedUsers = db.users.splice(userIndex, 1);
  //
  // db.posts = db.posts.filter(post => {
  //   const match = post.author === id;
  //
  //   if (match) {
  //     db.comments = db.comments.filter(comment => comment.post !== post.id);
  //   }
  //
  //   return !match;
  // });
  //
  // db.comments = db.comments.filter(comment => comment.author !== id);
  //
  // return deletedUsers[0];
},
```

1. Refactor the deleteUser Mutations resolver to use prisma instead of the array data
    * Check that a user exists with that id, else throw an error
    * Delete and return the user
    * (Don't worry about removing posts or comments (that was configured with @relation))
2. Test your work by removing a user and verifying that the user was deleted from the Database

`Mutation.js`

```
// MORE CODE

  async deleteUser(parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({ id: args.id });

    // check if no user was found
    if (!userExists) {
      throw new Error('User not found');
    }

    return prisma.mutation.deleteUser({ where: { id: args.id } }, info);
  },

// MORE CODE
```

* Don't forget the second argument `info`, - this makes sure that what ever selection set was asked for actually ends up coming back
* Also check in Postgres (pgAdmin) to verify user was indeed removed

## Recap
* We can create and delete users with Node.js acting as that intermediary
