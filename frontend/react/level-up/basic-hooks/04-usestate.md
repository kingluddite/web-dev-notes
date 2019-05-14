# useState
* Allows us to use `state` like we could in class based components
* But now we can use state in a function based component

## Write a simple controlled input using `useState`
* This will make working with forms easier

```
import React, {useState} from 'react';

const App = () => {
  return (
    <div className="main-wrapper">
      <h1>Level Up Dishes</h1>
      <input type="text" onChange={() => null} value={''} />
    </div>
  );
};

export default App;
```

* `useState` can only be used on functional components (not class based components)

## Write our first hook
* We will destructure out 2 values in an array 
* [value, setValue]
    - setValue is a function

`App.js`

```
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(initialState);

  return (
    <div className="main-wrapper">
      <h1>Level Up Dishes</h1>
      <input type="text" onChange={() => null} value={''} />
    </div>
  );
};

export default App;
```

* useState(initialState)
*   initialState is the default value

### General formula
`const [value, setValue] = useState(initialState);`

`App.js`

```
import React, { useState } from 'react';

const App = () => {
  // const [value, setValue] = useState(initialState);
  const [name, setName] = useState('');

// MORE CODE
```

* You will see `const [value, setValue] = useState('');` used a lot
    - The names are not required to be used but it is common
    - We set our intitial state to be an empty string

## Make our form value be filled with `name`
```
import React, { useState } from 'react';

const App = () => {
  // const [value, setValue] = useState(initialState);
  const [name, setName] = useState('');

  return (
    <div className="main-wrapper">
      <h1>Level Up Dishes</h1>
      <input type="text" onChange={() => null} value={name} />
    </div>
  );
};

export default App;
```

## View in browser
`$ npm run start`

* You can't type in the textfield
* We get a warning that `setName` is assigned but not used

## add setName()
```
import React, { useState } from 'react';

const App = () => {
  // const [value, setValue] = useState(initialState);
  const [name, setName] = useState('');

  return (
    <div className="main-wrapper">
      <h1>Level Up Dishes</h1>
      <input type="text" onChange={e => setName()} value={name} />
    </div>
  );
};

export default App;
```

## Test again
* Now we can type in the textfield

## Add one more thing
* setName(e.target.value)

```
import React, { useState } from 'react';

const App = () => {
  // const [value, setValue] = useState(initialState);
  const [name, setName] = useState('');

  return (
    <div className="main-wrapper">
      <h1>Level Up Dishes</h1>
      <input type="text" onChange={e => setName(e.target.value)} value={name} />
    </div>
  );
};

export default App;
```

* Now type and you see the same thing
* Check out App in React tools and you'll see Hooks State is set as you type in the input field

## Now we have that name value and we can do anything with it like...
```
import React, { useState } from 'react';

const App = () => {
  // const [value, setValue] = useState(initialState);
  const [name, setName] = useState('');

  return (
    <div className="main-wrapper">
      <h1>Level Up Dishes</h1>
      <h2>{name}</h2>
      <input type="text" onChange={e => setName(e.target.value)} value={name} />
    </div>
  );
};

export default App;
```

* Type in the textfield and the UI will update with the `name`
