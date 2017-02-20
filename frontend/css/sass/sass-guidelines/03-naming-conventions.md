# Sass Styleguide

## Naming Conventions
### [CSS Style Guide](http://cssguidelin.es/#naming-conventions)

Sass placeholders can be considered as regular CSS selectors, so they should the same naming pattern as classes.

### Variables, functions and mixins
* lowercase
* hyphen-delimited
* meaningful (most important)

### Constants
Sass has no way to signify a Constant so you must when you name it.

Name Constants all UPPERCASE and snake_case `$CSS_POSITIONS`

## Comments
Any CSS ruleset should be preceded by a C-style comment explaining the point of the CSS block

```
/**
 * Helper class to truncate and add ellipsis to a string too long for it to fit
 * on a single line.
 * 1. Prevent content from wrapping, forcing it on a single line.
 * 2. Add ellipsis at the end of the line.
 */
.ellipsis {
  white-space: nowrap; /* 1 */
  text-overflow: ellipsis; /* 2 */
  overflow: hidden;
}
```

When commenting a Sass-specific section, use Sass inline comments instead of a C-style block. This makes the comment invisible in the output, even in expanded mode during development.

```
/ Add current module to the list of imported modules.
// `!global` flag is required so it actually updates the global variable.
$imported-modules: append($imported-modules, $module) !global;
```

## [SassDoc](http://sassdoc.com/)
Use it on all your SASS documentation. Every variable, function, mixin and placeholder that is intended to be reused all over the codebase should be documented as part of the global API using SassDoc.

`///` 3 dashes required!

SassDoc will has 2 roles

1. force standardized comments
2. Helps generate a HTML version of the API documentation using any of the SassDoc endpoints

Example

```
/// Mixin helping defining both `width` and `height` simultaneously.
///
/// @author Hugo Giraudel
///
/// @access public
///
/// @param {Length} $width - Element’s `width`
/// @param {Length} $height [$width] - Element’s `height`
///
/// @example scss - Usage
///   .foo {
///     @include size(10em);
///   }
///
///   .bar {
///     @include size(100%, 10em);
///   }
///
/// @example css - CSS output
///   .foo {
///     width: 10em;
///     height: 10em;
///   }
///
///   .bar {
///     width: 100%;
///     height: 10em;
///   }
@mixin size($width, $height: $width) {
  width: $width;
  height: $height;
}
```

## Architecture
### Components
* Do one thing and one thing only
* Are re-usable and re-used across the project
* Are independent
* Should not `@import` other component files
* Try to put components in their own Sass partial inside the `components` (ie `components/_button.scss`)

#### Styles inside that Component should be concerned with:
* The style of the component itself
* The style of the component's variants, modifiers, and/or states
* The styles of the component's descendants if necessary

##### Example button component partial

```
// Button-specific variables
$button-color: $secondary-color;

// … include any button-specific:
// - mixins
// - placeholders
// - functions

/**
 * Buttons
 */
.button {
  @include vertical-rhythm;
  display: block;
  padding: 1rem;
  color: $button-color;
  // … etc.

  /**
   * Inlined buttons on large screens
   */
  @include respond-to('medium') {
    display: inline-block;
  }
}

/**
 * Icons within buttons
 */
.button > svg {
  fill: currentcolor;
  // … etc.
}

/**
 * Inline button
 */
.button--inline {
  display: inline-block;
}
```
