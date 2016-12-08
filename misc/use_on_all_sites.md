use Modernizr installed with Bower to detect a specific feature or set of features (such as SVG support) without including the entire library?
You can use grunt-modernizr to detect which tests you need and build a custom Modernizr version.

Flexbox with Modernizr fallback
* use reset (normalize.css)
one css file application.css
use sass and modules to build up smartly
* mixins
    - set rule
```
// Text
@mixin text($size, $l-height: null, $weight: null, $color: null) {
  font-size: $size;
  line-height: $l-height;
  font-weight: $weight;
  color: $color;
}
```

Use rule

```
body {
  @include text(1em, 1.5, $color: $color-text-base);
  margin: 0;
  font-family: $stack-helvetica;
}
```
* placeholders
* variables
one js file application.js
use gulp automation
* concatenate
    - css
    - js
* optimize images
* minimize
    - css
    - js
* use percentages for columns
* use css prefixes for modern css
* vertical-align: top;
* mobile first approach
* media queries
* display: inline-block;
* Box Sizing
```
* {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
```

## Table Display
```
.main-header {
  padding: 20px;
  display: table;
  width: 100%;
  min-height: 150px;
}
.main-logo,
.main-nav {
  display: table-cell;
  vertical-align: middle;
}
```

## Positioning
```
.main-header {
    position: relative;
  }
  .main-logo,
  .main-nav {
    position: absolute;
  }
```

## Interpolation
```
@media #{$brk-wide} {
    width: 90%;
  }
```

## Add Google Analytics

#HTML

## Viewport
```
<meta name="viewport" content="width=device-width">
```

## Using closing comments to improve readability
