# Promise Chaining
## An advanced way to structure our Promises
* Useful when we are trying to do two things in a row that both end up being Promise calls

`app.js`

```
// MORE CODE
getCountry('US').then(
  country => {
    console.log(country.name);
  },
  err => {
    console.log(`The error: ${err}`);
  }
);
```

* Imagine we had another function similar to getCountries called `getCountriesInRegion` and we didn't want to do just one thing we wanted to do 2 things
    - We start with the country code to find out what region this country is in and then based on their region I wanted to get all other countries in that region and print them
    - To accomplish this we would need to use two functions with two Promises where the data for the first Promise needs to be received before we can start the second one
        + I have to know what region Mexico is in before I can all of the countries in that same region

## Let's experiment with two things
* Dummy callbacks
* Dummy Promises

### Callbacks first
* We start with:

```
// Callback
const getDataCallback = cb => {
  setTimeout(() => {
    cb('This is my callback error', undefined);
    cb('This is my callback error', undefined);
    // cb(undefined, 'This is the callback data');
  }, 2000);
};

getDataCallback((err, data) => {
  if (err) {
    console.log('Woops!');
  } else {
    console.log(data);
  }
});
```

* We will modify this callback to take an argument
* If the typeof is a number we'll use it, other wise we'll generate an error

```
const getDataCallback = (num, cb) => {
  setTimeout(() => {
    // is it a number?
    if (typeof num === 'number') {
        // yes it is a number
        // first argument is undefined (that is where the error lives)
        // second argument is the number
      cb(undefined, num * 2)
    } else {
        // throw the error (a number was not provided)
      cb('Number must be provided');
    }
  }, 2000);
};
```

* Now we'll call `getDataCallback` and pass our argument

```
// MORE CODE

getDataCallback(2, (err, data) => {
  if (err) {
    console.log('Woops!');
  } else {
    console.log(data);
  }
});

// MORE CODE
```

* But we don't just want to output `4` our goal is to do something twice
    - We want to use `data` and pass it into a new version of `getDataCallback` to multiple that too

## How can we do this with callbacks?
```
// MORE CODE

getDataCallback(2, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    getDataCallback(data, (err, data) => {
      if (err) {
        console.log(err)
      } else {
          console.log(data);
      }
    })
  }
});

// MORE CODE
```

* It will take twice as long but we get `8`
* It works
* It does what we want it to do
* But the code is getting ugly

### Callback Hell
* Above is an example of callback hell
* It is spaghetti code
* It is hard to follow
* It is hard to maintain
* If we wanted to expand it further it would be a very challenging task
* [callbackhell.com](http://callbackhell.com/)
* The problem with the code is it is getting deeply nested
* It creates code that is unnecessarily complex to work with and read
* callbacks do not handle doing two asynchronous things well using the data from the first to start the process for the second, callbacks suck

## Promises handle doing two asynchronous processes much better
* here is our starter code

```
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

* Now let's chain Promises
* We write our function to take in a number and multiple it by 2 or throw an error that we need to provide a number
* We use the ternary operator to condense our code

```
// MORE CODE

// Promise
const getDataPromise = num =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      typeof num === 'number' ? resolve(num * 2) : reject('Number must be provided')
    }, 2000);
  });

// MORE CODE
```

* Now we call our Promise

```
// MORE CODE

const myPromise = getDataPromise(2).then(
  data => {
    getDataPromise(data).then(
      data => {
        console.log(`Promise data: ${data}`);
      },
      err => {
        console.log(err);
      }
    );
  },
  err => {
    console.log(err);
  }
);

// MORE CODE
```

* Now we run it and we get `Promise data: 8` (after 4 seconds)
* Works the same
* We see that just by using promises we are getting a slightly better structure
    - Instead of relying on using `if` and `else` to determine if things went right or wrong we are using separate functions
        + This helps prevent us from getting too nested

### But there is room for improvement in our Promises
* We still have duplicate functions for our error handlers
    - It would be nice to only have one function since they are doing the exact same thing
* And we are still nesting

### We can fix both using "Promise Chaining"
* We start off doing the exact same thing we did before:

```
// MORE CODE

getDataPromise(10).then((data) => {
  getDataPromise(data)
})

// MORE CODE
```

* But now how do we access the number `40` (10*4)
* How do we attach some code to run when this Promise resolves using this new technique
    - To do this we don't put `then` at the end because that's exactly what we did above
    - Instead we `return` our Promise from our then function
        + When we return a Promise from another Promise's handler we create "Promise chaining"

#### Promise Chaining!
* We return our Promise from our then function

```
// MORE CODE

getDataPromise(10).then((data) => {
  return getDataPromise(data)
})

// MORE CODE
```

* So now we'll chain another Promise to do something with this Promise resolves

```
getDataPromise(10)
  .then(data => {
    return getDataPromise(data);
  })
  .then(data => {
    console.log(`Promise Chaining data: ${data}`);
  });
```

* Run it `$ node promises.js`
* You will see it works and we get `Promise Chaining data: 40`
* We get the same outcome as before but we avoided nesting `then`
* **BIG PRO**
  - We can add many more chained `then`s without adding any more complexity

```
// MORE CODE

getDataPromise(10)
  .then(data => {
    return getDataPromise(data);
  })
  .then(data => {
    return getDataPromise(data);
  })
  .then(data => {
    console.log(`Promise Chaining data: ${data}`);
  });

// MORE CODE
```

* If you run the above code it will now take 6 seconds to get our data from 3 promises (`num` will be 80)
* But imagine if we did this with callbacks... callback hell!

## How do we deal with error handling?
* Here we use `catch` to set up a single error handler for all of our Promises (instead of one for each like we do in callbacks)
  - So if either of these 3 Promises rejected it would move down to the catch and show the error

```
// MORE CODE

getDataPromise(10)
  .then(data => {
    return getDataPromise(data);
  })
  .then(data => {
    return getDataPromise(data);
  })
  .then(data => {
    console.log(`Promise Chaining data: ${data}`);
  })
  .catch(err => {
    console.log(err);
  });

// MORE CODE
```

* Show the error by passing a string

```
// MORE CODE

getDataPromise('10')
  .then(data => {
    return getDataPromise(data);
  })
  .then(data => {
    return getDataPromise(data);
  })
  .then(data => {
    console.log(`Promise Chaining data: ${data}`);
  })
  .catch(err => {
    console.log(err);
  });

// MORE CODE
```

* You will get `Number must be provided` (the error handling is working)
* The goal was to better structure our code and Promise chaining does that for us
  - It allows us to add complex asynchronous functionality without having to write complex asynchronous code
