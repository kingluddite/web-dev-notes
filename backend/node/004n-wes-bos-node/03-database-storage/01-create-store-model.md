# Create Store Model
Make `storeController.js` look like this:

```
exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};
```

* We remove myMiddleware as we don't need it anymore

`index.js`

Make this line:

`router.get('/', storeController.myMiddleware, storeController.homePage);`

Look like:

`router.get('/', storeController.homePage);`

## Models
* Where our data will be stored
* Before we create a piece of data we need to describe what that data will look like
* If you were going to create a spreadsheet you would put all the column headings first before you added the data
* Models can do more
    - What type of data does each field store (string, array, boolean)
    - They can do clean up before the data is saved
    - Can create a `slug`

### MongoDB
* Can be a `loose` Database which means:
    - You do not need to specify what your data will look like ahead of time
    - Similar to JavaScript object
        + You don't need to specify what those objects are you just go ahead and use them
        + You may be used to how MySQL creates tables which is done first by declaring what types of data will go inside each column

![mysql and phpMyAdmin](https://i.imgur.com/NRK51ZP.png)

#### Strict Mode
* But out of the box MongoDb is strict
    - It will only allow you to store data that it knows about before hand
    - This is good as your app scales
    - We will do everything in **strict** mode
    - This means we have to define our **schema** beforehand

#### `/models/Store.js`
`const mongoose = require('mongoose');`

* We name our model files with a capital letter `Store.js`

##### mongoose
* We need to require **mongoose**
* `mongoose` is a package that we use to interface with MongoDb
* MongoDb can be used with any language (_Python, Ruby, PHP_)

#### Promise Time
`mongoose.Promise = global.Promise;`

* What the heck does that line do?
* When we query our database there are a couple of ways we wait for our data to come back from the Database (_Because it happens asynchronously_)
    - You can use the built-in **callbacks**
    - You can use an external Promise Library (_i.e. BlueBird_)
    - Because we are using `async-await`
        + We will use the built-in **ES6 Promise**
        + So we set the `mongoose` Promise property (_mongoose.Promise_)
            * To be `global.Promise` (_Think of this like the window property in the browser_) - it is our global variable
            * Open browser with your app running and type `> Promise` and you'll see this:


 ![Native Promise](https://i.imgur.com/ZCA2rvo.png)

 * That is exactly what we are doing with `global.Promise`
### Be very careful
* Do not get in the habit of putting a ton of stuff on this `global` variable
* That is a bad practice
* In this particular case, this is an exception to that rule

## Slugs Library
### Install slugs
`$ yarn add slugs`

This will allow us to make URL friendly names for our slugs (very similar to WordPress **Permalink**)

`const slug = require('slugs');`

So here is where we are so far:

`Store.js`

```js
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
```

## Time to make our Schema
```js
const storeSchema = new mongoose.Schema({
  
});
```

### What data do we want to store for each store?
* The name of the store (string)
* The slug that will point to that store (string)
* A description of the store (string)
* Tags that describe the store
  - kmart, sears, rite aid...

### Ways to export
We used this before:

`export.blablabla = ()`

But if the main thing that you are exporting from a file is going to be importable you can use this syntax:

`module.exports = `

We did this previously for `routes/index.js`

`module.exports = router;`

But in `storeController.js` we use this syntax:

`exports.homePage = (req, res) => {`

### Takeaway
* Above is not a huge issue but it just comes down to:
    - When you import a package is the main thing that you import from it going to be a function or are you just importing an object that has many properties on it (_it can also be both_)

`Store.js`

```js
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({

});

module.exports = mongoose.model('Store', storeSchema);
```

## Add Properties to our Schema
```js
const storeSchema = new mongoose.Schema({
  name: String
});
```

* But if we need to add a bunch of properties for `name` we make the value an object

```js
const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
});
```

**tip** <u>General Rule of Thumb</u> - Do all of your data normalization as close to the model as possible

* So if the model has a property built into it that will trim it:
    - Do it on the model rather than having to do it right before you save it

## errors
```js
const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
});
```

* (_using `required`_) This will generate a nasty MongoDB error which isn't pretty
* We will instead pass an error message

```js
const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name',
  },
});
```

* tags: [String] - This means we will pass an array of strings

```js
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name',
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
});

module.exports = mongoose.model('Store', storeSchema);
```

## How do we make MongoDB know about this Store model?
`start.js`

```
// more code
// READY?! Let's go!

// import all of our models
require('./models/Store');
// more code
```

* We will import all of our models here

### The Singleton Pattern
* You only have to import models once, because as soon as you connect to MongoDB and as soon as you import your models, MongoDB will know about them throughout your entire Application
    - This uses a concept in programming called a `Singleton` - which means once you configure it you don't have to keep doing it in every single file because that would suck
    - Imagine if we had to import our models, injecting our Database at the top of every file that uses our Database

## Test and see if it is working

### `.pre()` hook
* We will supply the name, description and tags but `slug` will be automatically generated whenever somebody inserts a document
* `this` will equal the `store` we are saving to
* We need `this` so we have to use an **ES5 regular function**

`Store.js`

```js
// more code
storeSchema.pre('save', function(next) {
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model('Store', storeSchema);
```

* Above will call the `slug` Library
    - And it will generate **a random string slug**
    - And add it to our current store we are saving to
* `next()` moves onto the next **middleware** task
* This happens every time we store stuff
    - But we only need to run this function when the `name` has changed
    - So we alter our code to look like this:

```js
storeSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
    // could also just type return next();
  }
  this.slug = slug(this.name);
  next();
});
```

### We need to improve this
* If people have the same store names you can't have that
* Let's add a TODO comment

```js
storeSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
    // could also just type return next();
  }
  this.slug = slug(this.name);
  next();
  // TODO make more resilient so slugs are unique
});
```

