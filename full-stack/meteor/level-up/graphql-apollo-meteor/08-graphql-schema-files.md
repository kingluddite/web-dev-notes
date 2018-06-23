# Graphql Schema Files
* We'll write the schema and talk about the graphql schema and graphql files

## Create `resolutions` folder
`/imports/api/resolutions/graphql`

```
# name
# createdAt
# [todoId]

type Resolutions {
  _id: String!
  name: String!
}
```

* String! - ! means it is required

`imports/startup/server/register-api.js`

```
import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';
```

* now import our register-api

`imports/startup/server/index.js`

```
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import './register-api';
// MORE CODE
```

## Houston we have a problem
* We get an error that our server can't find Resolutions.graphql
* How do we get graphql files to work in our app?
    - Easy! Add `.babelrc` and add this configuration

`$ npm i -D babel-plugin-inline-import`

* We use -D because it is a devDependency
`.babelrc`

```
{
  "plugins": ["babel-plugin-inline-import"]
}
```

* Meteor will automatically refresh you don't have to restart it and it is no longer crashing

## Refactor
* Better code structure for improved code base maintenance

`imports/startup/server/register-api.js`

```
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';

const typeDefs = `
type Query {
 hi: String 
}
`;

const resolvers = {
  Query: {
    hi() {
      return 'hello from your graphql';
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });

```

`imports/startup/server/index.js`

```
import './register-api';
```

## Now we have two schemas
1. typeDefs
2. ResolutionsSchema

* Right now our app is only using typeDefs schema
* We want to merge typeDefs with ResoltuionsSchema

### We'll create an array and stuff all our schemas inside it

```
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';

const testSchema = `
type Query {
 hi: String 
}
`;

const typeDefs = [testSchema, ResolutionsSchema];
// MORE CODE
```

## Finished file
`register-api.js`

```
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';

const testSchema = `
type Query {
 hi: String 
}
`;

const typeDefs = [testSchema, ResolutionsSchema];

const resolvers = {
  Query: {
    hi() {
      return 'hello from your graphql';
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
```

* Now we have no errors but our app has not changed
* But we are using a coding pattern that we can easily scale our app by adding all our schemas to an array




