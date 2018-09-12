# The Query Component
* We will run our query within a Query component inside React
* Comment out our `client.query` code as we won't use it

`App.js`

```
// MORE CODE

// client
//   .query({
//     query: testQuery,
//   })
//   .then(res => console.log(res));

// MORE CODE
```

## React does it better
* We'll get the same end result data object we received before but we'll write our query inside react

### Import the `Query` component from `react-apollo`
`App.js`

```
import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';

// MORE CODE
```

* The used to be accomplished using a HOC (Higher Order Component) so if you are seeing that in code, it is from older documentation
* We will rename our query form `testQuery` to `POSTS_QUERY`
* All caps is a common naming convention for queries (think of it as constant data that won't change)
    - We could use different names like:
        + GET_POSTS
        + ALL_POSTS
        + Lots of freedom on how you name them
        + Just describe what data they are grabbing

## Render Props
* Inside `Query` we need to use a **render prop** to get the data out
    1. `{}`
    2. add a function inside the curly braces `{()}`
    3. We add an arrow function inside that function

```
{() => {

}}
```

4. Destructure to give us access to things off our data object

`App.js`

```
// MORE CODE

<Query query={POSTS_QUERY}>
            {({ data, loading, error }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error</div>;
              // console.log(data);
              const { posts } = data;
              return posts.map(post => <h1>{post.title}</h1>);
            }}
          </Query>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
```

## Run it
* You will see `Intro Video` returned
* We will get rid of unique key error

## Contrats
* We connected to GraphCMS and used Graphql and Apollo to pull in that data into our React app

## Resources
* What are render props?

