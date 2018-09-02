# Install Apollo and use ApolloProvider
## Install Apollo packages
* Essential for us to make queries and mutations from our react application

`$ cd client`

`$ npm i react-apollo apollo-boost jwt-decode`

`http://localhost:4444/graphql` - URI essential for connecting front end with backend

* Will will give all our components that information so they can perform mutations and queries using `ApolloProvider`

`client/src/index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './components/App';

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
```
