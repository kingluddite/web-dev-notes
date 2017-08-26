# Setting up SubDocs
![subdocs diagram](https://i.imgur.com/t3xVtZK.png)

## /models/Recipient.js
* We are setting this up to prevent duplicate clicks by our users

`Recipient.js`

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: {
    type: Boolean,
    default: false
  }
});

module.exports = recipientSchema;
```

* We use `responded` instead of `clicked` as it is more semantically correct
* We set responded to a default value of `false`
* Triple check `recipient` spelling!
* Instead of using this line to load our Schema `mongoose.model('survey', surveySchema)`, we export
* **remember** We are going to be nested this Model inside another Model

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
  no: { type: Number, default: 0 }
});

// load this up into our mongoose library
mongoose.model('survey', surveySchema);
```

* **important** We need to have { Schema } before we require `RecipientSchema` - or else you'll get the Schema not defined error!
* No whenever mongoose loads up and saves a record to the `surveys` collection, it will look inside this **schema**
* It will look at all the schema properties and when it gets to `recipients` it will say "Ok I have an array of RecipientSchema object"
    - So every record inside the RecipientSchema must object the schema inside `recipientSchema`
