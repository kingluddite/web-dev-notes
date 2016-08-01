# Models

Make sure `mongod` and `mongo` are running

Remember to remove the debugger line in your code

**src/app.js**

```js
'use strict';

debugger; // REMOVE THIS LINE
```

Also remove this debugger

**src/api/index.js**

```js
router.get( '/todos', function( req, res ) {
  debugger; // REMOVE THIS DEBUGGER TOO!
  res.json( { todos: todos } );
} );
```
## Require our model
We can use our todo model in our controller by requiring it

**src/api/index.js**

```js
var express = require( 'express' );
var Todo = require( '../models/todo' ); // ADD THIS LINE
// var todos = require( '../../mock/todos.json' ); COMMENT OUT OUR MOCK DATA
```

**note**: The capital `T` in **Todo**

It is a common naming convention when referencing a Class or a constructor or any sort of model in JavaScript

We also comment out our mock data

## Start interacting with our database

### GET our todos

```js
'use strict';

var express = require( 'express' );
var Todo = require( '../models/todo' );
var todos = require( '../../mock/todos.json' );

var router = express.Router();

router.get( '/todos', function( req, res ) {
  Todo.find( {}, function( err, todos ) {
    if ( err ) {
      // do something
      return console.log( err );
    } else {
      res.json( { todos: todos } );
    }
  } ); // pass our Model an empty object so it will return all of our Todos.
} );
```

Run a GET in Postman with `http://localhost:3000/api/todos`

We get a Status of 200 OK and

```js
{
    "todos": []
}
```

### Where are our todos?
We don't get any because there are no todos in our MongoDB yet.

**note** in Mongoose, the callback will always take an error (err) as the first parameter

```js
// some code
  Todo.find({}, function(err, todos) {});
// more code
```

Instead of just logging an error to the console we should handle it better

**src/api/index.js**

```js
router.get( '/todos', function( req, res ) {
  Todo.find( {}, function( err, todos ) {
    if ( err ) {
      // do something
      return res.status(500).json({message: err.message});
    } else {
      res.json( { todos: todos } );
    }
  } ); // pass our Model an empty object so it will return all of our Todos.
} );
```

* Try to return errors with the proper status code so developers can work with your API

## Create Seed Data

**src/seed.js**

```js
'use strict';

// require model
var Todo = require( './models/todo.js' );

var todos = [
 'Read a book',
 'Cook a healthy dinner',
 'Go for a jog',
 'Go grocery shopping',
 'Get haircut',
 'Code 8 days a week!'
];

todos.forEach( function( todo, index ) {
  Todo.find( { 'name': todo }, function( err, todos ) {
    if ( !err && !todos.length ) {
      Todo.create( { completed: false, name: todo } );
    }
  } );
} );
```

* We don't need to export anything from **seed.js**

## Require it inside our app.js

```js
// some code
var app = express();

require( './database' );
require( './seed' ); // ADD THIS LINE
// some code
```

The above added line will run everytime our app starts
* that is why we checked for the existance of todos in our `seed.js` code, if we didn't have that, the **todo** list would be created every time but once we have **todos**, it won't be created.

Run `mongod` and `nodemon` and check the same **Postman** route we ran before and you will now see our **seed.js** data has populated our **MongoDB** database.

Wahoo!


