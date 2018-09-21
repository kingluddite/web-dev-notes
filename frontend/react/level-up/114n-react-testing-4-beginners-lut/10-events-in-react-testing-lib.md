# Events in React Testing Library
## Add fireEvent
* Helps keep events as native as possible

`Counter.test.js`

```
import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library'; 

// MORE CODE
```

### First a bit of refactoring
* We are using `getByTestId('counter-button')` twice so let's store it in a variable

`Counter.test.js`

```
import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

// custom components
import Counter from './Counter';

test('<Counter />', () => {
  // Renders component
  const { debug, getByTestId } = render(<Counter />);

  debug(); // Outputs dom as string

  const counterButton = getByTestId('counter-button');

  // Asserts counter-button is a button
  expect(counterButton.tagName).toBe('BUTTON');
  // Asserts counter-button starts at 0
  expect(counterButton.textContent).toBe('0');

  fireEvent.click(counterButton);
});
```

### Test if our clicks are incrementing our count by 1
`Counter.test.js`

```
// MORE CODE

test('<Counter />', () => {
  // Renders component
  const { debug, getByTestId } = render(<Counter />);

  debug(); // Outputs dom as string

  const counterButton = getByTestId('counter-button');

  // Asserts counter-button is a button
  expect(counterButton.tagName).toBe('BUTTON');
  // Asserts counter-button starts at 0
  expect(counterButton.textContent).toBe('0');

  fireEvent.click(counterButton);
  expect(counterButton.textContent).toBe('1');

  fireEvent.click(counterButton);
  expect(counterButton.textContent).toBe('2');
});
```

* We fail our test
* Expects 1 and receieved 0
    - We can tell we are not incrementing our count

## Add a way to increase our count
* We'll create a `count` method
* We'll use `setState` and it's first arg of `prevState` (which holds the previous value of state)

```
// MORE CODE

count = () => {
  this.setState(prevState => ({
    count: prevState.count + 1,
  }));
}

render() {

// MORE CODE
```

* **note** The parentheses that surround  the arrow function (without them, you will error out)
* We still fail the test
* But if we add our `onClick` event to our button that will call our event handler

`Counter.js`

```
// MORE CODE

export class Counter extends Component {
  state = {
    count: 0,
  }

  count = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
  }

  render() {
    const { count } = this.state;
    return (
      <div className="greetings">
        <button onClick={this.count} data-testid="counter-button" type="button">
          {count}
        </button>
      </div>
    );
  }
}

export default Counter;
```

* Now our tests pass!
* Change `count: prevState.count + 1` to `count: prevState.count + 2` and our tests will fail
### What is the difference between an event and an event handler?
```
In programming, an event is an action that occurs as a result of the user or another source, such as a mouse being clicked, or a key being pressed. An event handler is a routine that is used to deal with the event, allowing a programmer to write code that will be executed when the event occurs.
```

## Debug to the rescue
* I want to know what my DOM looks like after I click the button twice
* Easy... add this to our test code

```
// MORE CODE

test('<Counter />', () => {
  // Renders component
  const { debug, getByTestId } = render(<Counter />);

  debug(); // Outputs dom as string

  const counterButton = getByTestId('counter-button');

  // Asserts counter-button is a button
  expect(counterButton.tagName).toBe('BUTTON');
  // Asserts counter-button starts at 0
  expect(counterButton.textContent).toBe('0');

  fireEvent.click(counterButton);
  expect(counterButton.textContent).toBe('1');

  fireEvent.click(counterButton);
  expect(counterButton.textContent).toBe('2');

  debug();
});
```

* Now we see two DOM outputs
    - The first shows 0
    - The last shows 2
    - Which is what our output would be if our button was clicked twice
* This is great because I don't have to use my browser UI to test my app, I can tell through testing that it works or doesn't work

## Comment out the 2 `debug()` statements to make our terminal less cluttered

## afterEach()
* Is a function that runs after each of your tests
* Add afterEach() to our globals
* We could use afterEach() to add things or remove things from our database

`.eslintrc`

```
// MORE CODE

  "globals": {
      "test": true,
      "expect": true,
      "afterEach": true
  }
};
```

## Pass `cleanup` to `afterEach()`
`Counter.test.js`

```
import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

// custom components
import Counter from './Counter';

afterEach(cleanup);

test('<Counter />', () => {

// MORE CODE
```

* Now after we run each test `cleanup` will give us a clean slate

## Summary
* We are testing what the user sees in the DOM
* We are NOT testing what was the `state` at a given point
    - **best practice** is don't test where the state is but what the DOM output is
        + react-testing-library doesn't give you the option to test the state at a specific point

## Next - Integration testing
