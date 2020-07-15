# Display Profiles
* We're all set with the Profile actions and reducer

## We are going to create a `components/profiles`
* **note** The `profiles` is plural
* We will also have a `profile` folder (singular - because it has to do with the individual profile)

### Two new components
* `components/profiles/Profiles.js`
    - `racfp` snippet
    - Import `Fragment`, `useEffect` from `react`
        + We need `useEffect` because as soon as this profile loads we need to call that `getProfiles` action that we just created
    - Import `connect` from `react-redux`
    - Import spinner
        + While the profiles are loading we want to show the spinner
* `components/profiles/ProfileItem.js`
    - This will be a child component of `Profiles`

#
`components/profiles/Profiles.js`

```
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return <div></div>;
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
```

## Bring in Profiles into App.js
* Will be a public route so `<Route>` (places above the Dashboard route)

#
```
// MORE CODE

import CreateProfile from './components/profile-forms/CreateProfile';
import Profiles from './components/profiles/Profiles'; // add

// MORE CODE

const App = () => {

    // MORE CODE

              <Route exact path="/profiles" component={Profiles} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />

// MORE CODE
```

## Update Navbar
* Move Developer Link and point to `/profiles` route
    - We'll put it in the authLinks and guestLinks fragment

`Navbar.js`

```
// MORE CODE

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>

// MORE CODE

const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>

// MORE CODE
```

## View UI
* Whether logged in or not you will see `Developers` link
* Click link and you'll see a blank page on `/profiles`
* Open Redux DevTools and you'll see GET_PROFILES action fired and the profiles will be available in State tab
    - And if you expand each profile you'll see the `user` property has all the user info inside it (name, avatar)
    - This was made possible by mongoose's `populate()` method that we used inside the `actions/profile.js`

`routes/api/profile.js`

```
// MORE CODE

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {

// MORE CODE
```

## Now back to Profiles
* We want to only show `profiles` if loading is false

`Profiles.js`

```
// MORE CODE

import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

 // MORE CODE

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

// MORE CODE

```

## ProfileItem
`rafcp` snippet

`ProfileItem.js`

```
import React from 'react';
import PropTypes from 'prop-types';

const ProfileItem = (props) => {
  return <div>test</div>;
};

ProfileItem.propTypes = {};

export default ProfileItem;
```

## Test in UI
* We should just see test listed for every profile we pulled in from state

## Now we'll code our ProfileItem data
* This is just a holder where we passing in the profile data which we pull out from the props
    - Use React Dev Tools `Components` tab and you'll see what's in the props for that `ProfileItem` component
    - **note** How we destructure the variables we need from inside the profile object

`ProfileItem.js`

```
// MORE CODE

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
// MORE CODE
```

* We only want to show 4 skills
* It's an array so we use `slice()` to only show 4
    - We'll map through that array and use the second argument of map `index`
    - The reason we are using index because skills is just an array and there's now id inside it to associate with the item so the best thing to use in this case is `index`

`ProfileItem.js`

```
// MORE CODE

 <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};
// MORE CODE
```

## View in UI
![UI looking good for Profiles](https://i.imgur.com/mbjxORW.png)

## Next
* Work on the individual profile
* We click on the `View Profile` button and it will take us to the individual profile
    - Try the button now and we get the 404 page and this route `http://localhost:3000/profile/5f036e60239a8585c669558f` (id will differ)
    - We'll need to create a route for the above URL `profile/:id`
