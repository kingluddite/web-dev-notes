# Storing Data in the Database
## Update our View
`node.hbs`

```html
<h1>A NodeJS View</h1>
<form action="/" method="post">
  <label for="email">Email</label>
  <input type="email" name="email" id="email" placeholder="email" />
  <input type="submit" value="submit" />
</form>
```

## Update our route
* We tell our get `/message` route to longer expect a dynamic message in the URL using `:msg`

`routes/app.js`

```js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', function (req, res, next) {
    res.render('node');
});

router.post('/', function(req, res, next) {
  const email = req.body.email;
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
    password: 'secret',
    email: email
  });
  user.save(function(err, result) {
    console.log(err);
  });
  res.redirect('/');
});

module.exports = router;
```

* Run `$ mongod`
* Run the server `$ npm start`

## Important
* You will have a problem if you run `$ nodemon app.js`
    - This is because your `package.json` has a `script` taht tells it **start** points to `node ./bin/www`

### Warning
![warning deprecated mongo connection()](https://i.imgur.com/ZJQ175n.png)

* if you get this change `/app.js`

```js
// more code
mongoose.connect('mongodb://localhost/node-angular', {
  useMongoClient: true,
});
// more code
```

### Visit `localhost:3000` (which is our `/` route)
* Enter an email and submit
* You will see this in the terminal

![terminal get and post](https://i.imgur.com/dR54UD6.png)

### How do we know if we stored the email in the database?
* Use the `MongoDB` shell (open new tab in terminal)
* `> mongo`
* `> show dbs` (show all local databases)
* `> use node-angular` (select your current project Database)
* `> db.users.find()` (find all current users)

![one user created](https://i.imgur.com/Ogjtz3S.png)

* Why's my mongo result set look so cool?
    - [mongohacker](https://github.com/TylerBrock/mongo-hacker)
* Our form has stored data in the database
    - messages is an empty array because we didn't pass it anything
    - `MongoDB` created an `_id` field automatically when we inserted a record

## Next - Fetch some data 
