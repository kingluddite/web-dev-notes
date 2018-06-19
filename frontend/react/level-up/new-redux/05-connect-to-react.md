# Connect to React
* we will use our store in a component
* we use connect
    - item in react-redux that allows you to access your store from any given component easily
    - connect is the thing that connects redux to react

`Toggle.js`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Toggle extends Component {
  render() {
    return (
      <div>
        <button>Toggle Me</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messageVisibility: state.message.messageVisibility,
});

export default connect(mapStateToProps)(Toggle);
```

`App.js`

```
// MORE CODE
import Toggle from './Toggle';

import logo from './logo.svg';
import './App.css';

import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';

const store = createStore(rootReducer, {}, composeWithDevTools());

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </header>
        <Toggle />
        <Switch>
        // MORE CODE
```

* Now we have access to messageVisibility in our Toggle (use react dev tools to check for yourself)
* This is really useful becuase it enables us to define our state globally and any component has access to any given state

```
// MORE CODE
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Toggle extends Component {
  render({ messageVisibility }) {
    return (
      <div>
        {messageVisibility &&
        <p>Text is showing here</p>
        }
        <button>Toggle Me</button>
      </div>
    );
  }
}
// MORE CODE
```

