# EditExpenses Test
* We will edite and refactor EditExpensePage

## Let's fix a piece of code
* In last code (124-test-add-expense.md) we did this:

```
// MORE CODE

const mapDispatchToProps = dispatch => ({
  onSubmit: expense => dispatch(addExpense(expense)),
});

// MORE CODE
```

* Instead of naming it `onSubmit` but we should have set it equal to the name of the action generator `addExpense`

```
// MORE CODE

const mapDispatchToProps = dispatch => ({
  addExpense: expense => dispatch(addExpense(expense)),
});

// MORE CODE
```

## Here is the complete file:
`AddExpensePage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.addExpense(expense);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addExpense: expense => dispatch(addExpense(expense)),
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
```

## Now we need to update our tests
* So that means we need to up our code here too:

```
// MORE CODE

export class AddExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.addExpense(expense); // UPDATE THIS LINE!
    this.props.history.push('/');
  };

// MORE CODE
```

* And we need to update our test cases as well with this new name

`AddExpensePage.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import { expenses } from '../fixtures/expenses';

let addExpense, history, wrapper;

beforeEach(() => {
  addExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <AddExpensePage addExpense={addExpense} history={history} />
  );
});

test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(addExpense).toHaveBeenLastCalledWith(expenses[0]);
});
```

* Refactor EditExpensePage
* Add test file with few test cases

## Challenge
`EditExpensePage.js`

* Read the comments to complete the challenge

```
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

// 1. Refactor EditExpensePage to be a class based component
// This will allow us to pull out the inline functions to methods (so we don't have to redefine them every single time the component gets rendered)

// 2. Setup mapDispatchToProps (previously we just set up one thing but now you need to set up two)
// editExpense and removeExpense (so create 2 things on that object editExpense and removeExpense)
  // then just pass the data through
  // this will make it easy to extract away the reference to the global so we can use spies in our tests

// 3. Start up the app in development to make sure the app still works

// Part 2: Actually write the test cases
// there will be 3 test cases total:
// 1. should render EditExpensePage (easy ---> just a snapshot)
// 2. should handle EditExpense
   // need to use spies (we'll be passing in spies, triggering things and making sure the spies actually got called)
// 3. should handle removeExpense (using spies just like in #2)
// 4. refactor to use beforeEach()
  // set up a component with the spies a single time and then you can use them throughout all 3 files
const EditExpensePage = ({ expense, dispatch, history }) => (
  <div>
    <ExpenseForm
      expense={expense}
      onSubmit={expenseFormObject => {
        dispatch(editExpense(expense.id, expenseFormObject));
        history.push('/');
      }}
    />
    <button
      onClick={() => {
        dispatch(removeExpense({ id: expense.id }));
        history.push('/');
      }}
    >
      Remove
    </button>
  </div>
);

EditExpensePage.propTypes = {
  expense: PropTypes.object,
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});

export default connect(mapStateToProps)(EditExpensePage);
```

## TODO - Review this code more thoroughly
`ExpenseListPage.js` refactored to be an unconnected CBC

```
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  onRemove = () => {
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };

  render() {
    // const { expense, dispatch, history } = this.props;
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  }
}

EditExpensePage.propTypes = {
  expense: PropTypes.object,
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: data => dispatch(removeExpense(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
```

## And the test
`EditExpensePage.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import { expenses } from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

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

// should render EditExpensePage
// snapshot
test('should render EditExpensePage correct', () => {
  expect(wrapper).toMatchSnapshot();
});
// should handle editExpense
// spies

test('should handle EditExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});
// should handle removeExpense
// spies
test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith({
    id: expenses[2].id,
  });
});
```

* All tests pass

```
import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter;
let sortByDate;
let sortByAmount;
let setStartDate;
let setEndDate;
let wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters,
  });
  expect(wrapper).toMatchSnapshot();
});
```

* View the snapshots and you will see 1 with no dates and one with start and end dates






