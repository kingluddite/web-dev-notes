# Wiring up Edit Expenses
* We need to link to edit expense route
    - /edit/123
* We will add a link on the individual items to that takes us to that individual page

## Challenge
* Make change to ExpenseListItem component that adds the link EditExpensePage passing it the id of that item

```
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeExpense } from '../actions/expenses';

const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      {amount} - {createdAt}
    </p>
    <button
      onClick={() => {
        dispatch(removeExpense({ id }));
      }}>
      Remove
    </button>
  </div>
);

export default connect()(ExpenseListItem);
```

* Click the h3 and it takes us to the edit route passing the item of that item

## EditExpensePage.js
* Connect this component to the redux store
* We have the `id` but we need the entire expense object
    - We'll search the expenses array with an id that matches the id we passed
* This time we do need state so we'll use `mapStateToProps` function and give the component the current expense object
    - We have access to the state in the first argument
    - We have access to the props in the second argument

```js
const mapStateToProps = (state, props) => {

}
export default connect()(EditExpensePage);
```

* We can take some of the current props that were passed into the higher order component (HOC)
    - And we can use them to calculate the props that we want to add on
    - React Router renders our HOC
    - The HOC passes the props through and it also enables us to add on some new ones
    - The array `find()` method
        + Enables us to search through an array looking for a single item
            * We determine if we found the correct item by returning true from the callback

```
import React from 'react';
import { connect } from 'react-redux';

const EditExpensePage = props => {
  console.log(props);
  return (
    <div>
      Editing the expense with <strong>id</strong> of {props.match.params.id}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});
export default connect(mapStateToProps)(EditExpensePage);
```

* View dashboard
* Click item
* View dev tool
* Expand match > expense and you'll see the data for that expense

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = props => {
  console.log(props);
  return (
    <div>
      <ExpenseForm
        onSubmit={expense => {
          console.log('updated', expense);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});
export default connect(mapStateToProps)(EditExpensePage);
```

1. View dashboard
2. Click item
3. We see form but not seeing data populated
    * To do this we take the expense and pass it down

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = props => (
  <div>
    <ExpenseForm
      expense={props.expense}
      onSubmit={expense => {
        console.log('updated', expense);
      }}
    />
  </div>
);

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});
export default connect(mapStateToProps)(EditExpensePage);
```

`ExpenseForm.js`

```
// // MORE CODE
export default class ExpenseForm extends React.Component {
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
// // MORE CODE
```

1. Click on dashboard
2. Click item
3. You will see the edit form prepopulated with expense item data
4. We can change the form data and see it in the console but we need to dispatch it to our redux store

## Challenge
* Dispatch the action to edit the expense
* Redirect to the dashboard page
* You should test and see the item content on the dashboard is now updated

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense } from '../actions/expenses';

const EditExpensePage = props => (
  <div>
    <ExpenseForm
      expense={props.expense}
      onSubmit={expense => {
        props.dispatch(editExpense(props.expense.id, expense));
        props.history.push('/');
      }}
    />
  </div>
);

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});
export default connect(mapStateToProps)(EditExpensePage);
```

## Challenge #2
* Remove expense via dispatch and then redirect to dashboard

`ExpenseListItem.js`

```
import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      {amount} - {createdAt}
    </p>
  </div>
);

export default ExpenseListItem;
```

`EditExpensePage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = props => (
  <div>
    <ExpenseForm
      expense={props.expense}
      onSubmit={expense => {
        props.dispatch(editExpense(props.expense.id, expense));
        props.history.push('/');
      }}
    />
    <button
      onClick={() => {
        props.dispatch(removeExpense({ id: props.expense.id }));
        props.history.push('/');
      }}>
      Remove
    </button>
  </div>
);

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});
export default connect(mapStateToProps)(EditExpensePage);
```

* Now we successfully moved our delete item button to the edit page
* We delete the item and are redirect to the home page (dashboard)
