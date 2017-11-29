# Encoding User Input
 
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

console.log(argv);


request({
  url: 'https://maps.google.com/maps/api/geocode/json?address=1301%20lombard%20st%20philadelphia',
  json: true
}, (error, response, body) => {
  console.log(`Address ${body.results[0].formatted_address}.`);
  console.log(`Lat ${body.results[0].geometry.location.lat}.`);
  console.log(`Lng ${body.results[0].geometry.location.lat}.`);
});
```

`$ node app.js --help`
`$ node app.js --h`
`$ node app.js --address`
`$ node app.js -a`

`$ node app.js -a '1566 Leon Drive, Hatfield, PA'`

```
{ _: [],
  version: false,
  help: false,
  h: false,
  a: '1566 Leon Drive, Hatfield, PA',
  address: '1566 Leon Drive, Hatfield, PA',
  '$0': 'app.js' }
Address 1301 Lombard St, Philadelphia, PA 19147, USA.
Lat 39.9444071.
Lng 39.9444071.
```

* The address, lat and lng are fetched a second time and that is just because we are hardcoding it

## encode
`$ node`

`> encodeURIComponent('111 elm street hermosa beach, ca 90254')`

* Node will return the URL encoded string

`'111%20elm%20street%20hermosa%20beach%2C%20ca%2090254'`

## decode
decodeURIComponent()

* Does the opposite

`> decodeURIComponent('John%Doe')`

* Output:

`'John Doe'`

* This is how we can encode and decode URI components in our app

### Challenge
* Make the url to the Google API dynamic by using yargs to grab the address the user enters
* There will be a delay followed by the address, lat and lng showing up

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
  url: `https://maps.google.com/maps/api/geocode/json?address=${dynamicAddress}`,
  json: true
}, (error, response, body) => {
  console.log(`Address ${body.results[0].formatted_address}.`);
  console.log(`Lat ${body.results[0].geometry.location.lat}.`);
  console.log(`Lng ${body.results[0].geometry.location.lat}.`);
});
```


