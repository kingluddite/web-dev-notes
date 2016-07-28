# Angular Overview

Here is a famous website showcasing the speed and superior user experience Angular brings to the table:

[True Car Web Site](http://www.truecar.com)

1. User types **URL** into browser (aka client)
2. Request is made to a web server at that **URL**
3. Based on **URL** and other info like:
  - Is user logged in?
  - Their location
  - The device they're using
4. The server will send back a `response`
  * `response` includes
  * String of **HTML**
5. User's Browser will render page

## Many Frameworks Work Like This Web Server
* In **JavaScript**
  - There is **Express** is a `Web Server`, works by rendering templates on a server and sending them to the client
* In **Python**
  - There is **Django**
* In **Ruby**
  - There is **Rails**

## The Angular Way
**Angular works MUCH differently**

* Angular works 100% on user's computer (client)

When user makes a `request` with a **URL** where there is an Angular Application, the **server** sends back the `response` with the entire Angular Application

**How is this possible?**

Because:
* Angular is comprised completely in **JavaScript**
* Angular Applications can be run by a browser without needing anything additional from the **server**
  - This shifts a lot of work from the **server** to the **client**
  - Most cases have the Application running in the **client** but it will make additional `requests` for data via an **AJAX** call
  - However the Application files will not be sent by the **server** only the data itself (most of the time, this is **JSON**)

## Client Side Application Framework
Because Angular runs completely on the **client** we can call it a `Client Side Application Framework`

**note** 

* The `client` only makes a request for the Application _static files_, 
* The user can then interact with the Angular Application
* And the Application is able to make requests to the **server** for the data the Application needs
* The Application can even send data back to the **server** This is one reason Angular is
  - fast
  - user experience is smooth 
* All request to and from the **server** are typically for small amounts of data rather than large **HTML** files that contain subsequent requests for other static files like **CSS** and **JavaScript**

## Other Client Site Application Frameworks
Both work in similar ways to Angular
* Backbone
* Ember

## Core Components of Angular

### Four Main Concepts
1. Template
    * Hold mostly **HTML** and what structure our Application
    * Usually the word Template or View are the same thing in the world of Angular
2. Directives
    * Extend our **HTML** templates with tags and attributes embedded in our templates
    * Angular has its own built in directives
        - Can do a bunch of stuff like
            + Evaluate user interactions
            + Provide easy ways to manipulate data
            + We can create reusable custom directives
3. Controllers
    * Contain the logic that tells our Application how to behave
        - Examples
            + What data should be displayed on a button click
            + What elements should be displayed in a list
        - Controllers are like the **glue** of the Application
4. Scope ($scope)
  * Hardest part to undertand with Angular
    - Also the most important
  * The Scope is the part of the Application that allows you to manipulate data and make changes to the user interface
  * But the Application does not have just one scope
    - Every controller, directive and view (**HTML** template) can have it's own scope

## Our First Angular App

[Github Repo](https://github.com/kingluddite/todo-app.git)
RENAME JS to Scripts
**js/app.js**

```js
angular.module('todoListApp', []);
```

## Angular.module()
* First parameter:
  - The name of the Application
* Second parameter:
  - Defines the Applications' dependencies
  - Even though it is empty, it is essential to put empty array there because it is needed
* Angular knows to create an Application called `todoListApp`

## View it in the browser!
View in browser and you will see white page, no errors

Try to view after removing empty dependencies array and you will see this error

![forgot empty dependency array error](https://i.imgur.com/XGvxlf0.png)

## Bootstrap Our Angular App

* Tell Angular to run our Applicationin our Angular template

One way to do it is with a directive
Change Angular to angular the code#######
**index.html**

```html
<body ng-app="todoListApp">
  <script src="node_modules/Angular/Angular.min.js"></script>
  <script src="js/app.js"></script>
</body>
```

* Our Angular Applicationis set up and ready to go

## Custom Angular Directive

**note** Angular also has a plethora of built-in directives

**scripts/hello-world.js**

* remember to include it in **HTML** after **app.js**

`angular.module('todoListApp');`

We put this at the top of `hello-world.js` but we don't include dependencies array because we don't want Angular to create another Application, instead we want Angular to look for an already existing Application.

**js/hello-world.js**

```js
'use strict';
angular.module( 'todoListApp' )
  .directive( 'helloWorld', function() {
    return {
      template: 'This is the hello world directive'
    };
  } );
```

**index.html**

```html
<body ng-app="todoListApp">
  <hello-world></hello-world>
  <script src="node_modules/Angular/Angular.min.js"></script>
  <script src="js/app.js"></script>
  <script src="js/hello-world.js"></script>
</body>
```

* Why did angular use all lower case for their directives?
    - Angular dev team knew **HTML** was usually written in lowercase so they wanted to keep it this way

## View in browser!
You should see `This is the hello world directive`.

View the page source in Chrome.

## Injected!

![template injected into directive](https://i.imgur.com/30Ms5Rz.png)

Template is injected into our directive

## Attribute directives instead of **HTML** tag directives

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

**app.js**

## Add another controller

```js
'use strict';
angular.module( 'todoListApp', [] )
.controller( 'mainCtrl', function( $scope ) {
  $scope.helloWorld
 = function() {
    console.log( 'Hello from the helloWorld controller function, in the mainCtrl' );
  };
} );

.controller( 'coolCtrl', function( $scope ) {
  $scope.whoAmI = function() {
    console.log( "hello from coolCtrl funtion!" );
  };
} );
```


### Question
How can we use the helloWorld console function from the mainCtrl when we're inside the coolCtrl?

**Answer**
Because of prototypical inheritance

update **index.html**

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
  <script src="node_modules/Angular/Angular.min.js "></script>
  <script src="scripts/app.js "></script>
</body>

</html>
```

## Stop and Restart python server

![new scope](https://i.imgur.com/OzNmw92.png)

Try to avoid using anything in the $rootScope. The reason is the same for trying to not pollute the global scope which is a general concept in all programming. If you pollute the global scope, lots of bad things can happen because you increase the chance of a naming conflict with a function or variable.

## Children scope
* Children in scope have access to their parents ctrls
* Inheritance from the parent only takes place if there is not a value or a method of the same name on the child
  - Prototypical Inheritance only flows in one direction >>> parents to children

## Sibling controllers
Sibling controllers will not have access to each other's scopes

sibling scopes are completely isolated
