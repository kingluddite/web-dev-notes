## Modular JavaScript (7 videos)
[link](https://www.youtube.com/watch?v=HkFlM73G-hk&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f&index=1)

`modularJS.js`

```js
var people = [];
var template = $('#people-template').html();

$('#peopleModule').find('button').on('click', function() {
  people.push($('#peopleModule').find('input').val());
  // data for mustache template
  var data = {
    people: people,
  };
  $('#peopleModule').find('ul').html(Mustache.render(template, data));
});

$('#peopleModule').find('ul').delegate('i.del', 'click', function(e) {
  var $remove = $(e.target).closest('li');
  var i = $('#peopleModule').find('ul').find('li').index($remove);

  $remove.splice(i, 1);
});
```

## Some ground rules:
* self-contained module
  - everything to do with my module is in my module
  - no global variables
    + cause conflict
    + will slow down your performance
    + you should never have global variables
      * maybe one for your entire application

```js
// bad because these are global variables
var people = [];
var template = $('#people-template').html();
```
  - if a module manages more than one thing it should be split up
* separation of conerns
* DRY code: Don't Repeat Yourself
* efficient DOM usage
  - very few $(selections)
  - we want to use DOM caching
  - most times just one $(selection) per module
* no memory leaks
  - all events can be unbound

separation of concerns
* our code is
  + binding, searching updating, removing and it all over the place

I can't quickly glance at the current code and know what's going on

DRY
* I'm searching for `#peopleModule` multiple times, I should only do it once

# ebook - essential js design patterns

```js
// object literal
var myModule = {
  name: 'Phil',
  age: 34,
  sayName: function() {
    console.log(this.name);
  },
  setName: function(newName) {
    this.name = newName;
  }
};
myModule.setName('Philip');
myModule.sayName();
```

## API
The methods that you expose to other modules is a called the API

our current API has 2 methods (sayName() and setName())

with object literal pattern, everythign is accessible

if not working with react, avoid putting HTML inside your JavaScript

## SEAF (Self Executing Anonymous Function)
Another way to avoid global variables

```js
(function() {
  var people = [];
  var template = $('#people-template').html();

  $('#peopleModule').find('button').on('click', function() {
    people.push($('#peopleModule').find('input').val());
    // data for mustache template
    var data = {
      people: people,
    };
    $('#peopleModule').find('ul').html(Mustache.render(template, data));
  });

  $('#peopleModule').find('ul').delegate('i.del', 'click', function(e) {
    var $remove = $(e.target).closest('li');
    var i = $('#peopleModule').find('ul').find('li').index($remove);

    $remove.splice(i, 1);
  });
})();
```

## init function
function we use to kick off everything

add a `$` to any stored jquery object
* so you know that that is a jquery search

## How does Mustache work?

`Mustache.render('hid {{name}}', {name: 'Phil'}); // "hi will"`
* takes values and spits them into a string
* `.` is a representation of the whole value inside the array

## revealing module pattern
```js
var peopel = (function() {

})();
```

## make a number a string

```js
var a = 1;
a.toString(); // "1"
```
letter gets converted to a number type
and that has methods like toString
* in console you can type `a` and you will see a whole bunch of types

but you can't do this

```js
1.toString()
```
will error out to Unexpected token Illegal

but this will work
`(1).toString`
* parenthesees force JavaScript to evaluate it first

same thing applies to a function

in console I can create a function like this

`function() { console.log('yo'); }()`

you will get `Unexpected token (`

but if I wrap it in parenthesees, I can run it because it gets evaluated first just like `1.toString()`

`(function() { console.log('will work'); }())`

we can even pass it variables

`(function(name) { console.log(name + ' will work'); }('Bob'))`

outputs `Bob will work`

another cool thing that happens is we create our own scope

## Private Variables

```js
var people = (function() {

  var name = 'Phil';

})();

console.log(name);
```

so name is not available outside scope so this gives us the ability to create private varaibles

```js
var people = (function() {

  var name = 'Phil';

  function sayName() {
    console.log(name);
  }

  return {
    sayName: sayName
  }

})();
```

now if you open the console and type `people` you will see you have access to the object. Other stuff you have access to is the method

![the people object](https://i.imgur.com/UhJrUyY.png)

so `var name = 'Phil'` is private
if I try to rename it with

people.name = 'bob', it will return `bob` but it has not changed our people.name it just added it onto our object. if you type `people.sayName()` in the console, it will return `Phil` to let you know that it is private and not changed

```js
var people = (function() {
  var people = ['Phil', 'Steve'];

  // cache DOM
  var $el = $('#peopleModule');
  var $button = $el.find('button');
  var $input = $el.find('input');
  var $ul = $el.find('ul');
  var template = $el.find('#people-template').html();

  // bind events
  $button.on('click', addPerson);
  $ul.delegate('i.del', 'click', removePerson);

  render();

  function render() {
    $ul.html(Mustache.render(template, {people: people}));
  }

  function addPerson() {
    people.push($input.val());
    render();
    $input.val('');
  }

  function removePerson(event) {
    var $remove = $(event.target).closest('li');
    var i = $ul.find('li').index($remove);

    people.splice(i, 1);
    render();
  }

  return {
    addPerson: addPerson,
    removePerson: removePerson
  };
})();
```
* inside the reveal pattern
 - I don't have to do all the `this`
 - I can code in more Vanilla JavaScript
 - I don't have to do all the methods
 - I don't need an init function because I am invoking everything when I define it (executes right away)

I add comments to visually separate my concerns

This is how I expose what I want to expose out to people with this code:

```js
return {
  addPerson: addPerson,
  removePerson: removePerson
};
```

## fix for addPerson

```js
function addPerson(value) {
    var name = (typeof value === 'string') ? value : $input.val();
    people.push(name);
    render();
    $input.val('');
}
```

so if someone clicks the button then addPerson will be passed an event object and we need to check if that happens because if it is an event object, then use `$input.val()` which is the input box on the page but if someone uses an API or the console, then the API will use a string and we need to check for that data type and we use our ternary operator to check for either and store the value in the `name` variable and that is what we push into the people object.

we also fix up the removePerson() method

## private methods begin with underscores `_`

```js
var people = (function() {
  var people = ['Phil', 'Steve'];

  // cache DOM
  var $el = $('#peopleModule');
  var $button = $el.find('button');
  var $input = $el.find('input');
  var $ul = $el.find('ul');
  var template = $el.find('#people-template').html();

  // bind events
  $button.on('click', addPerson);
  $ul.delegate('i.del', 'click', removePerson);

  _render();

  function _render() {
    $ul.html(Mustache.render(template, {people: people}));
  }

  function addPerson(value) {
    var name = (typeof value === 'string') ? value : $input.val();
    people.push(name);
    _render();
    $input.val('');
  }

  function removePerson(event) {
    var i;
    if (typeof event === 'number') {
      i = event;
      console.log(event);
    } else {
      var $remove = $(event.target).closest('li');
      var i = $ul.find('li').index($remove);
    }
    people.splice(i, 1);

    _render();
  }

  return {
    addPerson: addPerson,
    removePerson: removePerson
  };
})();
```