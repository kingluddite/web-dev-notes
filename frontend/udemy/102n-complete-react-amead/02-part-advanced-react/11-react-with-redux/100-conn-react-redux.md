# Connecting Store and Component with React-Redux
`webpack.config.js`

```
module.exports = {
  entry: './src/app.js',
```

* Point it to our app again
* Restart server `$ yarn run dev-server`

## List expenses on Dashboard Page
* That is what we want to accomplish

## Install React-Redux library
`$ yarn add react-redux`

* Restart server

`$ yarn run dev-server`

* [docs](https://github.com/reactjs/react-redux)
* Not much to it
    - Just a single component and single function
        + We get a `<Provider store>` component
            * We'll use this once at the root of our app
        + and a `connect()` function
            * We'll use `connect()` once for every React component that needs to connect to the store

### Import it
* We get access to Provider and connect as **named exports**

`app.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider  } from 'react-redux'; // add this line
// MORE CODE
const jsx = <AppRouter />;
ReactDOM.render(jsx, document.getElementById('app'));
```

* That will make it easier to see what we are doing
* No functionality was changed
* We just broke it out into a separate variable
* Should work just as it did before

## Coolness!
* Provider will enable us to provide the store to all of the components that make up our app
    - Very useful feature
    - We now don't have to pass the store around
    - Now individual components that want to access the store can just access it

`app.js`

```
// MORE CODE
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
```

* Now our Provider is set up!
* All of our components now have access to the store

### Use connect()
* We'll create a SFC to render our expense list

`ExpenseList.js`

```
import React from 'react';

const ExpenseList = () => (
  <div>
    <h1>Expense List</h1>
  </div>
);

export default ExpenseList;
```

* Import ExpenseList to the ExpenseDashboardPage

`ExpenseListDashboardPage.js`

```
import React from 'react';
import ExpenseList from './ExpenseList';

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
```

* Now we see Expense List on our app screen

### Using `connect()`
* Called `connect()` because it connect your components to the Redux store

`ExpenseList.js`

```
import React from 'react';
import { connect } from 'react-redux';

const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.name}
  </div>
);

const ConnectExpenseList = connect(state => {
  return {
    name: 'Jon',
  };
})(ExpenseList);
export default ConnectExpenseList;
```

* Now you should see `Jon` under ExpenseList
* That is how you use `connect()`

## Making it more practical with `state`
* Let's show the length of the expenses array

```
import React from 'react';
import { connect } from 'react-redux';

const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.length}
  </div>
);

const ConnectExpenseList = connect(state => {
  return {
    expenses: state.expenses,
  };
})(ExpenseList);
export default ConnectExpenseList;
```

* That will output `2` (Or whatever the length of your expenses array is)
* We just connect a react component to the redux store
* Usually don't create a separate variable and then export it by default
    - This is the more common way you'll see it
    - We don't need to create a separate component

```
import React from 'react';
import { connect } from 'react-redux';

const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.length}
  </div>
);

export default connect(state => {
  return {
    expenses: state.expenses,
  };
})(ExpenseList);
```

* Less typing === good :)

## mapStateToProps
* common to break it out into this function

```
import React from 'react';
import { connect } from 'react-redux';

const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.length}
  </div>
);

const mapStateToProps = state => {
  return {
    expenses: state.expenses,
  };
};

export default connect(mapStateToProps)(ExpenseList);
```

* Above is how you will see real code bases write React Redux code

## Add filters
```
import React from 'react';
import { connect } from 'react-redux';

const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.filters.text}j
    {props.expenses.length}
  </div>
);

const mapStateToProps = state => {
  return {
    expenses: state.expenses,
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(ExpenseList);
```

* Will output `wateri2`
* As the store changes, mapStateToProps will change and update the component without a page refresh
    - Let's test this out

## Take for a test drive
* Show how the screen renders new content

`app.js`

```
// // MORE CODE
const store = configureStore();

// console.log(addExpense);
store.dispatch(addExpense({ description: 'Water bill' }));
store.dispatch(addExpense({ description: 'Gas bill' }));
store.dispatch(setTextFilter('water'));

setTimeout(() => {
  store.dispatch(setTextFilter('rent'));
}, 3000);
// // MORE CODE
```

* Now after 3 seconds, the page will re-render with `rent2`

### Important
* When you connect a component to the redux store it is **reactive**
    - Which means as the component changes your component will update with those changes
    - This makes life easier for us
        + We can now create very simple components
        + This component doesn't need to worry about store.subscribe() or .getState(), we don't have to use component state to manage that state, all of that is done for us by react-redux
        + All we need to do is define how we want to render things
        + This is a simple presentational component

