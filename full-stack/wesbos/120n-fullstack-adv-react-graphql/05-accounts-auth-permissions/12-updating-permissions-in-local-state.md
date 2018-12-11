# Updating Permissions in Local State
* I logged in but my user did not have admin privileges
* Here is the error I received in Terminal on page refresh `http://localhost:7777/permissions`

```
// MORE CODE

[GraphQL error]: Message: You do not have sufficient permissions

      : ADMIN,PERMISSIONUPDATE

      You Have:

      USER
      , Location: [object Object], Path: users
GraphQL error occurred [getDataFromTree] { Error: GraphQL error: You do not have sufficient permissions

      : ADMIN,PERMISSIONUPDATE

      You Have:

      USER
// MORE CODE
```

* I had to update them on prisma
* I looked on prisma and saw a different user had access to `["User","ADMIN"]` so I removed token using the CDTs and logged in with the user with correct permissions

`http://localhost:7777/permissions`

* Now I am in the site and see the permissions

## Hooking up permission with our table
* If user has that permission it will be checked
* If the user does not have that permission it will show unchecked
* We will code mutations to update a user's permission

`Permissions.js`

```
// MORE CODE

import gql from 'graphql-tag';
import PropTypes from 'prop-types';

// MORE CODE

class User extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

// MORE CODE
```

* Above is normally how you would use PropTypes to make sure an object is required
    - But we can take it a step further and `shape` it because we know that in order to pass in a user, we need their `name`, `email`, `id` and `permissions` so we can shape the **PropTypes** to have those subfields

## shape PropTypes
`Permissions.js`

```
// MORE CODE

class User extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
  };

// MORE CODE
```

* We want them all required so we tag on on `isRequired` that covers all values

## Set some initial `state`
* Our permissions loops over all of our users
* To inject the permissions into the specific user and `seed` data and we will set the permissions internally in this user

```
// MORE CODE

class User extends Component {
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

// MORE CODE
```

## Bad Practice: Don't use props to populate initial state
* The reason is here we are taking props that are being fed into the user and setting them into `state`
* But if they were ever to change at the higher level, they would not be updated in our `state` above and this causes a problem you never want to have in React where you have differing data in 2 different spots
* You always want to have 1 source of truth
* But this is totally fine in this use case because we are `seeding` the data (meaning the initial data is coming from props but then whenever somebody changes a permission inside of the user than it will be updated to `state` and then it will be sent off to the backend)

## Totally Fine Practice: Using props to populate initial state when you are using it as seeding of initial state and if it were changed up top (it would never change in our use case but if it were, it doesn't matter because we have our own internal state)

## Update our User component
* We will rename from User to `UserPermissions`

`Permissions.js`

```
// MORE CODE

<tbody>
  {data.users.map(user => (
    <UserPermissions user={user} />
  ))}
</tbody>

// MORE CODE

class UserPermissions extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
  };

// MORE CODE
```

* Now you will see when you roll over Permissions table UserPermission has a state of permissions equal to an array of enum values

## PropTypes, propTypes, prop-types
* Common misspelling of these
    - `prop-types` is package you imported
    - `PropTypes` is the package
    - The property on PropTypes is `propTypes`

## Fix errors
* `Each child in an array or iterator should have a unique "key" prop`
* `Check the render method of 'Query'`

`Permissions`

```
// MORE CODE

<th>Email</th>
{possiblePermissions.map(permission => (
  <th key={permission}>{permission}</th>
))}

// MORE CODE

<tbody>
  {data.users.map(user => (
    <UserPermissions key={user.id} user={user} />
  ))}
</tbody>

// MORE CODE

<td>{user.email}</td>
{possiblePermissions.map(permission => (
  <td key={permission}>
    <label htmlFor={`${user.id}-permission-${permission}`}>
      <input type="checkbox" />
    </label>
  </td>
))}
<td>

// MORE CODE
```

* Refresh page and all errors are gone

## Checking values
```
// MORE CODE

<label htmlFor={`${user.id}-permission-${permission}`}>
  <input type="checkbox" checked />
</label>

// MORE CODE
```

* Notes:
    - If you pass `checked="true"`
    - All boxes will be checked
    - You will get this warning: `Warning: Received the string `true` for the boolean attribute `checked`. Although this works, it will not work as expected if you pass the string "false". Did you mean checked={true}?`
    - If you pass `checked={true}` prettier/eslint will convert it to `checked`, all boxes will be checked and you will get this warning: `Warning: Received the string `true` for the boolean attribute `checked`. Although this works, it will not work as expected if you pass the string "false". Did you mean checked={true}?`
    - If you don't have `checked` in **input** they would all be `unchecked`

## includes()
* We can pass this an array
* And we pass an array to see if it includes the current permission that we are looping over

`Permissions.js`

```
// MORE CODE

<label htmlFor={`${user.id}-permission-${permission}`}>
  <input type="checkbox" checked={permissions.includes(permission)} />
</label>

// MORE CODE
```

* We get this warning: `index.js:2178 Warning: Received the string 'true' for the boolean attribute 'checked'. Although this works, it will not work as expected if you pass the string "false". Did you mean checked={true}?`
* If you try and check a checkbox now, it will immediately uncheck itself
    - Why do we get this error?
    - If you tie the value or the checked attribute of an input to something that is in `state` than you need to go to `state` to actually make that checkbox to check or uncheck
        + We'll add a value attribute and set it to permissions and then we'll also add an `onChange` event to say when someone does check it we'll update the `state` with the new value

```
// MORE CODE

  handlePermissionChange = event => {
    // we make this an arrow function because we need access to `this`
    console.log(event);
  };

  
              <input
                type="checkbox"
                checked={permissions.includes(permission)}
                value={permission}
                onChange={this.handlePermissionChange}
              />

// MORE CODE
```

* View `/permissions` in browser
* Check any checkboxes and you will see the event inside the ``

## Just get the `<input>` checked
`Permissions.js`

```
// MORE CODE

  handlePermissionChange = event => {
    // we make this an arrow function because we need access to `this`
    console.log(event.target);
  };

// MORE CODE
```

* You will see the input clicked (sample of 3 inputs checked)

```
<input type="checkbox" value="ITEMDELETE">
<input type="checkbox" value="ITEMUPDATE">
<input type="checkbox" value="PERMISSIONUPDATE">
```

## We can access the `value` of the **input**

```
// MORE CODE

  handlePermissionChange = event => {
    // we make this an arrow function because we need access to `this`
    console.log(event.target.value);
  };

// MORE CODE
```

## We can access the value of the `checked` attribute
```
// MORE CODE

  handlePermissionChange = event => {
    // we make this an arrow function because we need access to `this`
    console.log(event.target.checked);
  };

// MORE CODE
```

## Let's get our state updated
```
// MORE CODE

  handlePermissionChange = event => {
    const checkbox = event.target;
    // take a copy of the current permissions
    const updatedPermissions = [...this.state.permissions];
  };

// MORE CODE
```

* Why do we take a copy of current permissions?
    - In React you never want to update `state` directly
    - You want to take a copy of state, update your data and then put it back into `state`

`Permissions.js`

```
// MORE CODE

  handlePermissionChange = event => {
    const checkbox = event.target;
    const { permissions } = this.state;
    // take a copy of the current permissions
    const updatedPermissions = [...permissions];
    console.log(updatedPermissions);
  };

// MORE CODE
```

* Click checkbox and you will see a copy of state in CDT console   
* Click and you will see the array grows with Permission

## Add updates to our state
```
// MORE CODE

  handlePermissionChange = event => {
    const checkbox = event.target;
    const { permissions } = this.state;
    // take a copy of the current permissions
    const updatedPermissions = [...permissions];
    // determine if we need to remove or add this permission
    if (checkbox.checked) {
      // add it in to array!
      updatedPermissions.push(checkbox.value);
    }
    this.setState({ permissions: updatedPermissions });
    console.log(updatedPermissions);
  };

// MORE CODE
```

## Remove items from array
```
// MORE CODE

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

// MORE CODE
```

* ` updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);`
    - We'll loop over the current permission and remove that one from the updatedPermissions
    - We only want to filter if it doesn't equal to the current checkbox value
    - What that will do if we have an array user, admin and itemCreate, the one we unchecked was ADMIN, it will say if it was ADMIN take it away from the array
    - We reused a variable so we switched from `const` to `let`

## Test if added and removed from `state`
* Use RDTs and see the state for UserPermission
* Highlight the currently logged in user with admin privs
* Expand State in RDT
* Check them all and see them all added
* Uncheck them all and see them all unadded

## Houston we have a problem
* When you hit refresh the checks are all gone because we have yet to code the mutation that's going to push these updated mutations to our backend

## Next
* Coding Mutation to send our updatedPermissions to the backend
