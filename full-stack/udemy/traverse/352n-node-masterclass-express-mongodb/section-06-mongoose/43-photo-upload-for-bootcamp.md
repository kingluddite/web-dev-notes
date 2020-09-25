# Photo upload for bootcamp
* Comment out the console log

`models/Course.js`

```
// MORE CODE

// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
    // console.log('Calculating avg cost...'.blue);

// MORE CODE
```

## Set database back up like this:
* Make sure averageCost is not in `bootcamps.json`
* In seeder comment in the the creation of Courses

`_data/seeder.js`

```
// MORE CODE

// Import into Database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);

// MORE CODE
```

## Run the delete and import again
```
$ node seeder -d
$ node seeder -i
```

## express-fileupload
* Now we'll allow file uploads
* [express-fileupload repo](https://github.com/richardgirges/express-fileupload)

`$ npm i express-fileupload`

## Do I have other choices?
* Yes
    - Multer
    - Busboy
    - Multiparty
    - Formidable
    - [docs](https://bytearcher.com/articles/formidable-vs-busboy-vs-multer-vs-multiparty/)
    - You could also upload to other services like Amazon S3

`server.js`

```
const colors = require('colors'); // eslint-disable-line no-unused-vars
const fileupload = require('express-fileupload'); // ADD!
// End of 3rd Party
const error = require('./middleware/error'); // custom error handler

// MORE CODE
```

## Add the middleware to use this
`server.js`

```
// MORE CODE

// File uploading
app.use(fileupload());

// MORE CODE
```

## Now add our controller method
`controllers/bootcamps.js`

```
// MORE CODE

// @desc    Upload a photo for bootcamp
// @route   PUT /api/v1/bootcamps/:id/photo
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

  // Check to see if a file was uploaded
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
})

// MORE CODE
```

 * The route will be a PUT request (Because we are updating our bootcamp resourse)

`// @route   PUT /api/v1/bootcamps/:id/photo`

## Now let's work on our route
`routes/api/v1/bootcamps.js`

```
// MORE CODE

const express = require('express');
const {
    getBootcamp,
    getBootcamps,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload // ADD!
} = require('../../../controllers/bootcamps');

// MORE CODE

// /api/v1/bootcamps
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

// /api/v1/bootcamps/:id/photo
router.route('/:id/photo').put(bootcampPhotoUpload); // ADD!

// MORE CODE
```

## Test in Postman (without an image first)
`PUT {{URL}}:{{PORT}}/api/v1/bootcamps/{{bootcampId}}/photos`

* Click Send
* You will get this response with 400 Bad Request error

```
{
    "success": false,
    "error": "Please upload a file"
}
```

### Save Bootcamps collection route to Postman
`name`: Upload a photo
`desc`: Route to upload a bootcamp photo

### Grab an image
* from `pexels.com` (free stock footage)
* Search for `computer` image and download `small` image (from dropdown)
* Rename image to `bootcamp.jpg`

### In Postman we need to test and change some settings
* Select `Body` tab
    - Type `file` as the key
    - Make sure to select `File` from dropdown (`Text` is default value)
    - For the value (Text is default) but you need to choose `File`

![choose File for value instead of Text](https://i.imgur.com/j8UWAgU.png)

* After doing that you can select a file (just like you can with a frontend application)
* Choose our downloaded `bootcamp.jpg` file and click `Send`
* It won't do anything because we didn't send a response back yet

### See if our file shows up
`controllers/bootcamps.js`

```
// MORE CODE
  // Check to see if a file was uploaded
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  console.log(req.files.file);
})
```

* In Postman click to send again
* And we get this in our terminal console

```
{
  name: 'bootcamp.jpg',
  data: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 48 00 48 00 00 ff e2 0c 58 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 0c 48 4c 69 6e 6f 02 10 00 00 ... 45577 more bytes>,
  size: 45627,
  encoding: '7bit',
  tempFilePath: '',
  truncated: false,
  mimetype: 'image/jpeg',
  md5: 'ac955209a4f9ac02eae27d42a4652e77',
  mv: [Function: mv]
}
```

* We get a `file` object
* With the name
* The data (just a buffer by default)
* Size
* encoding
* mimetype (image/jpeg)
* And we get all of that from `req.files.file`

## check if it is an image
* When you have a jpeg, gif or png it will always be `image/` + `png` or `jpeg` or `gif`
    - So instead of checking for each one (like using a `switch`) we save some typing by using the JavaScript `startsWith()` method
    - So we send an ErrorResponse if it DOES NOT start with `image`

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

  // Check to see if a file was uploaded
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }
});

// MORE CODE
```

## Now test our code in Postman
* Upload something that is not an image file (I chose a `.zip` file)
* You will get

```
{
    "success": false,
    "error": "Please upload an image file"
}
```

## Now we need to check the file size
* If you are using `Nginx` you probably have a size limit

### Add some stuff to our config file
* We'll add a path pointing to where our uploads will be `./public/uploads`
* We'll set our max file upload to be `1000000`
    - This is in bytes (so 1 million bytes) which is 1MB
* **BEST PRACTICE** Have this stuff in your config so you can easily change it

`config/config.env`

```
// MORE CODE

FILE_UPLOAD_PATH= ./public/uploads
MAX_FILE_UPLOAD=1000000
```

## Restart Server!
* Since we added some environment variables

## Now we'll check file size
* There is a function called `mv` which will allow us to move it to a directory we want

### Custom file names
* This is also important because if someone else uploads a custom file name that is the same, it will just overwrite the previous image with that same name (We obviously don't want that!)
    - A good naming convention will be `photo_` + **id of the bootcamp** (1 photo per bootcamp)

```
// MORE CODE
  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
  }

  // Create custom filename
  file.name = `photo_${bootcamp.id}`;

  console.log(file.name);
});
```

* When you `Send` from Postman you'll get this:

`photo_5d725a1b7b292f5f8ceff788`

* **note** We don't have the extension

### How are we going to get the extension of the file?
* We can use the `path` module
    - What is the `path` module?
        + `path` is a core `Node.js` module for dealing with file paths which gives you some useful utilities
        + `path` has a method called **path.parse()**
            * And we can get the extension use `path.parse(file.name).ext`

`controllers/bootcamps.js`

```
const path = require('path'); // ADD!
const Bootcamp = require('../models/Bootcamp');

// MORE CODE

  // Create custom filename
  file.name = `photo_${bootcamp.id}${path.parse(file.name).ext}`;
  console.log(file.name);

});
```

* And we can now see the custom name with the correct extension

`photo_5d725a1b7b292f5f8ceff788.jpg`

* **note** Another option for filenames is to use a timestamp

### Move the file to `public/uploads`
```
// MORE CODE
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

## Create a new `public` folder
* And create a folder called `uploads` inside it (that is in our environment varariable FILE_UPLOAD_PATH)
* We need to make this public folder to be our `static` folder (This means we can go to whatever our domain is slash (/) whatever the image name is )
    - Lots of ways to do this
    - We want to be able to access the image in the browser

`server.js`

```
// MORE CODE

const path = require('path');
const dotenv = require('dotenv').config({path: './config/config.env'});

// MORE CODE

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public'))); // ADD!

// MORE CODE
```

## Finally test in Postman
* Send
* **note** Make sure you create `public/uploads` or you'll get an error!
* You will get this response

```
{
    "success": true,
    "data": "photo_5d725a1b7b292f5f8ceff788.jpg"
}
```

* Look and you'll see them image

![image is now where you wanted it!](https://i.imgur.com/wM4mqbS.png)

## View image in browser
* Since `public` is our static folder we don't have to use it in the static path

`http://localhost:5000/uploads/photo_5d725a1b7b292f5f8ceff788.jpg`

* And you will see the uploaded image on your server in the browser!

## Next
* Use all our filter, sort... as middleware
* Then we can use it for all the other resources and make our code more modular
