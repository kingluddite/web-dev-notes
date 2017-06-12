# Plotting Stores on a Custom Google Map - Part 2
### How do we get the Google Map on our page?
We need to add some map Options

`map.js`

```
import axios from 'axios';

const mapOptions = {
  center: { lat: 43.2, lng: -79.8 },
  zoom: 8
};
// more code
```

### Instatiate our map
`map.js`

```
// more code
function makeMap(mapDiv) {
  if (!mapDiv) return;
  // make our map
  const map = new google.maps.Map(mapDiv, mapOptions);
}

export default makeMap;
```

### View in browser
You should see map on page

![map on page](https://i.imgur.com/dK3h228.png)

### Grab our `geolocate` name
* We need to import `bling.js` to save us some typing

`map.js`

`import { $ } from './bling';`

### Code for grabbing input
`map.js`

```
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

## Test in browser
You should see we captured the input

![captured input](https://i.imgur.com/IOnjbff.png)

### Autocomplete the input (we did this before)
`map.js`

```
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
* Type City in browser and you'll get dropdown from Google Maps API

## Load Places
Now that we have our map, we need to load places nearby

### We call our `loadPlaces()` function
`map.js`

```
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

```
// more code
const mapOptions = {
  center: { lat: 43.2, lng: -79.8 },
  zoom: 8
};

// update this function
function loadPlaces(map, lat = 43.2, lng = -79.8) {
  axios.get(`/api/v1/stores/near?lat=${lat}&lng=${lng}`)
    .then((res) => {
      const places = res.data;
      console.log(places);
    })
    .catch(console.log(error));
}
// more code
```

* We pass this function our map and lat an lng
* We give default lat and lng values in case we need to fall back to them
* We grab our API Endpoint and pass it `lat` and `lng`
* We wait for the Promise and when the response returns we log out `places` which is holding `res.data`

## Test in browser
You will see we get an array of 10 that comes back from our API Endpoint with the default lat and lng (Hamilton)

`const [placeLng, placeLat]` - data that comes back from `MongoDB` is lng, lat

* Why `place.location.coordinates`?
  - The best way is to see it in action from our console.log()

![coordinates in console](https://i.imgur.com/lFCJ3hl.png)

## Test to see if we get our lng and lat
`map.js`

```
function loadPlaces(map, lat = 43.2, lng = -79.8) {
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
    .catch(console.log(error));
}
```

This will give us all the lng and lat

![all lng and lat](https://i.imgur.com/L64KU7f.png)

