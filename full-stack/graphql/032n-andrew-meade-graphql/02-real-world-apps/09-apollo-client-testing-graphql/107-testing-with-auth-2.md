# Testing with Authentication (Part 2)
* Write more tests that require authentication
    - updatePost
    - createPost
    - deletePost

## updatePost
* We'll use our post #1
* We'll turn it from published to unpublished 
    - To accomplish that we need the id of that post and it is not a hard coded value (remember - that post one code runs before every test case, it generates a new post, that means there is a unique id)
        + Similar to what we did with user we need to store this info somewhere so we can use it

`post.test.js`

```
// MORE CODE

test('Should be able to update own post', async () => {
  //
});

// MORE CODE
```

* We pass in the jwt to authenticate user

### set up the operation
* Will be the updatePost mutation

```
// MORE CODE

test('Should be able to update own post', async () => {
  client = getClient(userOne.jwt);

  const updatePost = gql`
    mutation {
        // which post?
    }
  `;
});
```

* Which post will we update?
    - We have 2 post (one published, one not published (draft))

`seedDatabase.js`

```
// MORE CODE

  // Create post one
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });

  // Create post two
  await prisma.mutation.createPost({
    data: {
      title: 'Post 2 Test',
      body: 'This is our second test post',
      published: false,
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });

// MORE CODE
```

* We will use post one and turn it from being `published` to being `unpublished`

`seedDatabase.js`

```
// MORE CODE

  // Create post one
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });

// MORE CODE
```

* But in order to change the published state I need to know the `id` of that post
    - But here is the problem - It is not a hard coded value that we can type in
    - This post one code runs before every test case, it generates a new post, which means there is a new `id`
    - Just like with our user, we need to store this information somewhere and export it so our test file can access it

## Set up a new variable for our post
```
// MORE CODE

const postOne = {
  input: {
    ???
  },
  post: undefined
};

// MORE CODE
```

* We name our variable postOne
* We create an object with 2 properties
    - input
        + This will contain the input we pass to prisma
        + We could leave off the `input` as we don't need it at all but it is just good to see the input and output on the object
    - post
        + This will "eventually" contain the post information sent back from prisma (we initialize this value as `undefined`
* We cut the title, post and body from post one

```
// MORE CODE

  // Create post one
  postOne.post = await prisma.mutation.createPost({
    data: {
      title: 'Post 1 Test',
      body: 'This is our first test post',
      published: true
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });

// MORE CODE
```

* Cut them

```
// MORE CODE

  // Create post one
  postOne.post = await prisma.mutation.createPost({
    data: {
      // cut title, post and body
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });

// MORE CODE
```

* We leave author in place as we won't know the author `id` in time to include that above
* We paste our title, post and body object inside `postOne` like this:

```
// MORE CODE

const postOne = {
  input: {
    title: 'Post 1 Test',
    body: 'This is our first test post',
    published: true,
  },
  post: undefined,
};

// MORE CODE
```

* Use the ES6 spread operator to take the input and spread it out inside post one like this:

```
// MORE CODE

  // Create post one
  await prisma.mutation.createPost({
    data: {
      ...postOne.input, // use spread operator here
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });

// MORE CODE
```

* Now we need to make sure that postOne.post gets set
    - **note** Remember that is is currently `undefined`

```
// MORE CODE

const postOne = {

  // MORE CODE

  post: undefined,
};

// MORE CODE
```

* Here is how we set it

```
// MORE CODE

  // Create post one
  postOne.post = await prisma.mutation.createPost({ // postOne.post gets set
    data: {
      ...postOne.input, // use spread opererator here
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });

// MORE CODE
```

* Export post one (so other test files can use it)

`seedDatabase.js`

```
// MORE CODE
export { seedDatabase as default, userOne, postOne };
```

* Now our test cases will be able to access `postOne.intput` should they need it
* And also access `postOne.output` should they need it

## Import postOne (so we can use it)
`post.test.js`

```
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import seedDatabase, { userOne, postOne } from './utils/seedDatabase';

// MORE CODE
```

* Now we can use `postOne` down below while defining our operation

```
// MORE CODE

test('Should be able to update own post', async () => {
  client = getClient(userOne.jwt);

  const updatePost = gql`
    mutation {
      updatePost(
        //
      ) {
        // Selection set
      }
    }
  `;

// MORE CODE
```

* Let's provide our selection set

```
// MORE CODE

test('Should be able to update own post', async () => {
  client = getClient(userOne.jwt);

  const updatePost = gql`
    mutation {
      updatePost(
        //
      ) {
        id
        title
        body
        published
      }
    }
  `;

// MORE CODE
```

* For the arguments we need to start by providing the `id` (which is a string)
    - This will be the `id` of the post to update
    - We will use JavaScript string interpolation to inject `postOne.post.id`

`post.test.js`

```
// MORE CODE

test('Should be able to update own post', async () => {
  client = getClient(userOne.jwt);

  const updatePost = gql`
    mutation {
      updatePost(
        id: "${postOne.post.id}"
        data: {
          published: false
        }
      ) {
        id
        title
        body
        published
      }
    }
  `;

// MORE CODE
```

* We are grabbing the id off of postOne.post 

`seedDatabase.js`

```
// MORE CODE

const postOne = {
  input: {
    title: 'Post 1 Test',
    body: 'This is our first test post',
    published: true,
  },
  post: undefined,
};

// MORE CODE
```

* Which gets sets down below (so we have the `response` data from prisma)

`seedDatabase.js`

```
// MORE CODE

  // Create post one
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });

// MORE CODE
```

## Now we can define `data`
`post.test.js`

* We need to convert published from `true` to `false`

```
// MORE CODE

test('Should be able to update own post', async () => {
  client = getClient(userOne.jwt);

  const updatePost = gql`
    mutation {
      updatePost(
        id: "${postOne.post.id}"
        data: {
          published: false 
        }

// MORE CODE
```

## Now we want to fire this operation off
* And we want to assert something about what happens when the operation is complete

```
// MORE CODE
  const { data } = await client.mutate({
    mutation: updatePost,
  });
  console.log(data.updatePost);
});
```

* At this point the operation should have succeeded and we can set up our assertions
    - There is no need to assert that the operation didn't throw an error
        + otherwise the test case would already fail with the code we have in place
            * Because client.mutate() would throw an error
    -  There is also no need to assert that we got back the 4 fields since the GraphQL operation would fail if we requested a field that the type didn't support
    -  We can assert something about a particular value... the published value
        +  We want to assert that the value is `false`
        +  I log out the value `data.updatePost` to help writing my assertion

```
{ id: 'cjxuxs2ow05fu07593ao44tak',
        title: 'Post 1 Test',
        body: 'This is our first test post',
        published: false,
        __typename: 'Post' }
```

* Here is the finished code that should pass all 8 tests (2 Test Suites)

```
// MORE CODE
test('Should be able to update own post', async () => {
  client = getClient(userOne.jwt);

  const updatePost = gql`
    mutation {
      updatePost(
        id: "${postOne.post.id}"
        data: {
          published: false
        }
      ) {
        id
        title
        body
        published
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: updatePost,
  });

  expect(data.updatePost.published).toBe(false);
});
```

* We also want to check to see in the Database that the post is unpublished
    - Sure we are getting `false` back in the `response` but what about in the prisma Database itself?
    - We need to import `prisma` (like we did in the user.test.js file)
        + This lets us take advantage of prisma in our test cases

```
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import seedDatabase, { userOne, postOne } from './utils/seedDatabase';
import getClient from './utils/getClient';
import prisma from '../src/prisma'; // add this line

// MORE CODE
```

* We will use the `exists` functionality to check that the post exists and that the published value is false
    - **note** You could alternatively query for the post and look at its data directly
    - Either approach is acceptable
* We look for a post with 2 features
    1. It's `id` should be `postOne.post.id`
    2. It's published value should be `false`
        - It it's published value is not false that published value won't be seen as existing (and we'll get `false` back instead of `true`)

```
// MORE CODE
    const exists = await prisma.exists.Post({
        id: postOne.post.id,
        published: false,
    });

  expect(data.updatePost.published).toBe(false);
  expect(exists).toBe(true);
});
```

* So here we are looking at the response and the Database itself
* Now we have 8 passing tests

## Challenge - Goal: Write a test for `createPost` and `deletePost`
1. Write a test for `createPost`
    - Use authentication, assert that post exists in Database with correct field values
2. Write a test for `deletePost`
    - Use authentication, assert that second post is deleted from Database

### Challenge Solution
`seedDatabase.js`

```
// MORE CODE

const postTwo = {
  input: {
    title: 'Post 2 Test',
    body: 'This is our second test post',
    published: false,
  },
  post: undefined,
};

const seedDatabase = async () => {
  // Delete test data
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();

  // Create user one
  // MORE CODE

  // MORE CODE

  // Create post two
  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });
};

export { seedDatabase as default, userOne, postOne, postTwo };
```

`post.test.js`

```
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import seedDatabase, { userOne, postOne, postTwo } from './utils/seedDatabase';

// MORE CODE

test('Should be able to create a post', async () => {
  client = getClient(userOne.jwt);

  const createPost = gql`
    mutation {
      createPost(
        data: {
          title: "Create Post"
          body: "Just Created a post"
          published: false
        }
      ) {
        id
        title
        body
        published
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: createPost,
  });

  expect(data.createPost.title).toBe('Create Post');
  expect(data.createPost.body).toBe('Just Created a post');
  expect(data.createPost.published).toBe(false);
  //
});

test('Should be able to delete a post', async () => {
  client = getClient(userOne.jwt);

  const deletePost = gql`
    mutation {
      deletePost(
        id: "${postTwo.post.id}"
      ) {
        id
        title
        body
        published
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: deletePost,
  });
  const exists = await prisma.exists.Post({
    id: postTwo.post.id,
  });

  expect(exists).toBe(false);
});
```

* You should now have 10 more passing tests

## Next - Comments
