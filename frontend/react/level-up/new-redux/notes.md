# New Redux notes
* troubleshooting - if you get an error running `$ npm start` regarding `react-scripts`, just install it with `$ npm i react-scripts` and run `$ npm start` again

## What makes a reducer a reducer
* it takes the previous state and merges it with the current state and creating a brand new state object

remember an action is just an object and you have to dispatch it

```
import React, { Component } from 'react';

import { createStore } from 'redux';

import logo from './logo.svg';
import './App.css';

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
  otherState: 'other stuff'
}

const greeting = (state = defaultState, action) => {
  switch(action.type) {
    case 'GREET_NAME':
      return { ...state, welcome: `Hello ${action.name}`};
    case 'GREET_WORLD':
      return { ...state, welcome: 'Hello World' };
    default:
      return state;
  }
}


const store = createStore(greeting);

console.log(store.getState());

const name = 'John';

store.dispatch({
  type: 'GREET_NAME',
  name
});

console.log(store.getState());

store.dispatch({
  type: 'GREET_NAME',
  name: 'Jimmy',
  // data: 'can use this',
  // payload: 'can use this'
});

console.log(store.getState());
```


