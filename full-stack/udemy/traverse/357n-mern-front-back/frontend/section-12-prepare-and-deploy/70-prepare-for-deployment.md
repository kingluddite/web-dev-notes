# Prepare for Deployment
* `config/default.json` is for development
    - We'll keep same values for production but we need another file

## Create a new file for production
`config/production.json`

```
 {
   "mongoURI": "mongodb+srv://philadmin:<password>@devconnector-a2gjt.mongodb.net/<dbname>?retryWrites=true&w=majority",
   "jwtSecret": "123",
   "githubClientId": "123",
   "githubSecret": "123"
 }
```

* Typically you would have a different database for production
    - The secret, github client and secret would be different values
* Since this is a test app we don't need to make those changes

## Make sure to ignore config files
* We do this so we don't push them to GitHub or wherever and keep them local on our machine

```
node_modules/
.DS_Store
config/config.env
config/production.env
config/default.json
config/production.json
.env
```

## Using React as our client side
* When we push to production we NO LONGER USE THE REACT DEV SERVER
    - The React Dev Server is strictly only for development

### We need to build out our static assets
* How can we do that?

`$ cd client && npm run build`

* That will create an optimized production build of static assets
* After running that you will see in the client folder a `build` folder
    - Inside the `build` folder and inside a `index.html` (and this file is what we need to load when we push to production - this file is the gateway to everything)

## There are 2 options we have when it comes to Heroku:
1. We could manually run the build (like we just did) and then push that
2. Or (recommended) we could just build it on the server using a "post build script"
    * This is an better idea because it absolves us from manually running our build script and the Heroku server can do the work for us

### Delete the build folder we just created
* We don't need it

## How can we create a build script?
* **note** This post build script must be spelled `heroku-postbuild` and placed inside the `package.json` **scripts** section
    - This command will run "post build" (means - after we push)
    - **IMPORTANT** MAKE SURE YOU SPELL THIS COMMAND EXACTLY CORRECT
* We need to set the production environment to `false`

`NPM_CONFIG_PRODUCTION=false`

* This may seem strange but we can't run the React `build` script on Heroku if `NPM_CONFIG_PRODUCTION` is `true` so we temporarily set it to `false`
    - It will be set to `true` again afterwards
* In addition, we also have to install the dependencies on the client side (because we are not pushing the `node_modules` folder (remember that it is ignored inside `.gitignore`))
    - We need to do the dependencies install inside the `client` folder so we need to use the `--prefix client`
* We use `&&` to run multiple commands in one line
* Finally, we need to run our build with `npm run build` (but this command needs to also run inside the `client` folder so once again we use `--prefix client`)

`package.json` (inside root of app (not inside the client folder of app)) 

```
// MORE CODE

  "scripts": {
    "start": "node server",
    "server": "nodemon server",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
  },

// MORE CODE
```

* This is what we just added:

`package.json`

```
// MORE CODE

"heoku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
// MORE CODE
```

## Our server.js can't server our build file... not yet
* Let's fix that 
* One more important change
* Currently our `server.js` is not setup to run the build file we just set up (that will be created on Heroku when we deploy)
* We need to get rid of our test route

`server.js`

* We just set this up when testing our default home route
* If you don't remove it, then you will just see 'API Running' on your Heroku production URL

```
// MORE CODE

// // test API endpoint // DELETE THIS LINE
// app.get('/', (req, res) => res.send('API Running')); // DELETE THIS LINE

// MORE CODE
```

* Bring in `path`
    - This is a core Node.js package we don't have to install because it is part of the core of Node but we do need to require it

`server.js`

```
const express = require('express');
const path = require('path');

// MORE CODE
```

## Serve static assets in production
* **IMPORTANT** Make sure to place this after all your defined routes

`server.js`

* We check for if we are in the production environment `process.env.NODE_ENV === 'production'`
* Set the static folder
    - Express allows us to set which folder we want to be our static folder
    - We want `client/build` to be the path to where are static files will be
* Server our `index.html` file
    - Set '*' (anything) besides the API routes above to point to `index.html`
        + We use `sendFile` because we want to send that HTML file
        + We go from the currently directory (using `path`) **__dirname**
            * Then we first go into the `client` folder
                - Then into the `build` folder
                    + Then we want to load the `index.html` file

`server.js`

```
// MORE CODE

  // Serve all paths to point to the client folder's build folder index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

// MORE CODE
```


```
// MORE CODE

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

// Server static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // Serve all paths to point to the client folder's build folder index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// MORE CODE
```

## PORT is import
* We set this already but make sure you have `process.env.PORT` because you can pick a port to use on Heroku so we'll use our choice of 5000 for development but if we are in production we'll bind to the one Heroku will allocate for us

`server.js`

```
// MORE CODE

const PORT = process.env.PORT || 5000;

// MORE CODE
```

## Next - Deploy!
