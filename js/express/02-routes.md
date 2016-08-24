# Adding Routes

Now we are going to jump into Express Routes

## Fake Data

We need to work with data but for now we won't use a database and we'll just use some fake data we store in a .json file.

## Are you mocking me?
We want to create a folder called `mock` inside our `src` folder. This is where we will put our fake data.

`$ mkdir src/mock`

### Naming convention
- `mock`
  + We name our folder `mock` to show that it is created by us internally

`$ touch src/mock/posts.json`

**src/mock/posts.json**

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

Normally, the data would come from a database or an API but we are just using some mock data here to show how this express works with routing

#### Sometimes you'll need fake placeholder text
[hip lipsum](http://hipsum.co/) - A cool site for quick, hip and happening lorem ipsum filler text

We will use this placeholder text later when we work with Pug templates

## Important fact about our server
If you change `app.js`, you need to shut down server and restart it for the changes to take affect. If you don't see your changes and wonder why, this should be what you troubleshoot first.

### A pain in the server!
* Starting and stopping the server every time we make a change will get old very fast. Luckily, we will learn about a better way very soon.

## Add a blogs route
This will pull in the **json** data onto our `localhost:3000/blog` route

**src/app.js**

```js
app.get( '/blog', function( req, res ) {
  res.send( posts );
} );
```

**src/app.js**

```js
var express = require( 'express' ),
    posts   = require( './mock/posts.json' );
```

Here we include the file that holds our fake data.

# Debug Express Tools

We need some tools to make working with Express easier to understand what is happening under the hood.

## [nodemon](https://github.com/remy/nodemon)
+ Tool that automatically restarts your node processor when files change
  * Saves you time
  * Saves you typing
  * You can just keep working on your code without starting and stopping the server everytime you change something. Cool Beans!

### Global install of nodemon

```
$ npm install -g nodemon
```

Now that we did this we can use **nodemon** on any Express project

## [node-inspector](https://github.com/node-inspector/node-inspector)
* Tool for interactively debugging node processes
* Allows you to explore your application in a browser as your application runs

We will run both these tools at the same time.

### Run the server using nodemon

```
$ nodemon src/app
```

#### Try it out

Change the text on the home route and see that it updates in the browser (_And we did it without a restart. Woot! Woot!_)

### Global install of node-inspector

```
$ npm install -g node-inspector
```

Now that we did this we can use **node-inspector** on any Express project

### Run the Express server

```
$ node-debug src/app.js
```

#### Steps for proper debugging
1. Shut down the server
2. Rerun the server
3. Make sure you click `allow for notifications` in Chrome (some times it doesn't appear and you might find debugging glitchy. You just have to keep trying. Stop the server. Restart.
4. Chrome will open a new browser window with the URL of the debugger, if not, grab URL inside terminal and paste into an open browser window
5. Hit `play` to get server to run front end
6. If you have `localhost:3000` open, refresh and point to new route `localhost:3000/blog` (if not, open Chrome and add the route `localhost:3000`)
a notification pops up from chrome, click that and it will show you the objects you are looking at (`req`, `res` and `post`)

Go to the **URL** it tells you in terminal to debug

If you look at the Terminal after running the Express server, it will give you a **URL**. Copy that **URL**, paste it into the Chrome browser.

* The `localhost:3000` does not work
* Hit play in **debugger** and you will see it works (_might have to click twice_)
  - working with the debugger is not intuitive and will take practice to get it working the way you expect
* Set a [breakpoint](https://developers.google.com/web/tools/chrome-devtools/debug/breakpoints/add-breakpoints?hl=en) on blog posts line and you will have access to the `res` and `req` objects
* Use the `console` of the breakpoint to see `req` and `res`

**important note** `node-inspector` does not restart server when code changes are made

A solution to above note is to run them both at the same time:

* run `$ node-inspector` on it's on in a tab of Terminal
* run `$ nodemon --debug src/app`

but if you run nodemon --debug src/app it will never hit the debugger so you can't debug. what you need to do is run this line instead and it will trigger the debugger. Note that localhost:3000 will not run because no routes are being served but you do have access the express object at the application level

type this command to ensure `debugger` get's hit

`$ nodemon --debug-brk src/app.js`

Now both `node-inspector` and nodemon will work together and enable you to debug

* Set them running is separate tabs
* Add `debugger` to the code inside `src/app.js`
  - see below

**src/app.js**

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

Type this command to ensure `debugger` get's hit

`$ nodemon --debug-brk src/app.js`

* The server `catches` the HTTP request
    - Any time someone sends a GET request
        + It then bundles all the data into one easy to use JavaScript object
            * This object is the `request` object

[documentation on request object of express](http://expressjs.com/en/api.html#req)

## Responses and the Response Object
1. When **user** makes `request` to a **server**
2. The **server** sends back the `response`
3. The **response** contains info needed to render their `request` in their **browser**

### Typically includes
`HTML` and a bunch of other behind the scenes info

#### Stuff like
  - [status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
  - [response headers](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)

**example**: successful status code `200`

[detect if request being made by a human user or machine?](https://github.com/rguerreiro/express-device)

* And cater response based on the answer

[Link to Resource on Response Object](http://expressjs.com/en/api.html#res)

### Add debugger to blog page

**app.js**

```js
app.get( '/blog/:title', function( req, res ) {
  debugger;
  var title = req.params.title;
  var post = posts[title];
  res.send( post );
} );
```

### Analyzing the blog route
* Go to a specific `blog` **route**, it will grab **:title** in `/blog/:title`, (by grabbing it with `req.params.title`) and storing it in the variable **title**.
* Then grab the **post** with that same `title` inside our `mock/posts.json`and send it back to the **client** so you will see only that specific `post` in the browser.

#### Open two tabs in iTerm

**tab 1**

```
$ nodemon --debug src/app.js
```

**tab 2**

```
$ node-inspector
```

1. Grab the **URL** output in `iTerm` and paste into open browser window
 a) Something like `http://127.0.0.1:8080/?port=5858`

2. Refresh the page
3. Open another browser tab and point to a blog route
 a) `http://localhost:3000/blog/Civitas FC Wins`

4. Open Chrome Browser console

5. type `res`

![res](https://i.imgur.com/Jz3fs6p.png)

A lot of info in the above screenshot but it just means `express` is handling a lot for us.

We used `send()` to send **json**

* You could use `res.sendFile()` to actually send a file to the client
* You can set `response headers` manually

## Landing Page
* We have routes set up for individual blog posts
* But we don't have a route set up for individual landing page

```js
app.get( '/blog/:title', function( req, res ) {
  debugger;
  var title = req.params.title;
  var post = posts[title];
  res.send( post );
} );
```

If you try to go to this route `localhost:3000/blog` you will get an error

To fix this error change this

```js
app.get( '/blog/:title', function( req, res ) { ... more code here ... });
```

To this

```js
app.get( '/blog/:title?', function( req, res ) { ... more code here ... });
```

* the `?` tells express that the parameter is optional

Stop the **debugger** and you will see the **route** works but the page is blank

Show text if just blog and show **json** `post` if in title of URL 

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
* I hate this problem as it always sneaks up at the wrong time and always takes time to fix. The problem is a port that didn't close properly. So you have to find it and kill it (stop the process). 

**note:** You can never run two processes simultaneously from one port.

You may run into this problem

If you get this error:

![port 3000 running already error](https://i.imgur.com/qdntYtd.png)

Solve it with this

```
$ lsof -i:3000
```

Find the `PID` and kill it with:

```
$ kill -9 $pid
```

* replace `$pid` with the actual `PID` number

I also would get this error

![error](https://i.imgur.com/0sLlsdj.png)

Solve it the same way but just swap out the different port number.

# Problem
When we view the `/blog` page in Chrome console tools `Network` tab, it has a status of [200](https://httpstatuses.com/200) (if it is cached you will get [304](https://httpstatuses.com/304) status code)

We want to tell search engines that this page is not created yet or under construction and should not be watched or followed.

## How can we tell the Search Engines this page is not ready?
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

___

[Compare Different Template Languages](https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/)

## Completed Files
`$ git checkout lesson-02-routes`
