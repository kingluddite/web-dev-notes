# Bind Action Creators
`Toggle.js`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleMessage } from './actions';
import { bindActionCreators } from 'redux';

const Toggle = ({ messageVisibility, toggleMessage }) => (
  <div>
    {messageVisibility && <p>You will be seeing this</p>}
    <button onClick={toggleMessage}>Toggle Me</button>
  </div>
);

const mapStateToProps = state => ({
  messageVisibility: state.message.messageVisibility,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleMessage,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
```

* we import bindActionCreators from redux
* we are importing toggleMessage from our actions
* we run mapDispatchToProps which we set to an arrow function where we map to dispatch and return a result of bindActionCreators, where we are passing in an object of all our different actions and we are mapping them to dispatch
* We then use mapDispatchToProps as the 2nd argument to connect()
* Then we have availability to any of our actions defined in mapDispatchToProps up top in toggleMessage
* note you will have all of your actions inside mapStateToProps and MapDispatchToProps like

```
// MORE CODE
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleMessage,
      action2,
      action3,
      action4
    },
    dispatch,
  );
// MORE CODE
```

* Test and check redux tools to see that we are toggle the state
