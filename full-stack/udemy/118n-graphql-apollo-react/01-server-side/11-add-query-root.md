# Add Query Root
* We will add a new type of `Query`
* This is in addition to our other types (User, Cologne)
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
* error `GraphQLError: Syntax Error: Expected Name, found }` in the Terminal
* This means we can't have an empty type in our `schema.js`
* We need to add a **name**

`schema.js`

```
// MORE CODE

  type Query {
    getAllColognes: [Cologne]
  }
`;
```

## Define logic in resolvers for Query
`resolvers.js`

```
exports.resolvers = {
  Query: {
    getAllColognes: () => {},
  },
};
```

## Test - no more errors
* In terminal

## Visit `http://localhost:4444/graphql`
* That error is gone too
* **note** Old graphiql view was called Document Explorer
* Now it is schema
* What it looked like before

![Query now defined](https://i.imgur.com/Kw1XQ0n.png)

* The new and improved schema view

![new schema view](https://i.imgur.com/UnMPBoo.png)

* Click on that link and you'll see the fields

![fields](https://i.imgur.com/6iEc9NR.png)

* Queries will be useful for us from returning data from our database

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add query root`

## Push to github
`$ git push origin add-apollo`
