# ES6 Spread Operators in Reducers
* Makes it easier to work with arrays and objects

## Create Action Generators
```js
import { createStore, combineReducers } from 'redux';

// ADD_EXPENSE
// REMOVE_EXPENSE
// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE
```

### We need unique id's
* We'll use the npm library `uuid`
    - [docs](https://www.npmjs.com/package/uuid)
    - Enable us to create universally unique identifiers

`$ yarn add uuid` (shut down server first)

* Import it

```js
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
```

* Now we subscribe and dispatch

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
// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
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

store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
```

## What happens?
* How do we handle this when we are using combineReducers
* We may be tempted to do this:

```js
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      state.push(action.expense);
    default:
      return state;
  }
};
```

* But `state.push(action.expense)` is not good because it mutates state and that is a rule we don't want to break
* We don't want to change state or action, we just want to read off of them
    - `concat` is an array method that will let us do that
        + with `state.concat(action.expense)`
            * It takes the `state` array and combines it with the `action.expense` array and it returns a NEW array
                - It doesn't mutate the state at all

```js
// // MORE CODE
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return state.concat(action.expense);
    default:
      return state;
  }
};

// // MORE CODE
store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
// // MORE CODE
```

* This is the console output

![console output](https://i.imgur.com/LjT7oUZ.png)

* This works but we can do better using the ES6 spread operation

### ES6 spread operator
* Watch how we `change` an array

![change array with push](https://i.imgur.com/FTBLnAj.png)

* Concat doesn't change array

![concat no mutate](https://i.imgur.com/Mv1qLKQ.png)

* We can use the `spread operator` instead of concat

### Crazy new syntax (ES6 spread operator)
`[...names]`

* That means we add all of the items in names here
* That will give us an array that matches the previous one (3 items)

#### Add item onto spread operator
![add item on spread op](https://i.imgur.com/cH6gXcx.png)

* That adds an item but it doesn't mutate the underlying array
* Add before and after

![we can do this too](https://i.imgur.com/tRTP3wQ.png)

* So to apply this knowledge we can change this:

```js
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return state.concat(action.expense);
    default:
      return state;
  }
};
```

* To this:

```js
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    default:
      return state;
  }
};
```

* Add another item

```js
store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
store.dispatch(addExpense({ description: 'Coffee', amount: 400 })); // add this line
```

![another expense](https://i.imgur.com/GBki1sD.png)

* Coffee comes after rent because in our ES6 Spread operator we say `state` first then `action.expense`

```
switch (action.type) {
  case 'ADD_EXPENSE':
    return [...state, action.expense];
```

## Store them in variables
```js
const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 100 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: 'Coffee', amount: 400 })
);

console.log(expenseOne);
```

* That gives us:

```
expense: {id: "faa26976-81b1-48b5-8185-f9e4934d1bdb", description: "Rent", note: "", amount: 100, createdAt: 1515816423815}
```

* For Remove item Challenge we need the `id`
* state.filter() - doesn't mutate state
    - It returns a new array with a subset of values

```js
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => {
        return id !== action.id;
      });
    default:
      return state;
  }
};
// MORE CODE
```

* We set up REMOVE_EXPENSE case
    - When we see REMOVE_EXPENSE we want to return a new array
    - We use state.filter() to get a new array back
        + We could use `return filter((expense) => {`
        + But we can use destructuring (we only need the `id`) to make that
        + `return filter(({ id }) => {` 
        + filter will return true or false based on a condition
        + if the id is not equal to the action.id
            * if they are not equal `id !== action.id` will result in **true** (meaning the item will be kept)
            * if they are equal `id !== action.id` will result in **false** (meaning that expense was a match and it needs to be filterd out)

```js
case 'REMOVE_EXPENSE':
  return state.filter(({ id }) => {
    return id !== action.id;
  });
```

* Can be refactored to:

```
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
```

* Look in the console
* We go from 1 expense to 2 expenses and then (because of the REMOVE_EXPENSE) back down to 1 expense

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
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
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

const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 100 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: 'Coffee', amount: 400 })
);

store.dispatch(removeExpense({ id: expenseOne.expense.id }));
console.log(expenseOne);

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


