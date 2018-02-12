# Deploy with Heroku
* https://devcenter.heroku.com/articles/heroku-cli
* `brew install heroku/brew/heroku`
    - After installing
        + You may need to restart your machine
        + Or restart your terminal

## Which version of heroku cli is installed?
`$ heroku --version`

`$ heroku login`

* Enter your email and password

## Create an app
* If you want a random name created `$ heroku create`
* If you want to provide a specific name (easier to remember) `$ heroku create react-expensify-app`
    - Hit enter
    - Heroku does two things
        + 1. Heroku sets up new app
        + 2. Adds a new git remote to your local repository
            * `$ git remote`
                - Will show `heroku` and `origin`
                - This was automatically added
                    + we have origin which we added
                - We never manually added heroku and this was added when we ran heroku create
    - If your run heroku with the `-v` flag to get the verbose output
    - `$ git remote -v`

## Why did heroku add a remote repo?
* This is how we'll deploy
    - We'll push our code up to the remote repo
    - heroku will get that code
    - and heroku will deploy our app with the latest
    - all we have to do is add and commit all our site changes to heroku

## We need to make a couple tweaks to get our app working on Heroku
* Currently, Heroku doesn't know how to start up our app
* We have to teach it how to do this
* We need to teach Heroku how to run the node server
* Heroku will try to run the start script in package.json, we have to explicity tell it to run server/server.js

`package.js`

```
  "start": "node server/server.js"
},
"lint-staged": {
```

## fix the static port
* We are currently listening on a static port 3000
* This will break when we deploy to heroku
* We have to control over telling heroku which port to use
* Heroku will provide a dynamic value to our app
    - Heroku will provide us with an environment variable
    - This variable will change every single time you deploy your app
    - Heroku automatically gives us access to PORT

`server/server.js`

```js
const path = require('path');
const express = require('express');

const app = express();
const publicPath = path.join(__dirname, '../', 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up');
});
```

* Now our node server is completely compatitible with Heroku

## Teach Heroku how to run webpack
* we first created node_modules we added it to gitignore so it's not in our git repo
    - that is good because this is a generated folder
    - We can install all the dependencies by running `$ yarn install` which will use yarn.lock to get all the current versions and run package.json to get al dependencies set up
    - We also have a couple css and js files when we run webpack
    - we don't want to commit them to the project
        + say I ran webpack in production mode
        + then I ran webpack in development locally to test things out
            * We'd have different changes to our source code
            * that would be bad and we don't want to commit them to the git repo
    - We need to make sure that heroku does run webpack otherwise it will try to start the server up and none of those assets will exist
        + good news: fairly easy process
        + there are a couple of processes heroku will run automatically as your app starts up

## heroku-postbuild
* Will run after heroku installs all your dependencies
    - This is great place to run commands to build
        + if you are using grunt or gulp you would put here
        + or you can put webpack here

`package.json`

```
// // MORE CODE
  "start": "node server/server.js",
  "heroku-postbuild": "yarn run build:prod"
},
"lint-staged": {
// // MORE CODE
```

* Now the actual webpack build will run on the heroku servers
* Now we need to add those 4 generated files to our `.gitignore`

`.gitignore`

```
node_modules
*.swp
*js.swp
public/bundle.js
public/bundle.js.map
public/styles.css
public/styles.css.map
```

## heroku-prebuild
* Runs before dependency
    - We won't use but good to know it exists
    - Not very useful

### Time to deploy
* Make sure all files are saved

```
$ gs
$ ga .
$ gc -m 'setup production build and server'
```

### Make sure latest code is on github

`$ gpush`

### Push to heroku
* We are explicitly taking our branch master and pushing up to heroku remote
* That will trigger heroku to deploy our app
* People see the large 57.2M size an freak out
    - That is the entire code for the server instance
    - much of that code is not served up to the user
    - it is just for the backend process of starting up the heroku app

## Open it
`$ heroku open`

* The app should appear in the heroku URL

### Troubleshoot
* You can use both yarn.lock and package-lock.json
    - choose one and delete the other
    - Make all packages despendencies
* `$ heroku logs`

