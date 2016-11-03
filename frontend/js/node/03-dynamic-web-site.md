# HTTP Servers

## What is a web browser?
an application that is used to download and render HTML, CSS and execute any client side JavaScript.

* enter domain browser and it sends info to a server on the internet that has that domain name assigned to it ( i.e. example.com)
    - part of info sent to server is URL
        + URL has path to file
            * http://example.com/index.html
        + the software on server (like Apache or nginex)
            * configured to look for certain directory on server and look for file
                - read its contents
                - send it back to the browser

## Protocol
The way the server and browser agree to communicate

### HTTP
The protocol the server and browser use
Hypertext Transfer Protocol

Software on server can be referred to as an `HTTP Server` and the browser as an `HTTP Client`

So what if I want to run PHP on my server?
the HTTP Server would need a PHP Interpreter to run the code to generate dynamic content on the page and send it

How does node.js fit in to this equation?

* node.js allows you to create your own http server programmatically

we will do the following all in node.js
1. create http server
2. serving files
3. generating dynamic content 

**cool random fact**
port 1337 - (hacker sp33k for leet, or elite) Originating from 31337 "eleet", the UDP port used by Dead Cow Cult, a hacker group, to access Windows 95 using Back Orifice, a notorious hacking program.

## [node.js website](https://nodejs.org/en/)
Note the documentation has been updated to ES6

## Create Web Server

`app.js`

```js
// 1. Create a web server

var http = require( 'http' );
http.createServer( function( request, response ) {
  response.writeHead( 200, { 'Content-Type': 'text/plain' } );
  response.end( 'Hello World\n' );
} ).listen( 1337, '127.0.0.1' );
console.log( 'Server running at http://127.0.0.1:1337/' );
```

If you run

```
$ node app.js
```

You'll see this:

![output](https://i.imgur.com/sSBC3Dr.png)

Which means the server is running.

And if you visit: http://127.0.0.1:1337/

You will see `Hello World` in the browser. Congrats. You just created your first node.js server.

Can also use http://localhost:1337

But if you add on to the URL it will just point to Hello World
* every route points to same place
* we need to figure out how to handle different URLs

`app.js` code fragment

```js
  response.writeHead( 200, { 'Content-Type': 'text/plain' } );
  response.write( 'before the end\n' );
  response.end( 'Hello World\n' );
  response.write( 'after teh end\n' );
```

## Killing Node
If you are running node on one port and try to listen to another node on same port you will get an error.

![error you will see](https://i.imgur.com/hb2KDnz.png)

You need to kill node.

### Find out which process is running?

* ps - stands for processes

```
$ ps aux
```

![output](https://i.imgur.com/SlZByKa.png)

You'll see the PID (process ID) is 16578 (obviously your PID will be different)

To kill that process type (use your PID):

```
$ kill -9 16578
```

* you can also kill the process by typing `ctrl` + `c` twice

## what happened to the write after the end?
* will only show the before and we won't see after because the response ended

## The End is the End

```js
var http = require( 'http' );
http.createServer( function( request, response ) {
  response.writeHead( 200, { 'Content-Type': 'text/plain' } );
  setInterval( function() {
    response.write( new Date() + '\n' );
  }, 1000 );
  response.end( 'Hello World\n' );
} ).listen( 1337, '127.0.0.1' );
console.log( 'Server running at http://127.0.0.1:1337/' );
```

* the interval above won't run because it takes 1 second and our end ended before it, so if we remove the response.end(); then it will continually run. Chrome also waits (about 20 seconds!) to see if it will get header info but when it doesn't, it just starts writing to the page... forever.

### Node.js APIs Used
* [http.createServer](https://nodejs.org/api/http.html#http_http_createserver_requestlistener)
* [response.writeHead](https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers)
* [response.write](https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback)
* [response.end](https://nodejs.org/api/http.html#http_response_end_data_encoding_callback)
* [setInterval](https://nodejs.org/api/timers.html#timers_setinterval_callback_delay_arg)

## Question

What is the output from the following code?

```js
var http = require("http");
var i = 5;

http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});

  setInterval(function(){
    response.write(i + "\n");
    if(i === 0) {
      response.end("Blast off\n");
    }
    i--;
  }, 1000);
}).listen(3000);
```

### Question

What is the output from the following code?

```js
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});

  setTimeout(function(){
    response.end('Goodbye World\n');
  }, 1000);
  
  response.write("Hello World\n");
}).listen(3000);

```

## Home Route
home route working
but when you go to something other than '/', you will get a `508 Bad Gateway` timeout.

```js
var http = require( 'http' );
http.createServer( function( request, response ) {
  homeRoute( request, response );
} ).listen( 1337, '127.0.0.1' );
console.log( 'Server running at http://127.0.0.1:1337/' );


// 2. Handle HTTP route GET / and POST / i.e Home
function homeRoute( request, response ) {
  // if url == "/" && GET
  if ( request.url === '/' ) {
    // >>>> show search
    response.writeHead( 200, { 'Content-Type': 'text/plain' } );
    response.write( 'Header\n' );
    response.write( 'Search\n' );
    response.end( 'Footer\n' );
    // if url == "/" && POST
    // >>>> redirect to /:username
  }

}
```

## User Route
```js
// 3. Handle HTTP route GET /:username i.e. /philiphowley2
function userRoute( request, response ) {
  // if url == "/..."
  var username = request.url.replace( '/', '' );
  if ( username.length > 0 ) {
    response.writeHead( 200, { 'Content-Type': 'text/plain' } );
    response.write( 'Header\n' );
    response.write( username + '\n' );
    response.end( 'Footer\n' );
  }
  // >>>> get json from treehouse
  // on "end"
  // >>>> show profile
  // on "error"
  // >>>> show error
}
```

broke up routes into their own route.js

```js
// Handle HTTP route GET / and POST / i.e Home
function home( request, response ) {
  // if url == "/" && GET
  if ( request.url === '/' ) {
    // >>>> show search
    response.writeHead( 200, { 'Content-Type': 'text/plain' } );
    response.write( 'Header\n' );
    response.write( 'Search\n' );
    response.end( 'Footer\n' );
    // if url == "/" && POST
    // >>>> redirect to /:username
  }

}

// Handle HTTP route GET /:username i.e. /philiphowley2
function user( request, response ) {
  // if url == "/..."
  var username = request.url.replace( '/', '' );
  if ( username.length > 0 ) {
    response.writeHead( 200, { 'Content-Type': 'text/plain' } );
    response.write( 'Header\n' );
    response.write( username + '\n' );
    response.end( 'Footer\n' );
  }
  // >>>> get json from treehouse
  // on "end"
  // >>>> show profile
  // on "error"
  // >>>> show error
}

module.exports.home = home;
module.exports.user = user;
```

updated `app.js`

```js
var router = require( './router.js' );
// Problem: We need a simple way to look at a user's badge count and JavaScript point froma web browser
// Solution: Use Node.js to perform the profile look ups and serve our template via HTTP

// 1. Create a web server

var http = require( 'http' );
http.createServer( function( request, response ) {
  router.home( request, response );
  router.user( request, response );
} ).listen( 1337, '127.0.0.1' );
console.log( 'Server running at http://127.0.0.1:1337/' );


// Function that handles the reading of files and merge in value
// read from file and get a string
// merge values into string
```

## Populating User Information


## Additional Routes example
3 pages with 3 routes

`routes.js`

```js
function root(request, response) {
    if(request.url == "/") {
        response.writeHead(200, {'Content-type': "text/plain"});
        response.end("Home\n");
    }
}

function about(request, response) {
  if (request.url == '/about') {
    response.writeHead(200, {'Content-type': 'text/plain'});
    response.end('About\n');
  }
}

function contact(request, response) {
    if(request.url == "/contact") {
        response.writeHead(200, {'Content-type': "text/plain"});
        response.end("Contact\n");
    }
}

module.exports.root = root;
module.exports.about = about;
module.exports.contact = contact;
```

`index.js`

```js
var http = require("http");
var routes = require("./routes.js");

http.createServer(function(request, response){
    routes.root(request, response);
    routes.about(request, response);
    routes.contact(request, response);
}).listen(3000, '127.0.0.1');
```

## Making our `Views` DRY
Don't Repeat Yourself

## Useful links
* [File System](https://nodejs.org/api/fs.html)
* [fs.readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback)
* [fs.readFileSync](https://nodejs.org/api/fs.html#fs_fs_readfilesync_filename_options)
* [response.write](https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback)
* [require](https://nodejs.org/api/modules.html#modules_modules)
* [module.exports](https://nodejs.org/api/modules.html#modules_module_exports)

## when does it end

```js
 response.end();
```

We use the above line to inform the browser that we are all done and no other information is coming down the pipe.

## Quiz Question
**question**: Pick the blocking version of a method you can use to read a file?

**answer**: Blocking means Node.js waits for the file to be loaded before executing further code.

## Creating Basic Template Engine
## Binding Data

## Sending Content Type Headers in Node.js

### Headers - values hidden from user
* can be progromattically created by client and the server

#### Content Type
is one such header that the server sends
* this instructs the browser how to handle the string of information in the response
    - the browser would have no other way of what to do with it
    - the data in the response looks the same to the browser (it's just a string of data)

#### Our Problem
Our page is being handled as plain text instead of HTML
 
`commonHeader = { 'Content-Type': 'text/plain' };`

to

`commonHeader = { 'Content-Type': 'text/html' };`

[resourse link to media type](https://en.wikipedia.org/wiki/Media_type)

# GET and POST
Two common ways to communicate with an HTTP Server

## GET
* every time you time in a web URL you are creating a GET request
    - because you are retrieving information from a web site address
* specifies the forms content into a query string at the end of the URL

## POST
* when you create a form you can specifiy which method to use GET or POST
* sends the form's content as part of the request's body (the client request body.... similar to the server's response body)
## Dealing with the POST Body

Experiment
Run HTTP Server
view search page and in chrome inspector change POST to GET and type chalkers into the search box and press `search` button. Then look at the URL and you will see the text you entered appended to the URL in the browser.

`http://localhost:1337/?username=philiphowley2`

But if you refresh (it will change back to POST) and do same thing, you won't see it in the URL, rather it is hidden and sent in the Body of the request to the home route.

## How do we get that information out of the body of the request?
### Node.js APIs used
[message.method](https://nodejs.org/api/http.html#http_message_method)
[Stream "data" event](https://nodejs.org/api/stream.html#stream_event_data)
[Stream "error" event](https://nodejs.org/api/stream.html#stream_event_error)
[buffer.toString()](https://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end)
[querystring.parse()](https://nodejs.org/api/querystring.html#querystring_querystring_parse_str_sep_eq_options)

```js
// Handle HTTP route GET / and POST / i.e Home
function home( request, response ) {
  // if url == '/' && GET
  if ( request.url === '/' ) {
    if ( request.method.toLowerCase() === 'get' ) {
      // >>>> show search
      response.writeHead( 200, commonHeader );
      renderer.view( 'header', {}, response );
      renderer.view( 'search', {}, response );
      renderer.view( 'footer', {}, response );
      response.end();
    } else {
      // if url == '/' && POST

      // get the post data from body
      request.on( 'data', function( postBody ) {
        // console.log( postBody.toString() );
        // extract the username
        var query = querystring.parse( postBody.toString() );
        // console.log( query ); // { username: 'aa' }
        response.write( query.username );
        response.end();
      } );
      // >>>> redirect to /:username
    }
  }

}
```

* since we are using POST and not GET we can't grab it from the query string so we have to grab it using the postBody
* if we run the server and go to the home page, and enter a search team for user we will only get buffer data back, we need to convert that buffer to a string so we use the toString() method. Once we do that we will get `username=philiphowley2` (or whatever we put into the search field and press the search button)

##Node.js APIs Used
[response.writeHead()](https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers)

## Redirection Headers in Node.js

## More Research on this topic
[HTTP Headers](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)
[Redirection status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#3xx_Redirection)

### Location
* Used in redirection, or when a new resource has been created.
* `Location: http://www.w3.org/pub/WWW/People.html`

We are doing a POST but we want it to go to a GET URL.
#### 303 See Other
The response to the request can be found under another URI using a GET method. When received in response to a POST (or PUT/DELETE), the client should presume that the server has received the data and should issue a redirect with a separate GET message.

Homework
* add ability to server static files like CSS
* extract CSS into an external file and then serve through node.js
    - [solution](https://github.com/IDidNotKnowICouldDoThat/nodeProjects/tree/master/nodewebserver)
* create lorem ipsum generator [recreate [this](http://www.lipsum.com/) with node.js]
* [solution lorem ipsum generator](https://github.com/trohweder85/ipsum)
image files
create dynamic <title> tags for each page on the site
