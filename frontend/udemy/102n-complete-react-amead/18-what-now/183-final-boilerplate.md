# Final Boilerplate
* Gut Expensify and break it down into something we can reuse for all future React projects
* duplicate `103e-exensify-app` as `my-react-boilerplate-v2`

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

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Boilerplate React App</title>
  <link rel="icon" type="image/png" href="/img/favicon.png" />
  <link rel="stylesheet" href="/dist/styles.css">
</head>
<body>
  <div id="app"></div>
  <script src="/dist/bundle.js"></script>
</body>
</html>
```

`package.json`

```json
{
  "name": "boilerplate-react-app",
  "version": "1.0.0",
  // MORE CODE
}
```

* Must use hyphens for multi-word `name` in package.json

## Let's check out the `src` directory
* `auth`
    - Everything inside this directory is good to go
* `components`
    - `NotFoundPage.js` - good to go
    - `LoadingPage.js` - good to go

`LoginPage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = props => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Boilerplate React App</h1>
      <p>Tag line for app.</p>
      <button className="button" onClick={props.startLogin}>
        Login with Google
      </button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
```

`Header.js`

```
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = props => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Boilerplate React App</h1>
        </Link>
        <button className="button button--link" onClick={props.startLogout}>
          Logout
        </button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
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

```js
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
* auth.js - good to go

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

```js
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
`$ yarn test --watch`

### Update broken snapshots
`u`

* You then hit `w` to show more
* `a` to run all tests
* Might take a bit of running all tests and restarting test but it should give you 11 passed tests

## Run dev server
* Stop test suite
* `$ yarn run dev-server`

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

### Changes you can make to Expensify
1. Add confirmation modal when removing expenses
2. Show number of hidden expenses in `/dashboard` summary
    * "Not showing x expenses because of filters"
3. Add support for another social login system
    * GitHub
    * Facebook
    * Twitter
4. Buy a custom domain and configure it with Heroku (or use subdomain on domain you own)
    * Heroku documentation for custom domains

### Indecision Changes
* Try to deploy it to the web
    - create Github repo
    - create heroku app
    - deploy it and set all of that stuff up
    - live URL someone can go to see and add list of items

## New Ideas (using [balsamiq](https://balsamiq.com/))
![login for blod](https://i.imgur.com/kfEsKbG.png)

![dashboard](https://i.imgur.com/zUVpZru.png)

* filter search posts
* search by title
* add post button
* Logout
* app.com/dashboard

## after clicking add post button
![add post](https://i.imgur.com/o3h8lFZ.png)

* `app.com/create`
* You can add a title and a body to the post
* And `Save` post
    - Takes you back to Dashboard with new post in list
* Click on post and you can edit it
    - `app.com/edit/123abc`
    - change title
    - change body
    - save
    - delete
* Also get a readable link `app.com/read/123abc` (public route)
