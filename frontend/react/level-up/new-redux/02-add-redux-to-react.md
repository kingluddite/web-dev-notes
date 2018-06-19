# Add redux to react
* origin  `git@github.com:kingluddite/lumdbredux.git`

## branch (add-redux-to-react)
`$ npm i install`

`$ npm i redux react-redux styled-components`

`$ npm start`

`App.js`

```
/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import logo from './logo.svg';
import './App.css';

import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';

const hello = () => ('hello');
const store = createStore(hello);

const App = () => (
  <Provider store={store}>
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route path="/:id" component={MovieDetail} />
      </Switch>
    </div>
  </Router>
  </Provider>
);

export default App;
```

## Use chrome console
* Select `Provider` in react dev tools
* Switch to console
* `$r`
* Show you the Provider and all you have access to

![using $r](https://i.imgur.com/q3gUKWK.png)

`$r.props.store.getState()`

Will output `hello`

## Summary
* We made a reducer (just a function)
* We made a store
* We attached it to our React App using the Provider component
* And we set our store to our newly created store







