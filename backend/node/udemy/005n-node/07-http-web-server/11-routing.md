# Routing
* So far we've only been sending back the same **response** when the server receives a request no matter what the URL is no matter what `\anything` is

## What is routing?
* Mapping HTTP requests to Content
* Whether actual files that exist on the server, or not
    - `/some-image.jpg` could be request my server receives
        + Maybe that image doesn't live on the server
        + Mabye it's in a Database
        + I am just responding to that request and when I receive that request from that URL I will give it this response
            * Maybe I'll go to the Database to get the image because it is not in the file server itself
            * Or I may have images on the file server and then I just connect to it with a stream and just stream it back
            * Or I may need to manipulate data
            * Or process a template
            * Or whatever
            * But whatever I do, the route will map the request to content
* When you request a file on the Internet, to download it
    - You are not directly connecting to the file
    - YOu are connecting to the server and saying **"please give me this"** and the server may be doing various things to give you that content
* When we are building routing we're just saying when someone give me a request for something specific, I'll give content back to them, I'll stream content back to them, but how I deal with the content internally well that's up to me

## Looking at routing at a very simple level
* We need to update our current code to deal more properly to different URLs
* Currently every URL we send to Node will give me back the same data

`http://localhost:1337/this/will/give/me/the/same/data/as/every/url/path`

* Gives back the same data

```
{
  "firstName": "John",
  "lastName": "Doe"
}
```

* When we put a URL in and hit return we are just making a request and the URL is just one of many pieces of data we are sending to the server
* The server decides what to do with it

### Looking at the URL
* We now need to look at the URL and give different responses based on that URL

`app.js`

```js
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {

  if (req.url === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const obj = {
      firstName: 'John',
      lastName: 'Doe'
    };
    res.end(JSON.stringify(obj));
  }

}).listen(1337, '127.0.0.1');
```

* Restart server `$ node app.js`
* Refresh browser
* If you visit `localhost/api` you'll get our data, any other URL and you'll get nothing

## Now add another route
```js
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {

  if (req.url === '/') {
    fs.createReadStream(__dirname + '/index.html').pipe(res);
  }

  if (req.url === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const obj = {
      firstName: 'John',
      lastName: 'Doe'
    };
    res.end(JSON.stringify(obj));
  }

}).listen(1337, '127.0.0.1');
```

* `/` shows you our HTML 
* `/api` shows you are JSON
* Congrats! You just built your first router

## Add our 404 error
```js
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {

  if (req.url === '/') {
    fs.createReadStream(__dirname + '/index.html').pipe(res);
  }

  if (req.url === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const obj = {
      firstName: 'John',
      lastName: 'Doe'
    };
    res.end(JSON.stringify(obj));
  }

  res.writeHead(404);
  res.end();

}).listen(1337, '127.0.0.1');
```

* Restart server and if you refresh browser and go to any URL we didn't specify on localhost, you will see a 404 status in your Network of the Chrome dev toolbar

![404 status](https://i.imgur.com/1wsDQwb.png)

### Make sure they only run on each specific circumstance
* Currently if we run our code we'll always get a 404

`app.js`

```js
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {

  if (req.url === '/') {
    fs.createReadStream(__dirname + '/index.html').pipe(res);
  }
  else if (req.url === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const obj = {
      firstName: 'John',
      lastName: 'Doe'
    }
    res.end(JSON.stringify(obj));
  }
  else {
    res.writeHead(404);
    res.end();
  }

}).listen(1337, '127.0.0.1');
```

### Dynamic URLs
`localhost:1337/cars/111`

* I don't want to have to write a separate URL for every possible route
* Routing gets complicated
* We can do it ourselves but it would be nice if we had a tool, a bunch of JavaScript code written for us that would do this for us

### Webserver checklist
* The ability to communicate over the internet with HTTP and TCP/IP
* We looked at the ability to accept requests and send responses (in the standard format) over the internet)
    - That gives us the ability to serve as a web server

## Next - Learn about Express, NPM and the NPM history
* Most popular when working with Node
* How do we install all that functionality
    - Thanks to node modules, before ES6, something happened and an explosing of open source, free to use, free to see how it works JavaScript code
    - Node is responsible for the largest open source ecosystem of code in history



