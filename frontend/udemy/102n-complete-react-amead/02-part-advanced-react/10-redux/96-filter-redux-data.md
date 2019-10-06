# Wrapping up our Reducers
* We completed the `expensesReducer`

## Now we'll focus on the `filtersReducer`
* We need the ability to change `sortBy`
  - SORT_BY_DATE (if we sort by date it will be Date )
    + Which is the default value defined here:

```
// MORE CODE

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};

// MORE CODE
```

  - SORT_BY_AMOUNT (if we sort by amount it will be the String amount)

## We can use these values before they exist
```
 // MORE CODE

store.dispatch(sortByAmount());

// MORE CODE
```

* There is no need to pass any values in
* All we need to do is generate the Action Object (which will be completely static) and then we'll dispatch it

## We'll do same thing when we want to sort by date
```
 // MORE CODE

store.dispatch(sortByAmount());
store.dispatch(sortByDate()); // add this

// MORE CODE
```

* Since date is the default we'll switch it over to amount to watch that change
  - Then I'll switch it back to date

## This will be your Challenge
* When `sortByAmount()` gets dispatched sortBy should be set to the string `amount`
* When `sortByDate()` gets dispatched the sortBy should be set to `date`
* Make sure to fill out the correct Action Generator functions
* Add the cases in the Reducer
* When complete you should be able to watch the sortBy values change and be printed in the client console  

## 1. Create the Action Generator functions
```
// MORE CODE

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});
// SET_START_DATE

// MORE CODE
```

## 2. Add `case` for each in filtersReducer
```
// MORE CODE

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    case 'SORT_BY_DATE':
      return {
        sortBy: 'date',
      };
    case 'SORT_BY_AMOUNT':
      return {
        sortBy: 'amount',
      };
    default:
      return state;
  }
};

// MORE CODE
```

## Houston we have a problem
* The above solution is incorrect
* Look at our results in the chrome console

`filters: {sortBy: "date"}`

* That is only one property of state and we need all of the state
* We forgot to first use the object spread operator for the state

```
// MORE CODE

const filtersReducer = (state = filtersReducerDefaultState, action) => {
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
    default:
      return state;
  }
};

// MORE CODE
```

* Now we are getting the filters `state`

![filters state](https://i.imgur.com/ztQG2XJ.png)

1. You will see that all the dispatches show the default value for 'date'
2. But then we see it changed to `amount`
3. And then changed to `date`

![3 different states](https://i.imgur.com/8hzo3LX.png)

## More Challenges
* Do `setStartDate()` and `setEndDate()`
* To save some space in our console we'll comment out all the previous calls to `store.dispatch()`

### Add the dispatch calls
* Just pass in numbers for date arguments
* We'll deal with timestamps later
* The number arguments you pass for `setStartDate()` and `setEndDate()`

```
// MORE CODE

store.dispatch(setStartDate(140));
store.dispatch(setStartDate());
store.dispatch(setEndDate(940));

// MORE CODE
```

### Add Action Generators
```
// MORE CODE

// SET_START_DATE
const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate,
});
// SET_END_DATE
const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate,
});

// MORE CODE
```

## Add cases
```
// MORE CODE

const filtersReducer = (state = filtersReducerDefaultState, action) => {
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
        startDate: action.date,
      };
    }
    case 'SET_END_DATE': {
      return {
        ...state,
        endDate: action.date,
      };
    }
    default:
      return state;
  }
};

// MORE CODE
```

* We also want the ability to pass no value in at all (clear startDate and endDate)
* If value is not passed in we'll set it by default to `undefined`

## Test in console
1. Should see a startDate equal to `140`
2. Set startDate to `undefined`
3. Set endDate to `940`

![final results in console](https://i.imgur.com/qxsfXDS.png)

## Complete
* We now have a complete Redux store for our application

## Next
* What we just did will allow us to filter our expenses later
* We'll set those values based off whatever the end user picks (maybe some sore of calendar widget?)
* Fix some small minor issues
* Add React to Redux
  - For now we are just playing around with simple static values


