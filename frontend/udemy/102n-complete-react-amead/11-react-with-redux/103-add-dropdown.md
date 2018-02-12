# Dropdown for Picking SortBy
* Sort by a value (user can)
    - date
    - amount
* Update our data
`app.js`

```js
// // MORE CODE
const store = configureStore();

store.dispatch(addExpense({ description: 'Water bill', amount: 20000 }));
store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

console.log(store.getState());
// // MORE CODE
```

* We also remove the setTimeout and setTextFilter
* Also remove it's import

`ExpenseListFilters.js`

```
// MORE CODE
const ExpenseListFilters = props => (
  <div>
    <input
      type="text"
      value={props.filters.text}
      onChange={e => {
        props.dispatch(setTextFilter(e.target.value));
      }}
    />
    <select name="">
      <option value="date">Date</option>
      <option value="amount">Amount</option>
    </select>
  </div>
);
// MORE CODE
```

## Challenge
* Setup value and onChange for select

* **note** When we set up form inputs (text inputs/select/radio buttons) and we use `value` and `onChange` we are using what is commonly known as a **controlled input**
* You will see the term **controlled input** online ofter in regards to React, don't freak out --- it just means where the input is controlled by JavaScript

```
import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount } from '../actions/filters';

const ExpenseListFilters = props => (
  <div>
    <input
      type="text"
      value={props.filters.text}
      onChange={e => {
        props.dispatch(setTextFilter(e.target.value));
      }}
    />
    <select
      value={props.filters.sortBy}
      onChange={e => {
        if (e.target.value === 'date') {
          props.dispatch(sortByDate());
        } else if (e.target.value === 'amount') {
          props.dispatch(sortByAmount());
        }
      }}>
      <option value="date">Date</option>
      <option value="amount">Amount</option>
    </select>
  </div>
);

const mapStateToProps = state => ({
  f ilters: state.filters,
});
export default connect(mapStateToProps)(ExpenseListFilters);
```

## Take it for a test drive
* You can now sort by date and amount when you select a value from the dropdown
