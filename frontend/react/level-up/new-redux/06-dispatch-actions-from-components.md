# Dispatch Actions from components
`reducer.js`

```
const initialState = {
  messageVisibility: false,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case 'TOGGLE_MESSAGE':
      return {
        ...state,
        messageVisibility: !state.messageVisibility,
      };
    default:
      return state;
  }
}
```

`Toggle.js`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';

const Toggle = ({ messageVisibility, dispatch }) => (
  <div>
    {messageVisibility && <p>You will be seeing this</p>}
    <button
      onClick={() =>
        dispatch({
          type: 'TOGGLE_MESSAGE',
        })
      }
    >
      Toggle Me
    </button>
  </div>
);
// MORE CODE
```
