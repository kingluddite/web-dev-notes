# Mongo Vocabulary
![vocab diagram](https://i.imgur.com/Yh0NVlX.png)

## Connecting to Mongo and Writing Data
* [node mongodb native](https://github.com/mongodb/node-mongodb-native)
    - We'll use this to connect our app to our **mongodb** database from inside `node.js`
* [documentation](http://mongodb.github.io/node-mongodb-native/)
    - We'll use 2.2 Driver
        + [References](http://mongodb.github.io/node-mongodb-native/2.2/)
        + [API](http://mongodb.github.io/node-mongodb-native/2.2/api/)
* [api-doc](http://mongodb.github.io/node-mongodb-native/2.2/api/)

## Create new project folder
`$ mkdir node-todo-api`
`$ cd node-todo-api`
`$ npm init -y`
`$ mkdir playground`
`$ touch playgound/mongo-db.connect.js`

### Install mongodb
* We need this to run the Todo API app
* `$ yarn add mongodb`
* MongoClient.connect(URL);
    - Could be an AWS URL
    - Or Heroku URL
    - Or a local URL (in our case)

`playground/mongo-db-connect.js`

```js
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDB server');

  db.close();
});
```

* URL is local
* We add our new db at end of URL (this creates a new db)
* We use `err` for errors` and db for the database object
* If there is an error we use `return` to make sure it leaves and ends function and does not go any further and we never see the log to "connect to mongodb server'
* If we are successful we log out `Connect to MongoDB server`
* We close the db when we are finished 

## Run with:
`$ node playground/mongodb-connect.js`

* Make sure `mongod` is running in one terminal tab
* You will see `Connected to MongoDB` server that lets you know you are connected
* `mongod` shows the connection was accepted and ended

![mongo connection](https://i.imgur.com/uhkN9jF.png)

* In MongoDB, unlike other DBMS, you don't have to create a database before you start using it
* To create a DB, just give it a name
* But if you try to see the DB inside Robomongo or Compass you won't see it until you add data inside your DB
* db.collection('NAMEOFCOLLECTION')
    - Like DB you don't need to create it first, just name it and it will be created on the fly
    - .insertOne()

## Insert document into nodejs
`mongodb-connect.js`

```js
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  db.collection('Todos').insertOne({
    text: 'Wash car',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert todo', err);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.close();
});
```

* Run this `$ node playground/mongodb-connect.js`
* And you will get this similar output:

```
Connected to MongoDB server
[
  {
    "text": "Wash car",
    "completed": false,
    "_id": "5a27153acf49bd94283572d8"
  }
]
```

## View in Robot 3T (formerly Robomongo)
![robo3t](https://i.imgur.com/2NzIH4m.png)

## Challenge
* Comment out all code in db.collection
* Insert new document into Users collection
    - name, age and location properties
    - add error handling
    - print ops to screen
    - view record in terminal and Robomongo
