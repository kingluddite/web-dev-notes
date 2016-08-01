# CRUD and routes

## Creating Data with POST Routes in Express

### POST
Used to send new data to the **API**

Make sure **mongod** and **nodemon** are running in your terminal tabs

**src/app/index.js**

We are updating this: `// TODO: Add POST route to create new entries`

### We are using our `/todos` route twice? Is this correct?
Yes. When a request is made to the `/todos` **URL** with **GET** method, Express knows to run the `router.get()` logic
When a `request` is made with the **HTTP** **POST** method, Express knows to run the `router.post()` logic
* The `post()` method is typically used to send post data to the server
* By default, Express does not have a `body parser`
* What this means is without a **body parser** installed when we post data to the `/todos` route, even though our logic is correct, we will probably get back an empty **response body**

## Test it out with postman
* Open postman
* Change **GET** to **POST** (dropdown)
* put in URL `localhost:3000/api/todos`
* Select **Body**
* Click `Raw`

![Post data in Postman](https://i.imgur.com/p67M0Sm.png)

**note: Common Problem to Avoid**
* I had problems inserting raw text
  - The reason is I did not switch from Authorization to Body

This is what loads up by default in Postman

![default Postman](https://i.imgur.com/8ccv2Oh.png)

Change to Body and Raw like in the following screenshot

![enter a post in Postman](https://i.imgur.com/ShBHEFf.png)

Also don't forget to change Text to JSON(application/json) in the dropdown

![Switch to JSON](https://i.imgur.com/FblxNUg.png)

When you hit **Send**, you get back a **Status 200 OK** but the `response` is empty

## Body-Parser module
In order to parse request bodies, we use the **body-parser** module

### Install the body-parser module

```
$ npm install body-parser --save -E
```

#### Restart our server
Check to make sure **body-parser** has been installed
  * By looking inside our `package.json` file

```json
"dependencies": {
    "angular": "^1.5.8",
    "body-parser": "1.15.2", // THIS IS THE LINE THAT SHOULD HAVE BEEN ADDED
    "express": "4.14.0",
    "mongoose": "4.5.7"
  }
```

Now we need to tell Express to use **body-parser**'s `json()` method

**src/app.js**

```js
'use strict';

// need to import express to use it
var express = require( 'express' );

var router = require( './api' );
var bodyParser = require( 'body-parser' ); // ADD THIS LINE

// need to create an instance of express server
// allows us to set up any middle ware we may need
// to configure routes and start the server
var app = express();

require( './database' );
require( './seed' );

// tell express to server static files from public folder
app.use( '/', express.static( 'public' ) );
app.use( bodyParser.json() ); // ADD THIS LINE


app.use( '/api', router );

app.listen( 3000, function() {
  console.log( 'Server is listening on port 3000' );
} );
```

Now if you run Postman again, you will see it shows the **JSON** data in the **respose body**

Wahoo!

## Create data
The `C` in CRUD

### Now we'll store our todo in the database

**src/api/index.js**

```js
router.post( '/todos', function( req, res ) {
  var todo = req.body;
  Todo.create(todo, function(err, todo) {
    if(err) {
      return res.status(500).json({err: err.message});
    } else {
      res.json({'todo': todo, message: 'Todo Created'});
    }
  });
  // res.send( todo ); OLD CODE
} );
```

`return res.status(500).json({err: err.message});`
* Returns a generic 500 error
* Also returns a Mongoose error

Now if you use Postman to create 3 todos.

![Todo Created in Postman](https://i.imgur.com/J3vLtuf.png)

Then switch to GET to see all your todos (and the 3 todos you just created)

![GET todos](https://i.imgur.com/G0Hffzl.png)

## Edit Data with PUT Routes in Express

The **Put route** will look similar to the **Post route** with a couple key differences:

1. So you can start by copying the Post route and pasting it below the Post route and renaming `post()` to `put()`
2. Add a parameter using this syntax `/:name-of-parameter`
  + example: `/todos/:id`

### How do we get the id parameter?
Using `req.params` (**req.params.id**)

This is all handled by Express

We need to make sure the `todo` exists and the `todo`'s *id* equals the **id** in the `request`

```js
if (todo && todo._id !== id) {}
```

## findByIdAndUpdate()
Mongoose has a `findByIdAndUpdate(id, new data we are sending to MongoDB, callback)` method
* Very convenient

**src/api/index.js**

```js
router.put( '/todos/:id', function( req, res ) {
  var id = req.params.id;
  var todo = req.body;
  if ( todo && todo._id !== id ) {
    return res.status( 500 ).json( { err: "Ids don't match!" } );
  }
  Todo.findByIdAndUpdate( id, todo, function( err, todo ) {
    if ( err ) {
      return res.status( 500 ).json( { err: err.message } );
    } else {
      res.json( { 'todo': todo, message: 'Todo Created' } );
    }
  } );
} );
```

1. Run `nodemon`
2. Check **Postmon**
3. Switch to **PUT**
4. Use this test **URL**: `localhost:3000/api/todos/bogus`

**Output:** `{"err": "Ids don't match!"}`

5. Now copy to your clipboard an **id** from a **todo**
  * (_use GET or Postman's history_)
6. Use **PUT**
7. Add that **id** to your **URL**

Example: `localhost:3000/api/todos/579e7792feb4335a66ade912`

```json
{
 "name": "Soccer",
 "completed": true,
 "_id": "579e7792feb4335a66ade912"
}
```

![Put updating data](https://i.imgur.com/zqO86uV.png)

You just updated MongoDB.

Wahoo!

## We sent our data as "completed": true but it came back false. Why?
By default Mongoose is sending back **old data**. We need to specifically tell it to send back **new data**.

## {new: true} option
`new` option by default is `false`

Easy to do just pass `findByIdAndUpdate()` method the `{}` options Object

```js
Todo.findByIdAndUpdate( id, todo, {new: true}, function( err, todo ) {
    if ( err ) {
      return res.status( 500 ).json( { err: err.message } );
    } else {
      res.json( { 'todo': todo, message: 'Todo Created' } );
    }
  } );
```

Send your put data again and this time you will see completed is set to `true`

Make sure `mongod` and `nodemon` are running

## Make webpack watch for changes
* Rebuilds bundles

```
$ webpack --watch
```

## $q
[link to documentation of $q](https://docs.angularjs.org/api/ng/service/$q)

A service that helps you run functions asynchronously, and use their return values (or exceptions) when they are done processing.

**/app/scripts/services/data.js**

```js
this.saveTodos = function( todos ) {
      //console.log( "I saved " + todos.length + " todos!" );
      var queue = [];
      todos.forEach( function( todo ) {
        var request;
        if ( !todo._id ) {
          request = $http.post( '/api/todos', todo );
        }
        queue.push( request );
      } );
      // $q will run all of our requests in parallel
      $q.all( queue ).then( function( results ) {
        console.log( 'I saved ' + todos.length + ' todos' );
      } );
    };
```

## Jump into your controller

**app/scripts/controllers/todo.js**

* Lets look at the **saveTodos()** method
* Currently we filter a list of **todos** and then sends those **todos** to the **dataService** `saveTodos()` method (_That we just edited above_)

Because `dataService.Todos()` returns a **promise**, we can do something when the save is complete

## resetTodoState()

```js
// more code
$scope.saveTodos = function() {
      var filteredTodos = $scope.todos.filter( function( todo ) {
        if ( todo.edited ) {
          return todo;
        }
      } );
      dataService.saveTodos( filteredTodos )
        .finally( $scope.resetTodoState() );
    };

    // reset the property edit to false on each todo
    $scope.resetTodoState = function() {
      $scope.todos.forEach( function( todo ) {
        todo.edited = false;
      } );
    };
// more code
```

## Run in browser
* We run and it tells us how many todos were saved
* But our service is not returning the promise

![error not returning](https://i.imgur.com/fSaRVPG.png)

Update **app/scripts/services/data.js** to:

```js
return $q.all( queue ).then( function( results ) {
        console.log( 'I saved ' + todos.length + ' todos' );
      } );
```

## View again
It works when you edit and save

Let's update the same **todos** method to also use the **PUT** route when an existing **todo** is edited

```js
this.saveTodos = function( todos ) {
      //console.log( "I saved " + todos.length + " todos!" );
      var queue = [];
      todos.forEach( function( todo ) {
        var request;
        if ( !todo._id ) {
          request = $http.post( '/api/todos', todo );
        } else {
          request = $http.put( '/api/todos/' + todo._id, todo ).then( function( result ) {
            todo = result.data.todo;
            return todo;
          } );
        }
        queue.push( request );
      } );
      // code
      };
```

1. Edit an existing todo
2. Save it
3. You will see that it now persists!

## ngInclude
Make sure `mongod` and `nodemon` are running

Create `navbar.html` inside `templates`

**navbar.html**

```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="http://kingluddite.com">Kingluddite</a></li>
  </ul>
</nav>
```

Include it inside our **public/index.html**

```html
<body ng-app="todoListApp">
  <ng-include src="'templates/navbar.html'"></ng-include>
  <h1>My TODOs!</h1>
  <div class="list" ng-controller="mainCtrl">
    <div class="add">
      <a href="#" ng-click="addTodo()">
        + Add a New Task</a>
    </div>
    <todo></todo>
  </div>
  <!-- more code -->
  </body>
```

* Don't forget double quotes and single quotes together!
    - `src` attribute takes an expression
    - The express should result in a path to the template, in our example above the expression is just a string which will result in the contents of the string (you could also pass a function)
    - `<ng-include src="foobar()">`
        + That results in a path to the template
        + You could also do `src="'/path/' + someScopeVariable + '/template.html'"></ng-include>`
* When you request a template
* Angular first looks inside **$templateCache**
* If not found, Angular fetches the template from the server
* Then Angular stores the template in the **$templateCache** for future requests

[nginclude documentation](https://docs.angularjs.org/api/ng/directive/ngInclude)

## Angular-wrapped JavaScript APIs
Angular keeps data in our controllers in sync with data displayed in a browser
through two way data binding 

calling our API with predetermined time intervals

[WindowTimers.setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)
repeatedly calls a function or code snippet with a fixed time delay between each call

Using setInterval in Angular app
* it is best to use Angular's [$interval](https://docs.angularjs.org/api/ng/service/$interval) service instead

$timeout service (mimicks JavaScript's setTimeout method)
[MDN link](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout)

setTimeout - call code snippet after specified amount of time
also Angular has service providers for:
$window
$location
$log
[And many more](https://docs.angularjs.org/api/ng/service/$timeout)

## Using $log and $interval
we inject them as local variables within our mainCtrl function

```js
angular.module( 'todoListApp' )
  .controller( 'mainCtrl', function( $scope, $log, $interval, dataService ) {
$interval($scope.counter, 1000, 10);
});
```

* 2nd param - 1 second
* 3rd param - # times called (0 is infinite)

## Complete App
[github](https://github.com/treehouse-projects/mean-todo/tree/master/public)

```js
angular.module( 'todoListApp' )
  .controller( 'mainCtrl', function( $scope, $log, $interval, dataService ) {

    $scope.seconds = 0;

    $scope.counter = function() {
      $scope.seconds++;
      // $log.log( $scope.seconds + ' have passed' );
      // $log.warn( $scope.seconds + ' have passed' );
      $log.error( $scope.seconds + ' have passed' );
    };

    $interval( $scope.counter, 1000, 10 );
    });
```

