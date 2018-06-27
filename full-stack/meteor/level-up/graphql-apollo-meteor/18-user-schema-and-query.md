# User Schema & Query
* We will setup our user schema
* We will get logged in
* Then we can query off of our user schema to improve our interface to be able to show login and register when the user is logged in so they are not all showing all at once

`imports/api/users/User.graphql`

```
type User {
  _id: String
  email: String
}
```

`register-api.js`

```
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';
import UsersSchema from '../../api/users/User.graphql';
import ResolutionResolvers from '../../api/resolutions/resolvers';

const testSchema = `
type Query {
 hi: String
 resolutions: [Resolution]
}
`;

const typeDefs = [testSchema, ResolutionsSchema, UsersSchema];
// MORE CODE
```

## Create our resolver
`api/users/resolvers.js`

```
export default {
  Query: {
    user(obj, args, { user }) {
      return user || {};
    },
  },
};
```

* If use isn't logged in user could be undefined so we say `return user || {}` to be safe because if this resolver needs to return an object this could cause problems
* We are doing nothing with obj or args but we can pull out user from `context` so we can use it

## Register our user into our API
```
// MORE CODE
const testSchema = `
type Query {
 hi: String
 resolutions: [Resolution]
 user: User
}
`;
// MORE CODE
```

## Take for a test drive
* Logout

`localhost/graphql`

```
{
    user {
      _id
    }
}
```

* Hit play and you'll get this result set

```
{
  "data": {
    "user": {
      "_id": null
    }
  }
}
```

* This is a great way to check if someone is not logged in
* important note:

`imports/api/users/User.graphql`

```
type User {
  _id: String!
  email: String
}
```

* If we made _id required and we were not logged in we would get an error
* If we removed the `_id: String!` and made it `_id: String` we would have to update our server code by updated a comment in `register-api.js` (this is because of a bug but graphql won't update without doing this)

## Log in now
* Use our preused login info
* Hit play again in graphql and you'll see

```
{
  "data": {
    "user": {
      "_id": "erKBgwmDLL6JGzAc3"
    }
  }
}
```

* Obviously your `_id` will be different

## Use graphql to pull out Resolutions and users info
```
{
  resolutions {
    _id
    name
  }
  user {
    _id
    email
  }
}
```

* Results in:

```
{
  "data": {
    "resolutions": [
      {
        "_id": "7kf8AZFCM4XYwJ7Fy",
        "name": "jump rope more"
      }
    ],
    "user": {
      "_id": "erKBgwmDLL6JGzAc3",
      "email": null
    }
  }
}
```

* So we'll paste in this graphql query into:

`App.js`

```
// MORE CODE
const resolutionsQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
    }
    user {
      _id
    }
  }
`;
// MORE CODE
```

* Now we should have a user prop brought into our react component

`App.js`

```
// MORE CODE
const App = ({ loading, resolutions, client, user }) => {
  if (loading) return null;
  return (
    <div>
      {user._id ? (
        <button
          onClick={() => {
            Meteor.logout();
            client.resetStore();
          }}
        >
          Logout
        </button>
      ) : (
        <div>
          <LoginForm client={client} />
          <RegisterForm client={client} />
        </div>
      )}
      <ResolutionForm />
      <ul>
        {resolutions.map(resolution => (
          <li key={resolution._id}>{resolution.name}</li>
        ))}
      </ul>
    </div>
  );
};
// MORE CODE
```

* Why is email returning null?

```
{
  resolutions {
    _id
    name
  }
  user {
    _id
    email
  }
}
```

* results in

```
{
  "data": {
    "resolutions": [
      {
        "_id": "7kf8AZFCM4XYwJ7Fy",
        "name": "jump rope more"
      }
    ],
    "user": {
      "_id": "erKBgwmDLL6JGzAc3",
      "email": null
    }
  }
}
```

* Email is null because in meteor it is stored in an object called emails that is an object full of arrays that has an address and a validated object and stuff like that
