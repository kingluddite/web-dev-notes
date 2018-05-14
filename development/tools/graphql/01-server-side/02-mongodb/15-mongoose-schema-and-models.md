# Mongoose Schemas and Models
* We need to create a model and schema for each data type that will be stored inside our database

## Don't get confused between our two schemas
* We already created a schema that we passed through to GraphQL
    - That schema is defining our graph
* The mongoose schema is defining the data that will be stored in our MongoDB database
    - This is so mongodb understands that data and knows what to expect

## Models
* We will store our MongoDb models inside our `models` folder
* Create `/server/models` directory
    - Create two models (we intentionally name our models singular (for mongoose))
        + `/server/models/book.js`
        + `/server/models/author.js`

`books.js`

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

module.exports = mongoose.model('Book', bookSchema);
```

`author.js`

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model('Author', authorSchema);
```

* We don't need to create `id` fields for book or author as mongodb automatically creates an id for every new document in a collection
* We export our model
    - We create a model that will create a collection `Book` and inside this collection will have object that follow our `bookSchema`

`schema.js`

* Delete dummy data we don't need it anymore
* Comment out all resolve code
    - We won't need it to go through the arrays anymore, we will be going through mongoDB code

`schema.js`

```
const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, arts) {
        // return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, arts) {
        // return _.filter(books, { authorId: parent.id });
      },
    },
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
        // return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
```

## Import our 2 models we just created

`schema.js`

```
const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
// MORE CODE
```

## Next - start querying data in our mongoDB 
