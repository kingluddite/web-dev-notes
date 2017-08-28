# Custom Field Components
## Why are we using multiple SurveyField Components
![SurveyForm mockup](https://i.imgur.com/ZRF1qpv.png)

* Each input is a label and an input field
* Why rebuild it 4 times for our 4 fields
* It is better to create 1 Component and use 4 instances of it
* We can customize each label and input using props

`SurveyField.js`

```
// SurveyField constains logic to render a single label and text field
import React from 'react';

export default () => {
  return (
    <div>
      <input type="text" />
    </div>
  );
};
```

`SurveyForm.js`

```
// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
        <Field type="text" name="surveyTitle" component={SurveyField} />
      </div>
    );
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
```

* Instead of using `component="input"` we take control of rendering by using `component={SurveyField}`

# Wiring up SurveyField
* Inside SurveyForm, SurveyField is being rendered by the `Field` tag
    - Because of this reduxForm has the ability to pass a whole bunch of props into SurveyField
    - We will test this out to show that is the case

`SurveyField.js`

```
// SurveyField constains logic to render a single label and text field
import React from 'react';

export default props => {
  console.log(props);
  return (
    <div>
      <input type="text" />
    </div>
  );
};
```

![lots of props in SurveyField](https://i.imgur.com/wxN1Rqs.png)

* Even though we are creating a custom form element we get the benefit of having to wire up all these event handlers on the text input

### ES6 destructuring
`SurveyField.js`

```
// SurveyField constains logic to render a single label and text field
import React from 'react';

export default ({ input }) => {

  return (
    <div>
      <input />
    </div>
  );
};

```

* `({ input })` That automatically looks onto the props object and it pulls off the input property and it assigns it to a variable called `input`
* So now that object that contains all these callbacks
    - That we want to communicate along to our text inputs are available on this object `({ input })`
    - So now we just have to pass this along to our `<input />`

![object callbacks](https://i.imgur.com/IsADvVq.png)

`SurveyField.js`

```
// SurveyField constains logic to render a single label and text field
import React from 'react';

export default ({ input }) => {
  return (
    <div>
      <input {...input} />
    </div>
  );
};
```

* `{...input}` - This says "Hey `<input />`, we have a big object `{ input }`  with a ton of props that we want to pass to you but we don't want to pass it as a specifically named property we just want you to have this object and all the keys and values inside it
    - If we didn't do this we would have to spell them all out like this:
        + `<input onBlur={input.onBlur} onChange={input.onChange} etc />`
        + So this ES6 shortcut

## Test it
* Enter text into input and click submit
* You will see the text appear inside an object with a key of `surveyTitle`
* This proves:
    - We are successfully taking a bunch of event handlers from reduxForm
    - Wiring them up to our input element
    - And that input element is being rendered by the Field Component
    - And eventually all those change events perculate up to our ReduxForm for us

# DRY up our fields 
`SurveyForm.js`

```
// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
        <Field
          label="Survey Title"
          type="text"
          id="title"
          name="title"
          component={SurveyField}
        />
        <Field
          label="Subject Line"
          type="text"
          id="subject"
          name="subject"
          component={SurveyField}
        />
        <Field
          label="Email Body"
          type="text"
          id="body"
          name="body"
          component={SurveyField}
        />
        <Field
          label="Recipient List"
          type="text"
          id="emails"
          name="emails"
          component={SurveyField}
        />
      </div>
    );
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
```

`SurveyField.js`

```
// SurveyField constains logic to render a single label and text field
import React from 'react';

export default ({ input, label }) => {
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

### Test
![form](https://i.imgur.com/r2Groge.png)

* Fill it out and submit

![form data](https://i.imgur.com/ZCBz75z.png)

### Next
* Our 4 input fields looks like a lot of similar code. Let's see if we can make it more DRY
