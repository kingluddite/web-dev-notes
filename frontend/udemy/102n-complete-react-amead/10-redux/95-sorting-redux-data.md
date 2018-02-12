# Sorting Redux Data
## Array.prototype.sort()
[mdn docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

### Sorting strings is easy
```js
var fruit = ['cherries', 'apples', 'bananas'];
fruit.sort(); // ['apples', 'bananas', 'cherries']
```

### Sorting objects is not so easy
* There is not sort objects method

#### compareFunction
* Specifies a function that defines the sort order

`arr.sort([compareFunction])`

* We will look at two expenses and determine which comes before the other
* Example of compare function

```js
function compare(a, b) {
  if (a is less than b by some ordering criterion) {
    return -1;
  }
  if (a is greater than b by the ordering criterion) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
```

## sortByDate
* Now let's get this `sorted` out (pun intended!)

`redux-expensify.js`

```js
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
    });
};
// MORE CODE
const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 100, createdAt: -21000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 })
);
// // MORE CODE
// MAKE sure you comment our filter out too
// store.dispatch(setTextFilter('ffe'));
// MORE CODE
```

* We are sorting by createdAt property so Coffee should now come before Rent in our console output

## Challenge
### sortByAmount
* When you sort you want to sort with the **highest items first**

```js
// MORE CODE
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy == 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};
// MORE CODE
const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 100, createdAt: -21000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 })
);

// MORE CODE
store.dispatch(sortByAmount());
// MORE CODE
```

* If the sort by amount works we should see that the Coffee expense comes first because it has a higher amount

## Summary
* Our entire Redux store is in place

## Next
* incorporate it into our file
* Break it up into multiple files
    - makes it easier to
        + work with
        + scale
