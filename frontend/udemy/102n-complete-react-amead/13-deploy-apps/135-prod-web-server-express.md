# A Production Web Server with Express
* We have dev-server and live server
* Both not suitable for production
    - We don't need live-reload in production
    - Also it takes up lots of resources
* We'll create a small node server that will be responsible for serving up our public folder
* Once that server is ready and in place we'll be able to put our app and that server on Heroku

## server
`server/server.js`

```
const path = require('path');
const express = require('express');

const app = express();
const publicPath = path.join(__dirname, '../', 'public');

app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log('Server is up');
});
```

### We are using Express
`$ yarn add express`

* We will run this server from the command line not using webpack, not using react
* We are running it using node and its node command

## Run the server
`$ node server/server.js`

* View it in the browser
* `localhost:3000`
* We get 3 errors
    - our assets don't exist
    - We can create them by running production build
* Shut down node Express server

`$ yarn run build:prod`

* Rerun node Express server

`$ node server/server.js`

* Our app should be working now

## Houston we have a problem
* What happens when we switch pages?
* Click on Create Expense and it works fine
* But then refresh page and we get an `Cannot GET /create` error
* The reason for the error is their is no `create` file or folder inside public

## Fix that
* We need to serve up `index.html` for all files that don't have a match
* This will make sure our browser router will still work
    - Remember this:

`webpack.config.js`

```
// MORE CODE
devServer: {
  contentBase: path.join(__dirname, 'public'),
  historyApiFallback: true,
},
// MORE CODE
```

* We set historyApiFallback to `true`
     - This served up index.html in the public folder every single time we got a 404
     - We need to do the same thing on our server to make sure `/create` works when you visit that route

### The fix
* `app.get` - let's us set up a function to run when someone makes a request to our server
* The `*` will match all unmatched routes

`server.js`

```js
const path = require('path');
const express = require('express');

const app = express();
const publicPath = path.join(__dirname, '../', 'public');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is up');
});
```

* Restart server
* `$ node server/server.js`
* Refresh /create
* It now works!
