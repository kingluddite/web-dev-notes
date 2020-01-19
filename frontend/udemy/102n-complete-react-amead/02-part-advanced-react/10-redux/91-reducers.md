* We'll move from our increment and decrement example over to the Redux store we'll be using for the expensify app we'll be building
  - We'll focus on getting an array of expenses
  - As well as various filters to filter or sort the data

## Let's talk about this function
* We used it and kind of know how it works
* But we were not given a strict definition of what it is and the properties that it has

`redux-101.js`

```
// MORE CODE

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

// MORE CODE
```

## The above function is called a `Reducer`
* Reducers are one of the core concepts of the Redux documentation

# Reducers
* [docs](https://redux.js.org/basics/reducers)
* We've already discussed:
  - Actions
  - Store
  - Data Flow
* We already know a lot about reducers we just don't associate them with this term
  - Actions describe the fact that something happened but don't specify **how the app's state changes in response**
    + This is the job of reducers!
    + We've already seen this in practice

```
// MORE CODE

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

// MORE CODE
```

* We get our action passed in as an argument but that action alone doesn't do anything
  - It is the reducer that determines what to do based off an action (the switch statement)
    + How do we want to change the state

## Let's better visualize this
* We'll create a variable to hold our reducer
* We'll set it equal to the function we had above
* And then pass our new reducer to the `createStore()` method

```
// MORE CODE

const countReducer = (state = { count: 0 }, action) => {
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
};
const store = createStore(countReducer);

// MORE CODE
```

* We have the exact same functionality we had before but now we have a separate Reducer
  - This is an improvement in design because real world apps will have multiple Reducers

## What are key attributes of Reducers
1. Reducers are pure functions
2. Never change `state` or `action`

### What are pure functions
* The output is only determined by the input
  - In our example above the output is only determined by the things that get passed in (the `state` and the `action`)
  - It doesn't use anything else from outside the function scope
  - It doesn't change anything from outside of the function scope

#### Here is an example of a function that is not a pure function
```
let a = 10;
const add = (b) => {
  return a + b;
} 
```

* The reason it is not a pure function is the output of the function doesn't just depend on the input
  - It also depends on the global variable `let a = 10` which could change
  - We don't want this for our reducers
  - Our reducers need to compute the new state based on the old state and the action

##### We also don't want to change things outside of the function (side effects)
```
let result;
const add = (a, b) => {
  result = a + b;
};
```

* Above is changing something that is outside of our function scope
* `result` was undefined outside our function but them we changed it's value inside our function 

## We never want to change `state` or `action`
* We always pass these inside our Reducer
* We get `state` and `action` passed into all our Reducers. We don't want to directly change these things
  - I don't want to reassign a value to state or action
  - If they are an object I don't want to `mutate` them
  - Instead we should just be reading off of both state and action and return an object that represents the new state
  - **tip** If you do find yourself directly changing state or action, it is best to step back and ask yourself what are you trying to accomplish?
    + In most cases you are just trying to mutate the state in which case I recommend just returning it on the new object instead
    + **Caution** Mutating the state will have undesirable affects which is what we saw previously with `this.setState()`

## That's it
* We have our reducer
 - And it follows these 2 rules
  1. Reducers are pure functions
  2. Reducers never change state or action

## Let's temporarily leave this example
* We'll create a new file in playground folder

`src/playground/redux-expensify.js`

```
console.log('redux-expensify.js');
```

* Update webpack to point to this new file

`webpack.config.js`

```
// MORE CODE

const path = require('path');

module.exports = {
  entry: './src/playground/redux-expensify.js',

// MORE CODE
```

* Stop and restart dev server and you will see `redux-expensify.js` in console

## combineReducers
* We can pull this off of Redux
* We already used `createStore`

`redux-expensify.js`

```
import { createStore, combineReducers } from 'redux';
```

* combineReducers will allow us to create multiple functions that define how our Redux app changes
* In our last example one reducer was fine because we weren't tracking a lot of data (we were just tracking a single number)
* As we create more complex stores we'll have more complex data and having a single Reducer will create a super LONGGGGGGG complex function
  - Instead we'll now learn how to use combineReducers to create multiple smaller functions and combine them together

## Let's create a demoState
* It will have more practical data inside it with complex data
* We will have an amount that won't use decimal numbers like 440.00 but we'll remove the decimal and it will be `44000` that is represented in pennies (sticking with cents reduces any type of rounding errors or computational errors that require you to get rid of extra decimal points)
* We want to have a state that holds expenses
* Our expenses will be in an array of objects
  - Each object with have
    + an `id` (string)
    + a `description` (string)
    + a `note` (string)
    + an `amount` (no decimals)
    + and `createdAt` for now we'll set it to 0
      * We'll add real dates and format them later

* Take a moment to code what an sample object of that demoState will look like

## Here is that demoState
```
import { createStore, combineReducers } from 'redux';

const demoState = {
  expenses: [{
    id: '123456',
    description: 'October Rent',
    note: 'This was late',
    amount: 54500,
    createdAt: 0
  }]
};
```

* We're not just tracking expenses
  - adding, editing and removing them
* We're also tracking various filters that we want the user to apply
  - Allow the users to sort their data:
    + by date
    + amount
    + filter expenses by a date range
    + search for them by a text value

## What properties `filters` property will have
* It will hold an object
  - Have a text property (we'll let users enter a random string)
  - Have a sortBy field ('date' or 'amount')
  - Sort by date range
    + A start date (undefined to start off with)
    + An end date (undefined to start off with) 
      * We'll only show expenses whose date is between start date and end date

#
```
import { createStore, combineReducers } from 'redux';

const demoState = {
  expenses: [
    {
      id: '123456',
      description: 'October Rent',
      note: 'This was late',
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

## Recap
* We learned more about the Reducer (the function we passed into createStore)
  - We learned Reducers need to be:
    + pure functions
    + Can not mutate state or action (It should only be reading off state and action arguments to the Reducer)
    + At the end of the day the Reducer returns the new state and that is how it manipulate the Redux store's state
## Next
* Learn how to use combineReducers
* Will allow us to write reducers for this complex state

