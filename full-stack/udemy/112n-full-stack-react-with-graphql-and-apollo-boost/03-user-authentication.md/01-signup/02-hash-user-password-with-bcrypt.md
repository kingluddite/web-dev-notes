# Hash User Password with bcrypt
* Currently we can see the password in mongodb
* This is BAD
* We need to encrypt this password
* This is a security issue

## Install bcrypt
`$ npm i bcrypt`

### Where do we use brcrypt?
* We will use it in `models/User.js`
* We will use mongoose schema `pre()` method to do something before the user saves to the database
* Check if the password was not modified because that means we are not signing up a new user and just updating the password
* We will use `bcrypt` **genSalt(rounds, function(error, salt))** method to check if there is an error
* If no error hash with salt by setting the hash to the password
* `next()` moves us onto the next middleware in node express

`User.js`

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// MORE CODE

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
```

## Test if it works
* Delete `User` from mongodb (remotely)

### or locally (instructions below)
* `$ mongo` in another terminal tab
* `$ use they_came_before_me`
* `$ db.users.deleteMany({})`
* This will delete all users

## Open graphiql app in browser
* `http://localhost:4444/graphiql`

### Run another mutation
* In graphiql

```
mutation {
  signupUser(username: "Phil", email: "me@you.com", password: "a12345") {
    token
  }
}
```

* Hit play to execute mutation
* Look into document and password will now be encrypted (salted and hashed)

`$ db.users.find()`

![encrypted password](https://i.imgur.com/xvlurSS.png)
