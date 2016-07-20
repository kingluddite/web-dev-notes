# Adding Routes

* naming convention
    - `mock`
        + we name our folder `mock` to show that it is created by us internally

[hip lipsum](http://hipsum.co/)

## Important
If you change `app.js`, you need to shut down server and restart it for the changes to take affect. If you don't see your changes and wonder why, this should be what you do to troubleshoot first.

## Add a blogs route
This will pull in the json data onto our `localhost:3000/blog` route

```js
app.get( '/blog', function( req, res ) {
  res.send( posts );
} );
```

* Don't forget to require the necessary data (see below)

`src/mock/posts.json`

```json
{
  "Civitas FC Wins": {
    "title": "Civitas FC Wins",
    "description": "First game of season and they won big."
  },
  "Civitas FC Loses": {
    "title": "Civitas FC Loses",
    "description": "Second game of season and they lost big."
  },
  "Civitas FC Ties": {
    "title": "Civitas FC Ties",
    "description": "Third game of season ended in a dreaded tie"
  }
}
```


```js
var express = require( 'express' ),
    posts   = require( './mock/posts.json' );
```

# Debug Express Tools

## [nodemon](https://github.com/remy/nodemon)
* tool that automatically restarts your node processor when files change
    - saves you time and typing
    - you can just keep working on your code without starting and stopping the server everytime you change something

### global install of nodemon

```
$ npm install -g nodemon
```

## [node-inspector](https://github.com/node-inspector/node-inspector)
* tool for interactively debugging node processes
* allows you to explore your application in a browser as your application runs

### run

```
$ nodemon src/app
```

Try it out. Change the text on the home route and see that it updates in the browser (without a restart. Woohoo!)

### global install of node-inspector

```
$ npm install -g node-inspector
```

### run

```
$ node-debug src/app.js
```

shut down the server
rerun the server
make sure you click 'allow for notifications' in chrome but once you do it, it will saved and you won't have to do that again
chrome will open a new window with the url of the debugger, if not, grab url inside terminal and paste into open window
hit play to get server to run front end
if you have localhost:3000 open, refresh and point to new route localhost:3000/bblog (if not, open chrome and add the route localhost:3000)
a notification pops up from chrome, click that and it will show you the objects you are looking at (req, res and post)

Go to the URL it tells you in terminal to debug
* The `localhost:3000` does not work
* hit play in debugger and you will see it works (_might have to click twice_)
* set breakpoint on blog posts line and you will have access to the `res` and `req` objects
* use the `console` of the breakpoint to see `req` and `res`

**important note** `node-inspector` does not restart server when code changes are made

A solution to above note is:

* run `$ node-inspector` on it's on in a tab of Terminal
* run `$ nodemon --debug src/app`

but if you run nodemon --debug src/app it will never hit the debugger so you can't debug. what you need to do is run this line instead and it will trigger thdebugger. Note that localhost:3000 will not run because no routes are being servered but you do have access the express object at the application level

type this command to ensure `debugger` get's hit

`$ nodemon --debug-brk src/app.js`

Now both node-inspector and nodemon will work together and enable you to debug

* set them running is separate tabs
* add `debugger` to code

```js
'use strict';

var express = require( 'express' ),
    posts   = require( './mock/posts.json' );

var app = express();

debugger;

app.get( '/', function( req, res ) {
  res.send( '<h1>Express is cool</h1>' );
} );

app.get( '/blog', function( req, res ) {
  res.send( posts );
} );

app.listen( 3000, function() {
  console.log( 'frontend server is running on port 3000' );
} );

```

type this command to ensure `debugger` get's hit

`$ nodemon --debug-brk src/app.js`

* the server `catches` the HTTP request
    - any time someone sends a GET request
        + it then bundles all the data into one easy to use JavaScript object
            * this object is the `request` object

[documentation on request object of express](http://expressjs.com/en/api.html#req)

## Responses and the Response Object
when user makes request to a server
the server sends back the response
the response contains info needed to render their request in their browser

### typically includes
`HTML` and a bunch of other behind the scenes info
* stuff like
  - status codes
  - response headers

**example**: successful status code `200`

[List of status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

[detect if request being made by a human user or machine?](https://github.com/rguerreiro/express-device)
* and cater response based on the answer

[Link to Resource on Response Object](http://expressjs.com/en/api.html#res)

### add debugger to blog page

`app.js`

```js
app.get( '/blog/:title', function( req, res ) {
  debugger;
  var title = req.params.title;
  var post = posts[title];
  res.send( post );
} );
```

* now if you go to a route, it will grab what follows `/blog/`, and use that by grabbing it with `req.params.title` and storing it in title.
* then grab the post with that title inside our mock json file and send it back to the client so you will see only that part of the json file in the browser.

Open two tabs in iTerm

`tab 1`

```
$ nodemon --debug src/app.js
```

`tab 2`

```
$ node-inspector
```

grab the URL output in iTerm and paste into open browser window

something like `http://127.0.0.1:8080/?port=5858`
refresh the page

open another browser tab and point to a blog route

`http://localhost:3000/blog/Civitas FC Wins`

jump to inspector console

type `res`

![res](https://i.imgur.com/Jz3fs6p.png)

A lot of info and intimidating but it just means `express` is handling a lot for us.

we used send() to send json
you could use `res.sendFile` to actually send a file to the client
you can set response headers manually

we have routes set up for individual blog posts
but we don't have a route set up for individual landing page

```js
app.get( '/blog/:title', function( req, res ) {
  debugger;
  var title = req.params.title;
  var post = posts[title];
  res.send( post );
} );
```

if you try to go to this route `localhost:3000/blog` you will get an error

to fix this error change this

```js
app.get( '/blog/:title', function( req, res ) { ... more code here ... });
```

to this

```js
app.get( '/blog/:title?', function( req, res ) { ... more code here ... });
```

* the `?` tells express that the parameter is optional

stop the debugger and you will see the route works but the page is blank

show text if just blog and show json post if in title of url

```js
app.get( '/blog/:title?', function( req, res ) {
  //debugger;
  var title = req.params.title;
  if ( title === undefined ) {
    res.send( 'Page under construction' );
  } else {
    var post = posts[ title ];
    res.send( post );
  }
} );
```

## Troubleshooting Server running already on ports
* I hate this problem as it always sneaks up at the wrong time and always takes time to fix. The problem is a port that didn't close properly. So you have to find it and kill it. You can never run two processes from one port.

You may run into this problem

If you get this error:
![port 3000 running already error](https://i.imgur.com/qdntYtd.png)

solve it with this

```
$ lsof -i:3000
```

Find the PID and kill it with:

```
$ kill -9 $pid
```

* replace $pid with the actual PID number

I also would get this error
![error](https://i.imgur.com/0sLlsdj.png)

Solve it the same way but just swap out the different port number.

# Problem
When we view the /blog page in chrome console tools `Network` tab, it has a status of [200](https://httpstatuses.com/200) (if it is cached you will get [304](https://httpstatuses.com/304) status code)

we want to tell search engines that this page is not created yet or under construction and should not be watched or followed.

How can we tell the Search Engines this page is not ready?
We can manually change the status code to [503](https://httpstatuses.com/503)

```js
app.get( '/blog/:title?', function( req, res ) {
  //debugger;
  var title = req.params.title;
  if ( title === undefined ) {
    res.status(503);
    res.send( 'Page under construction' );
  } else {
    var post = posts[ title ];
    res.send( post );
  }
} );
```

Refresh your page and you'll now see a status code of 503

![status code](https://i.imgur.com/5YWX6Xn.png)

[Compare Different Template Languages](https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/)

