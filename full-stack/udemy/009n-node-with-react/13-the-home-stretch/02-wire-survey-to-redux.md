# Wiring Surveys Up to Redux
## Create our new type
`client/src/actions/types.js`

```js
export const FETCH_USER = 'fetch_user';
export const FETCH_SURVEYS = 'fetch_surveys';
```

## Put together our `Action Creator`
``

```js
import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types'; // update this line

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

// add this `Action Creator`
export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
```

## Create our reducer
* Sole purpose of our reducer will be to watch for the type of `FETCH_SURVEYS` and return the list of surveys

`client/src/reducers/surveysReducer.js`

```js
import { FETCH_SURVEYS } from './../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
```

## Wire up to our combinedReducers
`client/src/reducers/index.js`

```js
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
});
```

## Wiring React to Redux
`SurveyList.js`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from './../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  render() {
    return <div>SurveyList</div>;
  }
}

// function mapStateToProps(state) {
//   return { surveys: state.surveys }
// }
function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
```

* Add to Dashboard Component

`Dashboard.js`

```
import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  return (
    <div>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
```

* Test in browser
* You'll see the surveys are in the Network tab as soon as the page loads (Preview tab)

# Rendering a List of Surveys
* We'll use Materializecss cards

`SurveyList.js`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from './../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.map(survey => {
      return (
        <div className="card blue-grey darken-1" key={survey._id}>
          <div className="card-content white-text">
            <span className="card-title">
              {survey.title}
            </span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>
              Yes: {survey.yes}
            </a>
            <a>
              No: {survey.no}
            </a>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return { surveys: state.surveys }
// }
function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
```

### Sort Newest surveys first
`SurveyList.js`

* We just reverse the sort order using `reverse()`

```
renderSurveys() {
  return this.props.surveys.reverse().map(survey => {
```

