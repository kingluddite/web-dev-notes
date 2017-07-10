# Refactor Scroll
* We will make our RevealOnScroll **recyclable**
* We want to add same reveal on scroll to the 3 testimonials

## Customize Waypoints
* Create different offsets for different elements

`ReavealOnScroll.js`

```
// more code
class RevealOnScroll {
  constructor() {
    this.itemsToReveal = $('.feature-item, .testimonial');
// more code
```

* Now when we scroll down testimonials appears just like feature items
* We want to be able to alter this part and the offset
* Classes are great because they are reusable, recyclable blueprints that we can use to create multiple objects

`App.js`

```js
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import $ from 'jquery';

const mobileMenu = new MobileMenu();
// const revealOnScroll = new RevealOnScroll();
new RevealOnScroll($('.feature-item'), '85%');
new RevealOnScroll($('.testimonial'), '60%');
```

`RevealOnScroll.js`

```js
import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
  constructor(els, offset) {
    this.itemsToReveal = els;
    this.hideInitially();
    this.createWaypoints();
    this.offsetPercentage = offset;
  }

  hideInitially() {
    this.itemsToReveal.addClass('reveal-item');
  }

  createWaypoints() {
    var that = this;
    this.itemsToReveal.each(function() {
      const currentItem = this;
      new Waypoint({
        element: currentItem,
        handler: function() {
          $(currentItem).addClass('reveal-item--is-visible');
        },
        offset: that.offsetPercentage
      });
    });
  }
}

export default RevealOnScroll;
```

* We use `that` to bind `this`

## Test
That won't work because in our constructor, the order of when functions run is important

* We reorder the inside of our constructor function like this:

`RevealOnScroll.js`

```
constructor(els, offset) {
  this.itemsToReveal = els;
  this.offsetPercentage = offset;
  this.hideInitially();
  this.createWaypoints();
}
```

* Test now and it should work for both Feature items and Testimonials each with different offsets

## Add zoom out effect
`_reveal-item.css`

```css
.reveal-item {
 opacity: 0;
 transform: scale(1.15);
 transition: all 1.5s ease-out;

 &--is-visible {
  opacity: 1;
  transform: scale(1);
 }
}
```

## Takeaway
We can reveal on scroll any element on our page by reusing/recycling our RevealOnScroll blueprint/class

## Next - Make header `sticky` and highlight current portions of page


