# The Auth Reducer
## Houston we have a problem
* We click Create Expense link and we go to that page whether we are logged in or out and this is bad

### Solution
* Store something in Redux related to user authentication
    - We'll keep track of whether or not a user is logged in
    - We'll store the user `id` somewhere in the user store

`app.js`

```
// MORE CODE
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('uid', user.uid);
// MORE CODE
```

* Login and you'll see the users `uid` in the console
* We'll store that value in redux
* Then we'll use that value throughout the app to determine if we are logged in (uid is define)
* or not logged in (uid is not defined)
* To do this we'll create a new reducer

## Create new reducer
* New file `reducers/auth.js`
* Changes inside `actions/auth.js`
* Reducer will be a **pure function**
    - It will handle 2 actions
        + logging in
        + logging out
    - Must provide default state
        + We'll setup state to be an object when logged in and back to an empty object when they log out
        + We could just store the uid on the state but we use an object to give us the option to store other things on the state later on
        + We pass as the second argument `action` which is the action being dispatched

`reducers/auth.js`

```js
export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
```

`actions/auth.js`

```js
import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = uid => ({
  type: 'LOGIN',
  uid,
});

export const startLogin = () => () =>
  firebase.auth().signInWithPopup(googleAuthProvider);

// export const startLogout = () => {
//   return() => {
//     return firebase.auth().signOut();
//   }
// }

export const logout = () => ({
  type: 'LOGOUT',
});

export const startLogout = () => () => firebase.auth().signOut();
```

* Our actions are in place
* Our reducers are in place
* Now we need to connect our reducer to the redux store and dispatch login/logout when appropriate

`configureStore.js`

```js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
      auth: authReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
```

* We import our `authReducer` and combine it with our other reducers

### Best Practice
* import 3rd party imports before custom imports

### Focus on dispatching login/logout in app.js
* Dispatch login after the user is logged in
* Dispatch logout after the user is logged out
* This will make sure we have the most updated info in the user's store
    - We have the id if they are logged in
    - We have nothing if they are not

```
// MORE CODE
import { login, logout } from './actions/auth';
// MORE CODE

firebase.auth().onAuthStateChanged(user => {
  if (user) {
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

## Take it for a test drive
* Lets use Redux dev tool
* This will enable us to keep track of changes to the `state`
    - When we login
        + We see uid is being stored
        + Then we have SET_EXPENSES and our expenses are being set
    - When we logout
        + The auth uid gets removed

### Good step forward
* We now know whether we are logged in or out inside the app rather than just inside the callback on `app.js`

## Code placement question
* Why put login inside dispatch inside onAuthStateChanged instead of dispatching it inside `startLogin`?
    - We did this for other asyn actions
    - We put it inside the callback on app.js because it will also run the moment the app starts and the user first visits the webpage
* If we only dispatched login and logout from inside our ascyn actions, the values would only be set or cleared on explicit logins or logouts as opposed to when they are implicitly logged in after loading the app after being logged in before

### Add test cases
* log out
* log in
* our reducer
* We want to make sure we log in and out correctly
* 4 tests

`reducers/auth.test.js`

```js
import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid: 'abc123',
  };
  const state = authReducer({}, action);
  expect(state.uid).toBe(action.uid);
});

test('should clear uid for logout', () => {
  const action = {
    type: 'LOGOUT',
  };
  const state = authReducer({ uid: 'anything' }, action);
  expect(state).toEqual({});
});
```

* Should pass 71 tests after `$ yarn test --watch`

## Test our actions generators
`/tests/actions/auth.test.js`

```js
import { login, logout } from '../../actions/auth';

test('should generate login action object', () => {
  const uid = 'abc123';
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid,
  });
});

test('should generate logout action object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT',
  });
});
```

* Should now have 73 passing tests
