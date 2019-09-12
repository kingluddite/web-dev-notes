



 
            * getVisibleExpenses()
        + So now components can read off store so they can fetch value from the store and render those
        + They can also dispatch actions to the store
        + Will refer to things that query things from the redux store
        + expenses
        + filters
        + redux store is configured here
    - Components that are connected to the Redux store
    - actions
    - reducers
    - selectors
    - store
# Organizing Redux
## Let's refactor our code
* Create these folders inside `src`
* Let's connect React and Redux together
* Open both `expenses.js` and `redux-expensify.js` side-by-side
* This will enable us to create **connected components**

## We will store the action generators for expenses
* Copy them from `redux-expensify.js` and paste into `expenses.js`

`actions/expenses.js`

```js
// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 123,
} = {}) => ({
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
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});
```

### Add the depenencies this file needs
    - uuid

`expenses.js`

```js
import uuid from 'uuid';

// ADD_EXPENSE
// // MORE CODE
```

### Set up exports
* We will set them all up as **named exports**

`expenses.js`

```js
import uuid from 'uuid';

// ADD_EXPENSE
export const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 123,
} = {}) => ({
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

## Now let's tackle filters.js
`src/actions/filters.js`

* Will store the action generators for our filters
* Do what we did for `actions.js` to `filters.js`

```js
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

* No dependencies needed
* Just exports

## Now let's work on the reducers
`src/reducers/expenses.js`

```js
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

export default expensesReducer;
```

* We only need one thing from this file so we use a default export
* But you may see it more often coded like this (remove the variable)

```js
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};
```

### Now the filters reducers
* Do the same thing for `src/reducers/filters.js`

```js
// Filters Reducer

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
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate,
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};
```

## Now we'll work on expenses.js
`selectors/expenses.js`

```js
export default (
  expenses,
  { text, sortBy, startDate, endDate }
) => {
  return expenses
    .filter(expense => {
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
      } else if (sortBy == 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};
```

* No depenencies
    - All built-in JavaScript objects
    - Not using React (no jsx)
    - Only one thing we need so we use the default export

## Now we work on the store directory
* Here we pull everything together

`store/configureStore.js`

```js
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

* We put our store inside a function
* This means when we import our function the default export from `configureStore`, we just call it, we get the store back and then we can use it

**note** configureStore is not ready for us to use

* We need to configure webpack correctly

`webpack.config.js`

```
// MORE CODE
module.exports = {
  entry: './src/app.js',
// MORE CODE
```

* Shut down webpack file and restart webpack server
* Now our browser should show our Expensify components we haven't seen in a while

## Now we'll create a new store to make sure all imports and exports were set up correctly

`app.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

console.log(store.getState());

ReactDOM.render(<AppRouter />, document.getElementById('app'));
```

* If you see the default expense setup you know that the actions, reducers, filters and selectors have all been set up correctly
* We have the exact same setup we had previously

## Let's grab actions and selectors to make sure they are working as well
### Challenge
* Add an expense - water bill
* Add an expense - gas bill
* setTextFilter - bill
* getVisibleExpenses - print to screen

`app.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

// console.log(addExpense);
store.dispatch(addExpense({ description: 'Water bill' }));
store.dispatch(addExpense({ description: 'Gas bill' }));
store.dispatch(setTextFilter('water'));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

console.log(store.getState());

ReactDOM.render(<AppRouter />, document.getElementById('app'));
```

* You can filter by water or bill or whatever and it will sort based on that

## Next - Connect react and redux
