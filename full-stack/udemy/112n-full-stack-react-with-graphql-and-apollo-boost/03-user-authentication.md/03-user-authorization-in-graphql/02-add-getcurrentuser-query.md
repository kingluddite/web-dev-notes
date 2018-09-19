# Add getCurrentUser Query
* Pass `currentUser` variable down to this piece of `graphql` express middleware

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

## Add currentUser to our request object (`req`)
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

1. Wrap graphqlExpress with parentheses
2. Destructure `currentUser`

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
// note - this block of code goes inside Query
getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username,
      }).populate({
        path: 'favorites',
        model: 'Genealogy', // make sure this is singular
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

* In our `User` model we have a `favorites` field
* It has a **ref** of `Genealogy`

`schema.js`

* Our `favorites` has an array of IDs

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
* When `populate()` is called it will inject an entire Genealogy model within it

```
getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username,
      }).populate({
        path: 'favorites',
        model: 'Genealogy', // make sure this is singular
      });
      return user; // add this line
    },
  },
```

* We return the `user` variable we just created
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

* One arrow function where we'll pass in `props`
* A nested arrow function where we'll have the body of the component
* Inside that will be our `Query` component which will have its `render props`
* We will only use `data` and `loading` inside `Query`
* We will return a Component (so this `withSession` HOC will wrap various components and we'll be able to return it and we'll pass down all those props for each of those components (we pass it down with `{...props}` in the component itself))

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
* `withSession` will be used on many pages so that is why this component is different then the others

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

* If you log in you should see the currently logged in user in the client console
* If you delete the token and login, `getCurrentUser` won't appear but it will show if you refresh the browser

## Review our work to see what we did
* `server.js`
    - We are passing our `currentUser` down to our graphqlExpress middleware

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

* We get the **current logged in user** from the `currentUser` variable
* Once we find it in our database 

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

## Houston we MAY have a problem
* Error ` MissingSchemaError: Schema hasn't been registered for model "Genealogies".`
* Did you get this error? I did when I first did this and it a was because I misspelled the Model name `Genealogy`
  - Remember we always spell model names with a `singular` name
  - It is not required but [recommended when working with Mongoose](https://stackoverflow.com/questions/10547118/why-does-mongoose-always-add-an-s-to-the-end-of-my-collection-name)
    + You can override this default behavior of Mongoose but I believe it is mimicking the naming convention in Rails
      * The model is singular and Capitalized
      * The Collection is automatically named the plural of the model name
        - [Other article on this](https://samwize.com/2014/03/07/what-mongoose-never-explain-to-you-on-case-sentivity/)
          + Let’s assume the model I have is ‘Campaign’
            * mongodb collection name is case sensitive (‘Campaigns’ is different from ‘campaigns’)
            * mongodb best practises is to have all lower case for collection name (‘campaigns’ is preferred)
            * mongoose model name should be singular and upper case (‘Campaign’)
            * mongoose will lowercase and pluralize with an ‘s’ so that it can access the collection (‘Campaign’ » ‘campaigns’)
            * Knowing this is especially useful if you are dealing with existing collections

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

## Local MongoDB tips!
* You may have to shut down both servers mongo and app
* Kill `node` and `mongod`
* Restart them both
* After logging in you should see current user with info we specified in query

![getCurrentUser user object returned](https://i.imgur.com/mO1vkty.png)

* Above is from the `token` that we are getting from our `client` that is being sent through our backend
* It is verifying our token

![verifying our token](https://i.imgur.com/ic2mYxt.png)

* We perform a query to get all that user data, and now our client knows all about it

## Try this test
1. Sign in again with a different user
2. You will see new token
3. Refresh
4. You will see new user data
