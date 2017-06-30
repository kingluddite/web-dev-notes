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
    - you could do it in the homepage but you may want to use middleware to upload the file, resize the file, rename the file because you don't want to associate that code just with the home page
        + that might need to happen on any specific page

![diagram of middleware](https://i.imgur.com/TpgFprF.png)

* start with a request and end with displaying a login
*   log in with a form tag with a POST request
*   at end of the journey they are either logged in and we should them the dashboard or they are not logged in and we show them an error and redirect them to the login page

## In between all of that we may need to do a bunch of stuff
bodyParser will make all the form fields available to us on the `request`
`req.body.email` and `req.body.password`

next() - done with this middleware... and onto the next middleware

## Normalize the email
prepare/validate data
req.body.email = req.body.email.trim().toLowerCase();

next() - done with this middleware... and onto the next middleware

## authorizeUser
will lookup the user and check their password and if that's true it will put the user's information onto the `request` object

`req.user = { name: 'John', email: 'j@doe.com' };`

middleware is kind of an assembly line where we add stuff to the request object

at end if valid we'll **displayProfile** `res.render('account', { user: req.user })`

if invalid **displayLogin** `req.flash('error', 'Invalid Login');`
`res.redirect('/login');`

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

## Refresh page and you'll see `John` in the terminal
We used middleware to add a name to the `request` and then called that name from the next function

* Kind of like React **LifeCycle** where we can interact with the code after the request but before the response actually happens

That was **route specific** middleware

## Global Middleware
Every single request that goes through the Application will get run through the middleware before it even gets to your router

* This is where we would introduce any application-wide functionality, features plugins
* That is what `app.js` is for

## app.js
### app.use()
This means we are using this global middleware
Even before we get to our routes we are going to run all this middleware

`app.use(express.static(path.join(__dirname, 'public')));`

#### public
* We have a folder called `public`
    - dist
    - images
    - js
    - sass
    - uploads

If anyone requests anything from the public folder Express will serve it
Before it even tries to think if it is a route or not

## bodyParser
```
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
```

* Any time user submits data via form tag
* You will get that data that has be submitted on your `req.body`
    - It will all be URL encoded
    - you don't have to worry about dissecting it from the request at all

## expressValidator()
```
app.use(expressValidator());
```

* Will validate email stuff

## cookieParser()
By default Express doesn't do anything with cookies

will give you `req.cookies` and we'll need that to work with our log in session

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

![name as cookie](https://i.imgur.com/VOCtbrx.png)

Cookies and Session work together

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

Sessions allow us to store data on our visitors
Their logged in state
how long they were logged in
Sessions are stored in MongoDB

## Passport
```
app.use(passport.initialize());
app.use(passport.session());
```

* We'll talk about that when we talk about Logging in

## Flash
`app.use(flash());` - We'll talk about flash when we code logging in page

## locals
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

### Then we have some more middleware
If something goes wrong in that route we need our error handlers

So if there is not route found it moves on to the next middleware

## notFound

someone goes to a bad URL we'll show them our 404 page

`app.use(errorHandlers.notFound);`

That points to a file that passes the error and we could show it

if we are in develpment we show the error
in production we log the error and handle it internally

like Plinko
put a request in at the top and it filters its way all the way down

most cases our outpoint is in the routes

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

Refresh browser
You will see our error in dev console
and a stack trace of what lead up until that error (most of the time a few lines of the stack trace will let you know what happened)


