# Angular Overview

user types URL into browser (aka client)
request is made to a web server at that URL
based on URL and other info like:
* is user logged in?
* their location
* the device they're using

the server will send back a response
response includes
* string of HTML
  - User's Browser Will Render

Many Frameworks Work Like This Web Server
* In JavaScript there is Express is a Web Server, works by rendering templates on a server and sending them to the client
* In Python, there is Django
* In Ruby, there is Rails

Angular works Much differently
* Angular works 100% on user's computer (client)

When user makes a request with a URL where there is an Angular application,
the server sends back the response with the entire Angular application
How is this possible?
Because Angular is comprised completely in JavaScript
* Angular applications can be run by a browser without needing anything additional from the server
* this shifts a lot of work from the server to the client
* most cases have the application running in the client but it will make additional requests for data via an AJAX call
  + however the application files will not be sent by the server only the data itself (most of the time, this is json)

Because Angular runs completely on the client we can call it a `Client Side Application Framework'

**note** The client only makes a request for the application static files, the user can then interact with the angular app and the app is able to make requests to the server for the data the application needs
the app can even send data back to the server
* this is one reason angular is so fast
* also why user experience is smooth (like [True Car Web Site](https://www.truecar.com/#/search))
* all request to and from the server are typically for small amounts of data rather than large html files that contain subsequent requests for other static files like CSS and JavaScript

## Other Client Site Application Frameworks
* Backbone
* Ember

Both work in similar ways

## Core Components of Angular

### Four Main Concepts
1. Templates
    * Hold mostly HTML and what structure our application
    * Usually the word Template or View are the same thing in the world of Angular
2. Directives
    * Extend our HTML templates with tags and attributes embedded in our templates
    * Angular has its own built in directives
        - Can do a bunch of stuff like
            + Evaluate user interactions
            + Provide easy ways to manipulate data
            + We can create reusable custom directives
3. Controllers
    * Contain the logic that tells our application how to behave
        - Examples
            + What data should be displayed on a button click
            + What elements should be displayed in a list
        - Controllers are like the **glue** of the application
4. Scope ($scope)
    * Hardest part of angular to understand
    * Also the most important
    * The Scope is the part of the application that allows you to manipulate data and make changes to the user interface
        - But the application does not have just one scope
            + Every controller, directive and view (HTML template) can have it's own scope

## Our First Angular App

[Github Repo](https://github.com/kingluddite/todo-app.git)

**js/app.js**

```
angular.module('todoListApp', []);
```

## angular.module()
* first parameter: app name
* second parameter: defines apps dependencies
    - even though it is empty, it is essential to put empty array there because it is needed so Angular knows to create an app called `todoListApp`

View in browser and you will see white page, no errors

Try to view after removing empty dependencies array and you will see this error

![forgot empty dependency array error](https://i.imgur.com/XGvxlf0.png)

## Bootstrap Our Angular App
Tell Angular to run our app in our Angular template

One way to do it is with a directive

**index.html**

```html
<body ng-app="todoListApp">
  <script src="node_modules/angular/angular.min.js"></script>
  <script src="js/app.js"></script>
</body>
```
Our Angular app is set up and ready to go

## Custom Angular Directive

* **note** Angular also has a plethora of built-in directives

**js/hello-world.js**

* remember to include it in HTML after app.js

`angular.module('todoListApp');`

We put this at the top of hello-world.js but we don't include dependencies array because we don't want Angular to create another application, instead we want Angular to look for an already existing app.

**js/hello-world.js**

```js
angular.module( 'todoListApp' )
  .directive( 'helloWorld', function() {
    return {
      template: "This is the hello world directive"
    };
  } );
```

**index.html**

```html
<body ng-app="todoListApp">
  
  <hello-world></hello-world>

  <script src="node_modules/angular/angular.min.js"></script>
  <script src="js/app.js"></script>
  <script src="js/hello-world.js"></script>
</body>
```
* why all lower case?
    - Angular dev team knew HTML was usually written in lowercase so they wanted to keep it this well

## View in page
You should see `This is the hello world directive`.

View source

![template injected into directive](https://i.imgur.com/30Ms5Rz.png)

Template is injected into our directive

## Attribute directives instead of HTML tag directives

```html
<body ng-app="todoListApp">
  <div hello-world></div>
  <script src="node_modules/angular/angular.min.js"></script>
  <script src="js/app.js"></script>
  <script src="js/hello-world.js"></script>
</body>
```

Same output but this time we are using an attribute directive

## restrict option
Restricts how the directive will be used

```js
angular.module( 'todoListApp' )
  .directive( 'helloWorld', function() {
    return {
      template: "This is the hello world directive",
      restrict: "E"
    };
  } );
```


* The **E** limits the template to be an element. In our html if we change:

```html
<body ng-app="todoListApp">
  <div hello-world></div>
  <hello-world></hello-world>
  <hello-world></hello-world>
```

It will output 2 because they are elements but the attribute is restricted and won't be output

app.js

add another controller

```js
angular.module( 'todoListApp', [] )
  .controller( 'mainCtrl', function( $scope ) {
    $scope.helloWorld = function() {
      console.log( "Hello from the helloWorld controller function, in the mainCtrl" );
    };
  } )

.controller( 'coolCtrl', function( $scope ) {
  $scope.whoAmI = function() {
    console.log( "hello from coolCtrl funtion!" );
  };
} );
```


how can we use the helloWorld console function from the mainCtrl when we're inside the coolCtrl

* because of prototypical inheritance

update index.html

```html
<!doctype html>
<html lang="en">

<head>
  <title></title>
  <link href='css/style.css' rel='stylesheet'>
</head>

<body ng-app="todoListApp">
  <div ng-controller="mainCtrl " class="list ">
    <h1 ng-click="helloWorld()">My Todos</h1>
    <input type="checkbox" />
    <label class="editing-label" ng-click="helloWorld()">A sample todo</label>
    <input class="editing-label" type="text">
    <div class="actions" ng-controller="coolCtrl">
      <a href="" ng-click="whoAmI()">Edit</a>
      <a href="" ng-click="helloWorld()">Save</a>
      <a href="" class="delete">Delete</a>
    </div>
  </div>
  <!-- END .list -->
  <script src="node_modules/angular/angular.min.js "></script>
  <script src="js/app.js "></script>
</body>

</html>
```

stop and restart python server

![new scope](https://i.imgur.com/OzNmw92.png)

try to avoid using anything in the $rootScope

children in scope have access to their parents ctrls
inheritance from the parent only takes place if there is not a value or a method of the same name on the child (prototypical inheritance only flows in one direction... parents to children)

sibling controllers will not have access to each other's scopes
sibling scopes are completely isolated
