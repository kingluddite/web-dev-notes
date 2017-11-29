# Axios and Promise Weather App
* Save `app.js` as `app-promise.js` (make a duplicate)

## Axios Documentation
* [link to axios](https://www.npmjs.com/package/axios)

`app-promise.js`

```js
const yargs = require('yargs');
const axios = require('axios');

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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geocodeUrl).then((response) => {
  console.log(response.data); 
});
```

`$ node app-promise.js -a '1566 leon drive hatfield'`

```
{ results:
   [ { address_components: [Array],
       formatted_address: '1566 Leon Dr, Hatfield, PA 19440, USA',
       geometry: [Object],
       place_id: 'ChIJkUvumoahxokRmc2htd5vgX0',
       types: [Array] } ],
  status: 'OK' }
```

## Check for errors with axios
```js
const yargs = require('yargs');
const axios = require('axios');

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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geocodeUrl).then((response) => {
  console.log(response.data); 
}).catch((e) => {
  console.log(e);
});
```

* I removed the `.` from the URL to be this:

```js
const geocodeUrl = `https://mapsgoogleapis.com/maps/api/geocode/json?address=${encodedAddress}`
```

* Run it again

`$ node app-promise.js -a '1566 leon drive hatfield'`

* That give a huge error object that is not easy to read
* We need to print a plain text simple message

### Getting a better user error
```js
// more code

axios.get(geocodeUrl).then((response) => {
  console.log(response.data); 
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  }
});
```

`$ node app-promise.js -a '1566 leon drive hatfield'`

* Now our error is more digestible

`Unable to connect to API servers.`

* Add the dot back in the URL so it works again

## Custom Error Messages

```js
// more code

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }

  console.log(response.data); 
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
```

* Enter a valid zip code and it works as expected
* Enter an invalid zip code and it break and we output our custom error message

`Unable to find that address.`

```js
// more code
  const lat = response.data.results[0].geometry.location.lat;
  const lng = response.data.results[0].geometry.location.lng;
  const weatherUrl = `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}`
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  const temperature = response.data.currently.temperature;
  const apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
  
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
```

* Good zip codes work
* Bad zip codes trip custom error

## Extras
* Add hi/low temperatures
* Add chance of precipitation
* Have a default location ability, there would be a command that let's me set the default location, then you could run the weather app with no location argument (similar to notes app where we save data to the file system)
