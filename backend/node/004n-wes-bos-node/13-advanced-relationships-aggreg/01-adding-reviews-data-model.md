# Adding a Reviews Data Model
## Make our individual store page look nicer
`_typography.scss`

```
// more code
a {
  color: $black;
  text-decoration: none;
}

p a {
  border-bottom: 2px solid $danger-yellow;
}

p {
  font-size: 1.6rem;
  line-height: 2;
}

.title {
  position: relative;
  z-index: 2;

  font-size: 4rem;
  line-height: 1.1;
  margin: 0;
  transform: skew(0, -3deg);
  word-wrap: break-word;

  &--long {
    font-size: 3rem;
  }
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    content: '';
    display: block;
    height: 100%;
    transform: skew(-5deg);
    width: 50px;
  }

  // inline link inside
  a {
    background-color: $yellow-alpha;
    color: $black;
    padding: 40px;
    border-bottom: 0;
  }
}

.title--single {
  max-width: 600px;
  margin-top: -9rem;
  font-size: 10rem;
  text-align: center;
}
```

* Create a new partial `_single.scss`

`_single.scss`

```
.single {
  &__hero {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    height: 500px;
    overflow: hidden;

    &:before {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;

      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2vw), 0% 100%);
      content: '';
      display: block;
      height: 100%;
      opacity: 0.6;
      width: 100%;
    }
  }
  &__image {
    position: absolute;

    height: 100%;
    object-fit: cover;
    width: 100%;
  }
  &__details {
    position: relative;

    background: $white;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.15);
    margin-top: -10rem;
    padding: 3rem;
  }
  &__map {
    margin-left: -3rem;
    margin-top: -3rem;
    max-width: none;
    width: calc(100% + 6rem);
  }
  &__location {
    position: relative;
    float: right;

    background: $black;
    color: white;
    display: inline-block;
    margin: 0;
    margin-right: -5rem;
    margin-top: -3rem;
    padding: 1rem;

    @media all and (max-width: 850px) {
      margin-right: 0;
    }
  }
}

```

* Now our single store should look more presentable

![single store new styles](https://i.imgur.com/ldUC0gm.png)

## Reviews
* Each store will have a button to click
    - When they left review
    - Who left review
    - Star ranking of store
* When you are logged in, you can leave your own review and star rank

## We will have top layout
Rank top 10 stores using average rating

## Build our Review Model

`Review.js`

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({

});

module.exports = mongoose.model('Review', reviewSchema);
```

## Import Model
`start.js`

```js
// more code

// import all of our models
require('./models/Store');
require('./models/User');
require('./models/Review'); // add this line

// more code
```

## What fields do we need on our Schema?
* created
* user
    - Will be a relationship
    - You need one of existing users to be an user
* store
    - Will be a relationship 
* text
* rating

### Create Review Schema
`Review.js`

```
// more code

const reviewSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now()
  },
  _user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an user'
  },
  _store: {
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
* Click on `/stores`
* Click on individual store
* You should see this:

![store review form](https://i.imgur.com/giOsnlt.png)

## Add Stars
* Create a new file

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

![radio buttons](https://i.imgur.com/dMXJe4v.png)

* Let's hide these radio buttons using CSS
* Create a new file

`_reviewer.scss`

```
/*
  Reviewer Form
 */
.reviewer {
  position: relative;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  &__stars {
    display: flex;
    justify-content: center;
    input {
      display: none;
      &:checked {
        & ~ label {
          color: $danger-yellow;
        }
      }
      & + label {
        font-size: 0;
        &:before {
          content: '★';
          font-size: 2rem;
        }
        /* These are in the opposite DOM order
           re-order them to be visually in normal order
           This is fine for accessibility because our labels have for()
         */
        &[for='star5'] {
          order: 5;
        }
        &[for='star4'] {
          order: 4;
        }
        &[for='star3'] {
          order: 3;
        }
        &[for='star2'] {
          order: 2;
        }
        &[for='star1'] {
          order: 1;
        }
        &:hover,
        &:hover ~ label {
          color: lighten($danger-yellow, 20%);
        }
      }
    }
  }
  textarea {
    border: 0;
    outline: 0;
    font-size: 2rem;
    padding: 2rem;
    height: 200px;
  }
  &__meta {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid $grey;
    & > * {
      flex: 1;
    }
  }
}
```

* Don't forget to import this new partial

`styles.scss`

```
// more code
@import 'partials/reviewer';
```

![new styled reviewer form](https://i.imgur.com/dhSNAje.png)

* HTML for stars

![html for stars](https://i.imgur.com/lpWqJ4K.png)

* Each input is displayed as `none` because we don't want the inputs to show up

![hiding inputs](https://i.imgur.com/qqEd1dj.png)

* Instead, we'll use labels to show **stars** instead
    - We use labels and give them a `for` attribute
    - With a `for` attribute and a corresponding `id` attribute exactly the same, then when you click on that `label` the corresponding checkbox will be selected

### Make stars functional
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
* Roll over the bottom and you'll see stars (we'll update the color with CSS)

`_reviewer.scss`

```
.reviewer {
  position: relative;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  &__stars {
    color: $black; // add this line

// more code
```

![we see stars](https://i.imgur.com/UcLOWE3.png)

* We can hover over stars and they have a hover state

![hover state](https://i.imgur.com/kd0fZl6.png)

* We can select stars

#### Add button

```
.reviewer__stars
  each num in [5,4,3,2,1]
    input(type="radio" required id=`star${num}` name="rating" value=num)
    label(for=`star${num}`) #{num} Stars
input.button(type="submit" value="Submit Review")
```

![button and stars](https://i.imgur.com/r4lK5nN.png)

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

```js
// more code

router.post('/reviews/:id', authController.isLoggedIn, catchErrors(reviewController.addReview));
/*

  API

*/

// more code
```

* We point to our `reviews/:id` route
* We make sure the user is logged in
* We are going to be using **async-await** so we use our `catchErrors()` method
* We will create a new controller called `reviewController` and we will make inside that file a method called `addReview()`

### Spread out into multiple lines for improved code readability
```js
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

```js
const mongoose = require('mongoose');
const Review = mongoose.model('Review');

exports.addReview = async (req, res) => {
  res.json(req.body);
};
```

### Test it out
* We just want to see the data we are getting

1. View in browser
2. Fill out form
3. Select star rating
4. Submit

* And you will see something like:

![json review](https://i.imgur.com/lWXHwW0.png)

* We are getting
    - text
    - rating

* We need to add
    - _user
    - store

### We need to add to `req.body`
```js
req.body._user = req.user._id
req.body._store = req.params.id
```

### We update our controller method
`reviewController.js`

```js
const mongoose = require('mongoose');
const Review = mongoose.model('Review');

exports.addReview = async (req, res) => {
  req.body._user = req.user._id;
  req.body._store = req.params.id;
  res.json(req.body);
};
```

* And the output should look similar to this:

![we have our data!](https://i.imgur.com/FeZPM5N.png)

## Now we can begin to save our new review
`reviewController.js`

```js
const mongoose = require('mongoose');
const Review = mongoose.model('Review');

exports.addReview = async (req, res) => {
  req.body._user = req.user._id;
  req.body._store = req.params.id;
  const newReview = new Review(req.body);
  await newReview.save();
  req.flash('success', 'Review Saved');
  res.redirect('back');
};
```

* We create a new Review Document and pass it all the data inside `req.body`
* Since we are using `async-await`, we don't need **callbacks** and we just wait for our document to be saved
* We flash a `success` message
* We send the user **back to the page they submitted the form from**

### Test it out
* We don't see our review on the page

#### But we should see it in `MongoDB`
1. Open `MongoDB` Compass
2. Hit `cmd` + `r` to refresh we should see
    - Our new Review Collection
    - And the review inside it with the data we had inside our `req.body`

Our success flash

![review saved](https://i.imgur.com/qyo3iZN.png)

Our new data inside our `MongoDB` Database

![reviews in `MongoDB`](https://i.imgur.com/uf7NA3X.png)

### Next
* How do we pull in reviews for an existing store?
