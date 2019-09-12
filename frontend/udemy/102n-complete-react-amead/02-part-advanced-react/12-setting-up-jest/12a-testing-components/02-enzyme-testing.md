# Enzyme Testing
* Not much to react-test-renderer API
* That is not very useful
    - We want to change input
    - Test buttons
    - Search rendered output for specific output element output and grab it's text
    - These will all be difficult to do with react-test-renderer

## Enzyme
* Was released by airbnb

### Install Enzyme
`$ yarn add enzyme enzyme-adapter-react-16 raf`

* raf - request animation frame

`tests/setupTests.js`

```js
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter(),
});
```

* [documentation](http://airbnb.io/enzyme/)

## Configuring Jest
* [docs](https://facebook.github.io/jest/docs/en/configuration.html)
* [setupfiles-array](https://facebook.github.io/jest/docs/en/configuration.html#setupfiles-array)

`/jest.config.json`

```json
{
  "setupFiles": [
    "raf/polyfill",
    "<rootDir>/src/tests/setupTests.js"
  ]
}
```

* Tell jest where our config file resides

`package.json`

```
  "heroku-postbuild": "yarn run build:prod",
  "test": "jest --config-jest.config.json"
},
"lint-staged": {
```

* Restart the test suite

`$ yarn test --watch`

### Enzyme API
* [docs](http://airbnb.io/enzyme/docs/api/)
    - [shallow rendering API](http://airbnb.io/enzyme/docs/api/shallow.html)

`Header.test.js`

```js
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';
// MORE CODE
```

* We imported enzyme
* We removed react-shallow-renderer

### Examples

```
expect(wrapper.find('.someClass')).length.toBe(1);
expect(wrapper.find('#someId')).length.toBe(1);
expect(wrapper.find('h1')).length.toBe(1);
```

* Run test `$ yarn run test --watch`
* 28 tests pass
* 1 obsolete snapshot

#### Check if h1 has text that says Expensify
`expect(wrapper.find('h1').text()).toBe(1);`

* Error expects 1 and gets Expensify

`expect(wrapper.find('h1').text()).toBe('Expensify');`

* And now the test passes

## find(selector)
* [docs](http://airbnb.io/enzyme/docs/api/ShallowWrapper/find.html)

## text() => String
* [docs](http://airbnb.io/enzyme/docs/api/ShallowWrapper/text.html)

```js
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});
```

* I pressed `u` in terminal to update snapshot

## Too much enzyme
* Open up Header.test.js.snap
* You will see a whole bunch of enzyme specific code and we just want our JSX specific code
* Here is a fix

### enzyme-to-json
* [docs](https://github.com/adriantoine/enzyme-to-json)

#### Install enzyme-to-json
`$ yarn add enzyme-to-json`

* restart test suite
* `$ yarn test --watch`

```js
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
```

* `$ yarn test --watch`
* Our test will fail
* Type `u` to generate a new snapshot
* Now loog at `Header.test.js.snap` and we stripped out all the enzyme specific code

## Add a configuration to make our lives easier
* We will configure so that we don't have to import toJSON and use the code, it will be baked into our project

`/jest.config.json`

```js
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

* We added `shapshotSerializers`

`Header.test.js`

```js
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});
```

* We removed our import of toJSON and use of it
* Restart test
* `$ yarn test --watch`
* Type `a` to run all tests
* All 28 tests are passing
