# Mobile Style Header - Part 2
## Make our logo a sprite instead of an individual image file
```html
<div class="site-header__logo">
  <div class="icon icon--clear-view-escapes section-title__icon">Clear View Escapes</div>
</div>
```

* Stop Gulp watch `ctrl` + `c`

`$ gulp icons`

`$ gulp watch`

* Save `styles.css`
* Use Chrome inspector to make sure it it pulling from sprite
* We add this class `site-header__logo__graphic`

```html
<div class="site-header__logo__graphic icon icon--clear-view-escapes section-title__icon">Clear View Escapes</div>
```

`_site-header.css`

```
// more code
  &__logo {
    position: absolute;
    top: 0;
    background-color: $mainBlue;
    padding: 25px 36px;
  }

  &__logo__graphic {
    text-indent: -9999px;
  }
}
```

* We need to add text in the markup, this is beneficial from a SEO perspective
* We need the text for SEO but we don't want to render it visually
    - Setting `text-indent: -9999px` is a common way to hide it from the person viewing the page but not from screen readers

## Push our hero down slightly
`_large-hero.css`

```css
&__text-content {
  padding-top: 60px;
  position: absolute;
  top: 50%;
  left: 0;

  text-align: center;
  transform: translateY(-50%);
  width: 100%;
}
```

## Now we'll optimize the header for small screens
* It doens't look good

![bad mobile header](https://i.imgur.com/n3c6oWp.png)

* We'll hide the top right nave and button until the user clicks a menu icon
* We will show a smaller logo on small screens
    - We can get rid of the transparent blue blackground

```html
<div class="site-header__menu-content">
  <div class="site-header__btn-container">
    <a href="#" class="btn">Get in Touch</a>
  </div>
  <!-- /.site-header__btn-container -->
  <nav class="primary-nav primary-nav--pull-right">
    <ul>
      <li><a href="#our-beginning">Our Beginning</a></li>
      <li><a href="#features">Features</a></li>
      <li><a href="#testimonials">Testimonials</a></li>
    </ul>
  </nav>
</div>
<!-- /.site-header__menu-content -->
```

* We create a `div` container with the `site-header__menu-content` class

`_site-header.css`

```
  &__menu-content {
    display: none;

    @mixin atMedium {
      display: block;
    }
  }
}
```

* We hide it on small screens and show it on Medium or larger screens

## Center logo on small screens
`_site-header.css`

```css
&__logo {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: $mainBlue;
  padding: 25px 36px;
}
```

* `left: 50%` pulls the logo over too much
* But if we also use `transform: translateX(-50%)`
    - That moves the logo to the left half of its own width

### And to make it not centered in larger screens
* We will undo those two properties we just set with:

```css
  &__logo {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: $mainBlue;
    padding: 25px 36px;

    @mixin atMedium {
      left: auto;
      transform: translateX(0);
    }
  }
```

## Making logo smaller on small screens
* It is no longer an image
* Images would be easier to make a smaller size
* To make sprites smaller we can:

```css
&__logo {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) scale(.8);
  background-color: $mainBlue;
  padding: 25px 36px;

  @mixin atMedium {
    left: auto;
    transform: translateX(0) scale(1);
  }
}
```

* But the sprite logo now has a top padding gap
    - This is because by default when you use `transform: scale()` the element considers its perfect center to be the origin of the transform
        + (translation) - It shrunk equaly in all 4 directions so that its centers is the same position as it was before the shrinking occurred
        + Another way of saying this is by default the `transform-origin: 50% 50%` (perfect middle horizontally and perfect middle vertically)
        + `transform-origin: 50% 100%;` - Will move it down even more
        + `transform-origin: 50% 0;` - Gets rid of the top padding gap

# Give hero and logo more spacing
`_large-hero.css`

```css
&__text-content {
  padding-top: 88px;
  position: absolute;
  top: 50%;
  left: 0;

  text-align: center;
  transform: translateY(-50%);
  width: 100%;

  @mixin atMedium {
    padding-top: 60px;
  }
}
```

## Add mobile menu icon
* We add an empty div with `site-header__menu-icon` class

```html
<!-- /.site-header__logo -->

<div class="site-header__menu-icon"></div>
<!-- /.site-header__menu-icon -->

<div class="site-header__menu-content">
```

`_site-header.css`

```css
&__menu-icon {
  width: 20px;
  height: 20px;
  background-color: #fff;
  position: absolute;
  top: 10px;
  right: 10px;

  @mixin atMedium {
    display: none;
  }
}
```

* Now we have an ugly white square
* It will soon use a tri-nav
* It shows on mobile and not on large screens
* We will use JavaScript to make this look good and work

### Next JavaScript
