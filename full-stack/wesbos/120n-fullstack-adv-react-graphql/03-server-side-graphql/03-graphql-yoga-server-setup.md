# GraphQL Yoga Server Running
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

## Note
* Prisma we give it our data model 
* Prisma we create a set of CRUD APIs
* If we open `src/generated/prisma.graphql`

## Security Problem!!!! - Purpose of using GraphQL Yoga
* But there is not security layer and all we can do is:
    - CRUD - Create, Read, Update and Delete
    - And provide relationships between our data
    - And in order to add things like:
        + Custom server side logic
        + We want to charge credit cards
        + We want to send an email
        + If we want to hash passwords (JWT Authentications) before we save them to the DB
        + If we want to have permissions with different layers where people can do things
    - There is a whole section of logic that needs to happen before that data is saved to the DB or taken from the prisma DB
    - **And that is why we are using GraphQL Yoga for**

## Installing Yoga
* Create `db.js`

`src/db.js`

* Our `React.js` is going to use `Apollo Client` to query our GraphQL Yoga endpoint
* And on the server GraphQL `connect()` is going to connect to our Prisma DB and pull the data back and forth
    - Similar to if we were building an Express application
        + There would be a mongoDB where Prisma is
        + And your controller would query your MongoDB
        + And then return the data to the Apollo Client

## Prisma-binding
* [prisma-binding github](https://github.com/prisma/prisma-binding)
    - This is just JavaScript bindings for the Prisma DB
    - It will allow us to connect to our DB

### Here is a sample of the documentation from prisma-binding repo

```
// Instantiate `Prisma` based on concrete service
const prisma = new Prisma({
  typeDefs: 'schemas/database.graphql',
  endpoint: 'https://us1.prisma.sh/demo/my-service/dev',
  secret: 'my-super-secret-secret'
})

// Retrieve `name` of a specific user
prisma.query.user({ where: { id: 'abc' } }, '{ name }')

// Retrieve `id` and `name` of all users
prisma.query.users(null, '{ id name }')

// Create new user called `Sarah` and retrieve the `id`
prisma.mutation.createUser({ data: { name: 'Sarah' } }, '{ id }')

// Update name of a specific user and retrieve the `id`
prisma.mutation.updateUser({ where: { id: 'abc' }, data: { name: 'Sarah' } }, '{ id }')

// Delete a specific user and retrieve the `id`
prisma.mutation.deleteUser({ where: { id: 'abc' } }, '{ id }')
```

* We did all those things in the playground of GraphQL GUI
* Above is how we can do those same things in JavaScript

### Now let's start creating our `db.js`
`db.js`

```
// This file connect ot the remote prisma DB
//  and gives us the ability to query it with JS
const { Primsa } = require('prisma-binding');

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false,
});

module.exports = db;
```

* `typeDefs`: We will point to our generated `database.graphql`
* `debug`: good to turn on if you are having GraphQL issues but it is "noisy" so only turn it on if you need it
* Make sure we export our db so we can use it elsewhere
* We use `commonjs` on the server for `node` (as `import` will not be understood by node until sometime in 2020)

##What is GraphQL Yoga?
* Now we will create the Yoga server
    - GraphQL Yoga is an Express server
    - You can use all of your Express middlewares
    - GraphQL Yoga will sit on top of Apollo Server
* [GraphQL Yoga docs](https://github.com/prisma/graphql-yoga)
* `graphql-yoga` is built on top of a variety of other packages, such as `graphql.js`, `express` and `apollo-server`
* Each of these provides a certain piece of functionality required for building a GraphQL server
    - Using these packages individually incurs overhead in the setup process and requires you to write a lot of boilerplate
    - `graphql-yoga` abstracts away the initial complexity and required boilerplate and lets you get started quickly with a set of sensible defaults for your server configuration
* `graphql-yoga` is **like create-react-app for building GraphQL servers**
* Using GraphQL Yoga server will save you time

`/src/createServer.js`

```
const { GraphQLServer } = require('graphql-yoga');
```

## Import our resolvers
* `resolvers` answer the question:
    - "Where does this data come from?"
    - OR
    - "What does this data do in the DB?"

### There are 2 different type of resolvers
1. Query
    * When you pull data from our DB
2. Mutation
    * When you push data and put it into our DB

**note** We will put `Query` and `Mutation` in their own files
* `resolvers/Query.js`
    - Anytime someone wants to pull data we will write a Query resolver
* `resolvers/Mutation.js`
    - Anytime someone wants to push data we will write a Mutation resolver

### Create our Mutation file

`src/resolvers/Mutations.js`

```
const Mutations = {};

module.exports = Mutations;
```

### Create our Query file
`src/resolvers/Query.js`

```
const Query = {};

module.exports = Query;
```

## Tell our yoga server about our Queries and Mutations

`createServer.js`

```
const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');
```

## Create GraphQL server - We need two!
* We are creating 2 GraphQL servers
    - We have our **Prisma server** which requires its own `typeDefs` and `schemas`
    - We also have our **GraphQL server** which needs its own `typeDefs` and `schemas`

`createServer.js`

```
const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');

// Create the GraphQL Yoga Server

function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql'
  })
}

module.exports = createServer;
```

* Create `src/schema.graphql`

`createServer.js`

```
const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');

// Create the GraphQL Yoga Server

function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query,
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({ ...req, db }),
  });
}

module.exports = createServer;
```

* We pass our resolvers (`Query` and `Mutation` - We use the es6 shortcut (Object Literal Property Value Shorthand))
* To prevent an annoying error we set requireResolversForResolveType to `false`
* We use `context` to surface the `db` on every request (**req**)

## Summary
* We create a DB
* We created a function that will "spin up" a new GraphQL server
* We created a blank `schema.graphql`
    - This is where we put all of our `client` facing types and `queries`/`mutations` will be

## Let's get this party started!
* Not it is time to kickstart it in our `index.js`
* We need a way to require all our environment variables
* This is done using the `dotenv` package
* Since `src/index.js` is the entry point of our server app we need to require dotenv here

`src/index.js`

```
require('dotenv').config();

const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO Use express middleware to handle cookies (JWT)
// TODO Use express middleware to populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
```

* We use `cors` because we only want this `endpoint` to be visited from our approved URLs
    - You definitely want to make sure the public can't hit your endpoints from anywhere
    - Only want your website is allowed to hit that endpoint
    - We have a `FRONTEND_URL` pointing to `http://localhost:7777`
    - And we tell `cors` that **only our frontend can access our backend**
* If you view the frontend folder and see it's `package.json` you will see

`frontend/package.json`

```
// MORE CODE

"scripts": {
    "dev": "next -p 7777",

// MORE CODE
```

#### What are `deets`
* short way of saying "details"

## Review
* We created our DB in `db.js`
* We created a function called `createServer()` which will ingest a `schema.graphql`
    - And it will match up everything inside the schema with either a `Mutation` or a `Query` resolver
* We exposed the DB to every single `req` (request)
* Then in our `server` **index.js** we spin up an instance of a GraphQL Yoga Server, we add TODOs for authentication middleware in Express
* And then we start up our GraphQL Yoga GraphQL Server

## Review `backend/index.js`
* We will be updating this `package.json`

```
// MORE CODE

"scripts": {
  "start": "nodemon -e js,graphql -x node src/index.js",
  "dev": "nodemon -e js,graphql -x node --inspect src/index.js",
  "test": "jest",
  "deploy": "prisma deploy"
},

// MORE CODE
```

* We should be able to run:

`$ npm run debug`

or

`$ npm run dev`

* `debug` is how we start the actual server (_better way to start server locally_)
* Or we can use `$ npm start`

## What is nodemon?
* It will monitor your JavaScript files for changes and if there ever is a JavaScript change, it will kill the server and rerun it automatically

`nodemon -e js,graphql`

* `-e` makes sure we monitor the changes in JavaScript and graphql files
    - Normally you don't tell `nodemon` to watch specific files but since we are working with and updating `.graphql` files we want `nodemon` to restart the server when we make changes to those files too
*  `-x` what `nodemon` should actually be running, we are going to be running the command `node src/index.js`
*  `--inspect` We pass it the `inspect` flag which enables us to use chrome dev tools to see our console results rather than see them dumped into our terminal
*  `"playground": "graphql playground --dotenv .env"`
    -  It will automatically open up our GraphQL GUI or you can also download the Desktop application of GraphQL Playground and it will open that up for you
* `$ npm run dev` - Will run `debug` and `playground`

## Our new package.json

```
// MORE CODE

"scripts": {
  "start": "nodemon -e js,graphql -x node src/index.js",
  "debug": "nodemon -e js,graphql -x node --inspect src/index.js",
  "test": "jest",
  "playground": "graphql playground --dotenv .env",
  "deploy": "prisma deploy --env-file .env",
  "dev": "npm-run-all --parallel debug playground"
},

// MORE CODE
```

## We get an error
`GraphQLError: Syntax Error: Cannot parse the unexpected character "/".`

* We get this error because our `schema is empty`

`src/schema.graphql`

```
type User {
  id: ID!,
  name: String!
}
```

### We get another error
`Error: "Mutation" defined in resolvers, but not in schema`

* This error is because when we started up our GraphQL Yoga Server with:

`createServer.js`

```
// MORE CODE

function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query,
    },

// MORE CODE
```

* But write now we don't have any `Mutations` or `Queries`
* We will put **fake placeholders** to get rid of error for both `Mutation` and `Query`

`schema.graphql`

* And we can get rid of `type` User
* We just need to give it something it can resolve to

```
type Mutation {
  fake: String
}

type Query {
  fake: String
}
```

## Now our server should be working
`$ npm run dev`

* **note** Playground opens automatically

### Here is my final `backend/package.json`
```
{
  "name": "sick-fits-backend",
  "version": "1.0.0",
  "description": "the backend of sick fits",
  "scripts": {
    "start": "nodemon -e js,graphql -x node src/index.js",
    "debug": "nodemon -e js,graphql -x node --inspect src/index.js",
    "test": "jest",
    "playground": "graphql playground --dotenv .env",
    "deploy": "prisma deploy --env-file .env",
    "dev": "npm-run-all --parallel debug playground"
  },
  "dependencies": {
    "bcryptjs": "2.4.3",
    "cookie-parser": "^1.4.3",
    "graphql": "^0.13.2",
    "graphql-cli": "^2.16.7",
    "graphql-yoga": "1.16.2",
    "jsonwebtoken": "8.3.0",
    "nodemailer": "^4.6.8",
    "npm-run-all": "^4.1.3",
    "prisma": "1.17.1",
    "prisma-binding": "2.1.6",
    "stripe": "^6.12.1"
  },
  "license": "MIT",
  "repository": {
    "url": "wesbos.com"
  },
  "babel": {
    "presets": [
      "env"
    ]
  },
  "devDependencies": {
    "babel-preset-env": "^1.7.0",
    "dotenv": "^6.1.0",
    "nodemon": "^1.18.4"
  }
}
```

## Playground
* If you visit GraphQL Playground `http://localhost:4444/` you will see fake data
* This is great because it doesn't expose everything from our Prisma API because you may not want them exposed just yet and you want the power and control to expose API when you decide to
* Our Yoga Server has made our app more secure

## Troubleshooting
### You may be missing modules
* Install `dotenv`

`$ npm i dotenv -D`

## dependencies vs devDependencies

* Need to move things around
* Make sure the following are under `devDependencies` and not `dependencies`

### devDependencies
* babel-preset-env
* dotenv
* nodemon

`$ npm uninstall babel-preset-env dotenv nodemon`

`$ npm i babel-preset-env dotenv nodemon -D`
