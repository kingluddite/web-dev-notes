# Middleware
* Fundamental to Express
* It is how almost how all plugins are working

## What is Middleware
We have a `req` and `res` (request and response)

`req` is the data that comes in

`res` is the data that goes out

Sometimes inbetween the `req` and `res` a bunch of work needs to happen

* You may need to:
    - Call a Database
    - Do some data normalization
    - You could do it in the homepage but you may want to use middleware to:
        * Upload the file
        * Resize the file
        * Rename the file because you don't want to associate that code just with the home page
    - That might need to happen on any specific page

![diagram of middleware](https://i.imgur.com/IUtN6al.png)

## Flow Of Logging In a User
1. Start with a request and end with displaying a login
2. Log in with a form tag with a POST request
3. At end of the journey they are either: 
  * Logged in and we should them the dashboard
  * Or they are not logged in and we show them an error AND redirect them to the login page

## In between all of that we may need to do a bunch of stuff
* `bodyParser` will make all the form fields available to us on the `request` **body** object
    - `req.body.email`
    - `req.body.password`

### What is `next()` used for?
* "I'm done with this middleware... and onto the next middleware"

## Normalize the email
* prepare/validate data

`req.body.email = req.body.email.trim().toLowerCase();`

* next() - done with this middleware... and onto the next middleware

## authorizeUser
* Will lookup the user and check their password
    - And if that's true
        + It will put the user's information onto the `request` object

`req.user = { name: 'John', email: 'j@doe.com' };`

* `middleware` is kind of an assembly line where we add stuff to the request object

### If valid at end of the user flow
* We'll **displayProfile** 

`res.render('account', { user: req.user })`

### If invalid **displayLogin** 
* Show an error to the user
* Redirect the user back to the `/login` route

```
req.flash('error', 'Invalid Login');
res.redirect('/login');
```

`storeController.js`

```
exports.myMiddleware = (req, res, next) => {
  req.name = 'John';
  next();
};

exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};
```

`routes/index.js`

```
const express = require('express');
const storeController = require('./../controllers/storeController');

const router = express.Router();

// Do work here
router.get('/', storeController.myMiddleware, storeController.homePage);

module.exports = router;
```

## Refresh page and you'll see `John` in the Terminal
* We used Middleware to add a **name** to the `request`
* And then called that **name** from the `next()` function
* (If you ever used React) --- Kind of like a React **LifeCycle** where we can interact with the code `after the request` but <u>before the response actually happens</u>
* **note** That was **route specific** middleware

## Global Middleware
* Every single request that goes through the Application will get run through the middleware before it even gets to your router
* This is where we would introduce any application-wide functionality, features plugins
* That is what `app.js` is for

`app.js`

## app.use()
* This means we are using this global middleware
* Even before we get to our routes we are going to run all this middleware

`app.use(express.static(path.join(__dirname, 'public')));`

#### public
* We have a folder called `public` and inside it we will have:
    - `dist`
    - `images`
    - `js`
    - `sass`
    - `uploads`
* If anyone requests anything from the public folder Express will serve it
* Before it even tries to think if it is a route or not

## bodyParser
```
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
```

* Any time user submits data via `<form>`
* You will get that data that has be submitted on your `req.body`
    - It will all be **URL encoded**
    - You don't have to worry about dissecting it from the **request** at all

## expressValidator()
```
app.use(expressValidator());
```

* Will validate email stuff

## cookieParser()
* By default Express doesn't do anything with cookies
* Will give you `req.cookies` and we'll need that to work with our log in session

```
exports.myMiddleware = (req, res, next) => {
  req.name = 'John';
  res.cookie('name', 'Express is fun', { maxAge: 9000000 });
  next();
};

exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};
```

Refresh browser and check `Application` inside Chrome dev tools

* You will see `name` as a cookie

![name as cookie](https://i.imgur.com/YQnsPcm.png)

* Cookies and Session work together

## Sessions
```
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
```

* `Sessions` allow us to store data on our visitors
* Their logged in state
* How long they were logged in
* `Sessions` are stored in **MongoDB**

## Passport
```
app.use(passport.initialize());
app.use(passport.session());
```

* We'll talk about that when we talk about Logging in

## Flash
`app.use(flash());` - We'll talk about flash when we code logging in page

## locals
* Update this part of `app.js`

```
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});
```

This middleware gives us all of our local helpers (enables us to use the `h` variable)

## routes
Finally, after all that middleware we inject our own routes

`app.use('/', routes);`

* We say anything that comes after the `/` use our routes
* Our `routes.js` exports our router

`routes.js`

```js
// more code
module.exports = router;
```

* We import routes and use them:

`app.js`

```js
// more code
const routes = require('./routes/index');
// more code
app.use('/', routes);
// more code
```

* Then we have some more middleware

## Error Handlers
* If something goes wrong in that route we need our error handlers
* So if there is no route found it moves on to the **next** middleware

## notFound
* Someone goes to a bad URL we'll show them our 404 page

`app.use(errorHandlers.notFound);`

* That points to a file that passes the error and we could show it
* If we are in develpment we show the error
* In production we log the error and handle it internally

### Just like Plinko
* Put a request in at the top and it filters its way all the way down
* [plinko youtube](https://www.youtube.com/watch?v=yKTBv7ZqFcU)

### Our main "outpoint"
* In most cases our outpoint is in the `routes`

`storeController.js`

```
exports.myMiddleware = (req, res, next) => {
  req.name = 'John';
  res.cookie('name', 'Express is fun', { maxAge: 9000000 });
  if (req.name === 'John') {
    throw Error('John who?');
  }
  next();
};

exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};
```

### Stack Trace
* Refresh browser
* You will see our error in dev console
* And a `stack trace` on the page of what lead up until that error (_most of the time a few lines of the stack trace will let you know what happened_)
  - Our Stack Trace is hard to see because of our Styles
  - Open `helpers.scss` and comment out the `pre.error` background color

`_helpers.scss`

```
// more code
pre.error {
  padding: 5rem;
  // background: $white;
  line-height: 3;
  white-space: pre-line;
}
```

* Refresh the browser again and you'll see the first line of the stack trace is showing you what caused the error

