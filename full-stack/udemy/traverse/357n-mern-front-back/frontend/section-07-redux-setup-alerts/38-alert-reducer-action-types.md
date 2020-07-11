# Alert Reducer, Action & Types
* We just set up:
    - Our Redux Store
    - And Our `rootReducer`
        `reducers/index.js`

## Let's create our `Alert` Reducer

`reducers/index.js`

```
// rootReducer
// 3rd party dependencies
import { combineReducers } from 'redux';
// custom reducers
import alert from './alert'; // add this

export default combineReducers({
  alert // add this
});
```

## What is a Reducer?
* It is just a function that takes in a piece of state (any state that has to do with alerts) and an Action
    - **note** An `Action` is going to get **dispatched** from an `actions` file

### The alert Reducer
* We'll have an `initialState` that will just pertain to alerts

#### What will alerts look like
* They will be an object that has:
    - id
    - msg
    - alertType (success or error) - We'll use this to output a red or green color for our alert
    - It will be an array of objects

`reducers/alert.js`

```
// example of what the intialState array of objects will look like
const initialState = [
  {
    id: 1,
    msg: 'Please log in',
    alertType: 'success'
  },
  {
    id: 2,
    msg: 'You messed up',
    alertType: 'error'
  },
  {
    id: 3,
    msg: 'Destroy! (Dr Who reference)',
    alertType: 'error'
  }
]
```

* But for now it will just be an empty array

`alert.js`

```
const initialState = [];
```

## Make sure to export the alert Reducer
* It will take in 2 arguments
    - state (default value of the `initialState`)
    - action
        + Will contain:
            * `type` (mandatory)
                - We need to evaluate the `type`
                    + We do that with a `js` **switch** statement
            * `payload` (the data)
                - Sometimes you might now have any data

`alert.js`

* We could use a String for types
    - But common convention is to use `variables` for **types** (and that's what we will do)

```
const initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SET_ALERT':
  }
}
```

## Where do all our `action` files go?
`src/actions`

* This is where we will make HTTP requests (and all our action files reside)

### We will also hold our variables here:
`src/actions/types.js`

* This file will hold all of our **constants**
* Some people call this file `constants.js` 

`src/actions/types.js`

```
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
```

* This may seem odd or strange at first
* But there is a method to our madness
    - We do this so that if we need to change the constant, we can just change it inside this file and it will change everywhere we use it
        + If we didn't do this all changes to constants would require lots of find and replace updates
    - Also having a centralized file of all your `types` is great to have

## Import the named exports into our alert Reducer
`reducers/alert.js`

```
// actions
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_ALERT':
  }
}
```

* We convert our String to our imported named export constant

```
// MORE CODE

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
  }
}

// MORE CODE
```

* Depending on the type we need to decide what we want to send down to the `state`
    - So we'll need to `return` something here
    - We will return an array
        + **remember** That state is immutable, so we have to include any other state that is already there, so we'll use the js spread operator `...`

`reducers/alert.js`

```
// MORE CODE

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state]; // add this
  }
}

// MORE CODE
```

* And now that we have all of the `state` we'll add our data (inside `payload`) like this:

```
// MORE CODE

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
  }
}

// MORE CODE
```

* Other developers might call `payload` something else (personal preference)
* Remember payload could have
    - payload.msg
    - payload.id
    - payload.alertType
* This will add a new alert to the array

### Remove an alert
* We'll remove a specific alert by it's `id`
    - So we'll return the state (which is an array) and we'll `filter` through the alerts (we need to find a specific alert by it's `id`)

```
// MORE CODE

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
  }
}

// MORE CODE
```

* The payload above will be just the `id` (the payload can be whatever we want)
    - This will make more sense when we see the actions file when we dispatch these
* We'll add a `default` umbrella case to just return the state
    - **note** Every Reducer we create will have a default case where we just return the `state`

## Here is our final reducer for alert.js
`alert.js`

```
// actions
import { SET_ALERT, REMOVE_ALERT } from './actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
}
```

## Let's destructure to clean up our code
`reducers/alert.js`

* **note** We filter through all the alerts except for the one that matches the payload (id)

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

## Create our Action file
`src/actions/alert.js`

```
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => dispatch => {
  //
};
```

* We import SET_ALERT and REMOVE_ALERT named variables so we can dispatch them (which will call the case that we just put in the Reducer)
* We want to be able to dispatch more than one action type from this function (so we have something called `dispatch` that we can add)
    - We are able to do this because of our `thunk` middleware we added
* We currently will take in 2 arguments `msg` and `alertType`
    - **note** This is what an alert action will look like:

```
{
    id: ...
    msg: ...
    alertType: ...
}
```

## We need to generate a random `id`
* We could do this with vanilla JavaScript
* But the `uuid` npm package makes it super simple

### Install uuid
* This will give us a universal id on the fly
* cd into `client`

`$ cd client`

* And install `uuid`
* Make sure to import `uuid`

`$ npm i uuid`

* We will be using version 4 of uuid (there are different versions)
* We want to call that `SET_ALERT` that is in our Reducer

`src/reducers/alert.js`

```
// MORE CODE

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];

// MORE CODE
```

## We'll call SET_ALERT from inside our action
* We do that by using `dispatch`, pass it an object and set the type to `SET_ALERT`

`actions/alert.js`

```
import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
  });
};
```

* So now that we dispatch this:

`reducers/alert.js`

```
// MORE CODE

  switch (type) {
    case SET_ALERT:
      return [...state, payload];

// MORE CODE
```

* We return `[...state, payload]` but it needs the payload so we need to also send along the payload

`actions/alert.js`

```
import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }, // add this
  });
};
```

## Next
* Create an alert react component that will interact with our action
* We'll call the setAlert action from the component
    - Then `SET_ALERT` will get dispatched
    - Then the state `return [...state, payload]` will get passed down to the component
