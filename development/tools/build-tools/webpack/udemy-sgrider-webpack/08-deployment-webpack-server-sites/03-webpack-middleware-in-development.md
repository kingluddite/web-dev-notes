# Wepack Middleware in Development
* We need to get webpack and node to work together
* We need to configure webpack to work slightly differently depending on if we are in a development or production environment

## In Development Environment
We want to run webpack and make sure that it watches over our files for changes and rebuilds the project as required

## In Production Environment
We just want to serve up the compiled Application (what is inside our `dist`)

### Let's deal with Development first
![development webpack diagram](https://i.imgur.com/NR9QRSD.png)

#### webpack middleware
* This will help us serve up our Application

##### What are middlewares?
Middlewares are used to intercept and modify incoming requests to our server and they are really a part of Express JS (_not really anything to do with node and not having anything specifically to do with webpack_)

Our middleware works by intercepting incoming requests for our application (`index.html`) and it will respond with the compiled JavaScript Application

So if `webpack middleware` will watch for incoming requests, and if it sees one it thinks it needs to take care of, it will grab it and respond with our Application assets

### One - Install webpack middleware as a module
Stop the current node server `ctrl` + `c`

`$ yarn add -D webpack-dev-middleware`

### Two - Wire it up to Express
Add our requires

`server.js`

```
const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware'); // add this line
const webpack = require('webpack'); // add this line
const webpackConfig = require('./webpack.config.js'); // add this line
```

#### Tell Express to use this webpack middleware
`server.js`

```
const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const app = express();

app.use(webpackMiddleware(webpack(webpackConfig))); // add this line

app.listen(3050, () => console.log('Listening'));
```

That should wrap up what we need to do with our development environment

## Start up server
`$ node server.js`

## Browser to `http://localhost:3050`
This is what we specified inside `server.js`

`app.listen(3050, () => console.log('Listening'));`

## View in browser and you'll see our app
Make a small change and see it auto updates browser

In `Header.js` change `<a href="#" className="brand-logo">UpStar Music</a>` to:

`<a href="#" className="brand-logo">Music</a>`

Refresh browser and you should see browser update with that change

![browser update](https://i.imgur.com/jEI3yGT.png)

## Next
We'll adjust our server slightly to only run webpack when it is inside a development sort of environment

