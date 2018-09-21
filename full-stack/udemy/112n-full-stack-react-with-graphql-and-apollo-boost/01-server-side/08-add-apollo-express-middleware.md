# Add Apollo Express Middleware
## add `body-parser`
* We will need this for all our JSON requests and responses

## Create two new files
* In root of your app

`$ touch schema.js resolvers.js`

* We had schemas for mongoose
* We also need schemas for GraphQL for type checking

`schema.js`

```
exports.typeDefs = ``;
```

`resolvers.js`

```
exports.resolvers = {};
```

### Now require both files inside our app
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
* packages that will allow us to add our GraphQL middleware
* We installed both of these packages earlier
    - this essentially allows us to connect GraphQL with Express

`server.js`

```
// MORE CODE

const PORT = process.env.PORT || 4444;

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
      Genealogy,
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
* We provide models to show the shape of our data
* We have to do the same thing with `GraphQL`
* These need to match up with the mongoose models

