# Testing Async Redux Actions
* Shut down server
* Start up test suite `Yarn test --watch`

## Houston we have a problem
* We are failing 3 tests across 2 test suites

### Fix tests
`AddExpensePage.test.js`

* should handle onSubmit

```
> 12 |     this.props.startAddExpense(expense);
      13 |     this.props.history.push('/');
      14 |   };
```

* We just need to change 5 places where `addExpense` is now `startAddExpense`

```
import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let startAddExpense;
let history;
let wrapper;

beforeEach(() => {
  startAddExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <AddExpensePage startAddExpense={startAddExpense} history={history} />
  );
});

test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});
```

* Now we only have 2 failing tests

## Fix tests for `actions/expenses.test.js`
```
import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
  // create a variable to store the returned action
  const action = removeExpense({ id: '123' });

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123',
  });
});

test('should setup editExpense action object', () => {
  const action = editExpense('123', { note: 'New note value' });

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123',
    updates: {
      note: 'New note value',
    },
  });
});

test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'Rent',
    amount: 10500,
    createdAt: 1000,
    note: 'my test note',
  };

  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String),
    },
  });
});

// test('should setup add expense action with default values', () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 123,
//     },
//   });
// });
```

* We comment out `should setup add expense action with default values` test because the setting of defaults is not the responsibility of `startAddExpense`
* We currently pass in an expense with no `id` but now we have have an `id` from firebase that we will pass in
* We won't define data inside this file anymore and we can just use our existing fixtures file (that we will import)

`expenses.test.js`

```
import { addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';

// MORE CODE

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2],
  });
});

// MORE CODE
```

* Now our broken tests are working again
* `w` + `a` to run all tests
* 59 passed
* Our testing code has gotten simpler and easier to read and understand

## Add new test cases for new asynchronous generator
```js
test('should add expense to database and store', () => {});

test('should add expense with defaults to database and store', () => {});

// test('should setup add expense action with default values', () => {
```

* To get this working we need to learn a few tricks
* How do we create a **mock store**?
    - We will create a fake redux store for testing purposes

`actions/expenses.js`

* What do we care about in this function?

```
// MORE CODE
export const startAddExpense = (expenseData = {}) => dispatch => {
  const {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0,
  } = expenseData;
  const expense = { description, note, amount, createdAt };
// MORE CODE
```

* We care that the database was successfully updated
* We care that the correct action was dispatched
* If those 2 things happen, we are happy and that is a success
* We just need to make assertions about those 2 things

## Houston we have a problem
* Figuring out if an action was dispatched is not easy with the regular redux store

### Solution - redux-mock-store
* [Link to github repo](https://github.com/arnaudbenard/redux-mock-store)
* There is a test module for the redux store that makes it super easy to mock
* This is a simple library that lets you spin up a fake store, use it inside your test cases and look at what actions were dispatched to it

### Install redux-mock-store
`$ yarn add redux-mock-store -D`

### How are we going to use redux-mock-store?
1. We will create a mock store
2. Dispatch things to it using `store.dispatch()`
3. We'll use store.getActions() to get the actions back and assert that the correct ones were dispatched

## Restart test suite
`$ yarn test --watch`

* Type `w` + `a` to view all tests

## Import redux-mock-store and redux-thunk
`expenses.test.js`

```js
import configureMockStore from 'redux-mock-store';
import thunk from redux-thunk;
import { addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
// MORE CODE
```

* No we'll create the configuration for the mock store
* This is great because it lets us call this over and over again in all our test cases
* This will enable all our test cases to create the same mock store

`expenses.test.js`

* I used the redux-mock-store docs to clean up the code

```js
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
```

* We also import the named export `startAddExpense`

```js
test('should add expense to database and store', () => {
  const store = mockStore({});

  const expenseData = {
    discription: 'Mouse',
    amount: 5000,
    note: 'This is not an animal',
    createdAt: 1000,
  };

  store.dispatch(startAddExpense(expenseData));
});
```

* At this point are async action will run

## Houston we have a problem
* How do we do something when it is done running?
    - We have async code
    - But we don't have a way to set up an async test case
        + our goal is to wait for everything to complete, wait for the firebase call to finish
        + Only when all that stuff is finished will we be ready to make our assertions

## Solution: Promise Chaining
* The ability to chain calls on Promises

### Test it out
`playground/promises.js`

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve({
    //   name: 'John',
    //   age: 22,
    // });
    reject(new Error('something bad happened'));
  }, 5000);
});
//
console.log('before');

promise
  .then(data => {
    console.log('1', data);
  })
  .then(() => {
    console.log('does this run?');
  })
  .catch(error => {
    console.log('error: ', error);
  });

console.log('after');
```

* Import it inside app.js

```js
// MORE CODE
import './firebase/firebase';
import './playground/promises';

const store = configureStore();

// MORE CODE
```

* Stop test server
* Run `$ yarn run dev-server`
* View chrome console

### What happens?
* We get before and after
* And then 5 seconds later we get our rejection
* When we reject from a Promise none of our success cases will be called
    - But if we do resolve (comment out reject)
    - No we get the 

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'John',
      age: 22,
    });
    // reject(new Error('bad news!'));
  }, 5000);
});
//
console.log('before');

promise
  .then(data => {
    console.log('1', data);

    return 'some data';
  })
  .then(str => {
    console.log('does this run?', str);
  })
  .catch(error => {
    console.log('error: ', error);
  });

console.log('after');
```

* Now after 5 seconds we see that we passed our string data to a child Promise that was chained
* Using this principle
* This core feature of Promises we will correctly able to run our assertions in the test file

## Remove import to `playground/promises` in app.js

## Houston we have a problem
* Where do we attach `then()`
* How do we attach then to anything

## Solution
* We need to return what we hav on this line:

```js
// MORE CODE
database
  .ref('expenses')
  .push(expense)
  .then(ref => {
    dispatch(
      addExpense({
        id: ref.key,
        ...expense,
      })
    );
  });
// MORE CODE
```

Add the return:

```js
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
      });
  };
```

* Now that we have a return we can attach a `then`
* By returning the Promise chain we can returning chain in `expenses.test.js`

```js
test('should add expense to database and store', () => {
  const store = mockStore({});
  const expenseData = {
    discription: 'Mouse',
    amount: 5000,
    note: 'This is not an animal',
    createdAt: 1000,
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    expect(1).toBe(2);
    // done()
  });
});
```

# Houston we have a problem
* We run the test and get no errors
* But we know we should get 1 error
    - expect 1 to be 2? that is false and should fail

## Why is this happening?
* When we are working with asyc tests in jest
* We need to tell jest that a test is async
* If not Jest will:
    - Go through our function and wait for an error to return
        + if it gets an error === failure
        + if no error === success
        + The problem is our dispatch code doesn't run until long after its parent function is returned

## How can we force jest to wait until a specific point in time? -----> done
* Now we pass done as an arg to our function and now won't decide success or failure until we call done:

```js
test('should add expense to database and store', done => {
  const store = mockStore({});
  const expenseData = {
    discription: 'Mouse',
    amount: 5000,
    note: 'This is not an animal',
    createdAt: 1000,
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    expect(1).toBe(2);
    done();
  });
});
```

* Now we get the error that 2 is not equal to 1


