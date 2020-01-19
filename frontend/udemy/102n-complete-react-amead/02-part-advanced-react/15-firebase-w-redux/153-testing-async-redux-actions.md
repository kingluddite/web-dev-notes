# Testing Async Redux Action (Part 1)
* We changed the AddExpense generator and the AddExpensePage component and that broke our tests
  - So we need to fix them

## Run our test
`$ npm test -- --watch`

`should handle onSubmit` is failing for AddExpensePage.test.js

`should setup add expense action object with default values` is failing 

`should setup add expense action object with provided values` failing

### AddExpensePage
* We changed our prop to `startAddExpense` so we will update our test
  - `startAddExpense` is not a function

#
```
import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import { expenses } from '../fixtures/expenses';

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
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[0]);
});
```

* All tests now pass for this component

## Starting code for `src/tests/actions/expenses.test.js`

```
import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'This was last months rent'
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('should setup add expense action object with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  });
});
```

## Fix `should setup add expense action object with default values` test
* The action generator will no longer be responsible for this test

`src/actions/expenses.js`

```
import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense,
});

// MORE CODE
```

* We will comment out this test:

`src/tests/actions/expenses.test.js`

```
// MORE CODE
// test('should setup add expense action object with default values', () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0,
//     },
//   });
// });
```

* We are going to use similar logic so we'll leave it in place
* The setting of defaults is not the responsibility of `startAddExpense` inside `src/actions/expenses.js`

## Now all we need is a single test case
`src/actions/expenses.js`

```
// MORE CODE

// ADD_EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense,
});

// MORE CODE
```

1. We pass in some dummy data
2. We expect it to be somewhere on that object
3. If it is, we are done

## So we'll tweak `expenses.test.js` to get that done
* Currently we are trying to pass expense data with no `id` in place

```
// MORE CODE

test('should setup add expense action object with provided values', () => {
  const expenseData = {
    // NO ID IN PLACE HERE!!!!
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'This was last months rent',
  };

// MORE CODE
```

* Firebase will be generating that `id` so everytime `addExpense` gets called we will expect an `id` to exist
* So instead of defining `expenseData` inside our test case we will just access one of our fixtures
  - We import it and then access it and expect it (see code below)

## Change this code:
```
// MORE CODE

test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'This was last months rent',
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

// MORE CODE
```

* To this code:

```
// MORE CODE

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2],
  });
});
```

* All tests should pass now
* We made our test simpler with just one (we really don't need two)
* Congrats! We have a complete passing test suite

## New tests
* This will be for the new asynchronous action generator
* We'll add 2 new test cases

`src/tests/actions/expenses.test.js`

```
// MORE CODE
test('should add expense to database and store', () => {
  //
});

test('should add expense with defaults to database and store', () => {
  //
});
```

* To accomplish these test we need to learn how to create a `mock store`
  - We are going to create a fake Redux store for testing purposes
  - This will allow us to make correct assertions

### What do we care about in this function?
`actions/expenses.js`

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
    })
    .catch(error => {
      console.log('could not add expense', error);
    });
};

// MORE CODE
```

#### We care about 2 things:
1. We care that the Database was successfully updated:

```
// MORE CODE

  database
    .ref('expenses')
    .push(expense)
    .then(ref => {

// MORE CODE
```

2. We care that the correct action was dispatched

```
// MORE CODE

      dispatch(
        addExpense({
          id: ref.key,
          ...expense,
        })
      );

// MORE CODE
```

* If those 2 things happy and we consider that a success
* So all we need to do is make assertions about those 2 things

## How do we figure out if an action was dispatched?
* It is not easy with the regular Redux store
* But luckily there is a test module for the Redux store that makes it super easy to mock if an action was dispatched

### redux-mock-store
* [git repo redux-mock-store](https://github.com/dmitry-zaets/redux-mock-store)

#### What does redux-mock-store do?
* A mock store for testing Redux async action creators and middleware
* (Thunk middleware for Redux)
* This is a simple library that lets you spin up a fake store, use it in your test cases and look at what actions were dispatched to it

#### Not a lot to redux-mock-store
1. We will create a mock store
2. Dispatch things to that store using `store.dispatch()`
3. We will use a method available to us `store.getActions()` (to get the actions back and actually assert that the correct ones were dispatched)

## Install redux-mock-store
`$ npm i redux-mock-store -D`

* Restart our test suite

## Integrate redux-mock-store into our test suite
* We will need to import `redux-mock-store`

`expenses.test.js`

```
import configureMockStore from 'redux-mock-store'; // ADD THIS LINE!
import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

// MORE CODE
```

### You are required to also import `thunk`
* If you are going to be using this mock store it also has to have the same middleware

`expenses.test.js`

```
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'; // ADD THIS LINE!
import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

// MORE CODE
```

## configureStore
* We need to use the configureStore function

### Do we have to create a mock store for every test?
* We could but it will be better to create one and use it in all the tests that need it
* So we won't actually create the mock store first we'll first create the configuration so we can allow the test cases to all create the same mock store
* We will have the `createMockStore()` function that we'll call in a little bit but we have to get that though by calling `configureMockStore`
  - When we call `configureMockStore()` we pass it an array of middlewares
    + We just are using `thunk` so we put that inside our array

`expenses.test.js`

```
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, editExpense, removeExpense } from '../../actions/expenses';
import { expenses } from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

// MORE CODE
```

## Now we can use createMockStore in any of our test cases that need it
* In our first `createMockStore()` we'll pass it an empty object
  - `createMockStore({})`

```
// MORE CODE

test('should add expense to database and store', () => {
  const store = createMockStore({});
});

// MORE CODE
```

* Now that we have this mock store and now we can actually use `store.dispatch()` on it to dispatch our asynchronous action

```
// MORE CODE

test('should add expense to database and store', () => {
  const store = createMockStore({});

  store.dispatch();
});

// MORE CODE
```

* Now we're going to dispatch something and what we're going to do is call our new asynchronous action `startAddExpense`
  - We'll need to import it first

```
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,

  // MORE CODE

  removeExpense,
} from '../../actions/expenses';

// MORE CODE
```

* And use `startAddExpense()`

```
// MORE CODE

test('should add expense to database and store', () => {
  const store = createMockStore({});

  store.dispatch(startAddExpense());
});

// MORE CODE
```

* **remember** `startAddExpense()` does take your data in, so we have to pass in those 4 attributes (description, amount, createdAt, note)
* We don't have any so we'll make them up
  - We can use any values except the default value of 0 for `createdAt`

#
```
// MORE CODE

test('should add expense to database and store', () => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'An important note',
    createdAt: 12343423,
  };
  store.dispatch(startAddExpense(expenseData));
});

// MORE CODE
```

* So the good news is our asynchronous action is going to run now but

## Houston we have a problem
* How do we do something when our asynchronous action is done running?
  - We do have asynchronous code now but we don't have any way to set up an asynchronous test case
  - The goal right now is to wait for everything to complete (to wait for the firebase call to actually finish)
  - Once all of our database call and dispatch happens from firebase and then and only then are we going to be ready to make our assertions
  - In order to do this we're going to need to use **Promise chaining**

## Promise Chaining
* We'll need to chain call on Promises

## Let's experiment with Promises
* We'll use our playground `promises.js` file

### Big Picture Goal
* To be able to do multiple things for a Promise

`promises.js`

```
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve({
    //   name: 'John Doe',
    //   age: 100,
    // });
    reject(new Error('Houston, we have a problem!'));
  }, 2000);
});

console.log('before');

promise
  .then(data => {
    console.log('1', data);
  })
  .catch(error => {
    console.log(error);
  });

console.log('after');
```

* If our Promise completes
  - We want to run all the stuff in this file (`expenses.js`) and also to all the stuff in this file `expenses.test.js`
  - And in our test case make assertions over whether everything went well

## Chaining Promises is Possible!
* From this:

```
// MORE CODE

promise
  .then(data => {
    console.log('1', data);
  })
  .catch(error => {
    console.log(error);
  });

// MORE CODE
```

* And add on our chained Promise

```
// MORE CODE

promise
  .then(data => {
    console.log('1', data);
  })
  .then(() => {
    // this is a chained Promise
    console.log('Will this run?'); 
  })
  .catch(error => {
    console.log(error);
  });


// MORE CODE
```

### How this works
1. The Promise will first need to resolve or reject
2. If it resolves the FIRST then callback will fire which will print `1` to the screen with the `data`
3. Then it will run the 2nd **chained** Promise
4. Log out (if the 2nd Promise also resolves) "Will this run too?"

#### We need to add this into our app
`app.js`

```
// MORE CODE

import './styles/styles.scss';
import './playground/promises';

// MORE CODE
```

## Troubleshooting node-sass
* When you upgrade node you will need to run this command

`$ npm rebuild node-sass`

### Run dev-server
`$ npm run dev-server`

* Our app runs but our console shows an error `Error: Houston, we have a problem! at promises.js:7`
* This is because of this:

`promises.js`

```
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve({
    //   name: 'John Doe',
    //   age: 100,
    // });
    reject(new Error('Houston, we have a problem!'));
  }, 2000);
});

console.log('before');

promise
  .then(data => {
    console.log('1', data);
  })
  .then(() => {
    // this is a chained Promise
    console.log('Will this run too?');
  })
  .catch(error => {
    console.log(error);
  });

console.log('after');
```

* Our Promise uses `reject()`
  - We see:
    + before
    + after
    + after 5 seconds we get our rejection

## Import! - When we reject from a Promise none of our success cases will be called

## But if we do resolve
* Let's change our code to reflect this:

```
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'John Doe',
      age: 100,
    });
    // reject(new Error('Houston, we have a problem!'));
  }, 2000);
});

console.log('before');

promise
  .then(data => {
    console.log('1', data);
  })
  .then(() => {
    // this is a chained Promise
    console.log('Will this run too?');
  })
  .catch(error => {
    console.log(error);
  });

console.log('after');
```

* Now when the code re-runs this is what happens!
  - before
  - after
  - 1 { name: "John Doe", age: 100}
  - Will this run too?

## So when our Promise does resolve our first then() will fire followed by our second then() firing

## How can we get our data from the first then() to the second "chained" `then()`
* We must return some data like this:

```
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'John Doe',
      age: 100,
    });
    // reject(new Error('Houston, we have a problem!'));
  }, 2000);
});

console.log('before');

promise
  .then(data => {
    console.log('1', data);

    return 'some data here';
  })
  .then(str => {
    // this is a chained Promise
    console.log(`Here is my data: ${str}`);
  })
  .catch(error => {
    console.log(error);
  });

console.log('after');
```

* Now you will see how we pass data from the first to 2nd chained Promise
  - Just make sure the 1st Promise returns something and "hand it off" to the next `then()` as an argument `then(my-arg)`

## How this helps us
* Using this core feature of Promises we'll be able to correctly run our assertions in our test file

## Remove our import to `promises.js` in `app.js`

## Big Question: In our tests, where do we attach `then()`?
* How do we attach then to anything?
* Remember what we just learned? In order to pass data from one Promise to another you need to `return` it and that's exactly what we'll do
  - We'll return our Promise that is making our Database call

* Make this code:

```
// MORE CODE

  const expense = { description, note, amount, createdAt };
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
    })
    .catch(error => {
      console.log('could not add expense', error);
    });
};

// MORE CODE
```

* And add a return like this:

```
// MORE CODE

  const expense = { description, note, amount, createdAt };
  return database // HERE IS WHERE WE ADD THE return
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

// MORE CODE
```

* Now all that stuff that gets returned from our Promise and when we do get it returned we'll be able to toss on another `then()`
  - We could type the `then()` inside of our `expenses.js` file
  - But by using `return` in the `expenses.js` file we can continue chaining on inside our test file `expenses.test.js`
* We save `expenses.js` (our only change was adding that `return`)

## Add the `then()` to our test case
* We'll intentionally fail our test by asserting `1` equals `2`

## Run your tests
`$ npm test -- --watch`

* It looks like we have a completely passing test suite

### I had an error
* I needed to revert one test back to where it was before (I went out of order and changed it)
* Make sure your test looks like this

`actions/expenses.test.js`

```
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

* Now all tests are passing

## Houston we have a problem
* We know we intentionally just failed a test but jest tells us all our tests are passing
* What is going on here?

## Major Important Node Here!!!
* When we are working with asynchronous test cases in Jest we need to explicitly tell Jest a given test is asynchronous
  - If we don't tell Jest our asynchronous code is asynchronous Jest will just go through the function and it will just wait for this function (see highlighted below) to return

![async code](https://i.imgur.com/OXmG0Db.png)

* If an error got thrown in the process - `Failure`
* If no error got thrown - `Success`
* The problem is this code (see below screenshot) doesn't run...

![then() code](https://i.imgur.com/OJsp0f2.png)

* Until long after this parent function has returned

![parent function](https://i.imgur.com/ChCOVCn.png)

* It is asynchronous
  - We have to wait for Firebase
  - We have to do all that stuff
  - Then and only then does our `then()` function on our test get called

## We need to force Jest to wait!
* And we need Jest to wait until a specific point in time
* And do to this we need to provide an argument here:

### Adding `done`
`actions/expenses.test.js`

```
// MORE CODE

// Look where we added "done"
test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'An important note',
    createdAt: 12343423,
  };
  store.dispatch(startAddExpense(expenseData)).then(() => {
    expect(1).toBe(2);
  });
});

// MORE CODE
```

* Now our test will no longer be a `success` or a `failure` until after we call **done**

### Here is where we call `done`
```
// MORE CODE

test('should add expense to database and store', done => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'An important note',
    createdAt: 12343423,
  };
  store.dispatch(startAddExpense(expenseData)).then(() => {
    expect(1).toBe(2);
    done();
  });
});

// MORE CODE
```

## And now our test finally fails!
* And we see it expects `1` and got `2`
* And if we make this change our test case will pass

```
// MORE CODE

test('should add expense to database and store', done => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'An important note',
    createdAt: 12343423,
  };
  store.dispatch(startAddExpense(expenseData)).then(() => {
    expect(1).toBe(1);
    done();
  });
});

// MORE CODE
```

* Our test case passes but it still waits for our async code to run and then runs our code

## Next
* Finish off this test case and another test case

## Recap
* We fixed test cases we broke from changing code
* We learned about `Promise` chaining allowing us to attach `then()` calls onto Promises from elsewhere in our code
  - We set up inside our test case a call to our Redux store to `return` a Promise and then we tossed `then()` on there
  - We attach our assertions
  - We call done()
  - And we're done making the assertion
