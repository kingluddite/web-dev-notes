# MongoDB
Going from mock data to real data.

## Mongoose
We will use Mongoose
* node middleware
* Lets us create complex Objects (aka **models**)
    - To represent our data and store it in **MongoDB**

## Install MongoDB
* Use brew (look at my MongoDB notes)

## Multiple Terminal Tabs!
Lets open multiple Terminal tabs

### In Terminal tab #1
Start mongodaemon

```
$ mongod
```

### In Terminal tab #2
Then start our Express app

```
$ nodemon
```

### In Terminal tab #3
Install Mongoose

```
$ npm install --save -E mongoose
```

* We save it to our package.json file
* We add `-E` to save exact version

## Create a database.js file

```
$ touch src/database.js
```

```js
'use strict';

var mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost/mean-todo' );
```

## Require the database 

**src/app.js**

```js
'use strict';

// need to import express to use it
var express = require( 'express' );

var router = require( './api' );

// need to create an instance of express server
// allows us to set up any middle ware we may need
// to configure routes and start the server
var app = express();

// HERE IS WHERE WE REQUIRE THE DATABASE!!!!
require( './database' ); // ADD THIS LINE

// tell express to server static files from public folder
app.use( '/', express.static( 'public' ) );

app.use( '/api', router );

app.listen( 3000, function() {
  console.log( 'Server is listening on port 3000' );
} );
```

## Mongoose is a singleton
Means when you do something with Mongoose in one file, those changes happen with files across your node process

* We are not doing anything with the **./database** file
* We are just making sure it is required and run

### The Terminal is not telling us about MongoDB yet

**database.js**

```js
'use strict';

var mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost/mean-todo', function( err ) {
  if ( err ) {
    console.log( 'Failed connecting to MongoDB!' );
  } else {
    console.log( 'You have connected to Mongo! Mongoliciousness has begun!' );
  }
} );
```

![mongo is running](https://i.imgur.com/aZLu56p.png)

## Create a Schema
A way to define and control an object that will be stored in the database

### Create `models` directory

**src/models/todo.js**

```js
'use strict';

var mongoose = require( 'mongoose' );

// todo.name
// todo.completed

var todoSchema = new mongoose.Schema( {
  name: String,
  completed: Boolean
} );

var model = mongoose.model( 'Todo', todoSchema );

module.exports = model;
```

[Documenation on Mongoose Schema types](http://mongoosejs.com/docs/schematypes.html)

Says what data types are required for our fields.

Because Mongoose is a **Singleton**, the `Todo` model is registered with Mongoose wherever you require Mongoose

### Best Practice
But it is a best practice to export the model itself
* _(in case you are using more advanced configurations)_

## Debugging Refresher
Tools to help us debug our application

### Iron Node
Essential tool for developing node applications
* Lets us interact with a debugged applications in the browser while the node application is running

#### Install iron-node globally
Remember that when we install something gloabally we can use it on any node application on our machine

```
$ npm install iron-node -g
```

## Breakpoints
When debugging an app, `breakpoints` are the core aspect of how you'll do it

### Two ways to set breakpoints in iron-node
1. Writing a perminent breakpoint into your application code

**src/app.js**

```js
'use strict';

debugger; // WE ADD THIS LINE

// need to import express to use it
var express = require( 'express' );

var router = require( './api' );

// need to create an instance of express server
// allows us to set up any middle ware we may need
// to configure routes and start the server
var app = express();

require( './database' );

// tell express to server static files from public folder
app.use( '/', express.static( 'public' ) );

app.use( '/api', router );

app.listen( 3000, function() {
  console.log( 'Server is listening on port 3000' );
} );
```

## Run iron-node

```
$ iron-node src/app.js
```

### iron-node issues
There's an [issue](https://github.com/s-a/iron-node/issues/104) with the latest version of iron-node 

Uninstall your current version and install a previous version using this command:

```
$ npm uninstall -g iron-node && npm install -g iron-node@2.2.17
```

Once you run iron-node you can start setting breakpoints

When you refresh your page, iron-node will stop on your `debugger` statement

## Set debugger statement in src/api/index.js
Do this in the iron-node console

![set breakpoint in iron-node](https://i.imgur.com/YiNzgzD.png)

* You can edit code directly inside `iron-node`
* Most developer do most of their debugging inside their editor
* After making changes in `iron-node` **console**, save the file
    - You hit first debugger statement
    - Hit `play`
    - Server will be running
    - Visit landing page `http://localhost:3000`
    - **GET request** will run
    - `Todos` will not show up
        + Because debugger stopped in the middle of your **GET request**

**note:** There are 2 versions of your file loaded into `iron-node`
* Virtual file loaded into memory
  - Allows you to interactively set breakpoints
    + They are called `temporary breakpoints`
    + You can set these breakpoints on any line
    + In the console you can check them on or off
    + Or use this key to turn all of them off or on

![turn all breakpoints off/on](https://i.imgur.com/uTeYtLh.png)

**note** File will be automatically loaded when a debugger statement is hit

### Manually load a file
* Just like in Sublime Text, `cmd` + `p` skuzzy search for your file **use path** to narrow down search.
* Some search results are the virtual file (look for `//Users`)
* The **Call Stack** lets you click on anything that's been run (Express backend)
* The magic of debugging is that at any time you are stopped at a breakpoint you can hover over a variable to see what that variable is assigned to

![hover over variables](https://i.imgur.com/xxIVKrU.png)

* You can look at Local Variables
* Closure variables
* Global variables

Final way to work with variables locally is through the **console**

`> todos`

`> res`

* For the response object

`> res.status(500)` 

You can even run functions

The console allows you to interactively explore your application
as if you were inside the JavaScript interpreter

## Stop iron-node
`ctrl` + `c`

**note** Most of the time you'll be using `nodemon` and you'll only use iron-node when you need to check on an internal process



