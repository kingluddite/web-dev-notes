# Testing Queries
* For now we'll ignore authentication and just focus on queryies that don't need it

## users and posts queries
* For now all our tests will be in one file
* As we add more tests we'll add more test suites
* We'll use `async` for all these tests as we'll almost always be doing something asncyronous

```
// MORE CODE

test('Should expose public author profiles', async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `;

  const response = await client.query({
    query: getUsers,
  });

});

// MORE CODE
```

### We'll make 2 assertions about what comes back:

1. I'll assert that the array 'users' has just a single item (we'll assert that it's length is 1)
2. I'll also assert that the individual user email property is equal to `null`

`user.test.js`

```
// MORE CODE

test('Should expose public author profiles', async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `;

  const response = await client.query({
    query: getUsers,
  });

  expect(response.data.users).toHaveLength(1);
  // console.log(response.data.users[0].email);
  expect(response.data.users[0].email).toBeNull();
  expect(response.data.users[0].name).toBe('John');
});

// MORE CODE
```

## Challenge - Goal: Write a test for the "posts" query
1. Create the test case
2. Fire off a posts query getting all scalar fields for each post
3. Assert a single post is returned and that it's published
4. Run the test suite to test your work

### Challenge Solution
```
// MORE CODE
test('Should expose published posts', async () => {
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

  const response = await client.query({
    query: getPosts,
  });

  expect(response.data.posts).toHaveLength(1);
  expect(response.data.posts[0].published).toBe(true);
  // console.log(response.data.posts[0]);
});
```

* Should have 3 passing tests

![3 passing tests](https://i.imgur.com/9bJDFTp.png)

## Next
* How do we expect that a certain operation fails?
    - If I login without credentials that should fail
    - If I signup with a password that is too short that should fail
