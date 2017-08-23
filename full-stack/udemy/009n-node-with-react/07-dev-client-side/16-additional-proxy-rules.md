# Additional Proxy Rules
![communication diagram](https://i.imgur.com/9mniQuE.png)

* When our `React` app boots up
* We will make sure our App Component (root component) calls an `Action Creator`
    - This `Action Creator` is responsible for making an API request to our backend and asking whether or not the current user is logged in
* As an example:
    - Let's assume our `Action Creator` is called `fetchUser`
        + Inside of the `Action Creator` we will use the Axios Library to make an Ajax request to our backend API
        + Specifically to the route `axios.get('/api/current_user')` 
            * That request will go out to the Express API
            * And we will get a response back
                - Which will contain the `user` object if the user is logged in
        + Once we get the response back we will use a Library called `ReduxThunk` to dispatch an action off to all the different reducers inside our app
        + That information will be sent to the `authReducer`
        + Our authReducer will look at that Action and updating some internal flag inside of it to say yes the user is logged in or no the user is not logged in
        + Once we have this new updated piece of `state`
        + We then update the content inside our Header by setting up the Header to communicate with our Redux store

## Bad News
* This is a pretty complicated process

## Good News
* We'll repeat it often so eventually we'll get used to it

## Install Axios Library and ReduxThunk Library
* `Axios`
    - Responsible for making API requests (or Ajax requests) to our backend API
* `Redux Thunk`
    - Something we use to make asynchronous ActionCreators behave the way we expect
* Kill the server
* Switch to `client` directory with `$ cd client`
* Install both with `$ yarn add axios redux-thunk`

## Time to wireup Redux Thunk
* We'll talk about what Redux Thunk is doing later
* Now we'll just wire it up

`client/src/index.js`

```
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
```

## Now we'll create an `Action Creator` inside of our project
* **note** `Action Creators` are where we initiate change inside the Redux side of our app
* We use them to maintain the `state` inside our Redux store

### Create new folder `actions`
* And a new file inside that `/client/src/actions/index.js`
* We'll start by placing our `Action Creator` inside this file
* Later we'll refactor to organize `Action Creators` inside their own files

#### Types
* We will declare our Action Types in a separate file
* Create a new file called `/client/src/actions/types.js`

`/client/src/actions/index.js`

```js
import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
  axios.get('/api/current_user');
};
```

* This is the path to where we noted before that this route tells us if the user is logged in or not
* It is important that it is a relative path!
    - In the Dev environment we make use of our proxy
    - To forward the request onto the API
    - Then the proxy will send a response back to the `React` app
    - And in Production
        + There is not proxy
        + There is no `Create-react-app` server
        + The whole proxy thing falls away and the request to the API server will go directly to our backend

#### Add new proxy rule!
* Are we going to have to add a separate proxy rule for every API route that we create
* That would take too much time and doesn't scale well at all
`/client/package.json`

```
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "proxy": {
    "/auth/google": {
      "target": "http://localhost:5000"
    },
    "/api/*": {
      "target": "http://localhost:5000"
    }
  },
```

* How awesome is that?!!
    - Now any request that comes from any path that begins with `/api/*` we switch to target
    - Now we have one single rule for every API request

`/client/src/actions/types.js`

```js
export const FETCH_USER = 'fetch_user';
```

## Next - Redux Thunk
