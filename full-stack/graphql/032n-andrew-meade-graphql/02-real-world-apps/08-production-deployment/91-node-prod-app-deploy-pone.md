# Node.js Production App Deployment (Part 1)
* We used Heroku and Prisma cloud to:

1. Create our Production Database
2. Create our Production Prisma instance (Host our Prisma docker container)
3. We now need to host our Node.js app in Production
    * We will use Heroku to do this
    * Heroku makes it easy to deploy apps

## Two tools we will use to move our Node.js app to Production
1. Git (Version Control System)
    * This will be used to track all our code changes
    * We'll take those code changes and push them up to the Heroku servers so Heroku can deploy our application getting our latest code up and running
    * Do I have git?
        - `$ git --version`
2. Heroku CLI 
    * [Heroku CLI page](https://devcenter.heroku.com/articles/heroku-cli)
    * Install heroku cli with homebrew
        - `$ brew tap heroku/brew && brew install heroku`
    * After installing it login to Heroku with `$ heroku login`
    * You can log in using your credentials or if you shared your ssh info you can log in faster (similar to Prisma Cloud)

## Small changes to work with Heroku in our project
`index.js`

* The following code is what starts the web server

`index.js`

```
// MORE CODE
server.start(() => {
  console.log('This graphql-yoga server is running');
});
```

* We want to call `server.start()` but by default the server will start on port 4000
* This is a problem because Heroku doesn't use port 4000
    - Heroku dynamically assigns a port so we never know what it will be
    - But heroku injects an environment variable and we can use that variable to make sure we are binding to the correct port
    - server.start() does take an options object
    - [docs for graphql-yoga server](https://github.com/prisma/graphql-yoga)
        + You will see `server.start({port: PUT IT HERE}`

`src/index.js`

```
// MORE CODE
server.start({ port: process.env.PORT || 4000 }, () => {
  console.log('This graphql-yoga server is running');
});
```

* `port: process.env.PORT`
    - Import to spell it PORT (heroku requires this spelled in all UPPERCASE)
    - This environment variable is going to exist when our code runs on Heroku but it will not exist when our code runs locally and that is why we added `|| 4000`
* We need to make this change in order for our app to run on Heroku

## One more small change
`src/prisma.js`

```
import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'donottellanyonethatthisismysecret',
  fragmentReplacements,
});

// MORE CODE
```

* In this file we actually connect to the Prisma instance
* The problem is the endpoint is hardcoded which means if this app was running locally it would connect to `localhost:4466` but if it was running on Heroku it would also try to connect to `localhost:4466` (which would fail)
* We want to use the same ENDPOINTS that we set up in our dev.env and prod.env
    - We can accomplish this by using these same files and values
    - So instead of hardcoding a string in `prisma.js` we will once again use an environment variable

## Let's look at package.json
* **note** Heroku uses package.json to:

1. Know that we are running a node app
2. To figure out how to install our dependencies
3. And how to start our server

* After Heroku installs all our dependencies
* Then it will run the `start` script
    - But this is a problem because this is not the script we want to run in production

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "nodemon src/index.js --ext js,graphql --exec babel-node",
    "test": "echo \"Error: no test specified\" && exit 1",
    "get-schema": "graphql get-schema -p prisma"
  },

// MORE CODE
```

* The problem is we are using nodemon locally and it will try to refresh

`"start": "nodemon src/index.js --ext js,graphql --exec babel-node",`

* Nodemon is not suited for production and is just used for development purposes only

## Add a dev script
* We will use this to run when we want to start our local development server

```
// MORE CODE

  "scripts": {
    "start": "",
    "dev": "nodemon src/index.js --ext js,graphql --exec babel-node",
    "test": "echo \"Error: no test specified\" && exit 1",
    "get-schema": "graphql get-schema -p prisma"
  },

// MORE CODE
```

## Add a start script for production
* This is a start script that makes sense for us and for Heroku

## Before we do that let's make sure our dev environment still works
`src/prisma.js`

```
// MORE CODE

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'donottellanyonethatthisismysecret',
  fragmentReplacements,
});

// MORE CODE
```

* And update it to this:

```
// MORE CODE

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: 'donottellanyonethatthisismysecret',
  fragmentReplacements,
});

// MORE CODE
```

## Run dev server
`$ npm run dev`

* That will give you an error because even though our prisma file is in it's "final state" we still have to make sure that our `dev.env` config file actually gets loaded whenever we run the `$ npm run dev` otherwise there will be no environment variable when we run prisma.js and things will fail

### env-cmd 
* Easy solution * Add env-cmd module
* [env-cmd docs](https://www.npmjs.com/package/env-cmd)

#### Install env-cmd
`$ npm i env-cmd`

* Add it to our `start` script

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "env-cmd ./config/dev.env nodemon src/index.js --ext js,graphql --exec babel-node",
    "dev": "nodemon src/index.js --ext js,graphql --exec babel-node",
    "test": "echo \"Error: no test specified\" && exit 1",
    "get-schema": "graphql get-schema -p prisma"
  },

// MORE CODE
```

* Now our app should work in development

`$ npm run dev`

* You will get an error because of an update to `env-cmd`

## Breaking change update!

* **note** It is very important to add the `-f` flag for custom paths for `env-cmd`

```
// MORE CODE

  "scripts": {
    "start": "env-cmd -f ./config/dev.env nodemon src/index.js --ext js,graphql --exec babel-node",
    "dev": "nodemon src/index.js --ext js,graphql --exec babel-node",
    "test": "echo \"Error: no test specified\" && exit 1",
    "get-schema": "graphql get-schema -p prisma"
  },

// MORE CODE
```

`$ npm run dev`

* Now it will run as expected in dev
* Check our server on `localhost:4000` and it should work as before

## Recap
* We installed git and heroku
* We logged into heroku using the heroku cli
* We edited index.js
    - Making sure when we eventually send the code to Heroku it will bind to the proper dynamic Port
    - Locally we will still use port 4000
* We updated prisma.js
    - We modified our static enpoint to a dynamic endpoing using environment variable
        + dev.env for development
        + prod.env for production
* We wired dev start script inside package.json

## Next - Wire up the prod start script

