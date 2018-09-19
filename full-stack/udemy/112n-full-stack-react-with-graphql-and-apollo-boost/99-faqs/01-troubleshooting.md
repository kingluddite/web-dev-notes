# Troubleshooting
* When making a sfc using the snippet VS code library it uses curly braces instead of parenthesees

* Don't do this:
```
const NavbarAuth = () => {}
```

* Do this:

```
const NavbarAuth = () => ()
```

## Quickly create a SFC
* `rfce` + tab

## Find processes running
`$ lsof -Pi | grep LISTEN`

## Kill process
`$  kill -9 24847` (replace number of process with the one you want to kill)

## Big problems with node
* View my node documents for how to work with the brew install of node and get rid of this freaking annoying window

![do you want node to accept incoming connections](https://i.imgur.com/aD13rnC.png)

## Make sure you know what environment you are working in
* Production or Development
* I thought I was working locally but my graphql was pointing to heroku. All my local changes to graphql were not being recognized and I wasted 1 hour until I figured that out.

## tip - brew --- keep node updated
```
$ brew doctor (5 minutes)
$ brew update node (10 minutes) (might be $ brew upgrade node)
```

## Apollo 2.0 fixes
* Remove `apollo-server-express` from `package.json` and re-install the latest version with `$ npm i apollo-server-express`
* Remove `graphql-tools` from `package.json` and re-install the latest version with `$ npm i graphql-tools`

`server.js`

```
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const PORT = process.env.PORT || 4444;

// bring in GraphQL middleware
const { ApolloServer } = require('apollo-server-express');

// graphql
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// models
const Genealogy = require('./models/Genealogy');
const User = require('./models/User');

// connect to db (add these lines)
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('DB connected');
  })
  .catch(err => {
    console.log('Error on start: ' + err.stack);
    process.exit(1);
  });

// initialize your app
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

// set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (token !== 'null') {
    try {
      req.currentUser = jwt.verify(token, process.env.SECRET);
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ Genealogy, User, currentUser: req.currentUser }),
});
server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

```

`resolvers.js`

```
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { ObjectID } = require('mongoose').mongo.ObjectID;

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  ObjectID: new GraphQLScalarType({
    name: 'ObjectID',
    description:
      'The `ObjectID` scalar type represents a [`BSON`](https://en.wikipedia.BSON) commonly used in `mongodb`',
    serialize(_id) {
      if (_id instanceof ObjectID) {
        return _id.toHexString();
      }
      if (typeof _id === 'string') {
        return _id;
      }
      throw new Error(
        `${Object.getPrototypeOf(_id).constructor.name} not convertible to `
      );
    },
    parseValue(_id) {
      if (typeof _id === 'string') {
        return ObjectID.createFromHexString(_id);
      }
      throw new Error(`${typeof _id} not convertible to ObjectID`);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return ObjectID.createFromHexString(ast.value);
      }
      throw new Error(`${ast.kind} not convertible to ObjectID`);
    },
  }),

  Query: {
    no changes
  },

  Mutation: {
    no changes
  },
};
```

`schema.js`

```
const { gql } = require('apollo-server-express');

exports.typeDefs = `
  scalar ObjectID

  type Genealogy {
   _id: ObjectID
   // same code
  }

  type User {
    _id: ObjectID
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Song]
  }

  type Query {
    // same code
  }

  type Token {
    token: String!
  }

  type Mutation {
    // same code
  }
`;
```

* The new UI for GraphQL can be found here: [http://localhost:4444/graphql](http://localhost:4444/graphql)

## Additional Resources
* [prisma](https://www.prisma.io/)
* [apollo client dev tools for chrome](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm?hl=en-US)
* [graphcms](https://graphcms.com/)
