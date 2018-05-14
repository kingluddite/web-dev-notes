# Graphql id
* Right now are id is a string
* If we pass a number we will get an error
* We can use a special id field

`schema.js`

```
const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;
// MORE CODE
```

* Update the id String to GraphQLID

```
// MORE CODE
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
```

* Now we see id is ID type not just String

![Books has ID type](https://i.imgur.com/AnVqcsq.png)

* Now our id value works with a string or a number
* This is a more flexible option

```
{
  book(id: 3) {
    name
    genre
    id
  }
}
```

* if it is a type ID how can if find a book when the book has a string id?

`schema.js`

```
// MORE CODE
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        console.log(typeof args.id);
        return _.find(books, { id: args.id });
      },
    },
  },
});
// MORE CODE
```

* Now in GraphiQL we can hit play and then look at nodemon running and we'll see `string` in the terminal
* It is still a string and even though we are using GraphQLID, that is just for graphQL's benefit
* remove the console.log()


