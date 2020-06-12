# Implementing JWT
* [jwt.io](https://jwt.io/)
    - Shows you the makeup of a jwt
    - 2nd part is most important for us and that is the `payload`
        + iat - time issued at

## payload
* We want to send the user's `id` in the payload so that the user
    - This is so we can identify which user it is with the token
    - If we want to update our profile we can easily look at the token to see which user it is that is logged in and which user it is who's profile we have to update

## How does the jwt package work?
* [repo for jsonwebtoken npm module](https://github.com/auth0/node-jsonwebtoken#readme)
    + We first have to sign the token
    + Then we pass in our payload
    + The we can have a callback where we can send our response back to the client with that token
    + Later on --- we'll protect our routes with a pieces of middleware that we'll create that will verify the token

### sign the token
```
// MORE CODE

var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

// MORE CODE
```

### verify a token
```
// MORE CODE

// verify a token symmetric
jwt.verify(token, 'shhhhh', function(err, decoded) {
  console.log(decoded.foo) // bar
});

// MORE CODE
```

## How are we going to get the user's id?
`routes/api/users.js`

```
// MORE CODE

await user.save();

      // return jwt (jsonwebtoken)
      const payload = {
        user: {
          id: user.id,
        },
      };

// MORE CODE
```

* Our `user.save()` is a Promise and when we save the user it will create a user inside our users collection and automatically create an `_id` field (each document has a unique id when they are created inside mongodb)
    - Why are we not using `_id`?
        + Because with Mongoose it uses an abstraction so we can use `user.id` (instead of `user._id`)

## When we sign our jwt we need to use a secret
* We will add this inside our `environment variables`
* Generate a random secret - https://www.grc.com/passwords.htm

`config/config.env`

```
// MORE CODE

JWT_SECRET=E4BF61625583CE2325CBA792E1F6B13E69F2A97A88704C9C49965D5072599ACC

// MORE CODE
```

* expiresIn - for production we want it to expire in 3600 milliseconds (1 hour) but for development we'll add a couple of `0`s --- `3600000` (make sure to change it to 3600 in production)
* The 3rd argument is a callback that takes in an error and the token

`routes/api/users.js`

```
const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
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
        return res.status(400).json({
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
      // Get salt
      const salt = await bcrypt.genSalt(10);
      
      // Salt and hash password
      user.password = await bcrypt.hash(password, salt);
      
      // Save user to Database
      await user.save();

      // return jwt (jsonwebtoken)
      // Create payload and put user `id` inside it
      const payload = {
        user: {
          id: user.id,
        },
      };
      // Sign the token
      jwt.sign(
        payload, // add payload
        process.env.JWT_TOKEN, // pass in secret
        {
          expiresIn: 360000, // add when token expires
        },
        (err, token) => {
          if (err) throw err; // throw error if there is one
          res.json({ token }); // no error? than send token to client in json format
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
```

## Postman
* Use Register request API POST route and it will instert a user and send a jwt token back to the client

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWVkYzA4NWMwNzY3MTI2MjU2YTRiZWNkIn0sImlhdCI6MTU5MTQ3ODM2NSwiZXhwIjoxNTkxODM4MzY1fQ.aOp-djVNE0rXCV8DGDTd4QMxreQ1ZeAQ1vjrT6ZSP8U"
}
```

* Put the token in `jwt.io` and you'll see the user `id` in the payload

```
{
  "user": {
    "id": "5edc085c0767126256a4becd"
  },
  "iat": 1591478365,
  "exp": 1591838365
}
```

* We now need to add the functionality where we take this token and send it in the headers and access protected routes
* We also get the `exp` (expiration) and we get this because we added the expiresAt property
* Match the user id in the payload to the user _id in the mongoDB

![user id is the same as the one in the payload](https://i.imgur.com/I3hHDdy.png)

