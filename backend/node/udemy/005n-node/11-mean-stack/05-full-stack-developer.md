# Full Stack Developer
* A developer who knows all the pieces of a software stack
* And thus can build software by themselves
* A developer who knows the client, the server, the database side of software and maybe also design the UX

## We will do an experiment
* The purpose is to know the difference between code running in the client and on the server

`index.pug`

```
<!DOCTYPE html>
html(lang="en" ng-app="TestApp")
head
  meta(charset="UTF-8")
  title The MEAN stack
  script(src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.js")
body(ng-controller="MainController as vm")
  ul
    li(ng-repeat="person in vm.people") {{person.name}}
  script(src="assets/js/app.js")
```

`public/js/app.js`

```js
<!DOCTYPE html>
html(lang="en" ng-app="TestApp")
head
  meta(charset="UTF-8")
  title The MEAN stack
  script(src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.js")
body(ng-controller="MainController as vm")
  ul
    li(ng-repeat="person in vm.people") {{person.name}}
  script(src="assets/js/app.js")
```

* Let's move the array from the client to the server

`app.js`

```js
// more code
const port = process.env.PORT || 3000;

const people = [
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
// more code
app.get('/', function(req, res) {

  res.render('index', { serverPeople: people});

});

app.listen(port);
```

## Create a variable in our template
* We have a variable `clientPeople` that will hold the conversion of our array of objects and then we convert into a string and send as our response

![our response](https://i.imgur.com/5P9fOIb.png)

## Client side JavaScript
`public/app.js`

```js
// we use the same name that we put in ng-app
angular.module('TestApp', []);

angular.module('TestApp')
  .controller('MainController', ctrlFunc);

function ctrlFunc() {
  this.people = clientPeople;
}
```

* We use Anglar to store our string of JSON inside the `people` object
* Then we use the `ng-repeat` directive to loop through all our people

```
ul
    li(ng-repeat="person in vm.people") {{person.name}}
```

* And that will give us the same information but we started in Node and had an array of objects
* In our pug template we stringified it and sent it as our response
* We stored it in a client side variable that was globally accessible
* In our client side JavaScript we tied our string of JSON to our people object and looped over it to get all 3 names

## Important stuff for pug
* `!{}` is for unescaped code interpolation, which is more suitable for objects
* `#{}` is for escaped string interpolation, which is suitable only if you're working with strings. It does not work with objects
