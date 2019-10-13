# Connecting Store and Component with React-Redux
* We know about HOC and now we need to use it to connect React and Redux together

## Let's go back to working with our expense app
* Switch webpack to our expense app (from our hoc.js)

`webpack.config.js`

```
module.exports = {
  entry: './src/app.js',
```

* Point it to our app again

## Restart server:

`$ yarn run dev-server`
`$ npm run dev-server`

![app running in browser](https://i.imgur.com/XEHrB94.png)

## First thing we want to do:
### List expenses on Dashboard Page
* That is what we want to accomplish

## How do we get access to the store information from our React components?
* There is not good way to get this done
* That is why we started using Redux in the first place
  - We never have that clear tree structure to pass stuff between
  - We might be able to take the store and pass it down to all the components that need it - but even if we could do that it would still be a bad idea
    + Because we are passing a ton of props between components when they're not actually using them and that will create components that are not reusable --- which is not a good idea

## Instead we'll install the react-redux library
* [react-redux docs](https://github.com/reduxjs/react-redux)
  - Not a lot of stuff here
  - We just need 2 things from this library:

1. A Single Component
2. A Single Function

* **update** The docs have been [move to a new site](https://react-redux.js.org/introduction/quick-start)

* This library will give us access to 2 things we need

1. A Provider component
  * We'll use the `Provider` component once at the root of our app
2. And a `connect()` function
  * Then we'll use `connect()` for every single component that needs to connect to the Redux store

## Install React-Redux library
`$ yarn add react-redux`

`$ npm i react-redux`

### Restart server

`$ yarn run dev-server`

`$ npm run dev-server`

## First step - Let's start working with Provider component from react-redux
* Import it as a named export

`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// MORE CODE

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);
```

* To make our code easier to read we'll put our rendered component inside a variable we'll call `jsx`

```
// MORE CODE
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById('root'));
```

* `Provider` enables us to provide the `store` to all of the components that make up our app
  - This is a super useful feature
  - We do not need to manually pass the store around
    + Instead individual components that want to access the store can just access it
* **note** No big visual changes as our app works the same as it did before
* But the big benefit to doing it this way is our app's components do have access to the store
  - Now we can take advantage of the other thing that `react-redux` gives us which is the `connect()` function
  - **note** We can't use `connect()` without having provider setup
  - We are now ready to create components that grab information from the store

## Step Two: Let's focus on getting the basic expenses list rendered
* We'll create a new component called `src/components/ExpenseList.js`
* We will create a SFC

`ExpenseList.js`

```
import React from 'react';

const ExpenseList = () => {
  // stuff here
}
```

* Above we have the body of our component
* But in this example we won't need the body and we can get right to rendering to the screen

```
import React from 'react';

const ExpenseList = () => (
  //
)

```

* We'll create simple text to output
* We'll embed this component inside our ExpenseDashboard

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

* And here is the dashboard

`ExpenseDashboard.js`

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

* And if you browse to the dashboard route in the browser you'll see:

![ExpenseDashbaord](https://i.imgur.com/mLNkB9Q.png)

## Now let's pull data off our store and render it to the page
* We need to import react-redux `connect()` component as a named export
* **note** We are now just focusing on reading from the store
* We'll need to create a new const for the HOC
  - To differentiate between regular components and HOC components using `connect()` we'll preface names with `Connected`

`ExpenseList.js`

```
import React from 'react';
import ExpenseList from './ExpenseList';
import { connect } from 'react-redux';

const ExpenseList = () => (
  <div>
    <h1>Expense List</h1>
  </div>
);

const ConnectedExpenseList = connect();

export default ExpenseList;

```

* Now when we assign `connect()` we do not get the HOC back. Instead we get a function. So the following won't work:

```
// MORE CODE
const ConnectedExpenseList = connect(ExpenseList);

// MORE CODE
```

* Instead we need to call it like this:

```
// MORE CODE
const ConnectedExpenseList = connect()(ExpenseList);

// MORE CODE
```

* Why did they set it up like this? They could have set up to have the component passed in directly to `connect()` but they didn't and it's their API so we have to use it the way they built it
* But we can provide the first set of parentheses with the information we want to connect, since we don't usually want all of the store we can provide just a a subset and we do that by passing in a function and this function lets us determine what information from the store we want our component to be able to access

```
// MORE CODE
const ConnectedExpenseList = connect(() => {
  // 
})(ExpenseList);

// MORE CODE
```

* The store's `state` will be passed in as the first argument

```
// MORE CODE
const ConnectedExpenseList = connect((state) => {
  // 
})(ExpenseList);

// MORE CODE
```

## How will this function work?
* We'll just return an object
* And we can put any key value pairs we like
  - Usually they are going to be things from the state
  - But I can put anything I like

```
// MORE CODE
const ConnectedExpenseList = connect((state) => {
  return {
    name: 'John Doe'
  }
})(ExpenseList);

// MORE CODE
```

* Now the `ConnectedExpenseList` component will have access to the `name` prop
  - Which means up above I can set up `props`

```
// MORE CODE

const ExpenseList = (props) => (
  <div>
    <h1>Expense List</h1>
  </div>
);

// MORE CODE
```

* And I can use the value:

```
// MORE CODE

const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.name}
  </div>
);


// MORE CODE
```

* But viewing the UI we don't see anything updated
* That's because we need to switch our default export from ExpenseList to ConnectedExpenseList

```
import React from 'react';
import { connect } from 'react-redux';

const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.name}
  </div>
);

const ConnectedExpenseList = connect(state => ({
  name: 'John Doe',
}))(ExpenseList);

export default ConnectedExpenseList;

```

* And you should see this:

![prop name rendered to UI](https://i.imgur.com/YRZaNfc.png)

## Something more useful
* Since we have access to state we can access state.filters or state.expenses like this:

```
// MORE CODE

const ConnectedExpenseList = connect(state => ({
  name: state.expenses,
}))(ExpenseList);

export default ConnectedExpenseList;

// MORE CODE
```

* But we need to pass that down to expenses via the `expenses` prop
* And since we can't render an object we'll just render the expenses array's length

```
// MORE CODE

const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.length}
  </div>
);

const ConnectedExpenseList = connect(state => ({
  expenses: state.expenses,
}))(ExpenseList);

export default ConnectedExpenseList;

// MORE CODE
```

* That will render 2 to the UI (number of items in our expenses array)

## Take a deep breath
* You just created your first component to the Redux store

## We need to make a couple "code tweaks"
* It is usually not a common pattern to create a separate variable and then export it by default
* It is a much more common pattern that we'll use from now on that you'll see on many other redux react codebases to do this:
* It saves us from creating a separate variable

`ExpenseList.js`

```
import React from 'react';
import { connect } from 'react-redux';

const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.length}
  </div>
);

export default connect(state => ({
  expenses: state.expenses,
}))(ExpenseList);
```

## mapStateToProps
* It is also a very common pattern to take our function and put it inside it's own variable usually named `mapStateToProps`

`ExpenseList.js`

```
import React from 'react';
import { connect } from 'react-redux';

const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.length}
  </div>
);

const mapStateToProps = state => ({
  expenses: state.expenses,
});

export default connect(mapStateToProps)(ExpenseList);
```

* When you look at real world code bases for react redux you will see the above
  - You will see your regular unconnected component

```
// MORE CODE

const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.length}
  </div>
);

// MORE CODE
```

* We'll see some functions
  - For now we just talked about `mapStateToProps` (but there will be more)

* Then you see the call to connect() at the bottom that pulls it all together

```
export default connect(mapStateToProps)(ExpenseList);

```

* The end result is our component can grab whatever information it needs from the store

## What if I also want to access the filters?
```
import React from 'react';
import { connect } from 'react-redux';

const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.length}
    {props.filters.text}
  </div>
);

const mapStateToProps = state => ({
  expenses: state.expenses,
  filters: state.filters,
});

export default connect(mapStateToProps)(ExpenseList);

```

* As the store changes we'll get fresh values in the component

## Let's play with setTimeout()
* Well first render `water` text filter to the UI and after 3 seconds we'll render `milk`

`app.js`

```
// MORE CODE

store.dispatch(setTextFilter('water'));

setTimeout(() => {
  store.dispatch(setTextFilter('milk'));
}, 3000);

// MORE CODE
```

* **note** When you connect a component to the redux store it is reactive which means that as the store changes your component will get re-rendered with the new values
  - This is great news because it allows us to create very simple components
  - ExpenseList doesn't need to worry about using store.subscribe() or store.getState() it doesn't need to use any component state to manage that data instead all of that is done for us by React Redux
    + All we have to do is define how we want to render things
    + ExpenseList is a very simple "Presentational" component and the goal is to get as many components as we can inside our app into the "Presentational" component pattern as we can

## Recap
* `Step 1` We set up `Provider` inside the root of our app
  - This let us set up the store we want to provide to all of our components (our code will look like this for the rest of our app)
* `Step 2` We create new HOC's using `connect()` provided from React Redux
  - When we call connect() we first pass it the things we want to connect from the store and the second argument is the component we want to created the connected version of and the result is a brand new component (which is just our original component with the props from the store)
  - This will allow us to create very simple components and scale our app without worrying about putting all the glue into our code
  - We won't have to pass props down - all we did was render it as is and all that information was provided to us via 'connect()'





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

