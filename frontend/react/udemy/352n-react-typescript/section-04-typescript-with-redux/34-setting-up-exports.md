# Setting up Exports
# Set up exports
* We need to wire everything together and create a Redux store

`src/state/reducers/index.ts`

```
import { combineReducers } from 'redux';
import repositoriesReducer from './respositoriesReducer';

const reducers = combineReducers({
  repositories: repositoriesReducer,
});

export default reducers;
```

## Create our store
`src/state/store.ts`

```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export const store = createStore(reducers, {}, applyMiddleware(thunk));
```

## Put everything in one file which makes importing more cohesive and streamlined
`src/state/index.ts`

* We export everything we might need access to from other parts of our project

```
// exported from this file will be a store variable
export * from './store';
// we go into our action-creators index.ts file, find all the named exports and export all of them as `actionCreators`
export * as actionCreators from './action-creators';
```

## Next - wire up our Redux app to the React side
