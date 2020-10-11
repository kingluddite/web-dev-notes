# Testing Asynchronous Code
## Jest can watch!
* Instead of having to keep re-running our jest test suites we can have it watch and retest when:
    - Our test case code changes
    - Or the code that's being test changes

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "NODE_ENV=production node server",
    "dev": "nodemon server",
    "test": "jest --watch"
  },

// MORE CODE
```

* That's it! Jest will now watch and restart when our code changes
* Now we have a list of options when we are in this "watch" mode

```
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

## Here are all the CLI jest options (similar to --watch)
* [jest CLI options docs](https://jestjs.io/docs/en/cli)

```
test('Async test demo', () => {
  expect(2).toBe(1)
})
```

* Above code will obviously fail
* But if we bring in setTimeout to simulate time to help test async code

```
test('Async test demo', () => {
  setTimeout(() => {
    expect(2).toBe(1)
  }, 2000)
})
```

## Houston we have a problem!
* Why does our code now pass?
* Jest didn't know we were running async code
    - So it ran our code immediately and there were no errors (because it didn't wait the 2 seconds to see the error)
    - You can see the entire test suite took a half second so that let's you know it did not wait the necessary 2 seconds

### Tell jest the code is asynchronous
* Just add a `done` parameter
* When we provide `done` as a parameter Jest sees that and it won't consider this test case a success or failure until `done` is called

```
test('Async test demo', (done) => {
  setTimeout(() => {
    expect(2).toBe(1)
    done()
  }, 2000)
})
```

* Now we get the error we expected

## Now let's talk about test as it pertains to Promises and awaits
```
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject('Numbers must be non-negaitve')
      }

      resolve(a + b)
    }, 2000)
  })
}
```

* And our test

```
test('Should add two numbers', (done) => {
  add(2, 3).then(sum => {
    expect(sum).toBe(5)
    done()
  })
})
```

* **note** Make sure you call done with `done()`
    - If you forget the parentheses done won't get called and jest will time out

## Now test Jest with async/await
* Remember that `async` functions ALWAYS, ALWAYS, ALWAYS return a Promise!
* When your function returns a Promise, Jest will see that and it will wait for the Promise to be fulfilled or rejected before figuring out if the test case should be considered a success or a failure

### This is the alternate syntax to what we did with `done`
* More common to use this syntax because it is less typing
    - Less nested callbacks
    - Easier to read code

```
test('Should add two numbers', async () => {
  const sum = await add(11, 33);
  expect(sum).toBe(44);
});
```


