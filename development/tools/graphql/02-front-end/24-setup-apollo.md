# Setup Apollo
* [Apollo Website](https://www.apollographql.com/docs/react/)

## Installation of Apollo
* [Apollo install docs](https://www.apollographql.com/docs/react/essentials/get-started.html)

`$ npm install apollo-boost react-apollo graphql-tag graphql --save`

## Here is how we tell our app about Apollo

```
import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import BookList from './components/BookList';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Reading List</h1>
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
```


