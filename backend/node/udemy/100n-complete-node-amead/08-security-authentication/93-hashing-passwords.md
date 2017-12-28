# Hashing Passwords
* Hash user passwords before saving them to the db
* User will send the password in the POST `/users` request
* We will validate the plain text version (make sure it is a certain length)
* Then hash, salt and store in db
* This is way more secure than storing password in db as plain text

## bcrypt
* We will use the `bcrypt` algo to hash the password
* bcrypt is super secure
* Has salting built in
* Lots of variations of bcrypt on npm site
* We'll use `bcryptjs`
    - It is written in javascript with no dependencies
    - The `bcrypt` module has lots of issues across different OSs.

### Install bcrypt
`$ npm i bcryptjs --save`

### Playground with bcryptjs
* [bcryptjs documentation](https://www.npmjs.com/package/bcryptjs)
* rainbow tables
* can create a database of english words that have been run through sha256 and if they guess your password, they can hack your site
* a salt is added to that password and this will give a different result and no one can precompute a table to look up salted passwords

```js
bcrypt.genSalt(10, (err, sale) => {
  bcrypt.hash(thing to hash, salt to use, callback)
})
```

### Test it out
```js
const bcrypt = require('bcryptjs');

const password = '123abc';

// take 2 args
// async function
// 2nd arg is callback
// 1st one is number of rounds you want to use to generate the salt
// (bigger number, longer algo will take)
// this prevents someone from making a million requests a second Choose
// between 10 and 100 (larger === slower)
// bcrypt is slow on purpose, it prevents brute force attacks
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});
```

### Run it
`$ node playground/hashing.js`

* Output is:

`$2a$10$9h2nk9e0Fi.BYSRACwFcu.ZULzuNY5qw4RyiOi/S5VisD2ZskUvHa`

* This is our hash
    - Inside has has values stored inside it
        + # rounds (10)
        + No need to have both a salt and hash in DB
        + This is why bcrypt is so great, it saves us time

## How do we compare if this hash matches the user trying to log in?
`bcrypt.compare()` takes plain value and the hashed value and lets you know if those two values are equal

```
const bcrypt = require('bcryptjs');

const password = '123abc';

const hashedPassword =
  '$2a$10$9h2nk9e0Fi.BYSRACwFcu.ZULzuNY5qw4RyiOi/S5VisD2ZskUvHa';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
```

* Run server again
* Ouput -------------> `true` (they match)
* Change part of the hash and run again
* Should be `false`

## How we log people in
* User logs in
* They enter their plain text password
* We store the user's hashed/salted password in db
* When they log in we run the plain text through bcrypt and compare if they are the same, they are (true) we log them in, if they're not (false) we don't log them in and redirect them to the home page

## Add bcrypt into our user Model
* We want to run some code before our Document is saved so we can hash our password before storing it inside the db

### mongoose middleware
* There are lots of different mongoose middleware
* [Mongoose middleware documentation](http://mongoosejs.com/docs/middleware.html)

```js
var schema = new Schema(..);
schema.pre('save', function(next) {
  // do stuff
  next();
});
```

* We will use this and replace `do stuff` with hashing our password

## Modify our user Schema
* We run into a big problem here and that if we run this function it will hash our password every time we save a user instance. Even if we don't modify the password it will run the hash on that user's password. This will break our hash and the user won't be able to log in
* We need a way to re-hash the password only if the password has been modified
    - This is what `user.isModified('password')` does for us
    - It only re-hashes password if password was modified
    - Add the `bcryptjs` package to the top of `user.js`

## Challenge
```js
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // add this
const _ = require('lodash');

// MORE CODE

UserSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {
    // user.password
    // user.password = hash;
    // next();
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
```

### Solution
```js
// very important to add bcrypt
// I didn't add it and did not get any errors
const bcrypt = require('bcryptjs'); // add this
// MORE CODE
UserSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// MORE CODE
```

* Wipe TodoApp in robomongo
    - We have plain text passwords that we need to remove
* Start server

`$ node server/server.js`

### Make a Postman request
* Make a post requet /users

```js
{
  "email": "darth@starwars.com",
  "password": "sithlord"
}
```

* We run it and the only data we get back is the id and teh email
* To see if it worked use robomongo
  - open users collections
  - And you should see the user's password is hashed

 ![users password is hashed yo!](https://i.imgur.com/2SMLRZQ.png)
 
## Git
`$ gc -am 'Hash user password before saving'`

## Next - Seed the db

 
