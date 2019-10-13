# Organizing Redux
* Time to refactor some things in our app

## Problems with current app and Redux
* We have one really, really, really big file
* It's not part of our webpack build (it's just sitting in playground folder)

## New folders in src
* `actions`
* `reducers`
* `store`
* `selectors`
  - We will put things in here that actually query the Redux store
    + We'll put getVisibleExpenses in selectors

### scales well
* We add these folder to organize our app better
* So that it scales better
* Easier to maintain and update

## Step 1: Pull our our Action Generators
* We'll copy from redux-expensify.js (just to keep original) and paste into `src/actions/expenses.js`

`src/actions/expenses.js`

* We need to import uuid module
* We need to make all variables named exports so we can use them in other files

```
import uuid from 'uuid';

// ADD_EXPENSE
export const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0,
}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});
```

## Do same for filters Action Generators
`src/actions/filters.js`

```
// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});

// SORT_BY_DATE
export const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

// SORT_BY_AMOUNT
export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

// SET_START_DATE
export const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate,
});

// SET_END_DATE
export const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate,
});
```

## Now set up Reducers
* src/reducers/expenses.js
* src/reducers/filters.js

`src/reducers/expenses.js`

```
// Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // return state.concat(action.expense);
      return [...state, action.expense];
    case 'REMOVE_EXPENSE': {
      return state.filter(({ id }) => id !== action.id);
    }
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        }
        return expense;
      });
    default:
      return state;
  }
};

export default expensesReducer;
```

`src/reducers/filters.js`

```
export const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};

export const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      };
    case 'SET_START_DATE': {
      return {
        ...state,
        startDate: action.startDate,
      };
    }
    case 'SET_END_DATE': {
      return {
        ...state,
        endDate: action.endDate,
      };
    }
    default:
      return state;
  }
};
```

## Wait a minute!
* Since we only want one thing from this file we can set it as the default export instead of 2 named exports

```
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      };
    case 'SET_START_DATE': {
      return {
        ...state,
        startDate: action.startDate,
      };
    }
    case 'SET_END_DATE': {
      return {
        ...state,
        endDate: action.endDate,
      };
    }
    default:
      return state;
  }
};

export default filtersReducer;
```

* You will probably see this syntax used for the default export

```
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      };
    case 'SET_START_DATE': {
      return {
        ...state,
        startDate: action.startDate,
      };
    }
    case 'SET_END_DATE': {
      return {
        ...state,
        endDate: action.endDate,
      };
    }
    default:
      return state;
  }
};
```

## Add selectors
`src/selectors/expenses.js`

```
// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) =>
  expenses
    .filter(expense => {
      // console.log(expense.createdAt >= startDate);
      const startDateMatch =
        typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
      return 1;
    });

export default getVisibleExpenses;
```

## Now we need to set up our store
* We will configue it inside `src/store/configureStore.js`

`src/store/configureStore.js`

```
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);
```

* But we need dependencies

```
import { createStore, combineReducers } from 'redux';

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);
```

* And we need to import our Reducers (**note** we set up as default exports)
* And add a default export

```
import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

export default store;
```

### Change how this file will be called
* We'll add a default export that is a function and inside that function we'll define our store and return it
* For the moment that function won't take any arguments

```
import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
    })
  );

  return store;
};
```

* Now when we import this function, the default export from `configureStore`, we just call it and we get the store back
* Then we can use it

## How to we use configureStore.js?
* We need to make sure we run webpack correctly
* We'll point `entry` in `webpack.config.js` to `./src/app.js`

`webpack.config.js`

```
// MORE CODE

const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {

// MORE CODE
```

* Make sure to **restart** webpack dev server

## Now we are running our real app again!
* View in UI and now we'll see our React components again!! Yay!

### Now it's time to start pulling everything together
* We'll do this by importing stuff into `app.js`
* This is where we'll connect React and Redux
  - We'll import configureStore (our Redux store)
  - Here's how we call and create our store

### We'll create a new store
* And we'll make sure all our imports and exports were set up correctly

```
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink,
} from 'react-router-dom';
import 'normalize.css/normalize.css';
import configureStore from './store/configureStore'; // Redux store
import AppRouter from './routers/AppRouter';
import './styles/styles.scss';

const store = configureStore();

ReactDOM.render(<AppRouter />, document.getElementById('root'));
```

* Now we have access to the stuff we used before:
  - `store.dispatch()`
  - `store.getState()`
  - `store.subscribe()`

### Let's test it out
* Log out a call to `store.getState()`

`app.js`

```
// MORE CODE

const store = configureStore();

console.log(store.getState());

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// MORE CODE
```

* View the console and you'll see our default Redux state is working!
* We have the exact same setup we had in playground

## Now we need to text actions and selector
* To see if they are working too

### Challenge
* Create 2 expenses named `Water bill` and `Gas bill`
* Call setTextFilter and pass 'bill' and it should return 2 expenses
* Change it to `water` and it should return 1 expense
* call getVisibleExpenses and it will print visible expenses to UI

#### Challenge Solution
```
// MORE CODE

import configureStore from './store/configureStore'; // Redux store
import { addExpense } from './actions/expenses'; // ADD!
import { setTextFilter } from './actions/filters'; // ADD!
import getVisibleExpenses from './selectors/expenses'; // ADD!

// MORE CODE

const store = configureStore();

// console.log(store.getState());

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: 'Water Bill', amount: 1500, createdAt: -21000 })
);
const expenseTwo = store.dispatch(
  addExpense({
    description: 'Gas Bill',
    amount: 2000,
    createdAt: -1000,
  })
);

store.dispatch(setTextFilter('water'));

ReactDOM.render(<AppRouter />, document.getElementById('root'));
```

* Output should look like:

![challenge solution](https://i.imgur.com/AVV17Rc.png)
