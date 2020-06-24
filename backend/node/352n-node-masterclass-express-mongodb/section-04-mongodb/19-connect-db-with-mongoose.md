# Connecting to the Database with Mongoose
## Mongoose
* [docs](https://mongoosejs.com/)
* Used for object modeling in Node.js
* It is an abstraction layer to interact with our Database
    - To connect to
    - To write queries
    - We can create custom Mongoose middleware
    - We can create models and validation
    - With NoSQL you don't do all of the above you don't do that stuff on the Database layer (like you would with a Relational Database like Postgress or MySQL)
        + With a relational Database you have to defined each field and its type and length
        + With NoSQL you have much more freedom but you model that stuff in the application layer and that is the purpose of Mongoose
            * And it provides a level of security so that people can't just insert whatever they want into our Database

### Install Mongoose
`$ npm i mongoose`

### config
* To keep server.js clean from Database stuff we'll create a config file for our connection info to MongoDB

`db.js`

```
// MORE CODE

const mongoode = require('mongoose');

const connectDB = () => {
  mongoose.connect().then(conn => {
    //
  })
}

// MORE CODE
```

* We could use the above syntax but instead we'll use `async/await` syntax
    - It's cleaner and easier to read
    - mongoose.connect() returns a promise
        + First parameter is the URI (we get that from Atlas)

`config/config.env`

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://myuser:mypassword@cluster0-unb2p.mongodb.net/devcamper?retryWrites=true&w=majority
```

* We add MONGO_URI
    - We replace the `<password>` with our Database user password
    - You get this from Atlas (URI for app)
    - You change the Database name from `test` to `devcamper`
        + MongoDB creates db when you first store stuff inside it (by default they'll name the Database `test` and that is not a good Database name)

`config/db.js`

* Make sure we export our Database connection or we'll never be able to use this in another file

```
const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
}

module.exports = connectDB;
```

## Let's add a log to show we connected to our Database
* We never know if we are connected

## We need to tell our `server.js` about our Database connection
* We need this code to be placed after our `dotenv.config()` line because that has our Database configuration inside it
    - We should place this at the top and we'll move our route files require below it
* We need to call our Database method we just wrote

## Start server to see if the connection works
`$ npm run dev`

MongoDB Connected: `cluster0-shard-XXX.mongodb.net`

* We get a ton of errors and we see that we are connected

## Let's get rid of the annoying terminal errors
* We just pass an object into our mongoose method and pass some key values that will remove these errors

`server.js`

```
// MORE CODE

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  // show developer we are connected to MongoDB
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

// MORE CODE
```

* You'll see all those annoying errors are gone

## IMPORTANT
* If you change the stuff inside `config/config.env` you need to restart the server for the changes to take effect
* Change the password to a wrong password
    - re-start server and you'll get this error

```
[DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

* In the future you won't get a non-zero exit code
* We know our password is wrong
* We did not set up an error handler
* We could have added a `.catch` if we used the `.then` syntax and handled the rejection
    - Since we are using async/await we could wrap this in a `try/catch` block
    - But let's do something more useful - we'll create a global handler for unhandled promise rejections

## Setting up a global handler for unhandled promise rejections
* We'll do this in `server.js`
* We'll store our express listen method in a variable
    - And this is so we can close the server and stop our app if we get this unhandled rejection

#
`server.js`

* We use the `process` object
* We use `on` and listen for `unhandledRejection` (and we run a function that takes in an error and a possible promise)
* We want the app to fail if this event happens 
    - We use server.close() and it take in a callback and we use `process.exit()` to exit out of our application and we want it to exit with failures (and we pass in a `1` to accomplish this)

```
// MORE CODE
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
```

* Now we get a much easier error to understand

```
Server running in development mode on port 5000
Error: Could not connect to any servers in your MongoDB Atlas cluster. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/.
[nodemon] app crashed - waiting for file changes before starting...
```

* We see the error and the app then crashes
    - We do this because if our Database isn't working we don't want our app to work
    - Put the correct password back in and all should be well again

## Next - Add colors to console 
