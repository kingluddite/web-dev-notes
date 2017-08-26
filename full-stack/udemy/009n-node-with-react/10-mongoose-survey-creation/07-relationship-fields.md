# Relationship Fields
![user survey relationship](https://i.imgur.com/2u5eLEc.png)

* A User will have many surveys
* To do this we'll add one more property to our `surveySchema`

## Adding the Relationship
* We need to make mongoose understand that this will be a reference to a particular `user` (or another instance of a user)
* To create that relationship we add this line:

`_user: { type: Schema.Types.ObjectId, ref: 'User' }`

`Survey.js`

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient.js');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// load this up into our mongoose library
mongoose.model('survey', surveySchema);
```

* With this added property `_user`, we add the idea to **surveySchema** that every survey is going to belong to a very particular user
    - We indicate it has a type of `Schema.Types.ObjectId`
        + So whenever a Schema of this type gets saved to our Database and we look it up in our Database, we'll see an ID assigned to this field
        + And it will be the ID of the user who owns this record
    - We also add `ref: User`
        + This tells mongoose that the reference that we are making here belongs to the `User` model

## _name for reference properties
* Is this required?
    - No
    - We could have named it:
        + `user`
        + `ownedBy`
        + `iBelongTo`
        + `anythingwant`
* But by convention to make it obvious to anyone who's looking at it that the `_` in the property name of the schema designates that it is supposed to be a relationship field (sets up a relationship between this Model and another Model)

## Adding two additional fields
* Just to show how we can expand on this Survey

`Survey.js`

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient.js');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});

// load this up into our mongoose library
mongoose.model('survey', surveySchema);
```

* Now we are recording the date that we sent this survey
* We'll also record the latest time that someone has voted on a given survey
* Using `dateSent` and `lastResponded` we can determine if the survey is still active
    - So if the last time anyone responded was a week ago, then chances are the survey won't get any more responses

## Next - Create our Create survey API Endpoint
`recipients: recipients.split(',').map(email => ({ email: email.trim() }))`

* **remember** That the list of emails is supposed to be separated by commas and spaces
* We split by commas here, but there still might be some trailing or leading spaces on each email
* As such, we should make sure that we cut out any extra white space by using `email.trim()`

## Other Properties
* We don't need to worry about `yes` and `no` because they both default to `0`

## _user
* This is used to point to the user who `owns` this particular survey
* So we create the first instance of the Survery

`const survey = new Survey({`

* We need to link the survey to the current_user

`surveyRoutes.js`

```js
// more code
module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id
    });
  });
};
// more code
```

* `req.user.id`
    - `id` is the `_id` that `MongoDB` automatically creates when we create a new User (and any document inside `MongoDB`)
* We also get the timestamp with `Date.now()`
  - It technically isn't saved yet but it is close enough

### Final file
`surveyRoutes.js`

```js
const mongoose = require('mongoose');
const requireLogin = require('./../middlewares/requireLogin');
const requireCredits = require('./../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
  });
};
```

## Next - Tacking Emails
