# Login Page and Google Auth
* We need a way to log in and log out
* Log in on public page
* Log out on private page

## LoginPage component
* Will be shown at root of app
* We'll move Dashboard to `/dashboard`
* This means the login page will be shown at the root instead of the dashboard
    - If user is logged in, we'll redirect them to the Dashboard

## Challenge
1. Create `LoginPage` component with "Login" button
2. Add snapshot test for `LoginPage`
3. Show `Login` component at root of app ----> `/`
4. Show `ExpenseDashboardPage` at -----> `/dashboard`

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

* When we import above it is a **named export** so it would be imported as:

`import { LoginPage } from '../../components/LoginPage`

## Create our LoginPage test page
`LoginPage.test.js`

* Make sure you import LoginPage as a **named export**

```
import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should render LoginPage correctly', () => {
  // no need to pass any props as LoginPage takes no props
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});
```

## Run test suite
`$ npm test -- --watch`

* You should see all tests run and 1 new snapshot is created
* **note** running `$ npm test` will run test a single time (then kicks you out to terminal)

## Change AppRouter
* Now it is time to focus on changing our AppRouter component
* Stop test suite
* Run dev server `$ npm run dev-server`

`AppRouter.js`

* Change to named exports for:
  - AddExpensePage
  - EditExpensePage
  - LoginPage

```
// MORE CODE

import { AddExpensePage } from '../components/AddExpensePage';
import { EditExpensePage } from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import { LoginPage } from '../components/LoginPage'; // add this line
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
        
        // MORE CODE

      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
```

* We add the `LoginPage` route and point that to `/`
* We point the `ExpenseDashboardPage` to `/dashboard`

## Take for test drive
* `Login` is home (still shows header but we'll fix that after figuring out authentication)
* We **manually** browse to `/dashboard` and we see our app functioning

## If it works - challenge successfully completed

## We are going to use Google Authentication
* Just to prove the user is who they say they are
* Open `Firebase` > `Expensify` > `Authentication` > `SignIn Method` > `Google` > `Enable` > `Save`
  - Make sure to add your email

## Firebase file and the `Provider`
* We are going to use the Google provider
* [Docs](https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider?authuser=0)
* Before we were using Database under Reference
  - Now we are using Auth

`firebase.js`

```
// MORE CODE

firebase.initializeApp(config);

// change for refresh
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };


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

## We need to make a function call to start authentication process
* Before we do this we'll focus on tracking authentication

### We'll create a button to track if authentication succeeded or failed
* How do we know if our authentication worked or failed?

#### How can we track authentication?
* We'll add some code to `app.js` to let us know if someone is logged in or logged out

`app.js`

```
// MORE CODE
import './styles/styles.scss';
// We add firebase as a named export below
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

// We need to access firebase
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
* `auth()` gives us all the firebase authentication functionality
  - `auth().onAuthStateChanged()` - method on `auth()`
    + `onAuthStateChanged()` takes a callback function that it runs when the authentication `state` has changed
      * When **user** goes from unauthenticated to authenticated (logged in)
      * Or **user** goes from authenticated to unauthenticated (logged out)

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

* The only reason we are setting up the above code is to let us know if authentication works

## Now we need to make a call to log in with our google account
* We won't make this firebase call directly inside `LoginPage`
  - Instead we'll create a new file inside `actions/` called `auth.js`
  - This is where we can write our firebase related stuff
  - It is for authentication so we name it `auth.js`

`actions/auth.js`

* We'll be adding more exports later

```
import { firebase, googleAuthProvider } from '../firebase/firebase';

// LONG WAY
// export const startLogin = () => {
//   return () => {
//     return firebase.auth().signInWithPopup(googleAuthProvider);
//   }
// }

// SHORT WAY
export const startLogin = () => () =>
  firebase.auth().signInWithPopup(googleAuthProvider);

```

* We import firebase and `googleAuthProvider` from our firebase file
* We add a method and export it so we can use it on other files
  - Inside it we use a pop up method and pass it our google auth provider
  - When we click login this will open a window to ask us if we will allow this google auth
    + When the user clicks the account... they then are authenticated

## Wire up Login button to call startLogin
`LoginPage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

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

* We are using `connect` and `startLogin`
* **Note** This components needs nothing state related so we don't need `mapStateToProps`
* But we do need `mapDispatchToProps` because we need to dispatch `startLogin`
* We use `undefined` because we are not using `mapStateToProps`

## Access default export of `LoginPage` instead of named export
`AppRouter.js`

```
// MORE CODE
import LoginPage from '../components/LoginPage'; // modify this line
import NotFoundPage from '../components/NotFoundPage';
// MORE CODE
```

* This is because we used `connect()` inside `LoginPage` and we are now importing the default `LoginPage` that is using `connect()`

## Run the dev server
`$ npm run dev-server`

### Test it out in browser
* Switch over to login page `http://localhost:8080`
* Hard refresh page
* Open dev console and you should see `log out`
  - When you first visit the app, firebase in the browser tries to communicate with the server to see if you are already logged in
    + [If you are logged in] be able to view private data without logging in every single time you visit the app
    + This shows you the function that keeps track of whether we have authenticated has already fired

### Now lets authenticate (log in)
* Click `Login` button and a popup window should appear,
  - Click to accept the gmail account you want to authenticate with
* After accepting you will see `log in` in console
  - Congrats! You just authenticated
* Refresh browser and you still see log in
  - Log in is still in console

### Recap
* We just set up authentication
* We are not doing anything meaningful with it yet but it is working

#### We set up our Provider
`firebase.js`

`firebasebase.auth.GoogleAuthProvider()`

* This allows us to set up firebase to authenticate with Google
* We also had to enable GoogleAuth in the firebase dashboard

```
// MORE CODE

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
```

* But that alone wasn't enough...
  - We also had to do is pass the Provider into a function `signInWithPopup(googleAuthProvider)`
  - That is what showed the popup, allowed me to pick a Google account to authenticate with

`src/actions/auth.js`

```
import { firebase, googleAuthProvider } from '../firebase/firebase';

// export const startLogin = () => {
//   return () => {
//     return firebase.auth().signInWithPopup(googleAuthProvider);
//   }
// }

export const startLogin = () => () =>
  firebase.auth().signInWithPopup(googleAuthProvider);
```

* We also used `onAuthStateChanged()`

`app.js`

* This allowed us to run [this function](https://i.imgur.com/1JMiD3E.png) every single time the authentication state changed
  - Including when we first loaded the application

```
// MORE CODE

import './styles/styles.scss';
import { firebase } from './firebase/firebase';

// MORE CODE

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('log in');
  } else {
    console.log('log out');
  }
});

```

## Next - Log out
* We will continue to integrate the firebase authentication
