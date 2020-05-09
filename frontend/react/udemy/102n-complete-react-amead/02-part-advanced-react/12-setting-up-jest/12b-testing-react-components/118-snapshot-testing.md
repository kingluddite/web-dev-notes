# Snapshot Testing
* How are we going to test our components?
* Testing components (like the Header component) and testing reducers (like the expensesReducer) are very different
    - With expensesReducer is pretty easy and straightforward to test
        + We pass some data in we get something back and we assert something about what comes back

## But for React Components we have a far different set of concerns
* We are concerned about what renders under what situation
    - Examples:
        + If I pass a prop into a component I would expect it to render one way
        + If I pass a prop with a different value I would expect it to render a different way
    - How do we set that up?
        + Do I have to type up a lot of JSX in my .toEqual() call? No

## We will also test how we set up User Interaction
* If I change a form value or click a form button is the component reacting correctly?
* If I change a text filter is the state for the component actually changing?

## Now let's dive into Snapshot testing
* We will show how this will let us test Components

### Test the Header.js component
`src/components/Header.js`

```
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <nav>
      <li>
        <NavLink to="/" activeClassName="is-active" exact>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/create" activeClassName="is-active">
          Create Expense
        </NavLink>
      </li>
      <li>
        <NavLink to="/help" activeClassName="is-active">
          Help
        </NavLink>
      </li>
    </nav>
  </header>
);

export default Header;

```

* First create the mirrored `Header.test.js` file
* Make sure to create a components folder inside your tests folder
![Header test file](https://i.imgur.com/KfGKeVL.png)

`src/tests/components/Header.test.js`

* Import the `Header` component we will be testing

```
import Header from '../../components/Header';

```

## How are we going to virtually render our component?
* We need a way to figure out what JSX comes back but we're not going to be viewing it in the browser, instead we'll be accessing it via code
* There is a React library created by the React team to accomplish this and it is called `react-test-renderer`

### react-test-rendered
* Allows us to render our components inside of just regular JavaScript code and then we can assert something about what got rendered

#### Install react-test-rendered
`$ npm i react-test-renderer` (current version as of 11/10/2019 is 16.11.0)

```
import ReactShallowRenderer from 'react-test-renderer/shallow';
// import Header from '../../components/Header';

```

## **note** There are 2 ways we can test React components
1. shallow rendering
2. full DOM rendering

* We will discuss each in their own time but for the Header.js component we will use `shallow` rendering
    - Why?
        + Because we are not worried about Life Cycle Events or user interaction and we're just concerned with what is getting rendered and shallow rendering does just that (it only renders the given component)
        + **note** Full DOM rendering renders child components So Header using full dom rendering would fail because NavLink expects to be used somewhere inside of a router

## Back to testing of the actual rendering of Header
* We'll need to import React since we'll be using JSX
* And we'll need the Header component

```
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../components/Header';

```

### First we need to use ReactShallowRenderer
* We create a new instance of it inside our test suite

```
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const renderer = new ReactShallowRenderer();
})

```

### Now we'll render something
* We do this using `renderer.render()`

```
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
});

```

### Now let's see what the rendered output will look like
```
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  console.log(renderer.getRenderOutput());
});

```

`$ npm test -- --watch`

* We will see what we get back from React.createElement()

```
{ '$$typeof': Symbol(react.element),
      type: 'header',
      key: null,
      ref: null,
      props: { children: [ [Object], [Object] ] },
      _owner: null,
      _store: {} }
```

* **note** We will not be making any assertions directly about this object
* We won't have a .toEqual() call where I type the above and make sure it comes back - that would take way too much time and if we did do this no one would ever test ----- instead we'll use Snapshots

## Snapshots
* Snapshots allow us to track changes over time
* We will create a snapshot of Header at its current point in time and we're going to be able to get notified if this ever changes
    - So if the Header output ever changes in a way we don't want we can catch that and if it changes in a way we do want that's fine too, we can allow it

### To get Snapshots working and play around with them
* We just need to work with a single Jest method `.toMatchSnapshot()`
* [docs](https://jestjs.io/docs/en/snapshot-testing)
* Remember we won't be using .toEqual()

```
// MORE CODE

test('should render Header correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  expect(renderer.getRenderOutput()).toEqual();

  // console.log(renderer.getRenderOutput());
});

// MORE CODE
```

* Instead we'll use `.toMatchSnapshot()` and calling it with no arguments

```
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();

  // console.log(renderer.getRenderOutput());
});

```

* **Note** The first time we run the above test case it will always pass because there is no existing snapshot so Jest will create a new one
    - Jest will create a snapshot of what the rendered output will look like
    - The second time we run this test case it will compare it with the first snapshot, it if is the same great, the test will pass, if it is different, the test will fail
    - You will see inside the tests/components folder there is a new folder called `__snapshots__` and this is where the snapshots will be stored for Jest to compare them
        + Never change the files inside `__snapshots__` but feel free to look at them

`src/tests/components/__snapshots__/Header.test.js.snap`

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should render Header correctly 1`] = `
<header>
  <h1>
    Expensify
  </h1>
  <nav>
    <li>
      <NavLink
        activeClassName="is-active"
        exact={true}
        to="/"
      >
        Dashboard
      </NavLink>
    </li>
    <li>
      <NavLink
        activeClassName="is-active"
        to="/create"
      >
        Create Expense
      </NavLink>
    </li>
    <li>
      <NavLink
        activeClassName="is-active"
        to="/help"
      >
        Help
      </NavLink>
    </li>
  </nav>
</header>
`;

```

* Let's analyze this:

```
exports[`should render Header correctly 1`] = `
```

* This is an export related to our test case and you'll see the 1 which means it was the first snapshot from our test case
* Then we have the actual rendered output
* We don't have the actual `<a>` HTML tag because we used shallow rendering, it is just keeping track of what component we rendered and what data we are passing down

## Re-run the test case
* Now it will compare what was rendered the first snapshot and compare to the latest snapshot
* Let's change something

### Just a simple change to Header.js
```
// MORE CODE

import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensifee</h1>

// MORE CODE
```

* We see we get a failed test because the snapshot changed and it shows us where it changed

![failed snapshot test](https://i.imgur.com/7Kf1YdW.png)

## We have 2 choices
1. accept the changes (most likely not what we want)
2. Make the necessary changes to make the test pass

### What if we want to update our component
* In Header we want to get rid of the Help link so we remove it from Header

```
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <nav>
      <li>
        <NavLink to="/" activeClassName="is-active" exact>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/create" activeClassName="is-active">
          Create Expense
        </NavLink>
      </li>
    </nav>
  </header>
);

export default Header;

```

* We get a new error

## How do we update our component?
* Easy it shows you in the failing test with this text "1 snapshot failed from 1 test suite. Inspect your code changes or press `u` to update them."
* So just type `u` to update the snapshot
* I type `u` and my test passes and my snapshot is now updated to represent the current state of the component I want
* View the snapshot file again and you'll see the new snapshot doesn't have the help link

## Next - Learning about Enzyme
