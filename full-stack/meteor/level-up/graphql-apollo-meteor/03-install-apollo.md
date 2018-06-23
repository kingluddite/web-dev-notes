# Install Apollo and apollo server
`$ npm i apollo-client graphql-server-express express graphql graphql-tools body-parser apollo-link-http apollo-cache-inmemory`

# ./meteor/packages
* Add `apollo` package to the bottom
* Wait for Meteor to add it and when it is finished check to see if app still works in browser (nothing changed, works the same)
* Could take a long time

`/server/init.js`

```
import '../imports/startup/server';
```

`/imports/startup/server/index.js`

```
console.log('hi')
```

* Test if it works
* If it does you will see `hi` appear in terminal
* So this is your server not the browser (client)
    - Make sure to know the difference between client and server
    - No log will be on client side

## Get started with our server
`/imports/startup/server/index.js`

```
import { createApolloServer} from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

createApolloServer({});
```

* Make sure there are no errors
* This set up an apollo server insider our meteor app
* But is not yet up set up the client to the apollo app
    - aka - we can't do client side queries just yet
    - We will put resolvers and type inside our createApollowServer({})
        + think of a `resolver` as the thing that hits the db and gets the data
        + type is where you define your schemas
        + mutations are what updates your DB

## What apollo does
* It will replace the meteor part of the API in our project
* It will replace your meteor methods with mutations (they replace your server side stuff.. server side routes/meteor methods)
* It will be our server side code that will grab data from db, choosing how to make it available to apollo or graphql on the client side and at the end of the data it will be as simple as writing a data container that has a query that pulls what data you want
* if you ever used mini mongo in meteor is great to query the db directly from your client, having an api and watching the data come back and apollo stands on that same idea in a way that is far superior 
