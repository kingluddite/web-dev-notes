# Remove Expense
## Challenge
* Remove expenses from Firebase

### Currently
* Our remove button just dispatches `actions/expenses.js`

```
// MORE CODE

export const removeExpense = ( { id } = {} ) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// MORE CODE
```

* `removeExpense` removes expense from the redux store
* But refreshing the page means that the data returns and still exists in firebase
* We need to create an async action
    1. One that wipes the data from firebase
    2. Then dispatches removeExpense
* This is similar to what we did with:
    -  startSetExpenses for setExpenses
    -  startAddExpense for addExpense
*  We will do the same thing for `removeExpense`
    -  When you click the button, the button gets wiped from Firebase

### Challenge instructions
1. Create `startRemoveExpense` (same call signature as `removeExpense`)
    * Just needs the `id`
2. Test `startRemoveExpense` with "should remove expenses from firebase"
    * In order to verify that the expense was removed from firebase
        - Just try and fetch it and call `val()` on a `snapshot` and if there is no data there it will just be `null` from the return value
        - Use an assertion to check if it is `null`
3. Use `startRemoveExpense` in `EditExpensePage` instead of `removeExpense`
4. Adjust `EditExpensePage` tests
5. Test locally and in production

`src/actions/expenses.js`

```js
export const startRemoveExpense = ({ id } = {}) =>
  // this is an async action
  // so we are returning a function
  // dispatch gets patched to this function by the redux library
  dispatch =>
    // this function will do async work (communicate with firebase)
    // then it will dispatch to actually change the redux store
    // ##
    // now we remove the expense
    // we return it so we can use then
    database
      .ref(`expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      });
```

```js
test('should remove expense from firebase', done => {
  const store = mockStore({});
  const { id } = expenses[2];

  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id,
      });
      return database.ref(`expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});
```

* Use `startRemoveExpense in EditExpensePage instead of removeExpense

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {

// MORE CODE

  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };

// MORE CODE

}

const mapDispatchToProps = dispatch => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  startRemoveExpense: data => dispatch(startRemoveExpense(data)),
});
// MORE CODE
```

`EditExpensePage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  startRemoveExpense: data => dispatch(startRemoveExpense(data)),
});

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
```

* We swapped all occurrences of `removeExpense` with `startRemoveExpense`

## Fix test case
* We just broke our test case

![broken test case](https://i.imgur.com/LKRbN67.png)

```
import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';

let editExpense;
let startRemoveExpense;
let history;
let wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense}
      startRemoveExpense={startRemoveExpense}
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
  expect(startRemoveExpense).toHaveBeenLastCalledWith({
    id: expenses[2].id,
  });
});
```

* All 65 tests are passing

## Take it for a test spin
* If you can delete an expense and you refresh the page and the expense is still gone, it is working
* Stop test suite
* Start server `$ yarn run dev-server`
* Check and you'll see that firebase shows the expenses were removed too

# Git stuff
```
$ gs
$ gc -am 'add remove async firebase and test fix'
$ gpush
$ gph
```

## Next - Edit expenses on Firebase

