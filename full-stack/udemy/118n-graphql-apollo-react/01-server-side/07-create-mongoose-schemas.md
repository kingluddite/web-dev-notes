# Create Mongoose Schemas
* Create `server/models/` folder in the root of your app
* Create `User.js` and `Cologne.js`
    - Make sure both are Capitalized
* Schemas are the _blueprint_ of every instance of that Schema that is created in our database

## Best Practice - Naming Convention
* With `mongoose` *always*
  - Spell your `model` names Capitalized and singular
  - The folder `models` is spelled lowercase

`Cologne.js`

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CologneSchema = new Schema({
  scentName: {
    type: String,
    required: true
  },
  scentPrice: {
    type: Number
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  },
  username: {
    type: String
  }

})

module.exports = mongoose.model('Cologne', CologneSchema);
```

`User.js`

```
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Cologne',
  },
});

module.exports = mongoose.model('User', UserSchema);
```

* `favorites` will hold an array of all IDs provided by our database

## Require our Schemas into our app
`server.js`

```
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

// models
const Cologne = require('./models/Cologne');
const User = require('./models/User');

// initialize app
const app = express();

// MORE CODE
```

## Test if still working
1. Open your terminal
2. Any Errors?
3. No?
4. Noice!!!

* You may see this warning:

```
DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
```

* Ignore that for now
* We'll fix that soon

## Additional Resources
* [Learn more about mongoose](https://code.tutsplus.com/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527)
* [What are JavaScript Promises](https://code.tutsplus.com/tutorials/keeping-promises-with-javascript--cms-25056)
* [Async Await](https://www.youtube.com/watch?v=9YkUCxvaLEk) 

### Notes from article about mongoose
* Mongoose is a JavaScript framework commonly used in a` Node.js` app with a MongoDB database

## What is MongoDB?
* A db that stores data as documents in a "JSON-like" structure

```json
{
  firstName: "John",
  lastName: "Doe"
}
```

* A `document` then is placed within a `collection`
* So in the above code sample:
  - The above code sample defines a `user` object
  - That `user` object would typically be part of a `collection` called `users`
* MongoDB has lots of flexibility vs a RDMS like MySQL
  - MySQL requires a strongly-defined database schema of each object it stores
  - MongoDB does not

## Why Mongoose was created?
* To give MongoDB a set structure

## What is Mongoose?
* An ODM (Object Document Mapper)

### What is an Object Document Mapper?
* Mongoose enables you to define objects with a strongly-typed schema that is mapped to a MongoDB document

### Mongoose has 8 SchemaTypes:
1. String
2. Number
3. Date
4. Buffer
    * Enables you to save binary data
    * (examples: image, encoded file like a PDF document)
5. Boolean
6. Mixed
  * Anything goes... use with caution as it kind of takes away any structure Mongoose offers
7. ObjectId
  * Commonly specifies a link to another document in your db
  * We use this to "join" collections
8. Array
  * Enables you to store JavaScript-like arrays
  * So you can use JavaScript operations on them like `push`, `pop`, `shift`, `slice` etc.

* Each data type allows you to specify:
  - A default value
  - A custom validation function
  - Indicate required field
  - A get function that enables you to manipulate the data before it is returned as an object
  - A set function that enables you to manipulate the data before it is saved to a the db
  - Create indexes to enable data to be fetched faster

* We can further customize how the data is stored and retrieved from the db

### More stuff with String data type
* Convert to lowercase/uppercase
* Trim data prior to saving
* Regular Expression to limit data allowed to be saved during validation process
* An `enum` that can define a list of strings that are valid

### Number and Date
* Support `min` and `max` value allowed for that field

### Searching
* Mongoose gives you lots of searching power
  - `find()`
  - `findOne()`
  - `findById()`
  - You can search using regular expressions

```
Book.find({
    title: /mvc/i
}).exec(function(err, books) {
    if (err) throw err;
     
    console.log(books);
});
```

* The code above searches for the case insensitive string "mvc" on the title property
* This is accomplished using the same syntax for searching a string with JavaScript
* The find function call also be chained to other query methods, such as `where`, `and`, `or`, `limit`, `sort`, `any`, etc
* Mongoose also offers two additional functions that make finding an object and saving it in a single step:
  - `findByIdAndUpdate()`
  - `findOneAndUpdate()`
