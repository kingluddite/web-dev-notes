# Connecting and inserting documents
## MongoDB Drivers
* The Drivers are the libraries that allow you to interact with the MongoDB Database from a wide range of programming languages 
* [MongoDB drivers](https://docs.mongodb.com/drivers/)

### The Node.js Driver for MongoDB
* [node.js driver for mongodb docs](https://docs.mongodb.com/drivers/node/)
* The Database needs to be running in order for us to connect to it
    - **note** So we need to use terminal windows
        + One will run mongodb (start it as a Service to save time)
        + The other terminal window will run app commands like `$ npm install`

## The connection
```
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
```

### Why do we use `127.0.0.1` instead of `localhost`
* Not sure. But it is apparent that using localhost causes problems and can be very slow

## This is all we need to connect to our Database
```
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' // Database name
```

* That's all the info we need to connect to our Database

## Now we need to connect to the server from the MongoClient
```
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' // Database name
```

* `useNewUrlParser` - the original url parser is being deprecated so we need to use this option to avoid getting the deprecated warning in the browser
    - It is now required to passed in as an option in order for our URLs to be parsed correctly so we can connect to the server
* The 3rd parameter is a callback function
    - This callback will be called when we are actually connected to the Database
```
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' // Database name

MongoClient.connect(connectionURL, { useNewUrlParser: true }, () => {

    })
```

* **note** Connecting to the Database is NOT a synchronous operation
    - It is an asynchronous operation and the callback function is complete
    - And it can either fail or succeed and you'll get different parameters depending on what happens
    - This callback will get called with either an `error` or a `client`
        + If the first parameter exists that means something went wrong and it will contain an error message describing why it couldn't connect
        + If the second parameter exists that means things went well and you are now connected to the server and you're ready to start manipulating your Databases

```
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' // Database name

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to Database')
  }

  console.log('Connected correctly'); 
})
```

## The MongoDB "connection pool" 
* Look at the mongod tab
* You'll see when you made your connection it shows up in this terminal tab
* You may at times see you have 5 or 6 open connections
    - This is because when we connect with mongodb it uses a connection pool, so there are actually more connections that are open behind the scenes, even though we called connect only once
        + This makes sure we're still our Node js app can still communicate quickly even if we are trying to perform a lot of operations at the same time
* When you connect to the mongodb Database via node you won't be able to type in the terminal until you `ctrl` + `c`

## Insert very first document
* **note** There is no need to create a Database
    - Simply by picking a name and accessing it mongodb will automatically create it for us

```
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' // Database name

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to Database')
  }

  const db = client.db(databaseName);
})
```

* That's it. MongoDB just create a Database for us

```
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' // Database name

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to Database')
  }

  const db = client.db(databaseName);

  db.collection('users').insertOne({
    name: 'John',
    age: 27
    })
})
```
