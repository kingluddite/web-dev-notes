# Install dependencies and Express
`.gitignore`

```
node_modules/
```

## git
`$ git init`

* Now we have a git repository

## package.json
`$ npm init`

* Name it
* Description
* point to `server.js`
* MIT license

## Install all dependencies
`$ npm i express express-validator bcryptjs config jsonwebtoken mongoose gravatar request dotenv`

* config - package for global variables
* gravatar - package for profile avatars
* request - will allow us to make http requests to another API (we'll use this to make API requests and hide our API keys and list latest repos)
    - This is going to be updated

## Install all dev dependencies
`$ npm -D nodemon concurrently`

* Will allow us to run both our backend express server and our frontend react dev server at the same time with one single command

## Main entry file `server.js`
`server.js`

```
const express = require('express');

const app = express();

// test API endpoint
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
```

* Run it

`$ node server`

### A better way with scripts
* We'll write some scripts inside `package.json`

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "node server",
    "dev": "nodemon server"
  },

// MORE CODE
```

`$ npm run dev`

* You can view in browser
* [localhost](http://localhost:5000/)
* You will see `API Running`

## Run in Postman
* GET
* http://localhost:5000/
* Body - you will see `API Running`
* Stop server `ctrl` + `c`

## Git stuff
* Add to staging `$ git add .`
* Commit `$ git commit -m 'Initial commit'`
