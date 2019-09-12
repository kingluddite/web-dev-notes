# More Async Redux Testing
## How do we get all actions dispatched to our mock store?
* redux-mock-store supports same API that regular redux store supports
* We are going to use .getActions()
    - Will return an array of all of the actions
        + actions[0]
        + actions[1]
        + ...
* Our app here is only returning 1 action so we can check for it with actions[0]

```
test('should add expense to database and store', done => {
  const store = mockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 5000,
    note: 'This is not an animal',
    createdAt: 1000,
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData,
      },
    });
    done();
  });
});
```

* Now we should have 61 passing tests
* We don't care about the id we just want to make sure it is a any string so we use expect.any(String)
* If we don't dispatch we'll now get an error that we were expecting a dipatch

```
  return database
    .ref('expenses')
    .push(expense)
    .then(ref => {
      // dispatch(
      //   addExpense({
      //     id: ref.key,
      //     ...expense,
      //   })
      // );
    });
};
```

* I comment the dispatch out to throw an error and show how we now need a dispatch to happen or we get an error
* Comment dispatch back in as we need it

## Now test firebase
* We just checked if the action was correctly dispatched
* We want to fetch data from firebase and see if it was saved in firebase
    - We will fetch by the `id` and try to grab that item

## We need access to the DB
* Import it:

`expenses.test.js`

```js
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase'; // add this line
// MORE CODE
```

`expenses.test.js`

```
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData,
      },
    });

    database
      .ref(`expenses/${actions[0].expense.id}`)
      .once('value')
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });
});
```

* We can use the id because we can access it through `actions`
* **once** - Listens for exactly one event of the specified event type, and then stops listening
* All 61 tests should pass

## Promise Chaining - A better way
* Currently we are using a lot of callback nesting
* It will get very nasty as you add more callbacks
* === callback hell

### Back to the playground
* comment in the import for  playground/promises in app.js
* stop test server
* run dev server `$ yarn run dev-server`
* view app in console
* Make sure you see logs
* comment in error
* You will see before after and then after 5 seconds the other data follows

### Review
* First promise we could return nothing
* Then the next callback will be called with nothing but it will fire
* We could also first return a value and then the callback will have access to the value
    - **note** But we could also return another Promise
    - If we return a Promise the next `then()` callback is that Promises success case

```
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'John',
      age: 22,
    });
    reject(new Error('bad news!'));
  }, 5000);
});
//
console.log('before');

promise
  .then(data => {
    console.log('1', data);

    return new Promise(resolve => {
      setTimeout(() => {
        resolve('this is my other promise');
      }, 5000);
    });
  })
  .then(str => {
    console.log('does this run?', str);
  })
  .catch(error => {
    console.log('error: ', error);
  });

console.log('after');
```

* Try that out in the browser
* We see how one Promise appears after 5 seconds and then another one returns after 10 seconds
* This is how we'll avoid nasty callbacks! (callback hell)

## Let's apply this knowlege to our code
* remove import to playground in app.js
* stop dev server
* run test suite `$ yarn test --watch`

## We will implement Promise chaining
* before

```
test('should add expense to database and store', done => {
  const store = mockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 5000,
    note: 'This is not an animal',
    createdAt: 1000,
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData,
      },
    });

    database
      .ref(`expenses/${actions[0].expense.id}`)
      .once('value')
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });
});
```

* after

```js
test('should add expense to database and store', done => {
  const store = mockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 5000,
    note: 'This is not an animal',
    createdAt: 1000,
  };

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });

      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});
```

* Now we have a working Promise chain
* We have the exact same test case but just easier to read through
    - We have 10 passing test cases

## Challenge
* Make test for defualts

`expense.test.js`

```
test('should add expense with defaults to database and store', done => {
  const store = mockStore({});
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
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
```

## Test DB
* We don't want to mess with our production DB
* We will set up a test DB
    - We will have 2 DBs
        + 1. Test DB
        + 2. Production DB


