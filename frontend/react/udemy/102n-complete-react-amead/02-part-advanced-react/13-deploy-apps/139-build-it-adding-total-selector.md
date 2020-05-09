# Build it - Adding Total Selector
## New feature request
* Build out `ExpenseListHeader.js`
  - It will sit just below the navigation
  - And just above the filters
  - Goal of this components: Summarize all the given expenses
    + If I had one expense:
      * "Viewing 1 expense totaling $1,343,000,00"
    + If I had 3 expenses
      * "Viewing 3 expenses totaling $2,333,234.33"

## That is the total feature request goal
* But for now we will create a new selector that will allow us to pass in all of the expenses and get back a sum
  - So it will take in an array of filtered expenses and return a single number (the total of those)
* Will also write test cases for this feature request

## Challenge
* Create a selectors file and a selectors test file
  - `expense-total.js`
  - `expense-total.test.js`
* We won't worry about using the new function we create anywhere but the test file
  - We will just be creating and changing these 2 files
  - We won't be adding any new components at the moment
  - We'll do this over a few files of notes
* **note** In the test file you will need to import the selectors `expenses-total.js` from the file where it was created

### What we need
* We have some expenses (we grab them from our fixtures)

```
export const expenses = [
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

```

* Then we need to create a function that takes in the expenses and returns the total amount of all the expenses

```
const total = getExpensesTotal(expenses); // look into map and reduce
console.log(total); // adds all expense amount and returns one number which is the sum of all expenses
```

## Challenge - Also create 3 test cases
* should return 0 if no expense
  - So if I pass in an empty an array, I would expect 0 to come back
* should correctly add up a single expense
* should correctly add up multiple expenses

### Note: You don't need to use the dev-server at all for this challenge/feature request
* You just use the test output (which should be already running) and the 2 files you will be creating

#### How do you know if you are done?
* When all 3 test cases are set up and passing returning the correctly summed up values

### Tip to complete this task
* To complete this you will need to use 2 functions
  - `map()` and `reduce()`
    + Not a requirement to use map() or reduce() and you could loop over the array using some sort of for loop and add those up
    + But `map()` and `reduce()` really make your code lean and mean
  - Look at stackoverflow, code examples

## Solution
### What is TDD?
* Test Driven Development
  - Write the test cases first
  - But we aren't using this because for `snapshot` tests we can't write the tests first
  - But for what we are working on now we can write the entire test suite first knowing it's going to fail
    + Then we create the function to fit that specification
  - So when we write the test cases we're kind of writing the documentation outlining what this new thing should do
    + When we do that, then we write the new thing

## So we create our empty test file
* We create our main file we will be testing on

`expense-total.js`

```
export default (expenses) => {

}
```

`expense-total.test.js` and it is empty

* Because our test file is empty we have 1 test failing
  - Your test suite must contain at least one test

## In our test file import stuff we'll need
* The file we're testing
* The fixture expenses data we'll be using

`selectors/expense-total.test.js`

```
import selectExpensesTotal from '../../selectors/expense-total.js';
import { expenses } from '../fixtures/expenses';
```

* Now we start with our first test case

```
import selectExpensesTotal from '../../selectors/expense-total.js';
import { expenses } from '../fixtures/expenses';

test('should return 0 if no expense', () => {
  //
});
```

* And now our test passes
* But our test suite is empty so we no fill it with what we want
  - We want to return when we call our method and passing it an empty array that we get back `0`
  - We know there is nothing returning zero in our main file `expense-total.js` so we know it should fail (if it doens't you may need to re-run your test)
  - I do and I get a failing test
    + Expect 0 and get `undefined`

## Another Principal of TDD: Write test cases that fail before you do anything else
* So we have that failing test code
* Now we need to make a tweak to our main code to make that test pass
  - How do we get it to return `0`

### We could easily make the test pass with:
`selectors/expense-total.js`

```
export default expenses => 0;
```

* Yes that makes our test pass but let's do it for real and not cheat
* We need to take an expenses argument
* Then we check if the length of it is 0 and if so we return 0
  - Else we do nothing

#
```
export default expenses => {
  if (expenses.length === 0) {
    return 0;
  }
  // do nothing
};
```

* Now our test is still passing but our code is a little more sussed out.
* Test 1 is complete!

## Test 2: Should correctly add up a single expense
```
test('should correctly add up a single expense', () => {
  //
});
```

* We want to take in an array of expenses and if it is just one we want to return at expenses `amount`
* We use the fixture expense data in our test

```
test('should correctly add up a single expense', () => {
  const res = selectExpensesTotal(expenses);
  expect(res).toBe(900);
});
```

## Better way to write this test
* I should have also passed in an array and inside the array I pass in one particular expense

## Also test for adding multiple expenses
* Then you need to add up the expense amounts in your fixtures expenses and that is the value you are expecting (31400)

### Now both of our test cases are failing
* This is because we have no code
* Our current codebase has an else with nothing inside it
  - Using reduce
  - Google it and get MDN docs
  - Look for example where it adds up an array of numbers (first example)
  - How reduce works:
    + It's an array method
    + and it starts off with some value:

#### reduce example 
```
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

* An easier example to illustrate

```
var total = [0, 1, 2, 3].reduce(function(sum, value) {
  return sum + value
},0);
```

* How it works:
  - We have an array of number
  - We use reduce to somehow get back the sum which is 6
  - Reduce has 2 arguments, the first a callback function, the second a start value
    + The first time the function gets called is with the accumulator value (0) and it calls with the first number in the array
      * So we have a sum of 0 and a value of 0
      * We add the two numbers up and return that value (0 + 0 = 0 ----> 0 is the "accumulator" value)
      * Now the accumulator value is set to 0 and we move on to the next number 1) 0 + 1 = 1
      * The accumulator is 1 and we move to the next number 2 (1 + 2 = 3)
      * The accumulator is 3 and we move to the next number 3 (3 + 3 = 6)
      * The number 3 is returned and stored in the variable `total`

* Arrow function

```
var total = [0, 1, 2, 3].reduce((sum, value) => 
  return sum + value
});
```

* start at 0

```
var total = [0, 1, 2, 3].reduce((sum, value) => 
  return sum + value
}, 0);
```

* With fancy words

```
var total = [0, 1, 2, 3].reduce((accumulator, currentValue) => accumulator + currentValue;
});
```

## Houston we have a problem
* To be able to use `reduce` we need an array of numbers but we don't have one
* So we can use `map()` to loop through our expenses and pull out an array of numbers and use reduce on that to get our sum

### We arrive at this code to make our tests pass
`expenses-total.js`

```
export default expenses => {
  if (expenses.length === 0) {
    return 0;
  }
  return expenses
    .map(expense => expense.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};
```

### Refactoring with tests is a huge benefit
* Once our test is working we can refactor our code at will and know that if we change it and if it doesn't fail the test, we are good to go
* Question: Do we need a special case that checks for `expenses.length` and returns 0?
  - Would it work if we had an empty array down below

#### What if we passed an empty array to:
```
  return expenses
    .map(expense => expense.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
```

* If we have an empty array in expenses
* We then get back another empty array from map
* Then we finally reduce that
* And the end result is 0
  - But this is just speculation
  - But with our test making sure we pass our 3 tests we can prove this theory out in the real world
  - We can just take the code and actually change it

```
export default expenses =>
  // if (expenses.length === 0) {
  //   return 0;
  // }
  expenses
    .map(expense => expense.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
```

* Our code still passes and we decreased the lines of code we need
* We can keep this code
* If the tests failed we'd have to fix it so that our tests pass

## Benefit of writing these tests
* By going through the process of writing these tests
  - We can revisit our code later and we can refactor our code for:
    + speed
    + improvement
    + readability
  - And we can walk away with confidence knowing that nothing actually broke since we have a complete and robust test suite
