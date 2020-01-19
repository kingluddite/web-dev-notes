# The Auth Reducer
* As users are navigating between routes we need to make sure the user has the correct information for that route
* Currently if we are on the login page and click create expenses link it will take me to that page - no questions asked
  - This is a problem

## Houston we have a problem
* We click Create Expense link and we go to that page whether we are logged in or out and this is bad

### Solution
* We will store something in Redux related to user authentication
    - We'll keep track of whether or not a user is logged in
    - We'll store the user `id` somewhere in the user store

`app.js`

* We have access to the user `id` via user object

```
// MORE CODE
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(user);
// MORE CODE
```

* You will see the user object data in the client console
* You can see a property called `uid` and that's the user id that we can use when we are logged in
* Let's log it out to the client console

```
// MORE CODE
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('uid', user.uid);
// MORE CODE
```

* Login and you'll see the users `uid` in the console
* We'll store that value in Redux
* Then we'll use that value throughout the app to determine if we are logged in (`uid` is defined)
  - Or not logged in (`uid` is not defined)
* To do this we'll create a new Reducer

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

## reducers/auth.js
* This is a new file
* This will be just a **pure function** as it was in the past
  - **remember** `Pure functions` are functions that accept an input and returns a value without modifying any data outside its scope(Side Effects)
  - Its output or return value must depend on the input/arguments and pure functions must return a value
* The purpose of this reducer is to handle both actions:
  - One for logging in
  - One for logging out

`reducers/auth.js`

```
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

* We needed to provide our default `state`
  - We set `state` up to be an object
    + We'll add a property on that object when the user is logged in
    + We'll wipe that object back to an empty object when the user is logged out

### Why not just store the user `id` as the `state`?
* You could easily do that if you want
* But we are storing it as a property in case I need to store other things on that object later on

### The action argument
* The second argument is for the `action` that is being dispatched

### The switch statement
* Now we pass in the `action.type` into our switch statement
* And we can easily set up what to do when logged in and logged out inside this switch statement
  - case for LOGIN
    + In this case we'll return the new `state` which will be an object
    + And on that object we'll attach the `uid` and we'll get the value from `action.uid`
      * So when I dispatch LOGIN I have to pass the `uid` along so I can actually set something
  - case for LOGOUT
    + I'll just return an empty object
  - default case
    + We add this to return the `state` value in case it is not a LOGOUT action or a LOGIN action (then this user does not care)

## Now define our 2 Reducer actions

`actions/auth.js`

* We add on to this existing file

```
import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = uid => ({
  type: 'LOGIN',
  uid,
});

export const startLogin = () => () =>
  firebase.auth().signInWithPopup(googleAuthProvider);

// MORE CODE

export const logout = () => ({
  type: 'LOGOUT',
});

export const startLogout = () => () => firebase.auth().signOut();
```

* Our `actions` are in place
* Our `reducers` are in place
* Now we need to connect our reducer to the Redux store and dispatch login/logout when appropriate

`configureStore.js`

```
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

### Best Practice!
* Import 3rd party imports before custom imports

### Focus on dispatching login/logout in `app.js`
* Dispatch `login` after the user is logged in
* Dispatch `logout` after the user is logged out
* This will make sure we have the most updated info in the user's store
    - We have the `id` if they are logged in
    - We have nothing if they are not

`app.js`

* We remove `import { setTextFilter } from './actions/filters'` as we are no longer using it

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
* Lets use Redux dev tools
  - This will enable us to keep track of changes to the `state`
    - When we login
        + We see `uid` is being stored
        + Then we have `SET_EXPENSES` and our expenses are being set
    - When we logout
        + The user "auth" `uid` gets removed
* Very useful tool
  - Use the `Action`, `State` and `Diff` to see what is happening as you log in and log out

### Good step forward
* We now know whether we are logged in or out inside the app rather than just inside the callback on `app.js`

## Code placement question
* Why put login inside dispatch inside onAuthStateChanged here: 

`app.js`

```
// MORE CODE

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // console.log('uid: ', user.uid);
    store.dispatch(login(user.uid));

// MORE CODE
```

* (continued from above question) Instead of dispatching it inside `startLogin` (like we've done for our other asynchronous actions)? (see below code fragment)

`src/actions/auth.js`

```
// MORE CODE

export const startLogin = () => () =>
  firebase.auth().signInWithPopup(googleAuthProvider);

// MORE CODE
```

## Answer to question
* We put it inside the callback on `app.js` because it will also run the moment the app starts and when the user first visits the web page
  - So when a user first visits the web page this code will trigger:
    + And it will let us know if the user is logged in or logged out and we can make sure the Redux store is up to date
    + If we only dispatched login and logout from inside of our async actions the values would only ever get set or cleared when someone explicitly logged in or logged out
      * As opposed to when they are implicitly logged in by just loading the application after having been logged in before

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

### Add 4 test cases for:
* log out
* log in
* Our Reducer
* We want to make sure we log in and out correctly

`reducers/auth.test.js`

```
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

## Run the tests
`$ npm test -- --watch`

* Should pass 71 tests after 

## Test our actions generators
`/tests/actions/auth.test.js`

```
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

## Next
* Kick users out of private pages if they are not authenticated
