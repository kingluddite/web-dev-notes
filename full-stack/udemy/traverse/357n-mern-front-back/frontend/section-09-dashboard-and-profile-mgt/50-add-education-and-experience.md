# Add Education & Experiences
* We will add Education and Experiences to our Profiles 
    - To accomplish this we'll need:
        + Separate components
        + And separate actions

## We'll start with actions
* We'll add `UPDATE_PROFILE` type

`actions/types.js`

* **note** Very slight order adjustment that looks like this:

```
// MORE CODE

export const GET_PROFILE = 'GET_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE'; // add
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export const PROFILE_ERROR = 'PROFILE_ERROR';
// MORE CODE
```

## We want to create the action before the component
* Why?
    - Because we have to link the action into the components 
* Copy entire try/catch from createProfile and paste into new action
* We'll need the `Content-Type` (since we are sending data)
* The request we will make using axios will be a `PUT` request (remember we made the experience a PUT request)

`actions/profile.js`

```
// MORE CODE
// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      // that route returns all the profile data
      payload: res.data,
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
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

* And copy and paste for Education (will be very similar to Experience)

`actions/profile.js`

```
// MORE CODE
// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      // that route returns all the profile data
      payload: res.data,
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
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

## Now we'll update our reducers
`reducers/update.js`

* Import UPDATE_PROFILE type
* Add a switch case UPDATE_PROFILE
    - Since it will be the same as GET_PROFILE we can just do this:

```
// MORE CODE

import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from '../actions/types';

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
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
// MORE CODE
```

* We return the current state, add the profile from the payload and set loading to `false`
* We could technically just use `GET_PROFILE` but we want to be more specific so that is why we are using a new type of `UPDATE_PROFILE`

## Now we go into our `profile-forms` folder and create:
* `AddExperience.js`
* `AddEducation.js`

## Let's walk through setting up AddExperience
### Imports
`AddExperience.js`

* Our form will need some state `racfp` snippet
* Bring in connect from react-redux
* Import the action we need `addExperience`
* Since we are redirecting in the actions file we will need Link and withRouter from react-router-dom

```
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux'; // add
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'; // add
import { addExperience } from '../../actions/profile'; // add

// MORE CODE
```

## Adding connect
* We don't need `mapStateToProps` so we'll just use `null`
* We need our action inside our component so we pass in our `addExperience` action

```
// MORE CODE
export default connect(null, { addExperience })(withRouter(AddExperience));
```

## PropTypes
```
// MORE CODE

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired, // ptfr snippet
};
// MORE CODE
```

## Add the theme
* Grab theme [from here](https://github.com/kingluddite/devconnector_html_theme/blob/master/add-experience.html)
* This is the snippet
    - Replace the `a` with `Link`
    - Replace the `class` with `className`
    - Replace the `div` with `Fragment`

`add-experience.html`

```
// MORE CODE

      <h1 class="large text-primary">
       Add An Experience
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form">
        <div class="form-group">
          <input type="text" placeholder="* Job Title" name="title" required />
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Company" name="company" required />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Location" name="location" />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" />
        </div>
         <div class="form-group">
          <p><input type="checkbox" name="current" value="" /> Current Job</p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
// MORE CODE
```

`AddExperience.js`

* Add useState because we are using state
* Bring in Fragment
* Make sure to add event handlers on every form input
* We create state for all names of input fields
* We add a `onSubmit` and `onChange` method
* We give current a default value of `false`
* Add `value` from Destructured variables and add the onSubmit to the form tag and call the onChange on every form field

```
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    current: false,
    to: '',
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  // destructure
  const { title, company, location, from, current, to, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      {/* <form onSubmit={(e) => onSubmit(e)} className="form"> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addExperience(formData, history);
        }}
        className="form"
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            required
            value={company}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            disabled={toDateDisabled ? 'disabled' : ''}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
```

## We want to disable `to` if current is true
* For the checkbox we need to do 2 things:
    - We need to call the `toggleDisabled` when checked
    - But we also want to set the form data
* This is a checkbox so when it is clicked every time we'll call this inline onChange event, we use curly braces because we are calling 2 expressions, one will be to call our setFormData where we grab the current form data and set `current` to be the opposite of what it is `current: !current` and we call our `toggleDisabled` to be the opposite of `!toDateDisabled`

```
// MORE CODE

<div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              onChange={(e) =>
                onChange((e) => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                })
              }
            />{' '}
            Current Job
          </p>
        </div>
// MORE CODE
```

* **note** We manually add a space `{' '}` after the checkbox because it won't show up in JSX
* And then on the `to` date we set `disabled` attribute to be `disabled` if `toDateDisabled` is true and `''` (empty string) if it is `false`
    - This will make make end users not able to click the `to` date input field if `current` is checked (because this is the person's current job and there is not `to` value to enter)

```
// MORE CODE

<div className="form-group">
  <h4>To Date</h4>
  <input
    type="date"
    name="to"
    value={to}
    disabled={toDateDisabled ? 'disabled' : ''}
    onChange={(e) => onChange(e)}
  />
</div>

// MORE CODE
```

* **Note** If you wanted to add an inline onSubmit it would look like this:

```
// MORE CODE

 {/* <form onSubmit={(e) => onSubmit(e)} className="form"> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addExperience(formData, history);
        }}
        className="form"
      >
// MORE CODE
```

## Add AddExperience to our routes
`App.js`

```
// MORE CODE

import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';

// MORE CODE

<PrivateRoute
    exact
    path="/add-experience"
    component={AddExperience}
  />

// MORE CODE
```

## Test in UI
* Login
* Click Add Experience
* Check `current job` checkbox and note that To Date is disabled
* Enter a user experience and it should redirect you to Dashboard with Experience Added in green alert box
* Verify that experience was added to MongoDB
    - To is `null` and current is true

![experience added to mongodb](https://i.imgur.com/Zr8qV7t.png)

## Try AddEducation on your own
* Will be very similar to AddExperience, just cut and paste and change up the values
* Here is [the theme](https://github.com/kingluddite/devconnector_html_theme/blob/master/add-education.html)
* Update values, className, onChange and onSubmit
* Add Link

```
// MORE CODE

<h1 class="large text-primary">
        Add Your Education
      </h1>
      <p class="lead">
        <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form class="form">
        <div class="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
          />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy" />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" />
        </div>
        <div class="form-group">
          <p>
            <input type="checkbox" name="current" value="" /> Current School or Bootcamp
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
// MORE CODE
```

## Test UI
* You will get an validation error on `fieldofstudy` because we named the field in mongo `field_of_study` so update the form

* Finished `AddEducation.js`

```
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field_of_study: '',
    from: '',
    current: false,
    to: '',
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  // destructure
  const {
    school,
    degree,
    field_of_study,
    from,
    current,
    to,
    description,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="field_of_study"
            value={field_of_study}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            disabled={toDateDisabled ? 'disabled' : ''}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
```

* Import and add route in App.js

```
// MORE CODE

 <PrivateRoute
    exact
    path="/add-education"
    component={AddEducation}
  />

// MORE CODE
```

* When you insert an education it is missing fields in Mongo

![missing data](https://i.imgur.com/fNagxkG.png)

* Woops! No big deal. Just add to model like this:

`models/Profile.js`

```
// MORE CODE

  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      field_of_study: {
        type: String,
        required: true,
      },
    },
  ],
  social: {

// MORE CODE
```

* To this:

```
// MORE CODE

  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      field_of_study: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },

// MORE CODE
```

* Try to insert another education

`routes/api/profile.js`

```
// MORE CODE

    const {
      school,
      degree,
      field_of_study, // eslint-disable-line camelcase
      from,
      to,
      current,
      description,
    } = req.body;

    // Create an object with the data the user submits
    const newEdu = {
      school,
      degree,
      field_of_study,
      from,
      to,
      current,
      description,
    };

// MORE CODE
```

## Submit a school and see if it is in Mongo
![school with all fields in mongo](https://i.imgur.com/nEU1Eb4.png)

## Next
* List our experiences and educations
* Also be able to delete them
