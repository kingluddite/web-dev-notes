# Create Mongoose Schemas
* Create `models/` folder in the root of your app
* Create `User.js` and `Genealogy.js`
    - Make sure both are capitalized
* Schemas are the _blueprint_ of every instance of that Schema that is created in our database

`Genealogy.js`

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenealogySchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  username: {
    type: String
  }

})

module.exports = mongoose.model('Genealogy', GenealogySchema);
```

`User.js`

```
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Genealogy',
  },
});

module.exports = mongoose.model('User', UserSchema);
```

* Will hold an array of all IDs provided by our database

## Require our Schemas into our app
`server.js`

```
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

// models
const Genealogy = require('./models/Genealogy');
const User = require('./models/User');

// MORE CODE
```

## Test if still working
* Open your terminal. Any Errors? No? Good!
