# mongoose Middleware & Slugify
* [docs for mongoose middleware](https://mongoosejs.com/docs/middleware.html)
* `mongoose` middleware (aka pre and post hooks)
* Functions which are passed control during execution of asynchronous functions
    - We can hook into certain operations
        + Like
            * Saving to a Database
            * Finding/fetching from a Database
            * We can manipulate data before it's entered

## 4 Different types of mongoose middleware
* document middleware
    - We'll mostly work with this
    - When you use `this` with document middleware it refers to the document itself (so the document that is being `saved`, `removed` or `validated`...)
* model middleware
* `aggregate` middleware
* `query` middleware
    - When we use query middleware the `this` keyword refers to the query itself
        + find
        + findOne
        + deleteOne
        + and all others are on docs page

## You have pre middleware
* pre will run before the operations
    - example: before the document gets saved

```
var schema = new Schema(..);
schema.pre('save', function(next) {
  // do stuff
  next();
});
```

## You also have post middleware
* post will run after operations
    - example: after the document is saved

```
schema.post('save', function(doc) {
  console.log('%s has been saved', doc._id);
});
```

## Let's use mongoose middleware to convert a name to a slug
### You'll need to install slugify
`$ npm i slugify`

### Include slugify in your Bootcamp model
* Go below our schema
* We want to run this before the document is saved so we'll use `pre`
* **IMPORTANT** Use regular functions and not arrow functions
    - Because we are using the `this` keyword and arrow functions scope the `this` keyword differently

```
const mongoose = require('mongoose');
const slugify = require('slugify'); // add

// MORE CODE

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// add this "pre" hook
// Create bootcamp slug from the name
BootcampSchema.pre('save', function(next) {
  console.log('Slugify ran', this.name);
  next();
});
```

* Insert a bootcamp using Postman POST
* You will see the name of the bootcamp in the Terminal (we logged it)
* Make sure you pass in `next` and call `next()` (VERY IMPORTANT)
    - This let's it know it is to go on to the next piece of middleware

## Delete all bootcamps from Atlas using compass
* With server running
* Run get all bootcamps in Postman
* Even without any bootcamps we still get a successful request

```
{
    "success": true,
    "count": 0,
    "data": []
}
```

* **note** You don't want a failing request even though there is no data in the Database
* Create a new bootcamp using the POST method in Postman

```
GET /api/v1/bootcamps 200 102.414 ms - 36
Slugify ran Devcentral Bootcamp111
POST /api/v1/bootcamps 201 107.212 ms - 640
```

* We see that before our POST method runs to create our bootcamp our pre code is running and assessing the bootcamp just created (we see it's name)

## Make slugify create a slug
```
// MORE CODE
// Create bootcamp slug from the name
BootcampSchema.pre('save', function() {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);
```

* Our second argument is options and we just make sure the slug is all lowercase
    - We could add underscores and other options if we want
    - [slugify docs](https://github.com/simov/slugify)

### Let's create our first slug
* Delete the bootcamp we just created
    - Grab the `id` and use the DELETE request method
    - Create new bootcamp with POST
    - View the response and see our new slug that was created from our middleware

```
"slug": "devcentral-bootcamp111",
```

### Benefit of this slug
* If we have this slug available to the client
    - And we're using react
    - And you want your React Router to hit the slug and make it a more user friendly URL, for SEO and now we can do that with this API

## Next - Geocoding
* Geocoder npm module along with the Mapquest API
    - This will enable us to take the address that is submitted and we can create a GEOJSON field
