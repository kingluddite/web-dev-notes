# Adding Data To Your App Using ng-model

## Data Binding
describe a point where an applications data and its logic and variables come together

**one way data binding** in many applications, data binding takes place at a single point, and the developers job is to keep all that data in sync
* can be cumbersome if you have lots of data and lots of user interactions

**two way data binding** angular data binding works differently, when angular data is bound to the $scope, angular keeps the data in the scope, with the applications underlining data store
* above is complex but gleen from it that any time the user interacts with the app, it updates the data in the scope of your application, and any time the scope is updated, angular has a process to update the underlining data that is affected

### Simple Data Binding
task: edit the todo name field with the input HTML field

angular constantly updates data in the scope as the data is changed

let's see that in action

## ng-model directive

**index.html**

```html
<input type="checkbox" />
    <label class="editing-label" ng-click="helloWorld()">A sample todo</label>
    <input ng-model="todo" class="editing-label" type="text">
    <div class="actions" ng-controller="coolCtrl">
      <a href="" ng-click="whoAmI()">Edit</a>
```

refresh page, and view ng-inspector
you will see no change
but if you click in the input field, you will see todo created and as you change the text in the input field, the todo in ng-inspector updates, this is two way binding in action

`<input ng-model="todo.name" class="editing-label" type="text">`

now if you change the ng-model to ng-model="todo.name" and view in ng-inspector
you will see that todo is an object and we're storing the value of the input on the name key

now let's ad ng-model to our checkbox

`<input ng-model="todo.completed" type="checkbox" />`

comment out the custom css for checkbox

style.css

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

view in browser
you will see checkbox
ng-inspector open and then check the checkbox in browser
you will see the todo object inside the ng-inspector and completed is true, uncheck it and it will be set to false

change this

`<label class="editing-label" ng-click="helloWorld()">A sample todo</label>`

to this

`<label class="editing-label" ng-click="helloWorld()">{{todo.name}}</label>`

* if you forget the `{{expression}}` around the expression, angular will just render the literal string `todo.name`, the `{{}}` tell Angular to render the expression

refresh the page, start typing in input box and you will see the task name appear simultaneously Very cool!

inside a directive like `ng-click="helloWorld()"` Angular knows to evaluate an expression already but in plain text like `<label>{{todo.name}}</label>` the curly braces tell it to render the expression

