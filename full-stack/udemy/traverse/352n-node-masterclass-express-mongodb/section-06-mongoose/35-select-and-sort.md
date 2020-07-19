# Select and Sort
* Goal: Use this:

`{{URL}}/api/v1/bootcamps?select=name,description`

* But the above won't work right now because it is looking as `select` as a field to match
    - Because that is how we set it up
        + house=true
        + location.state=CA

## We need to create our own version of `req.query` and pull select out so that it doesn't try to match it
* We want to make a copy of an object using the spread operator

```
const reqQuery = { ...req.query };
```

## Let's comment what we have so far
```
// MORE CODE

// @desc     Get all boo
// @route    GET /api/v1
// @access   Public
exports.getBootcamps = a
  // Create query string
  let queryStr = JSON.st

  // Create opeartors ($
  queryStr = queryStr.re

  // Copy req.query
  const reqQuery = { ...

  // Finding resource
  const query = Bootcamp

  // Executing our query
  const bootcamps = awai

  res
    .status(200)
    .json({ success: tru
};

// MORE CODE
```

## Fields to exclude
* We'll create an array of fields we don't want to match 

```
// MORE CODE

exports.getBootcamps = async (req, res, next) => {
  // Create query string
  let queryStr = JSON.stringify(req.query);

  // Create opeartors ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  console.log(reqQuery);
  // Finding resource
  const query = Bootcamp.find(JSON.parse(queryStr));

  // Executing our query
  const bootcamps = await query;

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
};

// MORE CODE
```

* Try this out in Postman

`{{URL}}/api/v1/bootcamps?house=true&location.state=MA`

* View in Terminal and you'll see we get this in our object `reqQuery`

```
{ house: 'true', 'location.state': 'MA' }
```

* But if I do: `{{URL}}/api/v1/bootcamps?select=name`
    - * And look at the Terminal to see `reqQuery` and it will be empty `{}` (this is because `select` is inside this `removeFields` array, and we loop through them and we delete that from our reqQuery param)
    - Now we are free to use select as we want

## How to use queries in Mongoose
* [docs](https://mongoosejs.com/docs/queries.html)

```
// selecting the `name` and `occupation` fields
query.select('name occupation');
```

* We currently are using `{{URL}}/api/v1/bootcamps?select=name,description` and we'll need to use `{{URL}}/api/v1/bootcamps?select=name description` (we'll use JavaScript to change comma to space)
    - This is where doing coding challenges in JavaScript comes in handy (aka algos)

```
// MORE CODE

exports.getBootcamps = async (req, res, next) => {
  // Create query string
  let queryStr = JSON.stringify(req.query);

  // Create opeartors ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  console.log(reqQuery);
  // Finding resource
  const query = Bootcamp.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',');
    console.log(fields);
  }

  // Executing our query
  const bootcamps = await query;

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
};

// MORE CODE
```

* This will output

```
[ 'name', 'description' ]
```

* And we want to turn this back into a string and add a space

```
// MORE CODE

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    console.log(fields);
  }

// MORE CODE
```

* Will give you `name description`
* Now we just take our query and we add on our select and we pass it our fields

## New to fix the code and here it is:
```
// MORE CODE

exports.getBootcamps = async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create opeartors ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);

    console.log(query);
  }

  // Executing our query
  const bootcamps = await query;

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
};

// MORE CODE
```

* Now you can query like this:

```
// MORE CODE

{{URL}}/api/v1/bootcamps?select=name
// MORE CODE
```

* And you'll see `_id` (by default this is included) and whatever fields you search for (name)
* Let's try `name and description`

```
{{URL}}/api/v1/bootcamps?select=name,description
```

## And we combine sorting and filtering
```
{{URL}}/api/v1/bootcamps?select=name,description&housing=true
```

## We can also easily add `sorting`
* [sort mongoose docs](https://mongoosejs.com/docs/api/query.html#query_Query-sort)
* **note** `1` is ascending and `-1` is descending
* Our default sort will be date in descending order

```
// MORE CODE

exports.getBootcamps = async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create opeartors ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Executing our query
  const bootcamps = await query;

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
};

// MORE CODE
```

## Test and sort by name
* To make it easy to see I also just show name field in results

```
{{URL}}/api/v1/bootcamps?sort=name&select=name
```

* To search the other way just change to -name

```
{{URL}}/api/v1/bootcamps?sort=-name&select=name
```
