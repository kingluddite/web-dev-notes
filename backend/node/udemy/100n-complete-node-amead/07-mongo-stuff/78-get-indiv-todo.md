# Get individual todo
* Individual resource GET/todos/:id

## How to fetch a variable that is passed in via the URL
* `// GET /todos/1232223`
* We need to make this part of the URL `1232223` dynamic
* We fetch that value, whatever the user passes in to make that query

## URL Parameter
`:somename`

* `app.get('/todos/:id')`
* `req.params`
    - Will be an object with key/value pairs
        + key - URL parameter (:id)
        + value - value of :id

### Test dynamic URL Parameter inside Postman
```js
// GET /todos/123123123
app.get('/todos/:id', (req, res) => {
  res.send(req.params);
});
```

* Start up server
* `$ nodemon server/server.js`
    - Should tell you `Started on port 3000`

![postman with params](https://i.imgur.com/qBIITDj.png)

```
{"id":"123"}
```

## Challenge
1. Validate id (using isValid)
    * If not valid
        - Stop the function and respond with a 404 and let user know `todo` was not found
            + Send back an empty body `res.status(404).send()`
2. Query db using `findById()`
    * Take id and query for a matching document
        - success
            + If there is a todo ---> send it back
            + If no todo (call succeeded but not found in selection)
                * Send back 404 with empty body
        - error
            + // 400 status and send empty body back

`server/server.js`

```js
const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require('mongodb');

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");

const app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  const todo = new Todo({
    text: req.body.text
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

app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id; 
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  });
});

app.listen(3000, () => {
  console.log("Started on port 3000");
});

module.exports = { app };
```

* Save as a postman collection

![postman collection](https://i.imgur.com/yKFUGND.png)

* We copy a valid id from Robomongo and paste that into Postman
* We increase the last number of the id by 1 in postman and see if that returns and empty object (the body will be empty)

## Git time
* Stop server
* `$ git status`
* `$ git commit -am 'Add GET /todos/:id`
