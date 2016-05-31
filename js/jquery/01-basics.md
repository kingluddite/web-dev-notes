# Basics

## Jargon
* Unobtrusive JavaScript
* CDN
* deprecated
* anonymous function (aka `unnamed function`)
* psuedocode
    - informal high level description of a computer program

## [JavaScript Style Guide](https://contribute.jquery.org/style-guide/js/)

* use quotes for strings


## What is Unobtrusive JavaScript

## jQuery is JavaScript

[Helpful jQuery Learning Resource](http://blog.teamtreehouse.com/beginners-guide-to-jquery)

## [jQuery Documentation](http://api.jquery.com/)

tips
* use search box for quick finds
* click through for more detail
* most people ignore all and jump straight to code examples at bottom

## Questions
What's wrong with this?

```js
// Hide Warning
jQuery('.warning').hide();
// Show Warning Slowly
jQuery('warning').show(); // oops... I forgot the class '.' (rookie mistake)
```

* don't forget the preceding `.` if you're selecting a `class` or a `#` if you selecting an `id`
**Problem:** It will hide and show instantaneously

```js
// Hide Warning
jQuery(".warning").hide();
// Show Warning Slowly
jQuery("warning").show();
```

* use quotations in jQuery, not single quotes

## Shorthand and $

```js
// Hide Warning
$(".warning").hide();
// Show Warning Slowly
$("warning").show();
```

## Method Chaining
Add methods after each other to affect the same selected elements

* reduces redundancy and repeating yourself over and over again
* chaining works because many of jQuery methods return the elements that you're already selecting

jQuery is able to do this by manipulating the `DOM`

## What's the DOM
When browser reads the `HTML` it creates a tree like structure of `nodes`.

### What is a node
A branching point that reveals more nodes

DOM tree usually looks like a top down structure (instead of traditional tree with roots on bottom)

This tree structure is referred to as the DOM Tree or the `Document Object Model`

DOM can be interrogated or manipulated
* JavaScript can be used to help you interrogate or manipulate the DOM tree
* in the past browsers did not agree on how to manipulate the DOM
    - one of the main reasons for jQuery's popularity is because it was a way to smooth over the browser DOM rendering inconsistencies
    - we are in modern times now and the browsers have gotten better
    - jQuery is still used for:
        + ease of use
        + compatibility
        

## TIP
### Open Developer Tools Keyboard Shortcut
`Command` + `Option` + `J`

Try it out
document.head.children
document.body.children[0]

Is there a better way to select elements?
Yes

## Traversing the DOM

```js
document.getElementsByClassName("warning");
```

* no `.` needed because we're asking for the `class` name in the method
* event though it's only one item in our example, it is still one item inside an array so we select it with

```js
document.getElementsByClassName("warning")[0];
```

## jQuery to the rescue with Simplicity
To do the same as above

```js
$(".warning");
```

# [jQuery Documentation](http://api.jquery.com/)

## DOM Manipulation Methods
* Add/Remove HTML elements
* Update/Read HTML elements
* Transform HTML elements

## Traversing the DOM
* Moving from a parent element to its children
* Moving from a child element to its parent
* Moving from a sibling element to another sibling element

## Event Methods
* Keyboard and Mouse Events
* Keyboard Event example: keypress
* Mouse Event example: mouse movement or a click

## Using the Documentation
* [Attributes](http://api.jquery.com/)
* [CSS](These methods get and set CSS-related properties of elements.)
    - These methods get and set CSS-related properties of elements.
* [Dimensions](http://api.jquery.com/category/dimensions/)
* [Effects](http://api.jquery.com/category/effects/)
    - animations over time
* [Events] - when user interacts with a thing, and you can do something when the event occurs (user triggered or computer triggered)
    - Browser Events
    - Document Loading
    - Event Handler Attachment
    - Event Object
    - Form Events
    - Keyboard Events
    - Mouse Events
* [Offset](http://api.jquery.com/category/offset/) - figuring out the offset of a particular element

### [Traversing](http://api.jquery.com/category/traversing/)

### [Selectors](http://api.jquery.com/category/selectors/)

# Ways to include jQuery in a project
* [CDN](https://code.jquery.com/)
    - Pros
        + all around the world
        + faster to download
        + if they've already been on a page where the jquery was served, it will be cached so it will load faster
    - Working locally if your Internet is slow it will negatively impact your development time.
* Download it
* node.js

## Where to include the DOM?
* You will run into problems if you load your jQuery in the `HEAD`
* `[.ready()](https://api.jquery.com/ready/)` - a function to execute when the DOM is fully loaded

### .ready()

```js
function someCoolFunction() {
    $(".winning").hide().show("slow");
}
$(document).ready(someCoolFunction);
```

* why no `()` when calling function?
    - we want jQuery to run the function when it is ready and not immediately


#### Alternative way to write a function

```js
var someCoolFunction() {
   $(".winning").hide().show("slow"); 
}
$(document).ready(someCoolFunction);
```

* Both work but many times people use anomous functions to if I want to pass an anonymous function into my `.ready()` function this is how it would look

```js
$(document).ready(function() {
    $(".winning").hide().show("slow"); 
});
```

#### Passing just with a handler

```js
$(function() {
    $(".winning").hide().show("slow");
});
```

# Best Practice
Include jQuery at bottom of page which is best user experience and won't need to use the `ready()` handler.


# The 4 P's of Problem Solving
* Preparation
* Plan
* Perform
* Perfect

Code out plan in `app.js`

```js
// hide box on load
// add button
// add click event to show box and remove button
```

```html
<!DOCTYPE html>
<html>
<head>
    <title>Star Wars Spoilers</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <p class="box">
        <!--Spoiler:-->
        <span>hide this text on page load and show when user clicks on button</span>
    </p>
    <script src="http://code.jquery.com/jquery-1.11.0.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/app.js"></script>
</body>
</html>
```

`script.js`

```js
// Hide text
$( ".warning span" ).hide();
// Add button
$( ".warning" ).append( "<button>Show Text</button>" );
console.log( 'yo' );
// Click button to show text
$( "button" ).click( function() {
  // this will get all spans inside warnining
  //$( ".warning span" ).show();
  // this just gets the previous element to the button clicked
  $( this ).prev().show();
  // hide just hides it
  // $( "button" ).hide();
  // // we want to remove it
  // we could target button but that would remove all buttons
  // $( "button" ).remove();
  // this is better because it targets the button the event was happening to
  $( this ).remove(); // so we only remove the element that was clicked
} );
```

# Improve Image Gallery
* Using jQuery and an image overlay

## Best Practice
* You never want to add HTML that is unnessary
    - If you are going to add an overlay when an image is clicked, you don't want that `HTML` of the overlay to be on the page until the image is clicked. So since you want to dynamically add that `HTML`, you should do it by manipulating the `DOM` using `JavaScript` or `jQuery`.

[github link](https://github.com/kingluddite/domsters-convert)

`js/script.js`

```js
// Problem: click on image leads to dead end
// Solution: click image and show lightbox
//
//
// capture click event on link to image
$( "#image-gallery a" ).click( function( event ) {
  var $href
  event.preventDefault();
  href = $( this ).attr( "href" );
  console.log( href );
} );
// show overlay
// update overlay with the img linked in link
// get child's alt attribute and set caption
// add overlay
// an image
// a caption
// when overlay is clicked
// hide overlay
```

### Dynamically create HTML

```html
<div id="overlay"></div>
```

* How can we create the above with jQuery?

## Best Practice

###Naming variables depending on what type of object they are

If something is a jQuery representation of an object you should preface the name of the variable with a `$`
* The dollar sign `$` does nothing to the code, it's just convention

Before

```js
$( "body" ).append( '<div id="overlay"></div>' );
```

After

```js
var $overlay = $( '<div id="overlay"></div>' );
$( "body" ).append( $overlay );
```

`js/script.js`

```js
// Problem: click on image leads to dead end
// Solution: click image and show lightbox
//
//Add HTML fragment to body (Add Overlay)
// Since we will be using this overlay multiple times
// we want to store it inside a variable
var $overlay = $( '<div id="overlay"></div>' );
$( "body" ).append( $overlay ); // view browser and you will see the div is appended to the BODY
//
// capture click event on link to image
$( "#image-gallery a" ).click( function( event ) {
  var $href
  event.preventDefault();
  $href = $( this ).attr( "href" );
  $overlay.show();
} );
// show overlay
// update overlay with the img linked in link
// get child's alt attribute and set caption
// add overlay
// an image
// a caption
// when overlay is clicked
// hide overlay
```

`sass/_general.scss`

```scss
#overlay {
  background: black;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
```

View page now and you will see complete black overlay
* but since you want to initially have the overlay hidded
    - add to #overlay css rule
        + `display:none`
        + background: rgba(0, 0, 0, 0.7); // set bg to transparent black

code example

```js
//Create the Modal
var $modal = $("<div id='modal'></div>");

//Create a placeholder for text in the modal
var $placeHolder = $("<p id='placeHolder'></p>");
$modal.append($placeHolder);

//Create a button to dismiss modal and add it to modal
var $dismissButton = $("<button>Dismiss</button>");
$modal.append($dismissButton); // this line was missing

//Hide modal when button is pressed
$dismissButton.click(function(){
  $modal.hide(300);
});

$("body").append($modal);

//A function to show a modal
function displayModal(message) {
  $placeHolder.text(message);
  $modal.show();
}

//Show an example modal
displayModal("Hello World!");
```

`js/script.js`

```js
// Problem: click on image leads to dead end
// Solution: click image and show lightbox
//
//Add HTML fragment to body (Add Overlay)
// Since we will be using this overlay multiple times
// we want to store it inside a variable
var $overlay = $( '<div id="overlay"></div>' );
// create an IMG
var $image = $( "<img>" );

// add IMG to overlay
$overlay.append( $image );

$( "body" ).append( $overlay ); // view browser and you will see the div is appended to the BODY
//
// capture click event on link to image
$( "#image-gallery a" ).click( function( event ) {
  var $imageLocation; // improve variable name (was $href)
  event.preventDefault();
  $imageLocation = $( this ).attr( "href" );

  $image.attr( "src", $imageLocation );

  $overlay.show();
} );
// show overlay
// update overlay with the img linked in link
// get child's alt attribute and set caption
// add overlay
// an image
// a caption
// when overlay is clicked
// hide overlay
```

* above has image working inside overlay but we need to improve the CSS

`_general.scss`

```scss
#overlay {
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  text-align: center; /* added this line */
}

/* added this rule */
#overlay img {
  margin-top: 10%;
}
```

## Hide the overlay
* when click on the overlay, hide it

```js
// when overlay is clicked
$overlay.click( function() {
  // hide overlay
  $( this ).hide();
} );
```

A slight improvement on performance is this

```js
// when overlay is clicked
$overlay.click( function() {
  // hide overlay
  $overlay.hide();
} );
```

* because we already have $overlay stored to memory in a variable

Quiz
Using jQuery only, add to all links with the class of `external`, the target attribute with the value of `_blank`

```js
$(".external").attr("target", "_blank");
```

**note:** You know what? The alt attribute should be more descriptive of what the image is. The title attribute is a better use for a caption

final code (using title attribute instead)

```js
var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");

//An image to overlay
$overlay.append($image);

//A caption to overlay
$overlay.append($caption);

//Add overlay
$("body").append($overlay);

//Capture the click event on a link to an image
$("#imageGallery a").click(function(event){
  event.preventDefault();
  var imageLocation = $(this).attr("href");
  //Update overlay with the image linked in the link
  $image.attr("src", imageLocation);
  
  //Show the overlay.
  $overlay.show();
  
  //Get child's title attribute and set caption
  var captionText = $(this).children("img").attr("title");
  $caption.text(captionText);
});

//When overlay is clicked
$overlay.click(function(){
  //Hide the overlay
  $overlay.hide();
});
```
