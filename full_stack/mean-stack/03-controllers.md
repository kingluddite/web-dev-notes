# Controllers

## API directory
Create a new directory called `api` inside `src`

* Create `api/index.js`
    - This will be our API module
    - We are going to move code out of `src/app.js` into `api/index.js`

**src/app.js**

```js
'use strict';

var express = require( 'express' );
var router = require( './api' );

var app = express();

app.use( '/', express.static( 'public' ) );

app.use( '/api', router );

app.listen( 3000, function() {
  console.log( 'Server is listening on port 3000' );
} );
```

**src/api/index.js**

```js
'use strict';
var express = require( 'express' );
var router = express.Router();

router.get( '/todos', function( req, res ) {
  res.json( { todos: [] } );
} );

// TODO: Add POST route to create new entries
// TODO: Add PUT route to update existing entries
// TODO: Add DELETE route to delete entries

module.exports = router;
```

## Run the server and view in browser
`http://localhost:3000/api/todos`

You should see the same **todos** object but we have a much more modular application.

## Mock data
We will create a place in our Application to mock data for all sorts of development work to test our app.

## Create todos.json
This will hold our fake data

**/mock/todos.json**

```json
[
  {
    "name": "wake up before sunrise"
  },
  {
    "name": "dance like it's 1999"
  },
  {
    "name": "read a book once a month"
  },
  {
    "name": "do something nice for someone today"
  }
]
```

Add this to **src/api/index.js**

```js
'use strict';

var express = require( 'express' );
var todos = require( '../../mock/todos.json' ); // add this line

var router = express.Router();

router.get( '/todos', function( req, res ) {
  res.json( { todos: todos } ); // modifiy this line pointing to our JSON
} );
```

## Postman [link](https://www.getpostman.com/)
Better than the browser for checking our routes
The browser works when we need to check our routes but we need a better, more robust tool to check our routes

* Use this when adding to routes to your app as well as when you are adding logic

Install Postman and run the app using your Chrome browser

## Enter this in Postman: 
`localhost:3000/api/todos`

This is what you should see
* _Make sure your server is running_

![sample route data with postman](https://i.imgur.com/Qz8atUP.png)

* We can also see the header information sent with the response
* Status (**200 OK**)
* Cool feature to check out `collections` can allow you to switch between local and remote servers

### What’s the correct syntax to export a router?

`module.exports = router;`

## Angular
* We have todos in our express API
* We need to connect our Angular app to receive them

### CRUD
Create, Read, Update, Delete

* Our todo app does all four

## "Bootstrapping"
Our app is `bootstrapped` with

**public/index.html**

```html
<!-- code -->
<body ng-app="todoListApp">
<!-- more code -->
</body>
<!-- more code -->
```

* Anything inside our BODY element will be driven by Angular

Here is our main template HTML

**public/templates/todo.html**

```html
<div class="list" ng-controller="mainCtrl">
    <div class="add">
      <a href="#" ng-click="addTodo()">
        + Add a New Task</a>
      </div>
    <todo></todo>
   </div>
```

## Controllers

* `ng-controller`
    - Will bind the `mainCtrl` to the entire `div.list` element and everything inside it
* `<todo></todo>` Is a custom directive
* **public/scripts/app.js** - Our main application file
    - Not a lot happening in the file but something very important is happening and that is Angular is creating a new module called `todoListApp`
        + Important that our `<script src="/scripts/app.js"></script>` come before our other `script` includes (**controllers**, **services**, **directives**)
            * Why? `app.js` needs to be loaded first so that controllers, services and directives can be attached to that module as dependencies
* **public/scripts/controllers**
    - **main.js**
        + We have the addTodo
        + We have a service that whenever the mainCtrl is loaded (any time the page is visited, the data service gets our todos and then attaches the todos to the $scope's `todos` variable)
            * When it gets back its `response` it attaches the `response` to the $scope.todos 
    - **todo.js**

**note** file naming convention for controllers

## Directives
* **public/scripts/directives/todo.js**
    - This is where our code pionts to the templates folder that houses our todo template
    - Directives
        + `ng-class` - add classes
        + `ng-click`, `ng-hide`, `ng-show`, `ng-blur`

## GET some todos

**public/scripts/services/data.js**

### Change this

```js
'use strict';

angular.module('todoListApp')
.service('dataService', function($http) {
  this.getTodos = function(cb) {
    $http.get('/mock/todos.json').then(cb);
  };
// more code
});
```

### To this:

```js
'use strict';

angular.module('todoListApp')
.service('dataService', function($http) {
  this.getTodos = function(cb) {
    $http.get('/api/todos').then(cb); // this line updated now points to our API route
  };
// more code
});
```

### Run Server and View in Browser
We no longer have todos but our app is running

#### What happened to our todos?
Because the `response` from the **API** was a little different than the response from our other `todos.json` file

We will use the convention of returning data as an Object with a single property that is **an array of items**

## View in the browser
`http://localhost:3000`

Should see something like this:

![no tasks?](https://i.imgur.com/PT5EgIF.png)

If we set a breakpoint in **main.js** (_Chrome dev tool_) and hit **play**. Then type `response` to see the data returned in an Object (we want that) and our `response.data` is coming back with our todos.
So we need to have the **response.data.todos** to be assigned to our todos variable.

**public/scripts/controllers/main.js**

### Change this:

```js
'use strict';

angular.module( 'todoListApp' )
  .controller( 'mainCtrl', function( $scope, dataService ) {

    dataService.getTodos( function( response ) {
      var todos = response.data; // this line
      $scope.todos = todos;
    } );
// more code
});
```

### To this:

```js
'use strict';

angular.module( 'todoListApp' )
  .controller( 'mainCtrl', function( $scope, dataService ) {

    dataService.getTodos( function( response ) {
      var todos = response.data.todos; // we updated this line
      $scope.todos = todos;
    } );
// more code
});
```

## View in the browser
* Remove breakpoints if you added them
* You should now see your todos

![todo list from express API](https://i.imgur.com/cSnItYm.png)
