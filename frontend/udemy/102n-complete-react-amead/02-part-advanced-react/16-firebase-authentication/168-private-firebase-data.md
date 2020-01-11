# Private Firebase Data
* Each user will have own part of Database they can manage
  - Create that private space for data
* Rules from firebase will be used to secure it

## How our Database looks now
* In the root of the Database we have expenses
  - And inside that we have all of our expenses side-by-side
  - We now need to split up expenses by user

## Current Database structure

```
const db = {
  expenses: {
    sdfsjlfsdfs: {

    }
  }
}
```

* We will convert this structure to this:

```
const db = {
  users: {
    w382993: {
      expenses: {
        sdfsjlfsdfs: {

        }
      }
    }
  }
}
```

`users/uid/expenses` - will be path to get expenses for each user

### Let's make changes to `actions/expenses.js`
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

// MORE CODE
```

* This is where we write to the root ref `expenses`
* We want to switch that up and making use of the user id
  - Not just in `startAddExpenses` but in all of our async actions in this file

## Let's switch up the ref
* Modify this line:

`return database.ref('expenses')`

* And we'll update it to:

`.ref('users/someuid/expenses')`

## How will we get the user id (someuid)?
* To plugin to `someuid` above
* `thunk` actions get called with `dispatch`

`export const startAddExpense = (expenseData = {}) => dispatch => {`

* But they also get called with `getState()`
* We can call `getState()` to get the current state and here is how we can call it

`export const startAddExpense = (expenseData = {}) => (dispatch, getState) => {`

* And this is how we get the `uid`

`actions/expenses.js`

```
// MORE CODE
export const startAddExpense = (expenseData = {}) => (dispatch, getState) => {
  const uid = getState().auth.uid;
  const {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0,
  } = expenseData;
  const expense = { description, note, amount, createdAt };

  return database
    .ref(`users/${uid}/expenses`)
    // MORE CODE
```

* So `getState` with thunk gives us the current `state`
* And we can use `getState().auth.uid` to get the user `uid`
* Then we reference the `uid` using a template string

## Take it for a test spin
* If all works well and you run `$ npm run dev-server`
* It should create a new Database structure in firebase `users/someuserid/expenses`
* Login to your app
* Add an expense via `/create`
* Data will get added
* Check firebase Database

## Had an error adding expenses
* Change `AppRouter.js` from:

```
// MORE CODE

import { AddExpensePage } from '../components/AddExpensePage';
import { EditExpensePage } from '../components/EditExpensePage';

// MORE CODE
```

* To this:

```
// MORE CODE

import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';

// MORE CODE
```

* And now by changing from named exports to default exports we pass the startAddExpense to the `AddExpensePage` component
  - I temporarilly added this log statement to see what was happening when I submitted my new expense
    + In the previous code I did not have access to `startAddExpense` but after updating to default exports I did and now I can put the code back to the way it was

`AddExpensePage.js`

```
// MORE CODE

export class AddExpensePage extends Component {
  // (no-undef)
  // eslint-disable-next-line
  onSubmit = expense => {
    // use push
    // attach then callback
    // dispatch action
    // redirect
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  };

// MORE CODE
```

* Now add an expense

### Our new DB structure
![what the Firebase db looks like](https://i.imgur.com/SC830bV.png)

### Houston we have a problem
* Our other async actions won't work because they are not reading from the correct location
* Refresh the page to see what I'm talking about

#### Challenge
* Fix it inside `startSetExpenses`

```
// MORE CODE
export const startSetExpenses = () => (dispatch, getState) => {
    const { uid } = getState().auth;
    return database
      .ref(`users/${uid}/expenses`)
      .once('value')
      .then(snapshot => {
        const expenses = [];

        snapshot.forEach(childSnapshot => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });

        dispatch(setExpenses(expenses));
      });
  };
```

* Now we are reading from the correct location
* Above example we were writing to the correct location

## Make the same change for `startEditExpense`
```
// MORE CODE
export const startEditExpense = (id, updates) => ( dispatch, getState ) =>
  const { uid } = getState().auth;
  return database
    .ref(`users/${uid}/expenses/${id}`)
    .update(updates)
    .then(() => {
      dispatch(editExpense(id, updates));
    });
    // MORE CODE
```

## startRemoveExpense
```
export const startRemoveExpense = ({ id } = {}) => (dispatch, getState) => {
  const { uid } = getState().auth;
  return database
    .ref(`users/${uid}/expenses/${id}`)
    .remove()
    .then(() => {
      dispatch(removeExpense({ id }));
    });
};
```

## Take it for a test spin
* Edit an expense and make sure it works
* Check it out on Firebase Database
* Remove the expense and make sure it work on app and Firebase Database

## Update our test file
`expenses.test.js`

* We need to create a fake `uid`

```
// MORE CODE

const uid = 'thisismytestuid';
const mockStore = configureMockStore(middlewares);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done());
});

// MORE CODE

test('should remove expense from firebase', done => {
  const store = mockStore({ auth: { uid } });
  const { id } = expenses[2];

  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id,
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

// MORE CODE

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

// MORE CODE

test('should remove expense from firebase', done => {
  const store = mockStore({ auth: { uid } });
  const { id } = expenses[2];

  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id,
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

```


* Since we will be using this in more than one place we'll create a variable

`{ auth: { uid } }`

```
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses,
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const middlewares = [thunk];
const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const mockStore = configureMockStore(middlewares);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done());
});

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
  const action = addExpense(expenses[2]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2],
  });
});

test('should add expense to database and store', done => {
  const store = mockStore(defaultAuthState);
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

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test('should add expense with defaults to database and store', done => {
  const store = mockStore(defaultAuthState);
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

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
});

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

test('should fetch the expenses from firebase', done => {
  const store = mockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses,
    });
    done();
  });
});

test('should remove expense from firebase', done => {
  const store = mockStore(defaultAuthState);
  const { id } = expenses[2];

  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id,
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test('should edit expense from firebase', done => {
  const store = mockStore(defaultAuthState);
  const { id } = expenses[0];
  console.log(id);
  const updates = { amount: 21045 };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates,
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val().amount).toBe(updates.amount);
      done();
    });
});
```

## Take it for a test drive
* Shut down server
* Start test suite `$ npm test -- --watch`
* We failed because snapshots don't match
    - Not a problem and type `u` to update snapshot
* 72 tests pass

## Next - Lock down data
### Security and Rules - Firebase
* [link to security rules](https://firebase.google.com/docs/database/security/?authuser=0)
  - Same for all platforms
  - [secure user data](https://firebase.google.com/docs/database/security/user-security?authuser=0)

### Let's lock our site down!
* Make read and write false (Rules)

```
{
  "rules": {
    ".read": false,
    ".write": false
  }
}
```

* Now we'll allow people to read and write but only to specific parts of the db

```
{
  "rules": {
    ".read": false,
    ".write": false,
      "users": {
        "$user_id": {
          ".read": "$user_id === auth.uid",
          ".write": "$user_id === auth.uid"
        }
      }
  }
}
```

* `$user_id` is a dynamic value
* This is weird JavaScript "$user_id === auth.uid" but it is the way the people at firebase chose to do this but it just means that the user id must match the creator of the content in order to read or write on the db
* Make sure to click `Publish`

## Simulator
* Inside Firebase
* Click `Simulate`
* Click `set`

```
{
  "key": "value"
}
```

* Click run
* Will tell you "Simuated write denied"
* Click read
* Click run
* Will tell you "Simuated write denied"
* Now toggle the `Authenticate` button
  - Can I read from root `/`?
  - Click run
  - IT will deny the simulation and show you the rule viotated

![read auth denied](https://i.imgur.com/NeOo5hM.png)

* Same would happen to write

## But if you authenticate simlulator
* Paste this: `/users/3d041ceb-66b5-4c1e-a1ba-1d83317ou812`
  - But substitute your own user `id` from the UID field in Firebase
  - Click `run`
  - It will say 'Simulated write allowed'
  - You can also write to that user stuff
  - Plug in a different UID and you will get denied

## Takeaway
* Users can only work with data that they own

## Add/Commit/Push via Git
