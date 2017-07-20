# Building a Web Server in Node
`app.js`

```js
const http = require('http');

http.createServer(function() {
  // this turns out to be an Event Listener
});
```

* Since it is an Event Listener, when the server object emits a particular event, this function will be called

`node/lib/_http_server.js`

![emit request](https://i.imgur.com/Gjuo3Mu.png)

* Above line will invoke when we give the function when a request occurs and it will pass to the function that I give it a request object (req) and a response object (res) (this is the stream where I can stream the response back)

```js
const http = require('http');

http.createServer(function(req, res) {
  

});
```

* We need to build a response
* An HTTP response starts with what's in the `Head`
    - `res.writeHead(STATUS_CODE, SPECIFY_HEADERS_HERE)`
    - Headers are name/value pairs
        + Easy way to do that is to use an object because objects are name/value pairs
        + **note** A JavaScript object doesn't require that the name be in quotes, it is allowed
            * Some of the HTTP Header names are not JavaScript valid variable names, so not using quotes here might give me an error but with quotes JavaScript will let me get away with those names
* `/n` is a carriage return (just means a new line and a good and proper way to end your data)

```js
const http = require('http');

http.createServer(function(req, res) {

  // this turns out to be an Event Listener
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world\n');
});
```

* We just build a response

## We are missing the port
How do we tell node which port to map to?

```js
const http = require('http');

http.createServer(function(req, res) {

  // this turns out to be an Event Listener
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world\n');
}).listen(1337);
```

* After I give .createServer() a function, it itself creates an object and on that createServer object I have a `.listen()` event that I have access to
* **remember** listen is just a metaphor for **"when information comes to the server, heres the port that if its sent to that port, via that port portion of the address, then send it to me please (aka "this program that's running)"**
* I also pass as the second parameter the standard internal IP address `127.0.0.1` for the local system (popularly referred to as **localhost**)
    - If I type `localhost` into my browser it will translate to `127.0.0.1`
    - `localhost:1337`
    - `127.0.0.1:1337` - when the browser makes this request than this process will receive that request and the HTTP parser wrapped up inside that JavaScript code will give me that request (req) and then I can send back the response (res)
* That's it
    - This is the typical entry Node Server code you will see
    - But hopefully by now you understand everything that goes into this

### We understand
* We understand the `require()` function and getting it from NodeJS core
* We understand `http.createServer()` is creating an object and giving a callback
* The callback is then turned into an Event Listener (Using the EventEmitter code inside NodeJS)
* And that I have an HTTP request (req) and response (res) which has some methods which enables me to send some information back down the stream
    - stuff like
        + the status
        + the headers
            * information the browser will use to interpret what I'm sending and the body of the data itself that I'm sending
    - And NodeJS will take all this information and create a properly formatted HTTP response that the browser can then understand and is programmed to do things with
* The `listen()` for the **port** and **IP** will make sure that that request from the browser is routed properly to this code

## Run our server!
`$ node app.js`

* It will just run and just sit there waiting
* The program just continues to run
* Our code told it that when it runs to just sit there and wait for a **request**
    - So the node program doesn't stop (it doesn't exit out of the program)

## We need to give it a request
* The best way is with our Internet browser
* It is designed to build HTTP requests and understand HTTP responses
* Enter this in the browser address bar

![ip and port in browser](https://i.imgur.com/U2DmYWz.png)

* And that will give us:

![the response from the server](https://i.imgur.com/BGBcM7J.png)

* `localhost` means my local server
    - Normally it would just be a **domain name** pointing at some server where I push this code
    - But in this case I am pointing at my own machine
        + So the **client** and the **server** are the same computer
        + But the idea is the same - look for a program that is listening on port 1337 and give it the HTTP request that the browser is going to make when I hit enter after typing in the IP and port
        + And then my node code will be run because the request event will be emitted, the server is listening and I gave it that function which will be invoked which will read the request and allow me to write the response
        + And then a HTTP response will be build and then given back to the browser
        + And then the browser will go on and do what it want to with it (whatever it's been programmed to do with that particular type of response)
        + And then after hitting enter we get `Hello world`

## What just happened
* Open your Chrome developer tools
* Switch to the network tab
* `cmd` + `r` to refresh the browser
* You will see the HTTP request and response

![chrome http req and response](https://i.imgur.com/xQ1YQuV.png)

* You can ignore the favicon.ico
    - The browser is always asking for the icon that shows up in the tab or when you bookmark it on your phone or tablet
* Click on the localhost request and response

![localhost](https://i.imgur.com/bri0Ivl.png)

### Headers
* Under Headers you will see:
    - Request URL:http://localhost:1337/ (the URL we entered was converted to that internal IP address and port)
* We see the **status code** of `200` which the browser knows is everything is OK

### Response
```
HTTP/1.1 200 OK
Content-Type: text/plain
Date: Wed, 19 Jul 2017 21:20:39 GMT
Connection: keep-alive
Transfer-Encoding: chunked
```

* We see the `text/plain` content type that we specified
* And other things that NodeJS did for me

### Browser Headers
```
GET / HTTP/1.1
Host: localhost:1337
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
DNT: 1
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.8,it;q=0.6,nb;q=0.4,la;q=0.2
Cookie: _ga=GA1.1.2081415997.1500099376; racecar=s%3AduME3mUN8r5PYz9kjxGLonUDfgcE2-Rs.On09YIf85fLgWvYQ7h4jd2QfoT5BNj7bQVNvdhiHZEs
```

* Above are the headers that the browser created for its **request** that was sent to Node
* And these are things that Node is programmed to understand
* Since we sent back a `text/plain` as our `Content-Type` the browser was programmed to just output text in the browser even though there is no HTML, so it won't try to figure out what to do with HTML stuff because it knows it is just plain/text

## Let's step through this
* `ctrl` + `c` to cancel node program that is still running

### Open Visual Studio
* Set a breakpoint at `writeHead()` line in `app.js`
* And we will run this in the debugger
* In browser refresh the browser on `localhost:1337` and that should trigger our breakpoint inside VS
* This is nice because if I had JavaScript we could now put a breakpoint in my browser and then I could watch it go over to a breakpoint on the server (which is a great way to debug)

### In VS

#### req object

![req object](https://i.imgur.com/weySwRR.png)

* Scroll down and you'll see it is writable
    - It is a writable stream
* Open up the `req` object and you will see a bunch of stuff it it
    - You will see events
    - Scroll down and you'll see headers
        + You will see all the `headers` that came from the browser
        + I could programmatically type: `req.headers.user-agent` and get access to that data
            * `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
* You'll see we have access to `socket`
* And we have access to `url` (which currently is `/`)
    - This will be useful later

### Step through
* You will see we first get localhost and then favicon and after we step through them all we will get `Hello world` as our response shown in the browser

#### We also have a response object
* This is a server response object
* It has a bunch of various methods on it I can use

![res object methods](https://i.imgur.com/oiP3mnI.png)

### Takeaway
* With just this small bit of code I was able to build a working web server that accepts HTTP requests and gives me a way to look at them and build an HTTP response and have something show up in the browser
* So much is going on here but we use so little code

