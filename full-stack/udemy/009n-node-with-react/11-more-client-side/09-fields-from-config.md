# Fields from config
* We can create an array that models out the fields we want in this form

`SurveyForm.js`

```
// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

const FIELDS = [
  { label: 'Survey Title', name: 'title', id: 'title' },
  { label: 'Subject Title', name: 'subject', id: 'subject' },
  { label: 'Email Body', name: 'body', id: 'body' },
  { label: 'Recipient List', name: 'emails', id: 'emails' }
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, (field) => {
      return <Field component={SurveyField} type="text" label={field.label} name={field.name} id={field.id} />
    })
  }
// more code
```

* Install Lodash client side `$ yarn add lodash`

### Refactor with ES6 destructuring
`SurveyForm.js`

```
// more code
renderFields() {
  return _.map(FIELDS, ({ label, name, id}) => {
    return <Field component={SurveyField} type="text" label={label} name={name} id={id} />
  })
}
// more code
```

## Test
* It should work as it did before
* But we have the key error because when outputting arrays in React you need to give each list item its own unique `key`
* To fix this problem just modify the code like this:

```
// more code
renderFields() {
  return _.map(FIELDS, ({ label, name, id}) => {
    return <Field key={name} component={SurveyField} type="text" label={label} name={name} id={id} />
  })
}
// more code
```

* `key` just has to have a unique values so `name` will do the job as it will always be unique

## Test
* The key error should disappear
