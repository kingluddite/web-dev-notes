# Local State with Apollo Link State
* Recently (as of 9/12/2018) Apollo released Apollo Boost
* We imported  `{ ApolloProvider }` from **react-apollo**
* We imported `ApolloClient` from **apollo-boost**

## What is apollo-boost for again?
* Makes getting set up with `ApolloClient` and all the stuff you'll want to use a lot easier
    - Not long ago the process of getting setting up with Local State and Apollo was a pain in the $*#^!
    - We had to manually do a bunch of stuff with Apollo Link
    - Now with apollo-boost we hardly have to do anything and we have access to using Local State in our queries
    - This is a major plus

## More about Apollo-Boost
* We want to use apollo-boost for the entire state of our application
* Think of it like `Redux` or `this.state` (aka stuff you will be using throughout your app)

### Example
* We want state to let us know if we are in `edit mode` or not
* Access at a Component level could be useful but access at a Global level could be very useful too

### Default state
* **note** All this is possible because we are using `apollo-boost`
* If you are not using `apollo-boost` you won't be able to do this

`App.js`

```
import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import './App.css';

// components
import Post from './Posts/Post';
import Posts from './Posts/Posts';
import NewPostForm from './Posts/NewPost';

const defaultState = {
  isEditMode: false,
};

// Connecting our site to the GraphQL API
const client = new ApolloClient({
  uri: 'https://api-uswest.graphcms.com/v1/cjlvat5yu2e8001f853x10qgj/master',
  clientState: {
    defaults: defaultState,
  },
});

// MORE CODE
```

* **note** clientState offers a few different properties
    - defaults
    - resolvers
    - typeDefs
        + Where you pass in a client side schema
        + Not used for validation yet but some say it will be in the future
    - You do not need to use all 3 states at the same time
        + Pick and choose what you want to use
        + We are using `defaults`

## We now have state in our app
* How do we know?
* We'll use Apollo Dev Tools
* We want the ability to query a client side state variable the same way we would with an Apollo query
    - We want the ability to query off of our client data
        + Which in our case is `isEditMode`
        + How can we look for `isEditMode`?

## Using GraphiQL in Apollo Dev Tools
* Start it
* It may be glitchy so switch tabs, refresh window to make sure you have latest data
* Enter this as query

```
{
    isEditMode @client
}
```

* Make sure you check the `Load from cache` checkbox
* Click `Play`

### You should see this output
```
{
  "data": {
    "isEditMode": false,
    resolvers: {}
  }
}
```

* This is useful and means we now have some initial state
* Let's look at how useful this is in a practical example using our app
* **note** Bug in Apollo as of 9/12/2018... need to have resolvers set to an empty object.. more info in `99-troubleshooting.md` file in this directory

## Let's look at Post.js
`Post.js`

```
// MORE CODE

<Query query={POST_QUERY} variables={{ id: match.params.id }}>
  {({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    const { post } = data;

// MORE CODE
```

* We pull data off of an intial query and that was able to pull a post

## Multiple Queries in GraphQL!
* One of the majore perks of GraphQL is that you have the ability to query multiple things within one post

```
// MORE CODE

export default Post;

// Writing our query
const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      body
    }
    isEditMode @client
  }
`;
```

* That's all we have to do
    - There is no sub fields above
    - But if it was an object you would need sub fields
    - But `@client` lets apollo know that we are looking at Local State and it is not some sort of API call!!!
* Now we should have the ability to access `isEditMode` in our data!!

## Test in Apollo Dev Tools
* Best thing is to close and reopen entire chrome console
* `cmd` + `option` + `j` twice
* Click on Apollo tab of chrome dev bar
* We see that `isEditMode` is in our Cache
* We use React Dev tools and see `Posts` and exampine `query` prop and see it is not very helpful
    - We can't click query and see values we can use like a normal prop
    - Why isn't this good?
    - Because we are using the client... which is the cache
    - And the query... which is a query
    - Long story short... we should have `isEditMode` available to us on the `data` object

## Test
* Click on link and you will see name of post and not form
* Change defaultState to true

```
// MORE CODE

const defaultState = {
  isEditMode: true,
};

// MORE CODE
```

* And now you see the edit form!

## Set defaultState `isEditMode` back to false!

## Summary
* We can now combine our Local State queries with our remote queries and we don't have to hit a separate store like Redux
* We don't have to hit a separate DB
* We don't even have to tell Apollo where this info is found
    - It knows query post means it will be a remote query
    - And @client means it will be Local state
* This is one of the best things about Apollo and you can use it all over your app

## Next - Toggle and modify the query
* How to access the cache or the client directly and write data to it as if you were working with `this.setState()`
