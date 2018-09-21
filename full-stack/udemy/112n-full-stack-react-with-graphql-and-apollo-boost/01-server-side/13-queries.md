# Create First Query
* When we added a document using a mutation a new `_id` field was created so we need to add that to our schema

`schema.js`

```
exports.typeDefs = `
  type Genealogy {
    _id: ID,
    firstName: String!
    lastName: String!
    dateOfBirth: String
    description: String
    createdDate: String
    likes: Int
    username: String
  }

  type User {
    _id: ID,
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Genealogy]
  }

// MORE CODE
```

* We add `ID` as the type
* We don't need a `!` as it will automatically be added

1. `http://localhost:4444/graphiql`
2. Open Documentation Explorer
3. Click on `Mutation`
4. In the Schema click on `Genealogy`
5. You now see our new field of `_id: ID`

## Check your Query
`schema.js`

```
// MORE CODE

type Query {
  getAllGenealogies: [Genealogy]
}

// MORE CODE
```

## Open your resolvers
* You will see this:

`resolvers.js`

```
exports.resolvers = {
  Query: {
    getAllGenealogies: () => {},
  },

// MORE CODE
```

* Make these modifications

`resolvers.js`

```
exports.resolvers = {
  Query: {
    getAllGenealogies: async (root, args, { Genealogy }) => {
      const allGenealogies = await Genealogy.find();
      return allGenealogies;
    },
  },

  // MORE CODE
```

* shortcut is:

```
exports.resolvers = {
  Query: {
    getAllGenealogies: async (root, args, { Genealogy }) => {
      return await Genealogy.find();
    },
  },
```

`http://localhost:4444/graphiql`

```
{
  getAllGenealogies {
    firstName
    lastName
    likes
  }
}
```

* Click `play` button
* You will see output from that query
* You could add a field like:

```
{
  getAllGenealogies {
    firstName
    lastName
    likes
    createdDate
  }
}
```

* And that will output `createdDate`
* Great way to see what data you are getting
