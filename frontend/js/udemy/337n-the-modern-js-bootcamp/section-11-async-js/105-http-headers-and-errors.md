# HTTP Headers and Errors
## Let's talk abut this function
`app.js`

```
// MORE CODE

window.addEventListener('keypress', function(e) {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  puzzleEl.textContent = game1.puzzle;
  guessesEl.textContent = game1.statusMessage;
});

// MORE CODE
```

* Particularly this function that was passed in:

```
// MORE CODE

function(e) {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  puzzleEl.textContent = game1.puzzle;
  guessesEl.textContent = game1.statusMessage;
};

// MORE CODE
```

* Let's convert it to an arrow function as it should be

```
// MORE CODE

window.addEventListener('keypress', (e) => {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  puzzleEl.textContent = game1.puzzle;
  guessesEl.textContent = game1.statusMessage;
});

// MORE CODE
```

## Run the code
* Let's look at the HTTP request
* I'm going to use Firefox developer tools to analyze the HTTP request

[http request](http://puzzle.mead.io/puzzle)

* In dev tools of browser
* Viewing the `Network` tab of browser tools
* Refresh browser (if you don't see HTTP request)
    - Some of this information is stuff we (the developer) sent up

`app.js`

```
// MORE CODE
request.open('GET', 'http://puzzle.mead.io/puzzle');
request.send();
```

* We set up the GET request (see this in the Method column)
* We see the URL (see in the domain column)
* We see `puzzle` in the `File` column

## What about the `Status` column with `200`
* This is something we never set up
* This is the `Status`
* Every HTTP response comes with a `Status` (aka "Status Code")
    - The Status Code is a numeric value that describes how things went
    - Full HTTP status codes here: https://httpstatuses.com/
    - The Status Codes are for various degrees of succeeding or failing
        + Examples:
            * Maybe the request failed because you used it incorrectly
            * Maybe the request failed because they took it down for maintenance to upgrade it to a better, faster OS
            * The Status Code is big picture way to know if things went good or bad

## When to use Status Code
We need to look at the Status Code value when we use the `response` here:

```
// MORE CODE

request.addEventListener('readystatechange', e => {
  if (e.target.readyState === 4) {
    const data = JSON.parse(e.target.responseText);
    console.log(data);
  }
});

// MORE CODE
```

## Why?
* We might not have `target.responseText` if things went bad
* We will only get a new puzzle if the request succeeded as expected

## Lots of reason why things could have gone wrong
* Could be server
* You could have lost connectivity
* You could have a problem with your request
* This means it is not enough to ask if things are complete

### We only want to parse the responseText when the request is complete and the response is considered a successful
* We can access the Status Code on e.target just like we can on `responseText`

### View the URL of the local hangman game
* Let's view `e.target`

`app.js`

```
// MORE CODE

request.addEventListener('readystatechange', e => {
  if (e.target.readyState === 4) {
    console.log(e.target);
    const data = JSON.parse(e.target.responseText);
    console.log(data);
  }
});

// MORE CODE
```

* You will see the XMLHttpRequest object
    - Inside you will see status: 200
    - So we can get that with:

```
// MORE CODE

request.addEventListener('readystatechange', e => {
  if (e.target.readyState === 4) {
    console.log(e.target.status); // 200
    const data = JSON.parse(e.target.responseText);
    console.log(data);
  }
});

// MORE CODE
```

## We just now will check for a status value of 200 in our condition
```
// MORE CODE

request.addEventListener('readystatechange', e => {
  if (e.target.readyState === 4 && e.target.status === 200) {
    const data = JSON.parse(e.target.responseText);
    console.log(data);
  }
});

// MORE CODE
```

* That works but what happens if we want to simulate an error

## Simulate an error
`http://puzzle.mead.io/puzzle?key=value` 

* On the server our code is looking at the URL and in particular a query string on the URL
  - So we add a key/value pair query string that will look like this:
    + URL/key=value
    + We can't use any key
    + The key that the server is looking for is `wordCount=2` (this will only generate puzzles that have 2 words in them)
      * `http://puzzle.mead.io/puzzle?wordCount=3`
        - Gives you:

```
{
  "puzzle": "Desktop Aircraft Model"
}
```

* `wordCount=2` would give you 2 words back

### Let's make an error
To get an error I just intentionally misspell `wordCount` as `wordCCount`

```
http://puzzle.mead.io/puzzle?wordCCount=3
```

* That will give you this error:

```
// 20200421232019
// http://puzzle.mead.io/puzzle?wordCCount=3

{
  "error": "Invalid query parameter used."
}
```

* View the Network tab in Chrome
* You'll see at GET `400` document error
  - Look that up and you'll see it is a `BAD REQUEST`
  - https://httpstatuses.com/400
* If you click on the red error link and the `Response` tab you'll see the same error displayed in browser

```
// MORE CODE

request.addEventListener('readystatechange', e => {
  if (e.target.readyState === 4 && e.target.status === 200) {
    const data = JSON.parse(e.target.responseText);
    console.log(data);
  } else if (e.target.readyState === 4) {
    console.log('An error has taken place');
  }
});

request.open('GET', 'http://puzzle.mead.io/puzzle?key=value');
request.send();
```

* We add an `else if` and check to make sure the request is complete `e.target.readyState === 4`
* We now are not checking the URL of the server passing the value we are checking our app URL and we add breaking code to the server URL we are requesting with AJAX
  - We pass our server a bad URL with a format it is not expecting
  - If we do not have a complete request and successful we get an error
  - We don't just use an `else` because that would run for the other readyState values 1,2 and 3 where the `request` hasn't actually finished

## Run the app
* You will see `An error has taken place` in the console

### 4 words
* Let's set our game to always be 4 words

```
// MORE CODE

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

// MORE CODE
```

* The error goes away and we see 4 words in our puzzle object (in client console)

## List of all available server status codes
* [url of all status codes](https://httpstatuses.com/)

### segments
* 1xx
* 2xx
* 3xx
* 4xx
* 5xx (Server Error)

## What do these numbers mean?
* Each group of server codes has a different meaning
  - 5xx
    + Various Server errors that could happen
    + We could use a more generic "Internal Server Error"
    + We could say there's something about the service being unavailable
    + There are other 5xx server status code errors that allow us to be more specific as to why we are getting a server status error
  - 4xx
    + These are Client errors
    + 400 Bad Request (what we just got in our app) - we misused the URL that was not supported by the service
    + 404 (common) Resource Not Found (You see this when you go to a URL that doesnt' exist)

## 3xx Redirection
* A web service like Bitly that allows you to create shortened links that redirect somewhere else
  - You could use the 301 status code to get that done

## 2xx Success
* 201 Created (some sort of resource was created based off of your request)

## 1xx Informational (rarely used and API don't usually implement them at all)


### Most common status messages
* 2xx, 4xx and sometimes the 5xx range
  - Rarely 3xx and almost never in 1xx

### Click on the status codes to see what they mean

## HTTP Messages
* [MDN docs for HTTP Messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)
* Let's explore what information is getting sent back and forth
* What exactly makes up an HTTP request
  - At the end of the day "it's really just a bunch of text"

![HTTP request/response](https://i.imgur.com/QaPxo1V.png)

* Above is an exact representation of the HTTP `request` **that is being made** and the `response` **that gets sent back** 

## Let's analyze
* There are 4 parts to the request and the response

### Requests
1. The `start-line` is outlined in red (in above screenshot)
  * This is where we can see our METHOD (In our code we are using GET)
  * We also see the Protocol `HTTP/1.1`
2. We have our headers
  * Just a list of key/value pairs
  * You'll see the `Host` and our URL
  * There are a ton of different headers you can set
  * You can create your own custom headers `Cool-Guy: Phil`
  * When you work with headers it is typically API specific
  * If you work with an API it will tell you if it needs you to set any headers or not (in most cases the answer is "no")
3. We have our empty line - just separates the headers from the body
4. Then we have our body

### Responses
1. In the response start-line the protocol comes first and after that comes the status code 
  * The response is going to tell you how things went via the start-line
2. We have our headers
  * `Server` tells you what type of server you are working with
  * `Content-Type` tells you what type of data is coming back
    - It is HTML, is it a JavaScript file, it is XML, is it JSON?
    - By setting the header the response can describe to the requester exactly what is coming back in the body
3. Empty line - just separates the headers from the body
4. The body will have what we are sending back
    - Our Content-Type was JSON and that's what we get back in the Response body

* All of the Server Request Response steps 1 - 4 is never done in our code, it is extracted and completed behind the scenes
* We just play around with some methods on XMLHttpRequest and it does all the heavy lifting for us making sure to correctly generate the request and correct parse the response
