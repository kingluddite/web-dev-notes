# Redirecting Login/Logout
* We will focus on this:

`app.js`

```
// MORE CODE
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('log in');
  } else {
    console.log('log out');
  }
});
```

* Get rid of console logs
* Replace with redirection
    - On successful log in get redirected to dashboard
    - If on dashboard page, and log out, redirected to home page
* When user logs in, we need to fetch their **expenses**

## Redirecting
* We used in `AddExpensePage`

`AddExpensePage.js`

```
// MORE CODE
export class AddExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  };

// MORE CODE
```

* `history` is passed into this component because `history` is registered with a route

## Houston we have a problem
* In the below code's context we are not inside a component that is registered to a route
* We are just inside some code and need to access the history API
* To gain access to the history API, we need to make a few changes to `AppRouter`

### Change how we work with history
* By default if we use `BrowserRouter` behind the scenes React Router does work for us
    - It creates an instance of `browserHistory` and it registers it with our new router

#### We can do this process manually
* It takes a little bit more work but it can be done
* To do this:
    - We have to install one tool
    - Add 3 lines of code
    - But after that we can use `browserHistory` anywhere

`app.js`

```
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
`$ npm i history`

* [link to npm history](https://www.npmjs.com/package/history)
* This is a module that ReactRouter is already using behind the scenes

## Add history to AddRouter
* Now we'll use `history` in our `AppRouter` component

`AppRouter.js`

* We see the import we need from the [npm history docs](https://github.com/ReactTraining/history/blob/3f69f9e07b0a739419704cffc3b3563133281548/docs/GettingStarted.md)

```
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory'; // old code
import { createBrowserHistory } from 'history'
// MORE CODE

const history = createBrowserHistory();

// MORE CODE
```

* No we are creating this history on our own
* But right now we are not integrating this with our router
    - We are using `BrowserRouter`
        + Which uses the **browserHistory** by default

## Switch from BrowserRouter to Router
* Change this:

```
const AppRouter = () => (
  <BrowserRouter>

    // MORE CODE

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
    
    // MORE CODE

  </Router>
);

export default AppRouter;

```

* Most of our `Router` is the same
* We Swap `BrowserRouter` with `Router`
* We export our manual **history** that we pass into `Router`
    - Now we can use the **history** on any file
* So instead of user `BrowserRouter` which already has `history` built in, we swap it out with Router and pass it a prop of our new `history`
  - The advantage to this approach is we now have access to the `history` and if we export it like this we can use it in other files

`AppRouter.js`

```
// MORE CODE

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>

// MORE CODE
```

## Old way vs new way
* If you added history using this old way

`AppRouter.js`

```
// MORE CODE

import createHistory from 'history/createBrowserHistory';

// MORE CODE

const history = createHistory();
```

* You will get this error:

```
bundle.js:29224 Warning: Please use `require("history").createBrowserHistory` instead of `require("history/createBrowserHistory")`. Support for the latter will be removed in the next major release.
```

* To fix this error, rewrite the code from the [new docs](https://github.com/ReactTraining/history/blob/3f69f9e07b0a739419704cffc3b3563133281548/docs/GettingStarted.md):

`AppRouter.js`

```
// MORE CODE

import { createBrowserHistory } from 'history';

// MORE CODE

const history = createBrowserHistory();

// MORE CODE
```

## Houston we have a minor problem
* You get this warning:

```
Warning: <BrowserRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { BrowserRouter as Router }`. 
    in BrowserRouter (created by AppRouter)
    in AppRouter
```

* To fix make `AppRouter` look like this:

`AppRouter.js`

```
// MORE CODE

import React from 'react';
// We swap BrowserRouter as Router to Router
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';

// MORE CODE
```

* Now the warning is gone

## Now with this change we can grab history and use it anytime we want
* Here is how we'll use it inside `app.js`

## Add named export `history` to `app.js`

`app.js`

```
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
`$ npm run dev-server`

* Now logging in redirects to `/dashboard`
* And logging out redirects to `/`

## Houston we have a problem
* Login is going to be a little trickier because we need to log the user in but we also have to grab their expenses
* But we are currently blindly redirecting the user to /dashboard... what if they were on `CreateExpensePage`?
    - We only want to redirect the user when they are currently on the login page

* Logout page is easy
* Login is a little trickier
  - Since a new user is logging in we need to fetch their expenses
  - And we'll get that done inside the `if` statement
  - I don't want to blindly redirect the user, I only want to redirect them if they are currently on the login page
  - We'll first take our call to dispatch `startSetExpenses`

`app.js`

* We only run the fetch expenses code if the user is logged in
* **Note** Currently we are fetching expenses for everyone and not just the logged in user 

```
// MORE CODE

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(startSetExpenses()).then(() => {
      ReactDOM.render(jsx, document.getElementById('root'));
    });
  } else {
    history.push('/');
  }
});
```

* Now we are fetching all expenses (not just the users)
* But if someone logs out they will be redirected to the home page and nothing will render and they will be stuck on the `loading screen` indefinitely - this is a problem

## Houston we have a problem
* If someone logs out (because we moved the code), nothing will render, they will sit on the loading screen forever

### Solution - paste the render in the else too

```
// MORE CODE
// firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // history.push('/dashboard');

    store.dispatch(startSetExpenses()).then(() => {
      ReactDOM.render(jsx, document.getElementById('root'));
    });
  } else {
    ReactDOM.render(jsx, document.getElementById('root'));
    history.push('/');
  }
});
```

## Houston we have 2 problems
1. We just created duplicate code and violated DRY principles
2. If I'm already in the app and I log in/out, I will re-render everything and this is bad
    - We only want to render the app one time

### Solution
* We'll create a boolean value to find out if we rendered or not `hasRendered`
  - We'll initially set it to false

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
    - We can do that in a condition  

### Conditions
* Only redirect user to Dashboard if they are currently on the login page
  - `if (history.location.pathname === '/') {}`

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
### Redirect from home to dashboard
* Start at login page
* Click login
* Should take you to dashboard

### While on the Expense page, perform a page refresh
* Should not take you to `/dashboard` but keep you at exact same place you were

### Clicking on Logout takes you to home page
* If all 3 work, you are successful

## Houston we have a problem
* We can manually visit `/dashboard` and individual expenses by just typing that specific URL
    - `localhost:8080/dashboard`
        + Redirects you properly
    - But if you click on Create Expense or Dashboard you can see those pages even when you are logged out and this is bad
    - We want to make sure that we aren't just checking authentication and redirecting when you visit app for first time
        + Either clicking links in app or JavaScript that redirects we need to always perform checks to ensure I am not places I should not be
        + This is the topic of `private routes`

## Next - Private Routes
