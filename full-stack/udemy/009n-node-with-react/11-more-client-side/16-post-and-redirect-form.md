# Post and Redirect Form
## Post form data to backend server

![diagram of posting form data to `MongoDB`](https://i.imgur.com/SlZyToc.png)

## Update `Action Creator`
`client/src/actions/index.js`

```
// more code
export const submitSurvey = values => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  dispatch({ type: FETCH_USER, payload: res.data });
};
```

## Test
* Fill our form
* Hit Next
* Review form data
* Hava open chrome dev tools network tab
* Click Send Survey button
* See the `surveys` request you send
    - It is xhr
    - It responds with 200 (all is ok)
    - The credits is updated (1 less credit is available)
    - It sends an email

## Redirect User to `/surveys` route
* This will be slightly complicated
* We used the Link tag before
    - The Link tag was specifically designed to help a user navigate around the app
    - But now we want to do some programmatic/automatic navigation around our app

![link navigation diagram](https://i.imgur.com/cyruDHe.png)

* `App` and `SurveyNew` know about `React Router`
    - These Component contain logic that directly refer to `React Router`
        + App has `React Router` in it
        + SurveyNew is being created by `React Router`
* But all that info is not automatically passed down to the SurveyFormReview Component
    - And we have no way of communicating that over to the `Action Creator` **submitSurvey**
    - We want to do the navigation from the `Action Creator`
        + The `Action Creator` alone knows when the request was successful

## Teach a Component about `React Router`
* We will teach SurveyFormReview about `React Router`
    - That Component will in turn pass that info over to the `Action Creator` to do that actual navigation

### withRouter Helper
* This is how we teach the Component about `React Router`
* It is a function provided by `React Router` by the `react-router-dom` library
* [Documentation Link](https://reacttraining.com/react-router/web/api/withRouter)
* `withRouter` will give us access to an object called `history`


#### Import it
`SurveyFormReview.js`

```
// SurveryFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom'; // add this line
// more code
```

#### Point withRouter to our SurveyFormReview Component
`export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));`

* the `history` object is passed into the Component on the `props` object

`SurveyFormReview.js`

```
// SurveryFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from './../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
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
        onClick={() => submitSurvey(formValues, history)}
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

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
```

### Update our `Action Creator`
`/actions/index.js`

```
// more code
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};
```

## Important Note
* In previous versions of `React Router`
* Navigating around from an `Action Creator` was easy and straightforward
* But the latest versions of `React Router` make it mandatory that we get access to the `history` object by making use of `withRouter` helper and we also have to pass the `history` object over to the `Action Creator`

### Test
* Submit the survey and we should programmaticly be redirected back to the dashboard (_where all the other surveys are_)
* And it works!
