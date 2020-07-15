# Finish Profile Actions & Reducer
* Create actions to get the profiles

## Finish up the 3 things we need to do with actions
1. We need to do is get all the profiles
2. Get a profile by `id`
3. Get the GitHub user repository

## Under getCurrentProfile we'll add getAllProfiles
* When go to profile list page we will clear whatever is in the current profile
    - **remember** Whenever we go into the single user's profile it is going to go into the state
        + So to do this we dispatch a type of `CLEAR_PROFILE`
        + May not have to do this but it may prevent the "flashing" of the past user's profile

### Add the `GET_PROFILES` type
`actions/types.js`

```
// MORE CODE

export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILES = 'GET_PROFILES'; // add

// MORE CODE
```

### Add the getProfiles action
`actions/profile.js`

```
// MORE CODE

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
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
// MORE CODE
```

## In the reducers
* We just want to with `GET_PROFILES` is fill the `profiles` empty array with the profiles from the server

`reducers/profile.js`

```
// MORE CODE

import {
  GET_PROFILE,
  GET_PROFILES, // add

  // MORE CODE

} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [], // we are going to fill this empty array
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES: // add this
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
// MORE CODE
```

## Now we want to get the profile by `id`
* We call it userId (because we are not getting it by the profile id but the user id)

`actions/profile.js`

```
// MORE CODE

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

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
// MORE CODE
```

## Get Github repos
* `getGithubRepos` takes in the Github username
* We have a route on our back in that will return our repository (so we don't have to do much here - but the old way we did this was we interacted with GitHub from the client which was a mistake)
* We'll have a new action type called `GET_REPOS` and we'll send the data (which will be the repos as the payload)
* **note** That all the PROFIE_ERRORs we're doing the same thing

### Add types
`actions/types.js`

```
// MORE CODE

export const GET_REPOS = 'GET_REPOS';

// MORE CODE
```

`actions/profile.js`

```
import axios from 'axios';
import {

  // MORE CODE

  GET_REPOS,

  // MORE CODE

} from './types';
import { setAlert } from './alert';

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

// MORE CODE
```

* Now we need to add the `GET_REPOS` to the reducer because we need to know what happens when the repos are fetched
* We just fill the user's part of the `repos` empty array in state

`reducers/profile.js`

```
// MORE CODE

import {

  // MORE CODE

  GET_REPOS,

  // MORE CODE

} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [], // we will be filling this
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    // MORE CODE

    case GET_REPOS:
          return {
            ...state,
            repos: payload,
            loading: false,
          };
        default:
          return state;
      }
    }
```

* **note** When we get into the `posts` part our reducer will get more complicated
    - profile is a pretty simple reducer

## Next - focus on our components
* We'll have our profile component (which will have the ProfileItem component as a child - which will be each individual profile item
