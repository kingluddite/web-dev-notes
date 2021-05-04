# React Tips

Find out the number of milliseconds since the Epoch in 1970

in chrome console type

```
> Date.now()
```

will return number of milliseconds since Epoch in 1970

## Explain DOM vs React virtual DOM
* Below doesn't work in react
* The console updates but not React

```
import React from 'react';

function SomeComponent() {
  let seconds = 0;

  function startStopwatch() {
    setInterval(() => {
      console.log(seconds);
      seconds += 1;
    }, 1000);
  }

  return (
    <div>
      {seconds}
      <button onClick={startStopwatch}>Start</button>
    </div>
  );
}

export default SomeComponent;
```

* But this works in React
    - Because updating state updates the component

```
import React, { useState } from 'react';
function SomeComponent() {
  const [seconds, setSeconds] = useState(0);

  function startStopwatch() {
    let updatedSeconds = seconds;
    setInterval(() => {
      updatedSeconds += 1;
      console.log(updatedSeconds);
      setSeconds(updatedSeconds);
    }, 1000);
  }

  return (
    <div>
      {seconds}
      <button onClick={startStopwatch}>Start</button>
    </div>
  );
}
export default SomeComponent;
```


