# Updating a resource PATCH /todos/:id
* Install lodash

`$ npm i --save lodash`

## Import lodash
`server.js`

```js
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
```

## Patch
* Is method you use when you want to update a resource
* **note**
    - I could have a DELETE route that creates todos
    - I could have a POST route that deletes todos
    - But the common convention is to use DELETE for deleting, POST for entering new data into the database and PATCH for updating existing data and GET for reading a resource

### Security
* We don't want the user to change things in the db we don't want them to
* lodash's **pick()** method is a great tool
    - pick() takes an object and then it takes an array of properties that you want to pull of
* getTime() returns milliseconds since epoch

`server.js`

```js
// MORE CODE
app.patch('/todos/:id', (req, res) => {
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

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
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
// MORE CODE
```

`$ mongod`

`$ npm start` 

## In Postman
* Switch to Todo App Local
* Select the saved `GET /todos` to copy the `id` to the clipboard
    - Create a new request (click '+' in tab)
    - Choose PATCH from dropdown
    - `{{url}}/todos/5a43110a5722c42260ac8925`
        + Replace the id with the `id` you copied
* Choose Body > raw > JSON (application/json)

```js
{
    "completed": true
}
```

* If you look at the GET tab you'll see that **completed** is false
* If the update works successfully it should update it to **completed** true
* Click `Send`
* You should see the `completed` is updated
* **note** if you get 400 error you may want to stop mongod and server and start again

```json
{
    "completed": true,
    "text": "this is an update using patch yo!"
}
```

* Will update text like this:

```json
{
    "todo": {
        "_id": "5a43110a5722c42260ac8926",
        "__v": 0,
        "text": "this is an update using patch yo!",
        "completedAt": 1514346552243,
        "completed": true
    }
}
```

## Git
`$ git commit -am Add PATCH /todos/:id`

`$ git push origin master`

`$ git push heroku master`

* **note** You need to deploy to the heroku master branch to have your app re-deploy

## Test postman on heroku
* Save route on Postman with this name: `PATCH /todos/:id`
* Save to existing collection Todo App


