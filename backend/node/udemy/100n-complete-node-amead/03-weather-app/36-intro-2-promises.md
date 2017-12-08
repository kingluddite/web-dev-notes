# Intro to ES6 Promises
* Invented to solve problem in code when you have a lot of async apps
* Make fetching data from database easier
* Make fetching data from URL easier

`promise.js`

```js
const somePromise = new Promise((resolve, reject) => {

});
```

* Goes out and makes a promise
* If all goes well, it is resolved
* It not, it is rejected
    - Promises have two states
        + 1. fullfilled
        + 2. rejected
* You can only pass one argument to `resolve` and `reject`
* If you want to pass multiple pieces pass `resolve` or `reject` an object that you can set multiple properties on 

## then
* Let's us pass callback function for both success cases and error cases
* This is one of the areas where callbacks differ from promises
    - In a callback we had one function that fired no matter what
    - And the arguments let us know whether or not things went well
* In Promises we have two functions and that is what determines if things went well or not
* The function in `then` will only get called if the Promise gets fulfilled

```js
const somePromise = new Promise((resolve, reject) => {
  resolve('Yo. It worked!');
});

somePromise.then((message) => {
  console.log('Success: ', message);
});
```

`$ node playground/promise.js`

### Output
`Success:  Yo. It worked!`

`$ nodemon playground/promise.js`

* No delay because we didn't do anything asynchronously

## Add a delay and make an asynchronously
```js
const somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Yo. It worked!');
  }, 2500);
});

somePromise.then((message) => {
  console.log('Success: ', message);
});
```

`$ nodemon playground/promise.js`

* We have a 2 1/2 second delay

## Reject
* If there is a problem you call reject

```js
const somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('Yo. It worked!');
    reject('Unable to fulfill promise');
  }, 2500);
});

somePromise.then((message) => {
  console.log('Success: ', message);
});
```

* We have a reject but have not handler for it so it won't run
* We get a DeprecationWarning stating we need to handle rejections or Node.js will break

## Promise that handles resolve and reject
```js
const somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('Yo. It worked!');
    reject('Unable to fulfill promise');
  }, 2500);
});

somePromise.then((message) => {
  console.log('Success: ', message);
}, (errorMessage) => {
  console.log('Error: ', errorMessage);
});
```

* This will output the reject message

## Notes
* You can only resolve or reject a promise **once**
* If you resolve and reject like this:

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

* You will never see the reject because you can only resolve or reject once and you can't do one twice
* This is an improvement to `callbacks` because there is nothing preventing us from calling the callback twice like below:

```js
const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.');
      callback(); // we call the callback twice here! BAD!!
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
```

## Pending Promise state
* Before a Promise is resolved or rejected it is in a state known as `pending`

## Settled Promise state
* A Promise is considered settled if it is resolved or rejected




