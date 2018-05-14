# Mutatations (adding data to mongoDB)
## What are mutations?
* Things that let us change our data
    - All CRUD to our data are mutations

## In GraphQL we have to explicitly say which data is changed
`schema.js`

```
// MORE CODE
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        author.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
```

## Client side graphql
```
mutation {
  addAuthor(name: "Phil", age: 30) {
    name
    age
  }
}
```

* This is how we add data (mutation)
* Need to use `mutation` just like this
* We also enter our args
* and inside the callback we say what we want to see returned (name and age)
* Run it
* And you'll see:

```
{
  "data": {
    "addAuthor": null
  }
}
```

* null? But if you open mLab you'll see we added an author

![author added!](https://i.imgur.com/bPPlB7q.png)

* The good news is mongoose gives us `.save()` which saves the data and returns it to us and we just have to add `return` like this:

```
// MORE CODE
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save(); // we added return to this line
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
```

* We run Graphiql again

![now it returns data](https://i.imgur.com/Ersviyl.png)

* But now we have a duplicate record
* Delete the duplicate record on mongodb
* Add another one with the Name "Joe" and an age of 33

## Next Adding books


