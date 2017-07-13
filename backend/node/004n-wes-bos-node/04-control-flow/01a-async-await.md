# Async Await
* We will need to access our database from this controller so we need to require it

`storeController.js`

```
const mongoose = require('mongoose');
// more code
```

* We already imported `mongoose` once in `start.js`
* Because of this we can just reference it off the **mongoose** variable
    - Mongoose uses a concept (**pattern**) called `Singleton` which enables us to only import our data models once and then reference them anywhere inside our Application

`storeController.js`

```
const mongoose = require('mongoose');
const Store = mongoose.model('Store'); // add this line
// more code
```

## Where did `Store` come from?
* `Store` came from the last line of `models/Store.js`

`module.exports = mongoose.model('Store', storeSchema);`

* So in the above line we are exporting it
* And in `storeController.js` we are using it:

`const Store = mongoose.model('Store');`

## Now what?
Let's work with our `createStore()` controller

`storeController.js`

```js
exports.createStore = (req, res) => {
  const store = new Store(req.body);
};
```

* `req.body` pulls in all the data from the form
* Take notice of naming conventions
  - We **capitalize** constructor functions `new Store()`
  - We **camelCase** the variables holding the constructor function `store`

### Shouldn't we be worried about bad people passing bad data to our form?
* Nope
* That's why we are using our Schema as it makes sure we only accept the data we expect
* [data sanitization](https://www.smashingmagazine.com/2011/01/keeping-web-users-safe-by-sanitizing-input-data/) is baked in
    - Anything else gets thrown away

### The importance of `store.save()`
* You can add as many fields as you like

`storeController.js`

```
// more code
exports.createStore = (req, res) => {
  const store = new Store(req.body);
  store.age = 10;
  store.cool = true;
};
```

* Add a gazillion fields if you like but nothing gets stored until you use `store.save()`
* `store.save()` once called, fires off a connection to our **MongoDB** Database, save that data, then comes back to us, with either:
    - The **store** itself
    - Or, an **error** stating what happened (_validation error, or missing data, incorrect data..._)

## The History of Mongoose
### The callback function
* In the old days we would use a **callback** function because JavaScript is `asynchronous`
    - If you call a bunch of code

`storeController.js`

```
// more code
exports.createStore = (req, res) => {
  const store = new Store(req.body);
  store.save();
  console.log('It worked!');
  res.redirect('/');
};
```

### JavaScript doesn't wait for anybody!
* We want to save the **store** and then `redirect` but the save doesn't immediately occur
    - It will take some time for this to occur
    - Anything "_over the wire_" takes time
        + Ajax requests take time
        + Saving data to the database takes a little bit of time
        + But REMEMBER that JavaScript will not wait for anybody or anything because <u>it is asynchronous by default</u>
    - So that means it won't just save and redirect regardless of it actually worked or not
    - And that is a problem for us because we need to know before we redirect them, was there an error?
    - And if there was an error we need to display that error to the user so they know it didn't work

## Old Solution
`storeController.js`

```
exports.createStore = (req, res) => {
  const store = new Store(req.body);
  store.save(function (err, store) {
    if (!err) {
      console.log('it worked');
      res.redirect('/');
    }
  });
};
```

### Callback Hell
* This would try to save the store
* And it would have a callback that said, "_when the save was made we expect a callback with an error or the store and if there is no error than we redirect_"
* What happens when you first have to query 3 or 4 stores, then loop over the data, then save to those stores? 
* This code will get really complicated, really fast, especially if you need to have any type of `order of operations` inside of your code
* If your code gets complicated, it will resemble `callback hell`

`storeController.js`

```
exports.createStore = (req, res) => {
  const store = new Store(req.body);
  store.save(function (err, store) {
    if (!err) {
      console.log('it worked');
      reviews.find(function(err, reviews) {
        reviews.find(function(err, reviews) {
            reviews.find(function(err, reviews) {
                reviews.find(function(err, reviews) {
                    res.redirect('/');
                })
            })
        })
      })
    }
  });
};
```

## Callback Hell
* We want to do six things before we even save our data? This is crazy!
* Your code looks like Christmas Tree code
* This is an example of **Callback Hell**
* Lots of example code has this because this was the way it was done for years
