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

[use strict](https://teamtreehouse.com/library/the-javascript-use-strict-statement)

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

We need to make sure we don't track `node_modules` so add this inside your `.gitignore`

```
node_modules
```

* `$ git status`
    - You will see that `node_modules` is now not being tracked. Good work!

## The `src` folder
* Place application files in a folder called `src`
  - `src` is a great place to let your team know where to look first how the app works. 
* They don't need to look in `node_modules` because you are not editing to it
* Any JavaScript file add `'use strict'` statement, will save you from really common mistakes if you make one
* `app.js` will be main file of application
* In order to use express you must add it using node's require statement

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

  - Let's think of the `client` as a `web browser`
  - And the `routes` are just the `URLs` you type in the `browser`

### The Request

#### Question
How does the `server` know how and when to send data to the client?

#### Answer
Because the `client` makes a HTTP `request` to the server

* `request` is technical name for what is happening when you type a **URL** into your browser
  - Your browser is making a `request` to a server at the URL address you typed in the browser
  - The **HTTP** `request` can be made in many different ways

#### GET Request
* We will use type of `request` known as `the GET Request`
* When client makes a GET `request` the server can return a variety of responses
* If the client made a GET `request` to a route that the server is set up to `respond` to,
    - The server will then send a `response`
        + Otherwise the server will send back an error
          * Like a page not found error (404 error - `status code` is `404`)

**src/app.js**

```js
'use strict';

var express = require('express');

var app = express();

app.listen(3000);
```

Run the server by typing:

```
$ node src/app.js
```

* You can also just type `$ node src/app`
    - Less typing === good

### You will get an Error

`Cannot GET/`

* Good error that means it is running into the server
 
### get()
* The `get` method registers a route that will listen for **HTTP GET** requests at a given route

```js
app.get('/', function( request, response ) {
  response.send( 'Express is cool' );
});
```

* 1st param
    + location parameter
* 2nd param
    + anonymous **callback function**
        - _takes request and response parameters_

### Question

[What is a callback function?](http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/)

## send()
* `send()` is a method of the response object

## listen()
* `app.listen()` method can take a parameter which **port** to serve the application on

```js
app.listen( 3000 );
```

* The convention for creating a new application in Express is to assign it to the variable `express`

`var app = express();`

**Important thing to remember about routes**

* A route is where a server is set up to respond to a `request` from a client

## Abbreviated Naming Convention
Instead of request and response, this is more common

**src/app.js**

```js
app.get( '/', function( req, res ) {
  res.send( '<h1>Express is cool</h1>' );
} );
```

* We are now sending back **HTML** from the `server` to the `client`

## Improve Terminal info
As it stands we type `$ node src/app` and we get no feedback
* We can improve that by adding a `callback function` like this:

From this

**src/app.js**

```js
app.listen( 3000 );
```

To this:

**src/app.js**

```js
app.listen( 3000, function() {
  console.log( 'frontend server is running on port 3000' );
} );
```

Now whenever we run the server we get a message on which port it is running.
____
* One express app could run a frontend app
* One express app that runs a **REST API**
* And another that runs an admin panel
