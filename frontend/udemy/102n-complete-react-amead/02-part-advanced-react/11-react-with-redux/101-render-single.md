# Render Single Individual Expenses
* We'll use map to interate over Expense array
* And render an new instance of an expense list item for each one

## Challenge
`ExpenseListItem.js`

* Export stateless functional component
    - render
        + description
        + amount
        + createdAt
    - don't render
        + id
        + note
* Then import into ExpenseList and use map to render individual items to the screen

`ExpenseListItem.js`

```
import React from react;

const ExpenseListItem = ({ description, amount, createdAt }) => (
 <div>
   <h3>{description}</h3>
   <p>{amount} - {createdAt}</p>
 </div>
)

export default ExpenseListItem;
```

* Then we find a way to output each expense

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';

const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.map(expense => {
      return <ExpenseListItem key={expense.id} {...expense} />;
    })}
  </div>
);

const mapStateToProps = state => {
  return {
    expenses: state.expenses,
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(ExpenseList);
```

* View in browser and your see our 2 expenses itemized

![expenses itemized](https://i.imgur.com/l7EF53L.png)

* An an amount

`app.js`

```js
// MORE CODE
store.dispatch(addExpense({ description: 'Water bill', amount: 20000 }));
// MORE CODE
```

* Now we see an amount by Water bill

## Selectors
`ExpenseList.js`

```
// MORE CODE
const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters),
  };
};

export default connect(mapStateToProps)(ExpenseList);
```

## Take it for a test spin
* You see only water bill
* After 3 seconds it changes to empty because we added a setTimeout to change it to `rent` after 3 seconds and that means our filter is kicking in

```
// MORE CODE
store.dispatch(addExpense({ description: 'Water bill', amount: 20000 }));
store.dispatch(addExpense({ description: 'Gas bill' }));
store.dispatch(setTextFilter('water'));

setTimeout(() => {
  store.dispatch(setTextFilter('bill'));
}, 3000);
// MORE CODE
```

* Now Water Bill appears and after 3 seconds so does Gas bill

## Next - We learn how to change data
* From the UI
