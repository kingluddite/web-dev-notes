# Plotting Stores on a Custom Google Map - Part 1
* Click on `MAP` link in nav
* We get a 404

## Make our route
`storeController.js`

```
router.get('/map', storeController.mapPage);

/*

  API

*/
```

## Render our map page with a title
`storeController.js`

```
exports.mapPage = (req, res) => {
  res.render('map', { title: 'Map' });
};
```

## Create our template
`map.pug`

```
extends layout

block content
  .inner
    h2= title
```

### View `/map` in browser
* You should see your map page showing up
* `name=geolocate` is very important becuase that is how we will select our input

`map.pug`

```
extends layout

block content
  .inner
    h2= title
    .map
      .autocomplete
        input.autocomplete__input(type="text" placeholder="Search for Anything" name="geolocate")
      #map
        p Loading Map...
```

* View in browser

![map page](https://i.imgur.com/Awn3EL5.png)

### Create map.js 
`public/javascripts/modules/map.js`

```
import axios form 'axios';

function loadPlaces(map, lat = 43.2, lng = -79.8) {
  
}
```

* We set defaults because that is where our Pointers are in our default data

### More to learn!
Learn More About Geolocation - Wes Bos JavaScript30 `Geolocation based Speedometer and Compass`


* Video will show how you could set the default to be where the current user is location using

`navigator.geolocation.getCurrentPosition`

### Back to map.js

```
import axios from 'axios';

function loadPlaces(map, lat = 43.2, lng = -79.8) {

}

function makeMap(mapDiv) {

}

export default makeMap;
```

### Import and run our map.js code
`delicious-app.js`

```
import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead';
import makeMap from './modules/map'; // add this line

autocomplete($('#address'), $('#lat'), $('#lng'));

typeAhead($('.search'));

makeMap($('#map')); // add this line
```

### Test if we wired it up correctly
`map.js`

```
// more code

function makeMap(mapDiv) {
  console.log(mapDiv);
}

// more code
```

## Test in browser
You should see we captured our div with an id of `map`

![map div](https://i.imgur.com/NxMLUKw.png)

### Houston we have a problem
On other pages we get a `mapDiv` of **null** so we should always check for it's existence first

### We loaded in the Google Maps JavaScript Library
`layout.pug`

```
// more code

block scripts
      script(src=`https://maps.googleapis.com/maps/api/js?key=${process.env.MAP_KEY}&libraries=places`)
// more code
```

