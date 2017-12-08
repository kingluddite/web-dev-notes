# Delete Todos
* Add this todo doc to robomongo 'Todo' collection

```
{
    text: 'Eat Lunch',
    completed: false
}
```

* Save it
* Create two more todos with exact same content

## 3 methods to remove data
* `deleteMany()`
    - Let's us target many documents and remove them
* `deleteOne()`
    - Let's us delete one document and remove it
* `findOneAndDelete()` --- very useful method
    - Let's you find a doc and remove it and it also returns those values
        + Not only can you delete a todo
        + But you can also tell the user which todo got deleted 

## Delete 3 Eat lunch todos
```js
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
    console.log(result);
  });

  // deleteOne

  // findOneAndDelete

  // db.close();
});
```

`$ node playground/mongodb-delete.js`

* We get a lot of feedback
* But the import part `result: { n: 3, ok: 1 },`
* `n` is number of documents deleted

## `deleteOne()`
* Does same thing as `deleteMany()` but finds first record and deletes it
* Here is deleteOne() in action
* We add two docs in Todos in robomongo with `Eat Lunch`
* Using `deleteOne()` you will see only the first record is deleted

```js
db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
  console.log(result);
});
```

`$ node playground/mongodb-delete.js`

* And only first record is removed (with 'Eat Lunch')

```js
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });
  //
  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });
  // findOneAndDelete
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(result);
  });
  // db.close();
});
```

`$ node playground/mongodb-delete.js`

* We get back this result

```js
{ lastErrorObject: { n: 1 },
  value:
   { _id: 5a2710ccd302d992fb189343,
     text: 'Wash car',
     completed: false },
  ok: 1 }
```

* Run the code several times to watch it delete and return the document info that was deleted
* There is a `lastErrorObject` and a `value` object

## Challenge
* Create 4 duplicate docs in robomongo with { text: 'Get Oil Change'}
* Use deleteMany() to delete all of them
* Find and delete a record by it's `_id`
* Do them one at a time commenting out when finished the first `deleteMany()` task

```js
// delete all todos with 'Buy Groceries'
  db.collection('Todos').deleteMany({text: 'Buy Groceries'}).then((result) => {
    console.log(result);
  });

  // delete record with this id `5a271162eb222b930eb21d05`
  db.collection('Todos').findOneAndDelete({
    _id: new ObjectID('5a271162eb222b930eb21d05')
  }).then((results) => {
    console.log(JSON.stringify(results, undefined, 2));
  });
```

## Git stuff
`$ git status`
`$ git add .`
`$ git commit -m 'Add delete script'`
`$ git push`
