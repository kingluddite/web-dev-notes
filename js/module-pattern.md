# Module Pattern in JavaScript

[github repo](https://github.com/hdngr/javascript-module-workshop)

used by creators of:

* nodejs
* jquery
* bootstrap
* angular

`patterns.js`

```js
function foo() {
    console.log( 'foobar' );
}

foo();
```

View in console and you'll see `foobar`

The problem is that the `foo()` function is in the global scope

## Problem: Cluttering the global namespace
* so much happens in the browser these days
    - you could load in the browser
        + angular
        + bootstrap
        + jquery

If you create a bunch of global variables it can be problematic and cause conflicts on the global namespace

catostrophic if your variable names are the same as 3rd party libraries

### SOLUTION: Module Pattern

Self Executing Anonymous Function (SEAF)

```js
(function() {
  function foo() {
    console.log( 'foobar' );
  }

foo();
}());
```

* wrap the function in closures
    - why? because the function itself without a name will return undefined
        + but when we wrap the function in paranthesees
            * we are saying treat this whole thing as an expression which is evaluated immediately and does not require naming or assignment

Now after the SEAF, using `foo()` in console is undefined so foo() is not longer in the global namespace.

### [Cool trick](http://stackoverflow.com/questions/3755606/what-does-the-exclamation-mark-do-before-the-function)

```js
!function() {
  function foo() {
    console.log( 'foobar' );
  }

foo();
}();
```

* you could also use a `+` instead of `!`
* why do this? if you are concatenating multiple files together
    - if not, you'd have to end every module with a semi-colon
    - and if you don't know which file is coming first, you'd have to start each file with `;`
    - adding the `!` is more elegant solution
 
## import other globals to use within the module but with a reference locally within the module

### importing _underscore

```js
!function(underscore) {
  function foo() {
    console.log( 'foobar' );
  }

foo();
}(_);
```

Pros of using this approach
* slight performance benefit
    - because variable is now reference in local scope
        + means when you call the variable, the interpreter, does not have to crawl through the global scope looking for it
* renaming variable makes it obvious you are doing something different or special with this variable in your module
    - ie - maybe you are extending underscore with some new methods

```js
!function(underscore) {
  underscore.awesomeMethod = 'oh yeah!';
}(_);
```

### Log version of underscore

Create package.json

```
$ npm init
```

Add `underscore`

```
$ npm install underscore
```

update index.html with:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Module Pattern</title>
</head>

<body>
  <script src="node_modules/underscore/underscore-min.js"></script>
  <script src="patterns.js"></script>
</body>

</html>
```

Add this:

```js
!function(underscore) {
  underscore.awesomeMethod = 'oh yeah!';
  console.log( underscore.VERSION );
}(_);
```

* you will get a version number in the console (mine was 1.8.3)

![my output in console](https://i.imgur.com/l1tegEr.png)

* in production JavaScript is often [minified](http://alistapart.com/article/javascript-minification-part-II) and compressor can not rename global variables
    - but compressors can rename global variables that have been invoked with a local reference

## Module Export Pattern
How to keep your coding from polluting global namespace and share information with different parts of your app?

```js
var myNewModule = ( function() {
  var exports = {
    car: "Ford",
    bike: "Schwinn"
  };
  exports.doGood = function() {
    console.log( 'Do good!' );
  };
  exports.doWell = function() {
    console.log( 'Do well!' );
  }

  return exports;

}() );
```

* in console you'll have access to `myNewModule` and the `doGood()` method

![output from console](https://i.imgur.com/cJsANZg.png)

## Using Loose Augmentation
* takes advantage of JavaScript aysynchronious run time environment
    - adding files and compressing into one file can become problematic if the files grow in number. This pattern can keep the large file number from being a problem

```js
var myNewModule = ( function(exports) {
  var exports = {
    car: "Ford",
    bike: "Schwinn"
  };
  exports.doGood = function() {
    console.log( 'Do good!' );
  };
  exports.doWell = function() {
    console.log( 'Do well!' );
  }

  return exports;

}(myNewModule || {}) );
```

## Submodule pattern

```js
var myNewModule.sub = ( function(exports) {
  var exports = {
    car: "Ford",
    bike: "Schwinn"
  };
  exports.doGood = function() {
    console.log( 'Do good!' );
  };
  exports.doWell = function() {
    console.log( 'Do well!' );
  }

  return exports;

}(myNewModule.sub || {}) );
```
