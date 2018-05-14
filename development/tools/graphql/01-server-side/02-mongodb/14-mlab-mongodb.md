# mLab and MongoDB
* Set up mongodb online
* Sign up for mLab
* Create a free account with sandbox
* point to East coast
* Create (submit free order)
* Create a user (click add database user)
    - db name: adminpeh2
    - db pwd: a12345
    - (we will blow this up and just for testing but for real setup make sure all pwd's are secure)
    - Click create
    - no collections yet (no data)

## How do we connect to this DB from our app
* We use the connection string they give us
* `mongodb://<dbuser>:<dbpassword>@ds121950.mlab.com:21950/gql-ninja`

## We'll install mongoose
* This is an ORM (Object-relational mapping)
* Makes working with DBs easier and faster because you have to type less code

`$ npm i mongoose`

`app.js`

```
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect(
  'mongodb://adminpeh2:a12345@ds121950.mlab.com:21950/gql-ninja'
);
// once the connection is open fire this callback function
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use(
  '/graphql',
  graphqlHTTP({
    // schema: schema (can be shortened)
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('now listening to port 4000');
});
```

* Run `$ nodemon app`
* You will see `connected to database` in terminal

## We now need to create a mongoose model and schema inside mongodb





