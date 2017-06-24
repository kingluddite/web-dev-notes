# Sticky Header Part 1
## Git Stuff
`$ git status`

* Add all changes with:

`$ git all -A`

* Commit changes

`$ git commit -m 'Complete the reveal on scroll behavior`

* Merge branch into master

`$ git checkout master`

`$ git merge reveal-on-scroll`

`$ git push origin master`

## Create new branch
`$ git checkout -b sticky-header`

## Sticky header
As we scroll down we want our header to stick to the top of the page

`_site-header.css`

```css
@mixin atMedium {
  position: fixed; /* add this line */
  background-color: rgba($mainBlue, 0.3);
}
```

* Now scroll and header sticks on top of viewport

## UX improvement
* We will now make it darker as we scroll so that the nav items are easier to see
* We will need JavaScript to modify this behavior

`/app/assets/scripts/modules/StickyHeader.js`

```js
class StickyHeader {

}

export default StickyHeader;
```

## Import it to main JavaScript file
`App.js`

```js
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader'; // add this line
import $ from 'jquery';

const mobileMenu = new MobileMenu();
new RevealOnScroll($('.feature-item'), '85%');
new RevealOnScroll($('.testimonial'), '60%');
const stickyHeader = new StickyHeader(); // add this line
```

`StickyHeader.js`

```js
import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
  constructor() {
    this.siteHeader = $('.site-header');
    this.headerTriggerElement = $('.large-hero__title');
    this.createHeaderWaypoint();
  }

  createHeaderWaypoint() {
    const that = this;
    new Waypoint({
      element: that.headerTriggerElement[0],
      handler: function() {
        that.siteHeader.addClass('site-header--dark');
      }
    });
  }
}

export default StickyHeader;
```

* `this` binding issue
    - `const that = this;` - We use this because directly inside the `createHeaderWaypoint()` method `this` is pointing to the `StickyHeader` class but inside of the `new Waypoint({})` object, `this` points to the Waypoint object
        + We use `that = this` to bind `that` to `this`
* Waypoint has a `direction` argument that will know when the user is scrolling `down`
    - We use a condition `if` statement to add the dark background class if scrolling down and remove the class if scrolling up
* Waypoint wants a JavaScript native DOM element as the value for the `element` key but currently we are using a jQuery object `this.headerTriggerElement`
    - [How do I pull a native DOM element from a jQuery object?](https://learn.jquery.com/using-jquery-core/faq/how-do-i-pull-a-native-dom-element-from-a-jquery-object/)
    - `that.headerTriggerElement[0]`
        + This works because the first item in a jquery array like object is always a pointer to the native DOM element
* We want the Waypoint object to be created as soon as the page loads so we place it in the constructor and call it `this.createHeaderWaypoint();`

## Create the dark background with CSS
`_site-header.css`

```css
&--is-expanded {
  background-color: rgba($mainBlue, 0.55);
}

@mixin atMedium {
  position: fixed;
  background-color: rgba($mainBlue, 0.3);

  &--dark { /* add this style */
    background-color: rgba(23, 51, 72, 1.0);
  }
}
```

## Shrink logo
When we make header background dark we also will shrink the logo

`_site-header.css`

```css
&__logo {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) scale(.8);
    transition: transform .3s ease-out;
    transform-origin: 50% 0%;
    background-color: $mainBlue;
    padding: 25px 36px;

    @mixin atMedium {
      left: auto;
      transform: translateX(0) scale(1);

      .site-header--dark & { /* add this rule */
        transform: scale(.57);
      }
    }
  }
```

* We target the `site-header` class when it is using the `--dark` modifier and then `&` which will give us the selector for the `site-header__logo` element
    - That rule will look like this after PostCSS

```css
.site-header--dark .site-header__logo {
        -webkit-transform: scale(.57);
                transform: scale(.57);
}
```

* When the dark class is added, we shrink the logo to almost half its size

### Animate the logo size change
`_site-header.css`

```
&__logo {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) scale(.8);
  transition: transform .3s ease-out; /* add this line
  transform-origin: 50% 0%;
  background-color: $mainBlue;
  padding: 25px 36px;
```

* Now scroll down and you'll see the logo animate smaller
* Scroll up and it animates larger
