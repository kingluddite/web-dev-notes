# Create Bootcamp post
* Now we'll create some functionality
    - We'll make a request
        + Add a bootcamp
        + Get a bootcamp

## CRUD
* We'll create basic CRUD functionality before we implement the user and work with authentication...

## We need to bring in our model into our controllers file
`controllers/controller-bootcamps.js`

```
const Bootcamp = require('../models/Bootcamp'); // import our Bootcamp model

// @desc     Get bootcamp
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamp = (req, res, next) => {

// MORE CODE
```

## First route we're working on is to create a new bootcamp
* We need data from the client in order to insert it into the Database

### req.body
* Let's see what's in the request's body object
* That's where the data is going to live
* We send data in the `body` from the client to the server

`controllers/controller-bootcamps.js`

```
// MORE CODE

// @desc     Get bootcamp
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamp = (req, res, next) => {
  console.log(req.body); // add this line
  res.status(200).json({
    success: true,
    msg: 'Show a bootcamp',
    error: null,
  });
};

// MORE CODE
```

* Open Postman
* POST HTTP method
* /api/v1/bootcamps

### We need to add something in the header
* We can click on Body tab and send data in the body
* We also need to have a header of `Content-Type`

#### Postman "Presets" to the rescue
* All of our routes will need Content-Type of `application/json` in the header
* We can use Postman presets to pre-fill these values out
    - Click `Presets`
    - Click `Manage Presets`
    - Click `Add`
    - Key (Content-Type)
    - Value (`application/json`)
    - Description (JSON Type)

![add preset for JSON](https://i.imgur.com/iA9mIIc.png)

#### Now add the preset
* Whenever we need it just choose your newly added Preset from the dropdown and this will save you from typing it all out every time

### Add raw body to Postman
* We'll use data from `_data`
    - We don't need an `_id` field (that gets added when we create a new document in MongoDB)
    - We don't need the User field (didn't create the user model yet)
* Click `Body` > `raw` (radio button)
* Add this JSON
    - Click `Beautify` (to make JSON look perty :) )

```
{
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
}
```

* Above is all data in the body that we want to send to the server

## Click Send in Postman
* We'll get back our response, 200 and object where we see a bootcamp was created
* If we look at our Terminal we see `undefined`

### What is `undefined?`
`req.body` is undefined

### The reason for this is you need to add a piece of middleware that is included with Express
* Over a year ago you needed to install `body-parser` to use with Express
* But now it is included with Express (so you no longer have to install it as a separate node module)

`server.js`

```
// MORE CODE

const app = express();

// Body parser
app.use(express.json()); // add this line

// MORE CODE
```

### Try to send Post request again
* You will see in the terminal that `undefined` is gone and replaced with the fragment of JSON we sent

```
{
  name: 'Devworks Bootcamp',
  description: 'Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer',
  website: 'https://devworks.com',
  phone: '(111) 111-1111',
  email: 'enroll@devworks.com',
  address: '233 Bay State Rd Boston MA 02215',
  careers: [ 'Web Development', 'UI/UX', 'Business' ],
  housing: true,
  jobAssistance: true,
  jobGuarantee: false,
  acceptGi: true
}
```

* Now we are getting all of our data in the body

## Now we need to insert this data into our Database
* We just need to put this line inside our controller

`Bootcamp.create(req.body)`

* Our mongoose Model is build with validation that prevents data we don't want from getting inserted into our Database

`Bootcamp.create(req.body)` - Gives us a promise

* We could add a `then` to handle that Promise but we'll use async/await for cleaner more readable code

`controllers/controller-bootcamps.js`

* We send a status of 201 because we are creating a resource
* We send `success: true`
* We use async/await
* We send our `data` back in the response

```
// MORE CODE

// @desc    Create a bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
};

// MORE CODE
```

## Send Post request again with Postman
* We get an error because our Model says that: location has 2 required fields
* We just need to make both of them not required by setting `true` to `false`
    - See code fragment below

`models/Bootcamp.js`

```
// MORE CODE

  location: {
    // GeoJSON Point
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
  },

// MORE CODE
```

* Change both to `required: false`
* Then send again with Postman and the document will be inserted into MongoDB

### You just added your first document inside MongoDB
![new document added](https://i.imgur.com/OPY2tT0.png)

* You will see an `_id` with unique value added automatically
* Date with current date/timestamp added to `createdAt`
* `careers` has 3 values
* `photo` has default value
* We know website passed the regex expression
* We know the email passed the regex expression

### Try to add the same Post request one more time (Press Send button in Postman one more time)
* It does not let you add it
* You get this error `Error: E11000 duplicate key error collection: devcamper.bootcamps index: name_1 dup key: { name: "Devworks Bootcamp" }`
    - This means you have a requirement in mongoose for `name` that all names must be unique
        + It tells us `Devworks Bootcamp` needs to be unique
        + We need a way to handle rejections
            * We can use a try/catch (VS Code snippet can save you time!)

### Add Try/Catch
`controller-bootcamps.js`

* We use a try/catch
* In our catch
    - We send a 400 (means client error ---> they sent bad request)
    - We send back json stating success was a failure

```
// MORE CODE

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
// MORE CODE
```

* **note** We add a `return` so we don't get the "headers already sent" error
* **note** If you don't add a new email you'll get a duplicate key error for email too
* Now instead of hanging
* We get back a 400 Bad Request status and we see in the Response body success is `false`

## In a moment we'll create a custom error handler
* We will also create a piece of middleware so we don't have to do a try/catch inside of every controller method
    - We'll wrap it inside a custom method
* Above is the easiest way to handle errors - But we'll refactor to make our code more efficient and save us time when we add new things
## Save Request with Content-Type header
* So that when we use it again it will be just like it is now

### What if we try to be sneaky and add a "hello" key with "world" value?
![hello world sneaky](https://i.imgur.com/azbzdXA.png)

* Add this new document
* Click `Send` and a new document is added to our Database but the `hello` field was completely ignored and not inserted
    - This shows you our Mongoose schema validation is working!
* You now have 2 documents
* Add 2 more
* At the end we have 4 documents so we can have data to experiment with

## Let's fetch that data
* All bootcamps
* A Single Bootcamp
