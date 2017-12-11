# Refactor Code
* We want routes in server.js
* We want models in their own folder
* We want our db connection in its own file

`server/db/mongoose.js`

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
```

`server.js`

```js
const {mongoose} = require('./db/mongoose');
// MORE CODE
```

* We use ES6 destructuring to pull off the mongoose object and store it in the `mongoose` variable
* We point to where it is
* Since we exported it we have access to it

`server.js`

```js
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
```

`server/models/todo.js`

```js
const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};
```

`server/models/user.js`

```js
const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  }
});

module.exports = {User};
```

* We just refactored our code
* It is now easier to test, update and manage
* `server.js` will just be responsible for our routes

## Install Express
`$ yarn add express body-parser`

* And `body-parser`
    - This will enable us to send JSON to the server
    - The server can take that JSON and do something with it
    - `body-parser` parses the body
        + It takes that string and turns it into a JavaScript object

`server.js`

```js
const express = require('express');
const bodyParser = requie('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();

app.listen(3000, () => {
  console.log('Started on port 3000');
});
```

* We have a space separating custom and 3rd party modules
* We have a bare bones server and listen to a port (3000)
    - This gives us a basic server
    - We now just have to configure our routes

`server.js`

```js
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});
```

`$ node server/server.js`

* You will see server is started on port 3000
* Open Postman
* Select POST from dropdown
* Enter `http://localhost:3000/todos`
* You will get a 404 page not found
* In order to send data to the app you need to click the `Body` tab
* we are sending JSON data so select the `raw` radio button
* Then select JSON (application/json) from the dropdown list

![app/json](https://i.imgur.com/zcvcKKn.png)

* Now we have our Header set (You will see the number 1)
  - That is the `Content-Type` Header
  - This lets the server know that JSON is getting sent
  - All of this is done automatically with Postman

![adding sample JSON we want to send](https://i.imgur.com/aEuKZ9F.png)

* We can now click the Postman `Send` button
* But nothing will happen
* We won't get a response because we having responded to it inside `server.js`
* But checkout the Terminal and you'll see our date (the sample JSON we sent)

![sample JSON in terminal](https://i.imgur.com/X8Sf6U8.png)

## Create the todo
* [List of all HTTP status](https://httpstatuses.com/)
* We'll use a 400 Error (Bad Request)
  - Use this when bad input
  - This will be the case if the Model can't be saved
    + Maybe user forgot to provide a text string
    + Or it was no long enough

`server.js`

```js
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});
```

* Restart server
* You could use nodemon but let's manual restart for now

`$ node server/server.js`

* View Post man and below our sample JSON you will see we have a Status of 200 (success)
* Under Pretty, we see the JSON object with our text `This is from postman` but also the `_id`, `completedAt` and `completed`

## Test our todo without the proper text in Postman
* Set it to an empty string
* It is required so Postman will show us the error object (The 400 we set)
![request error](https://i.imgur.com/MMnOEZM.png)

* All that info in the error object can help someone fix their request and make a proper one

## Robomongo (Robo 3T)
* View inside our `todos` collection and you'll see:

![our sample postman](https://i.imgur.com/1yzt0UH.png)

* We now have our first HTTP Endpoint setup for the Todo REST API

## Challenge
* Add a couple Todos and make sure the text is appearing in Postman and Robomongo


