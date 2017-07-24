# Add Seed data

## Seed
* Adding initial data to a database
* This is great so you, or your team, can seed your data to start working on your Application
* You many want a way to clear out seed data and start from scratch
* Or modify your schema and update your seed data
* This gives you great flexibility when creating an app that uses a Database

## How do I set this up?
* I am using Node
* So I should go to some URL and it will set up my seed data

## Create my `controllers` directory
`$ mkdir controllers`

* Create a controller just for setup

`$ touch controllers/setupController.js`

`setupController.js`

```js
const Todos = require('../models/todoModel');

module.exports = function(app) {

  app.get('/api/setupTodos', function(req, res) {

    // seed database
    const starterTodos = [
      {
        username: 'test',
        todo: 'Buy eggs',
        isDone: false,
        hasAttachment: false
      },
       {
        username: 'test1',
        todo: 'Buy eggs',
        isDone: false,
        hasAttachment: false
      },
       {
        username: 'test2',
        todo: 'Buy milk',
        isDone: false,
        hasAttachment: false
      },
       {
        username: 'test3',
        todo: 'Buy bread',
        isDone: false,
        hasAttachment: false
      },
    ];
    Todos.create(starterTodos, function(err, results) {
      res.send(results);
    });
  });
}
```

### Make my Express app aware of my endpoint
* Require the controller
* Add seed data

`app.js`

```js
const express = require('express');
// start express
const app = express();
const setupController = require('./controllers/setupController');

// HERE IS WHERE WE REQUIRE THE DATABASE!!!!
require( './db/db' ); // ADD THIS LINE

// add seed data
setupController(app);
// more code
```

* To actually add the seed data
    - Remember you won't see your `MongoDB` until there is actual data inside it
* Then if you have the mongo daemon running in one terminal tab `$ mongod`
* Run node
    - `$ node app.js`
    - You should see `You have connected to Mongo!` in the terminal

![connected to Mongo](https://i.imgur.com/wHw4kbU.png)

* Browse to `localhost:3000/api/setupTodos`
* You will see JSON in browser (I am using the Chrome extension JSON Viewer format my JSON)

![json from mongo](https://i.imgur.com/5gAYEqm.png)

* You will see the `_id` which means this JSON has come from `MongoDB`
* Then you will have interted a `Todos` collection and populated it with our seed data located inside `setupController.js`

#### Checks
* You should check if there is data in the Database and if so, don't run it
    - Otherwise you will grow your Database unnecessarily
* You should also check the current environment and if not development, don't run
* To see it, use MongoDB Compass and connect using localhost and the default port of 27017

![node-todo](https://i.imgur.com/xVVZUU9.png)

* Just click `Connect` button
* You should see our `node-todo` `MongoDB` Database like this:

![local compass connect](https://i.imgur.com/eYjAzcn.png)

* And if you click on that Database
* And then click on the `todos` collection
* Then click on the `Documents` tab
* You will see our see data documents

![documents in `MongoDB`](https://i.imgur.com/y3QjpXq.png)

### Lots of apps that generate fake data
[JSON Generator](http://www.json-generator.com/)

### MongoHacker
* Makes your local results print out pretty
* [link to mongohacker](https://github.com/TylerBrock/mongo-hacker)

![mongohacker](https://i.imgur.com/kuqc48q.png)
