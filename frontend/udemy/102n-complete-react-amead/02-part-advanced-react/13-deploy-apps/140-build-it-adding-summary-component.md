# Build It - Adding Summary Component

## Challenge
1. Create `ExpenseSummary` Component
2. Rendered by `ExpenseDashboardPage` (just above our filters)
3. Test with 2 snapshot tests
4. Connected to store for: (we need to connect this component to the Redux Store)
  * Because we do need **2 props** for the component
    1. `expenseCount` prop (how many visible expenses?)
    2. `expensesTotal` prop (if we add up all the amounts for the visible expenses what is that total?)

**note** You will need to use both of our selectors to get these 2 pieces of information inside `connect`
  * We have to use the one that fetches the `visibleExpenses` in order to get the expense count
  * And we take those visible expenses and we also use them to calculate the expenses total (the total of all of the amounts for those visible expenses)

### Example:
"Viewing 2 **expenses** (plural) totaling $94.34"

### Example:
"Viewing 1 **expense** (singular) totaling $94.34"

// 2. Commit and Deploy

## Finally - Get the feature live! 
`ExpensesSummary.js`

```
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import selectedExpenses from '../selectors/expenses';
import totalExpenses from '../selectors/expense-total';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
  return (
    <div>
      <h1>
        Viewing {expenseCount} {expenseWord} totaling {formattedExpensesTotal}
      </h1>
    </div>
  );
};

```

# Test file
`ExpensesSummary.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should correctly render ExpensesSummary with 1 expense', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={1} expensesTotal={235} />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render ExpensesSummary with multiple expenses', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={23} expensesTotal={23523423423} />
  );
  expect(wrapper).toMatchSnapshot();
});

```

* View the snapshot

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should correctly render ExpensesSummary with 1 expense 1`] = `
<div>
  <h1>
    Viewing 
    1
     
    expense
     totaling 
    $2.35
  </h1>
</div>
`;

exports[`should correctly render ExpensesSummary with multiple expenses 1`] = `
<div>
  <h1>
    Viewing 
    23
     
    expenses
     totaling 
    $235,234,234.23
  </h1>
</div>
`;

```

## Set up connect and mapStateToProps()
`ExpensesSummary.js`

```
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expense-total';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
  return (
    <div>
      <h1>
        Viewing {expenseCount} {expenseWord} totaling {formattedExpensesTotal}
      </h1>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses),
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
```

`ExpenseDashboardPage.js`

```
import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

const ExpenseDashboardPage = () => (
  <div>
    <ExpensesSummary />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
```

![default expense view summary](https://i.imgur.com/5D4sxFA.png)

* Add an expense

![1 expense view summary](https://i.imgur.com/SKhxovc.png)

* Multiple expenses

![multiple expenses view summary](https://i.imgur.com/pL3A3VE.png)

* search by date or amount

## Git
* add/commit
* push to GH and Heroku
* Test URL and make sure app works same in Production

