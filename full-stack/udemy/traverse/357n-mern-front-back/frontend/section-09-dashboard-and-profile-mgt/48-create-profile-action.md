# Create Profile Action
* We are going to make our Create Profile
* We will submit the form with an action

`actions/profile.js`

* We'll send the formData as an argument
* We will redirect after we submit the form
    - We'll use the `react-router-dom` `history` object using the `push` method that will enable us to redirect programatically to a client side route
* How will we know if we are updating (editing) or creating a profile?
    - We'll use an  `edit` parameter that we'll set to `false` by default
        + We could create a totally separate function for editing/updating if you want but it is so similar keeping them in the same method is easier
    - We will use async/await
    - We will use a try/catch
    - Since we are sending data we'll use a `config` object
        + We need to have headers
            * `Content-Type: 'application/json'`
* Then we'll make the request
    - The route will be `api/profile` (remember when we created this in our backend we made the route do both creating and updating a profile)
    - We send our formData to that route and the config (headers) and then we'll use the GET_PROFILE dispatch
        + The payload will be the `res.data` (this is the actual profile)
* I also want to set an alert that the profile has been updated or that the profile has been created
* We already have `setAlert` but were not using it (we had a warning in the client console about this) - now we'll use it
    - Alert will be 'Profile Updated' if edit === true and 'Profile Created' if edit !== true
* If we are updating we don't want to redirect, but if we are creating the profile, we need to redirect to the dashboard
* We add our array of errors - if client side validation is turned off we'll validate with server side validation

## Nothing needs to be added to the reducer
* We're just using GET_PROFILE and PROFILE_ERROR which we already coded

## Jump into CreateProfile component
* We need to implement the code we just wrote
* We will import our action `createProfile`
* We need to import `Link` and `withRouter` from react-router-dom
    - **note** `withRouter` will allow us to redirect from the action (as opposed to Redirect component we used before but now we are programmatically redirecting using the history object and its `push` method
* We are importing `connect` because we need to use Redux and grab state and pull down into the CreateProfile component
* We need to create an `onSubmit` and we'll add that to our `<form>` tag
* If we are going to use `history` we need to wrap the component name with `withRouter`

`CreateProfile.js`

```
// MORE CODE

export default connect(null, { createProfile })(withRouter(CreateProfile));
```

## Note
* I was missing an alert for not filling out skills
* I needed to add this code:

`routes/api/profile.js`

* Before

```
// MORE CODE

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
    ],
  ],

// MORE CODE
```

* After

```
// MORE CODE

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty(),
    ],
  ],

// MORE CODE
```

## Test again and you will get an alert for the 2 required fields, status and skills

* Here is the complete code for CreateProfile.js

`CreateProfile.js`

```
import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR } from './types';
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

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      // that route returns all the profile data
      payload: res.data,
    });

    console.log(res.data);

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      // we have an error in our payload
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
```

* Create a profile
* Submit it
* You will see has (because the logged in user now has a profile)

## Make created updating profile green - not grey
`actions/profile.js`

```
// MORE CODE


    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
// MORE CODE
```

* Check mongoDB to see profile is updated

## Next - Working on Dashboard
* Add buttons to:
    - Edit the profile
    - Add experience (list them out)
    - Add Education (list them out)
* Also have a delete account button
