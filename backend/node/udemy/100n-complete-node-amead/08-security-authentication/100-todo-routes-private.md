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

* We get multiple 401 "Unauthorized" errors
* POST /todos --> needs to specify a `x-auth` value

```
describe('POST /todos', () => {
  it('should create a new todo', done => {
    const text = 'First test todo';

    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
```

* Not create todo with invalid body data

```
it('should not create todo with invalid body data', done => {
  request(app)
    .post('/todos')
    .set('x-auth', users[0].tokens[0].token)
```

* Getting all todos is a little different
* GET /todos
* Before we expected to get 2 todos back but now that is no longer the case
* Now we'll only get 1 todo (because they are associated with users and we only have 1 todo where the _creator is set to userOneId)

```
describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(1);
      })
      .end(done);
  });
});
```

### Final code
`server.test.js`

```js
const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', done => {
    const text = 'First test todo';

    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(3);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(1);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', done => {
    // make sure you get a 404 back
    const hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', done => {
    // /todos/123 (not a valid id and when converted to objectid is should fail)
    // with get request make 404 the status code
    request(app)
      .get('/todos/bada55')
      .expect(400)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', done => {
    const hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId)
          .then(todo => {
            expect(todo).toBeFalsy();
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should return 404 if todo not found', done => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', done => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', done => {
    // grab id of 1st item
    const hexId = todos[0]._id.toHexString();
    // create some new text to represent updated text
    const text = 'This is new updated text';
    request(app)
      // match patch request
      // provide proper url with proper id inside of it
      .patch(`/todos/${hexId}`)
      // set completed to true and text to new text value
      // to simulate a record updated
      .send({
        completed: true,
        text,
      })
      // 200 means all went well
      .expect(200)
      .expect(res => {
        // assert that text is new text
        expect(res.body.todo.text).toBe(text);
        // assert completed is true
        expect(res.body.todo.completed).toBe(true);
        // assert completed is true
        // UPDATE HERE BECAUSE JEST API is different
        // toBeA('number') no longer works!
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', done => {
    // grab id of 2nd item
    // this item has completed and completedAt
    const hexId = todos[1]._id.toHexString();
    // slight change to our updated text
    const text = 'This is new updated text!!!';
    request(app)
      // match patch request
      // provide proper url with proper id inside of it
      .patch(`/todos/${hexId}`)
      .send({
        // set completed to false and text to new text
        completed: false,
        text,
      })
      // all went well
      .expect(200)
      .expect(res => {
        // assert text is the new text
        expect(res.body.todo.text).toBe(text);
        // assert completed is false
        expect(res.body.todo.completed).toBe(false);
        // assert completed at is null
        // UPDATE AS JEST has different API
        // toNotExist() no longer works !
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });
});

describe('GET /users/me', () => {
  it('should return if authenticated', done => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', done => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', done => {
    const password = 'sithlord';
    const email = 'dvader@starwars.com';
    request(app)
      .post('/users')
      .send({ email, password })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end(err => {
        if (err) {
          return done(err);
        }

        User.findOne({ email })
          .then(user => {
            expect(user).toBeTruthy();
            expect(user.password).not.toBe(password);
            done();
          })
          .catch(err => done(err));
      });
  });

  it('it should return validation errors if request invalid', done => {
    // send an invalid email and invalid password
    request(app)
      .post('/users')
      .send({ email: 'bad-email', password: 'bad-password' })
      .expect(400)
      .end(done);
  });

  it('should not create user if email is in use', done => {
    // dupe email

    const password = 'sithlord';

    request(app)
      .post('/users')
      .send({ email: users[0].email, password })
      .expect(400)
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user and return auth token', done => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password,
      })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id)
          .then(user => {
            expect(user.toObject().tokens[0]).toMatchObject({
              access: 'auth',
              token: res.headers['x-auth'],
            });
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should reject invalid login', done => {
    // challenge
    // similar to previous test
    // pass an invalid password instead of a valid password
    // assertions
    //  400
    //  x-auth token should not exist
    //  user.token.length === 0 because no token should have been created
    //  copy the contents of previous test and paste below and tweek
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: 'bad-password',
      })
      .expect(400)
      .expect(res => {
        expect(res.headers['x-auth']).toBeFalsy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id)
          .then(user => {
            expect(user.tokens.length).toBe(0);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', done => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id)
          .then(user => {
            expect(user.tokens.length).toBe(0);
            done();
          })
          .catch(err => done(err));
      });
  });
});
```

* All 19 tests passed

## Summary
* We needed to associate the todo with the user
* We had to make that assocation on the model
* Then we had to add **authentication** to both of those routes
 
### And here we set the _creator property to the logged in user when they create todos

```
app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id,
  });
```

### Or we only return todos where the creator id equals the logged in User
```
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id,
  }).then(
```

`todo.js`

```
// MORE CODE
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = { Todo };
```




