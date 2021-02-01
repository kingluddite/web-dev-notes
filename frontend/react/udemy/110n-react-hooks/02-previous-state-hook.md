# Use Previous State with useState
* **note** CBC `setState()` does not update the component immediately in every case
    - The update may be batched or deferred until later
    - **important** so when we want to read from state right after calling `setState` we might be getting the wrong value
        + This is the purpose (and we have access in the first argument of `setState()`) the `updater()` function

`AppClass.js`

* Below insures that we always have the correct state for our counter

```
// MORE CODE

  incrementCount = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

// MORE CODE
```

* Test and it works the same but counter is more reliable

### Do the same with hooks
`AppFunction.js`

```
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return <button onClick={incrementCount}>I was clicked {count} times</button>;
};

export default App;
```
