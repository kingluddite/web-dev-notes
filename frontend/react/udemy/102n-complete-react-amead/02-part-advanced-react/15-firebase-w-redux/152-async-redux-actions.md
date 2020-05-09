# Async Redux Actions
* We will start integrating all the Firebase features into the Expensify app
* We have 4 base CRUD operations

## C - Create
* We'll wireup the AddExpensePage

### Currently our React/Redux app
* When someone submits this form we:
    - `dispatch` a Redux action
    - It shows up for a moment
    - If you refresh the page, it's gone forever
    - We need data persistence!

### Our New workflow will be:
1. Save the data to Firebase
2. Dispatch the action

* This will make sure the data gets saved and added to the Redux store
* So the UI can show the data in the list

### Where do we put our firebase code?
* We will use a `push()` call similar to this:

```
// MORE CODE

database.ref('expenses').push({
  description: 'neat',
  notes: '',
  amount: 12345,
  createdAt: 132343423,
});

// MORE CODE
```

* We know how to do this in Firebase but we have a more important question...

### Where do we add our Firebase code in our app?
* When we focus on creating new expenses and wiring that up we would add the Firebase code in the `AddExpensePage.js` file
* This is where we initialize the addExpense action so we might add our Firebase code here

#### First our current code looks like this
`AddExpensePage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

const AddExpensePage = ({ dispatch, history }) => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={expenseFormObject => {
        dispatch(addExpense(expenseFormObject));
        history.push('/');
      }}
    />
  </div>
);

AddExpensePage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

export default connect()(AddExpensePage);
```

## Clean up our code a little
* I'm going to pull out the onSubmit like this:
* TODO: Review where this code was updated before

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

export class AddExpensePage extends Component {
  onSubmit = expense => {
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

AddExpensePage.propTypes = {
  history: PropTypes.object,
  addExpense: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  addExpense: expense => dispatch(addExpense(expense)),
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
```

## Now here's where we could add Firebase code
* We would add it in our onSubmit
* We might psuedocode like this:

```
// MORE CODE

export class AddExpensePage extends Component {
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

* That would work fine but here is a question...

### Is this the best place to put our Firebase code?
* Do we want to put Firebase code in our components so they could communicate with Firebase?
* The answer is NO! Our components do not need to have any communication with Firebase
* **Important** Our components shouldn't even know that Firebase is our Database of choice
  - We should be able to swap out a different Database and not need to change code in our components
  - Our components should be unaware of where the data is coming from and where it is going - that's not part of the components "job"
  - Components should be Database agnostic

### What should a component be concerned with?
* The presentation of information
* And basic user interaction - i.e. Do something when someone clicks a form

### So we will extract all Firebase code OUTSIDE OF OUR COMPONENTS
* No Firebase code will be inside our component files

### Instead we will change our Actions
#### filters.js?
* We don't want to store any filter information to the Database - not necessary

#### expenses.js?
* Yes! We will add Firebase code to our expenses
* Expenses are what we want to persist across sessions

`src/actions/expenses.js`

```
import uuid from 'uuid';

// ADD_EXPENSE
export const addExpense = (
  { description = '', note = '', amount = 0, createdAt = 0 } = {}
) => ({
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

* In this file we can see we have actions for:
  - Adding expenses
  - Removing expenses
  - Editing expenses

## Time to tweak how our action generators work
### Recap of what we are already doing with our Action Generators
#### 4 steps of our Action generators
1. Component calls action generator
2. Action generator returns object (on of our objects in the above file or one of the ones in the filters.js file)
3. Component dispatches object
4. Redux stores changes

* Above is what is already happening in our app
* But with asynchronous actions the above will change and look a slightly different (a little more complex)

#### 4 NEW steps of our Action Generators using asynchronous actions
1. Components calls action generator (same as before)
2. Action generator returns function (new step!)
  * So our action generator is no longer returning an `object` and instead it will return a `function`
3. Component dispatches function (new step!)
  * So instead of dispatching an object like we did previously we will now be dispatching a function
  * **IMPORTANT NOTE** If we tried to do this right now it would **fail!** Redux by default DOES NOT ALLOW YOU TO DISPATCH **FUNCTIONS** 
  * To get it to work we will have to set up a module (it is a piece of Redux middleware that will add support for this behavior)
4. Function runs (has the ability to dispatch other actions and do whatever it wants) (new step!)
  * So when we do dispatch that function Redux internally is going to execute the function and this will allow the function to do whatever it wants (and this is where we'll put our Firebase code)
    - We'll be able to use something like `firebase.push()` to add something to the Database then we'll have the ability to dispatch another action, a standard one that returns an object and that will manipulate the Redux store

## redux-thunk
* This is the new tool we need to add to get over the Redux limitation of only dispatching objects and with redux-thunk we'll now be able to dispatch functions
* [docs for redux-thunk](https://github.com/reduxjs/redux-thunk)
* Not really a lot to this tool - it just lets us dispatch functions in Redux

### How can we use redux-thunk?
1. Install it `$ npm i redux-thunk`
2. Make changes to our Redux store (`configureStore.js`)

#### Install redux-thunk
`$ npm i redux-thunk`

#### Makes changes to our Redux store
* These changes get a little wonky because we are using the Redux devtools extension
* Our current file

`src/store/configureStore.js`

```
import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
```

* We will make the following changes
  - `applyMiddleware` - just lets you add middleware to your store
  - We'll import a default export called `thunk` (call it whatever you want but common to name it thunk)

`configureStore.js`

```
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

// MORE CODE
```

## Now we need to use applyMiddleware to apply the thunk middleware
* If we weren't using the Redux dev tools this would be fairly straight forward

### If we weren't using the Redux dev tools we could do this:
`configureStore.js`

```
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

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

* But if we did that and were using the Redux dev tools we will lose all of the functionality from the Redux developer tools

## How can we use thunk and preserve our Redux dev tools?
* We need to add a little more code that makes thinks slightly more confusing
* We do a check to see if we are using devtools or just compose

```
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

## Articles explaining why we used this:
* [redux devtools github](https://github.com/zalmoxisus/redux-devtools-extension#2-use-with-redux)
* [a more complex setup with thunk and other middleware](https://medium.com/@e_himmelfarb/implement-redux-devtools-extension-with-thunk-and-other-async-middleware-20e97100b2b0)

## Now let's create our very first asynchronous action
* Let's tweak our firebase.js file
* Currently we are not exporting any code from this file
* But we now need to export some stuff
* Comment out all our firebase experiment code like this to start:

`firebase.js`

* I am going to move the firebase experiment code to a new file

`playground/firebase-experiment-code.js`

```
// database.ref('notes').push({
//   title: 'notes title 2',
//   body: 'notes body 2 content',
// });
// const firebaseNotes = {
//   notes: {
//     aasdfkljas: {
//       title: 'note 1',
//       body: 'note 1 content',
//     },
//     adkdsf83: {
//       title: 'note 2',
//       body: 'note 2 content',
//     },
//   },
// };

// // child_removed
// database.ref('expenses').on('child_removed', snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });
// database.ref('expenses').on('child_changed', snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });
// database.ref('expenses').on('child_added', snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').push({
//   description: 'neat',
//   notes: '',
//   amount: 12345,
//   createdAt: 132343423,
// });
// database.ref('expenses').on(
//   'value',
//   snapshot => {
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
//   },
//   error => {
//     console.log('error', error);
//   }
// );
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
//   })
//   .catch(e => {
//     console.log('error', e);
//   });

// database.ref('expenses').push({
//   description: 'monthly utility bill',
//   notes: '',
//   amount: 1000,
//   createdAt: 15000,
// });
// database.ref('notes/-LuRNeG5WivZDvm2t33W').remove();

//
// const notes = [
//   {
//     id: '12',
//     title: 'my first note',
//     body: 'The content of my first note',
//   },
//   {
//     id: '12abe2',
//     title: 'my second note',
//     body: 'The content of my second note',
//   },
// ];
//
// database.ref('notes').set(notes);
// // database.ref().on(
// //   'value',
// //   snapshot => {
// //     const val = snapshot.val();
// //     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// //   },
// //   error => {
// //     console.log('Error with data fetching', error);
// //   }
// // );
// //
// // setTimeout(() => {
// //   database
// //     .ref()
// //     .update({
// //       name: 'Jane Doe',
// //       'job/title': 'Janitor',
// //       'job/company': 'McDonalds',
// //     })
// //     .then(() => {
// //       console.log('User info successfully updated');
// //     })
// //     .catch(error => {
// //       console.log('Error updating user data', error);
// //     });
// // }, 3000);
// // // const onValueChange = database.ref().on(
// // //   'value',
// // //   snapshot => {
// // //     console.log(snapshot.val());
// // //   },
// // //   error => {
// // //     console.log('Error with data fetching', error);
// // //   }
// // // );
// // //
// // // setTimeout(() => {
// // //   database.ref('age').set(10);
// // // }, 3000);
// // //
// // // setTimeout(() => {
// // //   database.ref().off('value', onValueChange);
// // // }, 6000);
// // //
// // // setTimeout(() => {
// // //   database.ref('age').set(30);
// // // }, 9000);
// // // // database.ref().on()
// // // //   .then(snapshot => {
// // // //     const val = snapshot.val();
// // // //     console.log(val);
// // // //   })
// // // //   .catch(e => {
// // // //     console.log('failed fetch', e);
// // // //   });
// // // database
// // //   .ref()
// // //   .set({
// // //     name: 'John Doe',
// // //     age: 40,
// // //     stressLevel: 7,
// // //     job: {
// // //       title: 'CFO',
// // //       company: 'Atari',
// // //     },
// // //     location: {
// // //       city: 'LA',
// // //       country: 'US',
// // //     },
// // //   })
// // //   .then(() => {
// // //     console.log('Data is saved');
// // //   })
// // //   .catch(error => {
// // //     console.log('This failed!!', error);
// // //   });
// // //
// // // // database
// // // //   .ref()
// // // //   .update({
// // // //     stressLevel: 9,
// // // //     'job/company': 'Wells Fargo',
// // // //     'location/city': 'San Diego',
// // // //   })
// // // //   .then(() => {
// // // //     console.log('update worked');
// // // //   })
// // // //   .catch(e => {
// // // //     console.log('update failed because of', e);
// // // //   });
```

## Our starting firebase code

`firebase.js`

```
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  // MORE CODE
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
```

## Export firebase and database variable
* This will allow anyone who needs to use firebase or the database they can import it and use it

`firebase.js`

```
// MORE CODE
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };
```

## Adding something new in actions/expenses.js
* addExpense will have an object dispatched, this will actually change the Redux store
* Our new code `startAddExpense` will start this process off
  - `startAddExpense` will actually dispatch `addExpense` inside the function we will now set up (and that's what's going to keep changing the Redux store)
  - Our function is nothing new it is just what returns the thing getting dispatched
    + In the past, like with addExpense we always returned objects:

`actions/expenses.js`

* Look at the 3 places we are returning objects

![here we return an object](https://i.imgur.com/YjSnqem.png)

![here we return an object](https://i.imgur.com/PC1XbWV.png)

![here we return an object](https://i.imgur.com/D2WSDRi.png)

## But now we will return a function

`actions/expenses.js`

```
// MORE CODE

export const startAddExpense = () => {
  return () => {
    //
  }
}

// MORE CODE
```

* This is the function that will work now after we set up the middleware for Redux thunk
  - **remember** Without `thunk` by default returning a function with Redux would not work
  - This function will get called internally by Redux
  - And it gets called with `dispatch`

#
```
// MORE CODE

export const startAddExpense = () => {
  return (dispatch) => {
    //
  }
}

// MORE CODE
```

* Above just gives us access to dispatch so we can use it inside our function and we can use it after we get done doing whatever we are doing
  - In our case we're going to be:
    1. Writing some data to firebase
    2. Waiting for that data to correctly sync
    3. Then we use `dispatch` to dispatch `addExpense` which will dispatch an object which will make sure that the Redux store reflects those changes as well

## Since we are saving to firebase right here:
```
// MORE CODE

export const startAddExpense = () => {
  return (dispatch) => {
    // saving to firebase right here!
  }
}

// MORE CODE
```

* This means we need to restructure this guy:

```
// MORE CODE

export const addExpense = (
  { description = '', note = '', amount = 0, createdAt = 0 } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// MORE CODE
```

* We need to move the defaults down below
* We could do this:

```
// MORE CODE

export const startAddExpense = (
  { description = '', note = '', amount = 0, createdAt = 0 } = {}
) => dispatch => {
  //
};

// MORE CODE
```

* But let's do the same thing with an alternate syntax (just to show you how you might see it written differently)

```
// MORE CODE

export const startAddExpense = (expenseData = {}) => dispatch => {
  const {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0,
  } = expenseData;
};

// MORE CODE
```

* The latter syntax is easier to read so we'll use that
* Now that we're setting up the defaults in startAddExpress we can make addExpense more simple (we'll do that in a moment)

## Now let's save some data
* We access the database and use `push()` to save the data
* We need to import the `database` (**remember** we set it up as the default export)
* We will create an object that holds our expense properties and pass it into push
  - We store it inside a variable to make the code cleaner and easier to read

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
  database.ref('expenses').push(expense).then(() => {
   // need to dispatch
  }).catch((error) => {
    console.log('could not add expense', error);
  });
};

// MORE CODE
```

## But there is now an important step left
* We have to dispatch the action from up above
* If we don't do this the Redux store will never change

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
  database.ref('expenses').push(expense).then(() => {
   // need to dispatch
    dispatch(addExpense());
  }).catch((error) => {
    console.log('could not add expense', error);
  });
};

// MORE CODE
```

* But we need to change something important because our addExpense is using an id generated by `uuid` and now we will use an id generated by firebase
* We can simplify the defaults in addExpense because we have set them in startAddExpense and no longer need them in `addExpense` and we will just pass it our expense object like this:

```
// MORE CODE

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// MORE CODE
```

* Now we can just pass the `expense` through like this and we can remove uuid's import as we are no longer using it

```
// MORE CODE

import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense,
});

// MORE CODE
```

* This will break test cases and so we'll fix that later when we work on tests

## How are we going to add the expense id?
* The good news is the `then()` callback success case for `push()` gets called with the `reference`
  - This means we can access that `ref` here:

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
    .then((ref) => { // we are accessing ref here!
      // need to dispatch
      dispatch(addExpense());
    })
    .catch(error => {
      console.log('could not add expense', error);
    });
};

// MORE CODE
```

* We define the object
* Now we can get the id using `ref.key`
* Then we attach all the properties of expense by using the JavaScript spread operator

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

## Now one last step
* We need to make sure we dispatch `startAddExpense` as opposed to dispatching `addExpense` in `AddExpensePage.js`
* We change addExpense with startAddExpense in several places in the following file:

`AddExpensePage.js`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

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

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

AddExpensePage.propTypes = {
  history: PropTypes.object,
  startAddExpense: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  startAddExpense: expense => dispatch(startAddExpense(expense)),
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
```

## Now let's try it out
* Clear all data in firebase Database to make sure everything works as it should
* Run dev-server `$ npm run dev-server`

### What we expect to happen
* When our app is running in the browser
* We will create an expense
* We hope to see the expense created in the browser (this means it was added to Redux)
* We also expect to see the expense show up in Firebase
  - We expect to see the id randomly created
  - We add another expense and see the list of expenses building in Firebase
  - Click create expense button to take us to `http://localhost:8080/create`
* Create 2 expenses

## It works!
* By using Redux Thunk we'll be able to create asynchronous actions
  - They'll do something first, something asynchronous, like a firebase Database call
  - Then they'll use dispatch to change the Redux store
* Now we just completed the C in CRUD (Create)

### Problems
* If you refresh the browser window you will lose the data
* The problem is we are not yet reading from firebase to update our data
  - We will tackle reading from Firebase soon

## Next - Update tests
* We want to test the code we just wrote
* We want to make sure we test that everything we expect to happen actually happens
* We need to update test cases for things that we changed
  - We changed addExpense so we have some breaking changes we have to change there
  - And we also changed addExpensePage so we'll also need to update changes for that test case as well 
