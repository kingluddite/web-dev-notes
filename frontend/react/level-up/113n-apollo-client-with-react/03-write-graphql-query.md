# Write our first graphql query
## We need to add Graphql Tag
* This will take a string from a graphql query and convert it into GraphQL in a way that Apollo will understand it

## install graphql-tag
`$ yarn add graphql-tag`

* Import it and then write a query

`App.js`

```
// MORE CODE

import gql from 'graphql-tag';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'https://api-uswest.graphcms.com/v1/cjlvat5yu2e8001f853x10qgj/master',
});

const testQuery = gql`
  {
    posts {
      id
      title
      body
    }
  }
`;

// MORE CODE
```

## React dev tool
* Expand client and you will see `query` inside it
* This will let us write queries like this:
    - query is a method that returns a promise so we can use `.then()`

`App.js`

```
// MORE CODE

client
  .query({
    query: testQuery,
  })
  .then(res => console.log(res));

class App extends Component {

// MORE CODE
```

## Houston we have a problem
* We run with `$ npm start` and we get a 500 **not authorized error**
* You typically want to set this up when setting up your graphql server
* But GraphCMS makes it easy
    - GraphCMS Dashboard > Settings > Public API Permissions
        + Change from Protected to `READ`

## Refresh browser
* Error gone
* We see data object in console
    - data > posts > [ id: "fasfasfasdf", title: "Intro Video", body: "## This is...", lots more stuff here]
* We also get Apollo specific stuff back
    - loading ----- super handy (let's us know if our data arrived or not)
        + If it's true === no data yet
        + If it's false === we have data
        + We'll use loading in our code and use Spinners (loading screen)
    - error - if we have an error we'll also have access to that

## Review
1. We imported gql off of graphql-tag (takes query string and turns it into something we can use)
2. We defined a query inside gql`` and we use those es6 template strings to write our GraphQL query (we tested this query and know it will work)
3. We went into our client that we defined in Apollo Client and we used a query method
4. Passed in the query we wrote
5. Then we got the data out inside a `data` object

### But we will hardly ever use the above
* Instead we'll used React render props to get the data out


