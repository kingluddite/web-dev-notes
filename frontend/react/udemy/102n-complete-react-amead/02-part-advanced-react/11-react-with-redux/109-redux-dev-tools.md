# Redux Dev Tools
* Just like we have a React Dev tool we now will have one for Redux
  - We'll be able to:
    + View the store
    + View all the actions
    + View the data
    + View the data changes

## Add Redux Dev Tools
* **note** We'll need to add a single line of code to get this to work
* [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)
  - **tip** When searching make sure you are looking for the redux dev tool extension

### I'll add the Chrome extension (also one for Firefox)
* We need to [add an extension to chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
    - Hide in Chrome menu
* Refresh page
* Shut down dev tools
* Open them back up
* Click new `Redux` tab (you can't connect to redux store)

## Add line from redux-devtools-extension
* Copy line from live site as it may have changed but it should look like this when you update your `configureStore.js` file:

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

* The `window` line is what we added above
* View the tab again and we now see the Redux tab is working inside Chrome
  - It is in its own panel

## A ton of information!
* On left
    - Shows all the actions that were dispatched (most recent ones up top)
    - @@INIT - where our redux values are set
    - We see our 3 ADD_EXPENSE actions
    - We can dive into the actions
        + see the expense
    - We can see the state and it's expenses and filters
* Most useful is viewing application state
* As you do things you see that has been added to the redux dev tool

## The slider
* View your app state over time
    - Gives you the ability to time travel in your app
