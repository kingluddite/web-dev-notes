# Profile Experience & Education Display
* Looking at our theme for Experience we need to add some markup in our Profile

`profile.html`

```
// MORE CODE

 <!-- Experience -->
        <div class="profile-exp bg-white p-2">
// MORE CODE
```

`Profile.js`

```
// MORE CODE

<div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience Credentials</h4>
              )}
            </div>
          </div>
// MORE CODE
```

* We'll need to loop through the experiences and spit out an `ProfileExperience` for each experience item
    - We use the length array property to check that there are experiences before we show them

* Snippet `rafcp`

`ProfileExperience.js`

```
import React from 'react';
import PropTypes from 'prop-types';

const ProfileExperience = (props) => {
  return <div>ProfileExperience</div>;
};

ProfileExperience.propTypes = {};

export default ProfileExperience;
```

## View in UI
* Notice we take up half the grid

![take up half the grid](https://i.imgur.com/IQTTrh1.png)

### Destructure variables in experience
* **note** Remember that experience is an array so you need to remember that in PropTypes

#### And add this html fragment for [the UI them](https://github.com/kingluddite/devconnector_html_theme/blob/master/profile.html)
`profile.html`

```
// MORE CODE

<div>
            <h3 class="text-dark">Microsoft</h3>
            <p>Oct 2011 - Current</p>
            <p><strong>Position: </strong>Senior Developer</p>
            <p>
              <strong>Description: </strong>Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
              ipsam, sapiente suscipit dicta eius velit amet aspernatur
              asperiores modi quidem expedita fugit.
            </p>
          </div>
          <div>
            <h3 class="text-dark">Sun Microsystems</h3>
            <p>Nov 2004 - Nov 2011</p>
            <p><strong>Position: </strong>Systems Admin</p>
            <p>
              <strong>Description: </strong>Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
              ipsam, sapiente suscipit dicta eius velit amet aspernatur
              asperiores modi quidem expedita fugit.
            </p>
          </div>
        </div>
// MORE CODE
```

`ProfileExperience.js`

* Now you'll see No Experience if there are none (you could hide totally but it will look strange if too bare, better to keep placeholder, we don't want the profile to be too empty even if they don't fill anything out)
* If you have experiences they will show up
* We use and import react-moment to format the dates
* Our Prop Type is an array (experience)
    - Notice we destructure experience which is an objects

### TODO: Note about required object vs array
* I believe the prop types for both `ProfileExperience` and `ProfileEducation` should be required objects like this (rather than required arrays as Brad stated in the video):

```
// MORE CODE

  ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

// MORE CODE
```

* In `Profile` we are mapping through the array of objects of both experience and education but we are feeding an object into the individual child component of `ProfileEducation` and `ProfileExperience`
* Here is a screenshot when using React Dev Tools showing the prop object inside ProfileExperience

![react dev tools object for ProfileExperience](https://i.imgur.com/MsBybD0.png)

```
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => (
  <div>
    <h3 className="text-dark">{company}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
      {!to ? ' Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
    </p>
    <p>
      <strong>Position: </strong>
      {title}
    </p>
    <p>
      <strong>Description: </strong>
      {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
```

## Let's do the same for Education

`ProfileEducation.js`

```
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
  education: { school, degree, current, to, from, field_of_study, description },
}) => (
  <div>
    <h3>{school}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
      {!to ? ' Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
    </p>
    <p>
      <strong>Degree: </strong>
      {degree}
    </p>
    <p>
      <strong>Field Of Study: </strong>
      {field_of_study}
    </p>
    <p>
      <strong>Description </strong>
      {description}
    </p>
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
```

`Profile.js`

* `p-2` class gives padding

```
// MORE CODE

<div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Education Credentials</h4>
              )}
            </div>
          </div>
// MORE CODE
```

## Final Profile.js
`Profile.js`

```
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
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
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience Credentials</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Education Credentials</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
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

## Next - Github Usernames
