# Deep Dive Into Source Code
## jQuery
* Can we read the code?
* Can we learn from how it is structured

### Why jQuery and what it is for
* It is written in JavaScript
* Deals with cross browser issues
* jQuery enables you to manipulate the DOM
    - Document Object Model inside the browser

#### DOM
* Separate from the JavaScript Engine
* It is the thing that lets the browser look at the HTML and decide how to render `aka "paint"` it on the screen
* JavaScript has access to the DOM
    - It can manipulate the structure of an HTML page after its been loaded by manipulating the DOM in memory, which is a tree like structure that houses or stores a representation of your HTML that is used to paint or render onto the screen
* jQuery makes it easy to look at that tree (the DOM), to find things, to find elements on your page and manipulate them

### What do we get when we use jquery?
* jQuery has a `$` you can use
* Or you can use `jQuery`

## Install jQuery
`$ npm i jquery -S`

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Dive into jquery</title>
</head>
<body>
  <div id="main" class="container">
    <h1>People</h1>
    <ul>
      <li>John Doe</li>
      <li>Jane Doe</li>
      <li>Jim Doe</li>
    </ul>
  </div><!-- /#main.container -->
  <script src="../node_modules/jquery/dist/jquery.min.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

![page in browser](https://i.imgur.com/r5HZcJ1.png)

* Now in jQuery our HTML is sitting in a tree like representation of memory inside the browser
* JavaScript has access to all of it
    - parents and children element relationships

`app.js`

```js
const q = $('ul.people li');
console.log(q);
```

* In browser I will see `r.fn.init`
* It looks to be array like `[li, li, li, prevObject: r.fn.init(1)]`
* Open `li` and you will see each `li` is a DOM element
* __proto__ is an object
    - You will see it has a whole bunch of methods on the prototype
    - Remember it is better to add methods on the prototype to save memory space
    - That is all the features that jQuery offers that makes it so popular
    - We are getting back an array that has a whole bunch of features/methods we can use

## What is .fn.init?
* Note we did not use the `new` operator
* We just used `$('some string')`

## Looking under the hood of jQuery
* Open `node_modules/jquery/dist/jquery.js`
* It is huge - over 10,000 lines of code
* Lots of comments

## Take a drive right now and look through the source code
* We start off with a nice comment
* Then an IIFE

`( function( global, factory ) {`

* It uses the parentheses to trick the JavaScript parser to treat the function as a function expression
    - Everything inside jQuery is wrapped inside a function call
    - The function takes two parameters `global` and `factory`
* It is checking to see what environment is that jQuery is living in and then makes decisions on how to work with the global object in those cases
* The function is called

```
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal )
```

* It is checking to see if the global object is Window, because in the browser it is window 
* Using a ternary operator
    - if window doesn't equal undefined it will return `window` else it will return whatever `this` is equal to in the global environment (nodeJS or something)
* We also pass a `factory`

`return new jQuery.fn.init( selector, context );`

* The jQuery function isn't a function constructor, it is just a function
* That's why we don't have to use the `new` operator
* All it is, is a function operator but it does return a function constructor
    - It keeps me from using the `new` word all the time and possible forgetting it (that's a neat trick)
        + A function that returns a call to a function constructor

## Looking for jQuery.fn
`jQuery.fn = jQuery.prototype = {`

* This is a reference
    - They are objects and they are passed by reference
    - `.fn` is pointing to the same memory spot as `.prototype` of the jQuery function
    - They propably did this so they didn't have to type `.prototype` all the time
        + .fn is a lot faster to type
        + So whenever we see .fn it just means function prototype
        + And it is getting overwritten with a new object

![object literal syntax](https://i.imgur.com/UtXC5xc.png)

* You'll see `each`
* `map`

## Extend
`jQuery.extend = jQuery.fn.extend = function() {`

* This is the same concept that underscore was using
    - It is taking properties and methods off of one object and adding them to another

## Sizzle
* A whole other engine inside of jQuery
* [link](https://sizzlejs.com/)
    - the string we passed jQuery `$('ul.people > li)` is using sizzle
* I can have an IIFE nested inside another IIFE
* Sizzle ends

```js
return Sizzle;

})( window );
```

## Intialize jQuery object
```
// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,
```

* Here is the function constructor

`init = jQuery.fn.init = function( selector, context, root ) {`

* Then it returns an object

`return jQuery.makeArray( selector, this );`

* It takes my empty object, makes it into an array and returned that

## Method Chaining
Calling one method after another, and each method affects the parent object

* So `obj.method1().method2()` where both methods end up with a `this` variable pointing at `obj`

```js
const q = $('ul.people').addClass('newClass').removeClass('people');
console.log(q);
```

* How does method chaining work?
    - Search for `addClass` method inside jQuery

```
jQuery.fn.extend( {
    addClass: function( value ) {
```

* The addClass returns a value even though it is just doing work

```
        return this;
    },
```

* You will see that `removeClass` returns `this` too
* What is `this` pointing at?
    - These are methods pointing to an object
    - And if it doens't find the method on the object it will look for it on the prototype
* addClass is on the prototype

![addClass prototype](https://i.imgur.com/ReH0Ot9.png)

* So `this` will point to the object that made the call which is `ul.people`
* So `this` variable is pointing to my jQuery object (the one that was newly created by the query)
* So all I have to do to make methods chainable is to have the last line of that method return `this`

## How is jQuery exposed to the world?
```js
if ( !noGlobal ) {
    window.jQuery = window.$ = jQuery;
}
```

* that is why `jQuery` or `$` work
* They both are pointing to the same spot in memory as `jQuery`
* We are exposing the jQuery function globally
* So when I use `$` I use parentheses because I am calling a function
* `$('li.people')`
