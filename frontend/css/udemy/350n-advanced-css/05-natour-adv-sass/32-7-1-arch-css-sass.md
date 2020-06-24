# 7-1 architecture with CSS and Sass
* partials begin with `_something.scss`

## folders
* sass
    - abstracts (only put code that will not output any css)
        + _colors.scss_
        + _functions.scss_
        + _mixins.scss
        + _variables.scss
    - base
        + _animation.scss
        + _base.scss
        + _typography.scss
        + _utilities.scss
    - components (building blocks - independent and reusable everywhere)
    - layout (holds all the components together)
    - pages
        + _home.scss
    - theme
    - vender (bootstrap, bulmer)


`main.scss`

```
@import "abstract/functions";
@import "abstract/mixins";
@import "abstract/variables"

@import "base/animations"
@import "base/base"
@import "base/typography"
@import "base/utilities"

@import "pages/home"
```

base/_base.scss

```
// ==========================================================================
// Base
// A Base rule is applied to HTML element using an element selector, a
// descendent selector, or a child selector, along with any pseudo-classes.
// We cannot reference any element defined here by their respective class or ID name.
// This defines the default styling for how that element should look.
// Changes in style other than default should be overwritten using other partials.
// ==========================================================================

// Reset CSS

*,
*::after,
*::before {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

html: {
  font-size: 62.5%;
}

body {
  box-sizing: border-box;
  padding: 3rem;
  color: $color-grey-dark;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  line-height: 1.7;
}
```

