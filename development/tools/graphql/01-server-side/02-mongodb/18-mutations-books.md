# Add books using mutation
* Delete all authors using mongodb UI
* Enter the authors we used before using graphiql

```
name: "Charles Dickens", age: 200,
name: "Earnest Hemingway", age: 120,
name: "Eckart Tolle", age: 70,
name: "Leo Tostoy", age: 150,
```

```
// MORE CODE
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
```

* Now let's add a book

```
mutation {
  addBook(name: "War And Peace", genre: "Classic", authorId: "5af912fb5c99d3530ba5b1b9") {
    name
    genre
  }
}
```

* We get the id by looking up the author in mongodb and copying and pasting it into our query
* Run it
* Look at MongoDB
    - There is a new collection
    - With our new book inside it

## Add the other books with the proper author IDs
* We need this to play with later

```
name: "Great Expectations", genre: "Classic" 
name: "David Copperfield", genre: "Classic"
name: "The Sun Also Rises", genre: "Classic"
name: "For Whom the Bell Tolls", genre: "Classic"
name: "The Old Man and the Sea", genre: "Classic"
```

