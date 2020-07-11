# Starting on the Dashboard
## Lets add a link to navigate to our Dashboard

`Navbar.js`

```
// MORE CODE

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
// MORE CODE
```

* Login and you'll see a Dashboard link

## Prevent visiting the landing page if we are logged in
* We'll need to use `connect` to grab the Redux state and check if we are logged in (isAuthenticated === true)
    - If we are authenticated, redirect to `/dashboard`

`Landing.js`

```
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
```

## Test in UI
* Now when logged in, you can't visit the `Landing` page because you will be redirected to the `/dashboard` route
    - If logged in the logo link can't take you back to the home page (landing page)

## Back to the Dashboard
* We want to make sure that the profile is loaded and that it is not null (and if it is we will show a spinner graphic)

`layout/Spinner.js`

* Give it a width of 200px, center it and display of block (so it will have margin and padding)

```
import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </>
  );
};
```

* [download this spinner](https://raw.githubusercontent.com/bradtraversy/devconnector_2.0/master/client/src/components/layout/spinner.gif)
    - Save to `src/components/layout`

## Add the spinner
* Import Spinner to Dashboard
* `if loading AND profile === null` we want to see the spinner
    - If either are `false`, use a `Fragment` to display `Test`
* Pull out (destructure) profile and loading from profile object in props

`Dashboard.js`

```
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner'; // Add
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth,
  profile: { loading, profile }, // update this
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  // And we need both loading to be true and profile to equal null to see the
  //  Spinner, else, Show a Fragment with placeholder text
  return loading && profile === null ? <Spinner /> : <Fragment>test</Fragment>;
};

// MORE CODE
```

## Test in UI
* Reload browser and you'll see the spinner for a tenth of a second
  - We see the spinner when it is loading and profile is still null
    + We do this because we don't want to show an empty page, we only want to use when there is content to show
    + **BEST PRACTICE** We never want to load the component, aka the JSX until we get the data from the server
      * We will use this technique in several different places in our app

## Build our fragment
* We'll pull the user name from `auth.name`
  - We'll destructure user from auth `auth: { user }`

`Dashboard.js`

* We check if the user exists and if they do we show their name

* View in browser and you'll see this:

![welcome + logged in user's name](https://i.imgur.com/kgIw1ZQ.png)

* Log out and log in as another user and you'll see the greeting greets the new user that is logged in

![welcome + logged in user's name](https://i.imgur.com/Bfk5Y7z.png)

```
// MORE CODE

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { loading, profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
    </Fragment>
  );
};
// MORE CODE
```

## We need to fix this
* That part will be there even if the user doesn't have a profile
* We need to show something different if the profile isn't there
* To test this make sure you have created a user without a profile
  - We will write conditional code that says `has` if the logged in user has a profile and `has not` if the logged in user doesn't have a profile
  - Here is the code:

`Dashboard.js`

* Use Redux DevTools to test this
* We see has with Jane Doe that is logged in
  - **note** Look at the `profile` in the state of RDT (Redux DevTools)
* I created a new user `Bob Dole` who doesn't have a profile and when I log out of Jane's account and log in as Bob
  - Even though we logged out of Jane and into Bob, RDT shows that Jane's profile is still there... this is a problem... we need to clear the profile when we log out

```
// MORE CODE

return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>has</Fragment>
      ) : (
        <Fragment>has not</Fragment>
      )}
    </Fragment>
  );
};
// MORE CODE
```

## We need to clear the profile on logout
* We'll create a new type called `CLEAR_PROFILE`
* We need to import and dispatch CLEAR_PROFILE inside `actions/auth.js`
  - Position `CLEAR_PROFILE` first before dispatching the `LOGOUT` action
* Import into reducers add another case that will copy the current state and set the profile to `null` (and we'll also set the GitHub repose array to empty and `loading` to false)

## Add CLEAR_PROFILE type
`actions/types.js`

```
// MORE CODE
export const PROFILE_ERROR = 'PROFILE_ERROR';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
```

## Add CLEAR_PROFILE action
`actions/auth.js`

```
// MORE CODE

import {

  // MORE CODE

  CLEAR_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// MORE CODE

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
```

## Add CLEAR_PROFILE to reducer
`reducers/profile.js`

```
import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types';

// MORE CODE

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    // MORE CODE

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}
// MORE CODE
```

## Test in UI
1. Log in as jane.doe@example.com
2. View her profile in RDT
3. Logout
4. View RDT state and profile should be null (and GitHub array empty and loading is set to false) - You should see the CLEAR_PROFILE action fired
5. Log in as bob.dole@example.com
6. See that it says `has not` (no profile)
7. Bob's profile is null
8. Log out
9. Log in as john.doe@example.com
10. John UI says `has`
11. John's profile is populated with his profile in RDT
12. If all the above happened, it's working as expected!

## Decide what we will do for people that have profiles and people that do not have profiles
* Import Link

```
// MORE CODE

import { Link } from 'react-router-dom';

// MORE CODE

<Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>has</Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please provide some info</p>
          <Link to="/create-profile">Create Profile</Link>
        </Fragment>
      )}
    </Fragment>

// MORE CODE
```

* Now you'll see a button to create a profile
* We still see `has` text for users who have profiles (we'll fix this later)

## Next
* Create the page where the user can create their profile
