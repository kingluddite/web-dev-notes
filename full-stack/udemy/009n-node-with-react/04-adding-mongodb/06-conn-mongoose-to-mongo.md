# Connecting Mongoose to Mongo
* **tip** Kill and restart server whenever you install an npm module even if you are using `nodemon`

`$ yarn add mongoose`

* Grab your `MongoDB` URL and copy it to the clipboard

![mdb url](https://i.imgur.com/DnYcLc2.png)

`index.js`

```js
const express = require('express');
const mongoose = require('mongoose');
require('./services/passport');

mongoose.connect(
  'mongodb://<dbuser>:<dbpassword>@ds037165.mlab.com:37165/emaily-dev',
);
const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

* We need to make our `MongoDB` conn info safe
* We don't want to push this info to github
* This is a development Database but since it is on the Internet we should protect it or mess around with our data
* Replace `<dbuser>` and `<dvpassword>` with your info

## Update our keys config file
`/config/keys.js`

```js
module.exports = {
  googleClientID:
    '1005918912077-sre6e8et2sabtf7rtrcidh5k939qt2dd.apps.googleusercontent.com',
  googleClientSecret: 'gcCJByKtspHxUU_xE_LC8c96',
  mongoURI:
    'mongodb://<dbuser>:<dbpassword>@ds037165.mlab.com:37165/emaily-dev',
};
```

## Update our starter file
`index.js`

```js
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

* We import our keys and point our mongoose connection to the key

## Test in browser
`$ npm run dev`

* We see a Deprecation warning

```
(node:4031) DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`. See http://mongoosejs.com/docs/connections.html#use-mongo-client
```

* Mongoose is generating this errors
* Mongoose is interacting with `MongoDB`
* [Lots of suggestions](https://github.com/Automattic/mongoose/issues/5399) but I suggest to ignore it as it seems to be the best solution

![mongo and mongoose interacting](https://i.imgur.com/Lw6ZYLn.png)

* Mongo has a driver layer
    - Which is a layer of code that lets outside people interact with data inside it
    - These two warning are being produced with how `mongoose` interacts with Mongo
        + To repeat these errors are being fired by MongoDB about some code inside mongoose
        + You can ignore them if you want or:

## Review
![review](https://i.imgur.com/wub1C3n.png)

* We provisisioned a remote instance of Mongo
* And then we hooked it up to our app using the Mongoose library
* We brought in the idea of a Database for one reason is to satisfy one very basic need inside our app process
    - We need the ability to sign up for uses who originally sign up for our app
    - Sign out
    - And then come back some time in the future
    - And then Sign in again

* Every time a user signs up
* We'll take the `id` prop out of their Google profile
* And we'll create a new record inside of our `MongoDB` that saves that `id`
* We then can save `emails`, `posts`, `surveys`... or any other type of data we have inside our app and point it to that user record and then we can know that "this user owns this survey" and whatever else

* We now will use mongoose to create a new collection of records that we will refer to as our `users` collection
* In order to create a collection that stores a list of users, we create a `Model class` using mongoose
* Then whenever a user signs up, we'll save a new record to the `users` collection that will contain their Google `id`
    - That lets us know what resources a user has access to
    - Then a user can sign out and sign in again in the future
