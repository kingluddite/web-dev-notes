# Make navbar dynamic
## We need to add logic
* To show the logged in user or public navbar (auth or unauth)

## Pass down `data` in withSession

`withSession.js`

```
// MORE CODE

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      if (loading) return null;
      console.log(data);

      return <Component {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);

// MORE CODE
```

## Pass down `session` into Navbar
`index.js`

```
// MORE CODE

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        // MORE CODE
      </Switch>
    </Fragment>
  </Router>
);

// MORE CODE
```

## pull out `session` from props of `Navbar`
* Set up conditional to show `auth nav` or `unauth nav`
* If we have a current logged in user (getCurrentUser) and it is not `null` we'll learn `navbarAuth` otherwise load `navbarUnAuth`

`Navbar.js`

```
// MORE CODE

const Navbar = ({ session }) => {
  return (
    <nav>
      {session && session.getCurrentUser ? <NavbarAuth /> : <NavbarUnAuth />}
    </nav>
  );
};

// MORE CODE
```

# Test in browser
* When not logged in see public nav
* When logged in see private nav

## Welcome user when logged in
* Use a `<h2>Welcome, user name</h2>`
* Pass down `session` to `NavbarAuth`
* Use `Fragment` to prevent common parent tag error

`index.js`

```
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = ({ session }) => {
  return (
    <nav>
      {session && session.getCurrentUser ? (
        <NavbarAuth session={session} />
      ) : (
        <NavbarUnAuth />
      )}
    </nav>
  );
};

const NavbarAuth = ({ session }) => (
  <Fragment>
    <ul>
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>
      <li>
        <NavLink to="/genealogy/add">Add Genealogy</NavLink>
      </li>
      <li>
        <NavLink to="profile">Profile</NavLink>
      </li>
      <li>
        <button>Signout</button>
      </li>
    </ul>
    <h4>Welcome, <strong>{session.getCurrentUser.username}</strong></h4>
  </Fragment>
);

// MORE CODE

export default Navbar;
```

## Test in browser
* Log in and you will see username welcome
