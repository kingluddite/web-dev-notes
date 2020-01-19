# Actions
* Enable us to change the Redux store
* How do I change the count?
    - Increment by 1
    - Decrement by 1
    - Reset to 0
* Currently, no way to do this
* Actions fix this

## Two getState calls
```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }) => state);

console.log(store.getState());
console.log(store.getState());
```

* Gives us exact same value twice
* The value doesn't change because there is no code inbetween the two calls

## What is an Action?
* Nothing more than an object that gets sent to the store
* This object describe the type of action we we'd like to take

### Action examples
* Let's say I'm creating a Redux store that represents a farmer
* Here's some actions that represent a farmer
  - walk
  - stop_walking
  - sit 
  - plant
  - stop_planting
  - milk
  - stop_milking

...you get the idea. We have a string of actions that changing the state over time

## The exact same thing is true for our application
* increment
* decrement
* reset

This will allow us to change the store over time by just dispatching various actions

## What does the action object look like?
* **remember** An action is just an object that gets sent to the store

### Here are our actions
* increment
* decrement
* reset
* **note** Common Redux naming practice to spell actions in all UPPER CASE
* If you use multiple words it is commonly spelled like MULTIPLE_WORDS
  - Not a requirement but a common naming convention used by the Redux community

```
store.dispatch({
  type: 'INCREMENT',
});
```

## Houston we have a problem!
* We don't see any changes!

## How do we actually change things?
* By calling the method on store called `dispatch()`

```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }) => state);

console.log(store.getState());
// Actions - An object that gets sent to the store

// I'd like to increment the count
store.dispatch({
  type: 'INCREMENT'
});

// I'd like to reset the count to zero

console.log(store.getState());
```

## Houston we have a problem!
* Still nothing happens!
* We see it is still called twice but nothing changes
* Or does it?.....

### Something did change!
* Try this code out in browser

```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }) => {
  console.log('running');

  return state;
});

console.log(store.getState());
// Actions - An object that gets sent to the store

// I'd like to increment the count
store.dispatch({
  type: 'INCREMENT',
});

// I'd like to reset the count to zero

console.log(store.getState());

```

### You see `running` gets called twice
* Comment out the dispatch code

```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }) => {
  console.log('running');

  return state;
});

console.log(store.getState());
// Actions - An object that gets sent to the store

// I'd like to increment the count
// store.dispatch({
//   type: 'INCREMENT',
// });

// I'd like to reset the count to zero

console.log(store.getState());
```

### Now running is only getting called once
* So when we run the dispatch function is called the `createStore` is called again
* This means we can now use the action object to make changes to the `state`

## How do we access the action object?
* It gets passed in as the 2nd argument of the function
* We won't need to set up a default action as in our current example the action does get passed in
* We can combine the current action with the state to determine what the new state should be
  - So we want to take a peak at the action `type`
    + If the type is equal to INCREMENT do one thing
    + else do something else

## Still with dispatch commented out
```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
  if (action.type === 'INCREMENT') {
    return {
      count: state.count + 1,
    };
  }
  return state;
});

console.log(store.getState());
// Actions - An object that gets sent to the store

// I'd like to increment the count
// store.dispatch({
//   type: 'INCREMENT',
// });

// I'd like to reset the count to zero

console.log(store.getState());
```

* Nothing happens - 2 calls but count is 0 for both

## Make count work!
* Comment the despatch in
* Check it out in the browser

```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
  if (action.type === 'INCREMENT') {
    return {
      count: state.count + 1,
    };
  }
  return state;
});

console.log(store.getState());
// Actions - An object that gets sent to the store

// I'd like to increment the count
store.dispatch({
  type: 'INCREMENT',
});

// I'd like to reset the count to zero

console.log(store.getState());
```

### Now count starts at 0 and increments to 1!
![count goes to 1](https://i.imgur.com/GMpbsr9.png)

## Add another Dispatch call
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

* Yes we are doing it twice!
* So we should expect to see it get incremented to 2!

![goes to 2](https://i.imgur.com/yd2QaMs.png)

* But it is not 0,1,2 but rather 0,2

## Better to use Switch statement
* More common pattern to use a JavaScript switch statment inside the `createStore()` method instead of a ton of "if else" statements
* **tip** If you don't know the JavaScript Switch syntax you will most likely run into a bunch of errors, [check it out here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch#targetText=Description,clause%2C%20executing%20the%20associated%20statements.)

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

console.log(store.getState());
// Actions - An object that gets sent to the store

// I'd like to increment the count
store.dispatch({
  type: 'INCREMENT',
});

store.dispatch({
  type: 'INCREMENT',
});
// I'd like to reset the count to zero

console.log(store.getState());
```

* Same result where `count` is **2**
* We don't use `break` because `return` makes them unecessary

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

console.log(store.getState());
// Actions - An object that gets sent to the store

// I'd like to increment the count
store.dispatch({
  type: 'INCREMENT',
});

store.dispatch({
  type: 'DECREMENT',
});
// I'd like to reset the count to zero

console.log(store.getState());
```

* That will give us a count of `0`

## Add another Decrement store.dispatch() call
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

console.log(store.getState());
// Actions - An object that gets sent to the store

// I'd like to increment the count
store.dispatch({
  type: 'INCREMENT',
});

store.dispatch({
  type: 'DECREMENT',
});
store.dispatch({
  type: 'DECREMENT',
});
// I'd like to reset the count to zero

console.log(store.getState());
```

* And now you will get -1 (0 + 1 - 1 - 1)

### What are **reducers**
* Reducers specify how your app's state should change in response to an action
* They take in the current state, the action with its payload and return a new state for the app
* `this.setState()` is still used in local component state
* Returning an object with the updated state values via our reducer is the preferred technique for the Redux global store

## Challenge
* Add a reset
  - Follow these actions

```
+ 1
+ 1
reset to 0
- 1
The final count should be -1
```

## Challenge Solution
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

console.log(store.getState());
// Actions - An object that gets sent to the store

// I'd like to increment the count
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
// I'd like to reset the count to zero

console.log(store.getState());
```

## Recap
* Actions are our way of communicating with the Redux store
* Action is nothing more than an object
  - Currently all of our actions have a single property `type`
  - `type` is the one required property for store
  - We can add other properties
* When we create the Action object we have to get it to the `store` and we do that with the `store.dispatch()` method
  - We called 4 separate dispatches that affect the store's state 4 times
* We handle the dispatch calls with the function passed to createStore()
  - This function gets called once when we first call createStore() to setup the default state and one time for every store.dispatch() call
  - Every time I dispatch an action object I can access that action object as the second argument of the function passed to createStore()
    + We can examine the `type` and based off of the type we can make meaningful changes to the state
* Bottom line is all of the above gives us the ability to create a Redux store that we can read from and change

## Next
* More Practical/Advanced/Real World techniques



