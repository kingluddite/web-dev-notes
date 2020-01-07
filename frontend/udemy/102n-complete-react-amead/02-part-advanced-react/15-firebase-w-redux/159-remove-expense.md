# Remove Expense

## Challenge
* Wireup the ability to remove expenses from Firebase
* Currently our remove button just dispatches `actions/expenses.js`
  - But if we refresh the page the data will still show up
  - You will need to create an asynchronous action, one that actually wipes the data from Firebase then it will dispatch our `removeExpense` action seen below:

`actions/expenses.js`

```
// MORE CODE

export const removeExpense = ( { id } = {} ) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// MORE CODE
```

* Similar how we created `startSetExpenses` for `setExpenses` and `startAddExpense` for `addExpense`
* At then end of this challenge, you should be able to click the remove button and the expense is deleted from the Database, the screen and when you refresh the browser it is gone forever

### Some more guidance on Expense Removal Challenge
1. Create startRemoveExpense (same call signature as removeExpense it just needs the `id`)
2. Test startRemoveExpense with `should remove expenses from Firebase`
  * In order to verify that the expense was removed from Firebase you can just try to fetch it and call `.val()` on the snapshot and if there is no data there it will just have `null` as the return value for that
  * Use an assertion and check if it is `null`
3. Use `startRemoveExpense` in `EditExpensePage` instead of removeExpense
  * We'll make changes inside the EditExpensePage (that's where we were using `removeExpense`) and we'll switch that over to `startRemoveExpense`
4. Adjust EditExpensePage tests
  * And since we adjust the name in our Component we'll need to also update the name in our test
5. Test your work, make sure the test cases pass
6. Commit to GH and Heroku (deploy)
7. Check out the app both locally and production

* `removeExpense` removes expense from the redux store
* But refreshing the page means that the data returns and still exists in firebase
* We need to create an async action
    1. One that wipes the data from firebase
    2. Then dispatches `removeExpense`
* This is similar to what we did with:
    -  startSetExpenses for setExpenses
    -  startAddExpense for addExpense
*  We will do the same thing for `removeExpense`
    -  When you click the button, the button gets wiped from Firebase

## Solution
`src/actions/expenses.js`

* We are calling the Database so this will be an asynchronous action
* We need to export it as a named export
* It will have the same call structure where it has a destructured `id`
  - We can add a default so we set it to an empty object (with or without this will work)
* Now we need to add our arrow function and it will need the body of the function
  - We return a function and this function will be doing the async work (it will communicate to FB then it will dispatch an async action to actually change the Redux store)
  -  We take `dispatch` which gets passed to this function by the Redux Library
  -  Now at this point we do what we came here to do - remove an expense
    +  We connect to FB and point to the specific record we want to delete and use the FB `.remove()` (we could have also used `.set()`)
    +  We need to return this Promise and chain on a `then()`
      *  And once the expense is remove we dispatch() `removeExpense` from up above

```
// MORE CODE

/*eslint-disable */
export const startRemoveExpense = ({ id } = {}) => {
  return dispatch => {
    return database
      .ref(`expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      });
  };
};
/* eslint-enable */

// MORE CODE
```

* Here is the same code but in shorthand with implicit returns

```
export const startRemoveExpense = ({ id } = {}) =>
  dispatch =>
    
    database
      .ref(`expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      });
```

## Now we test it
* Place this right below the other `removeExpense` test
* We know it is async so we add `done`
* We are using the mock store
* We can grab any expense, we'll grab the last one `expenses[2]`
* We store the `id` in a variable so we don't have to keep retying it
* Then we dispatch startRemoveExpense and we pass it the `id`

```
// MORE CODE

test('should remove expense from firebase', done => {
  const store = createMockStore({});
  const { id } = expenses[2];
  store.dispatch(startRemoveExpense({id}));
});

// MORE CODE
```

* Now we need to test that our method does what we expect it to do
* We need to attach then to make sure we give it the time it needs to talk to the Database

```
// MORE CODE

test('should remove expense from firebase', done => {
  const store = createMockStore({});
  const { id } = expenses[2];
  store.dispatch(startRemoveExpense({id})).then(() => {
    //
  });
});

// MORE CODE
```

* And when it is complete we make all our assertions
* I need to grab all of the actions

```
// MORE CODE

test('should remove expense from firebase', done => {
  const store = createMockStore({});
  const { id } = expenses[2];
  store.dispatch(startRemoveExpense({id})).then(() => {
    const actions = store.getActions();
  });
});

// MORE CODE
```

* We check for the object to have a type and an id

```
// MORE CODE

test('should remove expense from firebase', done => {
  const store = createMockStore({});
  const { id } = expenses[2];
  store.dispatch(startRemoveExpense({id})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id,
    });
  });
});

// MORE CODE
```

* Now we need to return the Promise here so we can chain it on

```
// MORE CODE

test('should remove expense from firebase', done => {
  const store = createMockStore({});
  const { id } = expenses[2];
  store
    .dispatch(startRemoveExpense({id}))
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

// MORE CODE
```

## Use `startRemoveExpense` in `EditExpensePage` instead of `removeExpense`

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

