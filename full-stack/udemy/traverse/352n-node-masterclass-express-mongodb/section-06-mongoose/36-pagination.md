# Pagination
## Postman
`GET {{URL}}/api/v1/bootcamps?limit=2`

* We rut that request in Postman and get a 200

```
{
    "success": true,
    "count": 0,
    "data": []
}
```

* We get nothing back because it is trying to make `limit` like a field
* So we need to add `limit` to that array of `removeFields`
* **note** We also want to add a page like this:

`GET {{URL}}/api/v1/bootcamps?page-2&limit=2`

`controllers/bootcamps.js`

* We add `page` and `limit` to our **removeFields** array

```
// MORE CODE

  // Fields to exclude
  // An array of fields that we don't want to be matched for filtering
  const removeFields = ['select', 'sort', 'page', 'limit'];

// MORE CODE
```

* `page` will be a **string** and we need to turn that into a `number`
    - So we'll use `parseInt(string, radix)` (10 is default radix)
    - We will add a default of `1` (page 1 will be the default unless otherwise specified)
* `limit` will be a **string** and we need to turn that into a `number`
    - So we'll use `parseInt(string, radix)` (10 is default radix)
    - We will add a default of `100` (100 results per page will be the default unless otherwise specified)

`controllers/bootcamps.js`

```
// MORE CODE

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 100;

  // Executing query
  const bootcamps = await query;

// MORE CODE
```

## skip
* We will use `(page - 1) * limit` and that will give us the correct amount to skip

## Test it out in Postman
* Let's grab 2 camps with and select their name

**GET** `{{URL}}/api/v1/bootcamps?limit=2&select=name`

* The output

```
{
    "success": true,
    "count": 2,
    "data": [
        {
            "_id": "5d725a1b7b292f5f8ceff788",
            "name": "Devcentral Bootcamp"
        },
        {
            "_id": "5d713a66ec8f2b88b8f830b8",
            "name": "ModernTech Bootcamp"
        }
    ]
}
```

* Now if we want to go to the 2nd page, we can grab the other two camps

`{{URL}}/api/v1/bootcamps?page=2&limit=2&select=name`

* And the result

```
{
    "success": true,
    "count": 2,
    "data": [
        {
            "_id": "5d725a037b292f5f8ceff787",
            "name": "Codemasters"
        },
        {
            "_id": "5d713995b721c3bb38c1f5d0",
            "name": "Devworks Bootcamp"
        }
    ]
}
```

## Test out the default limit (let's change it to one per page)
```
// MORE CODE

  const limit = parseInt(req.query.limit, 10) || 1;
  const skip = (page - 1) * limit;

// MORE CODE
```

* And if we test it out

`{{URL}}/api/v1/bootcamps?select=name`

* We see we only get one result back

## Go to page 2
`{{URL}}/api/v1/bootcamps?select=name&page=2`

* We still only get one result because we are still using the default limit of `1`
* We could do this for page 3 and 4 but when we get to page 5 we get nothing because we have not more documents

## pagination
* We need to add this in what we return to the client so that we always have the next page and previous page
    - This will make it easy for us to add links to previous and next for pagination on the frontend
    - We will also make `skip` available on the frontend as well
* We will change `skip` to **startIndex**
* And we'll add **endIndex**
* And to total up all the documents we'll use a **mongoose** method `countDocuments()`

`controller/bootcamps.js`

```
// MORE CODE

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  // count up all the bootcamps
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const bootcamps = await query;

  // Pagination result
  const pagination = {};

  // if we don't have a last page don't show it
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  // if we don't have a previous page don't show it
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  // When we get all bootcamps let's also get back the length of the bootcamps
  // We'll include our pagination object in our reponse
  res
    .status(200)
    .json({success: true, count: bootcamps.length, pagination, data: bootcamps});

  // return res.status(400).json({ success: false });
  // next(new ErrorResponse(`No bootcamps found`, 404));
});

// MORE CODE
```

## Test in Postman
* Now our API is looking like an API
* Here is what we send back to the client
    - **note** There is no `prev` because we are on page 1

```
{
    "success": true,
    "count": 1,
    "pagination": {
        "next": {
            "page": 2,
            "limit": 1
        }
    },

// MORE CODE
```

## Let's move to page 2
`{{URL}}/api/v1/bootcamps?page=2`

* Now we have `next` and `prev`
* We can use this on the client to easily create pagination links
    - Because we have the next page, previous page and the limit (all available to you right from the API)

```
// MORE CODE

{
    "success": true,
    "count": 1,
    "pagination": {
        "next": {
            "page": 3,
            "limit": 1
        },
        "prev": {
            "page": 1,
            "limit": 1
        }
    },
// MORE CODE
```

* And if we go to the 4th page
    - You will see there is not next page

`{{URL}}/api/v1/bootcamps?page=4`

```
{
    "success": true,
    "count": 1,
    "pagination": {
        "prev": {
            "page": 3,
            "limit": 1
        }
    },
// MORE CODE
```

## Let's change our limit from `1` to `25`
```
// MORE CODE

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25; // update this line

// MORE CODE
```

* Let's search all bootcamps using the default of 25

`{{URL}}/api/v1/bootcamps`

* And we see that pagination is empty because there is not prev or next

```
{
    "success": true,
    "count": 4,
    "pagination": {},

// MORE CODE
```

## Later - modularize this
* We'll take all this stuff and use it in middleware so we can use it in multiple places
* This will enable us to add pagination, sorting, selecting for all resources

## Next
* Create new courses resource
    - new model
    - new router
    - new controller method
* And we need to create a relationship between bootcamps and courses 
