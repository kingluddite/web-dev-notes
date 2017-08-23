# bodyParser Middleware
* **Express Gotcha** When you make post requests to an Express Server, Express does not by default parse the request payload
* So we have to install another module on top of express that instructs Express that whenever someone sends in a post request, it should take the request body, parse it and then make it and then make it available to everything inside of our application

## search npmjs.com for `body-parser`
* [link to body-parser](https://www.npmjs.com/package/body-parser)
* "Parse incoming request bodies in a middleware before your handlers, available under the `req.body` property"

`$ yard add body-parser`

## Require it
`index.js`

```js
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser'); // add this line
const secretKeys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(secretKeys.mongoURI);

const app = express();

app.use(bodyParser.json()); // add this line

// more code
```

* The documentation tells us that body-parser it Express Middleware
* Express Middlewares are wired up to Express by the `app.use()` call
    - These are all middlewares that operate on the incoming request before they are sent off to the `requestHandlers`
* Now anytime a put, patch, or post request or anything else that has a request body, comes into our app, this middle `bodyParser.json())` and then assign it to the `req.body` property of the incoming request object
