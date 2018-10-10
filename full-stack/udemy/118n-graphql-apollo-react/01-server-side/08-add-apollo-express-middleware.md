# Add Apollo Express Middleware
## add `body-parser`
* We will need this for all our JSON requests and responses

## Create two new files
* In root of your app

`$ touch server/schema.js server/resolvers.js`

## What the heck do we need `schema.js` and `resolvers.js` for?
* When using `graphql-tools`, you define your field resolvers separately from the schema
* Since the schema already describes all of the fields, arguments, and result types, the only thing left is a collection of functions that are called to actually execute these fields
* **note** GraphQL resolvers can return promises
* In fact, most `resolvers` that do real work - for example fetching data from a database or a REST API - will return a **promise**
* We had schemas for mongoose
* We also need schemas for GraphQL for type checking

## Resolver map
* In order to respond to queries, a schema needs to have resolve functions for all fields
* Resolve functions cannot be included in the GraphQL schema language, so they must be added separately
* This collection of functions is called the `resolver map`

`/server/schema.js`

```
exports.typeDefs = ``;
```

`/server/resolvers.js`

```
exports.resolvers = {};
```

### Now require `schema.js` and `resolvers.js` inside our app
`server.js`

```
const PORT = process.env.PORT || 4444;

// MORE CODE

// graphql
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// MORE CODE
```

## `apollo-server-express` and `graphql-tools`
* Packages that will allow us to add our GraphQL middleware
* We installed both of these packages earlier
    - This essentially allows us to connect GraphQL with Express

`server.js`

```
// MORE CODE

// models
const Cologne = require('./models/Cologne');
const User = require('./models/User');

// bring in GraphQL middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// graphql
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Create schemas
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// MORE CODE
```

## Connect schemas with GraphQL
`server.js`

```
// MORE CODE

// initialize your application
const app = express();

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Connect schemas with GraphQL
app.use(
  '/graphql',
  graphqlExpress({
    schema,
    context: {
      // pass in mongoose models
      Cologne,
      User,
    },
  })
);

// MORE CODE
```

## Houston we have a problem
* If your server is still running you will see this error in terminal:

`Error: Must provide typeDefs`

* Open `schema.js` and see our `typeDefs` property is empty and this is causing the error

## Provide Type Definitions
* This is what `GraphQL` names its schema
* We provide `models` to show the shape of our data with mongoose
* We have to do the same thing with `GraphQL`
* These need to match up with the mongoose models

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add apollo express middleware`

## Push to github
`$ git push origin add-apollo`

## Next
* We need to fix our `Must provide typeDefs` error

## Additional Resources
* [Understanding Promises](https://scotch.io/tutorials/javascript-promises-for-dummies)

### Async code
* If you add the numbers a normal function, you get the result immediately
* However when you issue a remote call to get result, you need to wait, you can't get the result immediately
* You don't know if you will get the result because of stuff like:
    - The server might be down
    - Slow in response, etc
    - You don't want your entire process to be blocked while waiting for the result

### Typical Async calls
* Calling APIs
* Downloading files
* Reading files

### World Before Promises: Callback
* Must we use promise for asynchronous call?
* Prior to Promise, we used callbacks

#### What is a callback?
* Callback is just a function you call when you get the return result

##### Callback hell
*  It looks like a pyramid, but people usually refer this as "callback hell", because the callback nested into another callback
*  If you have 10 callbacks, your code will nested 10 times
  -  This is why Promises are preferred over callbacks

