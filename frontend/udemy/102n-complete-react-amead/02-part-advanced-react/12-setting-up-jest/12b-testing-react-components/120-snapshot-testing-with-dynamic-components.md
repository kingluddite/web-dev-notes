# Snapshot Testing with Dynamic Components
* If your test code isn't running start it up now

`$ npm test -- --watch`

* Let's explore snapshot testing components that require `props`

## Test the ExpenseList component
`ExpenseList.js`

* Do you remember how this component works?
    - ExpenseList takes in the array and it renders the ExpenseListItem for each item in the array

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

## ExpenseList.test.js
* Create this file `tests/components/ExpenseList.test.js`

### Our Goal
* To test this component:

`ExpenseList.js`

```
// MORE CODE

const ExpenseList = ({ expenses }) => (
  <div>
    <h1>Expense List</h1>
    {expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)}
  </div>
);
// MORE CODE
```

## Important point to remember when testing
* When we test our components we want to make sure we are testing the "unconnected" component
    - Why?
        + Because we want to be able to provide a set of dynamic props
        + So we don't want these props to come from the Redux store, instead we will provide expenses directly
        + **note** It is confusing at first but once you do a few it will be easy to wrap your head around

## How do we test the "unconnected" version?
* We have to export it as a `named` export

`ExpenseList.js`

* After making this change, make sure to save your file!

```
// MORE CODE

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseListItem from './ExpenseListItem';
import selectedExpenses from '../selectors/expenses';

export const ExpenseList = ({ expenses }) => (
  <div>
    <h1>Expense List</h1>
    {expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)}
  </div>
);

// MORE CODE
```

## Houston we have a problem! This is confusing!!
* Let's clear up the confusion
* But now we have 2 components being exported from this file:

1. The unconnected version (the chunk of code above)
    * We will only be using this in our test cases
    * We will import this and we'll use snapshot testing
        - Passing data in and making sure it works as expected
2. The connected version (the chunk of code below)
    * This is currently used in our application

`ExpenseList.js`

```
// MORE CODE
const mapStateToProps = state => ({
  expenses: selectedExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(ExpenseList);
```

## We will work with the unconnection
`src/tests/components/ExpenseList.test.js`

```
// We will be using some JSX so we need to import react
import React from 'react';
// We'll be using shallow from enzyme to render our component
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import { expenses } from '../fixtures/expenses';
```

* **note** Remember to import the "unconnected" **named export** instead of the "connected" default export from `ExpenseList.js`
    - This will allow us to dynamically pass in those props and verify that our component renders correctly
* We will also import the named export `expenses` from our fixtures expenses file
* We now have all the imports we need to actually **snapshot test** ExpenseList

## Let's write our snapshot test
* We want to test that our component renders with expenses
* Inside the test we need to render the component with that data
* We create a `wrapper` variable
* We get is value from whatever comes back from calling `shallow()`
* We call `shallow()` with the JSX we want to render `shallow(<ExpenseList />)`
    - ExpenseList requires and array so we need to pass it one
    - If you remember this component requires the `expenses` prop so we need to pass it to it (We will set the `expenses` prop equal to the **expenses** test data)

`ExpenseList.test.js`

```
// We will be using some JSX so we need to import react
import React from 'react';
// We'll be using shallow from enzyme to render our component
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import { expenses } from '../fixtures/expenses';

test('should render ExpenseList with expenses', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
});
```

## We just completed adding the rendered component

## Now we need to set up the snapshot
* We want to make sure our wrapper that holds the rendered component matches our snapshot
* **Remember** The first time we run this test case there is no snapshot so the test can never actually fail
    - So we need to first generate the snapshot
    - The first time we run our test code Enzyme will go through the process of generating the snapshot we need to test 

`ExpenseList.test.js`

```
// We will be using some JSX so we need to import react
import React from 'react';
// We'll be using shallow from enzyme to render our component
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import { expenses } from '../fixtures/expenses';

test('should render ExpenseList with expenses', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
});
```

* Once you save this doc, it will generator a snapshot
* Open it

`tests/components/__snapshots__/ExpenseList.test.js.snap`

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should render ExpenseList with expenses 1`] = `
<div>
  <h1>
    Expense List
  </h1>
  <ExpenseListItem
    amount={900}
    createdAt={0}
    description="Gas"
    id="1"
    key="1"
    note=""
  />
  <ExpenseListItem
    amount={500}
    createdAt={-345600000}
    description="Dry Cleaning"
    id="2"
    key="2"
    note=""
  />
  <ExpenseListItem
    amount={30000}
    createdAt={345600000}
    description="Rent"
    id="3"
    key="3"
    note=""
  />
</div>
`;
```

* We have our test name
* It is the first and only snapshot in that test
* Then we have the output
    - We have our h1
    - We have our ExpenseListItems
        + And it shows what got passed down for each
* This is the snapshot for our component and if our component ever changes we will be notified

## Let's make a change
* We want to remove our h1 - so delete it in `ExpenseList.js`
    - We will get an error because our snapshot is different than what our component is rendering
    - Did I want to remove the h1? Yes
    - So type `u` to generate a new snapshot with your changed code
    - The tests pass
    - Open the new snapshot and you will see the `h1` is no longer part of it

`__snapshots__/ExpenseList.test.js.snap`

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should render ExpenseList with expenses 1`] = `
<div>
  <ExpenseListItem
    amount={900}
    createdAt={0}
    description="Gas"
    id="1"
    key="1"
    note=""
  />
  <ExpenseListItem
    amount={500}
    createdAt={-345600000}
    description="Dry Cleaning"
    id="2"
    key="2"
    note=""
  />
  <ExpenseListItem
    amount={30000}
    createdAt={345600000}
    description="Rent"
    id="3"
    key="3"
    note=""
  />
</div>
`;
```

* That is one test we could create

## We could also create a test to show what is rendered if we have no expenses
* Like if we had an empty array (as one example)
* But right now our `ExpenseList.js` doesn't support any conditional rendering so let's set that up

`ExpenseList.js`

```
// MORE CODE

export const ExpenseList = ({ expenses }) => (
  <div>
    {expenses.length === 0 ? (
      <p>No expenses</p>
    ) : (
      expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
    )}
  </div>
);

// MORE CODE
```

* And here is our code that passes an empty array

```
// MORE CODE

test('should render ExpenseList with empty message', () => {
  const wrapper = shallow(<ExpenseList expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});
```

* And the snapshot will look like:

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should render ExpenseList with empty message 1`] = `
<div>
  <p>
    No expenses
  </p>
</div>
`;

exports[`should render ExpenseList with expenses 1`] = `

// MORE CODE
```

* And we see if there are no expenses we see "No expenses" show up and if we pass expenses we will generate an ExpenseListItem for each one
* If either of those change we will be alerted and we can change accordingly

## Challenge - ExpenseListItem.js
* Very similar to `ExpenseList.js`
    - It takes some data in
    - It renders something
* We just want to add a snapshot for what it renders

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

## Tips on Steps to get this done
1. Create test file
2. Grab imports
3. Render ExpenseListItem (grab any one of expenses with fixture data)
4. Create the snapshot

* You only need to do this a single time (no need for 2 different snapshot tests like we just completed)

## ExpenseListItem.test.js solution
* Make sure to import everything we need
* We do need to export as a named export as there is no `connect`
* You could have spread out all of what it expects as props:
    - id
    - description
    - amount
    - createdAt
* Or you can do as I did below and just spread everything out with `{...expenses[0]}`
    - That grabs the object
    - I just grab the 1st expense `expenses[0]` (from fixtures)
    - And adds all it's props to expense list item

`ExpenseListItem.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import { expenses } from '../fixtures/expenses';
import ExpenseListItem from '../../components/ExpenseListItem';

test('should render ExpenseListItem correctly', () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});
```

### ExpenseListItem.test.js.snap
```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should render ExpenseListItem correctly 1`] = `
<div>
  <Link
    to="/edit/1"
  >
    <h3>
      Desc: 
      Gas
    </h3>
  </Link>
  <p>
    Amount: 
    900
     
  </p>
  <p>
    Created:
    0
  </p>
</div>
`;
```

* The output shows us what we expected
    - We see the id in the Link
    - We see the h3
    - We see the p with Amount
    - We see the p with the Created
* If we make any changes to the component we will be alerted

## Let's write 2 more snapshots for:
* ExpenseDashboardPage.js
* NotFoundPage.js

### ExpenseDashboardPage.js
`ExpenseDashboardPage.js`

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

* Create a test file `src/components/ExpenseDashboardPage.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';

test('should render ExpenseDashboardPage correctly', () => {
  const wrapper = shallow(<ExpenseDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
```

* View the output

`ExpenseDashboardPage.test.js.snap`

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should render ExpenseDashboardPage correctly 1`] = `
<div>
  <Connect(ExpenseListFilters) />
  <Connect(ExpenseList) />
</div>
`;
```

## NotFoundPage
`NotFoundPage.js`

```
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    404! <Link to="/">Go to home page</Link>
  </div>
);

export default NotFoundPage;
```

* `NotFoundPage.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../components/NotFoundPage';

test('should render NotFoundPage correctly', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});
```

* snapshot output

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should render NotFoundPage correctly 1`] = `
<div>
  404! 
  <Link
    to="/"
  >
    Go to home page
  </Link>
</div>
`;
```

## Recap
* A lot of our components are easy single snapshops

## Next
* Dive into the components with a lot more complexity
    - We'll learn how to manipulate the UI
    - Click buttons
    - Changing input values
