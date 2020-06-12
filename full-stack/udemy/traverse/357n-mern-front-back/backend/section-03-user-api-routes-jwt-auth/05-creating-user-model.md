# Creating the User Model
1. We start with user model to register a user
2. Then we'll move on to authentication
3. Then we can deal with Profile and Post

## How can we interact with our Database?
* We need to create a model for each of our "resources"

## models
* Create a folder models
* Create `User.js`
    - Typically you spell models with a capital letter

### model schema
* To create a model you need to create a schema
    - What is a schema?
        + A schema just holds the fields that we want this particular "resource" to have

### User schema
* We'll have user log in with their email and password
    - This is the norm these days
    - Users typically no longer log in with username
* Name, email and password are required
* email needs to be unique, no two users with same email
* avatar (gravatar), it attached an image to your email (you may have one without even knowing it)
    - We need the avatar in user because when you first create a user he won't have a profile
    - We want the gravatar to be available right aways so we put it inside the user and not inside the profile
* date
    - We'll use Date type and default to the time now using `Date.now`
* Make sure to export your model schema

`User.js`

```
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
```

* TODO - last line has an error "User" not defined

## Next
* Create a route that will register users
* Implement Express Validator so we can have clean responses if the correct data is not sent, (ie if email is not valid)
