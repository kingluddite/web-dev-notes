# Converting to Promises
* We'll convert `requests.js` from callbacks to Promises

## Here are the callbacks
`requests.js`

```
const getPuzzle = (wordCount, cb) => {
  const request = new XMLHttpRequest();
  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      cb(undefined, data.puzzle);
    } else if (e.target.readyState === 4) {
      cb('An error has taken place', undefined);
    }
  });

  request.open('GET', `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
  request.send();
};

const getCountry = (countryCode, cb) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      const country = data.find(country => country.alpha2Code === countryCode);
      cb(undefined, country);
    } else if (e.target.readyState === 4) {
      cb('An error has taken place', undefined);
    }
  });

  xhr.open('GET', 'http://restcountries.eu/rest/v2/all/');
  xhr.send();
};
```

* Let's convert getPuzzle and getCountry from using the `callback pattern` to using the `Promises` pattern

## What if we need to pass arguments to our Promise
* Currently we can't
* But we did with both getPuzzle and getCountry in our callback pattern
* To be able to pass arguments we need to change our setup of our Promise

### Let's practice with our last Promise
`promises.js`

```
// Promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Promise Error');
    reject('Promise Error');
    // resolve('This is the promise data');
  }, 2000);
});

myPromise.then(
  data => {
    console.log(data);
  },
  err => {
    console.log(err);
  }
);

myPromise.then(
  data => {
    console.log(data);
  },
  err => {
    console.log(err);
  }
);
```

* Save this code to your clipboard

![new Promise code](https://i.imgur.com/HLg3auD.png)

* We will still use that but we'll use it in a slightly different way
* We'll create a similar function to `getDataCallback`

```
// MORE CODE

// Promise
const getDataPromise = () => {
    // return the new Promise here
};

const myPromise = ???

// MORE CODE
```

* We create a new function and assign it equal to a function

### Then we return our new Promise
```
// MORE CODE

// Promise
const getDataPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Promise Error');
      reject('Promise Error');
      // resolve('This is the promise data');
    }, 2000);
  });
};

// Now I am able to get my Promise by calling getDataPromise()
const myPromise = getDataPromise();

// MORE CODE
```

* Now our code will work as expected
* Now after this change we can pass in as many arguments as we want
* Example if I wanted to pass getDataPromise the number `123`

```
// MORE CODE

// Promise
const getDataPromise = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Promise Error');
      reject('Promise Error');
      // resolve('This is the promise data');
    }, 2000);
  });
};

const myPromise = getDataPromise(123);

// MORE CODE
```

## Refactoring our code further
* Since we have an arrow function that just returns one thing we can use the explicit return shortcut
* You will see this syntax often (especially with 3rd party code) so get used to seeing arrow function with implicit returns

```
// MORE CODE

const getDataPromise = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Promise Error');
      reject('Promise Error');
      // resolve('This is the promise data');
    }, 2000);
  });

// MORE CODE
```

## Test our new code
* We'll comment out our 2 rejections
* We'll comment in our resolve and pass it our data (123)

```
// MORE CODE

// Promise
const getDataPromise = data =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('Promise Error');
      // reject('Promise Error');
      resolve(`This is the promise data: ${data}`);
    }, 2000);
  });

const myPromise = getDataPromise(123);

// MORE CODE
```

`$ node promises.js`

* After 2 seconds you get:
    - your 2 callback errors
    - your 2 successful Promises with the data (123)

![Terminal with Promise data!](https://i.imgur.com/IbPlCP8.png)

## Now let's convert our callback to a Promise
* We'll work with getPuzzle

### Steps to convert a callback pattern to a Promise pattern
1. Take all code inside the callback block and cut it to the clipboard
2. The callback getPuzzle will no longer take an argument so we'll remove that
3. getPuzzle will still take the one argument `workCount` and it will return a Promise
4. We could return the Promise but we are going to use an implicit return
5. **REMEMBER** The constructor function for Promise takes a function as an argument (and that function gets called with 2 arguments (both are functions themselves) - resolve and reject)
6. Then paste in the callback pattern code you have saved to the clipboard into the Promise block

#### This is what we have so far (after the above changes)
```
// MORE CODE

const getPuzzle = wordCount =>
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', e => {
      if (e.target.readyState === 4 && e.target.status === 200) {
        const data = JSON.parse(e.target.responseText);
        cb(undefined, data.puzzle);
      } else if (e.target.readyState === 4) {
        cb('An error has taken place', undefined);
      }
    });

    request.open('GET', `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
    request.send();
  });

// MORE CODE
```

* Now we'll make a few small tweaks
* We remove the lines with callback it's no longer defined
    - Instead we'll pass `data.puzzle` to the `resolve` function
* The other callback where we pass in the first argument for error
    - And we just call reject with the exact same error
* Believe it our not, we've just completed the conversion!
* It should now look like:

```
// MORE CODE

const getPuzzle = wordCount =>
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', e => {
      if (e.target.readyState === 4 && e.target.status === 200) {
        const data = JSON.parse(e.target.responseText);
        resolve(data.puzzle);
        // cb(undefined, data.puzzle);
      } else if (e.target.readyState === 4) {
        reject('An error has taken place');
        // cb('An error has taken place', undefined);
      }
    });

    request.open('GET', `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
    request.send();
  });

// MORE CODE
```

* We are not getting a Promise back as the return value

## Now we need to use the Promise in `app.js`
* We still will be calling getPuzzle
* We still will be passing in wordCount as an argument
* But the 2nd argument no longer exists because that was our callback
    - We can delete it completely

`app.js`

* Before

```
// MORE CODE

getPuzzle('4', (error, puzzle) => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log(puzzle);
  }
});

// MORE CODE
```

* After

```
getPuzzle('4');
```

* What comes back from `getPuzzle`?
    - A Promise comes back
    - Like we did in promises.js I could store what comes back (aka the return value) in a variable and then call then on that variable later

`promises.js`

```
// MORE CODE

const myPromise = getDataPromise(123);

myPromise.then(
  data => {
    console.log(data);
  },
  err => {
    console.log(err);
  }
);

// MORE CODE
```

* But I could also `chain` on `then` to my Promise and not have to create the variable like this:

```
// MORE CODE

getPuzzle('4').then();

// MORE CODE
```

* Now I want to pass in my 2 functions:
    - First argument will be a function for when things go well and the Promise is `resolved`
    - Second argument for when things go poorly and the Promise is `rejected`

```
// MORE CODE

getPuzzle('4').then(
  () => {
    // Promise gets resolved
  },
  () => {
    // Promise gets rejected
  }
);

// MORE CODE
```

* And after we plug in either the data we get back to `resolve` our Promise or the error we get back if the Promise was `rejected`

```
// MORE CODE

getPuzzle('4').then(
  puzzle => {
    // Promise gets resolved
    console.log(puzzle);
  },
  err => {
    // Promise gets rejected
    console.log(`Error: ${err}`);
  }
);

// MORE CODE
```

* **note** Now we have the exact same functionality we had before but instead of working with callbacks we are working with Promises

## Test it out
* `$ live-server .`
* You should see the word puzzle appearing in console with 4 words
* It works just as it did before but now we're using Promises

## Challenge
* Convert getCountry from callback pattern to Promise pattern

`requests.js`

```
// MORE CODE

const getCountry = countryCode =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', e => {
      if (e.target.readyState === 4 && e.target.status === 200) {
        const data = JSON.parse(e.target.responseText);
        const country = data.find(
          country => country.alpha2Code === countryCode
        );
        resolve(country);
        // cb(undefined, country);
      } else if (e.target.readyState === 4) {
        reject(`an error has taken place`);
        // cb('an error has taken place', undefined);
      }
    });

    xhr.open('GET', 'http://restcountries.eu/rest/v2/all/');
    xhr.send();
  });

// MORE CODE
```

