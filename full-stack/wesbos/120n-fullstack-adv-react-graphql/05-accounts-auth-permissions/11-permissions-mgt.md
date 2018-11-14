# Permissions Management
* We are going to create a way to manage a user's permissions

## A lot going on here
* We need a query to fetch all the users and their permissions
* We also need a new mutation which will allow the user to update it
    - And at the same time we also need to check if the user who is updating permissions has the permission to update permissions!
    - Very complex
    - Get some coffee

## Let's take this one step at a time
### First - Get a query that lists users and their permissions
* We require an array be returned but the array can be empty so we will use this `[User]!`
    - We don't want to make the user itself required `[User!]` because then you could run into an issue where there is no users in your db or you specific filter returns no one and that would generated an error but we do want it to return an empty array `[]`

`backend/src/schema.graphql`

```
// MORE CODE

type Query {

  // MORE CODE

  users: [User]!
}

// MORE CODE
```

* We just modified our schema... what do we do when we modify our schema?
    - You set up a resolver

## Set up our Query for Users and their permissions
`backend/src/resolvers/Query.js`

```
// MORE CODE

  async users(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that');
    }
    // 2. Check if the user has the permissions to query all the users
    // 3. If they do, query all the users
  },
};

module.exports = Query;
```

* We use the check if user is logged in many times
    - `TODO` Add this as a separate function called `isLoggedIn` inside `utils` folder and make your code more DRY

### Check if user has permissions
* Special function
* We need this special function because this can be complicated
    - Example of why so complicated
        + You might have a user

```
// user
{
    name: 'John',
    permissions: ['ADMIN', 'ITEMUPDATE']
}
```

* But you also want to check if the user has ANY of these permissions

```
['PERMISSIONUPDATE', 'ADMIN']
```

* But we're not checking for all of these
* We are checking if we have any overlap between what they have and what we are looking for
* Here is the function

`backend/src/utils.js`

```
function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );
  if (!matchedPermissions.length) {
    throw new Error(`You do not have sufficient permissions

      : ${permissionsNeeded}

      You Have:

      ${user.permissions}
      `);
  }
}

exports.hasPermission = hasPermission;
```

* We take in the `user` and an array of permissions that are needed

```
function hasPermission(user, permissionsNeeded) {}
```

* Then we filter the user's permissions to see if any of them match the ones that we are specifically looking for

```
function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );

// MORE CODE
```

*  We loop over every single permission and check
    -  Is the permission that is need included in the `permissionsTheyHave` and if so, put it in the array
        +  And if that array has no length
            *  We throw an error

```
// MORE CODE

if (!matchedPermissions.length) {
  throw new Error(`You do not have sufficient permissions

    : ${permissionsNeeded}

    You Have:

    ${user.permissions}
    `);
}

// MORE CODE
```

* Above we show the error with both the `permissionsNeeded` and the `permissions` the user has
    - This helps with debugging
* Other wise we just keep going
* We export the commonJS way so we can use this function in other files

`Query.js`

```
const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils.js');

const Query = {

  // MORE CODE

  async users(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that');
    }

    // 2. Check if the user has the permissions to query all the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    // 3. If they do, query all the users
  },
};

module.exports = Query;
```

* We require the named export
* We call the function and pass it the user and the required permissions

### Return the users
```
// MORE CODE

async users(parent, args, ctx, info) {
  // 1. Check if they are logged in
  if (!ctx.request.userId) {
    throw new Error('You must be logged in to do that');
  }

  // 2. Check if the user has the permissions to query all the users
  hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

  // 3. If they do, query all the users
  return ctx.db.users({}, info);
},

// MORE CODE
```

* We pass in an empty `where` object because we just want to return all the `users`
* We also pass the `info`
    - Remember that `info` will contain the GraphQL query that contains the fields that we are requesting from the frontend

## Flip over to our frontend and test if it works
* Duplicate `pages/sells.js` and rename it `pages/permissions.js`

`permissions.js`

```
import React, { Component } from 'react';

// custom components
import PleaseSignIn from '../components/PleaseSignIn';

class PermissionsPage extends Component {
  render() {
    return (
      <div>
        <PleaseSignIn>
          <p>Permissions</p>
        </PleaseSignIn>
      </div>
    );
  }
}

export default PermissionsPage;
```

* Visit `/permissions` and you'll need to log in and then you'll see `Permissions` in the UI

### Create a Permissions component
* You don't want to put a whole bunch of stuff on a page, use a component

`components/Permissions.js`

```
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// custom components
import Error from './ErrorMessage';

// GraphQL queries
const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

class Permissions extends Component {
  render() {
    return (
      <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) => (
          <div>
            <Error error={error} />
          </div>
        )}
      </Query>
    );
  }
}

export default Permissions;
```

* Import our Permissions component into our `PermissionsPage`

`permissions.js`

```
import React, { Component } from 'react';

// custom components
import PleaseSignIn from '../components/PleaseSignIn';
import Permissions from '../components/Permissions';

class PermissionsPage extends Component {
  render() {
    return (
      <div>
        <PleaseSignIn>
          <Permissions />
        </PleaseSignIn>
      </div>
    );
  }
}

export default PermissionsPage;
```

* Start video at 10 minute mark
