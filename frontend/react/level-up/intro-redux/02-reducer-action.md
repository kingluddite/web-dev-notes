# First Reducer and Actions
**note** an action is not a function... it is an object
an action is just a describer of something
the dispatch is how we tell our app to "go to that something"
dispatch is a method of store (we will use store.dispatch())

`App.js`

```
import React, { Component } from 'react';

import { createStore } from 'redux';

import './App.css';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

const defaultState = {
  welcome: 'Hi',
  otherState: 'some stuff',
  otherStates: 'some other stuff',
};

const greeting = (state = defaultState, action) => {
  switch (action.type) {
    case 'GREET_ME':
      return { ...state, welcome: 'Hello Phil' };
    case 'GREET_WORLD':
      return { ...state, welcome: 'Hello World' };
    default:
      return state;
  }
};
const store = createStore(greeting);

console.log(store.getState());

store.dispatch({
  type: 'GREET_ME',
});

console.log(store.getState());
```
