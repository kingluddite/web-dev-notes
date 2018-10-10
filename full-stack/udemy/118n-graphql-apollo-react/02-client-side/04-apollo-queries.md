# Apollo Queries
* We were use GraphQL to output data from our server but we now have React and we need a way to pull in our GraphQL results into our React UI

## Create query file
`client/src/queries/index.js`

* The `Query` component is one of the most important building blocks of your Apollo application
* To create a Query component, just pass a GraphQL query string wrapped with the `gql` function to `this.props.query` and provide a function to `this.props.children` that tells React what to render
* The **Query** component is an example of a React component that uses the render prop pattern
* React will call the `render prop function` you provide with an object from Apollo Client containing `loading`, `error`, and `data` properties that you can use to render your UI

* **tip** open `schema.js` and make sure you know how your query was spelled

```
// MORE CODE

type Query {
  getAllColognes: [Cologne]
}

// MORE CODE
```

## Now `client/src/queries/index.js`
* Remember to wrap your query string in the `gql` function in order to parse it into a query document
* Use your getAllColognes query from GraphQL, copy and paste it inside the `gql` like this:

```
import { gql } from 'apollo-boost';

export const GET_ALL_COLOGNES = gql`
  
`;
```

* After copying and pasting your `index.js` should look like this:

```
import { gql } from 'apollo-boost';

export const GET_ALL_COLOGNES = gql`
  query {
    getAllColognes {
      scentName
      scentPrice
      likes
      createdDate
    }
  }
`;
```

## Where will we run this query?
* In `App.js`
* We will use `Query` from `react-apollo` and this enables us to perform queries
* We will also **import** the query we just wrote `GET_ALL_COLOGNES`
* Inside `<Query></Query>` we will have **render props** (just a function wrapped in curly braces that allows us to do many cool things)
    - We can return something with render props

`App.js`

```
import React, { Component } from 'react';

// graphql
import { Query } from 'react-apollo';
import { GET_ALL_COLOGNES } from '../queries';

// styles
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Home</h1>
        <Query query={GET_ALL_COLOGNES}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            console.log(data);

            return <p>Colognes</p>;
          }}
        </Query>
      </div>
    );
  }
}

export default App;
```

## View console
* You should see `getAllColognes` returned with all the colognes that we created using the GraphQL GUI
* The properties were what we specified inside our graphql we used in the GUI GraphQL as well as `queries/index.js`

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add client side GraphQL queries'`

## Push to github
`$ git push origin add-react`

## Additional Resources
### What are render props?
* [article of render props](https://levelup.gitconnected.com/understanding-react-render-props-by-example-71f2162fd0f2)
* [what is cors](https://www.codecademy.com/articles/what-is-cors)
* **note** Before Apollo 2 you needed to use cors but with Apollo you do not need it but it is important to know what is and why it is needed
