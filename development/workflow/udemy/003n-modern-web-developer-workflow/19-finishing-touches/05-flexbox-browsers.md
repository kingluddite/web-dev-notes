# Support for Flexbox Layout in Legacy Browsers
* We will learn how to keep our layout intact even in older outdated browsers that don't support Flexbox

* We used flexbox to generate equal height layout for our testimonials section
* We did this instead of using `floats`
* This will work perfectly for 96% of our visitors

![testimonials height](https://i.imgur.com/3blIx14.png)

* 3% of visitors will see this:

![broken flexbox](https://i.imgur.com/xuZFpsu.png)

## Create layout fallback
* It will be float based
* It won't be equal height
* But it will have 100% browser support
* We'll use `modernizr` to target only browsers who support Flexbox and then swap out the floats for the equal heights section

* This is the class we are targeting in our HTML `row--equal-height-at-large`

![testominal HTML](https://i.imgur.com/Aw4Hda3.png)

`_row.css`

* We only want to apply this class if the browser support flexbox

```
/* Begin Equal Height Rules */
&--equal-height-at-large {
  @mixin atMedium {
    display: flex;
  }

  & > div {
    float: none;
    display: flex;
  }
}
```

* So we just do this:

```
/* Begin Equal Height Rules */
.flexbox &--equal-height-at-medium {
  @mixin atMedium {
    display: flex;
  }

  & > div {
    float: none;
    display: flex;
  }
}

.flexbox &--equal-height-at-large {
    @mixin atLarge {
      display: flex;
    }

    & > div {
      float: none;
      display: flex;
    }
  }
```

* We have `Gulp` running so saving our `_row.css` will trigger a fresh CSS rebuild
* But we need to also save a modules JavaScript file to trigger a JavaScript rebuild

## View in browser
* You will see we get equal heights with flexbox

![flexbox working](https://i.imgur.com/uDD3FCM.png)

* But change `flexbox` class to `no-flexbox` in `<html>` element and you will see this:

![no flexbox](https://i.imgur.com/GgmGyMf.png)

* floats are being used

![using floats](https://i.imgur.com/YzuobWO.png)

* No longer equal height

![no equal height](https://i.imgur.com/vEa8pBN.png)

## Sprite artifacts

![sprite artifact](https://i.imgur.com/6PaPDQZ.png)

* Sometimes you will get image artifacts
* It is caused by sprites that are generated have almost no space between them

![no space sprite](https://i.imgur.com/2tEJk50.png)

* We just need to add some spacing to the generated sprites

`sprites.js`

```
var config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
```

* With `$ gulp watch` running
* Run `$ gulp icons` in another Terminal tab
* Save any source CSS file to rebuild the CSS bundle
* And you can check out the generated files and there will be no artifacts even if you zoom in super close

### But that 1px has messed up our logo when it shrinks to fit inside header
* Change the scale from .57 to .56

`_site-header.css`

```
// more code
@mixin atMedium {
  left: auto;
  transform: translateX(0) scale(1);

  .site-header--dark & {
    transform: scale(.56);
  }
}
// more code
```

## Site is complete!

### Next - Deploy
