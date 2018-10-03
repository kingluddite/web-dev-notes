# Create First Query
* When we added a document using a mutation a new `_id` field was created so we need to add that to our schema

`schema.js`

```
exports.typeDefs = `
  type Cologne {
    _id: ID,
    scentName: String!
    scentPrice: Int
    createdDate: String
    description: String
    likes: Int
    username: String
  }

  type User {
    _id: ID,
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Cologne]
  }

// MORE CODE
```

* We add `ID` as the type
* We don't need a `!` as it will automatically be added

1. `http://localhost:4444/graphql`
2. Open Documentation Explorer
3. Click on `Mutation`
4. In the Schema click on `Cologne`
5. You now see our new field of `_id: ID`

## Check your Query
`schema.js`

```
// MORE CODE

type Query {
  getAllColognes: [Cologne]
}

// MORE CODE
```

## Open your resolvers
* You will see this:

`resolvers.js`

```
exports.resolvers = {
  Query: {
    getAllColognes: () => {},
  },

// MORE CODE
```

* Make these modifications
  - We are using `async` - `await`
  - We will use the mongoose API to search the `colognes` collection for all the colognes and return them and we will store all colognes inside `getAllColognes`

`resolvers.js`

```
exports.resolvers = {
  Query: {
    getAllColognes: async (root, args, { Cologne }) => {
      const allColognes = await Cologne.find();
      return allColognes;
    },
  },

  // MORE CODE
```

* shortcut is:

```
exports.resolvers = {
  Query: {
    getAllColognes: async (root, args, { Cologne }) => {
      return await Cologne.find();
    },
  },
```

`http://localhost:4444/graphiql`

```
{
  getAllColognes {
    scentName
    scentPrice
    likes
  }
}
```

* Click `play` button
* You will see output from that query
* You could add a field like:

```
{
  getAllColognes {
    scentName
    scentPrice
    likes
    createdDate
  }
}
```

* And that will output `createdDate`
* This is a way to see what data you are getting
