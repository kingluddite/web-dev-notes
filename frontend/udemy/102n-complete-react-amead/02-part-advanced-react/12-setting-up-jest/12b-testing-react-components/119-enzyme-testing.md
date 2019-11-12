# Enzyme Testing
* This is working with React v16 and Enzyme 3

## react-test-renderer
* Not a complex utility so we didn't pull up the docs
  - We pretty much used all its features
    1. We create a new rendered
    2. We render something to it
    3. Then we get the rendered output (there's not a heck of a lot that goes into using `react-test-renderer`)
* Since we have more complex stuff we need to do, `react-test-renderer` kind of leaves us hanging
  - We have other stuff we want to test
    + We want to click buttons
    + We're going to want to change inputs
    + We're going to want to search the rendered output for a specific element and grab its text
    + We can't do this easily (or maybe at all) using `react-test-renderer`

## This is why we won't use react-test-renderer
* Instead we'll use Enzyme

### What is Enzyme?
* It is a library released by AirBnB
* Enzyme is a much more robust renderer for React (much more full featured renderer)
  - react-test-renderer was always designed to be a really simple utility for rendering and Enzyme does use it
* With Enzyme V2 everything was built into the library
* With Enzyme V3 we will need to install additional things:
  1. An adapter - with V3 comes the idea of an adapter, it allows us to specify which version of react we want to test against
    + The reason for this is it allows the core enzyme library to be a lot smaller (it doesn't need to have all the code for all the various versions of React instead you just specify which version you need which will keep your library light and your entire code base more manageable)
  2. `request-animation-frame` (raf)
    * This is a polyfill for a browser feature known as request-animation-frame (this is something that is provided by your browsers and if it is something we don't have in our testing environment it will cause some issues)
    * We will install `raf` (shortcut for request animation frame)
* **note** We are barely using `raf` and the adapter - we just use it one time and that's that

### How do I install Enzyme?
`$ npm i enzyme enzyme-adapter-react-16 raf`

* We'll install it and explore it
* We'll discuss how we can use enzyme to shallow render Header.js and create a snapshop from it  
* Not much to `react-test-renderer` API
* That is not very useful
    - We want to change input
    - Test buttons
    - Search rendered output for specific output element output and grab it's text
    - These will all be difficult to do with react-test-renderer

### Additional config required for Enzyme V3
* **note** This was not necessary with Enzyme V2

#### Create a setup tests file in our project
* This allows us to configure our test environment
* We'll be able to setup our Enzyme adapter and this means we'll be able to just set it up once in our setup file as opposed to every single time we use enzyme
* To accomplish this we'll create a file now that we'll create later for unrelated reasons

`src/tests/setupTests.js`

* This will be a file that runs that allows us to configure the environment we're running in
* We'll import:
  - enzyme
  - The enzyme adapter
  - We'll call a single method to actually wire up Enzyme to work with the adapter
    + So we'll just write these 3 lines once and never come back to them

`src/tests/setupTests.js`

```
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter(),
});

```

* That's all we need
* Now whenever we use Enzyme in our test cases it will be adding support for the v 16 of React
* If you want to read what we just coverered in the docs, [here it is](https://airbnb.io/enzyme/)
* Good news: Our library is now working!

## Now we need to setup a Jest configuration JSON file
* This will allow us to specify that that `setupTests.js` should run
  - Because right now it is not in a special location with a special name like something.test.js (it will not get run automatically)

### setupFiles
* Jest webpage > API Reference > Configuring Jest
* There are lots of things you can change when configuring Jest
* [docs](https://jestjs.io/docs/en/configuration#setupfiles-array)

#### setupFiles is easy to use
1. You specify an array of files
2. Jest runs those files before it runs your tests
3. This allows us to set things up like: raf (request animation frames polyfill and `setupTestfile.js` which we just created)

##### Let's setup the configuration JSON file now
* This file will live in the **root of our project**
* **important** Make sure this is a valid json formatted file
  - Must use `"setupFiles"` as it comes from the docs

`/jest.config.json`
```
{
    "setupFiles": [
        "raf/polyfill",
        "<rootDir>/src/tests/setupTests.js"
    ]
}
```

* "raf/polyfill" is the polyfill where we add the javascript in (check the docs if you want)
  - We'll load this first and then we'll load the file that we specify `setupTests.js`
    + We are going to add a file paths her in this jest.config.json file and to do this we need to start off our relative paths (2 files that are actually in our project and not in node_modules with this syntax ..... `"<rootDir>"` -> everything after that comes from the root of our project)
      * `"<rootDir>/src/tests/setupTests.js"`
* The entire code in this file will make sure that the polyfill loads, that our setupTests.js file loads before the test suite actually runs

## One more small change
* We need to update our package.json scripts
* We need to tell Jest by changing our jest command telling it where it can find that config file the one we just created
  - We just point `--config` by setting it equal to our `jest.config.json`

`/package.json`

```
// MORE CODE

  "scripts": {
    "build": "webpack",
    "fix-styles": "prettier-stylelint --write 'src/**/*.{css,scss}' ",
    "dev-server": "webpack-dev-server --open",
    "test": "jest --config=jest.config.json"
  },

// MORE CODE
```

* **congrats!** We now have everything setup in Enzyme 3 and now we can use Enzyme in all of our future test cases without needed to make any other major changes

## Restart the test suite
`$ npm test -- --watch`

## Let's explore what Enzyme gives us
* [API Reference](https://airbnb.io/enzyme/docs/api/)
  - Shallow Rendering
  - Full Rendering
  - Static Rendering

### Let's focus on Shallow Rendering
* Look at [all the methods we have at our finger tips](https://airbnb.io/enzyme/docs/api/shallow.html)
* Here are the more common methods and how they're used:
  - We'll dig in here and then we'll focus on creating a snapshot based off of Enzyme

#### We first need to import the named export `shallow`
`import { shallow } from 'enzyme';`

* Here is our current test file

`src/tests/components/Header.test.js`

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

* We'll remove `react-test-renderer` and replace it with `shallow`
* We comment out our old react-test-renderer code

```
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});
```

* We need to once again shallow render Header.js
* **good news** It's even easier!

### Here is the process for shallow rendering with enzyme
1. Create a variable (it is usually called `wrapper`)
2. We assign that variable the `shallow()` render method and pass it as an argument the JSX we want it to render

```
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});

```

* Now that we have the "shallow rendered Header" we have access to the full [Enzyme Shallow Rendering library](https://airbnb.io/enzyme/docs/api/shallow.html)

## Enzyme's shallow rendinger `find()` method
* Very similar to jQuery or the DOM's `document.querySelectorAll()`
* `find()` allows us to select the various elements inside of our component and make assertions about them
* We pass in a selector and we get a wrapper back

### Test out Enzyme with our first assertion
* Let's assert that our JSX has only 1 `h1` element

```
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('h1').length).toBe(1);
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});

```

* If you change it to have 2 h1's you would get an error (check for error than change back to 1 h1)

## .text()
* .text() returns the text of whatever you are looking at
* What if we wanted to grab the text value off of that h1?

```
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('h1').text()).toBe('Expensify');
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});

```

* That will pass. Change it to a wrongly spelled work and you would see a failing test

## You should see the benefits of switching to Enzyme
* It gives us a full-featured, user-friendly API

## Goal: Create a snapshot based off of the Enzyme wrapper
* Using `toMatchSnapshot()`
* We'll need to save this file and when we do we'll see that we are getting an updated snapshot
  - We get an error so type `u` to get an updated snapshot

#
```
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();

  // expect(wrapper.find('h1').text()).toBe('Expensify');
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});

```

* But if you look at the snapshot it is empty

`__snapshots__/Header.test.js.snap`

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should render Header correctly 1`] = `ShallowWrapper {}`;

```

* The reason is because of this:
  - [stackoverflow](https://stackoverflow.com/questions/54419342/jest-enzyme-shallowwrapper-is-empty-when-creating-snapshot)

## enzyme-to-json
* To make Enzyme work with the snapshot testing functionality there is one little utility library that we have to install
* [docs](https://github.com/adriantoine/enzyme-to-json)
  - Not a whole lot to this utility library - it just exports a single function and we use that single function

## install enzyme-to-json
`$ npm install --save-dev enzyme-to-json`

### Import it into our test
```
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();

  // expect(wrapper.find('h1').text()).toBe('Expensify');
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});

```

* Then we just use `toJson()` when we are expecting something about our enzyme wrapper

![using toJson()](https://i.imgur.com/n0a0Way.png)

```
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(toJson(wrapper)).toMatchSnapshot();

  // expect(wrapper.find('h1').text()).toBe('Expensify');
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});

```

* Run jest again

`$ npm test -- --watch`

* Press `u` to update the snapshot

### View the new snapshot
```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should render Header correctly 1`] = `
<header>
  <h1>
    Expensifye
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
  </nav>
</header>
`;

```

* And it is working again!

## One minor improvement
* We can setup `toJson` from enzyme-to-json to work automatically so we don't have to always import it into our enzyme tests
* We just need to add another property to our `jest.config.json` config file

`jest.config.json`

```
{
    "setupFiles": [
        "raf/polyfill",
        "<rootDir>/src/tests/setupTests.js"
    ],
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
    ]
}
```

* Now we can remove the `toJson` import from our test and the call to use it and future tests we can just use it and not have to import it all the time

`Header.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});

```

* Make sure to restart your jest test
* We are good to go!

## Next - Get to Snapshot Testing with Dynamic Components
