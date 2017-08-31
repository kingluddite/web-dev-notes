# Toggle Visibility?
![survery review mockup](https://i.imgur.com/HcfpHkh.png)

* User can review all their inputs before they send out email

## What will be our transition from SurveryForm to SurverFormReview?
![different ways to implement this](https://i.imgur.com/5bxL4yM.png)

* We need some decision making Component inside SurveyNew that decides whether to show SurveryForm or SurveyFormReview

### Three choices
* The through process between Redux state or Component state or routes

1. Separate route?
    * User could copy route and go directly to it and bypass the first form
    * So then we would have to put in extra code to reroute them to the first page
2. Redux?
    * Do any other Components need to share what is in SurveyForm or SurveyFormReview? No
    * So it really doesn't need to be in Redux
3. Component State?
    * Have a boolean state that shows one or the other Component
    * We would use a callback to toggle that boolean value

![Business Logic Flow](https://i.imgur.com/XTZt3e4.png)

* We will have Component Boolean level state inside Component called `state.showReview`

## Create `SurveyFormReview.js`
```
import React from 'react';

const SurveyFormReview = () => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
    </div>
  );
};

export default SurveyFormReview;
```

* Import to `SurveyNew.js`

```
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  constructor(props) {
    super(props);

    this.state = { showFormReview: false };
  }
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

## Component level state
* Classic way of initializing Component level state is by adding on a contructor function
* Calling `super` with `props` **super(props)**
* And finally, assign your `state` object

### `Create-react-app` has a babel plugin
* Allows us to initialize our `state` in a slightly different fashion
* This enables us to condense our code to be a lot less then we just typed

```
constructor(props) {
  super(props);

  this.state = { showFormReview: false };
}
```

* And this code:

```
state = { showFormReview: false };
```

* Are 100% equivalent
* The latter is the shortened way using the `Create-react-app` babel plugin
* This is now how we use `state initialization`
* I like the longer way as it is more clear to me what the code is doing

```
import React, { Component } from 'react';
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
      return <SurveyFormReview />;
    }

    return <SurveyForm />;
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}
```

### No else?
```
renderContent() {
  if (this.state.showFormReview) {
    return <SurveyFormReview />;
  }

  return <SurveyForm />;
}
```

* If you don't need an else, don't use one

### Add a callback
`SurveyNew.js`

```
// more code
renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview />;
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
// more code
```

* Now inside SurveyForm, whenever a user submits a form:
    - We'll run the `onSurveySubmit` callback
    - Which will update our `state` inside of `SurveyNew`
    - And cause the `SurveyForm` review to be shown instead
* Now we'll jump to SurveyForm and make sure this callback is executed after the form is submitted

`SurveyForm.js`

```
// more code
render() {
  return (
    <div>
      <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
// more code
```

* Currently, we are using a log to output the values
* We'll replace that with our callback

`SurveyForm.js`

```
// more code
render() {
  return (
    <div>
      <form
        onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}
      >
// more code
```

* We did remove the values
* We will talk about how we will access the values later
    - **remember** That is part of the job of ReduxForm inside our app

### Clean it up
```
render() {
  return (
    <div>
      <form
        onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
      >
```

* We remove the arrow function as we don't need it
* We remove the parentheses as we don't need to call the callback as soon as the Component is rendered
* We want to wait until the form is submitted - so no parentheses are needed

## Test it out
* View `http://localhost:3000/surveys/new`
* Click `NEXT` button
* You will see all the validation errors
* Fill in form
* Submit form
* You will be taken to the `Please confirm yur entries`
    - It now shows the `SurveyFormReview` Component

## Next
* Flesh out the SurveyFormReview
    - Enable user to go back to make changes to the form
    - Also add ability for user to see their form data so they can confirm 

# Retreat the form
`SurveyNew.js`

```
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
```

`SurveyFormReview.js`

```
// SurveryFormReview shows users their form inputs for review
import React from 'react';

const SurveyFormReview = props => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <button className="yellow darken-3 btn-flat" onClick={props.onCancel}>
        Back
      </button>
    </div>
  );
};

export default SurveyFormReview;
```

* Problems
    - We click back button and it takes us back to the SurveyForm
    - But the data is gone

## Next - Persisting data in our forms

