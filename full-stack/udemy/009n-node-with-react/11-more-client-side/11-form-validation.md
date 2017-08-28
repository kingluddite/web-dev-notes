# Form Validation
`SurveyForm.js`

```
export default reduxForm({
  validate: validate,
  form: 'surveyForm'
})(SurveyForm);
```

* Now whenever the user submits the form, the `validate` function will run

## ES6 shorten key value to key when key and value are same
`SurveyForm.js`

```
function validate(values) {
  
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);
```

* We use ES6 to shorten key/value pair
* We pass `validate` function `values` which are all the values our user filled out in the form
* To communicate back to ReduxForm whether or not these values are valid or not, we have to return an object from the `validate()` function
* If ReduxForm gets the `errors` object back and it is empty, it assumes the form is valid

`SurveyForm.js`

```
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

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);
```

# Showing Validation Errors
* How do we get the error to appear on the screen?
* When we return the `errors` object, the ReduxForm looks at the properties on it
    - But what's more important is that if the propery on the error object matches up with the property name of the Fields that we are attempting to render, the ReduxForm will automatically take the error that we set and pass it as a prop to our custom field Component
    - That property is called `meta`

## Log out meta values
`SurveyField.js`

```
// SurveyField constains logic to render a single label and text field
import React from 'react';

export default ({ input, label, meta }) => {
  console.log(meta);
  return (
    <div>
      <label htmlFor="surveyField">
        {label}
      </label>
      <input {...input} />
    </div>
  );
};
```

![meta values logged](https://i.imgur.com/1CzwccC.png)

* You will see our error message is matching up with our fields
* `touched` - User has clicked in and then out (user has "touched" the field)

`SurveyField.js`

```
// SurveyField constains logic to render a single label and text field
import React from 'react';

export default ({ input, label, meta }) => {
  return (
    <div>
      <label htmlFor="surveyField">
        {label}
      </label>
      <input {...input} />
      {meta.error}
    </div>
  );
};
```

## Test and you'll see the error on the page
* There is a catch with ReduxForm
  - When you first render the form, the validation form automatically runs
  - We don't want this because why show a validation error before the user enters any data?
    + To fix this, we'll use the `touched` event passed to our Field Component as a prop

### Using Nested ES6 destructuring to reach into meta object
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
      <input {...input} />
      {touched && error}
    </div>
  );
};
```

* touched is used as a boolean here
  - If the form is "touched" and there is an error, show it

## Test it out
* Click in any field and click out and then you'll see the error message on the screen

## Next - Make our error notifications look nicer
