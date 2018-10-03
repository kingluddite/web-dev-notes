# Time to start our Project!

## What we are building
* Think cologne
* Fans of cologne want to share their favorites 
* We need a database that stores user info so they can log in and out
* A user can add colognes so these users will be tied to the logged in user
* Their password will be encrypted
* There will be simple `client-side` and `server-side` side validation
* The DB will be mongoDB
* Our frontend framework will be React
* Our router will be React Router

## server
* Create a new folder in your project root

`$ mkdir server`

* Create a `package.json` inside `server`

`$ cd server && npm init -y`

## Install these packages

`$ npm i apollo-client apollo-cache-inmemory apollo-link-http apollo-link-error apollo-link`

## Why Apollo Boost?
* It saves your time
    - It used to take a long time to set up `Apollo` inside react app
    - Now it is just a simple import and involves setting up an Apollo Client
    - Here is an code sample of what that would look like (don't type this):

```js
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});
```

## React Apollo
* In addition we also need to set up a specific package for React called `React Apollo`
* This will give us access to the `Query` and `Mutation` components
    - [Query docs](https://www.apollographql.com/docs/react/essentials/queries.html)
    - Allows us to perform queries that is very similar to our surrounding React code
        + In the past it took a lot more code to perform a basic query within a given component
            1. Now you just write the query
            2. And include the query in your component
