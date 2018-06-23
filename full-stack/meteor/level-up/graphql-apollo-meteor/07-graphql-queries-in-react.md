# Graphql queries in react
* We will output our query

## What we have now:
* Update `App.js` to look like this:

```
import React from 'react';

const App = () => <h1>Hello from react component</h1>;

export default App;
```

* And you should see `Hello from react component` in brower (aka "The Client")

## Update server `imports/startup/server/index.js`

```
// MORE CODE
const resolvers = {
  Query: {
    hi() {
      return 'hello from your graphql';
    },
  },
};
// MORE CODE
```



## Summary of how we got here
1. We created our server
2. We created our client
3. We connected the two
4. Now we'll connect a component to everything to get us outputting data from Apollo client

## Import some stuff
* gql - will enable us to write a query inside of JavaScript and we'll use that query to pull data
* graphql - enables us to connect our query to our component

`App.js`

```
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const App = ({ data }) => <h1>{data.hi}</h1>;

const hiQuery = gql`
  {
    hi
  }
`;
export default graphql(hiQuery)(App);
```

* That last line is a HOC (higher order component)
* Now you see `Hello World` and this is coming directly from our server (not from the client)

## Take for a test run
* You now should see `hello from your graphql` in the browser
* This shows you that you are getting data from the server using graphql (it is not coming from client side code)
* This could easily return code from a database
* This is the boilerplate
    - You can throw this into your existing Meteor React app and it will replace everything you have in there Redux, Tracker

## Boilerplate code
[use as a starting point](https://github.com/kingluddite/graphql-apollo-meteor-react-boilerplate) 
