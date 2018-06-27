# Connecting Meteor Accounts to Apollo
## Let's add a way to logout

`App`

```
const App = ({ loading, resolutions }) => {
  if (loading) return null;
  return (
    <div>
      <LoginForm />
      <RegisterForm />
      <ResolutionForm />
      <button onClick={() => Meteor.logout()}>Logout</button>
      <ul>
// MORE CODE
```

* Now use `> Meteor.userId()` (you are logged in - if not login with email and password)
* Then click logout button
* `> Meteor.userId()` - will return null (you have successfully logged out)

## Let's make the server aware of Meteor.user
* We will set in the Meteor user context inside the resolvers

## Then we'll write our graphql query
* So we can pull our user data and schema

`register-api.js`

* The last line says `createApolloServer({ schema });`
* This comes from the **meteor/apollo** package
    - The meteor/apollo package is doing something to make sure the current user is available

## client stuff
`imports/startup/client/index.js`

* We now head to the client and we need to make sure the user login token available to apollo
    - We will do this with ApolloLink (similar to HttpLink)
    - ApolloLink is new to Apollo2, it enables you to use middleware
        + used for persistant caching
        + used for local client side state
        + we will use it to connect to meteors accounts

`imports/startup/client/index.js`

```
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link'; // add this line
// MORE CODE
```

* We didn't install `apollo-link` but it is part of `apollo-client-preset` package
* Add a way to grab our user token

```
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, from } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from '../../ui/App';

const httpLink = new HttpLink({
  uri: Meteor.absoluteUrl('graphql'),
});

const authLink = new ApolloLink((operation, forward) => {
  const token = Accounts._storedLoginToken();
  operation.setContext(() => ({
    headers: {
      'meteor-login-token': token,
    },
  }));
  return forward(operation);
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache,
});

const ApolloApp = () => (
// MORE CODE
```

## Summary
* We just grabbed our login token and made sure apollo is aware of it using `from` **authLink**
* We needed to make sure Apollo knew that this user existed and that it was an authenticated logged in user
    - And that is what we did in the above code and the server register-api's file
    - Apollo is now aware that Meteor has an account system and that we are logged in
    - And it's given our user available inside the **context** object

## What is `context`?
* Open our resolvers

`resolvers.js`

* We will output context because that is where user info will be stored on the server

```
import Resolutions from './resolutions';

export default {
  Query: {
    resolutions(obj, args, context) {
      console.log(context);
      return Resolutions.find({}).fetch();
    },
  },
  // MORE CODE
```

* Refresh page and you will see an empty object (this is the context)
* Login again and submit
* Nothing
* Refresh browser and you'll see

```
 {}
 { user:
    { _id: 'erKBgwmDLL6JGzAc3',
      createdAt: 2018-06-26T02:41:45.380Z,
      services: { password: [Object], resume: [Object] },
      emails: [ [Object] ] },
      userId: 'erKBgwmDLL6JGzAc3' }
```

* But how do we grab the user id out of context?

```
// MORE CODE
export default {
  Query: {
    resolutions(obj, args, { userId }) {
      console.log(userId);
      return Resolutions.find({}).fetch();
    },
  },
 // MORE CODE
```

* That will output just the userId in the server terminal

## Next - We want to attach our tasks to the user specifically
* We can pass in userId to our Resolutions.find()
* This will return an empty set

```
// MORE CODE
export default {
  Query: {
    resolutions(obj, args, { userId }) {
      console.log(userId);
      return Resolutions.find({
        userId,
      }).fetch();
    },
  },

// MORE CODE
```

* Why empty?
    - We didn't create the tasks and associate them with a user
    - Even though we are logged in
    - We did create resolutions
    - There is no property `userId` on the resolution objectk
