# Toggle State
`AppClass.js`

```
// MORE CODE
  render() {
    return (
      <>
        <h2>Counter</h2>
        <button onClick={this.incrementCount}>
          I was clicked {this.state.count} times
        </button>

        <h2>Toggle Light</h2>
        <div
          style={{
            height: "50px",
            width: "50px",
            background: "grey",
          }}
        ></div>
      </>
    );
  }
}

export default App;
```

## Add the toggle state
`AppClass.js`

```
import React, { Component } from "react";

class App extends Component {
  state = {
    count: 0,
    isOn: false,
  };

  incrementCount = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  toggleLight = () => {
    this.setState((prevState) => ({
      isOn: !prevState.isOn,
    }));
  };

  render() {
    return (
      <>
        <h2>Counter</h2>
        <button onClick={this.incrementCount}>
          I was clicked {this.state.count} times
        </button>

        <h2>Toggle Light</h2>
        <div
          style={{
            height: "50px",
            width: "50px",
            background: this.state.isOn ? "yellow" : "grey",
          }}
          onClick={this.toggleLight}
        ></div>
      </>
    );
  }
}

export default App;
```

## Do it in hooks
* `useState` allows us to create a single piece of state
    - So we can call `useState` multiple times
    - **note** in CBCs - the state is always an object but with `useState` it doesn't have to be (it can be any JavaScript type - and in this case we want it to be a boolean)

`AppFunction.js`

```
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const toggleLight = () => {
    setIsOn((prevIsOn) => !prevIsOn);
  };

  return (
    <>
      <h2>Counter</h2>
      <button onClick={incrementCount}>I was clicked {count} times</button>;
      <h2>Toggle Light</h2>
      <div
        style={{
          height: "50px",
          width: "50px",
          background: isOn ? "yellow" : "grey",
        }}
        onClick={toggleLight}
      ></div>
    </>
  );
};

export default App;
```


