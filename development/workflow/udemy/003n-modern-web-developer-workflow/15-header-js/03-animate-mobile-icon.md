# Animate Mobile Icon
* Remove background color from icon so it no longer looks like a square

`_site-header.css`

```
// more code
&__menu-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    
    /*background-color: #fff;*/
    height: 20px;
    width: 20px;
// more code
```

* It is there, and clickable, we just can't see it now
* Try it for yourself in the browser

`index.html`

* Add the following HTML to your menu-icon block

```html
<div class="site-header__menu-icon">
  <div class="site-header__menu-icon__top"></div>
  <div class="site-header__menu-icon__middle"></div>
  <div class="site-header__menu-icon__bottom"></div>
</div>
```

`_site-header.css`

```
/* more code */
  &__menu-content {
    position: relative;
    top: 1rem;
    right: 1rem;
    z-index: 10;

    background-color: $white;
    height: 2rem;
    width: 2rem;
    opacity: 0;
    padding-top: 9rem;
    text-align: center;
    transform: scale(1.2);
    transition: all 0.3s ease-out;

    @mixin atMedium {
      z-index: 1;

      opacity: 1;
      padding-top: 0;
      text-align: left;
      transform: scale(1);
    }

    &--is-visible {
      z-index: 1;

      opacity: 1;
      transform: scale(1);
    }
  }
/* more code */
```

## Cleaner HTML
```html
<div class="site-header__menu-icon">
  <div class="site-header__menu-icon__middle"></div>
</div>
```

`_site-header.css`

```css
/* more code */
  &__menu-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;

    height: 2rem;
    width: 2rem;

    @mixin atMedium {
      display: none;
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;

      background-color: $white;
      content: '';
      height: 0.3rem;
      width: 2rem;
      transform-origin: 0 0;
      transition: transform 0.3s ease-out;
    }

    &__middle {
      position: absolute;
      top: 0.7rem;
      left: 0;

      background-color: $white;
      height: 0.3rem;
      width: 2rem;
      transition: all 0.3s ease-out;
      transform-origin: 0 50%;
    }

    &::after {
      position: absolute;
      top: 1.4rem;
      bottom: 0;

      background-color: $white;
      content: '';
      height: 0.3rem;
      width: 2rem;
      transform-origin: 0 100%;
      transition: transform 0.3s ease-out;
    }
  }
/* more code */
```

`MobileMenu.js`

* Add a class for the `X` that will be used to toggle open/close menu icon

```js
// more code
toggleTheMenu() {
  this.menuContent.toggleClass('site-header__menu-content--is-visible');
  this.siteHeader.toggleClass('site-header--is-expanded');
  this.menuIcon.toggleClass('site-header__menu-icon--close-x');
}
// more code
```

`_site-header.css`

* Place after `&__menu-icon` closes

```css
  &__menu-icon--close-x {
    &::before {
      transform: rotate(45deg) scaleX(1.25);
    }
    
    .site-header__menu-icon__middle {
        opacity: 0;
        transform: scaleX(0);
     }
    
    &::after {
      transform: rotate(-45deg) scaleX(1.25) translateY(1px);
    }
  }

/* more code */
```

* We rotate 45 degrees (clockwise)
* rotate -45 degrees (counter clockwise)
* We manipulate transform origin (default is 50% 50%)
* [Read More](https://css-tricks.com/almanac/properties/t/transform-origin/) about transform origin

### Test it out
* Click the mobile icon and icon switches
* I'm not a huge fan of the animation and the ending `X` doesn't look great
* You can make it look better by tweaking the code
* Or you could just use an `X` and show/hide it
* This was just an exercise on what you can do with CSS animations instead using javascript

## Animate the change
`_site-header.css`

```
&__menu-icon {
  // more code
  &::before {
    // more code
    transition: transform .3s ease-out;
  }

  &__middle {
    // more code
    transition: all .3s ease-out;
    transform: scaleX(0);
    transform-origin: 0 50%;
  }

  &::after {
    // more code
    transition: transform .3s ease-out;
  }
// more code
```

## Next - Reveal Content on scroll

### Final `_site-header.css`

```css
.site-header {
  position: absolute;
  z-index: 2;

  padding: 1rem 0;
  transition: background-color 0.3s ease-out;
  width: 100%;

  &--is-expanded {
    background-color: rgba($blue, 0.55);
  }

  &__btn-container {
    @mixin atMedium {
      float: right;
    }
  }

  &__logo {
    position: absolute;
    top: 0;
    left: 50%;

    background-color: $purple;
    padding: 2.5rem 3.6rem;
    transform: translateX(-50%) scale(0.8);
    transition: transform 0.3s ease-out;
    transform-origin: 50% 0;

    @mixin atMedium {
      left: auto;
      transform: translateX(0) scale(1);
    }
  }

  /* gets rid of text by pushing it off screen */
  /* Kept on page for screen readers */
  &__logo__graphic {
    text-indent: -9999px;
  }

  /* hide the menu on phones */
  &__menu-content {
    position: relative;
    z-index: -10;

    opacity: 0;
    padding-top: 9rem;
    text-align: center;
    transform: scale(1.2);
    transition: all 0.3s ease-out;

    @mixin atMedium {
      z-index: 1;

      opacity: 1;
      padding-top: 0;
      transform: scale(1);
    }

    &--is-visible {
      z-index: 1;

      opacity: 1;
      transform: scale(1);
    }
  }

  &__menu-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;

    height: 2rem;
    width: 2rem;

    @mixin atMedium {
      display: none;
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;

      background-color: $white;
      content: '';
      height: 0.3rem;
      width: 2rem;
      transform-origin: 0 0;
      transition: transform 0.3s ease-out;
    }

    &__middle {
      position: absolute;
      top: 0.7rem;
      left: 0;

      background-color: $white;
      height: 0.3rem;
      width: 2rem;
      transition: all 0.3s ease-out;
      transform-origin: 0 50%;
    }

    &::after {
      position: absolute;
      top: 1.4rem;
      bottom: 0;

      background-color: $white;
      content: '';
      height: 0.3rem;
      width: 2rem;
      transform-origin: 0 100%;
      transition: transform 0.3s ease-out;
    }
  }

  &__menu-icon--close-x {
    &::before {
      transform: rotate(45deg) scaleX(1.25);
    }
    
    .site-header__menu-icon__middle {
        opacity: 0;
        transform: scaleX(0);
     }
    
    &::after {
      transform: rotate(-45deg) scaleX(1.25) translateY(1px);
    }
  }
}
```
