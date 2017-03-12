Freestyle coding

[JSONPlaceholder](https://jsonplaceholder.typicode.com/)
Fake Online REST API for Testing and Prototyping
* We will fetch data using Redux and fetch data using JSONPlaceholder
    - Gives us a nice API to use for posts, comments, photos, todos
    - We will deal with users
       + We'll make a GET request to a URL that will return a JSON object holding users
       + We will bring them in using Redux and then display them using React

## Webpack Starter
[link to Webpack Starter](https://github.com/bradtraversy/webpack-starter)


webpack - is a bundler that will allow us to install React and Redux among other packages using npm

need nodejs installed

### axios
We will use axios to make our GET request through our Redux file

`$ npm i axios --save`

### babel
Used to compile all the jsx in the React Components and allow us to use the ES2015 module syntax so we can import modules and files

### webpack
Used for our module bundler

### webpack-dev-server
Will allow us to run the server and application while we're working on it

#### What is react-dom
React has its own virutal DOM which is its own smaller version of the DOM where it can update pieces at a time so that we don't have to reload the whole page, we can just update certain Components

### Adding Stuff to `package.json`
* react-redux
    - Responsive for binding React and Redux together
* redux
    -  
* redux-logger
    - Will tell us what's going on in the console
* redux-promise-middleware
    - So we can use asynchronous promises
* redux-thunk
    - Allows us to use functions as our actions

`$ npm i react-redux redux redux-logger redux-promise-middleware redux-thunk -D`

Your dependencies in `package.json` should look like this:

```
  "dependencies": {
    "axios": "^0.15.3",
    "bootstrap": "^4.0.0-alpha.6",
    "history": "4.2.0",
    "lodash": "^4.17.4",
    "re-base": "2.2.0",
    "react": "15.3.2",
    "react-addons-css-transition-group": "^15.3.2",
    "react-addons-transition-group": "^15.4.2",
    "react-dom": "15.3.2",
    "react-redux": "^5.0.3",
    "react-router": "4.0.0-alpha.4",
    "reactstrap": "^4.2.0",
    "redux": "^3.6.0",
    "redux-logger": "^2.8.2",
    "redux-promise-middleware": "^4.2.0",
    "redux-thunk": "^2.2.0"
  },
```

`src/store.js`

```
import {applyMiddleware, createStore} from 'redux';

import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import reducer from './reducers';
```

## What are reducers?
Something we will submit actions to and that's where we can change our state. Our state will be a single object. We'll have different actions submitted to the reducer where we can do whatever we want to do. We will fetch data from an API and then return it

`src/reducers.js`

`UserList.js`

```
import React from 'react';

class UserList extends React.Component {
  render() {
    return (
      <div>
        User List Component
      </div>
    )
  }
}

export default UserList;
```

`App.js`

```
import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import Header from './Header';
import Nav from './MainNav';
import Roster from './Roster';
import Player from './Player';
import UserList from './UserList';
// CODE
return (
            <div>
                <Header tagline="Because Soccer Does Matter" />
                <Nav />
                <div className="row">
                    <div className="col">
                        <UserList />
                        <Roster
                          addPlayer={this.addPlayer} loadSamples={this.loadSamples}
                          addSeason={this.addSeason}
                        />
                    </div>
// CODE
```

`index.js`

```
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter, Match, Miss} from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App';
import store from './store';
import TeamPicker from './components/TeamPicker';
import NotFound from './components/NotFound';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={TeamPicker} />
        <Match pattern="/team/:teamId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Provider store={store}><Root/></Provider>, document.querySelector('#main'));
```

## store.js
```
import {applyMiddleware, createStore} from 'redux';

import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import reducer from './reducers/index';

const middleware = applyMiddleware(promise(), thunk, logger());

export default createStore(reducer, middleware);
```

`/src/reducers/index.js`

* We use combineReducer for scalability. We could put them all in one reducer file but this means we could easily add too our app and just put them all in their own reducer file

```
import { combineReducers } from 'redux';

import { users } from './usersReducer';

export default combineReducers({
  users
});
```

**note** All a reducer is, is a pure function

`src/reducers/usersReducer.js`

```
export default function reducer(state = {
  users: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch(actions.type) {
    case 'FETCH_USERS': {
      return {...state, fetching: true}
    }
    case 'FETCH_USERS_FULFILLED': {
      return {...state, fetching: false, fetched: true, users: action.payload }
    }
    case 'FETCH_USERS_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }

    default:
  }

  return state;
}
```

we pass the reducer 1) a state (the intial state), 2) an action (we submit actions to our reducer)

users is set to an empty array
fetching is set initally to false as is fetched
error is set initally to null

now we test different actions being submitted (could use an `if` statement but it is easier to use a `switch` statement)

we are testing `action.type`

we use the ...state to spread our option to an array
are we fetching (true)
are we done fetching and we got our data (acton.payload)
or was their an error?

## Actions
new folder `/src/actions/userActions.js`

```
// make actual GET request
import axios from 'axios';

export function fetchUsers() {
  return function(dispatch) {
    axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          dispatch({type: 'FETCH_USERS_FULFILLED', payload: response.data})
        })
        .catch((err) => {
          dispatch({type: 'FETCH_USERS_REJECTED', payload: err})

        })
  }
}
```

`App.js`

`import {connect} from 'react-redux';`

* helps connect redux to react
    - will use a decorator
        + 
