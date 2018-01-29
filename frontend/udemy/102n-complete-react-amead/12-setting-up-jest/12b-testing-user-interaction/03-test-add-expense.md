# Testing AddExpenses
* We need to make our test easier

`AddExpensePage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

const AddExpensePage = props => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={expense => {
        props.dispatch(addExpense(expense));
        props.history.push('/');
      }}
    />
  </div>
);

export default connect()(AddExpensePage);
```

### mapDispatchToProps to the rescue!
* Change our code to look like this:

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

const AddExpensePage = props => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={expense => {
        // props.dispatch(addExpense(expense));
        props.addExpense(expense);
        props.history.push('/');
      }}
    />
  </div>
);

const mapDispatchToProps = dispatch => ({
    addExpense: expense => dispatch(addExpense(expense)),
  });

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
```

* More [info on mapDispatchToProps](https://github.com/reactjs/react-redux/blob/master/docs/api.md)

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

* We convert SFC to a CBC

## Create our test `tests/components/AddExpensePage.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';

test('should render AddExpensePage correctly', () => {
  const addExpense = jest.fn();
  const history = { push: jest.fn() };
  const wrapper = shallow(
    <AddExpensePage addExpense={addExpense} history={history} />
  );
  expect(wrapper).toMatchSnapshot();
});
```

* 44 tests passed

```
import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

test('should render AddExpensePage correctly', () => {
  const addExpense = jest.fn();
  const history = { push: jest.fn() };
  const wrapper = shallow(
    <AddExpensePage addExpense={addExpense} history={history} />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  const addExpense = jest.fn();
  const history = { push: jest.fn() };
  const wrapper = shallow(
    <AddExpensePage addExpense={addExpense} history={history} />
  );
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});
```

* 45 tests passed

## DRY
* If you reuse code
* You can use [global life cycle methods](https://facebook.github.io/jest/docs/en/api.html)
    - afterAll(fn)
    - afterEach(fn)
    - beforeAll(fn)
    - beforeEach(fn)

`AddExpense.test.js`

* We refactor and reuse new global code

```
import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpense;
let history;
let wrapper;

beforeEach(() => {
  addExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
});

test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});
```


