# The MEAN Stack

[original mean stack blog post 3 years ago](http://blog.mongodb.org/post/49262866911/the-mean-stack-mongodb-expressjs-angularjs-and)

* `M`ongoDB - storage
* `E`xpress.js - server side routing and business logic
* `A`ngular - client side application
* `N`ode.js - run by node.js

All documents stored in MongoDb
Client requests info through Express
Express reads requests and asks MongoDB for data
Express gets the data and sends to client
client then displays it to the user

Why MEAN stack?
* widely adopted
* powerful and flexible
* modular (node and angular)
    - code can be lean and easily managable

## Build a Todo App in MEAN Stack

* install node and mongo

### Quick way to generate a MEAN stack app

[MEAN.JS Generator link](# The MEAN Stack

[original mean stack blog post 3 years ago](http://blog.mongodb.org/post/49262866911/the-mean-stack-mongodb-expressjs-angularjs-and)

### Yeoman
[What is Yeoman?](http://yeoman.io/)

#### Install instructions

Install Yeoman

```
$ npm install -g yo
```

Install the MEAN.js generator

```
$ npm install -g generator-meanjs
```

Generate a MEAN.js app

```
$ yo meanjs
```

Steps to create our todo app (building from scratch)

1. Clone a todo app build in Angular onto our machine
2. Set Up Express
    * Configure it to serve static assets so that our Angular App will load into the browser
3. Create a MongoDB and set up a schema in Mongoose
4. Configure Express and Angular to create and edit todos

## Setting Up Express

### Tools Used (Tooling)
1. Text Editor (Sublime)
2. Terminal (iTerm)
3. Browser (Chrome)

dev/mean-stuff/mean-todo-list

mean-todo-list

```
$ cd ~/Documents/dev/mean-stuff/mean-todo-list
$ mkdir src
```

- src/ (used to hold our code and keep separation from other 3rd party libaries)
    + will contain all our node application code

## Make our Project a node project

```
$ npm init
```

* initializes a package.json file
* node uses this file for keeping 3rd party node modules up to date and to run scripts (like tests)
    - node uses package.json to manage dependencies
    - run scripts to run tests
    - run scripts to start the development server

Accept defaults for all fields except **entry point** (after hitting enter on `$ npm init`)
Change **entry point** to: `src/app.js`
    * this script will start our server in development

## Bring in our Angular App
* will be placed inside `public` directory
    - `public` convention used for static assets
        + html files
        + images
        + css
        + fonts
        + other similar resources

```
$ mkdir public
$ cd public
```

## Clone into public our Angular App

```
$ git clone https://github.com/treehouse/angular-basics.git . 
```

### Remove the .git
We want to avoid conflicts or confusion

```
$ rm -rf .git
```

## Final Code
[Fork this repo](https://github.com/treehouse-projects/mean-todo)
```
$ npm init --yes (no questions)
```

specify engines key with current version of node (node -v)
```js
  "engines": {
    "node": "6.2.2"
  }
```

## Install Express

```
$ npm install express --save-exac
```

When installing **npm** packages, you can provide the optional **--save-exact** (or -E) command line flag in order to save the dependency with an exact version instead of npm's default semver range operator.

The --save-exact flag needs to be used in conjunction with the --save or --save-dev flags, otherwise the dependency will not get saved to your package.json file.

```
$ npm install express --save --save-exact
```

```
$ npm install express --save -E
```

* now we have a node_modules folder
    - all 3rd parties live in that folder

create our app file

```
$ touch src/app.js
```

ignore our node_modules

```
$ touch .gitignore
$ echo 'node_modules' >> .gitignore
```

## Intialize git

```
$ git init
```

### Add and commit

```
$ git add -A
$ git commit -m "Initialize Repo"
```

## Configure our Express Server

**src/app.js**

```js
'use strict';

// need to import express to use it
var express = require( 'express' );

// need to create an instance of express server
// allows us to set up any middle ware we may need
// to configure routes and start the server
var app = express();

app.listen( 3000, function() {
  console.log( 'Server is listening on port 3000' );
} );
```

## Start server

```
$ node src/app.js
```

### Nodemon makes life better
* no shut down server and restart needed

```
$ npm install -g nodemon
```

### Run Nodemon

```
$ nodemon
```

We get an error but we have not routes set up yet
You see the terminal and it let's us know it is running on port 3000.

**src/app.js**

```js
MORE CODE
// tell express to server static files from public folder
app.use( '\', express.static( 'public' ) );

app.listen( 3000, function() {
  console.log( 'Server is listening on port 3000' );
} );
```
