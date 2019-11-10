# Testing Expenses Selector
* We will write test cases for the most expensive test case so far

`src/selectors/expenses.js`

```
import moment from 'moment';

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) =>
  expenses
    .filter(expense => {
      // console.log(expense.createdAt >= startDate);
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, 'day')
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, 'day')
        : true;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
      return 1;
    });

export default getVisibleExpenses;
```

* This requires some complex input
* Requires a lot of stuff to manipulate that input
* Then we get the `filtered` and `sorted` array back
* We can't test with just 1 test case
  - We'll create 6 or more test cases to effectively test this to make sure all of the various paths are working as expected

## Create a test file for this file
* Follow our naming convention and folder structure to add this test
* It should look like this:

![new test for selectors](https://i.imgur.com/U5p3FuJ.png)

Create a new file in `src/tests/selectors/expenses.test.js`

## Now we need to import the thing we're testing
`expenses.test.js`

```
import getVisibleExpenses from '../../selectors/expenses';
```

## Run jest
`$ yarn test --watch`
`$ npm test --watch`

* We get an error because we don't have a test yet

## Setup test cases
`expenses.test.js`

```
import getVisibleExpenses from '../../selectors/expenses';

test('should filter by text value', () => {
  // what is the goal inside of here?
})

```

## What is the goal of our test?
* To call `getVisibleExpenses` and pass in some data
  - What data? It will be a list of expenses that we will be filtering and those filter values

## How do we get the expenses?
* We'll need to use some test data
  - We need a list of various expenses that we can use inside all of these test cases since all of them need to be able to filter the expenses in order to determine if they worked correctly or not

### Test expenses
* We'll create 3 so we can test sorting
* **note** `createdAt` is just a number so we just drop in a number to test that value
* We'll put one expense in the past by putting the `createdAt` value at a negative number
* We'll put another expense at some point in the future (1000)

`expenses.test.js`

```
import getVisibleExpenses from '../../selectors/expenses';

const expenses = [
  {
    id: '1',
    description: 'Gas',
    note: '',
    amount: 900,
    createdAt: 0,
  },
  {
    id: '2',
    description: 'Dry Cleaning',
    note: '',
    amount: 500,
    createdAt: -1000,
  },
  {
    id: '3',
    description: 'Rent',
    note: '',
    amount: 30000,
    createdAt: 1000,
  },
];
test('should filter by text value', () => {
  // what is the goal inside of here?
});
```

## Now we'll pass in our data and make assertions about what comes back
```
// MORE CODE

test('should filter by text value', () => {
  const result = getVisibleExpenses(expenses, filters);
});
```

* We just created our expenses test data object but we now need to create our `filters` object
* We'll first test the text search to find anything that has an `e` in it (should return "Dry Cleaning" and "Rent")
  - Each test case will have it's own filters and each test case can define which filters it wants to use

```
// MORE CODE

test('should filter by text value', () => {
  const filters = {
    test: 'e'
  }
  const result = getVisibleExpenses(expenses, filters);
});

// MORE CODE
```

* Now we'll pass in the default values for the other properties

```
// MORE CODE

test('should filter by text value', () => {
  const filters = {
    test: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  };
  const result = getVisibleExpenses(expenses, filters);
});

// MORE CODE
```

* Now we have all the `expenses` and `filters` we can make some **assertions** about what comes back:

  - What should come back is an array of 2 items
    1. Dry Cleaning
    2. Rent
  - But since we have a default sort by date the order will be
    1. Rent (1000 createdAt)
    2. Dry Cleaning (-1000 createdAt)
* Since we are comparing objects, we'll use jest's `.toEqual()` instead of `.toBe()`
* We need to return an array of 2 items with `expenses[2], expenses[1]` 

```
// MORE CODE

test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[1]]);
});

// MORE CODE
```

* See what happens if you get the order of the array wrong

```
// MORE CODE

test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[1], expenses[2]]);
});

// MORE CODE
```

* You will get a failing test because the value received was not what was expected (put in correct order again to pass test)
* We just proved in our test case that our text filter is properly filtering out expenses

## Test case for start date
```
import moment from 'moment';
import getVisibleExpenses from '../../selectors/expenses';

// MORE CODE

test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined,
  };
});
```

* We need to use moment so we import it and use it and sets its startDate to 0 `moment(0)`

## Houston we have a problem
* Currently our expenses are just seconds away from each other and this will cause problems where we can's check for `startDate` and `endDate` to filter because we are relying on **momentjs'** `.isSameOrBefore()` or `.isSameOrAfter()` by **days**

`src/selectors/expenses.js`

```
// MORE CODE

import moment from 'moment';

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) =>
  expenses
    .filter(expense => {
      // console.log(expense.createdAt >= startDate);
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, 'day')
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, 'day')

// MORE CODE
```

* So with our expenses just seconds away from each other we'll never be able to test days away from each other
* To fix this:
  - We'll tweak the `createdAt` dates in our sample expenses test data object and that will allow us to add a meaningful test case

## Converting seconds to days using moment in our test data
* Have one date start at `0`

```
// MORE CODE

  {
    id: '2',
    description: 'Dry Cleaning',
    note: '',
    amount: 500,
    createdAt: moment(0).valueOf()
  },

// MORE CODE
```

* `moment(0).valueOf()` will just give us `0` back and that is not what we want

### Using moment's `subtract()` method
* This will allow us to manipulate time (_we can subtract a certain amount of some unit_)
  - We could subtract 1 minute

```
// MORE CODE

const expenses = [
// MORE CODE

  {
    id: '2',
    description: 'Dry Cleaning',
    note: '',
    amount: 500,
    createdAt: moment(0)
      .subtract(1, 'minute')
      .valueOf(),
  },
  // MORE CODE
];
// MORE CODE

test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined,
  };
  console.log(expenses[1]);
});

``` 
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

* That will log out this:

```
 { id: '2',
        description: 'Dry Cleaning',
        note: '',
        amount: 500,
        createdAt: -60000 }
```

## Subtract 4 days
* Now let's alter from subtracting 1 minute to subtracting 4 days
* First update the code:

```
// MORE CODE

  {
    id: '2',
    description: 'Dry Cleaning',
    note: '',
    amount: 500,
    createdAt: moment(0)
      .subtract(4, 'days')
      .valueOf(),
  },

// MORE CODE
```

* And this will log out to the terminal:

```
{ id: '2',
        description: 'Dry Cleaning',
        note: '',
        amount: 500,
        createdAt: -345600000 }
```

## Add 4 days
* We can also add 4 days

```
// MORE CODE

test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[1]]);
});

test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined,
  };
  console.log(expenses[1]);
  console.log(expenses[2]);
});

// MORE CODE
```

* And that will log out to the terminal

```
 { id: '3',
        description: 'Rent',
        note: '',
        amount: 30000,
        createdAt: moment("1970-01-04T16:00:00.000") }
```

* We get a hard to use epoch date that we can convert to milliseconds using `valueOf()` like we did with the other startDate:

```
// MORE CODE

  {
    id: '3',
    description: 'Rent',
    note: '',
    amount: 30000,
    createdAt: moment(0)
      .add(4, 'days')
      .valueOf(),
  },

// MORE CODE
```

* And that will give us these values in the terminal

```
   console.log src/tests/selectors/expenses.test.js:47
      { id: '2',
        description: 'Dry Cleaning',
        note: '',
        amount: 500,
        createdAt: -345600000 }
    console.log src/tests/selectors/expenses.test.js:48
      { id: '3',
        description: 'Rent',
        note: '',
        amount: 30000,
        createdAt: 345600000 }
```

* `valueOf()` - we need it to be a number so we use `valueOf()` to get the regular timestamp back

## Now we'll run our test
* The past `createdAt` will be filtered out and the 0 and 4 days in future will be in result set with the 0
* We will assert an array comes back
* The expenses[2] is first in array because it is sorted by date and that is the most positive date followed by expenses[2] which is `0`

```
import moment from 'moment';
import getVisibleExpenses from '../../selectors/expenses';

const expenses = [
  {
    id: '1',
    description: 'Gas',
    note: '',
    amount: 900,
    createdAt: 0,
  },
  {
    id: '2',
    description: 'Dry Cleaning',
    note: '',
    amount: 500,
    createdAt: moment(0)
      .subtract(4, 'days')
      .valueOf(),
  },
  {
    id: '3',
    description: 'Rent',
    note: '',
    amount: 30000,
    createdAt: moment(0)
      .add(4, 'days')
      .valueOf(),
  },
];

// MORE CODE

test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined,
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0]]);
});
```

* That gives us a passing test
* Our start date test is working

## This makes our life better
* Now we can more easily spot regressions in our code
  - Life if we do some refactoring and we mess something up
  - example:

`src/selectors/expenses.js`

```
// MORE CODE

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) =>
  expenses
    .filter(expense => {
      // console.log(expense.createdAt >= startDate);
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, 'day')
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, 'day')
        : true;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })

// MORE CODE
```

* If in the above we refactored and changed our `description` to notes like this:

```
// MORE CODE

      const textMatch = expense.notes
        .toLowerCase()
        .includes(text.toLowerCase());

// MORE CODE
```

* You will get an error like this:
  - ![error from wrong property](https://i.imgur.com/z7E7Cho.png)
  - You can see it was expecting an array of objects and it just received an empty array
* Or if you misspelled a property like `notes`

```
// MORE CODE

      const textMatch = expense.notes.toLowerCase().includes(text.toLowerCase());

// MORE CODE
```

* You see an undefined error:

![undefined error](https://i.imgur.com/T89h3NL.png)

* Change it back to `description` to get back to a passing test suite

## Challenge time
* Create 3 test suites with:
  - "should filter by endDate"
    + Will be similar to what we did with "should filter by startDate"
    + The trick here is use momentjs to add 2 days into the future for endDate
      * This will filter out items create more than 2 days away from this point in time
  - "should sort by date"
  - "should sort by amount"

### sort by endDate
```
// MORE CODE

test('should filter by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0).add(2, 'days'),
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[1]]);
});

// MORE CODE
```

* We expect, since they are sorted by `date` by default to have the first createdAt expense `expense[0]` to come first and `expense[1]` to come second

### sort by date and sort by amount
* This is a bit easier but we need to assert all 3 objects get returned and sorted in array

```
// MORE CODE

test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});
```

* Now if we tweak/refactor our `src/selectors/expenses.js` file we'll know right away that we broke something

## Next - We'll test our reducers
* And later we'll test our components
