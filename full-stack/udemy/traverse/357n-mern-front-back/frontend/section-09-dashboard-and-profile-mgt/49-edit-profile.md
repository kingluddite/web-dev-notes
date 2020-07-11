# Edit Profile
* Similar to CreateProfile but allow us to update fields

`components/dashboard/DashboardActions.js`

* ``
* Will just have links
* Essentially a "dumb" component
    - [dumb vs smart components](https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43)
        + dumb component - aka "presentational" components because their ownly responsibility is to present something to the DOM
            * Once that is done, the component is done

## Copy theme
* Grab [theme from here](https://github.com/kingluddite/devconnector_html_theme/blob/master/dashboard.html)
* Grab just the div with a class of `dash-buttons`

`dashboard.html`

* Update class to className
* a to Link
* href to to="" and make sure routes match the code below:

```
// MORE CODE

<div class="dash-buttons">
        <a href="edit-profile.html" class="btn btn-light"
          ><i class="fas fa-user-circle text-primary"></i> Edit Profile</a
        >
        <a href="add-experience.html" class="btn btn-light"
          ><i class="fab fa-black-tie text-primary"></i> Add Experience</a
        >
        <a href="add-education.html" class="btn btn-light"
          ><i class="fas fa-graduation-cap text-primary"></i> Add Education</a
        >
      </div>
// MORE CODE
```
 
`DashboardActions.js`

```
// MORE CODE

import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"></i> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
// MORE CODE
```

* Add to Dashboard component
    - Import DashboardActions component and replace `has` with this component

## Test in UI
* Log in
* **note** Our routes in this component don't exist yet

![DashboardActions](https://i.imgur.com/m2nwlNq.png)

## EditProfile
`src/compoents/profile-forms/EditProfile.js`

* Will be very similar to `CreateProfile.js` (copy and paste `CreateProfile.js` into EditProfile.js)
* We will import `createProfile` (it is both create and update)
* We need to pre-fill the current profiles so we'll also need to import `getCurrentProfile`
* Update connect to export EditProfile
    - also bring in `getCurrentProfile`
* Update prop-types to also have `getCurrentProfile`
    - `ptor` is ES7 snippet for `profile`
* We will need the profile state (this means we'll need mapStateToProps)
    - `profile: state.profile`
* Add destructured props
    - put profile first and destructure this object to:
        + profile: { profile, loading }
    - getCurrentProfile

`EditProfile.js`

```
import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  // destructure
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={company}
            onChange={(e) => onChange(e)}
            placeholder="Company"
            name="company"
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={website}
            onChange={(e) => onChange(e)}
            placeholder="Website"
            name="website"
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={location}
            onChange={(e) => onChange(e)}
            placeholder="Location"
            name="location"
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={skills}
            onChange={(e) => onChange(e)}
            placeholder="* Skills"
            name="skills"
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={githubusername}
            onChange={(e) => onChange(e)}
            placeholder="Github Username"
            name="githubusername"
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            value={bio}
            onChange={(e) => onChange(e)}
            placeholder="A short bio of yourself"
            name="bio"
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                value={twitter}
                onChange={(e) => onChange(e)}
                placeholder="Twitter URL"
                name="twitter"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                value={facebook}
                onChange={(e) => onChange(e)}
                placeholder="Facebook URL"
                name="facebook"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                value={youtube}
                onChange={(e) => onChange(e)}
                placeholder="YouTube URL"
                name="youtube"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => onChange(e)}
                placeholder="Linkedin URL"
                name="linkedin"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                value={instagram}
                onChange={(e) => onChange(e)}
                placeholder="Instagram URL"
                name="instagram"
              />
            </div>
          </Fragment>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  history: PropTypes.object,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
```

## useEffect
* We will need useEffect so we can run `getCurrentProfile`
    - So we'll actually fetch the data and send it down through the state
    - This be a large fragment of code
        + We need to do checks for each and every field
            * We need to check if we are loading (we don't want to worry about anything until our data has loaded)
            * We need to see if a field is null
            * If either (we use the JavaScript logic OR operator - `||`) we will set the field to an empty string
                - Else, we set it to the value inside profile
* Now we'll set the form data:
  - We will fill the form with the current values in the Database profile collection for the logged in user
  - But we need to see if the data is loading and check if it is loading and we need to check if there is data in the field and if not fill it with an empty string else fill it with the found data for that field
  - We use `.join()` to loop all the skills in a string with a comma
  - We check for the existence of the social object and then drill down to paste that string if it exists
  - To prevent `useEffect` from continuously loading we pass an empty array as the second argument to `setFormData()` and we are waiting for `loading` for it to stop

  ```
  // MORE CODE

    company: loading || !profile.company ? '' : profile.company,
   website: loading || !profile.website ? '' : profile.website,
           location: loading || !profile.location ? '' : profile.location,
           status: loading || !profile.status ? '' : profile.status,
           skills: loading || !profile.skills ? '' : profile.skills.join(','),
           githubusername:
             loading || !profile.githubusername ? '' : profile.githubusername,
           bio: loading || !profile.bio ? '' : profile.bio,
           twitter: loading || !profile.social ? '' : profile.social.twitter,
           facebook: loading || !profile.social ? '' : profile.social.facebook,
           linkedin: loading || !profile.social ? '' : profile.social.linkedin,
           youtube: loading || !profile.social ? '' : profile.social.youtube,
           instagram: loading || !profile.social ? '' : profile.social.instagram,
  // MORE CODE
  ```

* And here is the full `useEffect()`

`EditProfile.js`

```
// MORE CODE

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
    });
  }, [
    getCurrentProfile,
    loading,
    profile.bio,
    profile.company,
    profile.githubusername,
    profile.location,
    profile.skills,
    profile.social,
    profile.status,
    profile.website,
  ]);
// MORE CODE
```

## Bring in EditProfile Component
* Make it a `PrivateRoute` and point the route path to `/edit-profile`

`App.js`

* I had to fix the create-profile route
* I added the `edit-profile` route

```
// MORE CODE

import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile'; // add
import PrivateRoute from './routing/PrivateRoute';

// MORE CODE
              
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <Route exact path="/" render={null} />
              <Route component={NotFound} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
```

* I was having problems with eslint fillinging in useEffect with stuff I didn't want - here is the fix
* It was super annoying as I couldn't type into the form fields (state was not updating which made the EditProfile not functional)

`EditProfile.js`

```
// MORE CODE

  useEffect(
    () => {
      getCurrentProfile();

      setFormData({

        // MORE CODE

    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getCurrentProfile, loading]
  );
// MORE CODE
```

## We forgot to add the `edit` parameter
* **note** the `edit` third parameter

`actions/profile.js`

* If we don't add it, it will default to `false`

```
// MORE CODE

export const createProfile = (formData, history, edit = false) => async (
  dispatch

// MORE CODE

dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

// MORE CODE
```

* So if edit is true we'll use `Profile Updated` if false, it will say `Profile Created` and the `success` will make it green colored alerts
* And here we set the `onSubmit` in EditProfile to `true`

`EditProfile.js`

```
// MORE CODE

const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
// MORE CODE
```

## **NOTE** Small bug
  - When we are at bottom of form and we update we can't see the update green alert box (unless we make our browser so small we see the entire form - so our alert bug is that it is not currently very UI friendly)

## Fix the Go Back link for both CreateProfile and EditProfile
`CreateProfile.js` and `EditProfile.js`

* Import Link and change `<a>` to `Link`

```
import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

// MORE CODE

<Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>

// MORE CODE
```

* Now we have a button to take us back to the dashboard

## Summary
* We are able to create and edit a profile

## Next
* Deal with Experience and Education
* We'll deal with Adding an Experience and Education using forms just like we did with CreateProfile and EditProfile
