# Starting on the Profile
* We're going to need to create a component and a route
* The Profile will be broken into a bunch of sub-components
    - The Profile component
    - The About section sub-component
    - The very top section sub-component
    - The education sub-component
    - The experience sub-component
    - The github repo

## Profile.js
* We'll need to bring in our state, bring in the actual profile data
* We'll have to call that git profile by `id`
* We'll call `getProfileById` action
* And we need to get the `id` from the route (from the URL)

`Profile.js`

* `rfcp` snippet
* We also want the `auth` state because we want to see if the user is logged in because if they are and the profile that they are viewing matches I want to have an edit profile button
* We can get the id in the URL in React with `props.match.params.id`

```
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';

function Profile({
  getProfileById,
  match,
  auth,
  profile: { loading, profile },
}) {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return <div>Profile</div>;
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
```

## Add Profile component to App.js
`App.js`

* **note** Pay attention to how we pass the `id` into a Route using `:id` placeholder

```
// MORE CODE

import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile'; // add

// MORE CODE

  return (
    <Provider store={store}>

 // MORE CODE

              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />

// MORE CODE
```

## Test UI
* Click on Profile and you'll see that profile is loaded with the user's profile
* If you click `Developers` link you'll see the profile is null (Using Redux DevTools)
    - This shows us we are getting our data (we're pulling it down from our state) so now we just have to build our our UI with a couple different components
    - Since we are getting data and displaying it we want to make sure that the Profile (data) is loaded

`Profile.js`

```
// MORE CODE

function Profile({
  getProfileById,
  match,
  auth,
  profile: { loading, profile },
}) {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? <Spinner /> : <Fragment>profile</Fragment>}
    </Fragment>
  );
}
// MORE CODE
```

## Test UI
* Refresh and you'll briefly see the Spinner
    - This lets us know the UI isn't actually rendering until the UI is loaded

## Let's add a back to profiles link
`Profile.js`

```
// MORE CODE

return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
}
// MORE CODE
```

* Now we can link back to the Profiles page

## Add Edit button
* That will go to the EditProfile if the profile we are viewing is ours
* We brought in `auth` so we can do this check
* We are not logged in so we won't see `Edit Profile` button
    - Log in and click on your logged in profile and you'll see the button
    - Click on the profile of a user not logged in and you won't see the button

## Next - Work on rest of profile
