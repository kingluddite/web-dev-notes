# Scaffolding App

**Scaffolding** How an Applications folders and files are layed out is called `scaffolding`

## A good practice
* Store all controllers in one folder
* All directives in one folder
* All services in another

Make the adjustments to create the following scaffolding for our Application

* create `controllers` and `services` folders inside the `scripts` folder
* create `main.js` inside the `controllers` folder
* create `data.js` inside the `services` folder

## The View
Point to all these files in the View

**index.html**

```html
  </div>
  <!-- END .list -->
  <script src="node_modules/angular/angular.min.js "></script>
  <script src="scripts/app.js "></script>
  <script src="scripts/controllers/main.js "></script>
  <script src="scripts/services/data.js "></script>
</body>

</html>
```

## The configuration file

**scripts/app.js**
```js
angular.module( 'todoListApp', [] );
```

## Small is good
We moved most stuff out of this file. It is good to have this file small. Other developers will use this file to see how you have your Angular app configured.

**note** We provide a second paramater `[]` in `angular.module()` because we want it to create an instance of our `todoListApp`. But when we use `angular.module()` inside `main.js` and `data.js` we do not provide a second parameter because we want to work with the existing todoListApp instance and not create another instance of our `todoListApp`

## The Controller
**scripts/controllers/main.js**

```js
'use strict';
angular.module( 'todoListApp' )
  .controller( 'mainCtrl', function( $scope, dataService ) {
    $scope.addTodo = function() {
      var todo = { name: "This is a new todo." };
      $scope.todos.push( todo );
    };

    $scope.helloConsole = dataService.helloConsole;

    dataService.getTodos( function( response ) {
      console.log( response.data );
      // return response.data;
      $scope.todos = response.data;
    } );

    $scope.deleteTodo = function( todo, $index ) {
      dataService.deleteTodo( todo );
      $scope.todos.splice( $index, 1 );
    };

    $scope.saveTodo = function( todo ) {
      dataService.saveTodo( todo );
    };
  } );
```

## The Services

**scripts/services/data.js**

```js
'use strict';
angular.module( 'todoListApp' )
  .service( 'dataService', function( $http ) {
    this.helloConsole = function() {
      console.log( 'This is the hello console service' );
    };

    this.getTodos = function( callback ) {
      $http.get( 'mock/todos.json' )
        .then( callback );
    };

    this.deleteTodo = function( todo ) {
      console.log( "The " + todo.name + " todo has been deleted!" );
      // other logic
    };

    this.saveTodo = function( todo ) {
      console.log( "The " + todo.name + " todo has been saved!" );
      // other logic
    };
  } );
```

## Test and View in Browser

Make sure it looks the same as it did before we made our code more organized.

## Using Filters to Order ng-repeat Items

When task is completed (_use checks checkbox_)

* Line through task
* Moves to bottom of task list

### Line through task when checked

**css/style.css**

```css
.list .completed label {
  color: #a7b9c4;
  text-decoration: line-through;
}

```

## Update the View

**index.html**

```html
<div class="item" ng-class="{'editing-item': editing, 'edited': todo.edited, 'completed': todo.completed }" ng-repeat="todo in todos">
```

Comment out the following lines:

**css/style.css**

* This will show the checkboxes when the page loads

```css
/*input[type="checkbox"] {
    display:none;
}
*/
```

Add the following lines and comment them out

```css
  // input[type="checkbox"] + span {
  //   display: inline-block;
  //   width: 19px;
  //   height: 19px;
  //   margin: -1px 4px 0 0;
  //   vertical-align: middle;
  //   background: url(checkbox-empty.svg) left top no-repeat;
  //   cursor: pointer;
  // }
  // input[type="checkbox"]:checked + span {
  //   background: url(checkbox-filled.svg) left top no-repeat;
  // }
```

We will eventually use 2 SVG images to show a checkbox and a checked checkbox.

## View in browser
Check tasks and watch the line through appear on that item

## Filter completed tasks to bottom of todo list
Save inside the CSS folder

[Download SVG #1](http://angular-basics.s3.amazonaws.com/checkbox-empty.svg)
[Download SVG #2](http://angular-basics.s3.amazonaws.com/checkbox-filled.svg)

[Angular filter Documentation](https://docs.angularjs.org/api/ng/filter/)

Update **index.html** View

```html
<div class="add"><a href="" ng-click="addTodo()">+ Add a New Task</a></div>
    <div class="item" ng-class="{'editing-item': editing, 'edited': todo.edited, 'completed': todo.completed }" ng-repeat="todo in todos | orderBy: 'completed'">
```

## Test in Browser
You'll see we have a problem in that when we check the items, they move to the top of our todo list.

With the `orderBy` filter `undefined` and `false` values are not considered the same.

We need to reverse the order of our filter, so make the following change in **index.html**

```html
<div class="add"><a href="" ng-click="addTodo()">+ Add a New Task</a></div>
    <div class="item" ng-class="{'editing-item': editing, 'edited': todo.edited, 'completed': todo.completed }" ng-repeat="todo in todos | orderBy: 'completed' : true">
```

## Test in browser
You'll see the completed (_checked_) todo items move to the bottom of our todo list!

### We have a problem
If you uncheck a todo, we have a problem
If we use **ng-inspector** we see:

1. Undefined values first
2. True values second
3. False values third

**Undefined** and **falsey** values are not treated as the same

* When page loads, all undefined values start at the top of the todo list

## Fix the problem with ng-init
* Only used with ng-repeat

**index.html** (View)

```html
<div class="item" ng-class="{'editing-item': editing, 'edited': todo.edited, 'completed': todo.completed }" ng-repeat="todo in todos | orderBy: 'completed' : true" ng-init="todo.completed = false">
```

## View in browser

### We have a problem
But now our completed list items are going to the top of the list which is not what we want.

### Solution
To fix this, remove the reverse sort on our filter

**index.html** (View)

```html
<div class="item" ng-class="{'editing-item': editing, 'edited': todo.edited, 'completed': todo.completed }" ng-repeat="todo in todos | orderBy: 'completed'" ng-init="todo.completed = false">
```

## View in Browser
Now it works the way we want it to.

### We still have a problem
Still one problem. New tasks are getting pushed to middle of our list.

### Solution
Easy fix with a nifty JavaScript modification

#### push vs unshift and the magic of JavaScript array methods

**app.js**

```js
'use strict';
angular.module( 'todoListApp' )
  .controller( 'mainCtrl', function( $scope, dataService ) {
    $scope.addTodo = function() {
      var todo = { name: "This is a new todo." };
      $scope.todos.unshift( todo );
    };
    MORE HERE
    });
```

comment in the CSS

**css/style.css**

```css
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"] + span {
    display: inline-block;
    width: 19px;
    height: 19px;
    margin: -1px 4px 0 0;
    vertical-align: middle;
    background: url(checkbox-empty.svg) left top no-repeat;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + span {
    background: url(checkbox-filled.svg) left top no-repeat;
  }
```

## Update our View

```html
 <input ng-model="todo.completed" type="checkbox" />
      <span ng-click="todo.completed = !todo.completed"></span>
```

## View in browser
Now we have custom checkboxes and it works the way we want

**tip** Move fast and break things but keep your codebase organized

## Remove the todos that is injected as a string

**index.html**

```html
    </div>
    {{todos}}
  </div>
```

## Create a custom directive

As our Application grows, we want to keep our files small and modularize when we can. Directives help us to do this. We will grab a chunk of HTML and pull it into it's own file. We need to update some code to make this work.

This is how we do that.

[Documentation for Angular Directives](https://docs.angularjs.org/guide/directive)

* Create a folder inside `scripts` called `directives` and make a new file inside that folder called `todos.js`
* Create a new folder called `templates` and create a file inside that called `todos.html`

**scripts/directives/todos.js**

* Naming convention - name the file the same thing that you will name the directive

```js
angular.module( 'todoListApp' )
  .directive( 'todos', function() {
    return {
      templateUrl: 'templates/todos.html'
    };
  } );
```

**Important**: I spent two hours wondering why my todos.html wasn't properly injected into **index.html** and it was because of a misspelling in the above chunk of code. The correct spelling is below: (Make sure to update your code accordingly or you won't see your todo list)

**scripts/directives/todos.js**

```js
angular.module( 'todoListApp' )
  .directive( 'todos', function() {
    return {
      templateUrl: 'templates/todos.html'
    };
  } );
```

Add file to our **index.html**

**views/todos.html**

```html
<!doctype html>
<html lang="en">

<head>
  <title>Angular Todo</title>
  <link href='css/style.css' rel='stylesheet'>
</head>

<body ng-app="todoListApp">
  <h1 ng-click="helloWorld()">My Todos</h1>
  <todos></todos>
  <script src="node_modules/angular/angular.min.js "></script>
  <script src="scripts/app.js "></script>
  <script src="scripts/controllers/main.js "></script>
  <script src="scripts/services/data.js "></script>
  <script src="scripts/directives/todos.js "></script>
</body>

</html>
```

All we do is create our own element and we name it `todos`.

## View in browser

## Improve our Application

### Save, saves all todos
### Click todo and that allows you to edit

## Save all todos

**main.js**

```js
$scope.saveTodos = function() {
      var filteredTodos = $scope.todos.filter( function( todo ) {
        if ( todo.edited ) {
          return todo;
        }
      } );
      dataService.saveTodos( filteredTodos );
    };
```

**data.js**

```js
this.saveTodos = function( todos ) {
      console.log( todos.length + " todos have been saved!" );
      // other logic
    };
```

**index.html**

```html
<a href="" ng-click='saveTodos(todo)'>save</a>
```

## Improve UI of editing
```html
<label ng-click="editing = true" ng-hide="editing" ng-click='helloWorld()'>{{todo.name}}</label>
```

And comment out editing button

**todos.html**

```html
<!-- <a href="" ng-click=" editing = !editing">edit</a>
 -->
```

[Finished Code Github Rep](http://kingluddite/angular-todo-app.git)
