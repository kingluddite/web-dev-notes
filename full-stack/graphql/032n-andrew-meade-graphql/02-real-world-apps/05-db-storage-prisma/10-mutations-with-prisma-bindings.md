# Mutations with Prisma Bindings
* Learn how to use methods available on `prisma.mutation` to perform Mutations from right here inside Node.js allowing you to Create, Update and Delete data store in your Database
* We'll comment out our previous queries

`prisma.js`

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
});

// const users = prisma.query
//   .users(null, '{ id name posts { id title } }')
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// const comments = prisma.query
//   .comments(null, '{ id text author { id name } }')
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });
```

## prisma.mutation
* prisma.mutation is an object
    - On that object we have a method for every single Mutation available to you
    - If you forget what you have access to, pull up your SCHEMA in GraphQL Playground

### Let's create a post
* We will now use operation arguments
* Will we create a new author or connect it to an existing author's id or email? (we'll use connect in this example)

```
prisma.mutation
  .createPost(
    {
      data: {
        title: 'Body By Jake',
        body: 'Eat less',
        published: true,
        author: {
          connect: {
            id: 'cjx00qd8l008a0859zfb31bhw',
          },
        },
      },
    },
    '{ id title body published }'
  )
  .then(data => {
    console.log(data);
  });
```

* We take care of the 1st argument (we have all of the operation arguments expected)
* In the second argument, we deal with what comes back, which is the post that was created and we have to determine what post we want related to that post
    - We could grab things from the post itself
    - We could grab related data (comments or info about the author)

**note** The return value (just like our Query methods) of createPost is not the post itself, it is actually a Promise, so we have to use `then()` to be able to "do something" when the Promise **resolves** 
    * When it actually:

1. Communicates with the Prisma API
2. Prisma has time to communicate with the Database

**Important** Only once everything happens do we want this function to run and when it finally does run we are going to get the `data` (and that is the **data** that we've chosen to select)

* Now we save the file and look at the data output in the Terminal

```
This graphql-yoga server is running
[Object: null prototype] {
  id: 'cjx6odo4303lw0759ueg4ppsu',
  title: 'Body By Jake',
  body: 'Eat less',
  published: true }
```

## Fetch all users again
* Now we should see our new user created
* **tip** Comment out the `prisma.mutation` or else you will generate another post when the file runs
* Uncomment our previous users query

```
// MORE CODE
const users = prisma.query
  .users(null, '{ id name posts { id title } }')
  .then(data => {
    console.log(data);
  });
```

* This shows that we can mutation data from directly inside Node.js

## Chaining calls together
* We can use "Promise Chaining" to get this done
    - Doing one thing after or before I do something else
    - Since we are working with Promises for all of them we can use Promise Chaining to get that done

### Task
* We will take our prisma.mutation.CreatePost and after it runs we will chain another prisma.query.users query below (we will do a bit of restructuring)

```
prisma.mutation
  .createPost(
    {
      data: {
        title: 'Soccer Rules!',
        body: '',
        published: false,
        author: {
          connect: {
            id: 'cjx4vfkqh00e5075900liocar',
          },
        },
      },
    },
    '{ id title body published }'
  )
  .then(data => {
    console.log(data);
    // We will make another call here!
    prisma.query.users(null, '{ id name posts { id title } }')
  });
```

* But since we are using Promise chaining we need to **return** this Promise from my `then` callback method which will allow me to add on another .then() method and this method will fire when our second Promise is complete

```
prisma.mutation
  .createPost(
    {
      data: {
        title: 'Soccer Rules!',
        body: '',
        published: false,
        author: {
          connect: {
            id: 'cjx4vfkqh00e5075900liocar',
          },
        },
      },
    },
    '{ id title body published }'
  )
  .then(data => {
    console.log(data);
    // We will make another call here!
    return prisma.query.users(null, '{ id name posts { id title } }')
  }).then((data) => {
     // this `data` will contain the output results
     // we use JSON.strinify() to correctly allow that nested data to actually show up in the Terminal
    });
```

* Here is the final chunk of code

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
});

// const users = prisma.query
//   .users(null, '{ id name posts { id title } }')
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// const comments = prisma.query
//   .comments(null, '{ id text author { id name } }')
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

prisma.mutation
  .createPost(
    {
      data: {
        title: 'Soccer Rules!',
        body: '',
        published: false,
        author: {
          connect: {
            id: 'cjx4vfkqh00e5075900liocar',
          },
        },
      },
    },
    '{ id title body published }'
  )
  .then(data => {
    console.log(data);
    return prisma.query.users(null, '{ id name posts { id title } }');
  })
  .then(data => {
    console.log(JSON.stringify(data, undefined, 2));
  });
```

## Review what happes
1. This code will run to create the post

![first code to run](https://i.imgur.com/hsT2dAg.png)

2. Then this call back will run
    * It will output data to the console
    * And only after createPost finishes will it start the process of query for all users and getting all of their posts which should include that new post 

![call back runs next](https://i.imgur.com/nEeYNmg.png)

3. Then we dump all that users data to the console

![dump users data to console](https://i.imgur.com/E3u5xMB.png)

* Now let's see our final code and run it

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
});

// const users = prisma.query
//   .users(null, '{ id name posts { id title } }')
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// const comments = prisma.query
//   .comments(null, '{ id text author { id name } }')
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

prisma.mutation
  .createPost(
    {
      data: {
        title: 'Soccer Rules!',
        body: '',
        published: false,
        author: {
          connect: {
            id: 'cjx4vfkqh00e5075900liocar',
          },
        },
      },
    },
    '{ id title body published }'
  )
  .then(data => {
    console.log(data);
    return prisma.query.users(null, '{ id name posts { id title } }');
  })
  .then(data => {
    console.log(JSON.stringify(data, undefined, 2));
  });
```

* You can change the contents of the new post you are creating

`$ npm start`

* We see we get our new post from (console.log(data))

```
This graphql-yoga server is running
[Object: null prototype] {
  id: 'cjx6p36ag044h07591qq9ez5v',
  title: 'Soccer Rules!',
  body: '',
  published: false }
```

* Then we get all our posts

## Challenge
* We'll do a Mutation first followed by a Query

### Goal - Practice Mutations
1. Update the newly created post changing it's body and marking it as published
2. Fetch all posts (id, title, body, published) and print them to the console
3. View the list of posts and confirm that post did have it body and published values updated

#### Challenge Solution

```
prisma.mutation
  .updatePost(
    {
      data: {
        body: 'I am really learning Prisma',
        published: true,
      },
      where: {
        id: 'cjx0117l300fd0859mgo0ra9o',
      },
    },
    '{ id title body published }'
  )
  .then(data => {
    console.log(data);
    return prisma.query.posts(null, '{ id, title, body, published }');
  })
  .then(data => {
    console.log(data);
  });
```

* Remember to return the `prisma.query.posts()` so you can chain it together with another mutation or query

## Recap
* Using Mutation inside of Node.js is exactly the same as using Mutations inside of GraphQL Playground

## Next - Convert to use async/await
* This will make it easier to to one thing after another
* Since all these Prisma methods support Promises the conversion to async/await will be very simple
