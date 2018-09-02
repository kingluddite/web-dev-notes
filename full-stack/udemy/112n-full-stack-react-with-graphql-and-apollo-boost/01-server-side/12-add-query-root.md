# Add Query Root
* We will add a new type of Query
* This is in addition to our other types (User, Genealogy)
* This will be added in our `schema.js`

`schema.js`

```
// MORE CODE

type User {

    username: String!

    password: String!

    email: String!

    joinDate: String

    favorites: [Genealogy]

  }

  type Query {

    
  }
`;
```

## Add type Query inside our resolvers.js
`resolvers.js`

```
exports.resolvers = {
  Query: {},
};
```

## Test - Houston we have a problem
* error `GraphQLError: Syntax Error: Expected Name, found }`
* This means we can't have an empty type in our `schema.js`
* We need to add a **name**

`schema.js`

```
// MORE CODE

  type Query {
    getAllGenealogies: [Genealogy]
  }
`;
```

## Define logic in resolvers for Query
`resolvers.js`

```
exports.resolvers = {
  Query: {
    getAllGenealogies: () => {},
  },
};
```

## Test - no more errors
* Visit `http://localhost:4444/graphiql`
* That error is gone too

### View Document Explorer in graphiql
* We now see the Docs have our Query defined

![Query now defined](https://i.imgur.com/Kw1XQ0n.png)

* Click on that link and you'll see the fields

![fields](https://i.imgur.com/oC7hOgP.png)

* And if you click the link for type you will see all fields for Genealogy

![genealogy fields](http://localhost:4444/graphiql)

* Queries will be useful for us from returning data from our database
