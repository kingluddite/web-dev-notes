# Layout

sass/style.scss

```scss
// Compass Modules

@import "compass/reset";
@import "compass/css3";
@import "compass/layout"
@import "compass/utilities";

// Partials

@import "page";
@import "layout";
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Compass</title>
    <link href="css/screen.css" rel="stylesheet" />
</head>
<body>
<div class="container">
  <header class="main-header">
    <h1 class="main-logo"><a href="#">Compass Fun</a></h1>
    <ul class="main-nav">
        <li><a href="#">About</a></li>
        <li><a href="#">FAQS</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Contact</a></li>
    </ul>
  </header>
</div>
</body>
</html>
```

`sass/_page.scss`

```scss
// PAGE STYLES

$h-margin: .8em 0;

* {
    @include box-sizing(border-box);
}
body {
    font: 1.1em/1.6 sans-serif;
    color: #222;
    background-color: #edeff0;
}
h2 {
    font-size: 1.5em;
    margin: $h-margin;
}
h3 {
    font-weight: bold;
    margin: $h-margin;
}
p {
    margin-bottom: 1em;
}
.main-content {
    padding: 20px 40px 20px 40px;
}
.main-header {
    @extend .main-content;
    background-color: #384047;
}
%head-links {
    display: block;
    color: white;
    text-align: center;
    text-decoration: none;
    padding: 5px 15px;
    border-radius: 5px;
}
.main-logo a {
    background-color: #3ac162;
    @extend %head-links;
    @include single-text-shadow(rgba(0,0,0,.3), 0, 1px, 0);
}
.main-nav {
    a {
        background-color: #3f8abf;
        @extend %head-links;
    }
    li {
        @media (min-width: 0) and (max-width: 768px) {
            margin-top: 12px;
        }
    }
}
.main-footer {
    font-size: .85em;
    padding: 2.5em 0;
    text-align: center;
    height: 100px;
    background-color: #b7c0c7;
}
```

## Collapsed Header
This is a common problem when working with floats. If you float both items, those items are removed from `the flow of the document` and the box collapses.

### clearfix - Fix for Collapsed boxes
Compass has [it's own clearfix mixin](http://compass-style.org/reference/compass/utilities/general/clearfix/)

`sass/_layout.css`

This is how we fix collapsed boxes with Compass

```scss
// fix for collapsing boxes
.main-header {
    @include clearfix;
}
```

output: `css/style.css`

```css
.main-header {
  overflow: hidden;
  *zoom: 1;
}
```

## Horizontal lists

this one line

```scss
.main-nav {
    @media (min-width: 769px) {
        float: right;
        @include horizontal-list(10px, left); // this line
    }
}
```

output: `css/style.css`

```css
@media (min-width: 769px) {
  .main-nav {
    float: right;
    margin: 0;
    padding: 0;
    border: 0;
    overflow: hidden;
    *zoom: 1;
  }
  .main-nav li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0;
    white-space: nowrap;
    float: left;
    padding-left: 10px;
    padding-right: 10px;
  }
  .main-nav li:first-child {
    padding-left: 0;
  }
  .main-nav li:last-child {
    padding-right: 0;
  }
  .main-nav li.last {
    padding-right: 0;
  }
}
```

And our navbar is now nicely horizontally styled
* out of the box it removes padding from first and last `LI`s

## Inline Block mixin instead (no floats needed)

```scss
.main-nav {
    @media (min-width: 769px) {
        float: right;
        @include inline-block-list(10px);
    }
}
```

* note the inclusion of css hacks for older browsers

## Sticky Footer
* needs 3 elements
    1. main wrapper (containing element)
    2. a footer
        * make sure it is **outside** of the wrapper element
    3. and a div at the bottom of the container
        * not semantic so this is a slight con

`_layout.scss`

```scss
@include sticky-footer(200px, ".container", ".root-footer", ".main-footer");
```

**Note**: this is not inside a selector it is in the root of the scss page.

index.html (fragment)

```html
<div class="root-footer"></div>
</div><!-- END .container -->
<footer class="main-footer">
    <p>&copy;2016 Compass Sticky Footer</p>
</footer>
</body>
</html>
```

* very clever technique when you view the CSS output

## Multi-column layout
[caniuse.com](http://caniuse.com/#search=multico)

imports the css3 module

```scss
// multi-column layout
.main-content {
    @media (min-width: 769px) {
        @include column-count(3);
        @include column-gap(3em);
        @include column-rule(1px solid #ccc);
        h2, h3 {
            @include column-span(all);
        }
    }
}
```

## Typography

### Import

`sass/screen.scss`

```scss
@import "compass/typography";
```

how to style links using Sass

```scss
.main-content {
    a {
        color: #3f8abf;
        &:hover {
            color: #3ac162;
        }
        &:active {
            color: #ff6347;
        }
        &:visited {
            color: inherit;
        }
    }
}
```

Links the compass way

```scss
// sytnax
link-colors($normal, $hover, $active, $visited, $focus);
// passing values
link-colors(#3f8abf, #3ac162, #ff6347, inherit);
```

* inherit does something neat here, when someone clicks on a link the visited stated will inherit the font color of the text which will help it blend in. 

```scss
link-colors(#3f8abf, #3ac162);
```

```scss
.main-content {
    a {
        @include link-colors(#3f8abf, #3ac162);
        // adds underline and removes it on two different selectors
        @include hover-link;
    }
}
```

## Interpolation
helper functions - can output 1 or more values
not mixins and will throw error if you try to include them like mixins

## How to use
interpolation escape

Give every heading on the page the same top and bottom margin
```scss
#{ headings(all) } {
    margin: 1em 0;
}
/* output */
h1, h2, h3, h4, h5, h6 {
  margin: 1em 0;
}
```

We can include mixins inside interpolations

```scss
/* do this for all headings 1-6 */
#{ headings(all) } {
    margin: 1em 0;
    @include column-span(all);
}
/* just do this for heading 1 and 2 */
#{ headings(1,2) } {
    color: #346893;
}
#{ headings(4,5) } {
    text-transform: uppercase;
    border-top: 1px solid #ccc;
    padding-top: 1.1em;
    font-weight: bold;
}
/* output */
h1, h2, h3, h4, h5, h6 {
  margin: 1em 0;
  -moz-column-span: all;
  -webkit-column-span: all;
  column-span: all;
}
h1, h2 {
  color: #346893;
}
h4, h5 {
  text-transform: uppercase;
  border-top: 1px solid #ccc;
  padding-top: 1.1em;
  font-weight: bold;
}
```

## Force wrap
If you have a long string of text, the browser will not break it unless you explicitly tell it to

```html
<h3>Long Code</h3>
      <code>Super Important Activation Code:
      At7jFbXe/kLh5F043jRK8WBuSbKN2X1ONS6LKJZkf1wv84Q5LkHUs+WaQl1YOuL6LgJ5zeCEMFYUyFhUcS27JDq3lxu6SWvzuc1cnvCFERacRvo1mo9bL1OKRI7vGyWKsN9eaw08feKU5Urjdir72W7PPrGUILKMxJiqU7D6RYM8hVVziTxMMqgiBIJJDMEHfVTwb1zt0XAd0OLGYJpcL7otx0Q0u5v9Xdmw141y0w7WL46ov7HKC6oc3DKvmjUl37//b8XvYArFvtA7GxiSSmucyTbDVB3XEjkp+RCe04tXCrFFoI3iVxLheK7upNa2Vgkv0m0Pmvm70EBXJ2bteBx6LgrgP9
      </code>
```

_type.scss

```scss
code {
    font-family: monospace;
    @include force-wrap;
}
/* output */
code {
  font-family: monospace;
  white-space: pre;
  white-space: pre-wrap;
  white-space: pre-line;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -hp-pre-wrap;
  word-wrap: break-word;
}
```

view and the code will wrap nicely

## Ellipsis
how can you target last paragraph and show ellipsis

```scss
.main-content p:last-of-type {
    @include ellipsis;
}
/* output */
.main-content p:last-of-type {
  white-space: nowrap;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
```
* most people forget to add `white-space` and `overflow` to make this ellipsis value to actually work

## Vertical Rhythm
a pattern of balance spacing and text arrangement that helps guide a users eyes down the page (like vertical grid for our text)

```scss
// TYPOGRAPHY STYLES
$base-font-size: 16px;
$base-line-height: 24px;
@include establish-baseline;
// links

body {
    font-family: sans-serif;
    // adds line bg image to test vertical alignment
    // @include debug-vertical-alignment;
}

h1 {
    @include adjust-font-size-to(36px);
    margin-bottom: rythm(1, 36px);
}
h2 {
    @include adjust-font-size-to(24px);
    margin-bottom: rythm(1, 24px);
}
h3 {
    @include adjust-font-size-to(21px);
    margin-bottom: rythm(1, 21px);
}
p {
    // @include leader;
    @include trailer;
}

```

screen.scss

```scss

// Compass Modules

@import "compass/reset";
@import "compass/css3";
@import "compass/typography";


// Partials

@import "page";
@import "colors";
```

_page.scss

```scss

// INITIAL PAGE STYLES

$br: 2em;

* {
    @include box-sizing(border-box);
}
body {
    font: 1.1em/1.5 sans-serif;
    background: #f7f7f7;
}
.button {
    text-decoration: none;
    font-size: 1.1em;
    padding: .5em 0;
    display: block;
    width: 30%;
    text-align: center;
    margin: 2.5em auto;
    border-radius: $br;
}
.container {
    padding: 3% 5%;
}
.colors {
    @include horizontal-list;
    li {
        width: 19.65%;
        height: 300px;
        margin-left: .4%;
    }
    li:first-child {
        border-radius: $br 0 0 $br;
        margin-left: 0;
    }
    li:last-child {
        border-radius: 0 $br $br 0;
    }
}

```
