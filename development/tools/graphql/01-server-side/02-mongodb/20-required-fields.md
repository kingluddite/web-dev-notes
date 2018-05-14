# Required Fields (GraphQLNonNull)

```
mutation {
  addAuthor(name:"John") {
    name
  }
}
```

* That will add a record without an age

![author added without age](https://i.imgur.com/fd7tDNu.png)

## What if we want age to be required when we add authors?

```
// MORE CODE

  GraphQLList,
  GraphQLNonNull, // add this line
} = graphql;

// MORE CODE

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
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

// MORE CODE
```

* Now if you don't enter all the required fields you won't be able to insert records
* But if you supply them in graphiql, you will be
* Now we are validating to make sure the values we require are sent

## Now add a front end
