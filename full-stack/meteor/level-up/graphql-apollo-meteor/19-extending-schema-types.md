# Extending Schema Types

`User.graphql`

```
type User {
  _id: String
  email: String
}

type Query {
 user: User
}
```

* We add type of Query

## Delete user from testSchema
`register-api.js`

```
// MORE CODE
const testSchema = `
type Query {
 hi: String
 resolutions: [Resolution]
}
`;
```

## Houston we have a problem - Error
* Site breaks
* "Type Query is defined more than once"
* The reason is all types must be unique
* To make this work we need to `extend` them

`User.graphql`

```
type User {
  _id: String
  email: String
}

extend type Query {
 user: User
}
```

* update comment in register-api.js so it will properly update (bug!)
* Server resets and error will go away

## Clean up code
* Delete testResolvers inside `register-api.js` and remove from `merge()`
* Delete hi from Query in testSchema in `register-api.js`
* Delete `testSchema` and remove it from `typeDefs`

`Resolutions.graphql`

```
type Resolution {
  _id: String!
  name: String!
}

type Query {
  resolutions: [Resolution]
}

type Mutation {
  createResolution(name: String): Resolution
}
```

* Why are we not use `extend type Query {}` above?
* We only need to use **extend** if there are duplicates

## Next - Custom Resolver
