# reduxForm in Practice
![SurveyForm diagram](https://i.imgur.com/ETvrhWY.png)

* SurveyForm needs to show SurveyFields
    - Each SurveyField is responsible for showing a label and a text field to our user

## Start Simple
* But for now let's just show a text input inside SurveyForm Component
* Add the `Field` Component
    - A helper provided by redux-form for rendering ANY type of HTML form element
        + textarea
        + text inputs
        + checkboxes
        + radio buttons
        + drop downs
        + and a lot more
    - Think of the `Field` Component as a Swiss Army Knife
* Let's try to use the `Field` by itself

`SurveyForm.js`

```
// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class SurveyForm extends Component {
  render() {
    return (
      <div>
        <Field />
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
```

## Test
* We get an error
* Field does not work by itself
* In order for Field element to work you must provide it a minimum number of props

`SurveyForm.js`

```
// more code
class SurveyForm extends Component {
  render() {
    return (
      <div>
        <Field type="text" name="surveyTitle" component="input" />
      </div>
    );
  }
}
// more code
```

## Test it out
![input field working](https://i.imgur.com/PkCkv34.png)

* `name` property can be any name we wish
    - Tells reduxForm that we have one piece of data called `surveyTitle`
        + The minute we start typing in this field in the browser, reduxForm will automatically save what we are typing inside our Redux Store under a key of `surveyTitle`
* `type` It the type of form element
* `component="input"` Tells reduxForm that I want this to appear as an HTML input `<input />`
    - Input tags can have different types
        + text
        + filepicker
        + [view full list here](https://www.w3schools.com/tags/att_input_type.asp)

### Common Convention
* Replace `component="input"` with `component={SurveyField}`
* We'll do this soon

## How do we submit a form?
`SurveyForm.js`

```
// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class SurveyForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          <Field type="text" name="surveyTitle" component="input" />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
```

* `this.props.handleSubmit()` is a function that is provided to us by reduxForm
* If we call `handleSubmit()` and pass it a function of our own
    - The function that we pass to it will be automatically called whenever a user attempts to submit our form (clicking button or pressing enter key)

`SurveyForm.js`

```
// more code
class SurveyForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          <Field type="text" name="surveyTitle" component="input" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
// more code
```

### Test in browser
* Type `test this input` in the input
* Click submit button
* View Chrome console

![test input](https://i.imgur.com/JUswlEL.png)

* We can save the values that are entered into the form into a backend server
* As you can see the `name` is important for storing the user data so pick somewhat relative names

## Next - Refactor Form
* Break it out to use separate fields
