# Redux Dev Tools
* Allow us to look at exactly what is happening
* Inspect the payloads
* Toggle on/off actions that have happened
    - Even when they are not the last thing that has happened

## How to install

### First install the chrome Redux Dev Tool Chrome extension

### Use a store enhancer
Will allow us to add things to our store (like **Redux Dev tools**)

**note** There is a whole suite of things you can do with your **Redux** `store` 

**Redux dev tools** is the most common (_entry level_)

### Open Redux Dev Tools tab in Chrome inspector
This is what you will first see

`No store found. Make sure to follow the instructions.`

The reason you see this is the Chrome extension doesn't know about our store

### Enhance our store
1. Create the enhancers

```
// set up redux dev tools
const enhancers = compose(

);
```

`import { createStore, compose } from 'redux';`

* `compose()` is a method we `imported` from **redux**
    - This will infuse our `store` with any of the `enhancers` that we want
    - You could load the **dev tools** inside here yourself 
        + But it is much easier to just use the **Redux dev tools chrome extension**
            1. Check for the `devToolsExtension` in the `window`
            2. If it exists we'll run it
            3. If not, we'll just return the `store` itself

`window.devToolsExtension ? window.devToolsExtension() : f => f`

### Pass our enhancers to our store:

Change this:

```
// create our store
const store = createStore(rootReducer, defaultState);
```

To this:

```
// create our store
const store = createStore(rootReducer, defaultState, enhancers);
```

### Our code in `store.js`

```
// set up redux dev tools
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
);

// create our store
const store = createStore(rootReducer, defaultState, enhancers);
```

## Complete `store.js`

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

// set up redux dev tools
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
);

// create our store
const store = createStore(rootReducer, defaultState, enhancers);

// grab our history
export const history = syncHistoryWithStore(browserHistory, store);

// check if module is hot
if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
```

## Save and refresh
You now see the **redux dev tools** working

* Align to right of app

![align to right of app](https://i.imgur.com/U9ySLnX.png)

### Getting used to the interface
1. Switch to `Log monitor`
2. **Like** something and you'll see the `action` that is fired
3. Go to `comments` and you see we change our `location`
4. Add a **comment**

* Great for finding out what actions are getting fired at what time and what information is in each of those
* It also give you a **copy of state** at the time of this happening

### Rest, Revert, Sweep, Commit
* **Sweep**
    - Will remove any disabled `actions` from your **log**
        + So if you hide `actions`, **sweep** removes them entirely as if they never happened
* **Commit**
    - Works similarly to a git commit where it will remove all of the `actions` from your **log** and make your **current state**, the **initial state** (_generally when you load the page, that's your `initial state`_)
        + Click `commit` and you will see it is all cleared, but the **likes** and **comment** that you added are still there, so this will let you make changes and then **commit** that to your **initial state**
* **Revert**
    - Will revert anything since your last **commit**
        + Say you add something you didn't want to do like a bad **post**, hitting `revert` will take you back to your previous **commit** (_if you also had a location action it will take you back to the home page (because that too was an action_)) - everything since the **page load**
* **Reset**
    - Removes all `actions` and brings your app back to it's **intial state** (_essentially just a page reload_)
