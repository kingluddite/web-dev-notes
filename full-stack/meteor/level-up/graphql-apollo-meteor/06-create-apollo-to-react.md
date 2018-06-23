# Connecting React to Apollo & Apollo DevTools
## Install stuff we'll be using client side

` $  npm i apollo-client-preset react-apollo graphql-tag`

* Refresh client (browser) and make sure meteor has refreshed with no errors

## Create new meteor client connection
This will connect you to the graphql app

1. Create a new HttpLink
uri: URL for graphql server
using Meteor we can use it's API to grab an absolute URL
Not using meteor you would have to provide the absolute URLk

```
const httpLink = new HttpLink({
    uri: Meteor.absoluteUrl('graphql')
});
```

2. Add a cache

`const cache = new InMemoryCache();`

3. Create Apollo client

```
const client = new ApolloClient({
    link: httpLink,
    cache
})
```

4. Wrap our app inside of our client using ApolloProvider

`import { ApolloProvider } from 'react-apollo'`

```
// MORE CODE
const ApolloApp = () => (
  <ApolloProvider>
    <App />
  </ApolloProvider>
);

Meteor.startup(() => {
  render(<ApolloApp />, document.getElementById('app'));
});
```

* This makes graphql available inside our app
* Used just like we used for our `ReduxProvider`

5. Pass in client as a prop

`<ApolloProvider client={client}>`

### Final code

```
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from '../../ui/App';

const httpLink = new HttpLink({
  uri: Meteor.absoluteUrl('graphql'),
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

Meteor.startup(() => {
  render(<ApolloApp />, document.getElementById('app'));
});
```

## Take for a test spin
* No errors in browser
* Use React Dev tools to see 

## Install Apollo Dev tools
* https://github.com/apollographql/apollo-client-devtools
* Install [chrome extension](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)

## Troubleshooting
* Could not get Apollo Dev tools working
* Restart Chrome
* Uninstall and reinstall Apollo Dev and it should work (make sure you are on a web page that uses apollo
* This is what I see

![my view of code](https://i.imgur.com/dxdihKm.png)

* I do not see query recycle provider
* Install `apollo-boost` instead of `apollo-client-preset`

```
{
  hi
}
```


