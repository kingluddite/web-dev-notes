# Initial Setup
## Begin
* Create an empty folder to hold our app
* `$ npm init -y`

### List of modules
* express
* pug
* body-parser
    - I want to submit data as JSON
* mongoose
    - I will be using MongoDB

### Install npm modules
`$ npm i express pug body-parser mongoose -S`

### Now I'm ready to build the API version of NodeTodo

### Create Entry Point for my Application
`$ touch app.js`

`app.js`

```js
const express = require('express');
// start express
const app = express();

// set up port
// if on production we'll use an environment variable
// otherwise we'll use our developer port of 3000
const port = process.env.PORT || 3000;

// I'll have a front end
// And I'll need code for the browser
// So I'll set up my public assets folder
app.use('/assets', express.static(__dirname + '/public'));

// I need a view engine for templating
// I'm using pug
// This is server side templating
// I'll use Angular for client site templating
app.set('view engine', 'pug');

// Time to listen to the port
app.listen(port);
```

