# Inline Events
Involve writing JavaScript as HTML attribute values

`<a href="#" onclick="//JavaScript here">Link</a>`

* requires JavaScript in HTML markup
* uses `onsomething` naming convention
* can include JavaScript code or just a function call
* have to pass in the Event object as a parameter
* in general do not use them
* May see something similar with Frameworks later

# Global Event Handlers
similar to inline events except they take place entirely inside our JavaScript

* involve assigning a function to a specific event of an element. Occurs in the JavaScript not HTML.

`el.onclick = displayLinkInfo;`

**note**: when working with Global Event Handlers you should define your functions first before referencing them.

function reference - don't execute immediately, wait until event

function call: when we attach () at end

```js
var linkEl = document.getElementsByTagName( 'a' )[ 0 ],
  displayLinkInfo;


displayLinkInfo = function ( event ) {
  event.preventDefault();
  console.log( event.target.innerHTML );
};

linkEl.onclick = displayLinkInfo();
```

because () is at end you will get `Cannot read property of 'preventDefault' of undefined` because the event wasn't passed to the function

but if you comment out code inside function and add just a simple console.log('yo'), you will see that log text immediately with no event because the function is called as soon as the processor reads that code

anonomous functions
cons
* if we wanted to do a click event on another element, we would have to duplicate our code

kind of pro
* you can not attach multiple functions to a a global event handler

because `onclick` is a property of an object, it will get overwritten if there are more than one. so the latest property is the only one you will see.

Global Event Handlers Review
* occurs in the JavaScript
* uses the `onsomething` naming convention
* technically a property of an element
* can only assign one function per element
* better than inline, but still antoher option
