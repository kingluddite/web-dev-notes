# Using Ascyn/Await with Prisma Bindings
* We'll use async/await with our Mutations and Queries since all of those methods return Promises and we can use async/await anywhere that Promises are used

## Replace both of these methods with one async/await function
* before

```
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

### Our new async/await function
* **note** You can remove the commented out code above from our `prisma.js` file
* Stuff this function will do

1. Create a new post (it will take some post data in as new arguments)
2. Fetch all of the info about the user (the user is aka "author")
    * After I create a post I want to get all of the details about the author
        - His name, email, id, other posts they've created
        - **note** Remember It is very important that one operation occurs before another operation
        - We want one operation to start and finished before we start the second operation

`prisma.js`

```
// MORE CODE

const createPostForUser = async (authorId, data) => {

}

// MORE CODE
```

* `data` will hold an object of `name`, `id`, `email`
* `...data` is a way to spread out all the fields

`src/prisma.js`

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
});

// notice we are using "async"
const createPostForUser = async (authorId, data) => {
  // create a post
  // we will store the post data that comes back from calling createPost
  // we will await the Promise that comes back from createPost and we will get the resolved value
  // so instead of having to attach the `then()` value to get the resolved value, we can grab it right at `port` as long as we are using async/await
  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    },
    '{ id }'
  );
  const user = await prisma.query.user(
    {
      where: {
        id: authorId,
      },
    },
    '{ id name email posts { id title published } }'
  );
  return user;
};

createPostForUser('cjx00qd8l008a0859zfb31bhw', {
  title: 'Great books to read',
  body: 'The Power of Now',
  published: true,
}).then(user => {
  console.log(JSON.stringify(user, undefined, 2));
});
// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: 'Soccer Rules!',
//         body: '',
//         published: false,
//         author: {
//           connect: {
//             id: 'cjx4vfkqh00e5075900liocar',
//           },
//         },
//       },
//     },
//     '{ id title body published }'
//   )
//   .then(data => {
//     console.log(data);
//     return prisma.query.users(null, '{ id name posts { id title } }');
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.mutation
//   .updatePost(
//     {
//       data: {
//         body: 'I am really learning Prisma',
//         published: true,
//       },
//       where: {
//         id: 'cjx0117l300fd0859mgo0ra9o',
//       },
//     },
//     '{ id title body published }'
//   )
//   .then(data => {
//     console.log(data);
//     return prisma.query.posts(null, '{ id, title, body, published }');
//   })
//   .then(data => {
//     console.log(data);
//   });
```

## Analyze the code
```
const createPostForUser = async (authorId, data) => {

  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    },
    '{ id }'
  );
  const user = await prisma.query.user(
    {
      where: {
        id: authorId,
      },
    },
    '{ id name email posts { id title published } }'
  );
};
```

* We have access to the post `id` and the `user` variable which contains a lot of info about the author
* We will return the user

```
// MORE CODE

 const user = await prisma.query.user(
    {
      where: {
        id: authorId,
      },
    },
    '{ id name email posts { id title published } }'
  );
  return user;
};
```

## Let's call createPostForUser()
* And call it with the necessary arguments (`authorId` and `data`)
* We grab an author id either from the Database or from GraphQL (users query from GraphQL Playground)

```
// MORE CODE

createPostForUser('cjx00qd8l008a0859zfb31bhw', {
  title: 'Great books to read',
  body: 'The Power of Now',
  published: true,
});

// MORE CODE
```

* The last thing we need to do is set things up so we can grab that user information
* **note** async functions ALWAYS return a Promise and the **resolved** value of that Promise is always what you `return`
* So we can use `user` (which was exactly what was returned) and we'll print it to the console

```
// MORE CODE

createPostForUser('cjx00qd8l008a0859zfb31bhw', {
  title: 'Great books to read',
  body: 'The Power of Now',
  published: true,
}).then(user => {
  console.log(JSON.stringify(user, undefined, 2));
});

// MORE CODE
```

* Run our code

`$ npm start` (or if nodemon is used the info will auto refresh)

* You should see the user object is with user attributes and the post created (Terminal Output)

```
This graphql-yoga server is running
{
  "id": "cjx00qd8l008a0859zfb31bhw",
  "name": "Clyde",
  "email": "clyde@clyde.com",
  "posts": [
{
      "id": "cjx70dqkx084f07598kkghb43",
      "title": "Great books to read",
      "published": true
    }
    ]
}
```

* Now we just showed how to use async/await with all of our prisma-binding methods
* This makes managing our asynchronous code much easier because we can do one thing after another without having to use **nested callbacks** and more than a single **then()** method

## Challenge
* Comment out `createPostForUser`

`prisma.js`

* We do this because we don't want this code snippet to run every time this file executes

```
// MORE CODE

// createPostForUser('cjx00qd8l008a0859zfb31bhw', {
//   title: 'Great books to read',
//   body: 'The Power of Now',
//   published: true,
// }).then(user => {
//   console.log(JSON.stringify(user, undefined, 2));
// });

// MORE CODE
```

* We'll also remove the `prisma.mutation.createPost()` method because we re-purposed that code snippet
* He is our current code

`prisma.js`

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
});

// notice we are using "async"
const createPostForUser = async (authorId, data) => {
  // create a post
  // we will store the post data that comes back from calling createPost
  // we will await the Promise that comes back from createPost and we will get the resolved value
  // so instead of having to attach the `then()` value to get the resolved value, we can grab it right at `port` as long as we are using async/await
  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    },
    '{ id }'
  );
  const user = await prisma.query.user(
    {
      where: {
        id: authorId,
      },
    },
    '{ id name email posts { id title published } }'
  );
  return user;
};

// createPostForUser('cjx00qd8l008a0859zfb31bhw', {
//   title: 'Great books to read',
//   body: 'The Power of Now',
//   published: true,
// }).then(user => {
//   console.log(JSON.stringify(user, undefined, 2));
// });

// prisma.mutation
//   .updatePost(
//     {
//       data: {
//         body: 'I am really learning Prisma',
//         published: true,
//       },
//       where: {
//         id: 'cjx0117l300fd0859mgo0ra9o',
//       },
//     },
//     '{ id title body published }'
//   )
//   .then(data => {
//     console.log(data);
//     return prisma.query.posts(null, '{ id, title, body, published }');
//   })
//   .then(data => {
//     console.log(data);
//   });
```

## Challenge code
* Re-purpose this code

```
// prisma.mutation
//   .updatePost(
//     {
//       data: {
//         body: 'I am really learning Prisma',
//         published: true,
//       },
//       where: {
//         id: 'cjx0117l300fd0859mgo0ra9o',
//       },
//     },
//     '{ id title body published }'
//   )
//   .then(data => {
//     console.log(data);
//     return prisma.query.posts(null, '{ id, title, body, published }');
//   })
//   .then(data => {
//     console.log(data);
//   });
```

### Challenge Questions
* Goal: Use async/await with prisma-bindings

1. Create "updatePostForUser" that accepts the post id and data to update
2. Update the post (get author id back)
3. Fetch the user associated with the updated post and return the user data
    * Grab the same fields grabbed for createPostForUser
4. Call the function with the id and data and use a `then()` method call to get the user information
5. Print the user info to the console and test your work

#### Challenge Solution
1. Create "updatePostForUser" that accepts the post `id` and `data` to update

```
const updatePostForUser = (postId, data) => {

}
```

2. Update the post (get authorId back)

```
// MORE CODE

const updatePostForUser = async (postId, data) => {
  const post = await prisma.mutation.updatePost(
    {
      data,
      where: {
        id: postId,
      },
    },
    '{ author { id } }'
  );

// MORE CODE
```

3. Fetch the user associated with the updated post and return the user data
    * Grab the same fields grabbed for `createPostForUser`

```
// MORE CODE

  const user = await prisma.query.user(
    {
      where: {
        id: post.author.id,
      },
    },
    '{ id name email posts { id title published } }'
  );
  return user;
};

// MORE CODE
```

4. Call the function with the `id` and `data` and use a `then()` method call to get the user information

```
// MORE CODE

updatePostForUser('cjx0117l300fd0859mgo0ra9o', {
  title: 'The best of times',
  body: 'Charles Dickens book',
  published: true,
});

// MORE CODE
```

5. Print the user info to the console and test your work

```
// MORE CODE

updatePostForUser('cjx0117l300fd0859mgo0ra9o', {
  title: 'The best of times',
  body: 'Charles Dickens book',
  published: true,
}).then(user => {
  console.log(JSON.stringify(user, undefined, 2));
});

// MORE CODE
```

* Run it with `$ npm start`

## Completed code
`prisma.js`

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
});

// notice we are using "async"
const createPostForUser = async (authorId, data) => {
  // create a post
  // we will store the post data that comes back from calling createPost
  // we will await the Promise that comes back from createPost and we will get the resolved value
  // so instead of having to attach the `then()` value to get the resolved value, we can grab it right at `port` as long as we are using async/await
  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    },
    '{ id }'
  );
  const user = await prisma.query.user(
    {
      where: {
        id: authorId,
      },
    },
    '{ id name email posts { id title published } }'
  );
  return user;
};

// createPostForUser('cjx00qd8l008a0859zfb31bhw', {
//   title: 'Great books to read',
//   body: 'The Power of Now',
//   published: true,
// }).then(user => {
//   console.log(JSON.stringify(user, undefined, 2));
// });

const updatePostForUser = async (postId, data) => {
  const post = await prisma.mutation.updatePost(
    {
      data,
      where: {
        id: postId,
      },
    },
    '{ author { id } }'
  );
  const user = await prisma.query.user(
    {
      where: {
        id: post.author.id,
      },
    },
    '{ id name email posts { id title published } }'
  );
  return user;
};

// updatePostForUser('cjx0117l300fd0859mgo0ra9o', {
//   title: 'The best of times',
//   body: 'Charles Dickens book',
//   published: true,
// }).then(user => {
//   console.log(JSON.stringify(user, undefined, 2));
// });
```

## Next
* Learn how to use `prisma.exists` to figure out if something exists
    - Example
        + Am I trying to create a post for a user where there is no user with this id?
        + Am I trying to update a post where this postId doesn't even exist





