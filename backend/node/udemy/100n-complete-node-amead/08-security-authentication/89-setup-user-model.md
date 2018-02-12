# Setup User model
* Our data isn't safe
* Anyone can use CRUD on it
* We need to create a user's collection and lock it down
* You'll only be able create or modify a document you create

### Sample User data
```
{
    email: 'test@example.com',
    password: 'mypassword',
    tokens: [{
        access: 'auth',
        token: 'asdfsdfsdfsdfasfsdfsdfasdf'
        }] 
}
```

* Password comes to server but `bcrypt` will encrypt it and store it in the db
* You don't store unencrypted passwords
    - It is impossible to get the password back from the algorithm as it is a **one way algorithm**
    - You can't unhash a value
* `tokens` is an array of objects
    - each object is a login token
    - I could log in to the app via my phone or a website
        + I'll need different authentication token for each
        + `access` - displays the token type
            * we'll work with **authentication** token type 'auth'
                - could also be a type for verifying emails or resetting passwords
        + `token` value, similar to password it will be a really strong cryptographically composed string
            * We'll pass this string back and forth
            * When use wants to make a request they will send it along with the HTTP request and we can use that to validate that the user does indeed have access to do what they want to do
                - deleting a todo
                - adding a todo
                - updating a todo
                - (CRUD)

## Update our User model
* With the info we just gathered

`server/models/user.js`

```js
const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  }
});

module.exports = {User};
```

* unique - means we can't have 2 documents in user model with same email (good thing!)
* We need to validate the email to make sure it is a valid email
    - Very tricky thing to do
    - Lots of edge cases
    - We'll use an email library that deals with all these edge cases so we don't have to code it from scratch

## Search Google for:
`mongoose custom validation`

* [link to documentation](http://mongoosejs.com/docs/validation.html)
    - [link to validators](http://mongoosejs.com/docs/validation.html)
    - scroll down to Custom Validators

`user.js`

```js
const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true,
    validate: {
      validator: value => {},
      message: '{VALUE} is not a valid email',
    },
  },
});

module.exports = { User };
```

* Search for `npm validator`
* [npm validator](https://www.npmjs.com/package/validator)
* www.npmjs.com/PACKAGE/PACKAGENAME
* tons of things to validate
    - Here is the email example:

```
var validator = require('validator');
 
validator.isEmail('foo@bar.com'); //=> true
```

## Install the npm package `validator`
`$ npm -g validator --save`

`user.js`

* User model

```js
const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true,
    validate: {
      validator: value => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  tokens: [
    {
      access: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = { User };
```

## Create request
* User will hit this request to sign up a new user

### Challenge
* POST /users
* We create a new instance of the model
* Use lodash _pick() to grab email and password
    - that will give you body variable
    - pass `body` into constructor function directly
* save if successful
* or error

#### Make sure you:
1. Shut down server
2. Wipe Todo App db
    * use drop database inside robomongo
3. Restart server
    * `$ node server/server.js`

* If you don't do this it won't validate the at emails are unique
* Play around in postman
* Experiment inserting users
    - with invalid emails and passwords
    - duplicate emails

## Solution
`server.js`

```js
// MORE CODE
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User({
    email: body.email,
    password: body.password,
  });

  user.save().then(
    user => {
      res.send(user);
    },
    err => {
      res.status(400).send(err);
    }
  );
});
// MORE CODE
```

**note** Using pick makes like easy. You just pass body to the User constructor

```
// MORE CODE
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']); 
  const user = new User(body);
// MORE CODE
```

### Postman
* post
* body
* raw
* json/application
* This is your URL `{{url}}/users`
* Test a valid user with username and password
```
{
    "email": "joe@joe.com",
    "password": "123456"
}
```

* Should insert the user and output

```json
{
    "__v": 0,
    "email": "joe@joe1.com",
    "password": "123456",
    "_id": "5a4405decc6185cea5966580",
    "tokens": []
}
```

* Enter it again and you'll get duplicate error
    - and 400 error "duplicate key"

```json
{
    "email": "joe@joe.com",
    "password": "123456"
}
```

* Below is a bad email

```js
{
    "email": "joejoe.com",
    "password": "123456"
}
```

* Not a valid email error
* Enter 5 or less for password and it will trigger length error
* Don't provide an email - required error
* Don't provide a password - required error
* **note** Save the Post User route to Postman in the TodoApp Collection

## Hold off on Git
* Until we hash and finish our user stuff
