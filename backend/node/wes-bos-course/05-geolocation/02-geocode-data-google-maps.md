# Geocoding Data with Google Maps
* We need to create an auto dropdown to pull cities
* And prepopulate them with lng/lat
* This is called **Geolocation**

`/public/javascripts/delicious-apps.js`

* This is the **entry point** for all of our JavaScript
* How do I know this?
* Open `webpack.config.js`

`webpack.config.js`

```
// more code
const config = {
  entry: {
    // we only have 1 entry, but I've set it up for multiple in the future
    App: './public/javascripts/delicious-app.js'
  },
// more code
```

## Client side JavaScript files
* We will write all of our **Client side** modules inside `public/javascripts/modules`

## bling.js
### What is `bling.js`?
_"Because you want the $ of jQuery without the jQuery."_

* Paul Irish created it
* Wes Bos modified it slightly

`bling.js`

```
// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach((elem) => {
    elem.on(name, fn);
  });
};

export { $, $$ };
```

* `bling.js` makes your JavaScript easier to write using some jQuery conventions

[link to bling.js](https://gist.github.com/paulirish/12fb951a8b893a454b32)

## Import autocomplete.js

`delicious-app.js`

```
import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete'; // add this line
```

`modules/autocomplete.js`

```
function autocomplete(input, latInput, lngInput) {

}

export default autocomplete;
```

* We will use ES6
* We don't have ES6 in `node.js` yet but we do have ES6 in `webpack` and it can compile it out for us

## Beware of the order discrepancy between Google and MongoDB
**notice order of arguments**
- `input`, `latInput`, `lngInput`
    + Google maps does it the write way (_order-wise_)
    + `MongoDB` does it the wrong way (_order-wise_)
    + That is why the order is different and confusing as hell

## bling.js and our form id's working together
`public/javascripts/delicious-app.js`

`autocomplete($('#address'), $('#lat'), $('#lng'));`

* We get these from the `id`s we have inside `_storeForm.pug`
* **remember** We are not using `jQuery` here
    - This is just `bling.js` saving us from typing out `document.querySelector('#address')`

## Test that it is working
`autocomplete.js`

```
function autocomplete(input, latInput, lngInput) {
  console.log(input, latInput, lngInput);
}

export default autocomplete;
```

1. View `stores` in browser
2. Click on edit of the store with address
3. You will see this in console:

![autocomplete.js](https://i.imgur.com/FpCOenq.png)

## Woops! I made a mistake
* We are missing `address` in the output and that is because I misspelled it in `_storeForm.pug`

`input(type="text" id="addres" name="location[address]" value=(store.location && store.location.address))`

* I update it to this (_id="address"_)

``input(type="text" id="address" name="location[address]" value=(store.location && store.location.address))``

* And refresh the page and now we get all three:

![working autocomplete.js](https://i.imgur.com/1kyITEm.png)

### Google Maps API to make our dropdown autopopulate
If we **view source** and search for `google` we'll find:

![google api linked](https://i.imgur.com/OaUiuKB.png)

### Google API limits
And if you view the page in `/add` and enter `Philadelphia` in the Address you should get a dropdown but since this key is not ours it could have reached it's limit so you'll see this:

![exceeded api limit](https://i.imgur.com/QRBcar4.png)

### Get your own API key
To get it to work you need to sign up for your own API key and use that instead

[Link to get a key generated](https://developers.google.com/maps/documentation/javascript/get-api-key)

1. Click Get a Key
2. Paster that key inside your `variables.env` like this:

![variables.env MAP_KEY](https://i.imgur.com/pbHH8F8.png)

3. Stop the server `ctrl` + `c`
4. Run again `$ npm start`

Type `P` in the Address and you'll get a dropdown:

![dropdown working](https://i.imgur.com/3g5Q2iu.png)

* `.addListener()` - Google Maps way to add an event listener

```
// more code
dropdown.addListener('place_changed', () => {
  const place = dropdown.getPlace();
  console.log(place);
});
// more code
```

1. Refresh the page
2. Type in address: In `Philadelphia` and select `Philadelphia, PA, United States`
3. Press enter

You will see this:

![Philly info from google](https://i.imgur.com/h7CO9bS.png)

That is all the possible info you could want about philly from googlemaps

* Open it up and explore
* We are interested in `geometry.location.lat` and `geometry.location.lng`
* If you want to disable a rule in eslint specifically for param properties

### Get ride of eslint error you don't want to keep seeing
Add this to your eslint rules section: (_don't forget to use a comma if you need it_)

`"no-param-reassign": [2, { "props": false }]`

### Lat and Lng auto-populate
1. Refresh page
2. Put an Address in
3. Hit enter
4. You will see lat and lng populate

![lat lng populate](https://i.imgur.com/t4Dx8J1.png)

## Houston we have a problem
### Hitting enter in address field trips the flash error
* When someone hits submit on address form we get a flash error

### Turn off validation
If someone hits `enter` inside the address input?
* `keycode === 13` is **enter**

How do I know `13` is the number for the `enter` key?
* [Read this](https://css-tricks.com/snippets/javascript/javascript-keycodes/)
* Or Visit: [keycode.info](http://keycode.info/) and press **enter**

```
// if someone hits enter on the address field, don't submit the form
input.on('keydown', (evt) => {
  if (evt.keyCode === 13) evt.preventDefault();
});
```

### Bling to the rescue again!
We normally would type `input.addEventListener()` but with `bling.js` we can just type `input.on()`

## Final Code
`autocomplete.js`

```
function autocomplete(input, latInput, lngInput) {
  if (!input) return; // skip this function from running if there is no address input
  const dropdown = new google.maps.places.Autocomplete(input);

  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });
  // if someone hits enter on the address field, don't submit the form
  input.on('keydown', (evt) => {
    if (evt.keyCode === 13) evt.preventDefault();
  });
}

export default autocomplete;
```

