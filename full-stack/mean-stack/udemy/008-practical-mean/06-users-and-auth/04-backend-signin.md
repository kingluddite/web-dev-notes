# Sigin Backend
`user.js`

```js
router.post('/signin', function(req, res, next) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    // does user exist?
    if (!user) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    // is password correct?
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
  });
});
```

* We don't say error message like "user could not be found" as that could be a security issue
* If the user knows this user is not in Database, they will try another email
* If we use 'Invalid login credentials' it is more secure as the hacker doesn't know if the user email or password were both incorrect or one was incorrect and makes hacking that much harder
* `bcrypt.compareSync()` just compares two algos to see if they were similar
    - The password can not be decrypted but the similar algo is good enough to know if the password is correct

```js
// returns true of false
bcrypt.compareSync(req.body.password, user.password);
```

### Create the Token!
* We will create this token
* Our client can than use it for future requests
* This token will tell us the user already logged in, they are authenticated, please let me in
* We won't create it on our own, since we need to use a complex algo behind it's creation
* There are packages to create tokens

### JWT
* JSON web token
* What does a JWT look like?

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

* [Learn more about JWT](https://jwt.io/)

#### Install JWT
`$ yarn add jsonwebtoken`

* `jwt.sign(payload, secretOfPrivateKey, options, callback);` - This creates a new token and signs it for us
* `secret` should be more complicated than `secret` :)
* `7200` is measured in seconds

`user.js`

```js
// more code
const jwt = require('jsonwebtoken');

const User = require('./../models/user');

// more code

router.post('/signin', function(req, res, next) {
  User.findOne({email: req.body.email}, function(err, user) {
    // more code
    const token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      userId: user._id
    });
  });
});

module.exports = router;
```

* Now we are ready to wireup our frontend to our backend

## Homework on JWT
* [Get started with JWT](https://auth0.com/learn/json-web-tokens/)
* [Anatomy of a JWT](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token)
* [Where to store JWT - Cookies vs HTML5 Storage](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)
