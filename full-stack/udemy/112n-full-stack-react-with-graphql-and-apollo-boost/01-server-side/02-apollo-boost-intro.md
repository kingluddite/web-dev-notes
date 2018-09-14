# Apollo Boost Introduction
[apollo graphql website](https://www.apollographql.com/)

* `GraphQL` powers our API
* Apollo is what allows us to bring `GraphQL` into our app

## Within our app we'll have 2 parts
1. Server
2. Client

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

# Time to start our Project!
## What we are building
* Think family tree
* You will have people you want to add to a family tree
* We won't create much of the functionality of a family tree app but we will have a database that stores user info so they can log in and out
* A user can add people to their family tree so these users will be tied to the logged in user
* The password will be encrypted
* There will be simple client and server side validation
* The DB will be mongoDB
* Our front end framework will be React
* Our router will be React Router

## Create a `package.jso`n in the root of your server
* `$ npm init -y`
* Here are the individual packages

`$ npm install apollo-client apollo-cache-inmemory apollo-link-http apollo-link-error apollo-link`

## Why Apollo Boost?
* **Saves Time** It used to take a long time to set up `Apollo` inside react app
    - Now it is just a simple import and involves setting up an Apollo Client
    - Here is an code sample of what that would look like (don't type this):

```
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});
```

## React Apollo
* In addition we also need to set up a specific package for React called `React Apollo`
* This will give us access to the `Query` and `Mutation` components
    - [Query docs](https://www.apollographql.com/docs/react/essentials/queries.html)
    - This is new that allows us to perform queries that is very similar to our surrounding React code
        + In the past it took a lot more code to perform a basic query within a given component
            1. Now you just write the query
            2. And include the query in your component
