## Interpolation

`http://port-80-xkzllgnykb.treehouse-app.com/css/$path-img/mountains.jpg Failed to load resource: the server responded with a status of`

If you don't interpolate properly it will return the literal string

**Bad**

```
$color-prim url('$path-img/mountains.jpg') no-repeat center;
```

**Good**

```
 $color-prim url('#{$path-img}/mountains.jpg') no-repeat center;
```

If you forget to interpolate media queries

**Bad**
```
 @media $brk-narrow {
    max-height: 380px;
    padding: 50px 25px 0;
  }
```
Will get this error

```
error scss/layout/_header.scss (Line 10: Invalid CSS after "  @media "
: expected media query (e.g. print, screen, print and screen), was "$brk-nar
row {")
```

**Good**

```
@media #{$brk-narrow} {
    max-height: 380px;
    padding: 50px 25px 0;
  }
```

**Note:** Sass does not allow `extend` and `placeholders` inside media queries

### RULE
When writing a Sass Rule
* @extend placeholders first
* @include mixins
* Add remaining declarations

## Source Maps

`application.css.map`
Sass made this file to help when debugging in chrome dev tools

**source maps allow us to see the original sass (scss) instead of the compiled css**

At bottom of application.css compiled css file (from scss) you will see this

```
/*# sourceMappingURL=application.css.map */
```

This is not a mistake but needed for source maps to work

Next - make sure our browser knows to look for source maps

### Enable source maps in the browser
These browsers have source map ability
* chrome
* firefox
* safari

In chrome
1. open chrome dev tools (cmd + option + i)
2. open settings of dev tools (3 vertical dots icon) > settings
3. under `General` check `Enable CSS source maps`
4. also check `Auto-reload generated CSS`

Now we see all our original scss code instead of the compiled css - HUGE!

## CSS Output Styles
### Nested

`$ sass --watch scss:css --style nested`
The default output style. It reflects the structure of the CSS styles and the HTML document. Each property has its own line, and rules are indented based on how deep they're nested in the original Sass code.

### Expanded

`$ sass --watch scss:css --style expanded`
Similar to the nested style. It looks more like the CSS we'd write in a regular style sheet. Each property and rule takes up one line and properties are indented within the rules.

### Compressed

`$ sass --watch scss:css --style compressed`
Minifies our CSS output by stripping out comments and unnecessary spaces. It compresses CSS to one line. The most optimized output style – use before uploading your CSS to the server.

### Compact

`$ sass --watch scss:css --style compact`
Another optimized format that draws the focus to the CSS selectors instead of the properties. Each CSS rule takes up one line, with all properties defined on the same line.

Sass is not deployed to production server
only `application.css` is deployed
