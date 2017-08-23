# Redux Review and Setup
![react, redux react-redux diagram](https://i.imgur.com/g5IGzEq.png)

* The Redux library is for holding all the state inside our app

## Pieces of state we'll have in our app
![pieces of state](https://i.imgur.com/EonxYnA.png)

* Two sets of Reducers
    - authReducer
        + Records whether or not the user is logged in
    - surveysReducer
        + Records a list of all surveys user has created

## How Redux works
* At the very top we have our Redux Store
    - This is where all our state exists
* To determine our current state we call an **action creator**
* Which dispatches an action
* The action is sent to all the different Reducers inside our app
* Those `reducers` are combined together with the combinedReducers called
* And that is used to update the state in our Redux Store

## Put another way
![another way to describe how Redux works diagram](https://i.imgur.com/KQxzIlp.png)

* We have a `React` Component 
* From that Component we will call and Action Creator
* That will return an Action
* That will be sent to all of our different Reducers
* Which will then update the state inside of our Redux Store
* After that update all of that state that exists inside of that Store
* Will be send back down to our `React` Components
* Which causes them to rerender
* And display some amount of new content on the screen

## Let's talk about the setup of index.js (Redux file)
* We have this store
* It has our state
* Somehow it connects up to our `React` app
* So we can update the state that exists inside of it

### But how does that store connect to `React`?
![Store setup](https://i.imgur.com/dE47kuA.png)

* This is what really goes on behind the scenes
* Inside of our `index.js` we are going to create our Redux store
* We are also going to render a `Provider` tag
    - The Provider tag is a `React` Component
        + It is provided to use by the `React-Redux` Library
        + The sole purpose of this Library is to make sure that `React` and `Redux` play nice together
    - Think of that Provider tag as the glue that exists between the `React` and `Redux` sides of our app
* We pass the Provider the Redux store
    - Because the `Provider` tag is at the very parent Component of our app any other Component that we create (like say... SurveyListItem) can reach directly into the Redux store and pull out some amount of state, solely thanks to that `Provider` tag

![another example about Redux](https://i.imgur.com/tNMkgq4.png)

* The entire purpose of that store at the very top of our Application
* Is to give us the ability to access data inside of our application from a very deeply nested component
    - We won't have a lot of Components in our app
    - But if we did have a very heavy Component hierarchy (lots of Components)part of the idea behind Redux is that some arbitrary Component all the way nested at the bottom of our app can access the global data/global state inside of our app by reaching directly into that Redux store

## Next Up
* We'll import the Provider tag
* We'll import some helpers from Redux
* We'll get started by setting up the Redux side of the application

`const store = createStore(() => [], {}, );`

* We, in the first argument, use a stand in "dummy" `reducer` that we will replace soon but we need it now just to get Redux started up
* The second argument is the starting or initial state of my Application
    - This arg is most relevant when you are taking care of server side rendering
    - For this app, we really don't care about setting up some time of initial state, we will just pass in an empty object
    - The third argument is for the middleware, which we don't have any right now, but we will add `ReduxThunk` in a bit

`index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';

const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(<App />, document.querySelector('#root'));
```

## Now we'll work on `App` Component
![provider](https://i.imgur.com/jPGqzXp.png)

* Right above the top Component `App`, I want to show the Provider tag, this Provider Component that is provided to us by the React-Redux library
* Inside `index.js` we'll place that Provider tag and as an immediate child, inside of it, we'll place the App Component

### Words seem so complex?
* Provider? React-Redux? applyMiddleware() store?
    - In practice, what we are doing is fairly straight forward

`index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';

const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
```

* We replaced this part:

```
ReactDOM.render(<App />, document.querySelector('#root'));
```

* With this part:

```
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
```

* We pass the Provider tag and pass the `store` to it as a `prop`
* And we nest the `<App />` component instance
* Don't forget that comma `,` because `render()` takes two args, the Component instance and the part of the DOM we are appending our code to
* We just created a `Redux` **store** at the very top level of our app and hooked it up to the `React` side of our app by placing the `Provider` tag
    - The Provider tag is a `React` Component that knows how to read changes from our Redux store anytime the Redux store gets some new state produced inside of it, The Provider will inform all of its children Components (everything that the App renders) that some new state is available and it will update all of those new Components with the new state

## Test in the browser
* With both your servers running you should see no errors in the Terminal
* The browser should still say `Hi There!`

## Next - Expand out on all our different `reducers` in our app
* We will have an authReducer and a surveysReducer
* And we'll set up some different `reducers` and make sure we provide them as the first argument to `createStore()`, rather than the dummy `reducer` we are currently using



