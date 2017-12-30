# Convert other todo routes to private (part 2)
* GET /todos/:id
* DELETE /todos/:id
* PATCH /todos/:id

## Process similar to what we did before
1. Add `authenticate` middleware
2. Take advantage of the new **_creator** property
3. Update the test cases

## Get /todos/:id
* We need to update the seeds.js `users` array
* By adding the tokens array
* We change the 2nd tokens array to have the `userTwoId` `_id`
`seed.js`

```
const users = [
  {
    _id: userOneId,
    email: 'luke@starwars.com',
    password: 'jediknight',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userOneId, access: 'auth' }, 'abc123')
          .toString(),
      },
    ],
  },
  {
    _id: userTwoId,
    email: 'leia@starwars.com',
    password: 'princess',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userTwoId, access: 'auth' }, 'abc123')
          .toString(),
      },
    ],
  },
];
```

* Now we have authentication tokens for both users
* We will need that to fill out the test suite
* We just broke some test cases so let's fix them now

```
User.findById(users[1]._id)
          .then(user => {
            expect(user.toObject().tokens[1]).toMatchObject({
```

* We changed `tokens[0]` to `tokens[1]`

### 'should reject invalid login'
* We expect to login with an invalid password
* then we expect the tokens array to be empty toBe(0) but now after our change it should be toBe(1)

```
User.findById(users[1]._id)
  .then(user => {
    expect(user.tokens.length).toBe(1);
```

* Run `$ npm test` again and all 19 tests should pass

## Now we can convert the 3 routes
* GET /todos/:id
* We add the `authenticate` middleware
    - This gives us access to:
        + the makes sure a user is logged in
        + will give us access to the user and the token via the `req` object
* We need to modify our query
    - Right now we fetch the todo by the `id` provided in the URL
    - We can't do this anymore
    - A user who is logged in could swap out any todo `id` in the URL and access any todo they have the `id` to
        + We'll use `findOne()` instead of `findById()`
        + And we won't just query by `id` alone
        + Now we'll query by `id` and `_creator` properties

`server.js`

```
app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    console.log('Todo not found');
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id,
  })
```

* Now we need to update 3 test cases in `server.test.js`

```js
describe('GET /todos/:id', () => {
  it('should return todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
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
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', done => {
    // /todos/123 (not a valid id and when converted to objectid is should fail)
    // with get request make 404 the status code
    request(app)
      .get('/todos/bada55')
      .set('x-auth', users[0].tokens[0].token)
      .expect(400)
      .end(done);
  });
});
```

## New test
* If I'm logged in as user #1 I can't fetch a todo owned by user #2

```js
it('should not return todo doc created by other user', done => {
  request(app)
    .get(`/todos/${todos[1]._id.toHexString()}`)
    .set('x-auth', users[0].tokens[0].token)
    .expect(404)
    .end(done);
});
```

* 20 test cases should be passing

## Now let's update the DELTE route /todos/:id
1. Add middleware
2. Update query
    * We are using findByIdAndRemove(id)
    * But we want to use findOneAndRemove({})
3. Update test cases

```js
app.delete('/todos/:id', authenticate, (req, res) => {
  // get the id
  const id = req.params.id;

  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  // remove todo by id
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id,
  })
    .then(todo => {
      if (!todo) {
        // error
        // if not doc, send 404
        return res.status(404).send();
      }

      // success
      // if doc, send doc back with 200
      res.send({ todo });
    })
    .catch(err => {
      // error
      // 400 with empty body
      res.status(400).send();
    });
});
```

* Update test

### Add test
* If I try to delete a todo I don't own, it doesn't get removed

```js
it('should not remove a todo if not owner', done => {
  const hexId = todos[0]._id.toHexString();

  request(app)
    .delete(`/todos/${hexId}`)
    .set('x-auth', users[1].tokens[0].token)
    .expect(404)
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.findById(hexId)
        .then(todo => {
          expect(todo).toBeTruthy();
          done();
        })
        .catch(err => done(err));
    });
});
```

* The other two delete tests

```js
it('should return 404 if todo not found', done => {
  const hexId = new ObjectID().toHexString();

  request(app)
    .delete(`/todos/${hexId}`)
    .set('x-auth', users[0].tokens[0].token)
    .expect(404)
    .end(done);
});

it('should return 404 if object id is invalid', done => {
  request(app)
    .delete('/todos/123abc')
    .set('x-auth', users[0].tokens[0].token)
    .expect(404)
    .end(done);
});
```

* All 21 test should pass with `$ npm test`

## Update PATCH route /todos/:id
### Challenge
```js
app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(
    { _id: id, _creator: req.user._id },
    { $set: body },
    { new: true }
  )
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});
```

* Update the patch tests

```js
describe('PATCH /todos/:id', () => {
  it('should update the todo', done => {
    const hexId = todos[0]._id.toHexString();
    const text = 'This is new updated text';

    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({
        completed: true,
        text,
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', done => {
    const hexId = todos[1]._id.toHexString();
    const text = 'This is new updated text!!!';

    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        completed: false,
        text,
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });
});
```

* Add 3rd update test case
* duplicate should update todo
* try to update first todo as second user
* we should get a 404

```js
it('should not update the todo if not creator', done => {
  const hexId = todos[1]._id.toHexString();
  const text = 'This is new updated text';

  request(app)
    .patch(`/todos/${hexId}`)
    .set('x-auth', users[0].tokens[0].token)
    .expect(404)
    .end(done);
});
```

## Summary
* All 22 tests should pass
* Our users and todos are associated
* All methods are locked down
* There is no way to update, create, fetch or delete todos that you don't own
* You need to be logged in for all these requests
* You can only manage data you have access to

## Git
`$ git status`
`$ git commit -am 'Associate users with todos'`


