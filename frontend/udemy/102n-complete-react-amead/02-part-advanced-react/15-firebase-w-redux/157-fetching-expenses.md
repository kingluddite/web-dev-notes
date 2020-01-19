# Fetching Expenses
* We now will implement the ability to fetch our existing expenses as we "bootstrap the application" (this means when our app loads up we should see our existing expenses... currently we do not)
* Even if we refresh our browser we don't show the existing expenses by reading them from the DB (aka **fetching** them)
* Let's do that now

## Create Test Data
* Let's do some TDD (Test Driven Data)
* We want a few expenses that live up on Firebase so that our test, like the ones that verify were fetching expenses correctly, actually work
  - This will happen inside our `actions/expenses/test.js`
  - This is where we have our test cases that actually interact with Firebase
  - Now we'll add another test case that makes sure that we can fetch data
  - But before we do that we need that test data

## beforeEach()
* We used this "life cycle before" and we'll use this to write some data to Firebase
  - We grab our database target our `expenses` in this database and we'll use `set()` to set some data

`expenses.test.js`

```
// MORE CODE

const createMockStore = configureMockStore([thunk]);

beforeEach(() => {
  database.ref('expenses').set();
});

test('should setup remove expense action object', () => {

// MORE CODE
```

* Remember the set() needs to have an object passed to it
  - something like:

```
// MORE CODE

beforeEach(() => {
  database.ref('expenses').set({
    'sfsfsdf': 'swerwesd'
  });
});

// MORE CODE
```

* But this is not something that our expenses fixture data is store in
* So we'll need to do a little parsing first
  - We'll replace our object and reference a variable
  - And up above we'll define that variable and set it to an object
    + Now all we need to do is loop over the `expenses` array, add a new item onto `expensesData` for each one and then we'll be able to set things successfully
    + We'll be able to destructure the `id, description, note, amount, createdAt` 

```
// MORE CODE

beforeEach(() => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    // what are we trying to do for each expense in that fixture array?
    // we are trying to set something on `expensesData`
    //  we are trying to set the value from this "id" variable (and do do that we need to use the bracket syntax)
    // and what are we trying to set here?
    // We are trying to set an object and that object should have:
    //  description, note, amount, createdAt
  })
  database.ref('expenses').set(expensesData);
});

// MORE CODE
```

* Here is what we build to do all of what the comments above instruct us to do

```
// MORE CODE

beforeEach(() => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref('expenses').set(expensesData);
});

// MORE CODE
```

## Uh oh... Is this Asynchronous code? Houston we have a problem!
* `beforeEach()` will not wait for our call to `database.ref('expenses').set(expenseData)` complete before it allows the test cases to run
  - Which means that some test cases may run before the test data gets saved

## How can we fix this?
* We can use `done` again like we did before

```
// MORE CODE

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    // what are we trying to do for each expense in that fixture array?
    // we are trying to set something on `expensesData`
    //  we are trying to set the value from this "id" variable (and do do that we need to use the bracket syntax)
    // and what are we trying to set here?
    // We are trying to set an object and that object should have:
    //  description, note, amount, createdAt
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref('expenses')
    .set(expensesData)
    .then(() => done());
});

// MORE CODE
```

* Adding `done` like we did above will insure that `beforeEach()` doesn't let the test case run until after the call to Firebase has completed and synced up the data

## Now let's view this in real time
* Shut down the `dev-server` and start up the test suite

`$ npm test -- --watch`

![beforeEach working in real time](https://i.imgur.com/oJtb68w.png)

* We see 1, 2 and 3 which is from our fixture `expenses.js`

`fixtures/expenses.js`

```
import moment from 'moment';

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

* And if we expand Firebase you'll see it is in fact our fixture data

![our test fixture data in firebase](https://i.imgur.com/7U0W07Y.png)

* And that last record is generated from our test case for default info

`tests/actions/expenses.test.js`

```
// MORE CODE

test('should add expense with defaults to database and store', done => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0,
  };
  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        id: expect.any(String),
        ...expenseDefaults,
      });

      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseDefaults);

      done();
    });
});

// MORE CODE
```

## Here is a great question
* Why am I only seeing one item created by Firebase when we created 2 with our test cases
  - `should add expense to database and store`
  - `should add expense with defaults to database and store`
* The reason is our `beforeEach()` function runs BEFORE each test case
  - So this test case `should add expense to database and store` does add something to the Database but before the `should add expense with defaults to database and store` but that something gets wiped away and we start from scratch
* So every test case starts from same place which means the final data you are viewing in your test firebase Database might not be a complete picture of what happened, it only shows you how the last test case changed the Database

## Now we need to use this dummy data to test a real feature
* Let's open the actual file that contains the expenses (since we are working with its test file)
  - So open `actions/expenses.js` since we are going to be added code in here as well

`actions/expenses.js`

```
import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const startAddExpense = (expenseData = {}) => dispatch => {
  const {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0,
  } = expenseData;
  const expense = { description, note, amount, createdAt };

  return database
    .ref('expenses')
    .push(expense)
    .then(ref => {
      dispatch(
        addExpense({
          id: ref.key,
          ...expense,
        })
      );
    })
    .catch(error => {
      console.log('could not add expense', error);
    });
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});
```

## We'll add 2 new exports
* `SET_EXPENSES` - We'll add one export which will be the actual things that changes the Redux store
* And we'll add another one which will be our asynchronous action (which is responsible from actually fetching data from Firebase)

## SET_EXPENSES
* This will manipulate the Redux store in some way
* It will allow us to completely set that array value
  - We get the array back from Firebase
  - We set it
  - Then we're done
* We create 2 variables for each if the items we'll be exporting
  - `setExpenses`
  - `startSetExpenses`
    + This will be our asynchronous action that will actually fetch the data and eventually dispatch `setExpenses`

`actions/expenses.js`

```
// MORE CODE

// SET_EXPENSES
const setExpenses;

const startSetExpenses;
```

## Now let's export both
```
// MORE CODE

// SET_EXPENSES
export const setExpenses;

export const startSetExpenses;
```

* We set our variable to an arrow function
* We send some expenses in
* We return an object with a type and the data

```
// MORE CODE

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
})

export const startSetExpenses;
```

## Now let's add a test case to make sure we get the uniform structure back
* `should setup set expense action object with data`
* This will not be asynchronous test case (very simple)
* We simply call that thing we export and look at what comes back

`expenses.test.js`

```
 // MORE CODE

test('should setup set expense action object with data', () => {
  //
})
```
* We can't just grab it without adding it to our import our named exports from `expenses.js`

`expenses.test.js`

```
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses
} from '../../actions/expenses';

// MORE CODE
```

* And just like our other test cases we are going to be taking the action
* Getting it
* And just making an assertion about it

```
// MORE CODE
test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses,
  });
});
```

* **note** You will get an error if you try to export a `const` variable with no value
  - So we comment out `startSetExpenses`

```
// MORE CODE
// SET_EXPENSES
export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses,
});

// export const startSetExpenses; // we comment this out temporarily
```

## TODO - test fail on `"id": Any<String>`
* Here is the solution - It was because of a silly copy and paste error
* I had 2 tests in `expenses.test.js` that were very similar and when I copy and pasted I forgot to cut off the last bit of code

`expenses.test.js`

```
// MORE CODE

test('should add expense with defaults to database and store', done => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0,
  };
  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        id: expect.any(String),
        ...expenseDefaults,
      });

      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseDefaults);

      done();
    });
});

// MORE CODE
```

* And it should be this:

```
// MORE CODE

test('should add expense with defaults to database and store', done => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0,
  };

  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseDefaults,
        },
      });

      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseDefaults);

      done();
    });
});

// MORE CODE
```

* So at the end of the day I forgot to put my `id` and all values inside an `expense` property (silly mistake!)

* Now that we have our action in our test case passing it is time to handle this action `setExpenses` over inside our reducers
  - We'll need to open:
    + `reducers/expenses.js`
    + `tests/reducers/expenses.test.js`

`reducers/expenses.js`

* We'll need to add support for `setExpenses` in here

```
// Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // return state.concat(action.expense);
      return [...state, action.expense];
    case 'REMOVE_EXPENSE': {
      return state.filter(({ id }) => id !== action.id);
    }
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        }
        return expense;
      });
    default:
      return state;
  }
};

export default expensesReducer;
```

`tests/reducers/expenses.test.js`

```
import expensesReducer from '../../reducers/expenses';
import { expenses } from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove an expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[0].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1], expenses[2]]);
});

test('should not remove an expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '9',
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const expense = {
    id: '4',
    description: 'gas bill',
    note: '',
    amount: 2000,
    createdAt: 0,
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense,
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense', () => {
  const amount = 50123;
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      amount,
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state[1].amount).toBe(amount);
});

test('should not edit an expense if id not found', () => {
  const amount = 50123;
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      amount,
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
```

* Here is the starting point for the test

```
// MORE CODE
test('should set expenses', () => {
 // You will need to dispatch an action just like we did for all the test cases
 // And at end of the day you should expect all of the expenses you passed in to be what's inside of the state
  // And you should expect that might exist to be gone
  // You should have some inital ones (like the one we passed to the expenses reducer
  // And then you also have to define different ones for the action object to make sure those actually get set and those guys go away)
});
```

## Challenge Solution
* Add the new case into our reducer

`src/reducers/expenses.js`

```
// MORE CODE
    case 'SET_EXPENSES':
      return action.expenses;
    default:
      return state;
  }
};

export default expensesReducer;
```

* case 'SET_EXPENSES' - Which completely sets the expenses array
* **remember** The actions object has `expenses` on it and all we need to do is return that new array `action.expenses`
  - **note** We are not accounting for whatever is in the `state` as we do not care about the previous expenses, this one `SET_EXPENSES` is designed to set the expenses array completely

## Now we move over to the test case
* Inside of our test case we'll start off by actually defining my action object

```
const action = {
  type: 'SET_EXPENSES',
  expenses: [expenses[1]]
}
```

* We set our expenses to an array and inside we just pick one expense from inside the expenses array

### Now I want to call my reducer
* We'll set state equal to whatever is returned from our `expensesReducer(expenses, action)`
  - We get our state back
  - We call our reducer, and we call it with a different set of items (I'll pass in all my expenses) and I also pass in my action
  - **note** Now while I did start off with all of my expenses, I would expect that what comes back is just an array with just a single expense on it since that's what SET_EXPENSES should have done
* I expect the state will be equal to one item exactly what was defined above

```
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

## Save
* You should have a complete passing test suite

## Next
* We're not done with the feature yet
* We still need to set up our asynchronous action (the one that goes off and fetches data from Firebase)
  - And then once we have that asynchronous action we actually have to use it somewhere in our application or it well never even run

## TODO - still fix test fail with id <ANY> 
