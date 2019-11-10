# Testing filter action generators
* We just created test cases for the expenses action generators
* Now we'll create test cases for the filters action generators

## Get our tests running
`$ npm test -- --watch`

## Clean up task
* Delete `add.test.js` file as we don't need it anymore

`add.test.js`

```
const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;

test('should add two numbers', () => {
  const result = add(3, 4);
  expect(result).toBe(7);
});

test('should return a personal greeting', () => {
  const result = generateGreeting('Joe');
  expect(result).toBe('Hello Joe!');
});

test('should return an anonymous greeting if no name passed', () => {
  const result = generateGreeting();
  expect(result).toBe('Hello Anonymous!');
});
```

## Create our filters test file
* **remember** It should mirror where the file is in `src/actions/filters.js`
    - But it will be in `src/tests/actions/filters.test.js`
        + Create that new file now
        + As soon as you create it you'll see it fails because "Your test suite must contain at least one test"

### Our plan for creating filter tests
* We will write 6 total filter test cases
    - We have 5 action generators in `src/actions/filters.js`

`filters.js`

```
// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});

// SORT_BY_DATE
export const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

// SORT_BY_AMOUNT
export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

// SET_START_DATE
export const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate,
});

// SET_END_DATE
export const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate,
});
```

* setTextFilter
    - We'll write one test case that uses the default
    - We'll write another test case that provides a value
* Then we'll write just 1 test case for the following:
    - sortByDate
    - sortByAmount
    - setStartDate
    - setEndDate

## We'll do 2 together then the challenge will be to do 4 on your own
### Let's test setStartDate and setEndDate
* **Remember** to first import them

`src/tests/actions/filters.test.js`

```
import { setStartDate, setEndDate } from '../../actions/filters';

```

### Now create 2 test cases for each of the above action generators we just imported

```
import { setStartDate, setEndDate } from '../../actions/filters';

test('should generate set start date action object', () => {
  //
});

test('should generate set end date action object', () => {
  //
});

```

* Now we have 2 passing tests but our code does no effective testing yet

## Now we need to write our 2 test cases
* We need to make sure that we're passing in the same date that we're using in the real world
    - And that is a `moment` instance
    - In order to correctly pass in the date we'll need to import moment

### I know I can import my own files into these test files but can I also import 3rd party files?
* You most certainly can!

#### For start date
* We'll import our moment library
* We'll create a variable and assign it our setStartDate function and we'll pass our moment() method with 0 as the argument which will represents January @ midnight 1970 (aka the "epoch")

##### Now we'll need to make an assertion
* **remember** When comparing objects we need to use `.toEqual()` and pass the object in ( rather than `toBe()`)
    - First one is easy as we check for type property and a value of SET_START_DATE
    - But how do we check for the actual startDate value?
        + It will also need to be a moment instance starting at 0

```
import moment from 'moment';
import { setStartDate, setEndDate } from '../../actions/filters';

test('should generate set start date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0),
  });
});

test('should generate set end date action object', () => {
  //
});
```

* Make sure you set 'SET_START_DATE' as a string

#### Test set end date
```
import moment from 'moment';
import { setStartDate, setEndDate } from '../../actions/filters';

 // MORE CODE

test('should generate set end date action object', () => {
  const action = setEndDate(moment(10000));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(10000),
  });
});
```

* Now we can't just call moment and not pass a value so we enter another time (You could enter 0, I just put in 10000 to represent a time sometime after 0)

## Challenge tests
* We will create test cases for the other 4
* sortByDate and sortByAmount will be easy test cases so do them now

```
// MORE CODE
test('should generate sort by date action object', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SORT_BY_DATE',
  });
});

test('should generate sort by amount action object', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT',
  });
});
```

## Now we'll need to create 2 test cases for setTextFilter
1. One test that has a value passed in
2. One test that does not have a value passed in (default values should kick in)

```
import moment from 'moment';
import {
  setTextFilter,
  setStartDate,
  setEndDate,
  sortByDate,
  sortByAmount,
} from '../../actions/filters';

test('should generate set text filter action object', () => {
  const action = setTextFilter('search');
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'search',
  });
});

test('should generate default text action object', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: '',
  });
});

// MORE CODE
```

## Refactor
* To prevent typo's since you are using text in 2 spots create a variable to hold your text and use that instead

```
// MORE CODE

test('should generate set text filter action object with text value', () => {
  const text = 'search';
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text,
  });
});

// MORE CODE
```

## Final test code for filters
```
import moment from 'moment';
import {
  setTextFilter,
  setStartDate,
  setEndDate,
  sortByDate,
  sortByAmount,
} from '../../actions/filters';

test('should generate set text filter action object with text value', () => {
  const text = 'search';
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text,
  });
});

test('should generate default text action object with default', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: '',
  });
});

test('should generate set start date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0),
  });
});

test('should generate set end date action object', () => {
  const action = setEndDate(moment(10000));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(10000),
  });
});

test('should generate action object for sort by date', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SORT_BY_DATE',
  });
});

test('should generate action object for sort by amount', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT',
  });
});
```

## Recap
* Do we really need to test action generators?
* Maybe not but as we progress we'll dig into some code that has a lot of stuff baked in and testing will make sure if we change stuff our app won't break
