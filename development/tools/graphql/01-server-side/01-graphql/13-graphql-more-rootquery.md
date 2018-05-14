# More root query fields
* We have 2 Root Queries set up
* We have 2 relational types set up

```
{
  book(id: 3) {
   name
    genre
  }
}
```

* That works but only brings back 1 book

## How can we write a root query that brings back ALL books?
* This won't work

```
{
  books {
   name
    genre
  }
}
```

* We don't have a root query set up for books

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
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});
// MORE CODE
```

* This will give you all books:

```
{
  books {
   name
  }
}
```

* Outputs

```
{
  "data": {
    "books": [
      {
        "name": "Great Expectations"
      },
      {
        "name": "David Copperfield"
      },
      {
        "name": "The Sun Also Rises"
      },
      {
        "name": "For Whom the Bell Tolls"
      },
      {
        "name": "The Old Man and the Sea"
      },
      {
        "name": "War and Peace"
      }
    ]
  }
}
```

* This will give you all authors

```
{
  authors {
   name
  }
}
```

* Get a list of books with all authors and their ages

```
{
  books {
   name
    author {
      name
      age
    }
  }
}
```

* This gives us all authors and their books with name and genre

```
{
  authors {
   name
    books {
      name
      genre
    }
  }
}
```

* That shows you how powerful and flexible GraphQL can be


