# Expecting GraphQL Operations to Fail
* All our tests so far we "expected" to succeed

## What about test cases that are supposed to fail?

## First test to expect to fail - login
* When you login with bad credentials it fails
* We want to check that an error is thown

```
// MORE CODE

test('Should not login with bad credentials', () => {
  // 
})

// MORE CODE
```

### expect() .toThrow(error?)
* This will make sure that some sort of code throws an error
    - So if it throws an error the test is considered a success
    - If it doesn't throw an error the test is considered a failure
* Example

```
test('throws on octopus', () => {
  expect(() => {
    drinkFlavor('octopus');
  }).toThrow();
});
```

## Let's use `toThrow` in our test
```
// MORE CODE

test('Should not login with bad credentials', async () => {
  expect(() => {
   // 
  }).toThrow();
});
```

* If we run the above code we will get a failure because an error was not thrown

![no error thown](https://i.imgur.com/yUezgEG.png)

```
// MORE CODE
test('Should not login with bad credentials', async () => {
  expect(() => {
    throw new Error('I threw an error to pass this test');
  }).toThrow();
});
```

* Now the test passes because I threw an error that it expected to be thrown

`user.test.js`

```
// MORE CODE
test('Should not login with bad credentials', async () => {
  const login = gql`
    mutation {
      login(data: { email: "bad@bad.com", password: "badpassword" }) {
        token
      }
    }
  `;

client.mutate({ mutation: login })

  expect(() => {
    throw new Error('Unable to login');
  }).toThrow();
});
```

* Now we want to make sure this code `expect(client.mutate({ mutation: login }))` throws an error. How can we do that?
* We need to use expect()
    - We need to pass to expect() our Promise
    - Before when we were using regular syncronous code we passed in a standard function

```
// MORE CODE

  expect(() => {
    throw new Error('Unable to login');
  }).toThrow();

// MORE CODE
```

* When we are working with Promises we take that Promise and we pass that in like this:

```
// MORE CODE
test('Should not login with bad credentials', async () => {
  const login = gql`
    mutation {
      login(data: { email: "bad@bad.com", password: "badpassword" }) {
        token
      }
    }
  `;

  expect(client.mutate({ mutation: login }));

  expect(() => {
    throw new Error('Unable to login');
  }).toThrow();
});
```

* Now we need to use a new property that we haven't talked about yet
* In Jest Docs there are 2 properties that allow us to work with Promises in Jest (which is what we are doing here)
    - .resolves
    - .rejects
* Example:

```
test('resolves to lemon', () => {
  // make sure to add a return statement
  return expect(Promise.resolve('lemon')).resolves.toBe('lemon');
});

```

* They have a assertion. They have a Promise that immediately resolves the string "lemon"
    - Then then use the resolves property to immediately extract that value off that Promise and then make an assertion about what it is

## Same thing (but opposite direction) with .rejects
```
test('rejects to octopus', () => {
  // make sure to add a return statement
  return expect(Promise.reject(new Error('octopus'))).rejects.toThrow(
    'octopus',
  );
});
```

* Here we can use the `rejects` property on an expect call where a Promise has been passed in and we can make sure that it throws an error by chaining on a call to `toThrow()`
    - In the above example they are making an assertion about the explicit error 'octopus' by passing that in (but that's not necessary as we can leave that off and just ensure that an error indeed was thrown)

## Let's try it out in our code
* In the past we would have attached `.toThrow()` on like this:

```
// MORE CODE

  expect(client.mutate({ mutation: login })).toThrow();

// MORE CODE
```

* But instead we will start with `rejects` since we are working with a Promise (we are indeed passing a Promise in, we have to use `rejects`) then we can use `.toThrow()`

```
// MORE CODE

  expect(client.mutate({ mutation: login })).rejects.toThrow();

// MORE CODE
```

* It is important to remember that this is all an asyncronous operation
    - The testing suite has to communicate with our GraphQL app
    - Which has to communicate with the Database
    - That take time
    - It is not syncronous
    - We have to make sure that we actually wait for the operation to complete
    - So we put `await` up front

```
// MORE CODE

await expect(client.mutate({ mutation: login })).rejects.toThrow();

// MORE CODE
```

* This is what our finished test case looks like:

```
// MORE CODE
test('Should not login with bad credentials', async () => {
  const login = gql`
    mutation {
      login(data: { email: "bad@bad.com", password: "badpassword" }) {
        token
      }
    }
  `;

  await expect(client.mutate({ mutation: login })).rejects.toThrow();
});
```

* You could do this to make it easier to read

```
// MORE CODE
  await expect(
    client.mutate({ mutation: login })
  ).rejects.toThrow();
});
```

* Check the test - you will see we now have 4 passing test cases
* The last test means that our code did indeed throw an error

## What if we entered "good" credentials?
```
// MORE CODE
test('Should not login with bad credentials', async () => {
  const login = gql`
    mutation {
      # login(data: { email: "bad@bad.com", password: "badpassword" }) {
      login(data: { email: "john@acme.com", password: "123Password!" }) {
        token
      }
    }
  `;

  await expect(client.mutate({ mutation: login })).rejects.toThrow();
});
```

* And this time we get a failed test with:

![failed login test](https://i.imgur.com/EEzEwjc.png)

* We see the reason the test failed is `Received promise resolved instead of rejected`
* And we also get the resolved to value (which is our data with the token (since we asked for it in our GraphQL selection))

## Review
* We can assert that a Promise throws an error by passing that Promise to expect()
    - We then use rejects.toThrow(), tossing await up front, waiting for the operation to complete

## Challenge - Goal: Test that you can't signup with a short password
1. Create the test case
2. Setup the createUser mutation operation
3. Fire off the mutation and expect the promise to throw error
4. Test your work

### Challenge - Solution
```
// MORE CODE
test('Should not sign up user with invalid password', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: { name: "John", email: "john@acme.com", password: "123" }
      ) {
        token
      }
    }
  `;

  await expect(client.mutate({ mutation: createUser })).rejects.toThrow();
});
```

* You can't use bcrypt because the validation checks the length before it hashes it, so I just pass in a static value < 8 characters
* An error will be thrown (the promise rejects and we grab that value and append `.toThrow()` to the end)

## Next
* Test subscriptions
* Test operations that require authentication
