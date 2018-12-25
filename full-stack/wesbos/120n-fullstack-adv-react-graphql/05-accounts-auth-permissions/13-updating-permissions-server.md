## Note rewatch this video for more backend details

# Updating Permissions on the Server
* Our clickable area for checkbox is small
* Let's make it bigger to improve the usability of our site

`components/styles/Table.js`

```
// MORE CODE

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
    label {
      background: red;
    }
  }

// MORE CODE
```

* View in browser and see checkboxes all labels have red bg

## Display full boxes for checkboxes
* Give the label a `display: block`

```
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
  label {
    background: red;
    display: block;
  }
}
```

* Still not working
* We need to match the label `id` with the input `id`

`Permissions.js`

```
// MORE CODE

          <td key={permission}>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input 
                id={`${user.id}-permission-${permission}`}
                type="checkbox"
                checked={permissions.includes(permission)}
                value={permission}
                onChange={this.handlePermissionChange}
              />
            </label>
          </td>

// MORE CODE
```

* Check checkboxes from anywhere in box and it will be clickable
* Remove the red bg as you no longer need it
* **note** If you have a label `for` attribute that matches the `id` attribute for an `id` then you can check the label and the checkbox will fill in in the associated input

## Paddding Issue and other minor cosmetic adjustments
* The `td` has padding

`Table.js`

```
// MORE CODE

  td,
  th {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    border-right: 1px solid ${props => props.theme.offWhite};
    padding: 5px;
    position: relative;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
    label {
      display: block;
      padding: 10px 5px;
    }
  }

// MORE CODE
```

##### Now we'll code the backend for our site #####

## updatePermissions schema
```
// MORE CODE

type Mutation {
  // MORE CODE

  updatePermissions(permissions: [Permission], userId: ID!): User
}

// MORE CODE
```

* Permission holds all our specified enum values
  - This stops people from making up any value they want to use and they are forced to use our values only

## What if I want to add an additional Permission?
* Add it into the `enum`
* Also add it inside the script file we were working on previously

### We also need to!
* Pass an `ID`
* Make sure it is required
* And finally, return the `User`

## Now we need to code our resolver that will match the schema we just coded
`Mutation.js`

```
// MORE CODE

  async updatePermissions(parent, args, ctx, info) {
    // 1. Check if they are logged in
    // 2. Query the current user
    // 3. Check if they have permissions to do this
    // 4. Update the permissions
  },
};

module.exports = Mutations;
```

### Now let's fill in the comments

`backend/src/resolvers/Mutation.js`

```
// MORE CODE

const { makeANiceEmail } = require('../email-templates/black-friday');
const { hasPermission } = require('../utils');

// MORE CODE

  async updatePermissions(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }
    // 2. Query the current user
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId,
        },
      },
      info
    );
    // 3. Check if they have permissions to do this
    hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);
    // 4. Update the permissions
  },
};

module.exports = Mutations;
```

* Make sure you include `hasPermission()` function
* For update permissions we can do either:
  - Update the Permission and then return the user
  - Or we can just return the query from this resolver

```
// MORE CODE

    // 4. Update the permissions
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions,
          },
        },
        where: {
          id: args.userId,
        },
      },
      info
    );
  },
};

module.exports = Mutations;
```

* What `data` needs to be set?
  - The `permissions` needs to be set to the `updated` permissions
    + Normally you would say `args.permissions`
      * But because Permissions is its own `enum` we have to use this `set` syntax that comes along with **prisma**
* `where`
  - Why did I not use `ctx.request.userId`?
    + Because we may not be updating our own user and we may be updating someone else so we have to pass the `userId` along for the ride along with the permissions

## Not on to the client side
* We want to write a Mutation that will fire as soon as you click on this `update` button 

`Permissions.js`

```
import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

// custom styles
import Table from './styles/Table';
import SickButton from './styles/SickButton';

// custom components
import Error from './ErrorMessage';

// array of all permissions
const possiblePermissions = ['ADMIN', 'USER', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE'];

// GraphQL queries
const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

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
                      <th key={permission}>{permission}</th>
                    ))}
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map(user => (
                    <UserPermissions key={user.id} user={user} />
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </Query>
    );
  }
}

class UserPermissions extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
  };

  state = {
    permissions: this.props.user.permissions,
  };

  handlePermissionChange = event => {
    const checkbox = event.target;
    const { permissions } = this.state;
    // take a copy of the current permissions
    let updatedPermissions = [...permissions];
    // determine if we need to remove or add this permission
    if (checkbox.checked) {
      // add it in to array!
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
    }
    this.setState({ permissions: updatedPermissions });
    console.log(updatedPermissions);
  };

  render() {
    const { user } = this.props;
    const { permissions } = this.state;

    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions,
          userId: user.id,
        }}
      >
        {(updatePermissions, { loading, error }) => (
          <>
            {error && (
              <tr>
                <td colSpan="8">
                  <Error error={error} />
                </td>
              </tr>
            )}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {possiblePermissions.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <input
                      id={`${user.id}-permission-${permission}`}
                      type="checkbox"
                      checked={permissions.includes(permission)}
                      value={permission}
                      onChange={this.handlePermissionChange}
                    />
                  </label>
                </td>
              ))}
              <td>
                <SickButton type="button" disabled={loading} onClick={updatePermissions}>
                  Updat
                  {loading ? 'ing' : 'e'}
                </SickButton>
              </td>
            </tr>
          </>
        )}
      </Mutation>
    );
  }
}

export default Permissions;
```

## Calling updatePermissions function inside the onChange handler
* This way everytime we make a change it will just update automatically (instead of always having to click the `UPDATE` button)
  - But how do you get one of these functions that are exposed by our mutation how do we get that outside
    + It its being exposed by our render prop and maybe this is a downside to render props
    + You could do something like this:

`Permissions.js`

```
<input
  id={`${user.id}-permission-${permission}`}
  type="checkbox"
  checked={permissions.includes(permission)}
  value={permission}
  onChange={this.handlePermissionChange}
/>
```

* Modify above chunk of code to this:

```
import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

// custom styles
import Table from './styles/Table';
import SickButton from './styles/SickButton';

// custom components
import Error from './ErrorMessage';

// array of all permissions
const possiblePermissions = ['ADMIN', 'USER', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE'];

// GraphQL queries
const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

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
                      <th key={permission}>{permission}</th>
                    ))}
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map(user => (
                    <UserPermissions key={user.id} user={user} />
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </Query>
    );
  }
}

class UserPermissions extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
  };

  state = {
    permissions: this.props.user.permissions,
  };

  handlePermissionChange = (event, updatePermissions) => {
    const checkbox = event.target;
    const { permissions } = this.state;
    // take a copy of the current permissions
    let updatedPermissions = [...permissions];
    // determine if we need to remove or add this permission
    if (checkbox.checked) {
      // add it in to array!
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
    }
    this.setState({ permissions: updatedPermissions });
    updatePermissions();
    // console.log(updatedPermissions);
  };

  render() {
    const { user } = this.props;
    const { permissions } = this.state;

    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions,
          userId: user.id,
        }}
      >
        {(updatePermissions, { loading, error }) => (
          <>
            {error && (
              <tr>
                <td colSpan="8">
                  <Error error={error} />
                </td>
              </tr>
            )}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {possiblePermissions.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <input
                      id={`${user.id}-permission-${permission}`}
                      type="checkbox"
                      checked={permissions.includes(permission)}
                      value={permission}
                      onChange={e => this.handlePermissionChange(e, updatePermissions)}
                    />
                  </label>
                </td>
              ))}
              <td>
                <SickButton type="button" disabled={loading} onClick={updatePermissions}>
                  Updat
                  {loading ? 'ing' : 'e'}
                </SickButton>
              </td>
            </tr>
          </>
        )}
      </Mutation>
    );
  }
}

export default Permissions;
```

* Now when you select checkboxes it will automatically update without clicking `UPDATE` button

## problem with setState running asynchronously
* Solution - you run a callback function inside of `setState({})`
  - Rarely will you run into this:
* Change this code:

```
  this.setState({ permissions: updatedPermissions });
  updatePermissions();
};
```

* To this:

```
  this.setState({ permissions: updatedPermissions }, () => {
    updatePermissions();
  });
};

render() {
```

* This will guarantee that state has been updated by the time updatePermissions()
* You can simply this function by just passing a reference to the function

```
  this.setState({ permissions: updatedPermissions }, updatedPermissions);
};
```

* **note** Wes reverted the code to not include the auto update permissions update

