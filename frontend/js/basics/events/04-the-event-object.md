# The Event Object
Contains properties with information about the event which just occurred. It can be accessed in functions attached via event listeners or other similar methods.

```js
var link = document.getElementsByTagName( 'a' )[0],
  form = document.getElementsByTagName( 'form' )[ 0 ];

link.addEventListener( 'click', handleEvent, false );
form.addEventListener( 'submit', handleEvent, false );

function handleEvent( e ) {
  e.preventDefault( );
  console.log( e );
}
```

* When you click on the `Event Object` link and look at the inspector you will see that the entire event object is there

Why are we passing in `e` into the function? In some browsers you have to.

Why do we type `e` instead of `event`?

1. It is easier to to type
2. If we use `event` instead of `e` we are overriding that object with the parameter `event` being passed in.
3. You may see `e` or `event` or `evt` and that is most likely the event object. `e` is the easiest to type so we will use that

## Homework
Analyze all the properties of the event object. Some are not the same in other browsers so there are cross browser issues. The path attribute (using Capturing) gives us the full path to the target.

**note** when you click on the submit button, you will see slightly different information n the event object

**note** `currentTarget` is going to work the same as `this`

## The Event Object Review
* Contains information about an event
* Must be passed to functions attached with event listeners
* Often passed as variable `e`
* Available properties will depend on type of event
* May notice some cross browser differences
* Explore the event object with different types of events

# A look at more events
## Types of Events
* Mouse events
* Keyboard events
* Frame events
* Form events
* Media events
* Drag events
* Object events
* Window events
* Clipboard events
* Print events
* Transition events
* Server-sent events
* Touch events
* Misc events

## Homework #1
Explore with all of these types of events

## Homework #2
Code your own demos from scratch on:

* Track Mouse
* Mouse Over
* Logging keyboard and creating shortcuts
* scrolling to elements
* form events
* media events
* drag and drop
* simple lightbox

### Practice
Spend a few hours with this. 

* [HTML DOM Events W3schools](http://www.w3schools.com/jsref/dom_obj_event.asp)
* [Events MDN](https://developer.mozilla.org/en-US/docs/Web/Events)
* [DOM Events Wikipedia](https://en.wikipedia.org/wiki/DOM_events)

### Notes
Events are technically a part of the DOM


