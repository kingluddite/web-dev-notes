# Testing Filters Reducer
* **remember** that reducers are just functions
  - We pass in various things and expect various things to come out

## Let's look at our filters reducer
```
import moment from 'moment';

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      };
    case 'SET_START_DATE': {
      return {
        ...state,
        startDate: action.startDate,
      };
    }
    case 'SET_END_DATE': {
      return {
        ...state,
        endDate: action.endDate,
      };
    }
    default:
      return state;
  }
};
```

* We'll just call this reducer function with different values (`state` and `action`)
  - We'll pass in some state
  - We'll pass in action
    + And we'll make sure the action has the correct impact on the state by making an assertion about what comes back

## Mirror our reducer test file based on our app
![new test file](https://i.imgur.com/CNcXp1v.png)

### We need to import the filters reducer
`src/tests/reducers/filters.test.js`

```
import filtersReducer from '../../reducers/filters';
```

### Write our first test case
* This test case will make sure the default values get set up correctly when the redux store first kicks off
  - Redux dispatches a special action for that (and we can actually see that)
    + Shut down the test suite and run the test dev server
      * `$ npm run dev-server`

## After starting up your server
* You need to open the dev toolbar in chrome and open the Redux extension tab you installed in an earlier lesson
* You should see your app is open
* Refresh and you will 4 actions - The first action is `@@INIT`
* The other actions are coming from app.js

`app.js`

```
// MORE CODE

// expenses
store.dispatch(addExpense({ description: 'Water bill', amount: 4500 }));
store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
store.dispatch(
  addExpense({ description: 'Rent', createdAt: 2000, amount: 109500 })
);

// MORE CODE
```

### Let's look at @@INIT
* Click on it and examine the action object, you'll see it is just a single property `type` equal to @@INIT, there is nothing else in it
* We will use `@@INIT` to test the defaults
  - `@@INIT` is used internally by Redux
  - We will never actually respond to `@@INIT` inside our reducers
  - We will never dispatch `@@INIT` on our own
  - But we can use it in our test cases to make sure that the reducer sets itself up correctly

## Let's create our first test suite
`src/tests/reducers/filters.test.js`

```
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
  //
});

```

* We will call our reducer function and pass in `undefined` as the first argument (remember we are testing the defaults), and the second argument we'll pass in will be our action object
  - And remember we just told you that the first action that Redux dispatches is `@@INIT` so we'll pass that into our object
  - In the end it will look like this:

## Stop the dev-server and start the jest test again
`$ npm test -- --watch`

### I have a tip to help you start writing your tests
* Intentionally fail the test by writing something like this:

```
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(0);
});
```

* That will give you a fail result like this:

![fail result](https://i.imgur.com/gHlH8EW.png)

```
Expected: 0
    Received: {"endDate": "2019-12-01T07:59:59.999Z", "sortBy": "date", "startDate": "2019-11-01T07:00:00.000Z", "text": ""}
```

* We just passed in `0` as our assertion but we see what was received from a call to our `real` function and we get back an object
  - So this tells us we need to use `.toEqual()` because we are comparing objects
  - text is set to an empty string - easy to remember
  - `sortBy` is set to date by default - easy to remember
  - But the hard parts are the `startDate` and endDate, if we look at our original reducer function we'll see this:

`src/reducers/filters.js`

```
// MORE CODE

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
};

// MORE CODE
```

* This shows us the default values for start date will be using moment to get the start of the month and end of the month
* So we just need to plug that into our test and make sure to import momentjs

```
import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  });
});

```

* And now our test passes!

## Now we need to test some of the individual cases the reducer is supposed to handle
* We'll focus on these 2 to start
  - SORT_BY_AMOUNT
  - SORT_BY_DATE

```
// MORE CODE

    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      };

// MORE CODE
```

## SORT_BY_AMOUNT
```
// MORE CODE

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toEqual();
});

// MORE CODE
```

* That will let you know that just text is getting returned so we need to use `.toBe()` instead of `.toEqual()` and we just need to set our value to be `amount`

```
// MORE CODE

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

// MORE CODE
```

* And that test will pass

## The test for SORT_BY_DATE
* You would think that that would be very similar but it is a little different because the default value for sortBy is date and we need to first pass a state with a sortBy set to `amount` and then it will change to `date`

```
// MORE CODE
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

* And that test will pass

## Challenge
* Complete 3 test cases
  - should set text filter
  - should set startDate filter
  - should set endDate filter

```
// MORE CODE

test('should set text filter', () => {
  const text = 'This is my text';
  const action = {
    type: 'SET_TEXT_FILTER',
    text,
  };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(text);
});

// MORE CODE
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

* Run all tests and all 21 tests should pass in 4 different Test Suites

## Next - finish last reducer
* After that we'll jump into how we can test React
