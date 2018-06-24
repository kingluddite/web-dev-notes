# Adding Thunks and API calls for actions
`$ npm i redux-thunk`

## What is a thunk?
* A function that returns a function (that's it)
* This word scares new developers
* redux thunks allow us to return a function from an action
* Currently our actions return and object
    - We can now use thunks to return a function
    - This is important because it will enable us to asynchronously hit an API

## Swap out your own API key for the movie site
* You need to do this to get it to work

`Toggle.js`

```
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleMessage, getMovies } from './actions';

const Toggle = ({ messageVisibility, toggleMessage, getMovies }) => (
  <div>
    {messageVisibility && <p>You will be seeing this</p>}
    <button onClick={toggleMessage}>Toggle Me</button>
    <button onClick={getMovies}>Load Movies</button>
  </div>
);

const mapStateToProps = state => ({
  messageVisibility: state.message.messageVisibility,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleMessage,
      getMovies,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
```

`actions.js`

```
export const TOGGLE_MESSAGE = 'TOGGLE_MESSAGE';
export const GET_MOVIES = 'GET_MOVIES';

export function toggleMessage() {
  return {
    type: 'TOGGLE_MESSAGE',
  };
}

export function getMovies() {
  return async function (dispatch) {
    const res = await fetch(
      'https://api.themoviedb.org/3/discover/movie?api_key=6bed0f87158ec0aba138db3ce714fbdd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1',
    );
    const movies = await res.json();
    return dispatch({
      type: 'GET_MOVIES',
      data: movies.results,
    });
  };
}
```

`App.js`

```
/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

import logo from './logo.svg';
import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';
import Toggle from './Toggle';

const middleware = [logger, thunk];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);

const App = () => (
    // MORE CODE
```

`reducer.js`

```
import { TOGGLE_MESSAGE, GET_MOVIES } from './actions';

const initialState = {
  messageVisibility: false,
  movies: [],
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case TOGGLE_MESSAGE:
      return {
        ...state,
        messageVisibility: !state.messageVisibility,
      };
    case GET_MOVIES:
      return {
        ...state,
        movies: data,
      };
    default:
      return state;
  }
}
```


