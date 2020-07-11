# Load User & Set Auth Token
* Now we want to handle the entire process of:

1. Taking a token that we have stored
2. Sending it to the backend for validation
3. Then loading the user

* **note** And we want all 3 steps to happen every single time the main app is loaded

## Currently we have a token in our state
* We just registered a user and it's in the state

## But ultimately
* We will make it that the token isn't in the state unless:

1. We send a request to `api/auth`
2. Get the user
3. And make sure the user is validated

* **otherwise** It will clear out the token from state as well as the other stuff (isAuthenticated, loading and user - as the other stuff is already cleared)
* **remember** This is happening because JWT is **stateless** which means it won't stay in state - to make it appear you have to keep making requests to the backend

### This is the route we want to keep hitting
`routes/api/auth.js`

```
// MORE CODE

// @route    GET api/auth
// @desc     Test route
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-hashed_password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// MORE CODE
```

* So whenever we hit the GET api/auth
* It will check for a user with the `req.user.id` (which is included in the token) and then it will send back the user
    - **remember** We created our middleware to validate the token and then put the user in here 

```
    const user = await User.findById(req.user.id).select('-hashed_password');

```

## Here is our middleware that validates token and adds user to request
`middleware/auth.js`

```
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from Header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // assign the user to the request
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
```

* We call this middleware in the `auth` of this line:

`routes/api/auth.js`

```
router.get('/', auth, async (req, res) => {
```

## Bottom line
* We need to hit the `api/auth` route all the time to see if we are logged in or not and it will give us the user data

## Add two new Types
* We need to know if the user is loaded so we'll add the `USER_LOADED` type
* We need to know if the authentication failed so we'll also add the `AUTH_ERROR` type

`actions/types.js`

```
// MORE CODE
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED'; // add
export const AUTH_ERROR = 'AUTH_ERROR'; // add
```

## Add our Actions
* Import USER_LOADED and AUTH_ERROR 
* Add at the top an Action to Load a user
* In this function we need to check to see if there is a token and if there is we need to put it in a global header
    - **remember** We have to send a header with `x-auth-token` (so if we have a token in localStorage let's always send that header)

### Add `utils`
* This will be a utility folder
* We will create a new file in here called `setAuthToken.js`
* This will be a simple function that will:

1. Take in a token
2. If the token is there
    * It will add it to the Headers
3. If it is not there
    * It will delete it from the Headers

**note** We will import `axios` but we won't be making a request with axios we are just adding a global Header
* [docs on axios for global axios defaults](https://github.com/axios/axios#global-axios-defaults)

* **note** The above file's purpose is when we have a token to send it with EVERY request (instead of picking and choosing which requests to send it with)

* Make sure you export this token (since it is the sole item in this file we can use a default export)

`src/utils/setAuthToken.js`

```
import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
```

## Back in our actions file `src/actions/auth.js`
* We'll first check our localStorage (we'll also check in our main App.js file)

`src/actions/auth.js`

```
// MORE CODE

} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
  // This will set the token to the Headers if there is a token
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
// MORE CODE
```

## In our Reducer handle both USER_LOADED and AUTH_ERROR
* Import `auth` 
* Add a case for USER_LOADED
    - return an object with our state (use spread operator)
    - We set isAuthenticated to true
    - We set loading to false (we got back our data in our response)
    - And We'll set the user to the payload (because the payload includes the user - that will include the name,email,avatar... - everything but the password - this is because in our backend route for `api/auth` we did not send back the password with `-hashed_password`)

`routes/api/auth.js`

```
// MORE CODE

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-hashed_password');

// MORE CODE
```

`reducers/auth.js`

```
// MORE CODE

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
// MORE CODE
```

* And now for the AUTH_ERROR case:
    - We want it to bring in the existing state
    - Remove the token and set token to null
    - Set isAuthenticated to `false`
    - Set loading to false
* **note** Since it is doing the exact same things that REGISTER_FAIL is doing all we have to do is this:

`reducers/auth.js`

* We clear the token from `localStorage` and all the `auth` state
    - **note** We do this because we don't want a token in `localStorage` that isn't valid EVER EVER EVER EVER!

```
// MORE CODE

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    case REGISTER_FAIL:
    case AUTH_ERROR:
      // remove anything that is in localStorage (the token)
      // for a failed login we want to remove the token completely
      localStorage.removeItem('token');

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
// MORE CODE
```

## Now we need to run this `loadUser` action
* As of now:

1. We've created the `loadUser` action
2. We have our `dispatch` for both for **success** and **error**
3. But it currently is never being executed

## Houston we have a problem
* As our code is written currently it will only check the first time that a user loads

`actions/auth.js`

```
// MORE CODE

// Load User
export const loadUser = () => async (dispatch) => {
  // This will set the token to the Headers if there is a token
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
// MORE CODE
```

* We add the following code that will perform this check every time our main app component renders

`App.js`

```
// MORE CODE

// auth custom components
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// check for token
import setAuthToken from './utils/setAuthToken'; // add this

// Redux
import { Provider } from 'react-redux';
import store from './store';

// styles
import './App.css';

if (localStorage.token) { // add this if check 
  setAuthToken(localStorage.token);
}

const App = () => (
// MORE CODE
```

## If we want to run the `loadUser` action we need to import it
`App.js`

```
// MORE CODE

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth'; // add
// MORE CODE
```

## How will we call `loadUser`
* We will use React Hooks `useEffect`

### If we were using React classes
* We could use **React life cycle methods** like `componentDidMount` and that would be where we would call this if we were using a class
    - But we are not using classes and we are using a functional component with hooks

### How do we import useEffect?
* Like this:

`App.js`

```
import React, { Fragment, useEffect } from 'react';

// MORE CODE
```

* We need to restructure our App.js slightly because currently it just uses returns one expression so we can use use an `implicit` return and group everything inside parentheses like this:

`App.js`

```
// MORE CODE

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" render={null} />
            <Route component={NotFound} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);
// MORE CODE
```

* But since we are using `useEffect` we need to use curly braces and explicitly return what we are rendering like this:

`App.js`

```
// MORE CODE

const App = () => {
  useEffect(() => {
    //
  });

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" render={null} />
              <Route component={NotFound} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
// MORE CODE
```

## useEffect
* [docs](https://reactjs.org/docs/hooks-effect.html)
* [docs on skipping effects](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects)
    - If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument
    - This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run
* It takes in a function
* How can we dispatch the loadUser action from here?
    - By using the `store` (we have access to it as we have imported it) and `store.dispatch(loadUser())`

`App.js`

```
// MORE CODE

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
// MORE CODE
```

* **caution with useEffect** - There is a gotcha with useEffect that is hard to explain
    - Essentially when the state updates, useEffect will keep running and will be a constant loop (unless!) we add a second parameter with empty brackets

`App.js`

* Doing the following ensures that `useEffect` only runs once
    - And we only want to run this once when it's loaded (aka when it's mounted)
    - By using these `[]` is making `useEffect` act like the React class based component's `componentDidMount` life cycle event
        + **note** you can put properties in the square brackets and that will make sure that useEffect only updates if those properties in the square brackets update

```
// MORE CODE

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
// MORE CODE
```

## Test out our code in the UI
* Register a new user again
* Refresh the page
* Look at Redux DevTools
* You will see `USER_LOADED`
    - This is coming from our main components (App.js) `useEffect` hook
    - Every time I reload the page `USER_LOADED` will run

![user data](https://i.imgur.com/NwHyc6N.png)

* If you view the `state` you'll see:
    - the token
    - the user is authenticated
    - you have access to the user data

## Next
* Log in and authenticate
