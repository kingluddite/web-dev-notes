# Course Model & Seeding
* **tip** Use `trim` on any time of name

`models/Course.js`

```
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add course title'],
    unique: true,
    trim: true,
    maxlength: [200, 'Name can not be more than 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters'],
  },
  weeks: {
    type: String,
    required: [true, 'Please add number of weeks']
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost for this course']
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Course', CourseSchema);
```

## Add a relationship
* With courses there will be a relationship to a bootcamp
* We will also create a "reference" to a bootcamp from course
* We will add bootcamp as a field
    - The type is a special type for mongoose called an ObjectId (when you create a new document mongodb creates a new `ObjectId`)

`models/Course.js`

```
// MORE CODE
  bootcamp: {
    type: mongoose.Schema.ObjectId
  }
});

module.exports = mongoose.model('Course', CourseSchema);
```

## But which model are we referencing with this ObjectId?
* We need to add this `ref` (reference)

`models/Course.js`

* **IMPORTANT** Make sure your reference is a string!

```
const mongoose = require('mongoose');
const Bootcamp = '../models/Bootcamp'; // ADD!

// MORE CODE

  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp' // ADD THIS!
  }
});

module.exports = mongoose.model('Course', CourseSchema);
```

## Make sure it is required
* Every course needs to have a bootcamp

`models/Course.js`

```
// MORE CODE
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: Bootcamp,
    required: true
  }
});

module.exports = mongoose.model('Course', CourseSchema);
```

## Also we export
* So we can use this model elsewhere

## We need to add to our seeder file
* We will create `_data/courses.json`
    - It will have a bootcamp `id`
        + that id is the id from the bootcamp in the bootcamp collection
    - It will have a user `id` (we didn't implement this yet)

## Add data
`_data/courses.json`

```
[
  {
    "_id": "5d725a4a7b292f5f8ceff789",
    "title": "Front End Web Development",
    "description": "This course will provide you with all of the essentials to become a successful frontend web developer. You will learn to master HTML, CSS and front end JavaScript, along with tools like Git, VSCode and front end frameworks like Vue",
    "weeks": 8,
    "tuition": 8000,
    "minimumSkill": "beginner",
    "scholarshipsAvailable": true,
    "bootcamp": "5d713995b721c3bb38c1f5d0",
    "user": "5d7a514b5d2c12c7449be045"
  },
  {
    "_id": "5d725c84c4ded7bcb480eaa0",
    "title": "Full Stack Web Development",
    "description": "In this course you will learn full stack web development, first learning all about the frontend with HTML/CSS/JS/Vue and then the backend with Node.js/Express/MongoDB",
    "weeks": 12,
    "tuition": 10000,
    "minimumSkill": "intermediate",
    "scholarshipsAvailable": true,
    "bootcamp": "5d713995b721c3bb38c1f5d0",
    "user": "5d7a514b5d2c12c7449be045"
  },
  {
    "_id": "5d725cb9c4ded7bcb480eaa1",
    "title": "Full Stack Web Dev",
    "description": "In this course you will learn all about the front end with HTML, CSS and JavaScript. You will master tools like Git and Webpack and also learn C# and ASP.NET with Postgres",
    "weeks": 10,
    "tuition": 12000,
    "minimumSkill": "intermediate",
    "scholarshipsAvailable": true,
    "bootcamp": "5d713a66ec8f2b88b8f830b8",
    "user": "5d7a514b5d2c12c7449be046"
  },
  {
    "_id": "5d725cd2c4ded7bcb480eaa2",
    "title": "UI/UX",
    "description": "In this course you will learn to create beautiful interfaces. It is a mix of design and development to create modern user experiences on both web and mobile",
    "weeks": 12,
    "tuition": 10000,
    "minimumSkill": "intermediate",
    "scholarshipsAvailable": true,
    "bootcamp": "5d713a66ec8f2b88b8f830b8",
    "user": "5d7a514b5d2c12c7449be046"
  },
  {
    "_id": "5d725ce8c4ded7bcb480eaa3",
    "title": "Web Design & Development",
    "description": "Get started building websites and web apps with HTML/CSS/JavaScript/PHP. We teach you",
    "weeks": 10,
    "tuition": 12000,
    "minimumSkill": "beginner",
    "scholarshipsAvailable": true,
    "bootcamp": "5d725a037b292f5f8ceff787",
    "user": "5c8a1d5b0190b214360dc031"
  },
  {
    "_id": "5d725cfec4ded7bcb480eaa4",
    "title": "Data Science Program",
    "description": "In this course you will learn Python for data science, machine learning and big data tools",
    "weeks": 10,
    "tuition": 9000,
    "minimumSkill": "intermediate",
    "scholarshipsAvailable": false,
    "bootcamp": "5d725a037b292f5f8ceff787",
    "user": "5c8a1d5b0190b214360dc031"
  },
  {
    "_id": "5d725cfec4ded7bcb480eaa5",
    "title": "Web Development",
    "description": "This course will teach you how to build high quality web applications with technologies like React, Node.js, PHP & Laravel",
    "weeks": 8,
    "tuition": 8000,
    "minimumSkill": "beginner",
    "scholarshipsAvailable": false,
    "bootcamp": "5d725a1b7b292f5f8ceff788",
    "user": "5c8a1d5b0190b214360dc032"
  },
  {
    "_id": "5d725cfec4ded7bcb480eaa6",
    "title": "Software QA",
    "description": "This course will teach you everything you need to know about quality assurance",
    "weeks": 6,
    "tuition": 5000,
    "minimumSkill": "intermediate",
    "scholarshipsAvailable": false,
    "bootcamp": "5d725a1b7b292f5f8ceff788",
    "user": "5c8a1d5b0190b214360dc032"
  },
  {
    "_id": "5d725cfec4ded7bcb480eaa7",
    "title": "IOS Development",
    "description": "Get started building mobile applications for IOS using Swift and other tools",
    "weeks": 8,
    "tuition": 6000,
    "minimumSkill": "intermediate",
    "scholarshipsAvailable": false,
    "bootcamp": "5d725a1b7b292f5f8ceff788",
    "user": "5c8a1d5b0190b214360dc032"
  }
]
```

## Update our Seeder with Course data
`seeder.js`

```
// MORE CODE

// Load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course'); // ADD!

// MORE CODE

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')); // ADD!

// MORE CODE

// Import into Database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);

// MORE CODE

// Delete all data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();

// MORE CODE
```

## Delete and Import our new Course data with
`$ node seeder -d`

`$ node seeder -i`

## Check it out in Mongo Atlas
* You should see courses and bootcamps

## Next
* Create routes for courses
* And connect them with controller methods just like we did with bootcamps
