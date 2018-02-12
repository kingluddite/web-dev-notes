# Refactor
`wepback-config.js`

* Switch to: `entry: ./src/playground/redux-101.js`
* Shut down server
* Run `$ yarn run dev-server`
* View console and you'll see objects created by Redux actions

## Action generators
* functions that return action objects

`redux-101.js`

```
import { createStore } from 'redux';

// Action generators - functions that return action objects
const incrementCount = () => ({
  type: 'INCREMENT',
});

const store = createStore((state = { count: 0 }, action) => {
// // MORE CODE
```

* Above is pretty useless so far
* We are going to call this function instead of manually creating this function:

```js
// MORE CODE
store.dispatch({
  type: 'INCREMENT',
  incrementBy: 5,
});
// MORE CODE
```

### Cons of manually generating objects every single time
* Typeos are not easy to catch

```js
store.dispatch({
  type: 'INCREMENTT', // mispelled here
  incrementBy: 5,
});
```

* We have a typeo but no sign of clear errors
* But if we do this:

```
import { createStore } from 'redux';

// Action generators - functions that return action objects
const incrementCount = () => ({
  type: 'INCREMENT',
});

// MORE CODE

store.dispatch({
  type: 'INCREMENT',
});

store.dispatch(incrementCount());
```

* The good thing about doing it this way is now if we misspell it like:

```js
// // MORE CODE
store.dispatch(incrementCounttttt());
// // MORE CODE
```

* We now will get an error
* We also get added bonus of autocompletion of those function names (inside our text editor)

### Best Practice
* We prefer **Action Generators** over **Inline Action Objects**

```js
// // MORE CODE
// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5,
// });

// store.dispatch({
//   type: 'INCREMENT',
// });

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());
// // MORE CODE
```

```js
import { createStore } from 'redux';

// Action generators - functions that return action objects
const incrementCount = (payload = {}) => ({
  type: 'INCREMENT',
  incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
});
// MORE CODE
```

* Now we no longer need this line (so delete it):

```js
// // MORE CODE
const incrementBy =
  typeof action.incrementBy === 'number' ? action.incrementBy : 1;
// // MORE CODE
```

* Modify to `action.incrementBy,`

```
// MORE CODE
switch (action.type) {
  case 'INCREMENT':

    return {
      count: state.count + action.incrementBy,
    };
// MORE CODE
```

* Why do we pass a default empty object?

`const incrementCount = (payload = {}) => ({`

* If we don't set a default and I don't pass anything into incrementCount we will be trying to access a property on an object and that object is `undefined`
    - And accessing a property on undefined will throw an error
    - remove the default
    - `const incrementCount = (payload) => ({`
        + And you'll see the `incrementBy` of undefined error

## Refactor with destructuring
* We can also destructure arguments that get passed into functions

```js
const add = data => {
  return data.a + data.b;
};

console.log(add({ a: 1, b: 12 })); // 13
```

* Destructure the arguments like:

```js
const add = ({ a, b }) => {
  return a + b;
};

console.log(add({ a: 1, b: 12 })); //
```

* Same output `13` but cleaner looking

* Pass another 

```js
const add = ({ a, b }, c) => {
  return a + b + c;
};

console.log(add({ a: 1, b: 12 }, 100)); // 113
```

* We add in the `c` argument

## We can also set up default values

```js
// MORE CODE
const incrementCount = ({ incrementBy } = {}) => ({
  type: 'INCREMENT',
  incrementBy: typeof incrementBy === 'number' ? incrementBy : 1,
});
// MORE CODE
```

* Nice
* But we can do better by setting up default values

```js
import { createStore } from 'redux';

// Action generators - functions that return action objects
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy,
});
// MORE CODE
```

* Now our code is much easier to read and we get the exact same output
* How does the default value of `1` get set?
    - It will get set to `1` if there is an object provided and it doesn't include `incrementBy`
    - If there is not object provided, the default is an empty object and when we try to destructure that empty object, we won't have incrementBy so the end result will default to `1`

## Challenge
* Add all the other action generators

```js
import { createStore } from 'redux';

// Action generators - functions that return action objects
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy,
});

const resetCount = () => ({
  type: 'RESET',
});

const setCount = ({ count } = {}) => ({
  type: 'SET',
  count,
});

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy,
      };
    case 'RESET':
      return {
        count: 0,
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy,
      };
    case 'SET':
      return {
        count: action.count,
      };
    default:
      return state;
  }
});

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5,
// });

// store.dispatch({
//   type: 'INCREMENT',
// });

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

// store.dispatch({
//   type: 'RESET',
// });

store.dispatch(resetCount());
// store.dispatch({
//   type: 'DECREMENT',
// });

// store.dispatch({
//   type: 'DECREMENT',
//   decrementBy: 10,
// });

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

// store.dispatch({
//   type: 'SET',
//   count: 101,
// });

store.dispatch(setCount({ count: 100 }));
```

* Works the same as before but our app is now much easier to grow
