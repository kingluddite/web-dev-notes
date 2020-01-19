# Subscribing and Dynamic Actions
## Is your dev server running?
`$ npm run dev-server`

`$ yarn run dev-server`

## We will learn 2 things:
1. Watch for changes to the store
    * Currently we have calls to `store.getState()` but that doesn't get re-run
        - We **need** to do that to re-render our app
2. How you can dispatch an action and pass data along too
    * This will enable us to pass more than just the action type

## How can we watch for changes to Redux store state?
* `store.subscribe()`
* We pass a single function to `store.subscribe()`
    - That single function gets called every single time the store changes

```
store.subscribe(SINGLE_FUNCTION)
```

* Let's just log the object to the console

`redux-101.js`

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
    case 'RESET':
      return {
        count: 0,
      };
    default:
      return state;
  }
});

store.subscribe(() => {
  console.log(store.getState());
});
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
```

* We should see 4 logs printing because we have 4 changes to the state

![4 logs](https://i.imgur.com/9YN4MeZ.png)

## Takeaway
* Using `store.subscribe()` is a fantastic way to do something when the state changes

## Remove subscription
* We just learned how to subscribe to the store
* We can also remove our individual subscription
* This is how we stop subscribing
* The return value from subscribe is a function we can call to unsubscribe
    - Name it whatever you want
    - You could see this with VS Code Intellisense by hovering over the `subscribe()` method (TODO)
    - Or read [in docs](https://redux.js.org/api/store#subscribelistener)

`redux-101.js`

```
// MORE CODE
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: 'INCREMENT',
});

unsubscribe();

// MORE CODE
```

* Now you will only see one log in the console
* The state is still changing but we are no longer notified of the changes in state
* **note** `unsubscribe()` takes no arguments
* Once we call `unsubscribe()` the subscription stops and if we have other dispatches after the unsubscribe() we will not see them
* **note** The state is still changing but we are not being notified via the subscription

### Remove the unsubscribe
* So now we no how to subscribe to data and so something meaningful once it changes

## Dispatch dynamic actions
* All of our actions currently just have the `type` property
* But we have no way of passing data along
    - like passing data... from user input

### type property required
```
store.dispatch({
  typee: 'INCREMENT',
});
```

* If you spell type `typee`, [Redux will throw an error](https://redux.js.org/api/store#subscribelistener)
    - `type` is required in Redux actions
    - But you can add other custom properties (as many as you want)

## Let's add a custom property to dispatch()
* We'll add incrementBy

```
// MORE CODE

store.dispatch({
  type: 'INCREMENT',
  incrementBy: 5,
});
// MORE CODE
```

* By doing that we now have access to incrementBy via `action`

```
// MORE CODE

import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {

// MORE CODE
```

* We had `action.type` and now we have `action.incrementBy`
* But we may not always have it so we need to use some conditional logic to use it when we have it and default to `1` when we don't
* **note** Wondering why I am using extra curly braces when storing a variable inside a case? [read more here](https://eslint.org/docs/rules/no-case-declarations)

```
// MORE CODE

import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      const incrementBy =
        typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy,
      };
    }

// MORE CODE
```

* We use a ternary operator
  - If `action.incrementBy` is equal to a number we'll use it
  - Otherwise we'll just use `1`

## Full code here
```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      const incrementBy =
        typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy,
      };
    }
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

// MORE CODE

store.dispatch({
  type: 'INCREMENT',
  incrementBy: 5,
});

store.dispatch({
  type: 'INCREMENT',
});

// MORE CODE
```

## console output will be:

```
{ count: 5} // we use incrementBy so we increase to 5
{ count: 6} // no use incrementBy the rest so just use default value 
{ count: 0}
{ count: -1}
```

* This proves we can pass dynamic information along inside of our action objects
* We can use that information to calculate the new state

## Challenge
* Do exact same thing for decrement
* Add decrementBy === 10

```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      const incrementBy =
        typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy,
      };
    }
    case 'DECREMENT': {
      const decrementBy =
        typeof action.decrementBy === 'number' ? action.decrementBy : 1;
      return {
        count: state.count - decrementBy,
      };
    }
    case 'RESET':
      return {
        count: 0,
      };
    default:
      return state;
  }
});
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: 'INCREMENT',
  incrementBy: 100,
});

store.dispatch({
  type: 'INCREMENT',
});

store.dispatch({
  type: 'DECREMENT',
  decrementBy: 500,
});
store.dispatch({
  type: 'RESET',
});
store.dispatch({
  type: 'DECREMENT',
});
```

## Output
  - I wanted to show if there was a number it would increment or decrement by that number if incrementBy or decrementBy were available and set to a number.
  - If not, 1 would be used

```
{ count: 100} // incrementBy is set to number so we increase by 100
{ count: 101} // no incrementBy so just increase by 1
{ count: -399} // decrementBy is set to a number so decrease by 500
{ count: 0}
{ count: -1} // no decrementBy so we decrease by 1
```

## Takeaway
* This is great because we have a way of dispatching generic actions like RESET and dynamic actions like INCREMENT and DECREMENT

## Other important stuff
* Options
  - We can take in no extra values
  - We can take in optional ones
  - **New** We can also create actions that have require types by just using them directly as opposed to checking if they exist

#
```
// MORE CODE

store.dispatch({
  type: 'SET',
  count: 999,
});
// MORE CODE
```

* Above is perfectly valid 
* Now we can use `count` up above like we did before with incrementBy or decrementBy but we won't need to check if it exists because it isn't optional
  - We will force those who use SET to actually provide the value `101`

```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      const incrementBy =
        typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy,
      };
    }
    case 'DECREMENT': {
      const decrementBy =
        typeof action.decrementBy === 'number' ? action.decrementBy : 1;
      return {
        count: state.count - decrementBy,
      };
    }
    case 'SET': {
      return {
        count: action.count,
      };
    }
    case 'RESET':
      return {
        count: 0,
      };
    default:
      return state;
  }
});
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: 'INCREMENT',
  incrementBy: 100,
});

store.dispatch({
  type: 'INCREMENT',
});

store.dispatch({
  type: 'DECREMENT',
  decrementBy: 500,
});
store.dispatch({
  type: 'RESET',
});
store.dispatch({
  type: 'DECREMENT',
});

store.dispatch({
  type: 'SET',
  count: 999,
});
```

* That will show `{count: 999}` at bottom of console log
