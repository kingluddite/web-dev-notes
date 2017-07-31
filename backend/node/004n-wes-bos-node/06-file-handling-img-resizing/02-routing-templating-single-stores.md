# Routing and Templating Single Stores

## Git
* Create new branch

`$ git checkout -b rout-templating`

1. Click stores link
2. Click on single store
    * We need to find store that has the slug (_Tied to `_id`_)
    * We need to pull in name, photo, map, address, description, list of tags
    * We need to show a log in form
    * logout then tells them to review
    * list of all possible reviews

## Can you do this? Try it
* Make a route
* Make a controller
    - The controller will query the Database and get some data
    - The controller will then pass the data to a template

## Create our route

`routes/index.js`

```
// more code
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
// add this line
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

module.exports = router;
```

## Add our Controller and Test
`storeController.js`

```
exports.getStoreBySlug = async (req, res) => {
  res.send('it works');
};
```

## View in browser and test
Click on a store and you should see `it works`

### We have a problem
* We need to use `Store.findOne()` but we don't have an `_id`, we only have a slug
    - So we first need to do a lookup of the slug to get the `_id`
    - How do we access the URL params?

```
exports.getStoreBySlug = async (req, res) => {
  res.send(req.params);
};
```

URL `http://localhost:7777/store/javaman`

Output

```
{
"slug": "javaman"
}
```

So to get slug's value from the URL we will use `req.params.slug` and we'll search to find it

```
exports.getStoreBySlug = async (req, res) => {
  const store = await Store.findOne({ slug: req.params.slug });
  // check our data coming back (res)
  res.json(store);
};
```

### Our `res` data coming back from the server
```
{
"_id": "592bb9d88ba21313281836ee",
"slug": "javaman",
"name": "Javaman",
"description": "Hermosa coffee hotspot",
"__v": 0,
"location": {
"address": "Hermosa Beach, CA, United States",
"coordinates": [
-118.39951940000003,
33.8622366
],
"type": "Point"
},
"created": "2017-05-29T06:04:08.399Z",
"tags": [
"Wifi",
"Family Friendly"
]
}
```

### Houston We Have a Problem
#### 404 page
* If our query doesn't find anything it just returns `null`
* We need to take care of this and force a 404

## Add a bad URL
`http://localhost:7777/store/javamanx`

* We just add a `x` at the end and this will break our site because that will just return `null` in the `res`

### Next saves us!
* We check if we have a store in the `res` and if not we use `next()` to go to the next middleware and that will eventually take us to a 404 error
* If we have the store than return the data

```
exports.getStoreBySlug = async (req, res) => {
  const store = await Store.findOne({ slug: req.params.slug });
  if (!store) {
    return next();
  }
};
```

You may also see people use this (_both are valid, you choose which one you like_)

```
exports.getStoreBySlug = async (req, res) => {
  const store = await Store.findOne({ slug: req.params.slug });
  if (!store) {
    next();
    return;
  }
};
```

## But since we are using `next()` we need to pass it
```
exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug });
  if (!store) {
    return next();
  }
};
```

* That is all we need to do to render out a 404

## What does `next()` do?
It will assume that this (our controller) is a middleware and it will pass it along to the next steps

### Drilling it home!
1. Go to app.js
2. We require our `routes/index` (_const routes = require('./routes/index');_)
3. We find our routes (_app.use('/', routes);_)
4. If the route is not found (next - move onto the next piece of middleware
5. `app.use(errorHandlers.notFound)` - and that will kick in

### Troubleshoot
If your page just hangs it is because you are not sending any data

```
exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug });
  if (!store) {
    return next();
  }
  res.json(store);
};
```

## We finally get our 404!
(_When we pass a bad URL - that's slug doesn't match a document in our `store` Collection_)

## JSON is fun but it's time to render
`res.render()` to be more exact

```
exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug });
  if (!store) {
    return next();
  }
  // res.json(store); DO NOT also return JSON or you'll get an error!
  res.render('store', { store, title: store.name });
};
```

### Create our view
`store.pug`

```
extends layout

block content
    h2 #{store.name}
```

That should just give you a page with the page title

* Test by clicking on several stores and you should see the store title change for each

`store.pug`

```
extends layout

block content
    .single
      .single__hero
        img.single__image(src=`/uploads/${store.photo || 'store.png'}`)
    h2 #{store.name}
```

* Click on several stores
    - If they have an image, you'll see it
    - If not, you'll see the default store image

### Add Page title
`store.pug`

```
extends layout

block content
    .single
      .single__hero
        img.single__image(src=`/uploads/${store.photo || 'store.png'}`)
        h2.title.title--single
          a(href=`/stores/${store.slug}`) #{store.name}
```

### Add static map (_Using Google Maps_)
```
<img class="single__map" src="https://maps.googleapis.com/maps/api/staticmap?center=33.93106849999999,-118.39625849999999&amp;zoom=14&amp;size=640x150&amp;key=AIzaSyAqRkWi3xFh1dSn5zq1TOoOD1NCkSlwl2A&amp;markers=33.93106849999999,-118.39625849999999&amp;scale=2">
```

#### How many params does the static google map need?
* Use source to view static map
* Copy and paste URL into Atom
* Highlight all `&` in URL
* Move over 1 space and delete all `&` and press return
* You will see all the params we need for a static google map

### A lot goes into making a static map
* center
* zoom
* size
* API key
* markers (_lat and lng_)
* scale (_enables us to do high DPI for retina based devices_)

## Template Helpers to the rescue!
* Do we have to do all of that generation inside of our template?
    - No. Instead, we'll use **Template helpers**

`helpers.js`

```
// Making a static map is really long - this is a handy helper function to make one
exports.staticMap = ([lng, lat]) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=${process.env.MAP_KEY}&markers=${lat},${lng}&scale=2`;
```

* `exports.staticMap = ([lng, lat])`
    - MongoDB gives us it in `lng, lat`
* `?center=${lat},${lng}`
    - Google Maps uses `lat` and then `lng`
* `&zoom=14&size=800x150`
    - We hard code **zoom** and **size**
* `key=${process.env.MAP_KEY}`
    - We pull this from `variables.env`
    - Sign up for your own **Google Maps key**
    - **NEVER HARD CODE API KEYS INTO TEMPLATE FILES**
    - It will change and it is bad for security to put them in template files
* `markers=${lat},${lng}`
    - We put our **markers** exactly at `lat/lng`
* `scale=2`
    - We hard code **scale** to `2`

We just call this helper function, pass in `lng` and `lat` and it will return to us this very long dynamically generating string

### Now let's att that to our View
`store.pug`

```
extends layout

block content
    .single
      .single__hero
        img.single__image(src=`/uploads/${store.photo || 'store.png'}`)
        h2.title.title--single
          a(href=`/stores/${store.slug}`) #{store.name}
          
    .single__details.inner
      img.single__map(src=h.staticMap(store.location.coordinates))
```

### Having Problems visualizing the data?
Use **dumps** to help you visualize your data

`store.pug`

```
// more code
.single__details.inner
      pre=h.dump(store)
      img.single__map(src=h.staticMap(store.location.coordinates))
```

#### Dump data
```
{
  "_id": "592bb9d88ba21313281836ee",
  "slug": "javaman",
  "name": "Javaman",
  "description": "Hermosa coffee hotspot",
  "__v": 0,
  "location": {
    "address": "Hermosa Beach, CA, United States",
    "coordinates": [
      -118.39951940000003,
      33.8622366
    ],
    "type": "Point"
  },
  "created": "2017-05-29T06:04:08.399Z",
  "tags": [
    "Wifi",
    "Family Friendly"
  ]
}
```

* `store.location.coordinates` - gives us `lng` first and then `lat`

## Final single store layout
`store.pug`

```
extends layout

block content
    .single
      .single__hero
        img.single__image(src=`/uploads/${store.photo || 'store.png'}`)
        h2.title.title--single
          a(href=`/stores/${store.slug}`) #{store.name}
          
    .single__details.inner
      img.single__map(src=h.staticMap(store.location.coordinates))
      p.single_location= store.location.address
      p= store.description
      
      if store.tags
        ul.tags
          each tag in store.tags
            li.tags
              a.tag__link(href=`/tags/${tag}`)
                span.tag__text= tag
                //- span.tag__text= tag (alternative way to code above line)
                //- show with parenthesees   span.tag__text (#{tag})
                //- show with #   span.tag__text ##{tag}
```
