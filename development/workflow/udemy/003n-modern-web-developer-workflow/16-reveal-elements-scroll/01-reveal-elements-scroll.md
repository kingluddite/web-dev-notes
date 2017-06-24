# Reveal Elements on Scroll
* How to reveal an element when it has been scrolled to

## Git Stuff
`$ git status`

* Add all changes with:

`$ git all -A`

* Commit changes

`$ git commit -m 'Complete desktop and mobile header styles`

* Merge branch into master

`$ git checkout master`

`$ git merge header`

`$ git push origin master`

## New Branch
`$ git checkout -b reveal-on-scroll`

### New Module
`/app/assets/scripts/modules/RevealOnScroll.js`

```js
class = RevealOnScroll {

}

export default RevealOnScroll;
```

### Import it within our main JavaScript file
`App.js`

```js
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll'; // add this line

const mobileMenu = new MobileMenu();
const revealOnScroll = new RevealOnScroll(); // add this line
```

`RevealOnScroll.js`

```js
import $ from 'jquery';

class RevealOnScroll {
  constructor() {
    this.itemsToReveal = $('.feature-item');
    // console.log(this.itemsToReveal);
    this.hideInitially();
  }

  hideInitially() {
    this.itemsToReveal.addClass('reveal-item');
  }
}

export default RevealOnScroll;
```

`/app/assets/styles/modules/_reveal-item.css`

```css
.reveal-item {
 opacity: 0;
 transition: opacity 1.5s ease-out;

 &--is-visible {
  opacity: 1;
 }
}
```

## Import the CSS file into our main CSS file
`styles.css`

```css
// more code
@import "modules/_reveal-item";
```

### WayPoints
We could right the reveal to scroll code ourselves but instead we will leaverage WayPoints

#### Install waypoints
`$ npm i waypoints -S`

* Waypoints doesn't have a main file
* We have to point to the file we want to use
* `this.itemsToReveal` is storing a jQuery collection of the four feature items
    - `.each` is a jQuery function that enables us to loop over a collection

![holding a collection](https://i.imgur.com/mTaXFvq.png)

`RevealOnScroll.js`

```js
import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
  constructor() {
    this.itemsToReveal = $('.feature-item');
    // console.log(this.itemsToReveal);
    this.hideInitially();
    this.createWaypoints();
  }

  hideInitially() {
    this.itemsToReveal.addClass('reveal-item');
  }

  createWaypoints() {
    this.itemsToReveal.each(function() {
      console.log('waypoints!');
    });
  }
}

export default RevealOnScroll;
```

## Test it out in the browser
* You will see `4 waypoints` in console
* `element` is the DOM element we want to watch for as we scroll down the page
* `handler` is what we want to happen when that element is scrolled to
* Inside jQuery's `each()` method `this` points to the current DOM element
* But we can't use `this` because `new Waypoint()` is creating a new object and then the `this` keyword will point to the current Waypoint object
* We see the feature boxes fade it but is too late
    - Waypoints by default doesn't trigger it's handler until the very top of the element is waiting for crosses the top of the viewport
    - We add an `offset` key and `'100%'` would the items crossing the bottom of the viewport, we set it to 85% for a better effect

`RevealOnScroll.js`

```js
import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
  constructor() {
    this.itemsToReveal = $('.feature-item');
    // console.log(this.itemsToReveal);
    this.hideInitially();
    this.createWaypoints();
  }

  hideInitially() {
    this.itemsToReveal.addClass('reveal-item');
  }

  createWaypoints() {
    this.itemsToReveal.each(function() {
      const currentItem = this;
      new Waypoint({
        element: currentItem,
        handler: function() {
          $(currentItem).addClass('reveal-item--is-visible');
        },
        offset: '85%'
      });
    });
  }
}

export default RevealOnScroll;
```

## Next - We will refactor our RevealOnScroll.js
So that it is modular and flexible

