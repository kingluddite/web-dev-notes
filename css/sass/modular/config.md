## Naming convention

**Note:** Creating a config file is a good idea for any project because if enables us to define a clear naming convention for common values with Sass variables and helps us keep our code organized and configurable.

```
$font--url--google

$font-family--primary

// Font Weights
$font-weight--thin     : 100

```

[Name that Color](http://chir.ag/projects/name-that-color)
* quick way to name colors descriptively

# Utilities scss file

Import if Google Fonts URL is define

**Note:** The variable-exists function is one of Sass' `instrospection` functions.

```
@if variable-exists(font-url--google) {
  @import url($font-url--google);
}
```

## Pixels to Em Function

**Note:**
* use `em` for font-size
* use unit list values for line heights

```
@function em($target, $context: $base__font-size) {
  @return ($target / $context) * 1em;
}
```

### Unitless Line Heights

The recommended method for defining line height is using a number value, referred to as a "unitless" line height. A number value can be any number, including a decimal-based number, as is used in the first code example on this page.

Unitless line heights are recommended due to the fact that child elements will inherit the raw number value, rather than the computed value. With this, child elements can compute their line heights based on their computed font size, rather than inheriting an arbitrary value from a parent that is more likely to need overriding.
[line height reference](https://css-tricks.com/almanac/properties/l/line-height/)

## More with colors
### Sass Maps
* have a name of a map -- $ui-colors
* the way we retrieve values from our maps is with `key`, `value` pairs
* write a `key` and its associated `value`
key : value
```
// UI Colors
$ui-colors: (
  default : $fountain-blue,
  success : $emerald,
  error   : $sunglo,
  warning : $coral,
  info    : $purple-majesty
);
```

#### @each directive
purpose - to dynamically generate a `class name` for each `key` in our `map`
then output its associated color `value` as a background color.

```
@each $theme, $color in $ui-colors {
  .btn--#{$theme} {
    background-color: $color;
  }
}
```

Our above code is cool but not modular.

Let's make it modular.

```
@mixin bg-colors($map) {
    @each $theme, $color in $map {
        &--#{$theme} {
           background-color: $color; 
        }
    }
}

```


And then include it in.. say your _main.scss partial

```css
.btn {
  @include bg-colors($ui-colors);
}
```

What if you want to add these colors to a progress bar and tooltip?

Simple

```css
.btn,
.progbar,
.tooltip {
  @include bg-colors($ui-colors);
}
```

Will output

```css
.btn--default,
.progbar--default,
.tooltip--default {
  background-color: #52bab3; }
.btn--success,
.progbar--success,
.tooltip--success {
  background-color: #5ece7f; }
.btn--error,
.progbar--error,
.tooltip--error {
  background-color: #e67478; }
.btn--warning,
.progbar--warning,
.tooltip--warning {
  background-color: #ff784f; }
.btn--info,
.progbar--info,
.tooltip--info {
  background-color: #9279c3; }
```

## Nesting Sass Maps
* great for creating tones and shades for our colors (particularly our base colors)

```
// Color Palette modifiers

$palettes: (
  grey: (
    xx-light  : lighten($grey, 43%),
    x-light   : lighten($grey, 35%),
    light     : lighten($grey, 12%),
    base      : $grey,
    dark      : darken($grey, 8%),
    x-dark    : darken($grey, 16%)
  ),
  black: (
   light      : lighten($black, 10%),
   base       : $black,
   dark       : darken($black, 10%)
  )
);
```

And use it to darken H1

```
// Color Palette modifiers

$palettes: (
  grey: (
    xx-light  : lighten($grey, 43%),
    x-light   : lighten($grey, 35%),
    light     : lighten($grey, 12%),
    base      : $grey,
    dark      : darken($grey, 8%),
    x-dark    : darken($grey, 16%)
  ),
  black: (
   light      : lighten($black, 10%),
   base       : $black,
   dark       : darken($black, 10%)
  )
);
```

```
h1 {
  font-weight: $font-weight--light;
  font-size: em(42px);
  line-height: (46px / 42px);
  margin-bottom: em(70px, 42px);
  color: @include palette($palettes, grey);
}
```

**BAD** But that color line with map-get is way too long!

**Better Solution** - write a commonly used function that calls the maps for us and returns a color value based on the keys we pass

Create a function

```
// Call the color palette modifiers
@function palette($palette, $shade: 'base') {
  @return map-get(map-get($palettes, $palette), $shade);
}
```

Call the function in your H1

```
h1 {
  font-weight: $font-weight--light;
  font-size: em(42px);
  line-height: (46px / 42px);
  margin-bottom: em(70px, 42px);
  color: palette(grey, x-dark);
}
```

## Background Image Mixin

```
// Images
$path--rel        : "../img";
```

### Helpers

```
/*===============================
=            Helpers            =
===============================*/

// Clearfix
// clear floats
%clearfix {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

// Screen reader text
// hide text that is still accessible to screen readers
.srt {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

// For pseudo-elements
// common properties used to generate and display shapes with pseudo elements
%pseudos {
  display: block;
  content: '';
  padding: absolute;
}

```

### Mixin for background images

```
@mixin img-replace($img, $w, $h, $disp: block) {
  background-image: url('#{$path--rel}/#{$img}');
  background-repeat: no-repeat;
  width: $w;
  height: $h;
  display: $disp;
}
```

Then use mixin

```
.site-logo {
  margin-bottom: 2em;
  @include img-replace("logo.svg", 115px, 45px, inline-block);
}
```

And hide the screen text in the html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Poly UI Kit</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/application.css">
  </head>
  <body>
    <header role="banner">

      <a class="site-logo" href="/">
        <b class="srt">Poly - UI Toolkit</b>
      </a>

      <nav role="navigation">
        <span>
          <b>Toggle</b>
        </span>
      </nav>

    </header>
  </body>
</html>

```
