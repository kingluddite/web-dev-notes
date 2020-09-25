# XSS Protection Security Headers
* [article on hacking NodeJS and MongoDB](https://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html)

## How how to hack our login in Postman
* If you don't know a person's email but you do know their password you could do this in the Login request path

```
{
    "email": {"$gt":""},
    "password": "123456"
}
```

* And we get a token back!
    - I didn't have to know the email
    - I just had to guess a password in the Database
    - **IMPORTANT** This is a huge security hole
* And if you click the `Get logged in user` request you'll see this is the admin account:

```
{
    "success": true,
    "data": {
        "role": "user",
        "_id": "5d7a514b5d2c12c7449be042",
        "name": "Admin Account",
        "email": "admin@sftpw.com",
        "createdAt": "2020-09-24T05:22:29.650Z",
        "__v": 0
    }
}
```

* It's this admin account because that was the first one found with that password

## Let's set it up so this can't happen
* There are a lot of options
    - As for packages
        + [mongo-sanitize](https://github.com/vkarpov15/mongo-sanitize#readme)
        + You could use this
            * To use wrap the login

`sanitize(req.body.email)`

* But if you did that, you would have to do that manually for everything you want to sanitize which is obviously not the best solution

### A better package to sanitize
*[ express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize#readme)
* Just install it

`$ npm i express-mongo-sanitize`

* Then require it and add it to our middleware and it will sanitize everything and we don't need to do anything else
* Add as a piece of express middleware, before defining your routes

`server.js`

```
// MORE CODE

const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

// MORE CODE

// Sanitize data (prevent NoSQL injection)
app.use(mongoSanitize()); // Make sure to call the method ()
                          // (or it will just hang)

// MORE CODE
```

## Run
`$ npm run dev`

## Test our example from before again in Postman
### I rearranged server.js
`server.js`

```
// INSTALL 3RD PARTY DEPENDENCIES
// load environment variables
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
// Add colors for useful terminal feedback
const colors = require('colors'); // eslint-disable-line no-unused-vars
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
// End of 3rd Party
const error = require('./middleware/error'); // custom error handler
const connectDb = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });// Route files

// database
// connect database
connectDb();

// Route authentication
const auth = require('./routes/api/v1/auth');
// Route resources
const users = require('./routes/api/v1/users');
const bootcamps = require('./routes/api/v1/bootcamps');
const courses = require('./routes/api/v1/courses');
const reviews = require('./routes/api/v1/reviews');

// START UP EXPRESS
const app = express();

// init middleware
// make sure you can parse data in req.body
// app.use(express.json({ extended: false }));
app.use(express.json());


// MORE CODE
```

* I also replaced `app.use(express.json({extended: false}))` with `app.use(express.json())` in order to get the `express-mongo-sanitize` package to work
* Now after logging in with:

```
{
    "email": {"$gt":""},
    "password": "123456"
}
```

* I get the expected:

```
{
    "success": false,
    "error": "Resource not found with id of [object Object]"
}
```

* Object Object is not a useful error
* We need to make our error message even more generic with:

`middleware/error.js`

```
// MORE CODE

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404);
    }

// MORE CODE
```

* Run the request again and you'll get:

```
{
    "success": false,
    "error": "Resource not found"
}
```

## Next
* Another security improvement
* Add headers for security using `helmet`
* Prevent cross site scripting - XSS
