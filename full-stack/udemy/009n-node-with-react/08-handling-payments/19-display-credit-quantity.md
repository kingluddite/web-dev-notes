# Display Credit Quantity
* In our Header Component `this.props.auth` already holds the user

`Header.js`

```
// more code
default:
  return [
    <li key="1">
      <Payments />
    </li>,
    <li key="2">
      <a href="/api/logout">Logout</a>
    </li>
  ];
// more code
```

Modify to:

```
// more code
default:
  return [
    <li key="1">
      <Payments />
    </li>,
    <li key="3">
      Credits: {this.props.auth.credits}
    </li>,
    <li key="2">
      <a href="/api/logout">Logout</a>
    </li>
  ];
// more code
```

![showing credits](https://i.imgur.com/0rMMxqR.png)

* The styling needs improvement
* Let's add some custom styling

```
<li key="3" style={{ margin: '0 10px' }}>
  Credits: {this.props.auth.credits}
</li>,
```

* And it should now look like:

![styled credits btn](https://i.imgur.com/dwPrF5C.png)

## Test to make sure credits are added to Header after buying them
* If we refresh the app, we see instantly, the user credits shows and is correct

![diagram](https://i.imgur.com/NuVAdG1.png)

* Add Purchase more credits and it updates the Header

## Why did the number automatically update?
* We sent out request to pay additional money
* This is the original request to pay additional money (stripe)

![stripe request](https://i.imgur.com/6lZpnm5.png)

* That sends a request to our backend API
* We say ok we will finalize the charge
* After we finalize the charge we add 5 credits to the user's Model
* We save that to our Database
* Then we respond to the request with the updated user model
* Preview tab in chrome dev tools network tab shows that response

## But how does the response update the Header?
* The Header text to display the credits comes from `this.props.auth.credits`
* `this.props.auth` is being produced by our `authReducer`

`authReducer.js`

```js
import { FETCH_USER } from './../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
```

* Every time the action comes in as FETCH_USER, we return the `action.payload`

`actions/index.js`

```js
import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};
```

* We know that the response to this post request is the updated user Model, the user model with the new number of credits

`axios.post('/api/stripe', token)`

* And then after we get that response we dispatch and Action of type `FETCH_USER` with that user model `payload: res.data`
* And since we use the same Action `type` between these two `Action Creators` and that our `authReducers` is watching for FETCH_USER, this is what makes the Header automatically update
* When we get the response back from the API
    - OK, update the value in the reducer
    - The reducer updates the value
    - pulls off the new user model
    - Becuase the authReducer reran and created a new piece of state
    - Our redux updates
    - Because our redux updates
    - All the Components in our app update with that new state
    - And now `this.props.auth` contains the new user with the correct number of credits

## Billing is complete!


