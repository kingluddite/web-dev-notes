# Advanced Aggregation - Part 1
* Working on `/top`
* List of top 10 stores based on their average rating
* How do you query stores on computed fields?
* This is a perfect use case of an aggregation

## What is Aggregation again?
* What you use in `MongoDB` when you use multi-step, very complex queries

### What is our multi-step, complex query?
1. Grab a list of all our stores
2. Populate their ratings
3. Find out what the average rating of that store is
4. We also want to filter out any stores that only have 1 rating
    * Because one person could rate it 5 stars and it goes straight to the top
    * Prevent users from `gaming the system`

### Create `/top` route
* If we click on `Top` in navbar we get a 404
* So we need to create a new route for `/top`

`index.js`

```js
// more code

router.get('/top', catchErrors(storeController.getTopStores));

/*
  API
*/
// more code
```

### Create the `getTopStores()` method in our controller
`storeController.js`

```js
exports.getTopStores = async (req, res) => {
  const stores = await Store.getTopStores();
  res.render('topStores', { stores, title: 'Top Stores' });
};
```

### General rule
* Any time you have a complex query, it is not great to do that inside of your controller, it is recommended to put that on the Model itself
    - Using `find()` is fine in the Controller
    - But when you have 7 or 8 lines of query, put that in the Model

`Store.js`

```js
storeSchema.statics.getTopStores = function() {
  return this.aggregate(
    [
      // Lookup Stores and populate their reviews
      // filter for only items that have 2 or more reviews
      // Add the average reviews field
      // Sort it by our new field, highest reviews first
      // limit to at most 10
    ]
  );
};
```

* `aggregate()`
    - Is like a query function
    - Is similar to `.find()` but enables us to accomplish much more complex tasks
    - We return `aggregate()` which returns a **Promise** so when we call this back in `storeController.js` we can **await** the result of `getTopStores()` and put it into our `stores` variable


`storeController.js`

![await getTopStores()](https://i.imgur.com/dn7jyaD.png)

### Digging in to `aggregate()`
#### Lookup stores and populate their reviews
* Can we use virtual review that we used here?

`Store.js`

```
storeSchema.virtual('reviews', {
  ref: 'Review', // what model to link
  localField: '_id', // which field on the store?
  foreignField: '_store' // which field on the review?
});
```

* **No!** we can not use virtual reviews
* Because virtual reviews is a Mongoose specific thing
* `aggregate()` is not Mongoose specific, it passes it straight through to `MongoDB`
* This is a con to Mongoose specific queries because you can't use them every possible place because something like aggregate is a lower level `MongoDB` method and it doesn't know about the higher level Mongoose methods

## Todo list
### 1. Get list of all stores where each store has their list of reviews populated

```js
storeSchema.statics.getTopStores = function () {
 return this.aggregate([
  // Look Stores and populate their reviews
   {
     $lookup: {
       from: 'reviews', localField: '_id', foreignField: '_store', as: 'reviews'
     }
   }
  // filter for only items that have 2 or more reviews
  // Add the average reviews filed
  // sort it by our new field, highest reviews first
  // limit to at most 10
 ]);
};
```

* Notice how it is similar to what we did with Mongoose:

```
storeSchema.virtual('reviews', {
  ref: 'Review', // what model to link
  localField: '_id', // which field on the store?
  foreignField: 'store' // which field on the review?
});
```

* But we use `from: 'reviews'` and with mongoose we used `ref: 'Review'`

## What is happening with `MongoDB`?
* MongoDB takes our Model `Review`, automatically makes it lowercase and adds an `s` at the end to generate `'reviews'`

### Now let's test to see what we have so far with JSON
`storeController.js`

```js
exports.getTopStores = async (req, res) => {
  const stores = await Store.getTopStores();
  res.json(stores);
  // res.render('topStores', { stores, title: 'Top Stores' });
};
```

#### View in browser
* You will see list of stores and all have a reviews field
* `as` will name the field inside the list of stores

![as reviews](https://i.imgur.com/ZZMzaXQ.png)

### 2. Filter for stores that only have 2 or more reviews

`Store.js`

```js
storeSchema.statics.getTopStores = function () {
  return this.aggregate([
  // Look Stores and populate their reviews
    {
      $lookup: {
        from: 'reviews', localField: '_id', foreignField: '_store', as: 'reviews'
      }
    },
   // filter for only items that have 2 or more reviews
   { $match: { 'reviews.1': { $exists: true } } }
  // Add the average reviews filed
  // sort it by our new field, highest reviews first
  // limit to at most 10
  ]);
};
```

* We are looking for a match of `reviews.1`
    - This is how you find the second review in MongoDB
    - JavaScript would use arrays and say reviews[1]
    - But this way if there is only 1 review, then that review will be filtered out
    - Only 2 review or more will be in the query
    - Here is a screenshot of a store with no reviews

![no review](https://i.imgur.com/8CwIsUN.png)

* When we refresh and use our current `/top` query, it will filter out stores with only 1 or 0 reviews
* See for yourself

I only now have 3 stores with 2 or more reviews

![stores with 2 or more reviews](https://i.imgur.com/td4c4ub.png)

### We need more data
* Before we didn't have a reviews field when we loaded sample data
* Now we will delete our existing data and repopulate with review data

#### Comment in the lines we previously commented out
All lines have to do with the `Review` Model

`data/load-sample-data.js`

```
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '/../variables.env') });

const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '/../variables.env') });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
const Store = require('../models/Store');
const Review = require('../models/Review');
const User = require('../models/User');


const stores = JSON.parse(fs.readFileSync(__dirname + '/stores.json', 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(__dirname + '/reviews.json', 'utf-8'));
const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Store.remove();
  await Review.remove();
  await User.remove();
  console.log('Data Deleted. To load sample data, run\n\n\t npm run sample\n\n');
  process.exit();
}

async function loadData() {
  try {
    await Store.insertMany(stores);
    await Review.insertMany(reviews);
    await User.insertMany(users);
    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch(e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n');
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
```

1. Stop server - `ctrl` + `c`
2. Delete our current data `$ npm run blowitallaway`
3. Check `MongoDB` Compass to see all data is gone
4. Run our data - `$ npm run sample`
5. Start server `$ npm start`
6. View `/top` and you'll see we have lots of reviews

## Back to our aggregate()
3. Add a new field called `average reviews field`
    * This field will be calculate on the fly
    * That is exactly what aggregate was built for
    * $project - `MongoDB` jargon to add a field

`Store.js`

```
storeSchema.statics.getTopStores = function () {
  return this.aggregate([
  // Look Stores and populate their reviews
    {
      $lookup: {
        from: 'reviews', localField: '_id', foreignField: 'store', as: 'reviews'
      }
    },
   // filter for only items that have 2 or more reviews
  { $match: { 'reviews.1': { $exists: true } } },
  // Add the average reviews filed
    { $project: {
      averageRating: { $avg: '$reviews.rating' }
    }
    }
  // sort it by our new field, highest reviews first
  // limit to at most 10
  ]);
};
```

* We will create a new field called `averageRating`
    - It will do the average of the `rating` field ([screenshot](https://i.imgur.com/vJ8vnoc.png))
* $reviews - the `$` means it is a field from the data being piped in (in or case it is data that is being piped in from our `$match`)

### View in browser
* We see all our average ratings per store but we don't see any other fields
* This is bad
* We are using mLab version 3.2.13

![mlab mongod version](https://i.imgur.com/eSvaUfv.png)

* Currently 3.4 is not available in the sandbox

![sandbox not 3.4](https://i.imgur.com/M05bYoa.png)

In version 3.4 you could do this:

```
// Add the average reviews filed
{
   $addField: {
     averageRating: { $avg: '$reviews.rating' }
   }
}
```

* And that's all you need to do and you are good to go
* But with $project, how can we fix this without using 3.4?
    - We just have to add the fields we want back in
        + We need
            * name
            * photo
            * slug
            * reviews (or count of reviews)
    - `$$ROOT` - the original document

`Store.js`

```
storeSchema.statics.getTopStores = function () {
  return this.aggregate([
  // Look Stores and populate their reviews
    {
      $lookup: {
        from: 'reviews', localField: '_id', foreignField: 'store', as: 'reviews'
      }
    },
    // filter for only items that have 2 or more reviews
    { $match: { 'reviews.1': { $exists: true } } },
    // Add the average reviews filed
    {
      $project: {
        photo: '$$ROOT.photo',
        name: '$$ROOT.name',
        slug: '$$ROOT.slug',
        reviews: '$$ROOT.reviews',
        averageRating: { $avg: '$reviews.rating' }
      }
    }
  // sort it by our new field, highest reviews first
  // limit to at most 10
  ]);
};
```

* Above, we just kind of created our very own new document
* And that is exactly what aggregation does

4. Sort by new field (highest reviews first)

`Store.js`

```
storeSchema.statics.getTopStores = function () {
  return this.aggregate([
  // Look Stores and populate their reviews
    {
      $lookup: {
        from: 'reviews', localField: '_id', foreignField: 'store', as: 'reviews'
      }
    },
    // filter for only items that have 2 or more reviews
    { $match: { 'reviews.1': { $exists: true } } },
    // Add the average reviews filed
    {
      $project: {
        photo: '$$ROOT.photo',
        name: '$$ROOT.name',
        slug: '$$ROOT.slug',
        reviews: '$$ROOT.reviews',
        averageRating: { $avg: '$reviews.rating' }
      }
    },
    // sort it by our new field, highest reviews first
    { $sort: { averageRating: -1 } }
    // limit to at most 10
  ]);
};
```

* The top of the query should show 5
* The last store should show 1.6666667

5. Limit to 10 stores (if we have more than 10 stores)

`Store.js`

```
storeSchema.statics.getTopStores = function () {
  return this.aggregate([
  // Look Stores and populate their reviews
    {
      $lookup: {
        from: 'reviews', localField: '_id', foreignField: 'store', as: 'reviews'
      }
    },
    // filter for only items that have 2 or more reviews
    { $match: { 'reviews.1': { $exists: true } } },
    // Add the average reviews filed
    {
      $project: {
        photo: '$$ROOT.photo',
        name: '$$ROOT.name',
        slug: '$$ROOT.slug',
        reviews: '$$ROOT.reviews',
        averageRating: { $avg: '$reviews.rating' }
      }
    },
    // sort it by our new field, highest reviews first
    { $sort: { averageRating: -1 } },
    // limit to at most 10
    { $limit: 10 }
  ]);
};
```

### Whew!
That was a whole lotta aggregation
