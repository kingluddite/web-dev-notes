# Callback function
* A function that gets passed as an argument to another function and is executed after some of that happens

`callbacks.js`

```js
const getUser = (id, callback) => {
 const user = {
   id,
   name: 'Kingluddite'
 };
 callback(user);
};

getUser(31, (userObject) => {
 console.log(userObject);
});
```

## Delay callback 3 seconds
```js
const getUser = (id, callback) => {
 const user = {
   id,
   name: 'Kingluddite'
 };

 setTimeout(() => {
   callback(user);
 }, 3000);
};

getUser(31, (userObject) => {
 console.log(userObject);
});
```

`$ node playground/callbacks.js`

* View in terminal
* Run command
* Output: After 3 seconds we see output

## Google Maps API
* [link to API](https://maps.google.com/maps/api/geocode/json)
* But you need to add parameters using a query string
* You can use spacing in the URL as it will add the correct HTML Entity encoding to fill in those spaces (but inside of node we'll have to take care of this ourselves)
* `https://maps.google.com/maps/api/geocode/json?address=1301%20lombard%20st%20philadelphia`
* `%20` is encoded version of space
* Add JSON viewer chrome extension to make your browser JSON pretty

## npm request
[link](https://www.npmjs.com/package/request)

* Simplest way to make `http` requests
* Inside project folder (outside of playground)

`$ npm init -y`

`$ yarn add request`

`app.js`

```js
const request = require('request');

request({
  url: 'https://maps.google.com/maps/api/geocode/json?address=1301%20lombard%20st%20philadelphia',
  json: true
}, (error, response, body) => {
  console.log(body);
});
```

* json will convert the string to a JSON object (saves us time and a step)
* We grab the address info and print to the screen

`$ node app.js`

### Output:

```json
{ results:
   [ { address_components: [Array],
       formatted_address: '1301 Lombard St, Philadelphia, PA 19147, USA',
       geometry: [Object],
       place_id: 'EiwxMzAxIExvbWJhcmQgU3QsIFBoaWxhZGVscGhpYSwgUEEgMTkxNDcsIFVTQQ',
       types: [Array] } ],
  status: 'OK' }
```

## Pretty Print Objects
* As it stands now all our objects are output like this **[Object]**
* This is not helpful

### JSON.stringify() to the rescue
* We'll need to add 3 arguments
* 3rd argumen is spacing (2 spaces)

```json
const request = require('request');

request({
  url: 'https://maps.google.com/maps/api/geocode/json?address=1301%20lombard%20st%20philadelphia',
  json: true
}, (error, response, body) => {
  console.log(JSON.stringify(body, undefined, 2));
});
```

* Now output looks like this:

```json
{
  "results": [
    {
      "address_components": [
        {
          "long_name": "1301",
          "short_name": "1301",
          "types": [
            "street_number"
          ]
        },
        {
          "long_name": "Lombard Street",
          "short_name": "Lombard St",
          "types": [
            "route"
          ]
        },
        {
          "long_name": "Center City",
          "short_name": "Center City",
          "types": [
            "neighborhood",
            "political"
          ]
        },
        {
          "long_name": "Philadelphia",
          "short_name": "Philadelphia",
          "types": [
            "locality",
            "political"
          ]
        },
        {
          "long_name": "Philadelphia County",
          "short_name": "Philadelphia County",
          "types": [
            "administrative_area_level_2",
            "political"
          ]
        },
        {
          "long_name": "Pennsylvania",
          "short_name": "PA",
          "types": [
            "administrative_area_level_1",
            "political"
          ]
        },
        {
          "long_name": "United States",
          "short_name": "US",
          "types": [
            "country",
            "political"
          ]
        },
        {
          "long_name": "19147",
          "short_name": "19147",
          "types": [
            "postal_code"
          ]
        },
        {
          "long_name": "1003",
          "short_name": "1003",
          "types": [
            "postal_code_suffix"
          ]
        }
      ],
      "formatted_address": "1301 Lombard St, Philadelphia, PA 19147, USA",
      "geometry": {
        "location": {
          "lat": 39.9444071,
          "lng": -75.1631718
        },
        "location_type": "RANGE_INTERPOLATED",
        "viewport": {
          "northeast": {
            "lat": 39.9457560802915,
            "lng": -75.16182281970849
          },
          "southwest": {
            "lat": 39.9430581197085,
            "lng": -75.1645207802915
          }
        }
      },
      "place_id": "EiwxMzAxIExvbWJhcmQgU3QsIFBoaWxhZGVscGhpYSwgUEEgMTkxNDcsIFVTQQ",
      "types": [
        "street_address"
      ]
    }
  ],
  "status": "OK"
}
```


