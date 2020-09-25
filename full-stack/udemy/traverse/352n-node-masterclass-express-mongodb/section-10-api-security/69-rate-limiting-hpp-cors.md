# Rate Limiting, HPP and CORS
## express-rate-limit
* [express-rate-limit docs](https://github.com/nfriedly/express-rate-limit)
* Basic rate-limiting middleware for Express
* Use to limit repeated requests to public APIs and/or endpoints such as password reset

## Install it

`$ npm install --save express-rate-limit`

## Use it

```
const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);
```

## hpp
* [hpp docs](https://github.com/analog-nico/hpp)
* Express middleware to protect against HTTP Parameter Pollution attacks
* Easy to implement
    - Just bring it in and add the middleware

`npm install hpp --save`

### Use it
```
// ...
var hpp = require('hpp');

// ...
app.use(bodyParser.urlencoded()); // Make sure the body is parsed beforehand.

app.use(hpp()); // <- THIS IS THE NEW LINE

// Add your own middlewares afterwards, e.g.:
app.get('/search', function (req, res, next) { /* ... */ });
// They are safe from HTTP Parameter Pollution now.
```

## Add it to our server
`server.js`

```
// MORE CODE

const xss = require('xss-clean');
const rateLimit = require('express-rate-limit'); // ADD!
const hpp = require('hpp'); // ADD!

// MORE CODE

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 1
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// MORE CODE
```

## Run server
`$ npm run dev`

## Test in Postman
* We set it to 1 request per minutes
* Try to request all bootcamps twice
* After the second request you'll get this 429 Too Many Requests status error

```
Too many requests, please try again later.
```

## Let's change it to 100 requests per 10 minutes
`server.js`

```
// MORE CODE

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100 // Update this line
});

// MORE CODE
```

## Let's add CORS functionality
* We're using Postman so we are able to do this
* But if we were using another domain and we had this API on a different domain, we would get a Cross-origin error in Chrome
    - We want to prevent that
    - We want other domains to be able to connect to our API (it's a public API)
        + That's what we are making it
        + If you don't want it to be, you don't need to use CORS

## We want to make our whole API public
* [express cors docs](https://github.com/expressjs/cors)

## Install cors
`$ npm i cors`

`server.js`

```
// MORE CODE

const hpp = require('hpp');
const cors = require('cors'); // ADD!

// MORE CODE

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors()); // ADD!

// MORE CODE
```

* Now when we upload to a domain
* And if we create a frontend app that is on a different domain we'll still be able to communicate with our API

## Next
* Add documentation
* Our API is public
    - For someone to use our API we want instructions on how they can
    - The documentation should explain each route, what it does, shows what is suppose to be sent
* Postman has a built in utility to do that
* Then we'll also use DocGen to create HTML files from that documentation that we can add to the index page of our API
    - So if we upload our API to devcamp.io, if they go to the homepage of devcamper.io we want that documentation to show 
