# Intro React Hooks
* cheat sheet missing - https://join.codeartistry.io/confirm?s=2020-s-react
* need version of react and react-dom of >= 16.7

## Class Based components (CBC)
* previously only components that had state
* We also could only react out to external APIs with CBCs

## SFC
* Stateless functional components were used to display our markup with the data stored in state
* We passed state from CBCs to be rendered in functional components through props
    - And these function components help us break up our app into more readable and logical componentry

## React hooks are a huge change to the react library
* Now we technically no longer need CBC anymore
* React hooks make it possible to ditch CBCs and just use functional components and keep state

## New
* We no longer need to import React at the top!

`App.js`

```
import React, { Component } from "react";

class App extends Component {
  render() {
    return <div>Hello world</div>;
  }
}

export default App;

```

## Add a counter
```
import React, { Component } from "react";

class App extends Component {
  state = {
    count: 0,
  };

  incrementCount = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <button onClick={this.incrementCount}>
        I was clicked {this.state.count} times
      </button>
    );
  }
}

export default App;
```

## Convert this to hooks in a function component
`AppFunction.js`

```
const App = () => {
  return <div>App</div>;
};

export default App;
```

## Convert to "use" state
* Instead of creating state like in CBCs we "use" state
* Can't write methods like class component - need to declare with variable

`AppFunction.js`

```
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return <button onClick={incrementCount}>I was clicked {count} times</button>;
};

export default App;
```

