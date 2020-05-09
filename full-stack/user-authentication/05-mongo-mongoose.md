# Setting Up Mongoose and a Mongo DB

## Install mongo on mac
`$ brew install mongodb/brew/mongodb-community@4.0`

* Mongo community runs mongod as a service
  - You may need to restart your computer
  - You may (if you upgraded your Mac OS) reinstall XCODE shell commands
  - If mongod starts as service you don't have to keep opening it in separate tab as it runs always in the background
* If you run `brew install mongo` it will give you choices

### which version of mongo
`$ mongod --version`

### Access shell
`$ mongo`

## Mongo
Our NoSQL Database

## Mongoose
* A node module
* aka ODM (Object Data Modeling) library
    - ODM simplifies the process of adding, searching, updating records in the documents based DB
* Most popular **ODM** for working with Express and MongoDB

## Install MongoDB

## Install Mongoose
`$ npm install --save mongoose`

**Note:** efficient use of `package.json` by saving node modules to it as _dependencies_ and _dev dependencies_
* Makes it easy for other people to install the entire application with a simple `$ npm install`
* And it means we don't have to package multiple megabites of node modules to share this project with someone else

## Require mongoose inside app.js

**app.js**

```js
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' ); // ADD THIS LINE
var app = express();
```

We store Mongoose inside the mongoose variable and then we can use that variable whenever we want to use mongoose to connect to the MongoDB

## Connect to MongoDB with Mongoose

fragment of **app.js**

```js
var app = express();

// mongodb connection
mongoose.connect('mongodb://localhost:27017/bookworm');
```

* Pass one argument to Mongoose connect() method
    + the MongoDB database
        - Connects to mongodb on this machine using localhost on port 27017
            + `27017` is the default port for **Mongodb**
            + `bookworm` is the name of the Mongo data store
                * The name of the database for our site
                * That database doesn't yet exist but when our app starts Mongoose will create it

## Create variable to hold DB connection

**app.js**

```js
// mongodb connection
mongoose.connect('mongodb://localhost:27017/bookworm');
var db = mongoose.connection; // ADD THIS LINE
```

## Add error handler
* Listens for error events or errors that occure with our DB connection and logs those errors to the console

**app.js**

```js
// mongodb connection
mongoose.connect( 'mongodb://localhost:27017/bookworm' );
var db = mongoose.connection;
// mongo error
db.on( 'error', console.error.bind( console, 'connection:' ) );
```

## Test
`$ nodemon`

We get an error because we didn't start mongodaemon yet

Run `$ mongod` in another Terminal tab.

**note** nodemon doesn't restart automatically when mongo is started
so you need to stop the express server with `ctrl` + `c`, then start it again with `$ nodemon`

## Add data from registration form to mongodb
We need to tell Mongoose about that data

### Model aka Schema
This is how we tell Mongoose about the data
* gives Mongoose information about the document we want to store in Mongo
* Mongo is a document database
    - each user we add to the database will be called a document
    - and is stored in a JSON like object
## Model
Describes what that document should contain

* names used to identify each piece of info
    - name, email, password, etc.
* type of information
    - string, number, date, etc.   

## Create a `models` folder in the root of your app
* We are using one schema but you could add more schemas to store info about books, form discussions etc

### create `models/user.js`

* You pass an Object to the Schema() method
    - The Object is composed of keys and values
        + The key is the name for the data
            * aka the name of the form field
        + The value is the type of data you want to store in the key
* Mongoose lets you make any number of fields required

**models/user.js** fragment

```js
email: {
    type: String,
    unique: true,
    required: true,
    trim: true
}
```

### unique
Insures provided email address does not already exist in the DB
    - we want to make sure no two users can create an account with the same email address because that email address id's that unique user when logging into the web site
## required
MongoDB enforces the presence of the email field

## trim
Removes any whitespace before or after the user entry in that field
* we won't use `trim` for password in case user wants to use that to make their password harder to crack
* to use Schema in your app you need to export it.

**models/user.js**

```js
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  favoriteBook: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
```

## Update our code for posting to the `/register` route

### Adding Data to the DB
Require the schema inside `routes/index.js`

```js
var express = require( 'express' );
var router = express.Router();
var User = require( '../models/user.js' ); // ADD THIS LINE
```

We want to do some error checking
* Make sure the user fills out every field in form

**router/index.js**

```js
if ( req.body.email &&
    req.body.name &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword ) {
} else {
    var err = new Error( 'All fields required.' );
    err.status = 400;
    return next( err );
}
```

* `err.status = 400`
    - we return the error to our error handling middleware
    - 400 is http status code meaning bad request
        + use this to say could not be processed by server due to malformed syntax (such as missing info)
        + means the user has to change something, like filling out the form properly, before submitting the form again

* Below we also check to make sure passwords match

```js
// POST /register
router.post( '/register', function( req, res, next ) {
  if ( req.body.email &&
    req.body.name &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword ) {

    // confirm that user typed same password twice
    if ( req.body.password !== req.body.confirmPassword ) {
      var err = new Error( 'Passwords do not match.' );
      err.status = 400;
      return next( err );
    }
  } else {
    var err = new Error( 'All fields required.' );
    err.status = 400;
    return next( err );
  }
} );
```

## Test
* Now run `$ nodemon` and it will work
* If you click the `Sign Up` button at the bottom of the form, you will see that it takes you to our POST route and shows the text `user created`

## Run mongod and nodemon
1. Browse to `http://localhost:3000/register`
2. Submit form
3. You will get the `all fields required` error
4. View chrome console `Network` tab and you'll see the 400 status code
5. Enter all data in form and submit again
6. When you enter a bad email you will see **HTML5** check for proper email
7. If you run again and put in two different passwords in the password and confirmPassword fields, you will get `Passwords do not match`

## Problems with mongod
You may try to run mongod and get a message that it `appears it is already running`

If this happens, use this command to force stop mongod `$ killall mongod`

**routes/index.js**

```js
    // confirm that user typed same password twice
    if ( req.body.password !== req.body.confirmPassword ) {
      var err = new Error( 'Passwords do not match.' );
      err.status = 400;
      return next( err );
    }

    var userData = {
      email: req.body.email,
      name: req.body.name,
      favoriteBook: req.body.favoriteBook,
      password: req.body.password
    };

    // use schema's `create` method to insert document into Mongo
    User.create( userData, function( error, user ) {
      if ( error ) {
        return next( error );
      } else {
        return res.redirect( '/profile' );
      }
    } );
```

* **User** is our Mongoose model returned by our schema file
* **create()** is a Mongoose method that inserts a new document in Mongo based on that model
* `res.redirect()` if no errors, redirect to that route
* If there is an error, we pass it off to our error handling middleware

![we have data](https://i.imgur.com/7eAxQHY.png)

### Make mongo pretty
`> db.users.find().pretty()`

* Mongo created _id field (it is unique)
* `__v` is Mongo's way of keeping track of the versioning of this document

## Mongo Shell Cheatsheet

You first need to log into the Mongo shell — mongo in the terminal for Macs and Linux, or start `mongo.exe` for Windows.

`show dbs` — display the databases
`use bookworm` — specify the database you're going to work with
`show collections` — shows the document collections for the selected database
`db.users.find()` — display all the documents in the users collection
`db.users.find().pretty()` — nicer format for output documents within the shell
`db.users.drop()` — remove the users collection from the current database

[MongoDB Shell](https://docs.mongodb.com/getting-started/shell/client/)

## Trouble in Security City
We can read the password in the DB

### This is bad
* You never save unencrypted passwords in the database
* If someone gets the Db they can log in and impersonate any user on the site

## Drop Collection
`> db.users.drop()`

## Hashing and Salting
Use `bcrypt`, a hashing algorithm that converts a password to a fixed length, string of characters. Hashing lets you store a password in a database so that, even if the database is accessed, hackers won't be able to figure out the real password and log into your site.

* Our hash will always be 60 characters long

### Steps in hashing
1. User enters site
2. They enter their plain text password
3. Web app runs plain text through hash function
4. And then compares the output to the hash stored in the DB
5. If they match, the user is authenticated and logged in

### Hashing is a 1-way process
* It is very hard to unhash or decrypt a hash value
* If someone gets a hold of DB they only have password hashed values
Very hard to unhash or figure out the password even if you have the hashed password from the DB
But with enough computer power even hashed values are not secure
someone can reverse engineer a hash to get to the original password

### Salt that hash!
* To add more security we can add a `salt` to randomize the hash value
* `salt` is random data included with your input for your hash function
* A salt should be randomly generated for each password
* Salt is concatenated to the password and then processed with whatever hash function you are using
* The output of that function is stored in the database as well as the salt itself 

# bcrypt node package
* Cross platform encryption utility
* Popular option with nodejs community

## Install bcrypt
`$ npm install bcrypt --save`

## Add to models/user.js

```js
var mongoose = require( 'mongoose' );
var bcrypt = require( 'bcrypt' ); // ADD THIS LINE
```

## Mongo Hooks
Mongoose provides a **pre-saved** hook

* A function Mongoose runs just before saving a record to mongo
* We want to hash the password just before we store a new user record in the database

```js
// hash password before saving to DB
UserSchema.pre( 'save', function( next ) {

} );
```

`pre()` method takes 2 arguments
* The **hook** name `save` (before saving a record mongoose runs a function)
* Anonymous function is second argument (takes `next` as parameter)
  - Middleware provides a way to process input as its passed through a chain of commands (next here, represents the next piece of middleware or the next function that runs after this one)
  - Express takes care of figuring out which middleware runs next but in this specific case, Mongoose saves the record to mongo
  - In the presave hook, Mongoose assigns the database object its about to insert into Mongo to the JavaScript keyword `this`
    + In the context of this callback function the word `this` refers to the object we created containing the information the user entered in the signup form
    + The variable user holds the user object and its data
* `bcrypt.hash()`
  - Takes three arguments
    + Plain text password
    + Number
      * How many times to apply the encryption algorythm
        - The bigger the number, the slower the process, the greater the security
        - **10** is a good number to provide security without hurting our server performance
    + **callback function** that's run once the hash is generated
    + **user** contains the document Mongoose is about to pass into Mongo
    + **password** is the plain text password supplied by user

```js
// hash password before saving to DB
UserSchema.pre( 'save', function( next ) {
  var user = this;
  bcrypt.hash( user.password, 10, function( err, hash ) {
    if ( err ) {
      return next( err );
    }    user.password = hash;
    next();
  } );
} );

var User = mongoose.model( 'User', UserSchema );
module.exports = User;
```

## Run mongod, nodemon
1. Browse to http://localhost:3000/register
2. Use the register form to sign up
3. Submit the form
4. Open the mongo shell

`$ mongo`
`> use bookworm`
`> db.users.find().pretty()`

You should see your user data with a hashed password

![hashed password](https://i.imgur.com/r6k0hWB.png)
