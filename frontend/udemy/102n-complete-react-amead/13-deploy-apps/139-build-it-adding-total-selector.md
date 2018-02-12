# Build it - Adding Total Selector
* Create 
    - expense-total.js
    - expense-total.test.js

```js
const total = getExpenseTotal(expenses); // map and reduce
console.log(total);
```

## Tests
* Should return 0 if no expenses
* Should correctly add up a single expense
* Should correctly add up multiple expenses

## Building it
* `src/selectors/expense-total.js`
* `src/tests/selectors/expense-total.test.js`

## TDD - Test Driven Development
* Write tests first
* But with snapshot tests we can't write the tests first
* Here we can use TDD
* So we'll start with `expense-total.test.js`

### Principle of TDD
* Write tests that fail

`expense-total.js`

```js
export default () => {};
```

`expense-total.test.js`

```js
import selectExpensesTotal from '../../selectors/expense-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
  const res = selectExpensesTotal([]);
  expect(res).toBe(0);
});
```

* Above test fails
* Now in TDD we need to write code to make that test case pass

```js
export default () => 0;
```

* Above passes
* But we will write code that really passes

```js
export default expenses => {
  if (expenses.length === 0) {
    return 0;
  } 
  
};
```

* That passes

```js
import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
  const res = selectExpensesTotal([]);
  expect(res).toBe(0);
});

test('should correctly add up a single expense', () => {
  const res = selectExpensesTotal([expenses[0]]);
  expect(res).toBe(195);
});

test('should correctly add up multiple expenses', () => {
  const res = selectExpensesTotal(expenses);
  expect(res).toBe(114195);
});
```

* But now 2 tests fail
* Because we need to do some computation in our code

### How does reduce() work?
* Google search `javascript reduce`
* MDN is great resource with samples
* The `reduce()` method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value
    - example:

```js
var sum = [0, 1, 2, 3].reduce(function (a, b) {
  return a + b;
}, 0);
// sum is 6
```

* reduce is an array method
* We start off with a value (bottom has `0`)
* The first time this function it called it is called with an intial value of 0
    - 0 + 0 = 0 (new accumulator value)
    - 0 + 1 = 1
    - 1 + 2 = 3
    - 3 + 3 = 6

* Same but with arrow function

```js
var total = [ 0, 1, 2, 3 ].reduce(
  ( acc, cur ) => acc + cur,
  0
);
```

* We can use reduce with our function
* Do we have an array of numbers?
* No
* But we can use `map()` to create an array of numbers
* And then use reduce on those numbers

```js
export default expenses => {
  if (expenses.length === 0) {
    return 0;
  }
  return expenses
    .map(expense => expense.amount)
    .reduce((sum, value) => sum + value, 0);
};
```

* That passes all 3 tests

## Refactor tests
* You can make your code better by streamlining/refactoring

```js
export default expenses => expenses
    .map(expense => expense.amount)
    .reduce((sum, value) => sum + value, 0);
```
