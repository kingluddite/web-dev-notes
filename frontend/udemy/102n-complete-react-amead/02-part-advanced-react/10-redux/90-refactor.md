# Refactor
`wepback-config.js`

1. Switch back to: `entry: ./src/playground/redux-101.js`
2. Shut down server
3. Run `$ yarn run dev-server` or `$ npm run dev-server`
4. View console and you'll see objects created by Redux actions

## Action generators
* functions that return action objects
* All the object that we're creating here:

```
// MORE CODE
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

* Now all the above actions will be created in just one place
* And we'll have a function we can call to generate the action objects

## Let's create a single action generator
* This will take care of generating the action objects for all of our INCREMENT cases
  - Whether we include incrementBy or whether we do not
  - We will not worry about decrement or reset (we'll deal with those in a bit)

### How can we get this done?
1. Just create a function (we'll use arrow functions here)

```
// MORE CODE

// action generators - functions that return action objects

const incrementCount = () => {

}

// MORE CODE
```

* We can name it whatever we like

### What is the goal of an action generator?
* Is to be a very simple function that takes input in and returns the new action object
  - We want to return an object that at least has the type property set

```
// MORE CODE

const incrementCount = () => {
   return {
     type: 'INCREMENT'
   }
}

// MORE CODE
```

* Since our function just returns an object (one thing) we can do that implicitly (less typing)

```
// MORE CODE

const incrementCount = () => ({
  type: 'INCREMENT',
});

// MORE CODE
```

* **remember** When we implicitly return an object we don't need the `return` word and we wrap our object inside parentheses

### Above is pretty useless so far
* We are not getting many advantages just yet
* But let's explore how this can get used
* We are going to call this function instead of manually generating this object

```
// MORE CODE
store.dispatch({
  type: 'INCREMENT',
  incrementBy: 5,
});
// MORE CODE
```

### Cons of manually generating objects every single time
* Typos are not easy to catch

```
store.dispatch({
  type: 'INCREMENTT', // misspelled here
  incrementBy: 5,
});
```

* We have a typo but we get back no signs of a clear error
  - So debugging is harder when we manually generate objects every time

## Let's improve on this

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

```
// // MORE CODE
store.dispatch(incrementCounttttt());
// // MORE CODE
```

## Pro: We now will get a real error!
* Debugging is now easier
* We also get added bonus of auto-completion of those function names (inside our text editor)

### Best Practice
* We RECOMMEND **Action Generators** over **inline Action Objects**

```
// MORE CODE

// Action generators - functions that return action objects
const incrementCount = () => ({
  type: 'INCREMENT',
});

// MORE CODE
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

## A few more reason we link Action Generators
* Let's figure out how we can use our Action Generators to handle the custom data that we need
  - In the case of INCREMENT we have incrementBy
  - In the case of DECREMENT we have decrementBy
  - In the case of SET we have count
* We can set all of this up inside Action Generators
* We will dispatch an object

```
store.dispatch(incrementCount())
```

* At this point in time we have no way to handle `incrementBy` but we'll pass it in anyway
  - We'll pass it in as an object with a property of `incrementBy` and a value of `100`

```
store.dispatch(incrementCount({ incrementBy: 100 }));
```

* When we do this we won't get an error or the count won't increase by 100 because there is not handler for the argument passed in
  - The Action Generator contains no code for that so we go from 0 to 1 and 1 to 2...
  - To fix this we need to add an argument to our Action Generator
    + We'll add an argument called `payload` and default it to an empty object so when the times happen where there is no payload then we'll just pass an empty object

```
import { createStore } from 'redux';

// action generators - functions that return action objects

const incrementCount = (payload = {}) => ({
  type: 'INCREMENT',
});

// MORE CODE
```

## Add a incrementBy property for our Action Generator
* If payload has a property inside it of `incrementBy` and it is a number than use it otherwise default to `1`

### Try it out
* I adjusted the increments, decrement set reset order and values

```
import { createStore } from 'redux';

// action generators - functions that return action objects

const incrementCount = (payload = {}) => ({
  type: 'INCREMENT',
  incrementBy:
    typeof payload.incrementBy === 'number' ? payload.incrementBy : 1,
});

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        count: state.count + action.incrementBy,
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

// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 100,
// });

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());

store.dispatch({
  type: 'RESET',
});

store.dispatch({
  type: 'DECREMENT',
});

store.dispatch({
  type: 'DECREMENT',
  decrementBy: 10,
});

store.dispatch({
  type: 'SET',
  count: 101,
});

```

* Now you will see count values:
  - 5
  - 6
  - 0
  - -1
  - -11
  - 101

## Why do we need a default value for payload?
```
// MORE CODE

const incrementCount = (payload = {}) => ({
  type: 'INCREMENT',
  incrementBy:
    typeof payload.incrementBy === 'number' ? payload.incrementBy : 1,
});

// MORE CODE
```

* Because if you leave it out like this:

```
// MORE CODE

const incrementCount = (payload) => ({
  type: 'INCREMENT',
  incrementBy:
    typeof payload.incrementBy === 'number' ? payload.incrementBy : 1,
});

// MORE CODE
```

* And you have situations where I didn't pass anything into increment count like we do here:

```
// MORE CODE

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());

// MORE CODE
```

## Houston we have a problem!
* Yes without a default value and calling incrementCount() with not argument then we'll get an error

`redux-101.js?34f9:7 Uncaught TypeError: Cannot read property 'incrementBy' of undefined`

* The reason for the error is we are trying to access a property on an object that is undefined
* **note** Accessing a property on undefined will throw an error
* To fix this we just pass a default empty object

```
// MORE CODE

const incrementCount = (payload = {}) => ({
  type: 'INCREMENT',
  incrementBy:
    typeof payload.incrementBy === 'number' ? payload.incrementBy : 1,
});

// MORE CODE
```

## Let's use destructuring
* It is good what we did so far but destructuring will let us take it one step further

### Note on destructuring
* When we are destructuring we can destructure like this:

```
const person = {
  name: 'Drew',
  age: 22,
  location: {
    city: 'Portland'
  }
}
const { name: firstName = 'Anonymous', age } = person;
```

### But we can also destructure arguments that get passed into functions
* Instead of this

```
console.log(add(1,12));
```

* Let's log a call to add but we are passing it an object with properties with values of numbers

```
console.log(add({ a: 1, b: 12}));
```

* What would that function look like?

```
const add = (data) => {
  return data.a + data.b;
}
console.log(add({ a: 1, b: 12 })) // 13
```

* But we can destructure that `data` object

## How?
* Like this:

```
const add = ({ a, b }) => a + b;
console.log(add({ a: 1, b: 12 })); // 13
```

* What if I passed in another argument that was not part of the object

```
const add = ({ a, b }, c) => a + b + c;
console.log(add({ a: 1, b: 12 }, 10)); // 23
```

## Takeaway
* So when we are destructuring we can destructure one of the arguments as long as that argument is an object or an array

### Another cool feature we can do with destructuring arguments - we can set up default values too!
* We'll play around with adding default values to destructured arguments with `incrementCount`
* We'll destructure the `data` object
* We'll no longer need to use the parent `payload` as our path to properties

### From this:
```
// MORE CODE

const incrementCount = (payload = {}) => ({
  type: 'INCREMENT',
  incrementBy:
    typeof payload.incrementBy === 'number' ? payload.incrementBy : 1,
});

// MORE CODE
```

### To this:

```
// MORE CODE

const incrementCount = ({ incrementBy } = {}) => ({
  type: 'INCREMENT',
  incrementBy: typeof incrementBy === 'number' ? incrementBy : 1,
});

// MORE CODE
```

## But we can cut down even more!
* Because when we destructure we can also set up default values

```
// MORE CODE

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy,
});

// MORE CODE
```

* How does the following ever get set `the default of 1`

```
const incrementCount = ({ incrementBy = 1 } = {}) => ({
```

* It will get set to `1` if there is an object provided
* If there is not object provided the default is an empty object
* When we try to destructure an empty object we won't have access to `incrementBy` so the end result will be `1`

## Let's set the Action Generator up for DECREMENT
```
// MORE CODE

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy,
});

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        count: state.count + action.incrementBy,
      };
    }
    case 'DECREMENT': {
      return {
        count: state.count - action.decrementBy,
      };
    }

// MORE CODE

store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(decrementCount());

// MORE CODE

// store.dispatch({
//   type: 'DECREMENT',
// });

// store.dispatch({
//   type: 'DECREMENT',
//   decrementBy: 10,
// });

```

* Output is:

```
{count: 5}
{count: 6}
{count: -4}
{count: -5}
{count: 0}
{count: 101}
```

## Challenge
* Add Action Generators for `resetCount` and `setCount`

```
import { createStore } from 'redux';

// action generators - functions that return action objects
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy,
});

const setCount = ({ count }) => ({
  type: 'SET',
  count,
});

const resetCount = () => ({
  type: 'RESET',
});

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        count: state.count + action.incrementBy,
      };
    }
    case 'DECREMENT': {
      return {
        count: state.count - action.decrementBy,
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

// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 100,
// });

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(decrementCount());

store.dispatch(setCount({ count: 100 }));
store.dispatch(resetCount());
// store.dispatch({
//   type: 'RESET',
// });

// store.dispatch({
//   type: 'DECREMENT',
// });

// store.dispatch({
//   type: 'DECREMENT',
//   decrementBy: 10,
// });

// store.dispatch({
//   type: 'SET',
//   count: 101,
// });

```

* Output should be:

```
5
6
-4
-5
100
0
```

* Now that we are using Action Generators we can vastly simplify the thing we do a lot

```
// MORE CODE

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(decrementCount());

store.dispatch(setCount({ count: 100 }));
store.dispatch(resetCount());

// MORE CODE
```

* And make something more complex something we only need to do one time

```
// MORE CODE

// action generators - functions that return action objects
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy,
});

const setCount = ({ count }) => ({
  type: 'SET',
  count,
});

const resetCount = () => ({
  type: 'RESET',
});

// MORE CODE
```

* Previously we had to define those objects over and over again and now we just do it one time allowing us to make simple function calls to something like `store.dispatch(resetCount())` throughout our program
  - Later on we'll break out these Action Generators will be broken out into their own files
  - But we just wanted to show everything that makes up a successful Redux application in one file

## finished file
`redux-101.js`

```
import { createStore } from 'redux';

// action generators - functions that return action objects
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy,
});

const setCount = ({ count }) => ({
  type: 'SET',
  count,
});

const resetCount = () => ({
  type: 'RESET',
});

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        count: state.count + action.incrementBy,
      };
    }
    case 'DECREMENT': {
      return {
        count: state.count - action.decrementBy,
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

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(decrementCount());

store.dispatch(setCount({ count: 100 }));
store.dispatch(resetCount());
```

## Next
* Now we have a simple Redux example
* Now we'll build out the actual Redux functions and actions that are going to make up our application


