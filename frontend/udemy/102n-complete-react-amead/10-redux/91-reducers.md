# Reducers
* This function is called a **reducer**
* Reducers specify how the application's `state` changes in response to `actions` sent to the **store**
* `actions` only describe the fact that something happened
* but `actions` don't describe how the application's `state` changes
![reducer](https://i.imgur.com/itgJLbD.png)

* [documentation](https://redux.js.org/docs/basics/Reducers.html)

`redux-101.js`

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

// reducers
const countReducer = (state = { count: 0 }, action) => {
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
};

const store = createStore(countReducer);
// // MORE CODE
```

* Same functionality as before
* But now we have a separate reducer
* Real world apps have multiple reducers

## What are reducers?
* They are `pure functions`
    - What is pure function?
        + The output is only determined by the input
        + So the `countReducer` function's output is only determined by what is passed into it (the state and action, it doesn't use anything else from outside the scope and it doesn't change anything outside of the function scope either)

## What is an example of a function that is NOT a pure function?
```js
let a = 10;
const add = (b) => {
    return a + b;
}
```

* The reason is the function also depends on that global variable which can change
* Our reducers need to compute the new state based on the old state and the action

```js
const add = (a, b) => {
    return a + b;
}
```

* Now above is a pure function

## NEVER CHANGE STATE OR ACTION
* Don't reassign state or action
* Don't mutate state or action

### Update webpack.config.js
`entry: './src/playground/redux-expensify.js',

`redux-expensify.js`

```
import { createStore, combineReducers } from 'redux';
```

* combineReducers
    - will enable us to create multiple functions and define how our redux app changes
    - our apps will have many reducers
    - combineReducers let's us keep the files small and then combines them
    - **tip** sticking with cents helps reduce rounding errors or computational errors that require you to get rid of extra decimal points

```js
import { createStore, combineReducers } from 'redux';

const demoState = {
  expenses: [
    {
      id: 'sdiaslowlike',
      description: 'January Rent',
      note: 'This was the final payment for that address',
      amount: 54500,
      createdAt: 0,
    },
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined,
  },
};
```

### Houston we have a problem
* Handling the following actions with one reducers would be problematic and the file would grow to be very long
    - ADD_EXPENSE
    - REMOVE_EXPENSE
    - EDIT_EXPENSE
    - SET_TEXT_FILTER
    - SORT_BY_DATE
    - SORT_BY_AMOUNT
    - SET_START_DATE
    - SET_END_DATE
* combineReducers will help us break all this up into multiple reducers that make common sense
* We are going to create one array for expenses that pretends filters object doens't exist
* We are also going to create the filter object as if the expenses array didn't exist
* Then we'll take both reducers and combine them together to create the complete store

```js
import { createStore, combineReducers } from 'redux';

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Store creation

const store = createStore(expensesReducer);
// // MORE CODE
```

* It is not reactive, will just fire once
* The default state for our store is an empty array and that is what we see in the console when we run this file through webpack
* Our reducer is working
    - But not doing what we want yet
    - We want our array to live off the expenses property

## How can we set that up?
* We will do this using `combineReducers`

```js
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
  })
);
```

* Now we have an object with a property of `expenses` and the value of expenses is the array

## The filters reducer
* Will be responsible for managing all of this:

```js
filters: {
  text: 'rent',
  sortBy: 'amount', // date or amount
  startDate: undefined,
  endDate: undefined,
},
```

## Challenge
* Create the filters reducer

```js
import { createStore, combineReducers } from 'redux';

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);
```

* Output is:

![combineReducers](https://i.imgur.com/cn0a98o.png)

