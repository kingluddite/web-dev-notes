# Attention to Detail Part 1
* Add vertical spacing (_margin_) between these two "rows"

![need margin](https://i.imgur.com/KtvH78U.png)

* Search for `first trip` in `index.html` using `cmd` + `f`
* Look for the nested wrapper

```html
// more code
<div class="wrapper wrapper--medium wrapper--b-margin">
        <img src="assets/images/first-trip.jpg" alt="Couple walking down a street.">
      </div>
      <!-- /.wrapper -->
// more code
```

* Add new modifier `wrapper--b-margin`
    - Class names are getting long so we abbreviate `b` for `bottom`
* We measure 62px for the design mockup measurement
    - `62px / 16px = 3.875rem` for **top-margin**

`_wrapper.css`

```
// more code
&--b-margin {
    margin-bottom: 3.875rem;
  }
}
```

* Our top margin looks good
* But on mobile it looks too much
* Fix our mobile spacing

`_wrapper.css`

```
// more code

  &--b-margin {
    margin-bottom: 1rem;

    @mixin atSmall {
      margin-bottom: 3.875rem;
    }
  }
}
```

* And now our mobile looks good too

![good mobile spacing](https://i.imgur.com/TyMhXum.png)

## Modify column sizes
### How do we modify our column widths?
* Maybe our `medium-4` needs to be a little larger and our `medium-8` needs to be a little smaller
* Here's how we can modify our column sizes

`index.html`

```html
// more code
      <!-- /.wrapper -->
      <div class="row row--gutters">
        <div class="row__medium-4 row__medium-4--larger">
          <img src="assets/images/our-start.jpg" alt="Our founder, Jane Doe">
        </div>
        <div class="row__medium-8 row__medium-8--smaller">
// more code
```

`_row.css`

```css
// more code
  @mixin atMedium {
    &__medium-4 {
      float: left;
      width: 33.33%;
    }

    &__medium-4--larger {
      width: 37%;
    }

    &__medium-8 {
      float: left;
      width: 66.66%;
    }

    &__medium-8--smaller {
      width: 63%;
    }
  }

}
```

* **Question:** Why did we add a modifier to change columns when we could have just adjusted the columns widths in our existing code?
* **Answer:** Because we will be using 33% in a future piece of our site
* In addition, it is totally acceptable to override your column grid when necessary
* You want to create a flexible grid, don't lock yourself into a rigid inflexible grid
    - The difference between a good developer and a great developer is a great developer is totally cool with adjusting things here and there to match the design

## Border box side effect
* We gave our site a `max-width` of 1200px

`_wrapper.css`

```
.wrapper {
  padding-left: 18px;
  padding-right: 18px;
  max-width: 1200px;

// more code
```

## We need to bump up our max-width
* We applied `box-sizing` globally to all elements on our page
* When we did that we decreased the `max-width` of this wrapper element by `36px`
    - padding-left (18px) + padding-right (18px) = 36px
* So we need to add `36px` to our `max-width`

```
.wrapper {
  padding-left: 18px;
  padding-right: 18px;
  max-width: 1236px;

// more code
```

## More breathing room!
* Subtle change but now our design has more room to breathe

### Make image landscape in mobile design
`index.html`

Change this code:

```
// more code
<div class="row__medium-4 row__medium-4--larger">
   <img src="assets/images/our-start.jpg" alt="Our founder, Jane Doe">
</div>
// more code
```

To this code:

* Begin with smallest image first

```html
<div class="row__medium-4 row__medium-4--larger">
  <picture>
    <source srcset="assets/images/our-start.jpg" media="(min-width: 800px)">
    <img src="assets/images/our-start-landscape.jpg" alt="Our founder, Jane Doe">
  </picture>
</div>
```

* On mobile we use the landscape cropped image

![landscape cropped image mobile](https://i.imgur.com/V1wnfYq.png)

* On larger than 800px screen width we use our original image

![larger original image](https://i.imgur.com/TRz5qag.png)

* And we need to make our medium sized screens narrower and taller

![bad on medium screens](https://i.imgur.com/7d3oIPv.png)

### How to install/uninstall chrome extensions
[read how to install/uninstall chrome extensions](https://support.google.com/chrome_webstore/answer/2664769?hl=en)
* Add Viewport Dimensions to Chrome browser

![Viewport Dimensions](https://i.imgur.com/nsQuNXh.png)

* Now we use a `portrait` image

```html
<div class="row__medium-4 row__medium-4--larger">
  <picture>
    <source srcset="assets/images/our-start.jpg" media="(min-width: 1020px)">
    <source srcset="assets/images/our-start-portrait.jpg" media="(min-width: 800px)">
    <img src="assets/images/our-start-landscape.jpg" alt="Our founder, Jane Doe">
  </picture>
</div>
```

* Now our image looks good on smart phones, tablets and desktops

### Add hi dpi images
```html
<div class="row__medium-4 row__medium-4--larger">
  <picture>
    <source sizes="404px" srcset="assets/images/our-start-i.jpg 404w, assets/images/our-start-hi-dpi-i.jpg 808w" media="(min-width: 1020px)">
    <source sizes="320px" srcset="assets/images/our-start-portrait-i.jpg 382w, assets/images/our-start-portrait-hi-dpi-i.jpg 764w" media="(min-width: 800px)">
    <img srcset="assets/images/our-start-landscape.jpg 800w, assets/images/our-start-landscape-hi-dpi.jpg 1600w" alt="Our founder, Jane Doe">
  </picture>
</div>
```

* When we add hi-dpi images we need to tell the browser the size of the images so it know which one it needs to use
* When we did this before this image was always going to be full browser window width

![full browser window image](https://i.imgur.com/a0kaVVb.png)

* But this image we are working on is only full browser window width on small tiny smart phones

![full browser window width woman](https://i.imgur.com/ILSzI5x.png)

```
<picture>
            <source srcset="assets/images/our-start-i.jpg 404w, assets/images/our-start-hi-dpi-i.jpg 808w" media="(min-width: 1020px)">
```

* We are not using `sizes` attribute
* And it the browser automatically pulls the largest image
* But we only want to download the image that is 404px wide
    - Why is the browser sending the hi-dpi image?
    - Because all the web browser will assume all responsive images need to take up the entire browser width
    - So since Google Chrome thinks this image is going to be this wide it will reach for the largest copy of the image
    - We (the developer) needs to tell Chrome this image will never display larger than 404px

![403 image](https://i.imgur.com/sZkmZnT.png)

#### How do we tell Chrome the size of our image?
```html
<source sizes="404px" srcset="assets/images/our-start-i.jpg 404w, assets/images/our-start-hi-dpi-i.jpg 808w" media="(min-width: 1020px)">
```

* We will still see high dpi-copy because Chrome cache's images
* Clear cache ([how to clear cache on Chrome](https://support.google.com/accounts/answer/32050?hl=en))
    - `shift` + `cmd` + `backspace`
* After clear cache, refresh page and you'll see 404px wide image
* We don't need to worry about `sizes` attribute of `img` element here because in this particular case this image will only be seen on super small smartphones and when the crop is the full width of the browser

```html
<img srcset="assets/images/our-start-landscape.jpg 800w, assets/images/our-start-landscape-hi-dpi.jpg 1600w" alt="Our founder, Jane Doe">
```

### Just changing resolutions
```html
<div class="wrapper wrapper--medium wrapper--b-margin">
  <img src="assets/images/first-trip.jpg" alt="Couple walking down a street.">
</div>
```

* In the hand holding image we will not be cropping but we'll just server different resolutions, high dpi, medium and low resolution images
* We don't need to use the `picture` element for this case

```html
<div class="wrapper wrapper--medium wrapper--b-margin">
  <img src="assets/images/first-trip.jpg" alt="Couple walking down a street.">
</div>
```

And now we add responsive images based on device

```html
<div class="wrapper wrapper--medium wrapper--b-margin">
    <img sizes="976px" srcset="assets/images/first-trip-low-res-i.jpg 565w, assets/images/first-trip-i.jpg 976w, assets/images/first-trip-hi-dpi-i.jpg 1952w" alt="Couple walking down a street.">
</div>
```

But now our mobile phones will be loading 976px wide images

![too large for mobile](https://i.imgur.com/5MptjtW.png)

* This is not what we want
* We need to add a rule to the sizes attribute that tells the browser to only use the 976px wide image for devices with a min-width of `970px` and for everything else (devices under 970px width) the image only needs to be 100% of the device width

**tip** - Add the [Clear Cache](https://chrome.google.com/webstore/detail/clear-cache/cppjkneekbjaeellbfkmgnhonkkjfpdn?hl=en) Chrome Extension

```html
<div class="wrapper wrapper--medium wrapper--b-margin">
  <img sizes="(min-width: 970px) 976px, 100vw" srcset="assets/images/first-trip-low-res-i.jpg 565w, assets/images/first-trip-i.jpg 976w, assets/images/first-trip-hi-dpi-i.jpg 1952w" alt="Couple walking down a street.">
</div>
```

* `vw` - stands for `viewport width`
* [reading assignment for viewport](https://css-tricks.com/viewport-sized-typography/)
* If our small screen is only `360px` wide then `100vw` is `360px` wide

* Clear cache and you should see the smaller image appear

![smaller image appears](https://i.imgur.com/GhwPbez.png)


