# Setup `MongoDB` and Mongoose
* We'll setup our `MongoDB`
* We'll setup Mongoose and our schema for our Database

## Local Copy of `MongoDB`
* We could use mLab but they only only you one free sandbox Database
* So we will create a local copy of our `MongoDB`

### Start mongodaemon
`$ mongod`

* Open another Terminal tab

### Create `/db/db.js`
`db.js`

```js
const mongoose = require( 'mongoose' );
mongoose.Promise = global.Promise;

mongoose.connect( 'mongodb://localhost/node-todo', {
  useMongoClient: true,
}, function( err ) {
  if ( err ) {
    console.log( 'Failed connecting to MongoDB!' );
  } else {
    console.log( 'You have connected to Mongo!' );
  }
} );
```

* Update `app.js` to point to our `db.js`

`app.js`

```js
const express = require('express');
// start express
const app = express();

// HERE IS WHERE WE REQUIRE THE DATABASE
require( './db/db' ); // ADD THIS LINE
// more code
```

## If you use mLab
* You need to create the Database
* You need to create the user and password for that user
* I suggest using MongoDB Compass and for a good UI connect by copying the mLab connection informationa nd pasting it into your MongoDB Compass

### Config
* We want to separate our important information in the config file
* You should not store your username and password in plain text in a real world project
    - You should encrypt and decrypt it
    - We'll just set them up in plain text for simplicities sake
* Make a folder
    - `$ mkdir config`
    - `$ touch config/config.json

`/config/config.json`

```json
{
  "uname": "test",
  "pwd": "test"
}
```

* Create `config/index.js`

`/config/index.js`

```js
const configValues = require('./config');

module.exports = {

  getDbConnectionString: function() {
    return `mongodb://${configValues.uname}:${configValues.pwd}@HOST:PORT/DATABASE`
  }
}
```

* I have an object that when you require config from outside the config folder will get this object with the method on it and return the connection string to the Database
* We will use that to connect to `MongoDB` via mongoose
* I could easily pass to this function `dev` or `prod` and have that be a setting in the environment variables in NodeJS
* All of the above is if you are not using a local Database and a remote mongodb like mLab

### Run the config
* I could put it into a separate file
* But I'll put it in `app.js` for simpicity

`app.js`

```js
const express = require('express');
// start express
const app = express();
// this will run the `/config/index.js` file automatically
const config = require('./config');
// more code
app.set('view engine', 'pug');

// suggested way
// mongoose.connect(config.getDbConnectionString());
// I use this way to get rid of error
mongoose.connect(config.getDbConnectionString(), {
  useMongoClient: true,
}, function( err ) {
  if ( err ) {
    console.log( 'Failed connecting to MongoDB!' );
  } else {
    console.log( 'You have connected to Mongo!' );
  }
});
// more code
```

**important** YOU CANNOT CREATE USERS ON THE LOCAL DATABASE

* Trying to connect to local using MongoDB Compass
    - You can connect but you won't see your Database yet as we didn't create any collections as of yet and it is empty
* We connect to `MongoDB` but where do we disconnect?
    - We don't
    - Mongo by default is a single connection that stays open and we'll be able to run queries and updates to it

## Create your model
* Create models directory

`$ mkdir models`

* Create `todoModel.js`

`$ touch models/todoModel.js`

`todoModel.js`

```js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  username: String,
  todo: String,
  isDone: Boolean,
  hasAttachment: Boolean
});

const Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos;
```

* I now have a reusable model
* I can create them, use them, update them and delete them
* Mongoose will give me all the methods for CRUD inside the `MongoDB`

## Next - Add some seed data
