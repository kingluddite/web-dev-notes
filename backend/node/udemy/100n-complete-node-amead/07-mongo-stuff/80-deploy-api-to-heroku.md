# Deploy API to Heroku
* We need to set up a real mongodb db
    - We are currently using a local mongodb
    - Won't be available once we get our app on heroku

`server/server.js`

```js
// more code
const { User } = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
// more code

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
```

## Adjust `package.json`
* We need to tell Heroku how to start the project
* We do this via the `start` script

```json
// more code
"scripts": {
    "start": "node server/server.js",
    "test": "mocha server/**/*.test.js",
    "test-watch": "nodemon --exec 'npm test'"
  },
// more code
```

## Tell Heroku which version of Node we want to use
* First find out which version of node you are running with `$ node -v`
* Heroku leds us specify our node version

```json
// more code
"engines": {
  "node": "9.2.1"
},
// more code
```

## Add database using Heroku addons
`$ heroku create`

`$ heroku addons:create mongolab:sandbox`

## Get the MONGODB_URI
* MLAB gave us this
* Grab it with: `$ heroku config`
* Copy it and we can tie it to our `process.env` using `process.env.MONGODB_URI`

`server/db/mongoose.js`

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
```

## Git it
`$ git status`

`$ git commit -am 'Setup app for heroku'`

`$ git push heroku master`

* Copy URL in terminal or `$ heroku open`
* Visiting the root URL (yours will be different then mine)

`https://fierce-shelf-34723.herokuapp.com/`

* But append this (the route we have)

`https://fierce-shelf-34723.herokuapp.com/todos`

```
{
todos: [ ]
}
```

* That is success!
* We see our todos JSON coming back!

## Troubleshoot
* If anything goes wrong you will usually see an error message using `$ heroku logs`

## We are going to use Postman to add some todos
* Currently we have none
* We'll use the POST /todos request we saved but swap the URL with our heroku URL
* Hit send and we get our body data
    - Something like:

```
{
    "__v": 0,
    "text": "Postman created this todo",
    "_id": "5a309d330716fd001475d0ad",
    "completedAt": null,
    "completed": false
}
```

* That is not coming from our local machine
* That is coming from our Heroku app that is talking to our mongo lab mongodb database
* Awesome!

### Try out the Postman GET todos
* Swapping out the heroku URL
* It should retreive that one todo we just created

### Try the /todos/:id route
* Grab an existing id and append to the heroku URL and it should work too

## Next
* Improve switching between local and remote environments
