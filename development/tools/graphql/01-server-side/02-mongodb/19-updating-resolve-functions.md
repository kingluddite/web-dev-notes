# Updating Resolve Functions

`schema.js`

```
const graphql = require('graphql');
// const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

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
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
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
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
        return Book.find({ authorId: parent.id });
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
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find({});
      },
    },
  },
});
// MORE CODE
```

## Use Graphiql to get data
* Find all books

```
{
  books {
    name
    genre
  }
}
```

* All books with author and his name and age

```
{
  books {
    name
    genre
    author {
      name
      age
    }
  }
}
```

* Find all authors, their name and age

```
{
  authors {
    name
    age
  }
}
```

* Find all authors, and thier books and genres

```
{
  authors {
    name
    age
    books {
      name
      genre
    }
  }
}
```

* Find a book with a specific id

```
{
  book(id: 3) {
    name
    genre
    author {
      name
    }
  }
}
```

* We get an error `Cast to ObjectId failed for value 3 at path for model Book`

* But if we grab the correct ObjectId from mongodb

```
{
  book(id: "5af9161f8d163a542af66589") {
    name
    genre
    author {
      name
    }
  }
}
```

* Your id will be different! Make sure to update it to your correct book Id
* Grab an author by his id and all his books

```
{
  author(id: "5af912d05c99d3530ba5b1b6") {
    name
    age
    books {
      name
    }
  }
}
```

* All our graphql queries are working!

## Next: Add required fields server side
