# Apollo Boost Introduction
[apollo graphql website](https://www.apollographql.com/)

* GraphQL powers our API
* Apollo is what allows us to bring GraphQL into our app

## Within our app we'll have 2 parts
1. Server
2. Client

### Our [Server](https://www.apollographql.com/server)
* We'll have a GraphQL server
* We'll need Apollo packages for this

#### Packages we'll need for our server
* Apollo Server
    - This will enable us to build a GraphQL server
* graphql tools

### On our [Client](https://www.apollographql.com/docs/react/)
* We'll have our React app and we'll want to perform queries
* We'll need a Apollo packages for this
* We will set up Apollo using `apollo-boost`
    - This package contains a number of individual packages
    - [apollo boost docs](https://www.apollographql.com/docs/react/advanced/boost-migration.html)

## package.json
* Create `package.json` using `$ npm init -y`
* Here are the individual packages

`$ npm install apollo-client apollo-cache-inmemory apollo-link-http apollo-link-error apollo-link`

## tip - brew --- keep node updated
```
$ brew doctor (5 minutes)
$ brew update node (10 minutes) (might be $ brew upgrade node)
```

## Why Apollo Boost?
* It used to take a long time to set up Apollo inside react app
    - Now it is just a simple import and involves setting up an Apollo Client

```
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});
```

## In addition we also need to set up a specific package for React called React Apollo
* This will give us access to the `Query` component
    - [Query docs](https://www.apollographql.com/docs/react/essentials/queries.html)
    - This is new that allows us to perform queries that is very similar to our surrounding react code
        + In the past it took a lot more code to perform a basic query within a given component
            1. Now you just write the query
            2. And include the query in your component
