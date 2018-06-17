# Refs
`App.js`

```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  submit = () => {
    console.log(this.text);
    // console.log(this.text.value);
    // console.log(this.email.value);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Welcome text="Welcome to React" />
        </header>
        <p className="App-intro" ref={input => (this.text = input)}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <input type="text" ref={input => (this.text = input)} /> */}
        {/* <input type="email" ref={input => (this.email = input)} /> */}
        <button onClick={this.submit}>Show Value</button>
      </div>
    );
  }
}

class Welcome extends Component {
  render() {
    const { text, toggle } = this.props;
    return <h1 className="App-title">{text}</h1>;
  }
}

export default App;
```
