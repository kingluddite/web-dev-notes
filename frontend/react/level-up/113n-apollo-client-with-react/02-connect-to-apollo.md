# Connect GraphQL to our GraphCMS
* They will be able to talk to each other via `Apollo Provider`
* This gives us the ability to consume APIs directly anywhere inside our React App using Apollo queries

## npx vs npm
* You need npm >= version 5.2 to use npx
* npx gives you the ability to use global apps you didn't install

### Which npm version do I have?
`$ npm -v`

## Create React App
* **note** You can not use spaces or uppercase letters in your project name

`$ npx create-react-app level-1-graphql`

`$ cd level-1-graphql`

`$ yarn start`

## Connect our React App to our CMS
* We use `apollo` to do this
* [Go to apollo web site](https://www.apollographql.com/docs/react/)
* Click the `React + React Native` link from the `Client` dropdown
* You can use Apollo with a plethora of other front end frameworks
* Scroll down and click `Get Started`

### We need to install some packages
`$ npm install apollo-boost react-apollo graphql`

* We need to connect to our GraphQL server with Apollo and then connect that into our react app

## We now need to create a client
* We will do this using `apollo-boost`
* This is a new library from apollo that makes connecting to a client easier than it was before and it uses sensible defaults
* We will need to point to a URI which will be the single endpoint to our graphql server

## Eslint and prettier make life easier
### Install Prettier and the ESLint Plugin
`$ yarn add --dev --exact prettier eslint-plugin-prettier`

### Install the Prettier and ESLint VS Code Extensions
* [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Create ESLint Configuration file

`.eslintrc`

```
{
  "extends": "react-app",
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

### Create Prettier Configuration file

`.prettierrc`

```
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

### Apply Prettier Formatting on Save (Optional)
* You most likely want to apply the Prettier formatting whenever you save your files

`"editor.formatOnSave": true`

* **note** Restart VS Code for Eslint and prettier to start working

### Remember this
* If you ever seen a graphql API in the public that exists and you want to connect your app to it:
    1. import ApolloClient from apollo-boost
    2. Create a new client
    3. Hit the URI endpoint
        * What is our URI endpoint on GraphCMS?
        * Click Dashboard on GraphCML and copy the Endpoints URI
        * Paste that into your code
        * That is our GraphQL API!
            - If you were using Prisma or your own GraphQL your URI would be somewhere different
            - When the server is running on the server as the client you could just `/graphql` as my server
    4. Then wrap your app in an ApolloProvider

`App.js`

```
// MORE CODE

import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'https://api-uswest.graphcms.com/v1/cjlvat5yu2e8001f853x10qgj/master'
})

// MORE CODE
```

* Now we have a client that we can use in a react component
* We also installed react apollo
    - That gives us `ApolloProvider`
        + It is not the default import so that is why we use `{ ApolloProvider }`
        + We want to:
            1. We want to import ApolloProvider into our app
            2. Then we want to wrap our app in ApolloProvider and have the client as the individual `client` prop 

`App.js`

```
import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'https://api-uswest.graphcms.com/v1/cjlvat5yu2e8001f853x10qgj/master',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
```

* We use the `client` prop and pass in the `client` value to make sure our app has access to our client

## Test it out
* Nothing should break which is a great sign
* Check React tools and you'll see ApolloProvider
    - And props shows children and client
        + client has a bunch of stuff we can use inside of it

## Next
* We want to write queries to pull data from our graphql API into our app using render props 
