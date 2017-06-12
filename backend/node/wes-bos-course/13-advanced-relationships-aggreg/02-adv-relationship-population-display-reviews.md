# Advanced Relationship Population - Displaying Our Reviews
* Reviews is its own data type
* Stores are its own data type
* How can we have a relationship between the two?

## Our review shows Store reference
![review ref of store](https://i.imgur.com/v8Y7sY7.png)

## Our store shows no Review reference
![no love for review form store](https://i.imgur.com/EwDc7Li.png)

### Houston we have a problem
* If in Reviews collection we save the store
* And then also in the Store save a list of reviews
* This would be a pain because we would be managing two duplicate pieces of data in two different parts of our Database

### A better solution
1. We visit a store page
2. We do a second query to search for any reviews where the store = id of the current store we are viewing

### Even Better - Virtual Populate
* Mongoose now has a new feature
* We will add a new field to our Store Schema called `reviews`
    - The options we pass it
    - before it was a function where we immediately return something
* We will tell it to go off to another model (in this case our Review Model) and do a quick query for us

`Store.js`

```
// more code

storeSchema.virtual('reviews', {
  ref: 'Review', // what model to link
  localField: '_id', // which field on the store?
  foreignField: 'store' // which field on the review?
});

module.exports = mongoose.model('Store', storeSchema);
```

Why `ref: 'Review'`?

![why review](https://i.imgur.com/BEJqAWf.png)

* `localField` - this points to the store `_id` (think of it as the Primary Key)
* `foreignField` - this points to the `store` field (think of as Foreign Key)

![foreignField](https://i.imgur.com/vAMDjuy.png)

## // find reviews where the stores _id property === reviews store property

```
// find reviews where the stores _id property === reviews store property
storeSchema.virtual('reviews', {
  ref: 'Review', // what model to link
  localField: '_id', // which field on the store?
  foreignField: 'store' // which field on the review?
});
```

So we are saying find an id where the store's id

![store id](https://i.imgur.com/egwbGe1.png)

store id inside review document

![store id inside review document](https://i.imgur.com/sniGvnv.png)

### Kind of like a Join (From SQL)
* That is what Virtual Populate kind of creates, a Join
* But we are not saving a relationship between the 2, it is 100% virtual

### update our `storeController` getStoreBySlug() method
`storeController.js`

```
exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug }).populate('author');
  if (!store) {
    return next();
  }
  res.render('store', { store, title: store.name });
};
```

And we update it to include our new `reviews` field

```
exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug })
    .populate('author reviews');
  if (!store) {
    return next();
  }
  res.render('store', { store, title: store.name });
};
```

### Watch out for this
* Make two reviews on one store using our site
* Add this dump

`store.pug`

```
extends layout

include mixins/_reviewForm

block content
    pre=h.dump(store)
    .single

// more code
```

* Refresh store page
* If you own the store you will see author information
    - If you don't author will be set to `null`
* But you will not see review information
    - This trips people up

### But if you change your dump to:
`store.pug`

```
extends layout

include mixins/_reviewForm

block content
    pre=h.dump(store.reviews)
```

Your dump will show you all the reviews for that store

![just reviews showing up](https://i.imgur.com/8fAdw6z.png)

### Remember
Virtual fields by default go into an object or into JSON, unless you explicitly ask it to

* There are options on your Schema which will allow you to actually bring those to JSON to see it

### To turn them on in your Schema do this:
`Store.js`

```
// more code

  photo: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author'
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// more code
```

## So now set dump to:
`store.pug`

```
extends layout

include mixins/_reviewForm

block content
    pre=h.dump(store)

// more code
```

And refresh store page and you will see virtual data appearing in dump

![virtuals showing up](https://i.imgur.com/iVySvpQ.png)

### Now we have our reviews
Now we want to loop over each one of them

`store.pug`

```
// more code

      if user
        +reviewForm(store)

      if store.reviews
        .reviews
            each review in store.reviews
              .review
                p= review.text
```

![we loop through reviews](https://i.imgur.com/PaS6xTO.png)

### Create our review mixin
`views/mixins/_review.pug`

```
mixin review(review)
  .review__header
    .review__author
    .review__stars
    time.review__time
  .review__body
    p= review.text
```

## Import review mixin to store template
`store.pug`

```
extends layout

include mixins/_reviewForm
include mixins/_review

// more code
```

## Add review mixin to template
`store.pug`

```
// more code

if store.reviews
        .reviews
            each review in store.reviews
              .review
                +review(review)
```

### View in browser
![reviews showing up](https://i.imgur.com/nOvu0Ma.png)

### Working our way through
* author
* starts
* time

#### author
If we look at our data dump we see author is just a number:

![author just a number](https://i.imgur.com/ycLdMhY.png)

* What if we did this?

`_review.pug`

```
mixin review(review)
  .review__header
    .review__author
      p=review.author

// more code
```

* The output would look like:

![id author](https://i.imgur.com/WV87L0O.png)

That won't work because we obviously can't show the comments are super long id numbers

### Auto-populate our author
We need to configure this so that when the review is generated it will auto-populate the author info

`Review.js`

```
// more code

function autopopulate(next) {
  this.populate('author');
  next();
}

reviewSchema.pre('find', autopopulate);
reviewSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Review', reviewSchema);
```

### Add hooks
* We create a function `autopopulate()` that will populate the author info
* We add two hooks
    - If someone uses `find()` or `findOne()` we will populate the results fields with the author information

#### Check out our new output
![author autopopulated](https://i.imgur.com/6rknmg9.png)

* We need to get rid of this line of code (**p=review.author**):

`_review.pug`

```
mixin review(review)
  .review__header
    .review__author
      p=review.author
```

* And replace it with

```
mixin review(review)
  .review__header
    .review__author
      img.avatar(src=review.author.gravatar)
      p=review.author.name
    .review__stars(title=`Rated ${review.rating} out of 5 stars`)
      = `★`.repeat(review.rating)
      = `☆`.repeat(5 - review.rating)
    time.review__time(datetime=review.created)= h.moment(review.created).fromNow()
  .review__body
    p= review.text
```

### Let's dig in to what we just typed
#### gravatar
`img.avatar(src=review.author.gravatar)`

* We added a virtual field to our Users Schema that used the user email and ran it through `md5(this.email)` to get a hash of the user's email
* Then pointing to the URL with that hash shows the public gravatar
* We point to this field to get the user's gravatar

#### p=review.author.name
Easy. Gets the author's name

#### star rating
```
.review__stars(title=`Rated ${review.rating} out of 5 stars`)
      = `★`.repeat(review.rating)
      = `☆`.repeat(5 - review.rating)
```

* We use the title because having just stars appearing is not accessible to screen readers so we add it into the title so all users will know how many stars are on review
* We use unicode symbols to generate our stars
    - The filled stars
    - The empty stars (we subtract 5 from the review .rating)
    - Used together gives us 5 stars and the ones filled in are how high we rated the store

## Time 
```
time.review__time(datetime=review.created)= h.moment(review.created).fromNow()
```

* first we use time.review__time(datetime=review.created) 
    - and that gives us a timestamp to screen readers and googlebots
    - and this is how a time tag should be properly formatted

![time tag properly formatted](https://i.imgur.com/BlLjUu8.png)

### [Moment.js](https://momentjs.com/)
* We are using `moment.js` to work with user friendly time formats
* We added `moment.js` inside our `helpers.js`

`helpers.js`

```
// more code

// moment.js is a handy library for displaying dates
// We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = require('moment');

// more code
```

* We put the entire `moment.js` library inside our `helpers.js` so we can use it anywhere

`_review.pug`

![using moment](https://i.imgur.com/YsKBC2i.png)

```
h.moment(review.created).fromNow()
```

That gives us times like these (_2 hours ago and an hour ago_)

![showing time via moment.js](https://i.imgur.com/ByTDIbF.png)

[link to unicode empty star symbols](http://graphemica.com/%E2%98%86)
[link to unicode filled star symbols](http://graphemica.com/%E2%98%85)

### Next - Advanced Aggregation
Hook up the `Top` page `/top` where we get an average of all the reviews and only show the top 10
