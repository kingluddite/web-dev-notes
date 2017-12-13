# Delete Resource

## Make sure to start:
`$ mongod`

* New file
* `/playground/mongoose-remove.js`

```js
const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
```

## Mongoose gives us 3 records for deleting our records
### 1. Todo.remove({})
* Similar find()
* But you can't pass it empty and expect it to remove everything
    - To remove everything in a collection do this `Todo.remove({})`

```js
const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

Todo.remove({}).then(result => {
  console.log(result);
});
```

`$ node playground/mongoose-remove.js`

* Will get a ton of info back
* At top is ` result: { n: 11, ok: 1 },`
    - Lets you know how many records were removed

### 2. Todo.findOneAndRemove()
* You get the removed doc back 
* remove({}) just gives you a number with how many were removed
* Create a new **todo** in robomongo
* Works exact same as `findByIdAndRemove()` except that it takes a query object

```js
Todo.findOneAndRemove({ _id: '5a314c9437ac747ffee2c8c7' }).then(todo => {});
```

### 3. Todo.findByIdAndRemove(id)
* Similar to findOneAndRemove()
* Both return the doc

```js
const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then(result => {
//   console.log(result);
// });

Todo.findByIdAndRemove('5a31485337ac747ffee2c717').then(todo => {
  console.log(todo);
});

```

* Make sure to comment out the other `remove()`

`$ node playground/mongoose-remove.js`

* Result:

```
{ _id: 5a31497637ac747ffee2c777,
  text: 'Ride bike',
  completedAt: null,
  completed: false }
```

## Challenge
```js
app.delete('/todos/:id', (req, res) => {
  // get the id
  //
  // validate the id -> not valid? return 404
  
  // remove todo by id
    // success
      // if not doc, send 404
      // if doc, send doc back with 200
    // error
      // 400 with empty body
});
```

* But you need to ask yourself an important question
    - You created the answer to the challenge but how can you test if it works?
    - That is where Postman comes in
    - Add a delete route and test if it works with a valid id and an invalid id

## Solution
### mongod
* Make sure `$ mongod` is running
* Remember how to trouble shoot it:

### Troubleshoot broken mongod
* `$ alias monkill='ps aux | grep mongod'`
* `$ kill -9 <PID>`

### server
`$ server/server.js`

```js
// GET /todos/123123123
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    console.log('Todo not found');
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(err => {
      res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
  // get the id
  const id = req.params.id;

  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }
  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        // error
        // if not doc, send 404
        return res.status(404).send();
      }

      // success
      // if doc, send doc back with 200
      res.send(todo);
    })
    .catch(err => {
      // error
      // 400 with empty body
      res.status(400).send();
    });

});
```

* I also added the todo get `:id` route because I had an error in the code before and just wanted to updated it with it's **missing closing curly brace** in the opening `if` condition statement
* I entered a bogus legit formatted id and got a 404 and a null result set
* I entered a bogus illegit id and got a 404

![add delete route](https://i.imgur.com/Ndhw0Vw.png)

* Just like we have a GET to find stuff and a POST to send data to the db, we now have a DEL to delete things
* You can also test in browser to make sure your local setup is working `localhost:3000/todos`

![four routes in postman collection](https://i.imgur.com/tGKOMeK.png)

## Git
* `$ git status`
* `$ git add .`
* `$ git commit -m 'Add DELETE /todos/:id route'`
* `$ git push origin master`
