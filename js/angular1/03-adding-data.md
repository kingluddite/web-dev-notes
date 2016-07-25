# Adding Data To Your App Using ng-model

## Data Binding
Describe a point where an applications data and its logic and variables come together

**one way data binding** in many applications, data binding takes place at a single point, and the developers job is to keep all that data in sync

* Can be cumbersome if you have lots of data and lots of user interactions

## Data Binding in Angular
**two way data binding** Angular data binding works differently, when Angular data is bound to the $scope, Angular keeps the data in the scope, with the applications underlining data store

* Above is complex but gleen from it that any time the user interacts with the Applications, it updates the data in the scope of your Application, and any time the scope is updated, Angular has a process to update the underlining data that is affected

### Simple Data Binding
Task: edit the todo name field with the input HTML field

Angular constantly updates data in the scope as the data is changed

Let's see that in action

## ng-model directive

**index.html**

```html
<input type="checkbox" />
    <label class="editing-label" ng-click="helloWorld()">A sample todo</label>
    <input ng-model="todo" class="editing-label" type="text">
    <div class="actions" ng-controller="coolCtrl">
      <a href="" ng-click="whoAmI()">Edit</a>
```

## Refresh page, and view **ng-inspector**
You will see no change

But if you click in the input field, you will see todo created and as you change the text in the input field, the todo in **ng-inspector** updates, this is two way binding in action

`<input ng-model="todo.name" class="editing-label" type="text">`

* Now if you change the **ng-model** to `ng-model="todo.name"` and view in **ng-inspector** you will see that todo is an object and we're storing the value of the input on the name key

## ng-model
Now let's ad `ng-model` to our checkbox

`<input ng-model="todo.completed" type="checkbox" />`

Comment out the custom css for checkbox

**style.css**

```css
input[type="checkbox"] {
//   display: none;
// }

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

## View in browser
You will see checkbox

* Open **ng-inspector** and then check the checkbox in browser
* You will see the todo object inside the **ng-inspector** and completed is true, uncheck it and it will be set to false

Change this

`<label class="editing-label" ng-click="helloWorld()">A sample todo</label>`

To this

`<label class="editing-label" ng-click="helloWorld()">{{todo.name}}</label>`

* If you forget the `{{expression}}` around the expression, Angular will just render the literal string `todo.name`, the `{{}}` tell Angular to render the expression

## Refresh the page
Start typing in input box and you will see the task name appear simultaneously 

**Very cool!**

Inside a directive like `ng-click="helloWorld()"` Angular knows to evaluate an expression already but in plain text like `<label>{{todo.name}}</label>` the curly braces tell it to render the expression

## ng-click and changing Application States

* ng directives can be used as attributes and also as stand alone elements

[ng-click documentation](https://docs.Angularjs.org/api/ng/directive/ngClick)

* Almost all built-in directives will be used as **attributes**

`<a href="" ng-click=" editing = !editing">Edit</a>`

* If editing is set to true, set it to FALSE
* If editing is set to false, set it to TRUE

To see it work:
* Save **index.html**
* View in browser running on simple python server and use **ng-inspector**
* Click `Edit` multiple times
* You will see `editing` in ng-inpsector toggle TRUE and FALSE on ever click

`<label ng-hide="editing">`

* When the expression evaluates to TRUE, hide this content
* Our expression will be a single variable `editing`
* I removed the following code from `app.js`

```js
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
```

* Also remove `coolCtrl`, `whoAmI` and `iAmSibling` references from `index.html`

Now if you refresh `index.html` in browser
add some text in input, it will simultaneously add to label, click edit multiple times and you will see it toggle between showing and hiding the label because of our `ng-hide` directive that sets `editing` (the `ng-click` toggles the editing variable to true or false with every click)

## ng-show directive
* opposite of ng-hide

```html
<label ng-hide="editing" class="editing-label" ng-click="helloWorld()">{{todo.name }}
    </label>
    <input ng-show="editing" ng-model="todo.name" class="editing-label" type="text">
```

Now when you click **edit**, you'll see the input box and when you click **edit** again, you'll see the label.

## array of fake todos

```js
Angular.module( 'todoListApp', [] )
  .controller( 'mainCtrl', function( $scope ) {
    $scope.helloWorld = function() {
      console.log( "Hello from the helloWorld controller function, in the mainCtrl" );
    };

    $scope.todos = [
      { "name": "clear car" },
      { "name": "feed dog" },
      { "name": "buy groceries" },
      { "name": "exercise" },
      { "name": "read a chapter of a book" },
      { "name": "wake up early" }
    ];
  } );
```

Add this expression inside **index.html**

```html
      <a href="" class="delete">Delete</a>
    </div>
    {{todos}}
  </div>
```

## View page in browser
You will see the array of todo objects on your page

![array of todos](https://i.imgur.com/sJw0pYx.png)

## ng-repeat

We'll use this directive to create a todo for each element in our data

`<div ng-repeat="some-item in some-iterable">`

* `some-item` can be named whatever you want

### Naming Convention
Name the item that you are iterating a singular version of the object you are iterating through

**index.html**

```html
    <h1 ng-click="helloWorld()">My Todos</h1>
    <div ng-repeat="todo in todos">
      <input ng-model="todo.completed" type="checkbox" />
      <label ng-hide="editing" class="editing-label" ng-click="helloWorld()">{{todo.name }}
      </label>
      <input ng-show="editing" ng-model="todo.name" class="editing-label" type="text">
      <div class="actions">
        <a href="" ng-click=" editing = !editing">Edit</a>
        <a href="" ng-click="helloWorld()">Save</a>
        <a href="" class="delete">Delete</a>
      </div>
    </div>
    {{todos}}
  </div>
```

![ng-repeat output](https://i.imgur.com/tpyKzMG.png)

Now if you click **edit** and change any task input, you'll see the array of objects update
* This is a big time saver because you don't need to spend time coding when the HTML element is being edited and the data itself

**ng-repeat** will create a new scope for each element in the array

* See in **ng-inspector**
  - They are all children of the **mainCtrl** scope
  - But they have the same variables
  - Each has a `todo` variable, and some have editing variables that have been set
  - These variables do not effect each other because they are in different sibling scopes
  - The **mainCtrl** is not cluttered with variables that don't matter to it

## ng-blur directive
* improves user experience

[documentation](https://docs.Angularjs.org/api/ng/directive/ngBlur)

* Corresponds to JavaScript's BLUR event
* Fired any time an INPUT loses focus

![blur event would help here](https://i.imgur.com/TOBZ3X7.png)

* Instead of dragging mouse all the way to right and clicking `Edit` button, we could add a click event to task label, and when clicked it turns to input and when we click away (blur focus) it returns to label (improved user experience)

`<input ng-blur="editing = false;"...>`

* `ng-blur` fires in only one direction
 - This means that it fires only when user is clicking out of the input
 - Unlike **ng-click** directive on edit because that is used as a toggle to turn editing **on** or **off**

* So click edit to right of task 
* And then edit the task and click out
  - When you do `editing` is set to false

## ng-class directive
* Improves user experience

[documentation](https://docs.Angularjs.org/api/ng/directive/ngClass)

Use conditional expressions to conditionally apply **CSS** classes to **HTML** elements

* The **style.css** will move our buttons down 17px when the `editing-item` is dynamically applied to our `DIV`

```css
.list .item.editing-item .actions {
  margin-top: 17px;
}
```

**index.html**

```html
<div ng-controller="mainCtrl " class="list ">
    <div class="item" ng-class="{'editing-item': editing}" ng-repeat="todo in todos">...</div>
</div>
```

* Expressions for ng-class can be confusing
* We pass in an object where the `key` is the class we want to apply

`<div class="item" ng-class="{'editing-item': ???}`

* Like in our other directives, the expression is just the variable `editing`

`  <div class="item" ng-class="{'editing-item': editing}" ng-repeat="todo in todos">`

* No matter what the expression is,

![applied class](https://i.imgur.com/KLXbvZr.png)

* If it evaluates to true, the class is then passed to the element

![off](https://i.imgur.com/k1bMnJ5.png)
    - If it evaluates to false, the class WILL NOT be passed to the element

In the following directive, `<div ng-repeat="foo in foobar">` you can access **"foo"** for each element in the iterable however, you cannot access properties of foo. (e.g. `foo.title`, `foo.anyProp`, etc.)
FALSE

## The ng-class directive
* Can evaluate functions to apply CSS classes
* Can evaluate variables to apply CSS classes
* Can apply multiple CSS classes

## ng-change to Set Data State

We want to keep track if a user has editing a todo

### Without Angular
* Keep track of value of page when page loaded
* Continually check to see if the value input was changed for every event where the user interacted with the input

### With Angular
* Angular makes it much easier

### With ng-change directive
* You can watch an input for changes and evaluate an expression when the value changes

**index.html**

```html
<input ng-change="learningNgChange()" ng-blur="editing = false;" ng-show="editing" ng-model="todo.name" class="editing-label" type="text">
```

**app.js**

```js
Angular.module( 'todoListApp', [] )
  .controller( 'mainCtrl', function( $scope ) {
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
  } );
```

* The learningNgChange() function will be fired any time the value of the input changes

* Refresh browser
* Edit and make changes
* With every change the **console.log()** message is fired!

Now we'll change our html to fit in with our todo app

```html
<input ng-change="todo.edited = true" ng-blur="editing = false;" ng-show="editing" ng-model="todo.name" class="editing-label" type="text">
```

* We can now keep track of which `todos` have been edited and which have not our data
* The **ng-change** directive fires every time input changes
* We are using **ng-change** to set a boolean value
    - Editing is set to true the first time the value changes
    - It always is being set to true so it appears it is not changing

```css
.list .edited label:after {
  content: " edited";
  text-transform: uppercase;
  color: #a7b9c4;
  font-size: 14px;
  padding-left: 5px;
}
```

* `.todo.edited` will add special **CSS** (see above) to todos that have been edited
* We will just add the word `edited` to the side of the todo
    - We do this by just adding our `edited` class to our list item

`<div class="item" ng-class="{'editing-item': editing, 'edited': todo.edited}" ng-repeat="todo in todos">`

* We create another key value
* Where the key is the class we want to add `'edited'`
* And the value is the expression to evaluate `todo.edited`
    - We expect to be false (aka untruthy) for todos that haven't been edited
    - And true for todos that have been edited

## What it will look like

![Edited CSS applied](https://i.imgur.com/VxEqBEE.png)

* Click edit
* Edit text
* Blur out of input
* And `EDITED` will appear
