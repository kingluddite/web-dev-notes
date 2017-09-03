# User Permissions
* We have a stores and users collection
* They are isolated and don't know about each other
* How can we connect them?

## Relationship
* When we create a store, we need to create an author property on our stores that is linked to one of our users in the Database
* That is called a relationship

## How do we create a relationship in `MongoDB`
* The `_id` in `MongoDB` is not a string
* The `_id` in `MongoDB` is its own type
    - The type is called an **ObjectID**
* We need to add this type to our `Store.js` schema
    - And this will help us create a relationship between the Store and the User collections
    - It will type `type: mongoose.Schema.ObjectId`
        + Make sure the spelling is correct in `ObjectId`

![compass `MongoDB` screenshot of _id](https://i.imgur.com/UV8FIQF.png)

The `_id` will look like above

`Store.js`

```js
const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates'
    }],
    address: {
      type: String,
      required: 'You must supply an address'
    }
  },
  photo: String,
  _user: {
    type: mongoose.Schema.ObjectId,
    required: 'You must supply a user'
  }
});
```

This is the part we added:

```js
_user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an user'
  }
```

* Make sure `ObjectId` is spelled correctly
* `ref` in our schema is a way we tell `MongoDB` in our Schema that the author is going to be referenced to our **User**
* **naming convention** Prefacing the field name with an underscore helps developers visually see that this is a special reference field
    - `_user`
* If you are wondering where `User` comes from:

`User.js`

```js
// more code
module.exports = mongoose.model('User', userSchema);
```

* We are telling it that **_user** is going to be an Object but when someone gives us an `ObjectId` we are going to store just the Object and it will be referenced to the actual User
* We will be able to come back and populate the author of each of our stores without having to save all the data about the user inside of each store we just have a pointer arrow to another piece of data
* We make sure this is `required`
    - Because as soon as we create a new store
    - It will automatically be inserted into our Store's document

## When we create a store it needs to have an `_user` associated with it
`storeController.js`

```js
exports.createStore = async (req, res) => {
  req.body._user = req.user._id;
  const store = await (new Store(req.body)).save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};
```

* We will add to our `request` object's **body** a `_user` property **req.body._user** that will store the current user's `_id`
* We will use `req.user._id` to grab the `_id` of the currently logged in **user** and we will store that in the `_user` field `req.body._user`
* Now whenever we create a new store:
      - We will make a new field
      - That points the stores to a particular `user`
      - In the **User**'s collection

### Test it out
1. Create a new store
2. Check out Mongo Compass and see the Store data for the store you just created

![our new _user field](https://i.imgur.com/I1H9u5P.png)

* Match that `id` with the currently logged in user
    - `_user` ID and `user` ID will both equal `59ab268ff2e66e3e373d2ab5`

### Data dump
We do this so we can see that the **_user** property is now associated with our store

`store.pug`

```
extends layout

block content
    //- add the next line
    pre= h.dump(store)
    .single
      .single__hero
        img.single__image(src=`/uploads/${store.photo || 'store.png'}`)
        h2.title.title--single
          a(href=`/stores/${store.slug}`) #{store.name}
// more code
```

![data dump of store with _user id](https://i.imgur.com/YZM6Jvf.png)

* And if you click on the `accounts` link gravatar icon, and you have a data dump inside that template:

`account.pug`

```
extends layout

block content
  .inner
    h2= title
    pre= h.dump(user)
    form(action="/account" method="POST")
      label(for="name") Name
      input(type="text" name="name" value=user.name)
      label(for="email") Email Address
      input(type="text" name="email" value=user.email)
      input.button(type="submit" value="Update My Account")
```

* And you view that template:

`/account` route

![account data dump](https://i.imgur.com/Dasu8lA.png)

## .populate()
* This is from Mongoose
* Because we have a reference between our stores and the user that created them
    - We can use `.populate()`
    - And it will pull down all our user information for that store
    - If we did not have this we would have to manually create mongo queries to pull that data down separately
    - And the joins would make our code more complex and harder to read
* Mongoose is saving us time (again!)

[mongoose `.populate()` documentation](http://mongoosejs.com/docs/2.7.x/docs/populate.html)

### An example of `.populate()` in action
`storeController.js`

```js
// more code
exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug });
  if (!store) {
    return next();
  }
  res.render('store', { store, title: store.name });
};
// more code
```

* Our output will look like this from our store document

![data dump of store with _user id](https://i.imgur.com/fwEukwS.png)

* But if we add `.populate()` like this:

```js
// more code
exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug }).populate('_user');
  if (!store) {
    return next();
  }
  res.render('store', { store, title: store.name });
};
// more code
```

* Our new data dump will look like this

![store with _user data dump](https://i.imgur.com/nzvofUa.png)

* Notice how we now have an user object with all of our user data that we have easy access to
* And could add that info to this store
* The cool thing is we are not storing all this data inside each store
    - We just reference the `_user` to the `id` of the `user` that created the store and we can use that `user` info whenever we want without bulking up our collection with duplicate data
* So `.populate()` saves us time and gives us access to all of the user data from inside the store data
  - This is very useful!

## Setting Permissions - Stop people from EDITING STORES THEY DO NOT OWN

`!store._user.equals`

* We use this to compare a `MongoDB` **ObjectID** with another **ObjectID**
    - `.equals()` is a `MongoDB` method
    - [Here is the documentation](http://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html#equals) on `.equals`

`storeController.js`

```js
// more code
exports.getStores = async (req, res) => {
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores });
};

// add the below code
const confirmOwner = (store, user) => {
  if (!store._user.equals(user._id)) {
    throw Error('You must own a store in order to edit it');
  }
};

// more code
```

* **We don't export it** because we'll just use it inside this controller
* We won't do this as **middleware** because
    - We need to find the store before we can do a check
    - So we make a function `confirmOwner()` that we'll use
        + Before we render it out
        + But after we find the store

### Notice the TODO we have
`storeController.js`

```js
exports.editStore = async (req, res) => {
  // 1. Find the store given the ID
  const _id = req.params.id;
  const store = await Store.findOne({ _id });
  // 2. Confirm they are the owner of the store
  // TODO
  // 3. Render out the edit form so the user can update their store
  res.render('editStore', { title: `Edit ${store.name}`, store });
};
```

* And this is where we call `confirmOwner()` and we'll pass it the current store and the current user

```js
exports.editStore = async (req, res) => {
  // 1. Find the store given the ID
  const _id = req.params.id;
  const store = await Store.findOne({ _id });
  // 2. Confirm they are the owner of the store
  confirmOwner(store, req.user); // add this line
  // 3. Render out the edit form so the user can update their store
  res.render('editStore', { title: `Edit ${store.name}`, store });
};
```

* If they are the owner, it keeps going on its merry way
* If they are not, **we throw an error**
    - And our error handler middleware will pick it up and display it

## Testing if it works
* Remove dump code for `store.pug` and `account.pug` as we are not using it anymore

`store.pug`

```
// example of dump code
// more code
block content
    pre= h.dump(store)
// more code
```

## Delete all our current stores!
* Currently we have a bunch of stores without an owner
* So we need to delete all stores without an owner in `MongoDB`
    - Do that now!

### Starting Over
1. Create two new users
2. And a new store as one of those users
3. Try to edit a store that is not yours you will get this error:

![can't edit store error](https://i.imgur.com/Yhz19GZ.png)

* We could have used a flash error if we wanted
* and redirect user to the `/stores` route
* Edit a store you own and you should see it

## Update Interface
* We SHOULD NOT see the edit icon (_pencil_) if we can't edit the store

`_storeCard.pug`

![code to update to show edit](https://i.imgur.com/dikJG5B.png)

### Why are we using `store.author.equals` instead of `store.author._id.equals`?

* Dump the data to see why

![dump date to see _user](https://i.imgur.com/S4VPiWk.png)

* In this case we are not using `.populate()` to populate the entire user
* Because we don't need any info except the `_id` of the `user`
* And notice that we only see the `_id` output
* **important** You will only `.populate()` fields if you actually need them
* Remove the data dump as we don't need it anymore
* Test and see if you see a pencil on what you own
* And don't see one on stores you don't own

### Houston we have a problem!
* All works great but if you try to view stores in incognito mode (or you're not logged in)
* And we get this error `Cannot read property '_id' of null`
* The reason is you are not logged in inside incognito
    - So this line `if store.author.equals(user._id)` will try to compare a value that is `null`

#### Fix for error
Check for **user** and **user** `_id`

`_storeCard.pug`

```
mixin storeCard(store = {})
  .store
    .store__hero
      .store__actions
        if user && store._user.equals(user._id)
// more code
```

## Add different levels of Permissions
* This is just a suggestion in case you want to add different levels of permissions
* Add levels like:
  - Level 10 - **Admin**
  - Level 20 - **Editor**
  - Use gap in numbers to give you room to add other permissions
  - Then you can add this check

`storeController.js`

```js
const confirmOwner = (store, user) => {
  if (!store._user.equals(user._id) || user.level < 10) {
    throw Error('You must own a store in order to edit it!');
  }
};
```

## Next - Working and building with an API
