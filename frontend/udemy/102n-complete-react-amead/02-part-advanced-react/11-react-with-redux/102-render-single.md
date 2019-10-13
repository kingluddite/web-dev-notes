# Render Single Individual Expenses
* Currently we are not making use of our array by showing it on the UI
* We will use the array map() function to iterate over the expenses array and render a new instance of an ExpenseListItem component for each one

## Create src/components/ExpenseListItem.js
* First attempt

`ExpenseListItem.js`

```
import React from 'react';

const ExpenseListItem = props => (
  <li>
    Desc: {props.expense.description} Amount: {props.expense.amount} created:{' '}
    {props.expense.createdAt}
  </li>
);

export default ExpenseListItem;

```

* But it might be better to structure like:

```
import React from 'react';

const ExpenseListItem = ({ expense }) => (
  <div>
    <h3>Desc: {expense.description} </h3>
    <p>Amount: {expense.amount} </p>
    <p>Created:{expense.createdAt}</p>
  </div>
);

export default ExpenseListItem;
```

* `ExpenseList.js`

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';

const ExpenseList = ({ expenses }) => (
  <div>
    <h1>Expense List</h1>
    {expenses.map(expense => (
      <ExpenseListItem key={expense.id} expense={expense} />
    ))}
  </div>
);

const mapStateToProps = state => ({
  expenses: state.expenses,
  filters: state.filters,
});

export default connect(mapStateToProps)(ExpenseList);
```

* That give us the output we want but try this using the spread operator:

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';

const ExpenseList = ({ expenses }) => (
  <div>
    <h1>Expense List</h1>
    {expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)}
  </div>
);

const mapStateToProps = state => ({
  expenses: state.expenses,
  filters: state.filters,
});

export default connect(mapStateToProps)(ExpenseList);
```

* And then you can do this in the item component

```
import React from 'react';

const ExpenseListItem = ({ description, amount, createdAt }) => (
  <div>
    <h3>Desc: {description} </h3>
    <p>Amount: {amount} </p>
    <p>Created:{createdAt}</p>
  </div>
);

export default ExpenseListItem;
```

* Should render to UI like this:

![rendering our expenses](https://i.imgur.com/YwEfC0G.png)

## Implement our selector
* It is inside `src/selectors/expenses.js`
* It takes in the array of expenses and it takes all the filters and it returns and it returns the filtered and sorted array
  - This is the array we will want to show to the screen
  - Currently if we set a text filter the data will never change because props.expenses comes from `state.expenses` which is the complete array
    + We won't need to pass filters into expenses
    + We will need to import selectors/expenses into ExpenseList
    + So we'll remove state.filters and the filters property
    + And we'll swap out state.expenses for `expenses` value and instead call the selectExpenses() method and pass it the argument of `state.expenses`

#
```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectedExpenses from '../selectors/expenses';

const ExpenseList = ({ expenses }) => (
  <div>
    <h1>Expense List</h1>
    {expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)}
  </div>
);

const mapStateToProps = state => ({
  expenses: selectedExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(ExpenseList);
```

* The page renders and then disappears
  - To fix this remove the `setTimeout()` call in `app.js`

```
// MORE CODE

// setTimeout(() => {
//   store.dispatch(setTextFilter('milk'));
// }, 3000);

// MORE CODE
```

* But if we set it to `bill` and remove the empty call

```
// MORE CODE

store.dispatch(setTextFilter('water'));

setTimeout(() => {
  store.dispatch(setTextFilter('bill'));
}, 3000);

// MORE CODE
```

* We'll see Water bill and then in 3 seconds Gas Bill gets prepended
* This is great by "how do I actually change data?"
  - As an example: using the filters to change data from the UI

## We'll do that next
