# Testing Reducer Filters
* @@INIT
    - Only use in testing and we can use this to make sure the reducer sets itself up correctly
    - Used internally in redux
    - We will never respond to this inside our reducers
    - We won't dispatch it on our own

![@@init](https://i.imgur.com/NqoFy46.png)

`src/tests/reducers/filters.test.js`

```js
import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, {
    type: '@@INIT',
  });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  });
});
```

* 16 tests should be passing

## sort by amount
```js
test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});
```

## More Reducer tests
```js
test('should set text filter', () => {
  const text = 'This is my filter';
  const action = {
    type: 'SET_TEXT_FILTER',
    text,
  };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(text);
});

test('should set startDate filter', () => {
  const startDate = moment();
  const action = {
    type: 'SET_START_DATE',
    startDate,
  };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toEqual(startDate);
});

test('should set endDate filter', () => {
  const endDate = moment();
  const action = {
    type: 'SET_END_DATE',
    endDate,
  };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(endDate);
});
```


## Test sort by amount and sort by date
```js
test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount',
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});
```


