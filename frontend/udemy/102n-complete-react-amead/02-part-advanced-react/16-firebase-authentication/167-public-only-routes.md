# Public Only Routes
## Houston we have a problem
* We can still navigate to public pages, Like the LoginPage when I'm already logged in
    - Bad user experience
* When you are logged in and click Dashboard link it takes yu to home page and shows you Login button
* To get this to work properly we will do the opposite of what we did for PrivateRoute
    - Instead of showing the component when the user is authenticated, we'll show the component when the user is not authenticated
    - If the person is authenticated, we want to redirect them

## Challenge
1. Create PublicRoute (copy PrivateRoute)
2. Redirect to /dashboard if logged in
3. Render component if not logged in
4. Use it for the LoginPage
5. Delete HelpPage
    * Remove Import and route from AppRouter
    * Delete HelpPage component

`PublicRoute.js`

```
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? <Redirect to="/dashboard" /> : <Component {...props} />
    }
  />
);

const mapDispatchToProps = state => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapDispatchToProps)(PublicRoute);
```

## Update AppRouter
`AppRouter.js`

```
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute
          path="/dashboard"
          component={ExpenseDashboardPage}
          exact={true}
        />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
```

## Take for a test drive
* Log in and click Dashboard, it won't redirect you to home page so it works

## Clean up Header
* Point the dashboard link to `/dashboard`
* we remove exact attribute because we are no longer linking to the root of the app

`Header.js`

```
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = props => (
  <header>
    <h1>Expensified</h1>
    <NavLink to="/dashboard" activeClassName="is-active">
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>
    <button onClick={props.startLogout}>Logout</button>
  </header>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
```

* Now Dashboard and Create Expense links work and route to the proper pages
