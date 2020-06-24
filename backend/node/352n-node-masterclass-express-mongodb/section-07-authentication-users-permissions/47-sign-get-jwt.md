# Sign and get JSON Web Token
1. We created a user (registered the user)
2. We hashed the password
3. Our response needs to include a JSON Web Token `jwt`

## We could add a jwt a few different ways
* We are trying to keep our controller methods light
* We will create a mongoose method to handle this for us
    - This is not middleware (where it runs automatically)
    - But it is a method that we can just call when we need it

### static vs method
* `statics` are called on the model itself
* `methods` are called on what you initialize from the model (or get from the model)
    -  We want to use a method here

### What does a jwt token look like?
* [jwt docs](https://jwt.io/)

### Here is a jwt
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

* A jwt has 3 parts to it

#### HEADER (algorithm & token type)
```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### PAYLOAD
* This is what we'll be dealing with
* What we are sending in a jwt is in this payload
    - iat - "issued at"
        + This is created automatically and says when jwt was created
        + All we care about is the **user** `id` so that when the user sends a request with the token we know which user that is
            * So if we want to get the logged in user's profile, then we can look at the toke, grab the payload, and pull out the user id and use that in a mongoose query to get that correct user
                - Or to make sure that that user belongs to the bootcamp that is going to be updated

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

#### VERIFY SIGNATURE
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  
your-256-bit-secret

) 
```

## We are using the jsonwebtoken npm package
* It is already installed
* [docs for jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

### We need to sign the jwt
`jwt.sign()`

* We pass it the `payload` from the `jwt`
    - We want to pass it the user's id
        + We'll set it to `jwt.sign({ id: this._id })`
            * `_id` is the mongodb id
            * Since this is a method (and not a static) this is referring to the actual user (so we are calling this method on the actual user)
    - We also need to pass a secret
        + The `secret` should be kept in the config file (our environment variables)
            * I'm just using alphanumeric characters
    - We could also a `expiresIn` time (expressed in seconds or a string describing a time span)
        + We'll set it to 30 days
        + It is a good security measure to set this
* You need to import `jsonwebtoken` at the top

`config/config.env`

```
// MORE CODE
JWT_SECRET=3f2QIb2Kg2DZdii9BtOyMLp2p6gLdVrwFJR8hG
JWT_EXPIRE=30d
```

* The `30d` follows the documentation for setting an expiration date in `jsonwebtoken`
* **note** Whenever you change `.env` files you need to restart the server before it can acknowledge changes in this file

`User.js`

* We use a regular function because we are using `this` inside our function

```
// MORE CODE

const jwt = require('jsonwebtoken');

// MORE CODE

crypt password using bcrypt
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

* We'll call the above method from within our controller
    - **IMPORANT** We use `user` (lowercase) because we are using a method and not a static
    - Below you see the User (this is calling a method on the static)
    - And below `user` is from the User.create() which gives us an instance of a user and we use `user.getSignedJwtToken()`

`controller-auth.js`

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
  const token = user

  res.status(200).json({ success: true });
});
```

* And since we call `user.getSignedJwtToken` we have access to the user's `_id` and that's what we set in our `User.js`

```
// MORE CODE

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {

// MORE CODE
```

### Now in the response `res` we will send the token
`controller-auth.js`

```
// MORE CODE
  // Create a token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
```

## Delete the user and create another user via Postman's Register User request
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
    - View same user in Compass and you'll see jwt.io shows the exact same user `_id` in the payload
        + The signature will say it is invalid

## Later on...
* We'll create middleware to extract the payload `id` from the `jwt` and we'll put it into `req.user.id` and we'll be able to access that from any route that uses the `auth` middleware (aka the protection middleware)

## Next
* Handle Login
    - We'll want the same result (we want to get our token but with a user that is already in the Database (as opposed to creating a new user))


