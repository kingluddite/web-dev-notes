# Node.js Production App Deployment: Part 2
## Let's discuss the scripts that Heroku will run
* Heroku will run the `start` script inside `package.json`
    - That is what will start our app
    - We want to use Node.js to run our app
    - We want to make sure index.js executes so everything can get started
    - We can use a series of other scripts that heroku supports to do things like:
        + Run babel
        + Lots of scripts that heroku supports that enable us to tap into the life cycle of our application

## Heroku Node.js Support
* [link to docs](https://devcenter.heroku.com/articles/nodejs-support)
* We are looking for "Customizing the build process"
    - [docs](https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process)
    - We are interested in `heroku-postbuild`
        + This will fire just before `npm start` runs which would be a great place to run babel
        + We need to spell this script in our package.json as `heroku-postbuild` (it needs to be spelled exactly like that - if you misspell it, it will think you didn't provide it and it will never fire)

## Summary of what we are doing
* `heroku-postbuild` will run our code through babel on Heroku
    - We will not use `babel-node` (great for development purposes but it is not suited for production)
    - We will just use `babel`
* `start` will start up the node application on Heroku

### babel syntax
`babel WHERE_OUR_CODE_IS LIST_WHERE_WE_PUT_OUTPUT`

* WHERE_OUR_CODE_IS (Our code is in the `src` directory)
* LIST_WHERE_WE_PUT_OUTPUT (Babel will take all our files and transform them - when it does that where do those transformed files go?)
    - babel-node just runs our app on the fly
    - babel doesn't run our app, instead it just transforms the files
    - `--out-dir dist`
        + babel will read our src directory
        + It will run everything through all the presets and plugins
        + And it will spit all those files out into the `dist` directory

`"heroku-postbuild": "babel src --out-dir dist",`

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "",
    "heroku-postbuild": "babel src --out-dir dist",
    "dev": "env-cmd -f ./config/dev.env nodemon src/index.js --ext js,graphql --exec babel-node",
    "test": "echo \"Error: no test specified\" && exit 1",
    "get-schema": "graphql get-schema -p prisma"
  },

// MORE CODE
```

## Test out heroku-postbuild
`$ npm run heroku-postbuild`

```
src/db.js -> dist/db.js
src/index.js -> dist/index.js
src/prisma.js -> dist/prisma.js
src/resolvers/Comment.js -> dist/resolvers/Comment.js
src/resolvers/Mutation.js -> dist/resolvers/Mutation.js
src/resolvers/Post.js -> dist/resolvers/Post.js
src/resolvers/Query.js -> dist/resolvers/Query.js
src/resolvers/Subscription.js -> dist/resolvers/Subscription.js
src/resolvers/User.js -> dist/resolvers/User.js
src/resolvers/index.js -> dist/resolvers/index.js
src/utils/generateToken.js -> dist/utils/generateToken.js
src/utils/getUserId.js -> dist/utils/getUserId.js
src/utils/validateHashPassword.js -> dist/utils/validateHashPassword.js
```

* If you open any of those files you will see that indeed all our code has been transformed by babel

## dist
* This will be the file that we are going to run from heroku
* But some files are missing
    - Files that are ".js" related don't get processed by babel and are getting skipped here

### Solution for getting non-js files copied to dist folder
* Just add the `--copy-files` flag

`"heroku-postbuild": "babel src --out-dir dist --copy-files",`

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "",
    "heroku-postbuild": "babel src --out-dir dist --copy-files",

// MORE CODE
```

* Now this will include all files even if they are not getting processed
    - This will include our schema
    - Our graphql file and our generated graphql file

## Run again
`$ npm run heroku-postbuild`

* Now you will see same files as before but all our schema.graphql and other graphql files (and our generated directory)
* It contains everything that Node needs to run our app

## Run our start script
`"start": "node dist/index.js`

* We will run this (and it will fail)
* We are adding our production environment variables

`package.json`

* Don't forget that `-f` flag!

```
// MORE CODE

  "scripts": {
    "start": "env-cmd -f ./config/prod.env node dist/index.js",

// MORE CODE
```

`$ npm start`

## Houston we have a problem!
* We get this error "ReferenceError: regeneratorRuntime is not defined"
* This is something that is provided when we use babel-node but it is not provided when we just use `babel`
    - In order to get this to work we have to make another small change to our app
    - Babel offers a polyfill `babel-polyfill`
    - [babel docs](https://babeljs.io/docs/en/)
    - [babel-polyfill](https://babeljs.io/docs/en/babel-polyfill)

## Update 7/4/2019
* For those using Babel 7.4.0 and up there is not need to install the `@babel/polyfill`
* All that you need is to install `core-js`

`$ npm i core-js`

* And at the top of your index.js

`index.js`

```
import "core-js/stable" // add this line
import "regenerator-runtime/runtime" // add this line
import { GraphQLServer, PubSub } from 'graphql-yoga';
import { fragmentReplacements, resolvers } from './resolvers/index';

// MORE CODE
```

* Rebuild with heroku-postbuild

`$ npm run heroku-postbuild`

* now you can run on production

`$ npm start`

## Nice! Our server is up
* Now our goal is to get everything in a git repo
* Then we'll send that repo with all of our code off to Heroku
    - Heroku will use that to run our app
    - Heroku will first run:
        + `$ heroku-postbuild` (it is a custom Heroku script)
    - Then Heroku will run `$ npm start` to start up our app

## git stuff
`$ git init`

* **important** Must run `$ git init` from root of our project!

### .gitignore
`.gitignore`

```
node_modules/
config/
```

* We also want to ignore config as it has secret info we need to keep private

## dist
* We would only have this file locally if we were testing out the production scripts locally
* We can also add this to our .gitignore

`.gitignore`

```
node_modules/
config/
dist/
```

`$ git add .`

`$ git commit -m 'Init commit`

## Houston we have a problem
* In our start script inside package.json we told heroku to use our config folder to get the prod environment variable

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "env-cmd -f ./config/prod.env node dist/index.js",

// MORE CODE
```

* But we told git to ignore the config folder? What can we do here?

### Solution
* We'll remove this config from our start script and we'll configure our environment variable via our Heroku CLI
* Make this update

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "node dist/index.js",

// MORE CODE
```

* We made a change so we need to add/commit with git

## Create Heroku app
* We could do this via the website
* But doing it via the Heroku CLI is faster

`$ heroku create`

### 3 useful pieces of info get spit out
1. Our application name (we can use this to find it inside the web app version of Heroku)
2. We have the web URL where our code will be visible (it will just be an empty page if you click it)
3. The Heroku repo URL

**important** Just before we push our code to Heroku we need to make sure our environment variables are set

#### Heroku Environment Variables
* PORT - We don't have to do anything with this as Heroku binds this automatically to a port that is open on the server our app is running on
* PRISMA_ENDPOINT - We need to configure this so that when this code runs it actually uses the correct string
    - Copy the entire line from `prod.env` to the clipboard

`$ heroku config:set key/value`

* We'll use that to set our environment varaibles for Heroku

```
heroku config:set PRISMA_ENDPOINT=https://king-blog-3736e1f779.herokuapp.com/king-blogging-app/prod
```

* Hit enter and that will set the environment variable on Heroku

## View all heroku environment variables
`$ heroku config`

## See our Git remotes
`$ git remote -v`

* You will see Heroku added a remote "heroku"

## Push our code to Heroku
`$ git push heroku master`

* This will push all of the committed code up to Heroku
* It will install our modules
* It will run the code through babel
* It will start up our app
* Can take up to 5 minutes to deploy
* Might take 10 seconds to see the app when you visit the app URL

### Congrats
* You should GraphQL Playground instance (this is a production version of our node app connected to the production version of our Prisma app)
    - We should now be able to access the user we created in Production

```
query {
  users {
    id
    name
    email
  }
}
```

* We should see the id and name but not the email since we do not have an auth token (we are not authenticated)

### Recap
* We now have the production version of:
    - Our Prisma service
    - Our Database
    - And our Heroku app up and running

We achieved the 3 things we wanted to accomplish

1. Production Database
2. Host our Prisma docker container
3. Host our Node.js application

## Next
* Dealing with other security
    - We still have sensitive info in our app
    - Inside of our prisma file we have our secret
        + We need to pull that out and plug it in as an environment variable and handle more securely
