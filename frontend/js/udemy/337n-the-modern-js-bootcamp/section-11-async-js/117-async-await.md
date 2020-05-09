# Async/Await
* async/await is the combination of two new JavaScript tools
    - The `async` function
    - And the `await` operator
* When used together we get a new way to structure and work with our promises that makes code a lot easier to work with

## Let's experiment with async/await
`functions/async-await.js`

* No arguments
* Nothing in our function body

```
const processData = () => {
  //
}
```

* We will call processData and we know since we don't explicitly tell it what to return processData will return `undefined`

```
// MORE CODE

const processData = () => {
  //
};

console.log(processData());

// MORE CODE
```

## Run it with `$ node async-await.js`
* You will see `undefined` in the terminal

## Now let's start using async/await
### First we'll add the async keyword
* When we create a function we can choose to create that function as an async function

```
const processData = async () => { // we add the async keyword here
  //
};

console.log(processData());
```

## Run again
`$ node async-await.js`

* Now you get back a Promise

```
Promise { undefined }
```

## IMPORTANT - async functions ALWAYS return a Promise
* That Promise is resolved with a value that you the developer choose to return from the function

```
const processData = async () => {
  return 12;
};

console.log(processData()); // Promise { 12 }
```

* If we omitted the `async` our function would return `12`
* But with `async` we get a Promise
    - So to get the data with `async` we need to use `then` to resolve the Promise
* console.log(x,x,x) // just logs out the items in a row
```
const processData = async () => {
  return 12;
};

processData().then(data => {
  console.log('Data', data); // Data 12
});
```

## Run it
`$ node async-await.js`

* Now we get `12`

## What we know
* We know that async functions return a Promise
* We know that the value we return from the async function is the value that the Promise gets resolved with

### Let's add a catch handler for our async function
* This `catch` handler will run if the Promise that comes back from the async function `reject`s

```
const processData = async () => {
  return 12;
};

processData()
  .then(data => {
    console.log('Data', data);
  })
  .catch(error => {
    console.log('Error', error);
  });
```

### Let's manually throw and error
```
const processData = async () => {
  throw new Error('Something went berry berry bad');
  return 12;
};

processData()
  .then(data => {
    console.log('Data', data);
  })
  .catch(error => {
    console.log('Error', error);
  });
```

* Now you'll get the error
* Look in the terminal what line the error comes from and you'll see it's from the console.log() in your catch handler
* All is groovy but as it stands right now we are not doing anything asynchronous

### Let's add code to work with something asynchronous
* We'll take the code from getDataPromise and place it above processData
* We remove the function body of `processData`
```
const getDataPromise = num =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      typeof num === 'number'
        ? resolve(num * 2)
        : reject('Number must be provided');
    }, 2000);
  });

const processData = async () => {
  //
};

processData()
  .then(data => {
    console.log('Data', data);
  })
  .catch(error => {
    console.log('Error', error);
  });
```

## Let's talk about `await`
* This is the await operator
* **IMPORTANT** The `await` operator CAN ONLY BE USED with asyn functions
    - This is why we never refer to async or await by themselves it is always groups with `async/await`

## Goal - to use getDataPromise 2 times inside of processData
```
const processData = async () => {
  getDataPromise(2).then(data => {
    // get the data
    // do something with the data
    console.log(data)
  });
};
```

### Let's do exact same thing using `await`
* Here we use the `await` operator that returns a Promise

```
const processData = async () => {
  await getDataPromise(2);
};
```

* Now this is where things get cool
    - We don't have to `then` and set up a callback function
    - This looks like synchronous code

## Store data that comes back from a Promise in a variable
* After storing our returned resolved Promise in a variable
* We can use that data on the next line just as if it was normal synchronous code!

```
const processData = async () => {
  const data = await getDataPromise(2); // after waiting 2 seconds we see '4'
  console.log(data);
};
```

## We can expand on this even further
* Previously if we wanted to use a Promise multiple times we had to use "Promise chaining"
* But if we use `async/await` we just need to add a few more lines to the program
* We'll use `let` instead of `const` so we can re-assign its value

```
const processData = async () => {
  let data = await getDataPromise(2);
  data = await getDataPromise(data);
  data = await getDataPromise(data);
  console.log(data);
};
```

* After 6 seconds we see 16

### And if we want it to print to our `processData` console.log
```
const processData = async () => {
  let data = await getDataPromise(2);
  data = await getDataPromise(data);
  data = await getDataPromise(data);
  return data;
};

processData()
  .then(data => {
    console.log('Data', data); // Data 16
  })
  .catch(error => {
    console.log('Error', error);
  });
```

### Benefit of using async/await
* By using async/await we can structure our asynchronous code to look more like regular old synchronous code
* We can perform one operation after the other
    - This other code is never going to run until this code either `resolves` or `rejects`
    - The `return` statement won't return until the 3rd Promise either resolves or rejects

### Now let's see what happens when one of our Promises 'rejects'
* We'll pass in a **string** instead of a number which will cause our conditional to fail and that will cause our Promise to reject

```
const processData = async () => {
  let data = await getDataPromise('abc');
  data = await getDataPromise(data);
  data = await getDataPromise(data);
  return data;
};
```

* `node async-await.js`

* After 2 seconds we'll see `Error Number must be provided`

## Now let's make use of this technique in our app code
* Instead of working with fetch and attached it to it
    - We are going to work with `fetch` and use it with await

### Our starter function
```
// MORE CODE

const getPuzzle = wordCount => {
  return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Could not fetch puzzle');
      }
    })
    .then(data => {
      return data.puzzle;
    });
};

// MORE CODE
```

* And we convert it using async/await

```
// MORE CODE

const getPuzzle = async wordCount => {
  const response = await fetch(
    `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`
  );
  if (response.status === 200) {
    const data = await response.json(); // we add await operator here
    return data.puzzle;
  } else {
    throw new Error('Could not fetch puzzle');
  }
};

// MORE CODE
```

## Test to make sure getPuzzle works just as it did before
* We didn't have to change our getPuzzle call in app.js at all!


