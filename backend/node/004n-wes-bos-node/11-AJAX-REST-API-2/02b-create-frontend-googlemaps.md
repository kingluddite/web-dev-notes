# Plotting Stores on a Custom Google Map - Part 2
### How do we get the Google Map on our page?
* We need to add some map options

`map.js`

```js
import axios from 'axios';

const mapOptions = {
  center: { lat: 33.8, lng: -118.3 },
  zoom: 8
};
// more code
```

* Let's use the default `lat` and `lng` for **Redondo Beach, CA**

### Instantiate our map
`map.js`

```js
// more code
function makeMap(mapDiv) {
  if (!mapDiv) return;
  // make our map
  const map = new google.maps.Map(mapDiv, mapOptions);
}

export default makeMap;
```

* Our mapOptions will hold the `lat` and `lng` and the `zoom`
* We also pass the map we are creating our `div` with an id of `map`
* This will be the container for our google map

### View in browser
* You won't see a map yet because you need to add the Sass

`_map.scss`

```
.map {
  padding: 20px;
  background: white;
  box-shadow: $shad;
}
#map {
  height: 500px;
}

.popup {
  width: 300px;
  img {
    width: 100%;
  }
}
```

#### Import map sass
style.scss

```
// more code
@import 'partials/map';
```

### View in browser
You should now see map on the page

![map on page](https://i.imgur.com/VkhIuRn.png)

### Grab our `geolocate` name
* We need to import `bling.js` to save us some typing

`map.js`

`import { $ } from './bling';`

### Code for grabbing input
`map.js`

```js
// more code

function makeMap(mapDiv) {
  if (!mapDiv) return;
  // make our map
  const map = new google.maps.Map(mapDiv, mapOptions);
  const input = $('[name="geolocate"]');
  console.log(input);
}

export default makeMap;
```

* We now have access to the input field

## Test in browser
You should see we captured the `input`

![captured input](https://i.imgur.com/IOnjbff.png)

### Autocomplete the input (we did this before)
`map.js`

```js
// more code

function makeMap(mapDiv) {
  if (!mapDiv) return;
  // make our map
  const map = new google.maps.Map(mapDiv, mapOptions);
  const input = $('[name="geolocate"]');
  const autocomplete = new google.maps.places.Autocomplete(input);
}

export default makeMap;
```

* Test in browser
* Type any city in the browser and you'll get dropdown from Google Maps API
* Awesome!

## Load Places
Now that we have our map, we need to load places nearby

### We call our `loadPlaces()` function
`map.js`

```js
// more code

function makeMap(mapDiv) {
  if (!mapDiv) return;
  // make our map
  const map = new google.maps.Map(mapDiv, mapOptions);
  loadPlaces(map); // add this line

  const input = $('[name="geolocate"]');
  const autocomplete = new google.maps.places.Autocomplete(input);
}

export default makeMap;
```

### We grab our Endpoint
`map.js`

```js
// more code
const mapOptions = {
  center: { lat: 33.8, lng: -118.3 },
  zoom: 8
};

// update this function
function loadPlaces(map, lat = 33.8, lng = -118.3) {
  axios.get(`/api/v1/stores/near?lat=${lat}&lng=${lng}`)
    .then((res) => {
      const places = res.data;
      console.log(places);
    })
    .catch((error) => {
      console.log(error);
    });
}
// more code
```

* We pass this function our map and `lat` an `lng`
* We give default `lat` and `lng` values in case we need to fall back to them
* We grab our API Endpoint and pass it `lat` and `lng`
  - This will hold what the user typed into the map input and then it will prepopopulate with a location from google maps
  - This means the lat and lng will prepopulate and fill in this string
  - `/api/v1/stores/near?lat=${lat}&lng=${lng}`
* We wait for the Promise and when the response returns we temporarily log out `places` which is holding `res.data`
  - We do this to see what data we are dealing with

## Test in browser
You will see we get an array of 10 that comes back from our API Endpoint with the default `lat` and `lng` (Redondo Beach)

`const [placeLng, placeLat]` - data that comes back from `MongoDB` is `lng`, `lat`

* Why `place.location.coordinates`?
  - See it in action from our console.log()

![coordinates in console](https://i.imgur.com/lFCJ3hl.png)

## Test to see if we get our lng and lat
`map.js`

```js
function loadPlaces(map, lat = 33.8, lng = -118.3) {
  axios.get(`/api/v1/stores/near?lat=${lat}&lng=${lng}`)
    .then((res) => {
      const places = res.data;
      if (!places.length) {
        alert('no places found!');
        return;
      }

      const markers = places.map(place => {
        const [placeLng, placeLat] = place.location.coordinates;
        console.log(placeLng, placeLat);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
```

* This will give us all the `lng` and `lat` values

![all lng and lat](https://i.imgur.com/L64KU7f.png)

* Now if we grouped a bunch of stores that were within `10 km` of each other we would have an array with all of those stores
* But we only have 1 store and therefore we only have 1 store in the array

![one store in array](https://i.imgur.com/qjoT0kq.png)
