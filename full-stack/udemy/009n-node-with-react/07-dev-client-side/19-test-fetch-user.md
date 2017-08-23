# Testing Fetch User
## Import connect and our actions
`App.js`

```js
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

// more code
```

* Redux was built assuming you were not going to use it with React at all
* The purpose of the react-redux library is all about the combatibility between the React and Redux libraries
* We make use of the `connect` function to give certain Components the ability to call `Action Creators`
* `import * as actions from '../actions';`
    - We soon will have many different `Action Creator` and this is a great time saving way to import them all at one time
    - `* as actions` means take all the different `Action Creators` we defined and assign them to the object `actions`

## Now make use of the `connect` helper and the `actions` object
* To wire them up to the App Component

`connect(mapStateToProps, AllActionCreatorsWeWantToWireUp)(App);`

`App.js`

```
// more code
class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
```

* **note** Once we pass in all these different `actions` they are assigned to the App Component as `props`

`App.js`

```
// more code
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
// more code
```

## Test
* We need to test whether or not our data that says whether or not our user is logged in gets communicated to our reducer

`client/src/reducers/authReducer.js`

```
export default function(state = {}, action) {
  console.log(action); // add this log statement
  switch (action.type) {
    default:
      return state;
  }
}
```

## Review
![redux flow](https://i.imgur.com/Q7xjqh7.png)

* When `React` app boots up
* The App Component will automatically call the `Action Creator` (fetch)
* The `Action Creator` will make the Ajax request
* Once the request is resolved
* We get access to the `dispatch` function
* And we will automatically, on our own, very manually, dispatch an action
* That action will be sent off to all of our different Reducers (only one right now authReducer) - with a console.log(action) - to verify that the action is coming across

## Test
* Start up server in `server` directory
* `$ npm run dev`

### Houston we have a problem!
* `this.props.fetchUser` is not a function

![fetchUser error](https://i.imgur.com/cfzJ9UV.png)

* If you open `client/src/actions/index.js` you'll see we never exported `fetchUser` so it can't be used in other files
* Make this change and all will be well

`client/src/actions/index.js`

```js
import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => { // add the `export` keyword here
  return function(dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
```

# Refresh browser
![actions working](https://i.imgur.com/99QRe4m.png

* We have 4 console logs
* One log for every action that comes into that reducer `authReducer`
    - The first 3 are part of the Redux bootup process and we don't care about them
* We care about the 4th one which will tell us whether the user is signed in or not
* We see the type of `fetch_user` and it appears Redux Thunk worked properly
* We made the request to our backend server
* And after the test was completed
* We dispatched an Action
* Which was sent directly to all of our different reducers

## axios payload.data
![axios payload](https://i.imgur.com/f7l76W4.png)

* payload is the axios response object
* The payload has a property `data`
* Which contains the JSON the server sent back to us
* Then look closely
    - You'll see your `googleId`
    - You'll see your `MongoDB` `_id`
    - Awesome!
    - We are now able to ask if our user is logged in

## Troubleshoot
* If you don't see any `data`
* It probably means you are not logged in
* To check visit `localhost:5000/api/current_user`
* If you don't see your user object data in JSON on that page, you are not logged in and you'll have to visit the login route
* I was logged in but logged out `http://localhost:5000/api/logout` and then returned to `localhost:3000` and saw my data was empty
* But if I log back in with `http://localhost:5000/auth/google` and then visit `localhost:3000` I'll see my user data is back

![no data and logged out](https://i.imgur.com/yJ662VF.png)
