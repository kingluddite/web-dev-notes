# Seeding the Database with Test Data
* Extract all operations into single file for post

`post.test.js`

```
import 'cross-fetch/polyfill';
import getClient from './utils/getClient';
import prisma from '../src/prisma';
import {
  getPosts,
  getMyPosts,
  updatePost,
  createPost,
  deletePost,
} from './utils/post-operations';
import seedDatabase, { userOne, postOne, postTwo } from './utils/seedDatabase';

let client = getClient();

beforeEach(seedDatabase);

test('Should expose published posts', async () => {
  const response = await client.query({
    query: getPosts,
  });

  expect(response.data.posts).toHaveLength(1);
  expect(response.data.posts[0].published).toBe(true);
});

test('Should fetch all my posts', async () => {
  client = getClient(userOne.jwt);

  const { data } = await client.query({
    query: getMyPosts,
  });

  expect(data.myPosts.length).toBe(2);
});

test('Should be able to update own post', async () => {
  client = getClient(userOne.jwt);

  const variables = {
    id: `${postOne.post.id}`,
    data: {
      published: false,
    },
  };

  const { data } = await client.mutate({
    mutation: updatePost,
    variables,
  });

  const exists = await prisma.exists.Post({
    id: postOne.post.id,
    published: false,
  });

  expect(data.updatePost.published).toBe(false);
  expect(exists).toBe(true);
});

test('Should be able to create a post', async () => {
  client = getClient(userOne.jwt);
  const variables = {
    data: {
      title: 'Create Post',
      body: 'Just Created a post',
      published: false,
    },
  };

  const { data } = await client.mutate({
    mutation: createPost,
    variables,
  });

  expect(data.createPost.title).toBe('Create Post');
  expect(data.createPost.body).toBe('Just Created a post');
  expect(data.createPost.published).toBe(false);
});

test('Should be able to delete a post', async () => {
  client = getClient(userOne.jwt);

  const variables = {
    id: `${postTwo.post.id}`,
  };

  const { data } = await client.mutate({
    mutation: deletePost,
    variables,
  });
  const exists = await prisma.exists.Post({
    id: postTwo.post.id,
  });

  expect(exists).toBe(false);
});

```

* **note** Had issues putting operations in subfolder named `post-operations.js` and `user-operations.js`

## Houston we have a problem!
* We don't use template strings for our `id`, like we did in the operation, now, since it is a pure JavaScript object, we just plop in the variable
* Change this:

```
// MORE CODE

test('Should be able to update own post', async () => {
  client = getClient(userOne.jwt);

  const variables = {
    id: `${postOne.post.id}`,
    data: {
      published: false,
    },
  };

// MORE CODE
```

* To this:

```
// MORE CODE

test('Should be able to update own post', async () => {
  client = getClient(userOne.jwt);

  const variables = {
    id: postOne.post.id,
    data: {
      published: false,
    },
  };

// MORE CODE
```

* And change this:

```
// MORE CODE

test('Should be able to delete a post', async () => {
  client = getClient(userOne.jwt);

  const variables = {
    id: `${postTwo.post.id}`,
  };

// MORE CODE
```

* To this:

```
// MORE CODE

test('Should be able to delete a post', async () => {
  client = getClient(userOne.jwt);

  const variables = {
    id: postTwo.post.id,
  };

// MORE CODE
```
`post-operations.js`

```
import { gql } from 'apollo-boost';
import seedDatabase, { userOne, postOne, postTwo } from './seedDatabase';

const getPosts = gql`
  query {
    posts {
      id
      title
      body
      published
    }
  }
`;

const getMyPosts = gql`
  query {
    myPosts {
      id
      title
      body
      published
    }
  }
`;

const updatePost = gql`
    mutation($id: ID!, $data:UpdatePostInput) {
      updatePost(
        id: $id
        data: $data
      ) {
        id
        title
        body
        published
      }
    }
  `;

const createPost = gql`
  mutation($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      title
      body
      published
    }
  }
`;

const deletePost = gql`
    mutation($id:ID) {
      deletePost(
        id: $id 
      ) {
        id
        title
        body
        published
      }
    }
  `;

export { getPosts, getMyPosts, updatePost, createPost, deletePost };
```

`user-operations.js`

```
import { gql } from 'apollo-boost';

const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const login = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
    }
  }
`;

const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

export { createUser, getUsers, login, getProfile };

```

* Troubleshoot - Make sure to run all tests if you are getting an error and you are positive your code it right
    - It one case for updatePost, I had to delete the variables passed to the `client.mutate()` method and then bring it back to get the test to pass

## Next
* Testing comments and subscriptions
