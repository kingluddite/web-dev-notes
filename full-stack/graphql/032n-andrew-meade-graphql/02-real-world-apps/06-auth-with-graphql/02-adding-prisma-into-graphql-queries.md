# Adding Prisma into GraphQL Queries
* We will place our `Node.js` between our public users and the private Prisma GraphQL API

## Why do this?
* We don't want users to be able to directly interact with the GraphQL API because then they could use CRUD on our Database
    - They could sabatage all our user data if they wanted

## Node.js as the middleman
* We'll place Node.js in the middle (aka as the middleman)
* This will let us set up stuff like:
    - Data validation
    - Authentication

## Can any of our GraphQL API be public?
* Sure. We will expose the posts so that anyone can access posts even if they are not authenticated

## What will we keep private?
* A user's draft posts should only be accessible by the user who created the draft post - so that user will have to authenticate to access their draft posts

## Task - put Node.js between our public users and our private GraphQL API
* Will will start inside `src/resolvers/Query.js`

`Query.js`

```
const Query = {
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter(post => {

// MORE CODE
```

* We are using the static db.js to query an array of data
* We want to use Prisma instead of db.js
    * We are going to use `prisma.query.users()` to fetch data from our Database

## We first need to update `prisma.js`
* We are going to comment everything out except:

`prisma.js`

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
});

// MORE CODE
```

* So now we have one line where we import prisma-binding
* And another line we we create a new instance using the Prisma constructor function

## Add an export
* We will add an export at the bottom of this file as we want other files to be able to access `prisma`
    - This will enable us to use 
        + `prisma.mutation`
        + `prisma.querq`
        + `prisma.exists`
        + `prisma.subscritpion`

`prisma.js`

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
  });

export { prisma as default };
```

## Setup prisma to live in our application context
`src/index.js`

```
// MORE CODE

import './prisma';

// MORE CODE
  context: {
    db,
    pubsub,
  },
});

server.start(() => {
  console.log('This graphql-yoga server is running');
});
```

* **note** We use `import './prisma'` so we could test our code to run prisma.mutation and prisma.query
* Now we'll add prisma to the application context with:

```
// MORE CODE

import prisma from './prisma';

// MORE CODE
  context: {
    db,
    pubsub,
    prisma // WE ADD THIS LINE!
  },
});

server.start(() => {
  console.log('This graphql-yoga server is running');
});
```

* **note** We grab the default export like this:

`import prisma from './prisma';`

* And then allows us to add `prisma` to the application context

## Back to resolvers/Query.js
* Now just like we could access db from the application context we now can also grab `prisma`

`resolvers/Query.js`

```
const Query = {
  posts(parent, args, { db, prisma }, info) {
    if (!args.query) {
      return db.posts;
    }

// MORE CODE
```

## Start the app
`$ cd graphql-prisma`

`$ npm start`

### Open GraphQL Playground
* Make sure to browse to `http://localhost:4000`
* You should see GraphQL Playground is running
* Run the users query and you will see all the static data from the array in db.js

## Change that method from db.js to get the data from the prisma Database instead
* `prisma.query.users(OPERATON_ARGUMENT/null, OUR_SELECTION_SET)`
    - Select Set ---> What fields to we want to grab?

## More about the SELECTION_SET argument
* There are 3 distinct types of values for SELECTION_SET

1. nothing
    * I could leave the 2nd argument off entirely
        - `prisma.query.users(null)`
    * add a falsey value like `null` or `undefined`
        - In this case Prisma will fall back to a default and that default will have all the scaler fields for that type
    * `prisma.query.users(null, null)`
        - So in this case we are fetching users which returns a user type which means you would get all scaler fields for that user
            + So see below and you that we would get the `id`, `name`, `email`, `createdAt` and `updatedAt` scaler values
        - We would not get anything back about the posts or comments (they are not scaler)
        - But this is not what we want
            + The problem with not providing no second argument is that we can never ask for relational data!

`prisma/datamodel.prisma`

```
// MORE CODE

type User {
  id: ID! @id
  name: String!
  email: String! @unique
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  posts: [Post!]! @relation(name: "PostToUser", onDelete: CASCADE)
  comments: [Comment!]! @relation(name: "CommentToUser", onDelete: CASCADE)
}

// MORE CODE
```

* So if we were querying for just this:

```
query {
  users {
    id
    name
    age
  }
}
```

* That would work find with `null` as the second argument but this:

```
query {
  users {
    id
    name
    age
    post {
      id
    }
  }
}
```

* Above would not work because we can not query for relational fields when using `null` as the second argument

2. string

    * We've used string before like this:

```
// MORE CODE

//     },
//     '{ author {  name email posts { id title published }}}'
//   );
//   return post.author;
// };

// MORE CODE
```

* This is fine but the problem is that we have to explicitly define what we need and in this case we don't know what we need because what we need is coming from the user (and when we say user we could mean the client on the web or the client on IOS)
* We have this query coming from our client through node we don't want to type out a different query, we actually want to use the same one

3. object - We will end up providing an object, but this is not an object we define, but it is actually an object that is created for us
    * The object that we are going to be passing in as the second argument is the `info` object (that has been here all along but we never used it yet)

## What does `info` contain?
* `info` contains all of the information about that original operation   
* This information would exist somewhere like a web browser or an IOS app, it would get sent off to the server and it is accessible via `info`
* We will take `info` and pass it right through to `prisma` so `prisma` can grab the same things that were requested
    - If I asked for specific fields, prisma would grab those fields
    - If I asked for related data, prisma would grab that related data

`src/resolvers/Query.js`

* We pass in `info` as the second argument to `prisma.query.users()`
* This is something we will do throughout all of our resolvers (regardless of whether they are Queries or Mutations - We want to replay the query provided to Node.js we don't want to explicitly type out something new using a string and we want to get more than just the scaler values that providing nothing would give us)

```
const Query = {
  users(parent, args, { db, prisma }, info) {
    prisma.query.users(null, info);

// MORE CODE
```

## What do we have so far
* We have a Promise and we need to do something with this Promise
    - Our resolver method like users can actually take a Promise as the return value
        + It will wait for the Promise to resolve and then it will send that data back which means we can return exactly what we have here

```
const Query = {
  users(parent, args, { db, prisma }, info) {
    return prisma.query.users(null, info);

// MORE CODE
```

## Remove age
`src/schema.graphql`

* We aren't using this anymore so let's remove it
* Before:

```
// MORE CODE

type User {
  id: ID!
  name: String!
  email: String!
  age: Int # REMOVE THIS LINE!!!
  posts: [Post!]!
  comments: [Comment!]!
}

// MORE CODE
```

* After

```
// MORE CODE

type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
  comments: [Comment!]!
}

// MORE CODE
```

* Save both files

## Run query on localhost:4000
* This query will get sent off to `Node.js`
* In the past this returned data from our data array now we should be getting data from our Database
* If you don't refresh GraphQL Playground you will see age causes an error because we removed it from `schema.graphql`

GraphQL Playground

```
query {
  users {
    id
    name
    email
    posts {
      id
    }
  }
}
```

* Will give you a response similar to:

```
{
  "data": {
    "users": [
      {
        "id": "cjx00qd8l008a0859zfb31bhw",
        "name": "Clyde",
        "email": "clyde@clyde.com",
        "posts": []
      }
    ]
  }
}
```

* Now we are getting all the data that we saved in our postgres Database
* So now by putting Node.js right between our public API and Prisma we were able to fetch that data from the Database
    - Currently there are no restrictions


 
