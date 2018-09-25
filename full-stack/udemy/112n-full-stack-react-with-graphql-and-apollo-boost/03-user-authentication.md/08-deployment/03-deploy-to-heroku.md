# Deploy to Heroku
* Create an account here: https://www.heroku.com/
* Login to that account
* Create a new app
* Give it a name

## Install the heroku CLI
* [instructions](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

`$ brew install heroku/brew/heroku`

* You may need to upgrade (if you have an older version of heroku)

`$ brew upgrade heroku`

* If you are getting `Error: ENOENT: no such file or directory, open '~/.netrc'` error, delete the folder `$ rm -rf ~/.netrc` and create it again with `$ mkdir ~/.netrc`

## Login
`$ heroku login`

* Enter your heroku email and password
* Make sure you are in your app root folder

## git
* Time to start version control on your app and get `git` involved
* `$ brew install git`

`$ git init`

## Create your first Heroku app
* **note** This is for an existing app
* You could also create an app from scratch but the directions vary
* [Interested in creating app from scratch with herloku, Read more here](https://devcenter.heroku.com/articles/git)

`$ heroku create`

* Your command will vary slightly

## Add and commit files to heroku
`$ git add -A`

`$ git commit -m 'initialize repo`

## Update port number for heroku
`variables.env`

```
// MORE CODE

NODE_ENV=production
PORT=80

// MORE CODE
```

* This will be our `production` environment
    - Our **development** Port is `4444`
    - Our **production** Port is `80`

`server.js`

```
// MORE CODE

const PORT = process.env.PORT || 4444;

// MORE CODE
```

## Create conditional to do stuff differently if we are in production environment
* That checks if we are running in a production environment
    - We'll do 2 things:
        1. Use middleware to access to static files `client/build`
        2. Import node's `path` (and require it) and point to where our `index.html` file resides (inside the `build` folder)
            - path is necessary for sending down the file

`server.js`

```
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // add this

// MORE CODE

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// MORE CODE
```

## Explanation of above
* In our `client` folder (where our react app resides)
    - We have a `package.json` that has build scripts baked inside it:

```
// MORE CODE

"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "eject": "react-scripts eject"
  },

// MORE CODE
```

* Specifically `"build": "react-scripts build",`
* When this build script is run
    - It will create a `build` folder inside our `client` folder
    - That `build` folder will contain our final `index.html` and that is what we want to return no matter what route we go to
    - So whatever route we go to we are only going to return 1 file
        + This is the basic concept on how SPA (Single Page Applications) work
    - We are sending down just the `index.html` file within the build folder and we can access that using the `express.static` middleware which we pass the string `client` and `build` in order to access that
    - And to make sure we can get to anywhere from any path we use node's `path` and `__dirname` to specify exactly where to get it from whether on a Mac OS, Windows OS or Linux OS

## Add a couple things to our root `package.json` file
### Let me introduce you to my node engine
* We need to tell `heroku` about our **node engine**
* To do this you'll need to determine your node version

`$ node --version`

* That will output a version like... `v10.9.0`

`/package.json`

```
// MORE CODE

"engines": {
    "node": "v10.9.0"
},
"scripts": {

// MORE CODE
```

## We need to run some scripts
* A `start` script
    - `heroku` will run this for us `$ node server.js` (they are not using nodemon)
* Add a specific post build heroku script `$ npm install --prefix client` (that will install all the **client dependencies**) and we will also run the build script `$ npm run build` (that is in the `client` folder) and that will run after that `start` script

`/package.json`

```
// MORE CODE

"scripts": {
  "start": "node server.js",
  "precommit": "pretty-quick --staged",
  "server": "nodemon server.js",
  "client": "cd client && npm start",
  "dev": "concurrently --names \"server,client\" \"npm run server --silent\" \"npm run client --silent\"",
  "heroku-postbuild": "npm install --prefix client && npm run build --prefix client"
},

// MORE CODE
```

## For production we'll need to remove our graphiql application
* I'll check if not production than use it

`server.js`

* Not necessary step if you are using Apollo 2

```
// MORE CODE

if (process.env.NODE_ENV !== 'production') {
  // Create GraphiQL application
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

// MORE CODE
```

## Change URI to be what our Heroku URI is
* When you ran heroku create it shows you what your Heroku URI is
* It will be something like: `https://sit-citadel-86778.herokuapp.com/`
* Use that info to update your Apollo Client URI

`client/src/index.js`

* Change this:

```
// MORE CODE

// Apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include',
  },

// MORE CODE
```

* To this (swap my heroku URI with you heroku URI)

```
// MORE CODE

// Apollo client
const client = new ApolloClient({
  uri: 'https://sit-citadel-86778.herokuapp.com/graphql',
  fetchOptions: {
    credentials: 'include',
  },

// MORE CODE
```

* I do something like this so I can easily switch from my development to production environment and vice-versa

`client/src/index.js`

```
// MORE CODE

// Apollo client
const client = new ApolloClient({
  // uri: 'http://localhost:4444/graphql',
  uri: 'https://lit-citadel-86778.herokuapp.com/graphql',
  fetchOptions: {
    credentials: 'include',
  },

// MORE CODE
```

## Improve your heroku name
* In Heroku Dashboard > Settings > Edit the name
* Then you need to [update up your heroku git remote repo](https://devcenter.heroku.com/articles/renaming-apps#updating-git-remotes)
* Rename it `familytree`

`$ git remote rm heroku`

`$ heroku git:remote -a newname`

* Replace `newname` with the new name of the app, as specified in the rename command
* So for my example above it would be:

`$ heroku git:remote -a familytree`

* Now your code should look like:

`client/src/index.js`

```
// MORE CODE

// Apollo client
const client = new ApolloClient({
  // uri: 'http://localhost:4444/graphql',
  uri: 'https://familytree.herokuapp.com/graphql',
  fetchOptions: {
    credentials: 'include',
  },

// MORE CODE
```

* You then can see your new domain with:

`$ heroku domains`

* Which should output `familytree.herokuapp.com` (You may need to create a unique domain)

## Environment Info
* Find all environment info

`$ env`

## Add Environment variables to Heroku (Show/Hide Config vars to see/hide)
* NODE_ENV
* PORT
* MONGO_URI
* SECRET

* We add these so heroku knows about them (otherwise they'll be private and our app will break on heroku because we are not committing them with git (`*.env` is inside our `.gitignore`)

## Git add and commit
* Check with `$ git status`
* After you add and commit it's time to deploy

## Deploy
`$ git push heroku master`

## Troubleshoot
* If you were using both npm and yarn you need to remove one of the `.lock` files
* I'll remove `yarn.lock` from git

`$ git rm yarn.lock`

* Add and commit again and try to deploy to `heroku` again
* If all goes well the build process starts and could take a bit of time (think approximately 5 minutes)

1. Press enter
2. First it creates the **runtime environment**
3. It recognized our `engines` that we specified
4. It runs `heroku-postbuild`
5. Will go into `client` folder and install necessary dependencies
6. Then it will run the `react-scripts` build script
7. It will create an optimized `build` folder (including our `index.html` file)
8. Then it will go through it's **compression** process
9. Then it will launch your app
10. It will give us the URL it is deployed to
11. `$ heroku open` will open browser and your heroku site inside it

## Test site
* You should see site working as it did on the dev site
* If you have errors use the network tab
* If it is red, there is an error

## Troubleshooting
### Heroku logs
* Will let you know what errors you received on the server

`$ heroku logs`

* If you run into problems fix them
* Add, commit and push to heroku
* Open your site in the browser
* Use heroku logs if your app isn't working
* Eventually you'll fix all the bugs and the site should function as expected
