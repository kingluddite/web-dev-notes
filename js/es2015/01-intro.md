# ES2015
* 1995 Browser Wars Netscape vs Microsoft
* JavaScript developed in 10 days by Brendan Eich
  + the creator of JavaScript (of Netscape)
  + lightweight interpreted languages for non-programmers
* Microsoft adopted it and called it JScript
* 1997 JavaScript was in every browser and used by millions
  + Standardized by ECMA International
* Because Netscape owned the name JavaScript, Microsoft and Netscape agreed on the name ECMAScript
* ECMAScript and JavaScript are the same (name used interchangably)
* 1999 ECMAScript 3 was Standardized
  + introduced
    - Regular Expressions
    - Exception Handling
* 2005 ECMAScript 5 was released
    - Lots of Added Features
    - JSON Integration
* JavaScript is the only programming language native in Web browsers
* [ECMA Browser Compatibility Chart](http://kangax.github.io/compat-table/es6/)
* Because not all browser yet support ES2015, we can use tools like Babel to transpile our ES2015 into ES5 code for browsers
* [Introduction to Babel - Workshop](https://teamtreehouse.com/library/introduction-to-babel)

## Let and Const
* we need to be aware of the scope our variables live in
* try not to pollute the global scope shared by all scripts
    - if not, our variables could collide, override each other, cause bugs that are hard to track
* `var` keyword was only way to create variables
* ES2015 gives us two more `let` and `const`

**var-scope.js**

```js
'use strict';

var hello = 'hello';

function sayHi() {
  var hello = 'hi';
  console.log( hello );
}

sayHi();
console.log( hello );
```

`$ node var-scope.js`

Output
hi
hello

var has function level scoping but not block level scoping

let-loop-scope.js

## block
can be a:
* loop
* if statement
* function

## immediately invoked function

`(function someFunc() {})()`
