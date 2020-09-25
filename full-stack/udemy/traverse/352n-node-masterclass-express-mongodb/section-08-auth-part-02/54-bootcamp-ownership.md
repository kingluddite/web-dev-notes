# Bootcamp ownership
* We want to deal with permissions as it pertains to `updating` and `deleting` bootcamps
* Currently we have just one `bootcamp`

## Run the getAllBootcamps request
`GET  {{DOMAIN}}:{{PORT}}/api/v1/bootcamps`

* We see one bootcamp in the response

```
{
    "success": true,
    "count": 2,
    "pagination": {},
    "data": [
        {
            "location": {
                "type": "Point",
                "coordinates": [
                    -71.104028,
                    42.350846
                ],
                "formattedAddress": "233 Bay State Rd, Boston, MA 02215-1405, US",
                "street": "233 Bay State Rd",
                "city": "Boston",
                "state": "MA",
                "zipcode": "02215-1405"
            },
            "careers": [
                "Web Development",
                "UI/UX",
                "Business"
            ],
            "photo": "no-phone.jpg",
            "housing": true,
            "jobAssistance": true,
            "jobGuarantee": false,
            "acceptGi": true,
            "_id": "5f68c51fcd621beaf3a8bab1",
            "name": "Devworks Bootcamp",
            "description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer",
            "website": "https://devworks.com",
            "phone": "(111) 111-1111",
            "email": "enroll@devworks.com",
            "user": "5f681dceea2a49be7e7684f0",
            "createdAt": "2020-09-21T15:22:07.554Z",
            "slug": "devworks-bootcamp",
            "__v": 0,
            "courses": [],
            "id": "5f68c51fcd621beaf3a8bab1"
        },
        {
            "location": {
                "type": "Point",
                "coordinates": [
                    -71.104028,
                    42.350846
                ],
                "formattedAddress": "233 Bay State Rd, Boston, MA 02215-1405, US",
                "street": "233 Bay State Rd",
                "city": "Boston",
                "state": "MA",
                "zipcode": "02215-1405"
            },
            "careers": [
                "Web Development",
                "UI/UX",
                "Business"
            ],
            "photo": "no-phone.jpg",
            "housing": true,
            "jobAssistance": true,
            "jobGuarantee": false,
            "acceptGi": true,
            "_id": "5f681e4fea2a49be7e7684f1",
            "name": "Test",
            "description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer",
            "website": "https://devworks.com",
            "phone": "(111) 111-1111",
            "email": "enroll@devworks.com",
            "user": "5f681dceea2a49be7e7684f0",
            "createdAt": "2020-09-21T03:30:23.615Z",
            "slug": "test",
            "__v": 0,
            "courses": [],
            "id": "5f681e4fea2a49be7e7684f1"
        }
    ]
}
```

* The logged in user is added to this bootcamp on creation
    - The user id (logged in user) is `5f681e4fea2a49be7e7684f1`

## Who is the current logged in user?
* Jane Doe
* I know that from this request

`GET {{DOMAIN}}:{{PORT}}/api/v1/auth/me`

```
{
    "success": true,
    "data": {
        "role": "admin",
        "_id": "5f681dceea2a49be7e7684f0",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "createdAt": "2020-09-21T03:28:14.620Z",
        "__v": 0
    }
}
```

## But what happens if I create another user?
* I will show that currently any user can update or delete this bootcamp

### Create another user
`POST {{DOMAIN}}:{{PORT}}/api/v1/auth/register`

```
{
    "name": "John Doe",
    "email": "jdoe@example.com",
    "password": "123456",
    "role": "publisher"
}
```

## Small fix
### Houston we have a problem!
* When running the bootstrap update request I get an error status that is not helpful
* Here is my current controller

`controllers/bootcamp.js`

```
    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        // when we get our response we want the data to be the **updated** data
        new: true,
        // run our mongoose validators on update
        runValidators: true,
    });

    // make sure bootcamp exists
    if (!bootcamp) {
        // return to prevent "headers already sent error"
        return res.status(400).json({success: false});
    }

    // We only send a status of `200` (not 201)
    // because we are not creating a new resource just modifying an existing resource
    res.status(200).json({
        success: true,
        msg: `Update a bootcamp with ${req.params.id}`,
        error: null,
        data: bootcamp,
    });

    next(`A bootcamp with the id ${req.params.id} could not be updated`, 404);
})
```

* Let's try to update the bootcamp with:

`PUT  {{DOMAIN}}:{{PORT}}/api/v1/bootcamps/{{bootcampId}}`

* And the response in Postman with from this request:

```
{
    "success": false
}
```

* That is not very helpful
* We need to call our custom error
* **note** If your code is different than mine, disregard this instruction as I may have altered this code accidentally

```
// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({success: true, data: bootcamp});
});
```

## Test again
* Now when we run the same update bootcamp request as before we get a more explanatory error

```
{
    "success": false,
    "error": "Bootcamp not found with id of 5d713a66ec8f2b88b8f830b8"
}
```

* I update the request with the correct bootcamp `id` by using the `getAllBootcamps` request

`GET  {{DOMAIN}}:{{PORT}}/api/v1/bootcamps`

* And I grab the `_id` from this bootcamp which is `5f68c51fcd621beaf3a8bab1`
* And I append that to the update request

`PUT  {{DOMAIN}}:{{PORT}}/api/v1/bootcamps/5f68c51fcd621beaf3a8bab1`

* And this is the body of content I am updating (description)

```
{
    "description": "Let's update the description for this bootcamp"
}
```

* And in the result I see the description was updated

## So with a different user I can update a bootcamp I did not create (aka I do not own)
* Also try to delete this bootcamp

`DELETE  {{DOMAIN}}:{{PORT}}/api/v1/bootcamps/5f68c51fcd621beaf3a8bab1`

```
{
    "success": true,
    "data": {}
}
```

## Houston we have a problem!
* You should not be able to update or delete bootcamps you do not "own"
    - Unless you have a role of `admin`

## Solution
* We'll add logic that makes sure the bootcamp exists and the user owns the bootcamp or has a role of `admin`
* Compare the bootcamp user id (`req.user`) and the `id` in the URL (req.params.id)

### Let's log out what type of data bootcamp.user is
`controllers/bootcamps.js`

```
    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    console.log(bootcamp.user); // 5f68c631cd621beaf3a8bab2
```

* But if you check it's type you will see it is an object!

```
    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    console.log(typeof bootcamp.user); // object
```

* Why is that `id` an Object?
    - Because it is an `ObjectId`
    - If you remember in our relationship we created in our Bootcamp model:

`models/Bootcamp.js`

```
// MORE CODE

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    }

// MORE CODE
```

* And an `ObjectId` is an **object** data type

## How can we compare an ObjectId to a string?
* We need to compare the user id (which is an ObjectId) with the `req.params.id` (which is a string)

```
// MORE CODE

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    console.log(typeof bootcamp.user.toString()); // string

// MORE CODE
```

* Now we can build our logic
    - The user `id` is not equal to the URL `id`
    - AND
    - The user role is not "admin"

`controllers/bootcamps.js`

```
// MORE CODE

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.params.id && req.user.role !== 'admin') {
        console.log('You do not own this bootcamp AND you are not an Admin');
    }

// MORE CODE
```

* And if you are logged in as John Doe and try to alter Jane's bootcamp you will get this log in the console

```
You do not own this bootcamp AND you are not an Admin
```

* A better way would be to use our custom error code and send the user id with an informative error message
    - The status code will be 401 "Not Authorized"

```
// MORE CODE

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.params.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`User ${req.params.id} is not authorized to update this bootcamp`, 401)
        );
    }

// MORE CODE
```

* And now when we try to update we get this error sent in the response

```
{
    "success": false,
    "error": "User 5f68cc6d699cb4a9d28610c0 is not authorized to update this bootcamp"
}
```

## Houston we have a problem
* The order of our code is wrong
* The `findByIdAndUpdate` will run before all of our logic
* We need to move stuff around

### Solution
1. We'll first just grab the user by the id
2. Do our logic checks
3. Then we'll do our `findByIdAndUpdate()`

* Here is our updated code

`controllers/bootcamps.js`

```
// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.params.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`User ${req.params.id} is not authorized to update this bootcamp`, 401)
        );
    }

    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        // return the updated bootcamp
        new: true,
        runValidators: true
    });

    res.status(200).json({success: true, data: bootcamp});
});
```

* Try to update with John Doe's user account - you won't be able to
* Log in with Jane Doe's user account and you will be able to update

## We want to user our same logic check in our delete bootcamp inside our controller
* Yes, this is not DRY (we can fix later)

```
// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    // Make sure bootcamp exists
    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        )
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.params.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`User ${req.params.id} is not authorized to update this bootcamp`, 401)
        );
    }

    bootcamp.remove();

    res.status(200).json({success: true, data: {}});
})
```

* Now you won't be able to delete a bootcamp owned by jane with john
* But you can delete it logged in as jane

## Add the same permission check for photo upload

`controllers/bootcamps.js`

```
// MORE CODE

// @desc    Upload a photo for bootcamp
// @route   PUT /api/v1/bootcamps/:id/photos
// @access  Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
    // Find the bootcamp by id
    const bootcamp = await Bootcamp.findById(req.params.id);

    // Check to make sure there is a bootcamp
    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        )
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.params.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`User ${req.params.id} is not authorized to update this bootcamp`, 401)
        );
    }

    // Check to see if a file was uploaded
    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    // Create custom filename
    file.name = `photo_${bootcamp.id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.log(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        await Bootcamp.findByIdAndUpdate(req.params.id, {photo: file.name});

        res.status(200).json({
            success: true,
            data: file.name
        })
    })

});
```

## Completed controller
`controllers/bootcamps.js`

```
// MORE CODE

const path = require('path');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {

    // When we get all bootcamps let's also get back the length of the bootcamps
    // We'll include our pagination object in our reponse
    res
        .status(200)
        .json(res.advancedResults);
});

// @desc     Get bootcamp
// @route    GET /api/v1/bootcamps/:id
// @access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const {id: bootcampIdReq} = req.params;
    const bootcamp = await Bootcamp.findById(bootcampIdReq);

    // search for a correctly formatted id but doesn't exist in our Database generate an error
    if (!bootcamp) {
        // IMPORTANT! You can't send 2 responses so you need to return the first one so it won't go to the 2nd one
        // return res.status(400).json({success: false});
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${bootcampIdReq}`, 404)
        )
    }

    res.status(200).json({success: true, data: bootcamp});
});


// @desc    Create a bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    // Add user id to req.body
    req.body.user = req.user.id;

    // Check for published bootcamp
    const publishedBootcamp = await Bootcamp.findOne({user: req.user.id});

    // If the user is not an admin, they can only add one bootcamp
    if (publishedBootcamp && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`The user with ID ${req.user.id} has already published a bootcamp`, 400
            )
        );
    }

    const bootcamp = await Bootcamp.create(req.body);

    return res.status(201).json({
        success: true,
        msg: 'Create a bootcamp',
        data: bootcamp,
        error: null,
    });
})

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id);

    // Check to make sure there is a bootcamp
    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.params.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`User ${req.params.id} is not authorized to update this bootcamp`, 401)
        );
    }

    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        // return the updated bootcamp
        new: true,
        runValidators: true
    });

    res.status(200).json({success: true, data: bootcamp});
});

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    // Check to make sure there is a bootcamp
    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        )
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.params.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`User ${req.params.id} is not authorized to update this bootcamp`, 401)
        );
    }

    bootcamp.remove();

    res.status(200).json({success: true, data: {}});
})

// @desc Get bootcamps within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const {zipcode, distance} = req.params;

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 3963;
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: {
            $geoWithin: {$centerSphere: [[lng, lat], radius]}
        }
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
})

// @desc    Upload a photo for bootcamp
// @route   PUT /api/v1/bootcamps/:id/photos
// @access  Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
    // Find the bootcamp by id
    const bootcamp = await Bootcamp.findById(req.params.id);

    // Check to make sure there is a bootcamp
    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        )
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.params.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`User ${req.params.id} is not authorized to update this bootcamp`, 401)
        );
    }

    // Check to see if a file was uploaded
    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    // Create custom filename
    file.name = `photo_${bootcamp.id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.log(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        await Bootcamp.findByIdAndUpdate(req.params.id, {photo: file.name});

        res.status(200).json({
            success: true,
            data: file.name
        })
    })

});

// MORE CODE
```

## Quick fix
* I made a mistake and was user `req.params.id` for permissions when I should have used `req.user.id`
* Here are the updated files:

`controllers/bootcamps.js`

```
const path = require('path');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {

    // When we get all bootcamps let's also get back the length of the bootcamps
    // We'll include our pagination object in our response
    res
        .status(200)
        .json(res.advancedResults);
});

// @desc     Get bootcamp
// @route    GET /api/v1/bootcamps/:id
// @access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const {id: bootcampIdReq} = req.params;
    const bootcamp = await Bootcamp.findById(bootcampIdReq);

    // search for a correctly formatted id but doesn't exist in our Database generate an error
    if (!bootcamp) {
        // IMPORTANT! You can't send 2 responses so you need to return the first one so it won't go to the 2nd one
        // return res.status(400).json({success: false});
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${bootcampIdReq}`, 404)
        )
    }

    res.status(200).json({success: true, data: bootcamp});
});


// @desc    Create a bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    // Add user id to req.body
    req.body.user = req.user.id;

    // Check for published bootcamp
    const publishedBootcamp = await Bootcamp.findOne({user: req.user.id});

    // If the user is not an admin, they can only add one bootcamp
    if (publishedBootcamp && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`The user with ID ${req.user.id} has already published a bootcamp`, 400
            )
        );
    }

    const bootcamp = await Bootcamp.create(req.body);

    return res.status(201).json({
        success: true,
        msg: 'Create a bootcamp',
        data: bootcamp,
        error: null,
    });
})

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id);

    // Check to make sure there is a bootcamp
    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`User ${req.user.id} is not authorized to update this bootcamp`, 401)
        );
    }

    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        // return the updated bootcamp
        new: true,
        runValidators: true
    });

    res.status(200).json({success: true, data: bootcamp});
});

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    // Check to make sure there is a bootcamp
    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        )
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`User ${req.user.id} is not authorized to delete this bootcamp`, 401)
        );
    }

    bootcamp.remove();

    res.status(200).json({success: true, data: {}});
})

// @desc Get bootcamps within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const {zipcode, distance} = req.params;

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 3963;
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: {
            $geoWithin: {$centerSphere: [[lng, lat], radius]}
        }
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
})

// @desc    Upload a photo for bootcamp
// @route   PUT /api/v1/bootcamps/:id/photos
// @access  Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
    // Find the bootcamp by id
    const bootcamp = await Bootcamp.findById(req.params.id);

    // Check to make sure there is a bootcamp
    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        )
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`User ${req.user.id} is not authorized to upload this bootcamp photo`, 401)
        );
    }

    // Check to see if a file was uploaded
    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    // Create custom filename
    file.name = `photo_${bootcamp.id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.log(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        await Bootcamp.findByIdAndUpdate(req.params.id, {photo: file.name});

        res.status(200).json({
            success: true,
            data: file.name
        })
    })

});
```

`controllers/courses.js`

```
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// @desc     Get courses
// @route    GET /api/v1/courses
// @route    GET /api/v1/bootcamps/:bootcampId/courses
// @access   Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    // Check if `:bootcampId` exists
    if (req.params.bootcampId) {
        //   If it does then we just get the courses from the bootcamps
        const courses = await Course.find({bootcamp: req.params.bootcampId})

        return res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } else {
        //   If it DOES NOT then we'll get all of the courses
        res
            .status(200)
            .json(res.advancedResults);
    }

})

// @desc     Get single course
// @route    GET /api/v1/courses/:id
// @access   Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if (!course) {
        return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404);
    }

    // console.log(course);

    res.status(200).json({
        success: true,
        data: course
    })
})

// @desc    Create a course 
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @access  Private
exports.createCourse = asyncHandler(async (req, res, next) => {
    // grab bootcamp id from URL
    req.body.bootcamp = req.params.bootcampId;
    // grab user id from logged in user
    req.body.user = req.user.id;

    // grab the bootcamp by it's id
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
        return next(
            new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId} exists`, 404)
        )
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`User ${req.user.name} (${req.user.id}) is not authorized to add a course to bootcamp ${bootcamp.name} (${bootcamp._id})`, 401)
        );
    }

    // We now have the bootcampId attached to the req.body
    const course = await Course.create(req.body);

    return res.status(201).json({
        success: true,
        msg: 'Create a course',
        data: course,
        error: null,
    });
})

// @desc    Update a course 
// @route   PUT /api/v1/courses/:id
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
    // grab the bootcamp by it's id
    let course = await Course.findById(req.params.id);

    if (!course) {
        return next(
            new ErrorResponse(`No course with the id of ${req.params.id} exists`, 404)
        )
    }

    // Make sure user is course owner
    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`User ${req.user.name} (${req.user.id}) is not authorized to update a course to bootcamp ${course.name} (${course._id})`, 401)
        );
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // so it returns the new version of the course
        runValidators: true
    });

    return res.status(201).json({
        success: true,
        msg: 'Update a course',
        data: course,
        error: null,
    });
})

// @desc    Delete a course 
// @route   DELETE /api/v1/courses/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    // grab the bootcamp by it's id
    const course = await Course.findById(req.params.id);

    // Did we find a course that we want to delete?
    if (!course) {
        return next(
            new ErrorResponse(`No course with the id of ${req.params.id} exists`, 404)
        )
    }

    // Make sure user is course owner
    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`User ${req.user.name} (${req.user.id}) is not authorized to update a course to bootcamp ${course.name} (${course._id})`, 401)
        );
    }

    // TODO: Add user to req.body
    // We need to use the mongodb remove() method because we will be adding middleware later
    // and it won't trigger if we use Course.findOneAndDelete()
    await course.remove(); // we don't need to store this in a variable
    return res.status(200).json({
        success: true,
        msg: 'Delete a course',
        data: {}, // standard is to return an emtpy object in the response
        error: null,
    });
})
```

## Next
* Do the same permissions check for courses
