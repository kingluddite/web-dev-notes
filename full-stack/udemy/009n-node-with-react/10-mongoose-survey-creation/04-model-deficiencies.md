# Model Deficiencies
* Where do we store our feedback?

![store feedback diagram](https://i.imgur.com/3OqWZMi.png)

* When user clicks yes/no on our survey we need to record their feedback in our Database
* Currently, our Survey has no way of storing the feedback
* What if we added yes and no columns
    - It will record feedback

![yes/no added to Survey](https://i.imgur.com/AxIr0S5.png)

## Houston we have a problem!
* What if a user just keeps clicking yes in their email?
* We currently have no way to determine if the user has already provided their feedback

### How do we unique id each user and then detect when a given user has voted and then discount any future vote they do for a given survey?
* The only piece of info we can use to identify the user is the recipients' list
    - Currently, the recipients list is an array of Strings
    - So that means we can store any other information
    - There is a better way of handling this

#### How to prevent duplicates
![no dupes diagram](https://i.imgur.com/aFwT4BG.png)

* We are going to embed a sub document collection inside `recipients`
    - `subdocument collection` - Term used by Mongo and mongoose
    - We are going to store inside `recipients`
        + A bunch of little Models called `Recipient`
            * The `Recipient` Model with have two properties
                - email
                - clicked (boolean) - default value will be `false`

`Survey.js`

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [String],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 }
});

// load this up into our mongoose library
mongoose.model('survey', surveySchema);
```

## Next - Working on our subdocument (recipients)
