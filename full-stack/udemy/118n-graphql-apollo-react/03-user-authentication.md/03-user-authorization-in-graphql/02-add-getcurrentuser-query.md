# Add getCurrentUser Query

### Add `currentUser` to the context of apollo server
* Destructure `currentUser` from the Apollo context which has the request object passed to it

`server.js`

```
// MORE CODE

// create apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ Cologne, User, currentUser: req.currentUser }),
});

// MORE CODE
```

## Create new query - `getCurrentUser`
* Now we need a way to get the `currentUser` anytime we need it using GraphQL

`schema.js`

* Notice that `getAllColognes` will return an array
* But `getCurrentUser` will return one user

```
// MORE CODE

type Query {
  getAllColognes: [Cologne]

  getCurrentUser: User
}

// MORE CODE
```

## Define `getCurrentUser` in resolvers.js
`resolvers.js`

```
// MORE CODE
// note - this block of code goes inside Query
getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username,
      }).populate({
        path: 'favorites',
        model: 'Cologne', // make sure this is singular
      });
    return user; // if you leave this out you won't get the user
  },
  // MORE CODE
```

* Things to point out:
  - When we call this method we need to pass it the `currentUser`
  - We find one user (there should only be one because all usernames are unique)
  - We use mongoose's `populate()` to attach all the favorite colognes to the found `currentUser`

`models/User.js`

```
// MORE CODE

const UserSchema = new Schema({

    // MORE CODE

  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Cologne',
  },
});

// MORE CODE
```

* In our `User` model we have a `favorites` field
* It has a **ref** of `Cologne`

`schema.js`

* Our `favorites` has an array of IDs
  - Think favorites holds a value something like this (if it had 3 favorite cologne IDs)

```
['5bb64ebc20a9618d192bbd12', '5bb64ebc20a9618d192bbc33', '5bb64ebc20a9618d192bbp28']
```

```
type User {
  _id: ID,
  username: String!
  password: String!
  email: String!
  joinDate: String
  favorites: [Cologne]
}
```

## Calling `populate()` method
* When `populate()` is called it will _inject an entire Cologne model within it_

```
getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username,
      }).populate({
        path: 'favorites',
        model: 'Cologne', // make sure this is singular
      });
      return user; // add this line
  },
```

* We return the `user` variable we just created
* So we will just get back an array of Colognes instead of just IDs

## withSession
* This is where we will be performing that query we just created

### Create  /components/withSession.js
* `withSession` will be a HOC (Higher Order Component)

#### Why do I need to use a HOC?
* Use them when you need to share the same functionality across multiple components
  - Example:
    + How do we manage the `state` of currently logged in users inside our app
    + We could manage that `state` across all of the components that need `state` but that would be a headache
    + Instead we could create a HOC to separate the logged in user `state` into a container component
      * Then we could pass that `state` to the components that will make use of it

##### Presentation components
* These are components that receive `state` from the HOC
* `state` gets passed to them and they conditionally render UI based on it
* They don't care about management of `state` which means they will be `stateless functional components`

#### How to HOCs work?
* HOCs take a component and return a component
  - They come in handy when you are architecturally ready for separating container components from presentation components

`withSession.js`

```
import React from 'react';

import { Query } from 'react-apollo';

const withSession = Component => props => (
  <Query>
    {({ data, loading }) => {
      return <Component {...props} />;
    }}
  </Query>
);

export default withSession;
```

* We won't need `error` in this case 
* One arrow function where we'll pass in `props`
* A nested arrow function where we'll have the body of the component
* Inside that will be our `Query` component which will have its `render props`
* We will only use `data` and `loading` inside `Query`
* We will return a Component (so this `withSession` HOC will wrap various components and we'll be able to return it and we'll pass down all those props for each of those components (we pass it down with `{...props}` in the component itself))

## Try it out in the Playground first

```
query GET_CURRENT_USER_QUERY {
  getCurrentUser {
    username
    email
    joinDate
  }
}
```

## Inside our queries folder we'll create `GET_CURRENT_USER_QUERY`

## Add the shell
`client/src/queries/index.js`

```
// MORE CODE

// User Queries
export const GET_CURRENT_USER_QUERY = gql`
  // write code here
`;
// MORE CODE
```

## Paste in our working Playground code
```
export const GET_CURRENT_USER_QUERY = gql`
  query GET_CURRENT_USER_QUERY {
    getCurrentUser {
      username
      email
      joinDate
    }
  }
`;
```

## Add that query to our client component
* `withSession` will be used on many pages so that is why this component is different then the others
  - We are reusing it to manage our `currentUser` state in a more efficient way and that is the reason for using a HOC

`withSession.js`

```
import React from 'react';

// GraphQL
import { Query } from 'react-apollo';
import { GET_CURRENT_USER_QUERY } from '../queries';

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return null;
      return <Component {...props} />;
    }}
  </Query>
);

export default withSession;
```

## Add `withSession` to `client/src/index.js`

`index.js`

```
// MORE CODE

import './index.css';
import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import withSession from './components/withSession'; // add

// MORE CODE
```

## Use `withSession` to wrap our Components
* Best way to do this is to wrap our `Root` Component with **withSession**

`client/src/index.js`

```
// MORE CODE
const RootWithSession = withSession(Root)

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);
```

* Now we have access to whatever we are returning from our `withSession` Component (aka the **data** that we are getting)

## Log for now
* For now we won't pass it down to each component but lets see what it looks like by logging `data` out

`withSession.js`

```
import React from 'react';

import { Query } from 'react-apollo';

import { GET_CURRENT_USER_QUERY } from '../queries';

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return null;
      console.log(data); // add this

      return <Component {...props} />;
    }}
  </Query>
);

export default withSession;
```

* If you log in you should see the currently logged in user in the client console
* If you delete the token and refresh the page you will see getCurrentUser is 'null'

## Review our work to see what we did
* We pass `currentUser` to the **context** and that's what makes it available in our `resolvers.js`

`resolvers.js`

```
// MORE CODE

getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username,
      }).populate({
        path: 'favorites',
        model: 'Colognes',
      });
      return user;
    },

// MORE CODE
```

* We get the **current logged in user** from the `currentUser` variable
* Once we find it in our database
* Remember to return the `user`!
  - If you don't you will never have access to the user

`User.findOne({ username: currentUser.username })`

* Once we find it, we return it

## Then in `withSession.js`
* We perform the `GET_CURRENT_USER` Query
* We get the data of our **current logged in user** and `withSession` will allow us to pass all the data down to every component that we choose
    - And we can do that using the `withSession` HOC
    - Later on we'll see the logic we'll apply to give it to every component

## Test
* `http://localhost:3000/signin`
* You will get `null` for `getCurrentUser` (chrome console) if no user is logged in
* Log in and see what you get when you refresh page

![getCurrentUser user object returned](https://i.imgur.com/mO1vkty.png)

* Below is from the `token` that we are getting from our `client` that is being sent through our backend
* It is verifying our token

![verifying our token](https://i.imgur.com/ic2mYxt.png)

* We perform a query to get all that user data, and now our `client` knows all about it

## Try this test
1. Sign in again with a different user
2. You will see new token
3. Refresh
4. You will see new user data

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add getCurrentUser query`

## Push to github
`$ git push origin auth`

## Additional Resources
* [What are higher order components](https://css-tricks.com/what-are-higher-order-components-in-react/)
* [HOC tutorial for React](https://www.youtube.com/watch?v=A9_9gQIkfx4)
