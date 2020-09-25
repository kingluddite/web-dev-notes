# Advanced Filtering
## Example of adding query parameters to `Get All Bootcamps`
* In Postman

`{{URL}}/api/v1/bootcamps?location.state=MA&housing=true`

![Parameters in Postman](https://i.imgur.com/PAdGl9I.png)

* Run it
    - It won't filter it (we get all of our results)

## Postman makes it easy to get URL parameters
* Just use `req.query`

```
// MORE CODE

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = async (req, res, next) => {
  console.log(req.query);
  const bootcamps = await Bootcamp.find();

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
};

// MORE CODE
```

* And you will see this in the terminal

```
{ 'location.state': 'MA', housing: 'true' }
```

We can pass objects in to `Bootcamp.find({ name: 'John'})`

`req.query` is an object

* So we can do this `Bootcamp.find(req.query)`

```
// MORE CODE

exports.getBootcamps = async (req, res, next) => {
  // console.log(req.query);
  const bootcamps = await Bootcamp.find(req.query);

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
};

// MORE CODE
```

* Send in Postman and you'll get 1 result that is in MA and accepts housing

## I want to be able to send averageCost <= 10,000
```
{{URL}}/api/v1/bootcamps?averageCost[lte]=10000
```

* That will give an error
* But we can show you this:

```
exports.getBootcamps = async (req, res, next) => {
  console.log(req.query);
  const bootcamps = await Bootcamp.find();

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
};

```

* Run it again and you'll this this in the console:

```
{ averageCost: { lte: '10000' } }
```

* That is close to correct but it is missing a `$` because `$lte` is a mongoose operator
    - But in order to use these operators you need to have a `$` prefacing the `lte` operator

## Regex
* We need to create a `query` variable
* We need to take the query object and stringify it -   `JSON.stringify()`
* `replace()`
    - `/b` is a word boundary
        + We look for `gt|gte|lt|lte|in` (greater than or greater than or equal, less than or less then or equal - and in will search a list)
    - `/g` for global (so that it will look further than just the first one it finds)
    - Second argument is a function, we'll take the `match` and what do we want to return?
        + We want to return the match (it will be one of these `gt|gte|lt|lte|in` but with the `$` in front of it)
            * `$${match}` - The first `$` is a literal `$` and the second `$` is for interpolation inside a template literal

```
// MORE CODE

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = async (req, res, next) => {
  let query;

  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  console.log(queryStr);

  const bootcamps = await Bootcamp.find();

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
};

// MORE CODE
```

* Run in Postman and you'll see this in Terminal:

```
"averageCost":{"$lte":"10000"}}
GET /api/v1/bootcamps?averageCost[lte]=10000 200 115.969 ms - 8917
```

* We are now getting the filter that mongo needs `$lte` - [docs](https://docs.mongodb.com/manual/reference/operator/query/lt/)
    - You will see how our code now looks like what mongodb is expecting

```
db.inventory.find( { qty: { $lt: 20 } } )
```

* It still is not filtering

## What do we do now?
* Now we will use our `query` variable and store inside it the results from `Bootcamp.find(JSON.parse(queryString)` 

```
exports.getBootcamps = async (req, res, next) => {
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  const query = Bootcamp.find(JSON.parse(queryStr));

  const bootcamps = await query;

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
};
```

* We don't currently have any averageCost in our Database
* But still test if our new request works
* It should

Postman results for: `{{URL}}/api/v1/bootcamps?averageCost[lte]=10000` GET request
```
// MORE CODE

{
    "success": true,
    "count": 0,
    "data": []
}
// MORE CODE
```

## Test better
* We will add averageCost values manually in `bootcamps.json`
* Later on averageCost will be calculated through the course costs (but we don't have that yet)

`_data/bootcamps.js`

```
[
    {

        // MORE CODE

        "averageCost": 10000
    },
    {

        // MORE CODE

        "averageCost": 12000
    },
    {

       // MORE CODE
 
        "averageCost": 8000
    },
    {
       
       // MORE CODE
 
        "averageCost": 5000
    }
]
```

## But now we need to put this in our Database
* We'll make this easy by using our seeder
* Delete everything `$ node seeder -d` 
* And import everything `$ node seeder -i`
* Run server `$ npm run dev`
* Test route and Postman and you'll find 3 documents where averageCost is `lte` 10000
    - Change to `lt` you'll only get two results
    - Change to `gte` and test and see how filter results change
    - Change to `{{URL}}/api/v1/bootcamps?averageCost[gt]=10000&location.city=Lowell` (we add a filter by location.city)

## Since we added the `in` operator
* We can search by career
* `{{URL}}/api/v1/bootcamps?careers[in]=Web Development`
    - Now we can search within lists (aka arrays)!

## Next - Select certain fields
* Currently we filter but we get back everything in that document
* We want to just get the location, house... whatever
* And we want to be able to `sort` by certain fields

