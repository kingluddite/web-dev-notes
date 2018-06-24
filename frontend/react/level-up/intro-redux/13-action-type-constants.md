# action type constants
* This is an extra step
* Makes code easier to debug
* We'll add a constant pointing to a string that correlates to the string inside our action

`actions.js`

```
export const TOGGLE_MESSAGE = 'TOGGLE_MESSAGE'

export function toggleMessage() {
  return {
    type: 'TOGGLE_MESSAGE',
  };
}
```

* Why are we doing this?
    - We do this so we can use this inside of our reducer
    - currently inside `reducer.js` we are just using a string 'TOGGLE_MESSAGE'
    - We now will import TOGGLE_MESSAGE and replace our string

`reducer.js`

```
import { TOGGLE_MESSAGE } from './actions';

const initialState = {
  messageVisibility: false,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case TOGGLE_MESSAGE:
      return {
        ...state,
        messageVisibility: !state.messageVisibility,
      };
    default:
      return state;
  }
}
```

* This is a best practice to make sure you type the correct action name
* If you do it this way and mispell it, you will get an error
* If you don't use this technique and mispell your action, you won't get an error and debugging will be much more difficult

## Next - Add Thunk middleware
