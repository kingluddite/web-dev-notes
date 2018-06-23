# Organzie Our Resolvers
* Create `/imports/api/resolutions/resolvers.js`

## What is a resolver?
* We already wrote one in `register-api.js`

```
// MORE CODE
const resolvers = {
  Query: {
    hi() {
      return 'hello from your graphql';
    },
    resolutions() {
      return [
        {
          _id: '12345',
          name: 'Buy eggs',
        },
        {
          _id: '12346',
          name: 'Jump rope',
        },
      ];
    },
  },
};
// MORE CODE
```

## Is Query the only type of query?
* No
* There are many different types of querys

`resolver.js`

```
export default {
  Query: {
    resolutions() {
      return [
        {
          _id: '12345',
          name: 'Buy eggs',
        },
        {
          _id: '12346',
          name: 'Jump rope',
        },
      ];
    },
  },
};
```

`register-api.js`

```
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';
import ResolutionResolvers from '../../api/resolutions/resolvers';

const testSchema = `
type Query {
 hi: String
 resolutions: [Resolution]
}
`;

const typeDefs = [testSchema, ResolutionsSchema];

const resolvers = {
  Query: {
    hi() {
      return 'Hello from graphql';
    },
  },
  ...ResolutionsResolvers,
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
```

## Error - Houston we have a problem
* `resolvers` are not defined

### Solution - lodash
* We just want to merge everything

`$ npm i lodash`

#### Import lodash and only use merge
* This saves us the hit from loading all of lodash

`register-api.js`

```
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';
// MORE CODE
```

* Now we'll merge `resolver` and `ResolutionResolvers`

```
 // MORE CODE
const resolver = {
  Query: {
    hi() {
      return 'Hello from graphql';
    },
  },
};

const resolvers = merge(resolver, ResolutionResolvers);
 // MORE CODE
```

## Explaination
* We have one object that contains the property Query with a function inside it `hi()`
* We have another object which we imported `resolutions` query that also has a Property Query with a function inside it

`resolver.js`

```
export default {
Query: {
  resolutions() {
    return [
      {
        _id: '12345',
        name: 'Buy eggs',
      },
      {
        _id: '12346',
        name: 'Jump rope',
      },
    ];
  },
},
```

* Let's console it out to see what the merge did

`register-api.js`

```
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';
import ResolutionResolvers from '../../api/resolutions/resolvers';

const testSchema = `
type Query {
 hi: String
 resolutions: [Resolution]
}
`;

const typeDefs = [testSchema, ResolutionsSchema];

const resolver = {
  Query: {
    hi() {
      return 'Hello from graphql';
    },
  },
};

const resolvers = merge(resolver, ResolutionResolvers);

console.log(resolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
```

* View the terminal and you'll see our queries were merged together with the magic of lodash' `merge`

```
{ Query: { hi: [Function: hi], resolutions: [Function: resolutions] } }
```

* Now we are trying to keep everything in separate folders and this helps us do this with all resolvers
* We just add a comma and continue to add new resolvers
* example:

```
const resolvers = merge(resolver, ResolutionResolvers, resolver1, resolver2, resolver3);
```

## Make name less confusing
```
 // MORE CODE
 const testResolvers = {
   Query: {
     hi() {
       return 'Hello from graphql';
     },
   },
 };

 const resolvers = merge(testResolvers, ResolutionResolvers);
 // MORE CODE
```

* Import resolver and add to list
    - easy peasy
* This technique will become more prominent when our resolvers are no longer queries
*  **code base organizational tip** try to have individual folders for resolvers, mutations and schemas

## Next - Database stuff!
