# Testing with Authentication
* We'll test an endpoint that needs authentication in order to work
    - examples:
        + endpoint for getting a user profile
        + endpoint for deleting and closing your account

## We need a testing authentication token
* We need to update our test user `userOne` that when they are created they have an authentication token that can be used by our test cases

### How can we generate a token?
1. We'll need to generate our own ObjectId for this user (we'll need to know about the ObjectId ahead of time so we can create the correct token)
    * We'll need to load in mongoose so we can generate our very own ObjectId
2. We'll need to create the token
    * We'll need to load in jwt (jsonwebtoken)

`tests/auth.test.js`

```
const request = require('supertest');
const jwt = require('jsonwebtoken'); // ADD!
const mongoose = require('mongoose'); // ADD!

// MORE CODE
```

## How do we create a new Object id?
* Use mongoose with `new mongoose.Types.ObjectId()`

## Do we create the ObjectId inside our `userOne`?
* No because we want to use it in two different places
    - We'll create it outside of `userOne` and give it its own variable `userOneId`

## How do we create our own token?
* We use our `userOneId` as the `_id` of our `userOne`
* Then we use jsonwebtoken's `sign()` function and pass it two things:

1. The object with `_id` key and the `userOneId` as the value
2. And use our environment variable as the secret

## Ignore node_modules with jest
`package.json`

```
// MORE CODE

  "jest": {
    "testEnvironment": "node",
    "coveragePathIgnorePatters": [
      "/node_modules/"
    ]
  },

// MORE CODE
```

## Chalk
* Used more than colors
* Can add themes
* [chalk docs](https://github.com/chalk/chalk)

