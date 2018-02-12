# Testing GET /todos/:id
* We will create 3 test cases for this route `/todos/:id`

1. One that fetches and individual todo item
2. One will make sure that when we pass in an invalid object, we get a 404
3. Another one will verify that when we pass in a valid object id but it doesn't match a doc, we get a 404 back
4. When we pass in an objectID that does match a doc that that doc comes back in the response body

```js
const expect = require("expect");
const request = require("supertest");
const {ObjectID} = require('mongodb');

const { app } = require("./../server");
const { Todo } = require("./../models/todo");

const todos = [
  {
    _id: new ObjectID(),
    text: "First test todo"
  },
  {
    _id: new ObjectID(),
    text: "Second test todo"
  }
];

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", done => {
    const text = "First test todo";

    request(app)
      .post("/todos")
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

  it("should not create todo with invalid body data", done => {
    request(app)
      .post("/todos")
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

describe("GET /todos", () => {
  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
});
```

* Make sure mongod is running `$ mongod`
* Make sure test server is running `$ node run test-watch`
* All 3 tests should pass
* To convert an `_id` into a string you use `.toHexString()` method

`$ mongod` (one terminal window)

`$ npm run test-watch` (another terminal window)

* You should see that all 4 tests are passing
* But now `should return todo doc` is passing

## Challenge
* Write two test cases on your own

```js
it('should return 404 if todo not found', (done) => {
  // make sure you get a 404 back 
});
it('should return 404 for non-object ids', (done) => {
  // /todos/123 (not a valid id and when converted to objectid is should fail)
  // with get request make 404 the status code
});
```

* Complete code with challenge

```js
const expect = require("expect");
const request = require("supertest");
const {ObjectID} = require('mongodb');

const { app } = require("./../server");
const { Todo } = require("./../models/todo");

const todos = [
  {
    _id: new ObjectID(),
    text: "First test todo"
  },
  {
    _id: new ObjectID(),
    text: "Second test todo"
  }
];

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", done => {
    const text = "First test todo";

    request(app)
      .post("/todos")
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

  it("should not create todo with invalid body data", done => {
    request(app)
      .post("/todos")
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

describe("GET /todos", () => {
  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    // make sure you get a 404 back 
    const hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    // /todos/123 (not a valid id and when converted to objectid is should fail)
    // with get request make 404 the status code
    request(app)
      .get('todos/bada55')
      .expect(404)
      .end(done);
  });
});
```

* All 6 tests are passing
 
## Git
`$ git commit -m 'Add test cases for GET /todos/:id'`

## Next - Deply API to Heroku

