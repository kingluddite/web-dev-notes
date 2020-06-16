#Cheatsheet
* Create the main folder for your app

## Add Eslint and Prettier quickly

### Create `package.json`

`$ npm init -y`

* Add and install eslint and prettier dev dependencies

`$ npx install-peerdeps --dev eslint-config-wesbos`

* Create eslint file

`$ touch .eslintrc`

`.eslintrc`

* We use the default wes bos settings from his eslint and prettier
* Read README for wesbos github site for VS code configurtation

```
{
  "extends": [
    "wesbos"
  ]
}
```

## Add Server VS code color settings (pink)
* `.vscode/settings.json`

```
{
    "workbench.colorCustomizations": {
        "titleBar.activeBackground": "#FF2C70",
        "titleBar.inactiveBackground": "#FF2C70CC"
    }
}
```

## git
`$ git init`

* Now we have a git repository

## Add a .gitignore
`.gitignore`

```
node_modules/
.DS_Store
```

## Create server file
`server.js`

## Install all dependencies
`$ npm i express express-validator bcryptjs config jsonwebtoken mongoose gravatar request dotenv`

## Run frontend and backend simultaneously
* It will be a dev dependency
* Will allow us to run both our backend express server and our frontend react dev server at the same time with one single command

`$ npm -D nodemon concurrently`

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

## Git stuff
* Add to staging `$ git add .`
* Commit `$ git commit -m 'Initial commit'`

# Connecting to MongoDB with Mongoose
* Sign up for a free Atlas MongoDB account
## Add dotenv
* This will protect our secret info from github
* A better solution than `config/default.json`

`$ npm i dotenv`

`config/config.env`

* Put in your db name (change `<dbname>` to `devconnector`)
* Put in your password

```
MONGO_URI=mongodb+srv://philadmin:<password>@devconnector-a2gjt.mongodb.net/<dbname>?retryWrites=true&w=majority
```

* Update `.gitignore`

`.gitignore`

* We don't want to see our environment variables on github

```
node_modules/
.DS_Store
config/config.env
.env
```

`server.js`

* And point to our environment variables

```
const express = require('express');
const dotenv = require('dotenv').config({ path: './config/config.env' });

// MORE CODE
```

## Add npm colors
`$ npm i colors`

`server.js`

```
const express = require('express');
const colors = require('colors'); // eslint-disable-line no-unused-vars
const dotenv = require('dotenv').config({ path: './config/config.env' });

// MORE CODE
```

### And use colors to show yellow for server message

`server.js`

```
// MORE CODE

  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
```

### And update our Database to show colors
`config/db.js`

* We get rid of all Mongoose warnings with the object we pass as a second argument

```
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    // show developer we are connected to MongoDB
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.error(err.message);
    // we want to exit from the process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
```

## Add NODE_ENV to config/config.env
`config.env`

```
// MORE CODE

NODE_ENV=Development

// MORE CODE
```

## Run app
`$ npm run dev`

* You should run server and connect to Database

![server and mongodb connected](https://i.imgur.com/CXWwngv.png)

# route files with Express Router
* We will create all routes
    -  Break up by resource
        +  auth
        +  profile
        +  post

## routes folder
* Will hold all routes
* We'll have separate files for all our routes
* All of these routes will return JSON for our API so we'll create a folder to hold all them called `api`
    - There will be no server rendered templates
        + That will all happen on the frontend react application

## Express Router
* If you want break routes up into separate files you need to use Express Router
* You could put all routes inside `server.js` but that would make `server.js` very long so it makes sense to break them up into different resources

### How to use Express Router
```
const express = require('express');

const router = express.Router();
```

* And to create routes we don't user `app.get()` or `app.post()` we use `router.get()` and `router.post()`
