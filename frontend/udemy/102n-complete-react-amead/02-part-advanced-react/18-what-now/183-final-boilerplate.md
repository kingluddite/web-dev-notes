# Final Boilerplate
* Gut Expensify and break it down into something we can reuse for all future React projects

## Let's get started
* Duplicate `103e-exensify-app` as `my-react-boilerplate-v2`

## Gut files from `src`
* Delete
    - From `actions`
        + expenses.js
        + filters.js
        + (keep auth.js)
    - From `components`
        + AddExpensePage.js
        + EditExpensePage.js
        + ExpenseForm.js
        + ExpenseList.js
        + ExpenseListFilters.js
        + ExpenseListItem.js
        + ExpensesSummary.js
        + (keep Header.js)
        + (keep LoadingPage.js)
        + (keep LoginPage.js)
        + (keep NotFoundPage.js)
        + (rename Dashboard...)
    - From `firebase`
        + keep `firebase.js`
    - From `playground` (delete folder and all contents)
    - From `reducers`
        + expenses.js
        + filters.js
        + (keep auth.js)
    - Keep (routers as is)
    - From `selectors`
        + expenses-total.js
        + expenses.js
    - Keep (`store` and `configureStore.js`)
    - Keep (`styles` and contents untouched)
    - From `tests`
        + keep `__mocks__`
        + From `actions`
            * expenses.test.js
            * filters.test.js
        + From `components`
            * AddExpensePage.test.js
            * EditExpensePage.test.js
            * ExpenseForm.test.js
            * ExpenseList.test.js
            * ExpenseListFilters.test.js
            * ExpenseListItem.test.js
            * ExpenseSummary.test.js
        + From `fixtures`
            * expenses.test.js
            * filters.test.js
        + From `reducers`
            * expenses.test.js
            * filters.test.js
        + From `selectors`
            * expenses-total.test.js
            * expenses.test.js

## Open my-react-boilerplate-v2 in terminal
`index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BOILERPLATE CHANGE THIS TITLE</title>
  <link rel="icon" type="image/png" href="/img/favicon.png" />
  <link rel="stylesheet" href="/dist/styles.css">
</head>

// MORE CODE

```

`package.json`

```json
{
  "name": "boilerplate-react-app",
  "version": "1.0.0",
  // MORE CODE
}
```

* **note** Must use hyphens for multi-word `name` in `package.json` and must be lowercase

## Let's check out the `src` directory
* `auth`
    - Everything inside this directory is good to go
* `components`
    - `NotFoundPage.js` - good to go
    - `LoadingPage.js` - good to go

`LoginPage.js`

```
// MORE CODE

export const LoginPage = props => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">BOILERPLATE CHANGE THIS</h1>
      <p>Tag line for app.</p>
      <button className="button" onClick={props.startLogin}>
        Login with Google
      </button>
    </div>
  </div>
);

// MORE CODE
```

`Header.js`

```
// MORE CODE

export const Header = props => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>BOILERPLATE CHANGE THIS HEADING</h1>
        </Link>
        <button className="button button--link" onClick={props.startLogout}>
          Logout
        </button>
      </div>
    </div>
  </header>
);

// MORE CODE
```

## Rename `ExpenseDashboardPage.js` to `DashboardPage.js`
`DashboardPage.js`

```
import React from 'react';

const DashboardPage = () => <div>Dashboard page content</div>;

export default DashboardPage;
```

## Firebase - Remove all comments
`firebase.js`

```
import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
```

## reducers
* `auth.js` - good to go

## routers
`AppRouter.js`

```
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
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
          component={DashboardPage}
          exact={true}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
```

* `PrivateRoute.js` - good to go
* `PublicRoute.js` good to go

## `store`
`configureStore.js`

```
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
```

* Add this to allow underscore dangle eslint

`.eslintrc`

```
// MORE CODE

    "no-underscore-dangle": "off"],
    "consistent-return": 0,

// MORE CODE
```

## Tests
* `actions`
    - `auth.test.js` - good to go
* `components`

* Rename `ExpenseDashbaordPage.test.js` to `DashboardPage.test.js`

`DashboardPage.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import DashboardPage from '../../components/DashboardPage';

test('should render DashboardPage correctly', () => {
  const wrapper = shallow(<DashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
```

`app.js`

```
import 'react-dates/initialize';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import AppRouter, { history } from './routers/AppRouter';
import { login, logout } from './actions/auth';
import configureStore from './store/configureStore';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
```

## Run test
`$ npm test --watch`

### Update broken snapshots
`u`

* You then hit `w` to show more
* `a` to run all tests
* Might take a bit of running all tests and restarting test but it should give you 11 passed tests

## Run dev server
* Stop test suite
* `$ npm run dev-server`

### view in `http://localhost:8080/`
* Login and Logout
* Now you have a boilerplate project that you can clone with:
    - Router
    - Authentication
    - Redux
    - React
    - Webpack

## Put this boilerplate on github
* wipe all old git history
* In the root of `my-react-boilerplate-v2` use `$ rm -rf .git` (be careful!)

`$ git status` (no status because we no longer have a git repo)

### Create git repo
`$ git init`

`$ gs` (shows status)

#### Add all changes
`$ git add .`

`$ git commit -m 'Initialize repo'`

