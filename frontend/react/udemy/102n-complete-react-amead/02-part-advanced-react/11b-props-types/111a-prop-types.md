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

# Defining PropTypes inside a React class
* Eslint might give you an warning like: "react/prop-types children; is missing in props validation"
* You need to add PropTypes

`ExpenseForm.js`

```
// MORE CODE

import PropTypes from 'prop-types';

// MORE CODE


export default class ExpenseForm extends Component {
  static propTypes = {
    onDescriptionChange: PropTypes.func,
    onNotesChange: PropTypes.func,
    onAmountChange: PropTypes.func,
    onDateChange: PropTypes.func,
    onFocusChange: PropTypes.func,
    onSubmit: PropTypes.func,
  };

// MORE CODE
```

`ExpenseListFilters.js`

* **note** The first line below turns off undef warning from eslint

```
/* eslint no-undef: 0 */ // --> OFF
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import PropTypes from 'prop-types';
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from '../actions/filters';

export class ExpenseListFilters extends Component {
  state = {
    calendarFocused: null,
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  onTextChange = e => {
    this.props.setTextFilter(e.target.value);
  };

  onSortChange = e => {
    if (e.target.value === 'amount') {
      this.props.sortByAmount();
    } else if (e.target.value === 'date') {
      this.props.sortByDate();
    }
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              className="text-input"
              type="text"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          {/* END .input-group__item */}
          <div className="input-group__item">
            <select
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          {/* END .input-group__item */}
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              startDateId="start"
              endDate={this.props.filters.endDate}
              endDateId="end"
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
          {/* END .input-group__item */}
        </div>
        {/* END .input-group */}
      </div>
      // END .content-container
    );
  }
}

ExpenseListFilters.propTypes = {
  setStartDate: PropTypes.func,
  setEndDate: PropTypes.func,
  setTextFilter: PropTypes.func,
  sortByAmount: PropTypes.func,
  sortByDate: PropTypes.func,
  filters: PropTypes.object,
};

const mapStateToProps = state => ({
  filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
```

`ExpenseForm.js`

```
/* eslint no-undef: 0 */ // --> OFF
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

// the js date way to create a new date
const date = new Date();

// the moment way
const now = moment();

export default class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: '',
    };
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState({
      description,
    });
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState({
      note,
    });
  };

  onAmountChange = e => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({
        amount,
      });
    }
  };

  onDateChange = createdAt => {
    if (createdAt) {
      this.setState({ createdAt });
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState({
        error: 'Please provide description and or an amount',
      });
    } else {
      this.setState({
        error: '',
      });
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount) * 100,
        note: this.state.note,
        createdAt: this.state.createdAt.valueOf(),
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            id="description"
            type="text"
            placeholder="Description"
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            id="amount"
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt} // momentPropTypes.momentObj or null
            onDateChange={this.onDateChange} // PropTypes.func.isRequired
            focused={this.state.calendarFocused} // PropTypes.bool
            onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
            id="expenseDatePicker" // PropTypes.string.isRequired,
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            onChange={this.onNoteChange}
            value={this.state.note}
          />
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  expense: PropTypes.object,
  onSubmit: PropTypes.func,
};
```

`EditExpensePage.js`

```
/* eslint no-undef: 0 */ // --> OFF
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
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
  startEditExpense: PropTypes.func,
  startRemoveExpense: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: data => dispatch(startRemoveExpense(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
```
