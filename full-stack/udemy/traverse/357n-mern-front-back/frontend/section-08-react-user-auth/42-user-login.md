# User Login
1. We now can register a user (john doe)
2. That will give us a token
3. We created our `loadUser` Action (that will take our token and send a request to the `api/auth` route and then get the user back and also set isAuthenticated to true - with the USER_LOADED action type)

## Now we need a way to log in
* But without having to register another user

## Poor man's log out
* Chrome dev tools > Application > Storage > Local Storage > Choose domain > Click `X` (Hover over and you'll see "Delete Selected")

## Now look at Redux DevTools again
1. Reload the page
2. You will see `AUTH_ERROR`
3. Look inside the `State` tab and you will see:

```
auth
  token: null
  isAuthenticated: false
  loading: false
  user: null
```

* Why did that happen?
    - Because of what we wrote in our utility file:

`setAuthToken.js`

```
import axios from 'axios';

const setAuthToken = (token) => {
  // do we have a token inside localStorage?
  if (token) {
    // if yes, add it to the Headers
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // if no, delete the x-auth-token from headers
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
```

* **note** We have to have a token inside of `localStorage` and that has to validate against `api/auth`
    - If no token, AUTH_ERROR will run and everything gets cleared out

`actions/auth.js`

* loadUser is called in `App.js`
    - We use React hooks useEffect to run it once (like a class based component's componentDidMount)
* We also check for a token in localStorage in App.js and use setAuthToken unity function to add an x-auth-token to headers or removing depending on if there is a token (add it) or not (remove it)

`utils/setAuthToken.js`

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

* In our actions we fire a dispatch on the catch of our try/catch if try to hit the `/api/auth` endpoint and get an error
    - In the catch we dispatch a type of AUTH_ERROR

## Then in our auth reducer

`reducers/auth.js`

* We remove the `token` form localStorage
* And we return our current `auth` state object but we set token to null, isAuthenticated to false

```
// MORE CODE

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
// MORE CODE
```

## Now we'll add the login functionality
* It will be similar to register works:
    - We'll have an action
    - Copy the register action and paste it below
    - We will just pass in `email` and `password` and when we use `JSON.stringify({ email, password})` we'll create an object and stringify it
* But our endpoint we want to hit won't be `POST '/api/users'` instead we want to hit `POST '/api/auth'`
    - We want this endpoint because we are "logging in" aka "authenticating"


## NOTE!
* We want to add to the actions/auth.js a dispatch(loadUser()) for both login and register
* We do this so that `loadUser()` runs immediately

`actions/auth.js`

* For register

```
// MORE CODE

try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
// MORE CODE
```

* For login

```
// MORE CODE

try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
// MORE CODE
```

`actions/auth.js`

```
import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
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

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
```

## Add 2 new types
`actions/types.js`

```
// MORE CODE

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
```

## Add reducer for LOGIN_SUCCESS and LOGIN_FAIL
`reducers/auth.js`

```
// MORE CODE

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS, // add
  LOGIN_FAIL, // add
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
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: // add
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL: // add
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
}
```

## Now we need to add it to our Login component
`Login.js`

```
// MORE CODE

import { connect } from 'react-redux'; // add
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // add
// custom code
import { login } from '../../actions/auth'; // add

// MORE CODE

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

// MORE CODE

const onSubmit = async (e) => {
    e.preventDefault();
    // console.log('SUCCESS');
    login(email, password); // add
  };

// MORE CODE

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(Login);
```

## Test in UI
* **note** Clear token in Application localStorage before testing
* What clears out the token?
    - An incorrect login
    - `AUTH_ERROR` or `REGISTER_ERROR` or `LOGIN_ERROR` will clear the token out

### Let's test a successful login
* Make sure the `email` and `password` are correct (in Database)
* Login page
* Enter email and password
* You will see 
    - auth object with token, user and other info to state we are logged in

## Redirect
* We want to be redirected when we are logged in (aka if we are `authenticated`)
* We need to bring in our `auth` **state** (it has `isAuthenticated`)
* To do this we'll use `mapStateToProps` (like we did was with the alert to get the alert into the component
    - We could do this:
* We are going to use `Redirect` named component from `react-router-dom`

## Don't create the Dashboard component yet!
* It is a bit different and we'll create that later

`Login.js`

```
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// custom code
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';

const Login = ({ login, setAlert, auth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  if (auth.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

// MORE CODE

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login, setAlert })(Login);
```

* **note** I brought in `setAlert` to add server side validation if we need it
    - **TODO** Remember to add back in the HTML5 for client side validation

## We brought in all of auth abut we just need `isAuthenticated`
* Make this update:

`Login.js`

```
// MORE CODE

import { Link, Redirect } from 'react-router-dom'; // update
import PropTypes from 'prop-types';
// custom code
import { setAlert } from '../../actions/alert'; // add

// MORE CODE

const Login = ({ login, setAlert, isAuthenticated }) => { // update
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  if (isAuthenticated) { // add this if statement to redirect to `/dashboard`
    return <Redirect to="/dashboard" />;
  }

// MORE CODE
Login.propTypes = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool, // note that it is not required
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, setAlert })(Login)
```

## Add Redirect to Register.js also
`Register.js`

```
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// custom code
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => onChange(e)}
            name="email"
            // required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            // minLength="6"
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => onChange(e)}
            // minLength="6"
            // required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
```

## Test it out in UI
* Login or Register and you will be redirected to 404
* But once logged in you won't be able to navigate to /login or /register and instead you'll be redirected to `/dashboard` route
* Blow up token and register and you will see you are also redirected to `/dashboard`

## Next - Logout
* And change links in Navbar
    - To correspond to whether we are logged in or not
