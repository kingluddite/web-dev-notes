# Making Todo Routes Private
* And only let users manage todo's they've created
* We need to store the id of the user that created the todo

`todo.js`

```
// MORE CODE
  completedAt: {
    type: Number,
    default: null,
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = { Todo };
```

## Update seed.js
* We need to add a user id on the todo
* Very simple to do

`seed.js`

```js
const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId,
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 123,
    _creator: userTwoId,
  },
];
```

## Challenge
* POST /todos
* Make route private by adding authenticate middleware
    - That will give us access to the user and token used
    - This enables us to add the `_creator` property when we create a todo
    - _creator: req.user._id

`server.js`

```js
app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id,
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    err => {
      res.status(400).send(err);
    }
  );
});
```

## GET todos
* Make private
* Only show todos that you own

```js
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id,
  }).then(
    todos => {
      res.send({ todos });
    },
    err => {
      res.status(400).send(err);
    }
  );
});
```

* Now user will only see their todos
* Start up nodemon

`$ nodemon server/server.js`

* Wipe postman db
* Open postman
* sign up a new user with default body data
    - That will give us an x-auth token
    - copy x-auth token to clipboard
* create new todo POST /todos
* Need to Click Headers tab
    - Add new key/value
    - x-auth and paste token into value
    - Send request
    - Should get 200 back
    - Should see todo down below with `_creator`
    - if you delete x-auth token in Postman and try to create another todo, you will get 401 unauthorized status

```js
{
    "__v": 0,
    "text": "Postman created this todo",
    "_creator": "5a46b7c7922b3d274abf445d",
    "_id": "5a46b7f7922b3d274abf445f",
    "completedAt": null,
    "completed": false
}
```

## Test
* When fetch todos you only get the todos back that the user owns

```js
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id,
  }).then(
    todos => {
      res.send({ todos });
    },
    err => {
      res.status(400).send(err);
    }
  );
});
```

* Will only fetch todos owned by creator
* Open up robomongo and you'll see we have multiple todos but we only see todos that we have the token for

## Run test file

`$ npm test`


