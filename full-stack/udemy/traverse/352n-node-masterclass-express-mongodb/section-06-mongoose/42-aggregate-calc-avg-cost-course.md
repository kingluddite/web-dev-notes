# Aggregate - calculate the average cost course
* We will calculate the course tuition for each course in the bootcamp and we'll insert that as a field in the bootcamp document

## Remove the averageCost field from our `_data/bootcamps.json`
`_data/bootcamps.json`

```
[
        {
                "_id": "5d713995b721c3bb38c1f5d0",
                "user": "5d7a514b5d2c12c7449be045",
                "name": "Devworks Bootcamp",
                "description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer",
                "website": "https://devworks.com",
                "phone": "(111) 111-1111",
                "email": "enroll@devworks.com",
                "address": "233 Bay State Rd Boston MA 02215",
                "careers": [
                        "Web Development",
                        "UI/UX",
                        "Business"
                ],
                "housing": true,
                "jobAssistance": true,
                "jobGuarantee": false,
                "acceptGi": true
        },
        {
                "_id": "5d713a66ec8f2b88b8f830b8",
                "user": "5d7a514b5d2c12c7449be046",
                "name": "ModernTech Bootcamp",
                "description": "ModernTech has one goal, and that is to make you a rockstar developer and/or designer with a six figure salary. We teach both development and UI/UX",
                "website": "https://moderntech.com",
                "phone": "(222) 222-2222",
                "email": "enroll@moderntech.com",
                "address": "220 Pawtucket St, Lowell, MA 01854",
                "careers": [
                        "Web Development",
                        "UI/UX",
                        "Mobile Development"
                ],
                "housing": false,
                "jobAssistance": true,
                "jobGuarantee": false,
                "acceptGi": true
        },
        {
                "_id": "5d725a037b292f5f8ceff787",
                "user": "5c8a1d5b0190b214360dc031",
                "name": "Codemasters",
                "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science",
                "website": "https://codemasters.com",
                "phone": "(333) 333-3333",
                "email": "enroll@codemasters.com",
                "address": "85 South Prospect Street Burlington VT 05405",
                "careers": [
                        "Web Development",
                        "Data Science",
                        "Business"
                ],
                "housing": false,
                "jobAssistance": false,
                "jobGuarantee": false,
                "acceptGi": false
        },
        {
                "_id": "5d725a1b7b292f5f8ceff788",
                "user": "5c8a1d5b0190b214360dc032",
                "name": "Devcentral Bootcamp",
                "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in front end and full stack web development",
                "website": "https://devcentral.com",
                "phone": "(444) 444-4444",
                "email": "enroll@devcentral.com",
                "address": "45 Upper College Rd Kingston RI 02881",
                "careers": [
                        "Mobile Development",
                        "Web Development",
                        "Data Science",
                        "Business"
                ],
                "housing": false,
                "jobAssistance": true,
                "jobGuarantee": true,
                "acceptGi": true
        }
]
```

## Now we'll comment out in our seeder where the courses are created
`seeder.js`

* We just want the bootcamps with no averageCost
    - This way we can add courses on our own and have that calculation happen

```
// MORE CODE

// Import into Database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    // await Course.create(courses);

// MORE CODE
```

## Run our seeders again
`$ node seeder -d`

`$ node seeder -i`

* This will create just the bootcamps
* Then we'll stop and run our server again
* You should see courses in your `Get all bootcamps` requests is an empty array `[]`
* And you will not see `averageCost`

## Add some middleware
* We are going to have a few pieces of middleware that are going to run a static function that's going to use aggregation that's going to be able to calculate the average cost

### Add middleware that will save and remove
* getAverageCost after save
* If we add a course or remove a course we want to recalculate that average cost, we don't want to leave in an averageCost in one of the courses that doesn't exist anymore

## Mongoose "statics" vs "methods"
### `statics` are a static method
* This is where you call the method on the actual model
    - example: `Course.totalItUp()`

### methods
* example

```
const courses = Course.find();
courses.totalItUp()
```

### How do we call `statics`?
* If a callback is passed, the `aggregate` is executed and a Promise is returned
* If a callback is not passed, the `aggregate` itself is returned
    - Inside `aggregate` are brackets (and this is referred to as a "pipeline")
        + And we have different "steps" to the "pipeline"
        + We want to use `$match` to match the bootcamp with whatever is passed in as the argument

`models/Course.js`

* When all this is add we should get an object that has the `id` of the bootcamp and the averageCost of the tuition

```
// MORE CODE

// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
    console.log('Calculating avg cost...'.blue);

    const arrayWithSingleObject = await this.aggregate([
        {
            $match: {bootcamp: bootcampId}
        },
        {
            // the object that we want to create
            // the calculated object
            // We need to use `_id: $bootcamp`
            // We createdOur field and say we want to average `$avg`
            // And point to field we want to average `$tuition`
            $group: {
                _id: '$bootcamp',
                averageCost: {$avg: '$tuition'}
            }
        }
    ]);

    console.log(arrayWithSingleObject);
}

// MORE CODE
```

* But it won't work yet - We still need to run this!
* And we run it through the middleware

```
// MORE CODE

// Call getAverageCost after (so we use "post") save
CourseSchema.post('save', function () {

})

// Call getAverageCost after (so we use "post") save
CourseSchema.pre('remove', function () {

// MORE CODE
```

* Since we are inside the model we cause use `this.constructor.getAverageCost()`
    - And we pass in the `id` and when we save we get the `id` of the bootcamp
        + So we pass that in as an argument with `this.bootcamp`
    - And we do the same thing BEFORE `remove`

```
// MORE CODE
// Call getAverageCost after (so we use "post") save
CourseSchema.post('save', function () {
    this.constructor.getAverageCost(this.bootcamp);
})

// Call getAverageCost after (so we use "post") save
CourseSchema.pre('remove', function () {
    this.constructor.getAverageCost(this.bootcamp);
})

module.exports = mongoose.model('Course', CourseSchema);
```

## Test in Postman
* Add a new `course`
* And see what you get in the terminal console

`POST {{URL}}:{{PORT}}/api/v1/bootcamps/{{bootcampId}}/courses`

![you will see "Calculating cost"](https://i.imgur.com/Z5hUcr4.png)

* You will see we get an object back with the key/values we expected:

```
[ { _id: 5d725a1b7b292f5f8ceff788, averageCost: 28000 } ]
```

* But if we add another one with a different tuition, it will average the two
* Let's add a course with this info:

```
{
    "scholarshipAvailable": false,
    "title": "This is a test3",
    "description": "learn about test",
    "weeks": "8",
    "tuition": 1000,
    "minimumSkill": "beginner"
}
```

* Run the route request again in Postman

```
// MORE CODE

 [{ _id: 5d725a1b7b292f5f8ceff788, averageCost: 19000 }]

// MORE CODE
```

`(28000 + 1000) / 2 = 14500`

* So if you have 2 courses with tuition of $28000 and 1000 respectively, the average will be $14,500

## Bugs
* We need to avoid long decimals, so we'll use JavaScript's `ceil()` method
* We are not adding the `averageCost` field into our Course collection in the MongoDB

## Bug fix
* We will remove our console.log()
* We will use a try/catch
* We will use `findByIdAndUpdate()` (because we want to update the bootcamp)
* How can we use the bootcamp model?
    - this.model('Bootcamp')
    - And we use our method with `this.model('Bootcamp').`

`models/Course.js`

* The following code should put the `averageCost` field in our Course Database and supply the value as the average tuition cost for all the courses of the bootcamp

```
// MORE CODE
    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
            averageCost: Math.ceil(arrayWithSingleObject[0].averageCost / 10) * 10
        })
    } catch (err) {
        console.error(err);
    }
}

// Call getAverageCost after (so we use "post") save
CourseSchema.post('save', function () {
    this.constructor.getAverageCost(this.bootcamp);
})

// Call getAverageCost after (so we use "post") save
CourseSchema.pre('remove', function () {
    this.constructor.getAverageCost(this.bootcamp);
})

module.exports = mongoose.model('Course', CourseSchema);
```

## Test API
* We will delete some courses we added
* This is a good idea to test your API
    - You could delete them directly from Compass but that doesn't let you know if you API is really working

### Get all courses
* `{{URL}}:{{PORT}}/api/v1/courses`

## Fix
* The delete API for course needs to have it's response updated
* It was saying `Update a course` and it needs to be this:

```
// MORE CODE

  return res.status(200).json({
    success: true,
    msg: 'Delete a course', // update this
    data: {}, // standard is to return an empty object in the response
    error: null,
  });

// MORE CODE
```

## Now if you Get all courses
* You will get an empty array because none are left

## Now add one course
`POST {{URL}}:{{PORT}}/api/v1/bootcamps/{{bootcampId}}/courses`

```
{
    "scholarshipAvailable": false,
    "title": "Johnny Cache",
    "description": "learn about test",
    "weeks": "8",
    "tuition": 1000,
    "minimumSkill": "beginner"
}
```

* Search for all bootcamps

`GET  {{URL}}:{{PORT}}/api/v1/bootcamps`

* You will see `averageCost: 1000` in the bootcamp with `id` of `5d725a1b7b292f5f8ceff788`

```
{
    "scholarshipAvailable": false,
    "title": "Johnny Dollar",
    "description": "learn about test",
    "weeks": "8",
    "tuition": 200,
    "minimumSkill": "beginner"
}
```

* Search for all bootcamps

`GET  {{URL}}:{{PORT}}/api/v1/bootcamps`

* Now you'll see the `averageCost` is 600

## Next
* Add ability to upload an image to the server
* Currently we have an image placeholder `"photo": "no-photo.jpg"`
    - We need to add functionality to upload an image and it goes on the server
    - And then we want to change the placeholder name to whatever the image name is
        + And we want to give the photo a custom image name
        + And we'll use `express-file-upload` to accomplish that
