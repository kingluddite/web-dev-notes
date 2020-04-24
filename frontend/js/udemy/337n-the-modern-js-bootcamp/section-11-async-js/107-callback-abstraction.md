# Callback Abstraction
* Clean up `app.js`

## Abstracting
* We created methods and functions a more complex task into something easier to use
    - Example:
        + Making a guess
            * There's a lot to that process but in this code fragment:

`app.js`

```
// MORE CODE

window.addEventListener('keypress', e => {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess); // look how simple this is
  puzzleEl.textContent = game1.puzzle;
  guessesEl.textContent = game1.statusMessage;
});

// MORE CODE
```

* We just call a method and pass a guess
* We don't care what happens behind the scenes

## What are we going to do when we need a new puzzle
* This code fragment:

`app.js`

```
// MORE CODE

const request = new XMLHttpRequest();

request.addEventListener('readystatechange', e => {
  if (e.target.readyState === 4 && e.target.status === 200) {
    const data = JSON.parse(e.target.responseText);
    // console.log(data);
  } else if (e.target.readyState === 4) {
    console.log('An error has taken place');
  }
});

request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
request.send();

// MORE CODE
```

* We don't need this in `app.js` and we should abstract it away in a separate function and use it when we need it

## Get organized
* We'll create a new file `requests.js`
* We'll point to that file in our `index.html`

`index.html`

```
// MORE CODE

<!DOCTYPE html>

<html>
    <head></head>
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <body>
        <p id="puzzle"></p>
        <p id="guesses"></p>
        <script src="requests.js"></script>
        <script src="hangman.js"></script>
        <script src="app.js"></script>
    </body>
</html>

// MORE CODE
```

* Let's common out our request code in `app.js`

```
const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
const game1 = new Hangman('Cat Power', 2);
console.log(game1);
puzzleEl.textContent = game1.puzzle;
guessesEl.textContent = game1.statusMessage;

window.addEventListener('keypress', e => {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  puzzleEl.textContent = game1.puzzle;
  guessesEl.textContent = game1.statusMessage;
});

// const request = new XMLHttpRequest();
//
// request.addEventListener('readystatechange', e => {
//   if (e.target.readyState === 4 && e.target.status === 200) {
//     const data = JSON.parse(e.target.responseText);
//     // console.log(data);
//   } else if (e.target.readyState === 4) {
//     console.log('An error has taken place');
//   }
// });
//
// request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
// request.send();
//
// const countryrequest = new XMLHttpRequest();
// const countryCode = 'IE';
//
// countryrequest.addEventListener('readystatechange', e => {
//   if (e.target.readyState === 4 && e.target.status === 200) {
//     const data = JSON.parse(e.target.responseText);
//     // console.log(data);
//     let obj = data.find((country, i) => {
//       if (country.alpha2Code === countryCode) {
//         console.log(country.name);
//       } else if (e.target.readyState === 4) {
//         console.log('Unable to fetch data');
//       }
//     });
//   }
// });
//
// countryrequest.open('GET', 'http://restcountries.eu/rest/v2/all/');
// countryrequest.send();
// // 1. Make a new request for all countries
// // 2. Parse the responseText to get back the array of objects
// // 3. Find your country object by it's country code (alpha2Code property)
// // 4. Print the full country name (name property)

```

## Let's focus on how we're going to transfer information first
* Then we'll get the code that brings in the puzzle

### Create a function
* In `requests.js` we'll create a function and call it from app.js
* The function will just return a string
* We'll log out the returned string

`requests.js`

```
const getPuzzle = () => {
  return 'My Puzzle Placeholder';
};
```

`app.js`

```
// MORE CODE

window.addEventListener('keypress', e => {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  puzzleEl.textContent = game1.puzzle;
  guessesEl.textContent = game1.statusMessage;
});

const puzzle = getPuzzle();
console.log(puzzle);

// MORE CODE
```

* That will log to the client console `My Puzzle Placeholder`

## This works!

## Houston we have a problem
* In our above example we can call getPuzzle because it has access to the data right away
* This WILL NOT BE THE CASE when we use `XMLHttpRequest()`
* We need to wait for the callback function to finish first
    - THEN, AND ONLY THEN do we have access to the data so returning directly from `getPuzzle` will NOT BE POSSIBLE

## Let's prove this:
* We cut our request code from `app.js` and paste into `requests.js`

`requests.js`

```
const getPuzzle = () => {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      console.log(data);
    } else if (e.target.readyState === 4) {
      console.log('An error has taken place');
    }
  });

  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
  request.send();
};

```

* We still see the puzzle data from the console log
* But that's not the problem
* We don't want to print the data to the console
* We want to be able to access the data in `app.js` so we can do something meaningful with it

## Maybe we can solve this using `return data` instead of `console.log(data)`
`requests.js`

```
const getPuzzle = () => {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      return data; // add this!
      // console.log(data);
    } else if (e.target.readyState === 4) {
      console.log('An error has taken place');
    }
  });

  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
  request.send();
};
```

* That won't work:
    - Why?
        + Because we are `returning` from the wrong function
        + When we **return** we return from the function we are currently in
        + Where is this code?
            * It is not directly inside of getPuzzle()

![getPuzzle function block](https://i.imgur.com/4RM6I4p.png)

### There is a closer function it is related to
* And that is the `callback` function

![callback function](https://i.imgur.com/yZL4VsV.png)

## IMPORTANT RULE
* I can not `return` from a **parent function** inside of a **child function**
* The `return` statement applies to the function that the code is executing from
* This means `return data` is not going to solve our problem

### Run our code
* And you'll see we NOT getting our data printing instead we are getting `undefined`

## One more important difference
* Why?
    - Let's make a small change to our code:

```
// MORE CODE

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      console.log(data);
      return data;
    } else if (e.target.readyState === 4) {
      console.log('An error has taken place');
    }
  });

// MORE CODE
```

* I want to log out our data (but we need `return` to come last because we leave function when it first hits `return` so we place `return` at the end)
* Now you'll see that our `undefined` comes before our object from the custom API
    - Why?
        + Because it takes time to got get that data from across the internet and come back
        + Going off and making an HTTP request takes a bit of time
        + In the great scheme of things it is a short amount of time (maybe just 100 milliseconds) but that is A LOT of time when it comes to executing JavaScript code
        + Executing code that lives on your machine is super fast
        + We could execute on our local machines thousands and thousands of lines of code before a single HTTP request is made and processed
            * That is because: 

1. HTTP request is going off to the network
2. And then it is finding that server
3. And then it is letting the server process your request
4. And then the server is sending the data back
5. And all those steps.... ALL TAKES TIME!

## This highlights why our code will never work
* Because our local machine code runs so fast it will all process way before we get our response back from the server
* That means our code for our function will run and finish before we ever have access to the reponse `data`
    - And we proved this by seeing `undefined` printing before the data prints

## Here is another way people try to fix the problem
* They think it is a solution but it is not a solution
* This is what they try to do:

`requests.js`

```
// MORE CODE

const getPuzzle = () => {
  let data; // they create an empty variable

// MORE CODE
```

* Then they try to manipulate data inside of the function

```
// MORE CODE

const getPuzzle = () => {
  let data; // they create an empty variable
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      data = JSON.parse(e.target.responseText); // modify this line
      // const data = JSON.parse(e.target.responseText);
      // console.log(data);
      // return data;
    } else if (e.target.readyState === 4) {
      console.log('An error has taken place');
    }
  });

  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
  request.send();
  return data; // return the data here
};

// MORE CODE
```

* That solution might work but here's what's happening
* Yes we are creating a variable
*   We're trying to change it and we're returning it
*   But the problem is we `return` from the parent function **well before** the callback function ever fires

## We can prove this because
* When we run it we get data is `undefined`

## What is the solution? The `callback` function
* A callback function is just when we pass a callback function to another function

```
// MORE CODE

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      data = JSON.parse(e.target.responseText);
      // const data = JSON.parse(e.target.responseText);
      // console.log(data);
      // return data;
    } else if (e.target.readyState === 4) {
      console.log('An error has taken place');
    }
  });

// MORE CODE
```

* Above we have a callback function that gets call by the `addEventListener` function

## Let's explore the callback function pattern
* functions calling other functions

### Let's comment out all our code inside our `getPuzzle` function
```
const getPuzzle = () => {
  // let data; // they create an empty variable
  // const request = new XMLHttpRequest();
  //
  // request.addEventListener('readystatechange', e => {
  //   if (e.target.readyState === 4 && e.target.status === 200) {
  //     data = JSON.parse(e.target.responseText);
  //     // const data = JSON.parse(e.target.responseText);
  //     // console.log(data);
  //     // return data;
  //   } else if (e.target.readyState === 4) {
  //     console.log('An error has taken place');
  //   }
  // });
  //
  // request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
  // request.send();
  // return data;
};
```

## Let's explore the most basic callback pattern possible
* Here we won't `return` anything from `getPuzzle`
    - Instead of relying on a `return` value we will rely on a `callback function`
* So let's change this:

`app.js`

```
// MORE CODE

const puzzle = getPuzzle();
console.log(puzzle);

// MORE CODE
```

* No longer do we return anything from getPuzzle and expect it to exist
* Instead, we pass a function into getPuzzle()

```
// MORE CODE

getPuzzle(() => {
  console.log(puzzle);
});

// MORE CODE
```

* The callback function will get called back with some information
* We could pass in the puzzle so it will actually print the puzzle
* This is how we can use the callback function

```
// MORE CODE

getPuzzle(puzzle => {
  console.log(puzzle);
});

// MORE CODE
```

## But now we have a question
* How do we set that up?

`request.js`

```
// MORE CODE

const getPuzzle = (callback) => {
  // let data; // they create an empty variable
  // const request = new XMLHttpRequest();
  //
  // request.addEventListener('readystatechange', e => {
  //   if (e.target.readyState === 4 && e.target.status === 200) {
  //     data = JSON.parse(e.target.responseText);
  //     // const data = JSON.parse(e.target.responseText);
  //     // console.log(data);
  //     // return data;
  //   } else if (e.target.readyState === 4) {
  //     console.log('An error has taken place');
  //   }
  // });
  //
  // request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
  // request.send();
  // return data;
};

// MORE CODE
```

* So we pass in the `callback` function as an argument
* `callback` is a function just like any other function (just like getPuzzle)
    - Which means we can execute it whenever we need to
        + And we can pass arguments to it
        + But we are going to call the callback argument function from inside the function block
        + We will call `callback` function with the argument it expects which is puzzle

#
`requests.js`

```
const getPuzzle = callback => {
  callback('Some fake puzzle');
  // let data; // they create an empty variable
  // const request = new XMLHttpRequest();
  //
  // request.addEventListener('readystatechange', e => {
  //   if (e.target.readyState === 4 && e.target.status === 200) {
  //     data = JSON.parse(e.target.responseText);
  //     // const data = JSON.parse(e.target.responseText);
  //     // console.log(data);
  //     // return data;
  //   } else if (e.target.readyState === 4) {
  //     console.log('An error has taken place');
  //   }
  // });
  //
  // request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
  // request.send();
  // return data;
};
```

* Run it and you'll see `Some fake puzzle` prints from `app.js` in the client console from line 16 which is this line:

`app.js`

![line printing](https://i.imgur.com/j8jGXxo.png)

* This isn't that great because we could have solved this problem using a return value but now we can integrate the callback pattern into the code down below

## Let's do that and integrate our XHR request
* We'll turn this code:

`requests.js`

```
const getPuzzle = callback => {
  callback('Some fake puzzle');
  // let data; // they create an empty variable
  // const request = new XMLHttpRequest();
  //
  // request.addEventListener('readystatechange', e => {
  //   if (e.target.readyState === 4 && e.target.status === 200) {
  //     data = JSON.parse(e.target.responseText);
  //     // const data = JSON.parse(e.target.responseText);
  //     // console.log(data);
  //     // return data;
  //   } else if (e.target.readyState === 4) {
  //     console.log('An error has taken place');
  //   }
  // });
  //
  // request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
  // request.send();
  // return data;
};
```

* To this code:
    - We remove:
        + `callback('Some fake puzzle');`
        + `// let data; // they create an empty variable`
        + `// return data;`

```
const getPuzzle = callback => {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText); // modify this line
    } else if (e.target.readyState === 4) {
      console.log('An error has taken place');
    }
  });

  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
  request.send();
};
```

* Now we don't try to force `return` inside our function, instead we'll call our `callback` function and pass in the data

```
const getPuzzle = callback => {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      callback(data);
    } else if (e.target.readyState === 4) {
      console.log('An error has taken place');
    }
  });

  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
  request.send();
};
```

* Run it and you'll now see we are getting the `puzzle` data!!

## To make our code smaller (and use a common naming convention)
* We'll rename our `callback` function to `cb`

`requests.js`

```
const getPuzzle = cb => { // update this line
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      cb(data); // update this line
    } else if (e.target.readyState === 4) {
      console.log('An error has taken place');
    }
  });

  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
  request.send();
};
```

## We are getting an object
* But we want just our puzzle as a string

`requests.js`

```
// MORE CODE

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      cb(data.puzzle); // update this line
    } else if (e.target.readyState === 4) {
      console.log('An error has taken place');
    }
  });

// MORE CODE
```

* Now we get the string puzzle names we want

## Awesome!
* By taking advantage of nested functions and lexical scope we were able to access the parent scopes callback variable from this function allowing us to respond to the request from `app.js`

![callback function](https://i.imgur.com/N4hU8FH.png)

## Errors - Update on the callback function pattern
* It is common to have 2 arguments
    - 1) any potential error
    - 2) any success data (which in our case here is a puzzle)
* This makes it easy to do one thing if the app crashes (if getPuzzle can't do its job)
* And do another thing if getPuzzle does it's job correctly

`app.js`

* We first check if the first argument exists
    - If it did then something went wrong then we'll use this code `error`
    - If something went right then we use this code `puzzle`
* When we are working with the callback patter we define at most one
    - One of these (error or puzzle) will always be defined but never both and never none
    - Things either went well or they did not go well there is never an alternative where both things happened where we got success and error

```
// MORE CODE

getPuzzle(error, puzzle => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log(puzzle);
  }
});

// MORE CODE
```

## Houston we have a problem!
* Currently our code does not work
* The reason is the first argument we pass the callback is not an error it is the puzzle itself
    - Now in our case there is no error and things went well

`requests.js`

```
// MORE CODE

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      cb(data.puzzle);
    } else if (e.target.readyState === 4) {
      console.log('An error has taken place');
    }
  });

// MORE CODE
```

* Now we need to alter our callback to take into consideration we get an error and alert the user or we get data and show the data
* Here is how we do that

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
```

* See how we call our callback (cb) twice
    - Once we call cb on success
        + But we have the error defined as `undefined` as the first argument
        + And we have the data.puzzle defined as our second argument
    - We call `cb` once on failure
        + We have the error defined as our error string as first argument
        + We have the data `undefined` as second argument
            * Remember `undefined` is the default argument variable and we could leave this off but keeping it make our code more readable

# Now what happens
* Now whether things go well or poorly the callback function `cb` gets executed

## Houston I had a problem
* Forgot a parenthesis 

`app.js`

```
// MORE CODE

getPuzzle((error, puzzle) => { // update this line 
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log(puzzle);
  }
});

// MORE CODE
```

* We see our word puzzle showing up in console.log

## Let's generate an error
`requests.js`

```
// MORE CODE


  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCCount=4');
  request.send();
};

// MORE CODE
```

* And now we get an error in the console `Error: An error has taken place`
* Repace the URL and our callback pattern is all setup

```
// MORE CODE


  request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=4');
  request.send();
};

// MORE CODE
```

* Now the person that calls `getPuzzle` method can get the data or any potential errors that take place
    - Even though the data doesn't live directly inside the getPuzzle function
    - getPuzzle() has to go off and fetch that data first

## Recap
* The big picture goal in this video was create a function that we can call from app.js to get the puzzle
    - I did not want to have all the code for setting up the HTTP request and parsing the data inside `app.js`
    - Instead I wanted to keep `app.js` simpler and abstract the code to another file and access that code just by calling `getPuzzle`
* We originally tried to solve this using `return` by expecting the puzzle to be returned from getPuzzle
    - But we saw that wasn't possible because we had an event listener here:

`requests.js`

```
// MORE CODE

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      cb(undefined, data.puzzle);
    } else if (e.target.readyState === 4) {
      cb('An error has taken place', undefined);
    }
  });

// MORE CODE
```

* The above event listener does not fire until after this function completes
* This means we can not use `return` anywhere inside of this file to solve the problem
* The solution to the above problem was to use the `callback pattern`
* In the `callback pattern` we don't expect anything to be returned from `getPuzzle`, instead we pass in a function and we expect that function to be called with the information when it is actually ready
* In our case we used a standard callback pattern
    - The first argument is a potential error
    - The second argument is your success data
    - Only one of these is ever going to be defined
    - Either things went wrong or things went right
* Now to use this inside `requests.js` all we do is we call `cb` when we have the data
    - We called it providing the second argument when things went right
    - We called it with the first argument when things went wrong
