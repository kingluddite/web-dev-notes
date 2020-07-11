# Profile Reducer & Get Current Profile
* We'll start to work on Profile reducer, Profile actions
    - So we can make requests to our backend
    - And send that data down through the state to components (such as the Dashboard)

## Let's create our profile reducer
`reducers/profile.js`

### First let's add profile reducer to our rootReducer
`reducers/index.js`

```
// rootReducer
// 3rd party dependencies
import { combineReducers } from 'redux';
// custom reducers
import alert from './alert';
import auth from './auth';
import profile from './profile';

export default combineReducers({
  alert,
  auth,
  profile,
});
```

### What actions will we need for Profile reducers
* get the profile
* create it
* update it
* clear it from the state

### Let's create our initialState for profile
* Our `profile` will be set to null by default
    - When we log in profile will hold it will make a request, it's going to get all of our profile data and put that in there
        + Also if we visit another user's profile's page it will get put into there as well
        + both sets of data will be put in there because they're both an individual profile
* `profiles` will be set to an empty array by default
    - That will be the profile listing page where we have the list of developers (that state will be put in there)
* `repos` - When we fetch the GitHub repos they will be held in our `repos` array
* `loading` - will be set to true by default (just like we did for auth) and then once we make a request we'll set it to false
* `error` - We will use this empty object to hold any errors during the request

`src/reducers/profile.js`

```
const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (
    type
    //
  ) {
  }
}
```

### We need to set up our types
* The first action we want to do is get the profile
* And if there is an error there will be a type of profile error 

`actions/types.js`

```
// MORE CODE
export const LOGOUT = 'LOGOUT';
export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_ERROR = 'PROFILE_ERROR';
```

## Create an action
* We now need an actions file for profile

`actions/profile.js`

```
import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  // we want to hit api/profile/me
  // will give us the profile of whichever user is logged in

  try {
    const res = await axios.get('/api/profile/me');

    // We don't need to pass in an "id" because it will
    // know which profile to load from the token we sent
    // which has the user id
    dispatch({
      type: GET_PROFILE,
      // that route returns all the profile data
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      // we have an error in our payload
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
```

## Now we have to handle these actions in our Reducer
`reducers/profile.js`

```
import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
```

* We want to call the profile action we created as soon as we go to the Dashboard

* **note** I was not getting the `GET api/profile/me` endpoint and it was returning `null` it was because I used:

`routes/api/profile.js`

```
// MORE CODE

await Profile.findOne({ id: req.user.id }).populate('user', ['name', avatar']);

// MORE CODE
```

* Instead of the correct code below:

`routes/api/profile.js`

```
// MORE CODE

await Profile.findOne({ user: req.user.id }).populate('user', ['name', avatar']);

// MORE CODE
```

`Dashboard.js`

```
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
```

## Test in UI with Redux DevTool
1. Login
2. View Actions
3. @@INIT
4. LOGIN_SUCCESS
5. USER_LOADED
6. GET_PROFILE

## View payload
* You'll see profile
  - social
  - skills
  - _id
  - The user object
  - And all other profile stuff
* View state
  - You'll see profile (all profile data is now in state and we can list that on our Dashboard - experiences education we'll be able to add and delete them) and profiles (empty array)

## Next
* Build our Dashboard UI
* **note** The user can just register and not have a profile
  - If a user doesn't have a profile, we'll have a link to create one
  - We'll add a component with a form to create a profile
