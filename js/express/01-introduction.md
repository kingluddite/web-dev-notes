# What is [Express](http://expressjs.com/)?
Express is the most popular web server for `Node.js`. Self described as a “Fast, un-opinionated, minimalist web framework for node.js.”

Express is open and flexible, allowing you to write only the code that you need, and nothing more.

It is a robust application framework for node. But, its minimalist structure allows you to implement only the pieces you want to. 

## Pros of Express
* Great documentation
* API reference is most useful

## What We Will Build
* Web site with landing page and blog

## Stuff We'll Talk About
1. Install and set up Express from scratch
2. Debug strategies for Node Apps
3. Routing in Express
4. [Jade Template Engine](http://jade-lang.com/)
  * used to have jade render HTML on the frontend
The Express Static Server

**note** Jade, because of a copyright violation had their name changed to Pug.

* `Express.js` is a web framework for `Node.js`
* Routing is a core component of express

## Install Express.js

### Tools
1. Text Editor (ST3)
2. Terminal
3. Console
4. Browser
5. [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc)

[usestrict](https://teamtreehouse.com/library/the-javascript-use-strict-statement)

### Create an empty project folder
We will build our Express app inside this folder.

#### Add Git

```
$ git init
```

## Create `package.json`

`$ npm init`

* **caution** express 3 has many differences than express 4

## Install express

```
$ npm install express --save
```

* --save saves express to your package.json dependencies
* git status
    - you will see that `node_modules` is being tracked

## Add `.gitignore`
```
$ touch `.gitignore`
```

`.gitignore`

```
node_modules
```

* git status
    - you will see that node_modules is not being tracked

## the `src` folder
* place application files in a folder called `src`
  - `src` is a great place to let your team know where to look first how the app works. they don't need to look in `node_modules` because you are not editing to it
* any JavaScript file add `'usestrict'` statement, will save you from really common mistakes if you make one
* `app.js` will be main file of application
* in order to use express you must add it using node's require statement

```js
var express = require('express');
```

### Cool! express is now installed, imported and ready to be used

In order to use node modules in a file, they need to be required using the `require()` method

##Set up express app from scratch
* Set up application server
* and basic route
    - routes are common to express and many other web frameworks

### From user's perspective
* a route is just a URL
    - examples
        + `mysite.com/home`
        + `mysite.com/about`

* it is called a route because it is the path the user takes to access data on the server

### From the application's perspective a route (aka `endpoint`)
* provides the instructions to trigger a set of programming
    - examples
        + `mysite.com/about` - tells application to load content for the about page
        + `mysite.com/home` route loads content for the home page

## Client
* the device that's used to visit the home page is sometimes called `the client`

Let's think of the `client` as a `web browser` and the `routes` are just the `URLs` you type in the `browser`

### The Request

The `server` knows how and when to send data to the client because the client makes a HTTP `request` to the server

* `request` is technical name for what is happening when you type a URL into your browser
* your browser is making a `request` to a server at the URL address you typed in the browser
* the HTTP `request` can be made in many different ways

#### GET Request
* we will use type of `request` known as `the GET Request`
* when client makes a GET `request` the server can return a variety of responses
* if the client made a GET `request` to a route that the server is set up to `respond` to, the server will then send a `response`
    - otherwise the server will send back an error like a page not found error (404 error - `status code` is `404`)

```js
'use strict';

var express = require('express');

var app = express();

app.listen(3000);
```

now if you type

```
$ node src/app.js
```

* you can also just type `$ node src/app`
    - which is more preferred because it is less typing

### You will get an Error

`Cannot GET/`

* good error that means it is running into the server 
### get()
* the `get` method registers a route that will listen for HTTP GET requests at a given route

```js
app.get('/', function( request, response ) {
  response.send( 'Express is cool' );
});
```

* 1st param
  - location parameter
* 2nd param
  - anonymous callback function (_takes request and response parameters_)

## send()
* send is a method of the response object

## listen()
* app.listen method can take a parameter which port to serve the application on

```js
app.listen( 3000 );
```

* in express, the convention for creating a new application, is to assign it to the variable `express` ... `var app = express();`
* a route is where a server is set up to respond to a `request` from a client

## Abbreviated Naming Convention
instead of request and response, this is more common

```js
app.get( '/', function( req, res ) {
  res.send( '<h1>Express is cool</h1>' );
} );
```

* we are now sending back HTML from the server to the client

## Improve Terminal info
As it stands we type `$ node src/app` and we get no feedback
* we can improve that by adding a `callback function` like this:

from this

```js
app.listen( 3000 );
```

to this:

```js
app.listen( 3000, function() {
  console.log( 'frontend server is running on port 3000' );
} );
```

* one express app could run a frontend app
* one express app that runs a REST API
* and another that runs an admin panel
