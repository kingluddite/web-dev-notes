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
