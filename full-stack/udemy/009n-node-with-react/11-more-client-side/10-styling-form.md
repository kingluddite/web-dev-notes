# Styling our form
* Fix the form padding
* Make our button look nice

## Add `container` class to app
`App.js`

```
// more code
render() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/surveys" component={Dashboard} />
        <Route path="/surveys/new" component={SurveyNew} />
        <Route path="/surveys/thanks" component={SurveyThanks} />
      </div>
    </BrowserRouter>
  );
}
// more code
```

## Style buttons
![SurveyNew mockup](https://i.imgur.com/JIAQSE0.png)

`SurveyForm.js`

```
// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
```

## Test
* If you click `Cancel`, you are taking back to the Dashboard
* Click `+` and you'll come back to the survey create form

![SurveyNew styled buttons](https://i.imgur.com/uX4a0dF.png)

## Next - Client side form validation
