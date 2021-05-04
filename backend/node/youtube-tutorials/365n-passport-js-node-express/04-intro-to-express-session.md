# Intro to Express Sessions
* Here is our starting file to practice with Express Sessions

## Install these modules
`$ npm i express mongoose express-session connect-mongo`

* You will get an error `TypeError: Class constructor MongoStore cannot be invoked without 'new'`
    - Solution is to downgrade to a previous verson

`$ npm i connect-mongo@3`

`app.js`

```
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const MongoStore = require('connect-mongo')(session);

// create the Express app
const app = express();

// <user>:<password>@
const dbString = 'mongodb://localhost:27017/tutorial_db';
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = mongoose.createConnection(dbString, dbOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: 'sessions',
});

app.use(
  session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24; // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 seconds/1 minute
    }
  }),
);

app.get('/', (req, res, next) => {
  res.send('<h1>Hello World (Sessions)</h1>')
})

app.listen(3000);
```

* Look at how session works
* How cookies work with the session
* Config for setting up the Express Session middleware

## What is the difference between a session and a cookie?
* They are different in the places the data are stored
    - A `cookie` has its data stored in a browser
        + And that browser is going to attach that cookie key/value pair to every HTTP request that it does
            * The max size a cookie can store is 4096
        + We can not store any type of user credentials or secret in a cookie
    - A `session` is going to be served on the server side (in our case the Express JS application)
        + A session can larger data than a cookie
        + So it makes sense to store larger amounts of data in a session rather than a cookie
        + We can store private user info in a session
        + Sessions give us more security because we store them server side and we have to authenticate into them with a secret key

## express-session
* [docs](https://www.npmjs.com/package/express-session)
* Shows us all the options we have access to

### What is a Session Store Implementation?
* This is deciding what persistent memory are we going to store our sessions in?
* **Remember** A session is used to store information about a particular user moving throughout the browser/client
    - In a production environment it would be useful having a Database storing this information
    - **note** By default express-session it comes with its own implementation of a session store but it is not user a Database
        + It is just using memory that is local to your application
        + And this will not be a scalable solution

### We need to set up an actual Session Store
* This means we need to connect our Database to the `express-session` middleware
    - There are lots of options
    - We will use the `connect-mongo` (one of the most popular)
        + This allows us to connect to the MongoDB Database that we have running in our Express app

#### How do we connect express-session to our MongoDB Database?
1. We have to have our Database connection

`app.js`

```
// MORE CODE

const dbString = 'mongodb://localhost:27017/tutorial_db';
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = mongoose.createConnection(dbString, dbOptions);

// MORE CODE
```

## Run the app
`$ node app`

* Then view the Database (local)

`$ mongo`

`> show databases;` And you'll see `tutorial_db` has been created

## Now we need to tell that `tutorial_db` that:
* We want to use that mongo Database for it's Session Store
* And we do that here:
    - We pass in the sessionStore object into the `store` option

```
// MORE CODE

app.use(
  session({
    // MORE CODE

    store: sessionStore,

    // MORE CODE

  }),
);

// MORE CODE
```

## Here is where the sessionStore object is set up:
```
// MORE CODE

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: 'sessions',
});

// MORE CODE
```

## Run app
`$ nodemon app`

## Run mongo
`$ mongo`

`> use tutorial_db`

`> show collections`

* You will see sessions
* `> db.sessions.find()` should be empty
* If not `> db.sessions.drop()`

## Now refresh just the app
* Since we are using nodemon, make a change in the code (add a comment) and save and the app will refresh

`> show collections` shows you `sessions`

* But `> db.sessions.find()` returns nothing
* We have an empty `sessions` collection

## Now we will hit our `/` route
1. We will refresh `localhost:3000` (this will make a HTTP request to our app)
2. Our session middleware will fire
3. It will create a session
4. That session will create a session id `connect.sid ` which will be stored in a cookie in this browser

## The `secret`
* We should store this in an environment varaible (we are just testing now so we hard code it)
* We never want to expose our `secret` to the public because it basically says if the `secret` is invalid than the `session` is invalid too
    - `resave` and `saveUnitialized` 

