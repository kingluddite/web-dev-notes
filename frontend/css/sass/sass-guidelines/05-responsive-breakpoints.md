# Responsive Web Design And Breakpoints
## Suggestions
* media queries should not be tied to specific devices. Media queries should take care of a range of screen sizes, until the design breaks and the next media query takes over
* breakpoints should not be named after devices but something more general

```
// Yep
$breakpoints: (
  'medium': (min-width: 800px),
  'large': (min-width: 1000px),
  'huge': (min-width: 1200px),
);

// Nope
$breakpoints: (
  'tablet': (min-width: 800px),
  'computer': (min-width: 1000px),
  'tv': (min-width: 1200px),
);
```

## Breakpoint Manager
## How to approach Media Queries in Sass
* [Managing responsive breakpoints in Sass](https://www.sitepoint.com/managing-responsive-breakpoints-sass/)
* [Approaches to Media Queries in Sass](https://css-tricks.com/approaches-media-queries-sass/)
* [Sass-mq - Media Queries with superpowers](https://github.com/sass-mq/sass-mq)
* [Breakpoint-sass](http://breakpoint-sass.com/)
* [include-media](https://github.com/eduardoboucas/include-media)

### Do Media queries belong within selectors or strictly dissociated from them?
Media queries within selectors because it works nicely with the idea of components

```css
.foo {
  color: red;

  @include respond-to('medium') {
    color: blue;
  }
}
```

* This does result in duplicated media queries but the performance implications of combining vs scattering Media Queries is minimal

## Variables
There are no real scopes in CSS so we need to be super careful when adding variables at the risk of experiencing conflicts

### When should you create a variable?
Only when all of the following criteria are met:

* The value is repeated at least twice
* The value is likely to be updated at least once
* All occurrences of the value are tied to the variable

### Scoping
Since Sass 3.4, Sass creates a new local variable. When declaring a variable that already exists on the global scope in an inner scope (selector, function, mixin...), the local variable is "**shadowing**" the global one (it essentially overrides it just for the local scope)

#### Example
```
// Initialize a global variable at root level.
$variable: 'initial value';

// Create a mixin that overrides that global variable.
@mixin global-variable-overriding {
  $variable: 'mixin value' !global;
}

.local-scope::before {
  // Create a local variable that shadows the global one.
  $variable: 'local value';

  // Include the mixin: it overrides the global variable.
  @include global-variable-overriding;

  // Print the variable’s value.
  // It is the **local** one, since it shadows the global one.
  content: $variable;
}

// Print the variable in another selector that does no shadowing.
// It is the **global** one, as expected.
.other-local-scope::before {
  content: $variable;
}
```

#### !default Flag
If your Sass is going to be distributed and used by external developers, all configuration variables should be defined with `!default` flag so they can be overwritten

`$baseline: 1em !default;`

This enables the developer to define their own `$baseline` variable before importing the external library without seeing their value redefined

```
// Developer’s own variable
$baseline: 2em;

// Your library declaring `$baseline`
@import 'your-library';

// $baseline == 2em;
```

#### !global Flag
Only should be used when overriding a global variable from a local scope. When defining a variable at root level, omit `!global`

```
// Yep
$baseline: 2em;

// Nope
$baseline: 2em !global;
```

#### Should I use Multiple Variables or Maps?
Maps

* You have the ability to loop over a map (can't do that with distinct variables)
* Can create a tiny getter function to provide a friendlier API

```
/// Z-indexes map, gathering all Z layers of the application
/// @access private
/// @type Map
/// @prop {String} key - Layer’s name
/// @prop {Number} value - Z value mapped to the key
$z-indexes: (
  'modal': 5000,
  'dropdown': 4000,
  'default': 1,
  'below': -1,
);

/// Get a z-index value from a layer name
/// @access public
/// @param {String} $layer - Layer’s name
/// @return {Number}
/// @require $z-indexes
@function z($layer) {
  @return map-get($z-indexes, $layer);
}
```


