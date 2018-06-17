# Notes on Advanced Level Up tuts
* Examples of React Spring (animations in React)
    - [demo site](http://react-spring.surge.sh/)
    - [github](https://github.com/drcmda/react-spring)

## Install react spring
`$ npm install react-spring` or `$ yarn add react-spring`

* Move UserProvider to its own component

## Simple fade in/fade out

`App.js`

```
import React, { Component, Fragment } from 'react';
import { Transition } from 'react-spring';
import logo from './logo.svg';
import './App.css';
import { Toggle } from 'Utilities';
import { Modal, Card } from 'Elements';
import User from './User';
import UserProvider from './UserProvider';

class App extends Component {
  render() {
    return (
      <UserProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <User />
          <section>
            <Toggle>
              {({ on, toggle }) => (
                <Fragment>
                  <button onClick={toggle}>Show / Hide</button>
                  <Transition
                    from={{ opacity: 0 }}
                    enter={{ opacity: 1 }}
                    leave={{ opacity: 0 }}
                  >
                    {on && Header}
                  </Transition>
                </Fragment>
              )}
            </Toggle>
          </section>
          <Toggle>
            {({ on, toggle }) => (
              <Fragment>
                <button onClick={toggle}>Login</button>
                <Modal on={on} toggle={toggle}>
                  <h1>hello again</h1>
                </Modal>
              </Fragment>
            )}
          </Toggle>
        </div>
      </UserProvider>
    );
  }
}

const Header = styles => (
  <Card style={{ ...styles }}>
    <h1>Show me</h1>
  </Card>
);

export default App;
```


