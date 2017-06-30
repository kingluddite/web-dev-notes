# Advanced Aggregation - Part 2
## Render template
`storeController.js`

```
// more code

exports.getTopStores = async (req, res) => {
  const stores = await Store.getTopStores();
  res.render('topStores', { stores, title: '⭐ Top Stores' });
};
```

## Create our top 10 template
`views/topStores.pug`

```
extends layout

block content
  .inner
    h2 Top #{stores.length} Stores
```

![output top 10](https://i.imgur.com/xkpWKUV.png)

* in pug if you use `td: a` (that means a is inside td but you don't have to put them on separate lines, instead you can put them on the same line)

`topStores.pug`

```
extends layout

block content
  .inner
    h2 Top #{stores.length} Stores
    table.table
      thead
        td photo
        td ranking
        td name
        td reviews
        td Average Rating
      each store, i in stores
        tr
          td
            a
              img(width=200 src=`/uploads/${store.photo || 'store.png'}` alt=store.name)
          td #{i + 1}
          td: a(href=`/store/${store.slug}`)= store.name
          td= store.reviews.length
          td #{Math.round(store.averageRating * 10) / 10} / 5
```

## Give each store a review count button
* Let's do a data dump to see our current data on `/stores`

`_storeCard.pug`

```
mixin storeCard(store = {})
  pre= h.dump(store)
  .store

// more code
```

* Notice that `reviews` is set to `null`

![reviews is null](https://i.imgur.com/zmn9iDL.png)

The reason is we have not called `.populate()` on every single time that we want it

## getStores
Our current function

`storeController.js`

```
// more code

exports.getStores = async (req, res) => {
  // 1. Query the database for a list of all stores
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores });
};
// more code
```

And if we make this slight modification

```
// more code

exports.getStores = async (req, res) => {
  // 1. Query the database for a list of all stores
  const stores = await Store.find().populate('reviews');
  res.render('stores', { title: 'Stores', stores });
};
// more code
```

## Refresh browser
* You will now see the data dump shows the reviews for that store
* But adding `populate()` every single time we need it kind of a pain so we'll do something different
    - Instead, we'll use our autopopulate function that we used for our other one
    - Remember this?

`Review.js`

```
// more code

function autopopulate(next) {
  this.populate('author');
  next();
}

reviewSchema.pre('find', autopopulate);
reviewSchema.pre('findOne', autopopulate);

// more code
```

* We'll now do the same thing for `Store.js`

`Store.js`

```
// more code

function autopopulate(next) {
  this.populate('reviews');
  next();
}

storeSchema.pre('find', autopopulate);
storeSchema.pre('findOne', autopopulate);

// more code
```

* Make sure you remove the code we added before as we don't need it anymore

`storeController.js`

* Change this:

```
// more code
exports.getStores = async (req, res) => {
  // 1. Query the database for a list of all stores
  const stores = await Store.find().populate('reviews');
  res.render('stores', { title: 'Stores', stores });
};
// more code
```

To This:

```
// more code
exports.getStores = async (req, res) => {
  // 1. Query the database for a list of all stores
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores });
};
// more code
```

* Now whenever I query a store it should also populate all the reviews for that store
* Remove the dump in `_storeCard.pug`

`_storeCard.pug`

```
mixin storeCard(store = {})
  pre= h.dump(store)
```

* Add `store.reviews`

`_storeCard.pug`

```
// more code

if user && store.author.equals(user._id)
          .store__action.store__action--edit
            a(href=`/stores/${store._id}/edit`)
              != h.icon('pencil')
        if store.reviews
          .store__action.store__action--count
            != h.icon('review')
            span= store.reviews.length

      img(src=`/uploads/${store.photo || 'store.png'}`)

// more code
```

* And our output will look like:

![store review count](https://i.imgur.com/p02ZVZV.png)
