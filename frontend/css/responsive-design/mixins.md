# Mixins

`_variables.scss`

```
$path-font         : '../fonts';
```

`base/_mixins.scss`
```
// Web fonts
@mixin font-face($family, $file) {
  @font-face {
    font-family: $family;
    src: url('#{$path-font}/#{$file}-webfont.eot');
    src: url('#{$path-font}/#{$file}-webfont.eot?#iefix') format('embedded-opentype'),
         url('#{$path-font}/#{$file}-webfont.woff') format('woff'),
         url('#{$path-font}/#{$file}-webfont.ttf') format('truetype');
  }
}
```

## How to use the mixin

Change this in `components/_typography.scss`

```
@font-face {
  font-family: 'Abolition Regular';
  src: url('../fonts/abolition-regular-webfont.eot');
  src: url('../fonts/abolition-regular-webfont.eot?#iefix') format('embedded-opentype'),
       url('../fonts/abolition-regular-webfont.woff') format('woff'),
       url('../fonts/abolition-regular-webfont.ttf') format('truetype');
}
```

To this in `components/_typography.scss`

```
@include font-face('Abolition Regular', abolition-regular);
```

### Text Mixins

**Tip:** include mixins first to avoid problems from the cascade effect

base/_mixins.scss

```
// Text
@mixin text($size, $l-height: null, $weight: null, $color: null) {
  font-size: $size;
  line-height: $l-height;
  font-weight: $weight;
  color: $color;
}
```

Add to the `base/_base.scss`

Convert this

```
body {
  color: $color-text-base;
  margin: 0;
  font: 1em/1.5 $stack-helvetica;
}
```

To this:

```
body {
  @include text(1em, 1.5, $color: $color-text-base);
  margin: 0;
  font-family: $stack-helvetica;
}
h2 {
  @include text(3.3125em, 1.1, normal);
  margin: 0 0 .5em;
}

h3 {
  @include text(1.25em, 1.2, $color: $color-text-dark);
  margin-bottom: 1.7em;
}

```
