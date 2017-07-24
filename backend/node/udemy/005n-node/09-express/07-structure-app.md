# Structuring an App
* In the real world, when building a web app, things get big and complex quickly
* You don't want to put all your JavaScript in one app.js file
* We already know that modules give us the ability to separate our code into manageable chunks

## Express Generator
[link to documentation](https://expressjs.com/en/starter/generator.html)

### Install Express Generator
`$ npm i express-generator -g`

* Create an empty directory `express-stuff` and `$ cd express-stuff`

## Create our Express Test Project
* Inside `express-stuff` create your Express project

`$ express my-app`

* Change into that directory `$ cd my-app`
* Install all the dependencies with `$ npm install`
* We need to remove jade and use pug instead

`$ npm uninstall jade -S`

`$ npm i pug -S`

* Rename all `.jade` files in the `views` folder to `.pug`

### Install `ren` with brew
`$ brew install ren`

#### Run ren
* Change into the `views` directory `$ cd views`
`$ ren '*.jade' '#1.pug'`

#### Update view engine
`app.js`

```js
// more code
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// more code
```

### How they separate Routes
* This is different than how we did this with our routes
* They used **middleware** and attached to a path

```js
app.use('/', index);
app.use('/users', users);
```

* But the **middleware** they use are two modules that are local

```js
var index = require('./routes/index');
var users = require('./routes/users');
```

* So they are coming from two files
* Look inside `users.js`

`users.js`

```js
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
```

* `express.Router()`
    - That is just router middleware

## What's the difference between how we did it before and this?
* Instead of putting the `.get()` and `.post()` directly on the `app` we put it on the `router` in the exact same way
* And then we export the `router`
* So each file starts with the `router` object and then they add the `get`, `post`, `delete` and whatever to it

## Then back in `app.js`
```js
app.use('/', index);
app.use('/users', users);
```

* They set a path and within that path, the routes are processed
* So users would do this:

`/users/whatever-matching-route-is` inside the `users` router

`routes/users.js`

```
// more code
router.get('/add', function(req, res, next) {
  res.send('respond with a resource');
});
// more code
```

* That would become `/users/add` because of `app.use('/users', users)`
* This technique essentially combines the two paths into one
* This is extremely useful when you are dealing with a large number of routes
    - Expecially a lot of routes underneath a particular parent

## npm start
* There is a script inside `package.json` that enables you to run express server using `$ npm start`

## Back to our former project
* Let's experiment and do this a different way than the generator
* Create a `controllers` folder
    - This is what is between the data (model) and the view
    - Create `controllers/apiController.js`
    - Create `controllers/htmlController.js`

`apiController.js`

```js
module.exports = function(app) {

  app.get('/api/person/:id', function(req, res) {
    // get that data from database
    res.json({ firstName: 'John', lastName: 'Doe' });
  });

  app.post('/api/person', jsonParser, function(req, res) {
    // save to the database
  });

  app.delete('/api/person/:id', function(req, res) {
    // delete from the database
  });
  
}
```

* `app` is an object and if I pass it around because it is using pass by reference, you change in one place, they all change

## Require and use controllers
`app.js`

```js
// more code
// controllers
const apiController = require('./controllers/apiController');
const htmlController = require('./controllers/htmlController');
// more code
apiController(app);
htmlController(app);

app.listen(port);
```

* It will give the apiController the `app`
* It will be passed by reference
    - Down into this function

`module.exports = function(app) {`

* And the function adds the `get`, `post` and `delete`'s

`htmlController.js`

```js
const bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/person/:id', function(req, res) {
    res.render('person', { id: req.params.id, Qstr: req.query.qstr });
  });

  app.post('/person', urlencodedParser, function(req, res) {
    res.send('Thanks for being you!');
    console.log(req.body.firstName);
    console.log(req.body.lastName);
  });

}
```

* This will also add on to the `app` because it is passed by reference
* We move `bodyParser`, `jsonParser` and `urlencodedParser` into this file because this is where they are being used
* We'll remove the jsonParser from here

`apiController`

```js
app.post('/api/person', jsonParser, function(req, res) {
    // save to the database
});
```

* Change to:

```js
app.post('/api/person', function(req, res) {
    // save to the database
});
```

* We did that just for clarity
* But we could also require the jsonParser in apiController because require caches and it wouldn't be expensive to do

## Run it again
`$ nodemon app.js`

* Browse to `localhost:3000`
* It should work like it did before
* Fill out form and submit
* You will be redirected to `/person` and the terminal shows the data entered into the form
