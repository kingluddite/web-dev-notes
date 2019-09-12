# Login Page and Google Auth
* We need a way to log in and log out
* Log in on public page
* Log out on private page

## LoginPage component
* Will be shown at root of app
* We'll move Dashboard to /dashboard
* This means the login page will be show at the root instead of the dashboard
    - If user is logged in, we'll redirect them to the Dashboard

## Challenge
1. Create LoginPage component with "Login" button
2. Add snapshot test for LoginPage
3. Show Login component at root of app ----> `/`
4. Show ExpenseDashboardPage at -----> `/dashboard`

`LoginPage.js`

```
import React from 'react';

const LoginPage = () => (
  <div>
    <button>Login</button>
  </div>
);

export default LoginPage;
```

* **note** When we import above it is a **default export** so it would be imported as:

`import LoginPage from '../../components/LoginPage`

But if we exported a named export like this:

```
import React from 'react';

export const LoginPage = () => (
  <div>
    <button>Login</button>
  </div>
);
```

When we import above it is a **named export** so it would be imported as:

`import { LoginPage } from '../../components/LoginPage`

## Create our LoginPage test page
`LoginPage.test.js`

```js
import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from '../../components/LoginPage';

test('should render LoginPage correctly', () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});
```

## Run test suite
`$ yarn test --watch`

* **note** running `$ yarn test` will run test a single time (then kicks you out to terminal)

## Change AppRouter
* Stop test suite
* Run dev server `$ yarn run dev-server`

`AppRouter.js`

```
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import LoginPage from '../components/LoginPage'; // add this line
import NotFoundPage from '../components/NotFoundPage';

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

export default AppRouter;
```

* We add the LoginPage Route and point that to `/`
* We point the ExpenseDashbaordPage to `/dashboard`

## Take for test drive
* Login is home (still shows header but we'll fix that after figuring out authentication)
* We browse to `/dashboard` and we see our app functioning

## We are going to use Google Authentication
* Just to prove the user is who they say they are
* Open `Firebase` > `Expensify` > `Authentication` > `SignIn Method` > `Google` > `Enable` > `Save`

## Firebase file and the `Provider`
* We are going to use the google provider
* [Docs](https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider?authuser=0)
* Before we were using Database under Reference
  - Now we are using Auth

`firebase.js`

```js
// MORE CODE
firebase.initializeApp(config);

// change for refresh
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// MORE CODE
```

* Now firebase is exporting `googleAuthProvider`
* In this file we create an instance of a **Provider**
  - Lots of different ones:
    + Twitter
    + Github
    + Facebook
    + ... several more
    + We are using **Google** Provider
* We export `googleAuthProvider` so we can use it in other files

## We are now ready to start authenticating

## Function call to start authentication process
* Before we do this we'll focus on tracking authentication
* How do we know if are authentication worked or failed?

## How can we track authentication?
* We'll add some code to `app.js` to let us know if someone is logged in or logged out

`app.js`

```
// MORE CODE
import './styles/styles.scss';
import { firebase } from './firebase/firebase'; // update this line

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('app'));
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('log in');
  } else {
    console.log('log out');
  }
});
```

* We changed

`import './firebase/firebase';`

To:

`import { firebase } from './firebase/firebase';`

* Now we are using a named export from the firebase file

### firebase.auth()
* auth() gives us all the firebase authentication functionality
  - auth().onAuthStateChanged() - method on auth()
    + onAuthStateChanged() takes a callback function that it runs when the authentication state has changed
      * when user goes from unauthenticated to authenticated
      * or user goes from authenticated to unauthenticated

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

* This is set up to let us know if authentication works

## Make a call to log in with our google account
* We won't make this firebase call direcly inside LoginPage
  - Instead we'll create a new file inside `actions/`

`actions/auth.js`

```js
import { firebase, googleAuthProvider } from '../firebase/firebase';

const startLogin = () => () =>
  firebase.auth().signInWithPopup(googleAuthProvider);

export default startLogin;
```

* We import firebase and googleAuthProvider from our firebase file
* We add a method and export it so we can use it on other files
  - Inside it we use a pop up method and pass it our google auth provider
  - When we click login this will open a window to ask us if we will allow this google auth
    + When the user clicks the account... they then are authenticated

## Wire up Login button to call startLogin
`LoginPage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import startLogin from '../actions/auth';

export const LoginPage = props => (
  <div>
    <button onClick={props.startLogin}>Login</button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
```

* We are using `connect` and startLogin
* This components needs nothing state related so we don't need mapStateToProps
* But we do need `mapDispatchToProps` because we need to dispatch startLogin

## Access default export of LoginPage instead of named export
`AppRouter.js`

```
// MORE CODE
import LoginPage from '../components/LoginPage'; // modify this line
import NotFoundPage from '../components/NotFoundPage';
// MORE CODE
```

* This is because we used connect() inside LoginPage and we are now importing the default LoginPage that is using connect()

## Run the dev server
`$ yarn run dev-server`

* Hard refresh page
* Open console and you'll see `log out`
  - When you first vist the app, firebase in the browser tries to communicate with the server to see if you are already logged in
    + if you you will be able to view private data without logging in every single time you visit the app
  - When you click Login a popup appears, you click to accept your account
* View home page and click Log In button and you now see `log in` in console
* Refresh browser and you still see log in

## Next - Log out
