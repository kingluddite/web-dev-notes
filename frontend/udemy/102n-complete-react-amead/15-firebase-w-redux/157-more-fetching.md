# More Fetching Expenses
## Challenge
* startSetExpenses
    - function will look similar to:

`actions/expenses.js`

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
// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});
```

* It returns a function
* We use firebase somewhere inside of it
* And at some point later on we dispatch

## We need to use this thing that doesn't exist
`app.js`

* We no longer use addExpense
* Swap it out for startSetExpenses

`app.js`

* Not sure where this was added but I never had these lines:
* `import { addExpense } from './actions/expenses`
* `import { setTextFilters } from './actions/filters'`
* `import { getVisibleExpenses } from './selectors/expenses`
* But now we change addExpense to startSetExpenses

```js
import 'react-dates/initialize';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import './styles/styles.scss';
import './firebase/firebase';
// MORE CODE
```

### Loading screen
* We will use startSetExpenses in this file
* We will render a loading message to the screen until we get the data from firebase
* Then we'll render the app

`app.js`

```
// MORE CODE

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('app'));
});
```

* We first render our loading screen
* Then we dispatch and call our startSetExpenses
    - `startSetExpenses` does not take any args
    - But it returns a Promise
        + on success, we'll render our app
* We dispatch the action we just imported
* Which is when we render our actual app

## Houston we have a problem
* If we run our server, our app will fail
* Because we are importing something that does not exist
* You need to create the startSetExpenses function

### run the server
`$ yarn run dev-server`

* You will see `Loading...` on screen
* In console you see startSetExpenses is not a function

## Todo list
1. uncomment export const startSetExpress
2. fetch all expense data once
3. parse that data into an array (see code snippet below)
4. Dispatch SET_EXPENSES
* If you do the above 4 steps, things should work in app
    - you will see date from development server showing up
    - you can create new data
    - refresh and still see data (it now persists because it is coming from the DB )
```
// database
//   .ref('expenses')
//   .once('value')
//   .then(snapshot => {
//     const expenses = [];
//
//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val(),
//       });
//     });
//
//     console.log(expenses);
//   });
```

* We create the array
* We iterate over the snapshot
* We add all the items in
* Then you need to dispatch

### Solution
`actions/expenses.js`

```
// MORE CODE
export const startSetExpenses = () => dispatch => database
      .ref('expenses')
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
```

* We uncomment
* And set it equal to a function
* The function doesn't need to take any arguments in (we are just fetching expences)
    - so we can return our function
    - and this function has access to dispatch
* Now we can do stuff with firebase
    - We need to fetch from firebase `database.ref('expenses')`
    - And from here we need to access a single time all the data stored at this location `.once('value').then` 
        + now we add on success case
            * what do I want to do when I get the data back?
            * I want to parse it
                - I get the snapshot but that doesn't give me what I want
                    + it gives me the object structure
                    + I need to convert it into an array structure
                    + I also add a return onto this database call which makes sure the Promise gets returned and that lets us have access to the `then()` used here (where we actually dispatch things)

`app.js`

```
// MORE CODE
store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('app'));
});
```

* We then create an empty array to hold all expenses
* We loop through the snapshot using `forEach()`
    - we have access to the childSnapshot
    - Then we push all the expenses on the array, the first thing we pass is an object
        + id: childSnapshot.key
            * then we want all the values so we use the spread operator
        + ...childSnapshot.val()
* Then when the forEach() is finished looping we have access to that `expenses` array
* Then we just dispatch `setExpenses`

## Save and test
* You should see the Loading... appears briefly and then loads our expenses from firebase
* Add an expense
* Should work as before
* Refresh page
    - You'll see loading
    - All our expense data is there!

## Let's add the test case
```
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses, // add this line
} from '../../actions/expenses';

// MORE CODE

test('should fetch the expenses from firebase', done => {
  const store = mockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses,
    });
    done();
  });
});
```

* We create a mock store
    - We don't need any data in the store
    - We need to dispatch `startSetExpenses` (import it up top)
    - Then we dispatch startSetExpenses
        + We append `then()` to wait for the data to be fetched
        + now we look at the fake actions
        + We are using async so we provide the `done` argument
            * this tells jest not to send a success or failure until done is called
            * Now we get the actions
            * there should just be one (that is the only one we care about)
            * we grab the first and only action
            * we expect it to be an object
                - that the type is SET_EXPENSES
                - and the actual expenses

## run the test 1 time
`$ yarn test`

* Should pass 64 tests

## Git stuff
* commit and deploy
* push to github and deploy to heroku
* make sure data shows up in live version of db

**note** If you move to a different computer, you'll have to push up in the terminal all the environment variables

**note** Your environment variables for testing and development are not on git so they won't be on github
You need to carry they arround with you as when you clone, they won't be there (maybe setup a file with all the keys but no values but instead value placeholders)

## Next - Removing an expense
