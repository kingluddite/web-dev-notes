# Asynchronous vs Synchronous Execution

## Synchronous Execution 
* When we execute something `synchronously` we start some sort of task (like fetching a puzzle) and then we have to wait for it to finish before we move on to the next thing
    - Think of having a [game of catch with your dog](https://youtu.be/MGZwydOtPx0?t=374)
    - While waiting for the dog to bring the bone back you can't do anything, you just have to wait

## A better world would be if we could be more productive
* While waiting for the dog to bring back the bone
    - We could also write an email
    - Watch some TV
    - Cook some food
    - Eat some food
console.log(We could also write an email)
console.log(Watch some TV)
console.log(Cook some food)
console.log(Eat some food)

## Asynchronous Execution
* A better solution is Asynchronous execution
* Let's look at an example of Synchronous Execution

`app.js`

```
// MORE CODE

getPuzzle((error, puzzle) => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log(puzzle);
  }
});

// MORE CODE
```

## Let's multi-task using asynchronous execution!
`app.js`

```
// MORE CODE

getPuzzle((error, puzzle) => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log(puzzle);
  }
});

console.log("We could also write an email")
console.log("Watch some TV")
console.log("Cook some food")
console.log("Eat some food")

// MORE CODE
```

* Run and see what happens in the console:

```
HangmanguessedLetters: []remainingGuesses: 2status: "playing"word: (9) ["c", "a", "t", " ", "p", "o", "w", "e", "r"]puzzle: (...)statusMessage: (...)__proto__: Object
We could also write an email
Watch some TV
Cook some food
Eat some food
Live reload enabled.
Date To The Prom // this is our code coming from an HTTP request
```

* All our multi-tasking happened first
* The longest tast, the HTTP request happened last
* We didn't have to wait for the HTTP request to complete before we did other stuff

## Let's illustrate the differences between async and sync execution
* **note** I'm use async for asynchronous and sync for synchronous to save some typing

```
const puzzle = getPuzzleSync()
console.log(puzzle)
```

* Before it was stated that this was not possible
* There actually is a way to get it done but it is not a way we want to use when we are working with JavaScript
* The only reason we are doing it this way is to prove a point and explore the differences between the 2 techniques

### Let's create getPuzzleSync function so our code above works
* We'll just duplicate `getPuzzle` in `requests.js` and rename it to `getPuzzleSync`

`requests.js`

```
const getPuzzle = cb => {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      cb(undefined, data.puzzle);
    } else if (e.target.readyState === 4) {
      cb('An error has taken place', undefined);
    }
  });

  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
  request.send();
};

const getPuzzleSync = cb => {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      cb(undefined, data.puzzle);
    } else if (e.target.readyState === 4) {
      cb('An error has taken place', undefined);
    }
  });

  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
  request.send();
};
```

* getPuzzleSync won't take a call back so we can delete it

```
// MORE CODE

const getPuzzleSync = cb => {
  const request = new XMLHttpRequest();

// MORE CODE
```

* And remove the callback argument

```
// MORE CODE

const getPuzzleSync = () => {
  const request = new XMLHttpRequest();

// MORE CODE
```

* `request.open` 
* andrew says in min 3 of 108 video "request.option" he meant "request.open" and [the documentation](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open) for the 3rd option is a boolean value for async (true or false - here we can tell it we want it to be sync)
    - By default the third argument is `true` (asynchronous)

* Let's force our code to wait until the server responds with our data

```
// MORE CODE

const getPuzzleSync = () => {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      cb(undefined, data.puzzle);
    } else if (e.target.readyState === 4) {
      cb('An error has taken place', undefined);
    }
  });
  
  // we add the 3rd argument to tell it to be synchronous
  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4', false);
  request.send();
};
```

## Now we can change hour our sync function looks
* We are going to take everything inside of our readystatechange callback function

![readystatechange cb function](https://i.imgur.com/ikW2OeT.png)

* We can gut that chunk out and delete the event listener
* Then add the code below like this:

```
// MORE CODE

const getPuzzleSync = () => {
  const request = new XMLHttpRequest();
  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4', false);
  request.send();

  if (e.target.readyState === 4 && e.target.status === 200) {
    const data = JSON.parse(e.target.responseText);
    cb(undefined, data.puzzle);
  } else if (e.target.readyState === 4) {
    cb('An error has taken place', undefined);
  }
};
```

* Before the code was relying on `e.target` (which was the request itself) but we can just change that to `request`

```
// MORE CODE
const getPuzzleSync = () => {
  const request = new XMLHttpRequest();
  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4', false);
  request.send();

  if (request.readyState === 4 && request.status === 200) {
    const data = JSON.parse(request.responseText);
    cb(undefined, data.puzzle);
  } else if (request.readyState === 4) {
    cb('An error has taken place', undefined);
  }
};
```

* Now with the above approach we can actually use the `return` statement

```
// MORE CODE
const getPuzzleSync = () => {
  const request = new XMLHttpRequest();
  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4', false);
  request.send();

  if (request.readyState === 4 && request.status === 200) {
    const data = JSON.parse(request.responseText);
    cb(undefined, data.puzzle);
    return data.puzzle; // add this line
  } else if (request.readyState === 4) {
    cb('An error has taken place', undefined);
  }
};
```

* And this way our `return` will work and return the data we expect

## We can remove the callback on success and callback with error
* And replace with just an error we manually throw

```
// MORE CODE
const getPuzzleSync = () => {
  const request = new XMLHttpRequest();
  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4', false);
  request.send();

  if (request.readyState === 4 && request.status === 200) {
    const data = JSON.parse(request.responseText);
    // cb(undefined, data.puzzle); // comment this out
    return data.puzzle;
  } else if (request.readyState === 4) {
    throw new Error('Things when horribly wrong'); // add this line
    // cb('An error has taken place', undefined); // comment this out
  }
};
```

* Now our code below the `request.send()` will not run until after the server responds with the data (that is why we don't have to rely on an event listener)
* Make sure to save the changes to `requests.js`

## Update our app.js
`app.js`

```
// MORE CODE

// getPuzzle((error, puzzle) => {
//   if (error) {
//     console.log(`Error: ${error}`);
//   } else {
//     console.log(puzzle);
//   }
// });

const puzzle = getPuzzleSync();
console.log(puzzle);
console.log('We could also write an email');
console.log('Watch some TV');
console.log('Cook some food');
console.log('Eat some food');

// MORE CODE
```

* We common out our async code
* We assign our getPuzzleSync function to a variable and log it out
* Then we add our other logs
* We run our app to see what happens

## Check out the console in the client
* **WARNING** You will see this warning `[Deprecation] Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.`

* Then you will see our data

```
// MORE CODE

Dried Red Chile Pods
We could also write an email
Watch some TV
Cook some food
Eat some food
```

* Notice our HTTP request comes first, we wait for it and once we get it than we run our other logs (to simulate multi-tasking)

## Before with async
* We were able to start a process and continue running other code
* Eventually the thing we run completes, we get our data back, and then we run the callback function
* **PRO** This allows us to keep running other code while we are waiting 100ms (or whatever the time might be)

## But for the sync execution
* We actually have to wait all 100ms (or whatever time might be needed)
    - Even if something else that runs later on isn't related at all to the data we are waiting for
* It should be apparent that this is not what we want
* I don't want task 2 to have to wait on task 1 if task 2 doesn't need any information from task 1

### With async we were able to get both done at the same time
* And sync made us wait for one to finish which took some time

## Let's talk about the warning
`[Deprecation] Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.`

* This warning is telling us what we have done is terrible for the end user and it's 100% true
    - Not only are we preventing other unrelated JavaScript code from running and getting some work done in the meantime
    - But we are also locking up the computer interface

## We can't see that right now because we have nothing interactive
* To simulate interaction let's add a checkbox

`index.html`

```
// MORE CODE

    <body>
        <p id="puzzle"></p>
        <p id="guesses"></p>
        <input type="checkbox" />

// MORE CODE
```

* This is impossible to test because before we can move our mouse to the checkbox all our code has already executed

### let's slowdown our request
* We'll swap our URL out with an alternative function on the server that does the exact same thing (it still returns a puzzle and accepts wordcount) but it just waits 5 seconds before doing anything

`requests.js`

```
// MORE CODE

const getPuzzleSync = () => {
  const request = new XMLHttpRequest();
  // we update the URL to perform a type of "wait 5 seconds" before running
  request.open('GET', 'http://puzzle.mead.io/slow-puzzle?wordCount=4', false);
  request.send();

  if (request.readyState === 4 && request.status === 200) {
    const data = JSON.parse(request.responseText);
    // cb(undefined, data.puzzle);
    return data.puzzle;
  } else if (request.readyState === 4) {
    throw new Error('Things when horribly wrong');
    // cb('An error has taken place', undefined);
  }
};

// MORE CODE
```

## Now refresh the page and try to check the checkbox
* You won't be able to check it for 5 seconds
* This shows you why the UX is terrible and should not be used because when we use sync our entire browser locks up and our app performs terribly for the end user and they will hate us and our app - never do this!

## Lesson learned
* Stick to async code that let's us to do other things while we are waiting for our long running tasks, like HTTP requests to complete and give us our data back

## Clean up
* Remove getPuzzleSync

`requests.js`

```
// MORE CODE

const getPuzzle = cb => {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      cb(undefined, data.puzzle);
    } else if (e.target.readyState === 4) {
      cb('An error has taken place', undefined);
    }
  });

  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
  request.send();
};

// MORE CODE
```

* Remove checkbox

`index.html`

```
// MORE CODE

    <body>
        <p id="puzzle"></p>
        <p id="guesses"></p>
        <script src="requests.js"></script>

// MORE CODE
```

* And `app.js`

```
// MORE CODE

getPuzzle((error, puzzle) => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log(puzzle);
  }
});

// MORE CODE
```

* We should see our word phrase is in the console just like before
* But now we know the value of async over sync in JavaScript apps

## Visualization of async vs sync
* aka "blocking" (sync) and "non-blocking" (async)

![visualize the difference between async and sync](https://i.imgur.com/joBVYJe.png)




