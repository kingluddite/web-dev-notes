# Basic Express Server, dotenv & Git
* App folder `devcamper-api`
* [Add Prettier eslint and stylelint](https://reactsensei.com/add-eslint-stylelint-prettier/)

`$ npm i express dotenv`

### package scripts
`package.json`

```
// MORE CODE

  "scripts": {
    "start": "NODE_ENV=production node server",
    "dev": "nodemon server"
  },
// MORE CODE
```

* Main entry point to app
    - Change to `server.js`

`package.json`

```
// MORE CODE

  "main": "server.js",
  "scripts": {

// MORE CODE
```

## config folder
`config/config.env`

```
// MORE CODE

NODE_ENV=development
PORT=5000
// MORE CODE
```

`server.js`

```
const express = require('express');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
```

`$ npm run dev`

* Terminal will show:

```
Server running in development mode on port 5000
```

## Run in Production mode
`ctrl` + `c`

`$ npm start`

* Now the script will run our app in production mode

```
Server running in production mode on port 5000
```

## Postman
* Open postman
* You'll get GET 404 error
* Any route you use in Postman, same error
    - This is because we haven't defined any routes

## Git
`$ git init`

### gitignore
`$ touch .gitignore`

`.gitignore`

```
node_modules/
.DS_Store
config/config.env
```

* Don't forget trailing forward slash for `node_modules/`



