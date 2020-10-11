# Data Validation and Sanitization: Part 1
* [npm validator docs](https://www.npmjs.com/package/validator)

## Install validator.js
`$ npm i validator`

`models/User.js`

* Validate an email

```
// MORE CODE

const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    },
    // match: [
    //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    //   'Please add a valid email',
    // ],
  },

// MORE CODE
```

* Add `trim` and `lowercase`

```
// MORE CODE

  email: {
    type: String,
    lowercase: true,
    required: [true, 'Please add an email'],
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    },

// MORE CODE
```

* Make sure password doesn't contain the word password

```
// MORE CODE

  hashed_password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 6,
    select: false,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Passord cannot contain "password"');
      }
    }
  },

// MORE CODE
```
