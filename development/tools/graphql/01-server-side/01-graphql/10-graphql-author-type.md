## GraphQL author type
`schema.js`

```
// MORE CODE
// dummy data
var books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];

var authors = [
  { name: 'Charles Dickens', age: 200, id: '1' },
  { name: 'Earnest Hemingway', age: 120, id: '2' },
  { name: 'Eckart Tolle', genre: '70', id: '3' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt},
  }),
});

// MORE CODE
```

* Update our query to also query the authors

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
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});
// MORE CODE
```

refresh graphiql

and use documentation explorer to open RootQueryType
and you will see Book and Author types
    you will see author has access to id, name and age

```
{
 author(id: 3) {
    name
    age
    id
  }
}
```

And that will give us Eckart Tolle's record

## Why wrapping fields inside a function
when we have dependencies on one type to another then graphql might not recognize those dependencies because one is defined before the other
