# `MongoDB` and Mongoose
* A few ways to use `MongoDB` inside Node
    - Mongoose is a very popular and the most powerful
    - Mongoose is an npm package

## `MongoDB`
[website](https://www.mongodb.com/)

### Install Mongoose
`$ npm i mongoose -S`

### MLab
* Gives you one free sandbox MongoDB Database

`app.js`

* Make sure to swap <USERNAME>, <PASSWORD>,<HOST>,<PORT> and <DATABASE-NAME> with your values

```js
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//
mongoose.connect('mongodb://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE-NAME>', {
  useMongoClient: true,
});

// let's me define the structure of a document
const Schema = mongoose.Schema;

const personSchema = new Schema({
  firstName: String,
  lastname: String,
  address: String
});

const Person = mongoose.model('Person', personSchema);

const john = Person({
  firstName: 'John',
  lastName: 'Doe',
  address: '555 Main St.'
});

// save the user
john.save(function(err) {
  if (err) throw err;

  console.log('person saved!');
});

const jane = Person({
  firstName: 'Jane',
  lastName: 'Doe',
  address: '555 Main St.'
});

// save the user
jane.save(function(err) {
  if (err) throw err;

  console.log('person saved');
});
// more code
app.use('/', function(req, res, next) {
  console.log('Request URL: ' + req.url);

  // get all the users
  Person.find({}, function(err, users) {
    if (err) throw err;

    // object of all the users
    console.log(users);
  });

  next();
});
// more code
```

* We log out the users
* We use `Person.find({}, callback)`
    - The callback will fire an error if there is one
    - Otherwise it will log out all the users in the Database
    - `{}` is just asking for everything
        + I could put specific queries inside these curly braces if I wanted

### Run with `$ node app.js`
* You will see in the terminal

```
person saved!
person saved
```

### Go to `localhost:3000`
* Will cause the `middleware` to run
* View the `Terminal` and you will see:

![Middleware running and pulling in `MongoDB`](https://i.imgur.com/2V5DoTx.png)

* We get back via `MongoDB`, via Mongoose, an array of JavaScript objects
* `MongoDB` provided an `_id` so I didn't need to add one myself

### View in `MongoDB` Compass
![our data inside Compass](https://i.imgur.com/6tZ0sXX.png)

* I have multiple documents inside my collection
* It's not a table, I don't have rows
* Each document contains everything, the structure and the data
* And when I queried it, this is what we got back
* It looks very similar to JSON, this is how Mongo stores data
* It is a document database
* Each one of our records is a document
* And I can query it
* What is great is the way mongo stores data is very similar to how JavaScript stores objects
