# Callback Errors
* How to handle them

## Bugs
* If you enter a zip that doesn't exist like `000000` the program crashes
* It tries to fetch data
* The data doesn't exist
* Returns error, formatted_address of undefined

### Solution to Bug
* Add logic to check for errors
* We will look for machine errors
* And errors from Google API
* If you search Google API with bad zip, you will get this:

#### Bad URL
`https://maps.google.com/maps/api/geocode/json?address=000000`

* Returns:

```json
{
results: [ ],
status: "ZERO_RESULTS"
}
```

* The status property if an address was returned returns `status: 'OK'`
* **note** these `status` properties are propietary to Google's APIs
* Make sure to check the API's documentary to see how the status is handled in API's other than Google

```js
const request = require('request');
const yargs = require('yargs');

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

request({
  url: `https://maps.google.com/maps/api/geocode/json?address=${encodedAddress}`,
  json: true
}, (error, response, body) => {
  if (error) {
    console.log('Could not connect to server');
  } else if (body.status === 'ZERO_RESULTS') {
    console.log('No address found');
  } else if (body.status === 'OK') {
    console.log(`Address ${body.results[0].formatted_address}.`);
    console.log(`Lat ${body.results[0].geometry.location.lat}.`);
    console.log(`Lng ${body.results[0].geometry.location.lat}.`);
  }
});
```

* Now we are checking if we can't connect to the Google API (we test by changing the Google URI to a bad URI)
* We check if not results and output a informative error message
* We return results if all works
