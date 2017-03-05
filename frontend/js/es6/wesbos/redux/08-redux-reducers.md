# Redux Reducers
We need to update our `state` (our `store` in Redux)

## Reducer
We need to create a `reducer` to handle the other end of our actions

### Create a `reducer` folder `client/reducer`
We need a folder for our reducers because we create a reducer for every single piece of state

#### What are pieces of `state` that we have?
Open up store and you'll see our `state` is composed of two things, `posts` and `comments` (you could have a bunch of pieces maybe 10 or more depending on how large your application is)

```
const defaultState = {
  posts,
  comments
};
```

## Create our first reducer
`$ touch client/reducers/posts.js`

```
// a reducer takes in two things:


// 1. the action (info about what happened)
// 2. copy of current state
```

## How reducers will work
We will pull in what happened using the action and store
We do a bit of work on it, maybe we return the number of people who liked photo, we then return the updated store

At that point React takes over and it will do everything it needs to do (updated the UI and virtual DOM)

`client/reducers/posts.js`

```
export function posts(state = [], action) {
  console.log(state, action);
  return state;
}

export default posts;
```

`client/reducers/comments.js`

```
export function comments(state = [], action) {
  console.log(state, action);
  return state;
}

export default comments;
```

**note** We really only have one reducer

We have a comments reducer and a posts reducer but we need to put them in a root reducer

So we'll make reducers for all of our pieces of state and when we are finished we will put them in one big reducer

Create our root reducer `client/reducers/index.js`

**note** We already point to this file in `client/store.js`

`store.js`

```
// import the root reducer
import rootReducer from './reducers/index';
```

### import what we need into our rootReducer
`client/reducers/index.js`

```
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import comments from './comments';
```

**note** We need to import both our `posts` and `comments` reducers (using the page `./posts` and `./comments`) and we need to combine them into one reducer

`combineReducers({reducer1, reducer2, reducerN..., router)`

**note** 3 things will live in our state `posts`, `comments` and our router because we need to know all our changes of our URL

```
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import comments from './comments';

const rootReducer = combineReducers({posts, comments, routing: routerReducer });

export default rootReducer;
```

