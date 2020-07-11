# Protected Route for Dashboard
* Currently when we log in we get rerouted to the Dashboard but it is not working correctly

## Dashboard is a bit different than our other components
* We'll create a folder for it `components/dashboard/Dashboard.js`

`components/dashboard/Dashboard.js`

* Inside this file we will:
    - Fetch all of our data etc using an action
    - Then we'll bring it in from the Redux state
    - Then we'll pass it down to other components (example: Experience or Education components)
* Create a function with prop-types
    - snippet is `rafcp`

```
import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = (props) => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
```

## Add the /dashboard route to link to our Dashboard component
`App.js`

```
// MORE CODE

import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard'; // add

// MORE CODE

  return (

    // MORE CODE

            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              {/* add this /dashboard route */}
              <Route exact path="/dashboard" component={Dashboard} />


// MORE CODE
```

## View UI
* Login and and you'll now see the H1 with Dashboard

## Let's create our Private Route component
* Why?
    - If I log out I can still access the /dashboard route and we don't want to be able to do that

### We will code to easily add private route's that will look like this:
#
```
// MORE CODE

<Route exact path="/register" component={Register} />
<Route exact path="/login" component={Login} />
<PrivateRoute exact path="/dashboard" component={Dashboard} />

// MORE CODE
```

#### Create new folder `src/routing` with `PrivateRoute.js`
`src/routing/PrivateRoute.js`

* Create it with arrow function and prop types
    - Snippet is `rafcp`
* With Route's we have to accept the `component` prop and anything else that is passed into it
    - We will destructure
    - And we want to get any other parameters that are passed in so we use the spread operator and a variable rest `...rest` (to get the rest)

`({ component: Component, ...rest})`

* [Deeper explanation about this syntax here](https://stackoverflow.com/questions/43484302/what-does-it-mean-rest-in-react-jsx)
* We need to interact with the auth state in our auth reducer so we'll bring in `connect` from `react-redux`

`routing/PrivateRoute.js`

* When we use the code below:
    - Whenever we use `PrivateRoute`
        + Essentially we'll use a Route just like we do in App.js
        + But now we'll add in a render prop to check to see if the user is not authenticated and not loading and if that's true We'll redirect to login
            * Else, if they are authenticated, then the Component will load

```
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
```

## Bring in PrivateRoute.js into App.js
`App.js`

```
// MORE CODE

import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './routing/PrivateRoute';

// MORE CODE

            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />

// MORE CODE
```

## Test in UI
* You can only see `/dashboard` route if you are logged in
* Any routes you want to make private use `PrivateRoute` instead of `Route`

## Next - Create our Profile Reducer and get current profile action
* As soon as the Dashboard loads we need to pull in the current user's profile
    - In order to accomplish that we need:
        + profile in our state
            * Which means we need a profile reducer, profile actions file
