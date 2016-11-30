# Events
## Intro

## Types of Events
* Mouse events
    - on click
    - on mouseover
* Keyboard events
* Form events
    - forms submitted
    - focus on elements
    - update stuff on forms when form elements change
    - extended validation
* Media events
    - is media playing, then pause
    - control media programatically
* Drag and Drop events
    - drag elements around the page
    - determine where we drop them
    - determine what happens when we drop them
* Window Events
    - when something is loaded into the window
    - when it is resized
    - scrolling
* Lots More
    - Copy items to clipboard
    - Work with printing 
    - Touch recognition
    - Speech recognition

## The DOM API
Makes it possible to hook in our own custom JavaScript whenever one of these custom events occurs

## mousemove event
As I move my mouse over the page I record the x and y coordinates

```js
var logMousePosition = function() {
  console.log( event.clientX + ' x ' + event.clientY );
};

document.addEventListener( 'mousemove', logMousePosition, false );
```

## Mouse Moves
Change the cursor style on enter and leave
* used a lot in the past and not much these days as it leads to terrible accessibility but it is good to know we have this ability and power
* set a child
* set events on that child
    - mouseover
    - mouseenter
    - mouseleave





## Resources
*[MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
*[mousemove](https://developer.mozilla.org/en-US/docs/Web/Events/mousemove)
*[mouseover](https://developer.mozilla.org/en-US/docs/Web/Events/mouseover)
*[Working with Keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/*Reference/Global_Objects/Object/keys)
*[scrollBy](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy)
*[Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/*HTML_Drag_and_Drop_API)
*[submit](https://developer.mozilla.org/en-US/docs/Web/Events/submit)
