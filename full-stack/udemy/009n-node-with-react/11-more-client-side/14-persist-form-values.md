# Persist Form Values
* ReduxForm has a feature that if your form is no longer being rendered, it dumps the form values

## destroyOnUnmount
`SurveyForm.js`

```
// more code

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
```

* ReduxForm gives us `destroyOnUnmount`
* By default it is set to `true`
* When we set it to `false` it will persis our form values when we hit the back button

## Test it out
* Fill out form
* Click next
* Then hit `Back` and you will see the data has persisted

## Using Redux
![Redux diagram](https://i.imgur.com/2kq5IIp.png)

* We are using Redux so we can easily communicate all the SurveyFields over to the SurveyFormReview
* ReduxForm doesn't make pulling data our of Redux any easier so we will still use the `Connect` helper
    - We will use the `Connect` helper to reach into the Redux Store to reach in and pull out all of the SurveyField values

`SurveyFormReview.js`

```
// more code

function mapStateToProps(state) {
  console.log(state);
  return {};
}

export default connect(mapStateToProps)(SurveyFormReview);
```

* We log out the `state`
* Fill out form and click `Next`
* You will see the fields inside the `state` object (and a lot of other stuff too!)

![form fields and values in state](https://i.imgur.com/n6S62Eh.png)

* **note** Our reducers create these two

`index.js`

```
// more code
export default combineReducers({
  auth: authReducer,
  form: reduxForm
});
```

![auth and form](https://i.imgur.com/l4kzIz5.png)

* `auth` and `form`
* `state.form.surveyForm.values` - Is what holds all the form values
    - Where did `surveyForm` come from?
    - That was the purpose of the form name

`SurveyForm.js`

![purpose of form name](https://i.imgur.com/cl5I3lm.png)

* That is what tells ReduxForm how to namespace all the particular form field values inside of our form
* We may have many different forms inside our app
    - We want to have nice `siloed` areas where form names don't conflict or collide with one another
    - You can reuse the form name and this makes creating detailed wizard forms super easy to put together

## Get access to all Survey input field values in `SurveyFormReview.js`
`SurveyFormReview.js`

```
// SurveryFormReview shows users their form inputs for review
import React from 'react';
import { connect } from 'react-redux';

const SurveyFormReview = ({ onCancel, formValue }) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)(SurveyFormReview);
```

* We now use destructuring to access `({ onCancel, formValue })` instead of using `props` and `props.onCancel` and `props.formValue`
* Make `FIELDS` global

`formFields.js`

```js
export default [
  {
    label: 'Survey Title',
    name: 'title',
    id: 'title',
    noValueError: 'Provide a Survey Title'
  },
  {
    label: 'Subject Title',
    name: 'subject',
    id: 'subject',
    noValueError: 'Provide a Subject'
  },
  {
    label: 'Email Body',
    name: 'body',
    id: 'body',
    noValueError: 'Provide a Body'
  },
  {
    label: 'Recipient List',
    name: 'emails',
    id: 'emails',
    noValueError: 'Provide at least one email'
  }
];
```

`SurveyFormReview.js`

```
// SurveryFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';

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
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)(SurveyFormReview);
```

`SurveyNew.js`

```
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  constructor(props) {
    super(props);

    this.state = { showFormReview: false };
  }

  // state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
```

`SurveyForm.js`

```
// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
```

## Test it out
* Create a new survey
* Enter form data
* Click next
* You can review your form inputs, hit back and change and submit again

## Next - Submit data to Database
