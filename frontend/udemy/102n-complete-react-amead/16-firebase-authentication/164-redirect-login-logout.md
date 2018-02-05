# Redirecting Login/Logout
* We will focust on this:

`app.js`

```js
// MORE CODE
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('log in');
  } else {
    console.log('log out');
  }
});
```

* Get rid of logs
* Replace with redirection
    - on successful log in get redirected to dashboard
* If on dashboard page, and log out, redirected to home page
* When user logs in, we need to fetch their expenses

## Redirecting
* We used in AddExpensePage

```
// MORE CODE
export class AddExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  };

// MORE CODE
```

* `history` is passed into this component because it is registered with a route

## Houston we have a problem
* In the below code's context we are not inside a component that is registered to a route
* We are just inside some code and need to access the history API
* To gain access to the history API, we need to make a few changes to `AppRouter`

### Change how we work with history
* By default if we use BrowserRouter behind the scenes React Router does work for us
    - It creates an instance of browserHistory and it registers it with our new router
    - We can do this process manually
        + To do this:
            * We have to install one tool
            * Add 3 lines of code
            * But after that we can use browserHistory anywhere

`app.js`

```js
// MORE CODE
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('log in');
  } else {
    console.log('log out');
  }
});
```

## Install `history` module
`$ yarn add history`

* [link to npm](https://www.npmjs.com/package/history)
* This is a module that ReactRouter is already using behind the scenes

## Add history to AddRouter
`AppRouter.js`

```js
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
// MORE CODE

const history = createHistory();
// MORE CODE
```

* No we are creating this history on our own
* But right now we are not integrating this with our router
    - We are using BrowserRouter
        + Which uses the browserHistory by default

## Switch from BrowserRouter to Router
* Change this:

```
const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <Route
          path="/dashboard"
          component={ExpenseDashboardPage}
          exact={true}
        />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);
```

* To this:

```
import React from 'react';
// modify the line below to import Router and not BrowserRouter
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
// MORE CODE

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <Route
          path="/dashboard"
          component={ExpenseDashboardPage}
          exact={true}
        />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

```

* Most of our Router is the same
* We Swap BrowserRouter with Router
* We export our manual history that we pass into Router
    - Now we can use the history on any file

## Add named export `history` to app.js
`app.js`

```js
// MORE CODE
import AppRouter, { history } from './routers/AppRouter';

// MORE CODE

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    history.push('/dashboard');
  } else {
    history.push('/');
  }
});
```

## Take it for a test drive
`$ yarn run dev-server`

* Now logging in redirects to `/dashboard`
* And logging out redirects to `/`

## Houston we have a problem
* Login is going to be a little trickier because we need to log the user in but we also have to grab their expenses
* But we are currently blindly redirecting the user to /dashboard... what if they were on Create expense page?
    - We only want to redirect the when they are currently on the login page

`app.js`

```
// MORE CODE
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // history.push('/dashboard');

    store.dispatch(startSetExpenses()).then(() => {
      ReactDOM.render(jsx, document.getElementById('app'));
    });
  } else {
    history.push('/');
  }
});
```

* Now we are fetching all expenses (not just the users)

## Houston we have a problem
* If someone logs out (because we moved the code), nothing will render, they will sit on the loading screen forever
* Solution - paste the render in the else too

```js
// MORE CODE
// firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // history.push('/dashboard');

    store.dispatch(startSetExpenses()).then(() => {
      ReactDOM.render(jsx, document.getElementById('app'));
    });
  } else {
    ReactDOM.render(jsx, document.getElementById('app'));
    history.push('/');
  }
});
```

## Houston we have problems
* We just created duplicate code and violated DRY principles
* If I'm already in the app and I log in/out, I will rerender everything and this is bad
    - We only want to render the app one time

### Solution
`app.js`

```
// MORE CODE
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // history.push('/dashboard');

    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
    });
  } else {
    renderApp();
    history.push('/');
  }
});
```

## But how do we redirect logged in users?
* `history` also gives us access to the users current location
    - We use that to pull out things like URL parameters
* conditions
    - Only redirect user to Dashboard if they are currently on the login page
        + `if (history.location.pathname === '/') {}`

```
// MORE CODE
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    renderApp();
    history.push('/');
  }
});
```

## Take it for a test drive
### home to dashboard
* Start at login page
* Click login
* Should take you to dashboard

### expense page refresh
* Should not take you to /dashboard but keep you at exact same place you were

### logout takes you to home page
* If all 3 work, you are successful

## Houston we have a problem
* We can manually visit /dashboard and individual expenses by just typing that specific URL
    - localhost:8080/dashboard
        + redirects you properly
    - But if you click on Create Expense or Dashboard you can see those pages even when you are logged out and this is bad
    - We want to make sure that we aren't just checking authentication and redirecting when you visit app for first time
        + either clicking links in app or JavaScript that redirects we need to always perform checks to ensure I am not places I should not be
        + This is the topic of `private routes` 
