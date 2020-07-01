# Creating a Redux Store
* There is boilerplate we need to use to create a Redux Store

## Install Redux DevTools
* [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
* View the React site in the browser and you will see `No store found. Make sure to follow the instructions`

### Redux DevTools Instructions
* [link to Redux DevTools Instructions](https://github.com/zalmoxisus/redux-devtools-extension#usage)
* If you want to use the Redux DevTools you have to implement them within your Store
    - You would have to follow the instructions on this page to add a basic Redux store
    - But we won't use these instructions because we installed the package `the redux-devtools-extension` package so it will be a nicer than the above link

## Let's create our Redux store
### Here are the imports
`src/store.js`

```
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
```

* Create a file called `store.js` inside `src` folder
* This is essentially boilerplate (you will see this code a lot)
* We will import `thunk` which is middleware
    - applyMiddleware is thunk
* We will use `composeWithDevTools` that comes from the redux-devtools-extension package we installed
* We will import thunk
* We will import a `rootReducer`
    - We will have multiple reducers
        + One for auth
        + One for posts
        + One for alerts
        + One for profiles
        + (And we combine them all inside a rootReducer)
            * This will be inside a folder called `reducers` and we'll name it `index.js` and since we name it `index.js` we can simple point the path to `./reducers`

### rootReducer
`src/reducers/index.js`

```
// rootReducer
```

## Back to our Store
* We create `initialState` and set it to an empty object
    - All of our initialState will be in the reducers

### We add thunk as middleware
`const middleware = [thunk]`

### Now we actually create the Store
* We use `createStore()` - we imported that from `redux` pacakge
    - The first argument is our `rootReducer`
    - The second argument is the `initialState`
    - The third argument (since we installed the redux-devtools-extension) we can use `composeWithDevTools()` and pass into it `applyMiddleware`
        + Then we pass into applyMiddleware(...middleware)
            * Right now we just have thunk but any other middleware we need to add can be added to our middleware array

`store.js`

```
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
```

* The good news is our Redux Store is created and we never need to touch this boilerplate code ever again!

## But how can we use this store?
* We need to go to our main component `App.js` and bring in 2 things:
    1. Provider (this comes from the react-redux package - this is what connects the two because Redux is separate from React but this package will connect Redux and React together)
        * And we accomplish this by surrounding our entire App with this provider
    2. We also want to import our store

`App.js`

```
// MORE CODE

// Redux
import { Provider } from 'react-redux';
import store from './store';

// styles
import './App.css';

const App = () => (

// MORE CODE
```

## Time to wrap everything with the Provider
* By doing this all the components that we create can access our state (Our app level state)

`App.js`

```
// MORE CODE
const App = () => (
  <Provider>
    <Router>
      <Fragment>
        <Navbar />
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
        <Route exact path="/" component={Landing} />
      </Fragment>
    </Router>
  </Provider>
);

export default App;
```

## And we pass in our store to our Provider
`App.js`

```
// MORE CODE

import './App.css';

const App = () => (
  <Provider store={store}>

// MORE CODE
```

## Test
* Make sure there are no error in the UI console or terminal

## Now we need to work with our multiple reducers
* We'll be combining multiple Reducers together and to to that we'll import `combineReducers` from the `redux` package

`src/reducers/index.js`

```
// rootReducer
import { combineReducers } from 'redux';

```

* We'll export `combineReducers` and that takes in an object that will have any Reducers we create
    - We'll eventually pass in `auth` Reducers (as one example)
    - We'll leave it empty for now

## Now check our Redux DevTools
* They are now working!

![Redux DevTools](https://i.imgur.com/E8q4Tat.png)

* DevTools are amazing
* It would be hard to do anything with Redux without these tools
* They show your entire app level state
* They show any action that is fired off
    - If we load a user
    - Register a user
    - Anything like that we can see the Actions visually inside the Redux DevTools
    - We can see the state Diff (if something changes in the state it shows you exactly what changes)
    - You can do Jest testing
    - You can run Trace

## Next
* Create a Reducer
* We'll do the Alert Reducer
    - It is basic
    - We have a set alert and a remove alert
    - (these are similar to bootstrap css red and green alerts)
    - And after we set this up using Redux we'll be able to fire them off whenever we want from wherever we want
    - We will put that in the state
 

