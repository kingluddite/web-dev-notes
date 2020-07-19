# User Registration
* We need to do some things before we register a user

1. See if the user exists (_if they don't you want to send back an error because we don't want to create duplicate users_)
2. Get the users gravatar (_based on their email and once we get it we want it to be part of the user we are registering_)
3. Encrypt the password using bcrypt
4. Return the jwt (json web token) - We do this because in the front end we want the user to be logged in right away and in order to be "logged in" you have to have that token

## Getting data
* We could use
    - req.body.name
    - req.body.email
    - req.body.password

## Destructuring saves us typing
`const { name, email, password } = req.body;`

* Make sure to bring in our User model

`routes/api/v1/users.js`

```
const express = require('express');
const { check, validationResult } = require('express-validator');

// Bring in our User model
const User = require('../../models/User');

// MORE CODE
```

## Not then() but async/await
* To find a user we could use `User.findOne().then()` because `findOne()`returns a **Promise**
* But we are going to use `async/await` instead

## Try catch
* We want to try stuff and if it works execute it otherwise catch the error and share with developer

```
// MORE CODE

    const { name, email, password } = req.body;

    try {
      // See if user exists

      // Get user's gravatar

      // Encrypt password

      // return jwt (jsonwebtoken)
      res.send('Register User');
    } catch (err) {
      console.error(err.message);
    }
  }
);

module.exports = router;
```

* But in the `catch` we also want to send a 500 server error

```
// MORE CODE

} catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
```

* Search for existing user
    - We make our errors look the same as our express validation errors
    - We check if their is not user, user

```
// MORE CODE

const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({
          errors: [
            {
              msg: 'User already exists',
            },
          ],
        });
      }
      // Get user's gravatar

// MORE CODE
```

## Fix for mongoose error
* If you see `(node:22552) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.`
    - Here is the fix:

`db.js`

```
// MORE CODE

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true // add this line
    });

// MORE CODE
```

* If you see this error:

```
(node:22598) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
```

* Add this:

`db.js`

```
// MORE CODE

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

// MORE CODE
```

## Find the gravatar
`routes/api/users.js`

* Gravatar
* [docs](https://www.npmjs.com/package/gravatar)
* syntax: `gravatar.url(email, options);`
* options: size or `s`, default or `d`, rating or `r`

```
// MORE CODE

const gravatar = require('gravatar');

// MORE CODE

 // Get user's gravatar
      const avatar = gravatar.url(email, {
        size: '200',
        default: '404',
        rating: 'pg',
      });
      console.log(avatar);

// MORE CODE
```

* You will see a long string that if you put in the browser you will see your `gravatar` image (if you have one)
* If the email doesn't have a gravatar you will see `404 Not Found` in browser
* `mm` [gives default image](https://i.imgur.com/m64VFPS.png)
    - You can use abbreviated properties `s`, `d` and `r`

```
// MORE CODE

const avatar = gravatar.url(email, {
        s: '200',
        d: 'mm',
        r: 'pg',
      });
      console.log(avatar);

// MORE CODE
```

## Create a new user
* This is a 2 step process
    - You use the `new User()` and you `User.save()`
    - We don't want to store a plain text user

### Make sure you are using async/await
`routes/api/users.js`

* We save and add a user with a plain text password
* **VERY IMPORTANT** You should never store plain text unencrypted passwords in your Database
    - [plain text offenders](https://plaintextoffenders.com/)

```
// MORE CODE

async (req, res) => {
    const errors = validationResult(req);
    // console.log(errors);
    // If our errors array is not empty
    if (!errors.isEmpty()) {
      // return server error and errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({
          errors: [
            {
              msg: 'User already exists',
            },
          ],
        });
      }
      // Get user's gravatar
      const avatar = gravatar.url(email, {
        size: '200',
        default: 'mm',
        rating: 'pg',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      await user.save();
      // Encrypt password

      // return jwt (jsonwebtoken)
      res.send('Register User');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// MORE CODE
```

* You should now see a new user in the Database

![new user in Database](https://i.imgur.com/Jlt3NoX.png)

* **Note** the unencrypted plain text password (Not good to do this!)

## Using bcrypt
* Now we'll encrypt our password before we store in inside our Database using bcrypt
* We use a version of bcrypt called `bcryptjs`
    - This will help reduce errors as it is written in javascript

```
// MORE CODE

const bcrypt = require('bcryptjs');

// MORE CODE
```

### Create salt first
* `genSalt()` returns a Promise so we must `await` it
* The `rounds` is recommended to be `10` (higher number is more secure but takes more processing power)

`const salt = await bcrypt.genSalt(10)`

### Hash our password
* We'll use `bcrypt`s `hash` method and it takes two arguments:
    - The plain text `password`
    - The `salt`

`user.password = await bcrypt.hash(password, salt);`

### Save the user
* `user.save()` - We need to do this to actually save the user
* `user.save()` returns a Promise so we need to put `await` in front of it
    - **IMPORTANT** Anything that returns a `Promise` we need to put `await` in front of it
    - If we didn't use `async/await` we'd have to use `then()` and inside it we'd have to write the code we just wrote and our code gets messy
    - `async/await` makes our code much cleaner and easier to understand what is happening
    - Makes it look synchronous even though it is asynchronous

## Let's add our user with encrypted Database to make sure it is working
* In the next video we'll return our `jwt`

`routes/api/users.js`

```
const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
// Bring in our User model
const User = require('../../models/User');

const router = express.Router();

// @route    POST api/users
// @desc     Register User
// @access    Public
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
  async (req, res) => {
    const errors = validationResult(req);
    // console.log(errors);
    // If our errors array is not empty
    if (!errors.isEmpty()) {
      // return server error and errors
      return res.status(400).json({ error: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({
          errors: [
            {
              msg: 'User already exists',
            },
          ],
        });
      }
      // Get user's gravatar
      const avatar = gravatar.url(email, {
        size: '200',
        default: 'mm',
        rating: 'pg',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return jwt (jsonwebtoken)
      res.send('Register User');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
```

## Test if you can add a user
* Make sure the password is encrypted

![encrypted password](https://i.imgur.com/RhFghHb.png)

## View the avatar in the browser
* If you view avatar URL in browser and prepend `http` you will see `http://www.gravatar.com/avatar/3b41307d2d4dd21d7ef3a7470e0c80c3?size=200&default=mm&rating=pg`

## No Duplicate users!
* If you try to register the user again you will see you won't be able to due to our no duplicate user validation

```
{
    "errors": [
        {
            "msg": "User already exists"
        }
    ]
}
```

## Frontend and backend errors easy peasy
* Notice our errors array is formatted the same as if we forgot a name (so we can easily use both ways on front end)

```
{
    "error": [
        {
            "msg": "Name is required",
            "param": "name",
            "location": "body"
        }
    ]
}
```

* We only care that `msg` is the same for both (and it is!)
    - We get the same type of response

## Why are we getting this error in the terminal?
```
Cannot set headers after they are sent to the client
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
```

* This is caused by us sending two different `res.status()`
    - **SOLUTION TO HEADERS ALREADY SENT ERROR** - You just need to add a return to the first `res.status()` like this:

`routes/api/users.js`

```
// MORE CODE

if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'User already exists',

// MORE CODE
```

* Enter another dupe user and you'll see the Headers already sent error is gone

## Next - Sending back jwt once the user has registered
