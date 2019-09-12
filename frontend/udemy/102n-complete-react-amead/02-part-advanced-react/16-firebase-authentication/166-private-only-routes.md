# Private Only Routes
* Currenlty we just check auth status when app first loads or when auth status changes
* But if I try to navigate while using the app, we don't check auth status

## Houston we have a problem
* Currently you can click Create Expense and navigate to that page even if you are logged out
    - We need to fix this

### Solution - Update how we set up our routes
* We will add 2 new components to run that check before rendering a specific component

`AppRouter.js`

```js
// MORE CODE
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <PrivateRoute
          path="/dashboard"
          component={ExpenseDashboardPage}
          exact={true}
        />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
```

## Now we need to create `routers/PrivateRoute.js`
* We need `connect()` to determine if user is authenticated
* We will create a SFC (stateless functional component)
* Then we'll export the connected version for consumption by AppRouter
* We need to use mapStateToProps to grab values to determine 
* if use if authenticated or not
* state.auth.uid
    - Can be a value or undefined
    - We use `!!state.auth.uid` to convert them to their boolean equivalent
        + boolean true ===> we are authenticated
        + boolean false ===> we are not authenticated

`PrivateRoute.js`

```js
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

export const PrivateRoute = props => <Route {...props} />;

const mapDispatchToProps = state => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapDispatchToProps)(PrivateRoute);
```

## Take for a test drive
* It works like it did before and we can still navigate to Create Expense even if we are logged out
    - The good news is that PrivateRoute is working in its current state but it's not working the way we want...yet

## Time to add conditional logic
* This will get the PrivateRoute working the way we want
* We have to determine whether a user is logged in or not
    - We have that via the `prop`
    - We can add destructuring
* We pass in `isAuthenticated` and `component` (component was passed in to 3 private routes)
    - We will be rendering this `components` so it is good naming practice to rename as `Component` with `component: Component`
* We can use the **rest** operator (...)
    - We use this to spread out all its properties
    - When we are destructuring objects we can use the rest operator `...rest` to get a variable called `rest` with all of the stuff we DID NOT destructure
        + This will contain everything except `isAuthenticated` and `component`

`PrivateRouter.js`

```
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapDispatchToProps = state => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapDispatchToProps)(PrivateRoute);
```

## Take it for a test drive
* Log out and try to click `Create Expense`
* If all went well it should not let you go to that back and just keep you on the home page
* That is a heck of a lot of code to do that but it now works

## Improvement
* Let's render the Header component only on private routes
* Remove Header from `AppRouter` (import and usage)

`AppRouter.js`

```
// MORE CODE
import Header from '../components/Header';
// MORE CODE

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
    // MORE CODE
    </div>
  </Router>
);

export default AppRouter;
```

* And make remove import and Header component
* And import and use it inside PrivateRoute

`PrivateRoute.js`

```js
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapDispatchToProps = state => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapDispatchToProps)(PrivateRoute);
```

### Lots of stuff in teh above code
* We do want to use Route even though we are not directly using AppRouter
* We first take all the props (we get from mapDispatchToProps) and pass them down into `<Route {...props} />`
    - This will work but not as expected
    - The route works as it did before but it lets us know that our current code works as it is coded
    - But we need to make changes with conditional logic

### Destructuring `props`
* We pull off isAuthenticated
* We pull off `component`
    - If you look at AppRouter Routes you'll see `component` used

```
<PrivateRoute
  path="/dashboard"
  component={ExpenseDashboardPage}
  exact={true}
/>
```

* That means we can add `component` to our destructuring

`PrivateRoute.js`

```
// MORE CODE
export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
}) => (

// MORE CODE
```

* We will eventual be rendering it so we need to use an uppercase `C` ----> component: Component
* We also need a way to grab everything except `isAuthenticated` and `component`
    - We do that with **the ...rest operator**
        + ...rest (this is a variable)
            * When we create an object we can spread out an object to spread out all its properties
            * When we are destructuring objects we can use the ...rest operator to get a variable called `rest` with all of the stuff we did not destructure (we call it ...rest but it can be called anything like ...rocky)
            * We will pass down `...rest` down to props

```
export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />
```

* So currently Route is NOT get `isAuthenticated` passed down to it
* But it is also not getting component passed to it
    - We will fix that by defining `component` on our own and adding the conditional logic we need
    - This will grab the `rest` of the probs to make sure they correctly get down to the route
        + Look at AppRouter and you'll see other props like `path` and `exact`
* React-Router gives us access to Redirect
    - Super easy to use
    - When it is rendered it redirects you
* It will render the <Component {...props} /> if we are authenticated
* It will redirect us to the login page if we are not authenticated

```
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapDispatchToProps = state => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapDispatchToProps)(PrivateRoute);
```

* Now there is no Header on home page
* Click `Login` and authenticate and then you'll see Header (now that you are logged in)
* Create Expense works as expected
* If you manually enter `/create` in URL it will redirect you to the Home page `/`

## Houston we have a problem
* When logged in and you click the Dashboard link, it incorrectly takes you to the old dashboard page, that link is broken
* We now see the other side of the problem
* We are logging people out of private routes
* But there is also public routes we want to log people out of
* There is no reason for a user to view the login page if they are already logged in, so we want to redirect them to the dashboard page

## Summary
* We setup PrivateRoute
    - It is just a wrapper around Route
    - We did this to add some conditional logic in
        + if user is authenticated take the correct action
            * redirect them to the correct route
        + if not redirect them to a public page

## Git stuff
```
$ gs
$ ga .
$ gc -m 'Add private routes'
$ gpush
$ gph
```

