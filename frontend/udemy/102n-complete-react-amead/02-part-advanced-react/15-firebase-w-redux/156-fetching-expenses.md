# Fetching Expenses
* Now we'll work on when the app refresh we show the existing expenses by reading them from the DB (aka **fetching** them)

## Create Test Data
`expenses.test.js`

```
const mockStore = configureMockStore(middlewares);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref('expenses')
    .set(expensesData)
    .then(() => done());
});

test('should setup remove expense action object', () => {
```

* We need to set up our test data
* We use the **life cycle** beforeEach() and this will be called before every test
    - This will write some data to firebase
* We set some data on firebase `database.ref('expenses').set({})`
    - We currently don't have that object created
    - It **needs** to be an object
    - We pass it a variable `expensesData`
        + We create that above `const expensesData = {};`
        + We will loop over the expenses array and add a new item onto expensesData for each one and we'll be able to set things successfully

```js
const expensesData = {};
expenses.forEach(({ id, description, note, amount, createdAt }) => {
  expensesData[id] = { description, note, amount, createdAt };
});
```

* We destructure all the properties
* What are we trying to do for each expense in that fixtures array?
    - We are trying to set something on `expensesData`
    - And we are trying to do that from the `id` variable
        + So we use the bracket syntax `expensesData[id]`
        + We are trying to set an object and we need description, note, amount, createdAt
            * We can pass all of them on using the ES6 Object definition shorthand

### Houston we have a problem!
* The forEach() will not wait for `database.ref()...` line to complete before it allows the test cases to run (this means some test cases may run before the data gets saved)
* **solution** ----> done
* This is working with Promises

```js
beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref('expenses')
    .set(expensesData)
    .then(() => done());
});
```

* Now we call this function and the function will call `done`
    - This will ensure that the beforeEach doesn't let the test case to run until firebase has synced up the data

## View this in real time
* shut down dev server
* start test suite
* `$ yarn test --watch`

### open firebase test DB
* You'll see Gum, Rent and Credit Card created inside the test DB
* Excellent... for every test case inside the `src/tests/fixtures/expenses.js` file, we should have the fixtures data created
* 1,2,3 are not related to the index (they are id's of 1,2 and 3)
* We also have an id that was generated and that was created from the test case

#### Why do we only see one item created?
* Our test cases render 2 items that should be in the DB
    - Our beforeEach() runs before each test case
    - So the first test case adds an item but when the next text case runs, the last test case is wiped away and we start from scratch
    - So every test case starts from the same place
        + **note** the final data you are viewing might now be a complete picture --- it just shows the last test case that changed the DB

### Using dummy data to test a real feature
* Open up `actions/expenses.js`

#### We are adding 2 new exports
* one that is the actual thing that changes the redux store
* and another one that will be the async action which is responsible for fetching data from firebase

`actions/expenses.js`

```js
// MORE CODE
// SET_EXPENSES
export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses,
});
```

`actions/expenses.test.js`

* remove commented out test case from before
* Add this test at the bottom

### Import it
```js
// MORE CODE
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses
} from '../../actions/expenses';
// MORE CODE

test('should setup set expense action object with data', () => {
  // this will not be async
  // simple test case
  // we just call that thing we just exported
  // and we look at what comes back
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses,
  });
});
```

* Now 11 test cases are passing

## Reducer time
* We have our action and our action test case in place
* Now we need to handle this action setExpenses inside the **reducer**

### Challenge
`tests/reducers/expenses.test.js`

```js
 // MORE CODE
 
 test('should set expenses', () => {

 });
```

* TODO
    - Dispatch an action just like we did for all the other test cases
    - you should expect
        + all of the expenses you passed in to be what is inside the state
        + And any that might exist to be gone

```
// MORE CODE
test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  }
});
```

* I grab one item off the expenses
* Now I want to call the reducer

```js
// MORE CODE
test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]],
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});
```

* I get my state back and I call expensesReducer and pass it all `expenses` and also pass in my `action`
    - We started off with all my expenses but what should come back is just the 1 expense [expenses[1]]
* And that is what this checks ---> `expect(state).toEqual([expenses[1]]);`
`reducers/expenses.js`

```
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'SET_EXPENSES':
      return action.expenses;
// MORE CODE
```

* The action object has expenses on it
* We just need to return that new array `return action.expenses`
* We are not dealing with what is in the `state`
    - We don't care about the previous expenses
    - This is just designed to set the expense array completely

### Check the test suite
* You should now have 18 passing test cases

### Next - Async stuff
* We need to set up our async action that goes and fetches data from firebase
* Then we have to use that async action somewhere in our app (or it will never run)
