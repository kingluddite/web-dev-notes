# Fetching Bootcamp - GET
* **note** Mongoose methods return a promise
* Add async/await
* Add try/catch

`controller-bootcamps.js`

* This will fetch all bootcamps

```
// MORE CODE

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({ success: true, data: bootcamps });
  } catch (error) {
    res.status(400).json({ success: false });
  }
  res.status(200).json({
    success: true,
    msg: 'Show all bootcamps',
    error: null,
  });
};

// MORE CODE
```

* In Postman use GET route `/api/v1/bootcamps` and you'll see all bootcamps

## Now we need to just get one bootcamp
* To do this we'll need to use `findById()` and we'll pass it `req.params.id`
    - req.params.id will grab the id from the URL

`controller-bootcamps.js`

```
// MORE CODE

// @desc     Get bootcamp
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
// MORE CODE
```

* Then grab an `id` from MongoDB, copy to clipboard
  - Or if you have the Get all bootcamps you can grab it from there (in Postman)
* Past the URL into Postman `{{URL}}/api/v1/bootcamps/5ec0b97da72140a3ac1225a7`
    - Use a GET method request
* Hit send in Postman
* You will see one bootcamp (the one with the id you were looking for)

## What happens if we have a correctly formatted id but it's not in our Database
* Change the last number in the id in your URL `{{URL}}/api/v1/bootcamps/5ec0b97da72140a3ac1225a8`
* Hit send again
* You will INCORRECTLY get a 200 success status and success is true
* This is wrong
    - We'll need to fix this problem
* But if you add another number to end of URL you will get the catch error handler triggering a success false and 400 Bad Request

## Let's fix it so if we search for a correctly formatted id but doesn't exist in our Database generate an error

`controller-bootcamps.js`

```
// MORE CODE

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
// MORE CODE
```

* We add an `if` that makes sure to check the `bootcamp` exists in our Database

### Houston we have a problem!
* Within our `try` block we have 2 responses `res` and this will give us an error when we hit send with:

```
Error: Cannot set headers after they are sent to the client
[nodemon] app crashed - waiting for file changes before starting...
```

* You can't send 2 responses so you need to return the first one so it won't go to the 2nd one (in the try block)

#### return the first response
`controller-bootcamps.js`

```
// MORE CODE

// @desc     Get bootcamp
// @route    GET /api/v1/bootcamps/:id
// @access   Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const { id: bootcampIdReq } = req.params;
    const bootcamp = await Bootcamp.findById(bootcampIdReq);
    // search for a correctly formatted id but doesn't exist in our Database generate an error
    if (!bootcamp) {
      // IMPORTANT! You can't send 2 responses so you need to return the first one so it won't go to the 2nd one
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// MORE CODE
```

### Tip: Make sure you handle both situations with both responses in try block
* Hit send again and now if you URL is correctly formatted but the `id` is not one of your bootcamps you will get `success: false` in the response body
    - And we get our 400 Bad request server status

# Next - Update and Delete of CRUD
