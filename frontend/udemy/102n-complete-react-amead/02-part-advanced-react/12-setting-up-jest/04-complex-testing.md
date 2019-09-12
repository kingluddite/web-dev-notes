# Testing Expenses Selector
* Run server
    - `$ yarn run dev-server`
* Run test watch
    - `$ yarn test --watch`

## Create new test folder/file
`src/tests/selectors/expenses.test.js`

```js
import selectExpenses from '../../selectors/expenses';

const expenses = [
  {
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0,
  },
  {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: -1000,
  },
  {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 4500,
    createdAt: 1000,
  },
];
test('should filter by text value', () => {
  const result = selectExpenses();
});
```

* We need to use expenses and create filters

```js
import selectExpenses from '../../selectors/expenses';

const expenses = [
  {
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0,
  },
  {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: -1000,
  },
  {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 4500,
    createdAt: 1000,
  },
];
test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);
});
```

* And we'll create our first assertion to pass the test:

```js
import selectExpenses from '../../selectors/expenses';

const expenses = [
  {
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0,
  },
  {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: -1000,
  },
  {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 4500,
    createdAt: 1000,
  },
];
test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[1]]);
});
```

* Filter by startDate

```js
test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0]]);
});
```

* Will pass the tests
* We import moment
    - Use it to show epoch `0` an 4 days behind and ahead

## Challenge
* should filter by endDate
* should sort by date
* should sort by amount

```js
// MORE CODE
// test('should filter by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0).add(2, 'days'),
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[1]]);
});

test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});
```

* Now we have 15 passing tests
* Now if you change code in expenses.js, the test will fail and you can now be confident if your code will work or not

