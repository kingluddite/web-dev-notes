# Generalizing Field Validation
## Make our validation look prettier
`SurveyField.js`

```
// SurveyField constains logic to render a single label and text field
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label htmlFor="surveyField">
        {label}
      </label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBotton: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
```

## Improve our validation rules
* The `Recipient List` is a list of emails
* We need to make sure each email is valid

`SurveyForm.js`

```
// more code
function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'You must provide a title';
  }
  if (!values.subject) {
    errors.subject = 'You must provide a subject';
  }
  if (!values.body) {
    errors.body = 'You must provide a body';
  }
  if (!values.emails) {
    errors.emails = 'You must provide an email';
  }

  return errors;
}
// more code
```

* Above is a lot of repeated code
* We can refactor it
* Let's iterate over the FIELDS object again
    - Look at each of the different objects (specifically the `name` property)
    - Use that `name` property to access the `values` object
        + And if it doesn't have a value
        + Then we should add some note to the errors object

## No `_.map()` function this time!
* Because we are not trying to return a list of anything
* We are trying to modify that errors object
    - So for this task we will use an `.each()` loop
    - "for each field we have... run this validation rule"

### The _.each() loop
* Works similarly to the `_.map()` function
    - For every field inside of the FIELDS array will will run an arrow function
    - We'll pass in the object from the FIELDS array
    - And we can reference the `name` property on there to look at the values object

`SurveyForm.js`

```
function validate(values) {
  const errors = {};

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
        errors[name] = 'You must provide a value';
    }
  });

  return errors;
}
```

* `JavaScript 101` - To reference a property on an object on the fly
    - To figure out the property name at runtime we use the square brackets
        `!values[name]`
    - If we used `values.name` it would literally look up the name property on the values object
        + We don't care about anything called `name`
        + We want to look at the key that we're trying to look at every single time that we run through this loop
        + So in `values[name]` **name** will first be `title`, then `subject`, then `body` and finally `emails`
* If the property doesn't have a value on it, then we'll provide an error message
* We lose the ability to write custom messages so we provide a generic message instead

`SurveyForm.js`

```
// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

const FIELDS = [
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

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name, id }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
          id={id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">
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

  _.each(FIELDS, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);
```

* Now we have customized our error messages

## Test it out
* It should look like this:

![validation styled](https://i.imgur.com/mr440wO.png)


