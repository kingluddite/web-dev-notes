# Services

* **Controllers** usually confined to one part of Application interface
* All of **controllers** functions and values are literally scoped to a limited piece of the Application
    - But what if you want to pass data or methods to different parts of the Application?
        + This is what Services are used for

## Dependency Injection
* Services can be used across your Application for something called `Dependency Injection`

* This means multiple **controllers** can use the same service
    - As long as they define the service as a dependency

* Services are useful for
    - Providing **REST API** access methods to different pieces of the Application 
    - To sharing data about logged in user across the Application 

We will similate interaction with a **REST API** in our todo Application 

The pattern of writing functions one after another, for example `foo().bar().hello().goodbye()` is called `method chaining` (JavaScript)

**Question:** Services can be used to share data between different controllers
**Answer:**TRUE

Within the body of a service's callback function, for example: 

```
...service('someService, function() {
//inside here! 
})
```

The `this` keyword refers to the service itself

**app.js**

```js
angular.module( 'todoListApp', [] )
  .controller( 'mainCtrl', function( $scope, dataService ) {
    $scope.helloConsole = dataService.helloConsole;

    $scope.learningNgChange = function() {
      console.log( "An input changed!" );
    };

    $scope.todos = [
      { "name": "clear car" },
      { "name": "feed dog" },
      { "name": "buy groceries" },
      { "name": "exercise" },
      { "name": "read a chapter of a book" },
      { "name": "wake up early" }
    ];
  } )
  .service( 'dataService', function() {
    this.helloConsole = function() {
      console.log( 'This is the hello console service' );
    };
  } );
```

**index.html**

Apply helloConsole() method to the save button

`<a href="" ng-click="helloConsole()">Save</a>`

View in Chrome browser and click save and see the console. You should see the **console.log()** message.

Set a breakpoint in the Sources **js/app.js** file at `line 20`. If you click the **Save** button, you will see **line 20** highlight. It's working!

![console working](https://i.imgur.com/dW2iNcG.png)

## Using Services to Get Data
* Set up service to make request and wire it to our UI
* We will use the service to require `fake data` from the server

* Create folder called `mock` in Application root
* Create file inside mock called todos.json
* Grab todos array from app.js and paste into todos.json

**/mock/todos.json**

```json
[
      { "name": "clear car" },
      { "name": "feed dog" },
      { "name": "buy groceries" },
      { "name": "exercise" },
      { "name": "read a chapter of a book" },
      { "name": "wake up early" }
    ]
```

`mock` good naming convention anytime use have a place to store data that mocks a server

* We are simulating that we are making a request to a REST API
* Open in chrome and view (start server) 
`http://localhost:3000/mock/todos.json`

### $http provider
[documentation](https://docs.angularjs.org/api/ng/service/$http)

Update service in **app.js**

```js
.service( 'dataService', function($http) {
    this.helloConsole = function() {
      console.log( 'This is the hello console service' );
    };

    this.getTodos = $http.get( 'mock/todos.json' )
      .then( function( response ) {
        console.log( response.data );
        return response.data;
      } );
  } );
```

Update controller in **app.js**

```js
.controller( 'mainCtrl', function( $scope, dataService ) {
    $scope.learningNgChange = function() {
      console.log( "An input changed!" );
    };

    $scope.helloConsole = dataService.helloConsole;

    $scope.todos = dataService.getTodos;

  } )
```

* An http provider can be used to handle all http requests
* It has shortcut methods
* Angular has built in methods to help with other parts of the application (most of built ins are called providers and you can include them in any controller or service)

When we provide `function($http) {..}` that is dependency injection

## View in browser
Running on server and you will see the objects returned in the console but we don't see the todos on the page.

## JavaScript is asynchronous!
* Always keep JavaScript's asynchronous features in mind
* What is happening
  - The **controller** is firing the `getTodos` method
  - But the `response` is being returned after it has already created the **todos** variable
  - So the `$scope.todos` variable is undefined since the data is received after is has been created

We fix this by changing: THIS IS UNCLEAR. Make more clear!!!

```js
this.getTodos = function() {
      $http.get( 'mock/todos.json' )
        .then( function( response ) {
          console.log( response.data );
          return response.data;
        } );
    };
```

Then

```js
this.getTodos = function( callback ) {
      $http.get( 'mock/todos.json' )
        .then( callback);
    };
```

Then

```js
$scope.todos = dataService.getTodos( this.getTodos = function( callback ) {
      $http.get( 'mock/todos.json' )
        .then( callback );
    } );
```

And finally change:

```js
$scope.todos = dataService.getTodos( function( response ) {
      console.log( response.data );
      // return response.data;
      $scope.todos = response.data;
    } );
```

## View in browser
* You will see request made successfully
* There is now todos in your scope

## Using services to save and delete data

## Delete

Add to service **app.js**

```js
this.deleteTodo = function( todo ) {
      console.log( "The " + todo.name + " todo has been deleted!" );
      // other logic
    };
```

Add to controller in **app.js**

```js
$scope.deleteTodo = function( todo ) {
      dataService.deleteTodo( todo );
    };
```

Add to **delete** button in `index.html`

```html
<a href="" ng-click="deleteTodo(todo)" class="delete">Delete</a>
```

## Test in browser
Click delete and see output in console but the task not deleted.

Why was the task not deleted?

### Let's fix this
For each todo there is a `local variable` called **$index**

`<a href="" ng-click="deleteTodo(todo, $index)" class="delete">Delete</a>`

Change the controller to this:

```js
$scope.deleteTodo = function( todo, $index ) {
      dataService.deleteTodo( todo );
      $scope.todos.splice( $index, 1 );
    };
```

## Test in browser
You can now delete todos.

### Saving

Add to service

```js
this.saveTodo = function( todo ) {
      console.log( "The " + todo.name + " todo has been saved!" );
      // other logic
    };
```

Add to controller

```js
$scope.saveTodo = function( todo ) {
      dataService.saveTodo( todo );
    };
```

Add to **index.html** (view)

```html
<a href="" ng-click="saveTodo(todo)">Save</a>
```

Angular does not persist, so all data is lost after refreshing

Each refresh new request is made and new todoList Application is created in the browser

In JavaScript, promises are a way to manage data requested asynchronously.

The **$http.get** method returns a `promise`

**Question:** The **$http.get** method can take a `callback` as a parameter. 
**Answer:** TRUE

## Create a New Todo
![new todo](https://i.imgur.com/W6kvgyk.png)

**index.html**

## Add the View
Add the actual `Add a New Task button`

```html
<div ng-controller="mainCtrl " class="list ">
    <div class="add"><a href="">+ Add a New Task</a></div>
    <div class="item" ng-class="{'editing-item': editing, 'edited': todo.edited}" ng-repeat="todo in todos">
    MORE STUFF
    </div></div></div>
```

## Add the controller
```js
.controller( 'mainCtrl', function( $scope, dataService ) {
    $scope.addTodo = function() {
      var todo = { name: "This is a new todo." };
      $scope.todos.push( todo );
    };
MORE STUFF
});
```

## Wire it to View using ng-click

`<a href="" ng-click="addTodo()">+ Add a New Task</a>`
