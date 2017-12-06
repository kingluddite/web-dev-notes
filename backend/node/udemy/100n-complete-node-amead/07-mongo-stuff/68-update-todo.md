# Update Todo
* `findOneAndUpdate()`
    - Similar to `findOneAndDelete()`
* Let's us find a document and get the new document back

## Change false to true
* We will use `findOneAndUpdate()` to change false to true for a todo item
* Returns a promise if no callbacks are passed in
* Look at [API under Collection](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate)
* The first argument is the filter (usually filter by _id)

## MongoDB update operators
* This [documentation](https://docs.mongodb.com/manual/reference/operator/update/) is specific to MongoDB but will work with all of the drivers
* $currentDate
* $inc
* $min
* $max
* $mul
* $rename
* $set (most important)
* $setOnInsert
* $unset

## The third argument - returnOriginal
* Defaults to `true`
* When we update a document we want to get back that document

## Challenge
* Use `findOneAndUpdate()` to update the Users collection and change a name to Godzilla
* Also increase the age of the user by 1 using the `$set` operator

```js
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5a283492665441f3604835e0')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // change Jen's name to Godzilla
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a27188e92bcb89494e7c206')
  }, {
    $set: {
      name: 'Godzilla'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });
  
  // db.close();
});
```



