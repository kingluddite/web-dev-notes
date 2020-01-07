# The useState Hook
* First implemented in version 16.8.0 of React
* Open your package.json and see if you have the ability to use React hooks
    - Anything > 16.8.0 and you do

`package.json`

```
// MORE CODE

  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-scripts": "3.3.0"
  },

// MORE CODE
```

## Why do we need React Hooks?
* React hooks were added to simplify our code

## Create and render a SFC (stateless functional component)
* To simplify this example all code will be inside `index.js`

`index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = () => {
  return (
    <div>
      <p>The current count is 0</p>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

## Why did we need to create a SFC?
* Because React hooks tie in to our functional components

## Don't functional components have a bad name?
* The good
    - They were lightweight
    - Easy to work with
    - East to test
* The bad
    - There is no way to manage local state like we can with a class based component
    - No way to tap into Life Cycle methods (aka componentDidUpdate)

### But React hooks changes all that

### If I use React hooks will it break my existing site?
* No, using React hooks offers no breaking changes

### What is a hook?
* A `hook` is nothing more than a function
* A React hook is a function that lets you tap into a React feature
    - React features like:
        + state
        + React Lifecycle methods
* React ships with its own set of hooks that we can use as building blocks
* We can also create our own hooks (ie functions) to customize behavior further

## Let's dive into the built in hooks that React provides
### useState
* Allows us to use component state in our SFCs (something we could not do in the past)
* Now SFCs are no longer called SFCs they are now just called `functional components` because it is now possible to use state inside of them
* We get `useState` as a named export from our React library

`index.js`

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// MORE CODE
```

* useState is nothing more than a function
* It is a function we can call to all us to `use state` in our component
* For class based state we knew that our state was always an object and on that we would add properties for the individual things we were trying to track

```

{ count: 0, name: '' }

```

* With useState we could use an object like we did before
* But one new feature of `useState` is that your piece of state could be anything:
    - Like
        + A string
        + A boolean
        + A number
        + ...
        + (this was not something we could do before)
* In our counter app example we only care about a number so we can set our state equal to 0 like this:

`index.js`

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = () => {
  useState(0);

// MORE CODE
```

## What comes back from `useState`?
* An array of 2 items
    - array item 1 - the current state value that will change over time
    - array item 2 - a function we can call in order to update our state
* We will store the array of 2 items in a variable and target it's first item in that array like this:

`index.js`

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const array = useState(0);

  return (
    <div>
      <p>The current count is {array[0]}</p>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));

// MORE CODE
```

* We see `The current count is 0` rendered to the page
* `0` is our current state value
* Update 0 to 10 and see that it is updated in the browser

## Accessing items off an array like `array[0]` sucks
* It doesn't give you a clear idea of what you are getting
* There is a better way

### A more common pattern to access state from useState is to destructure that array
* We destructure and provide variable names at different positions 

`index.js`

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [count] = useState(0);

  return (
    <div>
      <p>The current count is {count}</p>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));

// MORE CODE
```

* Now that is easier to read
* Easier to understand what is happening in our code

## Add a button to change state value over time
`index.js`

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [count] = useState(0);

  increment = () => {
    //
  };

  return (
    <div>
      <p>The current count is {count}</p>
      <button onClick={increment}></button>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));

// MORE CODE
```

* We get an error because the function we are call

`index.js`

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [count] = useState(0);

  increment = () => {
    //
  };

  return (
    <div>
      <p>The current count is {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));

// MORE CODE
```

* We need to define our increment so we use `const`

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [count] = useState(0);

  const increment = () => {
    //
  };

  return (
    <div>
      <p>The current count is {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));

// MORE CODE
```

* Now we need to access the second item in our `useState` array
* We can call it what ever but when we destructure it we'll name the variable `setCount`

`index.js`

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [count, setCount] = useState(0);

// MORE CODE
```

* We just need to call setCount and pass it a new number
* The new number is based off the old number

`index.js`

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

// MORE CODE
```

* Click the button and watch the count increment

## Benefits of useState
* We get access to state inside of functional components
* A much easier way to work with state

### If you want you could define an inline function inside `onClick`
`index.js`

```
// MORE CODE

  return (
    <div>
      <p>The current count is {count}</p>
      {/* <button onClick={increment}>+1</button> */}
      <button onClick={() => setCount(0)}>+1</button>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));

// MORE CODE
```

* Before if you were using a SFC and you needed state you then needed to refactor that SFC into a CBC (Class based component)
* That is no longer necessary

## Challenge
* Add 2 additional buttons and a prop

### Goal: Add -1 and reset button to component
1. Allow initial count to be configured using a count prop (default to 0)
2. Add `-1` button to reduce count by 1
3. Add `reset` button to reset count
4. Test your work

* To solve #1 you can reference this notes page:
    - `01-part-foundation-react/05-stateless-func-components/41-default-prop-values.md`

## First let's leave count off to use the default value
```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = props => {
  const [count, setCount] = useState(props.count);

  return (
    <div>
      <p>The current count is {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(props.count)}>reset</button>
    </div>
  );
};

App.defaultProps = {
  count: 0,
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

* It should work as it did before

## Now let's provide a value for the prop
```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = props => {
  const [count, setCount] = useState(props.count);

  return (
    <div>
      <p>The current count is {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(props.count)}>reset</button>
    </div>
  );
};

App.defaultProps = {
  count: 0,
};

ReactDOM.render(<App count={10} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

* In reset we set the start value to `props.count` and not `0`


