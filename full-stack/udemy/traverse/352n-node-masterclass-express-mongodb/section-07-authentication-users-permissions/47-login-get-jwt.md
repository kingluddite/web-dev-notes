# Register and get JSON Web Token
1. We created a user (registered the user)
2. We hashed the password
3. **TODO:** Our response `res` needs to include a JSON Web Token `JWT`

## We could add a JWT a few different ways
* We are trying to keep our controller methods light
* We will create a mongoose method to handle this for us
    - This is not middleware (where it runs automatically)
    - But it is a method that we can just call when we need it

### static vs method
* `statics` are called on the model itself
* `methods` are called on what you initialize from the model (or get from the model)
    -  We want to use a `method` here

### What does a JWT token look like?
* [jwt docs](https://jwt.io/)

### Here is a JWT
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

* A jwt has 3 parts to it

#### HEADER (algorithm & token type)
* (red color on `jwt.io`)
```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### PAYLOAD
* (purple color on `jwt.io`)
* This is what we'll be dealing with
* What we are sending in a JWT is in this payload
    - iat: "issued at"
        + This is created automatically and says when JWT was created
    - All we care about is the **user** `id` so that when the user sends a request with the token we know which user that is
        + So if we want to get the logged in user's profile:
          1. Then we can look at the token
          2. Grab the payload
          3. And pull out the **user** `id`
          4. And use that in a mongoose query to get that correct user
                - Or to make sure that that `user` belongs to the bootcamp that is going to be updated

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

#### VERIFY SIGNATURE
* (baby blue color)
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  
your-256-bit-secret

) 
```

## We are using the `jsonwebtoken` npm package
* It is already installed
* [docs for jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

### We need to sign the JWT
`jwt.sign()`

* We pass it the `payload` from the `jwt`
    - We want to pass it the user's `id`
        + We'll set it to `jwt.sign({ id: this._id })`
            * `_id` is the mongodb id
            * Since this is a method (and not a static) this is referring to the actual `user` (so we are calling this method on the actual user)
    - We also need to pass a secret
        + The `secret` should be kept in the config file (our environment variables)
            * I'm just using alphanumeric characters
    - We could also a `expiresIn` time (expressed in seconds or a string describing a time span)
        + We'll set it to expire in `30 days`
        + It is a good security measure to set this

## You need to import `jsonwebtoken` at the top
`User.js`

```
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // ADD!

// MORE CODE
```

`config/config.env`

* Generate secret using [this random key generator](https://randomkeygen.com/)

```
// MORE CODE
JWT_SECRET=3f2QIb2Kg2DZdii9BtOyMLp2p6gLdVrwFJR8hG
JWT_EXPIRE=30d
```

* The `30d` follows the documentation for setting an expiration date in `jsonwebtoken`
* **note** Whenever you change `.env` files you need to restart the server before it can acknowledge changes in this file

`User.js`

* We use a **regular function** because we are using `this` inside our function
* `jwt.sign()` takes in a payload and we set the payload to equal the user id
  - That user id will pertain to the current user
  - Since this is a method and not a static, this means we are calling it on the actual user (so we'll have access to that user's `_id`)

```
// MORE CODE

// encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model('User', UserSchema);
```

## Let's call this method from within our controller

`controllers/auth.js`

* We'll call the above method from within our controller
    - **IMPORANT** We use `user` (lowercase) because we are using a method and not a static
    - Below you see the User (this is calling a method on the static)
    - And below `user` is from the `User.create()` which gives us an instance of a `user` and we use `user.getSignedJwtToken()`

```
// MORE CODE

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Create a token
  const token = user; // lowercase user because we are using a "method" and not a "static"
  // static would be called on the model itself and would look like `const token = User`

  res.status(200).json({ success: true });
});
```

* **IMPORTANT** One more time because this is important
  - We are called a method which is called on the instance of the Class
    + If we were calling it on the Class itself (static) it would be using the uppercase `User` instead of the lowercase instance of `user`
* **note** And since we call `user.getSignedJwtToken` we have access to the user's `_id`
  - And that's what we set in our `User.js`

`models/User.js`

```
// MORE CODE

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {

// MORE CODE
```

### Now in the response `res` we will send the token
`controllers/auth.js`

```
// MORE CODE
  // Create a token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
```

## Test in Postman 
* Delete the user from Database
* Create another user via Postman's Register `user` request
* Now the response will show the token is in the response

```
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzczMDljZmIxZmVlOGY4NDI2ZDdmOSIsImlhdCI6MTU5MDExMjQxMiwiZXhwIjoxNTkyNzA0NDEyfQ.fKeYSJygVOSRapK9v4KtrvUrnE3p2t7j3XUZxv6MYWg"
}
```

## See what's in our token
* Just grab the token and paste it into `https://jwt.io`
    - You will see our user `id` is in the payload
    - View same user in Compass and you'll see `jwt.io` shows the exact same user `_id` in the payload
        + The signature will say it is invalid

## How we can access the user `id` from any "auth" route
* **VERY IMPORTANT** We'll create middleware to extract the payload `id` from the `jwt` and we'll put it into `req.user.id` and we'll be able to access that from any route that uses the `auth` middleware (aka the protection middleware)

## Next - Login
* Handle Login
    - We'll want the same result (we want to get our token but with a `user` that is already in the Database (as opposed to creating a new user))


