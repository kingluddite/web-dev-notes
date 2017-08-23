# authReducer return values
`/client/src/actions/index.js`

```js
import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res }); // Action!
};
```

* We need to make sure this Action gets picked up by our reducer
* **reminder** `res` is the output from axios
    - We saw the console output the `data` property

### payload

![payload data](https://i.imgur.com/AJT9Z5h.png)

### payload.data

* So we update this line:

```js
import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data }); // now we use res.data!
};
```

## Our reducer `authReducer.js`
```js
export default function(state = {}, action) {
  console.log(action);
  switch (action.type) {
    default:
      return state;
  }
}
```

* We just set this up before just as boilerplate to make sure it works
* We'll import the `fetch_user` Action type
* And set up another case in our switch statement to watch for the fetch to come into this reducer

`authReducer.js`

```js
import { FETCH_USER } from './../actions/types';

export default function(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
    default:
      return state;
  }
}
```

## Life cycle of this reducer
* Let's think about it very carefully
    - What different values will it produce?
    - Why?
* Let's look at the Header mockup

![Header mockup](https://i.imgur.com/yES7fUk.png)

* The content on the right hand side will change depending if the user is logged in
* Here is a sequence of events that might make the Header act unexpectedly
    - When our app first boots up
    - And we make an Ajax request to our backend server
        + To decide if we are logged in
    - What would happen if that request took a very long time to complete?
    - Maybe they are on a 3G network connection (slow)
    - If that happens we might see some content in Header that we didn't expect
    - We could have one header and then when they log in it changes
    - We don't want to fall into the trap and assume that user is or is not logged in and then show the UI according to that flag
    - That being said we need to think carefully about the returned values of the authReducer

## Summary of our game plan
![game plan diagram](https://i.imgur.com/E0WBvA5.png)

* We have 3 different cases for our app
    1. Make a request to backend to get current user and the request does not instantly resolve
        * We made the request and we are twiddling our thumbs to see whether or not the user is logged in
        * While we are waiting our reducer should return null
        * `null` will mean - "We don't know what's up yet"
    2. The request is complete and the user is logged in
        * The `authReducer` returns the **User model**
    3. Request done, user IS NOT logged in
        * The `authReducer` returns false
        * false means we are sure they are not logged in

## Coding our authReducer
* We pass state a value of `null` (instead of always returning an empty object `{}`) that means:
    - First time our app runs and boots up
    - We will immediately return `null` which means by default we have no clue whether or not the user is logged in

`/client/src/reducers/authReducer.js`

```js
import { FETCH_USER } from './../actions/types';

export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    default:
      return state;
  }
}
```

### Houston we have a problem
* When we return `action.payload` and the user is logged in we get the user object
* But when we are logged out and return `action.payload` we get an empty string
    - That happens when there is not user object and it just returns an empty string
    - We don't want to do that

![payload empty string](https://i.imgur.com/inWaKeg.png)

* Solution - Rather than return an empty string we will explicitly return the value `false`

`return action.payload || false;`

```js
import { FETCH_USER } from './../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      console.log(action.payload || false); // tests if it is working
      return action.payload || false;
    default:
      return state;
  }
}
```

* How is this working?
* In JavaScript an empty string is interpreted to be a **falsey** value

![falsey](https://i.imgur.com/8hzyVpz.png)

* So it evaluates left and if it is an empty string the value will be false and `false || false` equates to `false`

## Next
* Make Header aware of current auth `state`
