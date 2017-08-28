# Redux Form Setup

## Install ReduxForm
* Kill server
* Change into client directory `$ cd client`
* Install redux-form `$ yard add redux-form`

## ReduxForm
* Probably the best documentation every written for web stuff
* [Link to Redux Form](http://redux-form.com/)
    - Their documentation and examples are stellar!
* Click [Examples](http://redux-form.com/7.0.3/examples/)
* [Click Simple Form](http://redux-form.com/7.0.3/examples/simple/)
* We will be creating something similar to a `Wizard Form`
* [Click wizard form](http://redux-form.com/7.0.3/examples/wizard/)
* [Click Getting started](http://redux-form.com/7.0.3/docs/GettingStarted.md/)

## Back to our project
* Change back to server directory `$ cd ../`
* Run both servers `$ npm run dev`

## Wire up ReduxForm to our app
* ReduxForm brings along its own `formReducer` that we have to hook up to our Redux Store
    - And that is how ReduxStore gets a handle of sorts on our app/Redux Store

### Setting up formReducer
`client/src/reducers/index.js`

```
import { combineReducers } from 'redux';
import { reducer } from 'redux-form'; // add this line
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer
});
```

* This is the file where we wire up all the different reducers inside of our app
* Not just custom reducers we write but also all 3rd party reducer modules that we want to install too
* **note** We have to use the name `reducer` as that is its name inside `redux-form`
    - The name `reducer` is kind of ambiguous especially if this file will have a bunch of different reducers
        + So to remove this ambiguity we will use by convention, a feature of ES2015 module imports, we can freely named module imports using `as` which creates kind of an alias

`client/src/reducers/index.js`

```
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form'; // update this line
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer
});
```

* **note** Every single Reducer has to be assigned to some key
    - The `key` is very important
    - Because that is the `key` that this reducers output will be stored on in our `state` object maintained by Redux
        + In our code remember using `state.auth`? (That is why it is important)
* ReduxForm needs to be have a very special key name `form`

`client/src/reducers/index.js`

```
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm
});
```

## Some bookkeeping
* Let's make sure ReduxForm is working out of the box
* Then we'll tweak the code and make it fit our app

### Making Components
* We'll make:
    - `SurveyNew`
    - `SurveyForm`
    - Then we'll start thinking how we'll use ReduxForm

#### Organizing our Components folder
* Our Components are starting to grow a little unruly
* Let's create a new folder `/client/src/components/surveys`
    - And we'll put all Components that have to do with surveys inside it
* Create `SurveyNew` Component inside `/surveys`
* **note** I moved `SurveyThanks` and updated the import path inside App.js

`SurveyNew`

```
import React, { Component } from 'react';

class SurveyNew extends Component {

  render() {
    return (
      <div>
        <h1>SurveyNew</h1>
      </div>
    );
  }
}

export default SurveyNew;
```

## Update App.js
`App.js`

```
// more code
import Header from './Header';
import Landing from './Landing';
import SurveyThanks from './surveys/SurveyThanks'; // modify this line
import SurveyNew from './surveys/SurveyNew'; // add this line
import Dashboard from './Dashboard';
// more code
```

## Test
* Browse to `/surveys/new` to make sure you see this:

![SurveysNew Component working](https://i.imgur.com/NDnHtZV.png)
