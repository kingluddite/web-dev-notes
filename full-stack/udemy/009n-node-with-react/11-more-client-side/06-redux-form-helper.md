# Redux Form Helper
![SurveyNew diagram](https://i.imgur.com/1m4ltzA.png)

* The SurveyNew's job is to show the SurveyForm and SurveyFormReview
    - And toggle their view

## Make our SurveyForm Component
`client/src/components/surveys/SurveyForm.js`

```
import React, { Component } from 'react';

class SurveyForm extends Component {
  render() {
    return (
      <div>
        <h1>SurveyForm</h1>
      </div>
    );
  }
}

export default SurveyForm;
```

* Add it to `SurveyNew`

```
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';

class SurveyNew extends Component {
  render() {
    return (
      <div>
        <SurveyForm />
      </div>
    );
  }
}

export default SurveyNew;
```

### Test
    - Browse to `http://localhost:3000/surveys/new`
    - You should see `SurveyForm`

### SurveyForm and reduxForm
* reduxForm allows ReduxForm to communicate with our Redux Store

![ReduxStore diagram](https://i.imgur.com/J5GgFEn.png)

* ReduxStore takes care of:
    - Calling `Action Creators`
    - Taking data out of our Store
    - And providing it to other Components for us
    - Think of `reduxForm` helper as nearly identical to the `connect` helper we use from the Redux library
        + We wire it up to our Component with the exact same **signature**
        + But that is where the similarities end between connect and reduxForm
    - The reduxForm function allow our Component to communicate with the Redux store at the top of our app that is enclosed by that Provider tag

`SurveyForm.js`

```
// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class SurveyForm extends Component {
  render() {
    return (
      <div>
        <h1>SurveyForm</h1>
      </div>
    );
  }
}

export default reduxForm()(SurveyForm);
```

* `reduxForm` requires one property inside the form and that is called `form`

`SurveyForm.js`

```
// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class SurveyForm extends Component {
  render() {
    return (
      <div>
        <h1>SurveyForm</h1>
      </div>
    );
  }
}

// add this modification
export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
```
