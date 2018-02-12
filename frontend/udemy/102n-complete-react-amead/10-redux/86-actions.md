# Actions
* Enable us to change the redux store

## What is an Action?
* An object that gets sent to the store
* This object describe the type of action we we'd like to take

### Action examples
* walk
* stop walking
* sit
* work
* stop working

We are changing the state over time

* increment
* decrement
* reset

We can change the state over time by dispatching various actions

## What does the action object look like?
```js
store.dispatch({
  type: 'INCREMENT',
});
```

* We don't see any changes
* UPPERCASE is common naming convention
* Use underscore if multiple words `INCREMENT_TEST`

```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }) => {
  console.log('running');
  return state;
});

store.dispatch({
  type: 'INCREMENT',
});

console.log(store.getState());
```

* We see it is called twice
* If you comment out the dispatch, it is called only once
* It's that second time it's called (first time is the default value) but the second is where we can make changes to the state

## How do we access the action object
It gets passed in as the 2nd argument of the function

```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
  if (action.type === 'INCREMENT') {
    return {
      count: state.count + 1,
    };
  } else {
    console.log('running');
    return state;
  }
});

store.dispatch({
  type: 'INCREMENT',
});

console.log(store.getState());
```

* Now we have increased `count` to **1**

## Dispatch twice
```
// MORE CODE
store.dispatch({
  type: 'INCREMENT',
});

store.dispatch({
  type: 'INCREMENT',
});
console.log(store.getState());
```

* That will give us 2

## Better to use Switch statement
```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
      };
    default:
      return state;
  }
});

store.dispatch({
  type: 'INCREMENT',
});

store.dispatch({
  type: 'INCREMENT',
});
console.log(store.getState());
```

* Same result where `count` is **2**
* We don't use `break` because `return` makes them unecessary

### What are **reducers**
* Reducers specify how your app's state should change in response to an action
* They take in the current state, the action with its payload and return a new state for the app
* `this.setState()` is still used in local component state
* Returning an object with the updated state values via our reducer is the preferred technique for the Redux global store

## Add a DECREMENT action
```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
});

store.dispatch({
  type: 'INCREMENT',
});

store.dispatch({
  type: 'DECREMENT',
});
console.log(store.getState());
```

* That will give us a count of `0`

## Add a Reset
```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
      };
    case 'RESET':
      return {
        count: 0,
      };
    case 'DECREMENT':
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
});

console.log(store.getState());

store.dispatch({
  type: 'INCREMENT',
});

store.dispatch({
  type: 'INCREMENT',
});

store.dispatch({
  type: 'RESET',
});

store.dispatch({
  type: 'DECREMENT',
});

console.log(store.getState());
```

