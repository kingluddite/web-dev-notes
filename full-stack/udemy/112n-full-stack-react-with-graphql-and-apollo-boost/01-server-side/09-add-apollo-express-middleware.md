# Add Apollo Express Middleware
## add `body-parser`
* We will need this for all our JSON requests and responses

`$ npm i body-parser`

## Create two new files
* In root of your app

`$ touch schema.js resolvers.js`

* We had schemas for mongoose
* We also need schemas for graphql for type checking

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
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

// MORE CODE

// graphql
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// MORE CODE
```

## apollo-server-express and graphql-tools
* packages that will allow us to add our graphql middleware
    - this essentially allows us to connect graphql with express

### Add `apollo-server-express`
* `$ npm i apollo-server-express`

### Add `graphql-tools`
* `$ npm i graphql-tools`

`server.js`

```
// MORE CODE

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

## Check out error in terminal
`Error: Must provide typeDefs`

* Open `schema.js` and see our `typeDefs` property is empty and this is causing the error

## Provide Type Definitions
* This is what GraphQL names its schema
* We provide models to show the shape of our data
* We have to do the same thing with GraphQL
* These need to match up with the mongoose models

