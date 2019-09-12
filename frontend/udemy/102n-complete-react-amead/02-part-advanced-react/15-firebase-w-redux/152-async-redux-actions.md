# Async Redux Actions
* Now we'll add the firebase stuff into Redux
* CRUD

## C - Create
* We'll wireup the AddExpensePage
* When someone submits this form we:
    - dispatch a Redux action
    - It shows up for a moment
    - If you refresh the page, it's gone

### New workflow
1. Save the data to Firebase
2. Dispatch the action

### Where do we put our firebase code
* For the AddExpensePage example

`AddExpensePage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
  onSubmit = expense => {
    // use push
      // attach then callback
        // dispatch action
        // redirect
    this.props.addExpense(expense);
    this.props.history.push('/');
  };
// MORE CODE
```

## Questions
* We can import firebase into all of our components and do it that way
* Is that the best way?
* Do we need firebase inside our components?
* The answer is NO
* Our components do not need to have any communication with firebase
* They should not even know that firebase is our db of choice
* The components should be completely unaware of where the data is coming from and where it is going to

## What components care about
* The presentation of info
* And basic user interactions

## Extract, Extract, Extract
* We will extract firebase outside of all of our components
* We will change our actions

## Our app actions
* We don't want filters to be stored in firebase - it is all local config stuff
* Our expenses actions do need firebase
    - addExpense
    - removeExpense
    - editExpense

## 4 steps to action generators
1. component calls action generator
2. action generator returns **object**
3. component dispatches object
4. redux stores changes

### Tweak - 4 steps with asyc
1. components calls action generator
2. action generator returns **function**
3. component dispatches function (?)
    * **note** If you tried this right now it would fail
        - why? because redux does not let you dispatch functions
        - **workaround** - we will set up a module, a piece of redux middleware, it will add support for this behavior 
4. function runs (has the ability to dispatch other actions and do whatever it wants)
    * This is where we'll put our firebase 
        - we'll be able to do -- example -- use firebase push to add something to db
        - then we'll have the ability to dispatch another actions, a standard one that returns an object and that will manipulate the redux store

## redux-thunk
* [docs](https://github.com/gaearon/redux-thunk)
* Not much to this module
* Just adds support for dispatching functions
* To use it, we will need to make changes to our store

### install redux-thunk
`$ yarn add redux-thunk`

#### import redux thunk
`configureStore.js`

```js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';
// MORE CODE
```

### We could use `redux-thunk` like this:

`configureStore.js`

```js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
    }),
    applyMiddleware(thunk);
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
```

* applyMiddleware
    - lets you add middleware to your store
* But this would have us lose all the functionality from our developer tools
* To preserve that functionality we have to add more "confusing" code:

```js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// MORE CODE
```

* We add compose from redux and check if we are using redux dev tools or not

```js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// MORE CODE
```

* And now we'll wrap applyMiddleware inside composeEnhancers

```js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
```

## Now we're all set to create our first asynchronous action!
* In `firebase.js` comment out all code below:

`const database = firebase.database();`

* We will export `firebase` and the `db` variable
* Anyone who needs to use firebase can import this file
* We will export `database` as the default

`firebase.js`

```js
import * as firebase from 'firebase';

// MORE CODE

firebase.initializeApp(config);

// change for refresh
const database = firebase.database();

export { firebase, database as default };
```

## Now we are returning a function
* Before we were returning an object
* Redux doesn't let your return functions
* But using redux-rethunk, we can

`AddExpensePage.js`

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

* Now we need to make sure we dispatch `startAddExpense` as opposed to dispatching `addExpense`

## `AddExpensePage`
* We need to change `addExpense` in 4 locations and change it to `startAddExpense`

`AddExpensePage` (current)

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
  onSubmit = expense => {
    // use push
    // attach then callback
    // dispatch action
    // redirect
    this.props.addExpense(expense);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addExpense: expense => dispatch(addExpense(expense)),
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
```

`AddExpensePage` (new)

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
  onSubmit = expense => {
    // use push
    // attach then callback
    // dispatch action
    // redirect
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddExpense: expense => dispatch(startAddExpense(expense)),
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
```

## We are ready to test if it works
* Clear all data in DB
* Start server `$ yarn run dev-server`

### Test goals
* Expense should show up in browser (it was added to redux)
* Expense is showing up in firebase (firebase is working with redux)

### Takeaway
* By using redux thunk we can create asynchronous actions

1. They will do something first like a firebase data call
2. Then they will use dispatch to change the redux store

## Houston we have a problem
* We refresh the browser and lose our data
* Why? Isn't it saved in the DB?
* Yes but we only learned how to Create data from DB (C in Crud)

## Next - Read data from DB (R of CRUD)
* But first we need to test Async Redux Actions
