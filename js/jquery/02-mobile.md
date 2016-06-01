# Jquery and Mobile Project

[Github start link](https://github.com/kingluddite/domsters-convert)

**branch**: `mobile-beginning`

* not responsive at beginning

## Task Lisk For Project

```js
// Create a select and append to menu
// cycle over menu links
  // create an option
  // option's value is href value
  // option's text is the text of link
  // append option to select
// create button to click to go to select's location
// bind click to button
  // go to select's location
// modify CSS to hide links on small widths and show button and select
  // also hides select and button on larger widths and shows links
// Deal with selected options depending on current page
```

## Add Select With Values

```js
// Create a select and append to menu
var $select = $( "<select></select" );
$( "#menu" ).append( $select ); // test and you should see it is appended
// cycle over menu links
$( "#menu a" ).each( function() {
  var $anchor = $( this );
  // create an option
  var $option = $( "<option></option>" );

  // option's value is href value
  $option.val( $anchor.attr( "href" ) );
  // option's text is the text of link
  $option.text( $anchor.text() );
  // append option to select
  $select.append( $option );

} );
```

**Quiz**: show what the user types in to the input field and preview it in the H1 tag.

`js/script.js`

```js
/Select the input for the title for blog post.
var $titleInput = $("#title");

//Select the preview h1 tag
var $previewTitle = $("#titlePreview");

// Every second update the preview
var previewTimer = setInterval(updatePreview, 1000);

function updatePreview(){  
  //Get the user's input
  var titleValue = $titleInput.val();
  //Set the user input as the preview title. 
  $previewTitle.text(titleValue);
}
```

index.html

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="theme.css">
</head>
<body>
  <div id="form">
    <label for="title">Blog Post Title</label><input id="title" name="title" value="" placeholder="Enter your blog title here">
  </div>
  <div id="preview">
    <h1 id="titlePreview"></h1>
  </div>
  <script src="//code.jquery.com/jquery-1.11.0.min.js" type="text/javascript" charset="utf-8"></script>
  <script src="js/app.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>
```

## Make Select options link to URLs

```js
// Create a select and append to menu
var $select = $( "<select></select" ),
  $navMenu = $( "#menu" ),
  $button;
$navMenu.append( $select ); // test and you should see it is appended
// cycle over menu links
$( "#menu a" ).each( function() {
  var $anchor, $option;
  $anchor = $( this );
  // create an option
  $option = $( "<option></option>" );

  // option's value is href value
  $option.val( $anchor.attr( "href" ) );
  // option's text is the text of link
  $option.text( $anchor.text() );
  // append option to select
  $select.append( $option );

} );
// create button to click to go to select's location
$button = $( "<button>Go</button>" );
// bind click to button
$button.click( function() {
  // go to select's location
  window.location = $select.val();
} );
$navMenu.append( $button );
```

## Add CSS to make media queries work (just using iPhone dimensions)

```css
// modify CSS to hide links on small widths and show button and select
// also hides select and button on larger widths and shows links
@media (min-width: 320px) and (max-width: 568px) {
  #menu ul {
    display: none;
  }
}

@media (min-width: 568px) {
  #menu select,
  #menu button {
    display: none;
  }
}
```

## Finishing up project

```js
// Create a select and append to menu
var $select = $( "<select></select" ),
  $navMenu = $( "#menu" ),
  $button;
$navMenu.append( $select ); // test and you should see it is appended
// cycle over menu links
$( "#menu a" ).each( function() {
  var $anchor, $option;
  $anchor = $( this );
  // create an option
  $option = $( "<option></option>" );

  // Deal with selected options depending on current page
  if ( $anchor.parent().hasClass( "selected" ) ) {
    $option.prop( "selected", true );
  }
  // option's value is href value
  $option.val( $anchor.attr( "href" ) );
  // option's text is the text of link
  $option.text( $anchor.text() );
  // append option to select
  $select.append( $option );

} );
// create button to click to go to select's location
$button = $( "<button>Go</button>" );
// bind click to button
$button.click( function() {
  // go to select's location
  window.location = $select.val();
} );
$navMenu.append( $button );
```

## Usability Improvement
Instead of having to click the button every time to change the location of the browser, let's just add a `change()` event that will save us a step

### Alter the JS

```js
// create button to click to go to select's location
// $button = $( "<button>Go</button>" );
// bind click to button
// $button.click( function() {
//   // go to select's location
//   window.location = $select.val();
// } );
// $navMenu.append( $button );
//
// Bind change listener to the select
$select.change( function() {
  // go to select's location
  window.location = $select.val();
} );
```

### Alter the CSS

```css
select {
  width: 94%; // was 84%
  margin: 11px 0 11px 2%;
  float: left;
}

// remove button - no longer needed
// button {
//   display: inline-block;
//   line-height: 18px;
//   padding: 0 5px;
//   margin: 11px 2% 11px 0;
//   float: right;
//   width: 10%;
// }
```
