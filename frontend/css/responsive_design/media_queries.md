# Media Queries
## Breakpoints
create breakpoints based on on content not on devices
major and minor breakpoints

## Orientation
portrait vs landscape

## Flexbox
https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 **note**
 Flexbox is a collection of CSS properties that can aid in page layout, but media queries are still an essential part of CSS that flexbox does not fulfill.

base/_variables.scss
```
// Media query breakpoints
$brk-narrow : '(max-width: 768px)';
$brk-wide   : '(max-width: 1024px)';
```
how to apply the media queries
```
.secondary-content {
  @extend %content;
  @extend %top-border;
  @extend %clearfix;
  padding-top: 80px;
  padding-bottom: 70px;
  border-bottom: 2px solid $color-border-light;

  @media #{$brk-wide} {
    width: 90%;
  }
}
```

**tip** - move all css from `_style.scss` and delete the file

