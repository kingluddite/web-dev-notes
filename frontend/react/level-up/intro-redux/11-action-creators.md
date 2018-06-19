# Action Creators Explained
* makes our actions reusable

`actions.js`

```
export function toggleMessage() {
  return {
    type: 'TOGGLE_MESSAGE',
  };
}
```

`Toggle.js`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleMessage } from './actions';

const Toggle = ({ messageVisibility, dispatch }) => (
  <div>
    {messageVisibility && <p>You will be seeing this</p>}
    <button onClick={() => dispatch(toggleMessage)}>Toggle Me</button>
  </div>
);

const mapStateToProps = state => ({
  messageVisibility: state.message.messageVisibility,
});

export default connect(mapStateToProps)(Toggle);
```

## Error - Actions must be plain objects. Use custom middleware for async actions
* Bad error because it doesn't tell us what the problem is
* The real problem is dispatch is trying to dispatch an object but toggleMessage is a function
    - So to fix this we need to run that function

`Toggle.js`

```
// MORE CODE
const Toggle = ({ messageVisibility, dispatch }) => (
  <div>
    {messageVisibility && <p>You will be seeing this</p>}
    <button onClick={() => dispatch(toggleMessage())}>Toggle Me</button>
  </div>
);
// MORE CODE
```

* Now click toggle and you will see the message toggles successfully
* Now to get this working in the future
    1. import our action
    2. dispath our action
    3. That's it!
* PRO - the action lives in one place - and that is called an action creator (just a silly name for a function that returns an object)
* Not required But makes reusability way better because you can drop it in your code anywhere

## Next - get rid of dispatch and instead use Bind Action Creators

