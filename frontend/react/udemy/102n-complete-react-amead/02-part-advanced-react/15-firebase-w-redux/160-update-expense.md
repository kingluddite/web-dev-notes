# Update Expense
## Challenge
1. Create startEditExpense (same call signature as editExpense)
2. Test startEditExpense with "should edit expenses from firebase"
3. Use startEditExpense in EditExpensePage instead of editExpense
4. Adjust EditExpensePage tests

`actions/expenses.js`

```
export const startEditExpense = (id, updates) => dispatch =>
  database
    .ref(`expenses/${id}`)
    .update(updates)
    .then(() => {
      dispatch(editExpense( id, updates ));
    });
```

* Make the test case

`actions/expenses.test.js`

```
// MORE CODE

import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense, add this
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses,
} from '../../actions/expenses';

// MORE CODE
```

```
// MORE CODE

test('should edit expense from firebase', done => {
  const store = mockStore({});
  const { id } = expenses[0];
  const updates = { amount: 21045 };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates,
      });
      return database.ref(`expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val().amount).toBe(updates.amount);
      done();
    });
});

// MORE CODE
```

* Shut down server
* Run test suite `$ npm test -- --watch`
* Tests should pass

## Update EditExpensePage.js
```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

// MORE CODE
}

const mapDispatchToProps = dispatch => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: data => dispatch(startRemoveExpense(data)),
});

// MORE CODE
```

* We swap `editExpense` instances with `startEditExpense`

## Houston we have a problem
* The test case will fail
* Because we are no longer passing in the correct items

### Update EditExpensePage.test.js
```
// MORE CODE

let startEditExpense;
let startRemoveExpense;
let history;
let wrapper;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[2]}
    />
  );
});

// MORE CODE

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startEditExpense).toHaveBeenLastCalledWith(
    expenses[2].id,
    expenses[2]
  );
});

// MORE CODE
```

* We change the editExpense to startEditExpense
* We test and make sure they pass
* We run `$ yarn run dev-server` and make sure we can update expenses and they stay after a refresh (check firebase too)

## Git stuff
``       
```
$ gc -am 'add startEditExpense'
$ gpush
$ gph
$ ho
```
## Next --> Authentication

### Summary
* We took our Firebase and Redux knowledge and combined them using the enhancements from Redux Thunk
