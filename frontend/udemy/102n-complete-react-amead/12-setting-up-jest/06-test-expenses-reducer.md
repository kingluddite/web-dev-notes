# Test expensesReducer
`tests/reducers/expenses.js`

```
import expensesReducer from '../../reducers/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, {
    type: '@@INIT',
  });
  expect(state).toEqual([]);
});
```

* Should pass test (22 passing)

## expenses array
* We'll use this in multiple places so best just to create a separate file and import it when we need to use it (DRY)
* Create separate folder `/tests/fixtures`
    - **fixtures** are just baseline test data (fixture/test data/dummy data ----> all mean the same thing)

`/tests/fixtures/expenses.js`

```js
import moment from 'moment';

export default [
  {
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0,
  },
  {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: moment(0)
      .subtract(4, 'days')
      .valueOf(),
  },
  {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 4500,
    createdAt: moment(0)
      .add(4, 'days')
      .valueOf(),
  },
];
```

* Remove from selectors file and import it

```
import moment from 'moment';
import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

test('should filter by text value', () => {
// MORE CODE
```

## Also import expenses to 
```js
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, {
    type: '@@INIT',
  });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1',
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
```

* Should pass 24 tests

## Challenge
* should add an expense
* should edit an expense
* should not edit expense if expense not found

```js
// MORE CODE
test('should add an expense', () => {
  const expense = {
    id: '123',
    description: 'Bike',
    note: '',
    createdAt: 20000,
    amount: 30120,
  };

  const action = {
    type: 'ADD_EXPENSE',
    expense,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense', () => {
  const amount = 22000;
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

test('should not edit an expense if expense not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
```

* 27 passing tests
