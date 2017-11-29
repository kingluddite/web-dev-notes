# Abstracting Callbacks
* Create new directory and new file
* `const geocode = require(./geocode/geocode);`
* geocode.geocodeAddress(argv.address);
* remove `request` require and add to page that uses it
* Pass `geocodeAddress(address)` 

`geocode/geocode.js`

```js
const request = require('request');

const geocodeAddress = (address) => {

  const encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.google.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log('Could not connect to server');
    } else if (body.status === 'ZERO_RESULTS') {
      console.log('No address found');
    } else {
      console.log(`Address ${body.results[0].formatted_address}.`);
      console.log(`Lat ${body.results[0].geometry.location.lat}.`);
      console.log(`Lng ${body.results[0].geometry.location.lat}.`);
    }
  });
}

module.exports.geocodeAddress = geocodeAddress;
```

`app.js`

```js
const yargs = require('yargs');
const geocode = require('./geocode/geocode');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address);
```

### Add a callback function

`app.js`

```js
const yargs = require('yargs');
const geocode = require('./geocode/geocode');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
  }
});
```

`geocode/geocode.js`

```js
const request = require('request');

const geocodeAddress = (address, callback) => {

  const encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.google.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Could not connect to Google servers');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('No address found');
    } else {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
```

## Test it out and show how we have an object now!
`$ node app.js -a '000000'`

* No address found

`$  node app.js -a '1566 Leon Drive, Hatfield, PA'`

```
{
  "address": "1566 Leon Dr, Hatfield, PA 19440, USA",
  "latitude": 40.262509,
  "longitude": -75.302458
}
```

