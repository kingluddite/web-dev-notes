# Mongoose query an id validation
* We don't have to manually convert the id string into an object id, mongoose will do that for us

## .find() vs findOne()
* `findOne()` returns 1 document at most

`playground/mongoose-queries.js`

```js
const {mongoose} = require('./../server/db/mongoose');
const {Todo} =  require('./../server/models/todo');

const id = '5a2db286f1063f5bb6366fe8';

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});
```

* Make sure the tests are not running because you will get null or an empty array
* This happens because the IDs are constantly changing since we remove/insert them repeatedly

1. Run your test suite only once (without nodemon) to generate two todos
2. Go into RoboMongo and copy the IDs
3. And then run `$ node playground/mongoose-queries`

### Result set
```
Todos [ { _id: 5a2db286f1063f5bb6366fe8,
    __v: 0,
    text: 'First test todo',
    completedAt: null,
    completed: false } ]
Todo { _id: 5a2db286f1063f5bb6366fe8,
  __v: 0,
  text: 'First test todo',
  completedAt: null,
  completed: false }
```

**tip** If you know you are just trying to find one document, use `findOne()` because this will give you back the document instead of an array with the document inside it

* This also helps if you use an id that doesn't exist, you'll get `null` back instead of an empty array

## findById(id)
* You just pass the id
* You don't have to make a query object
* You don't have to pass the _id prop

```js
Todo.findById(id).then((todo) => {
  console.log('Todo By Id', todo);
});
```

* That gives you the same result as findOne()

```js
Todo { _id: 5a2db286f1063f5bb6366fe8,
  __v: 0,
  text: 'First test todo',
  completedAt: null,
  completed: false }
```

**tip** If you want to find one document with a property other than `id` use `findOne()`

**tip** If you want to find one document with just an id use `findById(id)`

### Documentation on Mongoose queries
* [read the docs](http://mongoosejs.com/docs/queries.html)

## What happens when the id isn't correct
* Take the `id` you were using and increase the number of that id by 1
* const id = '5a2db286f1063f5bb6366fe8'; 
* to const id = '6a2db286f1063f5bb6366fe8';

### Rerun code
* We get an emtpy array for the `find()`
* We get null for `findOne()` and `findById(id)`

```
Todos []
Todo By Id null
Todo null
```

* If you don't find documents or a document you won't get an error
* You'll just get an empty array or null
* To handle this we just have to add an `if` statement

```js
Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('id not found');
  }

  console.log('Todo By Id', todo);
});
```

* Now we get `id not found` instead of `null`
* Set back id to number you had before

`const id = '5a2db286f1063f5bb6366fe8';`

## Invalid id
* The user is the one entering the id, so they could enter an invalid id
* We need to add a check for invalid id's in our code
* We'll comment out find and findOne

```js
const {mongoose} = require('./../server/db/mongoose');
const {Todo} =  require('./../server/models/todo');

const id = '5a2db286f1063f5bb6366fe8';

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('id not found');
  }

  console.log('Todo By Id', todo);
}).catch((err) => console.log(err));
```

* The code works find with a valid id but add two EE's at the end:

`const id = '5a2db286f1063f5bb6366fe8EE';

* Now we get a very long "Cast" error

`CastError: Cast to ObjectId failed for value "5a2db286f1063f5bb6366fe8EE" at path "_id" for model "Todo"`

* This tells you that now only does this id not exist in the db but it is completely invalid
* We will add this code to the top of our file:

```js
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} =  require('./../server/models/todo');
// more code
```

* We used this before
* We can use properties and methods off of the `ObjectID`
    - One property is `isValide`
    - This will return true or false
    - So we can add logic to our code

## Run our code
```js
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} =  require('./../server/models/todo');

const id = '5a2db286f1063f5bb6366fe8EE';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('id not found');
  }

  console.log('Todo By Id', todo);
}).catch((err) => console.log(err));
```

* Now at the top when we run the code we see `ID not valid`
* Then we see our huge object with casting error

## Challenge
* Comment out all code inside `mongoose-queries.js` except for:

```js
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} =  require('./../server/models/todo');
```

### Query the Users collections
* Grab `id` form **users** collection
* load in the User mongoose model
* use User.findById(id)
* handle 3 cases
    - if not id 'user not found'
    - if user was found print user to screen
    - handle errors that might have occurred (print error to the screen for that)
    - No need to use `isValid` for this, just fill out the `findById()` call

```js
User.find({
  _id: id
}).then((users) => {
  console.log('Users', users);
});
```

### Result
```
Users [ { _id: 5a2dbb62fb8cacab5d37675c, email: 'me@you.com' } ]
```

* Returns object inside array
```js
User.findOne({
  _id: id
}).then((user) => {
  console.log('User', user);
});
```

### Result
`User { _id: 5a2dbb62fb8cacab5d37675c, email: 'me@you.com' }`

* Returns just object

```js
User.findById(id).then((user) => {
  if (!user) {
    return console.log('Unable to find user');
  }

  console.log('User By Id', user);
}).catch((err) => console.log(err));
```

* Same as before with object id returned
* If a valid id is entered but not found we get an empy array, null or `id not found`
* If an invalid id is entered we get the casting error

`.gitignore`

```
**/*.swp
```

* If using vim add above

## Git
`$ git add -A`
`$ git commit -m 'add queries playground file`

## Next
* Challenge for you to create an entire API request
