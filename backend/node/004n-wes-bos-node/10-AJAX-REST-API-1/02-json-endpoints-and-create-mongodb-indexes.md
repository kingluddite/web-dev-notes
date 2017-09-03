# JSON endpoints and creating MongoDB Indexes
* We start learning about using our AJAX endpoint
* We will add a search box when filled in with term the stores that pop up should have that **term** in the `name` or **term** in the `description`

## Indexes
[Read MongoDB documentation](https://docs.mongodb.com/manual/indexes/)

* "Indexes support the efficient execution of queries in MongoDB"
    - Translation - Indexes make things fast
* "Without indexes, MongoDB must perform a collection scan, i.e. scan every document in a collection, to select those documents that match the query statement"
    - If you query the `MongoDB` Database for `coffee`, if you have a million stores, and don't have an Index, `MongoDB` will scan every single document and ask each one `Do you have coffee in the title or description?`
    - If you Index a field like `name` and `description`, the Database can pre-prepare for your future searches so that when you do the search it will shave milliseconds off of each search
    - As a developer, if you know you will be querying for a field often, you should place an index on that field
    - We will index `text`, `lat` and `lng`

# Where do we create Indexes?
In the Scheme

## How can I check my current indexes?
* MongoDB Compass has a `INDEXES` tab
* By default `_id` is Indexed on every Collection
    - Store in `MongoDB` Compass shows `_id` with Index
    - Users has `_id` and `email` each with an Index

![store id index](https://i.imgur.com/BUi2ukY.png)

![users email index](https://i.imgur.com/S05u1Sy.png)

* When we added a plugin for our `users` (Passport) it introduced the email Index

## Let's add our first indexes
* We will index the `name` and `description` fields of our storeSchema

`Store.js`

```js
// more code

// Defin our indexes
storeSchema.index({
  name: 'text',
  description: 'text'
});

storeSchema.pre('save', async function (next) {
// more code
});
// more code
```

* We tell `MongoDB` what we would like it to be indexed as (`text`)
* This will make it possible to search the name and description text very efficiently
* And also do stuff like case sensativity

## Refresh `MongoDB` Compass
* **Compound Index** - two fields being indexed as one

![new Index added](https://i.imgur.com/JkOD8Y0.png)

* Now that we added that Index it will enable us to search via both `name` and `description` fields in one shot

## Create new API endpoint route
`router.get('/api/v1/search')`

* Add a version `v1`, `v2`, `v3` so if people are using your API you can keep the old API and add a new one without breaking the old one for users who don't upgrade to the new API

`routes/index.js`

```js
// more code


/*

  API

*/

router.get('/api/v1/search', catchErrors(storeController.searchStores));

module.exports = router;
```

## Add searchStores() method inside our `storeController.js`
* We also wire it up to make sure the route is working

`storeController.js`

```js
// more code

exports.searchStores = async (req, res) => {
  res.json({ it: 'Worked' });
};
```

## Test route
* Visit `http://localhost:7777/api/v1/search`
* You should see:

![it worked](https://i.imgur.com/EMsz9iO.png)

## JSON Viewer Chrome Extension
Makes your JSON look pretty

![add JSON Viewer to Chrome](https://i.imgur.com/OCYbfQS.png)

### How do we add a query string?
`storeController.js`

```js
exports.searchStores = async (req, res) => {
  res.json(req.query);
};
```

* Search the following route

`http://localhost:7777/api/v1/search?q=wine&name=Gary&nice=true`

* You should see:

![query string](https://i.imgur.com/kbIjdJR.png)

### First let's query for all our stores
`storeController.js`

```js
exports.searchStores = async (req, res) => {
  const stores = await Store.find();
  res.json(stores);
};
```

#### Test it out
* View `http://localhost:7777/api/v1/search` in browser
* You will see JSON of all our stores

## MongoDB $text operator
* [read the documentation](https://docs.mongodb.com/manual/reference/operator/query/text/)
* `$text` performs a text search on the content of the fields indexed with a text index
* A `$text` expression has the following syntax:

```json
{
  $text:
    {
      $search: <string>,
      $language: <string>,
      $caseSensitive: <boolean>,
      $diacriticSensitive: <boolean>
    }
}
```

* So we created an Index on our `name` and `description` fields so we can now perform a `$text` search on any content inside these two fields!

`storeController.js`

```js
// more code

exports.searchStores = async (req, res) => {
  const stores = await Store.find({
    $text: {
      $search: req.query.q
    }
  });
  res.json(stores);
};
```

### Test it out
* We will search for all stores with kids in **name** or **description**
* Our URL will be `http://localhost:7777/api/v1/search?q=kids`

![all stores with kids](https://i.imgur.com/afC6tiu.png)

## Add Sorting
* Currently all the term "hits" we get are sorted by `dataCreated` by default
* We want to sort by **"score"**
    * This is an invisible field that aggregates the sum total of each **"hit"** and make the stores with most points first
    - This is called **meta data** in `MongoDB` and we use `$meta`

## $meta
* The `$meta` projection operator returns for each matching document the `metadata` (e.g. "textScore") associated with the query
* `project` in mongo means **"add a field"**
* [read the documentation](https://docs.mongodb.com/manual/reference/operator/projection/meta/)
* syntax

`{ $meta: <metaDataKeyword> }`

* Currently **"textScore"** is the only meta data key word

### "textScore"
* Returns the score associated with the corresponding `$text` query for each matching document
* The `text score` signifies how well the document matched the search term or terms
* If not used in conjunction with a `$text` query, returns a score of `0`
* Sort order is `Descending`

`scoreController.js`

```js
// more code

exports.searchStores = async (req, res) => {
  const stores = await Store.find({
    $text: {
      $search: req.query.q
    }
  }, {
    score: { $meta: 'textScore' }
  });
  res.json(stores);
};
```

* View in browser and look for new `score` field
* We `projected` this field (aka **added filed**)

![new score projected field](https://i.imgur.com/vGeyttJ.png)

## Sort in descending order
`storeController.js`

```js
// more code

exports.searchStores = async (req, res) => {
  const stores = await Store.find({
    $text: {
      $search: req.query.q
    }
  }, {
    score: { $meta: 'textScore' }
  }).sort({
    score: { $meta: 'textScore' }
  });
  res.json(stores);
};
```

* No we are sorting by highest to lowest score

### Cleaning up and limiting stores in search
`storeController.js`

```js
// more code

exports.searchStores = async (req, res) => {
  const stores = await Store
  // first find stores that match
  .find({
    $text: {
      $search: req.query.q
    }
  }, {
    score: { $meta: 'textScore' }
  })
  // then sort matching stores
  .sort({
    score: { $meta: 'textScore' }
  })
  // limit to only 5 results
  .limit(5);
  res.json(stores);
};
```

### Next
* We just completed the backend of our API
* Now we need to pull that API data into the front end

