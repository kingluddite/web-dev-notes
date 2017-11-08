# Avoid jQuery Spaghetti
## Mobile View - Navigation Menu
* Delete everything inside `App.js`
* Delete `Person.js`
* Create the `MobileMenu.js` module

`/app/assets/scripts/modules/MobileMenu.js`

```js
class MobileMenu {
  constructor() {
    console.log('testing mobile menu');
  }
}

export default MobileMenu;
```

`App.js`

```js
import MobileMenu from './modules/MobileMenu';

const mobileMenu = new MobileMenu();
```

## Naming Variables Properly
* `MobileMenu` is just a variable name
    - We can name it anything but good to name it what we are importing
* Just importing does nothing
    - So we create a new `MobileMenu()` and store it in a variable (_mobileMenu_)

## Capitalize Constructors
### mobileMenu vs MobileMenu
* Notice the different spellings between the object using the `new` constructor `MobileMenu()` and the variable `mobileMenu`
* If you save you will see the console log of `testing mobile menu`

## We will use jQuery
* We don't have to but it does make certain tasks easier

`MobileMenu.js`

```js
import $ from 'jquery';

class MobileMenu {
  constructor() {
    
  }
}

export default MobileMenu;
```

### Code jQuery - The bad way of doing it (jQuery Spaghetti)
`MobileMenu.js`

```js
import $ from 'jquery';

class MobileMenu {
  constructor() {
    $('.site-header__menu-icon').click(function() {
      console.log('Top right mobile icon was clicked');
    });
  }
}

export default MobileMenu;
```

* Test, click on white square and you'll see log message of 'Top right mobile icon was clicked'

## Why is code bad?
* We are selecting an element from the DOM
        + `$('.site-header__menu-icon')`
* We are event handling `.click()`
* We are defining our functionality
        + `console.log('Top right mobile icon was clicked');`
* As our code gets longer, this jQuery will become a dirty, filthy mess

## A better way
* So our `forks, spoons and knives each fit into their own organized compartments`

![container](https://i.imgur.com/2mWviJr.png)

`MobileMenu.js`

```js
import $ from 'jquery';

class MobileMenu {
  constructor() {
   this.menuIcon = $('.site-header__menu-icon');
   this.events();
  }

  events() {
    this.menuIcon.click(this.toggleTheMenu);
  }

  toggleTheMenu() {
    console.log('clicked');
  }
}

export default MobileMenu;
```

* We need to call `events()` as soon as the browser loads

## Console sees our click!
* We click on icon and we see `clicked` in console

## `this` can be a problem
* Let's show you why and how to fix it

`MobileMenu.js`

```js
import $ from 'jquery';

class MobileMenu {
  constructor() {
   this.menuIcon = $('.site-header__menu-icon');
   this.menuContent = $('.site-header__menu-content');
   this.events();
  }

  events() {
    this.menuIcon.click(this.toggleTheMenu);
  }

  toggleTheMenu() {
    this.menuContent.toggleClass('site-header__menu-content--is-visible');
  }
}

export default MobileMenu;
```

## Test in browser
* We get an error when we click on mobile icon `Cannot read property "toggleClass" of undefined
    - this problem is because of `this`

## Why does `this` work in the constructor and events but not inside `toggleTheMenu()`?
* Because the value of `this` changes depending on when and where we use it
* Normally when we use the `this` keyword inside an object method, it points to the object
* But this time (inside `toggleTheMenu()`) .... `this` is not pointing back to the object

## Why?
* Because when that method runs, we didn't call it directly
* Instead it is running in response to the `click` event
  - **note** In JavaScript, when a function is used as an event handler, the `this` keyword within that function, gets set to the DOM element the event fired from
      + In this case, the element that got clicked on, which would be the `menuIcon`

## Testing `this`
`MobileMenu.js`

```js
import $ from 'jquery';

class MobileMenu {
  constructor() {
   this.menuIcon = $('.site-header__menu-icon');
   this.menuContent = $('.site-header__menu-content');
   this.events();
  }

  events() {
    this.menuIcon.click(this.toggleTheMenu);
    console.log('from events', this);
  }

  toggleTheMenu() {
    console.log('from toggleTheMenu', this);
    this.menuContent.toggleClass('site-header__menu-content--is-visible');
  }
}

export default MobileMenu;
```

* Test in browser
* The console shows `from events` MobileMenu (_on page load_)
* When we click we see it points to `div.site-header__menu-icon`
    - When the `toggleTheMenu` method runs the `this` keyword has been set to the element that was just clicked on

![this test error](https://i.imgur.com/mRH1FB1.png)

* Sometimes it is useful like here:

```js
toggleTheMenu() {
  this.remove();
  this.menuContent.toggleClass('site-header__menu-content--is-visible');
}
```

* Now when you click on the icon, it disappears
* We need to change the `this` keyword from equaling the element that was clicked on
* Instead we want the `this` keyword to point back to our object
    - So we can use it to access the `menuContent` property

## How can we do that?
* How can we override JavaScript's default behavior?
* How can we have fine-grain control over the `this` keyword?

## Easy just use `bind`

```js
events() {
  this.menuIcon.click(this.toggleTheMenu.bind(this));
  console.log('from events', this);
}
```

* Now anything we include in the **bind** parentheses `()` will be used as the `this` keyword when the `toggleTheMenu()` method runs

```js
import $ from 'jquery';

class MobileMenu {
  constructor() {
   this.menuIcon = $('.site-header__menu-icon');
   this.menuContent = $('.site-header__menu-content');
   this.events();
  }

  events() {
    this.menuIcon.click(this.toggleTheMenu.bind(this));
  }

  toggleTheMenu() {
    this.menuContent.toggleClass('site-header__menu-content--is-visible');
  }
}

export default MobileMenu;
```

## Test in browser using Chrome Dev Tool
* Have large and small browser window open
* Click on white box in small window and look at inspector in large chrome window
* You will see every time you click the white square `site-header__menu-content--is-visible` toggles on and off the `div` with `site-header__menu-content`

![is-visible appears](https://i.imgur.com/EMLWjbw.png)

* **note** You need to search for this chunk of text under `Elements` tab of Chrome instpector

`<div class="site-header__menu-content">...</div>`

* And then click the white square icon to see the toggled class effect

### Adjust CSS to make this work
`_site-header.css`

```
// more code
  &__menu-content {
    display: none;

    @mixin atMedium {
      display: block;
    }

    &--is-visible {
      display: block;
    }
  }
}
```

## Toggle Menu behavior now works
* Click icon and menu appears
* Click again and menu disappears

## Next Up - Styling Mobile Menu
