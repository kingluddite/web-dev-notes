# Create a root reducer
* Will help us compose (aka "combining them") all our reducers

## Create `/rootReducer.js`
* One purpose
    - Collect all of our reducers (you will have many) and turn them into one reducer
    - We can do this using the combineReducers function provided to us via redux

`App.js`

```
/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './rootReducer';

import logo from './logo.svg';
import './App.css';

import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
  // MORE CODE
```

`rootReducer.js`

```
import { combineReducers } from 'redux';

import message from './reducer';

const rootReducer = combineReducers({
  message,
});

export default rootReducer;
```

`reducer.js`

```
const initialState = {
  messageVisibility: false
};

export default function (state = initialState, action) {
  const { type  } = action;
  switch(type) {
    case 'TOGGLE_MESSAGE':
      return state;
    default :
      return state;
  }
}
```

`> $r.props.store.getState()`

![our store](https://i.imgur.com/pY3e18w.png)

## Next - wire it up
* Use connect to wire our store up to our component
