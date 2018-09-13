<!--  --># Apollo Queries
* Create query file

`client/src/queries/index.js`


* **tip** open `schema.js` and make sure you know how your query was spelled

```
// MORE CODE

type Query {
  getAllGenealogies: [Genealogy]
}

// MORE CODE
```

## Now `client/src/queries/index.js`

```
import { gql } from 'apollo-boost';

export const GET_ALL_GENEALOGIES = gql`
  query {
    getAllGenealogies {
      firstName
      lastName
      likes
      createdDate
    }
  }
`;
```

## Where will we run this query?
* In `App.js`
* We will use `Query` from `react-apollo` and this enables us to perform queries
* We will also import the query we just wrote `GET_ALL_QUERIES`
* We'll delete our App class and replace it with a Stateless Functional Component (SFC)
* Inside `<Query></Query>` we will have render props (just a function wrapped in curly braces that allows us to do many cool things)
    - We can return something with render props

### What are render props?
* [article of render props](https://levelup.gitconnected.com/understanding-react-render-props-by-example-71f2162fd0f2)

`App.js`

```
import React from 'react';
import './App.css';

import { Query } from 'react-apollo';
import { GET_ALL_GENEALOGIES } from '../queries';

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_GENEALOGIES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        console.log(data);

        return <p>Genealogies</p>;
      }}
    </Query>
  </div>
);
export default App;
```

## no-cors error
* Test in browser and we have two errors
* **405 (Method Not Allowed)**
* `No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.`


