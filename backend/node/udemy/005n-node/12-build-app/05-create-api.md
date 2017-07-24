# Create API
* This has nothing to do with Angular or our front end
* We haven't built out our front end yet
* This is just the API itself
* This is part of modern web development
    - You build out your API
    - Then you build various kinds of interfaces on top of
        + Interfaces like:
            * Angular
            * React
            * Ember
            * Use or install an android or iphone device that uses and consumes this API
* You build the API and building the front end is a separate process

## Create new api controller
`apiController.js`

```js
const Todos = require('./../models/todoModel');
const bodyParser = require('body-parser');

module.exports = function(app) {

  app.use(bodyParser.json());
  // make sure it can handle URL encoded data
    // that is data where certain characters are converted to %number
  app.use(bodyParser.urlencoded({ extended: true }));

  // no we can send data nicely to our API as JSON
  // which will really just be a string in the body of our HTTP request
  // body-parser will handle getting it out of the string for us
  // and let us handle it as a JavaScript object

  // get all the todos for a particular person
  app.get('/api/todos/:uname', function (req, res) {

    Todos.find({ username: req.params.uname },
      function(err, todos) {
        if (err) throw err;

        res.send(todos);
      });

  });

  // get a particular todo using its id
  app.get('/api/todo/:id', function(req, res) {

    Todos.findById({ _id: req.params.id }, function(err, todo) {
      if (err) throw err;

      res.send(todo);
    });

  });

  app.post('/api/todo', function(req, res) {

    // if the id exists it is an update
    if (req.body.id) {
      Todos.findByIdAndUpdate(req.body,id, {
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment
      }, function(err, todo) {
        if (err) throw err;

        res.send('Successfully updated');
      });

    }

    // id not there so we need to create the todo
    else {

      const newTodo = new Todos({
        username: 'test',
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment
      });

      newTodo.save(function(err) {
        if (err) throw err;

        res.send('Successfully create new todo');
      });

    }

  });

  app.delete('/api/todo', function(req, res) {

    Todos.findByIdAndRemove(req.body.id, function(err) {
      if (err) throw err;

      res.send('Successfully deleted');
    });

  });

}
```

* Add `apiController` to `app.js`

`app.js`

```js
const express = require('express');
// start express
const app = express();
const setupController = require('./controllers/setupController');
const apiController = require('./controllers/apiController'); // add this line
// HERE IS WHERE WE REQUIRE THE DATABASE!!!!
require( './db/db' ); // ADD THIS LINE

// add seed data
setupController(app);
// make app aware of all End Points
apiController(app); // add this line
// more code
```

### Test if it works
* Is nodemon running `$ nodemon app.js`
* Browse to `http://localhost:3000/api/todos/test`
* You should see 3 records (from our seed data) in browser that are all our `test` user documents from the `MongoDB`
* Find all todos by username

![todos by username](https://i.imgur.com/LXDLkD9.png)

#### Test if the ID query by ID api is working
* Copy `_id` from one of the test documents in our browser
* Paste this URL in the browser

`http://localhost:3000/api/todo/597518b0698b8c0b3a5783e0`

* Remember to swap out the `_id` in your `MongoDB` todo collection document

![find by id](https://i.imgur.com/4KFFp0N.png)

## Next - We need to fully test our API
* We can use some utilities to help us test





