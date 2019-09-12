# Testing filter action generators
* Delete `add.test.js` file as we don't need it

```js
import moment from 'moment';
import {
  setStartDate,
  setEndDate,
  sortByAmount,
  sortByDate,
  setTextFilter,
} from '../../actions/filters';

test('should generate set start date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0),
  });
});

test('should generate end date action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0),
  });
});

test.skip('skip this test just for fun', () => {});
test('should generate sort by amount action object', () => {
  // const action = sortByAmount();
  // expect(action).toEqual({
  //   type: 'SORT_BY_AMOUNT',
  // });
  // ALTERNATE WAY (MORE CONCISE)
  expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });
});

test('should generate sort by date action object', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SORT_BY_DATE',
  });
});

test('should generate text filter action with text value', () => {
  const text = 'test text';
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text,
  });
});

test('should generate text filter action with default', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: '',
  });
});
```

* We skip a test (great for coming back to later)
* A test passes if it doesn't throw an error
## Next - Testing more complex methods
