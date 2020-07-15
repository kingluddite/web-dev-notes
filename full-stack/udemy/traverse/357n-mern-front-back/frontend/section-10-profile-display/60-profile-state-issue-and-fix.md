# Profile State Issue & Fix
* There is a security flaw in this app. If a guest user browses a dev profile and then registers, the browsed users profile data is still in the "profile" and the newly registered user then sees and can edit the user's info

## Many ways to handle this
* The easiest way is to clear the "profile" state when no profile is found for the new user
* Convert this:

`reducers/profile.js`

```
// MORE CODE

case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
// MORE CODE
```

* To this:

```
// MORE CODE

case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
// MORE CODE
```

## Another way
* In the error handler for `getCurrentProfile()` in `actions/profile.js`, dispatch CLEAR_PROFILE which will essentially do the same thng and set `profile: null`

`actions/profile.js`

```
// MORE CODE

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
    // security fix to clear profile
    dispatch({ type: CLEAR_PROFILE });

    dispatch({
      type: PROFILE_ERROR,
      // we have an error in our payload
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// MORE CODE
```

