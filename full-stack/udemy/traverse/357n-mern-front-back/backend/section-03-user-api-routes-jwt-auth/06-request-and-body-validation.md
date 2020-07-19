# Request and Body validation
## Register user
* We'll update our test route
* We'll change it from `GET` to `POST` and update the description

`routes/api/v1/user.js`

```
const express = require('express');

const router = express.Router();

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post('/', (req, res) => res.send('user route'));

module.exports = router;
```

* We need to send data to this route
* This data will be stored inside `req.body`
  - This is the object of data that will be sent to this route

`routes/api/users.js`

```
// MORE CODE

router.post('/', (req, res) => {
  console.log(req.body);
  res.send('Register User');
});

// MORE CODE
```

## Test the POST route in Postman
* We try to hit this post route in Postman (make sure to select POST)
* We see `undefined` in Terminal

## Houston we have a Problem! - Why are we getting undefined?
* In order for `req.body` to work we have to initialize the body parser
* You used to have to install `body-parser` as a separate package in Express and bring it in to `server.js` but now it is built into Express
* So instead of `app.use(bodyParser.json())` like we used to have to do we now use:

`server.js`

```
// MORE CODE

// Connect Database
connectDB();

// Init Middleware
// Make sure you can parse data in req.body
app.use(express.json({ extended: false }));

// MORE CODE
```

* **note** Now by adding that one line we will be able to access the data inside `req.body`

## How do we send data in a request?
* We could use an HTML `form` but right now we have no UI

## Postman to the rescue!
* This is where Postman comes in handy because we can just use JSON directly inside Postman as we hit that route

### Add stuf inside the Postman Headers tab
* To do this we need to:
    - Add a **Header** of `Content-Type` with a value of `application/json`

![content-type application/json](https://i.imgur.com/gZbN4dj.png)

## Postman
* `Body > raw`

```
{
    name: "John Doe"
}
```

## Houston we have a problem! - Not JSON data
* That will give you an error because it is not JSON
* Change it to:

```
{
    "name": "John Doe"
}
```

* That is valid JSON
* You get 200 success when you hit Postman send on this POST route
* Nothing changes in Postman but if you look at the terminal you will no longer see `undefined` but instead you now see an object with the data we sent via JSON

```
{ name: 'John Doe' }
```

* Now we can send whatever data we want and access it with `req.body`

## Express Validator
* [docs](https://express-validator.github.io/docs/)
* Add it

`$ npm i express-validator`

```
const express = require('express');
const { check, validationResult } = require('express-validator');

// MORE CODE
```

### Use it to validate a user
* Make sure the user is there and not empty
* We add an array as the first argument

`routes/api/users.js`

```
// MORE CODE

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
  ],
  (req, res) => {
    console.log(req.body);
    res.send('Register User');
  }
);

// MORE CODE
```

* Now add `email` and `password` validation too

`routes/api/users.js`

```
// MORE CODE

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    console.log(req.body);
    res.send('Register User');
  }
);

// MORE CODE
```

* Now we need to handle the `res` (response)
* We'll store errors inside `errors` variable
* We'll check if there are any errors and if so we'll send a 400 status error and an array of all the errors

```
// MORE CODE

check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    // If our errors array is not empty
    // Make sure use use .isEmpty() and not .isEmpty
    if (!errors.isEmpty()) {
      // return server error and errors
      return res.status(400).json({ error: errors.array() });
    }
    console.log(req.body);
    res.send('Register User');
  }
);

// MORE CODE
```

* Test in Postman and you will get 400 server status
* And this error in response

```
{
    "error": [
        {
            "msg": "Please include valid email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Please enter a password with 6 or more characters",
            "param": "password",
            "location": "body"
        }
    ]
}
```

* **note** `locations` will always be body because that is the type of error - we're sending it in the body
* `param` is the actual field
* `msg` is our custom message i.e. - `Please include valid email`
* Take name out of JSON data you are sending in Postman `req` and you'll get 3 errors because name is also required

```
{
    "error": [
        {
            "msg": "Name is required",
            "param": "name",
            "location": "body"
        },
        {
            "msg": "Please include valid email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Please enter a password with 6 or more characters",
            "param": "password",
            "location": "body"
        }
    ]
}
```

* Now we can use this array of Errors on our front end with React however we want
* React `express-validator` is a good solution
* If you do custom validation it might be hard to deal with empty strings but `express-validator` makes it easy
    - Enter an empty string for `name` and you'll see it triggers the error

```
{
    "name": ""
}
```

## Test valid data
* Test email that has a gravatar

```
{
    "name": "John Doe",
    "email": "me.phil@gmail.com",
    "password": "123456"
}
```

* You will get a 200 success and the req.body will show the object with all the valid data inside

## Postman
* Save the route inside the `Users & Auth` collection as `Register User`
    - This will make registering users via Postman simple as we just open the collection and click on the RESTful route

## Next - Add logic to Register user

