# Services

* controllers usually confined to one part of app interface
* all of controllers functions and values are literally scoped to a limited piece of the application
    - but what if you want to pass data or methods to different parts of the application?
        + this is what Services are used for

* services can be used across your app for something called `Dependency Injection`

* this means multiple controllers can use the same service
    - as long as they define the service as a dependency

* services are useful for
    - providing REST API access methods to different pieces of the app
    - to sharing data about logged in user across the app

we will similate interaction with a REST API in our todo app

The pattern of writing functions one after another, for example `foo().bar().hello().goodbye()` is called `method chaining` (JavaScript)

Services can be used to share data between different controllers
TRUE

Within the body of a service's callback function, for example: 
```
...service('someService, function() {
//inside here! 
})
```

the `this` keyword refers to the service itself

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

View in Chrome browser and click save and see the console. You should see the console.log() message.

Set a breakpoint in the Sources js/app.js file at line 20. If you click the Save button, you will see line 20 highlight. It's working!

![console working](https://i.imgur.com/dW2iNcG.png)

