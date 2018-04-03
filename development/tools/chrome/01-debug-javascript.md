# Debugging js

## Start files
* [start files github](https://github.com/cmorrow/debugging-js-samples)
* [video](https://www.youtube.com/watch?v=-q1z8BPFItw)

## Summary
* js best practices
* breakpoints
* all on chrome
* watches
* using the console
* call stack
* tools: custom/pre-debugging

## Best Practices
### Avoid Global Variables
```html
<script>
  var now = new Date();
  /* more code */
  function doSomething() {
    alert('the time is ' + now);
  }
  </script>
  /* code below can overwrite "now" var */
  <script src="js/dateLibrary.js"></script>
```

#### Solution: Protect your variables with scope
* ES6 reduces this

```html
<script>
(function() { // closure function
  var now = new Date();
  /* more code */
  function doSomething() {
    alert('the time is ' + now);
  }
})();
</script>
/* code below can overwrite "now" var */
<script src="js/dateLibrary.js"></script>
```

* Now any code outside our custom function will not overwrite our **local** variables

## People hate JavaScript for the following reasons
* variables are global in scope
* no required strong typing
* cross browser compatibility
    - jquery helps with this (and why it was invented)
    - it has gotten a lot better since 2014 (and before)
* no built-in classes
    - JavaScript has a different way of simulating this
    - Has "syntactic sugar" classes

## Show example of strong typing
* Most languages do something like this

```js
var myString:String = 'this is a string';
```

* But in JavaScript, strong typing does not exist
* So you could put a number inside a string

```js
var myString = 10;
```

## Breakpoints
* quickest easiest way to navigate your codef
    - standard breakpoints
    - conditional breakpoints

### Standard breakpoints
* Open chrome tools using menu
    - top right hamburger icon in chrome (click)
        + more tools > Developer tools
        + or option + command + i
* For debugging use `Sources` tab
* tiny arrow icons collapse show debug panels (use to give you more room) 

#### Learn about standard breakpoints
* Clone repo
* install global http server
* run it with `$ http-server` inside the cloned repo
* open dev tools
* collapse arrows not used for space
* set breakpoints
    - on array line where it is set
    - on second line inside first function
    - on function call
* refresh browser
    - click play button
        + it will pause and step through breakpoints in their proper order
        + keep clicking to move to next breakpoint
    - first stops on array
    - then stops on call to function
    - then stops on first function
* check out all breakpoints on right panel
    - uncheck ones you want to temporarily hide
* remove all breakpoints quickly
    - right click in Breakpoints panel
    - select remove all

## Conditional Breakpoint
* Set breakpoint on line number in chrome
    - right click breakpoint
    - select edit breakpoint
        + set breakpoing on  `myArray` line
            * enter this and press enter:
                - `myNumber === 181`
            * refresh page
                - It will stop
                - but if you change myNumber to 182
                - It won't stop on page refresh

## Navigating Code
* Continue Button ![play button](https://i.imgur.com/j2P5ioh.png)
    - Continues code execution until we encounter another breakpoint
* Step Over Button ![step over button](https://i.imgur.com/7kT0pBk.png)
    - Step through code line-by-line to get insights into how each line affects the variables being updated
    - Should your code call another function, the debugger won't jump into its code
        + Instead stepping over so that the focus remains on the current function (scope)
* Step Into Button ![step into button](https://i.imgur.com/owNUmJb.png)
    - Like Step over
        + However clicking Step into at the function call will cause the debugger to move its execution to the first line in the functions definition
* Step Out: ![Step Out](https://i.imgur.com/kHQQvju.png)
    - Having stepped into a function, clicking this will cause the remainder of the function definition to be run and the debugger will move its execution to the parent function

## Best Practices
* Never use `==` or `!=`
    - Both check for inequality
    - But they don't check for type
* Aways use `===` and `!==`
* Read [JavaScript: The Good Parts by Douglas Crockford](http://shop.oreilly.com/product/9780596517748.do)

## Watches
* Click next to get to Watches section
    - Under Sources tab
        * Expand `js` folder
        * Select `watches.js`
* Adding a Watch ---> Multiple ways to do this
    - Sources: select then right click
    - Click '+' on Watch Expressions panel
    - Right-click inside Watch panel

## select then right click
- Highlight `myArray`
    + right click
    + Click `Add selected text to watches` from dropdown
    + You will see in right panel (Watches Expressions) that `myArray` is undefined
        * The reason is the code has already run and we are not currently inside this function
        * But if we set a breakpoint on that line
        * Refresh page (rerun code)
        * Still not defined
        * Add another breakpoint on first line inside firstFunction and click play and it will then populate myArray with 3 values
* set up watch
    - run and step into as you push items into array
    - you will see all characters pushed into array

## right click on watch
* Say you want the length of an array
    - add watch item
    - type `myArray.length`
    -`myArray[0]`
    - right click delete all watch expressions

## More with Watches
### Scope Variables
* Similar to watches but are only shown in current scope
    - refresh page with same breakpoints
    - Collapse watch and expand scope
        + You'll see local variables
            * It will show all the variables and functions inside the current scope (any object in that scope)
            * Click play and you will jump into the first function
                - the scope changes
                - you will see currentPerson
                - and `this`
                - also a closure will show parent level objects

## Using the console
* click next button to get to console section of presentation
    - open console.js in js folder in chrome dev tools Sources tab
* console.log()
* console.clear()
    - great to show only latest console (clears all other console.log() before)
    - 8 million logs sucks, this shows the one you want to see at that time
* Use **the drawer**
    - hard to switch between tabs so open the drawer by clicking `esc` key
    - Now you can see Sources tab simultaneously as the Console tab 

## Console.assert( expression, object )
