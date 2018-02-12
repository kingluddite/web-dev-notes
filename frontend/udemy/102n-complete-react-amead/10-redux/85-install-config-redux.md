# Installing and Setting up Redux
* We tell webpack to use a playground file

`src/playground/redux-101.js`

`webpack.config.js`

`console.log('redux 101');`

```
const path = require('path');

module.exports = {
  entry: './src/playground/redux-101.js',
  // MORE CODE
```

* Shut down browser
* Restart server
* And you'll see `redux 101` in console
* [read more on redux](https://redux.js.org/)

## Install Redux
`$ yarn add redux`

### createStore
* We'll grab this named export off the redux library to create the store
* We'll call it once
* It require you pass it a function as it's first argument
    - That function gets called right away
* We pass that function state
    - We set the default

`redux-101.js`

```js
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }) => {
  return state;
});

console.log(store.getState());
```

* That will log `{count: 0}` in the console
* This successfully created a redux state container
* We setup a redux state value
* We were able to get that value back using `store.getState()`
* There is no state the first time it is called so the default state of `count: 0` is used

### Questions
* How do I increase the state count by 1
* How do I reset the count to 0

## Next - All about actions
