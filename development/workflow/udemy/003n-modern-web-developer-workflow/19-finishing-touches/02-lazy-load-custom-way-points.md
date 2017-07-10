# Lazy Loading custom Waypoints
* How to deal with lazyloading causing our custom Waypoints to fire at the wrong times

## Why is this happening?
* When the page first loads Waypoints immediately takes notes of the vertical positioning of the elements that it is watching
* The problem is when Waypoints makes that measurement (_say Testimonials is 6000px from the top_), lazysizes hasn't loaded our images yet and that `6000px` measurement is outdated the moment those images appear

### Let's fix it
Tell Waypoints to refresh its measurements everytime a new image is lazyloaded

`StickyHeader.js`

```js
// more code
class StickyHeader {
  constructor() {
    this.lazyImages = $('.lazyload');
    // more code
    this.refreshWaypoints();
  }

  refreshWaypoints() {
      this.lazyImages.on('load', function() {
        Waypoint.refreshAll();
      });
    }
// more code
}
// more code
```

* We grab all the elements with a `lazyload` class
* jQuery has a `load()` method which says **"whenever an element in this collection gets loaded in we want to do something"**
    - And we use Waypoint's `refreshAll()` method
    - We want this to run as soon as the web page loads so we call this method inside the constructor
* We don't need to repeat this code again in `RevealOnScroll.js` because of how the Webpoint library is made
    - The Waypoint library doesn't import data using ES6 modules
    - The Waypoint library just attaches an object named Waypoint to the browsers Global Window scope
        + So when we call it above `Waypoint.refreshAll()` we are calling it through the Window scope we are refreshing all Waypoint objects that exist in the browser's memory
        + That is why we don't have to repeat this code again in the `RevealOnScroll.js` file

