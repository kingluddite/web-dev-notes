# Improve App Config
* Learn a better way to store local environment variables
* Learn how to set custom environment variables on heroku

## Secret key
* We have secret key for jwt tokens that currently is stored in codebase
* For security reasons we will move that to an environment variable for our development and test environments
* We also want to set as a production environment variable on Heroku

## Tweak how we manage our local environment variables
* Where are all our environment variables now?
    - Inside `config.js`
    - Not a big problem... yet!

### Bad idea to have your config variables as part of your git repository
* Right now we just have this:

```js
const env = process.env.NODE_ENV || 'development';
console.log('env ******', env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
```

* We just have a port and local mongodb connection info
* So this is not a security concern
* But as our app grows we will soon be adding **secrets** and **3rd party API keys** and this is valuable info and you never want to add that info to a Git repository
    - You most likely will have a private repo on github
    - But even then it's a bad idea because it is just one more place this data is floating around

## Rule - Only Development and Test environment variables are configured locally via some file

## Rule - Production environment variables are always going to get configured via the Heroku command line tools or the Heroku web application

## Modify config file
* We will no longer define environment variables for test and development
* Instead we will only load them in only if we are in the test or development environment

`server/config/config.json`

```json
{
  "test": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/TodoAppTest"
  },
  "development": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/TodoApp"
  }
}
```

`server/config/config.js`

```js
const env = process.env.NODE_ENV || 'development';
console.log('env ******', env);

// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
```

* We temporarily comment out the conditional code
* When you require `json` node parses it into a JavaScript object
    - We don't have to use JSON.parse() to do that for us
    - When we require `.json` files we need to include the `.json` extension as it will cause errors without it

`config.js`

```js
const env = process.env.NODE_ENV || 'development';
console.log('env ******', env);

if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  console.log(config);
}
```

### Take it for a test run
`$ node server/config/config.js`

#### Output
```js
{ test:
   { PORT: 3000,
     MONGODB_URI: 'mongodb://localhost:27017/TodoAppTest' },
  development: { PORT: 3000, MONGODB_URI: 'mongodb://localhost:27017/TodoApp' } }
```

* We have our object
* Now how do we use that object to set the `process.env` object

```js
const env = process.env.NODE_ENV || 'development';
console.log('env ******', env);

if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  const envConfig = config[env];
}
```

* `envConfig` will store just the config variables for the current environment
* `config[env]`
    - if env === test, we'll grab the `test` property
    - if env === development, we'll grab the `development` property
    - When you want to use a variable to access a property you have to use bracket notation like config[env]

## Object.keys()
* Takes an object (like envConfig), gets all the keys and returns them as an array

```js
const env = process.env.NODE_ENV || 'development';
console.log('env ******', env);

if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  const envConfig = config[env];

  console.log(Object.keys(envConfig));
}
```

* Output

```
[ 'PORT', 'MONGODB_URI' ]
```

* Now we just loop over that array and do stuff for each item

```js
const env = process.env.NODE_ENV || 'development';
console.log('env ******', env);

if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  const envConfig = config[env];

  Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key];
  });
}
```

* Now we ignore config.json

`.gitignore`

```
node_modules
**/*.swp
*.log
server/config/config.json
```

* This will keep us from every adding config.json to the git repo

## Git
`$ git status`

```
modified:   .gitignore
modified:   server/config/config.js
```

* Notice we don't see config.js as we have successfully ignored it

## Adding new environment variables
* We now can easily add new environment variables

### Remember our secret?
`seed.js`

```js
const users = [
  {
    _id: userOneId,
    email: 'luke@starwars.com',
    password: 'jediknight',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userOneId, access: 'auth' }, 'abc123')
          .toString(),
      },
    ],
  },
  {
    _id: userTwoId,
    email: 'leia@starwars.com',
    password: 'princess',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userTwoId, access: 'auth' }, 'abc123')
          .toString(),
      },
    ],
  },
];
```

* We also call it a couple times in user.js

```
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, 'abc123')
```

```
UserSchema.statics.findByToken = function(token) {
  const User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
```

* We need to pull that string secret out into an environment variable and reference the environment variable in our codebase

`config.json`

```
{
  "test": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/TodoAppTest",
    "JWT_SECRET":  "DDsaE2kM6QKA0VrqnenqVivIqDz8J8jnunF4pAtAj"
  },
  "development": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/TodoApp",
    "JWT_SECRET": "41ko3zHV9oSrSnnQHZ8XYpTsLE2LfsBqqg5i7kyZ"
  }
}
```

* Just choose nice random numbers for your secret

`seed.js`

```js
const users = [
  {
    _id: userOneId,
    email: 'luke@starwars.com',
    password: 'jediknight',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET)
          .toString(),
      },
    ],
  },
  {
    _id: userTwoId,
    email: 'leia@starwars.com',
    password: 'princess',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET)
          .toString(),
      },
    ],
  },
];
```

`user.js`

```js
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true,
    validate: {
      validator: value => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  tokens: [
    {
      access: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// INSTANCE METHODS
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET)
    .toString();

  user.tokens.push({
    access,
    token,
  });

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function(token) {
  const user = this;

  return user.update({
    $pull: {
      tokens: {
        token,
      },
    },
  });
};

UserSchema.statics.findByToken = function(token) {
  const User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};

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

UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;

  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };
```

## Test test suite
* Make sure all your test cases pass
* `$ npm test`

## Test development
* Run a few calls from Postman

`$ node server/server.js`

* Wipe your local database
* Create a new user
* grab x-auth header
* fetch todos --> none

## Configure JWT variable for production
* We'll use the Heroku CLI to complete this task
* `$ heroku config`
    - shows you a value

## We can set our own environment variables
    - `$ heroku config:set NAME=JohnWayne`

Than if you `$ heroku config`
* You'll see your custom and MONGODB_URI environment variables

## We can get our own environment variables
`$ heroku config:get NAME`

## Unset environment variables
`$ heroku config:unset NAME`

* unsets and restarts the app
* `$ heroku config` shows you it was removed

### SET JWT_SECRET to some random string
`$ heroku config:set JWT_SECRET=44WYiTHU7m0UkySETUpSkTHempeoaZ3oCq3ubGI3`

## Git
`$ git commit -am 'Update config to use json file`
