# Populate, Virtuals and Cascade Delete
* Right now when we use this Route request

`{{URL}}/api/v1/courses`

* We only get the course `id`

![only course id](https://i.imgur.com/HqKA2QL.png)

## Let's populate this document with some bootcamp data
* To do this we just add `.populate()` like this
* Our existing courses controller:

`controllers/courses.js`

```
// MORE CODE

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  // Check if `:bootcampId` exists
  if (req.params.bootcampId) {
    //   If it does then we just get the courses from the bootcamps
    query = Course.find({bootcamp: req.params.bootcampId})
  } else {
    //   If it DOES NOT then we'll get all of the courses
    query = Course.find();
  }

// MORE CODE
```

* And now let's add populate like this:

```
// MORE CODE

  } else {
    //   If it DOES NOT then we'll get all of the courses
    query = Course.find().populate('bootcamp');
  }

// MORE CODE
```

## Test again in Postman
`{{URL}}/api/v1/courses`

* And now we see that the bootcamp inside the course has been populated with all of the bootcamp's data

## But a lot of times you don't want to populate the entire bootcamp
* You could just pass in selected data from a bootcamp
* Just pass an object with a path pointing to the resource name
    - And `select` key with a string of space separated values for the fields you want to be populated with values
    
`controllers/courses.js`

```
// MORE CODE

  } else {
    //   If it DOES NOT then we'll get all of the courses
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description'
    });
  }

// MORE CODE
```

## Test again in Postman
* And if you run the route request from before again we'll get:

```
// MORE CODE

"minimumSkill": "beginner",
            "bootcamp": {
                "_id": "5d713995b721c3bb38c1f5d0",
                "name": "Devworks Bootcamp",
                "description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer"
            },
// MORE CODE
```

## Mongoose Virtuals
* A virtual is a property that is not stored in MongoDB

### Let's do a "reverse populate"
* Where when we get all bootcamps, in that I want to show an array of courses
    - This is more difficult because we have to use something called "virtuals"
    - We have to create a "virtual attribute" that's not really in the collection in our Database (it's virtual - think of it like a mock field)
    - We need to add this "virtual field" in the model we want that data to show
    - [documentation for mongoose virtuals](https://mongoosejs.com/docs/tutorials/virtuals.html)
* mongoose.Schema accepts a second parameter which contains the definitions for `toObject` and `toJSON`

#
`models/Bootcamp.js`

```
// MORE CODE

const BootcampSchema = new mongoose.Schema({

    // MORE CODE

  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

// MORE CODE
```

### Now we need to create the `virtual` on the Schema
* We pass to `virtual` the field we want to add (which is `courses` - we could call it whatever we want but `courses` makes the most sense in our example)
    - We need to pass a ref to the model we'll be using (which is `Course`)
    - We'll need a `localField` this will be the `_id`
    - The we'll also need a `foreignField` and this will be the field in the course model that we want to pertain to which is `bootcamp`
    - And we'll set `justOne` to false
        + We want to get an array of courses
        + **note** If `justOne: true` is set for the virtual field members, the expected behavior is for members to contain a single object, rather than an array of objects

`models/Bootcamp.js`

```
// MORE CODE
// Reverse populate with virtuals
BootcampSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'bootcamp',
  justOne: false
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);
```

## Now we should be able to "reverse populate"
* If we go into our bootcamps controller

`controllers/bootcamps.js`

```
// MORE CODE

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr))

// MORE CODE
```

* And make this change

```
// MORE CODE

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

// MORE CODE
```

## Test in Postman
* GET `{{URL}}/api/v1/bootcamps`
    - Now we get an array of all the courses

### Postman response
```
// MORE CODE

 "__v": 0,
            "courses": [
                {
                    "scholarshipAvailable": false,
                    "_id": "5d725cfec4ded7bcb480eaa5",
                    "title": "Web Development",
                    "description": "This course will teach you how to build high quality web applications with technologies like React, Node.js, PHP & Laravel",
                    "weeks": "8",
                    "tuition": 8000,
                    "minimumSkill": "beginner",
                    "bootcamp": "5d725a1b7b292f5f8ceff788",
                    "createdAt": "2020-09-13T21:30:47.250Z",
                    "__v": 0
                },
                {
                    "scholarshipAvailable": false,
                    "_id": "5d725cfec4ded7bcb480eaa6",
                    "title": "Software QA",
                    "description": "This course will teach you everything you need to know about quality assurance",
                    "weeks": "6",
                    "tuition": 5000,
                    "minimumSkill": "intermediate",
                    "bootcamp": "5d725a1b7b292f5f8ceff788",
                    "createdAt": "2020-09-13T21:30:47.251Z",
                    "__v": 0
                },
                {
                    "scholarshipAvailable": false,
                    "_id": "5d725cfec4ded7bcb480eaa7",
                    "title": "IOS Development",
                    "description": "Get started building mobile applications for IOS using Swift and other tools",
                    "weeks": "8",
                    "tuition": 6000,
                    "minimumSkill": "intermediate",
                    "bootcamp": "5d725a1b7b292f5f8ceff788",
                    "createdAt": "2020-09-13T21:30:47.251Z",
                    "__v": 0
                }
            ],
            "id": "5d725a1b7b292f5f8ceff788"
        },
// MORE CODE
```

* **note** If you wanted to limit the fields like we did in courses, you could do the same thing we did before
    - Pass an object like this:

```
// MORE CODE

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr)).populate({path: 'courses', select: 'weeks tuition'});

// MORE CODE
```

* And that output response in Postman would look like:

```
// MORE CODE

"__v": 0,
            "courses": [
                {
                    "_id": "5d725cfec4ded7bcb480eaa5",
                    "weeks": "8",
                    "tuition": 8000,
                    "bootcamp": "5d725a1b7b292f5f8ceff788"
                },
                {
                    "_id": "5d725cfec4ded7bcb480eaa6",
                    "weeks": "6",
                    "tuition": 5000,
                    "bootcamp": "5d725a1b7b292f5f8ceff788"
                },
                {
                    "_id": "5d725cfec4ded7bcb480eaa7",
                    "weeks": "8",
                    "tuition": 6000,
                    "bootcamp": "5d725a1b7b292f5f8ceff788"
                }
            ],
            "id": "5d725a1b7b292f5f8ceff788"
        },
// MORE CODE
```

* But we want all the courses' fields so we'll keep it as:

```
// MORE CODE

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

// MORE CODE
```

## Cascade delete
* If we delete a bootcamp all the courses should get deleted too
* We'll add a piece of Mongoose middleware to do that
    - We'll add this to the BootcampSchema
    - We'll use `remove` this time (instead of `pre` which is what we used last time)
    - It will use `async`
    - It will pass the `next` parameter (since this is middleware)
        + We are going to use `this` inside the callback so we will use a **regular** JavaScript function instead of an `arrow` ES6 JavaScript function
        + We point to the Course model using `this.model('course')`
            * Now we can use any mongoose method we want so we'll use `deleteMany()`
                - **IMPORTANT** We only want to delete courses that are part of the bootcamp that is being removed (so we pass `deleteMany` an object with `{ bootcamp: this._id }`)
        + We use `pre` so we do this before we remove courses from a bootcamp (if we used `post` the bootcamp would already be deleted and we would not have access to it)
* When we are finished the last thing is to call `next()` so we continue onto the next middleware
* We'll log out which bootcamp `id` the courses are being removed from

`models/Bootcamp.js`

```
// MORE CODE

// Cascade delete courses when a bootcamp is deleted
BootcampSchema.pre('remove', async function (next) {
  console.log(`Courses being removed from bootcamp ${this._id}`);
  await this.model('Course').deleteMany({bootcamp: this._id});
  next();
});

// Reverse populate with virtuals
BootcampSchema.virtual('courses', {

// MORE CODE
```

## One more important thing to do if we want this Cascade delete to work
* We need to modify our controller
* Since we are using `pre` middleware

`controllers/bootcamps.js`

```
// MORE CODE

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

// MORE CODE
```

* We can't use `findByIdAndDelete()`
    - This method will not trigger the `pre` middleware
    - We can fix this by just calling `findById()` which will get the bootcamp

# Then after we check if we found our bootcamp we then remove it
`controllers/bootcamps.js`

```
// MORE CODE

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    )
  }

  bootcamp.remove(); // ADD THIS!

  res.status(200).json({success: true, data: bootcamp});
  // res.status(400).json({ success: false });
  next(
    new ErrorResponse(
      `A bootcamp with the id ${req.params.id} could not be deleted`,
      404
    )
  );
})

// MORE CODE
```

`bootcamp.remove()` will trigger that middleware

## Let's test this in Postman
* Grab a bootcamp id from running a `Get all Bootcamps` request
    - `5d725a1b7b292f5f8ceff788` (Devcentral Bootcamp)

### Run Delete a bootcamp route request
`{{URL}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788`

* We pass it our bootcamp id
* We hit `Send` in Postman

## Houston we have a problem!
* I needed to delete the next passing an error after the successful 200 response was sent
* Replace `deleteBootcamp` controller with:

```
// MORE CODE

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    )
  }

  bootcamp.remove();

  res.status(200).json({success: true, data: bootcamp});
})

// MORE CODE
```

## Try again and you should see 200 success
* In the terminal you will see:

```
// MORE CODE

Courses being removed from bootcamp 5d725a1b7b292f5f8ceff788
DELETE /api/v1/bootcamps/5d725a1b7b292f5f8ceff788 200 17.482 ms - 887

// MORE CODE
```

* 3 courses were deleted when that one bootcamp with the above `id` was deleted (so the Cascade Delete is working as expected)

## One bug to fix
* We were getting data returned after we deleted and that is because in our response we had `data: bootcamp`

```
// MORE CODE

  res.status(200).json({success: true, data: bootcamp});

// MORE CODE
```

* And we just need to have our response send an empty object

```
// MORE CODE

  res.status(200).json({success: true, data: {}});

// MORE CODE
```

## Test one more time with a different bootcamp `id`
* And we delete the bootcamp and all it's courses successful
* Replenish your data with your seeder

`$ node seeder -d`

`$ node seeder -i`

## Takeaway
* **note** If something is deleted you most likely want to delete for other resources associated with it
