# Hot Reloading Redux Reducers with webpack
Currently we can not **hot reload reducers**. Every time we have to do a **full page refresh** to see our changes

### We can hot reload Components

### We can't hot reload reducers... But we can!
If you make a change to your `reducer` you will get a warning `The following modules couldn't be hot updated: (Full reload needed)`

`store.js`

Update this code:

```
return [
        ...state.slice(0, i), // everything before the one we are updating
        {...state[i], likes: state[i].likes + 1},
        ...state.slice(i + 1), // everything after the one we are updating
    ]
```

To this:

```
return [
        ...state.slice(0, i), // everything before the one we are updating
        {...state[i], likes: state[i].likes + 10},
        ...state.slice(i + 1), // everything after the one we are updating
    ]
```

* We changed our like from adding `1` to adding `10` but those changes will not take effect until we do a **page refresh**

## Hot reload reducers

* Accept the hot reload
* Rerequire the reducer

### What does that do?
It recompiles the `rootReducer` and **swaps** it out inside of the `store` without us have to do a **page refresh**

`store.js`

Make the following update:

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

1. Check if module is hot

```
// check if module is hot
if (module.hot) {

}
```

2. Then we accept it:

```
module.hot.accept('./reducers/',
```

3. Then we run a function that's going to re-require and swap out the module for us

```
module.hot.accept('./reducers/', () => {
    // we grab it
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
```

* We use `require()` here because you can not use an **ES6 import statement** inside of a function (**it must be done at top level**)
    - So we have to use the **CommonJS require syntax** (_that you have used in Node or earlier module loading_)
    - We require our `Main` **reducer** (top level index) `./reducers/index`

`client/reducers/index.js`

```
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import comments from './comments';

const rootReducer = combineReducers({posts, comments, routing: routerReducer });

export default rootReducer;
```

**remember** In that file we pull in `posts` and `comments` and combines them into a `rootReducer`

* We are going to re-require this whole file and load it back in
* We add `.default` at end because we are using **commonJS syntax**

`const nextRootReducer = require('./reducers/index').default;`

4. Finally, we replace the entire `reducer` with `store.replaceReducer()` and we pass it our `nextRootReducer`

`store.replaceReducer(nextRootReducer);`

5. Give it one last **page refresh**
6. Open `client/reducers/posts.js` and change adding `10` likes back to adding `1` like and you should see that you can now add 1 like without a **page refresh**

Now every time we make a change to it, it is going to be playing back all of the state changes on top of it

## Next Video - Redux Dev Tools
Will help us visualize and time travel between all of this happening



