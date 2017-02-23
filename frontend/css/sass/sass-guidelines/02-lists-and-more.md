# Sass Styleguide

## Lists
Sass equivalent to arrays

* Multi-lines if > 80 characters
* Comma separated
* Always wrapped in parentheses

```
// Yep
$font-stack: ('Helvetica', 'Arial', sans-serif);

// Yep
$font-stack: (
  'Helvetica',
  'Arial',
  sans-serif,
);
```

## Sass Maps
* [Using Sass Maps](https://www.sitepoint.com/using-sass-maps/)
* [Extra Map functions in Sass](https://www.sitepoint.com/extra-map-functions-sass/)
* [Real Sass, Real Maps](http://blog.grayghostvisuals.com/sass/real-sass-real-maps/)

## CSS Ruleset
* Related selectors on the same line; unrelated selectors on new lines;
* The opening brace `{` spaced from the last selector by a single space;
* Each declaration on its own new line;
* A space after the colon `:`;
* A trailing semi-colon `;` at the end of all declarations;
* The closing brace `}` on its own new line;
* A new line after the closing brace `}`.

```
// Yep
.foo, .foo-bar,
.baz {
  display: block;
  overflow: hidden;
  margin: 0 auto;
}
```

* Local variables being declared before any declarations, then spaced from declarations by a new line;
* Mixin calls with no `@content` coming before any declaration;
* Nested selectors always coming after a new line;
* Mixin calls with `@content` coming after any nested selector;
* No new line before a closing brace `}`.

```
.foo, .foo-bar,
.baz {
  $length: 42em;

  @include ellipsis;
  @include size($length);
  display: block;
  overflow: hidden;
  margin: 0 auto;

  &:hover {
    color: red;
  }

  @include respond-to('small') {
    overflow: visible;
  }
}
```

[Link to CSScomb config](https://github.com/csscomb/csscomb.js/blob/master/config/csscomb.json)

[What is BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

[More info on HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)

## Should I nest selectors?
* Adding pseudo-classes and pseudo-elements are pretty much the only case where it’s fine
* Write simple CSS - No need to make it overly complicated to understand what it does

[Beware Selector Nesting](https://www.sitepoint.com/beware-selector-nesting-sass/)

[Avoid Nested Selectors](http://thesassway.com/intermediate/avoid-nested-selectors-for-more-modular-css)

[Scalable and Modular Architecture for CSS](https://smacss.com/book/)
