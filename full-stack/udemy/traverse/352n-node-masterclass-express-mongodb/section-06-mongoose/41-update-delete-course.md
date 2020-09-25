# Update and Delete a course
## Let's create our update course controller
`controllers/courses.js`

```
// MORE CODE

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

  // TODO: Add user to req.body
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
```

## Now we need to add our route
`routes/api/v1/courses.js`

```
// MORE CODE
// GET /api/v1/courses/:id
router
  .route('/:id')
  .get(getCourse)
  .put(updateCourse)

module.exports = router;
```

## Test in Postman
`PUT {{URL}}/api/v1/courses/{{courseId}}`

* I added global variables in Postman using `{{GLOBAL_VARIABLE_NAME_HERE}}`
* The Headers need Content-Type and application/json
* Raw > JSON

```
{
    "scholarshipAvailable": false,
    "title": "Front End Web Development 2",
    "description": "This course will provide you with all of the essentials to become a successful frontend web developer. You will learn to master HTML, CSS and front end JavaScript, along with tools like Git, VSCode and front end frameworks like Vue",
    "weeks": "8",
    "tuition": 8000
}
```

* And because we used the `new: true` option we get our new modified data in the response to the client

```
{
    "success": true,
    "msg": "Update a course",
    "data": {
        "scholarshipAvailable": false,
        "_id": "5d725a4a7b292f5f8ceff789",
        "title": "Front End Web Development 2",
        "description": "This course will provide you with all of the essentials to become a successful frontend web developer. You will learn to master HTML, CSS and front end JavaScript, along with tools like Git, VSCode and front end frameworks like Vue",
        "weeks": "8",
        "tuition": 8000,
        "minimumSkill": "beginner",
        "bootcamp": "5d713995b721c3bb38c1f5d0",
        "createdAt": "2020-09-14T02:59:00.268Z",
        "__v": 0
    },
    "error": null
}
```

## Save in Postman
`Update a Course`

## Get our Database in sync
* Run seeder delete and import

`$ node seeder -d`

`$ node seeder -i`

## Delete a course
* **note** We don't want to use `findByIdAndDelete()` because we will be adding middleware for this so we'll need to use the `findByIdAndRemove()` method instead

`controllers/course.js`

```
// MORE CODE
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
  // TODO: Add user to req.body
  // We need to use the mongodb remove() method because we will be adding middleware later
  // and it won't trigger if we use Course.findOneAndDelete()
  await course.remove(); // we don't need to store this in a variable
  return res.status(200).json({
    success: true,
    msg: 'Update a course',
    data: {}, // standard is to return an emtpy object in the response
    error: null,
  });
})
```

## Add our router
`routers/api/v1/courses.js`

```
// MORE CODE
// GET /api/v1/courses/:id
router
  .route('/:id')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse)

module.exports = router;
```

## Test in Postman
* `POST  {{URL}}:{{PORT}}/api/v1/courses/{{courseId}}`
* No `Content-Type` needed
* No `body` needed
* Run it

### You will get this response
* Notice the empty object returned in the response

```
{
    "success": true,
    "msg": "Update a course",
    "data": {},
    "error": null
}
```

## Save to Postman to Courses collection
* Delete a course
* `Desc` - Remove a specific course from the Database
* If you now run get all courses you will see only 8 instead of the previous 9 courses

## CRUD for courses is complete

## Next
* Add a method that we call from a piece of middleware that will use aggregation that when we add a course it will calculate the average of the tuitions of the course for that bootcamp and then put it inside of that field in the bootcamp 

