# Creating a Redux Store
We keep our our **data** that is related to our **app** inside a `Store`

Rather than holding our `state` inside a Component `state` we hold our `state` inside a **Redux** `store` and this prevents us from having a ton of Components with a ton of different `states`. We have one giant object that **contains all of our data for all of our stores**

## Provider
We haven't learned about this yet but inside this you will see that is where our `store` resides and inside that will be a `getState` method

## Create our Store
`$ touch client/store.js`

`store.js`

```
import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux'; 
```

`syncHistoryWithStore` will allow us to hook up **React Router** with our **Redux**

### browserHistory
In `reduxstagram.js` we imported `browserHistory` and then fed it to our `router`. In order to connect **React Router** and **Redux**, we won't use `browserHistory` directly but we will slightly modify it in our `store.js`

`import { browserHistory } from 'react-router';`

## root reducer
What is it? Stay tuned! We'll learn more about it soon

```
// import the root reducer
import rootReducer from './reducers/index';
```

### Core concepts behind Redux
#### actions, actionCreators and reducers
And how we update and pull data from it?

* What are `actions`?
* What are `actionCreators`?
* What are `reducers`?

## What default data will we be using?
We could pull our **data** from an `API` but while building **React Redux** apps it is common to use static data to mock how your app will work

Create a `client/data` folder

* Create `client/data/comments.js` and `client/data/posts.js` and copy and paste code inside `06b-mock-data.md`

```
// import mock data
import comments from './data/comments';
import posts from './data/posts';
```

## Object holding default data
```
// create object for the default data
const defaultState = {
  posts: posts,
  comments: comments
};
```

But **eslint** will warn us to use **ES6** and convert it to:

```
// create object for the default data
const defaultState = {
  posts,
  comments
};
```

**ES6 shortcut** If the property key and variable name are the same, you can just use one instead of typing them both out

## Create our store
```
// create our store
const store = createStore(rootReducer, defaultState);
```

## Grab our history
Every time you click to a **new route** all that is being remembered in `browserHistory`, and we will take this history and H**TML5 push state** and we'll weave in the `store`.

```
// grab our history
const history = syncHistoryWithStore(browserHistory, store);
```

### Export history too!
Since we need it to be accessible to other files we will need to export

```
// grab our history
export const history = syncHistoryWithStore(browserHistory);
```

### Add the default export to export our store too
`export default store;`

### We will not see anything yet
Until we talk about

* What are `actions`?
* What are `actionCreators`?
* What are `reducers`?

## Final `store.js`

```
import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/index';

// import mock data
import comments from './data/comments';
import posts from './data/posts';

// create object for the default data
const defaultState = {
  posts,
  comments
};

// create our store
const store = createStore(rootReducer, defaultState);

// grab our history
export const history = syncHistoryWithStore(browserHistory);

export default store;
```
