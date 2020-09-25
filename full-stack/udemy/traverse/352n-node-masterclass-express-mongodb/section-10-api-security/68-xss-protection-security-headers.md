# XSS Protection & Security Headers
* [helmet](https://github.com/helmetjs/helmet)
    - Helmet helps you secure your Express apps by setting various HTTP headers
    - It's not a silver bullet, but it can help!

## helmet
* Easy to implement:

1. Just bring it in 
2. And initialize the middleware

```
const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(helmet());
```

* It adds a bunch of header values that can help make our API more secure

## It adds lots of stuff
```
app.use(helmet());

// ...is equivalent to this:
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
```

## Add it to our server
`server.js`

```
// MORE CODE

const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

// MORE CODE

// Set security headers
app.use(helmet());

// MORE CODE
```

## Let's see what we have in Postman
* First comment out this line:

`server.js`

```
// MORE CODE

// Set security headers
// app.use(helmet());

// MORE CODE
```

* View all bootcamps
* Look at Headers tab in the response

![headers without helmet middleware](https://i.imgur.com/Hp2moKQ.png)

## Uncomment and test again
`server.js`

```
// MORE CODE

// Set security headers
app.use(helmet());

// MORE CODE
```

* And check the response Headers tab again

![a lot more headers stuff](https://i.imgur.com/SZYeNQc.png)

* Now our API is a little more secure

## Add another package - xss-clean
* [xss-clean docs](https://github.com/jsonmaur/xss-clean)
* `Node.js` Connect middleware to sanitize user input coming from POST body, GET queries, and url params
    - Works with Express, Restify, or any other Connect app

### Easy to install
`$ npm i xss-clean`

### Easy to use
```
var restify = require('express')
var xss = require('xss-clean')

var app = restify.createServer()

app.use(restify.bodyParser())

/* make sure this comes before any routes */
app.use(xss())

app.listen(8080)
```

## Here is an example of XSS
* Log in as a publisher

```
{
    "email": "publisher@sftpw.com",
    "password": "123456"
}
```

## Create a new bootcamp
* Put in a script inside the name
* **note** Keep in mind this could be some harmful JavaScript code

```
{
    "name": "Test bootcamp<script>alert('bad')</script>",
    "description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer",
    "website": "https://devworks.com",
    "phone": "(111) 111-1111",
    "email": "enroll@devworks.com",
    "address": "233 Bay State Rd Boston MA 02215",
    "careers": [
        "Web Development",
        "UI/UX",
        "Business"
    ],
    "housing": true,
    "jobAssistance": true,
    "jobGuarantee": false,
    "acceptGi": true
}
```

* And click send and check out the script in the response

```
// MORE CODE

"acceptGi": true,
        "_id": "5f6d06bbb4babb5e267e87f4",
        "name": "Test bootcamp<script>alert('bad')</script>",
// MORE CODE
```

* So if above is embedded in our response it will be embedded in our HTML
* We don't want the possibility of this happening

## Delete that bootcamp
* We'll install the package and then try this again

`$ npm install xss-clean`

* Run our server

`$ npm run dev`

## Use this middleware
`server.js`

```
// MORE CODE

const helmet = require('helmet');
const xss = require('xss-clean'); // ADD!

// MORE CODE

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss()); // ADD!

// MORE CODE
```

## Test again
* As a publisher once again create a new bootcamp with a script tag

```
{
    "name": "Test bootcamp<script>alert('bad')</script>",
    "description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer",
    "website": "https://devworks.com",
    "phone": "(111) 111-1111",
    "email": "enroll@devworks.com",
    "address": "233 Bay State Rd Boston MA 02215",
    "careers": [
        "Web Development",
        "UI/UX",
        "Business"
    ],
    "housing": true,
    "jobAssistance": true,
    "jobGuarantee": false,
    "acceptGi": true
}
```

* And send and see what happens:

```
// MORE CODE

"name": "Test bootcamp&lt;script>alert('bad')&lt;/script>",
// MORE CODE
```

* The script take has been escaped and won't be in our Database
* Delete the bootcamp

## Next
* Add in a rate limit
* We want to prevent someone from making 1000 requests per minute
    - We need to set a limit for our API
