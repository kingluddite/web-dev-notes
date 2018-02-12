# Snapshot components that require props
## ExpenseList
* Create `tests/components/ExpenseList.test.js`
* Good practice to also open `ExpenseList.js`

## When testing components we want to test the untested components
* We want to provide a set of dynamic props
* We don't want the props to come from the store
    - Instead we will provide expenses directly
    - This is very confusing at first

## Let's do this
* We are importing the named export
* We don't want the `connected` version
    - We want the UN-connected version
        + So we can dynamically pass in those props and make sure it renders correctly

### Be careful to make this change
`ExpenseList.js`

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.map(expense => (
      <ExpenseListItem key={expense.id} {...expense} />
    ))}
  </div>
);

const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(ExpenseList);
```

* You see the connect ExpenseList at the bottom that is being exported
* But we need to alter ExpenseList not connect and export that so we can use a named export in our test file
* If you do not do this you will get an `undefined` error like this:

![Invariant Violation](https://i.imgur.com/BtwzXx6.png)

" Invariant Violation: ReactShallowRenderer render(): Shallow rendering works only with custom components, but the provided element type was `undefined`"

## Create a named export
```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = props => (
    // MORE CODE
```

* Then if you don't have this:

`tests/components/ExpenseList.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

test('should render ExpenseList with expenses', () => {
  const wrapper = shallow(<ExpenseList />);
  expect(wrapper).toMatchSnapshot();
});
```

* You will get this error because you did not pass ExpenseList component expenses because it needs to be **mapped* through

![undefined map](https://i.imgur.com/EBBZKkG.png)

* Updating the code to this gets the test passing:

```
// MORE CODE
test('should render ExpenseList with expenses', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
});
```

* 29 passing tests

## View snapshot (the 1 new snapshot that was added)
* You will see that it has all the code that was rendered and the values passed to the props

### Make a change
* Remove the h1 and Expenses text in ExpenseList.js
* Review the error to see our change
* Did we want to make this change?
* Yes we did
* So we use the `u` key to update the snapshot
* And our test passes again

## Alter our code
* We want to set a default for expenses if it is not passed

`ExpenseList.js`

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = props => (
  <div>
    {props.expenses.length === 0 ? (
      <p>No expenses</p>
    ) : (
      props.expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
    )}
  </div>
);

const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(ExpenseList);
```

* And the new test for no expenses

`ExpenseList.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

test('should render ExpenseList with expenses', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseList with empty message', () => {
  const wrapper = shallow(<ExpenseList expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});
```

* The tests passes (if you view all --- 30 tests passing)
* The snapshot shows if expenses are passed or if none are passes

![snapshots](https://i.imgur.com/8cKBKjO.png)

## Challenge
* Create test file for ExpenseListItem
* Grab imports
* Render ExpenseListItem with fixture data
* Create snapshot

`ExpenseListItem.js`

```js
import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('should render ExpenseListItem correctly', () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});
```

* Will output this snapshot

```
 Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should render ExpenseListItem correctly 1`] = `
<div>
  <Link
    replace={false}
    to="/edit/1"
  >
    <h3>
      Gum
    </h3>
  </Link>
  <p>
    195
     - 
    0
  </p>
</div>
`;
```

## Another Challenge
* Complete snapshots for
    - `ExpenseDashboardPage.js`
    - `NotFoundPage.js`
* The will be similar to `Header.js`

### Bugs
* Needed to change files to get this to work

`ExpenseDashboardPage.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';

test('should render ExpenseDashboardPage correctly', () => {
  const wrapper = shallow(<ExpenseDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
```

`NotFoundPage.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../components/NotFoundPage';

test('should render NotFoundPage correctly', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});
```

* snapshot output for `NotFoundPage.test.js.snap`

```
exports[`should render NotFoundPage correctly 1`] = `
<div>
  404! 
  <Link
    replace={false}
    to="/"
  >
    Home
  </Link>
</div>
`;
```

* Needed to remove imports in:

`ExpenseListFilters.js`

```
import React from 'react';
import { connect } from 'react-redux';

import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate,
} from '../actions/filters';
// MORE CODE
```

* Add one line to:

`setupTests.js`

```js
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'react-dates/initialize'; // added this line

Enzyme.configure({
  adapter: new Adapter(),
});
```

* Add one line to:

`app.js`

```js
import 'react-dates/initialize'; // add this line
import React from 'react';
import ReactDOM from 'react-dom';
// MORE CODE
```

* All 33 tests should pass now
