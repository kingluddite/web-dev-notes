# Plotting Stores on a Custom Google Map - Part 3
### Placing markers on the map
`map.js`

```js
function loadPlaces(map, lat = 47.6, lng = -122.3) {
  axios.get(`/api/v1/stores/near?lat=${lat}&lng=${lng}`)
    .then((res) => {
      const places = res.data;
      if (!places.length) {
        alert('no places found!');
        return;
      }

      const markers = places.map(place => {
        const [placeLng, placeLat] = place.location.coordinates;
        const position = { lat: placeLat, lng: placeLng };
        const marker = new google.maps.Marker({ map, position });
        // when someone clicks marker we need someway to reference the data for that marker
        marker.place = place;
        return marker;
      });
      console.log(markers);
    })
    .catch(function(error) {
      console.log(error);
    });
}
```

* If you have a bunch of places near each other you can show the all at one time on a Google map
* Here is an example of what that would look like:

![markers on map](https://i.imgur.com/lqStUSH.png)

* And inside our markers object we have all the place data for each store

![place data for each store](https://i.imgur.com/yWl6uRp.png)

* Remove `console.log(markers);`

### Houston we have a problem
* Changing the zoom level is problematic
* If we arbitrarily change the zoom number it is either too large or too small
* And it doesn't center it

#### Fix - Bounds
`map.js`

```js
function loadPlaces(map, lat = 43.2, lng = -79.8) {
  axios.get(`/api/v1/stores/near?lat=${lat}&lng=${lng}`)
    .then((res) => {
      const places = res.data;
      if (!places.length) {
        alert('no places found!');
        return;
      }

      // create a bounds
      const bounds = new google.maps.LatLngBounds();

      const markers = places.map(place => {
        const [placeLng, placeLat] = place.location.coordinates;
        const position = { lat: placeLat, lng: placeLng };
        bounds.extend(position);
        const marker = new google.maps.Marker({ map, position });
        // when someone clicks marker we need someway to reference the data for that marker
        marker.place = place;
        return marker;
      });

      // then zoom the map to fit all the markers perfectly
      map.setCenter(bounds.getCenter());
      map.fitBounds(bounds);
    })
    .catch(function(error) {
      console.log(error);
    });
}
```

## Bounds are useful
* We set bound here

```js
// create a bounds
const bounds = new google.maps.LatLngBounds();
```

* Then with each marker we extend our bounds to fit that marker

`bounds.extend(position);`

* Then we set a bounding box to fit all our markers

`map.setCenter(bounds.getCenter());`

* Then we perfectly center our markers in the map

`map.fitBounds(bounds);`

### Houston we have a problem!
* When you click the marker, nothing happens

### Info Windows
* When you have a pop up in google maps they call it a **Info Window**
* Google Maps is all about a gazillion different pieces to the map
  - Like
    + autocomplete
    + markers
    + map
    + info window
* We will loop over each marker and attach an `eventListener` so that when anyone clicks on a marker we can show the info window

## `.addListener()`
* `.addListener()` is google maps version of `addEventListener()`

`map.js`

```js
function loadPlaces(map, lat = 47.6, lng = -122.3) {
  axios.get(`/api/v1/stores/near?lat=${lat}&lng=${lng}`)
    .then((res) => {
      const places = res.data;
      if (!places.length) {
        alert('no places found!');
        return;
      }

      // create a bounds
      const bounds = new google.maps.LatLngBounds();

      const infoWindow = new google.maps.InfoWindow();

      const markers = places.map(place => {
        const [placeLng, placeLat] = place.location.coordinates;
        const position = { lat: placeLat, lng: placeLng };
        bounds.extend(position);
        const marker = new google.maps.Marker({ map, position });
        // when someone clicks marker we need someway to reference the data for that marker
        marker.place = place;
        return marker;
      });

      // when someone clicks on a marker, show the details of that place
      markers.forEach((marker) => marker.addListener('click', function () {
        console.log(this);
      }));

      // then zoom the map to fit all the markers perfectly
      map.setCenter(bounds.getCenter());
      map.fitBounds(bounds);
    })
    .catch(function(error) {
      console.log(error);
    });
}
```

* Click on markers and you see we have access to tons of information and to `place` which holds our store info

```js
// when someone clicks on a marker, show the details of that place
markers.forEach((marker) => marker.addListener('click', function () {
  console.log(this.place);
}));
```

![place info](https://i.imgur.com/tVnSPVg.png)

## Create HTML for our Info Window
`map.js`

```js
// more code

// when someone clicks on a marker, show the details of that place
markers.forEach((marker) => marker.addListener('click', function () {
  infoWindow.setContent(this.place.name);
  infoWindow.open(map, this);
}));

// then zoom the map to fit all the markers perfectly
map.setCenter(bounds.getCenter());
map.fitBounds(bounds);

// more code
```

* Click on marker and you get the store name

![get store name](https://i.imgur.com/2XtnfMM.png)

* Cool thing about HTML fragment we are creating is that we can use our application CSS to style our popup window anyway we want because it is not an `iframe>` and we can use our very own CSS

`map.js`

```js
const markers = places.map(place => {
        const [placeLng, placeLat] = place.location.coordinates;
        const position = { lat: placeLat, lng: placeLng };
        bounds.extend(position);
        const marker = new google.maps.Marker({ map, position });
        // when someone clicks marker we need someway to reference the data for that marker
        marker.place = place;
        return marker;
      });

      // when someone clicks on a marker, show the details of that place
      markers.forEach((marker) => marker.addListener('click', function () {
        const html = `
          <div class="popup">
            <a href="/store/${this.place.slug}">
              <img src="/uploads/${this.place.photo || 'store.png'}" alt="${this.place.name}" />
              <p>${this.place.name} - ${this.place.location.address}</p>
            </a>
          </div>
        `;
        infoWindow.setContent(html);
        infoWindow.open(map, this);
      }));
```

![cool place popup](https://i.imgur.com/QKJZMDN.png)

### Listen for when people move around map and find another address

`map.js`

```js
function makeMap(mapDiv) {
  if (!mapDiv) return;
  // make our map
  const map = new google.maps.Map(mapDiv, mapOptions);
  loadPlaces(map);

  const input = $('[name="geolocate"]');
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    console.log(place);
  });
}
```

![new address listening](https://i.imgur.com/uV9y6dT.png)

Update the function with:

```js
function makeMap(mapDiv) {
  if (!mapDiv) return;
  // make our map
  const map = new google.maps.Map(mapDiv, mapOptions);
  loadPlaces(map);

  const input = $('[name="geolocate"]');
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    loadPlaces(map, place.geometry.location.lat(), place.geometry.location.lng());
  });
}
```

Now move away from map and search for Hamilton and it will take you back to where we were with our centered markers

### How can you tell it is working
1. Chrome network tab
2. Click XHR (Ajax)
3. Then manually make request for Hamilton
4. You will see the request pop up in chrome inspector

![request in chrome](https://i.imgur.com/cC52RFs.png)

5. Click link and you can see the preview of the data

![preview of data](https://i.imgur.com/jENPOXE.png)

6. Search for somewhere far away not on map (Dublin Ireland) and you will get alert saying `no places found!`

![not found alert](https://i.imgur.com/WoQF2tC.png)

7. Log in
8. Add a place in Dublin Ireland with info for that place
9. Search for Dublin Ireland and you should see it
10. Click on it and you'll see your pop up

### Troubleshooting
If you put this in your code, you will see the data for the place and you can tell if you were missing something

`map.js`

```
// more code

// when someone clicks on a marker, show the details of that place
markers.forEach((marker) => marker.addListener('click', function () {
  console.log(this.place);
  
  const html = `

// more code
```

![place info](https://i.imgur.com/k2oSZEB.png)


