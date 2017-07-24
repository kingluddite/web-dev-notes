# AngularJS: Managing the Client
## Using Angular JS

## Directive
* An attribute or value of attribute that is sitting on an HTML element

`index.pug`

```
<!DOCTYPE html>
html(lang="en" ng-app="TestApp")
head
  meta(charset="UTF-8")
  title The MEAN stack
  script(src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.js")
body(ng-controller="MainController as vm")
  h1 The MEAN stack
```

* `ng-app` is a directive
    - When this HTML is processed these directives cause Angular to do work
    - `TestApp` will be the name of my Angular app
    - `ng-controller` - means we can control different parts within the HTML of the app
        + So this controller will handle what goes on in the children of this HTML element `<body>`
        + `as vm` is like an alias that makes it easier to deal with this data

`index.js`

```
<!DOCTYPE html>
html(lang="en" ng-app="TestApp")
head
  meta(charset="UTF-8")
  title The MEAN stack
  script(src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.js")
body(ng-controller="MainController as vm")
  h1 The MEAN stack

  script(src="assets/app.js")
```

* We use this script tag and remember this JavaScript is not processed by Node
* Because it is inside the static content directory
* The script tag will cause the browser to make that request
* We want Angular to be completely loaded before the browser renders or outputs the visual things we see on the screen so that is why we put the angular code before the body
* Because Angular is loaded already by the browser I now have access to the `angular` object
    - This is used a lot and provides all the functionality that you need

`public/js/app.js`

```js
// we use the same name that we put in ng-app
angular.module('TestApp', []);

angular.module('TestApp')
  .controller('MainController', ctrlFunc);

function ctrlFunc() {
  this.message = 'Hello World';
}
```

* Update our template

`index.pug`

```
<!DOCTYPE html>
html(lang="en" ng-app="TestApp")
head
  meta(charset="UTF-8")
  title The MEAN stack
  script(src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.js")
body(ng-controller="MainController as vm")
  h1 The MEAN stack
  p {{vm.message}}
  script(src="assets/js/app.js")
```

* Will output

![output of angular](https://i.imgur.com/K6otxjk.png)

## What just happened?
* `{{vm.message}}` - This HTML string (all of the HTML) is what was given from Node to the browser
* Once the browser has this HTML and processes all the JavaScript
* It will see the Angular directives in the DOM
* It will find those same things in the `public/app.js` because Angular is expecting them to be there and it will see the `.message` property on the `this` object `this.message`
    - And it will see the curly braces in the DOM
    - And it will know to replace the curly braces with the value that is on the variable `Hello World`
    - This is very similar to what pug was doing when it was replacing values
    - But that was just replacing strings
    - Angular is doing something similar but it is really using JavaScript's ability to update the DOM
        + Not the string of HTML that node gave us in the response
        + But the DOM tree that was stored by the browser after the fact

### What was in our response?
![vm.message](https://i.imgur.com/s2K3gCc.png)

* Then the JavaScript was run in the browser
* It replaced {{vm.message}} with hello

![client angular](https://i.imgur.com/bk5t0mr.png)

* Angular makes it easy for us to manipulate the DOM

## Add an input pre-filled with angular data
`index.pug`

```
// more code
body(ng-controller="MainController as vm")
  h1 The MEAN stack
  input(type="text" ng-model="vm.message")
  p {{vm.message}}
  script(src="assets/js/app.js")
```

### View in browser
![Input field with angular](https://i.imgur.com/rnxWGg5.png)

* Type in the input and watch the message update at the same time
* I used two different ways, curly braces or ng-model and I attached something to the DOM
* Even better Angular keeps track of the values and will update the DOM again if it changes
* That is something I could not do easiy with Node because every time the user takes an action I would have to send a HTTP request

### ng-repeat
* Well create an array of objects

`public/app.js`

```js
// we use the same name that we put in ng-app
angular.module('TestApp', []);

angular.module('TestApp')
  .controller('MainController', ctrlFunc);

function ctrlFunc() {
  this.message = 'Hello World';

  this.people = [
    {
      name: 'John Doe'
    },
    {
      name: 'Jane Doe'
    },
    {
      name: 'Bob Doe'
    }
  ];
}
```

* Then we'll update our angular inside our template

`index.pug`

```
// more code
body(ng-controller="MainController as vm")
  h1 The MEAN stack
  input(type="text" ng-model="vm.message")
  p {{vm.message}}
  ul
    li(ng-repeat="person in vm.people") {{person.name}}
  script(src="assets/js/app.js")
```

* And that will add all our names of people

![names of people ng-repeat](https://i.imgur.com/HZCcyLz.png)


