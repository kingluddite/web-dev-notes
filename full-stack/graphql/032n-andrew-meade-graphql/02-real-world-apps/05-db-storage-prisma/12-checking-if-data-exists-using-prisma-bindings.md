# Checking if Data Exists Using Prisma Bindings
* Comes with handy utility functions thata makes is easy to determine if there is a record of a given type
* Example
    - We can check if a given user/post/comment exists
    - Practicality
        + We recently used `createPostForUser` in prisma.js, we create a post for this user

```
const createPostForUser = async (authorId, data) => {
  // MORE CODE
};
```

* But we never first check if the user exists
* We also do the same thing with `updatePostForUser`
    - We just assume postId exists and we blindly try to update it

```
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
};

```

## First let's check if a given comment exists
* Just like prisma.query and prisma.mutation we have prisma.exists
* We have one method for every single type and the method name is the type name
    - So if I want to check if a user exists I use: `prisma.exists.User`
    - If I want to check if a post exists I use: `prisma.exists.Post`
    - If I want to check if a comment exists I use: `prisma.exists.Comment`

### What does exists expect?
* Now we need to pass to exists everything that exists expects
    - The arguments for exists are different than prisma.query and prisma.mutation

```
prisma.exists.Comment({
    // takes a single argument - object
    // we provide all the properties we want to verify about the comment we want to verify
    })
```

* I want to verify that a comment exists with a given `id`

```
prisma.exists.Comment({
    id: "thisisabadid"
}).then(exists => {
    console.log(exists);
});
```

* Check the Terminal and you should see `false` which is what we expect because the `id` for a comment in our DB doesn't exist

### Check for a comment that actually exists
* You will get `true` in the Terminal
* You can add as much criteria as you need

```
prisma.exists.Comment({
    id: "thisisabadid",
    text: "yeah, yeah, yeah"
}).then(exists => {
    console.log(exists);
});
```

* Most commonly you just provide the `id` of the record you are looking for

#### You can provided associated assertions
```
prisma.exists.Comment({
    id: "thisisabadid",
    author: {
        id: "cjx0117l300fd0859mgo0ra9o"
    }
}).then(exists => {
    console.log(exists);
});
```

## Integrate exists into our code
* We will verify that our user exists

```
// MORE CODE

const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({
    id: authorId,
  });

  if (!userExists) {
    throw new Error('User not found');
  }

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
  title: 'Jaws 17',
  body: 'False Teeth',
  published: true,
})
  .then(user => {
    console.log(JSON.stringify(user, undefined, 2));
  })
  .catch(error => {
    console.log(error);
  });

// MORE CODE
```

* View Terminal
* You will see new Post created for the user
* But if you change the authorId to a bogus id, you will see the error appear in the Terminal

```
Error: User not found
    at _callee$ (/Users/dev/graphql-stuff/032e-graphql-prisma/src/prisma.js:16:11)
    at tryCatch (/
...
```

* Make our error message easier to read

```
// MORE CODE

createPostForUser('abcd', {
  title: 'Jaws 17',
  body: 'False Teeth',
  published: true,
})
  .then(user => {
    console.log(JSON.stringify(user, undefined, 2));
  })
  .catch(error => {
    console.log(error.message);
  });

  // MORE CODE
```

* Simplified error message

`User not found`

* Notice that the bottom part of our code is now redundant

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

// MORE CODE
```

* Now that we have `exists` in place we can simplify our code

```
// MORE CODE

const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({
    id: authorId,
  });

  if (!userExists) {
    throw new Error('User not found');
  }

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
    '{ author {  name email posts { id title published }}}'
  );
  return post;
};

createPostForUser('cjx00qd8l008a0859zfb31bhw', {
  title: 'Jaws 17',
  body: 'False Teeth',
  published: true,
})
  .then(user => {
    console.log(JSON.stringify(user, undefined, 2));
  })
  .catch(error => {
    console.log(error.message);
  });

// MORE CODE
```


