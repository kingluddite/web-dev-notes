# Creating a Geospacial Ajax Endpoint
* We'll now make a store locator with GoogleMaps built in
* Make an API endpoint that we can ping
* Give it a Lat and Lng
* And it will return top 10 stores within a kilometer or 1000 kilometers (or whatever we specify)

## What we will build
* User picks a city
* That city will appear center in Google Maps on our site
* All the nearby stores in our API will be plotted near the city entered
    - They will appear as markers

## What we need to do
* Similar to what we did with our stores
* We need to index our data
* We need to create a route
* We need to handle it in our `storeController.js`

## Group some stores together
* To see how this works, Add some stores that are in the same city
* Let's add all the Starbucks that are in Redondo Beach
    - Starbucks, North Pacific Coast Highway, Redondo Beach, CA
    - Starbucks, Artesia Boulevard, Redondo Beach, CA
    - Starbucks, Kingsdale Avenue, Redondo Beach, CA
    - Starbucks, Hawthorne Boulevard, Redondo Beach, CA
    - Starbucks, Inglewood Avenue, Redondo Beach, CA

### Create our indexes
* We need to make our Indexes geospacial

`Store.js`

```js
// more code

// Defin our indexes
storeSchema.index({
  name: 'text',
  description: 'text'
});

storeSchema.index({ location: '2dsphere' }); // add this line

// more code
```

* Make sure you spell `2dsphere` correctly or you will not see the index in your Mongo Database

### View `MongoDB` Compass
* And you will see our new Geospatial 2sphere Index
* If you don't see it, click on users and then back to stores

![geospacial Index](https://i.imgur.com/jWtKaQn.png)

## Create our route for mapping
`index.js`

```js
// more code

router.get('/api/v1/search', catchErrors(storeController.searchStores));
// add the line below
router.get('/api/v1/stores/near', catchErrors(storeController.mapStores));

module.exports = router;
```

## Add our mapStores method to our Controller
* We'll test it out first

`storeController.js`

```js
exports.searchStores = async (req, res) => {
  // more code
}

// add this method below
exports.mapStores = async (req, res) => {
  res.json({ it: 'Worked' });
};
```

### View in browser
* visit `http://localhost:7777/api/v1/stores/near`
* You should see `{ "it": "Worked" }`

### Adding queries
* We will use two, `lat` and `lng`
* If we change our code to:

```js
exports.mapStores = async (req, res) => {
  res.json(req.query);
};
```

* And we browser to: `http://localhost:7777/api/v1/stores/near?lat=43&lng=-179`

We'll see lat and long like this:

![lat and lng](https://i.imgur.com/MnNG59v.png)

* MongoDB expects to pass it an array of `lng` and `lat` numbers

```js
exports.mapStores = async (req, res) => {
  const coordinates = [req.query.lng, req.query.lat];
  res.json(coordinates);
};
```

* And that will render this:

![lng and lat](https://i.imgur.com/6Uu8nwi.png)

### Houston we have a problem
* That did not give us an "array of numbers", instead it gave us an array of strings
* How do we convert an array of strings to an array of numbers?

```js
exports.mapStores = async (req, res) => {
  const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
  res.json(coordinates);
};
```

* That will map over every number and convert it to a number

![array of numbers](https://i.imgur.com/6b3hUMk.png)

## Make a query that returns all the stores
`storeController.js`

```js
// more code

exports.mapStores = async (req, res) => {
  const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
  const query = {

  };

  const stores = await Store.find(query);
  res.json(stores);
};
```

### View in browser
* You will see an array of all stores
* Currently, our query is just a blank object

## $near
* `$near` is an operator inside of MongoDB and it enables us to search for stores that are near a `lat` and `lng`
* We don't need to do any math!
* `MongoDB` is smart and knows how to figure out the distance between `lat` and `lng`

`storeController.js`

```js
exports.mapStores = async (req, res) => {
  const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
  const query = {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates
        },
        $maxDistance: 10000 // 10 kilometers
      }
    }
  };

  const stores = await Store.find(query);
  res.json(stores);
};
```

* That will return an empty set
* No stores are within `10km` of our coordinates
* Comment `$maxDistance` out so you get all stores again
* We see that the `Gymboree in Seattle` coordinates of stores are all near a lat of **47.6** and a lng of **-122.3**
* Change URL to: `http://localhost:7777/api/v1/stores/near?lat=47.6&lng=-122.3`
* Comment in `$maxDistance`
* And hit enter
* You should see all stores near Hamilton (within 10km)

## Slim Down
* In General you want to keep your AJAX requests as slim as possible
* Currently, we are pulling down every field

### What do we really need?
* name
* slug
* description
* photo
* address
    - But remember that we use `location` to get address
* (everything else we don't need)

#### Slim Ajax down with `.select()`
`storeController.js`

```js
// more code

const stores = await Store.find(query).select('slug name description location photo'); // add this line
  res.json(stores);
};
```

* Now we only get the fields we need
* I accidentally used `address` instead of `location` and my code did not work because on the map page my code was looking for `location` and since I did not list it above, it was undefined
  - Lesson learned - know your data structure
  - Open Mongo DB in you are ever in doubt and see for yourself what the structure looks like
* To see how this works, remove `name` and `slug` temporarily and view this url `http://localhost:7777/api/v1/stores/near?lat=47.6&lng=-122.3`
* After experimenting with the code, put the select back:

`const stores = await Store.find(query).select('slug name description location photo');`

* Here after using `.select()` we have a limited number of fields

![selected fields](https://i.imgur.com/PKrG0yq.png)

* If you just wanted to remove two fields you could do this:

`const stores = await Store.find(query).select('-author -tags');`

### Limit the Points on your map
`storeController.js`

```js
// more code

  const stores = await Store.find(query).select('slug name description location photo').limit(10);
  res.json(stores);
};
```

