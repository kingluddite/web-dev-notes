# Mongoose
## ORM
Object Relational Mapping
* Mongoose is an ORM npm library
* Makes is great for structuring your 
* You don't need mongoose to do what we need to do with our MongoDB but is sure makes life a lot easier

## Wipe our database
* Robomongo -> drop database

## Mongoose web site
* [mongoose js](http://mongoosejs.com/)

## Install Mongoose
`$ yarn add mongoose`

## Create new folder and file
`server/server.js`

* Mongoose has a lot going on compaired to how we connected before
* We can keep our connection simple
    - If we want to save something using mongoose
    - It won't have time to save but mongoose behind the scenes will be waiting for the connection before it tries to make the query, so this is a major plus of using mongoose
    - We don't have to micro manage the order of things
    - Mongoose takes care of that for us
    - Mongoose supports callbacks by default but most modern developers prefer Promises as they are a lot simpler to chain, manage and scale
    - So we need to tell Mongoose which Promise library we are going to use
    - Promises weren't originally built into JavaScript, it came from libraries like **Bluebird** and so many people started using it that they added it to the language
        + We tell mongoose we want to use a built-in Promise library instead of a 3rd party Promise library
        + `mongoose.Promise = global.Promise`
            * We only have to do this once

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
```

* That's it!
* Mongoose is now configured

## Todos Model
* We'll create a model that holds all of our Todos in one place
* We'll create a mongoose model so mongoose knows how to store our data

### Our first model
* We will create a model
* Create a new document in that model
* Save that document to the db

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

const newTodo = new Todo({
  text: 'Wash Ferrari'
});

// save to db
newTodo.save().then((doc) => {
  console.log('Saved todo', doc);
}, (err) => {
  console.log('Unable to save todo', err);
});
```

* We get this annoying warning

```
(node:53989) DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`. See http://mongoosejs.com/docs/connections.html#use-mongo-client
```

* But we save our record
* Check robomongo and you'll see it
    - Mongoose automatically lowercased and pluralized `Todo`

`Saved todo { __v: 0, text: 'Wash Ferrari', _id: 5a284a5835c3d8d2e5a93daa }`

* `__v` is internal to mongoose

## Challenge
