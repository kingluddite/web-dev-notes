# Auth Reducer & Register Action

## Create Reducer for auth
`reducers/auth.js`

* Will have a lot more than what we had in our Alert Reducer

## First - Let's focus on registering a user
### Add 2 types
* REGISTER_SUCCESS
* REGISTER_FAIL

`actions/types.js`

```
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'; // add
export const REGISTER_FAIL = 'REGISTER_FAIL'; // add
```

## Now we are working with HTTP requests
* We are working with the backend
    - The alerts (we just worked with) had nothing to do with the backend and it was 100% React

### Where are we going to do our `axios` request?
* We will do them in our actions file
    - Just like we had a alert actions file, we'll have an auth actions file
        1. We are going to make the request
        2. Get the response
        3. If it's successful response, we'll dispatch REGISTER_SUCCESS
        4. If it's a failed response, we'll dispatch REGISTER_FAIL

## Import our named exports from types.js in our Reducer
`reducers/auth.js`

```
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';
```

* We will need an `initialState` again
    - This time it will be an `Object` instead of an array (with alerts)

### intialState object
(_below is our state for authentication_)
* We'll have a `key` named `token`
    - We'll store the token inside localStorage
* We'll have an `isAuthenticated` key (we'll initially set this to `null`)
    - But when we make a request to Register or Login and we get a successful response we'll set authenticated to `true`
    - We'll check for `isAuthenticated` to be `null` to make our Dashboard have the `logout` (essentially we'll check to show stuff only logged in users can see)
* We'll have a `loading` key - We need to check that we made a request to the backend and got a response (we'll set this to true by default - once we make the request and get the response (data) then we'll set `loading` to **false** so we'll know that the data has been loaded)
* We'll have a `user` key (we'll set this `null` by default but when we make a request to the backend - to that `api/auth` and we get the user data (including the name, email, avatar) that will get put in `user`)

#### How can we access localStorage?
* Using Vanilla JavaScript

`localStorage.getItem('token')`

`reducers/auth.js`

* We create a variable to hold our `initialState` and pass that in as our default value for `state`
    - We could pass the object directly into the function's first argument but this keeps our code clean and easier to read
* And for our second argument we put the action that will be dispatched

```
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {}
```

* Inside the function
    - We'll destructure the `type` and `payload` from the action
    - We'll run a `switch` on the **type**
        + We use a case for `REGISTER_SUCCESS`
            * Here we get the token back so we want the user to get logged in right away
            * Initially we check if the token is in localStorage and now we set the localStorage item to a name of `token`
                - Then we set the token to payload.token (remember that payload is an object)
            * We return the existing state (use spread operator `...state`)
                - Remember that state is immutable
            * We also return the payload (using the spread operator `...payload`)
            * We set `isAuthentiated` to `true`
            * We set `loading` to `false`

`auth.js`

* Make sure to add a catchall `default` that returns `state`

```
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    default:
      return state;
  }
}
```

## Now let's add a case in our switch for REGISTER_FAIL
`reducers/auth.js`

* When we fail to register `REGISTER_FAIL`
    - We remove the token
    - We return the state
    - We set the token to null in state
    - We set isAuthenticated to false in state
    - We did get a response back, even when we fail, and we set loading to false

```
// MORE CODE
switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
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

## Now we create an auth.js inside our actions folder
`actions/auth.js`

```
import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
```

## We have the action set up now we need to connect it to our component
`Register.js`

* Import `register`

```
// MORE CODE

// custom code
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

// MORE CODE
```

* Add to the second argument object of `connect()`

`Register.js`

```
// MORE CODE

export default connect(null, { setAlert, register })(Register);
```

* It's a prop so add it as a prop-type (use ES7 snippets)

`Register.js`

```
// MORE CODE

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired, // add this with `ptfr` snippet
};
// MORE CODE
```

## Also bring it in through the parameters
`Register.js`

```
// MORE CODE

const Register = ({ setAlert, register }) => {

// MORE CODE
```

## Where are we going to call this `register` action?
* Here

```
// MORE CODE

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert('Passwords do not match', 'danger');
    } else {
      console.log('SUCCESS'); // Call it here!
    }
  };
// MORE CODE
```

* We will call `register` (we can because we destructured it (instead of props.register)) and we pass it an object with `name`, `email` and `password`

`Register.js`

* We can access `name`, `email` and `password` because we are pulling them out of the component state

```
// MORE CODE

const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };
// MORE CODE
```

## We want to check the server side validation
* So temporarily remove the HTML5 form validation
    - Comment out `required`, `minlength` in the form
* It is good to have BOTH client side validation and server side validation

```
// MORE CODE

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
// MORE CODE
```

## Generate alert boxes for our server side errors
* We turned off client side validation
* Now let's test server side validation
* If we don't fill out forms we should get errors (from the errors array we are sending back from the server)
* We should get a POST status message of 400 (Bad Request)
* It will point to our 3000 port even though our proxy is 5000

### Should my client side point to port 3000? I thought I was using a proxy of 5000?
* With proxying requests to 5000 they will still appear in the browser to go to 3000, that's the point of the proxy
* It's create react app that proxies the request in the Dev server for us which is running in node
* Seeing requests go to 3000 in the browser is correct and is the expected behavior

`src/actions/auth.js`

```
import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
```

* But this is the part that captures the errors array and loops through the errors array and spits out error boxes using our `setAlert`

`auth.js`

```
// MORE CODE

  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }

// MORE CODE
```

## Test it out
* Register form
* Click Register button
* Open Redux Dev tools
* Open Action tab
* You'll see 3 SET_ALERT, a REGISTER_FAIL and 3 REMOVE_ALERT Actions
* The state will fill the alerts and the remove them
* auth will be filled with a null token, isAuthenticated is false, loading is false and the user is null
* This is the expected behavior

![errors](https://i.imgur.com/gUigSwl.png)

![Redux dev tools](https://i.imgur.com/5LRVi6g.png)

## Other tests
* If you enter a name and submit you get only 2 alerts

## Register a user
* **note** If you state isn't showing it means we forget to add our `auth` to our rootReducers

`reducers/index.js`

```
// rootReducer
// 3rd party dependencies
import { combineReducers } from 'redux';
// custom reducers
import alert from './alert';
import auth from './auth'; // add this

export default combineReducers({
  alert, // don't forget this comma!
  auth, // add this
});
```

* But when you enter a user with all valid data and click Register
    - You will see the REGISTER_SUCCESS action
    - Here is the state
        + Auth will have a token, isAuthenticated is true, loading is false

## Why after refreshing the page is `isAuthenticated` set back to null
* It was true when we register but after a refresh it is back to `null`
* The reason is using JWT (JSON Web Tokens) is a **stateless** form of authentication
    - This means we need to keep querying the server, we have to keep sending requests to load the user to see if the token matches

## Next
* We will hit that `/api/auth` route to get the user and we want that to run on EVERY SINGLE LOAD, so we'll put it on the main App.js
    - So whenever the main component App.js loads we want that `/api/auth` to be called so we can validate it to make sure the user is logged in (or check if they are logged in) and then apply whatever we need to the state
