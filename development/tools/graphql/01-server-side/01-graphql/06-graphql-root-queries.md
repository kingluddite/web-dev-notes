# Root queries

```
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});
```

## Schema needs to do 3 things
1. define types (we defined Book)
2. Define relationships between types
    - We only have one type right now
    - So we don't yet need to define a relationship
3. Define root queries

## What are root queries?
* How we describe how the user jumps into the graph and grab data
* Look at the two points where we connect from react to the circles of data, these are the root queries

![root queries](https://i.imgur.com/Hi0GpDE.png)

![see here?](https://i.imgur.com/WTR4D4s.png)

* How do we initially get to jump into the graph to grab data?

```
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        args.id;
        // code to get data from db / other source
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
```

## Import the schema and use it
`app.js`

```
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    // schema: schema (can be shortened)
    schema,
  })
);

app.listen(4000, () => {
  console.log('now listening to port 4000');
});
```

## In the resolve tell graphql how to go out and get the data when someone makes a request


