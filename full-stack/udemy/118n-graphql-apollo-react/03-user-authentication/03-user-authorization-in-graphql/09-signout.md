# Signout
## Add Signout

`auth/Signout.js`

* In this case we want to use a stateless functional component SFC
* Take note how props are accessed
* Take note how and where event handlers are defined

```
import React from 'react';

const Signout = () => {
  return <button>Signout</button>;
};

export default Signout;
```

* Update `NavbarAuth.js`

```
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

// custom components
import Signout from '../auth/Signout';

class NavbarAuth extends Component {
  render() {
    const { session } = this.props;
    return (
      <Fragment>
        <h2>Auth</h2>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/cologne">Add Cologne</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <Signout />
          </li>
        </ul>
        <h2>
          Welcome <strong>{session.getCurrentUser.username}</strong>
        </h2>
      </Fragment>
    );
  }
}

export default NavbarAuth;
```

* Should work the same
* Just more organized now

## If you don't use components don't import them
* Look at the warnings in the console
* We can get rid of those warnings is we remove imports that we are not using

`Navbar.js`

```
import React, { Component } from 'react';

// custom components
import NavbarAuth from './NavbarAuth';
import NavbarUnAuth from './NavbarUnAuth';

class Navbar extends Component {

// MORE CODE
```

## Make react forget about our current user using `ApolloConsumer` from react-apollo
* When we say forget about... we mean log out so the user as far as the browser is concerned... is gone

### How do we kill the session?
* We will use ApolloConsumer's `client`

`Signout.js`

```
import React from 'react';
import { ApolloConsumer } from 'react-apollo';

const Signout = () => (
  <ApolloConsumer>
    {client => {
      console.log(client);

      return <button>Signout</button>;
    }}
  </ApolloConsumer>
);

export default Signout;
```

* **tip** Many times you need to remove logs to free up the terminal and/or console
* Comment out log from `withSession.js`

`withSession.js`

```
// MORE CODE

if (loading) return null;
      // console.log(data);

// MORE CODE
```

## Test in browser
* Refresh page
* You will see `DefaultClient` in console
* Lots of stuff inside `DefaultClient`
    - We want to use `resetStore`
    - This will help `apollo` **forget about the current user**
    - Anytime we click on this button we want `resetStore` to be called
* Notice that this is a SFC and take note how we are not using `this` like we would in CBCs 
  - Also **note** how we define methods outside of the function
  - And **note** how we pass in `props` and use them

`Signout.js`

```
import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const handleSignout = (client, history) => {
  // clear token
  localStorage.setItem('token', '');
  client.resetStore();
  // redirect using withRouter
  history.push('/');
};

const Signout = ({ history }) => (
  <ApolloConsumer>
    {client => {
      // console.log(client);

      return <button onClick={() => handleSignout(client, history)}>Signout</button>;
    }}
  </ApolloConsumer>
);

export default withRouter(Signout);
```

* We clear our `token`
* We import `ApolloConsumer` so we can use `resetStore`
* We use `client.resetStore()` to remove user
* We import `withRouter` so we can redirect to home page after logging out
* We destructure `history` and pass it into event handler so we can redirect to home page when we click to signout

## Test in browser
* View token in Application tab of browser console
* Click signout button and watch token is set to an empty string and we are redirected to home page

## Note
* You may be getting a `{ JsonWebTokenError: jwt must be provided` error
* We'll address soon

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add signout`

## Push to github
`$ git push origin auth`

## Next - Add Colognes to Home Page
