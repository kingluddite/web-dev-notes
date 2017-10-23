# Our Features Part 1
* Turn this:

![beginning features](https://i.imgur.com/kAn0f5p.png)

* To this:

![end features](https://i.imgur.com/Y6a0nxq.png)

* Since we've been building files with a similar pattern my instructions will be more brief and I'll assume you can follow along

`index.html`

```html
<h2 class="section-title">Our <strong>Features</strong></h2>
```

`/app/assets/styles/modules/_section-title.css`

* Measure Our Features font size `50px` (rem 50/16 = 3.125rem)
* We need to make our strong tags bolder when inside a `section-title`

`_section-title.css`

```css
.section-title {
  font-size: 3.125rem;
  font-weight: 300;
  text-align: center;

  strong {
    font-weight: 500;
  }
}
```

## Import it
`styles.css`

```css
@import 'modules/_section-title';
```

* Align the star next to the heading
* Just move the star image inside the `h2`

```html
<h2 class="section-title"><img class="section-title__icon" src="assets/images/icons/star.svg">Our <strong>Features</strong></h2>
```

* We give the `img` a class to we can give the icon some space

`_section-title.css`

```css
.section-title {
  font-size: 3.125rem;
  font-weight: 300;
  text-align: center;

  strong {
    font-weight: 500;
  }

  &__icon {
    margin-right: .5rem;
  }
}
```

* Now we'll need to create two columns that each take up available width

`index.html`

```html
<h2 class="section-title"><img class="section-title__icon" src="assets/images/icons/star.svg">Our <strong>Features</strong></h2>

      <div class="row row--gutters">
        <div class="row__medium-6">
          <img src="assets/images/icons/rain.svg">
          <h3>We&rsquo;ll Watch the Weather</h3>
          <p>Download our app and we&rsquo;ll send you a notice if it&rsquo;s about to rain in the next 20 minutes around your current location. A good rain can be refreshing, but sometimes you just want to stay dry.</p>

          <img src="assets/images/icons/globe.svg">
          <h3>Global Guides</h3>
          <p>We&rsquo;ve scoured the entire planet for the best retreats and beautiful vistas. If there&rsquo;s a corner of the world you want to escape to we know the most scenic and inspiring locations.</p>
        </div>
        <!-- /.row__medium-6 -->

        <div class="row__medium-6">
          <img src="assets/images/icons/wifi.svg">
          <h3>Wi-Fi Waypoints</h3>
          <p>We only send you on trips to places we can personally vouch for as being amazing. Which means we&rsquo;ve mapped out where local wi-fi spots are and marked them in our app&rsquo;s map view.</p>

          <img src="assets/images/icons/fire.svg">
          <h3>Survival Kit</h3>
          <p>Everytime you book an escape with us we send you a survival kit with the finest materials. The kit will allow you to setup a tent, start a fire, scratch your own back and lower your taxes.</p>
        </div>
        <!-- /.row__medium-6 -->
      </div>
      <!-- /.row -->
```

`_row.css`

```
// more code
@mixin atMedium {
    // more code
    &__medium-6 {
      float: left;
      width: 50%;
    }
// more code
```

* We used the gutter before but the design looks like a larger gutter
* Let's create a `row--gutters-large` modifier

```html
<div class="row row--gutters-large">
  <div class="row__medium-6">
```

`_row.css`

```
// more code
    margin-right: -65px;
  }

  &--gutters-large {
    margin-right: -100px;
  }

  &--gutters > div {
    padding-right: 65px;;
  }

  &--gutters-large > div {
    padding-right: 100px;;
  }
// more code
```

### Create a block for this:
![feature inner blocks](https://i.imgur.com/Gex2hH4.png)

* icon sits to left
* text sits on right

```html
<div class="row row--gutters-large">
  <div class="row__medium-6">
    <div class="feature-item">
      <img src="assets/images/icons/rain.svg">
      <h3>We&rsquo;ll Watch the Weather</h3>
      <p>Download our app and we&rsquo;ll send you a notice if it&rsquo;s about to rain in the next 20 minutes around your current location. A good rain can be refreshing, but sometimes you just want to stay dry.</p>
  </div>
  <!-- /.feature-item -->
```

`/app/assets/styles/modules/_feature-item.css`

```css
.feature-item {
  position: relative;
  padding-left: 94px;

  &__icon {
    position: absolute;
    left: 0;
  }

  &__title {
    font-size: 1.875rem;
    font-weight: 300;
    margin-bottom: 0.8rem;
  }
}
```

* Don't forget to import inside `styles.css`

`@import 'modules/_feature-item';`

* Measure left of icon to left of text: 94px
* Meaure top of `W` to bottom of `y` 30px --> 30/16 = 1.875rem

## Change font weight of `p`
`_generic-content-container`

```
.generic-content-container {
  p {
    font-weight: 300; /* add this line */
    line-height: 1.65;
    margin: 0 0 1.8rem 0; /* modify this line */
// more code
```

* Now that we figured out how to style one feature-item we just apply the css classes to the other 3 feature items

```html
      <div class="row row--gutters-large generic-content-container">
        <div class="row__medium-6">
          <div class="feature-item">
            <img class="feature-item__icon" src="assets/images/icons/rain.svg">
            <h3 class="feature-item__title">We&rsquo;ll Watch the Weather</h3>
            <p>Download our app and we&rsquo;ll send you a notice if it&rsquo;s about to rain in the next 20 minutes around your current location. A good rain can be refreshing, but sometimes you just want to stay dry.</p>
          </div>
          <!-- /.feature-item -->

          <div class="feature-item">
            <img class="feature-item__icon" src="assets/images/icons/globe.svg">
            <h3 class="feature-item__title">Global Guides</h3>
            <p>We&rsquo;ve scoured the entire planet for the best retreats and beautiful vistas. If there&rsquo;s a corner of the world you want to escape to we know the most scenic and inspiring locations.</p>
          </div>
          <!-- /.feature-item -->
        </div>
        <!-- /.row__medium-6 -->

        <div class="row__medium-6">
          <div class="feature-item">
            <img class="feature-item__icon" src="assets/images/icons/wifi.svg">
            <h3 class="feature-item__title">Wi-Fi Waypoints</h3>
            <p>We only send you on trips to places we can personally vouch for as being amazing. Which means we&rsquo;ve mapped out where local wi-fi spots are and marked them in our app&rsquo;s map view.</p>
          </div>
          <!-- /.feature-item -->

          <div class="feature-item">
            <img class="feature-item__icon" src="assets/images/icons/fire.svg">
            <h3 class="feature-item__title">Survival Kit</h3>
            <p>Everytime you book an escape with us we send you a survival kit with the finest materials. The kit will allow you to setup a tent, start a fire, scratch your own back and lower your taxes.</p>
            </div>
          <!-- /.feature-item -->
        </div>
        <!-- /.row__medium-6 -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.wrapper -->
  </div>
```

## Fix the mobile
`_section-title.css`

```css
.section-title {
  font-size: 2.55rem;
  font-weight: 300;
  text-align: center;

  @mixin atSmall {
    font-size: 3.75rem;
  }

  strong {
    font-weight: 500;
  }

  &__icon {
    margin-right: .5rem;
  }
}
```

* Make our star sit on its own line

`_section-title.css`

```
// more code
  &__icon {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: .6rem;
  }

  @mixin atSmall {
    margin-right: .5rem;
    margin-left: 0;
    margin-bottom: 0;
    display: inline-block;
  }
}
```

* In mobile features
* Icon should be full width and stacked on top of its title/description

`_feature-item.css`

```css
.feature-item {
  position: relative;
  padding-bottom: 2.5rem;

  @mixin atSmall {
    padding-left: 94px;
  }

  &__icon {
    display: block;
    margin: 0 auto;
    @mixin atSmall {
      position: absolute;
      left: 0;
    }
  }

  &__title {
    font-size: 1.6rem;
    font-weight: 300;
    margin-top: 0.7em;
    margin-bottom: 0.8rem;
    text-align: center;

    @mixin atSmall {
      margin-top: 1em;
      font-size: 1.875rem;
      text-align: left;
    }
  }
}
```
