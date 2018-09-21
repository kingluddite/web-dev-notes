# React Testing Library & Debug
## Run test
`$ npm test`

* Will say No tests found
* Delete `App.test.js`
    - We will use React Testing Library and don't need this file

## Add `Counter.js`
```
import React, { Component } from 'react';

export class Counter extends Component {
  state = {
    count: 0,
  }

  render() {
    const { count } = this.state;
    return (
      <div className="greetings">
        <button type="button">
          {count}
        </button>
      </div>
    );
  }
}

export default Counter;
```

## Very basic test
* This Component will simply output a `div` with a `button` with an output of `0`
* We need a to create a test file for Counter.js

`Counter.test.js`

```
import React from 'react';
import { render, cleanup } from 'react-testing-library';
```

* As an empty file we get our first fail
* **rule** All test files need at least one test
* We need to import 'react'
* We need to import `{ render, cleanup }` from `react-testing-library`
    - `cleanup` will remove DOM tree code when we are done testing

## Write our first test 
`Counter.test.js`

```
import React from 'react';
import { render, cleanup } from 'react-testing-library';

// custom components
import Counter from './Counter';

test('<Counter />', () => {

});
```

### Add our test wrapper
`Counter.test.js`

```
import React from 'react';
import { render, cleanup } from 'react-testing-library';

// custom components
import Counter from './Counter';

test('<Counter />', () => {
  const wrapper = render(<Counter />);
});
```

* `render()` can takes jsx
    - It can accept one component or a tree of components
* Our test is now passing as we have our first test
    - But we are not doing anything yet
    - There are no assertions to pass or fail

#### wrapper gives us lots of stuff
* `queryBy...` gives us a way to find stuff in the DOM
* rerender
* unmount
* Get stuff with `getAll...`
* debug (very cool)
    - Is a method
    - We can run it

```
// MORE CODE

test('<Counter />', () => {
  const wrapper = render(<Counter />);
  wrapper.debug();
});
```

* Will output this in terminal

```
<body>
  <div>
    <div
      class="greetings"
    >
      <button
        type="button"
      >
        0
      </button>
    </div>
  </div>
</body>
```

* `debug()` shows us what is inside `wrapper`
* You can ignore the `body` and first nested `div`

## Test - Our component outputs a button that has nothing inside it
### testid
* React-testing-library helps us find things

```
// MORE CODE

test('<Counter />', () => {
  const wrapper = render(<Counter />);
  wrapper.debug();
  console.log(wrapper.getByText('0'));
});
```

* The test will show us that we have a lot of info
* But the main thing is we have access to the DOM node element
    - If you are good with the DOM you will have an arsenal of tools you can use to work with the DOM
    - This is why `react-testing-library` is great
        + Other platforms (like enzyme) want you to do everything react or enzyme's way
        + But `react-testing-library` let's us do things the way we are used to in the browser
* If we want to find text

`Counter.js`

```
// MORE CODE

render() {
    const { count } = this.state;
    return (
      <div className="greetings">
        <button type="button">
hello
                </button>
      </div>
    );
  }

// MORE CODE
```

`Counter.test.js`

```
// MORE CODE
test('<Counter />', () => {
  const wrapper = render(<Counter />);
  wrapper.debug();
  console.log(wrapper.getByText('hello').textContent);
});
```

* Would pass test
* Would output `hello` after outputting the wrapper DOM tree

## Let's put our code back to a dynamic count of `0`
`Counter.js`

```
// MORE CODE

render() {
    const { count } = this.state;
    return (
      <div className="greetings">
        <button type="button">
          {count}
        </button>
      </div>
    );
  }

// MORE CODE
```

## Find the tag name holding our `0` text
`Counter.test.js`

```
// MORE CODE

test('<Counter />', () => {
  const wrapper = render(<Counter />);
  wrapper.debug();
  console.log(wrapper.getByText('0').tagName);
});
```

* Will output `COUNTER`

## Test it
* Now we know that the button should be named BUTTON that holds `0` text
* So we can test for that with:

```
// MORE CODE

test('<Counter />', () => {
  const wrapper = render(<Counter />);
  wrapper.debug();
  expect(wrapper.getByText('0').tagName).toBe('BUTTON');
});
```

* That test will pass
* But if you change `<button>` to `<div>` in `Counter.js` the test will fail
    - Saying that it expected `BUTTON` and received `div`
