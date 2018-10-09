# Apollo Boost Introduction
[apollo graphql website](https://www.apollographql.com/)

* `GraphQL` powers our API
* Apollo is what allows us to bring `GraphQL` into our app

## Within our app we'll have 2 parts
* Server
* Client

### Our [Server](https://www.apollographql.com/server)
* We'll have a `GraphQL` server
* We'll need `Apollo` packages for this

#### Packages we'll need for our server
* `Apollo Server`
    - This will enable us to build a `GraphQL` server
* `graphql` tools

### On our [Client](https://www.apollographql.com/docs/react/)
* We'll have our `React` app and we'll want to perform queries
* We'll need a `Apollo` packages for this
* We will set up Apollo using `apollo-boost`
    - This package contains a number of individual packages
    - [apollo boost docs](https://www.apollographql.com/docs/react/advanced/boost-migration.html)

## Additional Resources
### Migrating from Apollo 1 to Apollo 2
  - Lots of cool reasons to migrate
    + You no longer need to import `body-parser` to set up `apollo-server-express`
    + You no longer need to import `makeExecutableSchema` from `graphql-tools`
    + You no longer need to import `graphqlExpress` and `graphiqlExpress` from `apollo-server-express`
    + You should pass in `typeDefs` and `resolvers` as parameters to an instance of Apollo Server
    + If the server is only functioning as a GraphQL server, it’s no longer necessary to run your own HTTP server (like express)
    + Apollo Server 2 ships with GraphQL Playground instead of GraphiQL and collocates the gui with the endpoint

### Apollo Server vs Apollo Server Express
* But you can start out either with `apollo-server@rc` or `apollo-server-express@rc`. The difference is that `apollo-server` is a stand alone server that doesn't allow you to install additional routes or integrate with an existing Express app
* So if you need that, you should use `apollo-server-express` instead
* [Migrate to Apollo v2.0](https://www.apollographql.com/docs/apollo-server/migration-two-dot.html)
* AST - Abstract syntax tree
  - Looks something like this:

```
[
  #<Nodes::Argument @name="first", @value="10">,
  #<Nodes::Argument @name="sortBy", @value="something">,
]
```
