# Advanced Promises
```js
const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1500);
  })
};

asyncAdd(15, 10).then((res) => {
  console.log('Result is: ', res);
}, (errorMessage) => {
  console.log(errorMessage);
});
```

`$ nodemon playground/promise.js`

## Good Work!
* We created that function that takes dynamic input but still returns a Promise
* We've taken an async function that usually requires callbacks and we wrapped it to use Promises
    - This is a handy feature
    - As we use Promises in Node.js you will find out some things DO NOT support Promises and you'd like them to

## Example
* The `request` npm Library we used to send `http` request DOES NOT support Promises natively but you can wrap your request call inside of a Promise (we'll do this later)

## Promise Chaining
* The idea of having multiple promises run in a sequence
    - example
        + Take an address, then convert it into coordinates and then take those coordinates and convert them into weather information
        + We can do this easily using Promise chaining
        + To do this you just need to return a new Promise inside your `success` call

```js
const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1500);
  })
};

asyncAdd(15, 10).then((res) => {
  console.log('Result is: ', res);
  return asyncAdd(res, 33);
}, (errorMessage) => {
  console.log(errorMessage);
}).then((res) => {
  console.log('Should be 58', res);
}, (errorMessage) => {
  console.log(errorMessage);
});
```

* Will be 58

```js
const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1500);
  })
};

asyncAdd(15, 10).then((res) => {
  console.log('Result is: ', res);
  return asyncAdd(res, '33');
}, (errorMessage) => {
  console.log(errorMessage);
}).then((res) => {
  console.log('Should be 58', res);
}, (errorMessage) => {
  console.log(errorMessage);
});
```

* Will say Arguments should be numbers

## Houston we have a problem
* We can have issues with errors
* This happens when things get rejected earlier on in the Promise chain

```js
const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1500);
  })
};

asyncAdd(15, '10').then((res) => {
  console.log('Result is: ', res);
  return asyncAdd(res, '33');
}, (errorMessage) => {
  console.log(errorMessage);
}).then((res) => {
  console.log('Should be 58', res);
}, (errorMessage) => {
  console.log(errorMessage);
});
```

* But now we get `Should be undefined`

## .catch()
Similar to .then() but it just takes one function and this is the error handler and this is how we just specify one error handler if any of our Promise calls fail

```js
const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1500);
  })
};

asyncAdd(15, '10').then((res) => {
  console.log('Result is: ', res);
  return asyncAdd(res, 33);
}).then((res) => {
  console.log('Should be 58', res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});
```

## Challenge
* Wrap request inside a Promise

`promises-2.js`

```js
const request = require('request');

const geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google servers.');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address.');
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
};

geocodeAddress('90254').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
```

`$ nodemon playground/promise-2.js`

* Output

```
{
  "address": "Hermosa Beach, CA 90254, USA",
  "latitude": 33.8600693,
  "longitude": -118.3987842
}
```

* Output if you change the zip to a bad number

```
// more code
geocodeAddress('a1333bd').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
```

`$ nodemon playground/promise-2.js`

* Output

`Unable to find that address.`

### Example of how to handle Libraries that do not support Promises and wrap it in a Promise creating a `Promise ready function` and in our case we created the `geocodeAddress` function

## Axios
* Axios is a 3rd party library that does support Promises
* So we won't need to wrap our function calls inside of a Promise
* This will enable us to simplify our code creating our Promise calls very easily

## Next - Rebuild the Weather App using Axios

