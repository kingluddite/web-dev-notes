# Logout & Navbar Links
## How can we logout

## How can we change the Navbar based on if we are logged in or out?
* Add a LOGOUT type variable

`actions/types.js`

```
// MORE CODE
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT'; // add
```

* import LOGOUT type into our auth actions

`actions/auth.js`

```
// MORE CODE

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT, // add
} from './types';
import setAuthToken from '../utils/setAuthToken';

// MORE CODE
// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
```

* **note** Logout will also clear the profile

## In our reducer
* We'll import it
* LOGOUT will do what REGISTER_FAIL, AUTH_ERROR, LOGIN_FAIL do

`reducers/auth.js`

* It will:
    - Clear the token - token set to null
    - isAuthenticted will be set to false
    - It will remove the token from localStorage

```
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT, // add this
} from '../actions/types';

// MORE CODE

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // MORE CODE

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      // remove anything that is in localStorage (the token)
      // for a failed login we want to remove the token completely
      localStorage.removeItem('token');

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
```

## Add intelligence to our Navbar (currently it is just a "dumb static component")
* We'll use connect
    - Because we want to connect to Redux
    - We want to bring in some state (our auth state)
* We'll need PropTypes
    - logout required
    - auth (object) required
* We'll need our `logout` action
* We'll need mapStateToProps (and use our `logout` in our Navbar component)
    - We'll bring in the entire `auth` state
* Destructure our props using `logout` and auth
    - Since `auth` is an object we need to destructure with { auth: { isAuthenticated, loading }}
        + We pull out `loading` because we want to make sure that the user is finished loading before we put the links in

`Navbar.js`

```
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, login }) => {
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i> DevConnector
          </Link>
        </h1>
        <ul>
          <li>
            <Link to="!#">Developers</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
});

export default connect(mapStateToProps, { login })(Navbar);
```

## auth and guest links
* For private (auth) and public (guest) navbar links
* If we are done `loading`
    - In the `initialState` of our auth reducer `loading` is **true** by default and then once we fetch the user or we get an error, `loading` is **false**
    - So we want to make sure `loading` is false before we show the menu
        + We could use a ternary `{ !loading ? '' : null }`
        + Or we could (and we'll use this way) use `{ !loading && DO THIS }`
    - We'll use a `Fragment`
        + We'll show authLinks if isAuthenticated
        + We'll show guestLinks if not

## Navbar
```
// MORE CODE

return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i> DevConnector
          </Link>
        </h1>
        {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      </nav>
    </div>
  );
};
// MORE CODE
```

* **note** We don't use a ternary for first part `{!loading && bla bla bal}` because we have a `null`
* We do use a ternary for the other part `{isAuthenticated ? authLinks : guestLinks}` because we have an `else`

## Null link
* I used `#` but `#!` prevents moving the page.
* [docs on this technique](https://stackoverflow.com/questions/41394896/what-if-i-use-instead-of-in-href-of-anchor-tag-a)

### is it legal?
* It is not semantically correct. Links should be links
* It is a hack: You are linking to the element with id="!" and depending on the * error recovery that happens when that element doesn't exist.
* It is allowed under the rules of what constitutes valid HTML.
* It is probably OK according to the various bits of accessibility legislation about the work which don't generally care if something works without JavaScript

`Navbar.js`

```
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
      <ul>
        <li>
          <a onClick={logout} href="#!">
            <i className="fas fa-sign-out-alt"></i>{' '}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </ul>
    );

  const guestLinks = (
    <ul>
      <li>
        <Link to="#!">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i> DevConnector
          </Link>
        </h1>
        {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
```

## Test in UI
* Log in
* You should see `logout` button
    - We use an anchor because we use a JavaScript onClick event to call our logout method
* When you logout you see Developer Register and Login buttons in nav

## Next - The Dashboard
