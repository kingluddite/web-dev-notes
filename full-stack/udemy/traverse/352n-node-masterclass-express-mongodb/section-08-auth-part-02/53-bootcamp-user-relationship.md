# Bootcamp and User Relationship
* We have a user `id` in our bootcamp `.json` we use to load with our seeder

## We need to associate a user with a bootcamp
* The id we are using for our `users.json` will make the user field in `bootcamps.json` 
* **note** We did this before when we associated a bootcamp with our course model

`models/Course.js`

```
// MORE CODE

const CourseSchema = new mongoose.Schema({

    // MORE CODE

    createdAt: {
        type: Date,
        default: Date.now,
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    }
});

// MORE CODE
```

* So we use the same pattern for associating a user with a Bootcamp

`models/Bootcamp.js` (make sure you add this to `Bootcamp.js` and not `User.js`)

* Now after adding this there will be a user associated with a Bootcamp

`models/Bootcamp.js`

```
// MORE CODE

const BootcampSchema = new mongoose.Schema({

  // MORE CODE

  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// MORE CODE
```

* Now for a user to be inserted into this Bootcamp we need to edit our bootcamp controller

`controllers/bootcamps.js`

```
// MORE CODE

// @desc    Create a bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    const bootcamp = await Bootcamp.create(req.body);

    return res.status(201).json({
        success: true,
        msg: 'Create a bootcamp',
        data: bootcamp,
        error: null,
    });
})

// MORE CODE

```

## How do we grab the user `id`?
* When we create a bootcamp we take what's in the `req.body`
* But we are NOT going to submit the user `id` in the `req.body`
    - The user `id` doesn't come from the client
    - It comes from the middleware where we have access to that `req.user`

`controllers/bootcamps.js`

```
// MORE CODE

// @desc    Create a bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    // Add user id to req.body
    req.body.user = req.user.id;

    const bootcamp = await Bootcamp.create(req.body);

// MORE CODE
```

## Add Business rule
* A publisher or admin can only add one bootcamp
    - The idea is a `publisher` is a person that works for a bootcamp that signs up to our app and creates a listing for their bootcamp
* We use `Bootcamp.findOne()`
    - And we pass it the user with their `id`
        `Bootcamp.findOne({ user: req.user.id })`
            + We set it to the logged in user
            + That query will find all bootcamps created by this user

```
// MORE CODE

exports.createBootcamp = asyncHandler(async (req, res, next) => {
    // Add user id to req.body
    req.body.user = req.user.id;

    // Check for published bootcamp
    const publishedBootcamp = await Bootcamp.findOne({user: req.user.id});

// MORE CODE
```

## Here is our Business rule
* If the user is not an admin they can only add one bootcamp
    - If they have a role of `admin` they can add as many bootcamps as they want

```
// MORE CODE

    // If the user is not an admin, they can only add one bootcamp
    if (publishedBootcamp && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`The user with ID ${req.user.id} has already published a bootcamp`, 400
            )
        );
    }
    
    // MAKE SURE THIS COMES AFTER ABOVE LOGIC CHECK!!!
    // Or you will ALWAYS create the bootcamp regardless of the logic
    const bootcamp = await Bootcamp.create(req.body); 

// MORE CODE
```

* And here it is all together

`controllers/bootcamps.js`

```
// MORE CODE

// @desc    Create a bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    // Add user id to req.body
    req.body.user = req.user.id;

    // Check for published bootcamp
    const publishedBootcamp = await Bootcamp.findOne({user: req.user.id});

    const bootcamp = await Bootcamp.create(req.body);

    // If the user is not an admin, they can only add one bootcamp
    if (publishedBootcamp && req.user.roler !== 'admin') {
        return next(
            new ErrorResponse(`The user with ID ${req.user.id} has already published a bootcamp`, 400
            )
        );
    }

    return res.status(201).json({
        success: true,
        msg: 'Create a bootcamp',
        data: bootcamp,
        error: null,
    });
})

// MORE CODE
```

## Here is our users data
`_data/users.js`

```
[
  {
    "_id": "5d7a514b5d2c12c7449be042",
    "name": "Admin Account",
    "email": "admin@sftpw.com",
    "role": "user",
    "password": "123456"
  },
  {
    "_id": "5d7a514b5d2c12c7449be043",
    "name": "Publisher Account",
    "email": "publisher@sftpw.com",
    "role": "publisher",
    "password": "123456"
  },
  {
    "_id": "5d7a514b5d2c12c7449be044",
    "name": "User Account",
    "email": "user@sftpw.com",
    "role": "user",
    "password": "123456"
  },
  {
    "_id": "5d7a514b5d2c12c7449be045",
    "name": "John Barbarian",
    "email": "jbarbarian@sftpw.com",
    "role": "publisher",
    "password": "123456"
  },
  {
    "_id": "5d7a514b5d2c12c7449be046",
    "name": "John Bard",
    "email": "jbard@sftpw.com",
    "role": "publisher",
    "password": "123456"
  },
  {
    "_id": "5c8a1d5b0190b214360dc031",
    "name": "John Cleric",
    "email": "jcleric@sftpw.com",
    "role": "publisher",
    "password": "123456"
  },
  {
    "_id": "5c8a1d5b0190b214360dc032",
    "name": "John Druid",
    "email": "jdruid@sftpw.com",
    "role": "publisher",
    "password": "123456"
  },
  {
    "_id": "5c8a1d5b0190b214360dc033",
    "name": "John Fighter",
    "email": "jfighter@sftpw.com",
    "role": "user",
    "password": "123456"
  },
  {
    "_id": "5c8a1d5b0190b214360dc034",
    "name": "John Monk",
    "email": "jmonk@sftpw.com",
    "role": "user",
    "password": "123456"
  },
  {
    "_id": "5c8a1d5b0190b214360dc035",
    "name": "John Paladin",
    "email": "jpaladin@sftpw.com",
    "role": "user",
    "password": "123456"
  },
  {
    "_id": "5c8a1d5b0190b214360dc036",
    "name": "John Ranger",
    "email": "jranger@sftpw.com",
    "role": "user",
    "password": "123456"
  },
  {
    "_id": "5c8a1d5b0190b214360dc037",
    "name": "John Rogue",
    "email": "jrogue@sftpw.com",
    "role": "user",
    "password": "123456"
  },
  {
    "_id": "5c8a1d5b0190b214360dc038",
    "name": "John Warlock",
    "email": "jwarlock@sftpw.com",
    "role": "user",
    "password": "123456"
  },
  {
    "_id": "5c8a1d5b0190b214360dc039",
    "name": "John Wizard",
    "email": "jwizard@sftpw.com",
    "role": "user",
    "password": "123456"
  },
  {
    "_id": "5c8a1d5b0190b214360dc040",
    "name": "John Artificer",
    "email": "jartificer@sftpw.com",
    "role": "user",
    "password": "123456"
  }
]
```

## Clean up our `seeder.js`
* Our seeder has yet to implement the users
    - We want to be able to load up:
        + The bootcamps (bootcamps.json)
        + The users (users.json)
        + The courses (courses.json)
* All seeder has passwords `123456`
* Some users are:
    - publishers
    - users
    - **note** You have to manually change a role to `admin` in the Database

### Why does our admin user in the `users.json` have a role of `user`?
* Because when we import `users.json` using our `seeder.js` our ENUM only allows users to be a `publisher` or `user`
    - This make sure clients using our site don't set their user to `admin`
        + Only someone with admin access to Database can make that change
        + **BEST PRACTICE** This is a good security enhancement 

## Update our seeder
`seeder.js`

```
// populate and depopulate Database This is a "self-contained app for dealing with our Database"
const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({path: './config/config.env'});

// Load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const User = require('./models/User');

// Connect to Database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));

// Import into Database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await User.create(users);

    // Let developer know all is good
    console.log('Data Imported...'.green.inverse);
    // We are finished
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete all data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();

    // Let developer know we deleted all the data
    console.log('Data destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

// Let's use argv to determine if we are IMPORTING or DELETING data
if (process.argv[2] === '-i') {
  importData();
} else {
  deleteData();
}
```

* Now delete all our data with our seed

`$ node seeder -d`

* Now we have nothing in our Database

## Run our server
`$ npm run dev`

## Register our first user
* Then create a bootcamp with that logged in user
* Give the bootcamp the name `Test`
* Make sure the user has a role of `publisher` (needs that to create a bootcamp)

```
{
    "name": "Test",
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
}
```

* You will see the newly created bootcamp has an `_id` from mongo
* And we also have `user` field that matches the `_id` of the user in Compass

![postman returns this](https://i.imgur.com/UcMHWos.png)

* And here is mongo Atlas/Compass

![compass user](https://i.imgur.com/JvLPyxq.png)

* The user `id`s match so our code is working as expected

## Try to enter another bootcamp
* We expect this to fail because of our rule that a user with a role of `publisher` can only create one bootcamp

```
{
    "success": false,
    "error": "The user with ID 5f681dceea2a49be7e7684f0 has already published a bootcamp"
}
```

* And that is the error we expect

## But if our user has a role of `admin` he can create as many bootcamps as he wants
* In compass/atlas change our one user to a role of `admin`
* And then try to submit the bootcamp again
* This time it will work

## Note - We are logged in when we register
* We we register our token logs us in
    - So we don't have to first register
    - And then as an extra step log in

## Delete the second bootcamp we created

## Next - Work with permissions
* We have to be the owner in order to update a bootcamp
    - As it stands currently
        + I could register a new user
        + And that new user could update the Bootcamp we just created
* We'll add the code to fix this permissions problem next
