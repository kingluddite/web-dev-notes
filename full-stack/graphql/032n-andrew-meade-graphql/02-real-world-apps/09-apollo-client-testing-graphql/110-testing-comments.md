# Testing Comments
## Challenges
1. Set up the necessary seed data
2. Write the test cases

### Set up the necessary seed data
* Goal: Setup some test comment data

1. Create a second user
2. Create a comment on the published post by the second user
3. Create a comment on the published post by the first user
4. Export userTwo, commentOne, commentTwo and look at the Database to check your work

## Troubleshoot
* There is a problem with async and a time delay so I use this line:

`seedDatabase.js`

```
// MORE CODE

const seedDatabase = async () => {
  jest.setTimeout(10000);
  // Delete test data
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();

// MORE CODE
```

* Delete all comments before each test suite

```
// MORE CODE

const seedDatabase = async () => {
  jest.setTimeout(10000);
  // Delete test data
  await prisma.mutation.deleteManyComments();

// MORE CODE
```

* Create another user

```
// MORE CODE

const userTwo = {
  input: {
    name: 'Jane',
    email: 'jane@acme.com',
    password: bcryptjs.hashSync('PassForJane'),
  },
  user: undefined,
  jwt: undefined,
};

// MORE CODE
```

* Create 2 comments

```
// MORE CODE

const commentTwo = {
  input: {
    text: 'This is Comment 2 on Post 1',
  },
  comment: undefined,
};

const postTwo = {
  input: {
    title: 'Post 2 Test',
    body: 'This is our second test post',
    published: false,
  },
  comment: undefined,
  post: undefined,
};

// MORE CODE
```

* Create two comments on postOne

```
// MORE CODE

  // Create comment one
  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      author: {
        connect: {
          id: userTwo.user.id,
        },
      },
      post: {
        connect: {
          id: postOne.post.id,
        },
      },
    },
  });

  // Create comment two
  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
      post: {
        connect: {
          id: postOne.post.id,
        },
      },
    },
  });

// MORE CODE
```

* Export userTwo, commentOne and commentTwo

```
// MORE CODE

export {
  seedDatabase as default,
  userOne,
  userTwo,
  postOne,
  postTwo,
  commentOne,
  commentTwo,
};

// MORE CODE
```

* Check the Database for 2 comments

![2 comments in Database](https://i.imgur.com/k65q5yi.png)
* Now that we have 2 users we need to update this test

`user.test.js`

* The users length needs to be updated from a length of 1 to 1

```
// MORE CODE

test('Should expose public author profiles', async () => {
  const response = await client.query({
    query: getUsers,
  });

  expect(response.data.users).toHaveLength(2);

// MORE CODE
```

### REMINDER
* Is Docker running?
* Is pgAdmin running?
* Is your test suite running?

## Challenge: Goal: Write a couple of test cases for comments
1. `"Should delete own comment"`
  * We are going to authenticate as one of our own `users` and delete their comment
  * Then we will assert that it was indeed removed
2. `"Should not delete other users comment"`
  * We are going to authenticate as one of the users and try to delete the other user's comment
  * Then I would expect it to throw an error, so I would use the `toThrow` functionality to make sure that the request fails
  * **tips** Remember to get the necessary imports that this file requires
    - And when you define your operations for deleting a comment make sure to add that in the `operations.js` file (or in the `comment-operations.js` file you can create to match the others (`user-operations.js` and `post-operations.js`))
3. Test Your work

* Now use the comments created in last Challenge to write a couple of test cases
  - This will happen in a new test suite
  - `$ mkdir tests/comment.test.js`
  - * **note** As soon as you create this file (if you have the tests running) You will see one failed test (empty test files are a failing test)

### Solution: All in one file
`comment.test.js`

```
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import getClient from './utils/getClient';
import prisma from '../src/prisma';
import seedDatabase, {
  userOne,
  postOne,
  postTwo,
  commentOne,
  commentTwo,
} from './utils/seedDatabase';

let client = getClient();

beforeEach(seedDatabase);

test('Should delete own comment', async () => {
  client = getClient(userOne.jwt);

  const variables = {
    id: commentTwo.comment.id,
  };

  const deleteComment = gql`
    mutation($id: ID!) {
      deleteComment(id: $id) {
        id
      }
    }
  `;

  const { id } = await client.mutate({
    mutation: deleteComment,
    variables,
  });
});

test("Should not delete other user's comment", async () => {
  client = getClient(userOne.jwt);

  const variables = {
    id: commentOne.comment.id,
  };

  const deleteComment = gql`
    mutation($id: ID!) {
      deleteComment(id: $id) {
id
      }
    }
  `;

  await expect(
    client.mutate({
      mutation: deleteComment,
      variables,
    })
  ).rejects.toThrow();
});

```

* Now extract all the comment operations into a new file `tests/utils/comment-operations.js`

* I had to rename function to avoid collision

`comment-operations.js`

```
import { gql } from 'apollo-boost';

const canDeleteOwnComment = gql`
  mutation($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

const canNotDeleteOtherUserComment = gql`
  mutation($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;
export { canDeleteOwnComment, canNotDeleteOtherUserComment };
```

* Import new operations into `comment.test.js`

`comment.test.js`

```
// MORE CODE

import {
  canDeleteOwnComment,
  canNotDeleteOtherUserComment,
} from './utils/comment-operations';

let client = getClient();

// MORE CODE
```

## Next - Test Subscriptions


