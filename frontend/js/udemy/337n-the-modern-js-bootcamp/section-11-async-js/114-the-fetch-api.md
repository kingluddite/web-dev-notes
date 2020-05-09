## The fetch API
* We will explore a second way we can make HTTP requests via JavaScript
* Currently we only use `XMLHttpRequest`
* In newer versions of JavaScript we have access to the fetch API
    - This new API has Promises built right in
    - You need to know about Promise chaining in order for fetch to make sense

## Create a new file call `fetch-api.js`
* [fetch api docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [using fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

### How do we access the fetch API?
* By calling fetch like this:

```
fetch(URL)
```

* We'll use the puzzle endpoint
* It has a second argument that we'll set to an empty object

```
fetch('http://puzzle.mead.io/puzzle', {}).then((response) => {
  //
});
```

### We can also add a catch error handler
```
fetch('http://puzzle.mead.io/puzzle', {})
  .then(response => {
    //
  })
  .catch(error => {
    console.log(error);
  });
```

## Now we need to do something with the response
* We want to make sure the status code is 200
    - If it is I want to get access to JSON information (data.puzzle)
* **PRO OF fetch!** - We don't have to worry about `readyState`
    - This Promise will only `resolve` or `reject` when it is ready for us
    - This is great because since we know if the request succeeded or failed we don't have to check

## We still need to check "how" it completed!
- We don't have to check if it completed but we do need to check "how" it completed
    + Did things go well ---> did we get a 200 server status?
    + Did things go poorly ---> did we get a 404 or 400 server error (400 is what we'd get if we used an invalid query string)?
    + We can access status using the `status` property on `response`
        - `response.status`

```
fetch('http://puzzle.mead.io/puzzle', {})
  .then(response => {
    if (response.status === 200) {
      // good
    } else {
      // bad
    }
  })
  .catch(error => {
    console.log(error);
  });
```

* But since we are using Promises we only need one catch but in order to cause and error in our `else` above we need to call `throw new Error()`
    - Doing the `throw new Error()` works like throwing a new error inside a `try` block would cause the catch block to run in a `try/catch` statement

#
```
fetch('http://puzzle.mead.io/puzzle', {})
  .then(response => {
    if (response.status === 200) {
      // good
    } else {
      // bad
      throw new Error('Unable to fetch for the puzzle');
    }
  })
  .catch(error => {
    console.log(error);
  });
```

## Now let's see what to do with our data when we get a success
* In the response you have access to a `json` method
    - The `json()` method will take the response body and parse it as JSON
        + We could have do the same with the error case down below but here we'll just parse the data for the successful request (because we know we have the puzzle successfully)

```
fetch('http://puzzle.mead.io/puzzle', {})
  .then(response => {
    if (response.status === 200) {
      // good
      response.json()
    } else {
      // bad
      throw new Error('Unable to fetch for the puzzle');
    }
  })
  .catch(error => {
    console.log(error);
  });
```

## Note: What we get back is not a JavaScript object (it's actually a Promise)
* And that Promise is actually going to resolve with the object at some point in the future
    - And this is exactly where Promise chaining is going to come into effect
    - We have 2 options here
        + We could attach `then` on like this:

```
fetch('http://puzzle.mead.io/puzzle', {})
  .then(response => {
    if (response.status === 200) {
      // good
      response.json().then()
    } else {
      // bad
      throw new Error('Unable to fetch for the puzzle');
    }
  })
  .catch(error => {
    console.log(error);
  });
```

* Or we can return this Promise adding another `then` onto the chain

```
fetch('http://puzzle.mead.io/puzzle', {})
  .then(response => {
    if (response.status === 200) {
      // good
      return response.json();
    } else {
      // bad
      throw new Error('Unable to fetch for the puzzle');
    }
  })
  .then(data => {
    console.log(data.puzzle);
  })
  .catch(error => {
    console.log(error);
  });
```

* If you try to run this in node you will get an error

`$ node fetch-api`

* Why?
    - The fetch API is not implemented in Node
    - You need to use an external module for that, like `node-fetch`

### To get around this we'll use our app that is viewed inside HTML so we can see our puzzle in the client console

`app.js`

```
const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
const game1 = new Hangman('Cat Power', 2);
// const game1 = new Hangman(puzzle, 2);
console.log(game1);
puzzleEl.textContent = game1.puzzle;
guessesEl.textContent = game1.statusMessage;

window.addEventListener('keypress', e => {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  puzzleEl.textContent = game1.puzzle;
  guessesEl.textContent = game1.statusMessage;
});

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

// getCountry('MX').then(
//   country => {
//     console.log(country.name);
//   },
//   err => {
//     console.log(`This is the error: ${err}`);
//   }
// );
//
// getCountry('US').then(
//   country => {
//     console.log(country.name);
//   },
//   err => {
//     console.log(`The error: ${err}`);
//   }
// );

fetch('http://puzzle.mead.io/puzzle', {})
  .then(response => {
    if (response.status === 200) {
      // good
      return response.json();
    } else {
      // bad
      throw new Error('Unable to fetch for the puzzle');
    }
  })
  .then(data => {
    console.log(data.puzzle);
  })
  .catch(error => {
    console.log(error);
  });
```

`$ live-server app.js`

* You'll see we get 2 words back

![code is pulling data from our fetch on line 56 of app.js](https://i.imgur.com/r92R95J.png)

### Let's convert getPuzzle and getCountry to use fetch instead of XMLHttpRequest

#### Converting getPuzzle
* We aren't just going to be removing all the code from XMLHttpRequest
* We are also going to be remove the new Promise we are going to create
    - Remember that XMLHttpRequest does not support Promises
    - So if we want to use the Promise API we had to integrate it into the code by using `new Promise` and manually calling `resolve` and `reject`
    - That is no longer the case with the fetch API (Which does have Promises built in)

`requests.js`

```
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
```

## Convert getPuzzle to using the fetch API
* Since Promises are built in we can remove a lot

```
const getPuzzle = wordCount => {
  return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`).then(
    response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Could not fetch puzzle');
      }
    }
  );
};
```

* Now we have the code for the highlighted portion:

![code highlighted](https://i.imgur.com/HVWVvn0.png)

* But we don't also want to have this code live in the `getPuzzle` function

![remove this code from getPuzzle](https://i.imgur.com/0nWrXOi.png)

* The above code should live here:

`app.js`

```
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
```

### How can we get that done?
* We get that done by returned what `getPuzzle` expects
    - What does getPuzzle expect to be returned?
    - Well, based on it's usage we are expected a Promise to come back (because we are using `then`)
    - So to make sure that code still works we need to put `return` up front to return our Promise like this:

```
// MORE CODE

const getPuzzle = wordCount => {
  // see how we put return up front to return our Promise?
  return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`).then(
    response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Could not fetch puzzle');
      }
    }
  );
};

// MORE CODE
```

* Now we need to focus on `app.js`

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

* Let's comment out our stand alone `fetch` call
* And we'll modify `getPuzzle`
    - We no longer get the puzzle... now we are getting our `data`
    - And then we access puzzle on `data`

```
getPuzzle('4').then(
  data => {
    // Promise gets resolved
    console.log(data.puzzle);
  },
  err => {
    // Promise gets rejected
    console.log(`Error: ${err}`);
  }
);
```

* And we'll remove the second function and use catch instead

```
getPuzzle('4')
  .then(data => {
    // Promise gets resolved
    console.log(data.puzzle);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });
```

* Look at what we did
    - We now have code inside app.js that looks very similar to code we had in our stand alone fetch

![code from standalone](https://i.imgur.com/O90UGxG.png)

* And we have code in `request.js` that looks very similar 

```
const getPuzzle = wordCount => {
  return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`).then(
    response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Could not fetch puzzle');
      }
    }
  );
};
```

* To what we had in the fetch stand alone example in `app.js`

 ![code looks similar in fetch](https://i.imgur.com/7SkUcav.png)

# Run
`$ live-server .`

* You will see it works just like before
* All we did is take our standalone promise chain and broken it up to be in multiple locations (part of it is a function and part of it sits in `app.js`) 

### This confuses people - think of it like this
* Why can I add `then` on from what comes back from `getPuzzle`?
  - Because of what gets back from getPuzzle is all of this stuff:

![comes back from getPuzzle](https://i.imgur.com/1oSAZ6M.png)

* So I could just copy that code and replace the call with that code
  - Yes we don't have `wordCount` defined but we can see now how everything works

```
// MORE CODE

fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Could not fetch puzzle');
    }
  })
  .then(data => {
    // Promise gets resolved
    console.log(data.puzzle);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });

// MORE CODE
```

* And what we have above is basically the same thing as our test code from before (that is pasted below):

```
fetch('http://puzzle.mead.io/puzzle', {})
  .then(response => {
    if (response.status === 200) {
      // good
      return response.json();
    } else {
      // bad
      throw new Error('Unable to fetch for the puzzle');
    }
  })
  .then(data => {
    console.log(data.puzzle);
  })
  .catch(error => {
    console.log(error);
  });
```

## Let's make one small change
* We are using `data` in our Promise chaining example on app.js

```
// MORE CODE

getPuzzle('4')
  .then(data => {
    // Promise gets resolved
    console.log(data.puzzle);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });

// MORE CODE
```

* What if I want to use puzzle like before
  - I don't want an object, I just want my string (just like before we just want our puzzle string)
* But below we still are getting an object, how can we change it to just a string?

```
// MORE CODE

getPuzzle('4')
  .then(puzzle => {
    // Promise gets resolved
    console.log(puzzle);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });

// MORE CODE
```

## There's one new thing we'll learn about Promises
* It will make setting this up straight forward
* We'll remove the string around `4` so we'll get valid data

### Let's work in promises.js
`promises.js`

* Instead of returning an object I'll return a simple string

#### Before
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

#### After
```
// MORE CODE

getDataPromise(10)
  .then(data => {
    return getDataPromise(data);
  })
  .then(data => {
    return `this is some test data`;
  })
  .then(data => {
    console.log(`Promise Chaining data: ${data}`);
  })
  .catch(err => {
    console.log(err);
  });

// MORE CODE
```

* Run it `$ node promises.js`
  - And we'll see (after 2 seconds) `this is some test data`
  - So what is happening here?
    + I'm returning a string not a promise why is the next `then` method still getting called?
      * **IMPORTANT** The reason is that when working with Promise chaining you don't have to return a Promise from `then` (you can return anything you like) and that will get passed along to the next step in the Promise chain (this will be very useful)
* Knowing this important fact about Promise chaining, we can adjust our getPuzzle code to accomplish what we need

### Let's return a string
* We just add on a `then` and return the string we want `data.puzzle`
  - We know that this one (the then we are attaching now) is going to get resolved with whatever comes back from `response.json()` (and that will be the `data`)

`requests.js`

```
// MORE CODE

const getPuzzle = wordCount => {
  return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`).then(
    response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Could not fetch puzzle');
      }
    }
  ).then((data) => {
    return data.puzzle;
  })
};

// MORE CODE
```

* Now the function `getPuzzle` is going to work with what we have here in app.js

`app.js`

```
// MORE CODE

getPuzzle('4')
  .then(puzzle => {
    // Promise gets resolved
    console.log(puzzle);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });

// MORE CODE
```

### Test to make sure
`$ live-server .` and you should see a 4 word string returned from our API

* Look at client console and the line number of the 4 word string is `app.js:19` and line 19 (in my example) is where `console.log(puzzle);` resides

![return our puzzle](https://i.imgur.com/3ZxDInK.png)

