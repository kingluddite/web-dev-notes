# Filter Redux Data
* Create single function that will enable us to filter and sort the expenses data
    - Currently we add 4 expenses, we'll see 4 expense
    - That is because we have 2 separate pieces of data
        + The expenses array
        + And we have the filters object
        + But we are not using the two together to determine what expenses should be shown
            * If we add a text filter or filter by date, we should see the subset of the expenses to match those filters
            * We won't do change redux at all to accomplish this
            * We won't change reducers
            * We won't change action generators
            * We won't be adding new properties onto the redux store
            * Instead
                - After the fact, we'll pass the data into a single function
                - It will filter and sort the data
                - returning the visible expenses

```js
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = new Date().getTime(),
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

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

// SET_START_DATE
const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate,
});

// SET_END_DATE
const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate,
});

// Expenses Reducer

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

// Filters Reducer

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

// Get visible expenses
const getVisibleExpenses = (expenses, filters) => {
  return expenses;
};
// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 100 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: 'Coffee', amount: 300 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
//
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));
//
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter(''));
//
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));
// store.dispatch(setEndDate());

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

* It is showing all and not filtering
* We'll destructure inside getVisibleExpenses()

```js
// // MORE CODE
// timestamps
// 334000, 10, -203 (valid timestamps) milliseconds
// 0 timestamp ---> january 1st 1970 (unix epoch)

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter(expense => {
    const startDateMatch =
      typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch =
      typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = true;

    return startDateMatch && endDateMatch && textMatch;
  });
};
// // MORE CODE
const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 100, createdAt: 1000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 })
);

// MORE CODE
store.dispatch(setStartDate(125));
```

* Now we have filtered out where createdAt is not >= to 125 (only 1 expense)

### why do you use negation if timestamp === number?
* The `startDate` and `endDate` are `undefined` in the beginning
If they aren't a number, we can assume that those dates haven't been set yet so by default startDateMatch and endDateMatch will be true rendering all of the expenses (based on their date)
* If we use this:
    - `store.dispatch(setStartDate(-2000));` (all items show up)
* If we use this:
    - `store.dispatch(setStartDate(2000));` (no items show up)

```js
store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
store.dispatch(setEndDate(1250));
```

* One item will show up because we have 1 match that is between those start and end dates

## Good - We can now sort by date

## Now we'll filter by `text`
* We have `description` and `note` fields with text but we will only search via `description`

```js
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter(expense => {
    const startDateMatch =
      typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch =
      typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description
      .toLowerCase()
      .includes(text.toLowerCase());

    // figure out if expenses.description has the text variable string inside
    // of it
    // hint: includes() - if one string includes another
    // convert both strings to lower case

    return startDateMatch && endDateMatch && textMatch;
  });
};
store.dispatch(setTextFilter('ffe'));
```

* Will give us back the expense with Coffee (we have a case insensitive search because we used `toLowerCase()`)

## Next - Sorting


