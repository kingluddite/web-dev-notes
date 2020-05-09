# More Fetching
* Goal: Start and use `startSetExpenses`
* We'll go through the usage and set up the this function
  - It will look similar to the `startAddExpense` asynchronous function below:
    + By similar I mean:  
      * It returns a function
      * It uses Firebase somewhere inside of there
      * And at some point later on we dispatch

`actions/expenses.js`

```
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
```

## Use startSetExpenses
* Currently we are not using it
* We want it to run as soon as our app start (when it is "bootstrapped")
* So that means we'll add it inside `app.js`
  - We were using this:

`app.js`

```
// MORE CODE

import configureStore from './store/configureStore'; // Redux store
import { addExpense } from './actions/expenses';

// MORE CODE
```

* But we'll swap that out with `startAddExpense`

`app.js`

```
// MORE CODE

import configureStore from './store/configureStore'; // Redux store
import { startSetExpenses } from './actions/expenses';

// MORE CODE
```

* We need to now create `startSetExpenses`
* We will be using `startSetExpenses` in **app.js**

## How can we use startSetExpenses inside app.js?
* We are going to render a loading message to the screen until we get our data from Firebase
  - When we get that initial data, then we'll render our application

`app.js`

```
// MORE CODE
ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('root'));
});
```

* So we render a simple `p` HTML element with some Loading text inside it
* We then use Redux' dispatch to call our `startSetExpense()` function add on to that Promise a then that if it resolves we render our app to the screen
  - We'll style this loading screen with CSS later

## If we ran our dev-server now it would fail
* It would fail because we are importing something - `startSetExpenses` doesn't exist yet and then we try to use it
* Make it work by creating and filling out `startSetExpense` inside `actions/expenses.js`

### Let's look at our broken app inside dev-server
`$ npm run dev-server`

* Our app doesn't appear
* We see `Loading...`
* Our console has an error

## TODO - source maps locally are not working
### Fixed
* Make this change:
  - Check if not in production and then use the `inline-source-map`
  - You will now not see `bundle.js` in console but `app.js` and the line number which will greatly help with troubleshooting

`webpack.config.js`

```
// MORE CODE
devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  };
};
```

`expenses.js`

```
// export const startSetExpenses;
```

### Challenge
1. Fetch all expense data once
2. Parse that data into an array (we did parsing inside `firebase-experiment-code.js` see chunk of code below)
3. Dispatch SET_EXPENSES so the data actually changes

* **Note** If you complete steps 1,2 and 3 as expected everything will work. As soon as you save the file and you should start seeing the data from the development server starting to show up
  - If you don't have data, create some with your form and it will show up and you should be able to refresh and still see that data on the home page of your app
* Use the `startAddExpense` as a guide if you get into trouble
  - You're going to need to return a function
  - You will use dispatch to dispatch something
  - You'll use Firebase to return a Promise
  - You need to hit all of the above to get `startSetExpense` to work as expected
  - The only thing you need to change is the code inside `startSetExpense`

`firebase-experiment-code.js`

```
database
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

    console.log(expenses);
  })
  .catch(e => {
    console.log('error', e);
  });
```

1. We create the array `const expenses = []`
2. We iterate over the snapshot `snapshot.forEach()`
3. We add all of the items in (in our playground example we just logged them to the console but you will actually dispatch them)

## Here is the code that makes the expenses load at start of app (bootstrap)
`src/actions/expenses.js`

```
// MORE CODE
export const startSetExpenses = () => dispatch =>
  database
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

* View home page in browser while `dev-server` is running
* You will see expenses listed
* Refresh and the expenses stay there
* If there are no expenses you will see `No Expenses`

## Let's review this code
* We start by setting our constant to a function
* The function doesn't need to take any argument in as we're just going to be fetching expenses

```
// MORE CODE

export const startSetExpenses = () => {
  //
}

// MORE CODE
```

* We can return our function and this is the function that has access to `dispatch`

```
// MORE CODE

export const startSetExpenses = () => {
  return (dispatch) => {
    //
  }
};

// MORE CODE
```

* My eslint will convert this return to an implicit return and the code will automatically be converted to this:

```
// MORE CODE

export const startSetExpenses = () => dispatch => {
  //
};

// MORE CODE
```

* Now we can do stuff with Firebase inside the block of the function we are returning
* We need to fetch from Firebase
  - So that means we need to access `database` (which has already been imported)
  - And to reference all our expenses you target them with `ref('expenses')`

## Grab the database expenses
```
// MORE CODE

export const startSetExpenses = () => dispatch => {
  database.ref('expenses')
};

// MORE CODE
```

* Now from here we need to access (a single time ---- means not a subscription), all the data stored at this location using `.once('value')`

```
// MORE CODE

export const startSetExpenses = () => dispatch => {
  database.ref('expenses').once('value');
};

// MORE CODE
```

* That returns a Promise and I'll add my `then()` to handle data that comes back if my Promise resolves (success) or the Promise is rejected.

```
// MORE CODE

export const startSetExpenses = () => dispatch => {
  database.ref('expenses').once('value').then(() => {
    // What happens if this resolves and how do I want to handle the success case?
  });
};

// MORE CODE
```

* So for the success case (when my Promise resolves) I want to parse the data that comes back
* Why?

```
// MORE CODE

export const startSetExpenses = () => dispatch => {
  database
    .ref('expenses')
    .once('value')
    .then(snapshot => {
      //
    });
};

// MORE CODE
```

* I get the data back in the snapshot
* The snapshot does not give me what I want
* The snapshot gives me that "object" structure and I need to convert that over into an array structure

## But I also need to make sure the Promise is returned
* Like this:

```
// MORE CODE

export const startSetExpenses = () => dispatch =>
  database
    .ref('expenses')
    .once('value')
    .then(snapshot => {
      //
    });

// MORE CODE
```

* And add a return like this:

```
// MORE CODE

export const startSetExpenses = () => {
  return (dispatch) => {
  return database
    .ref('expenses')
    .once('value')
    .then(snapshot => {
      //
    });
  }
};

// MORE CODE
```

* And Eslint will convert it to:

```
// MORE CODE

export const startSetExpenses = () => dispatch =>
  database
    .ref('expenses')
    .once('value')
    .then(snapshot => {
      //
    });

// MORE CODE
```

* Remember both are returned
* I disable eslint for arrow function implicit returns to see both of these returns

```
// MORE CODE

/*eslint-disable */
export const startSetExpenses = () => {
  return dispatch => {
    return database
      .ref('expenses')
      .once('value')
      .then(snapshot => {
        //
      });
  };
};
/* eslint-enable */

// MORE CODE
```

* The return before `database` makes sure the Promise actually gets returned and that's what allows us to have access to `then()` right here where we actually dispatch things (see below chunk of code):

`app.js`

```
// MORE CODE

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('root'));
});

// MORE CODE
```

* We'll create an expenses empty array
* Then we'll loop through the snapshot using forEach (we did this in our firebase playground)

```
// MORE CODE

/*eslint-disable */
export const startSetExpenses = () => {
  return dispatch => {
    return database
      .ref('expenses')
      .once('value')
      .then(snapshot => {
        const expenses = [];

        snapshot.forEach(() => {
          //
        });
      });
  };
};
/* eslint-enable */

// MORE CODE
```

* forEach will be called one time for every child
* We'll have access to that child snapshot and we'll call it `childSnapshot`

```
// MORE CODE

/*eslint-disable */
export const startSetExpenses = () => {
  return dispatch => {
    return database
      .ref('expenses')
      .once('value')
      .then(snapshot => {
        const expenses = [];

        snapshot.forEach(childSnapshot => {
          //
        });
      });
  };
};
/* eslint-enable */

// MORE CODE
```

* Then we push an object into the expenses array

```
// MORE CODE

/*eslint-disable */
export const startSetExpenses = () => {
  return dispatch => {
    return database
      .ref('expenses')
      .once('value')
      .then(snapshot => {
        const expenses = [];

        snapshot.forEach(childSnapshot => {
          expenses.push({
            //
          });
        });
      });
  };
};
/* eslint-enable */

// MORE CODE
```

* We grab the id using `childSnapshot.key` and then grab all the childSnapshot values using `childSnapshot.val()` and using the spread operator

```
// MORE CODE

/*eslint-disable */
export const startSetExpenses = () => {
  return dispatch => {
    return database
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
      });
  };
};
/* eslint-enable */

// MORE CODE
```

* Now after our forEach completes we'll have access to that built up `expenses` array
* And so we then just have to dispatch those expenses
  - We created `setExpenses` in the last video

```
// MORE CODE

/*eslint-disable */
export const startSetExpenses = () => {
  return dispatch => {
    return database
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
  };
};
/* eslint-enable */

// MORE CODE
```

* Now our expenses show up on the home page!
* Create a new expense and it shows up (but it did before) but if you refresh the page it stays there and that is our new code working!
* Now our asynchronous action is working and fetches the data and getting it all inside of Redux

## Now we will add a test case for startSetExpenses
* This is the first time we will test something using our Firebase "dummy" data

`expenses.test.js`

```
// MORE CODE
test('should fetch the expenses from firebase', () => {
  //
})
```

* Like previous tests:
  - We'll need to create our mock store
  - Go through the process of making the request
  - Then assert something about one of the actions that was dispatched
  - We don't expect the Database to change so we won't need to query inside of the test case

### Step 1 - Create our mock store
* We do not need any data in the mock store

```
// MORE CODE

test('should fetch the expenses from firebase', () => {
  const store = createMockStore({});

});

// MORE CODE
```

* Now we'll go through the process of dispatching `startSetExpenses`
  - Make sure to first import it up above

```
 // MORE CODE

import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses // add this line
} from '../../actions/expenses';
import { expenses } from '../fixtures/expenses';

// MORE CODE
```

* Now we can dispatch `startSetExpenses` on our mock store
  - We won't pass in any arguments as it takes none

```
// MORE CODE

test('should fetch the expenses from firebase', () => {
  const store = createMockStore({});

  store.dispatch(startSetExpenses());
});

// MORE CODE
```

* At this point it fetches all our "dummy" firebase data that we just set up

## Now we can make assertions about what happened after the fact
* We need to tag on a `then()` to wait for the data to actually be fetched
  - This means we have an asynchronous test so we must use `done`
    + **remember** This lets Jest know this test is not a success or a failure until `done()` is called
  - We then can look at the fake actions

## Grab the actions
```
// MORE CODE

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
  });
});

// MORE CODE
```

* Now we have all of the actions back and we can take a look at them (we should just have one - and that's the only one we care about)
  - We'll grab the first action and expect it to equal some object
  - What are we expecting in our object?
    + We expect type will equal `SET_EXPENCES`
    + And we should have our expenses object

### tip: If you don't know what is coming back, fail the test:
* Example:

```
// MORE CODE

test('should fetch the expenses from firebase', done => {
  const store = createMockStore({});

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      id: 1,
    });
    done();
  });
});

// MORE CODE
```

* That will fail and I'll see this:

![failed fake test](https://i.imgur.com/xLssbUU.png)

* Now I see I'm getting an `id` (this was my purposeful failed test)
* I see I have a type of `SET_EXPENSES`
* I see I have and expenses array with an array of objects
* So I can plug that into my test (and remove my id)

`expenses.test.js`

```
// MORE CODE
test('should fetch the expenses from firebase', done => {
  const store = createMockStore({});

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

* And now all 64 tests are passing

## Challenge
* Commit, deploy and make sure data shows up in live version of app
* Push to GH and Heroku
* You should see your data now in Production

## Next
* Remove an Expense (The D (DELETE) of CRUD)
* Update an Expense (The U (UPDATE) of CRUD)
