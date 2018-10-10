# Install Apollo and use ApolloProvider
## Install Apollo packages
* Essential for us to make queries and mutations from our react application

`$ cd client`

`$ npm i react-apollo apollo-boost jwt-decode`

* `http://localhost:4444/graphql` - URI essential for connecting front end with backend
    - **note** This is put inside our client side code
    - Our test URL to view our UI for graphiql is: 
* Will will give all our components that information so they can perform `mutations` and `queries` using `ApolloProvider`

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

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add ApolloProvider and Apollo Boost`

## Push to github
`$ git push origin add-react`

## Next - Apollo Queries
