# Create GraphQL schema

### Productivity Tips
* Open both graphql `schema.js` and `User.js` side-by-side
* Use the VS code `2 tabs icon`

![2 tabs icon](https://i.imgur.com/HEvaNtZ.png)

### Graphql is NOT JavaScript
* GraphQL syntax looks different than our model syntax
* Exclamation point (means it is required) 
        - `!` === `required: true`
* GraphQL has no commas
* Common to add returns between lines for legibility

`schema.js`

```
exports.typeDefs = `
  type Cologne {
    scentName: String!
    scentPrice: Int
    createdDate: String
    description: String
    likes: Int
    username: String
  }

  type User {
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Cologne]
  }
`;
```

## more about our `User.js` model `favorites` field
`User.js`

```
// MORE CODE

  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Cologne',
  },
});

module.exports = mongoose.model('User', UserSchema);
```

* We are referencing our `Cologne` model
* Later we will use a mongoose method called `populate()` and this will change all the IDs we have in that array to Cologne objects themselves

## Question
* Why in GraphQL schema `joinDate: string` where in mongo schema `joinDate: Date`?
  - Answer
    + GraphQL doesn't include a scalar type of `Date` (unlike other scalar types like `String`, `Int`, and `Boolean`)
    + What the **mLab** database will return to us is a `String`, so that's the type we need to apply to our `mongoose` schema

## Big problem - TypeError: graphiqlExpress is not a function (as of 8/17/2018)

* This is because Apollo Server 2 has changed how it connects with GraphQL and it will break our code so to fix things we need to revert to an older version of Apollo
* If you update to Apollo Server 2 it will break
* Look at `package.json` to see your versions

`package.json`

* Update version to the following versions:

```
// MORE CODE

"apollo-server-express": "^1.3.6",

// MORE CODE

"graphql-tools": "^3.0.2",

// MORE CODE
```

* Install specific version of package with:

`$ npm i graphql-tools@3.0.2 apollo-server-express@1.3.6`

* But it still was the same error so that fix didn't work
* Now I need to update to the latest version and work with Apollo2
* If you want to update to the latest version of a package use this:

`$ npm i apollo-server-express@latest graphql-tools@latest`

* It will automatically override the current versions with the latest versions
* Check `package.json` and you will see the new versions
 
### Test in terminal
* The `graphiqlExpress` is not a function still appears
* npm package versions increase as they change
  - Some changes are more significant than others
  - See below additional resources for more info on npm package versioning
  - When you are building apps you want to to lock in version numbers so that a package and all its dependencies are used and not newer ones that may break your app
  - Apollo went from `1.0.0` to `2.0.0` and this was a major release and our code used to work but after the change our app broke
  - We could try to go back and find a past version of apollo-server-express and graphql npm packages that will work with our app but since we are just building our app we are going to update our app to work with the new Apollo package

`server.js`

```
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

// models
const Cologne = require('./models/Cologne');
const User = require('./models/User');

// bring in graphql middleware
// const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
// const { makeExecutableSchema } = require('graphql-tools');
const { ApolloServer } = require('apollo-server-express');

// graphql
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// connect to db
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('DB connected'))
  .catch(err => {
    console.log('Error on start: ' + err.stack);
    process.exit(1);
  });

// initialize app
const app = express();

// create apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ Cologne, User }),
});

server.applyMiddleware({ app });

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// connect schemas with graphql
// app.use(
//   '/graphql',
//   graphqlExpress({
//     schema,
//     context: {
//       // pass in mongoose models
//       Cologne,
//       User,
//     },
//   })
// );

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
```

* I kept the comments to show the code we changed but now I'm going to remove the changes

```
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

// models
const Cologne = require('./models/Cologne');
const User = require('./models/User');

// bring in graphql middleware
const { ApolloServer } = require('apollo-server-express');

// graphql
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// connect to db
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('DB connected'))
  .catch(err => {
    console.log('Error on start: ' + err.stack);
    process.exit(1);
  });

// initialize app
const app = express();

// create apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ Cologne, User }),
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
```

* I like the changes as it makes the code more clear and concise

## Problem schema @unique not recognized
* I was using `@unique` but removed due to the error about it not being recognized in the schema
* You have not seen @unique but I just point it out to show a change that you may see in older graphql code that is no longer used

## Test in terminal
* Should work and be connected to Terminal
* But we get another error

## Error - DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead
* [Stackoverflow solution](https://stackoverflow.com/questions/51960171/node63208-deprecationwarning-collection-ensureindex-is-deprecated-use-creat?noredirect=1&lq=1)

```
The issue is that mongoose still uses collection.ensureIndex and should be updated by them in the near future. To get rid of the message you can downgrade by using version 5.2.8 in your package.json (and delete any caches, last resort is to uninstall it the install it with npm install mongoose@5.2.8):

"mongoose": "^5.2.8"
```

* The stackoverflow had a tip that removed the error

![stackoverflow solution](https://i.imgur.com/takMERN.png)

`$ npm i mongoose@5.2.10`

* Then update mongoose in the server with:

`server.js`

```
// MORE CODE

// connect to db
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('DB connected'))
  .catch(err => {
    console.log('Error on start: ' + err.stack);
    process.exit(1);
  });

mongoose.set('useCreateIndex', true); // add this line

// MORE CODE
```

## Test in terminal
* I still was getting errors
* So now I update to the latest version of mongoose

`$ npm i mongoose@latest`

* DB connected and no warnings or errors!

## Additional Resources
* [npm package versioning](https://docs.npmjs.com/getting-started/semantic-versioning)
