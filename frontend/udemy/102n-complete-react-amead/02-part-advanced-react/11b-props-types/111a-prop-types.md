# Prop Types
* As your app grows, you can catch a lot of bugs with typechecking
* For some applications, you can use JavaScript extensions like `Flow` or `TypeScript` to typecheck your whole application
* But even if you don’t use those, React has some built-in typechecking abilities
* To run typechecking on the props for a component you can use PropTypes
* This doesn't have to do with CSS or styles
* static, defaultProps & propTypes help when troubleshooting

## Look at the naming conventions used here
* `PropTypes`, `prop-types` and `propTypes`
* They are each used when defining prop types so take care not to misspell them

## Why use prop types?
1. Prop Types help make your code bullet proof
2. They save you time
3. You should always **use them in every react project**

## Install Prop types
`$ npm i prop-types`

### Using prop types
1. import them

`import PropTypes from 'prop-types`

2. We write prop types differently when they are SFC or CBC
  * Let's deal with SFC prop types

`AddExpensePage.js`

* Before prop types

```
import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
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

* After prop types

```
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

const AddExpensePage = ({ dispatch, history }) => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={expenseFormObject => {
        dispatch(addExpense(expenseFormObject));
        history.push('/');
      }}
    />
  </div>
);

AddExpensePage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

export default connect()(AddExpensePage);
```

`EditExpensePage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

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

* Remove an unnecessary import

`ExpenseDashboard.js`

```
import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
```

`ExpenseList.js`

```
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseListItem from './ExpenseListItem';
import selectedExpenses from '../selectors/expenses';

const ExpenseList = ({ expenses }) => (
  <div>
    <h1>Expense List</h1>
    {expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)}
  </div>
);

ExpenseList.propTypes = {
  expenses: PropTypes.array,
};

const mapStateToProps = state => ({
  expenses: selectedExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(ExpenseList);
```

`ExpenseListItem.js`

```
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>Desc: {description}</h3>
    </Link>

    <p>Amount: {amount} </p>
    <p>Created:{createdAt}</p>
  </div>
);

ExpenseListItem.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
  amount: PropTypes.number,
  createdAt: PropTypes.number,
};

export default ExpenseListItem;
```

