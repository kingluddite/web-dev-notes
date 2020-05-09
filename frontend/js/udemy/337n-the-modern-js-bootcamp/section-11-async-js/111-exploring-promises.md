# Exploring Promises
## We'll dive into the Promise API
* A better way to structure our async code

## We are currently structuring things using the callback approach
* This made it easy to separate the usage of the data from how the data is actually fetched

`app.js`

* Here is the usage of the data

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

* Here is how the data is actually fetched

`requests.js`

```
// MORE CODE

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

// MORE CODE
```

* In this case we pass a function to `getPuzzle`
* And we hope that in the future this function gets called with the correct arguments in the correct order `error, puzzle`

![pass function to getPuzzle](https://i.imgur.com/i9WRUtN.png)

* The above is using callbacks but we will dig into to use Promises instead

## Using Promises
* **tip** When learning about new features it's best to explore them in isolation then bring them into the app you are working on
    - That ensures you understand how things are working
    - Once they are understood then you can integrate them into the program

## Simulate a delay
* We won't be making an actual HTTP request
* We can simulate a day in JavaScript by using `setTimeout`

### setTimeout
* Allows us to run some code after a certain abount of time has passed
* [docs for setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)
* It takes 2 arguments
    - The code to run after a certain amount of time has passed
    - How much time you want to wait (ms)

`functions/promises.js`

```
setTimeout(() => {
  console.log('The time is up');
}, 2000);
```

#### Run our code
`node promises.js`

* After 2 seconds you'll see `The time is up`
* Then the program completes
* Bringing us back to the `command prompt`

## We need a way to differentiate between standard callbacks and promises
* Here is our standard callback

```
// standard callback using setTimeout
// getDataCallback is just a function that takes a function as an argument
const getDataCallback = cb => {
  setTimeout(() => {
    // we call the callback and we pass in the arguments `error` and `data`
    cb(undefined, 'This is the data');
  }, 2000);
};

// we use it by calling getDataCallback and we pass in our callback function (this is the function where we can any potential error or potential data)
getDataCallback((err, data) => {
  // check for error
  if (err) {
    console.log('Woops!');
  // no error than access our information
  } else {
    console.log(data);
  }
});
```

## Run it
`$ node promises.js`

* After 2 seconds we see `This is the data`
* Then the program completes 
* We are returned to the command prompt

## Now let's do the same thing using the Promise API

## Let's compare and contract callbacks vs Promises techniques
### Callback
```
// Callback
const getDataCallback = cb => {
  setTimeout(() => {
    cb(undefined, 'This is the data');
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

## Promise
* The Promise technique starts by creating a new Promise
  - Using `new` with the `Promise` constructor function
* We do not create the Promise constructor as it is built right into the language and it expects a single argument (and this is a function)

```
// MORE CODE

// Promise
const myPromise = new Promise();

// MORE CODE
```

* It is more than ok to use an arrow function since we are not going to be using `this` or `arguments`
* Inside of the function we are passing the Promise we can make HTTP requests using XHR or we could use setTimeout to simulate a delay

```
// MORE CODE

// Promise
const myPromise = new Promise(() => {
  // do stuff
});

// MORE CODE
```

### Look at the similarities between below and our callback up above
```
// MORE CODE

// Promise
const myPromise = new Promise(() => {
  // this is where we put our "long running process"
  setTimeout(() => {
    // do stuff
  }, 2000)
});

// MORE CODE
```

* Up above when we called setTimeout we had access to callback inside setTimeout
  - How can we do that with Promises?
  - When the Promise constructor function calls the function we are passing to the Promise constructor it calls it with two arguments we can use:
    1. `resolve` - We call **resolve** to say that thing went well
      + We were successfully able to perform this "long running operation"
    2. `reject` - We call **reject** to say things went bad
      + If something failed along the way:
        * If we used invalid arguments
        * Or the data we tried to access did not exist

* So inside of this function (the one we pass to the Promise contstructor we are going to call either `resolve` or `reject`)

## then
* We use `then` to do something with the data we get back from our Promise
  - We pass to `then` a **function**
    + This **function** gets called when the Promise resolves (meaning that things went swimmingly)
* We get access to the data via the first argument of `then`
* We can call it whatever we want... why not call it `data`?

```
// MORE CODE

// Promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is the promise data');
  }, 2000);
});

myPromise.then(data => {
  console.log(data);
});


// MORE CODE
```

* Run with `$ node promises`
* After 2 seconds you'll see `This is the promise data` in the terminal

## Comparing how we show errors (comparing the callback way vs the Promise way)
### The callback way to show an error
```
// MORE CODE

// Callback
const getDataCallback = cb => {
  setTimeout(() => {
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

// MORE CODE
```

`$ node promise`

* After 2 seconds you'll see our `Woops!` error in the terminal

### And this is how we see errors in a Promise
* Instead of calling `resolve` we just call `reject`

```
// Promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Promise Error');
    // resolve('This is the promise data');
  }, 2000);
});

myPromise.then(data => {
  console.log(data);
});
```

* Run with `$ node promise`
* After 2 seconds we get a ton of error output

![Promise error output](https://i.imgur.com/UDfnvnW.png)

* We see the error for our callback example
* We don't see the error for our Promise example
  - Why?
    + Because we don't have a `handler` set up for it
    + Our function will only fire if our Promise resolves
    + It only takes a single argument (the data for when things go well)

![function only fires if Promise resolves](https://i.imgur.com/mJ8VXIE.png)

## Fixing it so we can see Promise errors when things go poorly
* To do this we have to a second argument for `then`
  - This second argument (is a function) is only ever going to be called when things go poorly and it gets called with the error `err`

```
// Promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
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
```

`$ node promise`

* And after 2 seconds we see our Promise error `Promise Error`

## Let's compare and contrast the Promise API with the callback pattern
* The Promise API is much easier to reason about

### above we have a single `callback` (cb) argument
* There is no easy way to know if things went well or bad just by looking at that one argument
* It is the order of the callback arguments that let's us determine if we have success or failure
* In the Promise we have clearer semantics
  - We have `resolve` and `reject`
  - If we see **resolve** things went well
  - If we see **reject** we know things went poorly
* A problem with callbacks is that it is totally possible to call your callbacks twice

```
// MORE CODE

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

// MORE CODE
```

* Above logs 2 errors (not something we would want to do for apps because it could result in extremely unexpected behavior)
  - We might want to start to games, crashing the program or causing something weird to occur

### Promises are better
* With Promises it is impossible to run more than just one of these functions and it's only ever going to run once
  - You can not resolve twice
  - You can not reject twice
  - You can not resolve and then reject
  - You can not reject and then resolve
  - You can call one, one time, everything else is going to be ignored 

#### Let's prove it
* Even though we call reject twice we only get it once
* Where as callback we get it twice

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
```

## But what if I want to pass back multiple pieces of information in a Promise?
* Just put all that information on an object and resolve or reject the object instead

### Another nice feature of Promises
* We don't know what we have to do with the code before we start the process of fetching the information
  - With callbacks I have to define my callback that uses the data before I can fetch the data by nature (because I have to call `getDataCallback` with it)
* But with Promises once the Promise starts its process we do not need to attach then to start waiting
  - If I were to add it in it would still reject just the same, we've just chosen to do nothing with it
  - We could add it in like we did and we could access it multiple times 

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

* I use then twice but I'm not calling data twice, I just doing two different things with the same data

`$ node promise`

* We'll get two calls to our error but we didn't have to wait 4 seconds we just had to wait 2 seconds
