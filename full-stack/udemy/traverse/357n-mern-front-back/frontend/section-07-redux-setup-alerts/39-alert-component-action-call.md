# Alert Component & Action Call
`actions/alert.js`

1. We have an Action called `setAlert`

![setAlert action](https://i.imgur.com/XAPInTZ.png)

```
import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
```

2. That is going to dispatch the type of SET_ALERT to the Reducer

![dispatch type of SET_ALERT](https://i.imgur.com/XberuAP.png)

`reducers/alert.js`

```
// actions
import { SET_ALERT, REMOVE_ALERT } from './actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
```

* And the reducer will add the alert to the state

![add alert to state](https://i.imgur.com/lucKIWK.png)

* Which initially is just an empty array

![empty array initializeState](https://i.imgur.com/iSdVQKI.png)

## Here is an example of calling this action
* A good place to do this is in the Register.js component where we did `Passwords do not match` console.log() but now we'll set an alert

### We will connect the Register.js component to Redux
#### We do that through `connect`
* This is available to us through the `react-redux` npm package

##### Import react-reduct
* We already installed it

![react-redux installed in React](https://i.imgur.com/pxZKd1t.png)

`Register.js`

```
import React, { useState } from 'react';
import { connect } from 'react-redux'; // add this
import { Link } from 'react-router-dom';

// MORE CODE
```

##### Remember to also export `connect`
* Whenever you use `connect` you must remember to also `export` it

`Register.js`

```
// MORE CODE

export default connect()(Register);
```

## Now we need to import the `setAlert` action
`Register.js`

```
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// custom code
import { setAlert } from '../../actions/alert';

// MORE CODE
```

### Whenever you import an Action...
* When you want to use it you have to pass it into `connect()`

#### connect()
* connect() takes two arguments

1. Any `state` that you want to map (we'll put `null` for now as we don't need anything yet
2. An object with any Actions you want to use (this is where we'll pass `setAlert`)

`Register.js`

```
// MORE CODE

export default connect(null, { setAlert })(Register);
```

### Take note of what passing `{setAlert}` as the second argument does for us
* It enables us to access `setAlert` via `props.setAlert`

`Register.js`

```
// MORE CODE

const Register = (props) => {

  // MORE CODE

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      props.setAlert('Passwords do not match');
    } else {
      console.log('SUCCESS');
    }
  };

// MORE CODE
```

* This will pass `Passwords do not match` as a `msg`

![pass in as msg](https://i.imgur.com/wx3YGE6.png)

* It will generate an `id`

```
// MORE CODE

const id = uuid.vr();

// MORE CODE
```

* This it will **dispatch** `SET_ALERT` with that `msg`, `alertType` and `id`

`actions/alert.js`

```
// MORE CODE

dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
// MORE CODE
```

### Let's pass in an alertType as `danger`
`Register.js`

```
// MORE CODE

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      props.setAlert('Passwords do not match', 'danger'); // modify this line
    } else {
      console.log('SUCCESS');
    }
  };
// MORE CODE
```

### Why are we using `danger`?
* Because in `App.css` we have classes

`App.css`

```
// MORE CODE

.alert {
  padding: 0.8rem;
  margin: 1rem 0;
  opacity: 0.9;
  background: var(--light-color);
  color: #333;
}

// MORE CODE

.btn-primary,
.bg-primary,
.badge-primary,
.alert-primary {
  background: var(--primary-color);
  color: #fff;
}

// MORE CODE

.btn-light,
.bg-light,
.badge-light,
.alert-light {
  background: var(--light-color);
  color: #333;
}

// MORE CODE

.btn-dark,
.bg-dark,
.badge-dark,
.alert-dark {
  background: var(--dark-color);
  color: #fff;
}

.btn-success,
.bg-success,
.badge-success,
.alert-success {
  background: var(--success-color);
  color: #fff;
}

.btn-white,
.bg-white,
.badge-white,
.alert-white {
  background: #fff;
  color: #333;
  border: #ccc solid 1px;
}

// MORE CODE
```

* We will make the "danger" of `alert-danger` be dynamic
    - So it can be:
        + danger
        + success
    - And that will change the background color

## Test it out in UI
* Open app in browser and view Redux Dev Tools

### Error
`'uuid' does not contain a default export (imported as 'uuid')`

* The npm package `uuid` no longer has a default export, so in our `client/src/actions/alert.js` we need to change the import and use of this package

#### change

`import uuid from 'uuid';`

#### to

`import { v4 as uuidv4 } from 'uuid';`

* And where we use it:
* from

`const id = uuid.v4();`

* to

`const id = uuidv4();`

## Here is the complete code after the code update

`actions/alert.js`

```
import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
```

## Test it out in UI
1. Visit login page
2. Open Redux Dev Tools
3. Have `State` tab selected

* There is a default action called when page loads `@@INIT`

![alert inital](https://i.imgur.com/7qUv1kT.png)

* You will see `alert` is and empty array `[]` in our state

4. Fill out form to pass validation and enter passwords that don't match
5. Click `Register` button
6. View Redux Dev Tools

![Redux Dev Tools alert message](https://i.imgur.com/AnO6p6N.png)

* In our `state` you will see the message `Passwords do not match`, alertType is `danger` and an `id` created from `uuid` node package is inside the alert array
* Also **note** that another `Action` is called `SET_ALERT`
    - This was dispatched from our `Actions` file

7. Click `Register` button 3 more times and see that 3 more objects are added inside the alert part of our Redux `state`

## Display messages in our UI
* We can't rely on Redux DevTools to display our messages
* We will need to display these messages in our UI
    - We will accomplish this by creating an `Alert` component

### Creating an `Alert` component
* **IMPORTANT** I will create a `layout` folder inside `components`
`components/layout/Alert.js` 
    - Also place `Register.js` and `Login.js` inside the `layout` folder
* Also update the main file as the paths to our components need to be modified

`App.js`

```
// MORE CODE

// custom components
import Navbar from './components/layout/Navbar'; // update
import Landing from './components/layout/Landing'; // update

// MORE CODE
```

## Cleanup
* We will destructure our code to not point to `props`

`Register.js`

* Convert this current code:

```
// MORE CODE

const Register = (props) => {

  // MORE CODE

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      props.setAlert('Passwords do not match', 'danger');
    } else {
      console.log('SUCCESS');
    }
  };

// MORE CODE
```

* To this code:

```
// MORE CODE

const Register = ({setAlert}) => {

  // MORE CODE

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert('Passwords do not match', 'danger');
    } else {
      console.log('SUCCESS');
    }
  };

// MORE CODE
```

## Create our Alert.js component with propTypes
* **tip** Use the `rafcp` and press `return` key

`Alert.js`

```
import React from 'react'
import PropTypes from 'prop-types'

const Alert = props => {
  return (
    <div>

    </div>
  )
}

Alert.propTypes = {

}

export default Alert
```

* **IMPORTANT RULE** Anytime you bring in props, make sure use `prop-types`
* Make sure to import `prop-types` also in `Register.js`

`Register.js`

```
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // add this

// MORE CODE
```

## Now add prop types to Register.js
`Register.js`

```
// MORE CODE

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
}

export default connect(null, { setAlert })(Register);
```

### ES7 Snippets help with prop types
1. You use the Name of the Component + `.propTypes` (camelCase)
2. Type your prop (`setAlert` in this case)
3. You want to use `p` for `PropTypes` (CapitalCase) + `f` for `func` (function) + `r` for `isRequired`

## Add connect to the Alert.js
* **note** Any time you want to interact with a React component with Redux whether you are getting an action or getting the `state` you want to use `connect()`

`Alert.js`

```
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = props => {
  return (
    <div>

    </div>
  )
}

Alert.propTypes = {

}

export default connect()(Alert)
```

* In the above we want to get the Alert `state`
    - What we saw in the Redux DevTools, that array, we want to get that into this component
        + We are going to use `mapStateToProps`, because that's exactly what we are doing... we are mapping the Redux `state` to a prop in this component so that we have access to it (in this case it will be the array of alerts)
            * We use an arrow function, it takes in state as an argument
            * We set the arrow function to parentheses with an object and inside whatever state we want (or whatever `prop` we want to call it - we'll call the prop `alerts` and then we use `state.WHATEVER_WE_WANT_FROM_THE rootReducer`)

`Alert.js`

```
// MORE CODE

const mapStateToProps = state => ({
  alerts: state.XXX
})

export default connect()(Alert)
// MORE CODE
```

### What do we want from our rootReducer again?
`reducers/index.js`

* Right now we only have `alert` (but later this will be filled with other `Reducers` and we can grab any one we want)

```
// MORE CODE

export default combineReducers({
  alert
});
// MORE CODE
```

* So to get the `state` inside our `alert` Reducer we just use:

`Alert.js`

```
// MORE CODE
const mapStateToProps = state => ({
  alerts: state.alert // update this line
})

export default connect()(Alert)
```

* After we do this we'll have `props.alerts` available to us

## Clean up our code by Destructuring off of `props`
* We'll destructure to pluck `alerts` off of `props`

`Alert.js`

```
// MORE CODE

const Alert = ({ alerts }) => {
  return (
    <div>

    </div>
  )
}
// MORE CODE
```

## Don't forget prop-types
* Since we are using props we need to check for prop-types
    - Uses ES7 snippets
        + `pt` PropTypes + `a` array + `r` required (`ptar` + **Return** key)

`Alert.js`

```
// MORE CODE

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
}
// MORE CODE
```

## Map through the alerts
* It is an array so we use the common `map` high order array method
    - We will map through the alerts, and output whatever the message is along with the CSS class for styling
        + In addition to that I want to make sure that it is not null (we need to make sure there is actually something in the array - I don't want to output anything if the array is empty )
* **note** We are only using one expression inside our Alert component so we can use an implicit return
* **note** Whenever you use a map to output an array that is a list make sure to set the parent element to have a `key` attribute that needs to be unique (and we'll use the `alert.id` (which is uuid) to be our unique key)
* We want to use a dynamic class name with `alert` and `alert-SOMETHING_DYNAMIC`
* We first check that the alerts are not equal to null `alerts !== null`
* Then we make sure that the alerts.length is greater than 0 `alerts.length > 0`
* Then (and only then) - **that's why we use the logical && (AND) we map through the alerts

```
<div key=UNIQUE className="alert alert-DYNAMIC">
  THE ALERT MESSAGE HERE
</div>
```

* And the code will look like:

`Alert.js`

```
// MORE CODE

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));
// MORE CODE
```

* Now if we have an error we should see:

```
<div key="123" className="alert alert-danger">
  The Passwords Do Not Match
</div>
```

## We need to place this alert in our parent component `App`
* We need to import our Alert component
* We place it just above the Switch
    - **note** The `Switch` component can only have `Route`s nested inside it

#
`Alert.js`

```
// MORE CODE

// custom components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';

// MORE CODE

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <section className="container">
          <Alert />
// MORE CODE
```

## We get an error
* TypeError: Cannot read property `length` of undefined
    - `Solution`: You need to pass `mapStateToProps` inside our use of `connect()` in `Alert.js`
* Before:

```
// MORE CODE
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect()(Alert);
```

* After adding **mapStateToProps** to `connect`

```
// MORE CODE

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
```

* And the TypeError goes away
* **Note** If we had any actions to call that would go second (just like we did in `Register.js`)

`Register.js`

```
// MORE CODE

export default connect(null, { setAlert })(Register);
```

* Since we didn't have any mapStateToProps it was null, but the Actions were passed in the second argument of `connect()`

## Test out the UI
* Enter valid registration info and do not match passwords
* You should see our Alert pop up in the UI with the alert message

![working alert](https://i.imgur.com/dlsgjfq.png)

## Review
1. In our `Register.js` we imported `connect()` from `react-redux` (let's us work with Redux)
2. We imported the `setAlert` Action
3. We export using connect() and pass as the 2nd argument the setAlert Action (inside an object) so we can use it as it is available within `props` (we destructure this to keep our code clean)
4. We call `setAlert` when the passwords don't match and we send the msg and the alertType
5. Now if we go to the Actions file `actions/alert.js` (that's what's being called) - We accept the `msg` and the `alertType`
6. We generate a unique id (uuid)
7. We dispatch and pass an object with our type SET_ALERT and the payload (msg, alertType and id)
8. Than in our Reducer `reducers/alert.js` we add the payload to the state (for SET_ALERT case) - we saw this in Redux DevTools
9. The component we created `Alert.js` is getting that state (from Redux) because we use mapStateToProps (getting state and putting `state.alert` inside `alerts` prop (we destructure this also for cleaner code)) and pass it as the first argument to `connect()`
10. We accept the destructured `alerts` in our Alerts components, we make sure it isn't null AND isn't an empty array and then if both checks pass, we output a div with a key (any list must have a unique key in React) a class name with our CSS classes to style the alert based on success or failure (or whatever we want) and the alert message inside
11. If you keep clicking `Register` with the same error you will get a bunch of red error boxes

## But now we need to remove the alert
* We have REMOVE_ALERT in our Reducer but how do we trigger it?
* We could add a `X` button and add a click event to remove it
* We will use a setTimeout to make the alert disappear after a certain amount of time passes

`actions/alert.js`

```
import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  // Remove alerts after 5 seconds
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
```

## Test in UI
* Enter non-matching passwords
* The alert error box appears
* After 5 seconds it disappears
* You will see REMOVE_ALERT Action is called and teh alert has a strike through it in Diff tab
    - You will see State tab shows alert array is empty
    - You will see the Action tab shows the type is REMOVE_ALERT with a payload `id`

![Redux DevTools and Action](https://i.imgur.com/CKWJzsf.png)

`reducers/alert.js`

```
// MORE CODE

case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
// MORE CODE
```

* The REMOVE_ALERT case is called and it filters through the alert array and return anything where the alert.id does not equal the payload (which is the id)
    - As long as the payload doesn't match the id then return it
* Add a bunch of clicks to Register and you will multiple alerts that each disappear after 5 seconds

## That was complex
* The whole logic of interacting between actions and reducers is complicated
* But once you get the hang of it it is very valuable as you can make your apps very interactive

### Add the option to pass in the type to our `setAlert`
* We can default to 5000 but allow the developer to pass in a different time to the alert

`actions/alert.js`

```
// MORE CODE

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  // Remove alerts after 5 seconds
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
```

* Now we can pass in a different time than 5000 if we want with:

`Alert.js`

```
// MORE CODE

const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert('Passwords do not match', 'danger', 3000);
    } else {
      console.log('SUCCESS');
    }
  };
// MORE CODE
```


