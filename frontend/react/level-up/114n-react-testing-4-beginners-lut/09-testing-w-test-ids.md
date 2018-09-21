# Testing With Test Ids
`Counter.js`

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

`Counter.test.js`

```
import React from 'react';
import { render, cleanup } from 'react-testing-library';

// custom components
import Counter from './Counter';

test('<Counter />', () => {
  // Renders component
  const wrapper = render(<Counter />);

  wrapper.debug(); // Outputs dom as string

  // Asserts text value 0 is found within a button
  expect(wrapper.getByText('0').tagName).toBe('BUTTON');
});
```

### How does Testing with Ids help us?
* This was introduced by the react-testing-library as a way to better identify your components

#### How would enzyme do this?
* You would look up things by the component name
    - This seems good at first
    - But it really isn't because the user is actually working with DOM elements
    - But we are looking for text `0`
        + If we increase by clicking button text becomes `1` and our test fails
            * Change the state in Counter.js from `0` to `1` and you'll see the test fail

### data-testid attribute
* Seems at first to be a little extraneous but this will come in handy

```
// MORE CODE

render() {
    const { count } = this.state;
    return (
      <div className="greetings">
        <button data-testid="counter-button" type="button">
          {count}
        </button>
      </div>
    );
  }

// MORE CODE
```

* **note** getByTestId() only exists in `react-testing-library`

```
// MORE CODE

test('<Counter />', () => {
  // Renders component
  const wrapper = render(<Counter />);

  wrapper.debug(); // Outputs dom as string

  // Asserts text value 0 is found within a button
  // expect(wrapper.getByText('0').tagName).toBe('BUTTON');
  expect(wrapper.getByTestId('counter-button').tagName).toBe('BUTTON');
  expect(wrapper.getByTestId('counter-button').textContent).toBe('0');
});
```

* Both tests will pass
* We find by id and check that it is a BUTTON and it holds `0` as content

## Refactoring
* Our code is long and we duplicate the use of words often

```
// MORE CODE

test('<Counter />', () => {
  // Renders component
  const { debug, getByTestId } = render(<Counter />);

  debug(); // Outputs DOM as string

  // Asserts text value 0 is found within a button
  // expect(getByText('0').tagName).toBe('BUTTON');
  expect(getByTestId('counter-button').tagName).toBe('BUTTON');
  expect(getByTestId('counter-button').textContent).toBe('0');
});
```

## Fix red squiggly lines under `test` and `expect`
* Eslint is making them red

`.eslintrc`

```
module.exports = {
  "parser": "babel-eslint",
  "env": {
      "browser": true,
      "es6": true
  },
  "settings": {
        "ecmascript": 6,
        "jsx": true
  },
  "parserOptions": {
      "ecmaVersion": 2017,
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "experimentalDecorators": true,
          "jsx": true
      },
      "sourceType": "module"
  },
  "plugins": [
      "react",
  ],
  "extends": "airbnb",
  "rules": {
    "react/jsx-filename-extension": 0,
    "function-paren-newline": 0
  }
};
```

### Add globals into our .eslintrc
* This will save us from having to import these and eslint won't care
* Add this chunk of code to accomplish this

`.eslintrc`

```
// MORE CODE

  "rules": {
    "react/jsx-filename-extension": 0,
    "function-paren-newline": 0
  },
  "globals": {
      "test": true,
      "expect": true
  }
};
```

* View `Counter.test.js` and the red squiggly lines are gone!

`Counter.test.js`

```
test('<Counter />', () => {
  // Renders component
  const { debug, getByTestId } = render(<Counter />);

  debug(); // Outputs dom as string

  // Asserts counter-button is a button
  expect(getByTestId('counter-button').tagName).toBe('BUTTON');
  // Asserts counter-button starts at 0
  expect(getByTestId('counter-button').textContent).toBe('0');
});
```

* How do I test that counter state is equal to 10?
* How do I test that counter state is equal to 5?
* How do I test that counter state is equal to 15?
* Answer: You don't
    - You test to see the output in the DOM

## Tip for testing
* Don't get hung up on what React is doing itself
* Just focus on what is happening in the DOM
    - In the end that is what your users see
    - They don't know or care about what React is doing

## Next - We'll add events to update our button
* We'll add some triggers of click on the button
* Write tests to see if we can make our counter work
* Our first interactive test 
