# Write first Schema and query
## Run meteor app

`$ meteor`

## View website
* `http://localhost:3000`

## View graphiql
* `http://localhost:3000/graphiql`
* We get an error because we have no schema

`imports/startup/server/index.js`

```
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
type Query {
 hi: String 
}
`;

const resolvers = {
  Query: {
    hi() {
      return 'hello from your app';
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
```

* Error will disappear from terminal
* Refresh `localhost:3000/grpahiql`
* It now works
* On left add `{}`
* Click `< Docs` and you have access to Documentation!
* Click on query and you will see `hi: String`

## Summary
* We have our Schema that is defining a query
* We have the query itself
* We create a schema using makeExecutableSchema
* We pass the schema into createApolloServer

## Take it for a test spin
```
{
    hi
}
```

* Hit play button in graphiql
* You will get back a `data` object with an object holding `hi` and it's string value of 'hello from your app'



