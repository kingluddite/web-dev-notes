# Todo App

## Features
* Buttons
    - Save Task
    - Add a New Task
    - Delete a task
* checkboxes with labels
    - change to inputs (used to edit value)

**css/style.css**

```css
@import url(https://fonts.googleapis.com/css?family=Varela+Round);
body {
  color: #2d3339;
  font-family: "Varela Round";
  text-align: center;
  background: #edeff0;
  font-size: 16px; }

a {
  color: #3f8abf;
  text-decoration: none; }
  a:hover {
    color: #65a1cc; }

.list {
  background: #fff;
  width: 80%;
  min-width: 500px;
  margin: 80px auto 0;
  border-top: 40px solid #5a6772;
  text-align: left; }
  .list .item {
    border-bottom: 2px solid #edeff0;
    padding: 17px 0 18px 17px; }
    .list .item label {
      padding-left: 5px;
      cursor: pointer; }
    .list .item .editing-label {
      margin-left: 5px;
      font-family: "Varela Round";
      border-radius: 2px;
      border: 2px solid #a7b9c4;
      font-size: 16px;
      padding: 15px 0 15px 10px;
      width: 60%; }
    .list .item .actions {
      float: right;
      margin-right: 20px; }
      .list .item .actions .delete {
        color: #ed5a5a;
        margin-left: 10px; }
        .list .item .actions .delete:hover {
          color: #f28888; }
    .list .item.editing .actions {
      margin-top: 17px; }
  .list .edited label:after {
    content: " edited";
    text-transform: uppercase;
    color: #a7b9c4;
    font-size: 14px;
    padding-left: 5px; }
  .list .completed label {
    color: #a7b9c4;
    text-decoration: line-through; }
  .list .add {
    padding: 25px 0 27px 25px; }

input[type="checkbox"] {
    display:none;
}
input[type="checkbox"] + span {
    display:inline-block;
    width:19px;
    height:19px;
    margin:-1px 4px 0 0;
    vertical-align:middle;
    background:url(checkbox-empty.svg) left top no-repeat;
    cursor:pointer;
}
input[type="checkbox"]:checked + span {
    background:url(checkbox-filled.svg) left top no-repeat;
}
```

**index.html**

```html
<!doctype html>
<html lang="en">

<head>
  <title>Angular Todos</title>
  <link href='css/style.css' rel='stylesheet'>
</head>

<body ng-app="todoListApp">
  <h1>My Todos</h1>
  <div class="list">
    <input type="checkbox" />
    <label for="" class="editing-label">A sample todo</label>
    <input class="editing-label" type="text">
    <div class="actions">
      <a href="">edit</a>
      <a href="">save</a>
      <a href="" class="delete">delete</a>
    </div>
  </div>
  <!-- END .list -->
  <script src="node_modules/angular/angular.min.js"></script>
  <script src="scripts/app.js"></script>
</body>

</html>
```

## View in browser
Should look like this:

![first todos look](https://i.imgur.com/0vjOHGv.png)

## Creating a Controller
* Controllers are part of the Angular application infrastructure that contain most of the logic for manipulating the UI
* Controllers determine the state of the application
* Controllers have the ability to handle data

### What is Application state?
The current mode of the application

* Examples
  - state where editing is `true`
  - state where editing is `false`

User may not know what state the application is in or that application state has changed

* The best user interfaces are subtle
* But the application logic can be different based on the state

## Naming convention for controllers
When naming controllers it is recommended to use **camelCase** notation.

**Example:**

`someNameCtrl`

**scripts/app.js**

```js
'use strict';
angular.module( 'todoListApp', [] )
  .controller( 'mainCtrl', function( $scope ) {
    $scope.helloWorld = function() {
      console.log( "Hello from the helloWorld controller function, in the mainCtrl" );
    };
  } );
```

* In order to use the controller in our application we have to `inject` in into our template
  * Inject means `Hey Angular, this is where I want my controller to be used`

## ng-app and ng-controller

**index.html**

```html
<body ng-app="todoListApp">
  <h1>My Todos</h1>
  <div ng-controller="mainCtrl" class="list">
    <input type="checkbox" />
```

* We set the attribute **ng-controller** equal to the name of our controller `mainCtrl`
* This should exactly match the parameter we passed into our controller method in `app.js`

## ng-click
###  Outside of scope
If we move our **ng-click** outside of the scope, it won't work

try this in **index.html**

```html
<body ng-app="todoListApp">
  <h1 ng-click="helloWorld()">My Todos</h1>
```

But if you put it inside our scope it works
* check in browser and click the **H1** or save buttons and look at the output in the Chrome console

## How should I think of the concept of `$scope`?
`$scope` is like the area of operation for a controller.

## ng-inspector and AngularJS Batarang
### Tools
1. Explore Scope
2. Debug Angular applications

### Add these extensions for Chrome
* ng-inspector for AngularJS
* AngularJS Batarang

Click the **ng-inspector** icon at the top of the Chrome browser

![ng-inspector on Chrome](https://i.imgur.com/h5Qh3wd.png)

## Let's Use the Python Server

## Caution - Does not work locally (file:///)

Use the **python server** by typing this in the Terminal

```
$ python -m SimpleHTTPServer 3000
```

* Allow python to accept incoming network communications when it asks you

Browse to `http://localhost:3000` and then click **ng-inspector**

If all goes well, you should see something like this showing you the different scopes

![ng-inspector working](https://i.imgur.com/xlhB240.png)

After you install AngularJS Batarang, you'll have a new tab in your chrome dev console

## Sibling scope

```js
// more code
.controller( 'coolCtrl', function( $scope ) {
    $scope.whoAmI = function() {
      console.log( "hello from coolCtrl funtion!" );
    };

    $scope.helloWorld = function() {
      console.log( 'Not the main ctrl' );
    };
  } )
  .controller( 'iAmSibling', function( $scope ) {
    $scope.foobar = 1234;
  } );
// more code
```

**index.html**

```html
<!-- END .list -->
  <div ng-controller="iAmSibling">
    {{foobar}}
  </div>
```

## View in browser
* Will see the string 1234 on page

![sibling $scope](https://i.imgur.com/dPrUuj0.png)

* You will see that `mainCtrl` and `iAmSibling` because they are siblings, do not share scope

## Question: `ng-click` can only be used on `<button>` or `<a>` tags.
**Answer**
false
