# Testing Asynchronous Redux Actions (Part 2)
* We need to finish off our test cases
* Our test case we are currently working on will make sure `startAddExpense` works

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

## Two things we want to verify
1. That data was saved to the Database

```
// MORE CODE

  return database
    .ref('expenses')
    .push(expense)
    .then(ref => {
    
    // MORE CODE

};

// MORE CODE
```

2. And that we dispatched the correct action

```
// MORE CODE

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

## How are we going to get all our actions dispatched to our mock store?
* We need to use the `redux-mock-store` docs to figure out how to do this
* **note** redux-mock-store supports the same API that your regular Redux store supports
  - [redux-mock-store notes](https://github.com/dmitry-zaets/redux-mock-store)
    + **note** This is a newer version of these docs
    + Examine the API section of these docs and you see
      * We have the ability to `dispatch`
        `store.dispatch(action) => action`
      * We can get the state
        - `store.getState() => state: Object`
      * We also have the ability to get actions and clear actions
        - `store.getActions() => actions: Array`
          + We will be using `getActions()` to get all of the actions that were dispatched to this mock store
          + Then we can make assertions about them and see if what comes back is what we expected
        - `store.clearActions()`

### Let's get all the actions
`actions/expenses.test.js`

* The following will return an array of all of the actions
  - actions[0] would be the first action
  - actions[1] would be the second action
  - actions[3] would be the ... you get the idea

```
// MORE CODE

test('should add expense to database and store', done => {
  const store = createMockStore({});
  
  // MORE CODE

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions(); // Add this line
    done();
  });
});

// MORE CODE
```

* In our case we only really expect 1 action to be dispatched

1. We create the mockstore with `const store = createMockStore({})`
2. We dispatch here `store.dispatch(startAddExpense(expenseData)).`
3. And if we follow the chain of events the actual object that gets dispatched happens here:
  * Since this is the only time we'll be changing the store we only will expect the first action to show up `actions[0]`

```
// MORE CODE

export const startAddExpense = (expenseData = {}) => dispatch => {
  // MORE CODE

  return database

    // MORE CODE

      dispatch(
        addExpense({
          id: ref.key,
          ...expense,
        })
      );
    })

    // MORE CODE
};

// MORE CODE
```

* We will expect that `actions[0]` will equal the this action object

```
{
  type: 'ADD_EXPENSE',
  expense: {
    id: expect.any(String),
    ...expenseData
  }
}
```

* We use the `expect()` library to check for any string (we don't care what the value is)
  - The `String` is the string constructor function
  - We spread out our expenseData using the ES6 spread operator

#
```
// MORE CODE

test('should add expense to database and store', done => {
  const store = createMockStore({});

  // MORE CODE

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

// MORE CODE
```

* Now our very first assertion is all wrapped up

## Run test again
* Click `w` + `a` to run entire test suite again
* All tests pass
  - If things went wrong along the way things would fail
  - Let's comment out our dispatch

```
// MORE CODE

export const startAddExpense = (expenseData = {}) => dispatch => {
  // MORE CODE

  return database
    .ref('expenses')
    .push(expense)
    .then(ref => {
      dispatch(
        // addExpense({
        //   id: ref.key,
        //   ...expense,
        // })
      );
    })
    .catch(error => {
      console.log('could not add expense', error);
    });
};

// MORE CODE
```

* Now we expected that object but we just commented it out so we failed our test

![failed test](https://i.imgur.com/z75z90Y.png)

* Comment our code back in and the test passes again
* **CAUTION** When I commented my code out the `dispatch()` closed and when I put the code back in I put the call to `addExpense()` with the object inside ouside of `dispatch()` and my test failed because it was expecting and object and it was never dispatched!
  - Once fixed the code passed

## How can we add on another assertion
* So far we only worked with only 1 assertion
* How can we add more?

1. We just checked if the action was correctly dispatching (it was)
2. Now we need to fetch data from Firebase and see if it was actually saved over there
  * We will try to fetch by `id` and actually grab that item
  * To do this we'll need access to the Database
  * So make sure to import firebase

`actions/expenses.js`

```
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase'; // ADD THIS LINE!

// MORE CODE

const createMockStore = configureMockStore([thunk]);

// MORE CODE
```

* Now that we have the database we can actually query it and make sure the data was stored in the right location
* We will use `database.ref()` but we need to figure out how we will get the individual expense
  - We can use a ES6 template string to grab the actual `id` from firebase
    + We just need the value a single time so we'll use firebase's `once('value')`
    + We will grab the `snapshot` and when we do get the snapshot we'll have to covert it over to just a regular value and make an assertion about it

#
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
      });
    done(); // WRONG PLACE HERE!
  });
});

// MORE CODE
```

* But remember our Database code will be asynchronous so if we want for our Database code to complete too, we need to move our `done()` to the end of that Database code

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

        done(); // THIS IS MOVED TO RIGHT SPOT!
      });
  });
});

// MORE CODE
```

1. Now we are going to wait for the first Promise to complete (our dispatch)
2. We are going to make an assertion about the action
3. Then we start the Database process
4. Then we make an assertion about that as well

## Save and verify all tests are passing!
* If you are ever unsure if everything is actually passing
* Use `w` + `a` to run all tests again

## 61 Passing tests!

## Refactor our code
### Callback hell! (aka Callback nesting)
```
// MORE CODE

    database
      .ref(`expenses/${actions[0].expense.id}`)
      .once('value')
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);

        done();
      });

// MORE CODE
```

* The above code will even get more nasty as we add more and more callbacks
* We can avoid this with `Promise Chaining`

## Let's revisit our file
`playground/promises.js`

* You need to add an import in `app.js` to make this work

`app.js`

```
// MORE CODE

import './styles/styles.scss';
import './playground/promises'; // add this line!

// MORE CODE
```

* And stop the tests and run the dev server

`$ npm run dev-server`

* Look at browser
* And see the before, after and 5 seconds and then the data

## We already talk about how we could return nothing so this:
```
// MORE CODE

promise
  .then(data => {
    console.log('1', data);

    return 'some data here';
  })
  .then(str => {
    // this is a chained Promise
    console.log(`Here is my data: ${str}`);
  })

// MORE CODE
```

* If we call nothing it becomes:

```
// MORE CODE

promise
  .then(data => {
    console.log('1', data);

    // return 'some data here';
  })
  .then(() => {
    // this is a chained Promise
    console.log('next then called with no data');
  })
  .catch(error => {
    console.log(error);
  });

// MORE CODE
```

* But we could return a value then the next then() has access to that value

```
// MORE CODE

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

// MORE CODE
```

## But we can also return another Promise!
* If we return a Promise the next `then()` callback is that Promises' success case
* Let's mess around with that now
* Copy this Promise (highlighted)

![Promise](https://i.imgur.com/QaBCrZx.png)

* And we'll paste it in our return like this
  - This is how we return another Promise

#
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

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          name: 'John Doe',
          age: 100,
        });
        // reject(new Error('Houston, we have a problem!'));
      }, 2000);
    });
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

* Now we have chained 2 Promises!
* But Instead of resolving the same object we'll resolve a simple string
* We also remove the Chained Promises commented out `reject()`

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

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('This is my 2nd "chained" Promise!');
      }, 2000);
    });
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

* The highlighted code is the success case for the Promise that gets returned above
* **IMPORTANT** And the `return` word before this Promise is important (If I don't include the following `then()` will not be the success case for that Promise) and if I do include the `return` before `new Promise` the `then()` WILL ONLY RUN when that Promise actually resolves
* In our case, when it resolves we take the string and print it to the screen

![nested Promise](https://i.imgur.com/aXULEb2.png)

* Here our our chained Promises working/resolving and passing data

![chained Promises working](https://i.imgur.com/GVohfcs.png)

* I will bump my setTimeout to be 5000 milliseconds (5 seconds)

```
// MORE CODE

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'John Doe',
      age: 100,
    });
    // reject(new Error('Houston, we have a problem!'));
  }, 5000);
});

console.log('before');

promise
  .then(data => {
    console.log('1', data);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('This is my 2nd "chained" Promise!');
      }, 5000);
    });
  })
  .then(str => {
    // this is a chained Promise
    console.log(`Here is my data: ${str}`);
  })
  .catch(error => {
    console.log(error);
  });

console.log('after');

// MORE CODE
```

1. We get before
2. We get after
3. 5 seconds goes by
4. We resolve and show the data object
5. 5 seconds goes by
6. We resolve our string

### Why did we just learn this?
* Being able to return Promises and chain on like we did here will allow us to reduce the need for our nested callbacks (callback hell)

## Let's integrate this technique into our code
* Remove the `promises.js` import as we are done playing around with it
* Shut down the dev-server
* Start up the test suite

`$ npm test -- --watch`

* Now we will integrate Promise chaining
* We are going to return a function from this Promise (the highlight shows where it starts and ends)

![our function](https://i.imgur.com/fCP0g8Y.png)

* We need to cut the `then()` off of our database call

![database call then()](https://i.imgur.com/TavIgon.png)

* And add a `return` on the beginning

`return database.ref(`expenses/${actions[0].expense.id}`).once('value');`

* Now we are returning a Promise and we can attach things on by attaching `then()` like this:

```
test('should add expense to database and store', done => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'An important note',
    createdAt: 12343423,
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

* We have the exact same test case but it is now just a little easier to read through and parse
* All are tests are still passing

## Challenge
* Complete the 2nd test case
* Start by cloning all the contents inside of the test we just completed
* Here is our starting point

```
// MORE CODE

test('should add expense with defaults to database and store', done => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'An important note',
    createdAt: 12343423,
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

// MORE CODE
```

* `done` was set up to make sure we let Jest know we are performing an asynchronous test
* This test will obviously pass
  - But we want to change things up:
    + Instead of passing in `expenses` with real data, pass in an Empty object making sure all the defaults are set
    + Then assert all those defaults show up in our first assertion and the second assertion
      * If you forget what the defaults are, refer to the `src/actions/expenses.js` file where we defined them

## Solution
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

* Our tests all pass
* We have a complete test suite for our first async action
* We have one of our 4 CRUD operations in place

## Next
* When we run these test cases we are writing to the real Database
* Open up Firebase and you will see all our test data is showing up inside our Database

![test db stuff showing up in dev database](https://i.imgur.com/U3F4zAF.png)

## We need to set up a separate test Database
* We'll have 1 Database for people who are using our app
* We'll have another Database for people who are just running test cases against Firebase
