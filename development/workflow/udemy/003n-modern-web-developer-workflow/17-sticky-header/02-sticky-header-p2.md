# Sticky Header Part 2
Highlight navigation links based on where you scrolled

## Create relationships
In `index.html` we need to create relationships between each section of the page and its matching header link

### Create an `id` for the our links
```html
<nav class="primary-nav primary-nav--pull-right">
  <ul>
    <li><a href="#our-beginning" id="out-beginning-link">Our Beginning</a></li>
    <li><a href="#features" id="features-link">Features</a></li>
    <li><a href="#technologies" id="technologies-link">Technologies</a></li>
    <li><a href="#home" id="home-link">Home</a></li>
    <li><a href="#about" id="about-link">About</a></li>
    <li><a href="#photos" id="photos-link">Photos</a></li>
    <li><a href="#live" id="live-link">Live</a></li>
  </ul>
</nav>
```

### HTML custom attributes
* [Read More on HTML5 custom data attributes](http://html5doctor.com/html5-custom-data-attributes/)
* Add this to our `index.html`

```html
// more code
<div id="our-beginning" class="page-section" data-matching-link="#our-beginning-link">
// more code
<div id="features" class="page-section page-section--blue" data-matching-link="#features-link">
// more code
<div id="testimonials" class="page-section page-section--no-b-padding-until-large page-section--testimonials" data-matching-link="#testimonials-link">
// more code
```

* Now we'll use JavaScript and Waypoints so that when this section of the page gets scrolled to we'll use `#our-beginning-link` as a custom attribute as a jQuery selector and we give that element a modifier css class that makes it yellow
* We'll add this code inside our `StickyHeader` JavaScript class

`/app/assets/scripts/modules/HighlightSection.js`

```js
import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class HighlightSection {
  constructor() {
    this.pageSections = $('.page-section');
    this.createPageSectionWaypoints();
  }

  createPageSectionWaypoints() {
    this.pageSections.each(function() {
      const currentPageSection = this;
      new Waypoint({
        element: currentPageSection,
        handler: function() {
          const matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
          $(matchingHeaderLink).addClass('is-current-link');
        }
      });
    })
  }
}

export default HighlightSection;
```

## Import and create blueprint/class
`App.js`

```js
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import HighlightSection from './modules/HighlightSection'; // add this line
import $ from 'jquery';

const mobileMenu = new MobileMenu();
new RevealOnScroll($('.feature-item'), '85%');
new RevealOnScroll($('.testimonial'), '60%');
const stickyHeader = new StickyHeader();
const highlightSection = new HighlightSection(); // add this line
```

## Add yellow color for links
`_primary-nav.css`

```css
a {
  color: #fff;
  font-weight: 300;
  text-decoration: none;
  display: block;
  padding: 5px 8px; /* make sure this is correct */
  font-size: .8rem; /* check this too */
  background-color: rgba($mainBlue, .5);

  @mixin atMedium {
    font-size: 1rem;
    padding: 12px 0; /* make sure this is correct */
    background-color: transparent; /* make sure this is correct */

    &.is-current-link { /* add this rule */
      color: #fabb69;
    }
  }
}
```

## Removing class
* We need to remove the `is-current-link` class for the yellow links
* Right before this line:

`HighlightSection.js`

```js
$(matchingHeaderLink).addClass('is-current-link');
```

* We want to remove `is-current-link` from any/all nav links
* We could use jQuery to select the `is-current-link` like this:
* It is a good idea to deal with all DOM selection in the constructor

`HighlightSection.js`

```js
$ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class HighlightSection {
  constructor() {
    this.pageSections = $('.page-section');
    this.headerLinks = $('.primary-nav a');
    this.createPageSectionWaypoints();
  }

  createPageSectionWaypoints() {
    const that = this;
    this.pageSections.each(function() {
      const currentPageSection = this;
      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if (direction === 'down') {
            const matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
            that.headerLinks.removeClass('is-current-link');
            $(matchingHeaderLink).addClass('is-current-link');
          }
        },
        offset: '18%'
      });

      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if (direction === 'up') {
            const matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
            that.headerLinks.removeClass('is-current-link');
            $(matchingHeaderLink).addClass('is-current-link');
          }
        },
        offset: '-40%'
      });
    })
  }
}

export default HighlightSection;
```

* Now when you scroll up or down, you see the section highlighted in the main nav
* If it is not working check
  - The spelling on your HTML5 custom attributes `data-matching-link`
  - Check your CSS for `.primary-nav`
  - Check your html for your nabar (_The id attribute value is important_)

```html
<ul>
  <li><a href="#our-beginning" id="our-beginning-link">Our Beginning</a></li>
  <li><a href="#features" id="features-link">Features</a></li>
  <li><a href="#testimonials" id="testimonials-link">Testimonials</a></li>
</ul>
```


## Implementing smooth scrolling
### Install jquery-smooth-scroll
`$ npm i jquery-smooth-scroll -S`

`/app/assets/scripts/modules/SmoothScrolling.js`

```js
import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class SmoothScrolling {
  constructor() {
    this.headerLinks = $('.primary-nav a');
    this.addSmoothScrolling();
  }

  addSmoothScrolling() {
    this.headerLinks.smoothScroll();
  }
}

export default SmoothScrolling;
```

`App.js`

```js
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import HighlightSection from './modules/HighlightSection';
import SmoothScrolling from './modules/SmoothScrolling'; // add this line
import $ from 'jquery';

const mobileMenu = new MobileMenu();
new RevealOnScroll($('.feature-item'), '85%');
new RevealOnScroll($('.testimonial'), '60%');
const stickyHeader = new StickyHeader();
const highlightSection = new HighlightSection();
const smoothScrolling = new SmoothScrolling(); // add this line
```

### Test it out
* Click on the links and watch the page magically scroll

## Next - Build a Modal
