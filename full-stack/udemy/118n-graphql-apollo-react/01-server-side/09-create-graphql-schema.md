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

`server.js`

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

## Test in terminal
* Should work and be connected to Terminal
* But we get another error

## Error - DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead

* The stackoverflow had a tip that removed the error

![stackoverflow solution](https://i.imgur.com/takMERN.png)

`$ npm i mongoose@5.2.13`

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

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Create GraphQL schema`

### Push to github
`$ git push origin add-apollo`

### Next - 

## Additional Resources
* [npm package versioning](https://docs.npmjs.com/getting-started/semantic-versioning)
