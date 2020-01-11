# Private Only Routes
* Currently we just check `auth` status when app first loads or when `auth` status changes
* But if I try to navigate while using the app, we don't check `auth` status
* Now that we are storing some authentication information in our Redux store we can use that information to be able to determine if a user should be able to navigate to a specific page when the app is already up and running
* We only run the "authentication" check is when the app first loads using this code:

`app.js`

```
// MORE CODE

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // console.log('uid: ', user.uid);
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
```

* We'll need to run this check whenever we change routes

## Let's see where we currently stand with our app
`$ npm run dev-server`

## Houston we have a problem!
* We arrive at the home page when the app loads
* Currently you can click "Create Expense" link and navigate to that page even if you are logged out
    - We need to fix this!

### Solution - Update how we set up our routes
* We will add 2 new components to run that check before rendering a specific component
* We will create a PrivateRoute to use instead of Route

`AppRouter.js`

```
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
* We need `connect()` to use the Redux store to determine if user is authenticated
* We will create a SFC (stateless functional component)
* Then we'll export the connected version for consumption by `AppRouter`
* We need to use `mapStateToProps` to grab values to determine:
  - We don't need to dispatch anything but we do need to grab some values to determine if user is authenticated or not
    + `state.auth.uid`
      - Can be a `string value` or `undefined`
      - We use `!!state.auth.uid` to convert them to their boolean equivalent
        + boolean true ===> we are authenticated
        + boolean false ===> we are not authenticated

`PrivateRoute.js`

```
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

export const PrivateRoute = props => <Route {...props} />;

const mapDispatchToProps = state => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapDispatchToProps)(PrivateRoute);
```

* We take all the props and spread them down into Route
* The above code will work but not as expected

## Take for a test drive
* It works like it did before and we can still navigate to Create Expense even if we are logged out
    - The good news is that `PrivateRoute` is working in its current state but it's not working the way we want...yet

## Time to add conditional logic
* This will get the `PrivateRoute` working the way we want
* We have to determine whether a user is logged in or not
    - We have that via the `prop`
    - We can add destructuring
* We pass in `isAuthenticated` and `component` (component was passed in to 3 `PrivateRoute`s)
    - We will be rendering this `component` so it is good naming practice to rename as `Component` with `component: Component` (pretty common pattern)
* We can use the **rest** operator (...)
    - We use this to spread out all its properties
    - When we are destructuring objects we can use the rest operator `...rest` to get a variable called `rest` with all of the stuff we DID NOT destructure
        + This will contain everything except `isAuthenticated` and `component`
* We import the `Redirect` named export from the react-router-dom library which will make it very easy to redirect the user to the home page if they are not authenticated when trying to visit a PrivateRoute
* If the user is authenticated (using our ternary operator) we will render a Component and pass it all the props

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
* If all went well it should not let you go to that link and just keeps you on the home page of the app
* That is a heck of a lot of code to do that but it now works

## Improvement - render the Header only on the private routes
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

* Remove the import from Header component
* And add that import inside PrivateRoute

`PrivateRoute.js`

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

### Lots of stuff in the above code
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

* We will eventual be rendering it so we need to use an uppercase `C` ----> `component: Component`
* We also need a way to grab everything except `isAuthenticated` and `component`
    - We do that with **the ...rest operator**
        + `...rest` (this is a variable)
            * When we create an object we can spread out an object to spread out all its properties
            * When we are destructuring objects we can use the `...rest` operator to get a variable called `rest` with all of the stuff we did not destructure (we call it `...rest` but it can be called anything like `...rockyroad`)
            * We will pass down `...rest` down to `props`

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

* So currently `Route` does NOT get `isAuthenticated` passed down to it
* But it is also not getting component passed to it
    - We will fix that by defining `component` on our own and adding the conditional logic we need
      + This will grab the `rest` of the props to make sure they correctly get down to the route
      + Look at `AppRouter` and you'll see other props like `path` and `exact`
* `React-Router` gives us access to Redirect
    - Super easy to use
    - When it is rendered it redirects you
* It will render the `<Component {...props} />` if we are authenticated
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

* Now there is no `Header` on home page
* Click `Login` and authenticate and then you'll see `Header` (now that you are logged in)
* Create Expense works as expected
* If you manually enter `/create` in URL it will redirect you to the Home page `/`

## Houston we have a problem
* When logged in and you click the `Dashboard` link, it incorrectly takes you to the old dashboard page, that link is broken

### We now see the other side of the problem
* We are logging people out of private routes
* But there is also public routes we want to log people out of
* There is no reason for a user to view the login page if they are already logged in, so we want to redirect them to the dashboard page

## Summary
* We setup `PrivateRoute`
    - It is just a wrapper around `Route`
    - We did this to add some conditional logic in
        + If user is authenticated take the correct action
            * Redirect them to the correct route
        + If not redirect them to a public page

## Git stuff
* This uses alias to make working with git faster
```
# Show the git status
$ gs

# Add all files
$ ga .

# Commit the files
$ gc -m 'Add private routes'

# Push the files to GitHub
$ gpush

# Push the files to Heroku
$ gph
```

