# Creating Models with Mongoose
* We can use mongoose to create models
* And we can create objects on these models
* Then we can use these objects to directly access the Database
    - Behind the scenes mongoose will create the appropriate collections for our models and manager our data there
    - We don't have to write our queries
    - It is very intuitive

## Two Models
* `models/message.js`
* `models/user.js`


* We want to be able to store both `messages` and `users`
* `Schema` is a helper object that enables me to create the blueprint of my models

`const Schema = mongoose.Schema;`

## schema vs Schema
* `schema` is my own schema that I set up (_a kind of instance of the `Schema` blueprint_)

### Message model
* `type: Schema.Types.ObjectId`
    - What is the `ObjectId` type?
        + The internal type mongoose uses to store the `ids` of the different objects stored in the Database
        + Each object we store in `MongoDB` automatically gets an `id` (even though we don't set up an `id` field in our schema)
        + In the end it is a `string` but it is managed differently since it is also created on its own (an internal thing mongoose does for us)
* We can't instantiate this blueprint, we need a model to do so

`module.exports = mongoose.model('Message');`

* Because of the above line we'll be able to create a new message later on using `new Message()`
* This also determines the name of the collection mongoose will create for me automatically in the Database
    - When it does take our `Message` it will automatically make it lowercase and plural
        + `messages`

### Model 2nd argument --- the Schema
`module.exports = mongoose.model('Message', schema);`

`models/message.js`

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('Message', schema);
```

## User Model
* `unique` is a property recognized by mongoose, it is NOT validated automatically
    - In order to make sure our emails are unique we will install `mongoose-unique-validator`

`$ npm i -S mongoose-unique-validator`

* This will enable us to get our additonal validation for unique emails
* But in order for this to work we must use the mongoose `plugin()` method

`models/users.js`

```js
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unqiue-validator');
const Schema = mongoose.Schema;

const schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, require: true},
  email: {type: String, required: true, unique: true},
  messages: [{type: Schema.Types.ObjectId}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
```

* As it currently stands we haven't told mongoose about the connection between the users and messages collections
* We need to tell moongoose that this:

`messages: [{type: Schema.Types.ObjectId}]`

* `messages` above refers to our `module.exports = mongoose.model('Message', schema);` model
* And `user` here:

```js
// more code
user: {
    type: Schema.Types.ObjectId
  }
// more code
```

* Refers to the `user` model `module.exports = mongoose.model('User', schema);`
* We did say that it will hold an `id`

## ref
* `ref` tells mongoose that this field has a connection to another model
* Below I add the `ref` to both my collections

`models.js`

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
  } // our ref was just added here
});

module.exports = mongoose.model('Message', schema);
```


`user.js`

```js
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unqiue-validator');
const Schema = mongoose.Schema;

const schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, require: true},
  email: {type: String, required: true, unique: true},
  messages: [{type: Schema.Types.ObjectId, ref: 'Message'}] // ref added here
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
```

* Now we have made the connection between both collections and later we will use this connection
