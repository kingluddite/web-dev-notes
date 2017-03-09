# Events

## Global Event Handlers
Involve assigning a function to a specific event of an element. Occurs in the JavaScript not HTML.

`el.onclick = displayLinkInfo`

We pass the function as a `reference`

```js
var linkEl = document.getElementsByTagName( 'a' )[ 0 ],
  displayLinkInfo,
  h1El = document.getElementsByTagName( 'h1' )[ 0 ];

displayLinkInfo = function ( event ) {
  event.preventDefault();
  console.log( event.target.innerHTML );
  // console.log( 'yo' );
};

linkEl.onclick = displayLinkInfo;
```

* `.onclick` is a property
    - If you use console you can inspect the `a` and then use the `Properties` tab to open the `a` and you will see all the onsomething properties. The `onclick` is technically a property but it is assigned a function so it works like a method
* When we assign it a function it is known technically as a `function reference`
* We pass the function the event and then when you click on it that is what is stored in the event object

```js
var linkEl = document.getElementsByTagName( 'a' )[0],
  displayLinkInfo,
  h1El = document.getElementsByTagName( 'h1' )[ 0 ];

linkEl.onclick = displayLinkInfo;

displayLinkInfo = function ( event ) {
  event.preventDefault( );
  console.log( event.target.innerHTML );
  // console.log( 'yo' );
};
```

* **warning** Scope issue!
    - If you move the event handler before the function, it won't work, so we always have to define our function before we call it

### What is the difference between a function reference and function call?
A function call is when we attach the parenthesees at the end

**function call**

```js
// this is a function call
//myFunction()
// better example
linkEl.onclick = displayLinkInfo();
```

* This will run or execute immediately
* We will get an error because the event hasn't occurred

```js
displayLinkInfo = function ( event ) {
  // event.preventDefault( );
  // console.log( event.target.innerHTML );
  console.log( 'yo' );
};

linkEl.onclick = displayLinkInfo( );
```

This will show `yo` in console instantly because it is called as soon as page loads.

**function reference**

The function reference waits until the event actually happens before it calls the function

```js
linkEl.onclick = displayLinkInfo;
```

**note**
Since `.onclick` is a property of an object you can only assign one event to that property. 

**Why?** because a property of an object only holds the last value assigned to it.

You could add multiple `.onclick` events to multiple elements but that would make your code longer and less DRY.

What is DRY? `D`on't `R`epeat `Y`ourself

```js
var linkEl = document.getElementsByTagName( 'a' )[0],
  displayLinkInfo,
  alertLinkInfo,
  linkHandler;

```

### Ways to call multiple functions with one event handler

```js
var linkEl = document.getElementsByTagName( 'a' )[0],
 displayLinkInfo,
 alertLinkInfo,
 linkHandler;

displayLinkInfo = function ( event ) {
  event.preventDefault( );
  console.log( event.target.innerHTML );
};

alertLinkInfo = function ( event ) {
  event.preventDefault( );
  alert( event.target.innerHTML );
};
linkHandler = function ( event ) {
  displayLinkInfo( event );
  alertLinkInfo( event );
};

linkEl.onclick = linkHandler;
```

## Global Event Handlers Review
* Occurs in the JavaScript
* uses the `on` + something naming convention
* Technically a property of an element
* Can only assign one function per element
* Better than inline, but still another option

