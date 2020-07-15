# List Education & Experiences
* Now we will display Education and Experiences (from the profile collection - they are nested) in our Dashboard
* We will embed separate components that we'll embed in the Dashboard
    - A good idea for organization

## Create two new components
* `components/dashboard/Experience.js`
* `components/dashboard/Education.js`
* snippet `racfp`
* The Experiences will be passed in from the parent component `Dashboard.js`
    - Destructure `({ experience })` from props in component
* We'll need a deleteExperience action we'll need to bring in from `connect`
* We'll need `Fragment`
* We'll use `moment` to format our dates (we're using `react-moment`)
    - `import Moment from 'react-moment`
    - **note** Make sure you have `moment` and `react-moment` in `package.json`

### Experience.js
```
import React, { Fragment, Profiler } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Experience = ({ experience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default Experience;
```

### Add it into Dashboard.js
* Make sure to pass in `experience` as a prop to the Experience component
    - You can access is with `profile.experience`

`Dashboard.js`

```
// MORE CODE

import Experience from './Experience'; // add

// MORE CODE

const Dashboard = ({

    // MORE CODE

        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
        </Fragment>

// MORE CODE
```

![UI with experience listed](https://i.imgur.com/BFitO9N.png)

## Do Same thing for Education
`Education.js`

```
import React, { Fragment, Profiler } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Education = ({ education }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td className="hide-sm">{edu.field_of_study}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default Education;
```

`Dashboard.js`

```
// MORE CODE

import Experience from './Experience';
import Education from './Education'; // add

// MORE CODE

  <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
        </Fragment>
// MORE CODE
```

## Test UI
* Add an Experience
    - Test with now checked and not checked
    - It should be added to Experience list on Dashboard
    - Do same for Education

# Next - Delete Experiences and Education
* Delete account button - to delete our entire account along with profile
