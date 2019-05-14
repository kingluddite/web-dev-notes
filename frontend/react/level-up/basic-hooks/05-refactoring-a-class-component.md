# Refactoring A Class Component
* Here is the original class based component

`Toggle.js`

```
import React, { Component } from 'react';

export default class Refactor extends Component {
  state = {
    isToggled: false,
  };

  toggle = () => {
    this.setState(state => {
      return { isToggled: !state.isToggled };
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.toggle}>Toggle</button>
        {this.state.isToggled && <h2>Hello!</h2>}
      </div>
    );
  }
}

```

* We are going to use this file temporarily and then delete
* Just understand the concept of how to refactor a class based component to use hooks

```
import React, { useState } from 'react';

const Toggle = () => {
  const [isToggled, setToggle] = useState(false);

  return (
    <div>
      <button>Toggle</button>
      <h2>Hello!</h2>
    </div>
  );
};

export default Toggle;
```

* We use `false` because we want the toggle to be closed by default

`Toggle.js`

```
import React, { useState } from 'react';

const Toggle = () => {
  const [isToggled, setToggle] = useState(false);

  return (
    <div>
      <button>Toggle</button>
      {isToggled && <h2>Hello!</h2>}
    </div>
  );
};

export default Toggle;

```

* Now we don't see the `h2`

```
import React, { useState } from 'react';

const Toggle = () => {
  const [isToggled, setToggle] = useState(false);

  return (
    <div>
      <button onClick={() => setToggle(!isToggled)}>Toggle</button>
      {isToggled && <h2>Hello!</h2>}
    </div>
  );
};

export default Toggle;
```

* Now the toggle will work
