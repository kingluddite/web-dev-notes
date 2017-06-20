# Headline block
* Let's style this

![headline style](https://i.imgur.com/DOrQiSq.png)

`index.html`

```html
// more code
<div id="our-beginning" class="page-section">
    <div class="wrapper">
      <h2>The first trip we planned was our own.</h2>
      <h3>Ever since, we&rsquo;ve been working to make travel better for everyone.</h3>
      <img src="assets/images/first-trip.jpg" alt="Couple walking down a street.">
      <img src="assets/images/our-start.jpg" alt="Our founder, Jane Doe">
      <h2>Here&rsquo;s how we got started&hellip;</h2>
// more code
```

* We could use class names to tie it directly to this `h2` and `h3`
* But let's think modular and reusable because there are other headlines that will use the same styles

`index.html`

```html
<div id="our-beginning" class="page-section">
    <div class="wrapper">
      <h2 class="headline">The first trip we planned was our own.</h2>
      <h3 class="headline">Ever since, we&rsquo;ve been working to make travel better for everyone.</h3>
      <img src="assets/images/first-trip.jpg" alt="Couple walking down a street.">
      <img src="assets/images/our-start.jpg" alt="Our founder, Jane Doe">
      <h2 class="headline">Here&rsquo;s how we got started&hellip;</h2>
```

`/app/assets/images/styles/modules/_headline.css`

```css
.headline {
  font-weight: 300;
  font-size: 2.875rem;
  color: $mainBlue;
}
```

### Import new modular css
`styles.css`

```css
@import 'modules/_headline';
```

* How to measure

![ways to measure](https://i.imgur.com/Ay7hjnD.png)

* Add [Page Ruler](https://chrome.google.com/webstore/detail/page-ruler/jlpkojjdgbllmedoapgfodplfhcbnbpn/related?hl=en) to Chrome

![page ruler](https://i.imgur.com/6DeDXuN.png)

* We want a font size or `46px` but we are using rem so `46px / 16 = 2.875rem`

### Center our headline with a modifier
`index.html`

```html
// more code
<div class="wrapper">
      <h2 class="headline headline--centered">The first trip we planned was our own.</h2>
      <h3 class="headline headline--centered">Ever since, we&rsquo;ve been working to make travel better for everyone.</h3>
// more code
```

`_headline.css`

```css
.headline {
  font-weight: 300;
  font-size: 2.875rem;
  color: $mainBlue;

  &--centered {
    text-align: center;
  }
}
```

## Make it orange
* Size text

![size of orange text](https://i.imgur.com/gma9xZY.png)

* 30 / 16 = 1.875rem

`_headline.css`

```css
// more code
  &--orange {
    color: $mainOrange;
  }

  &--small {
    font-size: 1.875rem;
  }

  &--narrow {
    max-width: 500px;
  }
}
```

`index.html`

```html
// more code
<h3 class="headline headline--centered headline--orange headline--small headline--narrow">Ever since, we&rsquo;ve been working to make travel better for everyone.</h3>
// more code
```

### Max width of 500px
![max width](https://i.imgur.com/iqPK212.png)

### Light headline modifier
`index.html`

```html
// more code
<h2 class="headline headline--centered headline--light">The first trip we planned was our own.</h2>
      <h3 class="headline headline--centered headline--orange headline--small headline--narrow headline--light">Ever since, we&rsquo;ve been working to make travel better for everyone.</h3>
// more code
```

`_headline.css`

```css
// more code
  &--narrow {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  &--light {
    font-weight: 100;
  }
}
```

### Bold certain words
* `<strong>` is more semantic than `<b>`

`index.html`

```html
// more code
<h2 class="headline headline--centered headline--light">The first trip we planned <strong>was our own</strong>.</h2>
      <h3 class="headline headline--centered headline--orange headline--small headline--narrow headline--light">Ever since, we&rsquo;ve been working to make travel <strong>better for everyone</strong>.</h3>
// more code
```

* Decrease the margin below the first headline
* Increase the margin above the second headline

![margin time](https://i.imgur.com/VSFWeBZ.png)

`_headline.css`

```css
&--bottom-margin-small {
    margin-bottom: 0.5em;
  }

  &--bottom-margin-large {
    margin-bottom: 1.6em;
  }
```

* Using `em` over `rem`
* Good to define margin on text elements in `em` instead of `rem`
    - Using `em` here is that it is relative to the font-size itself
    - We could reuse this class `headline--bottom-margin-small` on headlines that have different font-sizes and this will always scale with it nicely

`index.html`

```html
// more code
 <h2 class="headline headline--centered headline--light headline--bottom-margin-small">The first trip we planned <strong>was our own</strong>.</h2>
      <h3 class="headline headline--centered headline--orange headline--small headline--narrow headline--light headline--bottom-margin-large">Ever since, we&rsquo;ve been working to make travel <strong>better for everyone</strong>.</h3>
// more code
```

### Too many modifers?
* Modular development is common these days
* Using lots of modifiers beats having to come up with lots and lots of new class names as the designs get updated
* class name fatigue
* 6 months later revisiting site for revamp, then you have to dig through all your class names to figure out what is going on

![too many class names](https://i.imgur.com/q37PFka.png)

### Using modifier system
* 2 years later the designer could come to us with a new style for us to develop
* We look at new headline style and we ask "Can we create this new style by combining existing modifiers?"
    - Yes we do
    - No, we create a new modifier


### Center hand holding image horizontally
* Which headline is easier to understand?

![headline easy](https://i.imgur.com/D11EDoq.png)

### Back to the hand holding image
`index.html`

```html
// more code
<div class="wrapper wrapper-medium">
        <img src="assets/images/first-trip.jpg" alt="Couple walking down a street.">
      </div>
// more code
```

* 976px width

![hand holding image](https://i.imgur.com/ZFsYj9G.png)

`_wrapper.css`

```css
.wrapper {
  padding-left: 18px;
  padding-right: 18px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  &--medium {
    max-width: 976px;
  }
}
```

### Look at mobile
* Top padding too large

![large top padding](https://i.imgur.com/0e8jjy0.png)

`_page-section.css`

```css
.page-section {
  padding: 1.2rem 0;

  @mixin atMedium {
    padding: 4.5rem 0;
  }

  &--blue {
    background-color: $mainBlue;
    color: #fff;
  }
}
```

`_headline.css`

```css
.headline {
  font-size: 1.9rem;
  font-weight: 300;
  color: $mainBlue;

  @mixin atSmall {
    font-size: 2.875rem;
  }

  /* more code */

  &--small {
    font-size: 1.2rem;

    &mixin atSmall {
      font-size: 1.875rem;
    }
  }
```

### Hand holding image on tiny screens looks bad
* On small screens it should use full available width
* We see that we have a wrapper nested inside another wrapper
    - We just need to look for any wrapper nested inside another wrapper and set the padding-left and padding-right to `0`

`_wrapper.css`

```css
.wrapper {
  padding-left: 18px;
  padding-right: 18px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  &--medium {
    max-width: 976px;
  }

  .wrapper {
    padding-left: 0;
    padding-right: 0;
  }
}
```

