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

## Challenge
* 9:00 start 

