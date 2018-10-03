# CSS Essentials
## border box
* The border-box model allows us to add padding and border to our elements without increasing their size

```css
html {
  /* border-box box model allows us to add padding and border to our elements without increasing their size */
  box-sizing: border-box;
  /* A system font stack so things load nice and quick! */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 900;
  font-size: 10px;
  color: var(--black);
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.07);
}
```

## system fonts
* Sys­tem fonts are the fonts al­ready in­stalled on your com­puter
* Some are bet­ter than oth­ers
* [read more](https://practicaltypography.com/system-fonts.html)

## inherit box-sizing
* We inherit box-sizing: border-box; from our `<html>` selector
* Apparently this is a bit better than applying `box-sizing: border-box;`directly to the `*` selector

```css
*,
*:before,
*:after {
  box-sizing: inherit;
}
```
