# Validators, Types Defaults
`server.js`

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

const newTodo = new Todo({
  text: 'Wash Ferrari'
});

// save to db
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (err) => {
//   console.log('Unable to save todo', err);
// });

const anotherNewTodo = new Todo({});

anotherNewTodo.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
  console.log('Unable to save todo', err);
});
```

`$ node server/server.js`

* Output:

```json
{
  "__v": 0,
  "_id": "5a296a042ec29ffa2272e032"
}
```

## Houston we have a problem
* We run the script but the only default items are the version and `id`
* All of the properties we specified in Model are nowhere t be found (this is a problem)

### What are the problems?
* We should not be adding todos to db is they don't have a `text` property
* `completed` should have a **smart default** like setting it to `false`

## Mongoose Validators
* [Link to documentation](http://mongoosejs.com/docs/validation.html)
* `required` for **strings**
* `min` and `max` for **numbers**
* Here is how we can use `required`

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
  text: {
    type: String
    required: true
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

const newTodo = new Todo({
  text: 'Wash Ferrari'
});

const anotherNewTodo = new Todo({});

anotherNewTodo.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
  console.log('Unable to save todo', err);
});
```

* Run and you'll see an error because we did not provide **text**
    - We are getting a validation error

### minlength
* We also can make sure people submit a minimal value
    - example: a password needs to have a minimum of 8 characters

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 8
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

const newTodo = new Todo({
  text: 'Wash Ferrari'
});

const anotherNewTodo = new Todo({text: "12345678"});

anotherNewTodo.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
  console.log('Unable to save todo', err);
});
```

## trim
* cuts off leading or training white spaces
* Great for login forms

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 4,
    trim: true
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

const newTodo = new Todo({
  text: 'Wash Ferrari'
});

const anotherNewTodo = new Todo({text: 'aaa'});

anotherNewTodo.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
  console.log('Unable to save todo', err);
});
```

## Set a default property
* Let's make our completed default to `false`

```js
// MORE CODE
const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 4,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number
  }
});
// MORE CODE
```

* Insert a record and watch how completed is set to `false` by default

## Mongoose Schemas
* [link to documentation](http://mongoosejs.com/docs/guide.html)

## Houston we have a problem
* Our text prop expects a String and if we provide it an Object we'll get an error
* But if we provided it a Boolean or a Number it would NOT error out because Mongoose would cast the Number and Boolean into a String

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number
  }
});

const newTodo = new Todo({
  text: 'Wash Ferrari'
});

const anotherNewTodo = new Todo({
  text: true
});

anotherNewTodo.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
  console.log('Unable to save todo', err);
});
```

* Run code and you'll see `true` was cast to a String and entered as a String value of "true"
* Remember that **type casting** does exist inside mongoose and will cause type casting errors

## Challenge
* Create a new User model
* Setup email property
    - required
    - trim
* Set type to String
* minlength of 2

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number
  }
});

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  }
});


const newUser = new User({
  email: 'john@john.com'
});

newUser.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
  console.log('Unable to save user', err);
});
```

* Create a stripped down user to see if the required
* Test minlength
* Test
* Trim
* Then enter an email and test that it works

## Next
* Adding Postman to test our API

