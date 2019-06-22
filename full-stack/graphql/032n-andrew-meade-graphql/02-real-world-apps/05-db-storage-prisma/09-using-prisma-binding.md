# Using Prisma Bindings
* We will read and write from the DB right inside our Node.js
* We will see what "comes back" on this 'prisma' object
    - We'll see how we can use the prisma object to perform all of the GraphQL operations we want to

`src/prisma.js`

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'localhost:4466',
});
```

* Before we read/write to the DB but we will first work through some examples in the prisma file to take it for a test run and understand how it works
* But later we will integrate it into our **resolvers** for Queries, Mutations and Subscriptions

## We start using Asynchronous JavaScript
* callbacks
* Promises
* async/await

## Back to our `prisma` object
* There are 4 key properties that we will be using

1. prisma.query (contains all the Queries we have access to)
2. prisma.mutation (contains all the Mutations we have access to)
3. prisma.subscription (contains all the Subscriptions we have access to)
4. prisma.exists (contains some handy utility methods)

## prisma.query
* Let's find out how we can fetch data from our DB right here in Node.js

### Examine our Documentation
* posts
* comments
* users

### Let's fetch some users
* The method name matches up exactly with the query name
* All prisma methods take TWO arguments

`src/prisma.js`

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'localhost:4466',
});

prisma.query(OPERATION_ARGUMENTS_HERE, SELECTION SET HERE);
```

1. Operation arguments
2. Selection set

* Some operations like our Mutations they do require operation arguments (we have to provide `data` when creating a user)

```
mutation {
  createUser(data: {
    name: "Harry",
    email:"harry@clyde.com"
  }) {
    id
    name
    email
  }
}
```

* But for our user's Query operation arguments are completely optional (if we have no arguments to pass in, we'll use `null`)

```
prisma.query(null, SELECTION SET HERE);
```

* For our `Selection Set` argument to all of our prisma binding methods, what do we want about each user?

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

* In our Select set we pass it a String
* Inside the string we use curly braces and list out all the things we want (similar to how we list them out in the GraphQL above)
* We can do all of this on a single line

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'localhost:4466',
});

prisma.query(null, '{ id name email }');
```

* What "comes back" from the users function?
    - A Promise
        + This means we need to use `then()` or `catch()` to wait for the Promise to resolve
        + This is an asynchronous operation because it takes time to go off and make a request to the GraphQL Prisma API and it takes time for Prisma to make a request to the underlying Database

## This will not work as expected
* We will actually get a Promise back
* So we need to wait for this Promise to **resolve** and we do this by using the **then** method and passing in our **callback** function
    - The callback function will be called when the user's Query is done
    - The callback gets called with a single argument `data` (this is the data that "came back from" the Query)
    - The `data` from our prisma-binding example represents the same `data` used in the GraphQL Query
        + This `data` represents the response from the API

`src/prisma.js`

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'localhost:4466',
});

const users = prisma.query(null, '{ id name email }');
```

## Dump the data to the console
* Later we will integrate all of this into our **resolvers** files

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'localhost:4466',
});

const users = prisma.query(null, '{ id name email }').then(data) => {
  console.log(data);
};
```

* **note**
    - Before we run the project we need to make a couple of small changes

1. Add the protocol with the endpoint it is required

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
});

const users = prisma.query.users(null, '{ id name email }').then(data => {
  console.log(data);
});
```

2. We also have to modify `index.js`

* Currently `index.js` will not even run
* We need to import `prisma.js` into `index.js` so the file (prisma.js) actually executes

```
// MORE CODE
import { GraphQLServer, PubSub } from 'graphql-yoga';

// custom
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import './prisma'; // ADD THIS LINE
```

* We are not grabbing any **default** or **named** exports so we can leave off the exports list and the `from` keyword and just go right to the file name
* All this will do is run the file and that is all we need it to do so that it actually executes our query and dumps our data to the console

## Run our app
`$ npm start`

* You should see the data response in the terminal

```
This graphql-yoga server is running
[ [Object: null prototype] {
    id: 'cjx00qd8l008a0859zfb31bhw',
    name: 'Clyde',
    email: 'clyde@clyde.com' },
  [Object: null prototype] {
    id: 'cjx4vfkqh00e5075900liocar',
    name: 'Harry',
    email: 'harry@clyde.com' } ]
```

* We get back an array of objects
    - Since we are using prisma.query.users() we will get an array back
    - Each object represents a `user`
    - Each object has the properties we requested `id`, `namd` and `email`

## Alter our query
* Remove email

`prisma.js`

```
// MORE CODE
const users = prisma.query.users(null, '{ id name }').then(data => {
  console.log(data);
});
```

* Re-run with `$ npm start` (or if you are using nodemon, you won't need to restart server)
* The new data returned is:

```
This graphql-yoga server is running
[ [Object: null prototype] { id: 'cjx00qd8l008a0859zfb31bhw', name: 'Clyde' },
  [Object: null prototype] { id: 'cjx4vfkqh00e5075900liocar', name: 'Harry' } ]
```

* Now `email` is gone and for each object we now just have `id` and `name`
* The `Selection set` is very important since it determines the structure of the data that comes back (which is exactly what we saw in GraphQL Playground)

## Congrats!
* We now just learned how to fetch data using our Query from our postgres Database right inside our Node.js app

## Can we also Query for related data?
* I also want the related posts from the user. Can I do that?
* Yes

```
// MORE CODE

const users = prisma.query
  .users(null, '{ id name posts { id title } }')
  .then(data => {
    console.log(data);
  });
```

* Response in Terminal

```
This graphql-yoga server is running
[ [Object: null prototype] {
    id: 'cjx00qd8l008a0859zfb31bhw',
    name: 'Clyde',
    posts: [ [Object] ] },
  [Object: null prototype] { id: 'cjx4vfkqh00e5075900liocar', name: 'Harry', posts: [] } ]
```

* Once user has a post and the other does not (as expected)

## Why are we not seeing the actual object from the post?
* We just see `posts: [ [Object] ]`
* This is because the console is just hiding some of the output to prevent it from getting too complex

### JSON.stringify()
* We can fix that by switching up our console.log call
* `JSON.stringify()` is an easy way to convert a JavaScript object or array into JSON data that will enable us to customize how it is formatted in the output

#### We pass in 3 arguments to JSON.stringify()

```
JSON.stringify(YOUR_DATA, REPLACER FUNCTION or undefined, SPACES_WHEN_INDENTING_JSON)
```

1. `data` - we pass in our data object
2. `replacer function` - allows us to remove and replace properties
  * If you don't use this use `undefined`
  * In this example we just want to see our data as is so we'll pass in `undefined`
3. `How many spaces we'll use` when indenting our JSON
    - common values are 2 or 4 (we'll use 2)

```
// MORE CODE
const users = prisma.query
  .users(null, '{ id name posts { id title } }')
  .then(data => {
    console.log(JSON.stringify(data, undefined, 2));
  });
```

* Run it and you'll see something like in the Terminal:

```
This graphql-yoga server is running
[
  {
    "id": "cjx00qd8l008a0859zfb31bhw",
    "name": "Clyde",
    "posts": [
      {
        "id": "cjx0117l300fd0859mgo0ra9o",
        "title": "1986 World Cup"
      }
    ]
  },
  {
    "id": "cjx4vfkqh00e5075900liocar",
    "name": "Harry",
    "posts": []
  }
]
```

* Using prisma-binding we can do anything that we could do from GraphQL Playground
  - The advantage is that it is inside our code!
  - So this makes is very easy for us to use it to build out our app

## Challenge
* Goal: Fetch comments using prisma-binding

1. Use comments query to fetch all comments
  * Grab the comment id and text
  * Grab the comment author id and name
2. Test your work by saving the file and viewing the Terminal output

### Solution
```
const comments = prisma.query
  .comments(null, '{ id text author { id name } }')
  .then(data => {
    console.log(JSON.stringify(data, undefined, 2));
  });
```

* Output

```
This graphql-yoga server is running
[
  {
    "id": "cjx4ysu5q00mm0759d6b2bzm8",
    "text": "I like prisma",
    "author": {
      "id": "cjx4vfkqh00e5075900liocar",
      "name": "Harry"
    }
  },
  {
    "id": "cjx4yu3e700nm0759e10bgrpk",
    "text": "I like prisma",
    "author": {
      "id": "cjx4vfkqh00e5075900liocar",
      "name": "Harry"
    }
  }
]
```

## Recap
* We now know how to query data directly inside Node.js

## Next
* Look at how we can use `prisma.mutation()` and how we can pass in **operation arguments**


