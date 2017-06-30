# Adding a Reviews Data Model
## Reviews
* For each store
* Will be a button on store to click
* when they left review
* who left review
* star ranking of store
* when you are logged in, you can leave your own review and star rank

## We will have top layout
Rank top 10 stores using average rating

## Build our Review Model

`Review.js`

```
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({

});

module.exports = mongoose.model('Review', reviewSchema);
```

## Import Model
`start.js`

```
// more code

// import all of our models
require('./models/Store');
require('./models/User');
require('./models/Review'); // add this line

// more code
```

## What fields do we need on our Schema?
* created
* author - will be a relationship
    - You need one of existing users to be an author
* store - will be a relationship
    - 
* text
* rating

### Create Review Schema
`Review.js`

```
// more code

const reviewSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author'
  },
  store: {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
    required: 'You must supply a store'
  },
  text: {
    type: String,
    required: 'Your review must have text'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
});

// more code
```

## Create mixin for Review Form
`views/mixins/_reviewForm.pug`

```
mixin reviewForm(store)
  form.reviewer(action=`/reviews/${store._id}` method="POST")
    textarea(name="text" placeholder="Did you try this place? Have something to say? Leave a review...")
```

## Add mixin to store template layout
`store.pug`

```
extends layout

//- add the line below
include mixins/_reviewForm

block content

// more code

      if store.tags
        ul.tags
          each tag in store.tags
            li.tags
              a.tag__link(href=`/tags/${tag}`)
                span.tag__text= tag

      //- add lines below
      if user
        +reviewForm(store)
```

### View in browser
* You won't see anything unless you are logged in
* Click on /stores
* Click on store
* You should see this:

![store review form](https://i.imgur.com/3qhuJ7H.png)

## Add Stars
`_reviewForm.pug`

```
mixin reviewForm(store)
  form.reviewer(action=`/reviews/${store._id}` method="POST")
    textarea(name="text" placeholder="Did you try this place? Have something to say? Leave a review...")
    .reviewer__meta
      .reviewer__stars
        each num in [5,4,3,2,1]
          input(type="radio" required id=`star${num}` name="rating" value=num)
```

### View in browser
* Nothing there but inspect and you'll see the HTML
* We are hiding it currently with CSS

![html for stars](https://i.imgur.com/lpWqJ4K.png)

* Each input is displayed as `none` because we don't want the inputs to show up

![hiding inputs](https://i.imgur.com/qqEd1dj.png)

* Instead, we'll use labels to show **stars** instead
    - We use labels and give the a `for` attribute
    - With a `for` attribute and a corresponding `id` attribute exactly the same, then when you click on that `label` the corresponding checkbox will be selected

### Make stars funcitonal
`_reviewForm.pug`

```
mixin reviewForm(store)
  form.reviewer(action=`/reviews/${store._id}` method="POST")
    textarea(name="text" placeholder="Did you try this place? Have something to say? Leave a review...")
    .reviewer__meta
      .reviewer__stars
        each num in [5,4,3,2,1]
          input(type="radio" required id=`star${num}` name="rating" value=num)
          label(for=`star${num}`) #{num} Stars
```

### View in browser
![we see stars](https://i.imgur.com/osPoLkW.png)

* We can hover over stars and they have a hover state
* We can select stars

#### Add button

```
.reviewer__stars
  each num in [5,4,3,2,1]
    input(type="radio" required id=`star${num}` name="rating" value=num)
    label(for=`star${num}`) #{num} Stars
input.button(type="submit" value="Submit Review")
```

![button and stars](https://i.imgur.com/Pezn1Ts.png)

### How did we style our stars?
`_reviewer.scss`

```
/* These are in the opposite DOM order
           re-order them to be visually in normal order
           This is fine for accessibility because our labels have for()
         */
        &[for="star5"] { order: 5; }
        &[for="star4"] { order: 4; }
        &[for="star3"] { order: 3; }
        &[for="star2"] { order: 2; }
        &[for="star1"] { order: 1; }
        &:hover, &:hover ~ label {
          color: lighten($yellow,20%);
        }
```

* We use flexbox to reorder the stars
    - Here is a [link to understand flexbox ordering](https://css-tricks.com/almanac/properties/o/order/)
* We do this because when something is selected, or when something is hovered over, the labels that are in the future of them, will be turned into yellow
* This is super confusing but dig into the code to understand better

## We need a route
* If you click a star rating and submit, we get a 404
* Notice our URL is in the form of `reviews/id`
    - Something like:

`http://localhost:7777/reviews/58c05c208060197ca0b52d58`

## Add our route
`index.js`

```
// more code

router.post('/reviews/:id', authController.isLoggedIn, catchErrors(reviewController.addReview));
/*

  API

*/

// more code
```

* We point to our `reviews/:id` route
* We make sure the user is logged in
* We are going to be using async-await so we use our `catchErrors()` method
* We will create a new controller called `reviewController` and we will make inside that file a method called `addReview()`

### Spread out into multiple lines for improved code readability
```
router.post('/reviews/:id',
  authController.isLoggedIn,
  catchErrors(reviewController.addReview)
);
```

### Import our new controller
`index.js`

```
// more code
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const { catchErrors } = require('./../handlers/errorHandlers');

// more code
```

## Add our handler
`reviewController.js`

```
const mongoose = required('mongoose');
const Review = mongoose.model('Review');

exports.addReview = async (req, res) => {
  res.json(req.body);
};
```

* We just want to see the data we are getting
* View in browser
* Fill out form
* Select star rating
* Submit
* And you will see something like:

![json review](https://i.imgur.com/lWXHwW0.png)

* We are getting
    - text
    - rating
* We need to add
    - author
    - store

### We need to add to req.body
```
req.body.author = req.user._id
req.body.store = req.params.id
```

### We update our controller method
`reviewController.js`

```
const mongoose = require('mongoose');
const Review = mongoose.model('Review');

exports.addReview = async (req, res) => {
  req.body.author = req.user._id;
  req.body.store = req.params.id;
  res.json(req.body);
};
```

And the output should look similar to this:

![we have our data!](https://i.imgur.com/0ut2pGs.png)

## Now we can begin to save our new review
`reviewController.js`

```
const mongoose = require('mongoose');
const Review = mongoose.model('Review');

exports.addReview = async (req, res) => {
  req.body.author = req.user._id;
  req.body.store = req.params.id;
  const newReview = new Review(req.body);
  await newReview.save();
  req.flash('success', 'Review Saved');
  res.redirect('back');
};
```

* We create a new Review Document and pass it all the data inside `req.body`
* Since we are using async-await, we don't need callbacks and we just wait for our document to be saved
* We flash a success message
* We send the user back to the page they submitted the form from
* We don't see our review on the page
* But if we open `MongoDB` Compass
* Hit `cmd` + `r` to refresh we should see our new Review Collection and the review inside it with the data we had inside our `req.body`

Our success flash

![review saved](https://i.imgur.com/Puk2Bll.png)

Our new data inside our `MongoDB` Database

![reviews in `MongoDB`](https://i.imgur.com/y9Yaff7.png)

### Next
How do we pull in reviews for an existing store
