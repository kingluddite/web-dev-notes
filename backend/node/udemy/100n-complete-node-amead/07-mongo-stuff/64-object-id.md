# ObjectId
* Not autoincrementing integer like MySQL or PostGres
* Mongo was designed to scale out easily
    - Which means you can add on extra db servers to handle extra load

```
[
  {
    "name": "John",
    "age": 34,
    "location": "Los Angeles",
    "_id": "5a27188e92bcb89494e7c206"
  }
]
```

`5a27188e92bcb89494e7c206`

## How it is create
made up of a few different things 
* 12 byte value
* first 4 bytes are a timestamp (refers to moment in time id was created)
    - We don't need a created at field as it is already baked into the id
* Next 3 bytes are a machine identifier
    - If two different computers generate object id's their machine id will be different, this will insure the id is unique
* Next 2 bytes is a process id (another way to create a unique identifier)
* Next is 3 byte counter and this is similar to what mysql does

## _id
* default value for that property/field
* Could insert `_id` of `123` and insert it and it is legal

## Output just the id

```js
// MORE CODE
db.collection('Users').insertOne({
  name: 'John',
  age: 34,
  location: 'Los Angeles'
}, (err, result) => {
  if (err) {
    return console.log('Unable to insert user', err);
  }

  console.log(result.ops[0]._id);
});
```

* Will output just the id `5a271b82e82a9f94f0201318`
* But if we add `.getTimestamp()`

```js
db.collection('Users').insertOne({
    name: 'John',
    age: 34,
    location: 'Los Angeles'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user', err);
    }

    console.log(result.ops[0]._id.getTimestamp());
  });
```

* Gives us a timestamp like: `2017-12-05T22:22:10.000Z`

## Destructuring
* Lets you pull out properties from an object creating variables

```js
const user = { name: 'john', age: 30};
const {name} = user;
console.log(name)
```

### Example
```js
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');
```

* Above line 2 uses destructuring and it exactly the same as line 1

```js
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const obj = new ObjectID();
console.log(obj);
```

* Will generate an Object ID
* Commet out the destructuring example and ObjectID example as we won't need them
