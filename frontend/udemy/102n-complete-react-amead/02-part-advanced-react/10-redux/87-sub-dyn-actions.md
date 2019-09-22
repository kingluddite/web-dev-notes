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

* Now you will only see one log
* The state is still changing but we are no longer notified of the changes in state
* Remove the unsubscribe

## Dispatch dynamic actions
* All of our actions currently have the `type` property
* But we have no way of passing data along
    - like... from user input

### type property required
```
store.dispatch({
  typee: 'INCREMENT',
});
```

* If you spell type `typee`, Redux will throw an error
    - `type` is required in Redux actions
    - But you can add other custom properties

```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const incrementBy =
        typeof action.incrementBy === 'number' ? action.incrementBy : 1;

      return {
        count: state.count + incrementBy,
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

* Conslue output will be:

```
{ count: 5} // we use incrementBy so we increase to 5
{ count: 6} // no use incrementBy the rest so just use default value 
{ count: 0}
{ count: -1}
```

## Challenge
* Add decrementBy === 10

```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
    // MORE CODE
    case 'DECREMENT':
      const decrementBy =
        typeof action.decrementBy === 'number' ? action.decrementBy : 1;

      return {
        count: state.count - decrementBy,
      };
    default:
      return state;
  }
});

// MORE CODE
store.dispatch({
  type: 'DECREMENT',
});

store.dispatch({
  type: 'DECREMENT',
  decrementBy: 10,
});
```

* Output

```
{ count: 5} // we use incrementBy so we increase to 5
{ count: 6} // no use incrementBy the rest so just use default value 
{ count: 0}
{ count: -1} // use default value
{ count: -11} // we use decrementBy so we decrease by 10
```

* We can take in no extra values
* Or we can take in optional ones
* We can also create actions that have require types by just using them directly as opposed to checking if they exist

```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const incrementBy =
        typeof action.incrementBy === 'number' ? action.incrementBy : 1;

      return {
        count: state.count + incrementBy,
      };
    case 'RESET':
      return {
        count: 0,
      };
    case 'DECREMENT':
      const decrementBy =
        typeof action.decrementBy === 'number' ? action.decrementBy : 1;

      return {
        count: state.count - decrementBy,
      };
    case 'SET':
      return {
        count: action.count,
      };
    default:
      return state;
  }
});

// MORE CODE

store.dispatch({
  type: 'SET',
  count: 101,
});
```

* That will show `{count: 101}` at bottom of console log
