# What is [Express](http://expressjs.com/)?
Express is the most popular web server for Node.js. Self described as a “Fast, un-opinionated, minimalist web framework for node.js.”, Express is open and flexible, allowing you to write only the code that you need, and nothing more. 

great documentation
API reference is most useful
web site with landing page and blog

install and set up Express from scratch
debugg strategies for Node Apps
Routing in Express
Jade Template Engine - used to have jade render HTML on the frontend
The Express Static Server

Express.js is a web framework for Node.js
Routing is a core component of express

## Install Express.js

### Tools
1. Text Editor (ST3)
2. Terminal
3. Console
3. Browser

[usestrict](https://teamtreehouse.com/library/the-javascript-use-strict-statement)

### Clone Repo
[repo](git clone https://github.com/hdngr/treehouse-express-basics.git express-basics)

zsh
git status
ls

run project as node project
npm init
* intializes or creates some key commands for the project
* diff in package versions
* express 3 has many differences than express 4

## Install express

```
$ npm install express --save
```

* git status
    - you will see that node_modules is being tracked
* touch .gitignore

```
node_modules
```
* git status
    - you will see that node_modules is not being tracked

* place application files in a folder called `src`
* src is a great place to let your team know where to look first how the app works. they don't need to look in node_modules because you are not editing to it
* any JavaScript file add 'usestrict' statement, will save you from really common mistakes if you make one
* app.js will be main file of application
* in order to use express you must add it using node's require statement

```js
var express = require('express');
```

express is now installed, imported and ready to be used

in order to use node modules in a file, they need to be required using the `require()` method

##Set up express app from scratch
set up application server
and basic route
routes are common to express and many other web frameworks

from user's perspective
a route is just a URL
mysite.com/home
mysite.com/about

* it is called a route because it is the path the user takes to access data on the server

* from the application's perspective a route (aka `endpoint`)
* provides the instructions to trigger a set of programming

example
mysite.com/about - tells application to load content for the about page
mysite.com/home route loads content for the home page

Client
* the device that's used to visit the home page is sometimes called `the client`

let's think of the client as a web browser and the routes are just the URLs you type in the browser

the server knows how and when to send data to the client because the client makes a HTTP request to the server
* request is technical name for what is happening when you type a URL into your browser
* your browser is making a request to a server at the URL address you typed in the browser
* the HTTP request can be made in many different ways
* we will use type of request known as `the Get Request`
* when client makes a get request the server can return a variety of responses
* if the client made a get request to a route that the server is set up to respond to, the server will then send a response
    - otherwise the server will send back an error like a page not found error (404 error - status code is 404)

```
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
get error
`Cannot GET/`

* good error that means it is running into the server 
