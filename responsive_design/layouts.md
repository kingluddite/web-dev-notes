# Columns
Create two columns
```
/* Column Layout */
.col {
  display: inline-block;
  padding: 20px;
}
.primary-content {
  width: 60%;
}
.secondary-content {
  width: 40%;
}
```
### Space Issue
The columns will not be side by side because of the
Space in html issue

**Solution**
Negative margins will fix it
```
.col {
  display: inline-block;
  padding: 20px;
  margin-right: -5px;
}
```
### Add Vertical Alignment
```
vertical-align: top;
```
This pushes the column to the top (default is to the bottom)
* Trick for inline-block
* Very similar to using floats but without the collapsing problem floats have

## Sticky Footer
* easiest way (makes columns same height, gets rid of big space below footer)
```
html,
body,
.container,
.col {
  height: 100%;
}
```
The height of 100% is based on the height of a parent element

## Intial value
**What is it?**
[Link](https://css-tricks.com/getting-acquainted-with-initial/)
The initial keyword is what is declared as the property where the initial value is the resulting output, as defined by the browser default.

**Note:** If there is no border, padding, or content to separate the top margin of our logo with the top margin of the body, we're seeing a margin collapsing issue

## Floats
Content wraps around floats depending on how it is floated

## Container
Can use body or html
But DIV wrapper `.container` is recommended

## Margin Collapsing bug
**What is margin collapsing?**

**Solution** - give element border or padding
```
.main-header {
  padding: 20px;
}
```

## How to convert block level to inline
H1 - block level
Li - block level
```
.main-logo,
.main-nav,
.main-nav li {
  display: inline;
}
```

## List items 1px space bug
Can move them all right up against each other with no white space but that is clunky

**Better Solution:**

apply negative 1px left margin to li

## nowrap
```
.main-header {
  padding: 20px;
  white-space: nowrap;
}
```
This prevents `LI`'s from wrapping but when you shring browser they stick out
**Fix**
1. remove nowrap rule
2. change `.main-nav li`
`from`
```
display: inline;
```
`to`
```
display: inline-block;
```
This keeps inline but when you wrap,  it wraps **all** `LI` items in the nav.
when just inline we couldn't give top margin top or width
but now we can

**Note:** `H1` (headings) have top and bottom margin (normalize does not reset)

## Link Hover target too small
**Solution:** make link full width and height of their parent containers
a tag - inline by default

**Note:** display elements are not inherited by child elements
anchors are block level but inside an inline element

## Display table mode
What if you wanted the logo and nav links always aligned to the middle?

## New box sizing fix
if you have a parent container that has 100px width
and 20px of padding
the box model will render 140px width
this messes up your layouts

## Box Sizing Fix
**cool solution**
use the `*` universal selector
```
* {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
```
## Table display mode
set parent and child elements
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

**Note:** can't use margins on elements that are displayed as table cells

**Note:** widths or top and bottom margins cannot be applied to elements displayed inline
