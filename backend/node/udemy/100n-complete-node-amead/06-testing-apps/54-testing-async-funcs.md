# Testing Async Funcs
* We'll make a fake async to test this out
* Similar to assertions testing

```js
module.exports.asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 1000);
};
```

* The test

```js
it('should async add two numbers', () => {
  utils.asyncAdd(4, 3, (sum) => {
    expect(sum).toBe(7);
  });
});
```

* That passes but if you change the number from 7 to 10 it will still work
* The reason is the aync code never runs
* We need a way of waiting the 1 second and then running the code

## done
* To test async code padd `done` as the callback

```js
it('should async add two numbers', (done) => {
  utils.asyncAdd(4, 3, (sum) => {
    expect(sum).toBe(7);
  });
});
```

* `done` lets mocha know you have an async test and it won't finish processing the test until `done` gets called
* If we ran it now we'd get an error
* We need to call `done()` like this:

```js
it('should async add two numbers', (done) => {
  utils.asyncAdd(4, 3, (sum) => {
    expect(sum).toBe(7);
    done();
  });
});
```

* Now the test will pass
* You'll see the async takes extra time

![async takes longer](https://i.imgur.com/Pqewhju.png)

* After the assertions we call `done`
* This tells mocha we are done
* That time of 1 second is in red because nothing in node should take that long to run and mocha is letting us know there must be an error in my code
* But in our case it is on purpose to wait a second with setTimeout()

## challenge
* Add async code to your square code
* Have it wait a second

### Troubleshoot (mocha cuts off your test)
* If you see this error `Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.`
* It means you forgot to call your callback or you forgot add the `done()` call to your test code

## Conclusion
* We now have a way to test sync and async functions
