# technologies - Part 2
* The `font-size` and `line-height` CSS properties can be the same as **our-features** so we reuse our `generic-content-container` class

```html
<div id="technologies" class="page-section page-section--technologies">
    <div class="wrapper">
      <h2 class="section-title section-title--blue"><img class="section-title__icon" src="assets/images/icons/comment.svg">Real <strong>technologies</str
      <div class="row row--gutters generic-content-container">
```

* Now apply same HTML pattern to other two technologies

```html
<div id="technologies" class="page-section page-section--technologies">
  <div class="wrapper">
    <h2 class="section-title section-title--blue"><img class="section-title__icon" src="assets/images/icons/comment.svg">Real <strong>technologies</strong></h2>

    <div class="row row--gutters generic-content-container">
      <div class="row__medium-4">
        <div class="technologies">
          <div class="technologies__photo">
            <img src="assets/images/technologies-jane.jpg">
          </div>
           <!-- /.technologies__photo -->
          <h3 class="technologies__title">Jane Doe</h3>
          <h4 class="technologies__subtitle">9 Time Escaper</h4>
          <p>&ldquo;Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&rdquo;</p>
        </div>
        <!-- /.technologies -->
      </div>
      <!-- /.row__medium-4 -->
      <div class="row__medium-4">
        <div class="technologies">
          <div class="technologies__photo">
            <img src="assets/images/technologies-john.jpg">
          </div>
          <!-- /.technologies__photo -->
          <h3 class="technologies__title">John Smith</h3>
          <h4 class="technologies__subtitle">4 Time Escaper</h4>
          <p>&ldquo;Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur.&rdquo;</p>
        </div>
        <!-- /.technologies -->
      </div>
      <!-- /.row__medium-4 -->
      <div class="row__medium-4">
        <div class="technologies">
          <div class="technologies__photo">
            <img src="assets/images/technologies-cat.jpg">
          </div>
          <!-- /.technologies__photo -->
          <h3 class="technologies__title">Cat McKitty</h3>
          <h4 class="technologies__subtitle">6 Time Escaper</h4>
          <p>&ldquo;Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.&rdquo;</p>
        </div>
        <!-- /.technologies -->
      </div>
      <!-- /.row__medium-4 -->
    </div>
    <!-- /.row -->
  </div>
  <!-- /.wrapper -->
</div>
```

![3 technologies styled](https://i.imgur.com/ZByrxUB.png)

## Fix Real technologies spacing issue
* This happened because we used `position` **relative** to pull the images up out of their normal positions
    - We pull them up `80px`
    - We can counteract that by adding `80px` to the row

```html
<div class="row row--gutters row--t-padding generic-content-container">
    <div class="row__medium-4">
      <div class="technologies">
```

`_row.css`

```
.row {

  @mixin clearfix;

  &--t-padding {
    padding-top: 80px;
  }
```

* Make our gutter more narrow

```
// more code
  &--gutters-small {
    margin-right: -45px;
  }

  &--gutters-large {
    margin-right: -100px;
  }

  &--gutters > div {
    padding-right: 65px;;
  }

  &--gutters > div {
    padding-right: 45px;;
  }
// more code
```

* Each of our technologies is a different height

![different heights](https://i.imgur.com/pci8PHx.png)

* Lots of ways to solve this
* We'll use Flexbox

## Flexbox
```html
<div class="row row--gutters row--equal-height-at-medium row--gutters-small row--t-padding generic-content-container">
  <div class="row__medium-4">
    <div class="testimonial">
```

* We add `row--equal-height-at-medium` modifier
`_row.css`

```
// more code
    &__medium-8--smaller {
      width: 63%;
    }
  }

  /* Begin Equal Height Rules */
  &--equal-height-at-medium {
    @mixin atMedium {
      display: flex;
    }

    & > div {
      float: none;
      display: flex;
    }
  }

}
```

* Now they are all equal height
* We use a **descendant selector** (`>`) to turn off all floats in Medium devices the container uses `flex` and all its direct descendent's use flex too

![all equal height](https://i.imgur.com/e8p2Rhd.png)

### Remove background on smaller screens 
* On larger screens the background image makes sense
* On small screens there is no room so we should remove it
    - It is a large image with a large file size
    - We don't want mobile users to have to download it

`_page-section.css`

```css
.page-section {
  padding: 1.2rem 0;

// more code

&--technologies {
    background-color: #e0e6ef;

    @mixin atMedium {
      background: url('/assets/images/technologies-bg.jpg') top center no-repeat;
      background-size: cover;
    }
  }
}
```

* Remove right and left padding so white testimonial background uses full screen

```html
<div id="technologies" class="page-section page-section--technologies">
  <div class="wrapper wrapper--no-p-until-medium">
```

`_wrapper.css`

```css
.wrapper {
  padding-left: 18px;
  padding-right: 18px;
  max-width: 1236px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;

  &--no-p-until-medium {
    padding-left: 0;
    padding-right: 0;

    @mixin atMedium {
        padding-left: 18px;
        padding-right: 18px;
    }

  }
```

* Make our `technologies` **padding** match our other `section` **padding**

`_technologies.css`

```
.technologies {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0 18px 1px 18px;

  @mixin atMedium {
    padding: 0 1.875rem 1px 1.875rem;
  }
// more code
```

## Fix this problem
![images overlapping](https://i.imgur.com/wEFQSLb.png)

* We used `position` **relative** to pull them up `80px` out of their natural position
* Larger screens is fine because they sit next to each other
* But on mobile screens they are stacked on top of each other
* To fix we just add a margin bottom on smaller screens

`_technologies.css`

```
.technologies {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0 18px 1px 18px;
  margin-bottom: 80px;
```

* But a little extra vertical spacing (18px) will make look better

```
.technologies {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0 18px 1px 18px;
  margin-bottom: 98px;
```

* On larger screens we don't need that margin-bottom

```
.technologies {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0 18px 1px 18px;
  margin-bottom: 98px;

  @mixin atMedium {
    margin-bottom: 0;
    padding: 0 1.875rem 1px 1.875rem;
  }
// more code
```

* Remove this light blue gap

![gap](https://i.imgur.com/CuCpmsp.png)

* Caused by `margin-bottom` we just added to technologies
* And also by `padding-bottom` of `page-section` element
* We add `testimonial--last` modifier to our 3rd and last testimonial

```html
<div class="row__medium-4">
  <div class="technologies technologies--last">
```

`_technologies.css`

```
// more code
&--last {
    margin-bottom: 0;
  }
}
```

* That gets rid of most of the gap
* We can get rid of the rest by adding a modifier class to the technologies page-section element

```html
<div id="technologies" class="page-section page-section--no-b-padding-until-medium page-section--technologies">
```

* We add the `page--section--no-b-padding-until-medium` modifier

```
.page-section {
  padding: 1.2rem 0;

  @mixin atMedium {
    padding: 4.5rem 0;
  }

  &--no-b-padding-until-medium {
    padding-bottom: 0;

    @mixin atMedium {
      padding-bottom: 4.5rem;
    }
  }
// more code
```

* That removes the gap
