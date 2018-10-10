# Tips

## client
* Name your react folder `client` when installing with create-react-app (we did this in these notes)

## backend
* I think it would be nice to also create our backend folder and name it `backend`
    - Here we make that folder and we can string together commands to do a lot with one terminal line

```
$ mkdir backend && mkdir backend/models && touch backend/models/comment.js && touch backend/server.js
```

## package.json initialize (with no questions)
`$ npm init -y`

## Initialize your git repo
* Inside your root app folder

`$ git init`

## .gitignore
```
node_modules/
```

### Side note: Git skillzzzzz
* Git will save your life

### Prove it
* Ok... remove your `backend` folder with this dangerous command

`$ rm -rf backend`

* That was an empty folder
* But imagine if you just accidentilly deleted your Great American Novel and it was just... gone.
* Yeah that would suck

### Hmmm maybe it's not really gone
* So you check with:

`$ ls`

* Nope. It's gone forever. Stick a fork in your career as a writer. It's done.

### Log Line
* You have a git log that keeps track of all your commits

If you run `$ git log —-oneline` you'll see something similar to:

```
de6a88a (HEAD -> master) Initializing repository
```

### Time travel
* We can go back in time using:

`$ git reset --hard`

* That magic command will reset all our changes to our last commit (which is called HEAD)
* It's a miracle! We got our great American Novel back!
* **note** `--hard` is what is called a `flag` and this particular flag will throw away ALL of your uncommitted changes... yes... every last one of them... That's why they call it a `hard` reset

* Do the hard reset now

`$ git reset --hard`

## What if we accidentally committed the removal of our backend?
* Let's try it out
* We can get back to where we just were (before our hard reset) with:

```
$ rm -rf backend && git add . && git commit -m ‘removing backend for git example’
```

### Check our log
`$ git log —-oneline` shows us where our HEAD is (our last commit), as well as our first commit:

```
da38888 (HEAD -> master) removing backend for git example
ae6b88c Initializing repository
```

## No prob. Let's just run our hard reset again
`$ git reset`

* That doesn't help. our backend folder is still gone

## Wait! We git can still save you!
`$ git reset — hard HEAD~1` 

* `HEAD~1` means... 1 further back from HEAD 
    * Or use the commit hash `$ git reset —-hard ae6b88c` to get our great American novel back

## More Learning Git resources
[learn git with good tutorials](http://try.github.io/)

### What is the MERN stack
* MongoDB
* Express
* React
* Node.js

### Common MERN stack install
`$ yarn add express body-parser nodemon morgan mongoose concurrently babel-cli babel-preset-es2015 babel-preset-stage-0`

* body-parser
    - A package which helps us get the body off of network requests
* nodemon
    - A package that watches our server for changes, and restarts it
    - Just saves you time
    - Provides you a better dev experience
* morgan
    - A logging package to make it easier to debug our network requests to this API
* mongoose
    - A package that lets us interact with MongoDB in an easier way
    - Saves us time
    - Makes our dev experience better

### Quick clean up all create react app stuff
`$ cd client && rm src/logo.svg src/App.css src/App.test.js src/App.js`

#### Create multiple files
`$ cd src && touch CommentList.js CommentBox.js CommentForm.js Comment.js data.js CommentBox.css`

## Stuff we need (these will be installed in the `client` folder and added to package.json in that folder)
* We need:
    - `react-markdown` package
        + To convert markdown to text
    - `whatwg-fetch`
        + To fetch data from the browser
        + This is a polyfill for the `window.fetch` object
    - `prop-types`
        + To ensure we are getting the expected type in to our component
    - `eslint`
    - `babel-eslint`
    - airbnb eslint rules

## If using npm 5+, use this shortcut
`$ npx install-peerdeps --dev eslint-config-airbnb`

### If using npm < 5, Linux/OSX users can run:

```
(
  export PKG=eslint-config-airbnb;
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
)
```

`$ npm i react-markdown whatwg-fetch prop-types`

* Here's what the dev dependencies for our `package.json` might look like now:

```
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "moment": "^2.22.1",
    "prop-types": "^15.6.1",
    "react": "^16.3.2",
    "react-dom": "^16.3.2",
    "react-markdown": "^3.3.0",
    "react-scripts": "1.1.4",
    "whatwg-fetch": "^2.0.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "devDependencies": {
    "babel-eslint": "^8.2.3",
    "eslint": "^4.19.1",
    "eslint-config-airbnb": "^16.1.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-jsx-a11y": "^6.0.2",
    "eslint-plugin-react": "^7.4.0"
  },
  "proxy": "http://localhost:3001"
}
```

## /client/.eslintrc.json

`.eslintrc.json`

```
{
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "ecmaFeatures": {
    "arrowFunctions": true
  },
  "env": {
    "browser": true,
    "node": true
  },
  "parser": "babel-eslint",
  "rules": {
    "no-use-before-define": [0],
    "react/jsx-filename-extension": [0],
    "jsx-a11y/anchor-is-valid": [0],
    "no-confusing-arrow": [0],
    "no-underscore-dangle": [0],
    "import/no-extraneous-dependencies": [0]
  }
}
```

## root package.json

```
{
  "name": "mern no-comment",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start:server": "cd backend && nodemon server.js --exec babel-node --presets es2015,stage-0",
    "start:client": "cd client && npm start",
    "start:dev": "concurrently \"npm run start:server\" \"npm run start:client\""
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "body-parser": "^1.18.2",
    "concurrently": "^3.5.1",
    "express": "^4.16.3",
    "mongoose": "^5.0.16",
    "morgan": "^1.9.0",
    "nodemon": "^1.17.3"
  }
}
```

### Nice! We got scripts!
* We just created 3 commands that enable us to run the server, the client or both:

### Run only the server (aka our backend)
`$ npm run start:server`

### Run only the client (will start our react app)
`$ npm run start:client`

### Run both (thanks concurrently!)
`$npm run start:dev`

## Babelon!
* The `babel-cli`, `babel-preset-stage-0` and `babel-preset-es2105` packages enable us to use new javascript syntax in our server files
    - This let's us use `import` 
    - If you don't add these settings you can't use import (and other modern JS on the server) and you would need to revert to node code like 
    - `const express = require(‘express’)` 
    - `stage-0` features - gives us access to cutting edge features that we can play around with if we want

`server.js`

```
// import our dependencies…
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

// create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, otherwise default to  3001
const API_PORT = process.env.API_PORT || 3001;

// configure the API to use bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

// and look for JSON data in the request body
app.use(bodyParser.json());
app.use(logger('dev'));

// now we can set the route path and initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
```

# Run the server
`$ npm run start:server`

* The terminal shows up log info (kudos to our `morgan` logger package)

### Where's our API?
* Browse to this route

`http://localhost:3001/api`

* You will see:

```
{"message":"Hello, World!"}
```

* THe JSON is not friendly add and enable the chrome extension [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en)

## Postman
* I suggest using Postman to test your server
* It is easier to send POST requests using Postman than using the command line `curl` function

## environment variables
* [tips](https://medium.com/ibm-watson-data-lab/environment-variables-or-keeping-your-secrets-secret-in-a-node-js-app-99019dfff716)

### if you want to use environment variables
* Add them in your terminal: you can type 

`$ export DB_URI=mongodb://<dbuser>:<dbpassword>@ds161529.mlab.com:61529/mern-no-comment-box` 

* Replacing `<dbuser>` and `<dbpassword>` with the `username` and `password` you created through **mLab**

`backend/secrets.js`

```
const secrets = {
  dbUri: process.env.DB_URI
};

export const getSecret = key => secrets[key];
```

`.gitignore` (if you are hard coding it to your local dev computer)

```
backend/secrets.js
```

### Questions about package.json
* Where do we put them
* You have a `backend` folder with all your backend stuff but outside of that is where all your backend packages will be stored in the `package.json`
* All the **React** packages will be stored in a `package.json` file residing inside the `client` folder

```
backend
    - backend stuff
client
    package.json (all react packages)
package.json
```
