# http-parser
* How we build HTTP requests and responses?
* How do we parse them?
    - Break them up into their pieces and then use that information
* There is a program embedded inside of NodeJS that does this for us

## http-parser
[online documentation](https://github.com/nodejs/http-parser)

* This is a C program that is embedded in Node
* But it is a separate program that could be used elsewhere
* What does it do?
    - It parses requests and responses
    - It takes that information (usually text and other binary data) and then parses it (breaks it up and looks at it and knows what to do with it)
        + Breaks apart
            * Headers (name value pairs)
            * The version, the body of the message, the status
* It can look at a HTTP request and response and break it apart for us and then we can have those pieces of data as separate pieces of data and then make decisions with them
* The http-parser is wrapped inside of the JavaScript side of Node Core

## `node/lib/http.js`
* I would require this file to get the abilities of working with http request and responses
* There is also `https.js` for dealing with secure and encrypted requests and responses
* Inside
    - It uses the EventEmitter
    - Uses a bunch of modules

```js
onst agent = require('_http_agent');
const client = require('_http_client');
const common = require('_http_common');
const incoming = require('_http_incoming');
const outgoing = require('_http_outgoing');
const server = require('_http_server');
```

And if you open `node/lib/_http_server.js`

`const HTTPParser = process.binding('http_parser').HTTPParser;`

* You'll see it wraps the HTTP parser (From the C/C+ side of the core)
* Scroll down and you'll see all the status codes that could come back from an HTTP response
* We have the ability to write a header

`ServerResponse.prototype.writeHeader = ServerResponse.prototype.writeHead;`

* We have a status line

`  var statusLine = 'HTTP/1.1 ' + statusCode + ' ' + this.statusMessage + CRLF;`

* It is building that HTTP response format
* So we can create a server that will listen for data coming, being sent to our web server and being passed to the port that we say NodeJS should listen on

`http.js`

* There is a method that enables us to create a server

```js
function createServer(requestListener) {
  return new Server(requestListener);
}
```

* It has a parameter that is a listener (a function) that will be invoked whenever information is sent to me
* So when an HTTP request shows up, then run this function
    - Then that function will handle what it should do with that request
    - It will also give that function the ability to respond to the request
    - That's what servers do, they accept requests and it gives a response
    - But how you want to deal with that request and response will be handled by your own function that you can give to the HTTP server object and then it will give you what you need to send and receive the HTTP requests and responses and then do things as a result of them
* We have all the pieces we need
    - We can connect to the Internet
    - We can send and receive requests and send a response

## Next
Build our own web server
