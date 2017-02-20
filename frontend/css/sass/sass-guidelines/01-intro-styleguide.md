## Encoding
`@charset 'utf-8`

Force [UTF-8](https://en.wikipedia.org/wiki/UTF-8) encoding in the main stylesheet using the @charset directive. Make sure it is the very first element of the stylesheet and there is no character of any kind before it.

## Stings
Wrap all strings in single quotes

**note** - As per the [CSS specifications](https://developer.mozilla.org/en-US/docs/Web/CSS/@charset), the `@charset` directive should be declared in double quotes to be considered valid. However, Sass takes care of this when compiling to CSS so the authoring has no impact on the final result. You can safely stick to single quotes, even for `@charset`.

### Strings as CSS Values
Specific CSS values identifiers) require no quotes (ie - `initial` or `sans-serif`)

### Strings Containing Quotes
Single quotes and escape with a backslash

`@warn 'You can\'t do that.';`

### URLS
Quote them with single quotes

```css
.foo {
  background-image: url('/images/puppies.jpg');
}
```

## Numbers
### Zeros
Displayed with leading 0 like `opacity: 0.5;`

### Units
0 value never has a unit so don't do this `$length: 0px`

**note** Only omit the unit or lengths

**note** Sass cannot do math operators with a string.

```
/* Don't do this */
$value: 42;
$length: $value + px;
// 42px

/* Do this */
$value: 42;
$length: $value * 1px;
// 42px
```

**note** To remove the unit of a value, you have to divide it by one unit of its kind

**note** When you append a string (i.e. `em`) to a number (13.37), you implicitly cast it into a string.

**tip** [Use lengths when you need to, not strings](http://hugogiraudel.com/2013/09/03/use-lengths-not-strings/)

## Calculations
Top-level numeric calculations should always be wrapped in parentheses

```css
// Yep
.foo {
  width: (100% / 3);
}

// Nope
.foo {
  width: 100% / 3;
}
```

## Colors
* Use HSL
    - When using HSL or RGB notation, always add a single space after a comma `,` and no space between parentheses `(, )` and content.

```
// Yep
.foo {
  color: hsl(0, 100%, 50%);
}

// Also yep
.foo {
  color: rgb(255, 0, 0);
}

// Meh
.foo {
  color: #f00;
}

// Nope
.foo {
  color: #FF0000;
}

// Nope
.foo {
  color: red;
}
```

* Hex should be lowercase and shortened but you should avoid them as they are not easily readible for humans
* Don't use CSS color keywords

## Colors And Variables
When using a color more than once, use meaningful names representing the color

`$sass-pink: hsl(330, 50%, 60%);`

Now store it in another variable with a name explaining how it should be used

`$main-theme-color: $sass-pink;`

[Naming color tips](https://davidwalsh.name/sass-color-variables-dont-suck)
# Styleguide

```
/// Slightly lighten a color
/// @access public
/// @param {Color} $color - color to tint
/// @param {Number} $percentage - percentage of `$color` in returned color
/// @return {Color}
@function tint($color, $percentage) {
  @return mix(white, $color, $percentage);
}

/// Slightly darken a color
/// @access public
/// @param {Color} $color - color to shade
/// @param {Number} $percentage - percentage of `$color` in returned color
/// @return {Color}
@function shade($color, $percentage) {
  @return mix(black, $color, $percentage);
}
```
