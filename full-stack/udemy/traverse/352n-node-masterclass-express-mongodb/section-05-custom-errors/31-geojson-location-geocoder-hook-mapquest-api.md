# GeoJSON Location & Geocoder Hook - MapQuest API
* We will geocode the address that is submitted from the client in order to get the geojson field which will include the lat and lng
    - And we'll have city, state, country

## node-geocoder

### Install node-geocoder
`$ npm i node-geocoder`

### We'll create a separate utility file
* We'll initialize node-geocoder and we'll be able to use it anywhere
    - And we'll also put our node-geocoder options here too

### Put new API key info in `config/config.env`
`config/config.env`

* The API key in mapquest is the `Consumer Key`

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://123:123@cluster0-unb2p.mongodb.net/devcamper?retryWrites=true&w=majority
MONGO_DB_DEVCAMPER_PWD=123

GEOCODER_PROVIDER=mapquest
GEOCODER_API_KEY=l4kx1DVAKxLYxko36HWEO3r5yYad0Y11
```

* npm module
* [docs](https://github.com/nchaulet/node-geocoder)
* Their docs use google
    - We'll use mapquest
    - We'll need to use the mapquest API keys
    - They are using `.then()` we'll use async await
* We'll get a response with all the data we need

```
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',

  // Optional depending on the providers
  fetch: customFetchImplementation,
  apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

// Using callback
const res = await geocoder.geocode('29 champs elysée paris');

// output :
[
  {
    latitude: 48.8698679,
    longitude: 2.3072976,
    country: 'France',
    countryCode: 'FR',
    city: 'Paris',
    zipcode: '75008',
    streetName: 'Champs-Élysées',
    streetNumber: '29',
    administrativeLevels: {
      level1long: 'Île-de-France',
      level1short: 'IDF',
      level2long: 'Paris',
      level2short: '75'
    },
    provider: 'google'
  }
];
```

* The cool thing about this package is we'll get all this lng, lat and other stuff just by putting in an address

## We'll use mapquest
* Register for API key at [developer mapquest](https://developer.mapquest.com/)
    - APIs usually cost money but we'll get 15000 transactions per month for free
        + We'll only run this when a new bootcamp is inserted
        + Click `Manage Keys` and click on `My Application` and you'll see your key info

### We'll place our Geocode and create location field in our model
`Bootcamp.js`

```
// MORE CODE
// Create bootcamp slug from the name
BootcampSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Geocode & create location field

module.exports = mongoose.model('Bootcamp', BootcampSchema);
```

`utils/geocoder.js`

```
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
```

## Now we bring it into our Model and consume it
* **note** Most times you'll see lat then long but this requires long then lat

### This is what is available to us:
* **note** It is in an array with a single object so that is why we are using `loc[0]`

```
// output :
[
  {
    latitude: 48.8698679,
    longitude: 2.3072976,
    country: 'France',
    countryCode: 'FR',
    city: 'Paris',
    zipcode: '75008',
    streetName: 'Champs-Élysées',
    streetNumber: '29',
    administrativeLevels: {
      level1long: 'Île-de-France',
      level1short: 'IDF',
      level2long: 'Paris',
      level2short: '75'
    },
    provider: 'google'
  }
];
```

## Let's try it out
```
const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder'); // add

// MORE CODE

// Geocode & create location field
BootcampSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
  next();
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);
```

* Regarding our formatted address we don't need to save it in our Database as we have all the field on their own
* So we can tell it to not save the address in our Database
    - We do this by just setting it to undefined

## Test it out
* Make sure it is running
* Delete the bootcamp
* Create a new bootcamp and look at the respone and you'll see we didn't save address but we have all the fields in our Database

```
// MORE CODE

 "data": {
        "location": {
            "type": "Point",
            "coordinates": [
                -71.525909,
                41.483657
            ],
            "formattedAddress": "45 Upper College Rd, Kingston, RI 02881-2003, US",
            "street": "45 Upper College Rd",
            "city": "Kingston",
            "state": "RI",
            "zipcode": "02881-2003",
            "country": "US"
        },
// MORE CODE
```

## dotenv stuff
```
// long
    const dotenv = require('dotenv');
    dotenv.config({path: './config/config.env'});

// condensed version:

const dotenv = require('dotenv').config({path: './config/config.env'}); 
```

* Make sure that you are loading the `env` variables before you load the route files
* As long as you have these lines inside your `server.js` file, you won't need to require dotenv in every file that uses it
