# Event Listeners
Let you attach multiple functions to elements, based on the events that you want. Technically, addEventListener is a method on objects.

```js
el.addEventListener( 'event', theFunction, false );
```

* 1st parameter (`'event'`)
    - The event we want to work with
    - Here we just use the event name (not the `on` + name that global event listeners use)
        + So instead of `onclick` we just use `click`
* 2nd parameter (`theFunction`)
    - The function we want to run/execute whenever that event occurs on that specific element
    - **note** this is a function reference not a function call (remember function calls use parenthesees like myFunction() )
    - It does not appear in quotation marks, it is just the function on its own
* 3rd parameter
    - Event propagation
    - We will leave as `false` for now

```js
var linkEl = document.getElementsByTagName( 'a' )[ 0 ];

function displayLinkInfo( event ) {
  event.preventDefault( );
  console.log( event.target.innerHTML );
}

linkEl.addEventListener( 'click', displayLinkInfo, false );
```

### common mistakes
* If you use `onclick` insteadd of `click` it will not work
* If you put the second parameter (_name of function_), it will not run
* If you try to use a function call (`displayLinkInfo()` ) instead a function reference

## Assign event listeners quickly

```html
<ul>
  <li><a href="#">link 1</a></li>
  <li><a href="#">link 2</a></li>
  <li><a href="#">link 3</a></li>
  <li><a href="#">link 4</a></li>
</ul>
```

**app.js**

```js
var linkEl = document.getElementsByTagName( 'a' );

function displayLinkInfo( event ) {
  event.preventDefault( );
  console.log( event.target.innerHTML );
}
for ( var i = 0; i < linkEl.length; i++ ) {
  linkEl[i].addEventListener( 'click', displayLinkInfo, false );
}
```

## Assigning multiple events to same element

```js
var linkEls = document.getElementsByTagName( 'a' );

function displayLinkInfo( event ) {
  event.preventDefault( );
  console.log( event.target.innerHTML );
}

function alertLinkInfo( event ) {
  event.preventDefault( );
  alert( event.target.innerHTML );
}

for ( var i = 0, max = linkEls.length; i < max; i++ ) {
  linkEls[i].addEventListener( 'click', alertLinkInfo, false );
  linkEls[i].addEventListener( 'click', displayLinkInfo, false );
}
```

So any of the links you click on you will get an alert and a log. This is the main difference between event listeners and global event listeners. You can not do this with global event listeners.

## Event Listeners Review
* `addEventListener` is a method on DOM objects
* Does not use the `on`-Event naming convention
* Can assign multiple functions per element
* Preferred option for hooking into events, best way to attach your own event on your own object 
* Can lookup Event Listeners in Web Inspector

### Lookup Event Listeners in Web Inspector
1. Select a link in the inspector
2. Choose the `Event Listeners` tab
3. Open a link (<a>) in inspector
4. Open `handler` in inspector
5. Look for `name` in inspector and you will see the function referenced to that link

When looking at other peoples sites you can use this to find all event listeners and for debugging

## Removing Event Listeners
There are two primary reasons why you would want to remove an event listener

1. That Event listener is no longer needed
2. Prevent memory leaks
    * If you attach a bunch of event listeners and then remove that event from the DOM this may cause memory leaks perticularly in order browsers

### syntax
```js
el.removeEventListener( 'event', theFunction, false );
```

* Very similar to creating them
* Accepts the same three parameters
* If we want to remove an event listeners we have to pass in the EXACT SAME parameters or it won't work

## Example

```js
// 1.4.5 - Removing Event Listeners

var linkEl = document.getElementsByTagName( 'a' )[ 0 ];

function displayLinkInfo( event ) {
  event.preventDefault( );
  console.log( event.target.innerHTML );
}

linkEl.addEventListener( 'click', displayLinkInfo, false );
linkEl.removeEventListener( 'click', displayLinkInfo, false );
```

This will do nothing and if you look in the Event Listener tab, you will see no event listeners listed.

(_it will actually do the default behavior, by going to the link_)

### Memory Leaks with Event Listeners

```js
// 1.4.5 - Removing Event Listeners

var linkEl = document.getElementsByTagName( 'a' )[ 0 ];

function displayLinkInfo( event ) {
  event.preventDefault( );
  console.log( event.target.innerHTML );
}

linkEl.addEventListener( 'click', displayLinkInfo, false );
linkEl.remove( );
```

This would cause a Memory link in very old browsers. So the tip is just remove an event listener if you remove an element from the document. (like below)

```js
linkEl.addEventListener( 'click', displayLinkInfo, false );
linkEl.removeEventListener( 'click', displayLinkInfo, false );
linkEl.remove( );
```

### Why not to use anonymous functions with addEventListenr
* **tip** using `e` instead of `event` will save you typing and is an accept common practice 

```js
// Why not to use anonymous functions
// with addEventListener
// 1.4.5.3
var linkEl = document.getElementsByTagName( 'a' )[ 0 ];

linkEl.addEventListener( 'click', function ( e ) {
  e.preventDefault( );
  console.log( event.target.innerHTML );
}, false);
```

* We could pass an anonomous function as a second argument
* This is CONSIDERED A BAD PRACTICE
    - Because there is no way to remove that event listener, the reason is that there is no name attached to that function, so we have no way of referencing it, even if we pass the anonymous function to the `removeEventListener` it will not work because they will be two completely different anonymous functions

## Removing event listeners the right way

```js
var linkEl = document.getElementsByTagName( 'a' )[ 0 ];

function displayLinkInfo( e ) {
  e.preventDefault( );
  console.log( e.target.innerHTML );
  linkEl.removeEventListener( 'click', displayLinkInfo, false );
}

linkEl.addEventListener( 'click', displayLinkInfo, false );
```

* So now we click on once, and the event will be executed but when we click on it again the event will have been removed the link event will no longer work.

## More practical example of removing an event listener

```js
var content = document.querySelector( '.content' ),
  originalLinks = document.querySelectorAll( '.content p a' ),
  pEl = document.createElement( 'p' ),
  linkEl = document.createElement( 'a' ),
  linkText = document.createTextNode( 'Open links in new tab' );

function setTargetBlank( event ) {
  for ( var i = 0, max = originalLinks.length; i < max; i++ ) {
    originalLinks[i].setAttribute( 'target', '_blank' );
  }

  console.log( 'Ready to open in new windows!' );

  linkEl.removeEventListener( 'click', setTargetBlank, false );
  linkEl.innerHTML = 'Open in same window';
  linkEl.addEventListener( 'click', removeTargetBlank, false );
}

function removeTargetBlank( event ) {
  for ( var i = 0, max = originalLinks.length; i < max; i++ ) {
    originalLinks[i].removeAttribute( 'target' );
  }

  console.log( 'Will open in same tab now!' );

  linkEl.removeEventListener( 'click', removeTargetBlank, false );
  linkEl.innerHTML = 'Open links in new tab';
  linkEl.addEventListener( 'click', setTargetBlank, false );
}

linkEl.appendChild( linkText );
linkEl.setAttribute( 'href', '#' );
pEl.appendChild( linkEl );
content.appendChild( pEl );

linkEl.addEventListener( 'click', setTargetBlank, false );
```

* One link on page
* The other link is dynamically generated
* When you click on dynamically generated link it switches either same tab or new tab using event listeners

**index.html**

```html
<body>
 <h1>DOM Events with JavaScript</h1>
 <div class="content">
  <p>
    <a href="#">link one</a>
  </p>
 </div>
 <script src="app.js"></script>
</body>
```


