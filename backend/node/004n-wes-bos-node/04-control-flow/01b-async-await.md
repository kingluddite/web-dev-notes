# Async-Await Part 2

## Mongoose with Promises
* We will get rid of **Callback Hell** and greatly improve the readability of our code
* `Promises` immediately return to you something
    - They don't immediately return the data because that is impossible
    - But it does return a **Promise**

### What is a Promise?
* Think of it like an IOU note for the data **"I will eventually come back to you with either the data which the store saved or an error saying something went wrong"**
* Homework - [Read More about ES6 Promises](http://www.datchley.name/es6-promises/)

### How come we can use Promises?
Because of this line in `start.js`

`mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises`

* The left side tells Mongoose that we are using `Promises`
* The right side tells Mongoose we are using built-in ES6 Promises
    - Because there are additional Promise Libraries like `BlueBird`
    - But now that ES6 Promises are out, we can just use them
* [Read More about Node and Promises](https://alexperry.io/node/2015/03/25/promises-in-node.html)
* [Why bluebird?](http://bluebirdjs.com/docs/why-bluebird.html)

`storeController.js`

```js
// more code
exports.createStore = (req, res) => {
  const store = new Store(req.body);
  store
    .save()
    .then((store) => {
      res.json(store);
    })
    .catch((err) => {
      throw Error(err);
    });
};
```

* That is great
* You can also `chain` stores

## Chaining Promises - The "Promise" Land!
```js
exports.createStore = (req, res) => {
  const store = new Store(req.body);
  store
    .save()
    .then((store) => {
      return Store.find()
    })
    .then(stores => {
      res.render('storeList', { stores: stores })
    })
    .then(stores => {
      res.render('storeList', { stores: stores })
    })
    .then(stores => {
      res.render('storeList', { stores: stores })
    })
    .then(stores => {
      res.render('storeList', { stores: stores })
    })
    .catch((err) => {
      throw Error(err);
    });
};
```

* And this is good because we no longer are in **Callback Hell** and as long as each returns a Promise `then()` we can chain them indefinitely 

## Async-await
### But we can do even better
In `ES8`, we have `async-await`, which will help us get rid of all our `then`s and `catch`es

### Test it out to show how async works
I want to `console.log('It worked!')` **only** **once** the save has finished

* We can tell JavaScript to `cool it's jets! Hold on a second and wait until I've don't he save and then continue on`

### Here's how to do it
* Mark the function as `async`
    - That will tell the browser or `node.js` that **'hey! this function that I'm using is going to have some awaits inside of it'** (_or possibly have some awaits inside of it_)
    - And then we go in front of the thing that returns a **Promise** and just `await` it
        + Because `store.save()` will return to us a **Promise** and we then can **await** it
            * This means we won't move on to the next line of code until the save has successfully happened
            * Before we had an error object or a `catch()` that gave us an error but in order to catch an **error** with `async-await` you have to wrap all your code inside a `try catch`
            * But **Try/Catch** defeats the purpose of avoiding nested code

```js
exports.createStore = async (req, res) => {
  try {
    const store = new Store(req.body);
    await store.save();
    console.log('It worked!');
  } catch (err) {
    // handle error stuff here
  }
};
```

## Composition
### One way to avoid using `try/catch` errors
* We can take this `createStore = (` and wrap it in another function that will catch any errors
    - So we create a **higher function** that `wraps` **createStore**
    - And if any of that code throws an error
    - Our wrapper function will handle all of our error handling
        + This is nice!

`handlers/errorHandlers.js`

```js
// more code
exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};
// more code
```

* We take a function... like `createStore()` and then we call a function that returns our function `createStore()` and if there is an **error**, it will **catch** the error and call `next`

### What does `next` do?
* All of our routes will be wrapped in this errorHandler (_catchErrors_)
* If any of our routes hit an error
    - This errorHandler (_catchErrors_) will kick in
    - And it will catch the error
    - And it will immediately call **next**

### What does **next()** do again?
* When it catches an error it will say **"Ok we are not using any of our routes here"**

`app.js`

`app.use('/', routes);`

* So then we pass it along the chain of `middleware` which will either be a **notFound**

`app.js`

`app.use(errorHandlers.notFound);`

* Or a **flashValidationError**

`app.js`

`app.use(errorHandlers.flashValidationErrors);`

* Or most likely we will catch the `development` or `production` error

`app.js`

```js
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);
```

* All those errors are one after another and **next** just travels to the <u>next</u> **middleware**
* That's what **next** does, it keeps moving us along until it meets **middleware** that meets the condition that stops **next** from moving along

## Takeaway
* If you do not wrap your **async-await** functions in a **try/catch** than you need to wrap it inside this `catchErrors` **errorHandler**
* Or you could just write perfect code and not use any `errorHandlers`?
* Not! 
* We all need to use errorHandlers. 
* **No one writes perfect code**

## What is `composition`?
Wrapping a function inside a function

### We need to require our errorHandlers function
`routes/index.js`

```
const { catchErrors } = require('./../handlers/errorHandlers');
```

* We are using `{ catchErrors }` which is ES6's **object destructuring**
    - Which enables us to import an entire object
    - We don't need to import the entire file, we just need to require one particular function `exports.catchErrors()`

`routes/index.js`

```
const express = require('express');
const storeController = require('./../controllers/storeController');
const { catchErrors } = require('./../handlers/errorHandlers');

const router = express.Router();

// Do work here
router.get('/', storeController.homePage);
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));

module.exports = router;
```

### What will this do?
1. It will immediately run `catchErrors()` when we boot up our Application
2. `catchErrors()` will take that function and wrap it inside another function (_aka **a higher order function**_)
3. And then return to us our function with a `catch()` tied onto the end of it

### This seems a bit confusing!
* Yes, this is confusing
* But it is a nice **clean** way to catch errors
* And push onto later **middleware**
* And avoid nesting with **try/catch** in every single controller that we have
* And handle it

### The async-await syntax

`storeController.js`

```
exports.createStore = async (req, res) => {
    const store = new Store(req.body);
    await store.save();
    res.redirect('/');
};
```

1. Run `$ npm start`
2. Visit `http://localhost:7777/add`
3. Enter store info
4. Submit

### Congrats. You just entered your store data into the Database
Your data is entered into the Database and you are redirected to the home page

## How do we know if it worked?
1. Open MongoDB Compass
2. Open your online MongoDB
3. You will see stores (has 1!)
4. Click `stores`
5. Click `Documents` and you'll see your data
    * Our slug was auto populated with lowercase words separated by dashes (_if more than one word was used in the name of the store_)
6. Enter another store
7. Click refresh in Mongo Compass
8. You should see two stores!

![two stores in MongoDB](https://i.imgur.com/IvBULdC.png)

## Review Steps to using async-await
1. Create Schema
2. In Controller create a `new` Store Schema
3. And call `.save()` on it
4. Because we use **async-await** there are no nested callback (_Callback Hell_), no `Promise` chaining with `.then()`
    * We just wait for the save and then do some data
