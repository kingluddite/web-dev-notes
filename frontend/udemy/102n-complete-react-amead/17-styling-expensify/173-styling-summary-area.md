# Styling Summary Area
`ExpenseSummary.js`

* `_Header.scss`
    - Regular header
* _page-header.scss`
    - styles for page specific information

`ExpenseSummary.js`

```
import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const formattedExpenseTotal = numeral(expensesTotal / 100).format('$0,0.00');
  return (
    <div className="page-header">
      <div className="content-container">
        <h1>
          Viewing {expenseCount} {expenseWord} totalling {formattedExpenseTotal}
        </h1>
      </div>
    </div>
  );
};
// MORE CODE
```

* Make sure to import `_page-header.scss`
* font-weight of `700` === **bold**

`_button.scss`

```css
.button {
  background-color: $blue;
  border: none;
  color: $white;
  display: inline-block;
  font-weight: 300;
  font-size: $font-size-large;
  line-height: 1;
  padding: $s-size;
  text-decoration: none;
}
```

`_page-header.scss`

```css
.page-header {
  background: #f7f7f7;
  padding: $l-size 0;
  margin-bottom: $l-size; 

  &__actions {
     margin-top: $m-size;
  }
  &__title {
    font-weight: 300;
    margin: 0;

    span {
      font-weight: 700;
    }
  }
}
```

## Challenge
1. Create link modifier
2. Setup style to use no bg
3. Apply base and modified class to logout button

`_button.scss`

```css
.button {
  background-color: $blue;
  border: none;
  color: $white;
  display: inline-block;
  font-weight: 300;
  font-size: $font-size-large;
  line-height: 1;
  padding: $s-size;
  text-decoration: none;

  &--link {
    background-color: transparent;
  }
}
```

`Header.js`

```
// MORE CODE
export const Header = props => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Expensified</h1>
        </Link>
        <button className="button button--link" onClick={props.startLogout}>
          Logout
        </button>
      </div>
    </div>
  </header>
);
// MORE CODE
```

