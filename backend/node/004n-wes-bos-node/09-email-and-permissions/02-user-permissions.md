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

```
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
  author: {
    type: mongoose.Schema.ObjectId,
    required: 'You must supply an author'
  }
});
```

This is the part we added:

```
author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author'
  }
```

* Make sure `ObjectId` is spelled correctly
* `ref` in our schema is a way we tell `MongoDB` in our Schema that the author is going to be referenced to our **User**
* If you are wondering where `User` comes from:

`User.js`

```
// more code
module.exports = mongoose.model('User', userSchema);
```

* We are telling it that **author** is going to be an Object but when someone gives us an ObjectId we are going to store just the Object and it will be referenced to the actual User
* We will be able to come back and populate the author of each of our stores without having to save all the data about the user inside of each store we just have a pointer arrow to another piece of data
* We make sure this is `required` because as soon as we create a new store, it will automatically be inserted into our Store's document

## When we create a store it needs to have an `author` associated with it
`storeController.js`

```
exports.createStore = async (req, res) => {
  req.body.author = req.user._id;
  const store = await (new Store(req.body)).save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};
```

* We will to to our `request` object's **body** an `author` property `req.body.author` that will store the current user's id
* We will use `req.user._id` to grab the `_id` of the currently logged in **user** and we will store that in the author field `req.body.author`
* Now when we create a new store we will make a new field that points the stores to a particular user in the User's collection

### Test it out
1. Create a new store
2. Check out Mongo Compass and see the Store data for the store you just created

![our new author field](https://i.imgur.com/QjSeoqf.png)

* Match that id with the currently logged in user
    - author ID and user ID will end in `8331e`

![user id matches](https://i.imgur.com/FNgQvLw.png)

### Data dump
We do this so we can see that the author property is now associated with our store

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

![data dump of store with author id](https://i.imgur.com/Zwq4HCw.png)

## .populate()
* This is from Mongoose. Because we have a reference between our stores and the user that created them we can use `.populate()` and it will pull down all our user information for that store
* If we did not have this we would have to manually create mongo queries to pull that data down separately and the joins would make our code more complex and harder to read
* Mongoose is saving us time

[link reference for more info](http://mongoosejs.com/docs/2.7.x/docs/populate.html)

### An example of `.populate()` in action
`storeController.js`

```
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

Our output will look like this from our store document

![data dump of store with author id](https://i.imgur.com/Zwq4HCw.png)

But if we add `.populate()` like this:

```
// more code
exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug }).populate('author');
  if (!store) {
    return next();
  }
  res.render('store', { store, title: store.name });
};
// more code
```

* Our new data dump will look like this

![store with author data dump](https://i.imgur.com/8TkqUgq.png)

* Notice how we now have an author object with all of our user data that we have easy access to and could add that info to this store
* The cool thing is we are not storing all this data inside each store
    - We just reference the author to the id of the user that created the store and we can use that user info whenever we want without bulking up our collection with duplicate data

## Setting Permissions
### Stop people from editing stores they do not own
* `!store.author.equals` - We use this to compare a `MongoDB` ObjectID with another ObjectID
    - .equals is a `MongoDB` method
    - [Here is the documentation](http://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html#equals) on `.equals`

`storeController.js`

```
const confirmOwner = (store, user) => {
  if (!store.author.equals(user._id)) {
    throw Error('You must own a store in order to edit it!');
  }
};
```

* We don't export it because we'll just use it inside this controller
* We won't do this as middleware because we need to find the store before we can do a check
    - So we make a function `confirmOwner()` that we'll use
        + Before we render it out
        + But after we find the store

### Notice the TODO we have
`storeController.js`

```
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

```
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
* If they are not, we throw an error
    - And our error handler middleware will pick it up and display it

## Testing if it works
* Remove dump code for store as we are not using it anymore

`store.pug`

```
// more code
block content
    pre= h.dump(store)
// more code
```

* Currently we have a bunch of stores without an owner so we need to delete all stores without an owner in `MongoDB`
    - Do that now
* Create a new user and a new store as that user
* If you try to edit a store that is not yours you will get this error:

![can't edit store error](https://i.imgur.com/042Fcrh.png)

* We could have used a flash error if we wanted and redirected user to the `/stores` route
* Edit a store you own and you should see it

## Update Interface
We should not see the edit icon (pencil) if we can't edit the store

![code to update to show edit](https://i.imgur.com/aNfiDng.png)

### Why are we using `store.author.equals` instead of `store.author._id.equals`?

* Dump the data to see why

![dump date to see author](https://i.imgur.com/AxJiXW2.png)

* In this case we are not populating the author because we don't need any info except the `_id` of the author
* And notice that we only see the `_id` output
* You will only `.populate()` fields if you actually need them
* Remove the data dump as we don't need it anymore

![author id](https://i.imgur.com/0VFWcye.png)

* Test and see if you see a pencil on what you own and don't see one on stores you don't own

### Houston we have a problem!
* All works great but if you try to view stores in incognito mode
* And we get this error `Cannot read property '_id' of null`
* The reason is you are not logged in inside incognito
    - So this line `if store.author.equals(user._id)` will try to compare a value that is `null`

#### Fix for error
Check for user and user `_id`

`_storeCard.pug`

```
mixin storeCard(store = {})
  .store
    .store__hero
      .store__actions
        if user && store.author.equals(user._id)
// more code
```

## Add different levels of Permissions
Level 10 - Admin
Level 20 - Editor

Use gap in numbers to give you room to add other permissions

Then you can add this check

`storeController.js`

```
const confirmOwner = (store, user) => {
  if (!store.author.equals(user._id) || user.level < 10) {
    throw Error('You must own a store in order to edit it!');
  }
};
```

Or

```
const confirmOwner = (store, user) => {
  if (!store.author.equals(user._id) || user.level > 10 10) {
    throw Error('You must own a store in order to edit it!');
  }
};
```

## Next - Working and building with an API

