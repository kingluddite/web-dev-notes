# Build It - Adding Summary Component
## Create ExpensesSummary Component
* Rendered by ExpenseDashboardPage
* Test with 2 snapshot tests
* Connected to store for:
    - expenseCount (how many visible expenses?)
    - expenseTotal (what's the total of the visible expenses)

### Example
* Viewing 2 expenses totatalling $93.34
* Viewing 1 expense totalling $93.34

## Commit and Deploy
* Get the feature live

`ExpensesSummary.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import ExpensesSummary from '../../components/ExpensesSummary';

test('should correctly render ExpensesSummary with 1 expense', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={1} expenseTotal={235} />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render ExpensesSummary with multiple expenses', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={2} expenseTotal={235} />
  );
  expect(wrapper).toMatchSnapshot();
});
```

`ExpensesSummary.js`

```
import React from 'react';
import numeral from 'numeral';

const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const formattedExpenseTotal = numeral(expensesTotal / 100).format('$0,0.00');
  return (
    <div>
      <h1>
        Viewing {expenseCount} {expenseWord} totalling {formattedExpenseTotal}
      </h1>
    </div>
  );
};

export default ExpensesSummary;
```

* 60 tests pass
* View the ExpensesSummary.test.js.snap
    - You will see `expense` in test 1 and `expenses` in test 2
    - You will see the amount is properly formatted

## ExpensesSummary.js
* With connect()

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
    <div>
      <h1>
        Viewing {expenseCount} {expenseWord} totalling {formattedExpenseTotal}
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

## Tests for ExpensesSummary
```js
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
    <ExpensesSummary expenseCount={23} expensesTotal={12333235} />
  );
  expect(wrapper).toMatchSnapshot();
});
```

* Render it on the Dashboard page

```
import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

const ExpenseDashboardPage = () => (
  <div>
    <ExpensesSummary />
    <ExpenseList />
    <ExpenseListFilters />
  </div>
);

export default ExpenseDashboardPage;
```

* View in browser
* `$ yarn run dev-server`
* Create 3 expenses
* See how they are added and the dynamic values of expenses are updated
* The filter works
* But the new snapshot needs to be accepted
    - Type `u`
    - 60 tests pass

## Commit
* `$ gs`
* `$ ga -A`
* `$ gc -m 'add expense summary to dashboard`
* `$ gpush`
* `$ gph` (heroku)
* `$ ho` (heroku open)
