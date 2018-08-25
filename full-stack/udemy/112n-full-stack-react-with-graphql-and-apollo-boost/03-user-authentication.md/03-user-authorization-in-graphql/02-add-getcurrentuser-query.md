# Add getCurrentUser Query
* Pass currentUser variable down to this piece of graphql express middleware

`server.js`

```
// MORE CODE

// Connect schemas with GraphQL
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      // pass in mongoose models
      Genealogy,
      User,
    },
  })
);

// MORE CODE
```

## Add currentUser to our request object
`server.js`

```
// MORE CODE

if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }

// MORE CODE
```

* wrap graphqlExpress with parenthesees
* destructure `currentUser`

`server.js`

```
// MORE CODE

// Connect schemas with GraphQL
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      // pass in mongoose models
      Genealogy,
      User,
      currentUser,
    },
  }))
);

// MORE CODE
```

## Create new query - getCurrentUser
`schema.js`

```
// MORE CODE

type Query {
  getAllGenealogies: [Genealogy]

  getCurrentUser: User
}

// MORE CODE
```

## Define getCurrentUser in resolvers.js
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
        model: 'Genealogies',
      });
    },
  },
  // MORE CODE
```

`User.js`

```
// MORE CODE

const UserSchema = new Schema({

    // MORE CODE

  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Genealogy',
  },
});

// MORE CODE
```

* In our User model we have a favorites field
* It has a ref of Genealogy

`schema.js`

* Our favorites has an array of IDs

```
type User {
  _id: ID,
  username: String! @unique
  password: String!
  email: String! @unique
  joinDate: String
  favorites: [Genealogy]
}
```

## Calling `populate()` method
* When populate() is called it will inject an entire Genealogy model within it

```
getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username,
      }).populate({
        path: 'favorites',
        model: 'Genealogies',
      });
      return user;
    },
  },
```

* We return the user variable we just created
* So we will just get back an array of Genealogies instead of just IDs

## withSession
* This is where we will be performing that query we just created

### Create  /components/withSession.js
* `withSession` will be a HOC (Higher Order Component)
* We won't need `error` in this case 

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
```

* One arrow function where we'll pass in props
* A nested arrow function where we'll have the body of the component
* Inside that will be our Query component which will have its render props
* We will only use data and loading inside Query
* We will return a Component (so this withSession HOC will wrap various components and we'll be able to return it and we'll pass down all those props for each of those components (we pass it down with `{...props}` in the component itself))

## Inside our queries folder we'll create `GET_CURRENT_USER`

`client/src/queries/index.js`

```
// MORE CODE

// User Queries

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
    }
  }
`;
// MORE CODE
```

## Add that query to our client component
* withSession will be used on many pages so that is why this component is different then the others

`withSession.js`

```
import React from 'react';

import { Query } from 'react-apollo';

import { GET_CURRENT_USER } from '../queries';

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading }) => {
      if (loading) return null;
      return <Component {...props} />;
    }}
  </Query>
);
```

## Add withSession to client/index.js
`index.js`

```
// MORE CODE

import './index.css';
import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import withSession from './components/withSession'; // add

import ApolloClient from 'apollo-boost';

// MORE CODE
```

## Use withSession to wrap our Components
* Best way to do this is to wrap our `Root` Component with **withSession**

`client/index.js`

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
* For now we won't pass it down to each component but lets see what it looks like

`withSession.js`

```
import React from 'react';

import { Query } from 'react-apollo';

import { GET_CURRENT_USER } from '../queries';

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading }) => {
      if (loading) return null;
      console.log(data); // add this

      return <Component {...props} />;
    }}
  </Query>
);

export default withSession; // don't forget to export it
```

## Review our work to see what we did
* `server.js`
    - We are passing our currentUser down to our graphqlExpress middleware

```
// MORE CODE

// Connect schemas with GraphQL
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      // pass in mongoose models
      Genealogy,
      User,
      currentUser,
    },
  }))
);

// MORE CODE
```

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
        model: 'Genealogies',
      });
      return user;
    },

// MORE CODE
```

* We get the current user from the `currentUser` variable
* Once we find it in our database 

`User.findOne({ username: currentUser.username })`

* Once we find it, we return it

## Then in withSession.js
* We perform the `GET_CURRENT_USER` Query
* We get the data of our current user and withSession will allow us to pass all the data down to every component that we choose
    - And we can do that using the `withSession` HOC
    - Later on we'll see the logic we'll apply to give it to every component

## Test
* `http://localhost:3000/signin`
* You will get null for getCurrentUser (chrome console) if no user is logged in
* Log in and see what you get when you refresh page

## Houston we have a problem
* We misspelled the Model name `Genealogy`

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
        model: 'Genealogy', // fix this line
      });
      return user;
    },

    // MORE CODE
```

## Testing locally
* You may have to shut down both servers mongo and app
* Kill node and mongod
* Restart them both
* After logging in you should see current user with info we specified in query

![getCurrentUser user object returned](https://i.imgur.com/mO1vkty.png)

* Above is from the token that we are getting from our client that is being sent through our backend, it is [verifying our token](https://i.imgur.com/ic2mYxt.png), we perform a query to get all that user data, and now our client knows all about it

## Try this test
1. Sign in again with a different user
2. You will see new token
3. Refresh
4. You will see new user data
