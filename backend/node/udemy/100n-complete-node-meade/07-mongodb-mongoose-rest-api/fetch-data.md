# Fetch data
`mongodb-find.js`

```js
const { MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').find().toArray().then((docs) => {
    console.log('Todos'); 
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  // db.close();
});
```

`$ node playground/mongodb-find.js`

* manually change in robomongo
* change by edit document to true for completed walk the dog
* run the code again and see that we in fact did update our code

fetch only completed set to **false**

```js
const { MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    console.log('Todos'); 
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  // db.close();
});
```

find({completed: false}) ---- is how we only select todos that have completed set to false, that is how we can query our result set based on field values
