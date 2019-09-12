# EditExpenses Test
* Refactor EditExpensePage
* Add test file with few test cases

## Challenge
Part 1
* Refactor EditExpensePage to be a class based component
    - This will allow us to pull out the inline functions to methods so we don't have to redefine them every single time a component gets rendered
* Setup mapDispatchToProps
    - previously we just set up 1
    - This time you need to set up 2
    - We have editExpense and removeExpense
    - Makes it easier to use spies in our test
    - Test the app in dev mode to make sure the component still works

## Part 2 - Testing
* There will be 3 test cases total
* `should render EditExpensePage`
    - use snapshot to test that
* `should handle editExpense`
    - use spies
    - triggering things and making sure the spies got called

* `should handle removeExpense`
    - use spies
    - triggering things and making sure the spies got called

```
import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';

let editExpense;
let removeExpense;
let history;
let wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense}
      removeExpense={removeExpense}
      history={history}
      expense={expenses[2]}
    />
  );
});

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});
test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith({
    id: expenses[2].id,
  });
});
```

* 48 passed tests
