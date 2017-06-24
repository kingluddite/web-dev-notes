# Animate Mobile Icon
* Remove background color from icon so it no longer looks like a square

`_site-header.css`

```
// more code
&__menu-icon {
    width: 20px;
    height: 20px;
    /*background-color: #fff;*/
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
// more code
```

* It is there, and clickable, we just can't see it now

`index.html`

```html
<div class="site-header__menu-icon">
  <div class="site-header__menu-icon__top"></div>
  <div class="site-header__menu-icon__middle"></div>
  <div class="site-header__menu-icon__bottom"></div>
</div>
```

`_site-header.css`

```
// more code
&__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 3px;
  background-color: #fff;
}

&__middle {
  position: absolute;
  top: 7px;
  left: 0;
  width: 20px;
  height: 3px;
  background-color: #fff;
}

&__bottom {
  position: absolute;
  top: 14px;
  left: 0;
  width: 20px;
  height: 3px;
  background-color: #fff;
}
// more code
```

## Cleaner HTML
```html
<div class="site-header__menu-icon">
  <div class="site-header__menu-icon__middle"></div>
</div>
```

`_site-header.css`

```
&::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 3px;
  background-color: #fff;
}

&__middle {
  position: absolute;
  top: 7px;
  left: 0;
  width: 20px;
  height: 3px;
  background-color: #fff;
}

&::after {
  content: "";
  position: absolute;
  top: 14px;
  left: 0;
  width: 20px;
  height: 3px;
  background-color: #fff;
}
```

`MobileMenu.js`

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

```
// more code
&::before {
  // more code
  transform-origin: 0 0;
}

// more code

&::after {
  // more code
  transform-origin: 0 100%;
}
// more code
&__menu-icon--close-x {
  &::before {
    transform: rotate(45deg) scaleX(1.25) translateY(-2px);
  }

  .site-header__menu-icon__middle {
    opacity: 0;
  }

  &::after {
    transform: rotate(-45deg) scaleX(1.25) translateY(1px);
  }
}
// more code
```

* We rotate 45 degrees (clockwise)
* rotate -45 degrees (counter clockwise)
* We manipulate transform origin (default is 50% 50%)
* [Read More](https://css-tricks.com/almanac/properties/t/transform-origin/) about transform origin
* Click and icon switches

## Animate the change
`_site-header.css`

```
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
