# Styling Mobile Menu
* Current mobile menu

![mobile menu](https://i.imgur.com/z2imkaI.png)

* Push content down only on mobile
* And center it too

`_site-header.css`

```css
// more code
  &__menu-content {
      text-align: center;
      padding-top: 100px;
      display: none;

      @mixin atMedium {
        text-align: left;
        display: block;
        padding-top: 0;
      }

      &--is-visible {
        display: block;
      }
    }
  }
```

### Remove the float only on mobile (button)
* Change this:

`_site-header.css`

```css
&__btn-container {
  float: right;
}
```

* To this:

```css
&__btn-container {
  @mixin atMedium {
    float: right;
  }
}
```

### Remove floats on mobile (nav)

`_primary-nav.css`

```css
.primary-nav {

  &--pull-right {
    @mixin atMedium {
      float: right;
    }
  }
```

### Make top area easier to read
* We'll add a transparent background

`MobileMenu.js`

```js
// more code

class MobileMenu {
  constructor() {
    this.siteHeader = $('.site-header'); // add this line
    this.menuIcon = $('.site-header__menu-icon');
    this.menuContent = $('.site-header__menu-content');
    this.events();
  }

// more code

  toggleTheMenu() {
    this.menuContent.toggleClass('site-header__menu-content--is-visible');
    this.siteHeader.toggleClass('site-header--is-expanded'); // add this line
  }
}

export default MobileMenu;
```

* When you click on white icon you'll see that we dynamically add a class

![dynamic class added](https://i.imgur.com/7WCAcMe.png)

### Add CSS to fade in header
`_site-header.css`

```
.site-header {
  position: absolute;
  z-index: 2;
  
  padding: 10px 0;
  transition: background-color 0.3s ease-out;
  width: 100%;

  &--is-expanded {
    background-color: rgba($mainBlue, .55);
  }
```

* 0.3s (300 milliseconds)
* Learn more about [CSS transition property](https://css-tricks.com/almanac/properties/t/transition/)

#### Troubleshooting
* Sometimes you look at the browser and it doesn't show you what you think your site will look like
* You make sure gulp watch is running and it may be but you still have an strange error
* You need to know that if the website is not looking right you may have a bug and it will be hard to find
* Here is such an example

`_site-header.css`

`transition: background-color: 0.3s ease-out;`

* This is a mistake
* I added another `colon` (:) after background-color and this will cause an issue
* If you view the Chrome inspector you will see that the _site-header.css is not loading but you did not load this file individually
* The problem is this is the side effect of bad code
* Remove the colon from the code and all is well

### Also have Menu items fade in
`_site-header.css`

```
// more code
  &__menu-content {
    /*display: none;*/
    opacity: 0;
    padding-top: 100px;
    text-align: center;
    transition: opacity .3s ease-out;

    @mixin atMedium {
      display: block;
      padding-top: 0;
      text-align: left;
    }

    &--is-visible {
      /*display: block;*/
      opacity: 1;
    }
  }
}
```

## Opacity over Display
* Instead of `display none` and then `display block` to show and hide menu items
    - We use **opacity** `0` (_invisible_) and the **transition** to **opacity** `1` (_fully opaque_)
* If you want to work with transitions in **CSS** you need to use the **opacity** property and not the **display** property

## The invisible clickable problem
* One problem is now our item is opacity 0 and invisible it can still be clicked on
    - We don't want our user to be able to click on invisible content

`_site-header.css`

```
// more code
  &__menu-content {
    position: relative; /* add this line */
    
    opacity: 0;
    padding-top: 100px;
    transition: opacity .3s ease-out;
    text-align: center;
    z-index: -10; /* add this line */

    @mixin atMedium {
      text-align: left;
      /*display: block;*/
      opacity: 1; /* add this line */
      padding-top: 0;
      z-index: 1; /* add this line */
    }

    &--is-visible {
      opacity: 1;
      z-index: 1; /* add this line */
    }
  }
}
```

* We use a large negative `z-index` to make sure our invisible element is stacked behind all the other elements in the page
    - This ensures the user won't click on it
* **note** `z-index` is only recognized by the browser if `position` is **relative** or **absolute**
* We set `z-index` to `1` when it is visible so it can easily be clicked on

## Houston we have a problem!
* We click on the menu icon and the menu appears
* But when we click on it again it does not disappear
* We'll tackle this problem after we work with transitions and CSS a little more

## Transition "all"
* We can use `all` in transition to transition all properties
    - You can specify a particular property as we have above
    - Or use a value of "all" to refer to transition properties
* **note** The following is just a code sample and has nothing to do with the project

```css
div {
  background: red;
  padding: 10px;
  transition: all 0.5s ease;
}
div:hover {
  background: green;
  padding: 20px;
}
```

* In this above example, both `background` and `padding` will transition, due to the value “all” specified for the `transition-property` portion of the shorthand
* So we can use that in our code:

`_site-header.css`

```css
/* more codea */
&__menu-content {
  position: relative;
  z-index: -10;
  
  opacity: 0;
  padding-top: 100px;
  text-align: center;
  transition: all .3s ease-out; /* modify this line */
/* more code */
```

## Add `zoom out` effect
`_site-header.css`

```css
  &__menu-content {
    position: relative;
    z-index: -10;

    opacity: 0;
    padding-top: 90px; /* add this line */
    text-align: center;
    transform: scale(1.2); /* add this line */
    transition: all .3s ease-out;

    @mixin atMedium {
      opacity: 1;
      z-index: 1;

      padding-top: 0;
      text-align: left;
      transform: scale(1); /* add this line */
    }

    &--is-visible {
      z-index: 1;

      opacity: 1;
      transform: scale(1); /* add this line */
    }
  }
}
```

### Houston we have a problem!
* We can open the menu with a click but we can't close it with a click
* This occurs because we adjusted the `z-index` value of the main content div
    - When the menu is visible it is overlapping the icon so we can't click on it
    - To fix we just give the menu icon on larger `z-index`

`_site-header.css`

```css
/* more code */
&__menu-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10; /* add this line */
  
  background-color: $white;
  height: 20px;
  width: 20px;
/* more code */
```

### Fix mobile links
* Make them more "clickable"

```css
.primary-nav {
  padding-top: 10px;

  @mixin atMedium {
    padding-top: 0;
  }
/* more code */

  a {
    background-color: rgba($mainBlue, .5);
    color: $white;
    display: block;
    font-size: .8rem;
    font-weight: 300;
    padding: 12px 0;
    text-decoration: none;

    @mixin atMedium {
      background-color: transparent;
      font-size: 1rem;
      padding: 12px 0;
    }
  }
}
```

### Next - Making the hamburger menu icon nice looking
* Hamburger Menu [Read More](http://www.dtelepathy.com/blog/design/hamburger-menu-examples)


