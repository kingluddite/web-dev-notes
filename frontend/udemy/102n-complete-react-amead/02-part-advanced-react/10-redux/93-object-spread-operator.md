# Object Spread Operator
* More useful than array spread operator
  - You can use `concat()` to do what array spread operator does
  - Nothing else does what the object spread operator does

```js
const user = {
  name: 'Joe',
  age: 22,
};

console.log({
  ...user,
});
```

* We see an error in the console
* Array spread operator works in babel as is
* But we have to customize babel to get the object spread operator to work

### Get object spread working in babel
* [docs](https://babeljs.io/docs/plugins/transform-object-rest-spread/)
* `$ yarn add -D babel-plugin-transform-object-rest-spread`
    - When we add it we can leave off the `babel-plugin` prefix

#### We also have to attach it to the plugins array
`.babelrc`

We add `transform-object-rest-spread`

```json
{
  "presets": [
    "env",
    "react"
  ],
  "plugins": [
    "transform-class-properties",
    "transform-object-rest-spread"
  ]
}
```

* Restart server
* Refresh browser
* Now you'll see: `{name: "Joe", age: 22}`

## Add stuff to our new object
* Let's add a `location` property

```js
const user = {
  name: 'Joe',
  age: 22,
};

console.log({
  ...user,
  location: 'LA',
  age: 35
});
```

* Will give us this output: `{name: "Joe", age: 22, location: "LA"}`

## override existing properties
* set add to 35

```js
console.log({
  ...user,
  location: 'LA',
  age: 35,
});
```

* `{name: "Joe", age: 35, location: "LA"}`

## This won't overwrite age
```js
console.log({
  age: 35,
  ...user,
  location: 'LA',
});
```

* Because age is set, then the object spread operator overwrites it

## Add to our code
* We want the user to have the ability to edit the expense
* And override description, note , amount or createdAt

`redux-expensify.js`

```js
// MORE CODE
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

// SET_TEXT_FILTER

// MORE CODE
store.dispatch(removeExpense({ id: expenseOne.expense.id }));
console.log(expenseOne);

store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));
// MORE CODE
```

## Comment out these lines
```js
store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// console.log(expenseOne);
```

* And this one:

```js
// const user = {
//   name: 'Joe',
//   age: 22,
// };
//
// console.log({
//   age: 35,
//   ...user,
//   location: 'LA',
// });
```

* Now in the console you will see the edit to our expense

![edit expense](https://i.imgur.com/JD6wqc7.png)

* The object spread operator gives us a simple way to create a new object from an existing one and from a set of updates

## We are finished with the expenses reducer

## Now let's focus on the filters reducer
```js
// MORE CODE

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});

// SORT_BY_DATE

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
};

// MORE CODE
store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter(''));
// MORE CODE
```

## Check the console
* Item 3 has filter of text set to `""`
* Item 4 has filter of text set to `rent`
* Item 5 (last) has text set back to nothing `""`

### Summary
* We now have the ability to change the text value of our filtering (using the object spread operator)
* Excellent tool that enables us to create new objects from existing ones

# Finish off filters reducer
## How to we change `SORT_BY`
* We will do that using the actions:
    - SORT_BY_DATE
    - SORT_BY_AMOUNT

`store.dispatch(sortByAmount());`

* We don't need to pass in any values in
* All we need to do is generate the actions object because it will be completely static
    - And then we'll dispatch it

```js
store.dispatch(sortByAmount()); // amount
store.dispatch(sortByDate()); // date
```

![sort by date and amount](https://i.imgur.com/fhGl3uY.png)

## Challenge
* Since date is the default, we will switch it over to amount to watch that change
* Then we'll switch it back to date 
* When `sortByAmount()` gets dispatched `sortBy` should be set to the string 'amount'
* When `sortByDate()` gets dispatched `sortBy` should be set to the string `date`
* Fill out the action generator functions and cases in the reducer
* Test to see the sortBy value change inside the console
* You will use the object spread operator

### And also complete the final reducers:
* SET_START_DATE
* SET_END_DATE

```js
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = new Date().getTime(),
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

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

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};

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
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate,
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  console.log(store.getState());
});

// const expenseOne = store.dispatch(
//   addExpense({ description: 'Rent', amount: 100 })
// );
// const expenseTwo = store.dispatch(
//   addExpense({ description: 'Coffee', amount: 300 })
// );

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
//
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));
//
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter(''));
//
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

store.dispatch(setStartDate(125));
store.dispatch(setStartDate());
store.dispatch(setEndDate(1250));
store.dispatch(setEndDate());

const demoState = {
  expenses: [
    {
      id: 'sdiaslowlike',
      description: 'January Rent',
      note: 'This was the final payment for that address',
      amount: 54500,
      createdAt: 0,
    },
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined,
  },
};
```

* We commented out all other dispatches just to easily see date dispatches
* For both sort and dates we set, them then clear them
* FOr dates you see the date then it is set to undefined

![dates](https://i.imgur.com/MPg63LM.png)

### Summary
* We have a complete redux store for our app
