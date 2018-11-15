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
            <p>Hey</p>
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

## Remember
* When creating client side GraphQL add suffix `_QUERY` or `_MUTATION` as they help with debugging
* Make sure you QUERY or MUTATION shell has the same named query or mutation (this helps prevent anonymous functions inside the GraphQL Playground
* Add `gql` from `graphql-tag` so you can write GraphQL inside your JavaScript
## Watch out for these errors
* Duplicate declaration Can't have to stateless functions be same name
  - Better to name
    + page --> PermissionsPage
    + components --> Permissions

## Houston we have a problem
* `Shoot! Cannot read property 'permissions' of undefined`
  - This error occurs because we are passing `user` to `hasPermission`

`Query.js`

```
// MORE CODE

hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

// MORE CODE
```

* And if we open up our `utils.js`

```
function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>

// MORE CODE
```

* But we are using inside `utils.js` `user.permissions`

## We made a mistake
* We need to populate the user on EVERY SINGLE REQUEST
  - Currently, we are only populating the `userId`

### Do you remember how we populated the `userId` on every single request?
* We did id using **Express Middleware**

### Let's write another middleware!
* This middleware will populate the `user` on EVERY SINGLE REQUEST
* Find the spot where we decoded the JWT so we can put the `userId` on each request

`backend/src/index.js`

```
// MORE CODE

// Use express middleware to populate current user
// decode the JWT so we can get the user ID on each request
server.express.use((req, res, next) => {
  // grab our token from the cookie
  const { token } = req.cookies;
  // console.log(token);
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId;
  }
  next();
});

// MORE CODE
```

## Create middleware that populates the user on each request

`src/index.js`

* We create our new middleware
* We make sure our user is logged in
  - We **return** `next()` because we want leave the `middleware` and go no further

```
// MORE CODE

server.express.use((req, res, next) => {

  // MORE CODE

});

// 2. Create a middleware that populates the user on each request
server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  next();
});

// MORE CODE
```

* Now we query our `db`
    - Note that we required the `db` file which points to our **prisma.io** `db`
* We are targeting our db which returns a Promise so we use **async/await**
* We query our user collection looking for a user that has the `userId` on the req (request object)
    - If the user is logged in this value will appear on the server
    - If the user is not logged in, this value will be `null`
* We need to pass another `argument` (Remember that `query` takes two arguments)
  - The first `arg`
    + Is the `where` query (already done)
  - The second `arg` is we need to know what fields we are grabbing
    + We put this inside single quotes and it will be a simple GraphQL query
      * `'{ id, permissions, email, name }'`
* We console.log() the user
* We make sure to use `next()` so our code doesn't freeze

```
// MORE CODE

// 2. Create a middleware that populates the user on each request
server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await db.query.user(
    {
      where: {
        id: req.userId,
      },
    },
    '{ id, permissions, email, name }'
  );
  console.log(user);
  next();
});
// MORE CODE
```

* Now all request made to the server will show in the terminal
* You will see something like this:

```
{ id: 'cjock316spnp20a014w5i40on',
  permissions: [ 'USER' ],
  email: 'bob@bob.com',
  name: 'bob' }
```

* Click a nav link to `/persmissions` and you will see the user object appear in the terminal with each click (and each request)

### Make sure we add the user onto the `req`
```
// MORE CODE

server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await db.query.user(
    {
      where: {
        id: req.userId,
      },
    },
    '{ id, permissions, email, name }'
  );
  req.user = user; // ADD THIS LINE!
  next();
});

// MORE CODE
```

## Test in browser
* Refresh `/permissions` page
* It should now work!

## But we still have a problem
* We get this error

`Shoot!You do not have sufficient permissions : ADMIN,PERMISSIONUPDATE You Have: USER`

* We added this detail in the error to help us with debugging

## This is a kind of "Chicken and the Egg problem"
* How do we get ADMIN or PERMISSIONUPDATE permission if you don't have the UI and how can you build the UI if you don't have the permission?

### Options
#### Custom Code
* Write some code where the first person who signs up for this app is ADMIN
* And you could do that when you sign up, you query all the users and if there are no existing users, then that person is the ADMIN

#### Manual
* Just go into db and add the permissions as you need to
  - This is easier and we'll do this
  - Create an account with your name and give it ADMIN
  - First register your name
* Open your name inside `prisma.io` remote `db`
* Change `permissions` from:
  - This was the default permission all new users get when they are created

```
["USER"]
```

* To this:

```
["USER", "ADMIN"]
```

* Click `UPDATE NODE` button

## Another error
* Make this change to `Query.js`
  - This path was wrong `ctx.db.query.users()`

```
// MORE CODE

async users(parent, args, ctx, info) {
  // 1. Check if they are logged in
  if (!ctx.request.userId) {
    throw new Error('You must be logged in to do that');
  }
  console.log(ctx.request.userId);
  // 2. Check if the user has the permissions to query all the users
  hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
  // 3. If they do, query all the users
  return ctx.db.query.users({}, info); // MODIFY THIS LINE!!!!
},

// MORE CODE
```

* I add a log to show the `userId` on the server (Check out the terminal and you will see it)

![userId on server](https://i.imgur.com/vNorFc5.png)

## Refresh the browser
* The error is gone!

### Show the `data` in our console in our `Permissions`
* We will use a `||` (logical **OR** operator) to show our data in the console and also implicitly return our content and/or Error

`Permissions.js`

```
// MORE CODE

class Permissions extends Component {
  render() {
    return (
      <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) =>
          console.log(data) || (
            <div>
              <Error error={error} />
              <p>Hey</p>
            </div>
          )
        }
      </Query>
    );
  }
}

// MORE CODE
```

* This is a `neat trick` where we can log out the data and still see our content using `||`
* Open the console and expand `users` and you'll see we get all our users witht the fields showing that we specified in our client side GraphQL
  - email, id, name, permissions

## Now write code to loop over all users and get them showing up
* We'll use this style Table from `styles/Table.js`

`Table.js`

```
import styled from 'styled-components';

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  border: 1px solid ${props => props.theme.offWhite};
  thead {
    font-size: 10px;
  }
  td,
  th {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    border-right: 1px solid ${props => props.theme.offWhite};
    padding: 10px 5px;
    position: relative;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
  }
  tr {
    &:hover {
      background: ${props => props.theme.offWhite};
    }
  }
`;

export default Table;
```

`Permissions.js`

```
// MORE CODE

// custom styles
import Table from './styles/Table';

// MORE CODE

class Permissions extends Component {
  render() {
    return (
      <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) =>
          console.log(data) || (
            <div>
              <Error error={error} />
              <div>
                <h2>Manage Permissions</h2>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>{data.users.map(user => user.name)}</tbody>
                </Table>
              </div>
            </div>
          )
        }
      </Query>
    );
  }
}

export default Permissions;
```

## View in browser
* And you should see the `user` **names** output inside a styled table

## Add a heading for every permission
* This will be a heading/column in our table
* We'll create a simple array with all our permissions
    - We could also write a query here to query this from the backend of possible permissions and that query would return a list to the client and we could loop over it (but it is easier to maintain an array of possible permissions)

`Permissions.js`

```
// MORE CODE

// custom components
import Error from './ErrorMessage';

// array of all permissions
const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
];

// GraphQL queries
const ALL_USERS_QUERY = gql`

// MORE CODE
```

* Feel free to make up your own permissions
  - But make sure to mirror them to the ENUM we created earlier on the backend

`Permissions.js`

```
// MORE CODE

class Permissions extends Component {
  render() {
    return (
      <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) =>
          console.log(data) || (
            <div>
              <Error error={error} />
              <div>
                <h2>Manage Permissions</h2>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      {possiblePermissions.map(permission => (
                        <th>{permission}</th>
                      ))}
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.users.map(user => (
                      <User user={user} />
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )
        }
      </Query>
    );
  }
}

class User extends Component {
  render() {
    const { user } = this.props;

    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    );
  }
}

export default Permissions;
```

## View in browser
* The columns and headings now work with name and email

### Loop over the user permissions
* And add checkboxes if they have those permissions or not

`Permissions.js`

```
// MORE CODE

class User extends Component {
  render() {
    const { user } = this.props;

    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {possiblePermissions.map(permission => (
          <td>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input type="checkbox" />
            </label>
          </td>
        ))}
      </tr>
    );
  }
}

export default Permissions;
```

### View in browser
* You will now see all the checkboxes

### And nice button
`Permissions.js`

```
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// custom styles
import Table from './styles/Table';
import SickButton from './styles/SickButton';

// custom components
import Error from './ErrorMessage';

// array of all permissions
const possiblePermissions = ['ADMIN', 'USER', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE'];

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
              <div>
                <h2>Manage Permissions</h2>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      {possiblePermissions.map(permission => (
                        <th>{permission}</th>
                      ))}
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.users.map(user => (
                      <User user={user} />
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )
        }
      </Query>
    );
  }
}

class User extends Component {
  render() {
    const { user } = this.props;

    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {possiblePermissions.map(permission => (
          <td>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input type="checkbox" />
            </label>
          </td>
        ))}
        <td>
          <SickButton>UPDATE</SickButton>
        </td>
      </tr>
    );
  }
}

export default Permissions;
```

* We removed our `console.log()`
### Summary
* We queried all our users
* We did lots of backend work to make sure if anyone is running this query they do have access to be able to run this query
* We check for errors
* Take all possible permissions and loop over them
* Loop over each of the users
* For each user we loop over the permissions and output checkboxes for each one

## Next
* Add logic to check or uncheck depending on if we have that permission or not and then we'll write the mutation so that when someone clicks on our UPDATE button it will go to the backend and perform that mutation
