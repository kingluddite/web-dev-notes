* We will learn how to use Reduxs' combineReducers to create Redux stores that use multiple Reducers instead of just one big Reducer
* The technique will be exactly the same
* But previously we had a simple Reducer with a simple state so our Reducer didn't grow to be unmanageable
  - This state is more complex

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

* Think of all the actions we'll need to create:

```
// ADD_EXPENSE
// REMOVE_EXPENSE
// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE
```

## Abstract vision of what we want to do with combineReducers
* Setting up all the above Actions with a single Reducer would grow very large and be hard to maintain
* To prevent this from happening we are going to learn how to break up the app into multiple reducers
  - We can use a single Reducer for each root property in our Redux store
  - We have 2 big root properties in our Redux store `expenses` (an array of objects) and `filters` (an object with various properties on it)
* We are going to create 2 Reducers
  - One Reducer to just handle the expenses array as (as if filters didn't even exist)
  - One Reducer to just handle the filters object (as if expenses didn't even exist)
  - Then we'll take those 2 Reducers and then combine them to create the complete store

## Create a Reducer for the expenses array
* **remember**
  - We create a variable for our Reducer
  - We assign our Reducer to an arrow function
  - Make sure to pass our Reducer our `state` and `action`

#
```
import { createStore, combineReducers } from 'redux';

const expensesReducer = (state, action) => {

}
const demoState = {

// MORE CODE
```

## Set up the default state value for expensesReducer
* Think about this for the expenses array of objects what's the default state value?

```
// MORE CODE

  expenses: [
    {
      id: '123456',
      description: 'October Rent',
      note: 'This was late',
      amount: 54500,
      createdAt: 0,
    },
  ],

// MORE CODE
```

* The default state value for expenses should be an empty array

```
// MORE CODE

const expensesReducer = (state = [], action) => {
 
}

// MORE CODE
```

* Now since we'll never have a default expense setting our default state for the expensesReducer to an empty array is perfectly acceptable
  - But look ahead to what we'll have to do with our filters Reducer

```
// MORE CODE

  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined,
  },

// MORE CODE
```

## A better way!
* That will have multiple default values and if we put them all inside as the default for the state for filtersReducers it will be unwieldy and a better way to structure this is to create a variable to hold the default state and plug that in as the default for the state argument

```
// MORE CODE

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
 
}

// MORE CODE
```

## Add a switch statement to our Reducer and just return the state (for starters)
```
// MORE CODE

import { createStore, combineReducers } from 'redux';

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// MORE CODE
```

* Now above is our Reducer set up in its most basic sense

## Time to wire up our Reducer
* We need to create a new store
* For now we'll use `createStore()` like we did before and for the time being we'll just pass the `expensesReducer` directly and ignore `combineReducers`

```
import { createStore, combineReducers } from 'redux';

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(expensesReducer);

// MORE CODE
```

## Let's see what the default state is for expensesReducer
* We'll log it out

```
// MORE CODE

const store = createStore(expensesReducer);
console.log(store);

// MORE CODE
```

* But that will just log the `store`. Instead we just want the `state`

```
// MORE CODE

const store = createStore(expensesReducer);
console.log(store.getState());

// MORE CODE
```

* Make sure to add the parentheses to `getState()`
* When you view the client console you'll see and empty array for our store default state
  - **remember** Since we are not putting `getState()` into `subscribe()` it will only fire a single time
* Having an empty array for the default state of our store is great but is not what we want at the end of the day
  - Instead we want the array to live on the `expenses` property
  - How do we set that up?
    + To do that we just need to modify our call to `createStore()` and we'll also introduce the **combineReducers** method too!

### combineReducers
* **remember** combineReducers lets you combine multiple reducers to create a single store
  - This allows us to break up our app into lots of smaller reducers as opposed to one gigantic out of control Reducer
  - The good news is using it is pretty simple

#### Using createReducers
* As an argument to `createStore()` we call combineReducers as a function `combineReducers`
  - `combineReducers()` also takes an argument and we'll pass it an object
  - On this object we'll provide the key/value pairs
    + The `key` will be the root state name
    + The `value` will the Reducer that's supposed to manage that

# Add the expensesReducer to the store root
```
// MORE CODE

import { createStore, combineReducers } from 'redux';

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);
console.log(store.getState());

// MORE CODE
```

![expensesReducer on store state](https://i.imgur.com/wGeU8qM.png)

* Now we see a significant stage to the default state for our store
* Now the Redux store is an object with property `expenses` and that is where the array lives
  - The array currently has 0 items but that is OK
  - The goal was to get the array moved off of the actual store itself and into a property

## Why is this working like this?
* We took expensesReducer and we passed it directly into createStore
* createStore calls our Reducer and it calls our Reducer right away with no `state` and no `action` 
  - So the end result is the default state getting set
  - And then there was no action type so the switch will by default return the state and our empty array became the Redux store value
  - We're doing the same thing now but instead of putting the array on the root why don't we create an object like this:

```
// MORE CODE

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

// MORE CODE
```

* And put the array on the expenses property
* **important** Doing it this way allows us to create more complex Redux stores

## Lets add a second reducer
```
import { createStore, combineReducers } from 'redux';

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

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

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);
console.log(store.getState());
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

![second reducer added](https://i.imgur.com/PYZa3Md.png)

## Recap
* Previously we passed Reducer functions directly into `createStore()`
  - That allowed us to have one Reducer to main the entire state
  - That gets messy quickly
* Instead we'll use `combineReducers()`
  - We call combineReducers() passing the return value into createStore() and on this object we define what we want our Redux store to look like
    + Intead of just being an array, we now have an object and we have 2 properties `expenses` and `filters` 

```
// MORE CODE

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

// MORE CODE
```

* which is exactly what we saw below in our demo state

```
// MORE CODE
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

* Now after using combineReducers
  - The expenses property is managed by the expensesReducer
  - And the filters property is managed by the filtersReducer

## Next
* We now now how to set up the basic store
* But we don't yet know how to dispatch things like `actions` correctly
  - How do we have expensesReducer respond to a specific action
  - How do we have the filtersReducer responsd to another action
* We'll learn all about that next





