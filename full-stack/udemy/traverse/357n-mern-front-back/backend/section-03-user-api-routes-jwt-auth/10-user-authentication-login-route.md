# User Authentication / Login Route
* We'll copy the registration rout as the login will be similar
* We remove `name` as we only need to check `email` and `password`
* We check if there is not a user
* We can remove the gravatar as we don't need it for logging in
* We can remove creating a user, salting and hashing a password
* We want to keep signing a token and returning it
* We keep the payload

## We need to make sure the password matches
* Bring in `bcrypt`
    - `bcrypt` has a method called `compare()`
        + It takes in a plain text password (what the user entered) and an encrypted password (from the db) and it compares them and tells you if it is a match or not
        + compare() returns a Promise (so we need to `await` it)
* Best Practice - Have same error message `Invalid Credentials` whether there is no user or the username password isn't a match - just better security choice - don't give hackers any information they could use to hack you

`routes/api/auth.js`

```
// MORE CODE

// @route    POST api/auth
// @desc     Authenticate User and get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // console.log(errors);
    // If our errors array is not empty
    if (!errors.isEmpty()) {
      // return server error and errors
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        });
      }

      // return jwt (jsonwebtoken)
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// MORE CODE
```

## Test in Postman
* Open new tab
* Since we are sending data (POST) we need to add a `Content-Type` in our Header with a value of `application/json`
* Endpoint `http://localhost:5000/api/auth`
* raw json

```
{
    "email": "howley.phil@gmail.com",
    "password": "123456"
}
```

* If you don't enter username and password you get the validation
* If you enter a wrong user you get the same validation error
* If you enter valid credentials you get the token

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWVkZDA2ZmExYTZlNmE2OTY2YTlhODY1In0sImlhdCI6MTU5MTU0OTEwNiwiZXhwIjoxNTkxOTA5MTA2fQ.cKCd1BP5bVHA6EMMCKN56OUm7rbo8Ko3nDBc5VvIoyQ"
}
```

## In Postman
* Save in Users & Auth collection as `Login User`
* Test token in `get auth user` protected route and paste token into the value of the route and you should get the user back

### Test more
* Register one more user
* Copy and paste their token into the get auth user and you should get that user object in response

### Authentication for backend is complete
* We can register and login
* We can protect routes
* We can generate tokens

## Improvement
* We will rename our User `password` field to `hashedPassword`
* This minor change will make our code more readable
* We can easily tell the difference from the plain text password and the hashed password
* We'll need to make several changes to our code
    - In our model User.js

`models/User.js`

```
// MORE CODE

  hashedPassword: {
    type: String,
    required: true,
  },

// MORE CODE
```

* And we need to update:

`routes/api/users.js`

```
// MORE CODE

user = new User({
        name,
        email,
        avatar,
        hashedPassword: password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.hashedPassword = await bcrypt.hash(password, salt);

// MORE CODE
```

* We need to not return our newly named `hashedPassword` field

```
// MORE CODE

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-hashedPassword');

// MORE CODE
```

* And we need to check our user.hashedPassword if it matches with the user entered `password`

`routes/api/auth.js`

```
// MORE CODE

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.hashedPassword)

// MORE CODE
```

* That's it, it will work the same as before with registering, authenticating and logging in users but our code is slightly more readable

## Next - Profile
* This will have a lot of data, lots of different fields
* We'll have to create a model, a bunch of routes
