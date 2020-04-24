# HTTP requests from JavaScript
* We'll make our first HTTP request for 3rd party data
    - We'll find out how to get data into our app that doesn't come from our code itself and doesn't come from the user
* We'll find out a way to generate a random phrase for our hangman puzzle
    - And this will replace the static text that is hard coded in `app.js`

`app.js`

```
const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
const game1 = new Hangman('Cat Power', 2); // hard coded here!

// MORE CODE
```

## How do we set up communication between our app and our server?
* We need to generate an HTTP request

### What is HTTP?
`Hypertext Transfer Protocol` - is a response request protocol

#### Say what?
* Meaning that we the developer in the browser:

##### request/response
1. We issue some sort of request
2. This goes off to some 3rd party server
3. That server does some work
4. And it gives us back a response

## The request
* Describes what we, the person making the request, hope to do
    - For hangman - what do we want to do?
        + We want to generate a new word or phrase

## The response
* What was actually done
    - For hangman - What was done?
        + We get back that word or phrase
            * Behind the scenes our server code will generate a random word or phrase and it will send that word/phrace back to our app so we can add it into our game

## Our app is already using the HTTP protocol
* But these requests are just being initiated behind the scenes
    - example:
        + Whenever you visit a page by typing something in the URL and hitting enter
            * That initiates an HTTP request
        + Whenever we load in a script with the `script` tag that also initiates an HTTP request
        + And we can view these HTTP requests inside of the browser

## How can we view HTTP requests in our browser?
* Open the Chrome dev tools and click on the `Network` tab
* If the network tab is empty you may need to refresh the page

### Run your app so you will see HTTP requests
`$ live-server hangman`

* You see your hangman app running

#### The Network tab
![network tab](https://i.imgur.com/q9TllLt.png)

* We see 4 things showing up in Chrome
* You may see more depending on what browser extensions you have installed

### The first one
* `127.0.0.1/` is the page we actually requested
    - The method is GET because we are `getting` the HTML document back
    - The `Type` is `document` because we are getting the HTML document back
    - Firefox has more info in the Network tab

![firefox network tab](https://i.imgur.com/gprXtZd.png)

* We see the File is `/` (our home page on our live-server)
* We see the cause is `document`
* We see `html` is **Type**
* We see the Domain info
* We see the size
* We see the `Method` GET (we are 'getting' this resource)
* We see the `Status` 200 (success)

## Viewing details on the request and response
* Click the first link `/` in The Firefox Network console
* And you will get details about the request and the response

![request/response details](https://i.imgur.com/ZRCMiI8.png)

* Click on the `Response` tab and you will see our HTML document
    - This is the document defined in `index.html`

![html response](https://i.imgur.com/w2gfcfG.png)

* Our response is slightly different than our actual `index.html` code
* This extra code is code live-server injected into our `index.html`

`live-server injected script`

```
// MORE CODE

    <!-- Code injected by live-server -->
<script type="text/javascript">
    // <![CDATA[  <-- For SVG support
    if ('WebSocket' in window) {
        (function() {
            function refreshCSS() {
                var sheets = [].slice.call(document.getElementsByTagName("link"));
                var head = document.getElementsByTagName("head")[0];
                for (var i = 0; i < sheets.length; ++i) {
                    var elem = sheets[i];
                    head.removeChild(elem);
                    var rel = elem.rel;
                    if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                        var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                        elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                    }
                    head.appendChild(elem);
                }
            }
            var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
            var address = protocol + window.location.host + window.location.pathname + '/ws';
            var socket = new WebSocket(address);
            socket.onmessage = function(msg) {
                if (msg.data == 'reload') window.location.reload();
                else if (msg.data == 'refreshcss') refreshCSS();
            };
            console.log('Live reload enabled.');
        })();
    }
    // ]]>
</script>
// MORE CODE
```

* This is the code that will enable us to automatically refresh the browser whenever we change some code
* But we also see the HTML code we set up too

## Other requests
* You will also see 2 other request for our 2 JavaScript files
    - `hangman.js`
    - `app.js`
* If you click the `Response` tab for each of those you will see our actual JavaScript documents
* **note** All of these are received by the browser via HTTP requests
* **note** the last one is a `websocket` request
    - websockets allow us to communicate between 2 things in real time and this is used to allow the browser to automatically refresh whenever we change some data in our code
    - We won't work with `ws` and won't touch it
    - It is just coming up because we used `live-server` as our local development server

## What do we need to do now?
* We need to initiate a request from our JavaScript
* And we want to do something with the response with the JavaScript too
    - Because at the end of the day when we get that random word/phrase back, we want to pass it to `new Hangman()` so we can start a game with the randomly generated word

### What we will not do
* We are not going to make requests that send things back like HTML or JavaScript files

### Instead we want JSON back!
* Instead we are going to make HTTP requests that allow us to get JSON back
* We can then parse that JSON into a JavaScript object to extract the data off of it
* We will use a URL that sends back JSON contains the randomly generated word

#### Our server endpoint
* This is our endpoint - http://puzzle.mead.io/puzzle
* If you hit it (paste URL in browser and press enter)
    - You will see this in the browser
        + `{"puzzle":"Bouquet Of Freshly Cut Flowers"}`
        + If you are using Chrome you will just see RAW data
        + Unless you add a JSON view Chrome extension

![chrome JSON viewer](https://i.imgur.com/2jakcol.png)

## And in Firefox
* You can see tabs where you can view the JSON in key value pairs (friendly UI version)
* You can click Raw Data tab to see

![firefox](https://i.imgur.com/WHN9JfP.png)

## How do we parse this JSON
* We can just use `JSON.parse()` to get a JavaScript object
* Then we can access its `puzzle` property to get the `Bouquet Of Freshly Cut Flowers` value
    - which is one of the randomly generated phrases
    - If I hit refresh in the browser I'll get another randomly generated phrase/word

## Our next big challege
1. Now we need to figure out how to make this request not by typing something into the browser but by running some code from JavaScript
2. That code from JavaScript will allow us to set up the request
    a) Requesting a new random puzzle
    b) And then inside of the `response` we'll be able to get that **puzzle**
    c) And create a new game

## First let's explore the code needed
* We won't work with our hangman app at first
* We just want to explore the syntax

## How do we make an HTTP request?
1. We need to initialize a request using a constructor function provided to us by the browser

`const request = new XMLHttpRequest()`

### a little about XML and XMLHttpRequest()
* The spelling of `XMLHttpRequest` is important (JavaScript is case sensitive)
* `request` is the request we are going to setup and configure to actually go off to that URL and get that information
* We use the `new` operator with the **constructor** function
* XMLHttpRequest() does not take any arguments

### What is XML?
* XML was very popular back in the day
* XML is much less popular these days
* XML was a different way to structure data that you wanted to transfer
* In our case we are transferring JSON information
    - We transfer JSON information
    - We store JSON information in localStorage
    - JSON information is a great way to represent some object as a string
    - XML did the exact same thing but it just had a different (more verbose) syntax for getting that done, since JSON had a less verbose syntax, it tranferred data taking up less space than XML and in the end it one the battle of being the standard for transferring data across HTTP
    - XML looked more like HTML than a JavaScript object
* The name `XMLHttpRequest` is not relevant
    - We can use this constructor function `new XMLHttpRequest()` to transfer any information we want (not just XML)


#### We need to use a few methods on `request`
* We will need to use these methods on **request** to set things up
    - examples
        + We need to provide the URL endpoint where the JSON lives
        + We'll need to provide this inside our code somewhere
    - `request.open()`
        + This will start to initialize our request
        + This is where we configure 2 important pieces of information
            a. The URL
            b. The HTTP method
                * HTTP supports various methods
                    - When you type a URL in the browser this creates a GET request (so it uses the GET HTTP method)

![example of GET method](https://i.imgur.com/K4iNUog.png)

* GET is the most common HTTP method for getting information
* We will be setting this up in our example

```
const request = new XMLHttpRequest()
request.open('GET', 'http://puzzle.mead.io/puzzle');
```

## We also have to use `request.send()` to send our request
* We send off the request and it will initiate the process
* **IMPORTANT** The process doesn't take place right away

### It takes time!
1. It takes a bit of time for you to connect with that server
2. It takes time for the server to do what its supposed to do (in our case, generate a random word/phrase)
3. And it takes time to get its response back to you

* We can see the time it takes in the `Network` console tab

![timeline of assets loading](https://i.imgur.com/1PivZvL.png)

* Timeline in Network tab
    - The timeline is in milliseconds (happens really fast)
    - It shows when requests are started, when requests are made and how long they actually take to get done

## This time it takes is very important to us
* Yes we are making the request
* And we are getting a response back
* But we are not doing anything with that `response` we get back
* We need to add an `event listener` that is going to fire when we actually have the data 

```
// MORE CODE

const request = new XMLHttpRequest();
request.open('GET', 'http://puzzle.mead.io/puzzle');
request.send();

// MORE CODE
```

* Now view the Network tab and you'll see a new XHR request

![see our XHR request](https://i.imgur.com/jFFj8pQ.png)

* And if you click on the Response tab in the Network tab you will see our Response (Response Payload) actually has our JSON with the key `puzzle` and the value `Dreamline`

## Now we need to add an event listener
* That event listener is where we can access that information and we'll be able to do something meaningful with it
    - Like print to the screen in this case
    - Later we'll be passing this information to our hangman game to start the game

### readystatechange
* This is the event listener we are looking for
* **Note** the spelling (it is all lowercase)
    - We'll pass a function as the second argument and we'll have access to the event object
    - And now we need to do something when the event fires

#### XMLHttpRequest docs
* [docs for XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
    - You will see everything we talked about
        + [open:](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open)
        + You will see the constructor function in the sidebar
        + [send](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send)

##### readyState
* [docs for readyState](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)
* `readyState` is a property of XMLHttpRequest and when it changes our event handler fires
* You will see in the docs there are 5 states
    - 0 UNSENT (here we see open() hasn't been called)
    - 1 OPENED (here open() has been called)
    - 2 HEADERS_RECEIVED (here we have used `send()`)
    - 3 LOADING (here we are in the process of getting the response back)
    - 4 DONE (here we get the response back)
* To figure out what state we're in we just check for these values
* The only State we will check for is `4`
    - `4` is when we have all our data back in its complete form
    - Inside of our event listener our `readystatechange` will fire 5 different times (1 time for each readystatechange)
    - We just add an `if` condition checking for `4`

#
```
const request = new XMLHttpRequest();

request.addEventListener('readystatechange', e => {
  if (e.target.readyState === 4) {
    console.log(e.target);
  }
});

request.open('GET', 'http://puzzle.mead.io/puzzle');
request.send();
```

## Question:
* We read code from top to bottom so why is it that:

1. We initialized our HTTP `request`
2. And then we added the event handler function to the instance of our XMLHttpRequest
3. Before using the `open()` and `send()` methods

## Answer
* Because you need to tell the `XMLHttpRequest` to listen to an event before the event fires otherwise you get a race condition
* If you do it after then you might be adding the listener after the event has already transpired

## Open the console and you'll see we logged
* the xhr (XMLHttpRequest) object
    - We expand it in the console

![lots of stuff in the xhr object](https://i.imgur.com/8LWZjTy.png)

* We care about `responseText`
    - `responseText: "{"puzzle":"Time Capsule"}"`
        + Take note that our object is a string

## responseText
* Contains our JSON response
* This is what we'll use to extract the new puzzle to print
* But we need to parse this string as JSON

### We parse our JSON with JSON.parse()
```
const request = new XMLHttpRequest();

request.addEventListener('readystatechange', e => {
  if (e.target.readyState === 4) {
    const data = JSON.parse(e.target.responseText);
    console.log(data);
  }
});

request.open('GET', 'http://puzzle.mead.io/puzzle');
request.send();
```

* View in console and you'll see our JavaScript object

```
{puzzle: "Limestone Floor"}
```

* Every time you refresh the page we get a new word/phrase

## Summary
* Using this little bit of code our app will now be able to pull information from some other server (a server that lives out there in the world)
* It could be a server that we created using a back end language (like python, java, Node.js)
    - Or it could be a server that someone else set up
        + Companies like Google, Facebook and Twitter, all have JSON APIs you can access to pull information into your app

## Next
* What happens if we don't get the data we expect?
* We'll learn how to set up some error handling 
