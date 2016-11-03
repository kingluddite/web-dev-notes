# 'use strict'

tells the JavaScript interpreter to run the file in a strict variant
(the interpreter will be more picky about your code and it's goal it to try and keep you from making some bad mistakes)

bad-code.js

```js
"use strict";
////
//// gets assigned to global scope normally
//// but its bad code!
//badVariable = 10;
//
//// x gets assigned to the global scope normally
//// but it is bad code to initialize a variable from within
//// a function without first declaring it in the global scope!
//var x;
//
//function amIGlobal() {
//    x = 10;
//}
////
//// fails in use strict
//NaN.foobar = true;

//// throws an error
//delete Object.prototype;

//// this is a syntax error in strict mode
//// in non strict mode, the second zoo ("keepers")
//// would be returned on a look up
//var badObject = {
//    zoo: "animals",
//    internet: "trolls",
//    zoo: "keepers"
//}

//// functions cannot have duplicate paramter names
//// syntax error
//function duplicateParameters(a,b,c,a) {
//  debugger;
//  return a + b + c
//};

//// Octal numbers are not allowed!
//// Throws a syntax error!
//var someOctal = 500 + 020;

// delete cannot delete plane variables in strict mode
// can only delete properties
var hahaha = "no, don't delete me!!!"
delete hahaha

```

index.html

```html
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Why Should I use `use strict'?</title>
  <meta name="description" content="">
  <meta name="author" content="">

  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>
<body>
  
  <script src="bad-code.js"></script>

  </body>
</html>
```

* run code and no errors. but the code is bad
    - you can access `badVariable` in console
* add `use strict` at top of js file, comment out everything but the first variable and rerun the page. You now will see an error in the console
* to remove error, add `var`

`use strict` has to be the first line
* comments and blank lines are not interpreted

## amIGlobal()
without strict - you have access to `x` variable after running amIGlobal()
if strict mode is defined, you will get an error
add `var x; in global namespace to fix error`

unwritable objects
NaN.foobar = true; // fails in use strict

// deleting properties that are not deletable
delete Object.prototype;

// can't have Object with duplicate keys, strict prevents you from doing this
* keys are looked up by their name and therefore they need to be unique

note: when one error takes place, it stops the application. so to see these you need to comment all other errors out so you just view them one at a time

// no duplicate perameter names
```
function duplicateParameters(a,b,c,a) {
  debugger;
  return a + b + c
};
```

chrome browser, type: duplicateParameters(1,2,3,4)
* it will stop you in middle of function
* and then in the console you now have access to that context
* type: `a`, `b`, `c`
* type: `arguments` - gives you an array of args
* but the 1st param is getting overwritten by second but we don't know this (but in strict mode it will fail)

// octals not supported in strict mode
* don't put leading 0 infront of your integers

// strict mode does not allow you to use `delete` on plain names (not variables or plain objects, just properties)



