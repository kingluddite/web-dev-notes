# Installing and Setting up Redux
* We won't worry about Redux and React yet
* We'll use the `playground` folder to learn the fundamentals of Redux

## Create our redux sandbox
`src/playground/redux-101.js`

```
console.log('redux 101');
```

* We tell webpack to use a playground file

`webpack.config.js`

```
const path = require('path');

module.exports = {
  entry: './src/playground/redux-101.js',
  // MORE CODE
```

* Shut down browser

## Restart server
* And you'll see `redux 101` in client console
* [read more on redux](https://redux.js.org/)

## Install Redux
`$ yarn add redux`

`$ npm i redux`

### { createStore } named export from Redux
* We'll grab this named export off the Redux library to create the store
* We'll call it **once**
* It'll require you pass it a function as it's first argument
    - That function gets called right away
* We pass that function `state`
    - We set the default

`redux-101.js`

```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }) => {
  return state;
});

console.log(store.getState());
```

* That will log `{count: 0}` in the console
* This successfully created a redux `state` container
* We setup a redux `state` value
* We were able to get that value back using `store.getState()`
* There is no `state` the first time it is called so the default state of `count: 0` is used
    - We don't have a constructor function where we can set up a default

## Similar to this.setState()

```
this.setState((prevState) => {
    return prevState;
})
```

* Verbose syntax

```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }) => {
  return state;
});

console.log(store.getState());
```

* Shorthand syntax

```
import { createStore } from 'redux';

const store = createStore((state = { count: 0 }) => state);

console.log(store.getState());
```

## store.getState()
* Let's explore this redux store method
* `getState()` returns the current state object

## Check it out in the browser
* Not very exciting!

![redux store returned](https://i.imgur.com/m8WzFtL.png)

* We get an object back with a count of 0
* But we did some cool things:
    - We successfully setup our very first Redux container
    - We setup a default state value
    - We were able to get the default state value back

## Recap - What we learned
* To use Redux we have to access `createStore`
* We need to call the `createStore()` function to actually create a store
* What is the store?
    - The thing that will track our changes over time
* What do we know about createStore()?
    - We have to pass a function into createStore() and that function gets called once right away (that why in our example we saw 0 in the chrome console right away)
        + When we call createStore and we pass in a function
        + The function gets called
        + There is no state the first time Redux calls this function
        + So the default state value is used
        + So we return the default state value and that becomes the new state
        + That's why we see count set to 0 in the chrome console
        + If you changed the default state to 10 it would update right away in the Chrome console (we will start off at 0 so change it back to 0)
        + We can also fetch the current state using `store.getState()`
            * That returns the actual object
            * And we can use those values to anything we might need to do like:
                - Render a component
                - Make a call to some sort of changing data source

## Questions we don't know the answers to yet
* How do I change the count?
    - Increment by 1
    - Decrement by 1
    - Reset to 0
* Currently, no way to do this

## Next - All about actions
* How we can manipulate the data inside our store
* This is what actually makes the store useful
* We will accomplish this using a tool called `Actions`
