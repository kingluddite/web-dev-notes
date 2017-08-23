# Refactor to ASYNC/AWAIT
`/client/src/actions/index.js`

```js
import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
  const two = 1 + 1;
  return function(dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
```

* Currently our code is making use of a Promise that is being returned by axios.get()
* Anytime we make a request to our Database it always returns a promise
    - We can get a little notification of when that request was resolved by chaining on a `.then()`

## Refactor
* If you have an arrow function with a single statement
* This would be an arrow function with two statements

```
export const fetchUser = () => {
  const two = 1 + 1;
  return function(dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
```

* But our arrow function has just a single statement
* And when you have just one, you can remove the curly braces and the `return` keyword

```js
// more code
export const fetchUser = () =>
  function(dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
```

## Test
* Should work as before

## Convert function to arrow function
```js
export const fetchUser = () =>
  dispatch => {
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
```

* Don't save so prettier won't auto reformat
* Now save and you'll see

```js
export const fetchUser = () => dispatch => {
  axios
    .get('/api/current_user')
    .then(res => dispatch({ type: FETCH_USER, payload: res }));
};
```

* And that code is completely equivalent to what we had before

## Convert to async/await
* What function contains the Promise?
* This one:

![contains Promise](https://i.imgur.com/6pJOwEV.png)

```js
export const fetchUser = () => async dispatch => {
  axios
    .get('/api/current_user')
    .then(res => dispatch({ type: FETCH_USER, payload: res }));
};
```

* Find all other Promises and preface them with the `await` keyword

## Final code
```js
import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res });
};
```

* Test and it should work the same
* Our code now is 100% equivalent to the previous code but way more readable
