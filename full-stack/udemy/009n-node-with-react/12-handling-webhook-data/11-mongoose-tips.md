# Mongoose Tips
## Tip #1 (Use Chrome a lot)
* Write out in English inside Chrome browser (obvious but good to remember)
    - `mongoose js update document in subdocument collection`

## Tip #2
* Copy this code from `index.js`

```js
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const secretKeys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(secretKeys.mongoURI);
```

* Kill server
* Run Node CLI `$ node`
* We can use this CLI to easily write queries and test them out
* Past the code above into Node CLI
* Hit return
* Press down arrow and you'll see the Terminal prompt for `MongoDB`

![mongo in terminal](https://i.imgur.com/p7GMgH2.png)

`> const Survey = mongoose.model('Survey')`

* Type `> Survey`
    - And you now have your mongoose Model class `Survey`

### Find all Surveys
`> Survey.find({})`

* The above won't give you all surveys
* The reason is this is still an asynchronous operation so if you execute the above statement you won't see any results printed to the screen unless you specifically console.log them

`> Survey.find({}).then(console.log)`

* We are passing a reference to the console.log function to the Promise so we don't need the parentheses here
* That will show you all the surveys we ever created

### Give me a survey with a title of `lose`
`> Survey.find({ title: 'lose' }).then(console.log)`

* **tip** Edit your mongo queries in your text editor then paste them into the Terminal

### Give me a survey where yes votes = 0
`> Survey.find({ yes: 0 }).then(console.log)`
