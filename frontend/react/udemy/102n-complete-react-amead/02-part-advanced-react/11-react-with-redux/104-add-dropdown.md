# Dropdown for Picking SortBy
* We will learn how to give the user a way to sort their data
* Currently the data is sorted by the default sortby value (which is by `date`)
* We also want to give them a way to sort by 
* We will set up a select dropdown so they can pick a way they can sort and view their expenses

## Let's improve on our test data
* We need to sort so let's fix this so we can test it
* Make sure they have different values for createdAt

## Update app.js
```
// MORE CODE

const store = configureStore();

// expenses
store.dispatch(addExpense({ description: 'Water bill', amount: 4500 }));
store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));

// filters
store.dispatch(setTextFilter('water'));

setTimeout(() => {
  store.dispatch(setTextFilter('bill'));
}, 3000);

// store.subscribe(() => {
//   const state = store.getState();
//   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//   console.log(visibleExpenses);
// });

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById('root'));
```

* Now when we sort by date the order should change
  - (sort by date) We should see Gas, then Water, then Rent
  - (sort by amount) We should see for amount, rent first, then water then gas

## We can remove the setTextFilter
* Before we needed this to set the filter but now we have our input textbox and no longer need them
* Delete the following from `app.js`

```
// MORE CODE

// // filters
// store.dispatch(setTextFilter('water'));
//
// setTimeout(() => {
//   store.dispatch(setTextFilter('bill'));
// }, 3000);

// MORE CODE
```

* View in UI
  - We see that by default we see the expenses with highest `createdAt` value come first (this is our default sort by method)

## Add a way for the end user to change this
* We'll use a select HTML form element
* When we setup form elements and use value and onChange we are created what is commonly known as a "controlled input"
  - When you see this in documentation don't get scared it just means an input where the value is controlled by JavaScript
  - controlled inputs give us a lot more control and we'll use them whenever we can

```
import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate } from '../actions/filters';

const ExpenseListFilters = props => (
  <div>
    <input
      type="text"
      value={props.filters.text}
      onChange={e => {
        props.dispatch(setTextFilter(e.target.value));
      }}
    />
    <label htmlFor="sort-select">Sort By</label>
    <select
      id="sort-select"
      value={props.filters.sortBy}
      onChange={e => {
        if (e.target.value === 'amount') {
          props.dispatch(sortByAmount());
        } else if (e.target.value === 'date') {
          props.dispatch(sortByDate());
        }
      }}
    >
      <option value="date">Date</option>
      <option value="amount">Amount</option>
    </select>
  </div>
);

const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps)(ExpenseListFilters);
```

## Recap
* Nice! Now we can sort by date or amount by using a UI select form element
* select is similar to how we use them in regular HTML
* The `props` we use are similar to the props we use for our inputs in JSX
  - So we can set the `value` and do something when the value changes (`onChange`)
    + Same is true for text inputs and select



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
