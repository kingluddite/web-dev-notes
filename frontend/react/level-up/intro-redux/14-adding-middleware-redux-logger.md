# Adding Middleware Redux Logger
* This will be middleware that will console.log() anytime we have an action
    - This will save us from always going back to redux dev tools to see if something worked

## install redux-logger
`$ npm i redux-logger`

* This needs to be added when we are creating our store

## applyMiddleware
* comes from redux itself

`App.js`

```
/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux'; // we update this line with applyMiddleware
import logger from 'redux-logger'; // we add this line

// MORE CODE

// We add our logger (any other middleware can be added by adding commas)
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(logger)),
);

const App = () => (
    // MORE CODE
```

* Chrome dev tools > Settings > Preferences > Appearances > Dark theme
* click toggle
    - now we get
        + action
        + prev state
        + next state
        + now we can tell what happened and what is going on inside each of our redux actions and dispatches

## Now we will use a pattern that will let us easily add new middleware

`App.js`

```
// MORE CODE
import logo from './logo.svg';
import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';
import Toggle from './Toggle';

const middleware = [logger];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);
// MORE CODE
```

## Next - Adding Thunk
