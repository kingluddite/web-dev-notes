# Styling the Testimonials Section
![end of testimonials](https://i.imgur.com/Wy6Bywq.png)

* Create new Git branch `testimonials`

`$ git checkout -b testimonials`

* Run gulp

`$ gulp watch`

`index.html`

* We add our previous `page-section` class

`<div id="testimonials" class="page-section">`

* Add background image

* We add a new modifier `page-section--testimonials`

`<div id="testimonials" class="page-section page-section--testimonials">`

`_page-section.css`

```
// more code
  &--testimonials {
    background: url('/assets/images/testimonials-bg.jpg') top center no-repeat;
    background-size: cover;
  }
}
```

* We **align** the image toward the **top** of the section
* **Horizonally** we **align** the image to the `center`
* We make sure the image **does not repeat** (_aka title - only displays once_) (default behavior is to repeat)

### cover
* `background-size: cover` - this will shrink or stretch the image to always be large or small enough to always perfectly cover the containing `div`

### Adjust Testimonial width
* We don't it want to use full width but jus the middle of the screen
    - We can use our resusuable `wrapper` block to do this for us

```html
  <div id="testimonials" class="page-section page-section--testimonials">
    <div class="wrapper">
      <!-- content here -->
    </div>
    <!-- /.wrapper -->
```

* And we modify our heading and icon

```html
<div class="wrapper">
  <h2 class="section-title section-title--blue"><img class="section-title__icon" src="assets/images/icons/comment.svg">Real <strong>Testimonials</strong></h2>
```

![so far heading](https://i.imgur.com/pbKgqvR.png)

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
  /* add this rule below */
  &--blue {
    color: $mainBlue;
  }

  &__icon {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: .6rem;
    /* add this rule below */
    @mixin atSmall {
      position: relative;
      top: 8px;
      margin-right: 1rem; /* update this line */
      margin-left: 0;
      margin-bottom: 0;
      display: inline-block;
    }

  }
```

* We give it the blue color
* We position our icon better

### Add our row and columns
* We want a row with 3 columns

![3 cols](https://i.imgur.com/rSgnXeO.png)

```html
<h2 class="section-title section-title--blue"><img class="section-title__icon" src="assets/images/icons/comment.svg">Real <strong>Testimonials</strong></h2>

<div class="row">
  <div class="row__medium-4"></div>
  <!-- /.row__medium-4 -->
  <div class="row__medium-4"></div>
  <!-- /.row__medium-4 -->
  <div class="row__medium-4"></div>
  <!-- /.row__medium-4 -->
</div>
<!-- /.row -->
```

* Cut and paste the individual testimonials into each `row__medium-4`

```html
 <div id="testimonials" class="page-section page-section--testimonials">
    <div class="wrapper">
      <h2 class="section-title section-title--blue"><img class="section-title__icon" src="assets/images/icons/comment.svg">Real <strong>Testimonials</strong></h2>

      <div class="row">
        <div class="row__medium-4"><img src="assets/images/testimonial-jane.jpg">
          <h3>Jane Doe</h3>
          <h3>9 Time Escaper</h3>
          <p>&ldquo;Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&rdquo;</p></div>
        <!-- /.row__medium-4 -->
        <div class="row__medium-4"><img src="assets/images/testimonial-john.jpg">
          <h3>John Smith</h3>
          <h3>4 Time Escaper</h3>
          <p>&ldquo;Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur.&rdquo;</p>
        </div>
        <!-- /.row__medium-4 -->
        <div class="row__medium-4">
          <img src="assets/images/testimonial-cat.jpg">
          <h3>Cat McKitty</h3>
          <h3>6 Time Escaper</h3>
          <p>&ldquo;Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.&rdquo;</p>
        </div>
        <!-- /.row__medium-4 -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.wrapper -->
  </div>
```

* That gives us a 3 column layout

![3 col layout](https://i.imgur.com/nI4O6HT.png)

* Add gutters

`<div class="row row--gutters">`

![gutters added](https://i.imgur.com/yi4VzK2.png)

### Create individual testimonial styling
* tip `ctrl` + `v` **vs** `ctrl` + `shift` + `v`

`index.html`

```html
<div class="row__medium-4">
  <div class="testimonial">
    <img src="assets/images/testimonial-jane.jpg">
    <h3>Jane Doe</h3>
    <h3>9 Time Escaper</h3>
    <p>&ldquo;Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&rdquo;</p>
  </div>
  <!-- /.testimonial -->
</div>
<!-- /.row__medium-4 -->
```

`/app/assets/styles/modules/_testimonials.css`

```css
.testimonial {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0 1.875rem 1px 1.875rem;

  &__photo {
    border-radius: 80px;
    overflow: hidden;
    height: 160px;
    width: 160px;
    margin: 0 auto -80px auto;
    position: relative;
    top: -80px;
    border: 6px solid rgba(255, 255, 255, 0.8);
  }
}
```

* We can make background colors transparent
* Why `1px` bottom padding?
    - Change it to `0` and see what happens, it collapses
    - When we use `1px` we see more than `1px` of space
        + That is because the bottom margin on the `<p>` ([screenshot](https://i.imgur.com/GvPW54Q.png)) can create space for us
        + But if the containing element doesn't have any padding (set to `0`), the paragraph will still have bottom margin but it will bleed outside of its containing element
        + By giving the containing element just `1px` of padding, it gives the bottom margin of this content something to push up against

## Import testimonials
`styles.css`

```css
@import from 'modules/_testimonials';
```

```
&__photo {
    border-radius: 30px
  }
```

* We won't see any changes becuase the image is allow to protrude outside the container div
* But if we set the container to set the overflow to be hidden we get this

![rounded edges](https://i.imgur.com/cCijQ7P.png)

* The left side is only rounded because that containing `div` is using the full available width
* We can give the allusion that the image is round by setting the container to have the same height and width as the image
* How to find out dimensions of image
    1. Right click
    2. Open in new tab
    3. Look at tab for dimensions
* To make the image a circle we just make the `border-radius` be 1/2 of the width or length of the image (_1/2 of 160px = 80px_)

![image dimensions](https://i.imgur.com/wSthxBB.png)

```css
  &__photo {
    border-radius: 30px;
    overflow: hidden;
    height: 160px;
    width: 160px;
  }
```

* Now the testimonial image is round

## Image violate the top edge
```css
  &__photo {
    position: relative;
    top: -80px;
    
    border: 6px solid rgba(255,255,255, 0.8);
    border-radius: 80px;
    height: 160px;
    margin: 0 auto 0 auto;
    overflow: hidden;
    width: 160px;
  }
```

![violate top edge](https://i.imgur.com/5XaXhVR.png)

* When you use position relative, the surrounding content is not aware of the change
* We counteract that by giving the image negative `margin-bottom`

```css
&__photo {
    border-radius: 80px;
    overflow: hidden;
    height: 160px;
    width: 160px;
    margin: 0 auto -80px auto;
    position: relative;
    top: -80px;
  }
```

![fixed](https://i.imgur.com/IVbQhJG.png)

* Add 6px border to image
```css
&__photo {
    border-radius: 80px;
    overflow: hidden;
    height: 160px;
    width: 160px;
    margin: 0 auto -80px auto;
    position: relative;
    top: -80px;
    border: 6px solid rgba(255, 255, 255, 0.8);
  }
```

`index.html`

```html
<!-- /.testimonial__photo -->
<h3 class="testimonial__title">Jane Doe</h3>
<h4 class="testimonial__subtitle">9 Time Escaper</h4>
```

* We change second `h3` to `h4` for semantic reasons
    - [read more about heading structure and semantics](http://accessiblehtmlheadings.com/)

`_testimonial.css`

```
// more code
  &__title {
     color: $mainBlue;
     text-align: center;
     font-size: 1.5rem;
     font-weight: 500;
     margin: 0;
  }

  &__subtitle {
    color: $mainOrange;
    text-align: center;
    font-weight: 400;
    font-size: 0.9375rem;
    margin: 0.25rem 0 1rem 0;
  }
}
```
