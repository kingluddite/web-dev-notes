# Fetch data
## Fetch by id
* This won't work

```js
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  db.collection('Todos').find({_id: '5a271162eb222b930eb21d05'}).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  });

});
```

* Because our `_id` is not a string but an ObjectID
* We have to use our **required** `ObjectID` to turn that string into an object id

```js
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  db.collection('Todos').find({
    _id: new ObjectID( '5a271162eb222b930eb21d05')
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  });

});
```

* Now you will only pull up the record with that `_id`

## Documentation
* has real world samples
* Show you complete list of arguments (optional and required)
* [cursor](http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html)
* We already saw `toArray()` [link](http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html#toArray)
* We now look at `count()` [link](http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html#count)

## count()
* We'll comment out `toArray()` and use same function but use `count()`

```js
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectID( '5a271162eb222b930eb21d05')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // });

  db.collection('Todos').find(
  ).count().then((count) => {
    console.log(`Todos count: ${count}`);
  });
});
```

* Now we run `$ node playground/mongodb-find.md` and we get a total count of **4**
* A cursor is not all of the records it is just a **pointer

## Challenge
* Robomongo - expand recursively

```
  db.collection('Users').find({ name: 'John' }).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  });
});
```

* Returns from the Users collection all names that are **John**
