# Finish Form
* Add a submit button to send out survey

## Style our `SurveyFormReview.js`

```
// more code
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 btn-flat white-text"
        onClick={onCancel}
      >
        Back
      </button>
      <button className="green btn-flat right white-text">
        Send Survey
        <i className="material-icons right white-text">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)(SurveyFormReview);
```

## Redux
* **remember** Anytime you want to make any type of change to how our app's data is structured whatsoever, we are always talking about an `Action Creator`

## Create our new `Action Creator`
* Not sure what it is going to do yet but just will first put it together
* Our `Action Creator` will be created with all the values out of our form
* For Redux to work correctly it will always expect for us to return an `object` with a **type** property
    - Just to get the ball rolling I'll create this:

`client/src/actions/index.js`

```
// more code
export const submitSurvey = values => {
  return { type: 'submit_survey' };
};
```

## Import and wire up `Action Creator` with our Component helper
`SurveyFormReview.js`

```
// SurveryFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from './../../actions';

const SurveyFormReview = ({ onCancel, formValues }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>
          {label}
        </label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 btn-flat white-text"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={submitSurvey(formValues)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right white-text">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(SurveyFormReview);
```

* We will get an error saying `submitSurvey` is not defined
* We need to pass it in as a prop to our survey

`SurveyFormReview.js`

```
// SurveryFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from './../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
// more code
```

## Test
* Fill our form and click Next
* Click Send Survey button
* If you get no errors, you passed the test

## Next
* When we click on button we want to save to our backend server
* When user clicks on send survey we want to redirect them back to our Dashboard route

### Houston we have a problem
* If I fill out form
* Click next
* Then his back
* Then click Cancel
* Then click `+` button
* The form inputs appear and we need to clear them out for a better User experience

# Dumping Form Values
* Clear form on Cancel button
    - If user clicks cancel we can have a click event that clears form
    - But we could have other links on this page that link away from this Component and we need to find a way to clear the form anytime we navigate away from this page (except when we click `next`)

## ReduxForm trick
* This is a way to clear form properly
* Open `SurveyNew` Component
    - It is the parent to both `SurveyForm` and `SurveyFormReview`

![survey component diagram](https://i.imgur.com/5Z633L4.png)

* Import `reduxForm` into `SurveyNew`

`SurveyNew.js`

```
import React, { Component } from 'react';
import { reduxForm } from 'redux-form'; // add this line
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
 // more code
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
```

### Test
* It now clears the form properly
* We hit next and then back and we still see our form data is persistent
* But if we hit Cancel and then `+` the form data is gone
* This works because:
    - We set `SurveyForm` to:

```
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
```

* This turns off the default behavior or destroying data when we unmount a Component
* But on `SurveyNew` the parent Component of `SurveyForm` we use:

```
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
```

* And that uses the default behavior, which clears form data when we unmount

## Fix a naming issue
![client server](https://i.imgur.com/x0ZGtAa.png)

* We name our client side `emails` and we are trying to post to the server side API (what it expects the name to be) is `recipients`
* We have a mismatch in names
* We will rename `emails` on the client side to be `recipients` so that they match up

`formFields.js`

```
// more code
  {
    label: 'Recipient List',
    name: 'emails',
    id: 'emails',
    noValueError: 'Provide at least one email'
  }
];
```

* Change from `emails` to `recipients`

```
// more code
  {
    label: 'Recipient List',
    name: 'recipients',
    id: 'recipients',
    noValueError: 'Provide at least one email'
  }
];
```

* And update `SurveyForms.js` from:

```
// more code
errors.emails = validateEmails(values.emails || '');
// more code
```

* To

```
// more code
errors.recipients = validateEmails(values.recipients || '');
// more code
```

