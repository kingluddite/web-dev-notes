# Testing React components
* Test what renders under what situation

## Also testing user interaction
* Testing form interaction to make sure what you think you coded to happen is actually happening

## Snapshot testing
`tests/components/Header.test.js`

### react-test-renderer
* Allows us to render our components inside of just regular JavaScript code
* And then we can assert about what got rendered

#### Install react-test-renderer
`$ yarn add react-test-renderer`

* shallow rendering
    - when your dealing with SFCs
* full DOM rendering


```js
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  console.log(renderer.getRenderOutput());
});
```

Will output in terminal:

```
{ '$$typeof': Symbol(react.element),
        type: 'header',
        key: null,
        ref: null,
        props: { children: [ [Object], [Object], [Object], [Object] ] },
        _owner: null,
        _store: {} }
```

* This returns the rendered output of the JSX you put in
* We have type `header`
* We have props and 4 children rendered inside
* If you open Header.js

`Header.js`

```
const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>
    <NavLink to="/help" activeClassName="is-active">
      Help
    </NavLink>
  </header>
);
```

* We will not make any assertions directly about this object
* No toEqual call and type that object out and make sure it equals that
    - That would take forever
    - No one would do that
    - Snapshots will be used instead

## What is a snapshot?
* They allow us to track changes to data over time
* [jest api](https://facebook.github.io/jest/docs/en/expect.html#tomatchsnapshotoptionalstring)

`toMatchSnapshot(optionalString)`

```js
test('should render Header correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
```

* First time we run this testcase it will always pass because there is no existing snapshot
* You will see this in the terminal

![snapshot](https://i.imgur.com/ejJSdsz.png)

* Inside app a new folder/file was created `__snapshots__/Header.test.js.snap`
* Open it and you'll see that is output what was rendered (minus the links as this is shallow rendering)
* We will use this shapshot and compare it to other snapshots

### Show how an error is created
`Header.js`

```
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    trouble!
    // MORE CODE
```

* This code doesn't match up with snapshot so we get an error

![snapshot error](https://i.imgur.com/OzcoL6k.png)

* Just remove that extra content and the test passes again
* Remove the help link... we get an error again
    - We have 2 choices
        + Make changes to Header to bring it back
        + Or we can choose to accept the new state
            * terminal tells us `press u to update`
        + Press `u` and it will take a fresh `snapshot`
            * And the error goes away
            * That is the new snapshot it will be tracking 
