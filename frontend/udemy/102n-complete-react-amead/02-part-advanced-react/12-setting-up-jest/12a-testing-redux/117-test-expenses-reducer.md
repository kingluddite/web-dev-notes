# Test expensesReducer
* One last reducer to test (expenses) before we move on to testing React components

## Expenses reducer
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

* This enables us to add expenses, remove expenses and edit expenses

## Create new test file for our expenses reducer
`src/tests/reducers/expenses.test.js`

### Import the expenses reducer we will be testing
```
import expensesReducer from '../../reducers/expenses';

```

### Now let's start adding our test cases
* Make sure the default state gets set to an empty array

### test default state is set
```
import expensesReducer from '../../reducers/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

```

* The above test suite we didn't need to pass any data into the first argument (state) as we wanted to pass in `undefined`

## But rest of tests (challenge) will be different
* We will need to add test data we can work with (we'll need data we can pass in as that first argument, and then we'll make sure things change - this is very similar to what we did with the selectors test file)

`src/tests/selectors/expenses.test.js`

```
import moment from 'moment';
import getVisibleExpenses from '../../selectors/expenses';

const expenses = [
  {
    id: '1',
    description: 'Gas',
    note: '',
    amount: 900,
    createdAt: 0,
  },
  {
    id: '2',
    description: 'Dry Cleaning',
    note: '',
    amount: 500,
    createdAt: moment(0)
      .subtract(4, 'days')
      .valueOf(),
  },
  {
    id: '3',
    description: 'Rent',
    note: '',
    amount: 30000,
    createdAt: moment(0)
      .add(4, 'days')
      .valueOf(),
  },
];

// MORE CODE
```

* Above we added baseline test data that all of our test cases could work off of
  - We passed that expenses object in as the first argument to selectExpenses() and then we made assertions about what came back
  - We will be doing the exact same thing for the reducer
  - We could take our expenses data and copy over to our expenses reducer but that would not be DRY
    + A more DRY approach would be to create a separate file where the expenses array lives and then just have both test files import this array so the can both use them

## fixtures directory
* Inside our tests folder we'll create a new folder called `fixtures`
  - In the test world a **fixture** is just your baseline test data
    + Think of a fixture as "dummy data", "test data", a "fixture" - they all mean the same thing

![our fixtures directory](https://i.imgur.com/JvoBSkH.png)

### Making our seed data work with a little refactoring
* We'll need to update 3 files like this:

`src/tests/selectors/expenses.test.js`

* We cut out the expenses array and put it in its own file and import that file at the top of this file

```
import moment from 'moment';
import getVisibleExpenses from '../../selectors/expenses';
import { expenses } from '../fixtures/expenses';

test('should filter by text value', () => {

// MORE CODE
```

### Now we'll show our expenses array in its own file
* Make sure to export it so we can use it in other files
* Don't forget to import moment

`src/tests/fixtures/expenses.js`

```
import moment from 'moment';

export const expenses = [
  {
    id: '1',
    description: 'Gas',
    note: '',
    amount: 900,
    createdAt: 0,
  },
  {
    id: '2',
    description: 'Dry Cleaning',
    note: '',
    amount: 500,
    createdAt: moment(0)
      .subtract(4, 'days')
      .valueOf(),
  },
  {
    id: '3',
    description: 'Rent',
    note: '',
    amount: 30000,
    createdAt: moment(0)
      .add(4, 'days')
      .valueOf(),
  },
];

```

* And now the test file we are working on for expenses reducers

`src/tests/reducers/expenses.test.js`

```
import expensesReducer from '../../reducers/expenses';
import { expenses } from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

```

## Now we are ready to begin testing
* We'll create 2 test cases and leave 3 for a challenge

### REMOVE_EXPENSE
* We'll create 2 test cases
  - One where we enter a valid `id` and make sure it is removed
  - One where we try to remove an `id` that doesn't exist and we'll make sure that the ones that are in the array don't get removed

```
// MORE CODE
test('should remove an expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[0].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses[1], expenses[2]);
});

test('should not remove an expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '9',
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
```

## 3 challenge test cases
* should add an expense
* should edit an expense
* should not edit an expense if expense not found

```
// MORE CODE
test('should add an expense', () => {
  const expense = {
    id: '4',
    description: 'gas bill',
    note: '',
    amount: 2000,
    createdAt: 0,
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense,
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense', () => {
  const amount = 50123;
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      amount,
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state[1].amount).toBe(amount);
});

test('should not edit an expense if id not found', () => {
  const amount = 50123;
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      amount,
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
```

* The last one says if the `id` isn't found assert that the state will equal the original expenses object (since nothing changed)

## We've tested every part of our application except for the components
* We've tested:
  - action generators
  - reducers
  - selectors
  - Now we'll test the components
    + They will be tricky to test
