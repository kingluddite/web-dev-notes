# Survey Model
* We will start with `/api/surveys`
* It is a POST route
* It is the route a user uses to create a new survey

## What parts of our app will this feature touch?
* We need to create a routeHandler
* We will need a frontend feature - React
* Do we need to do any work at the Database level?
    - Yes, we need to persist our surveys

## How we create new collections of data
* We always create a Mongoose Model class
* When we create that class it automatically creates a collection of records inside our Database

![survey model diagram](https://i.imgur.com/5sUW6rc.png)

* We'll create a new Model class called `Survey`
    - Every survey document will contain
        + title
        + body
        + subject
        + recipients
* We also need to make sure there is some type of link between the Survey and the User who created it
* There will be a link between the User Model and the Survey Model

`/models/Survey.js`

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [String]
});

// load this up into our mongoose library
mongoose.model('survey', surveySchema);
```

* **troubleshoot**
  - Not sure why but I would get an error saying `surveys` Schema not registered, so I changed to `mongoose.model('surveys', surveySchema)` and it worked
* I did troubleshoot - turns out that I have a file `surveyRoutes.js` that was calling `surveys`

```
const mongoose = require('mongoose');
const requireLogin = require('./../middlewares/requireLogin');
const requireCredits = require('./../middlewares/requireCredits');
const Mailer = require('./../services/Mailer');
const surveyTemplate = require('./../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('Survey'); // calling it here
```

I updated this code and all is works again

`Survey.js`

```js
// more code
// load this up into our mongoose library
mongoose.model('Survey', surveySchema);
```

* `recipients` - triple check spelling!
    - We tell mongoose that it will be an array of strings `[String]`
* We load up into mongoose library using `mongoose.model('MODELNAMEHERE', schemaName)`
    - Name your Model in the singular and mongoose adds an `s` on your collection when it creates it automatically
* **note** Whenever we create a new file inside of our Express project, that doesn't just automatically include it or execute the code inside of here, so we need to make sure that we require the file in at least one location in our project

`/index.js`

```js
// more code
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(secretKeys.mongoURI);
// more code
```

## Revisit `recipients` and decide if we need it to be an array of strings
