# Apollo Persistent Cache
* Let's show you how you can get persisted queries (queries and data) that is stored in your cache (localStorage)
* And your app will use that cache every time it loads
* We will do this primarily in `App.js` and `index.js`
    - We'll need to move some components from `App.js` to `index.js` because we need to wait for that data and that cached load before we actually hit

`ReactDOM.render(<App /> document.getElementById('root'));`

## Change to a Fast 3G network
* Network > Online > Fast 3G
* Refresh browser
* It takes a bit of time to load
* We want to reduce that load time by eliminating two calls we are making because we are hoping to store some data in our localStorage

## apollo-cache-inmemory apollo-cache-persist
* We will add these two packages
* These 2 items will help us easily store things on the local cache

`$ yarn add apollo-cache-inmemory apollo-cache-persist`

## Import those two packages
`index .js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-cache-inmemory'; // add this
import { persistCache } from 'apollo-cache-persist'; // add this

// MORE CODE
```

## Move stuff from App.js to index.js
* We move `ApolloClient` and `ApolloProvider`

`index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost'; // add this
import { ApolloProvider } from 'react-apollo'; // add this

// MORE CODE
```

* Make sure to remove those two imports from `App.js`

## Also move default state and client like this:
`index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './App';

const defaultState = {
  isEditMode: false,
};

// Connecting our site to the GraphQL API
const client = new ApolloClient({
  uri: 'https://api-uswest.graphcms.com/v1/cjlvat5yu2e8001f853x10qgj/master',
  clientState: {
    defaults: defaultState,
    resolvers: {},
  },
});

// client
//   .query({
//     query: testQuery,
//   })
//   .then(res => console.log(res));

ReactDOM.render(<App />, document.getElementById('root'));
```

* Now remove the `ApolloProvider` wrapper from `App.js`

`App.js`

```
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './App.css';

// components
import Post from './Posts/Post';
import Posts from './Posts/Posts';
import NewPostForm from './Posts/NewPost';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <h1 className="App-title">GraphQL Blog</h1>
            </Link>
          </header>

          <main>
            <Switch>
              <Route path="/" exact component={Posts} />
              <Route path="/post/new" component={NewPostForm} />
              <Route path="/post/:id" component={Post} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
```

## Test
* We get an error that could not find `client`

### Re-add App in render
`index.js`

```
// MORE CODE
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
```

## Test
* It works
* We have some warning
* But we need to work on persisting and our cache

## Add the cache
`const cache = new InMemoryCache();`

* **note** If you were doing server side rendering this is also where you would bring in the data that was already brought in through server side rendering... so it could be supplemented to your cache

## Add the ability to persist
```
persistCache({

})
```

* This will make sure the cache is persisted
* But it will also ensure that before the app loads it will pull the cache out of localStorage

```
persistCache({
  cache,
  storage: window.localStorage
})
```

* `window.localStorage` is where it is saving it to

```
persistCache({
  cache,
  storage: window.localStorage,
}).then(() => {
  // Connecting our site to the GraphQL API
  const client = new ApolloClient({
    uri: 'https://api-uswest.graphcms.com/v1/cjlvat5yu2e8001f853x10qgj/master',
    clientState: {
      defaults: defaultState,
      resolvers: {},
    },
  });

  // client
  //   .query({
  //     query: testQuery,
  //   })
  //   .then(res => console.log(res));

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  );
});
```

* We store the rest of our app inside the `then()` that is returned from a Promise
    - This will makes sure the cache persists and loads and then it will create our client and then it will render our client
    - Make sure you also add the cache to the ApolloClient!

```
persistCache({
  cache,
  storage: window.localStorage,
}).then(() => {
  // Connecting our site to the GraphQL API
  const client = new ApolloClient({
    cache, // add this line!!!!
    uri: 'https://api-uswest.graphcms.com/v1/cjlvat5yu2e8001f853x10qgj/master',
    clientState: {
      defaults: defaultState,
      resolvers: {},
    },
  });

  // client
  //   .query({
  //     query: testQuery,
  //   })
  //   .then(res => console.log(res));

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  );
});
```

* After making those changes you will see less items loaded in Network
    - Refresh and you'll see no `master` loaded anymore
* Click `Application` tab and select `localStorage` and you'll see `apollo-cache-persist` which lets you know it is working

## Summary
1. Create our cache with InMemoryStorage
2. Then we run persistCache
3. Then we use `.then()`
4. Then we create our client
5. And then render our site

### Super fast now
* No master request in Network
* No API requests necessary because it is pulling it directly from your localStorage
* This will still be fast in 3G network (vs 11 second load times before) and now we have 4 second load times (and we are not even in a production bundle)

## Any issues with this?
* Create a new post and submit it
    - It would be cool if we had an `onSubmit` action that took us back to the home page after submitting form
* And on the home page we don't see our new data
* We refresh and still see our old data

## Dive Deeper
* [persistCache vs CachePersistor](https://github.com/apollographql/apollo-cache-persist)
    - We have a problem where we are using localStorage but it is not grabbing fresh data
* delete the localCache and refresh and you'll see the new data
* There is a lot we could do here but this is where we will stop
* Make sure to return your network to `Online` in the Network tab of the chrome console
