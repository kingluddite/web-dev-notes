# Advanced Promises
```js
const somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Yo. It worked!');
    reject('Unable to fulfill promise');
  }, 2500);
});

somePromise.then((message) => {
  console.log('Success: ', message);
}, (errorMessage) => {
  console.log('Error: ', errorMessage);
});
```

## Houston we have a problem
* The above code doesn't take any input
* We'll need to provide:
    - The id of a user to fetch from a database
    - A url to request
    - Or a partial URL, ie - just the address component

## The Happy Path
* 
