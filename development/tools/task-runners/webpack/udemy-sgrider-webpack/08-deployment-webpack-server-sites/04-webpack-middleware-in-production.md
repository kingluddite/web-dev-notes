# Webpack Middleware in Produciton
![webpack producition diagram](https://i.imgur.com/bScbcRd.png)

## Goal in Production
* Build our assets exactly one time and stick them into our `dist` directory
* Any time user visits our browser and they want our `index.html` we'll send them back the resources that are located inside of `dist` and we will do nothing with webpack at all

`server.js`

```
const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const app = express();

// add these three lines
if (process.env.NODE_ENV !== 'production') {
  app.use(webpackMiddleware(webpack(webpackConfig)));
}

app.listen(3050, () => console.log('Listening'));
```

* We just check the NODE_ENV to see if it is NOT set to `production` and if that is true, we use webpack, otherwise, we don't

### GOTCHA
We previously set the NODE_ENV directly inside `package.json`...

* Whenever we deploy to Digital Ocean, Heroku, or AWS, the value of NODE_ENV is not necessarily set for us
* The way we set NODE_ENV will differ depending on our Deploy target (aka where we are deploying our Application to)
* bottom line ------ do not take NODE_ENV value for granted, do the necessary research and make sure it is set appropriately 

## Move require statements into the if statement
If they only run when webpack runs, they should be inside the if statement

```
const express = require('express');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
}

app.listen(3050, () => console.log('Listening'));
```

### Handle the else (When we are running in Production)
`app.use(express.static('dist'));`

* Tells express to make everything inside of `dist` freely available to use for anyone who asks for it

```
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
}
```

* We are using `path` so we'll need to require it at the top
* If anyone makes a `get` request to any route on our server `*`, go ahead and send them back the `index.html`
    - This is used specifically for compatibility with **React Router** specifically with the **browserHistory** module
    - This line is what makes sure the browser history library works correctly

`server.js`

```
const express = require('express');
const path = require('path');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware'); // eslint-disable-line global-require
  const webpack = require('webpack'); // eslint-disable-line global-require
  const webpackConfig = require('./webpack.config.js'); // eslint-disable-line global-require

  app.use(webpackMiddleware(webpack(webpackConfig)));
  // begin stuff we added
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}
// end stuff we added

app.listen(3050, () => console.log('Listening'));
```

## Specify correct NODE_ENV
`NODE_ENV=production node server.js`

* You will just see `Listening` (and nothing about webpack)
* View in browser (refresh)
* You will see the site there but in the terminal no info about webpack
* This is great! It is working and our Application is being served sole from our static assets

## Gotcha
Because webpack is not being used we need to make sure if we make any changes to our code that we compile it for production before we deploy production

## How can we expand `server.js`
How could we add in logic for authentication?

You would add additional routes ABOVE all the existing webpack information

`server.js`

```
// more code
// Server routes...
app.get('/hello', (req, res) => res.send({ hi: 'there' }));

if (process.env.NODE_ENV !== 'production') {
// more code
```

* If we define our additional routes after our `app.get('*', (req, res) => {` line, express will never get to the additional routes because the wildcard will never let us get past it
* Express is all about the order you define `route handlers`

## Gotcha
The port. We defined `3050` but many providers like AWS and Heroku will not let you define your port

Instead they want you to bind to a port specified by the server

To address this Gotcha we change our code slightly to:

`server.js`

```
// more code
app.listen(process.env.PORT || 3050, () => console.log('Listening'));
```

* This lets us use Heroku or AWS port when deploying to them and 3050 when in our development environment






